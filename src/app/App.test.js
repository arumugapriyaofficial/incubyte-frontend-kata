import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../app/App';

// ─── Minimal mock Pokémon factory ─────────────────────────────────────────────
const makeMockPokemon = (id, name, types = ['fire'], hp = 45) => ({
  id,
  name,
  types: types.map(t => ({ type: { name: t } })),
  stats: [
    { stat: { name: 'hp' }, base_stat: hp },
    { stat: { name: 'attack' }, base_stat: 49 },
    { stat: { name: 'defense' }, base_stat: 49 },
    { stat: { name: 'speed' }, base_stat: 45 },
  ],
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'sprite.png',
    other: { 'official-artwork': { front_default: 'artwork.png' } },
  },
});

const MOCK_CHARMANDER = makeMockPokemon(4, 'charmander', ['fire']);
const MOCK_SQUIRTLE   = makeMockPokemon(7, 'squirtle', ['water']);

// ─── Mock global fetch ────────────────────────────────────────────────────────
beforeEach(() => {
  global.fetch = jest.fn(url => {
    if (url.includes('/api/v2/pokemon?limit')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: [
            { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
            { name: 'squirtle',   url: 'https://pokeapi.co/api/v2/pokemon/7/' },
          ],
        }),
      });
    }
    if (url.includes('/4/')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(MOCK_CHARMANDER) });
    }
    if (url.includes('/7/')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(MOCK_SQUIRTLE) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 1: App renders the main title
// ─────────────────────────────────────────────────────────────────────────────
test('renders Pokémon Explorer title', () => {
  render(<App />);
  expect(screen.getByText(/Pokémon Explorer/i)).toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 2: Skeleton cards display while data is loading
// ─────────────────────────────────────────────────────────────────────────────
test('shows skeleton cards while loading', () => {
  render(<App />);
  // skeleton cards have the CSS class `skeleton-card`
  const skeletons = document.querySelectorAll('.skeleton-card');
  expect(skeletons.length).toBeGreaterThan(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 3: Pokémon cards appear after data loads
// ─────────────────────────────────────────────────────────────────────────────
test('renders Pokémon cards after data loads', async () => {
  render(<App />);
  expect(await screen.findByText(/Charmander/i)).toBeInTheDocument();
  expect(await screen.findByText(/Squirtle/i)).toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 4: Search filter narrows results
// ─────────────────────────────────────────────────────────────────────────────
test('search input filters Pokémon cards by name', async () => {
  render(<App />);
  await screen.findByText(/Charmander/i);

  const input = screen.getByPlaceholderText(/Search Pokémon/i);
  fireEvent.change(input, { target: { value: 'char' } });

  expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  expect(screen.queryByText(/Squirtle/i)).not.toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 5: Type filter button narrows results
// ─────────────────────────────────────────────────────────────────────────────
test('type filter button shows only matching Pokémon', async () => {
  render(<App />);
  await screen.findByText(/Charmander/i);

  const waterBtn = screen.getByRole('button', { name: /water/i });
  fireEvent.click(waterBtn);

  expect(screen.queryByText(/Charmander/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Squirtle/i)).toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 6: Clicking a card opens the detail modal
// ─────────────────────────────────────────────────────────────────────────────
test('clicking a Pokémon card opens the detail modal', async () => {
  render(<App />);
  const card = await screen.findByText(/Charmander/i);
  fireEvent.click(card);

  // Modal shows the Pokémon name in the header
  expect(await screen.findAllByText(/Charmander/i)).toHaveLength(2); // card + modal
  expect(document.querySelector('.detail-backdrop')).toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 7: Clicking the close button dismisses the modal
// ─────────────────────────────────────────────────────────────────────────────
test('close button dismisses the detail modal', async () => {
  render(<App />);
  const card = await screen.findByText(/Charmander/i);
  fireEvent.click(card);

  const closeBtn = document.querySelector('.detail-header__close');
  fireEvent.click(closeBtn);

  await waitFor(() => {
    expect(document.querySelector('.detail-backdrop')).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 8: Clicking the backdrop dismisses the modal
// ─────────────────────────────────────────────────────────────────────────────
test('clicking the backdrop dismisses the detail modal', async () => {
  render(<App />);
  const card = await screen.findByText(/Charmander/i);
  fireEvent.click(card);

  const backdrop = document.querySelector('.detail-backdrop');
  fireEvent.click(backdrop);

  await waitFor(() => {
    expect(document.querySelector('.detail-backdrop')).not.toBeInTheDocument();
  });
});
