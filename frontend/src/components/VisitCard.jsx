import React from 'react'
import { Link } from 'react-router-dom';

export default function VisitCard({ visit }) {

  console.log(visit)
  
  return (
    <div className='visitCard__containter'>
      <div className='visitCard__image'>
        <img src={`http://localhost:8080/${visit.image_url}`} /> 
      </div>
    </div>
  )

}