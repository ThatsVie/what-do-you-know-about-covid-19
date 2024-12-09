import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
