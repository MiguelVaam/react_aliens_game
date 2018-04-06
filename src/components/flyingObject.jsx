import React from 'react';
import PropTypes from 'prop-types';
import FlyingObjectBase from './flyingObjectBase';
import FlyingObjectTop from './flyingObjectTop';

const FlyingObject = props => (
  <g>
    <FlyingObjectBase position={props.position} />
    <FlyingObjectTop position={props.position} />
  </g>
);

FlyingObject.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
};

export default FlyingObject;