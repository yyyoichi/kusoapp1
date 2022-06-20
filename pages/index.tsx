import { createCanvas } from 'canvas';
import { saveAs } from 'file-saver';
//@ts-ignore
import GIFEncoder from "gif-encoder-2";
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { default as Emo } from '../emoji/Emoji';
import styles from '../styles/Home.module.css'
const Emoji = new Emo()
const WIDTH = 340;
const HEIGHT = 300;

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
  const download = useCallback(() => {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const encoder = new GIFEncoder(WIDTH, HEIGHT);
    const ratio = [0, 6, 6, 6, 6, 4, 2, -2, -4, -6, -6, -6, -6/**0 */, -6, -6, -6, -6, -4, -2, 4, 6, 6, 6, 6];
    const delay = 2000 / ratio.length;
    encoder.setDelay(delay);
    encoder.start();
    ctx.font = "250px serif"
    ctx.textBaseline = "top"
    ctx.textAlign = "left"
    
    for (const r of ratio) {
      ctx.fillText(selectState.emoji, 0, 16);
      encoder.addFrame(ctx);
      ctx.translate(WIDTH / 2, HEIGHT / 2);
      ctx.rotate(r * Math.PI / 180);	
      ctx.translate(-WIDTH / 2, -HEIGHT / 2);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      console.log(r);
    }
    encoder.finish();
    const buffer = encoder.out.getData();
    const blob = new Blob([buffer], { type: "image/gif" });
    saveAs(blob, `${selectState.emoji}.gif`);
  }, [selectState.emoji]);
  // useEffect(() => {
  //   const canvas = canvasRef.current as unknown as HTMLCanvasElement;
  //   const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  //   ctx.font = "250px serif"
  //   ctx.textBaseline = "top"
  //   ctx.textAlign = "left"
  //   ctx.fillText(selectState.emoji, 0, 25);
  //   ctx.translate(WIDTH / 2, HEIGHT / 2);	// 1: 水平位置、垂直位置をcanvasの半分だけずらして
  //   ctx.rotate(50 * Math.PI / 180);	// 2: 回転を実行し、
  //   ctx.translate(-WIDTH / 2, -HEIGHT / 2);
  // }, [selectState])

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
      <div>
        <input type="submit" onClick={download} value="ダウンロード" />
      </div>
    </div >
  )
}

export default Home
