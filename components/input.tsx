import {  UseFormRegisterReturn } from "react-hook-form";


export enum InputKind{
  text,
  phone,
  price
}

interface InputProps {
  label: string;
  name: string;
  kind?: InputKind;
  type:string;
  register:UseFormRegisterReturn;
  required:boolean;
}

export default function Input({
  label,
  name,
  kind = InputKind.text,
  required,
  register,
  type,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === InputKind.text ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}
      {kind === InputKind.price ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
           type={type}
            id={name}
            required={required}
            {...register}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>
      ) : null}
      {kind ===InputKind.phone ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
           type={type}
            id={name}
            required={required}
            {...register}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}
    </div>
  );
}
