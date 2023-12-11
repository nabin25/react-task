import React, { useEffect, useState } from 'react';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchData = () => {
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
          .then(response => response.json())
          .then((response) => {
            setComments(response)
          })
        }
        fetchData();
      }, []);
  return (
    <div className="comments-section">
      <p>Related Comments for post</p>
      {comments.map(comment => (
        <>
        <h4>{comment.name}</h4>
        <h5>{comment.body}</h5>
        </>
      ))}
    </div>
  );
}

export default Comments;
