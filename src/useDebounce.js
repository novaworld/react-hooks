import { useRef } from 'react';
import { debounce } from 'lodash-es';

function useDebounce(func, wait, options) {
    return useRef(debounce(func, wait, options)).current;
}

export default useDebounce;
