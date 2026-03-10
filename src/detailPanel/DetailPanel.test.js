import { render, screen, fireEvent } from '@testing-library/react';
import { DetailPanel } from './DetailPanel';

const mockPokemon = {
  id: 4,
  name: 'Charmander',
  types: ['fire'],
  hp: 39,
  attack: 52,
  defense: 43,
  speed: 65,
  height: 6,
  weight: 85,
  sprite: <img src="sprite.png" alt="charmander" />,
};

const mockOnClose = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 1: Renders nothing when no Pokémon is selected
// ─────────────────────────────────────────────────────────────────────────────
test('renders nothing when pokemon prop is null', () => {
  const { container } = render(<DetailPanel pokemon={null} onClose={mockOnClose} />);
  expect(container).toBeEmptyDOMElement();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 2: Renders the Pokémon name in the modal header
// ─────────────────────────────────────────────────────────────────────────────
test('displays the Pokémon name', () => {
  render(<DetailPanel pokemon={mockPokemon} onClose={mockOnClose} />);
  expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 3: Renders the Pokémon ID badge
// ─────────────────────────────────────────────────────────────────────────────
test('displays the Pokémon ID formatted as #004', () => {
  render(<DetailPanel pokemon={mockPokemon} onClose={mockOnClose} />);
  expect(screen.getByText(/#004/)).toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 4: Renders physical specs (height and weight)
// ─────────────────────────────────────────────────────────────────────────────
test('renders Height and Weight labels', () => {
  render(<DetailPanel pokemon={mockPokemon} onClose={mockOnClose} />);
  expect(screen.getByText(/Height/i)).toBeInTheDocument();
  expect(screen.getByText(/Weight/i)).toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 5: Renders the Base Stats section
// ─────────────────────────────────────────────────────────────────────────────
test('renders the Base Stats header', () => {
  render(<DetailPanel pokemon={mockPokemon} onClose={mockOnClose} />);
  expect(screen.getByText(/Base Stats/i)).toBeInTheDocument();
});

test('renders a Total stat value', () => {
  render(<DetailPanel pokemon={mockPokemon} onClose={mockOnClose} />);
  expect(screen.getByText(/Total/i)).toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 6: Close button calls onClose
// ─────────────────────────────────────────────────────────────────────────────
test('close button calls onClose when clicked', () => {
  render(<DetailPanel pokemon={mockPokemon} onClose={mockOnClose} />);
  const closeBtn = document.querySelector('.detail-header__close');
  fireEvent.click(closeBtn);
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 7: Clicking the backdrop calls onClose
// ─────────────────────────────────────────────────────────────────────────────
test('clicking the backdrop calls onClose', () => {
  render(<DetailPanel pokemon={mockPokemon} onClose={mockOnClose} />);
  const backdrop = document.querySelector('.detail-backdrop');
  fireEvent.click(backdrop);
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 8: Clicking inside the modal does NOT call onClose
// ─────────────────────────────────────────────────────────────────────────────
test('clicking inside the modal does not close it (stopPropagation)', () => {
  render(<DetailPanel pokemon={mockPokemon} onClose={mockOnClose} />);
  const modal = document.querySelector('.detail-modal');
  fireEvent.click(modal);
  expect(mockOnClose).not.toHaveBeenCalled();
});
