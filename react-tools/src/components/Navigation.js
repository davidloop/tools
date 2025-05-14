import React from 'react';

function Navigation({ tools, activeTool, setActiveTool }) {
  return (
    <div className="tool-nav">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            {tools.map(tool => (
              <button
                key={tool.id}
                className={`nav-button btn ${activeTool === tool.id ? 'active' : ''}`}
                onClick={() => setActiveTool(tool.id)}
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
