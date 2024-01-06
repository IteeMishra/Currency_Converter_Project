let base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";    //Get the currency value for EUR to JPY: https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json  
//removed /eur/jpy.json in our url that we finally used as an api and played in place of eur the valuee of fromcurrency.value and in place of jpy the tocurrency.value
//because we are changing the value or determining the value as per our selected choices

//All ko choose karna is vvip here
const dropdowns=document.querySelectorAll(".dropdown select");

//accessing button
let btn=document.querySelector("button");

//currency type choosen used in line 75
let fromcurrency=document.querySelector(".from select");
let tocurrency=document.querySelector(".to select");

//accessing countryList of code.js file directly and sending its values to our dropdownlist in html as a option
for(let select of dropdowns){
for(countrycode in countryList){
    let newOption=document.createElement("option");
    //console.log(countrycode,countryList[countrycode]);
    newOption.innerText=countrycode;
    newOption.value=countrycode;
     select.append(newOption);
 
     //making by default selected choices in each dropdown
     if(select.name==="from" && countrycode==="USD"){
        newOption.selected="selected";
     }
     else if(select.name==="to" && countrycode==="INR"){
        newOption.selected="selected";
     }
}
//event listener that will keep track ki tab flag change hua and for every change will call updateFlagFunc
select.addEventListener("change",(evt)=>{
    
    updateFlagFunc(evt.target);  //target is basically humne kaha pe change kiya vo track karega is case me from wala select print karega on console

});
};




//This function will update our flag depending upon our selected choice so here event="change"

const updateFlagFunc=(element)=>{
//step 1 currencycode extract karenge from our element
let curr=element.value;
let countryc=countryList[curr];
let newsrc=`https://flagsapi.com/${countryc}/shiny/64.png`;


//accessing image as hume uss dropdown kewal chahiye jisme badlav hua hai toh vo kaun hai hai element k parent me
let image=element.parentElement.querySelector("img");
image.src=newsrc;
}


//Now we a making a function such that if somebody chicks on the exchange button then rate and value should be displayed

btn.addEventListener("click",async (evt)=>{
//basically jo kaam automatically ho rahe the that we have stopped by doing this such as values we a choosing in our dropdown were being reflected in the url and that
evt.preventDefault();

//taking user value that has been entered to convery and amt is storing entire input
let amt=document.querySelector(".amount input");

//this actually stores its value
let amtVal=amt.value;
if(amtVal<"1" || amtVal===""){
    amt.value=1;
}


//we have made our api call here since our api will respond to lower case value of to and from currency value so we have done that
const url=`${base_url}/${fromcurrency.value.toLowerCase()}/${tocurrency.value.toLowerCase()}.json`;
let response=await fetch(url);
let data= await response.json();

//got the value here
console.log(data[tocurrency.value.toLowerCase()]);
let rate=data[tocurrency.value.toLowerCase()];

let val=amtVal*rate;
let mes=document.querySelector(".msg");
if(amtVal>="1"){
mes.innerText=`${amtVal} ${fromcurrency.value}  = ${val} ${tocurrency.value}`;
}
else{
    mes.innerText=`1 ${fromcurrency.value} = ${rate} ${tocurrency.value}`;
}
});