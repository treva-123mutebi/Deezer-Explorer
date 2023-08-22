import React from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';

import Navbar from '../components/navbar'
import './search-result.css'

const SearchResult = (props) => {
   const history = useHistory();
  
  const searchResults = props.location.state.searchResults;
  console.log(searchResults);
   const navigateToArtist = async (artistName) => {
    
    try {
      
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${artistName}`, {
          headers: {
            'x-requested-with': 'XMLHttpRequest' 
          }
        });
           
      const artistId = response.data.data[0].id;
      const artistpicture = response.data.data[0].picture_medium;
      console.log(artistId);
      history.push('/artist', { artistId, artistName, artistpicture });
    } catch (error) {
      console.error(error);
    }
   };
  function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
  
  

      

  return (
    <div className="search-reseult-container">
      <Helmet>
        <title>Search-Result </title>
        <meta
          property="og:title"
          content="Search-Result"
        />
      </Helmet>
      <Navbar rootClassName="navbar-root-class-name1"></Navbar>
      <span className="search-reseult-text">Search Results</span>
      <section className="search-reseult-section">
        
        
        
        {searchResults.data.map((result, index) => (
          <div className="search-reseult-container1"  key={index}>
          <div className="search-reseult-container2">
            <img
              alt="image"
              src={result.album.cover_medium}
              className="search-reseult-image"
            />
          </div>
            <ul className="list">
              <li className="list-item">
              <span className="search-reseult-text2"> {formatDuration(result.duration)}</span>
              </li>
              <li className="list-item">
              <span className="search-reseult-text2"><b> {result.title }</b></span>
              </li>
              
            <li className="search-reseult-li list-item" >
                <span onClick={() => navigateToArtist(result.artist.name)}>By {result.artist.name }</span>
            </li>
            
              <li className="list-item">
              <span className="search-reseult-text3">{result.album.title }</span>
            </li>
            
          </ul>
        </div>

        ))}
        
      </section>
      <div>
        
      </div>
    </div>
  )
}

export default SearchResult
