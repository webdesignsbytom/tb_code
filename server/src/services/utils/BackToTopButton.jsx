import React from 'react';

function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className='grid justify-center w-full'>
      <button
        onClick={scrollToTop}
        className='bg-white main__bg border-2 border-solid border-alt-colour w-full text-white py-2 px-4 rounded-lg shadow-lg hover:bg-white hover:purple-main-colour transition duration-300'
        aria-label='Back to top'
      >
        Back to Top
      </button>
    </section>
  );
}

export default BackToTopButton;
