import { Html } from "@react-three/drei"
import { Body as BodyEnum } from "astronomy-engine"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import getVectorsDistance from "@/utils/getVectorsDistance";

const markerVariants = cva(
    [
        "text-white",
        "text-xs",
        "flex flex-col",
        "items-center",
        "text-center",
        "w-[80px]",
        "transition-opacity",
        "select-none",
        "cursor-pointer"
    ],
    {
        variants: {
            visibility: {
                visible: "opacity-100",
                hidden: "opacity-0"
            }
        },
        defaultVariants: {
            visibility: "visible"
        }
    }
)

interface Props {
    name: BodyEnum
    position: Vector3
}

const Marker = ({ name, position }: Props) => {
    const { camera } = useThree()

    const distanceToObserver = getVectorsDistance(camera.position, position)
    const visibility = distanceToObserver < 3 ? 'hidden' : 'visible'

    return (
        <Html position={[0, 1, 0]} center className={cn(markerVariants({ visibility }))}>
            {name}<br />
            {distanceToObserver} au
        </Html>
    )
}

export default Marker