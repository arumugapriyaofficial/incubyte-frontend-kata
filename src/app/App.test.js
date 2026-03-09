import { render, screen } from '@testing-library/react';
import App from '../app/App';

test('renders Pokémon Explorer title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Pokémon Explorer/i);
  expect(titleElement).toBeInTheDocument();
});
