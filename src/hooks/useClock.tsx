import { useFrame } from "@react-three/fiber";
import { ReactNode, createContext, useContext, useReducer, useState } from "react";

import { ClockContextValue, SettingsActionTypes, SettingsState, SettingsAction } from "@/types/clock";

const now = new Date()

const speedMultiplicator = 10

const initialSettings = {
    play: true,
    speed: 1000000000,
    forwards: true,
}

export const settingsActions = {
    play: { type: SettingsActionTypes.PLAY },
    pause: { type: SettingsActionTypes.PAUSE },
    forwards: { type: SettingsActionTypes.FORWARDS },
    backwards: { type: SettingsActionTypes.BACKWARDS },
    speedIncrease: { type: SettingsActionTypes.INCREASE_SPEED },
    speedDecrease: { type: SettingsActionTypes.DECREASE_SPEED }
}

const settingsReducer = (
    state: SettingsState,
    action: SettingsAction,
) => {
    const { type } = action

    switch (type) {
        case SettingsActionTypes.PLAY:
            return { ...state, play: true };
        case SettingsActionTypes.PAUSE:
            return { ...state, play: false };
        case SettingsActionTypes.FORWARDS:
            return { ...state, forwards: true };
        case SettingsActionTypes.BACKWARDS:
            return { ...state, forwards: false };
        case SettingsActionTypes.INCREASE_SPEED:
            return { ...state, speed: state.speed * speedMultiplicator };
        case SettingsActionTypes.DECREASE_SPEED:
            return { ...state, speed: state.speed / speedMultiplicator }
    }
}


const ClockContext = createContext<ClockContextValue>({} as ClockContextValue)

export const ClockProvider = ({ children }: { children: ReactNode }) => {
    const [date, setDate] = useState(now)
    const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings)


    useFrame(({ clock }) => {
        setDate((previousDate) => {
            if (!settings.play) {
                return previousDate
            }

            if (!settings.forwards) {
                return new Date(previousDate.getTime() - (clock.oldTime + clock.getDelta() * settings.speed))
            }

            return new Date(previousDate.getTime() + (clock.oldTime + clock.getDelta() * settings.speed))
        })
    })

    const value = { date, settings, dispatchSettings }

    return (
        <ClockContext.Provider value={value}>
            {children}
        </ClockContext.Provider>
    )
}

export const useClock = () => {
    return useContext(ClockContext)
}