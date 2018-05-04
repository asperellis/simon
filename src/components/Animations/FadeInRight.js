import React from 'react';
import Transition from 'react-transition-group/Transition';

const FadeInRight = ({ in: inProp, children, duration, delay = 0 }) => {
  const defaultStyle = {
    transition: `all ${duration}ms ease-out ${delay}ms`,
    transform: 'translateX(5%)',
    opacity: 0.01
  };

  const transitionStyles = {
    entering: { opacity: 0.01, transform: 'translateX(5%)' },
    entered: { opacity: 1, transform: 'translateX(0)' },
    exiting: { opacity: 0, transform: 'translateX(0)' },
    exited: { opacity: 0, transform: 'translateX(5%)' }
  };

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
          style: Object.assign({}, defaultStyle, currentStyles)
        });
      }}
    </Transition>
  );
};

export default FadeInRight;
