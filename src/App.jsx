import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (char) str += "!@#$%^&*(){}[]|?/~-_"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)

  }, [length, number, char])
  const copyPasswordToClipboard = useCallback(() => { passwordRef.current?.select(); passwordRef.current?.setSelectionRange(0, 999); window.navigator.clipboard.writeText(password) }, [password])
  useEffect(() => { passGen() }, [length, number, char, passGen])
  return (
    <>
      <h1 className="text-4xl text-center text-white">Random Password Generator</h1>
      <div className="w-full max-w-md mx-auto rounded-lg my-8 px-4 py-4 text-blue-100 bg-slate-700">
        <div className="flex shadow rounded-xl overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="password" readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-800 text-white px-3" >Copy</button>
        </div>
        <div className="flex gap-x-2">
          <div className="flex gap-x-1 items-center">
            <input type="range" min={8} max={25} value={length} className="cursor-pointer" onChange={(e) => { setLength(e.target.value) }} /> <label>Length: {length}</label>
          </div>
          <div className="flex gap-x-2">
            <label>Number</label><input type="checkbox" defaultChecked={number} onChange={() => setNumber((prev) => !prev)} />
            <label>Special Char</label><input type="checkbox" defaultChecked={char} onChange={() => setChar((prev) => !prev)} />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
