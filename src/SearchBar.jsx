import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <input
      type="text"
      placeholder="Buscar por cliente..."
      value={query}
      onChange={handleChange}
      style={{
        padding: '8px',
        width: '300px',
        marginBottom: '20px'
      }}
    />
  )
}

export default SearchBar