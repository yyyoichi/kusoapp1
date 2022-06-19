import { createCanvas } from 'canvas';
//@ts-ignore
import GIFEncoder from "gif-encoder-2";
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
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
  const canvasRef = useRef(null);
  const aRef = useRef(null);
  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.font = "250px serif"
    ctx.textBaseline = "top"
    ctx.textAlign = "left"
    const text = selectState.emoji;
    const mesure = ctx.measureText(text);
    console.log(mesure);
    const x = 0 - Math.abs(mesure.actualBoundingBoxLeft) + 50;
    const y = 0 - mesure.fontBoundingBoxAscent + 50;
    const textWidth = mesure.width;
    const textHeight = mesure.fontBoundingBoxAscent + mesure.actualBoundingBoxDescent;
    ctx.beginPath();
    ctx.strokeStyle = "aqua";
    ctx.moveTo(x, y);
    ctx.lineTo(x + textWidth, y);
    ctx.lineTo(x + textWidth, y + textHeight);
    ctx.lineTo(x, y + textHeight);
    ctx.lineTo(x, y);
    ctx.clip();
    ctx.fillText(text, x, y + (250 * 0.09));
    const encoder = new GIFEncoder(textWidth, textHeight);
    encoder.setDelay(500);
    encoder.start();
    encoder.addFrame(ctx);
    encoder.finish();
    const buffer = encoder.out.getData();
    console.log(buffer);
    const blob = new Blob([buffer], {type: "image/gif"});
    const a: any = aRef.current;
    a.href = window.URL.createObjectURL(blob);
  }, [selectState])
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
        <div><a ref={aRef} download={selectState.emoji + ".gif"} >ダウンロード</a></div>
        <canvas width={100} height={100}></canvas>
        <canvas width={500} height={500} ref={canvasRef}></canvas>
      </div>
    </div >
  )
}

export default Home
