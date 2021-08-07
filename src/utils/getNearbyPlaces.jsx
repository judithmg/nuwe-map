import axios from 'axios';
import { urls } from '../constants';

const getNearbyPlaces = async (query, lat, long, limit = 5, radius = 1000) => {
  const queryString = `limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&key=${process.env.REACT_APP_TOMTOM}`;
  const response = await axios.get(`${urls.baseUrl}/${query}.json?${queryString}`);
  return response.data.results;
};

export default getNearbyPlaces;

const getNearbyButtons = async (lat, lon, category, rad = 1000) => {
  const buttonsUrl = `${urls.buttonUrl}lat=${lat}&lon=${lon}&radius=${rad}&limit=15&idxSet=POI&categorySet=${category}&key=${process.env.REACT_APP_TOMTOM}`;
  const response = await axios.get(buttonsUrl);
  console.log(response.data.results);
  return response.data.results;
};

export { getNearbyButtons };
