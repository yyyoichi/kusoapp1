import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Emoji from '../emoji/Emoji'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [emojiCeil, setSize] = useState<{ box: number, num: number }>({ box: 100, num: 3 })
  const [selectState, setState] = useState<{ open: boolean, emoji: string }>({ open: false, emoji: "😀" })
  useEffect(() => {
    const w = window["innerWidth"] * 0.8
    console.log(w)
    if (w < 450) {
      return //そのまま
    } else if (w < 900) {
      //4つ分開ける
      const num = 4
      return setSize({ box: Math.floor(w / num), num })
    } else {
      //5つ分開ける
      const num = 5
      return setSize({ box: Math.floor(w / num), num })
    }
  }, [])
  const clickMain = () => setState(s => { return { ...s, open: true } })
  const onClick = (emoji: string) => {
    setState({ open: false, emoji })
    
  }
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>DEMOJI</title>
        <meta name="description" content="アイコンを大きく表示するだけのくそアプリ。" />
        <link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={styles.emoji}
        onClick={clickMain}
      >
        {selectState["emoji"]}
      </div>
      {selectState["open"] ? <div className={styles.select_wrapper}>
        <div className={styles.emoji_box}>
          {Emoji.getXpiece(emojiCeil["num"]).map((x, i) => {
            return (
              <div key={i} className={styles.emoji_row}>
                {
                  x.map((y, j) => <div
                    onClick={() => onClick(y)}
                    key={j}
                    className={styles.emoji_ceil}
                    style={{ fontSize: String(emojiCeil["box"] * 0.75) + "px", width: String(emojiCeil) + "px" }}
                  >
                    {y}
                  </div>)
                }
              </div>
            )
          })}
        </div>
      </div>
        : <></>
      }

    </div>
  )
}

export default Home
