import React, { useState, useEffect, useContext } from 'react';

const ToggleMenu = () => {
  const [open, setOpen] = useState(false);

  // monitor the state of the toggle
  // add/remove click event handler to the document
  useEffect(() => {
    const clickHandler = ({ target }) => {
      const container = document.getElementById(`root`);
      if (container.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('click', clickHandler);

    // these functions clean up the event listeners
    return () => document.removeEventListener('click', clickHandler);
  });

  // same but for keypresses
  // if the esc key is pressed close the toggles
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode !== 27) return;
      setOpen(false);
    };
    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div
      className="container about-container"
      style={{
        paddingTop: '9.4rem',
        display: 'block'
      }}
    >
      <section id="about-masthead" className="about-hero">
        <div className="row">
          <div className="about-hero__text">
            <button
              type="button"
              aria-expanded={open === true ? 'true' : 'false'}
              className={open === true ? 'active' : ''}
              onClick={() => setOpen(!open)}
            >
              Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToggleMenu;
