import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';

const useTodoStore = create(
  persist(
    set => ({
      todos: [],
      selectedList: [],

      addTodo: text =>
        set(state => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false }],
        })),

      deleteTodo: id =>
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
          selectedList: state.selectedList.filter(item => item.id !== id),
        })),

      editTodo: (id, newText) =>
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo,
          ),
          selectedList: state.selectedList.map(item =>
            item.id === id ? { ...item, text: newText } : item,
          ),
        })),

      addToSelectedList: item =>
        set(state => {
          const alreadyExists = state.selectedList.some(
            todo => todo.id === item.id,
          );
          if (alreadyExists) return state;
          return {
            selectedList: [...state.selectedList, item],
          };
        }),

      removeFromSelectedList: id =>
        set(state => ({
          selectedList: state.selectedList.filter(item => item.id !== id),
        })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useTodoStore;
