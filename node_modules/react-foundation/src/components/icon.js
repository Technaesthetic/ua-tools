import React, { PropTypes } from 'react';
import { GeneralPropTypes, createClassName, generalClassNames, removeProps } from '../utils';

/**
 * Icon component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Icon = props => {
  const className = createClassName(
    props.prefix,
    props.prefix ? `${props.prefix}-${props.name}` : props.name,
    generalClassNames(props)
  );

  return (
    <i {...removeProps(props, ['prefix', 'name'])} className={className}/>
  );
};

Icon.propTypes = {
  ...GeneralPropTypes,
  name: PropTypes.string.isRequired,
  prefix: PropTypes.string
};
