import { useEffect, useReducer, useState } from 'react'
import { isString, assign } from 'lodash-es'
import { useImmerReducer } from 'use-immer'
import axios, {CancelToken} from 'axios';
import { createAction } from "redux-starter-kit"

const fetchInit = createAction('FETCH_INIT'),
    fetchSuccess = createAction('FETCH_SUCCESS'),
    fetchFailure = createAction('FETCH_FAILURE')

const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

function reducer(state, {type, payload}) {
    switch (type) {
        case 'FETCH_INIT':
            state = assign({}, initialState, {isLoading: true})
            break
        case 'FETCH_SUCCESS':
            state = assign(state, {isLoading: false, data: payload})
            break
        case 'FETCH_FAILURE':
            state = assign(state, {isLoading: false, error: payload})
            break
        case 'RESET':
            state.data = null
            break
        default:
            throw new Error()
    }
}

async function fetchData({onSuccess, ...config}, dispatch) {
    try {
        dispatch(fetchInit());
        const {data} = await axios(config)
        dispatch(fetchSuccess(data));
        if (onSuccess) onSuccess(data)
    } catch (err) {
        dispatch(fetchFailure(err));
    }
}

// function useFetch(config) {
//     if (isString(config)) {
//         config = {
//             url: config
//         }
//     }
//
//     const [state, dispatch] = useImmerReducer(reducer, initialState)
//
//     useLayoutEffect(() => {
//         let didCancel = false;
//         fetchData({...config, didCancel}, dispatch)
//         return () => {
//             dispatch({type: 'RESET'})
//             didCancel = true
//         }
//     }, [JSON.stringify(config)])
//
//     const reset = () => dispatch({type: 'RESET'})
//
//     return  [
//         state,
//         reset
//     ]
// }
const dataFetchReducer = (state, {type, payload}) => {
    switch (type) {
        case 'FETCH_INIT':
            return {
                data: null,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};


function useFetch(config) {
    if (isString(config)) {
        config = {
            url: config
        }
    }
    const {customHandler, trigger, ...conf} = config
    const [innerTrigger, setInnerTrigger] = useState(0);
    const [state, dispatch] = useReducer(dataFetchReducer, initialState);

    let outerTrigger;
    try {
        outerTrigger = JSON.stringify({...trigger, url: conf.url});
    } catch (err) {
        //
    }

    useEffect(() => {
        if (!conf.url) return;

        const source = CancelToken.source();
        fetchData({...conf, cancelToken: source.token}, dispatch)
        return () => {
            source.cancel();
        }
    }, [outerTrigger, innerTrigger])

    return {
        ...state,
        isShown: !state.isLoading && state.data,
        refresh: () => {
            setInnerTrigger(+new Date());
        }
    }
}


export default useFetch