
const amountInput = document.querySelector("#amount")
const firstOption = document.querySelector("#firstCurrencyOption")
const secondOption = document.querySelector("#secondCurrencyOption")
const resultInput = document.querySelector("#result")
const exchangeRate = document.querySelector("#exchangeButton")

// Swapping values when arrows are clicked
document.querySelector('.change').addEventListener('click', () => {
  let temp = firstOption.value;
  firstOption.value = secondOption.value;
  secondOption.value = temp;
})

// Handling currency exchange
exchangeRate.addEventListener('click', () => {
    document.querySelector('.spin').classList.toggle("spinning")

    const amountValue = Number(amountInput.value);

    if(amountValue == ""){
        alert("please, enter an amount")
    }
    
    const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent;

    const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent;

    // I instantiated my "currencyObj" object created from the Currency class and called the 'exchange' method defined in my class, providing its parameters
    currencyObj.exchange(amountValue, firstOptionValue, secondOptionValue )
    .then((res) => resultInput.value = res.toFixed(3))

})


class Currency{
    constructor(){
        this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_6QxqIFWZ7Lndm9K1pIRo2SJoPS8uqY4IaApCEdWD&base_currency="
    }

    async exchange(amount, firstCurrency, secondCurrency){
       const response = await fetch(`${this.url}${firstCurrency}`)
       const result = await response.json()
       // console.log(result)
       const exchangedRateResult = amount * result.data[secondCurrency]
       // console.log(exchangedRateResult)
       return exchangedRateResult // return the promise to the place where the method is called.
    }
}

const currencyObj = new Currency()