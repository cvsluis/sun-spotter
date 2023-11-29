import { useState, useEffect } from 'react';

export default function useUserPins(userID) {

  const [userSaves, setUserSaves] = useState([]);
  const [userVisits, setUserVisits] = useState([]);

  useEffect(() => {
    let isUser = true;
    const fetchVisit = async () => {
      try {
        const saves = await fetch(`http://localhost:8080/api/users/${userID}/saves`).then(res => res.json());
        const visits = await fetch(`http://localhost:8080/api/users/${userID}/visits`).then(res => res.json());

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
  }, [userID]);

  return [userSaves, userVisits];
}