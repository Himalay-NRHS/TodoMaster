import { useState } from 'react'
import AuthForm from './authform'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
 <AuthForm/>
   </div>
    </>
  )
}

export default App
