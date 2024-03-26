import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model/model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from '@hello-pangea/dnd'
// import { Draggable } from 'react-beautiful-dnd'
/**
 * i replace the 'react-beautiful-dnd' to '@hello-pangea/dnd' 
 * import { DragDropContext } from 'react-beautiful-dnd' --> import { DragDropContext } from '@hello-pangea/dnd'
 * bez when use 'react-beautiful-dnd' give me error when I drag the node"todo list" 
 * here the error
 * in brwser 
 * ""
 * ERROR
 *  Invariant failed: Cannot find droppable entry with id [TodosList]
 *  at handleError (http://localhost:3000/static/js/bundle.js:49887:58)
 *  at http://localhost:3000/static/js/bundle.js:49906:7
 * ""
 * in console
 * ""
 * react-beautiful-dnd.esm.js:39 react-beautiful-dnd
 * Invariant failed: Cannot find droppable entry with id [TodosList]
 * 👷‍ This is a development only message. It will be removed in production builds.
 * Show 1 more frame
 * ""
 * 
*/

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleCompleted = (id: number) => {
        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ))
        )
    }
    const handleDelet = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
    const handleEdit = (e:React.FormEvent, id: number) => {
        e.preventDefault()
        setTodos(todos.map((todo) => (
            todo.id === id? {...todo, todo: editTodo } : todo))
        )
        setEdit(false)
    }
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus()
    },[edit])

    return (
        <Draggable
            draggableId={todo.id.toString()}
            index={index}
        >
            {(provided, snapshot) => (
                <form 
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                    {edit ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className='todo__single--text'
                            />
                    ) : todo.isCompleted ? (
                        <s className="todos__single--text">{todo.todo}</s>
                    ) : (
                        <span className="todos__single--text">{todo.todo}</span>
                    )
                    }
                    <div>
                        <span
                            className="icon"
                            onClick={() => {
                                if (!edit && !todo.isCompleted) {
                                    setEdit(!edit)
                                }
                            }
                            }>
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelet(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleCompleted(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo
