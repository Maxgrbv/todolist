import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [
            { id: uuidv4(), task: "Drink a coffee", completed: false, isEditing: false },
            { id: uuidv4(), task: "Walk the dog", completed: false, isEditing: false },
        ],
        filterButtons: {
            all: true,
            done: false,
            undone: false,
        },
        filter: "all",
        searchText: "",
    },
    reducers: {
        setSearchText(state, action) {
            state.searchText = action.payload.search;
        },
        addTodo(state, action) {
            state.todos.push({
                id: uuidv4(),
                task: action.payload.value,
                completed: false,
                isEditing: false,
            });
        },
        deleteTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
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
        clearAllTodos(state) {
            state.todos = [];
        },
        setFilters(state, action) {
            const { filter } = action.payload.filterData;
            state.filterButtons.all = filter === "all";
            state.filterButtons.done = filter === "done";
            state.filterButtons.undone = filter === "undone";
        },

        setFilter(state, action) {
            state.filter = action.payload.filterData;
        }
    }
});

export const { setSearchText, addTodo, deleteTodo, editTodo, toggleComplete, clearAllTodos, setFilters, setFilter } = todoSlice.actions;

export default todoSlice.reducer;
