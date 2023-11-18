import React from 'react';
import '../styles/Label.scss';

export default function Label({ name, active }) {
  return (
    <div className={`label label__inactive ${active && 'label__active'}`}>
      {name}
    </div>
  );
};

Label.defaultProps = {
  name: 'Label Name Goes Here',
  active: false
};