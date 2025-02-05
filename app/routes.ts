import { type RouteConfig, index ,route,layout} from "@react-router/dev/routes";

export default [
    layout('./layouts/wrapperLayout.tsx',
        [index('routes/index.tsx'),
            route('/home', "routes/home/home.tsx"), 
            route('/destination', "routes/destination/destination.tsx"),
          
             route('/destination/:destinationId', "routes/destination/destinationId.tsx"),
            route('/crew', "routes/crew/crew.tsx"),
            route('/crew/:crewId', "routes/crew/crewId.tsx"),
            route('/technology','routes/tech/technology.tsx'),
            route('/technology/:techId','routes/tech/technologyId.tsx'),
        
        ]
        
    )
   
  
  ] satisfies RouteConfig;

