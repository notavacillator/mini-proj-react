/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PencilEditIcon from './PencilEditSvg';
import EditModal from './EditModal';
import { useRef } from 'react';
import Stopwatch from './Stopwatch';
import { useDrag } from 'react-dnd';

const Todo = ({todo, id, todoList, setTodoList, index}) => {
  const [{isDragging}, drag]= useDrag(() =>  ({
    type : "todo",
    item: {
      id: id, 
      title: todo.title,
      desc : todo.desc, 

    },
    collect: (monitor) => ({
      isDragging : !!monitor.isDragging(), 
    })
  }));

  const editDialogRef = useRef(null); 
  
  const {title, desc} = todo;
  
  const handleTaskDelete = () => {
    setTodoList((prevList) => {
      return prevList.filter((item) => {
        return item.id !== todo.id;
      })
    })
  }

  const openEditModal = () => {
    editDialogRef.current.showModal(); 
  }

  // const handleTaskDeleteOne = () => {
  //    setTodoList((prevList) => prevList.filter((item) => item.id !== todo.id));
  // };
  


  return (
    <div className="card border border-black/10 max-w-[25rem] bg-[#D1D1D1] text-neutral-content my-4" >
      <div className="p-[1rem] card-body" ref={drag}>
        <div className="flex justify-between">
          <h2 className="card-title break-all text-ellipsis overflow-clip line-clamp-3 hover:line-clamp-[5] hyphens-manual">{title}</h2>
          <div className="card-actions justify-end tooltip tooltip-top tooltip-neutral" data-tip="Edit">
            <button className="btn btn-ghost btn-sm" onClick={openEditModal}>
              <PencilEditIcon height={20} width={20} fillColor={"black"}/>
            </button>
            <EditModal id={id} editDialogRef={editDialogRef} todo={todo} title={title} desc={desc} todoList={todoList} setTodoList={setTodoList}/>
          </div>
        </div>
        <div className='flex break-words min-h-[3rem]'>
          <p className='line-clamp-6 hover:line-clamp-[20] hyphens-manual'>{desc}</p>
        </div>
        <Stopwatch/>
        <div className="card-actions justify-end"> 
          <button className="btn btn-sm hover:btn-error" onClick={handleTaskDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Todo