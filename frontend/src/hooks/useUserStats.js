import { useState, useEffect } from "react";

export default function useUserStats(userID) {
  const [totalSaves, setTotalSaves] = useState();
  const [totalVisits, setTotalVisits] = useState();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const saveCount = await fetch(
          `http://localhost:8080/api/saves/totalSaves/${userID}`
        ).then((res) => res.json());
        const visitCount = await fetch(
          `http://localhost:8080/api/visits/totalVisits/${userID}`
        ).then((res) => res.json());

        setTotalSaves(saveCount.total);
        setTotalVisits(visitCount.total);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchCounts();
  }, [userID]);

  return [totalSaves, totalVisits];
}
