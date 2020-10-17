import axios from 'axios';
import mock from '../mocks/$mock';
import config from '../config';

export const httpClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 5000,
});
export const httpGet = (url: string) => httpClient.get(url);
export const httpPost = (url: string, data: any) => httpClient.post(url, data);

if (config.api.useMock) {
  mock(httpClient)
    .enableLog()
    .setDelayTime(500);
}