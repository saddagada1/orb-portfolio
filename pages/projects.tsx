import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { promises as fs } from "fs";
import path from "path";
import { rand } from "@/utils/rand";
import { useAppSelector } from "@/redux/hooks";
import Scene from "@/components/Scene/Scene";

export const getStaticProps: GetStaticProps<{
  data: string[];
}> = async () => {
  const poe1 = await fs.readFile(
    path.resolve(process.cwd(), `./public/assets/books/poe-1.txt`),
    "utf-8"
  );
  const poe2 = await fs.readFile(
    path.resolve(process.cwd(), `./public/assets/books/poe-2.txt`),
    "utf-8"
  );
  const poe3 = await fs.readFile(
    path.resolve(process.cwd(), `./public/assets/books/poe-3.txt`),
    "utf-8"
  );
  const data = [poe1, poe2, poe3];
  return { props: { data: data } };
};

const Projects: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const dragX = useAppSelector((store) => store.utils.dragX);
  return (
    <>
      <Head>
        <title>Saivamsi Addagada | Projects</title>
      </Head>
      <Scene data={data} dragX={dragX} />
    </>
  );
};
export default Projects;
