import React from "react";
import { Link } from "react-router";

function Logo() {
    return <Link className="m-[1.5rem] z-[9999]" to='/'>
        <img src="/assets/shared/logo.svg" alt="logo" />
         </Link>;
}

export default Logo;
