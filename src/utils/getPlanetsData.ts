import type { BodyData } from '@/types/body';

const getPlanetsData = async () => {
  const res = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const bodies = (await res.json()).bodies as BodyData[];

  const planets = (bodies as BodyData[])
    .filter((body) => body.isPlanet === true)
    .map((planet) => {
      return planet.moons
        ? {
            ...planet,
            moons: bodies.filter(
              (body) =>
                body.bodyType === 'Moon' &&
                body.aroundPlanet.planet === planet.id
            ),
          }
        : planet;
    })
    .sort((prev, curr) => prev.perihelion + curr.perihelion);

  const sun = bodies.filter(
    (body) => body.englishName.toLocaleLowerCase() === 'sun'
  )[0];

  return { planets, sun };
};

export default getPlanetsData;
