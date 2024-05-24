/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid'; // Import the v4 function for generating UUIDs

/* eslint-disable react/prop-types */
const EditModal = ({editDialogRef, title, desc, todo, id, todoList, setTodoList}) => {
    const [error, setError] = useState(false);
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDesc, setTodoDesc] = useState("");
    const textareaRef = useRef(null);

    const handleInputTitle = (e) => {
        setTodoTitle(e.target.value); 
        setError(false)
    }

    const handleUpdateTodo = (e) => {
        e.preventDefault(); 
        if(!todoTitle){
            setError(true)
            return; 
        }

        let taskIndex = todoList.indexOf(todo); 
        todoList.splice(taskIndex, 1); 

        let title = todoTitle.trim(); 
        let desc = todoDesc.trim(); 

        let updatedTodo = {
            id,
            title,
            desc,
        }

        setTodoList((prevList) => {
            return [...prevList, updatedTodo]
        })

        editDialogRef.current.close(); 
     }

    const handleModalClose = () => {
        if(error) setError(false)
    }

    const handleTextareaChange = (event) => {
        setTodoDesc(event.target.value);
    }

    useEffect(() => {
        setTodoTitle(title);
        setTodoDesc(desc)

    }, [title, desc])
    
    
  return (
    <>
        <dialog ref={editDialogRef} className="modal">
            <div className="p-0  modal-box overflow-y-auto overflow-x-auto flex flex-col min-h-[20rem]">
            <h4 className="text-2xl text-left ml-4 mt-4 font-semibold">Update task </h4>
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
                <div className="relative flex justify-end m-2">
                <button className="btn btn-primary text-base"
                    onClick={handleUpdateTodo} disabled={error}
                >Update Todo</button>
                </div>
            </form>
            </div>
        </dialog>
    </>
  )
}

export default EditModal