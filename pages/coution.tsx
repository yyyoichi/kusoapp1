import { saveAs } from 'file-saver';
//@ts-ignore
import GIFEncoder from "gif-encoder-2";
import type { NextPage } from 'next'
import Head from 'next/head'
import {default as NextImage } from 'next/image';
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
const WIDTH = 300;
const HEIGHT = 300;

const Home: NextPage = () => {
  const router = useRouter()
  const [value, setValue] = useState<string>("危険！")
  const onChange = (v: string) => {
    setValue(v)
    router.push({
      pathname: "/coution",
      query: { value: v }
    })
  }
  const canvasRef = useRef(null);
  useEffect(() => {
    const image = new Image()
    image.src = "/image/coution.png"
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    image.onload = () => {
      ctx.drawImage(image, 0, 10, 50, 50)
      ctx.drawImage(image, 50, 10, 50, 50)
      ctx.drawImage(image, 100, 10, 50, 50)
      ctx.drawImage(image, 150, 10, 50, 50)
      ctx.drawImage(image, 200, 10, 50, 50)
      ctx.drawImage(image, 250, 10, 50, 50)
      ctx.drawImage(image, 0, 240, 50, 50)
      ctx.drawImage(image, 50, 240, 50, 50)
      ctx.drawImage(image, 100, 240, 50, 50)
      ctx.drawImage(image, 150, 240, 50, 50)
      ctx.drawImage(image, 200, 240, 50, 50)
      ctx.drawImage(image, 250, 240, 50, 50)
    }
  }, [])
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{`DEMOJI/Coution!`}</title>
        <meta name="description" content={`危険な行為にイエローカード。飲み過ぎのあの先輩に。`} />
        <link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={loading ? styles.loadingBox : styles.downloadBox} onClick={() => setLoading(true)} >
        {
          loading ? <NextImage
            src={"/image/loading.png"}
            alt="ローディング"
            width={50}
            height={50} /> : <NextImage
            src={"/image/download.png"}
            alt={"ダウンロード"}
            width={50}
            height={50}
          />
        }
      </div>
      {/* <div> */}
        <input type="text" value={value} style={{fontSize: "24px"}} onChange={e => onChange(e.target.value)}/>
        <canvas
          width={WIDTH}
          height={HEIGHT}
          ref={canvasRef} />
      {/* </div> */}
    </div >
  )
}

export default Home
