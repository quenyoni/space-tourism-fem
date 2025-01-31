import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import Logo from './Logo'
import styles from './Header.module.css'

const links:{ title: string, href: string }[] = [
    { title: "home", href: 'home' },
    { title: "destination", href: 'destination' },
    {title:"crew",href:'crew'},
    { title: "technology", href: "technology" }
    
]

function Header({onHandleMenuOpen,isOpen}) {

    return (
        <header className={` flex items-center justify-between blurUp `}>
            <Logo />
            
            <button onClick={() => { onHandleMenuOpen() }} className={`mobile__nav__toggle ${isOpen? 'active':''} `} aria-controls="nav__Links" aria-expanded="false" ></button>
            
            
            <nav >
                
                
            <NavLinks onHandleMenuOpen={onHandleMenuOpen} isOpen={isOpen}/>
            </nav>
    
    </header>);
}

export default Header;


function NavLinks({ isOpen, onHandleMenuOpen }) {

    return (
        <ul id="nav__Links" className={` primary__nav ${isOpen? 'active':''}  `} >
            {links.map((link,index) => {
                return(<li className="" key={link.title}>
                    <NavLink onClick={() => { onHandleMenuOpen() }} className="header__link tracking-[2px] uppercase   border-b-[2px] pb-[2rem] border-[transparent]    top-0 " to={link.href}>
                        <span className="mr-1 font-[700] mx-[0.5em] md:hidden lg:inline" aria-hidden="true">{`0` + index}</span>
                        <span className="link__text">
                            
                        {link.title}
                        </span>
                    </NavLink>
                    </li>
               )
            })}
         
      
        </ul>
        
    )
}



// return <header className="flex justify-between items-center container mx-auto md:mt-[2rem]  px-4 bg-transparent absolute  z-50 overflow-hidden">
        
// <Logo/>


// <nav className="main__nav">
//     <ul className="flex items-center gap-4">
//         {links.map((link, index) => {
//             return (<li key={link.title}><Link to={link.href}>
//             <span>
//             {'0'+index}
//             </span>{link.title}</Link></li>
//        )
//         })}
//     </ul>
// </nav>

// </header>;