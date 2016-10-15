import React, { PropTypes } from 'react';
import { GeneralPropTypes, createClassName, generalClassNames } from '../utils';

/**
 * FlexVideo component.
 * http://foundation.zurb.com/sites/docs/flex-video.html
 *
 * @param {Object} props
 * @returns {Object}
 */
export const FlexVideo = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'flex-video',
    props.className,
    {
      widescreen: props.isWidescreen,
      vimeo: props.isVimeo
    },
    generalClassNames(props)
  );

  return (
    <div {...props} className={className}/>
  );
};

FlexVideo.propTypes = {
  ...GeneralPropTypes,
  isWidescreen: PropTypes.bool,
  isVimeo: PropTypes.bool
};
