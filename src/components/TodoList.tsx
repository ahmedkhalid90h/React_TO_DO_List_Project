import React from 'react'
import { Todo } from '../model/model'
import SingleTodo from './SingleTodo'
import './styles.css'
import { Droppable } from '@hello-pangea/dnd'
// import { Droppable } from 'react-beautiful-dnd'
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
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodo: Todo[];
    setCompletedTodo: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodo, setCompletedTodo }) => {
    return (
        <div className="container">
            <Droppable droppableId='TodosList'>
                {(provided) => (
                        <div
                            className={`todos`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Active Tasks
                            </span>
                            {todos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    todos={todos}
                                    key={todo.id}
                                    setTodos={setTodos} />
                            ))}
                            {provided.placeholder}
                        </div>
                )}
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {(provided, snapshot) => (
                        <div
                            className={`todos remove ${snapshot.isDraggingOver  ? "dragcomplete" : ""}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                            Completed Tasks
                            </span>
                            {completedTodo.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    todos={completedTodo}
                                    key={todo.id}
                                    setTodos={setCompletedTodo} />
                            ))}
                        {provided.placeholder}
                        </div>
                )}
                
            </Droppable>
        </div>
    )
}

export default TodoList
