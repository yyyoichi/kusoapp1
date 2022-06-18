import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { default as Emo } from '../emoji/Emoji';
import styles from '../styles/Home.module.css'
const Emoji = new Emo()

const Home: NextPage = () => {
  const router = useRouter()
  const emjQuery = router.query.emj as string

  const [selectState, setState] = useState<{ open: boolean, emoji: string }>({ open: false, emoji: "😀" })
  useEffect(() => {
    console.log("emoji", emjQuery)
    if (emjQuery) setState({ open: false, emoji: Emoji.getAt(emjQuery) })
  }, [emjQuery])

  const clickMain = () => setState(s => { return { ...s, open: true } })
  const onClick = (emoji: string) => {
    router.push({
      pathname: "/",
      query: { emj: Emoji.getIndexOf(emoji) }
    })
  }
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{`DEMOJI`}</title>
        <meta name="description" content={`アイコン${selectState["emoji"]}を大きく表示するだけのくそアプリ。`} />
        <link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={styles.emoji}
        onClick={clickMain}
      >
        <p>
          {selectState["emoji"]}
        </p>
      </div>
      {
        selectState["open"] ? <div className={styles.select_wrapper}>
          <div className={styles.emoji_box}>
            {
              Emo.JI.map((x, i) => <div
                onClick={() => onClick(x)}
                key={i}
              >
                {x}
              </div>
              )
            }
          </div>
        </div>
          : <></>
      }

    </div >
  )
}

export default Home
