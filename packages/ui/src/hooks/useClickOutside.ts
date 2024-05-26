"use client"

import {RefObject, useEffect } from "react";

/**
 * Listens for click events outside of a specified element and calls a callback function when clicked outside.
 *
 * @param {RefObject<HTMLElement>} ref - The ref object that points to the element to observe for click events outside.
 * @param {function} callback - The callback function to be called when a click event occurs outside the specified element.
 * @returns {void}
 */
const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback])
}

export default useClickOutside

