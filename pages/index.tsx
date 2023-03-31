import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Scene from "@/components/Scene/Scene";
import Head from "next/head";
import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { rand } from "@/utils/rand";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MathUtils } from "three";

export const getStaticProps: GetStaticProps<{
  data: string[];
}> = async () => {
  const poe = await fs.readFile(
    path.resolve(process.cwd(), `./public/assets/books/poe-${rand(1, 4)}.txt`),
    "utf-8"
  );
  const emerald = await fs.readFile(
    path.resolve(process.cwd(), `./public/assets/books/a-study-in-emerald-${rand(1, 4)}.txt`),
    "utf-8"
  );
  const double = await fs.readFile(
    path.resolve(process.cwd(), `./public/assets/books/the-double-${rand(1, 10)}.txt`),
    "utf-8"
  );
  const data = [poe, emerald, double];
  return { props: { data: data.sort(() => Math.random() - 0.5) } };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    let ease: NodeJS.Timer;

    if (!mouseDown && dragX !== 0) {
      ease = setTimeout(() => {
        setDragX(MathUtils.damp(dragX, 0, 0.5, 1));
      }, 250);
    }

    return () => {
      clearTimeout(ease);
    };
  }, [mouseDown, dragX]);

  return (
    <>
      <Head>
        <title>Saivamsi Addagada - Portfolio</title>
        <meta name="description" content="Portfolio - Saivamsi Addagada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        onMouseMove={(event) => {
          if (mouseDown) {
            setDragX(event.movementX);
          } else {
            return;
          }
        }}
        onMouseDown={() => {
          setMouseDown(true);
          document.body.style.cursor = "grabbing";
        }}
        onMouseUp={() => {
          setMouseDown(false);
          setDragX(MathUtils.damp(dragX, 0, 0.5, 1));
          document.body.style.cursor = "grab";
        }}
        onMouseLeave={() => {
          setMouseDown(false);
          setDragX(MathUtils.damp(dragX, 0, 0.5, 1));
          document.body.style.cursor = "grab";
        }}
        className="w-screen h-screen flex flex-col items-center"
      >
        <Header />
        <div className="w-full flex-1 relative">
          {/* <div className="absolute top-0 w-[20%] h-full bg-gradient-to-r from-primary z-20 pointer-events-none opacity-75" /> */}
          <Canvas camera={{ position: [0, -3, 8] }} dpr={[1, 2]}>
            <Scene data={data} dragX={dragX} setDragX={setDragX} />
          </Canvas>
          {/* <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-primary z-20 pointer-events-none opacity-75" /> */}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
