import React from "react";
import DLink from './ui/DLink'


const links: {name:string,href:string}[] = [
    {name:'Moon',href:'/destination/moon'},
    {name:'Mars',href:'/destination/mars'},
    {name:'Europa',href:'/destination/europa'},
    {name:'Titan',href:'/destination/titan'},
]

function DestinationLinks() {
    return <div>
        <ul className="flex gap-8 justify-center lg:justify-start my-8 py-4">
            {links.map(link => <DLink key={link.name} link={link} />)}
      </ul>
  </div>;
}

export default DestinationLinks;
