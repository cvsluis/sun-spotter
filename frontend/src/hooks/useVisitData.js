import { useState, useEffect } from 'react';

export default function useVisitData(visitId) {
  const [visitData, setVisitData] = useState({});

  useEffect(() => {
    const fetchVisit = async () => {
      const visit = await fetch(`http://localhost:8080/api/visits/${visitId}`);
      setVisitData(visit);
    }

    fetchVisit();
  }, []);

  return [visitData];
}