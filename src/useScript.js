import { useEffect, useState } from 'react'
import { map } from 'lodash-es'

/**
 * Hook to load an external script. Returns true once the script has finished loading.
 *
 * @param {string} url The external script to load
 * @return boolean True if the script has been loaded
 * */

export default function useScript({src, ...rest}) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        function onLoad() {
            // The ready event is fired whenever the resource is loaded, but it doesn't know if it was successful
            setReady(true)
        }

        function onError() {
            // The ready event is fired whenever the resource is loaded, but it doesn't know if it was successful
            setReady(false)
        }

        let script = document.querySelector(
            `script[src="${src}"]`,
        )

        if (!script) {
            script = document.createElement('script')
            script.src = src
            script.async = true
            // Add script to document body
            document.body.appendChild(script)

            script.onerror = () => {
                if (script) script.setAttribute('data-failed', 'true')
            }
            script.onload = () => {
                if (script) script.setAttribute('data-loaded', 'true')
            }

            map(rest, (v, k) => {
                script.setAttribute(k, v)
            })

            // $(script).attr(rest)
        } else {
            if (script.getAttribute('data-loaded') === 'true') {
                setReady(true)
                // Already loaded, so we can return early
                return () => {}
            }
        }

        // Add load event listener
        script.addEventListener('load', onLoad)
        script.addEventListener('error', onError)

        return () => {
            if (script) {
                script.removeEventListener('load', onLoad)
                script.removeEventListener('error', onError)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src])

    return ready
}