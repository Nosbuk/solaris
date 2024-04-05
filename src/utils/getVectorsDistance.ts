import type { Vector3 } from 'three';

const getVectorsDistance = (vectorA: Vector3, vectorB: Vector3) =>
  Math.floor(vectorA.distanceTo(vectorB));

export default getVectorsDistance;
