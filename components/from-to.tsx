import { useQuery } from 'react-query'
import Distance from './distance'

type Props = {
  from: string
  to: string
}

const FromTo = ({ from, to }: Props) => {
  const { data: fromData, isLoading: fromLoading } = useQuery(
    ['from', from],
    () =>
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${from}.json?access_token=pk.eyJ1IjoicGhpc2NoZXIiLCJhIjoiY2tqZnQ3MGJ1MnhjcTJxcnVwZWh5aDhwZCJ9.kvMXV13l-tT8mahpKY3DwQ`
      ).then((res) => res.json())
  )
  const { data: toData, isLoading: toLoading } = useQuery(['to', to], () =>
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${to}.json?access_token=pk.eyJ1IjoicGhpc2NoZXIiLCJhIjoiY2tqZnQ3MGJ1MnhjcTJxcnVwZWh5aDhwZCJ9.kvMXV13l-tT8mahpKY3DwQ`
    ).then((res) => res.json())
  )
  if (fromLoading || toLoading) return <div>Loading</div>

  const [fromFirst] = fromData?.features || []
  const [toFirst] = toData?.features || []

  return (
    <div>
      <div>
        <p>
          From <br />
          <b>{fromFirst.place_name}</b>
        </p>
        <p>
          To <br />
          <b>{toFirst.place_name}</b>
        </p>
        <Distance
          fromCoordinates={fromFirst.center.join(',')}
          toCoordinates={toFirst.center.join(',')}
        />
      </div>
    </div>
  )
}

export default FromTo
