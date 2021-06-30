 import React from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import { useState } from 'react';
import { useEffect } from 'react';
 

function App() {
  
  //STATE
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState ("all");
  const [filteredTodos, setFilteredTodos] =useState([]);


  // Run once
  useEffect (() => {
    getLocalTodos();
  },[])
  //USE EFFECT
  useEffect (() => {
    filteredhandler()
  }, [todos,status])

//FUNCTIONS
const filteredhandler = () => {
  switch(status) {
    case "completed":
      setFilteredTodos(todos.filter((todo) => todo.completed === true));
      break;
    case "uncompleted":
      setFilteredTodos(todos.filter((todo) => todo.completed === false));
      break;
    default:
      setFilteredTodos(todos);
      break;
  }
};
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }else {
     let todoLocal = JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
      <h1>Todo List </h1>
      </header>
      <Form inputText={inputText} todos= {todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos = {filteredTodos}/>
    </div>
  );
} 

export default App;
