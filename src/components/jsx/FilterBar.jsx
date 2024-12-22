import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import "../css/FilterBar.css";

const FilterBar = ({ onFilterChange, onSortChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Stanje za otvaranje/zatvaranje filtera
  const [isSortOpen, setIsSortOpen] = useState(false); // Stanje za otvaranje/zatvaranje sort funkcionalnosti
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Stanje za odabrani jezik
  const [rating, setRating] = useState(""); // Stanje za ocjenu (nije trenutno korišteno)
  const [selectedSortOption, setSelectedSortOption] = useState(null); // Stanje za odabranu opciju sortiranja

  // Referenciranje elemenata za upravljanje klikovima izvan komponenti
  const filterRef = useRef(null);
  const sortRef = useRef(null);
  const filterButtonRef = useRef(null);
  const sortButtonRef = useRef(null);

  // Funkcija koja detektira klikove izvan filtera i sort opcija kako bi ih zatvorila
  const handleClickOutside = (event) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target) &&
      !filterButtonRef.current.contains(event.target) &&
      isFilterOpen
    ) {
      setIsFilterOpen(false); // Zatvara filter ako kliknemo izvan njega
    }
    if (
      sortRef.current &&
      !sortRef.current.contains(event.target) &&
      !sortButtonRef.current.contains(event.target) &&
      isSortOpen
    ) {
      setIsSortOpen(false); // Zatvara sortiranje ako kliknemo izvan njega
    }
  };

  // postavljamo event listener za klikove izvan komponente kad je komponenta montirana
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Uklanja event listener kad se komponenta demontira
    };
  }, [isFilterOpen, isSortOpen]); // Pratimo promjene u isFilterOpen i isSortOpen

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen); // Prebacuje stanje filtera
    if (isSortOpen) setIsSortOpen(false);
  };

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen); // Prebacuje stanje sortiranja
    if (isFilterOpen) setIsFilterOpen(false);
  };

  // Opcije za jezik koje se prikazuju u dropdownu
  const languageOptions = [
    { value: "English", label: "Engleski" },
    { value: "Spanish", label: "Španjolski" },
    { value: "German", label: "Njemački" },
  ];

  // Opcije za sortiranje koje se prikazuju u dropdownu
  const sortOptions = [
    { value: "experience", label: "Godine iskustva" },
    { value: "priceAsc", label: "Cijena uzlazno" },
    { value: "priceDesc", label: "Cijena silazno" },
  ];

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="toggle-buttons">
          <button
            ref={filterButtonRef}
            className="filter-button"
            onClick={toggleFilter} // Poziva funkciju za otvaranje/zatvaranje filtera
          >
            Filter
          </button>
          <button
            ref={sortButtonRef}
            className="sort-button"
            onClick={toggleSort} // Poziva funkciju za otvaranje/zatvaranje sortiranja
          >
            Sortiranje
          </button>
        </div>

        {/* Prikazivanje filter opcija kad je filter otvoren */}
        {isFilterOpen && (
          <div ref={filterRef} className="filter-options">
            <label>
              Jezik:
              <Select
                options={languageOptions}
                value={selectedLanguage}
                onChange={(selectedOption) => {
                  setSelectedLanguage(selectedOption); // Ažurira odabrani jezik u stanju
                  if (selectedOption) {
                    onFilterChange("language", selectedOption.value);
                  } else {
                    onFilterChange("language", null);
                  }
                }}
                placeholder="Odaberite jezik"
                isClearable // Omogućuje brisanje odabira
                styles={{
                  // Stil za okvire Select inputa
                  control: (base) => ({
                    ...base,
                    borderRadius: "24px",
                    borderColor: "#007bff",
                    padding: "2px",
                  }),
                  option: (base) => ({
                    ...base,
                    color: "#333",
                    borderRadius: "24px",
                    marginTop: "5px",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "14px",
                    padding: "10px",
                    border: "2px solid #007bff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
                isClearable // Omogućuje brisanje odabira
                styles={{
                  // Stil za okvire Select inputa
                  control: (base) => ({
                    ...base,
                    borderRadius: "24px", // Stil za okvire Select inputa
                    borderColor: "#007bff",
                    padding: "2px",
                  }),
                  option: (base) => ({
                    ...base,
                    color: "#333",
                    borderRadius: "24px",
                    marginTop: "5px",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "14px",
                    padding: "10px",
                    border: "2px solid #007bff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
