/* eslint-disable no-unused-vars */
// import Todo from './components/todo/Todo'
import './App.css'
import KanbanBoard from './components/kanban-board/KanbanBoard'
import Footer from './layout/Footer'

function App() {

  return (
    <>
      <div className='h-[90.6vh]'>
        <KanbanBoard/>
      </div>
      {/* <Footer/> */}
    </>
  )
}

export default App
