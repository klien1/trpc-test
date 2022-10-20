import { InputHTMLAttributes } from "react";

type FormInputType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input: React.FC<FormInputType> = ({ label, name, ...props }) => {
  return (
    <div className="flex justify-center items-center mb-6">
      <div className="">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor={name}
        >
          {label}
        </label>
      </div>
      <div className="">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500"
          id={name}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
