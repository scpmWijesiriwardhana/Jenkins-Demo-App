import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to fetch notes
  const fetchNotes = () => {
    fetch('http://localhost:8000/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  };

  const handleCreateNote = () => {
    // Create a new note
    fetch('http://localhost:8000/createnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Note created:', data);
        // You may want to update the UI or fetch all notes again after creating a new note
        fetchNotes();
      })
      .catch(error => console.error('Error creating note:', error));
  };

  const toggleExpandNote = (noteId) => {
    setExpandedNoteId(expandedNoteId === noteId ? null : noteId);
  };

  return (
    <div className="container mt-3">
      <h1>Notes</h1>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {notes.map(note => (
          <div key={note.id} className="col">
            <Card>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>
                  {expandedNoteId === note.id ? note.content : `${note.content.slice(0, 200)}...`}
                  {note.content.length > 200 && (
                    <Button
                      variant="link"
                      onClick={() => toggleExpandNote(note.id)}
                    >
                      {expandedNoteId === note.id ? 'Collapse' : 'See more..'}
                    </Button>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default App;
