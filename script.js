const btn=document.getElementById("btn")
btn.addEventListener("click",loaddata);


function loaddata(){
//display day in 1st rowic
  const d=new Date();
  const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  function getday(day){
      if(day+d.getDay()>6){
        return day+d.getDay()-7;
     }
     else{
      return day+d.getDay();
      }
  }
  for(i=0;i<5;i++)
  {
      const day_element="day"+(i+1)
      console.log(day_element)
      document.getElementById(day_element).innerHTML = weekday[getday(i)].toString();//cal function to get day
  }
  // fetch min & max temperature
    const city_name=document.querySelector("input").value;
    console.log(city_name);
  
   
    const fetchName = name =>  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=Metric&appid=20d68e4e95f7c65bd941daf201ff4a84`)
  
    fetchName(city_name)
        .then(response => response.json())
        .then(data => {
          
          let count_min=0;
          for(i=0;count_min<5;i++){
            //check for time
            let fetch_time=data.list[i].dt_txt;
            //console.log(fetch_time)
           let time=fetch_time.split(" ")
            if (count_min==0){  //for current day fetch 1st time available as 9 am wont be always available
              document.getElementById("day"+(count_min+1)+"min").innerHTML="Temp:"+Number(data.list[i].main.temp).toFixed(1)+"°";
              document.getElementById("day"+(count_min+1)+"max").innerHTML="Real Feel:"+Number(data.list[i].main.feels_like).toFixed(1)+"°";
              document.getElementById("img"+(count_min+1)).src=" https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x"+".png";
              count_min+=1;
            }
            else{  //fetch data for each morning 9 am for day2 onwards

            if(time[1]=="09:00:00") 
            {
              //console.log(time[1])
              document.getElementById("day"+(count_min+1)+"min").innerHTML="Temp:"+Number(data.list[i].main.temp).toFixed(1)+"°";
              document.getElementById("day"+(count_min+1)+"max").innerHTML="Real Feel:"+Number(data.list[i].main.feels_like).toFixed(1)+"°";
              document.getElementById("img"+(count_min+1)).src=" https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x"+".png";
              count_min+=1; //set counter 1 for each day total 5
            }
          }
          }
         
        })

        //load city image api splash
        /*const apikey_img="EKup6KqOIyS-2j3VZ-O9OQt8l6l0mDsKXztXrcvUVdM"
        const fetchpic = pic =>  fetch(`https://api.unsplash.com/photos/random/?count=1&query=${city_name}&client_id=${apikey_img}`)
        
        fetchpic(city_name)
        .then(response => response.json())
        .then(data => {
          console.log(data.urls.regular)
          document.getElementsByName("body").background=url(data.urls.regular);
        })
        //https://api.unsplash.com/photos/random?client_id=EKup6KqOIyS-2j3VZ-O9OQt8l6l0mDsKXztXrcvUVdM*/
        .catch(err => alert("Error"))
}











