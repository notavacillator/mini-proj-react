/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react"
import { useRef } from "react"
import Todo from "./TodoBoard";
import AddModal from "./AddModal";

const KanbanBoard = () => {
  const [todoList, setTodoList] = useState([]); 

  const dialogRef = useRef(null)

  const openAddModal = () => {
    dialogRef.current.showModal(); 
  }

  const getTodosFromStorage = () => {
    const todos = localStorage.getItem("todos");
    const todoListResult = JSON.parse(todos); 
    console.log("received todos from local storage", todoListResult)
    return todoListResult; 
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
            {/* <dialog ref={dialogRef} className="modal">
              <div className="p-0  modal-box overflow-y-auto overflow-x-auto flex flex-col min-h-[20rem]">
                <h4 className="text-2xl text-left ml-4 mt-4 font-semibold">Add new task </h4>
                <div className="mt-0 modal-action ">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-[1rem] top-[1rem]" onClick={handleModalClose}>✕</button>
                  </form>
                </div>
                <div className="border-t border-black/20 py-[1rem] flex flex-col justify-evenly gap-4 mt-2 min-h-[20rem]">
                  <div className="flex flex-col">  
                    <label className="uppercase text-sm text-left ml-[2rem] mb-1 tracking-tight font-semibold" htmlFor="todo-title">Task Name : </label>
                    <input
                      className="mx-auto w-full input input-neutral sm:input-bordered input-md max-w-[90%] bg-slate-200"
                      type="text"
                      name="todo-title"
                      id="todo-title"
                      placeholder="Add Todo Title"
                      value={todoTitle}
                      onChange={handleInputTitle}
                      required
                    />
                    {error && (
                      <p className="text-error pt-2">Please enter a title for the todo.</p>
                    )}
                </div>

                  <div className="flex flex-col">
                    <label className="uppercase text-sm text-left ml-[2rem] mb-1 tracking-tight font-semibold" htmlFor="todo-desc">Task Description : </label>
                    <textarea className="mx-auto textarea textarea-neutral sm:textarea-bordered textarea-md w-full max-w-[90%] max-h-[80%] bg-slate-200" 
                    placeholder="Enter Todo Description" rows={4} id="todo-desc"
                    value={todoDesc} onChange={handleTextareaChange} ref={textareaRef}/>
                  </div>
                </div>
                <form method="dialog">
                  <div className=" py-[0.2rem] relative flex justify-end m-2">
                    <button className="btn btn-primary "
                      onClick={handleAddTodo} disabled={error}
                    >Add Todo</button>
                  </div>
                </form>
              </div>
            </dialog> */}
        </div>

        {/* Todo Board  */}
        <div className="text-left flex flex-col justify-start">
        {reversedTodoList &&
          reversedTodoList.map((todo) => (
            <Todo key={todo.id} id={todo.id} todo={todo} todoList={todoList} setTodoList={setTodoList} />
          ))}
        </div>
      </div>
    </>
  )
}

export default KanbanBoard