import React from 'react';

const replaceUnderscore = (string) => string.replace(/_/g, ' ');

const Place = ({ data }) => (
  <div>
    <h3>{data.poi.name}</h3>
    <h4>
      {replaceUnderscore(data.poi.classifications[0].code)}
      {' '}
      |
      {' '}
      {(data.dist / 1000).toFixed(2)}
      km
      away
    </h4>
    <div>
      <p>
        {data.address.streetNumber}
        {' '}
        {data.address.streetName}
      </p>
      <p>{data.address.municipality}</p>
      <p>{data.address.countrySubdivision}</p>
      <p>{data.address.postalCode}</p>
    </div>
  </div>
);

export default Place;
