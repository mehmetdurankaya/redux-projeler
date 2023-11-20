import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../redux/typingSpeedSlice';

const SelectLang = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.typingSpeed.language);

  const handleChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div className='row mt-2'>
      <div className='col-auto'>
        <select
          value={lang}
          onChange={handleChange}
          className='form-select'
          aria-label='Select language'
        >
          <option value='turkish'>Turkish</option>
          <option value='english'>English</option>
        </select>
      </div>
    </div>
  );
};

export default SelectLang;
