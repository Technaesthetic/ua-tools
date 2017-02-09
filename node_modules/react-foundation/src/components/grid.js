import React, { PropTypes } from 'react';
import { HorizontalAlignments, VerticalAlignments } from '../enums';
import {
  GeneralPropTypes,
  createClassName,
  generalClassNames,
  removeProps
} from '../utils';

/**
 * Row component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Row = props => {
  const className = createClassName(
    props.noDefaultClassName ? null : 'row',
    props.className,
    props.upOnSmall ? `small-up-${props.upOnSmall}` : null,
    props.upOnMedium ? `medium-up-${props.upOnMedium}` : null,
    props.upOnLarge ? `large-up-${props.upOnLarge}` : null,
    {
      'align-right': props.horizontalAlignment === HorizontalAlignments.RIGHT,
      'align-center': props.horizontalAlignment === HorizontalAlignments.CENTER,
      'align-justify': props.horizontalAlignment === HorizontalAlignments.JUSTIFY,
      'align-spaced': props.horizontalAlignment === HorizontalAlignments.SPACED,
      'align-top': props.verticalAlignment === VerticalAlignments.TOP,
      'align-middle': props.verticalAlignment === VerticalAlignments.MIDDLE,
      'align-bottom': props.verticalAlignment === VerticalAlignments.BOTTOM,
      'align-stretch': props.verticalAlignment === VerticalAlignments.STRETCH,
      'small-unstack': props.unstackOnSmall,
      'medium-unstack': props.unstackOnMedium,
      'large-unstack': props.unstackOnLarge,
      'small-collapse': props.collapseOnSmall,
      'medium-collapse': props.collapseOnMedium,
      'large-collapse': props.collapseOnLarge,
      'small-uncollapse': props.uncollapseOnSmall,
      'medium-uncollapse': props.uncollapseOnMedium,
      'large-uncollapse': props.uncollapseOnLarge,
      'collapse': props.isCollapsed,
      'expanded': props.isExpanded,
      'column': props.isColumn
    },
    generalClassNames(props)
  );

  return (
    <div {...props} className={className}/>
  );
};

Row.propTypes = {
  ...GeneralPropTypes,
  upOnSmall: PropTypes.number,
  upOnMedium: PropTypes.number,
  upOnLarge: PropTypes.number,
  horizontalAlignment: PropTypes.string,
  verticalAlignment: PropTypes.string,
  unstackOnSmall: PropTypes.bool,
  unstackOnMedium: PropTypes.bool,
  unstackOnLarge: PropTypes.bool,
  collapseOnSmall: PropTypes.bool,
  collapseOnMedium: PropTypes.bool,
  collapseOnLarge: PropTypes.bool,
  uncollapseOnSmall: PropTypes.bool,
  uncollapseOnMedium: PropTypes.bool,
  uncollapseOnLarge: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  isExpanded: PropTypes.bool,
  isColumn: PropTypes.bool
};

/**
 * Column component.
 *
 * @param {Object} props
 * @returns {Object}
 */
export const Column = props => {
  const defaultClassName = props.isColumn ? 'column' : 'columns';
  const className = createClassName(
    props.noDefaultClassName ? null : defaultClassName,
    props.className,
    props.small ? `small-${props.small}` : null,
    props.medium ? `medium-${props.medium}` : null,
    props.large ? `large-${props.large}` : null,
    props.offsetOnSmall ? `small-offset-${props.offsetOnSmall}` : null,
    props.offsetOnMedium ? `medium-offset-${props.offsetOnMedium}` : null,
    props.offsetOnLarge ? `large-offset-${props.offsetOnLarge}` : null,
    props.pushOnSmall ? `small-push-${props.pushOnSmall}` : null,
    props.pushOnMedium ? `medium-push-${props.pushOnMedium}` : null,
    props.pushOnLarge ? `large-push-${props.pushOnLarge}` : null,
    props.pullOnSmall ? `small-pull-${props.pullOnSmall}` : null,
    props.pullOnMedium ? `medium-pull-${props.pullOnMedium}` : null,
    props.pullOnLarge ? `large-pull-${props.pullOnLarge}` : null,
    props.orderOnSmall ? `small-order-${props.orderOnSmall}` : null,
    props.orderOnMedium ? `medium-order-${props.orderOnMedium}` : null,
    props.orderOnLarge ? `large-order-${props.orderOnLarge}` : null,
    {
      'small-centered': props.centerOnSmall,
      'medium-centered': props.centerOnMedium,
      'large-centered': props.centerOnLarge,
      'small-uncentered': props.uncenterOnSmall,
      'medium-uncentered': props.uncenterOnMedium,
      'large-uncentered': props.uncenterOnLarge,
      'small-expand': props.expandOnSmall,
      'medium-expand': props.expandOnMedium,
      'large-expand': props.expandOnLarge,
      'shrink': props.isShrunk,
      'end': props.isLast
    },
    generalClassNames(props)
  );

  return (
    <div {...removeProps(props, ['offset'])} className={className}/>
  );
};

Column.propTypes = {
  ...GeneralPropTypes,
  small: PropTypes.number,
  medium: PropTypes.number,
  large: PropTypes.number,
  offsetOnSmall: PropTypes.number,
  offsetOnMedium: PropTypes.number,
  offsetOnLarge: PropTypes.number,
  pushOnSmall: PropTypes.number,
  pushOnMedium: PropTypes.number,
  pushOnLarge: PropTypes.number,
  pullOnSmall: PropTypes.number,
  pullOnMedium: PropTypes.number,
  pullOnLarge: PropTypes.number,
  orderOnSmall: PropTypes.number,
  orderOnMedium: PropTypes.number,
  orderOnLarge: PropTypes.number,
  centerOnSmall: PropTypes.bool,
  centerOnMedium: PropTypes.bool,
  centerOnLarge: PropTypes.bool,
  uncenterOnSmall: PropTypes.bool,
  uncenterOnMedium: PropTypes.bool,
  uncenterOnLarge: PropTypes.bool,
  expandOnSmall: PropTypes.bool,
  expandOnMedium: PropTypes.bool,
  expandOnLarge: PropTypes.bool,
  isShrunk: PropTypes.bool,
  isLast: PropTypes.bool
};
