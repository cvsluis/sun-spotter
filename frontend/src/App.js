
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/spots" element={<div>A page to see all spots! Rendered with React Router </div>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
