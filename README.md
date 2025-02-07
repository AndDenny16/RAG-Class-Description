#  Davidson College Class Schedule RAG with Pinecone

##  Overview
This repository demonstrates how to **ingest class schedule data** from the **Davidson College API** and build a **Retrieval-Augmented Generation (RAG) system** using **Pinecone** for vector storage. The pipeline includes:

- Fetching class schedule data from the **Davidson API**.
- Cleaning and processing the course descriptions.
- Generating embeddings using **OpenAI’s `text-embedding-3-large` model**.
- Storing and retrieving embeddings using **Pinecone**.
- Querying relevant courses and enhancing retrieval with **GPT-based responses**.

## Dependencies

```bash
pip install requests beautifulsoup4 pinecone-client openai
```

## Running the Project
### **Set Up API Keys**
Set environment variables for **OpenAI** and **Pinecone**:
```bash
export OPENAI_API_KEY="your_openai_api_key"
export PINECONE_API_KEY="your_pinecone_api_key"
```

### **Run the Scripts**
```bash
python ingest_data.py  # Fetch and store data
python query.py  # Run RAG search
```

## References
- Davidson API (not public)
- [Pinecone Documentation](https://docs.pinecone.io)
- [OpenAI API](https://platform.openai.com/docs/guides/embeddings)
