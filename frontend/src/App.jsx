import React from 'react'
import SearchBar from './SearchBar'

function App() {
  const handleSearch = (query) => {
    console.log('Requête utilisateur :', query)
    // TODO : envoyer à une API Symfony ou à ChatGPT
  }

  return (
    <div>
      <h1>EldoraShop</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  )
}

export default App
