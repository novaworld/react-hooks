import { useState, useCallback, useMemo } from 'react'
import { isFunction, isNumber } from 'lodash-es'

const defaultOptions = {};

function useInput(initialValue = '', opts = defaultOptions) {
    const [value, setValue] = useState(initialValue)

    const onChange = useCallback(e => {
        const newValue = e.target.value
        let shouldUpdate = true
        if (isFunction(opts.validate)){
            shouldUpdate = opts.validate(newValue, value)
        }

        if(shouldUpdate){
            setValue(newValue)
        }
    }, []);


    return Object.assign([
        value, onChange
    ], {
        value,
        hasValue: value !== undefined && value !== null && (!isNumber(value) ? value.trim && value.trim() !== "" : true),
        onChange,
        setValue,
        clear: useCallback(() => setValue(''), []),
        bind: {
            onChange,
            value
        }
    })
}

export default useInput