export default {
  post: async ({ data }) => {
    const { email, password } = data;
    if (email === 'test@example.com' && password === '1234') {
      return [200];
    }
    return [401]; // Unauthorized
  },
};
