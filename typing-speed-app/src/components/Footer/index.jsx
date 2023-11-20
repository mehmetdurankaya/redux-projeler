import React from 'react';
import githubIcon from '../../assets/githubIcon.svg';
import linkedinIcon from '../../assets/linkedinIcon.svg';

const Footer = () => {
  return (
    <footer className='container'>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <p className='fs-6 fs-md-5 text-light py-2 py-md-3'>
          &copy; mehmetdurankaya
        </p>
        <ul className='list-unstyled d-flex'>
          <li className='ms-2'>
            <a href='https://github.com/mehmetdurankaya' className='link-dark'>
              <img src={githubIcon} alt='Github Icon' className='social-icon' />
            </a>
          </li>
          <li className='ms-2'>
            <a
              href='https://www.linkedin.com/in/mehmetdurankaya/'
              className='link-dark'
            >
              <img
                src={linkedinIcon}
                alt='Linkedin Icon'
                className='social-icon'
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
