import React, { PropTypes } from 'react';
import { BadgeColors } from '../enums';
import { GeneralPropTypes, createClassName, generalClassNames, removeProps, objectValues } from '../utils';

/**
 * Badge component.
 * http://foundation.zurb.com/sites/docs/badge.html
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Badge = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'badge',
    props.className,
    props.color,
    generalClassNames(props)
  );

  return (
    <span {...removeProps(props, ['color'])} className={className}/>
  );
};

Badge.propTypes = {
  ...GeneralPropTypes,
  color: PropTypes.oneOf(objectValues(BadgeColors))
};
