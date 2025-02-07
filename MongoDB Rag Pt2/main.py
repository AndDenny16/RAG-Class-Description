from pinecone import Pinecone
from dotenv import load_dotenv
import os
from openai import OpenAI
import json

load_dotenv()

PC_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = os.getenv("INDEX")
pc = Pinecone(api_key=PC_API_KEY)
index = pc.Index(INDEX_NAME)
OPEN_AI_API = os.getenv("OPEN_AI_API")
client = OpenAI(api_key=OPEN_AI_API)



def get_variation(user_input): 
    #Create ChatGPT Variations of User Input
    try: 
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "developer", "content": "rephrase the users prompt, into a plausible three sentence course description for a college class, don't ask for anything else"},
                {"role": "user", "content": user_input}
            ])  
    except Exception:
        print("Error calling Open AI")
        return None
    
    message_content = completion.choices[0].message.content
    return message_content



def embedding_request(request):
    try: 
        response = client.embeddings.create(
            model="text-embedding-3-large",
            input=request)
    except Exception:
        print("Error Calling OpenAI")
        return None
    
    embedding_value = response.data[0].embedding
    return embedding_value


def multiple_vector_search(embedding_list):

    #Vector Pinecone Search, on all the variations and user input
    try: 
        search_results = []
        for embedding in embedding_list: 
            query_results = index.query(
                namespace="Classes",
                vector= embedding,
                top_k=2,
                include_values=False,
                include_metadata=True)
            search_results.append(query_results)

        return search_results
            
    except Exception as e:
        print("Failed to Query Pinecone")
        return None


def vector_search(embedding_value):
    try: 
        query_result = index.query(
                namespace="Classes",
                vector= embedding_value,
                top_k=2,
                include_values=False,
                include_metadata=True)
    except Exception as e:
        print("Failed to Query Pinecone")
        return None
    
    return query_result
    
   
def simple_query(user_description):
    embedding = embedding_request(user_description)
    result = vector_search(embedding)
    description_list = []
    for indiv_match in result['matches']:
        description_list.append(indiv_match['metadata'])
    print(description_list)
    return description_list




def query(topics, variations_amount):
    try: 
        #What the User wants to know
        user_input = " ".join(topics) + " "
        #Create ChatGPT Variations to Increase Likelyhood of matching with relavant classes
        print(user_input)
        variations = [user_input]
        for _ in range(variations_amount): 
            completion = get_variation(user_input)
            variations.append(completion)
        print("variations completed")
        #Create Embeddings of user request + variations
        embedding_values = []
        for i in range(len(variations)):
            curr_completion = variations[i]
            embedding = embedding_request(curr_completion)
            embedding_values.append(embedding)
        print("embeddings completed")
        #Vector Search
        search_results = vector_search(embedding_values)
        description_list =[]
        for result in search_results:
            for indiv_match in result['matches']:
                description_list.append(indiv_match['metadata'])

        print("results completed")
        return description_list

    except Exception: 
        return {
                'statusCode': 500,
                'body': json.dumps({"error": "Issue Creating Request"})
            }



if __name__ == "__main__":
    query(variations_amount=2)
