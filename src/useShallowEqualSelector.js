import { useSelector, shallowEqual } from 'react-redux'

function useShallowEqualSelector(selector) {
    return useSelector(selector, shallowEqual)
}

export default useShallowEqualSelector