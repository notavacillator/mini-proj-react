/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react"
import { useRef } from "react"
import Todo from "./TodoBoard";
import AddModal from "./AddModal";
import { useDrop } from "react-dnd";


const KanbanBoard = () => {
  const [todoList, setTodoList] = useState([]); 
  const [completed, setCompleted] = useState([]);

  const dialogRef = useRef(null)

  const openAddModal = () => {
    dialogRef.current.showModal(); 
  }

  const getTodosFromStorage = () => {
    const todos = localStorage.getItem("todos");
    if(todos){
      const todoListResult = JSON.parse(todos); 

      console.log("received todos from local storage", todoListResult)
      return todoListResult; 
    }
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompleted(item.id, item.title, item.desc),
    collect : (monitor) => ({
      isOver : !!monitor.isOver(), 
    })
  }))

  const addToCompleted = (id, title, desc) => {
    const moveTask = todoList.filter((todo) => id === todo.id)
    setCompleted((completed) => [...completed, {id, title, desc}])
  }
  
  useEffect(() => {
    const todos = getTodosFromStorage(); 
    if(todos !== null || todos !== undefined){
      setTodoList(todos); 
    }

  }, [])

  const reversedTodoList = todoList && todoList.slice().reverse();

  return (
    <>
      <div className="min-h-fit m-auto px-3 text-center bg-[#e7e7e7] mb-5">
        <h2 className="mt-[0.5rem] text-2xl font-semibold font-sans">
          2. Kanban style todo board.</h2>
        {/* Todo Add Modal */}
        <div className="mt-[2rem] flex gap-6 items-center">
            <p className="flex items-center align-middle leading-4">
              Click the button to add a todo &nbsp;
              <span className="inline-block animate-bounce-right">
                <svg className="w-[1rem] h-[1rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#000000"></path> </g></svg>
              </span>
            </p> 
            <button className="btn btn-sm btn-primary flex justify-center items-center text-base"
              onClick={openAddModal}>
              Add Todo
            </button>
            {/* Dialog Modal Popup */}
            <AddModal dialogRef={dialogRef} todoList={todoList} setTodoList={setTodoList}/>
           
        </div>

        {/* Todo Board  */}
        <div className="flex flex-row">
          <div className="text-left flex flex-col justify-start w-full">
            <h2 className="max-w-[25rem] w-1/2 ml-2 py-2 px-4 mt-4 text-xl font-semibold bg-gray-300 border border-black/5 rounded-sm ">
              To do : </h2>
            {
              reversedTodoList &&
                reversedTodoList.map((todo, index) => (
                  <Todo key={todo.id} id={todo.id} todo={todo} index ={index} todoList={todoList} setTodoList={setTodoList} />
                ))}
          </div>

          <div className="w-full" ref={drop}>
            <h2 className="max-w-[25rem] w-1/2 ml-2 py-2 px-4 mt-4 text-xl font-semibold bg-gray-300 border border-black/5 rounded-sm ">
              Completed : 
            </h2>
            {
              completed && 
                completed.map((todo) => (
                  <Todo key={todo.id} id={todo.id} todo={todo} todoList={todoList} setTodoList={setTodoList}/>
                ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default KanbanBoard