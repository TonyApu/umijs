import type { SelectProps } from 'antd';
import { defineMock } from 'umi';

type Product = {
  id: string;
  name: string;
  price: number;
  withSauce: boolean;
  quantity: number;
  expiredDate: Date;
  description?: string;
  src: string;
};

let products: Product[] = [
  {
    id: '1',
    name: 'Bánh Rán',
    price: 15000,
    withSauce: true,
    quantity: 1,
    expiredDate: new Date('2024-11-01'),
    description:
      'Bánh rán hay bánh cam là một loại bánh của Việt Nam, vỏ mỏng bằng bột gạo nếp, bột gạo tẻ và có thể có thêm khoai tây xay nhuyễn, được rán vàng, bên trong có nhân đậu xanh, nước cốt dừa hoặc thịt lợn, miến, mộc nhĩ, hành khô, hạt tiêu.',
    src: 'https://daylambanh.edu.vn/wp-content/uploads/2017/09/banh-ran-doremon.jpg',
  },
  {
    id: '2',
    name: 'Takoyaki',
    price: 35000,
    withSauce: true,
    quantity: 4,
    description:
      'Takoyaki là một loại bánh nướng ăn nhẹ có hình cầu làm bằng bột mì với nhân bạch tuộc, nướng trong chảo takoyakiki. Thành phần chính của nhân bánh là bạch tuộc băm hay thái hạt lựu có thể độn thêm một số thứ khác và rắc thêm một số gia vị cũng như còn được tẩm với nước sốt tùy vào công thức mà chúng có thể khác nhau.',
    expiredDate: new Date('2024-12-22'),
    src: 'https://s3-iconicjob-vn.imgix.net/prod/wp-content/uploads/2020/08/29140036/takoyaki-la-gi.jpg',
  },
  {
    id: '3',
    name: 'Shushi',
    price: 25400,
    withSauce: true,
    quantity: 5,
    description:
      'Sushi là một món ăn Nhật Bản gồm cơm trộn giấm kết hợp với các nguyên liệu khác. Neta và hình thức trình bày sushi rất đa dạng, nhưng nguyên liệu chính mà tất cả các loại sushi đều có là shari. Neta phổ biến nhất là hải sản. Thịt sống cắt lát gọi riêng là sashimi.',
    expiredDate: new Date('2024-12-22'),
    src: 'https://alosushi.vn/images/ckeditor/images/sushi.png',
  },
  {
    id: '4',
    name: 'Mì Lạnh',
    price: 25000,
    withSauce: false,
    quantity: 3,
    description:
      'Mì lạnh kiểu Nhật được làm từ bột kiều mạch, sợi mì mỏng nhẹ và được dùng kèm với nước tương.',
    expiredDate: new Date('2024-10-15'),
    src: 'https://cdn.tgdd.vn/2021/03/CookProduct/thumb1-1200x676-22.jpg',
  },
];

const restaurants: SelectProps['options'] = [
  {
    value: 'res1',
    label: 'Bar & Grill',
  },
  {
    value: 'res2',
    label: 'Gordan Ramsay Burger',
  },
];

const category:any = {
  res1: [
    {
      value: 'egg',
      label: 'Egg',
    },
    {
      value: 'classic',
      label: 'Classic',
    },
  ],
  res2: [
    {
      value: 'burger',
      label: 'Burger',
    },
  ],
};

const breakfast:any = {
  egg: [
    {
      value: 'eggBf1',
      label: 'Eggs Benedict',
    },
    {
      value: 'eggBf2',
      label: 'Breakfast Roll',
    },
    {
      value: 'eggBf3',
      label: 'French Omelette',
    },
  ],
  classic: [
    {
      value: 'classicBf1',
      label: 'Fruit Salad',
    },
    {
      value: 'classicBf2',
      label: 'Avocado on toast',
    },
    {
      value: 'classicBf3',
      label: 'Bircher Muesli',
    },
  ],
  burger: [
    {
      value: 'burgerBf1',
      label: 'Backyard Burger',
    },
    {
      value: 'burgerBf2',
      label: 'Stout Burger',
    },
  ]
};

const lunch:any = {
  egg: [
    {
      value: 'eggL1',
      label: 'Steak & egg',
    },
    {
      value: 'eggL2',
      label: 'Egg Royale',
    },
  ],
  classic: [
    {
      value: 'classicL1',
      label: 'Pasta',
    },
    {
      value: 'classicL2',
      label: 'Caesar Salad',
    },
    {
      value: 'classicL3',
      label: 'Bircher Muesli',
    },
  ],
  burger: [
    {
      value: 'burgerL1',
      label: 'Double Cheese Burger',
    },
    {
      value: 'burgerL2',
      label: 'Beef Wellingtons',
    },
  ]
};

const desert:any = {
  egg: [
    {
      value: 'eggD1',
      label: 'Latte',
    },
    {
      value: 'eggL2',
      label: 'Cappuccino',
    },
  ],
  classic: [
    {
      value: 'classicD1',
      label: 'Earl Grey',
    },
    {
      value: 'classicD2',
      label: 'Peppermint',
    },
  ],
  burger: [
    {
      value: 'burgerD1',
      label: 'Orange',
    },
    {
      value: 'burgerD2',
      label: 'Apple',
    },
  ]
};

export default defineMock({
  'GET /api/products': (_, res) => {
    res.send({
      status: 'ok',
      data: products,
    });
  },
  'DELETE /api/products/:id': (req, res) => {
    products = products.filter((item) => item.id !== req.params.id);
    res.send({ status: '200' });
  },
  'POST /api/login/getNewToken': (_, res) => {
    res.send({
      status: 'ok',
      data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjI3OTYyNDUyLCJleHAiOjE2Mjc5NjMwNTJ9.SbDZKlG1Z7eLcfsPjFviE65XKz-Y2fPqgNoWs3W2J8w',
    });
  },
  'GET /api/menu/restaurant': (_, res) => {
    res.send({
      status: 'ok',
      data: restaurants,
    });
  },
  'GET /api/menu/category/:res': (req, res) => {
    res.send({
      status: 200,
      data: category[`${req.params.res}`],
    });
  },
  'GET /api/menu/breakfast/:cat': (req, res) => {
    res.send({
      status: 200,
      data: breakfast[`${req.params.cat}`],
    });
  },
  'GET /api/menu/lunch/:cat': (req, res) => {
    res.send({
      status: 200,
      data: lunch[`${req.params.cat}`],
    });
  },
  'GET /api/menu/desert/:cat': (req, res) => {
    res.send({
      status: 200,
      data: desert[`${req.params.cat}`],
    });
  },
});
