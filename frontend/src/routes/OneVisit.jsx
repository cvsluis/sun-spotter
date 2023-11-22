import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/OneVisit.scss';
import useVisitData from '../hooks/useVisitData';

export default function OneVisit() {

  const visitId = useParams().id;
  const [visitData] = useVisitData(visitId);

  return (
    <div className='one-visit__container'>
      <div className='one-visit__details--container'>
        {/* visit details */}
      </div>
      
      <div className='one-visit__image--container'>
        {/* image */}
      </div>

    </div>
  );
}
