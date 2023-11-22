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
        <div className='one-visit__header--container'>

          <div className='one-visit__header--profile'>
            <div className='one-visit__header--image'>
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="#757575" class="bi " viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
            </div>

            <div>
              <h1>{visit.first_name} {visit.last_name}</h1>
              {/* <p>{visit.time_stamp}</p> */}
              <p>2 weeks ago</p>
            </div>
          </div>

          <h2>{visit.rating}</h2>
          <h3>{visit.description}</h3>

        </div>

        <div className='one-visit__comments--container'>

        </div>

      </div>
      
      <div className='one-visit__image--container'>
        <img src={`http://localhost:8080/${visit.image_url}`} />
      </div>

    </div>
  );
}
