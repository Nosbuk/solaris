import { Stars } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react'
import { Points } from 'three';

interface Props {
    size: number
}

const Background = ({ size }: Props) => {
    const starsRef = useRef<Points>(null!);
    const { camera } = useThree()

    useFrame(() => {
        const stars = starsRef.current

        stars.rotation.x += 0.00001
        stars.rotation.z += 0.00001
        stars.rotation.y += 0.00001
        stars.position.copy(camera.position)
    })

    return (
        <>
            <color attach="background" args={["black"]}></color>
            <Stars ref={starsRef} radius={size} count={500} />
        </>
    )
}

export default Background