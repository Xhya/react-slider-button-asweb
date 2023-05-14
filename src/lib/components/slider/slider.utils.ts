export const getElementWidth = (element: any) => element.offsetWidth;
export const getElementLeftPositionOnScreen = (element: any) =>
  element.getBoundingClientRect().left;
export const getElementRightPositionOnScreen = (element: any) =>
  getElementLeftPositionOnScreen(element) + getElementWidth(element);
