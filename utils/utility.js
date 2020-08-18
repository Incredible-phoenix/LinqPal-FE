
import PAGES from 'constants/links/pages';
import { useEffect } from 'react';

const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
  'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};



const removeItemWithSlice = (items, index) => {
  return [...items.slice(0, index), ...items.slice(index + 1)]
};

export {
  isEmpty,
  removeItemWithSlice
};
