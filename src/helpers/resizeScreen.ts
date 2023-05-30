export const handleResize = (
  breakpoint: number,
  setIsDesktop: (isDesktop: boolean) => void
) => {
  setIsDesktop(window.innerWidth >= breakpoint);
};

export const addResizeListener = (
  breakpoint: number,
  setIsDesktop: (isDesktop: boolean) => void
) => {
  const resizeHandler = () => handleResize(breakpoint, setIsDesktop);
  window.addEventListener("resize", resizeHandler);

  return () => {
    window.removeEventListener("resize", resizeHandler);
  };
};
