import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import './index.scss';
import { map } from '../../constants';

const NotFound = ({ areFiltered, setAreFiltered }) => (
  !areFiltered && (
  <div className="not-found__container">
    <button type="button" onClick={() => setAreFiltered(true)}>
      <FontAwesomeIcon icon={faTimes} className="icon" />
    </button>
    <div className="not-found__body">
      <h3>{map.maps.notFound.title}</h3>
      <p>{map.maps.notFound.content}</p>
    </div>
  </div>
  )
);

export default NotFound;
