import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import './index.scss';
import { texts } from '../../constants';

const NotFound = ({ areFiltered, setAreFiltered }) => (
  !areFiltered && (
  <div className="not-found__container">
    <button type="button" onClick={() => setAreFiltered(true)}>
      <FontAwesomeIcon icon={faTimes} className="icon" />
    </button>
    <div className="not-found__body">
      <h3>{texts.maps.notFound.title}</h3>
      <p>{texts.maps.notFound.content}</p>
    </div>
  </div>
  )
);

export default NotFound;
