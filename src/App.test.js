import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Primer welcome', () => {
  render(<App />);
  const primerElement = screen.getByText(/Primer React Challenge Boilerplate/i);
  expect(primerElement).toBeInTheDocument();
});
