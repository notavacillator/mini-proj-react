import { useState } from "react"
import Board from "./Board"
import Input from "./Input"
import { useEffect } from "react";

const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    
    useEffect(() => {
      
      console.log(todoList);  
    
      return () => {
        
      }
    }, [todoList])
    
  return (
    <>
      <div className="h-15rem">
        <Input setTodoList={setTodoList}/>
        <Board todoList={todoList} setTodoList={setTodoList}/>
      </div>
    </>
  )
}

export default Todo