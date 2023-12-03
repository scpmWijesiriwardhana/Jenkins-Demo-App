import React from 'react';
import { Link } from 'react-router-dom';
import NotesApp from './components/NotesApp';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <span className="navbar-brand mb-0 h1">Keep My Notes</span>
          <Link to="/add-note" className="btn btn-primary">
            +
          </Link>
        </div>
      </nav>
      <NotesApp />
    </div>
  );
};

export default App;
