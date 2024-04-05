import Renderer from '@/components/three/Renderer'
import getPlanetsData from '@/utils/getPlanetsData'

const Home = async () => {
  const { planets, sun } = await getPlanetsData()

  return (
    <main className="flex flex-col flex-1">
      <Renderer planets={planets} sun={sun} />
    </main>
  )
}

export default Home