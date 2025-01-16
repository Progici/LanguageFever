import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import "../css/FilterBar.css";
import { ApiConfig } from "../../config/api.config";

const FilterBar = ({ onFilterChange = () => {}, onSortChange = () => {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Filter states
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get("jezik") || null);
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [qualification, setQualification] = useState(searchParams.get("kvalifikacija") || null);
  const [style, setStyle] = useState(searchParams.get("stil") || null);
  const [minRating, setMinRating] = useState(searchParams.get("minAverageOcjena") || "");
  const [minReviewCount, setMinReviewCount] = useState(searchParams.get("minCountOcjena") || "");
  const [selectedSortOption, setSelectedSortOption] = useState(searchParams.get("sort") || null);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [styleOptions, setStyleOptions] = useState([]);

  useEffect(() => {
    fetch(ApiConfig.API_URL + "/jezici", {
      method: "GET",
      credentials:"include"
    })
      .then(response => response.json())
      .then(data => {
        const options = data.map((language) => ({
          value: language,  // pretpostavljamo da je "naziv" naziv jezika
          label: language,  // isto kao za label
        }));
        setLanguageOptions(options);
      });
  }, []);

  useEffect(() => {
    fetch(ApiConfig.API_URL + "/enums/kvalifikacije", {
      method: "GET",
      credentials:"include"
    })
      .then(response => response.json())
      .then(data => {
        const options = data.map((qualification) => ({
          value: qualification,
          label: qualification.replace(/_/g, " ") 
        }));
        setQualificationOptions(options);
      });
  }, []);

  useEffect(() => {
    fetch(ApiConfig.API_URL + "/enums/stilovi", {
      method: "GET",
      credentials:"include"
    })
      .then(response => response.json())
      .then(data => {
        const options = data.map((style) => ({
          value: style,
          label: style.replace(/_/g, " ") 
        }));
        setStyleOptions(options);
      });
  }, []);

  // Ref za praćenje promjena
  const filterStateRef = useRef({
    selectedLanguage,
    minPrice,
    maxPrice,
    qualification,
    style,
    minRating,
    minReviewCount,
    selectedSortOption,
  });

  const filterRef = useRef(null);
  const sortRef = useRef(null);
  const filterButtonRef = useRef(null);
  const sortButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (isSelectOpen) return; // Ako je React Select otvoren, ne zatvori filter/sortiranje
  
    // Provjeri klikne li se izvan filtera
    if (!event.target.closest(".filter-options") && !event.target.closest(".filter-button") && isFilterOpen) {
      setIsFilterOpen(false);
      updateSearchParams();  // Ažuriraj query string kad se filter zatvori
    }
  
    // Provjeri klikne li se izvan sortiranja
    if (!event.target.closest(".sort-options") && !event.target.closest(".sort-button") && isSortOpen) {
      setIsSortOpen(false);
      updateSearchParams();  // Ažuriraj query string kad se sortiranje zatvori
    }
  };

  const updateSearchParams = () => {
    const newParams = new URLSearchParams();

    if (filterStateRef.current.selectedLanguage) newParams.set("jezik", filterStateRef.current.selectedLanguage);
    if (filterStateRef.current.minPrice) newParams.set("minPrice", filterStateRef.current.minPrice);
    if (filterStateRef.current.maxPrice) newParams.set("maxPrice", filterStateRef.current.maxPrice);
    if (filterStateRef.current.qualification) newParams.set("kvalifikacija", filterStateRef.current.qualification);
    if (filterStateRef.current.style) newParams.set("stil", filterStateRef.current.style);
    if (filterStateRef.current.minRating) newParams.set("minAverageOcjena", filterStateRef.current.minRating);
    if (filterStateRef.current.minReviewCount) newParams.set("minCountOcjena", filterStateRef.current.minReviewCount);

    if (filterStateRef.current.selectedSortOption) {
      let sortBy, sortOrder;
      switch (filterStateRef.current.selectedSortOption) {
        case "experience":
          sortBy = "experience";
          sortOrder = "desc";
          break;
        case "priceAsc":
          sortBy = "price";
          sortOrder = "asc";
          break;
        case "priceDesc":
          sortBy = "price";
          sortOrder = "desc";
          break;
        case "averageRating":
          sortBy = "averageOcjena";
          sortOrder = "desc";
          break;
        case "countOcjena":
          sortBy = "countOcjena";
          sortOrder = "desc";
          break;
        default:
          break;
      }
      if (sortBy && sortOrder) {
        newParams.set("sortBy", sortBy);
        newParams.set("sortOrder", sortOrder);
      }
    }

    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setQualification(null);
    setStyle(null);
    setSelectedLanguage(null);
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setMinReviewCount("");
  
    filterStateRef.current = {
      selectedLanguage: null,
      minPrice: "",
      maxPrice: "",
      qualification: null,
      style: null,
      minRating: "",
      minReviewCount: "",
      selectedSortOption: filterStateRef.current.selectedSortOption, // Ostavljamo sortiranje netaknuto
    };
  
    onFilterChange({
      jezik: null,
      minPrice: "",
      maxPrice: "",
      kvalifikacija: null,
      stil: null,
      minAverageOcjena: "",
      minCountOcjena: "",
    });
  };
  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen, isSortOpen, isSelectOpen]);

  useEffect(() => {
    const filters = {
      jezik: selectedLanguage,
      minPrice,
      maxPrice,
      kvalifikacija: qualification,
      stil: style,
      minAverageOcjena: minRating,
      minCountOcjena: minReviewCount,
    };
    onFilterChange(filters);
  }, [selectedLanguage, minPrice, maxPrice, qualification, style, minRating, minReviewCount]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isSortOpen) setIsSortOpen(false);
  };

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
    if (isFilterOpen) setIsFilterOpen(false);
  };

  const sortOptions = [
    { value: "experience", label: "Godine iskustva" },
    { value: "priceAsc", label: "Cijena uzlazno" },
    { value: "priceDesc", label: "Cijena silazno" },
    { value: "averageRating", label: "Prosječna ocjena" },
    { value: "countOcjena", label: "Broj ocjena" },
  ];

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="toggle-buttons">
          <button ref={filterButtonRef} className="filter-button" onClick={toggleFilter}>
            Filter
          </button>
          <button ref={sortButtonRef} className="sort-button" onClick={toggleSort}>
            Sortiranje
          </button>
        </div>

        {isFilterOpen && (
          <div ref={filterRef} className="filter-options"   
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
          >
            <label>
              Jezik:
              <Select
                options={languageOptions}
                value={languageOptions.find((option) => option.value === selectedLanguage) || null}
                onChange={(selectedOption) => {
                  setSelectedLanguage(selectedOption ? selectedOption.value : null);
                  filterStateRef.current.selectedLanguage = selectedOption ? selectedOption.value : null;
                }}
                placeholder="Odaberite jezik"
                isClearable
                onMenuOpen={() => setIsSelectOpen(true)}
                onMenuClose={() => setIsSelectOpen(false)}
                onClick={(e) => e.stopPropagation()}
              />
            </label>

            <label>
              Cijena:
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="unosBroja"
                  type="number"
                  value={minPrice}
                  min="0"
                  max={maxPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    filterStateRef.current.minPrice = e.target.value;
                  }}
                  placeholder="Min cijena"
                />
                <span>do</span>
                <input 
                  className="unosBroja"
                  type="number"
                  value={maxPrice}
                  min={minPrice || "0"}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    filterStateRef.current.maxPrice = e.target.value;
                  }}
                  placeholder="Max cijena"
                />
              </div>
            </label>

            <label>
              Kvalifikacija:
              <Select
                options={qualificationOptions}
                value={qualificationOptions.find((option) => option.value === qualification) || null}
                onChange={(selectedOption) => {
                  setQualification(selectedOption ? selectedOption.value : null);
                  filterStateRef.current.qualification = selectedOption ? selectedOption.value : null;
                }}
                placeholder="Odaberite kvalifikaciju"
                isClearable
                onMenuOpen={() => setIsSelectOpen(true)}
                onMenuClose={() => setIsSelectOpen(false)}
              />
            </label>

            <label>
              Stil:
              <Select
                options={styleOptions}
                value={styleOptions.find((option) => option.value === style) || null}
                onChange={(selectedOption) => {
                  setStyle(selectedOption ? selectedOption.value : null);
                  filterStateRef.current.style = selectedOption ? selectedOption.value : null;
                }}
                placeholder="Odaberite stil"
                isClearable
                onMenuOpen={() => setIsSelectOpen(true)}
                onMenuClose={() => setIsSelectOpen(false)}
              />
            </label>

            <label>
              Minimalna ocjena:
              <input
                className="unosBrojaVeci"
                type="number"
                value={minRating}
                onChange={(e) => {
                  setMinRating(e.target.value);
                  filterStateRef.current.minRating = e.target.value;
                }}
                placeholder="Min ocjena"
                min="1"
                max="5"
                step="0.1"
              />
            </label>

            <label>
              Minimalni broj ocjena:
              <input
                className="unosBrojaVeci"
                type="number"
                value={minReviewCount}
                onChange={(e) => {
                  setMinReviewCount(e.target.value);
                  filterStateRef.current.minReviewCount = e.target.value;
                }}
                placeholder="Min broj ocjena"
                min="0"
              />
            </label>

            <button className="reset-filter-button" onClick={resetFilters} >Resetiraj sve filtere</button>
          </div>
        )}

        {isSortOpen && (
          <div ref={sortRef} className="sort-options"
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
          >
            <label>
              Sortiraj po:
              <Select
                options={sortOptions}
                value={sortOptions.find((option) => option.value === selectedSortOption) || null}
                onChange={(selectedOption) => {
                  setSelectedSortOption(selectedOption ? selectedOption.value : null);
                  filterStateRef.current.selectedSortOption = selectedOption ? selectedOption.value : null;
                  onSortChange(selectedOption ? selectedOption.value : null);
                }}
                placeholder="Odaberite kriterij"
                isClearable
                onMenuOpen={() => setIsSelectOpen(true)}
                onMenuClose={() => setIsSelectOpen(false)}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;