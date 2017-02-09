import React from 'react';
import { createClassName, generalClassNames, GeneralPropTypes } from '../utils';

/**
 * Div component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Block = props => (
  <div {...props} className={createClassName(props.className, generalClassNames(props))}/>
);

Block.propTypes = {
  ...GeneralPropTypes
};

/**
 * Span component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Inline = props => (
  <span {...props} className={createClassName(props.className, generalClassNames(props))}/>
);

Inline.propTypes = {
  ...GeneralPropTypes
};
