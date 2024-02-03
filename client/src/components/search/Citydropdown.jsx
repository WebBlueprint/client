import React, { useState, useRef, useEffect } from 'react';
import style from './Citydropdown.module.css';
import location from './Location.svg';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownRef]);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log('Selected Option:', option);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
              
      <div className={style['dropdown-toggle']} onClick={handleDropdownClick}>
        <img src={location} className={style['location-menu']} />
        {selectedOption ? selectedOption : 'Select an option'}
      </div>
      {isOpen && (
        <div className={style['dropdown-menu']}>
          <div className="dropdown-item" onClick={() => handleOptionSelect('Kuala Lumpur')}>
          Kuala Lumpur
          </div>
          <div className="dropdown-item" onClick={() => handleOptionSelect('Selangor')}>
          Selangor
          </div>
          <div className="dropdown-item" onClick={() => handleOptionSelect('Johor')}>
          Johor
          </div>
          <div className="dropdown-item" onClick={() => handleOptionSelect('Kota Kinabalu')}>
          Kota Kinabalu
          </div>
          <div className="dropdown-item" onClick={() => handleOptionSelect('Melaka')}>
          Melaka
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
