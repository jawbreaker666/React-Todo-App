import React from 'react';
import Todo from './Todo';
import { useState, useEffect } from 'react';
import { stringify } from 'postcss';





const TodoList = () => {

    const [opencount, countOpenTodos] = useState(0);

    const [todos, setTodos] = useState(()=>{
        const items = localStorage.getItem("items");
        const parsed = JSON.parse(items);
        return parsed || [];
    });

    const [textinput, settextinput] = useState("");

    const changeText = (e) => {
        settextinput(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        const newTodos = [...todos, {description: textinput, done:false}];
        setTodos(newTodos);
        settextinput("");


    }

    const countOpen = () => {
       const donetodos = todos.filter((item) => {
            return !item.done

        })
        countOpenTodos(donetodos.length)


    };

    const changeTodo = (index) => {
      
        const newTodos = [...todos];
        if(newTodos[index].done) {
            newTodos[index].done = false;
        } else {
            newTodos[index].done = true;
        }
        setTodos(newTodos);

    };

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);

    }

    useEffect(() => {
        countOpen();
        localStorage.setItem("items", JSON.stringify(todos));
    }, [todos]);

    


  return (
    <div className='shadow-sm hover:shadow-lg'>

        <div className='text-center bg-gray-900 text-white text-2xl py-3 font-semibold'>
            <h1 className='text-2xl'>Unsere Todos</h1>
            <h2 className='text-xs'>Offene Todos:{opencount}</h2>

            <form className="grid grid-cols-3 py-2">
                <input onChange={changeText} type="text"
                value={textinput}
                placeholder="Neues Todo..."
                className="col-span-2 py-2 text-gray-900"></input>

                <input onClick={submit}  type="submit"
                value="Add todo"
                className="col-span-1 text-white bg-gray-400 cursor-pointer"></input>
            </form>
        </div>
        

        {todos.map((item, index) =>{
            return <Todo
             description={item.description}
             done={item.done}
             key={index}
             index={index}
             onChangeTodo={changeTodo}
             onDeleteTodo={deleteTodo}
             ></Todo>

        } )}
     
        
    </div>
  )
}

export default TodoList