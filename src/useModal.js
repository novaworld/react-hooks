import React, { useState, createElement, createContext, useEffect, useContext, useMemo, useCallback } from 'react'
import { useImmer } from 'use-immer'
import { map } from 'lodash-es'
import { useWillUnmount } from './index'

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const [modals, setModals] = useImmer({});
    let timeoutHack

    const onShow = useCallback((key, component, data) => {

        setModals(state => {
            state[key] = {isOpen: true, isVisible: true, component, data}
        })
    }, [modals, setModals])

    const onHide = useCallback((key, onClose) => {
        timeoutHack = setTimeout(() => {
            setModals(state => {delete state[key]})
            clearTimeout(timeoutHack);
        }, 500);

        setModals(state => {state[key].isOpen = false})

        if (onClose) onClose()
    }, [modals, setModals])

    const contextValue = useMemo(() => ({onShow, onHide}), [onShow, onHide])

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
            {map(modals, ({component, isOpen, data}, key) =>
                component &&
                createElement(component, {
                    key: key,
                    isOpen: isOpen,
                    onClose: () => onHide(key),
                    ...data,
                })
            )}
        </ModalContext.Provider>
    )
}

const generateModalKey = (() => {
    let count = 0;
    return () => `${++count}`;
})();


function useModal(component, inputs = {}, onClose) {
    const key = useMemo(generateModalKey, []);
    const context = useContext(ModalContext);
    const modal = useMemo(() => component, []);

    const onShow = useCallback((modalData) => {
        context.onShow(key, modal, (modalData && modalData.nativeEvent instanceof Event) ? inputs : {...inputs, ...modalData})
    }, [context, inputs])

    const onHide = useCallback(() => context.onHide(key, onClose), [context])

    return Object.assign([
        onShow,
        onHide
    ], {})
}


export default useModal

