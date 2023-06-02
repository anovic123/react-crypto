import { FC, useState } from 'react';

interface TextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  text: string;
}

export const Text: FC<TextProps> = ({ text, ...props }) => {
  const isFull = text.length < 300;
  const fullText = !isFull ? `${text.slice(0, 300)}...` : text;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <p className="text-[1.3rem] mb-[.6rem]" {...props}>
        {!isOpen ? fullText : text}
      </p>
      {!isFull &&
        (isOpen ? (
          <span
            className="text-red-500 cursor-pointer block mt-2 transition duration-300 ease-in-out hover:text-red-600"
            onClick={() => setIsOpen(false)}
          >
            Collapse
          </span>
        ) : (
          <span
            className="text-red-500 cursor-pointer block mt-2 transition duration-300 ease-in-out hover:text-red-600"
            onClick={() => setIsOpen(true)}
          >
            Expand
          </span>
        ))}
    </>
  );
};
