const { Post } = require('../models');

const postdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    user_id: 10,
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    body: 'https://nasa.gov/donec.json',
    user_id: 8,
  },
  {
    title:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    body: 'https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx',
    user_id: 1,
  },
  {
    title: 'Nunc purus.',
    body: 'http://desdev.cn/enim/blandit/mi.jpg',
    user_id: 4,
  },
  {
    title: 'Pellentesque eget nunc.',
    body: 'http://google.ca/nam/nulla/integer.aspx',
    user_id: 7,
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    body: 'https://stanford.edu/consequat.png',
    user_id: 4,
  },
  {
    title: 'In hac habitasse platea dictumst.',
    body: 'http://edublogs.org/non/ligula/pellentesque.js',
    user_id: 1,
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    body: 'http://ucla.edu/consequat/nulla.html',
    user_id: 1,
  },
  {
    title: 'Duis ac nibh.',
    body: 'http://theguardian.com/dui/vel/nisl/duis/ac/nibh.aspx',
    user_id: 9,
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    body: 'https://reverbnation.com/ligula/sit.jpg',
    user_id: 5,
  },
  {
    title: 'In hac habitasse platea dictumst.',
    body: 'http://china.com.cn/lectus/vestibulum.json',
    user_id: 3,
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    body: 'http://networksolutions.com/nam/ultrices/libero/non/mattis/pulvinar.json',
    user_id: 10,
  },
  {
    title: 'Donec dapibus.',
    body: 'https://instagram.com/ac/neque/duis/bibendum/morbi/non.xml',
    user_id: 8,
  },
  {
    title: 'Nulla tellus.',
    body: 'https://lycos.com/natoque/penatibus/et.html',
    user_id: 3,
  },
  {
    title:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    body: 'https://gmpg.org/lorem.jpg',
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
