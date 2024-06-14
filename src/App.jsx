
import './App.css'
import { router } from './router.jsx'
import {RouterProvider} from "react-router-dom"
function App(props) {
 
  return (
    <>
     <div className='app'>
      <RouterProvider router={router}/>
     </div>
    </>
  )
}

export default App
