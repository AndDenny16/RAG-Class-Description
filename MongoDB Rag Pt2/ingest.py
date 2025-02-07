from requests import request
import os
from dotenv import load_dotenv
import json
from pydanticDef import ClassEmbedding
from bs4 import BeautifulSoup
from openai import OpenAI
from pinecone import Pinecone


load_dotenv()

DAVIDSON_URL = os.getenv("DAVIDSON_API")
OPEN_AI_API = os.getenv("OPEN_AI_API")
PC_API_KEY = os.getenv("PINECONE_API_KEY")
client = OpenAI(api_key= OPEN_AI_API)

full_url = (DAVIDSON_URL + "?limit=100&offset={}")



def get_embedding(class_description):
    #Beautiful soup to get rid of html tags
    soup = BeautifulSoup(class_description, "html.parser")
    cleaned_description = soup.get_text(separator=" ", strip=True)

    #Call Open AI Embedding Model
    try: 
        response = client.embeddings.create(
            model="text-embedding-3-large",
            input= cleaned_description)
    except Exception:
        print("Error Calling OpenAI")
        return None
    
    embedding_value = response.data[0].embedding
    return cleaned_description, embedding_value
    

def get_course_descriptions(offset): 
    response = request(url = full_url.format(offset), method='GET')
    data = response.json()
    embedding_list = []
    for (i, indiv_class) in enumerate(data):

        #Minimal Description just skip
        if len(indiv_class['course_description']) < 10: 
            continue

        #Get Embeddding and Cleaned Description
        cleaned_description, class_embedding = get_embedding(indiv_class['course_description'])

        #Embedding Error Handling
        if not class_embedding: 
            print(f"Error Embedding class {indiv_class.id}")
            continue

        #Create Metadata for entry
        metadata = {
            'course_number': indiv_class["course_number"],
            'course_title': indiv_class["course_title"],
            'subject': indiv_class["subject"]["description"],
            'instructor': indiv_class["instructors"][0]["first_name"] + indiv_class["instructors"][0]["last_name"],
            'description': cleaned_description

        }
        ##Validator
        embedding_object = ClassEmbedding(
            class_id= str(i), 
            values = class_embedding,
            metadata=metadata
        )
       
        #Add to Embedding List
        embedding_list.append((embedding_object.class_id, embedding_object.values, embedding_object.metadata))

    return embedding_list



def ingest(offset):
    #Connect to Index
    pc = Pinecone(api_key=PC_API_KEY)
    index = pc.Index("davidsonclasssearch")
    #Get Embedding List
    print("Embedding List Creation Starting")
    embedding_list = get_course_descriptions(offset)
    print("Embedding List Created")
    #Add to Pinecone Index
    index.upsert(embedding_list, namespace="Classes")

if __name__ == "__main__":
    ingest(offset=int(input("Enter Offset:" )))