import React from 'react';
import '../styles/Label.scss';

export default function Label({ label, active, handleLabelClick }) {
  return (
    <div className={`label ${handleLabelClick && 'label__hover'} ${active ? 'label__active' : 'label__inactive'}`} id={label.id} onClick={handleLabelClick}>
      {label.name}
    </div>
  );
};

Label.defaultProps = {
  name: 'Label Name Goes Here',
  active: false, 
  handleLabelClick: null
};