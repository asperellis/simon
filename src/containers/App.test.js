import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

test('Text Changes', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  component.root.findByType('button').props.onClick();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
