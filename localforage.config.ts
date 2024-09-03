import localforage from 'localforage';

localforage.config({
  name: 'myapp',
  storeName: 'data',
  description: 'My application data',
});

export default localforage;