import React, { useRef } from 'react'
import "./styles.css"

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void
}

const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    
    return (
        <div>
            <form className='input' onSubmit={(e) => {
                handleAdd(e)
                inputRef.current?.blur()
            }}>
                <input
                    type="input"
                    placeholder='Enter a task'
                    className='input__box'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button className='input_submit' type='submit' >Go</button>
            </form>
        </div>
    )
}

export default InputFeild
