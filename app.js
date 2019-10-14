window.addEventListener("load",()=>{

    let long1;
    let lat;
    let temperatureDescription=document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".temperature-degree");
    let locationTimezone=document.querySelector(".location-timezone");
    let temperatureSection=document.querySelector(".temperature");
    const temperatureSpan=document.querySelector(".temperature span");
    if (navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position =>{
     long1 =position.coords.longitude;
	lat =position.coords.latitude;
                //using an API as a proxy to provide cross-origin requests to anywhere.
	const proxy="https://cors-anywhere.herokuapp.com/";
	const api= `${proxy}https://api.darksky.net/forecast/d0562bf3c021161163e6ad13dac0fd18/${lat},${long1}`;
	fetch(api)
	.then(response=>{return response.json();})
	.then(data=>{
    const {temperature,summary,icon}=data.currently;
        //set DOM elements from the API
   temperatureDegree.textContent=temperature;
   temperatureDescription.textContent=summary;
   locationTimezone.textContent=data.timezone;
//formula for celsius
    let celsius=(temperature-32)*(5/9);
//set Icon
	setIcons(icon, document.querySelector('.icon') );
//change temperature to celsius/farenheit
		temperatureSection.addEventListener('click',()=>{
				if (temperatureSpan.textContent === 'F'){
					temperatureSpan.textContent='C';
					temperatureDegree.textContent=Math.floor(celsius);
				}else{
					temperatureSpan.textContent='F';
					temperatureDegree.textContent=temperature;
				}
		});
		});
	});

}
	function SetIcons(icon,iconID){
		const skycons= new skycons({color:"white"} );
		const currentIcon=icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID,skycons[currentIcon]);
	}
});

