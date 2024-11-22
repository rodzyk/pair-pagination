export type PairPaginationOption = {
    currentPage: number,
    totalPages: number,
    pairLimit?: number,
    flat?: boolean
}

export type PairPaginationByItemsOption = {
    totalItems: number,
    limitItems: number,
    currentPage: number,
    pairLimit?: number,
    flat?: boolean
}

export type PairPagination = (number | number[])[];

export function pairPagination(options: PairPaginationOption): PairPagination {

    const { currentPage, totalPages, pairLimit = 1, flat = true } = options

    const pages: PairPagination = [];

    if (totalPages === 0) return pages;

    pages.push(1);

    const isCurrentEven = currentPage % 2 == 0;
    const isTotalEven = totalPages % 2 == 0;

    const firstPair = 1 + pairLimit * 2;
    const lastPair = totalPages - pairLimit * 2 - (isTotalEven ? 0 : 1);

    //
    // Current page left pair
    const leftPairEnd = isCurrentEven ? currentPage - 1 : currentPage - 2;
    const leftPairStart = leftPairEnd - pairLimit * 2 + 2;

    for (let i = 2; i <= firstPair; i += 2) {
        if (i >= 2 && (i + 1) < leftPairStart) pages.push([i, i + 1]);
    }

    for (let i = leftPairStart; i <= leftPairEnd; i += 2) {
        if (i > 1) pages.push([i - 1, i]);
    }

    //
    // Current page pair
    if (currentPage != 1 && currentPage != totalPages) {
        isCurrentEven
            ? pages.push([currentPage, currentPage + 1])
            : pages.push([currentPage - 1, currentPage]);
    }

    //
    // Current page right pair
    const rightPairStart = pages.flat()[pages.flat().length - 1] + 1;
    const rightPairEnd = rightPairStart + pairLimit * 2;

    for (let i = rightPairStart; i < rightPairEnd; i += 2) {
        if (i < totalPages) pages.push([i, i + 1]);
    }

    for (let i = lastPair; i <= totalPages; i += 2) {
        if (i + 1 <= totalPages && i + 1 > rightPairEnd) pages.push([i, i + 1]);
    }

    if (totalPages !== 1 && !pages.flat().includes(totalPages)) {
        pages.push(totalPages);
    }

    return flat ? pages.flat() : pages;
}

export function pairPaginationByItems(
    option: PairPaginationByItemsOption
): PairPagination {
    const { totalItems, limitItems, currentPage, pairLimit, flat } = option
    const totalPages = Math.ceil(totalItems / limitItems);

    return pairPagination({ currentPage, totalPages, pairLimit, flat })
}