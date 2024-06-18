import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [
            { id: uuidv4(), task: "Drink a coffee", completed: false, isEditing: false },
            { id: uuidv4(), task: "Walk the dog", completed: false, isEditing: false },
        ]
    },
    reducers: {
        addTodo( state, action ) {
            state.todos.push({
                id: uuidv4(),
                task: action.payload.value,
                completed: false,
                isEditing: false,
            })
        },
        deleteTodo( state, action ) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        editTodo(state, action) {
            const { id, task } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                if (task !== undefined) {
                    todo.task = task;
                    todo.isEditing = false;
                } else {
                    todo.isEditing = true;
                }
            }
        },
        toggleComplete(state, action) {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        clearAllTodos (state) {
            state.todos = []
        },

    }
})

export const { addTodo, deleteTodo, editTodo, toggleComplete, clearAllTodos } = todoSlice.actions;

export default todoSlice.reducer;