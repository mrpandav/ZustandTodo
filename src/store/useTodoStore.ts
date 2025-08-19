import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      selectedList: [],

      // Add a new todo
      addTodo: (text) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false }],
        })),

      // Delete a todo
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
          selectedList: state.selectedList.filter((item) => item.id !== id), // also remove from selected
        })),

      // Edit a todo
      editTodo: (id, newText) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          ),
          selectedList: state.selectedList.map((item) =>
            item.id === id ? { ...item, text: newText } : item
          ),
        })),

      // Add to selected list
      addToSelectedList: (item) =>
        set((state) => {
          const alreadyExists = state.selectedList.some((todo) => todo.id === item.id);
          if (alreadyExists) return state;
          return {
            selectedList: [...state.selectedList, item],
          };
        }),

      // Remove from selected list
      removeFromSelectedList: (id) =>
        set((state) => ({
          selectedList: state.selectedList.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useTodoStore;
