import { useCallback, useMemo } from 'react'
import { useImmer } from "use-immer"
import { isFunction } from 'lodash-es'

function useSetState(initialState = {}) {
    const [state, set] = useImmer(initialState);
    const setState = useCallback(path => {
        isFunction(path) ? set(path) : set(draft => {
            draft = Object.assign({}, state, path)
        })
    }, [])

    return [state, setState];
}

export default useSetState