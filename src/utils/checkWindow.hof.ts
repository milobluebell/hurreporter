
type TCheckWindow = (PerformanceObserver: typeof window.PerformanceObserver) => void
const checkWindow = function (fn: TCheckWindow) {
  const _context = this;
  if (window) {
    // TODO 这个每次都new，是否会造成夸张的性能问题，暂时不知。如果有就搞成单例
    return function () { fn.call(_context, window.PerformanceObserver) };
  } else throw new Error(`this function must running in broswer`);
}

export default checkWindow