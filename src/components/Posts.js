import React, { useEffect, useState, useContext } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import { userContext } from '../App';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const userId = useContext(userContext)
  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then((response) => {
        const filteredPosts = response.filter((post) => post.userId === userId)
        setPosts(filteredPosts)
      })
    }
    fetchData();
  }, []);
  var newPosts = [...posts]

  const addPost = (title, body) => {
    try{
      if(!title || !body){
        var error = {}
            error.message='Fields cannot be empty'
            throw(error);
      }
    const userId=1;
    let post = {
      userId,
      title,
      body,
    }
    fetch("https://jsonplaceholder.typicode.com/posts",{
      method:"POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      if (posts.length!==0){
        var id = posts[posts.length-1]['id']+1;
      }
      else{
        id = 1;
      }
      const appendedResponse = {...response, id:id}
      newPosts = [...posts, appendedResponse]
      setPosts(newPosts)
      toast.success('Post added successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log(posts)
    })
  } catch(err){
    toast.error(err.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  }

  const deletePost = async index => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${index}`,{
        method:"DELETE"
      });
      console.log(response)
      let idx = newPosts.findIndex(post=>post.id===index);
      newPosts.splice(idx,1);
      setPosts(newPosts)
      toast.success('Post deleted successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch(err){
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const editPost = async (index, title, body) => {
    let idx = newPosts.findIndex(post=>post.id===index);
    if (newPosts[idx].title !== title || newPosts[idx].body !== body){
      try{
        newPosts[idx].title = title;
        newPosts[idx].body = body;
        await fetch("https://jsonplaceholder.typicode.com/posts/"+index,{
          method:"PUT",
          body:JSON.stringify(newPosts.idx),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(() => {
          setPosts(newPosts)
          toast.success('Post edited successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        })
      
      } catch(err){
        toast.error(err.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    }
  }

  return (
    <div className='posts-container'>
      <PostList posts={posts} deletePost={deletePost} editPost={editPost} />
      <PostForm addPost={addPost}/>
    </div>
  );
}

export default Posts;
