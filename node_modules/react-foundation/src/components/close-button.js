import React from 'react';
import { GeneralPropTypes, createClassName, generalClassNames } from '../utils';

/**
 * Close button component.
 * http://foundation.zurb.com/sites/docs/close-button.html
 *
 * @param {Object} props
 * @returns {Object}
 */
export const CloseButton = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'close-button',
    props.className,
    generalClassNames(props)
  );

  return (
    <button {...props} className={className}/>
  );
};

CloseButton.propTypes = {
  ...GeneralPropTypes
};
