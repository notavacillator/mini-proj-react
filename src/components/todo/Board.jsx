/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect } from "react";

const Board = ({todoList, setTodoList}) => {
  useEffect(() => {
    console.log(todoList);
  

  }, [todoList])

  const handleDelete = (key) => {
    setTodoList((prevList) => {
      return prevList.filter((todo, index) => key !== index)
    })
  }
  
  return (
    <div className="flex flex-wrap gap-4">
      { 
          todoList.map((todo, index) => {
             return (
              <>
                <div className="relative border-black border-[0.12rem] flex-grow flex flex-col max-w-[25rem] min-w-[20rem] justify-between items-center gap-[2rem] p-5  min-h-[10rem] bg-yellow-200 mt-4">
                  <p className="font-mono pb-2" key = {index}>{todo}</p>  
                  <button className="absolute bottom-2 right-2 h-[2rem] w-[6rem] px-4 bg-yellow-400 rounded-xl hover:bg-orange-500" onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </>
             )
          })
      }
      {/* {
        todoList.map((todo, index) => (
            <p key={index}>
              {todo}
            </p>
        ))
      } */}
    </div>
  )
}

export default Board