import React, { PropTypes } from 'react';
import { CalloutColors, CalloutSizes } from '../enums';
import { GeneralPropTypes, createClassName, generalClassNames, removeProps, objectValues } from '../utils';

/**
 * Callout component.
 * http://foundation.zurb.com/sites/docs/callout.html
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Callout = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'callout',
    props.className,
    props.color,
    props.size,
    generalClassNames(props)
  );

  return (
    <div {...removeProps(props, ['color'])} className={className}/>
  );
};

Callout.propTypes = {
  ...GeneralPropTypes,
  color: PropTypes.oneOf(objectValues(CalloutColors)),
  size: PropTypes.oneOf(objectValues(CalloutSizes))
};
