type TextAreaProps = {
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ label, className = "", ...props }: TextAreaProps) => {
  return (
    <div className="mb-5">
      <label className="block text-md font-bold mb-1">
        {label}
      </label>
      <textarea {...props}  className={`border-gray-400 border w-full py-2 px-3 h-40 leading-tight focus:outline-none focus:shadow-outline ${className}`}></textarea>
    </div>
  );
};
export default TextArea;
