import type { Route } from "../+types/home";
 import styles from './crewId.module.css'

import Header from "~/components/Header";
import Hero from "~/components/Hero";
import DestinationLinks from "~/components/DestinationLinks";
import { getCrewMember } from '../../utils.js'
import DisplayedImage from "~/components/DisplayedImage";
import { useEffect } from "react";
import Container from "~/components/Container";
import { NavLink } from "react-router";
import { ReactTyped } from "react-typed";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Choose Your Destination" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export async function clientLoader({ params }) { 
 
  
  const crewMember = await getCrewMember(params.crewId);
  if (!crewMember) { 
    return new Response("Not Found", {status:404})
  }
  return { crewMember }
  
  
}
  



export default function CrewId({ loaderData }: Route.ComponentProps) {
  console.log(loaderData)
  // {loaderData}:Route.ComponentProps
   const {name,bio,role,images } = loaderData.crewMember;
   

  
  useEffect(function () {
    if (!name) return;
    
    document.title = `Space Tourism | ${name}`
 
    
    return function () {
      document.title = `Space Tourism |Let's Blast off`
    }
    
  },[name])
  

  
  return (
    <section className={styles.crewBg}>
  <div className=" sticky max-w-[80em] mx-auto   p-4 mt-[7rem]  mb-[1rem]">
                  <h5 className={` font-barlow  tracking-wider  uppercase 
                  text-[1.5rem] 
                  lg:text-[1.75rem] 
                  flex 
                   justify-center
                    lg:justify-start
                     gap-[1rem]`} >
                     
          <span className="opacity-[50%]">02</span>
          
          <ReactTyped
                        
                        typeSpeed={100}
                        backSpeed={50}
                        cursorChar=""
                       
                        
                        
                    
                        strings={["MEET THE CREW"]}
                    />
                    </h5>
      </div>
      <Container>
  
        <div className=" flex flex-col  md:flex-col-reverse gap-8 lg:flex-row-reverse min-h-[70vh]">
          
          <div className="  h-[50vh] lg:min-h-[70vh] lg:flex-1 border-white bg-no-repeat bg-contain bg-center crew__member " style={
                    { backgroundImage: `url(${images.webp})` }}>
            
        
          </div>
          <div className="flex flex-col md:flex-col-reverse lg:flex-col  justify-center md:justify-end gap-8 md:gap-2 md:flex-1 ">
    
    <CrewNavigation/>
    
    
    <div className="text-center lg:text-left lg:self-center lg:flex-[3] lg:flex lg:flex-col lg:justify-end">
    <h4 className="font-bellefair uppercase text-white opacity-[50%] text-2xl lg:text-3xl mb-1">{role}</h4>
    <h3 className="font-bellefair uppercase text-white text-3xl lg:text-4xl mb-4">{name}</h3>
    <p className="text-[1rem] lg:text-[1.1rem] px-16 md:px-36 lg:px-0 lg:pr-36 min-h-[120px]">{bio}</p>
    
    </div>
    </div>
          
          
        </div>
  
      </Container>
      

    </section>
  );
}

const crew = [
  {num:1,href:'/crew/douglas-hurley'},
  {num:2,href:'/crew/mark-shuttleworth'},
  {num:3,href:'/crew/victor-glover'},
  {num:4,href:'/crew/anousheh-ansari'},
]

function CrewNavigation() {
  return (
    <ul className="w-[20%] lg:w-[100%] mx-auto flex items-center lg:justify-start justify-between lg:gap-12 lg:self-end lg:order-1 lg:flex-[1]   ">
      {
        crew.map(function (c) {
          return (
            <li key={c.num}>
              <button>
                
            <NavLink className="crewButton " to={c.href} ></NavLink>
              </button>
            </li>
          )
        })
      }
    </ul>
  )
}



function red({images,name}) {
  
  return (
  
<div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 ">
        
<div className="md:order-1 grid place-content-center  ">
  <img className='w-[50%] md:w-[75%] h-auto lg:max-w-[50%] mx-auto lg:fixed bottom-0 border-b-[2px] border-pastelBlue md:border-none ' src={images.png} alt={name} />
</div>

  <div className="flex flex-col md:flex-col-reverse lg:flex-col  justify-center md:justify-end md:gap-8 md:flex-1 ">
    
<CrewNavigation/>


<div className="text-center lg:text-left lg:self-center lg:flex-[3] lg:flex lg:flex-col lg:justify-end">
<h4 className="font-bellefair uppercase text-white opacity-[50%] text-2xl lg:text-3xl mb-1">{role}</h4>
<h3 className="font-bellefair uppercase text-white text-3xl lg:text-4xl mb-4">{name}</h3>
<p className="text-[1rem] lg:text-[1.1rem] px-16 md:px-36 lg:px-0 lg:pr-36">{bio}</p>

</div>
</div>
</div>
  )
}


