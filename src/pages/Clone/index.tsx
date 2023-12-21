import { connect } from '@umijs/max';
import { Button, Form, Typography } from 'antd';
import { createStructuredSelector } from 'reselect';

import {
  fetchBreakfastAction,
  fetchCategoryAction,
  fetchDesertAction,
  fetchLunchAction,
  fetchReservationAction,
  fetchRestaurantAction,
  submitFormAction,
} from '../Admin/store/actions';
import {
  selectorBreakfast,
  selectorCategory,
  selectorDesert,
  selectorLunch,
  selectorRestaurant,
} from '../Admin/store/selectors';
import styles from './style.admin.scss';

const MockComponent: React.FC = (props: any) => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    props.submitForm(values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <Title level={2} className={styles.title}>
          Page admin
        </Title>
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className={styles.buttonWrapper}>
          <Button>Delete Screen (CTRL + R)</Button>
          <Button
            type="primary"
            className={styles.saveButton}
            htmlType="submit"
          >
            Save (CTRL + S)
          </Button>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  restaurant: selectorRestaurant,
  category: selectorCategory,
  breakfast: selectorBreakfast,
  lunch: selectorLunch,
  desert: selectorDesert,
});

export const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategory: (id: string) => dispatch(fetchCategoryAction(id)),
    fetchRestaurant: () => dispatch(fetchRestaurantAction()),
    fetchBreakfast: (category: string) =>
      dispatch(fetchBreakfastAction(category)),
    fetchLunch: (category: string) => dispatch(fetchLunchAction(category)),
    fetchDesert: (category: string) => dispatch(fetchDesertAction(category)),
    fetchReservation: (id: string, resolve: any) =>
      dispatch(fetchReservationAction(id, resolve)),
    submitForm: (values: any) => dispatch(submitFormAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MockComponent);
