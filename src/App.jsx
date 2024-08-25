import './App.css'
import CourseForm from './home/CourseForm'
import CourseList from './list/CourseList'
import ListInstance from './year/ListInstance'


function App() {

  return (
      <div className='flex-1'>
        <CourseForm/> 
        <CourseList/>
        <ListInstance/>
      </div>
  )
}

export default App
