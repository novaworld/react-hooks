import { useState, useCallback } from 'react'
import { isString } from 'lodash-es'
import copy from 'copy-to-clipboard'

function useCopyClipboard(config) {
    const [isCopied, setIsCopied] = useState(false);

    if (isString(config)) {
        config = {
            text: config
        }
    }

    const {text, options, onCopy} = config

    const onClick = useCallback(() => {
        const result = copy(text, options);
        setIsCopied(result)

        if (onCopy) onCopy(text, result);
    }, [config.text])

    return [
        isCopied,
        onClick
    ]
}

export default useCopyClipboard