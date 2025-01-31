// Async function to fetch data and find an object by name
export async function getDestination(query:string) {
	
	try {
		
		

		const res = await fetch('/data.json');
		const data = await res.json();
		// const destination = data.destinations.find(d => d.name === query)
		
		const destination = ([...data.destinations].find(r => r.name.toLowerCase() === query.toLowerCase()));
		

		return destination 

	
	}
	catch(err) {
		
	}
	

}
export async function getCrewMember(query:string) {
	
	try {
		
	
		console.log(query);
		const res = await fetch('/data.json');
		const data = await res.json();
		// const destination = data.destinations.find(d => d.name === query)
		const formatName = query.split('-').map(r=> r[0].toUpperCase()+r.slice(1)).join(' ')
		// console.log(destination)
		const crewMember = ([...data.crew].find(r => r.name.toLowerCase() === formatName.toLowerCase()));
	
		return  crewMember 

	
	}
	catch(err) {
		
	}
	

}
export async function getTech(query:string) {
	
	try {
		
	
		console.log(query);
		const res = await fetch('/data.json');
		const data = await res.json();
		// const destination = data.destinations.find(d => d.name === query)
		const formatName = query.split('-').map(r => r[0].toUpperCase() + r.slice(1)).join(' ');
		
		const tech = data.technology.find(function (r) {
			return r.name.toLowerCase() === formatName.toLowerCase();
		})

		 return tech; 

	
	}
	catch(err) {
		
	}
	

}
