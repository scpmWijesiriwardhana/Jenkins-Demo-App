// Notes.js
import React, { useState, useEffect } from 'react';
import './Notes.css';
import { FaTimes } from 'react-icons/fa';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Function to fetch notes data from the backend server
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:8000/notes');
        const data = await response.json();
        setNotes(data); // Update the state with the fetched notes
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    // Call the fetchNotes function
    fetchNotes();
  }, []); // The empty dependency array ensures that the effect runs only once after the component mounts

  // Function to generate a random light color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleRemoveNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:8000/notes/${noteId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // If the response is successful, update the state to remove the deleted note
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      } else {
        console.error('Error removing note:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing note:', error);
    }
  };

  return (
    <div>
      <h2>All Notes</h2>
      <div className="notes-container">
        {notes.map((note) => (
          <div key={note.id} className="note-box" style={{ backgroundColor: getRandomColor() }}>
            <div className="note-header d-flex justify-content-between align-items-center">
              <h3>{note.title}</h3>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveNote(note.id)}
              >
                <FaTimes />
              </button>
            </div>
            <p className="truncate-text">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
