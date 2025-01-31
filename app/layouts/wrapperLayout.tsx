import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import Header from "~/components/Header";
function wrapperLayout() {
  const [isOpen, setIsOpen] = useState(false);

  

    
  function handleMenuOpen() {
      setIsOpen(isOpen=> !isOpen)
  }
    return <>
      <Header isOpen={isOpen} onHandleMenuOpen={handleMenuOpen} />
      
   <Outlet/>
   
  </>;
}

export default wrapperLayout;
