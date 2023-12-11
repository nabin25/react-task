import React, { useState } from 'react';
import Comments from './Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faComments, faTimes} from '@fortawesome/free-solid-svg-icons';


function Post({ post, deletePost, editPost, toggleComments, isCommentsOpen }) {
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const openEditPopup = () => {
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditPopupOpen(false);
  };

  const delPost = () => {
    deletePost(post.id);
  };

  const saveEditedPost = () => {
    editPost(post.id, editedTitle, editedBody);
    closeEditPopup();
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div className="post-actions">
        <button onClick={openEditPopup}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button onClick={toggleComments}>
          <FontAwesomeIcon icon={faComments} />
        </button>
        <button onClick={delPost}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {isEditPopupOpen && (
  <div className="popup-overlay">
    <div className="edit-popup">
      <FontAwesomeIcon
        icon={faTimes}
        className="close-icon"
        onClick={closeEditPopup}
      />
      <h2>Edit Post</h2>
      <label><b>Title</b></label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <label><b>Body</b></label>
      <textarea
        value={editedBody}
        onChange={(e) => setEditedBody(e.target.value)}
      />
      <button onClick={saveEditedPost}>Save</button>
    </div>
  </div>
)}

      {isCommentsOpen && (
        <div className="comments-section">
          <Comments postId={post.id} />
        </div>
      )}
    </div>
  );
}

export default Post;
