
import { useState,useCallback,useEffect,useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [length,setLength]= useState(8)
  const [numberAllowed,setNumberAllowed]= useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')
  const generatePassword = useCallback(()=>{
    let pass = ''
    let str ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numberAllowed) str+="0123456789"
    if(charAllowed) str +="!@#$%^&*()_+"
    for (let i = 0; i <length; i++) {
   const char = Math.floor(Math.random()*str.length+1)   
   pass+= str.charAt(char) 
    }
     
    setPassword(pass)

  },[length,numberAllowed,charAllowed,password])

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,charAllowed])
  console.log(password);

  const copyPasswordToClipboard=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    toast('🦄 Password Copied to clipboard',{

    });
      
  } 
  // latest updates
  const passwordRef = useRef(null)
  console.log(length);

  return (
    <div className='w-full max-w-md mx-auto shadow-md
     rounded-lg px-4 py-3 my-8 bg-gray-900 text-white '>
      <h1 className='text-white my-3 text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password}
      className='outline-none w-full py-1 px-3 text-gray-900' 
      placeholder='Password'
      readOnly
      ref={passwordRef}/>
      <button className='outline-none bg-blue-700 text-white px-3 pay-0.5 shrink-0' onClick={copyPasswordToClipboard}> copy</button>
      </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length} 
        name=''
        id=''
         className='cursor-pointer'
         onChange={(e)=>setLength(e.target.value)}/>
         <label htmlFor="lenght">length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        name=''
        id=''
        defaultChecked={charAllowed}
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }} />
         <label htmlFor="number">Numbers</label>
      </div> <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        name=''
        id=''
       
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }} />
         <label htmlFor="charaInput">Character</label>
      </div>
      <ToastContainer />
     </div>
     </div>
  )
}

export default App
