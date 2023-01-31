import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
    isEdit: false,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
    isEdit: false,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
    isEdit: false,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
    isEdit: false,
  },
];

const TodoPage = () => {
  const [todoList, setTodoList] = useState(dummyTodos);
  const [newTodo, setNewTodo] = useState('');
  const todoCount = todoList.length;

  const handleAddNewTodo = () => {
    if (newTodo.trim().length !== 0) {
      const newTodoItem = {
        title: newTodo,
        isDone: false,
        id: todoList.length + 1,
      };

      setTodoList((prevTodoList) => [...prevTodoList, newTodoItem]);
    } else {
      return;
    }
  };

  const handleToggleTodoStatus = (id) => {
    const nextTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });

    setTodoList(nextTodoList);
  };

  const handleChangeMode = (id) => {
    const nextTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEdit: !todo.isEdit };
      } else {
        return todo;
      }
    });

    setTodoList(nextTodoList);
  };
  const handleSaveEdit = (id, title) => {
    const nextTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title, isEdit: false };
      } else {
        return todo;
      }
    });
    setTodoList(nextTodoList);
  };

  const handleRemoveTodoItem = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);

    setTodoList(updatedTodoList);
  };

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        onSetNewTodoValue={setNewTodo}
        newTodoInputValue={newTodo}
        onAddNewTodo={handleAddNewTodo}
      />
      <TodoCollection
        todoList={todoList}
        onToggleTodoStatus={handleToggleTodoStatus}
        onChangeMode={handleChangeMode}
        onSaveEdit={handleSaveEdit}
        onRemoveTodoItem={handleRemoveTodoItem}
      />
      <Footer count={todoCount} />
    </div>
  );
};

export default TodoPage;
