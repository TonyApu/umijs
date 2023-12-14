import * as React from 'react'
import Admin from './index';
import renderer from 'react-test-renderer';

jest.mock('umi', () => {
  const originModule = jest.requireActual('umi');
  return {
    ...originModule,
    connect: () => (component) => ({ WrappedComponent: component }),
  };
});

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  const Typography = ({ children, onChange }) => {
    return <typography onChange={e => onChange(e.target.value)}>{children}</typography>;
  };
  Typography.Title = ({ children, ...otherProps }) => {
    return <title {...otherProps}>{children}</title>;
  }
  
  return {
    ...antd,  
    Typography,
  }
});

describe('App component', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Admin />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
