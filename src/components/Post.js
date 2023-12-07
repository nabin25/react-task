import React from 'react'

function Post(props) {
    const { post } = props;

  return (
    <div>
        <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </li>
    </div>
  )
}

export default Post