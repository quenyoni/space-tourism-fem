import type { Route } from "../+types/home";
 import styles from './destination.module.css'

import Header from "~/components/Header";
import Hero from "~/components/Hero";
import DestinationLinks from "~/components/DestinationLinks";
import { getDestination } from '../../utils.js'
import DisplayedImage from "~/components/DisplayedImage";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Choose Your Destination" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export async function clientLoader({ params }) { 
 
  
  const destination = await getDestination(params.destinationId);
  if (!destination) {
    return new Response("Not Found", {status:404})
  }

  
  return { destination }
  
  
}
  



export default function DestinationId({ loaderData }:Route.ComponentProps) {
  const [scrollY, setScrollY] = useState(0);
  const { name, images, description, distance, travel } = loaderData.destination;
  
  
   console.log(window.screenY)
   useEffect(function () {
// console.log(window.screenY)
      
     //     })
    //  console.log(window)
    //  console.log('first');
 setScrollY(window.scrollY)
    
}, [scrollY]);
  
  useEffect(function () {
    if (!name) return;
    
    document.title = `Space Tourism | ${name}`
 
    
    return function () {
      document.title = `Space Tourism |Let's Blast off`
    }
    
  },[name])
  

  
  return (<section className={styles.destinationBg}>
 <div className=" sticky max-w-[80em] mx-auto   p-4 mt-[7rem]  mb-[1rem]">
                  <h5 className={` font-barlow  tracking-wider  uppercase 
                  text-[1.5rem] 
                  lg:text-[1.75rem] 
                  flex 
                   justify-center
                    lg:justify-start
                     gap-[1rem]`} >
                     
        <span className="opacity-[50%]">01</span>
        <ReactTyped
                        
                        typeSpeed={200}
                        backSpeed={50}
                        cursorChar=" |"
                       
                        
                        
                    
                        strings={["PICK YOUR DESTINATION"]}
                    />
                    </h5>
    </div>
    <div className=" max-w-[80em] mx-auto  relative  h-[70%] lg:p-4 ">
    <div className="flex flex-col lg:flex-row my-auto lg:items-center ">
    <figure className="flex flex-1 justify-center overflow-hidden">
            <DisplayedImage alt={name} imagePath={images.png}/>
          {/* <img key={destination.name}  className="place-self-center" src={destination.images.webp.slice(1)} alt={destination.name} /> */}
        </figure>
        <div className="grid flex-1 text-center lg:text-left">
          <DestinationLinks />
          <div>
            
            <h1 className=" planet__title font-bellefair text-[5rem] lg:text-[6rem] uppercase 
          ">{name} </h1>
            <div className="min-h-[8rem]  px-[4rem]  mx-auto lg:px-0">
              
          <p className="lg:w-[60%]">{description}</p>
            </div>
          
          </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:w-[60%] border-t-[1px] border-pastelBlue py-4 my-4">
            <DataBoard description={'AVG. DISTANCE'} val={distance} />
          <DataBoard description={'EST. TRAVEL TIME'} val={travel}/>
            
          
        </div>
        </div>
      
    </div>
    </div>
    
    
 

  </section>);
}

function DataBoard({description ,val }) {
  return (
    <div className="flex flex-col">
      <p>{description}</p>
      <h4 className="font-bellefair text-[1.75rem] uppercase">{val}</h4>
      
    </div>
    
  )
}



