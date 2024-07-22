import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const DescriptionWithToggle = ({ text }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="description">
      <p className={showFullDescription ? 'full-description' : 'limited-description'}>
        {text}
      </p>
      <span className="toggle-text" onClick={toggleDescription}>
      {showFullDescription ? <FontAwesomeIcon icon={faArrowUp} /> : '...'}
      </span>
      
    </div>
  );
};

export default DescriptionWithToggle;
