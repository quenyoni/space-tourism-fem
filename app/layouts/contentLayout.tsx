import React from "react";
import { Outlet, useParams } from "react-router";
import Header from "~/components/Header";
function contentLayout() {
    const params = useParams();
    console.log(params)
    return <main>
   
  </main>;
}

export default contentLayout;
