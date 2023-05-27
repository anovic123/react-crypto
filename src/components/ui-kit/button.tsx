import { FC } from 'react';
import clsx from 'clsx';

export enum ButtonStyleEnum {
  PRIMARY = 'PRIMARY',
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
  const btnClasses = clsx('text-center cursor-pointer rounded-md flex items-center gap-3', {
    'p-2 bg-slate-800 hover:underline': btnStyle === ButtonStyleEnum.PRIMARY,
  });

  return (
    <button className={btnClasses} onClick={onClick} {...props}>
      {!!startIcon && <>{startIcon}</>}
      {children}
      {!!endIcon && <>{endIcon}</>}
    </button>
  );
};
