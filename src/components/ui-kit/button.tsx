import { FC } from 'react';
import clsx from 'clsx';

export enum ButtonStyleEnum {
  PRIMARY = 'PRIMARY',
  BLUE = 'BLUE',
  RED = 'RED',
  ORANGE = 'ORANGE',
}

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /**
   * btnStyle button
   */
  btnStyle?: keyof typeof ButtonStyleEnum;
  /**
   * start icon
   */
  startIcon?: React.ReactNode;
  /**
   * endIcon
   */
  endIcon?: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  btnStyle = ButtonStyleEnum.PRIMARY,
  onClick,
  startIcon,
  endIcon,
  ...props
}) => {
  const btnClasses = clsx('text-center cursor-pointer rounded-md flex items-center gap-2', {
    'p-2 bg-slate-800 hover:underline': btnStyle === ButtonStyleEnum.PRIMARY,
    'h-[3rem] bg-[#3861fb] px-5 text-lg hover:bg-[#2953f2] transition: background-color 0.3s':
      btnStyle === ButtonStyleEnum.BLUE,
    'px-4 py-2 bg-red-500 rounded hover:bg-red-600 focus:bg-red-600':
      btnStyle === ButtonStyleEnum.RED,
    'text-lg px-2 py-1 rounded-lg bg-orange-600 border hover:bg-orange-700':
      btnStyle === ButtonStyleEnum.ORANGE,
  });

  return (
    <button className={btnClasses} onClick={onClick} {...props}>
      {!!startIcon && <>{startIcon}</>}
      {children}
      {!!endIcon && <>{endIcon}</>}
    </button>
  );
};
