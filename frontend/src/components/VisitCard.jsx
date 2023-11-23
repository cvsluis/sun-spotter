import React from 'react'
import { Link } from 'react-router-dom';
import dateFormatter from '../utils/dateFormatter';

//import styles
import '../styles/VisitCard.scss'

export default function VisitCard({ visit, isProfilePage }) {
  
  const visitDate = new Date(visit.date);

  return (
    <Link to={`/home`} className='visitCard__container'>
      <div className='visitCard__image'>
        <img src={`http://localhost:8080/${visit.image_url}`} alt={visit.image_alt} />
      </div>
      <div className='visitCard__info'>
      {!isProfilePage && 
        <div className='visitCard__icon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#757575" class="bi bi-person-circle " viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </div> 
      }
        <div className='visitCard__details'>
          {/* visit card info looks different depending on where the card is called */}
          {isProfilePage ?
          <div className='visitCard__user visitCard__user--profile'>
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