export const getPaginationParams = (total) => {
    const pollingNumberTimes = Math.min(process.env.POLLING_NUMBER_TIMES, Number(total) || 1)
    const quantileTotals = total / pollingNumberTimes
    const getMaxPerPage = (quantile) => { // this is improving the performance
        if (quantile < 1) {
            return 1
        }
        if (quantile > process.env.PAGINATION_MAX_PER_PAGE) {
            return process.env.PAGINATION_MAX_PER_PAGE
        }
        return Math.trunc(quantile)
    }
    const perPage = getMaxPerPage(quantileTotals)
    const pagesCount = Math.ceil(total / perPage)
    const quantileStep = Math.ceil(pagesCount / pollingNumberTimes)
    return {perPage, pagesCount, quantileStep};
}
