
import { redirect } from "react-router";


export function clientLoader() {

   return redirect('/destination/moon')  
}

export default function Destination() {
    return <h1>Destination</h1>
}