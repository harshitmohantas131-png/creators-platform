import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders the app without crashing', () => {
    render(<App />);
    // Check if Header is rendered
    expect(screen.getByRole('banner')).toBeInTheDocument();
    // Check if Footer is rendered
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});