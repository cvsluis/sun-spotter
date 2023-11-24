import { useState, useEffect } from 'react';

export default function useVisitData(visitId) {
  const [visit, setVisit] = useState({});
  const [labels, setLabels] = useState([]);
  const [comments, setComments] = useState([]);

  const [addComment, setAddComment] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleCommentChange = (e) => {
    setAddComment(e.target.value);
  };

  const postComment = async (event) => {
    event.preventDefault();
    
    try {
      const res = await fetch(`http://localhost:8080/api/visits/${visitId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          description: addComment,
          user_id: 1
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      setAddComment('');
      setRefresh(!refresh);
    } catch (error) {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    }
  };

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
  }, [refresh]);

  return [visit, labels, comments, addComment, handleCommentChange, postComment];
}