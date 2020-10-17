export default {
  get: async () => {
    return [200, { currentDate: new Date().toISOString() }];
  },
};
