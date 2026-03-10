import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from './FilterBar';

const defaultProps = {
  search: '',
  setSearch: jest.fn(),
  activeType: null,
  setActiveType: jest.fn(),
  sort: 'id',
  setSort: jest.fn(),
  allTypes: ['fire', 'water'],
};

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 1: Search box is present and calls setSearch on change
// ─────────────────────────────────────────────────────────────────────────────
test('renders the search input', () => {
  render(<FilterBar {...defaultProps} />);
  expect(screen.getByPlaceholderText(/Search Pokémon/i)).toBeInTheDocument();
});

test('calls setSearch when user types in the search box', () => {
  render(<FilterBar {...defaultProps} />);
  const input = screen.getByPlaceholderText(/Search Pokémon/i);
  fireEvent.change(input, { target: { value: 'bulba' } });
  expect(defaultProps.setSearch).toHaveBeenCalledWith('bulba');
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 2: Clear (×) button appears when search has text and clears it
// ─────────────────────────────────────────────────────────────────────────────
test('shows clear button when search has text and clears it on click', () => {
  render(<FilterBar {...defaultProps} search="char" />);
  const clearBtn = screen.getByRole('button', { name: '×' });
  expect(clearBtn).toBeInTheDocument();
  fireEvent.click(clearBtn);
  expect(defaultProps.setSearch).toHaveBeenCalledWith('');
});

test('does not show clear button when search is empty', () => {
  render(<FilterBar {...defaultProps} search="" />);
  expect(screen.queryByRole('button', { name: '×' })).not.toBeInTheDocument();
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 3: Type filter buttons are rendered for provided types
// ─────────────────────────────────────────────────────────────────────────────
test('renders a button for each type', () => {
  render(<FilterBar {...defaultProps} />);
  expect(screen.getByRole('button', { name: /fire/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /water/i })).toBeInTheDocument();
});

test('clicking a type button calls setActiveType with that type', () => {
  render(<FilterBar {...defaultProps} />);
  fireEvent.click(screen.getByRole('button', { name: /fire/i }));
  expect(defaultProps.setActiveType).toHaveBeenCalledWith('fire');
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 4: Clicking an active type deselects it
// ─────────────────────────────────────────────────────────────────────────────
test('clicking an active type calls setActiveType with null (deselect)', () => {
  render(<FilterBar {...defaultProps} activeType="fire" />);
  fireEvent.click(screen.getByRole('button', { name: /fire/i }));
  expect(defaultProps.setActiveType).toHaveBeenCalledWith(null);
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 5: "All" button resets type filter
// ─────────────────────────────────────────────────────────────────────────────
test('"All" button calls setActiveType with null', () => {
  render(<FilterBar {...defaultProps} activeType="fire" />);
  fireEvent.click(screen.getByRole('button', { name: /^all$/i }));
  expect(defaultProps.setActiveType).toHaveBeenCalledWith(null);
});

// ─────────────────────────────────────────────────────────────────────────────
// RED → GREEN 6: Sort dropdown calls setSort with chosen value
// ─────────────────────────────────────────────────────────────────────────────
test('sort dropdown calls setSort when value changes', () => {
  render(<FilterBar {...defaultProps} />);
  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'name' } });
  expect(defaultProps.setSort).toHaveBeenCalledWith('name');
});
