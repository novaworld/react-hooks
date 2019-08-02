import { useEffect } from 'react'

export default function useWillUnmount(f){
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => typeof f === "function" && f(), [])
}