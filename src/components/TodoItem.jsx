import styled from 'styled-components';
import {
  CheckActiveIcon,
  CheckCircleIcon,
  CheckHoverIcon,
} from 'assets/images';
import { useRef } from 'react';

const StyledTaskItem = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0 12px;
  box-shadow: 0 17px 0 -16px #e5e5e5;
  flex-wrap: wrap;

  .task-item-body-input {
    user-select: none;
    display: none;
    flex: 1;
    padding: 8px 0px;
    border: 0;
    outline: 0;
    font-size: 1rem;

    &::placeholder {
      color: var(--gray);
      font-size: 13px;
    }
  }

  &:hover {
    background: #fff3eb;
    box-shadow: inset 0 0 0 1px #fff3eb;

    .task-item-action .btn-destroy {
      display: inline-flex;
    }
  }

  &.done {
    .task-item-body {
      color: var(--gray);
      text-decoration: line-through;
    }

    .icon-checked {
      background-image: url(${CheckActiveIcon});
    }
  }

  &.edit {
    .task-item-body-input {
      display: block;
    }
    .task-item-body-text {
      display: none;
    }
    .task-item-action {
      display: none;
    }
  }

  .task-item-checked {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .task-item-body {
    font-weight: 400;
    padding: 8px 12px;
    flex: 1;
    display: flex;
  }

  .task-item-action {
    .btn-destroy {
      display: none;
      font-size: 30px;
      transition: color 0.2s ease-out;
      font-weight: 300;
      &:after {
        content: '×';
      }
    }
  }

  .icon-checked {
    background-image: url(${CheckCircleIcon});
    background-position: center;
    background-repeat: no-repeat;

    &:hover {
      transition: background-image 0.5s;
      background-image: url(${CheckHoverIcon});
    }
  }
`;

const TodoItem = ({
  title,
  isDone,
  isEdit,
  onToggleDone,
  id,
  onChangeMode,
  onSave,
  onRemoveTodoItem,
}) => {
  const inputRef = useRef(null);
  const classIsDone = isDone ? 'done' : '';
  const classIsEdit = isEdit ? 'edit' : '';

  const handleToggle = () => {
    onToggleDone(id);
  };

  const handleEdit = () => {
    onChangeMode(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onChangeMode(id);
    }
    if (e.key === 'Enter') {
      onSave(id, inputRef.current.value);
    }
  };

  const handleRemoveTodoItem = () => {
    onRemoveTodoItem(id);
  };

  return (
    <StyledTaskItem className={`${classIsDone} ${classIsEdit}`}>
      <div className="task-item-checked">
        <span className="icon icon-checked" onClick={handleToggle} />
      </div>
      <div
        className="task-item-body"
        onDoubleClick={handleEdit}
        onKeyDown={handleKeyDown}
      >
        <span className="task-item-body-text">{title}</span>
        <input
          className="task-item-body-input"
          ref={inputRef}
          defaultValue={title}
        />
      </div>
      <div className="task-item-action ">
        <button
          className="btn-reset btn-destroy icon"
          onClick={handleRemoveTodoItem}
        ></button>
      </div>
    </StyledTaskItem>
  );
};

export default TodoItem;
