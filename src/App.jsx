import { useState } from "react";
import "./styles.css"

export default function App() {

  //HIERARCHY of REACT COMPONENTS: Hooks, Helper Functions or Code the parses data, Return that contains JSX

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) {
      return []
    }
    return JSON.parse(localValue)
  });


  //HOOKS CAN NOT BE RENDERED CONDITIONALLY (LOOPS) HAVE TO BE ON TOP OF FILE
  useEffect(() => {
    // run this function everytime object inside the array of second property changes, which we set to be the todos array
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    // crypto.randomUUID() is a build in method for the crypto module that generates a random ID in the format of: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx

    // currentTodos represents the current value for whatever the state is
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    });
  }
  // in react you cannot change the value of your state, because it is immutable
  // instead, you need to call setNewItem and pass a variable
  // it will update newItem to be whatever is passed, then rerender

  // setNewItem("sdfsfd"); means update
  // when you are calling setNewItem(), you are updating the state of the app, which causes it to rerender, and when it rerenders,
  // it starts from top to bottom, calling setNewItem, then rerendering itself because of this; leading to an infinite loop

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      // iterate through currentTodos array and create a new array (MAP IS USED TO ENSURE IMMUTABILITY)
      return currentTodos.map(todo => {
        // if the todo.id is the same as the one that we passed when we clicked on the checkbox and triggered the onChange function...
        if (todo.id === id) {
          // create a new object using the spread operator. the new object is a copy of the original todo with now an updated property
          // whatever the state of the object's completed property is, flip it when checkbox is clicked
          return { ...todo, completed }
        }
        return todo
      })
    })
  }


  function deleteTodo(id) {
    setTodos(currentTodos => {
      // for each item in todo array, leave out todos, in which id matches the one passed.
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  //setting states in react: todos is always equal to whatever value we rendered on the last render which is an empty array
  // when you call setTodos twice, todos is still an empty array so it takes an empty array and adds a new value to it
  // the second call to setTodos will overwrite all the ones before it. Solution: Pass a function to setTodos
  console.log(todos);

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}