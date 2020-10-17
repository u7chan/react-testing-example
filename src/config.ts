export default {
    api: {
        useMock: process.env.REACT_APP_API_USE_MOCK === 'true',
        baseUrl: process.env.REACT_APP_API_BASE_URL || '',
    },
};