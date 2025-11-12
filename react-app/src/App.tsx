import './App.css'
import React from 'react';


const App: React.FC = () => {
  return (
        <>
      {/* This div is our main background and container.
        We use a mix of Tailwind classes and an inline 'style' tag.
        The inline style is the cleanest way to set a specific background image URL.
      */}
      <div 
        className="hero-section"
      >
        
        {/* This div centers the content.
          - 'min-h-screen': Ensures it's at least the full height of the screen.
          - 'flex items-center': Vertically centers the card.
          - 'justify-start pl-16': Aligns the card to the left with padding.
          - 'md:justify-center md:pl-0': On medium-sized screens and up (like mobile), it centers the card and removes the padding.
        */}
        <div className="hero-content">
            
            {/* This is the info card.
              - 'max-w-md w-full': This makes it "scalable". It has a max-width, but 'w-full' lets it shrink on smaller screens.
              - 'p-12 md:p-10': Responsive padding.
              - 'rounded-[30px]': Note the brackets for custom values.
            */}
            <div className="info-card">
                <h1>
                    Feed <br /> your mind
                </h1>
                <p>
                    Fuel your Imagination
                </p>
                
                {/* This div holds our buttons.
                  - 'flex gap-4': Puts buttons in a row with spacing.
                  - 'md:flex-col': On mobile, it stacks them in a column.
                */}
                <div className="button-group">
                    <button className="btn">
                      Find Books
                    </button>
                    <button className="btn">
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
