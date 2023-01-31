import TodoItem from './TodoItem';

const TodoCollection = ({
  todoList,
  onToggleTodoStatus,
  onChangeMode,
  onSaveEdit,
  onRemoveTodoItem,
}) => {
  return (
    <div>
      TodoCollection
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isDone={todo.isDone}
          isEdit={todo.isEdit}
          onToggleDone={onToggleTodoStatus}
          onChangeMode={onChangeMode}
          onSave={onSaveEdit}
          onRemoveTodoItem={onRemoveTodoItem}
        />
      ))}
    </div>
  );
};

export default TodoCollection;
