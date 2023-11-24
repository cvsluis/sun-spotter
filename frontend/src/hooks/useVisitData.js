import { useState, useEffect } from 'react';

export default function useVisitData(visitId) {
  const [visit, setVisit] = useState({});
  const [labels, setLabels] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const visit = await fetch(`http://localhost:8080/api/visits/${visitId}`).then(res => res.json());
        const labelList = await fetch(`http://localhost:8080/api/visits/${visitId}/labels`).then(res => res.json());
        const commentList = await fetch(`http://localhost:8080/api/visits/${visitId}/comments`).then(res => res.json());

        setVisit(visit);
        setLabels(labelList);
        setComments(commentList);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchVisit();
  }, []);

  return [visit, labels, comments];
}