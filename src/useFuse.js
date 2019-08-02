// https://blog.logrocket.com/practical-react-hooks-how-to-refactor-your-app-to-use-hooks-b1867e7b0a53/
import { useCallback, useState, useEffect, useMemo, useRef } from 'react'
import { useDidUpdate, usePrevious } from './index'
import Fuse from 'fuse.js'
import { isEqual } from 'lodash-es'

function useFuse(text, documents, options = {}) {
    const [data, setData] = useState(documents)
    const [value, setValue] = useState(text)
    const prev = usePrevious({text, documents})

    const onChange = useCallback(e => setValue(e.target.value.trim()), []);
    const prevName = useRef;

    useEffect(() => {
        if(!prev) return

        if(!isEqual(prev.text, text)){
            setValue(text)
        }

        if(!isEqual(prev.documents, documents)){
            setData(documents)
        }
    })

    useEffect(() => {
        if (value.length > 0) {
            const fuse = new Fuse(data, options)
            setData(fuse.search(value))
        } else {
            setData(documents)
        }
    }, [value])

    return Object.assign([
        value,
        data,
        onChange,
    ], {
        input: value,
        filtered: data,
        onChange,
        bind: {onChange, value}
    })
}

export default useFuse