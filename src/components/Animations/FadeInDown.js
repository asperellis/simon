import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';

// Transition Wrapper for Animating a component or element by moving it down by its height while it slowly becomes visible
// duration is the length of all transitions, delay is optional
// inProp is the condition when Transition comes in
const FadeInDown = ({ duration = 300, delay = 0, in: inProp, children }) => {
  const defaultStyle = {
    // Transition "opacity" and "transform" CSS properties.
    // Set duration of the transition to the duration of the animation.
    transition: `${duration}ms ease-out`,
    transitionProperty: 'opacity, transform',
    transitionDelay: `${delay}ms`
  };

  // Styles that will be applied to children as the status
  // of the transition changes. Each key of the
  // 'transitionStyles' object matches the name of a
  // 'status' provided by <Transition />.
  const transitionStyles = {
    // Start with component invisible and shifted up by 100%
    entering: {
      opacity: 0,
      transform: 'translateY(-100%)'
    },
    // Transition to component being visible and having its position reset.
    entered: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    // Fade element out and slide it back up on exit.
    exiting: {
      opacity: 0,
      transform: 'translateY(-100%)'
    }
  };

  return (
    <Transition
      in={inProp}
      timeout={{
        enter: 0,
        exit: duration
      }}
      unmountOnExit
    >
      {status => {
        // Don't render anything if component has 'exited'.
        if (status === 'exited') {
          return null;
        }

        // Apply different styles to children based
        // on the current value of 'status'.
        const currentStyles = transitionStyles[status];

        return React.cloneElement(children, {
          style: Object.assign({}, defaultStyle, currentStyles)
        });
      }}
    </Transition>
  );
};

FadeInDown.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
  in: PropTypes.any.isRequired
};

export default FadeInDown;
