import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDragX } from "@/redux/slices/utilsSlice";
import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MathUtils } from "three";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const dragX = useAppSelector((store) => store.utils.dragX);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let ease: NodeJS.Timer;

    if (!mouseDown && dragX !== 0) {
      ease = setTimeout(() => {
        dispatch(setDragX({ dragX: MathUtils.damp(dragX, 0, 0.5, 1) }));
      }, 250);
    }

    return () => {
      clearTimeout(ease);
    };
  }, [mouseDown, dragX, dispatch]);

  return (
    <>
      <Head>
        <meta name="description" content="Portfolio - Saivamsi Addagada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        onMouseMove={(event) => {
          if (mouseDown) {
            dispatch(setDragX({ dragX: event.movementX }));
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
          dispatch(setDragX({ dragX: MathUtils.damp(dragX, 0, 0.5, 1) }));
          document.body.style.cursor = "grab";
        }}
        onMouseLeave={() => {
          setMouseDown(false);
          dispatch(setDragX({ dragX: MathUtils.damp(dragX, 0, 0.5, 1) }));
          document.body.style.cursor = "grab";
        }}
        className="w-screen h-screen flex flex-col items-center"
      >
        <Header />
        <div className="w-full flex-1 relative">
          {/* <div className="absolute top-0 w-[20%] h-full bg-gradient-to-r from-primary z-20 pointer-events-none opacity-75" /> */}
          <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 2]}>
            {children}
          </Canvas>
          {/* <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-primary z-20 pointer-events-none opacity-75" /> */}
        </div>
        <Footer />
      </main>
    </>
  );
};
export default Layout;
