import React from "react";
import Button from './ui/Button'
import { ReactTyped } from "react-typed";

function Hero() {
    return <div>
     
        <div className="flex flex-col lg:flex-row min-h-[100vh]  ">
            <div className="flex-1 flex flex-col justify-end md:justify-center items-center lg:items-start text-left ">
                
                <p className="font-barlow uppercase tracking-wider text-[1.5rem] lg:[1.75rem]">
                    
                    So, you want to travel to {" "}
                    <ReactTyped
                        loop
                        typeSpeed={200}
                        backSpeed={50}
                        cursorChar=""
                        startDelay={8000}
                        
                        
                    
                        strings={["the"]}
                    />
                    
                </p>
                <h1 className="font-bellefair text-[7rem] lg:text-[9rem] uppercase leading-tight">
                    <ReactTyped
                        loop
                        typeSpeed={200}
                        backSpeed={50}
                        cursorChar="|"
                       
                        
                        
                    
                        strings={[ "Mars", "Titan" ,"Space","Moon"]}
                    />
                
                </h1>
                <p className="font-barlow text-center  text-[1rem] lg:[1.5rem] mx-8 lg:mx-0 lg:text-left" >
                Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience! 
                </p>
            
         
            
            
            </div>
            <div className="flex-1 flex justify-center items-center">
                <Button to={'/destination'}>Explore</Button>
            </div>
            
        </div>
      
        
  </div>;
}

export default Hero;
