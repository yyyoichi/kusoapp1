import { saveAs } from 'file-saver';
//@ts-ignore
import GIFEncoder from "gif-encoder-2";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const [loading, setLoading] = useState<boolean>(false);
  const download = useCallback(() => {
    console.log("create");
    const canvas: any = canvasRef.current;
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
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillText(selectState.emoji, 0, 16);
      encoder.addFrame(ctx);
      ctx.translate(WIDTH / 2, HEIGHT / 2);
      ctx.rotate(r * Math.PI / 180);
      ctx.translate(-WIDTH / 2, -HEIGHT / 2);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    encoder.finish();
    const buffer = encoder.out.getData();
    const blob = new Blob([buffer], { type: "image/gif" });
    saveAs(blob, `${selectState.emoji}.gif`);
    console.log("finish");
    setLoading(false);
  }, [selectState.emoji]);
  useEffect(() => {
    if(!loading) return ;
    setTimeout(download, 500);
  }, [loading, download]);
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{`DEMOJI`}</title>
        <meta name="description" content={`アイコン${selectState["emoji"]}を大きく表示するだけのくそアプリ。横にアプリが揺れるだけ。ダウンロード対応。`} />
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
        <div className={loading ? styles.loadingBox : styles.downloadBox} onClick={() => setLoading(true)} >
          {
            loading ? <Image
              src={"/image/loading.png"}
              alt="ローディング"
              width={50}
              height={50} /> : <Image
              src={"/image/download.png"}
              alt={"ダウンロード"}
              width={50}
              height={50}
            />
          }
        </div>
        <canvas
          style={{ display: "none" }}
          width={WIDTH}
          height={HEIGHT}
          ref={canvasRef}></canvas>
      </div>
    </div >
  )
}

export default Home
