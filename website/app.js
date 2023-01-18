/* Global Variables */


// Create a new date instance dynamically with JS

let d = new Date();

let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const APIkey = "08ee6e96314b52e87cbc75621f1152a5"

const button= document.querySelector('#generate');

 button.addEventListener("click",async ()=>{

    const zipCode= document.querySelector("#zip").value
    const feelings= document.querySelector("#feelings").value

    try{
        const temp= await getWeather(zipCode)

         await fetch ('/saveData', {
            
               method:'POST',
               credentials:'same-origin',
               headers:{'Content-Type':'application/json'},
               body: JSON.stringify(
                   {date: newDate,
                   temp: temp,
                   feelings: feelings})
                           
                  })
      
           
            const getResp= await fetch('/getData', { credentials: "same-origin" })
            const finalData = await getResp.json()
            console.log (finalData)
            upDatingUi(finalData)
   
        }
      catch(error) {
      console.log("error", error);}

   
})

 


 async function getWeather(zipCode)  {   
      const Url= `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${APIkey}&units=metric`
      const res= await fetch(Url)
      const data= await res.json()
      const temp =(data.main.temp);
         
      return temp

   }

   async function upDatingUi() {
      const answer =await  fetch("/getData");
      try {

         const resp= await answer.json();
         document.getElementById("date").innerHTML =resp.date;
         document.getElementById("temp").innerHTML =resp.temp;
         document.getElementById("content").innerHTML =resp.feelings;
      }
      catch(err){
         console.log(err)
      }
   }

  