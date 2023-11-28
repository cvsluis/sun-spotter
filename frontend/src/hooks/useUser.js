import { useState, useEffect } from 'react';

export default function useUser(userID) {

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetch(`http://localhost:8080/api/users/${userID}`).then(res => res.json());
        
        setUser(userData[0]);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchUser();
  }, []);

  return [user];
}