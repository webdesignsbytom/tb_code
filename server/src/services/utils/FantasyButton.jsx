import React from 'react';

function CustomButton({ onClick, children, xl, black }) {
  return (
    <button
      onClick={onClick}
      className={`main__bg outline outline-2 ${
        xl ? 'text-3xl lg:text-7xl' : 'text-3xl lg:text-5xl'
      } ${
        black ? 'bg-transparent-black' : ''
      } hover:bg-red-300 shadow-[inset_-1px_18px_35px_22px_#00000024] hover:shadow-[inset_-1px_18px_35px_22px_#00000024] active:scale-95 outline-black rounded-xl px-10 py-2 text__stroke`}
    >
      <span className='font-fantasy font-extrabold text-main-colour'>
        {children}
      </span>
    </button>
  );
}

export default CustomButton;
