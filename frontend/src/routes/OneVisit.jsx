import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/OneVisit.scss';
import useVisitData from '../hooks/useVisitData';

export default function OneVisit() {

  const visitId = useParams().id;
  const [visit] = useVisitData(visitId);

  return (
    <div className='one-visit__container'>
      <div className='one-visit__details--container'>
        {visit.user_id}
      </div>
      
      <div className='one-visit__image--container'>
        <img src={`http://localhost:8080/${visit.image_url}`} />
      </div>

    </div>
  );
}
