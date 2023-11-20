import React from 'react';

const Header = () => {
  return (
    <header className='p-3 text-bg-primary shadow'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center'>
          <a
            href='/'
            className='d-flex align-items-center mb-2 mb-lg-0 text-decoration-none'
          >
            <span className='fs-5 text-light'>Typing Speed App</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
