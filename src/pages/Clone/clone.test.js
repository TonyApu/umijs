import * as React from "react";
import renderer from 'react-test-renderer';
import Clone, { mapDispatchToProps } from './index';

jest.mock('@umijs/max', () => {
  return {
    ...jest.requireActual('@umijs/max'),
    connect: () => (Component) => Component,
  };
});

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useEffect: (effect) => effect(),
// }));

// jest.mock('ahooks', () => ({
//   ...jest.requireActual('ahooks'),
//   useUpdateEffect: (effect) => effect(),
// }));

jest.mock('../Admin/store/selectors', () => ({
  selectorRestaurant: jest.fn().mockReturnValue([
    {
      value: 'res1',
      label: 'Bar & Grill',
    },
    {
      value: 'res2',
      label: 'Gordan Ramsay Burger',
    },
  ]),
  selectorBreakfast: jest.fn().mockReturnValue([
    {
      value: 'egg',
      label: 'Egg',
    },
    {
      value: 'classic',
      label: 'Classic',
    },
  ]),
  selectorCategory: jest.fn().mockReturnValue(''),
  selectorLunch: jest.fn().mockReturnValue(''),
  selectorDesert: jest.fn().mockReturnValue(''),
  selectorReservation: jest.fn().mockReturnValue(''),
}));

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  const Typography = ({ children }) => {
    return <typography>{children}</typography>;
  };
  Typography.Title = ({ children, ...otherProps }) => {
    return <title {...otherProps}>{children}</title>;
  };

  const Form = ({ children, ...otherProps  }) => {
    return <form {...otherProps}>{children}</form>;
  };

  // Form.Item = ({ children, ...otherProps }) => {
  //   return <item {...otherProps}>{children}</item>;
  // };

  return {
    ...antd,
    Typography,
    Form: {
      ...Form,
      useForm: () => [{
        setFieldValue: jest.fn(),
        submit: jest.fn(),
        resetFields: jest.fn()
      }],
    },
  };
});

describe('App component', () => {
  it('mock fetchRestaurant', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchRestaurant();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'menu/fetchRestaurant' });
  });

  it('mock fetchCategory', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchCategory();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'menu/fetchCategory' });
  });

  it('mock fetchBreakfast', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchBreakfast();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'menu/fetchBreakfast' });
  });

  it('mock fetchLunch', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchLunch();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'menu/fetchLunch' });
  });

  it('mock fetchDesert', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchDesert();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'menu/fetchDesert' });
  });

  it('mock fetchReservation', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchReservation();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'menu/fetchReservation',
    });
  });

  it('mock submitForm', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).submitForm();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'menu/submitForm' });
  });

  it('matches the snapshot', () => {
    const baseProps = {
      fetchRestaurant: jest.fn(),
      fetchCategory: jest.fn(),
      fetchBreakfast: jest.fn(),
      fetchLunch: jest.fn(),
      fetchDesert: jest.fn(),
      fetchReservation: jest.fn(),
    };
    const tree = renderer.create(<Clone {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
