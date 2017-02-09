import React from 'react';
import { GeneralPropTypes, createClassName, generalClassNames } from '../utils';

/**
 * Thumbnail component.
 * http://foundation.zurb.com/sites/docs/switch.html
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Thumbnail = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'thumbnail',
    props.className,
    generalClassNames(props)
  );

  return (
    <img {...props} className={className}/>
  );
};

Thumbnail.propTypes = {
  ...GeneralPropTypes
};

/**
 * Thumbnail link component.
 * http://foundation.zurb.com/sites/docs/switch.html
 *
 * @param {Object} props
 * @returns {Object}
 */
export const ThumbnailLink = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'thumbnail',
    props.className,
    generalClassNames(props)
  );

  // TODO: Consider improving how properties are set for both the link and image.

  return (
    <a className={className}><img {...props}/></a>
  );
};

ThumbnailLink.propTypes = {
  ...GeneralPropTypes
};
