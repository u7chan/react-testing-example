import { httpGet } from './httpClient';

const dateAPI = async (): Promise<Date> => {
    const url = "/date/current";
    try {
        const { data } = await httpGet(url);
        return new Date(data.currentDate);
    } catch (error) {
        throw new Error(error);
    }
};

export default dateAPI;
