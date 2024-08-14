import React, { useContext, useEffect } from 'react';
// Components
import RegisterForm from '../../components/forms/RegisterForm';
import Navbar from '../../components/nav/Navbar';
// Context
import { ToggleContext } from '../../context/ToggleContext';
// Constants
import { SIGN_UP_PAGE_URL } from '../../utils/Constants';

function RegisterPage() {
  const { setActiveNav } = useContext(ToggleContext)

  useEffect(() => {
    setActiveNav(SIGN_UP_PAGE_URL)
  }, [])
  
  return (
    <div className='bg-black main__bg h-screen grid'>
      <section className='grid h-full overflow-hidden grid-rows-reg'>
        <Navbar />
        <main className='grid bg-secondary-colour grid-rows-reg main__bg h-full items-center justify-center'>
          <section className='bg-secondary-colour rounded p-4 shadow my-10 lg:my-0'>
            <article className='text-center my-2 '>
              <h1 className='text-3xl font-semibold'>Sign Up Now</h1>
            </article>
            <RegisterForm />
          </section>
        </main>
      </section>
    </div>
  );
}

export default RegisterPage;
