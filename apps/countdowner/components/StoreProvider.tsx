import React, {createContext, useContext} from 'react'
import {RootStore}                        from '@mobile-mono/store'

const StoreContext = createContext<RootStore>({} as RootStore)

export const useStore = () => useContext(StoreContext)
export const StoreProvider = StoreContext.Provider
