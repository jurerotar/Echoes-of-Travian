import React, { FunctionComponentWithChildren } from 'react';
import clsx from 'clsx';

type ParagraphProps = React.HTMLProps<HTMLParagraphElement>;

export const Paragraph: FunctionComponentWithChildren<ParagraphProps> = (props) => {
  const {
    className = '',
    children,
    ...rest
  } = props;

  return (
    <p
      className={clsx(className, 'text-base text-gray-800 dark:text-white')}
      {...rest}
    >
      {children}
    </p>
  );
};