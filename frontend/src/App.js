import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNotePage from './components/AddNotePage';
import HomePage from './components/HomePage';


function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/add-note" element={<AddNotePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
