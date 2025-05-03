import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Learning Platform</h1>
      <div className="button-container">
        <button 
          className="home-button add-button" 
          onClick={() => (window.location.href='/additem')}
        >
          Add Item
        </button>
        <button 
          className="home-button view-button" 
          onClick={() => (window.location.href='/allitem')}
        >
          All Items
        </button>

        <button 
          className="home-button view-button" 
          onClick={() => (window.location.href='/addComment')}
        >
          addComment
        </button>

        <button 
          className="home-button view-button" 
          onClick={() => (window.location.href='/comments')}
        >
          comments
        </button>
        



      </div>
    </div>
  );
}

export default Home;