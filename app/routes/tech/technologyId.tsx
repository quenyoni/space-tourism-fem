
import React from "react";
import type { Route } from "../+types";
import { getTech } from "~/utils";
import { NavLink, useParams } from "react-router";
import styles from './technologyId.module.css'
import { ReactTyped } from "react-typed";

const bgImg = "/assets/technology/image-spaceport-portrait.jpg"
const bgImg2 = "/assets/technology/image-spaceport-landscape.jpg"

export async function clientLoader({ params }) { 
 
  
    const tech = await getTech(params.techId);
    if (!tech) { 
      return new Response("Not Found", {status:404})
    }
    return { tech }
    
    
}
  

function TechnologyId({ loaderData }: Route.ComponentProps) {
    
    const { name, description, images } = loaderData.tech;
    const x = useParams()
  console.log(x.techId)
    
    return <section className={styles.techBg}>
             <div className=" max-w-[80em] mx-auto   p-4 mt-[7rem]  mb-[1rem] ">
            <h5 className="font-barlow tracking-wider uppercase text-[1.5rem] lg:text-[1.75rem] flex  justify-center lg:justify-start gap-[1rem]  "><span className=" opacity-[50%]">03</span>
            <ReactTyped
                        
                        typeSpeed={100}
                        backSpeed={50}
                        cursorChar=" "
                       
                        
                        
                    
                        strings={["SPACE LAUNCH 101"]}
                    />
            </h5>
  
        </div>
        <div className=" max-w-[80em] mx-auto  relative  h-[70%] lg:p-4 lg:grid lg:grid-cols-2">
            <figure
                style={
                    { backgroundImage: `url("/assets/tech/image-${x.techId}-portrait.jpg")` }}
                className={ ` hidden lg:block h-[70%]  bg-right bg-no-repeat lg:fixed right-0 lg:top-[60%] lg:w-[50%] translate-y-[-50%]
                lg:bg-[url(url("/assets/tech/image-${x.techId}-portrait.jpg)]
       
       
            `}>
            {/* bg-["url('${images.landscape}')"] */}
            </figure>
            <figure
                style={
                    { backgroundImage: `url("/assets/tech/image-${x.techId}-landscape.jpg")` }}
                className={` lg:hidden h-[30vh] bg-cover bg-center bg-no-repeat lg:absolute lg:right-[-15%] lg:top-0 lg:w-[50%] lg:max-h-[100%] 
                lg:bg-[url(url("/assets/tech/image-${x.techId}-portrait.jpg)]
       
       
            `}>
            {/* bg-["url('${images.landscape}')"] */}
            </figure>
            <div className="p-4 lg:p-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-16   ">
               <TechnologyLinks/>
                <div className="text-center lg:text-left">
                <p className="uppercase tracking-widest ">The Terminology...</p>
                <h1 className=" text-[2rem] lg:text-[3.5rem] font-bellefair uppercase mb-6">{name}</h1>
                <p className="" >
             {description}
                </p>
                </div>
            
                
            </div>
        </div>
      
  </section>;
}



const links: {num:number,href:string}[] = [
    {num:1,href:'/technology/launch-vehicle'},
    {num:2,href:'/technology/spaceport'},
   
    {num:3,href:'/technology/space-capsule'},
]

function TechnologyLinks() {
    return <div>
        <ul className="flex gap-4 lg:flex-col lg:justify-between">
            {links.map(link => (
                <li key={link.num} >
                    <NavLink className="techlink" to={link.href}>
                    {link.num}
                    </NavLink>
                    
                    </li>
            )
            )
            
            }
      </ul>
  </div>;
}

export default TechnologyId;
