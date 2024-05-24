/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid'; // Import the v4 function for generating UUIDs

const AddModal = ({dialogRef, todoList, setTodoList}) => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDesc, setTodoDesc] = useState("");
    const [error, setError] = useState(false);
  
    const textareaRef = useRef(null);
    
    const handleInputTitle = (e) => {
        setTodoTitle(e.target.value); 
        setError(false)
    }

    const handleAddTodo = (e) => {
        e.preventDefault(); 
        if(!todoTitle){
            setError(true)
            return; 
        }
        if(todoTitle){
            let title = todoTitle.trim(); 
            let desc = todoDesc.trim(); 
            let id = uuid(); 

            let todo = {
                id,
                title,
                desc,
            }

            setTodoList(prevList => (prevList ? [...prevList, todo] : [todo]));
            console.log(todoList);
            // addTodosInStorage(todoList); 
            setTodoTitle("");
            setTodoDesc(""); 
        }
        else { 
            setError(true); 
        }

            dialogRef.current.close(); 
    }

    useEffect(() => {
        const newTodoList = todoList
        console.log(newTodoList)
        if (todoList && todoList.length > 0) {
            addTodosInStorage(todoList);
        }
  
    }, [todoList])
    
    const addTodosInStorage = (todos) => {
        // receives the updated todos list 
        console.log("Storage ", todos);
        localStorage.setItem("todos", JSON.stringify(todos)); 
    }

    const handleModalClose = () => {
        setTodoTitle("");
        setTodoDesc(""); 
        if(error) setError(false)
    }

    const handleTextareaChange = (event) => {
        setTodoDesc(event.target.value);
    }
    
  return (
    <>
        <dialog ref={dialogRef} className="modal">
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
        </dialog>

    </>
  )
}

export default AddModal