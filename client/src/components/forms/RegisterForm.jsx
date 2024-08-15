import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// API
import client from '../../api/client';
import LoadingSpinner from '../../components/utils/LoadingSpinner';
// Utils
import CountrySelect from '../../utils/user/CountrySelect';
// Constants
import { LOGIN_PAGE_URL } from '../../utils/Constants';

function RegisterForm() {
  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    termsChecked: true,
  });
  const [registerError, setRegisterError] = useState(false);
  const [registrationFormData, setRegistrationFormData] = useState({
    active: false,
    success: false,
  });

  let navigate = useNavigate();

  const loginPage = () => {
    navigate(LOGIN_PAGE_URL, { replace: true });
  };

  const handleSubmitRegisterForm = (event) => {
    event.preventDefault();

    setRegistrationFormData({
      ...registrationFormData,
      active: true,
    });

    client
      .post('/users/register', registerFormData, false)
      .then((res) => {
        console.log('res', res.data);
        setRegistrationFormData({
          ...registrationFormData,
          active: false,
          success: true,
        });
        setTimeout(() => {
          loginPage();
        }, 2000);
      })

      .catch((err) => {
        setRegisterError(true);
        console.error('Unable to register new user', err);
      });
  };

  const handleChange = (event) => {
    setRegisterError(false);
    const { name, value } = event.target;

    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const handleChecked = (event) => {
    setRegisterFormData({
      ...registerFormData,
      termsChecked: !registerFormData.termsChecked,
    });
  };
  return (
    <form className='text-center' onSubmit={handleSubmitRegisterForm}>
      <input
        type='email'
        id='email'
        name='email'
        className='form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
        placeholder='Email address'
        onChange={handleChange}
      />
      <input
        type='password'
        id='password'
        name='password'
        className='form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
        placeholder='Password'
        onChange={handleChange}
      />
      <input
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        className='form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
        placeholder='Password'
        onChange={handleChange}
      />
      <div className='mb-6'>
        <CountrySelect />
      </div>
      <div className='form-check flex justify-center mb-6'>
        <input
          className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
          type='checkbox'
          value=''
          id='termsChecked'
          name='termsChecked'
          checked
          onChange={handleChecked}
        />
        <label
          className='form-check-label inline-block text-gray-800'
          htmlFor='termsChecked'
        >
          I agree to all terms and conditions.
        </label>
      </div>
      {/* Submit button */}
      <div>
        <button
          type='submit'
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          className='inline-block px-6 py-2.5 mb-6 w-full bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-lg transition duration-150 ease-in-out'
        >
          {!registrationFormData.active && !registrationFormData.success && (
            <span>Sign Up</span>
          )}
          {registrationFormData.active && (
            <span className='flex items-center justify-center'>
              <LoadingSpinner width={'w-5'} height={'h-5'} />
            </span>
          )}
          {registrationFormData.success && <span>Success!</span>}
        </button>
      </div>

      {registerError && (
        <div className='text-center'>
          <span className='text-red-700 font-semibold'>REGISTER FAILED</span>
        </div>
      )}

      <p className='font-light text-gray-500 dark:text-gray-400'>
        Already a member?{' '}
        <Link
          to='/sign-up'
          className='font-medium text-blue-600 hover:underline'
        >
          Login Now
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
