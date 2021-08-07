import React, { useState, useEffect } from 'react';
import ReactSearchBox from 'react-search-box';
import Slider from '@material-ui/core/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUtensils } from '@fortawesome/free-solid-svg-icons/faUtensils';
import { faTree } from '@fortawesome/free-solid-svg-icons/faTree';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import { texts } from '../../constants';
import Tomtom from '../Map';
import getNearbyPlaces, { getNearbyButtons } from '../../utils/getNearbyPlaces';

import './index.scss';

const Map = () => {
  // search
  const [geolocation, setGeolocation] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [areFiltered, setAreFiltered] = useState(true);

  // map
  const [longitude, setLongitude] = useState(41);
  const [latitude, setLatitude] = useState(3);
  const [map, setMap] = useState({});

  // slider
  const [distance, setDistance] = useState(5);

  // buttons
  const [firstButton, setFirstButton] = useState(false);
  const [secondButton, setSecondButton] = useState(false);
  const [thirdButton, setThirdButton] = useState(false);

  const handleChange = (event, newValue) => {
    setDistance(newValue);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setGeolocation(e.coords);
      setLongitude(e.coords.longitude);
      setLatitude(e.coords.latitude);
    });
  }, []);

  const setPlace = (key) => {
    setTimeout(() => {
      const place = searchResults.find((el) => el.id === key) || searchResults[0];
      if (place) {
        setSelectedPlace(place);
        setLongitude(place?.position?.lon);
        setLatitude(place?.position?.lat);
        map.setCenter([parseFloat(longitude), parseFloat(latitude)]);
        map.setZoom(15);
      }
    }, 500);
  };

  const onSearchChange = async (query) => {
    if (query.length > 0) {
      const results = await getNearbyPlaces(
        query,
        geolocation.latitude,
        geolocation.longitude,
      );
      setSearchResults(results);
    }
  };

  const handleNearbyButton = async (id) => {
    const results = await getNearbyButtons(geolocation.latitude,
      geolocation.longitude,
      id,
      distance * 1000);
    setFilteredPlaces(results);
    if (!results.length) setAreFiltered(false);
  };

  return (
    <main className="nuwemap__container">
      <div className="nuwemap__aside">
        <h3>{texts.maps.title.toUpperCase()}</h3>
        <p>{texts.maps.content}</p>
        <p>{texts.maps.ruta}</p>

        <ReactSearchBox
          className="react-search-box"
          placeholder={texts.maps.placeholder}
          matchedRecords={
            searchResults.length
            && searchResults
              .map((result) => ({
                key: result.id,
                name: result.poi.name,
                dist: result.dist,
                value: `${result.poi.name} | ${(result.dist / 1000).toFixed(2)}km `,
              }))
              .sort((a, b) => a.dist - b.dist)
          }
          data={
            searchResults.length
              ? searchResults
                .map((result) => ({
                  key: result.id,
                  name: result.poi.name,
                  dist: result.dist,
                  value: result.poi.name,
                }))
                .sort((a, b) => a.dist - b.dist) : []
          }
          onSelect={(place) => setPlace(place.key)}
          autoFocus
          onChange={(query) => onSearchChange(query)}
          fuseConfigs={{
            minMatchCharLength: 0,
            threshold: 1,
            distance: 100000,
            sort: false,
          }}
          keys={['name']}
        />

        <div className="divider" />
        <h3>{texts.maps.destacados.title}</h3>
        <p>{texts.maps.destacados.content}</p>
        <div className="aside__buttons">
          <button
            type="button"
            onClick={() => {
              handleNearbyButton('7315');
              setFirstButton((bool) => !bool);
            }}
            className={`nuwemap__aside-btn ${firstButton ? 'active-btn' : null}`}
          >
            <FontAwesomeIcon icon={faUtensils} className="icon" />
            {texts.maps.destacados.restaurantes}
          </button>

          <button
            type="button"
            onClick={() => {
              handleNearbyButton('9362,9913,9900,7320');
              setSecondButton((bool) => !bool);
            }}
            className={`nuwemap__aside-btn ${secondButton ? 'active-btn' : null}`}
          >
            <FontAwesomeIcon icon={faTree} className="icon" />
            {texts.maps.destacados.parques}
          </button>

          <button
            type="button"
            onClick={() => {
              handleNearbyButton('9361,');
              setThirdButton((bool) => !bool);
            }}
            className={`nuwemap__aside-btn ${thirdButton ? 'active-btn' : null}`}
          >
            <FontAwesomeIcon icon={faShoppingBasket} className="icon" />
            {texts.maps.destacados.tiendas}
          </button>
        </div>
        <p>
          {texts.maps.destacados.distancia}
          :
          {' '}
          <strong>
            {distance}
            km
          </strong>
        </p>
        <Slider
          value={distance}
          min={1}
          max={10}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
        <div className="divider" />
      </div>
      <Tomtom
        longitude={longitude}
        latitude={latitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setMap={setMap}
        iniMap={map}
        geolocation={geolocation}
        selectedPlace={selectedPlace}
        filteredPlaces={filteredPlaces}
        areFiltered={areFiltered}
        setAreFiltered={setAreFiltered}
      />
    </main>
  );
};

export default Map;
