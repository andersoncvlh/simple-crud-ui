const proxy = [
  {
    context: '/api',
    target: 'http://localhost:8180',
    pathRewrite: {'^/api' : ''}
  }
];
export default proxy;
