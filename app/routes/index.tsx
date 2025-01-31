import {
    redirect
    
} from "react-router";
 


export function clientLoader() {
    // const navigate = useNavigate();
    
    return redirect('/home');
}



export default function Index(){
    return <h1>Read</h1>
}