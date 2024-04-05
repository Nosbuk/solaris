import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Mesh } from 'three'
import { useTexture } from '@react-three/drei'

import Marker from '@/components/three/Marker'
import { surfaces } from '@/config/textures'
import { defaultScales } from '@/config/units'
import { getPlanetPositionVector } from '@/utils/getPlanetPositionVector'

import type { BodyData } from '@/types/body'

interface Props {
    data: BodyData
}

const Sun = ({ data }: Props) => {
    const renderDateRef = useRef(new Date())
    const [position, setPosition] = useState(getPlanetPositionVector(data.englishName, renderDateRef.current))
    const meshRef = useRef<Mesh>(null!)

    useFrame(({ clock }) => {
        const dateToCalculate = new Date(renderDateRef.current.getTime() + (clock.oldTime + clock.getDelta()) * 1000000)
        setPosition(getPlanetPositionVector(data.englishName, dateToCalculate))
    })

    const [surface] = useTexture([surfaces[`${data.englishName.toLocaleLowerCase()}_2k` as keyof typeof surfaces]])

    return (
        <mesh ref={meshRef} position={position} rotation={[MathUtils.degToRad(90), 0, 0]}>
            <Marker name={data.englishName} position={position} />
            <sphereGeometry args={[data.equaRadius / defaultScales.sunSize, 32, 32]} />
            <meshPhongMaterial
                map={surface}
                emissiveMap={surface}
                emissiveIntensity={0.6}
                emissive={0xffffff}
            />
            <pointLight castShadow />
        </mesh>
    )
}

export default Sun