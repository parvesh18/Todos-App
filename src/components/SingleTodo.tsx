import { Todo } from "../model";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditChecker = () => {
    if (!edit && !todo.isDone) setEdit(!edit);
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );

    setEdit(false);
  };

  //  useEffect Hook
  useEffect(() => {
    inputRef.current?.focus();
  });

  //  edit-todo-input
  const edit_todo_input = (
    <input
      ref={inputRef}
      type="text"
      className="px-3 py-1 rounded-sm outline-none font-normal"
      onChange={(e) => setEditTodo(e.target.value)}
      value={editTodo}
    />
  );

  // todo-name
  const todo_text = todo.isDone ? (
    <span className="line-through text-gray-500">{todo.todo}</span>
  ) : (
    <span>{todo.todo}</span>
  );

  return (
    <form
      className="flex justify-between gap-x-10 my-4 border-2 border-black rounded-sm p-2 px-2 select-none"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      <div className="text-lg font-semibold ">
        {edit ? edit_todo_input : todo_text}
      </div>
      <div className="flex items-center justify-center text-xl gap-x-1">
        <span
          className="cursor-pointer active:scale-90"
          onClick={handleEditChecker}
        >
          <FaEdit />
        </span>
        <span
          className="cursor-pointer active:scale-90"
          onClick={() => handleDelete(todo.id)}
        >
          <MdDelete />
        </span>
        <span
          className="cursor-pointer active:scale-90"
          onClick={() => handleDone(todo.id)}
        >
          <FaCheckCircle />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
