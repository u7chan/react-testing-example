import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { httpGet, httpPost } from '../api/httpClient';

jest.mock('../api/httpClient');
const httpGetMock = httpGet as jest.Mock;
const httpPostMock = httpPost as jest.Mock;

describe('<Login />', () => {
  it('Login Success Case', async () => {
    const currentDate = new Date('2000-10-05T14:48:35.123Z');
    const email = 'test@example.com';
    const password = '1234';

    window.alert = (message) => expect(message).toBe('Login Success');

    httpGetMock.mockImplementation(async (url: string) => {
      expect(url).toBe('/date/current');
      const data = { currentDate: currentDate.toISOString() };
      return { data };
    });

    httpPostMock.mockImplementation(async (url: string, data: any) => {
      expect(url).toBe('/auth/login');
      expect(data).toStrictEqual({
        email,
        password,
      });
    });

    render(<Login />);

    expect(
      await screen.findByText(currentDate.toLocaleString())
    ).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('email'), email);
    await userEvent.type(screen.getByLabelText('password'), password);

    act(() => userEvent.click(screen.getByRole('button', { name: 'LOGIN' })));
  });

  it('Login Failure Case', async () => {
    const currentDate = new Date('2000-10-05T14:48:35.123Z');
    const email = 'test@example.com';
    const password = '1234';

    window.alert = (message) => expect(message).toBe('Login Failure');

    httpGetMock.mockImplementation(async (url: string) => {
      expect(url).toBe('/date/current');
      const data = { currentDate: currentDate.toISOString() };
      return { data };
    });

    httpPostMock.mockImplementation(async (url: string, data: any) => {
      expect(url).toBe('/auth/login');
      expect(data).toStrictEqual({
        email,
        password,
      });
      throw new Error();
    });

    render(<Login />);

    expect(
      await screen.findByText(currentDate.toLocaleString())
    ).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('email'), email);
    await userEvent.type(screen.getByLabelText('password'), password);

    act(() => userEvent.click(screen.getByRole('button', { name: 'LOGIN' })));
  });
});
