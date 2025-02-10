#  Davidson College Class Schedule Semantic Search with Pinecone, Open AI SDK

##  Overview

Traditional class schedules can be tedious—you often have to apply multiple filters (major, time, teacher) just to finally view the class descriptions. This cumbersome process may cause you to miss out on hundreds of intriguing classes that might match your interests.

The Davidson Class Explorer streamlines this process by helping you discover your ideal class amidst a sea of descriptions. Simply provide three concepts, phrases, or keywords, and the tool leverages OpenAI's SDK to generate a hypothetical class description tailored to your input. This fictitious class, created by ChatGPT, is then compared—using cosine similarity—with the embeddings of all Davidson classes, ultimately matching you with the closest real class to your ideal.


## Flask Python Server

**1.ingest.py** - Creating the Pinecone Vector Store 

  - **Calls the Davidson API** parses together the metadata of all Davidson Classes
  - **OpenAI Embeddings** python SDK to get the embeddings of the descriptions
  - **Pydantic** to ensure consistency of length of embeddings
  - **Upsert** all the embeddings into Pinecone Index
    
    
**2. main.py** - Main Search Functionality using Pinecone Cosine Similarity Search

**3. app.py** - Simple Flask Server to Connect to Frontend
  - Routes
      - **POST /build**  - Creates 'ideal' fake course description
         - Request Body:
           ```
           {"topics" : ["topic1", "topic2", "topic3"]}
           ```
      - **POST /getclasses** - Retrieves 2 most similar Davidson Classes to the Ideal
      - Request Body
        ```
           {"description" : "Fake Ideal Class Description}
           ```

        - **GET /info** - Information on the Server
        - **GET /health** - Health Check


## React Js Frontend



## Dependencies

```bash
requests beautifulsoup4 pinecone-client openai
```


## References
- Davidson API (not public)
- [Pinecone Documentation](https://docs.pinecone.io)
- [OpenAI API](https://platform.openai.com/docs/guides/embeddings)
