from pydantic import BaseModel
from datetime import date

from uuid import UUID

class Saving(BaseModel):
    id: UUID
    amount: float
    description: str
    date:date
    
