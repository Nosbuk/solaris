import { HelioVector, Body as BodyEnum } from 'astronomy-engine';
import { Vector3 } from 'three';

export const getPlanetPositionVector = (name: BodyEnum, date: Date) => {
  const helioVector = HelioVector(name, date);

  return new Vector3(
    helioVector.x * 10,
    helioVector.y * 10,
    helioVector.z * 10
  );
};
