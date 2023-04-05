import Scene from "@/components/Scene/Scene";
import Head from "next/head";
import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { rand } from "@/utils/rand";
import { useAppSelector } from "@/redux/hooks";

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

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const dragX = useAppSelector((store) => store.utils.dragX);
  return (
    <>
      <Head>
        <title>Saivamsi Addagada</title>
      </Head>
      <Scene data={data} dragX={dragX} />
    </>
  );
};

export default Index;
