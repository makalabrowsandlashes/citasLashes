import { useState } from 'react'

function SearchBar({ onSearch, filtro }) {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <input
      type="text"
      placeholder={`Buscar por ${filtro}`}
      value={query}
      onChange={handleChange}
      style={{
        padding: '8px',
        width: '300px',
      }}
    />
  )
}

export default SearchBar