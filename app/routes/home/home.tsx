import type { Route } from "../+types/home";
import styles from './home.module.css'
import { Welcome } from "../../welcome/welcome";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import { useParams } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  
  const { x } = useParams();
  console.log(x)
  return (<main >
    <section className={styles.homeBg}>
    <div className=" max-w-[80em] mx-auto   ">
      <Hero />
      </div>
  </section>
  
  
  </main>);
}



