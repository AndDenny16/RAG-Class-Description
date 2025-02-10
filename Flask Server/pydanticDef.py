from pydantic import BaseModel, Field, field_validator
from typing import List, Dict

class ClassEmbedding(BaseModel): 
    class_id: str = Field(..., description="Unique identifier")
    values: List[float] = Field(..., description="Embedding vector")
    metadata: Dict[str, str] = Field({}, description="Optional metadata")

    @field_validator("values")
    def check_embedding_size(cls, v):
        if len(v) != 3072:  # Change this to match your embedding model's dimension
            raise ValueError(f"Embedding must be exactly 768 dimensions, got {len(v)}")
        return v

