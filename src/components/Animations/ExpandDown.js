import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';

// Transition Wrapper for Animating a component or element by expanding it from the top
// duration is the length of all transitions, delay is optional
// inProp is the condition when Transition comes in
const ExpandDown = ({ duration = 300, delay = 0, in: inProp, children }) => {
  const defaultStyle = {
    // Transition "opacity" and "transform" CSS properties.
    // Set duration of the transition to the duration of the animation.
    // Transform origin is set to the top so when scaled by Y-axis it will expand down
    transition: `${duration}ms ease-out`,
    transitionProperty: 'opacity, transform',
    transitionDelay: `${delay}ms`,
    transformOrigin: 'center top'
  };

  // add an opacity transition to children so they don't show scaled from parents transition
  const defaultChildStyle = {
    opacity: 0,
    transition: `opacity ${duration}ms ease ${duration}`
  };

  // Styles that will be applied to children as the status
  // of the transition changes. Each key of the
  // 'transitionStyles' object matches the name of a
  // 'status' provided by <Transition />.
  const transitionStyles = {
    // Start with component invisible and scaled down on the Y-axis to 0
    entering: {
      opacity: 0,
      transform: 'scaleY(0)'
    },
    // Transition to component being visible and fully expanded
    entered: {
      opacity: 1,
      transform: 'scaleY(1)'
    },
    // Fade element out and scale it back down.
    exiting: {
      opacity: 0,
      transform: 'scaleY(0)',
      transitionDelay: '0ms'
    }
  };

  const childTransitionStyles = {
    // Start with component invisible
    entering: {
      opacity: 0
    },
    // Transition to component being visible delayed by the expanding down transition
    entered: {
      opacity: 1,
      transition: `opacity ${duration}ms ease ${duration}ms`
    },
    // Fade elements out by half of the parents expand back up .
    exiting: {
      opacity: 0,
      transition: `opacity ${duration / 2}ms ease 0ms`
    }
  };

  return (
    <Transition
      in={inProp}
      timeout={{
        enter: 0,
        exit: duration
      }}
    >
      {status => {
        // Don't render anything if component has 'exited'.
        if (status === 'exited') {
          return null;
        }

        // Apply different styles to children based
        // on the current value of 'status'.
        const currentStyles = transitionStyles[status];
        const currentChildrenStyles = childTransitionStyles[status];
        let styledChildren;

        if (children.props.children) {
          styledChildren = React.cloneElement(children.props.children, {
            style: Object.assign({}, defaultChildStyle, currentChildrenStyles)
          });
        }

        return React.cloneElement(children, {
          status,
          style: Object.assign({}, defaultStyle, currentStyles),
          children: styledChildren || undefined
        });
      }}
    </Transition>
  );
};

ExpandDown.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
  in: PropTypes.any.isRequired
};

export default ExpandDown;
