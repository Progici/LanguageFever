import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import './FilterBar.css';

const FilterBar = ({ onFilterChange, onSortChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [rating, setRating] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const filterRef = useRef(null); 
  const sortRef = useRef(null);
  const filterButtonRef = useRef(null);
  const sortButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      filterRef.current && !filterRef.current.contains(event.target) && 
      !filterButtonRef.current.contains(event.target) && 
      isFilterOpen
    ) {
      setIsFilterOpen(false);
    }
    if (
      sortRef.current && !sortRef.current.contains(event.target) && 
      !sortButtonRef.current.contains(event.target) && 
      isSortOpen
    ) {
      setIsSortOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen, isSortOpen]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isSortOpen) setIsSortOpen(false);
  };

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
    if (isFilterOpen) setIsFilterOpen(false);
  };

  const languageOptions = [
    { value: 'English', label: 'Engleski' },
    { value: 'Spanish', label: 'Španjolski' },
    { value: 'German', label: 'Njemački' },
  ];

  const sortOptions = [
    { value: 'experience', label: 'Godine iskustva' },
    { value: 'priceAsc', label: 'Cijena uzlazno' },
    { value: 'priceDesc', label: 'Cijena silazno' },
  ];

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="toggle-buttons">
          <button
            ref={filterButtonRef}
            className="filter-button"
            onClick={toggleFilter}
          >
            Filter
          </button>
          <button
            ref={sortButtonRef}
            className="sort-button"
            onClick={toggleSort}
          >
            Sortiranje
          </button>
        </div>

        {isFilterOpen && (
          <div ref={filterRef} className="filter-options">
            <label>
              Jezik:
              <Select
                options={languageOptions}
                value={selectedLanguage}
                onChange={(selectedOption) => {
                  setSelectedLanguage(selectedOption);
                  if (selectedOption) {
                    onFilterChange('language', selectedOption.value);
                  } else {
                    onFilterChange('language', null); 
                  }
                }}
                placeholder="Odaberite jezik"
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: '24px',
                    borderColor: '#007bff',
                    padding: '2px',
                  }),
                  option: (base) => ({
                    ...base,
                    color: '#333',
                    borderRadius: '24px',
                    marginTop: '5px',
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '14px',
                    padding: '10px',
                    border: '2px solid #007bff',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  }),
                }}
              />
            </label>
          </div>
        )}

        {isSortOpen && (
          <div ref={sortRef} className="sort-options">
            <label>
              Sortiraj po:
              <Select
                options={sortOptions}
                value={selectedSortOption}
                onChange={(selectedOption) => {
                  setSelectedSortOption(selectedOption);
                  if (selectedOption) {
                    onSortChange(selectedOption.value);
                  } else {
                    onSortChange(null);
                  }
                }}
                placeholder="Odaberite kriterij"
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: '24px',
                    borderColor: '#007bff',
                    padding: '2px',
                  }),
                  option: (base) => ({
                    ...base,
                    color: '#333',
                    borderRadius: '24px',
                    marginTop: '5px',
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '14px',
                    padding: '10px',
                    border: '2px solid #007bff',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  }),
                }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
