import { useState } from "react";
import { useMediaQuery } from "react-responsive";

interface TextInputProps {
  errorMessage?: string;
}

export function TextInput({
  errorMessage,
  ...props
}: TextInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div
        className={`w-[50%] h-14 border-[1px] rounded-md flex items-center px-3 ${
          errorMessage ? "mb-3 border-[#FF4C51]" : "mb-10"
        } ${
          isFocused
            ? "border-[#77ABA9] border-[2px]"
            : "border-[rgba(255,255,255, 1)]"
        } ${isMobile && 'w-full'}`}
      >
        <input
          placeholder="Nome do cliente"
          className={`w-full outline-none ${
            errorMessage && "placeholder:text-[#FF4C51]"
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
          type="text"
        />
      </div>
      {errorMessage && <h3 className="text-[#FF4C51] mb-5 text-start">{errorMessage}</h3>}
    </>
  );
}
