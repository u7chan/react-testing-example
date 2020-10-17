import { httpPost } from './httpClient';

const loginAPI = async (email: string, password: string): Promise<void> => {
    const url = "/auth/login";
    const params = { email, password };
    try {
        await httpPost(url, params)
    } catch (error) {
        throw new Error(error);
    }
};

export default loginAPI;
