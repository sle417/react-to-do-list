import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("");

    function handleSubmit(e) {
        // prevent page from refreshing when add button is clicked
        e.preventDefault();
        // the parameter of setTodos is an array
        if (newItem === "") {
            return
        }
        onSubmit(newItem)
        // clears the input box after add button is clicked.
        setNewItem("");
    }

    return (

        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    type="text"
                    id="item"></input>
            </div>
            <button className="btn">Add</button>
        </form>
    )
}