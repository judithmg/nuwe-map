import React, { useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';
import Place from '../Place';
import NotFound from '../NotFound';

const Tomtom = ({
  longitude,
  latitude,
  setMap,
  setLatitude,
  setLongitude,
  geolocation,
  selectedPlace,
  filteredPlaces,
  iniMap,
  areFiltered,
  setAreFiltered,
}) => {
  // utils

  const convertToPoints = (lngLat) => ({
    point: {
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    },
  });

  const addCustomMarker = (lngLat, map) => {
    const element = document.createElement('div');
    element.className = 'custom-marker';
    new tt.Marker({
      element,
    })
      .setLngLat(lngLat)
      .addTo(map);
  };

  const createRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route');
      map.removeSource('route');
    }
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJson,
      },
      paint: {
        'line-color': '#f0a500',
        'line-width': 6,

      },
    });
  };

  // map
  const mapElement = useRef();

  // marker

  const addSearchMarker = (el, map) => {
    const popupOffset = {
      bottom: [0, -25],
    };
    const popup = new tt.Popup({ offset: popupOffset }).setHTML(el?.poi?.name || el);
    const element = document.createElement('div');
    if (el?.poi) { element.className = 'search-marker'; } else { element.className = 'my-marker'; }

    const marker = new tt.Marker({
      element,
      draggable: true,
    })
      .setLngLat([el?.position?.lon || longitude, el?.position?.lat || latitude])
      .addTo(map);

    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      setLongitude(lngLat.lng);
      setLatitude(lngLat.lat);
    });

    marker.setPopup(popup).togglePopup();
  };

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude,
    };
    const destinations = [];

    const map = tt.map({
      key: process.env.REACT_APP_TOMTOM,
      container: mapElement.current,
      stylesVisibility: {
        trafficFlow: true,
        trafficIncidents: true,
      },
      center: [longitude, latitude],
      zoom: 14,
    });

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => convertToPoints(destination));
      const callParameters = {
        key: process.env.REACT_APP_TOMTOM,
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      };

      return new Promise((resolve) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0];
            const resultsArray = results.map((result, index) => ({
              location: locations[index],
              drivingtime: result.response.routeSummary.travelTimeInSeconds,
            }));
            resultsArray.sort((a, b) => a.drivingtime - b.drivingtime);
            const sortedLocations = resultsArray.map((result) => result.location);
            resolve(sortedLocations);
          });
      });
    };

    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin);

        ttapi.services
          .calculateRoute({
            key: process.env.REACT_APP_TOMTOM,
            locations: sorted,
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson();
            createRoute(geoJson, map);
          });
      });
    };

    setMap(map);
    addSearchMarker(selectedPlace?.poi.name || 'You are here', map);

    map.on('click', (e) => {
      destinations.push(e.lngLat);
      addCustomMarker(e.lngLat, map);
      recalculateRoutes();
    });

    return () => map.remove();
  }, [longitude, latitude]);

  useEffect(() => {
    if (filteredPlaces && filteredPlaces.length) {
      filteredPlaces.map((el) => addSearchMarker(el, iniMap));
    }
  }, [filteredPlaces]);

  return (
    <div className="tomtom__container">
      <div className="tomtom__info">
        {geolocation?.longitude && geolocation?.latitude && (
          <>
            <strong>My current location is: </strong>
            <p>
              Latitude:
              {' '}
              {geolocation.latitude.toFixed(2)}
            </p>
            <p>
              Longitude:
              {' '}
              {geolocation.longitude.toFixed(2)}
            </p>
          </>
        )}
        {selectedPlace && (
          <>
            {
              longitude && latitude && (
                <>
                  <strong>My found place is found at: </strong>
                  <p>
                    Latitude
                    {' '}
                    {latitude.toFixed(2)}
                  </p>
                  <p>
                    Longitude
                    {' '}
                    {longitude.toFixed(2)}
                  </p>
                </>
              )
            }
            <Place data={selectedPlace} />
          </>

        )}
      </div>

      <div
        ref={mapElement}
        className="mapDiv"
      />
      <NotFound
        areFiltered={areFiltered}
        setAreFiltered={setAreFiltered}
      />
    </div>
  );
};

export default Tomtom;
