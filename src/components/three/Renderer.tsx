"use client"

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from "three";

import Background from '@/components/three/Background'
import System from '@/components/three/System'
import TimeController from '@/components/three/TimeController';

import type { BodyData } from '@/types/body'
import { ClockProvider } from '@/hooks/useClock';

interface Props {
    planets: BodyData[]
    sun: BodyData
}

const Renderer = ({ planets, sun }: Props) => {
    THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);
    const backgroundSize = planets[0].perihelion / 10000000

    return (
        <div className="relative flex-1 w-full">
            <Canvas camera={{ fov: 75, near: 0.0001, far: 1000000, position: [13, 14, 0], rotation: [0, 0, 0] }} >
                <ClockProvider>
                    <System planets={planets} sun={sun} />
                    <Background size={backgroundSize} />
                    <OrbitControls />
                    <axesHelper />
                    <TimeController />
                </ClockProvider>
            </Canvas>
        </div>
    )
}

export default Renderer