import { createTodo, deleteTodo, getTodos, patchTodo } from 'api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const { isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const todoCount = todoList.length;

  useEffect(() => {
    const getTodoList = async () => {
      try {
        const todos = await getTodos();

        setTodoList(todos.map((todo) => ({ ...todo })));
      } catch (err) {
        console.error(err);
      }
    };
    getTodoList();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleAddNewTodo = async () => {
    if (newTodo.trim().length !== 0) {
      const newTodoItem = await createTodo({
        title: newTodo,
        isDone: false,
        isEdit: false,
      });

      setTodoList((prevTodoList) => [...prevTodoList, { ...newTodoItem }]);
    } else {
      return;
    }
  };

  const handleToggleTodoStatus = async (id) => {
    const currentTodo = todoList.find((todo) => todo.id === id);
    try {
      await patchTodo({ id, isDone: !currentTodo.isDone });

      const nextTodoList = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });

      setTodoList(nextTodoList);
    } catch (err) {
      console.error(err);
    }
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

  const handleSaveEdit = async (id, title) => {
    try {
      await patchTodo({ id, title });

      const nextTodoList = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title, isEdit: false };
        } else {
          return todo;
        }
      });
      setTodoList(nextTodoList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveTodoItem = async (id) => {
    try {
      await deleteTodo(id);
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);

      setTodoList(updatedTodoList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header username={currentMember?.name} />
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
