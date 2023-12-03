from pydantic import BaseModel
from datetime import datetime

class Note(BaseModel):
    title: str
    content: str
    
class NoteOut(BaseModel):
    title: str
    content: str
    created_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class NoteUpdate(BaseModel):
    title: str
    content: str

    class Config:
        orm_mode = True


