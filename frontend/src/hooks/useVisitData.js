import { useState, useEffect } from 'react';

export default function useVisitData(visitId) {
  const [visit, setVisit] = useState({});

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const visit = await fetch(`http://localhost:8080/api/visits/${visitId}`).then(res => res.json());
        setVisit(visit);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchVisit();
  }, []);

  return [visit];
}