'use client';
import React from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className: string;
};

export const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      type='submit'
      className={`btn btn-neutral ${className}`}
    >
      {pending && <span className='loading loading-spinner ' />}
      {children}
    </button>
  );
};
