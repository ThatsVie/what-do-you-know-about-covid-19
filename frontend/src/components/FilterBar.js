import React from "react";

const FilterBar = ({ filters, setFilters, clearFilters, onSearch }) => (
  <div className="filter-bar">
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
      <option value="Air Filtration and Purification">Air Filtration and Purification</option>
      <option value="Long COVID">Long COVID</option>
      <option value="Public Health Policy">Public Health Policy</option>
      <option value="Long COVID and Children">Long COVID and Children</option>
      <option value="Masking">Masking</option>
      <option value="Prevention and Treatment">Prevention and Treatment</option>
      <option value="Pregnancy">Pregnancy</option>
      <option value="COVID-19 and Education"></option>

    </select>
    <button onClick={onSearch}>Search</button>
    <button onClick={clearFilters}>Clear All</button>
  </div>
);

export default FilterBar;
