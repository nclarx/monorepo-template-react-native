import React, {createContext, useEffect, useState}                   from 'react'
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native'

import {Colors}                      from 'react-native/Libraries/NewAppScreen'
// @ts-ignore
import {Provider}                    from 'mobx-react'
import {RootStore, rootStore, Timer} from '@mobile-mono/store'
import {observer}                    from 'mobx-react-lite'
import {getSnapshot}                 from 'mobx-state-tree'

const App = () => {

    const StoreContext = createContext<RootStore>({} as RootStore)

    const [darkMode, setDarkMode] = useState<boolean>(false)
    const [timers, setTimers] = useState<Timer[]>()
    const [runningTimers, setRunningTimers] = useState<{ timerId: string, intervalId: number }[]>()

    const store = rootStore
    useEffect(() => {
        if (store && timers) {

            const snapshot = getSnapshot(store)

            const {appSettings, timerStore} = snapshot
            console.log(appSettings)

            setDarkMode(store.appSettings.darkMode)
            setTimers([...store.timerStore.timers])
            console.log(timers)
            timers.forEach((timer) => {
                if (timer.timerRunning) {
                    console.log(timer)
                    const interval = setIntervalForTimer(timer.timerId, timer.timerEnd)
                    console.log(interval)
                    setRunningTimers(
                        [
                            ...(runningTimers || []),
                            {intervalId: interval, timerId: timer.timerId}
                        ]
                    )
                }
            })
        }
    }, [store.appSettings.darkMode, store.timerStore.timers])


    const setIntervalForTimer: (timerId: string, timerEnd: number) => number =
        (timerId, timerEnd) => setInterval(() => {
            const timeRemaining = calculateTimeRemaining(timerEnd)
            store.timerStore.updateTimeRemaining(timerId, timeRemaining)
            console.log(timeRemaining, store.timerStore.getTimeRemaining(timerId))
        }, 1000)


    const startTimer = (timerId: string) => setInterval(() => {
        store.timerStore.startTimer(timerId)
    })

    const stopTimer = (intervalId: number, timerId: string) => {
        clearInterval(intervalId)
        store.timerStore.stopTimer(timerId)
    }

    const calculateTimeRemaining: (timerEnd) => number = (timerEnd) => {
        return timerEnd - Date.now()
    }

    return (
        <Provider store={store}>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    <View>
                        {
                            timers && timers.map((timer) => {
                                <View>
                                    <Text>
                                        {timer.timerName}
                                    </Text>
                                    <Text>
{/*
                                        {store.timerStore.getTimeRemaining(timer.timerId)}
*/}
                                    </Text>
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter
    },
    header: {
        backgroundColor: '#143055',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24
    },
    logo: {
        width: 200,
        height: 180,
        resizeMode: 'contain'
    },
    heading: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.lighter
    },
    body: {
        backgroundColor: Colors.white
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark
    },
    highlight: {
        fontWeight: '700'
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right'
    },
    link: {
        color: '#45BC98'
    }
})

export default observer(App)
