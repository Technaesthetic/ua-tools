import React, { PropTypes } from 'react';
import { ProgressColors } from '../enums';
import { GeneralPropTypes, createClassName, generalClassNames, removeProps, objectValues } from '../utils';

/**
 * Progress component.
 * http://foundation.zurb.com/sites/docs/progress-bar.html
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Progress = props => {
  const { meter: meterProps = {} } = props;

  const className = createClassName(
    props.noDefaultClassName ? null : 'progress',
    props.className,
    props.color,
    generalClassNames(props)
  );

  if (props.value) {
    meterProps.style = meterProps.style || {};
    meterProps.style.width = `${props.value}%`;
  }

  return (
    <div {...removeProps(props, ['color', 'value'])}
      className={className}
      role="progressbar"
      aria-valuemin={props.min}
      aria-valuemax={props.max}
      aria-valuenow={props.value}
      aria-valuetext={props.valueText}>
      {meterProps.text ? <ProgressMeterWithText {...meterProps} /> : <ProgressMeter {...meterProps} />}
    </div>
  );
};

Progress.propTypes = {
  ...GeneralPropTypes,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  color: PropTypes.oneOf(objectValues(ProgressColors))
};

/**
 * Progress meter sub-component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const ProgressMeter = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'progress-meter',
    props.className,
    generalClassNames(props)
  );

  return (
    <div {...props} className={className}/>
  );
};

/**
 * Progress meter with text sub-component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const ProgressMeterWithText = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'progress-meter',
    props.className,
    generalClassNames(props)
  );

  return (
    <span {...props} className={className}>
      <ProgressMeterText>{props.text}</ProgressMeterText>
    </span>
  );
};

/**
 * Progress meter text sub-component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const ProgressMeterText = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'progress-meter-text',
    props.className,
    generalClassNames(props)
  );

  return (
    <p {...props} className={className}/>
  );
};

/**
 * Native progress component.
 * http://foundation.zurb.com/sites/docs/progress-bar.html#native-progress
 *
 * @param {Object} props
 * @returns {Object}
 */
export const NativeProgress = props => {
  const className = createClassName(
    props.className,
    props.color,
    generalClassNames(props)
  );

  return (
    <progress {...removeProps(props, ['color'])} className={className}/>
  );
};

NativeProgress.propTypes = {
  ...GeneralPropTypes,
  max: PropTypes.number,
  value: PropTypes.number,
  color: PropTypes.oneOf(objectValues(ProgressColors))
};

// TODO: Consider adding support for native meter.
