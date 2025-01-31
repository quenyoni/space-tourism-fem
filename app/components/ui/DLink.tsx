import React from "react";
import { NavLink } from "react-router";
type dlinkType = {
    to: string;
    children: React.ReactNode;
    name: string;
}

const active: string = 'border-b border-white   ';

function DLink({ link }) {
    return <NavLink className={"font-barlow py-[.5rem] text-[1rem] uppercase tracking-widest d__link" } to={link.href}>{link.name}</NavLink>;
}

export default DLink;





// ({ isActive}) =>
//     isActive
//       ? `${active} dlink text-white font-barlow py-[.5rem]  uppercase tracking-widest`
    
//       : ""
//  +'text-[1rem] dlink font-barlow py-[.5rem] text-pastelBlue  uppercase tracking-widest'