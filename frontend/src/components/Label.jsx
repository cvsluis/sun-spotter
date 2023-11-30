import React from 'react';
import '../styles/Label.scss';

export default function Label({ label, active, handleLabelClick, lightorange, labelCount }) {
  return (
    <div className={`label ${handleLabelClick && 'label__hover'} ${lightorange && 'label__lightorange'} ${active ? 'label__active' : 'label__inactive'}`} id={label.id} onClick={handleLabelClick}>
      {label.name} {labelCount === '' ? '' : '(' + labelCount + ')'}
    </div>
  );
};

Label.defaultProps = {
  name: 'Label Name Goes Here',
  active: false, 
  handleLabelClick: null,
  lightorange: false,
  labelCount: ''
};