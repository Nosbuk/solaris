import { Html } from '@react-three/drei'
import React from 'react'
import { IoPlayOutline } from "react-icons/io5";
import { CiPause1 } from "react-icons/ci";
import { RiSpeedLine } from "react-icons/ri";

import { Button } from '@/components/ui/Button'
import { settingsActions, useClock } from '@/hooks/useClock';
import getFormattedDateString from '@/utils/getFormattedDateString'

const TimeController = () => {
    const { date, dispatchSettings, settings } = useClock()

    const onPlay = () => {
        dispatchSettings(settingsActions.play)
    }

    const onPause = () => {
        dispatchSettings(settingsActions.pause)
    }

    const onForwards = () => {
        dispatchSettings(settingsActions.forwards)
    }

    const onBackwards = () => {
        dispatchSettings(settingsActions.backwards)
    }

    const onSpeedIncrease = () => {
        dispatchSettings(settingsActions.speedIncrease)
    }

    const onSpeedDecrease = () => {
        dispatchSettings(settingsActions.speedDecrease)
    }

    return (
        <Html className='relative pointer-events-none' fullscreen>
            <div className='top-0 left-0 flex items-center w-full text-white bg-black pointer-events-auto abosulte' style={{ transform: 'none' }}>
                <Button onClick={onPlay} variant="ghost"><IoPlayOutline /></Button>
                <Button onClick={onPause} variant="ghost"><CiPause1 /></Button>
                <Button onClick={onForwards} variant="ghost"><RiSpeedLine /></Button>
                <Button className='rotate-180' onClick={onBackwards} variant="ghost"><RiSpeedLine /></Button>
                <div>{getFormattedDateString(date)}</div>
                <Button className='ml-auto' onClick={onSpeedIncrease} variant="ghost">+</Button>
                <Button onClick={onSpeedDecrease} variant="ghost">-</Button>
                <div className='mr-6'>SPEED: x{settings.speed}</div>
            </div>
        </Html >
    )
}

export default TimeController