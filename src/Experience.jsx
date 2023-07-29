import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  MeshReflectorMaterial,
  TransformControls,
} from "@react-three/drei"
import { useControls } from "leva"
import { useFrame } from "@react-three/fiber"
import React, { useRef } from "react"
import GroundCells from "./libs/GroundCells"
import { Perf } from "r3f-perf"

const Experience = () => {
  const cubeRef = useRef()

  const { perfVisible } = useControls({
    perfVisible: true,
  })

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta
  })

  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <GroundCells />
      {/* controls */}
      <OrbitControls makeDefault />

      {/* lights */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight />

      {/* box */}
      <mesh position-y={-0.5001} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <TransformControls object={cubeRef} mode="translate" showZ={true} />
      {/* floor */}
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry args={[1, 1]} />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={0.9}
          color="grey"
          mirror={0.5}
        />
      </mesh>

      {/* GizmoHelper */}
      <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
        <GizmoViewport labelColor="white" axisHeadScale={1} />
      </GizmoHelper>
    </>
  )
}

export default Experience
