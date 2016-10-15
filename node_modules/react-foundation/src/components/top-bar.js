import React from 'react';
import { GeneralPropTypes, createClassName, generalClassNames } from '../utils';

/**
 * Top bar component.
 * http://foundation.zurb.com/sites/docs/top-bar.html
 *
 * @param {Object} props
 * @returns {Object}
 */
export const TopBar = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'top-bar',
    props.className,
    generalClassNames(props)
  );

  return (
    <div {...props} className={className}/>
  );
};

TopBar.propTypes = {
  ...GeneralPropTypes
};

/**
 * Top bar title sub-component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const TopBarTitle = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'top-bar-title',
    props.className,
    generalClassNames(props)
  );

  return (
    <div {...props} className={className}/>
  );
};

TopBarTitle.propTypes = {
  ...GeneralPropTypes
};

/**
 * Top bar left sub-component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const TopBarLeft = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'top-bar-left',
    props.className,
    generalClassNames(props)
  );

  return (
    <div {...props} className={className}/>
  );
};

TopBarLeft.propTypes = {
  ...GeneralPropTypes
};

/**
 * Top bar right sub-component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const TopBarRight = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'top-bar-right',
    props.className,
    generalClassNames(props)
  );

  return (
    <div {...props} className={className}/>
  );
};

TopBarRight.propTypes = {
  ...GeneralPropTypes
};
