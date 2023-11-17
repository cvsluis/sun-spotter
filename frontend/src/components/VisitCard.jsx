import React from 'react'
import { Link } from 'react-router-dom';

//import styles
import '../styles/VisitCard.scss'

export default function VisitCard({ visit }) {

  console.log(visit.date, typeof(visit.date));

  
  return (
    <div className='visitCard__containter'>
      <div className='visitCard__image'>
        <img src={`http://localhost:8080/${visit.image_url}`} /> 
      </div>

      <div className='visitCard_details'>
        <div className='visitCard__icon'>
          icon
        </div>
        <div className='visitCard__details'>
          {visit.first_name} {visit.last_name}
        </div>
      </div>
    </div>
  )

}