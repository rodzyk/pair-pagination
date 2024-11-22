import { pairPagination, pairPaginationByItems } from '../src'

describe('pairPagination', () => {
    const TOTAL_PAGES = 21;

    it('should return an empty array when totalPages is 0', () => {
        const result = pairPagination({ currentPage: 1, totalPages: 0 });
        expect(result).toEqual([]);
    });

    it('should return correct pairs for a single page', () => {
        const result = pairPagination({ currentPage: 1, totalPages: 1 });
        expect(result).toEqual([1]);
    });

    it('should generate pairs for an even current page', () => {
        const result = pairPagination({ currentPage: 4, totalPages: 10, flat: false });
        expect(result).toEqual([1, [2, 3], [4, 5], [6, 7], [8, 9], 10]);
    });

    it('should generate pairs for an odd current page', () => {
        const result = pairPagination({ currentPage: 3, totalPages: 10, flat: false });
        expect(result).toEqual([1, [2, 3], [4, 5], [8, 9], 10]);
    });

    it('should respect pairLimit', () => {
        const result = pairPagination({ currentPage: 5, totalPages: 12, pairLimit: 2, flat: false });
        expect(result).toEqual([1, [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], 12]);
    });

    it('should flatten results when flat is true', () => {
        const result = pairPagination({ currentPage: 4, totalPages: 10, flat: true });
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should return nested results when flat is false', () => {
        const result = pairPagination({ currentPage: 4, totalPages: 10, flat: false });
        expect(result).toEqual([1, [2, 3], [4, 5], [6, 7], [8, 9], 10]);
    });
})

describe('generatePagePairsByItems', () => {
    it('should calculate totalPages based on totalItems and limitItems', () => {
        const result = pairPaginationByItems({
            totalItems: 500, limitItems: 10, currentPage: 3, pairLimit: 2, flat: true
        });

        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 46, 47, 48, 49, 50]);
    });

    it('should handle edge case with single item', () => {
        const result = pairPaginationByItems({
            totalItems: 1, limitItems: 10, currentPage: 1
        });
        expect(result).toEqual([1]);
    });

    it('should respect pairLimit and flat option', () => {
        const result = pairPaginationByItems({
            totalItems: 100, limitItems: 10, currentPage: 5, pairLimit: 2, flat: false
        });
        expect(result).toEqual([1, [2, 3], [4, 5], [6, 7], [8, 9], 10]);
    });
});