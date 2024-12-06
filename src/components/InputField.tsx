import { useEffect, useRef } from "react";
import { MdArrowCircleRight } from "react-icons/md";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
      className="flex justify-center mt-10 relative w-4/12 select-none"
    >
      <input
        ref={inputRef}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full outline-none h-14 rounded-full text-xl px-6 shadow-lg placeholder:italic placeholder:font-semibold"
        placeholder="Enter a task"
      />
      <button type="submit" className="absolute right-2 top-1">
        <MdArrowCircleRight className="text-5xl text-blue-500 active:scale-90 shadow-md rounded-full" />
      </button>
    </form>
  );
};

export default InputField;

// const InputField = ({ todo, setTodo }:Props) => { -> one more way
