import React from 'react'
import { Link } from 'react-router-dom';
import dateFormatter from '../utils/dateFormatter';

//import styles
import '../styles/VisitCard.scss'

export default function VisitCard({ visit }) {

  const visitDate = new Date(visit.date);

  return (
    <Link to={`/`} className='visitCard__container'>
      <div className='visitCard__image'>
        <img src={`http://localhost:8080/${visit.image_url}`} alt={visit.image_alt} />
      </div>

      <div className='visitCard__info'>
        <div className='visitCard__icon'>
          icon
        </div>
        <div className='visitCard__details'>
          <div className='visitCard__user'>
            {visit.first_name} {visit.last_name}
          </div>
          <div className='visitCard__date'>
            {dateFormatter(visitDate)}
          </div>
        </div>
      </div>
    </Link>
    

  )

}