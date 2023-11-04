import React, { ButtonHTMLAttributes, FC } from "react";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <div>
      <button
        type="button"
        {...props}
        className="font-[500] text-buttonText bg-primary rounded-md py-2 px-4 max-sm:text-sm"
      >
        {children}
      </button>
    </div>
  );
};
