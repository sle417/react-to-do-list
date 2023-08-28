import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">

            {/*brackets within the return of a component is going to be run as JavaScript code and whatever it returns will be placed*/}

            {/*returning an array of elements need to have unique key in react */}

            {/* react needs to know the key of the top level component to know which to todo to change if theere are multiple rendered*/}
            {/* it is generally a bad idea to use the index of the array because deleted elements could cause bugs */}


            {todos.length === 0 && "No todos"}
            {todos.map(todo => {
                return (
                    <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
                );
            })}

            {/*{() => deleteTodo(todo.id)} is passing a function but {deleteTodo(todo.id)} is passing the result of calling deleteTodo.*/}
            {/* {deleteTOdo(todo.id)} will always run, so it doesn't behave like onClick should */}


        </ul>
    )
}