export const DOTS = "...";
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, id) => id + start);
};
export const utilPagination = ({
  totalCount,
  siblingCount,
  currentPage,
  itemsOnPage,
}) => {
    let paginationRange = []
    const totalPageCount = Math.ceil(totalCount / itemsOnPage);
    const totalPageNumbers = siblingCount + 5;
    /*
      Если количество страниц меньше, чем номера страниц, которые мы хотим показать в нашем
      paginationComponent, мы возвращаем длину [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    //Определяем с какого и до какого момента должны показываться многоточии
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    //Различные кейсы отображения
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 2 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      paginationRange = [...leftRange, DOTS, totalPageCount];

    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 2 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      paginationRange = [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      paginationRange = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  return paginationRange;
};
