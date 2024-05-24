"use client"

import React, { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Mesh } from 'three'
import { Trail, useTexture } from '@react-three/drei'

import Marker from '@/components/three/Marker'
import { surfaces } from '@/config/textures'
import { defaultScales } from '@/config/units'
import { useClock } from '@/hooks/useClock'
import { getPlanetPositionVector } from '@/utils/getPlanetPositionVector'

import type { BodyData } from '@/types/body'

interface Props {
    data: BodyData
}

const Planet = ({ data }: Props) => {
    const meshRef = useRef<Mesh>(null!)
    const { date } = useClock()
    const [position, setPosition] = useState(getPlanetPositionVector(data.englishName, date))
    const sphereArgs: [number, number, number] = useMemo(() => [data.polarRadius / defaultScales.planetsSize, 32, 32], [data.polarRadius])

    useFrame(() => {
        setPosition(getPlanetPositionVector(data.englishName, date))
    })

    const [surface] = useTexture([surfaces[`${data.englishName.toLocaleLowerCase()}_2k` as keyof typeof surfaces]])

    return (
        <Trail
            width={0.2}
            color={'white'}
            length={5}
            decay={1}
            local={false}
            stride={0}
            interval={1}
            target={undefined}
            attenuation={(width) => width}
        >
            <mesh ref={meshRef} position={position} rotation={[MathUtils.degToRad(90 + data.axialTilt), 0, 0]}>
                <Marker name={data.englishName} position={position} />
                <ambientLight intensity={0.1} />
                <sphereGeometry args={sphereArgs} />
                <meshStandardMaterial map={surface} />
            </mesh>
        </Trail >
    )
}

export default Planet