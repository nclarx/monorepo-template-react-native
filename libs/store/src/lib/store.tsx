import {Instance, SnapshotIn, types} from 'mobx-state-tree'
import {v4 as uuidv4}                from 'uuid'

export interface Timer extends SnapshotIn<typeof Timer> {
}

const Timer = types.model({
    timerId: types.string,
    timerName: types.string,
    timerEnd: types.number,
    timerRunning: types.boolean,
    timeRemaining: types.maybe(types.number)
})

const TimerStoreModel = types.model({
        timers: types.maybe(types.array(Timer))
    })
    .actions((self) => ({
        createTimer: (timer: Timer) => {
            self.timers.push({
                ...timer,
                timerId: uuidv4()
            })
        },
        startTimer: (timerId: string) => {
            const index = self.timers.findIndex((timer) => timer.timerId === timerId)
            self.timers[index].timerRunning = true
        },
        stopTimer: (timerId: string) => {
            const index = self.timers.findIndex((timer) => timer.timerId === timerId)
            self.timers[index].timerRunning = false
        },
        updateTimeRemaining: (timerId: string, timeRemaining: number) => {
            const index = self.timers.findIndex((timer) => timer.timerId === timerId)
            self.timers[index].timeRemaining = timeRemaining
        },
        getTimeRemaining: (timerId: string) => {
            const index = self.timers.findIndex((timer) => timer.timerId === timerId)
            return self.timers[index].timeRemaining
        }
    }))

const AppSettingsModel = types.model({
    darkMode: types.boolean
})

export interface RootStore extends Instance<typeof RootStoreModel> {
}

const RootStoreModel = types.model({
    timerStore: TimerStoreModel,
    appSettings: AppSettingsModel
})

export const createStore = (): RootStore => {
    return RootStoreModel.create({
        appSettings: {darkMode: false},
        timerStore: {
            timers: [{
                timerRunning: true,
                timerId: uuidv4(),
                timeRemaining: undefined,
                timerEnd: Date.now() + 1000000,
                timerName: 'Today plus 1000000 seconds'
            }]
        }
    })
}


