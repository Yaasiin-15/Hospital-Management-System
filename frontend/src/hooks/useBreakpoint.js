import { useState, useEffect } from 'react';

const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

/**
 * A hook that returns the current screen breakpoint
 * @returns {Object} An object containing boolean flags for each breakpoint
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState({
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2xl: false
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isXs: width >= parseInt(breakpoints.xs),
        isSm: width >= parseInt(breakpoints.sm),
        isMd: width >= parseInt(breakpoints.md),
        isLg: width >= parseInt(breakpoints.lg),
        isXl: width >= parseInt(breakpoints.xl),
        is2xl: width >= parseInt(breakpoints['2xl'])
      });
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

/**
 * A hook that returns true when the screen width is below the specified breakpoint
 * @param {string} breakpoint - The breakpoint to check against (xs, sm, md, lg, xl, 2xl)
 * @returns {boolean} True if the screen width is below the specified breakpoint
 */
export const useBreakpointValue = (breakpoint = 'md') => {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const breakpointWidth = parseInt(breakpoints[breakpoint]) || parseInt(breakpoints.md);
      setIsBelowBreakpoint(window.innerWidth < breakpointWidth);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isBelowBreakpoint;
};