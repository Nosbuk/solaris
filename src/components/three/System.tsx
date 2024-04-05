"use client"

import React from 'react'

import Planet from '@/components/three/Planet'
import Sun from '@/components/three/Sun'

import type { Body } from '@/types/body'

interface Props {
    planets: Body[]
    sun: Body
}

const System = ({ planets, sun }: Props) => {
    return (
        <>
            <Sun data={sun} />
            {planets.map((data) => <Planet data={data} key={data.id} />)}
        </>
    )
}

export default System
