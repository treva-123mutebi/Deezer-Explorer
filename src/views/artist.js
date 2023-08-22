import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet'
import axios from 'axios';

import Navbar from '../components/navbar'
import './artist.css'

const Artist = (props) => {
  const artistId = props.location.state.artistId;
  const artistpicture = props.location.state.artistpicture;
  const artistName = props.location.state.artistName
  const [topTracks, setTopTracks] = useState([]);
  const [totalFans, setTotalFans] = useState(0);
  
  const [albums, setTopAlbums] = useState([]);
  
   useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}/top`, {
          headers: {
            'x-requested-with': 'XMLHttpRequest' 
          }
          
        });
        setTopTracks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
     
     const fetchTopAlbums = async () => {
      try {
        const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}/albums`, {
          headers: {
            'x-requested-with': 'XMLHttpRequest' 
          }
        });
        console.log(res);
        setTopAlbums(res.data.data);
      } catch (error) {
        console.error(error);
      }
     };
     
     const fetchTotalFans = async () => {
      try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}/fans`, {
          headers: {
            'x-requested-with': 'XMLHttpRequest'
          }
        });
        setTotalFans(response.data.total);
      } catch (error) {
        console.error(error);
      }
     };
     

     fetchTopTracks();
     fetchTopAlbums();
     fetchTotalFans();
   }, [artistId]);
  function getYearFromDate(dateString) {
  const date = new Date(dateString);
  return date.getFullYear();
  }
  function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

  console.log(artistId);

  return (
    <div className="artist-container">
      <Helmet>
        <title>Artist</title>
        <meta property="og:title" content="Artist" />
      </Helmet>
      <Navbar rootClassName="navbar-root-class-name2"></Navbar>
      <div class="artist-top-row">
        <div class="artist-fan-column">
          <div class="artist-image-container">
            <img src={artistpicture} alt="" class="example-image"></img>
            <div class="content">
              <div class="heading">
                {artistName}
             </div>
            <div class="sub-heading">
                {totalFans} Fans
              </div>
            </div>
          </div>
        </div>
        <div class="artist-fan-column">
          <div className="artist-container5">
            <h1 className="artist-text1">Top tracks</h1>
            <ul className="list">
              {topTracks.map((track, index) => (
               
                <li className="list-item-artist" key={track.id}>
                  <span className="track-number">{index + 1}</span>
                  <span className="track-title">{track.title}</span>
                  <span className="track-duration">{formatDuration(track.duration)}</span>
                  
              </li>
        ))}
              
              
            </ul>
          </div>
          
        </div>
      </div>
      <div class="artist-bottom-row">
        <div className="artist-container6">
          <h1 className="artist-text5">Artist Albums</h1>
        </div>
      </div>
      <div class="thumbnail-col-4-img-bg-txt">
        {albums.map((album) => (
          <div class="tc4ibt-item" key={album.id}>
            <img src={album.cover_xl} alt=""></img>
            <div class="tc4ibt-content">
             {album.title}
            </div>
            <div class="tc4ibt-button">
           <a href="#">{getYearFromDate(album.release_date)}</a>
          </div>

          </div>
        ))}
        
          
          
          
         
        
      </div>
      
      
      
    </div>
  )
}

export default Artist
