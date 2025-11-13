import './App.css'
import React from 'react';
import { useNavigate } from '@tanstack/react-router';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleFindBooksClick = () => {
    navigate({ to: '/books' });
  };

  const handleAuthorsClick = () => {
    navigate({ to: '/authors' });
  };

  return (
    <>
      
      <div 
        className="hero-section"
      >
        
       
        <div className="hero-content">
            
           
            <div className="info-card">
                <h1>
                    Feed <br /> your mind
                </h1>
                <p>
                    Fuel your Imagination
                </p>
                
                
                <div className="button-group">
                    <button 
                      className="btn"
                      onClick={handleFindBooksClick}
                    >
                      Find Books
                    </button>
                    <button 
                      className="btn"
                      onClick={handleAuthorsClick}
                    >
                      Authors
                    </button>
                </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default App