
//preventdefault() -> used to stop default behavior of form when form submit event occure

let BaseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".selectore select");
let button = document.querySelector("button");
let from_country = document.querySelector(".from select");
let to_country = document.querySelector(".to select");
let msg = document.querySelector(".result-box");


//to set country list to both drop down
for(let list of dropdowns)
{
    for(let currencycode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currencycode;
        newOption.value = currencycode;
        list.append(newOption);

        if(list.name === "from" && currencycode === "USD")
        {
            newOption.selected = "selected";
        }
        else if(list.name === "to" && currencycode === "INR")
        {
            newOption.selected = "selected";
        }
    }

    list.addEventListener("change" , (evt)=>{
        update_flag(evt.target);
    });
}


//method for update flag
function update_flag(element)
{
    let countrycode = countryList[element.value];
    let newFlagURL = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newFlagURL;
}


//function for get exchange rate 
async function get_exchange_data(evt)
{
    evt.preventDefault();
    
    let amtelmt = document.querySelector("form input");
    let amtval = amtelmt.value;

    if(amtval == "" || amtval < 1)
    {
        amtval = 1;
        amtelmt.value = 1;
    }

    let complate_URL = `${BaseURL}/${from_country.value.toLowerCase()}/${to_country.value.toLowerCase()}.json`;

    let response = await fetch(complate_URL);
    
    if(response.status === 200)
    {
        let data = await response.json();
        let rate = data[to_country.value.toLowerCase()];
        
        let total = amtval * rate;

        msg.innerText = `${amtval} ${from_country.value} = ${total} ${to_country.value}`;
    }
    else
    {
        alert("Something Went Wrong...");
    }

}


//call function on button click event
button.addEventListener("click" , (evt)=>{
    get_exchange_data(evt);
});


//call function on form load event
//bec we want correct data for default values
window.addEventListener("load" , (evt)=>{
    get_exchange_data(evt);
});



/*

//one by one drop doen create 
//put listner to both drop down to get selected option value
//if you select any option its value pass to select tag

let dropdown1 = document.querySelector("#country_dropdown1");
let dropdown2 = document.querySelector("#country_dropdown2");

for(let currencycode in countryList)
{
    let newOption = document.createElement("option");
    newOption.innerText = currencycode;
    newOption.value = currencycode;
    dropdown1.append(newOption);

   
}

dropdown1.addEventListener("change",()=>{
    console.log(dropdown1.value);
});

for(let currencycode in countryList)
{
    let newOption = document.createElement("option");
    newOption.innerText = currencycode;
    newOption.value = currencycode;
    dropdown2.append(newOption);

}


dropdown2.addEventListener("change",()=>{
    console.log(dropdown2.value);
});
*/