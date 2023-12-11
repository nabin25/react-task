import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { userContext } from '../App';

function Todos() {
    const userId = useContext(userContext)
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            fetch("https://jsonplaceholder.typicode.com/todos")
          .then(response => response.json())
          .then((response) => {
            const filteredTodos = response.filter((todo) => todo.userId === userId)
            setTodos(filteredTodos)
          })
        }
        fetchData();
      }, []);
      var newTodos = [...todos]

      const addTodo = (title) => {
       try{
        if(!title){
            var error = {}
            error.message='Fields cannot be empty'
            throw(error);
          }
        const userId=1;
        const completed=false;
        let todo = {
          userId,
          title,
          completed
        }
        fetch("https://jsonplaceholder.typicode.com/todos",{
          method:"POST",
          body: JSON.stringify(todo),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => response.json())
        .then((response) => {
          console.log(response)
          if (todos.length!==0){
            var id = todos[todos.length-1]['id']+1;
          }
          else{
            id = 1;
          }
          const appendedResponse = {...response, id:id}
          newTodos = [...todos, appendedResponse]
          setTodos(newTodos)
          toast.success('Todo added successfully', {
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

    const deleteTodo = async index => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`,{
            method:"DELETE"
          });
          console.log(response)
          let idx = newTodos.findIndex(todo=>todo.id===index);
          newTodos.splice(idx,1);
          setTodos(newTodos)
          toast.success('Todo deleted successfully', {
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

      const toggleCompleted = async (index) => {
        let idx = newTodos.findIndex(todo=>todo.id===index);
          try{
            newTodos[idx].completed = !newTodos[idx].completed ;
            await fetch("https://jsonplaceholder.typicode.com/todos/"+index,{
              method:"PUT",
              body:JSON.stringify(newTodos.idx),
              headers: {
                "Content-type": "application/json"
              }
            })
            .then(() => {
              setTodos(newTodos)
              var msg = ''
              newTodos[idx].completed===true?msg='Todo marked complete':msg='Todo marked incomplete'
              toast.success(msg, {
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

  return (
    <div className='posts-container'>
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
      <TodoForm addTodo={addTodo}/>
    </div>
  )
}

export default Todos