import React from "react";
import Link from "next/link";

type BaseButtonProps = {
  className?: string;
  children: React.ReactNode;
};

type ButtonProps =
  | (BaseButtonProps & {
      href: string;
    })
  | (BaseButtonProps &
      React.ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
      });

const Button: React.FC<ButtonProps> = (props) => {
  const { className, children } = props;

  const styles = `text-white font-bold py-2 px-4 ${className ?? ""}`;

  return (
    <div className="grid justify-start">
      {"href" in props && props.href ? (
        <Link href={props.href} className={styles}>
          {children}
        </Link>
      ) : (
        <button
          className={styles}
          {...props}
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;
