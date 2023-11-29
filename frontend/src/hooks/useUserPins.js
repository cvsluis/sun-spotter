import { useState, useEffect } from 'react';

export default function useUserPins(userId) {

  const [userSaves, setUserSaves] = useState([]);
  const [userVisits, setUserVisits] = useState([]);

  useEffect(() => {
    let isUser = true;
    const fetchVisit = async () => {
      try {
        const saves = await fetch(`http://localhost:8080/api/users/${userId}/saves`).then(res => res.json());
        const visits = await fetch(`http://localhost:8080/api/users/${userId}/visits`).then(res => res.json());

        setUserSaves(saves);
        setUserVisits(visits);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchVisit();

      // Cleanup function
    return () => {
      isUser = false;  
    };
  }, [userId]);

  return [userSaves, userVisits];
}