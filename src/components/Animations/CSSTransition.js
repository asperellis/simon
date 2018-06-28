import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';

// Transition Wrapper for Animating a component or element
// duration is the length of all transitions, delay is optional
// inProp is the condition when Transition comes in
// cssProps is an array of arrays with the property to animate followed by the start and end values
const CSSTransition = ({
  duration = 300,
  delay = 0,
  cssProps = [],
  in: inProp,
  children
}) => {
  // creates a style obj with transition property for each property to transition
  const transitionStrReducer = (stylesObj, cssProp, currentIndex) => {
    const propName = cssProp[0];
    const propertyTransition = `${propName} ${duration}ms ease-out ${
      stylesObj.child ? duration : delay
    }ms`;

    if (currentIndex === 0) {
      stylesObj.transition = propertyTransition;
    } else {
      stylesObj.transition += `, ${propertyTransition}`;
    }

    return stylesObj;
  };

  // creates a styles object for <Transition> component stages
  const stylesObjReducer = (stylesObj, cssProp) => {
    const propName = cssProp[0];
    const propStart = cssProp[1];
    const propEnd = cssProp[2];

    stylesObj.entering[propName] = propStart;
    stylesObj.entered[propName] = propEnd;
    stylesObj.exiting[propName] = propStart;

    return stylesObj;
  };

  // creates a stlye object with the transition values for each css property to animate
  const defaultStyle = cssProps.reduce(transitionStrReducer, {});

  // Styles that will be applied to children as the status
  // of the transition changes. Each key of the
  // 'transitionStyles' object matches the name of a
  // 'status' provided by <Transition />.
  const transitionStyles = cssProps.reduce(stylesObjReducer, {
    entering: {},
    entered: {},
    exiting: {}
  });

  return (
    <Transition
      in={inProp}
      timeout={{
        enter: 0,
        exit: duration
      }}
      unMountOnExit
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
          status,
          style: Object.assign({}, defaultStyle, currentStyles)
        });
      }}
    </Transition>
  );
};

CSSTransition.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
  in: PropTypes.any.isRequired,
  cssProps: PropTypes.array.isRequired,
  childCssProps: PropTypes.array
};

export default CSSTransition;
