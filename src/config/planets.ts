import { Body } from 'astronomy-engine';

const PLANETS = [
  Body.Mercury,
  Body.Venus,
  Body.Earth,
  Body.Moon,
  Body.Mars,
  Body.Jupiter,
  Body.Saturn,
  Body.Uranus,
  Body.Neptune,
  Body.Pluto,
] as const;

export default PLANETS;
