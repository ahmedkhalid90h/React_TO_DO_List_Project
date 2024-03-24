import React, { useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import TodoList from './components/TodoList';
import { Todo } from './model/model';
import { DragDropContext } from '@hello-pangea/dnd';
// import { DragDropContext } from 'react-beautiful-dnd';
/**
 * i replace the 'react-beautiful-dnd' to '@hello-pangea/dnd' 
 * import { DragDropContext } from 'react-beautiful-dnd' --> import { DragDropContext } from '@hello-pangea/dnd'
 * bez when use 'react-beautiful-dnd' give me error when I drag the node"todo list" 
 * here the error
 * in brwser 
 * ""
 * view
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

const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isCompleted: false }]);
      setTodo("");
    }
  };
  console.log(todos)
  
  return (
      <DragDropContext onDragEnd={() => {}}>
        <div className="App">
          <span className="heading">tasks</span>
          <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList 
            todos={todos} 
            setTodos={setTodos}
            completedTodo={completedTodo}
            setCompletedTodo={setCompletedTodo}
          />
          
        </div>
      </DragDropContext>
  );
}

export default App;