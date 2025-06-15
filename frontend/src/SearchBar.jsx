import React, { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() !== '') {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
      <input
        type="text"
        placeholder="Ex : je cherche une PS5 à Paris"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flexGrow: 1, padding: '0.5rem' }}
      />
      <button type="submit">Rechercher</button>
    </form>
  )
}

export default SearchBar
