import { useState, useEffect } from 'react';

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export function useDimensions() {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }, 1000);
    
    window.addEventListener('resize', debouncedHandleResize)
    return _ => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return { height, width };
}