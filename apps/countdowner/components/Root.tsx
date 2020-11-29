import * as React from "react"
import { connectReduxDevtools } from "mst-middlewares"

import { StoreProvider } from "./StoreProvider"
import App               from "./App"
import {createStore}     from '@mobile-mono/store'
import remotedev from 'remotedev'


const rootStore = createStore()

connectReduxDevtools(remotedev, rootStore)

const Root: React.FunctionComponent<{}> = () => (
    <StoreProvider value={rootStore}>
        <App />
    </StoreProvider>
)

export default Root
