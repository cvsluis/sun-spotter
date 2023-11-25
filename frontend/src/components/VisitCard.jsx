import React from 'react'
import { Link } from 'react-router-dom';
import dateFormatter from '../utils/dateFormatter';

//import styles
import '../styles/VisitCard.scss'

export default function VisitCard({ visit, isProfilePage }) {
  
  const visitDate = new Date(visit.date);

  return (
    <Link to={`/visits/${visit.id}`} className='visitCard__container'>
      <div className='visitCard__image'>
        <img src={`http://localhost:8080/${visit.image_url}`} alt={visit.image_alt} />
      </div>
      <div className='visitCard__info'>
      {!isProfilePage && <img src={`http://localhost:8080/${visit.profile_pic}`} alt="profile" className="visitCard__profile" />}
        <div className='visitCard__details'>
          {/* visit card info looks different depending on where the card is called */}
          {isProfilePage ?
          <div className='visitCard__name'>
            {visit.name}
          </div>
          :
          <div className='visitCard__user'>
            {visit.first_name} {visit.last_name}
          </div>
          }
          
          {isProfilePage ?
          <div className='visitCard__date visitCard__date--profile'>{dateFormatter(visitDate)}</div>
          : 
          <div className='visitCard__date'>{dateFormatter(visitDate)}</div>
          }
        </div>
      </div>
    </Link>
    

  )

}