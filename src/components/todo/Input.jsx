/* eslint-disable react/prop-types */

import { useState } from "react";

const Input = ({setTodoList}) => {
    const [todo, setTodo] = useState(""); 

    const handleTodoInput = (e) => { 
        setTodo(e.target.value);
    }
    
    const handleAddTodo = (e) => {
        e.preventDefault(); 
        if(todo.trim()){
            setTodoList((prevList) => [...prevList, todo]); 
            setTodo(""); 
        }

    }
    
    // console.log(todo);
  return (
    <div className="flex justify-center p-[1rem] gap-4">
        <form onSubmit={handleAddTodo}>
            <input className = "border rounded-md w-[30rem] h-[3rem] p-3 mr-3" type="text" value = {todo} onChange={handleTodoInput} placeholder="Enter your todo..."/>
            <button className="h-[3rem] bg-[#e9bf88] px-2 hover:bg-gray-300 rounded-md" type="submit">Add Todo</button>
        </form>
    </div>
  )
}

export default Input