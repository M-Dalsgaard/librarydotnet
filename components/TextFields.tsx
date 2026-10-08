type TextFieldProps = {
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextFields = ({ label, className = "", ...props }: TextFieldProps) => {
  return (
    <div className="mb-5">

      <label className="block  text-md font-bold mb-1">
        {label}
      </label>

      <input
        {...props}

        className={`shadow border-gray-400 border w-full py-2 px-3 

         leading-tight focus:outline-none focus:shadow-outline ${className}`}/>
        
    </div>
  );
};
export default TextFields;
