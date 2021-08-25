import access_key from "config.js";
const currency1 = document.querySelector("#currency1");
const currency2 = document.querySelector("#currency2");
const swap = document.querySelector("#swap_btn");
const input1 = document.querySelector("#amount1");
const input2 = document.querySelector("#amount2");
const rate = document.querySelector("#rate");

//Fetch exchange rates and update the DOM
function calculate() {
  const curr1 = currency1.value;
  const curr2 = currency2.value;

  fetch(
    `https://api.exchangeratesapi.io/latest?access_key=${access_key}&base=${curr1}`
  )
    .then((res) => res.json())
    .then((data) => {
      const curr_rate = data.rates[curr2];
      rate.innerHTML = `1 ${curr1} = ${curr_rate} ${curr2}`;

      input2.value = (input1.value * curr_rate).toFixed(2);
    });
}

//Swap
swap.addEventListener("click", () => {
  const temp = currency1.value;
  currency1.value = currency2.value;
  currency2.value = temp;
  calculate();
});

//Event listeners
currency1.addEventListener("change", calculate);
currency2.addEventListener("change", calculate);
input1.addEventListener("input", calculate);
input2.addEventListener("input", calculate);

calculate();
