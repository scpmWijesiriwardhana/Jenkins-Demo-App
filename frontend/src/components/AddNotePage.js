import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddNotePage = () => {
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = async () => {
    try {
      const response = await fetch('http://localhost:8000/createnote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        // If the response is successful, navigate to the home page
        navigate('/');
      } else {
        console.error('Error adding note:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="container">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Enter Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Title of the note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Content:
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddNote}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default AddNotePage;
