import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from './SignIn';

describe('SignInPage', () => {
  it('renders sign-in form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignInPage />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('submits sign-in form with valid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignInPage />);

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'eve.holt@reqres.in' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'cityslicka' } });
    fireEvent.click(getByText('Sign In'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeTruthy();
      // Add more assertions as needed based on successful sign-in behavior
    });
  });

  it('displays error message on invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignInPage />);

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalid.email@reqres.in' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.click(getByText('Sign In'));

    await waitFor(() => {
      expect(getByText('Invalid credentials. Please try again.')).toBeTruthy();
    });
  });
});
