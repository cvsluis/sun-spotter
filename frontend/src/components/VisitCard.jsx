import React from 'react'
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import dateFormatter from '../utils/dateFormatter';

//import styles
import '../styles/VisitCard.scss'

export default function VisitCard({ visit, isProfilePage }) {
  
  //if visit less or equal to one month ago, display timeago. otherwise display date
  const visitDate = new Date(visit.date);
  const isVisitOld = (Date.now() - visitDate) > 2628000000;


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
          <h2 className='visitCard__user'>
            {visit.first_name} {visit.last_name}
          </h2>
          }
          
          {isProfilePage ?
          <h3 className='visitCard__date visitCard__date--profile'>{isVisitOld ? dateFormatter(visitDate) :<TimeAgo date={visitDate}/>}</h3>
          : 
          <h3 className='visitCard__date'>{isVisitOld ? dateFormatter(visitDate) :<TimeAgo date={visitDate}/>}</h3>
          }
        </div>
      </div>
    </Link>
    

  )

}