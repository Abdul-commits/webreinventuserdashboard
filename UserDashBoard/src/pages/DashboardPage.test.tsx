import React from 'react';
import { render, waitFor } from '@testing-library/react';
import DashboardPage from './Dashboard';

describe('DashboardPage', () => {
  it('renders loading state initially', () => {
    const { getByText } = render(<DashboardPage />);

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders user data after successful fetch', async () => {
    // Mock localStorage getItem
    const mockToken = 'mocked_token';
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(mockToken);

    const { getByText } = render(<DashboardPage />);

    await waitFor(() => {
      expect(getByText('Welcome, Janet Weaver!')).toBeTruthy();
      expect(getByText('Email: janet.weaver@reqres.in')).toBeTruthy();
      // Add more assertions based on the expected user data display
    });
  });

  it('displays error message if token is missing', async () => {
    // Mock localStorage getItem returning null
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(null);

    const { getByText } = render(<DashboardPage />);

    await waitFor(() => {
      expect(getByText('Error: Token not found.')).toBeTruthy();
    });
  });
});
