import React from 'react';
import '../styles/Label.scss';

export default function Label({ name }) {
  return (
    <div className='label label__inactive'>
      {name}
    </div>
  );
};