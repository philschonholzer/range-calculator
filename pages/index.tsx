import Head from 'next/head'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import FromTo from '../components/from-to'

type Inputs = {
  from: string
  to: string
}

export default function Home() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const { register, handleSubmit, watch, errors } = useForm<Inputs>()

  const onSubmit = (data: Inputs) => {
    console.log('Form', data)
    setFrom(data.from)
    setTo(data.to)
  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container">
          <h1>Needed Range Calculator</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <p>
              <label htmlFor="from">From</label>
              <br />
              <input name="from" id="from" type="text" ref={register()} />
            </p>
            <p>
              <label htmlFor="to">To</label>
              <br />
              <input name="to" id="to" type="text" ref={register()} />
            </p>
            <button type="submit">Calculate Range</button>
          </form>
          {from && to && <FromTo from={from} to={to} />}
        </div>
      </main>

      {/* <footer className="container">
        <p>Footer</p>
      </footer> */}
      <style jsx>{`
        input,
        button {
          font-size: 1.6em;
        }
        @media (max-width: 600px) {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
