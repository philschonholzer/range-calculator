import { useQuery } from 'react-query'

const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  return (
    <span>
      <b>{hours}</b>h<b>{minutes.toString().padStart(2, '0')}</b>min
    </span>
  )
}

const range = (distance, stops) => {
  const divider = 0.9 + stops * 0.7
  return distance / divider
}

const rangePerStops = (distance, duration) => {
  let ranges = []
  let stops = 0
  do {
    ranges = [
      ...ranges,
      [range(distance, stops), stops, formatDuration(duration / (stops + 1))],
    ]
    stops++
  } while (ranges[ranges.length - 1][0] > 200)
  return ranges
}

const Distance = ({ fromCoordinates, toCoordinates }) => {
  const { data: directions, isLoading } = useQuery(
    ['distance', fromCoordinates, toCoordinates],
    () =>
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoordinates};${toCoordinates}?access_token=pk.eyJ1IjoicGhpc2NoZXIiLCJhIjoiY2tqZnQ3MGJ1MnhjcTJxcnVwZWh5aDhwZCJ9.kvMXV13l-tT8mahpKY3DwQ`
      ).then((res) => res.json())
  )

  console.log('directions', directions)

  if (isLoading) return <div>Loading...</div>

  if (!directions || !directions.routes || !directions.routes[0])
    return <div>No route found.</div>

  const { distance = 0, duration = 0 } = directions.routes[0]
  const km = distance ? (distance / 1000).toFixed(0) : 0
  const h = formatDuration(duration)
  console.log('h', h, duration)

  return (
    <div>
      <div className="row">
        <p>
          Distance <br />
          <span className="value">
            <b>{km}km</b>
          </span>
        </p>
        <p>
          Duration <br />
          <span className="value">{h}</span>
        </p>
      </div>
      <h2>Needed Range</h2>
      <div className="grid">
        <>
          <div className="grid-item">
            <div>Needed range</div>
          </div>
          <div className="grid-item">
            <div>Duration per stage</div>
          </div>
          <div className="grid-item">
            <div>Stops</div>
          </div>
        </>
        {rangePerStops(km, duration).map(([dis, sto, dur]: Number[]) => (
          <>
            <div className="grid-item">
              <div className="value right-align">
                <b>{dis.toFixed(0)}</b> km
              </div>
            </div>
            <div className="grid-item">
              <div className="value right-align">{dur}</div>
            </div>
            <div className="grid-item">
              <div className="value ">
                <b>{sto === 0 ? 'None' : `${sto}`}</b>
              </div>
            </div>
          </>
        ))}
      </div>
      <style jsx>{`
        h2 {
          font-size: 2em;
          margin-bottom: 0.5em;
        }
        .grid {
          display: grid;
          grid: auto / auto auto 1fr;
          gap: 1em;
        }
        .grid-item {
        }
        .value {
          font-size: 1.6em;
        }
        .right-align {
          text-align: right;
        }
        .row {
          display: flex;
          gap: 1em;
        }
      `}</style>
    </div>
  )
}

export default Distance
