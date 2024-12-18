import React from 'react';

const FilterBar = ({ filters, setFilters, clearFilters, onSearch }) => (
  <div className="filter-bar">
    <div className="filter-inputs">
      <input
        type="text"
        placeholder="Search by keyword"
        aria-label="Search by keyword"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        aria-label="Filter by year"
        value={filters.year}
        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
      >
        <option value="">Year</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>

      <select
        aria-label="Filter by category"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">Category</option>
        <option value="Advocacy and Resources">Advocacy and Resources</option>
        <option value="Children and Long COVID">Children and Long COVID</option>
        <option value="Far-UVC">Far-UVC</option>
        <option value="Indoor Air Quality and Filtration">Indoor Air Quality and Filtration</option>
        <option value="Long COVID">Long COVID</option>
        <option value="Masking">Masking</option>
        <option value="Prevention and Treatment">Prevention and Treatment</option>
        <option value="Public Health">Public Health</option>
        <option value="Pending Categorization">Pending Categorization</option>
      </select>
    </div>

    <div className="filter-buttons">
      <button onClick={onSearch}>Search</button>
      <button onClick={clearFilters}>Clear All</button>
    </div>
  </div>
);

export default FilterBar;
