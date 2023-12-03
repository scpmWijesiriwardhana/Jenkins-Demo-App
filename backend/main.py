from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy.orm import Session
from . import schemas, models
from .database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow all origins in this example, but you should restrict it to your actual frontend URL in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/notes", status_code=status.HTTP_200_OK )
def get_All_Notes(db: Session = Depends(get_db)):
    notes = db.query(models.Note).all()
    return  notes

@app.get("/notes/{note_id}", status_code=status.HTTP_200_OK )
def get_Note_by_id(note_id: int, db: Session = Depends(get_db) ):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id {note_id} not found")
    return note


@app.post("/createnote", status_code=status.HTTP_201_CREATED)
def create_Note(note: schemas.Note, db: Session = Depends(get_db)):
       # Create a Note instance
    db_note = models.Note(
        **note.model_dump() # Unpack the attributes from the note.model_dump() method
    )

    # Add the note to the database
    db.add(db_note)
    db.commit()
    db.refresh(db_note)

    return {"data": f"Note with title {note.title} is created"}


@app.put("/notes/{note_id}", status_code=status.HTTP_200_OK)
def update_Note_by_id(note_id: int, update_data: schemas.NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id {note_id} not found")
    note.title = update_data.title
    note.content = update_data.content
    db.commit()
    db.refresh(note)
    return {"data": f"Note with id {note_id} has been updated"}


@app.delete("/notes/{note_id}", status_code=status.HTTP_200_OK)
def delete_Note_by_id(note_id: int, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id {note_id} not found")
    db.delete(note)
    db.commit()
    return {"data": f"Note with id {note_id} has been deleted"}


