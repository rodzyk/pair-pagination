# Pair Pagination

**Pair Pagination** is a simple TypeScript utility for generating page pairs in pagination. It allows you to create customizable pagination structures with options like pair limits and flat or nested outputs.

---

## Features

- **Generate Page Pairs:** Create pairs of pages for easy navigation in paginated content.
- **Customizable Options:** Configure pair limits, flat or nested output formats, and more.
- **TypeScript Support:** Fully typed for seamless integration with TypeScript projects.
- **Lightweight and Simple:** Easy to use and requires minimal setup.

---

## Installation

Install the library using npm:

```bash
npm i pair-pagination
```

## Usage

### Import and Use

```typescript
import { pairPagination } from 'pair-pagination';

const pairs = pairPagination({ 
    currentPage: 4, 
    totalPages: 10, 
    flat: false 
});

console.log(pairs); 
// Output: [1, [2, 3], [4, 5], [6, 7], [8, 9], 10]
```

### API

#### `pairPagination(options: PaginationOptions): PairPagination`

Generates page pairs based on the provided pagination options.

`PaginationOptions`:

- `currentPage` (number): The currently active page.
- `totalPages` (number): Total number of pages.
- `pairLimit` (number, optional): The number of pairs to display around the current page. Default is `1`.
- `flat` (boolean, optional): If true, flattens the output into a single array. Default is `true`.

Returns:

- `PagePairs`: An array of numbers or pairs of numbers.

#### `pairPaginationByItems(option: PairPaginationByItemsOption): PairPagination `

Generates page pairs based on the total number of items and items per page.

`PairPaginationByItemsOption`:

- `totalItems` (number): Total number of items.
- `limitItems` (number): Number of items per page.
- `currentPage` (number): The currently active page.
- `pairLimit` (number, optional): The number of pairs to display around the current page. Default is `1`.
- `flat` (boolean, optional): If true, flattens the output into a single array. Default is `true`.

Returns:

- `PagePairs`: An array of numbers or pairs of numbers.

## Testing

Run tests using Jest:

```bash 
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on the GitHub repository.