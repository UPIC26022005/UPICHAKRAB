const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
document.addEventListener('DOMContentLoaded', function () {
    const getDataBtn = document.getElementById('getDataBtn');
    const resultDiv = document.getElementById('result');

    getDataBtn.addEventListener('click', fetchDataFromAPI);

    function fetchDataFromAPI() {
        const apiUrl = 'http://api.weatherstack.com/current?access_key=3566c965a155fb07c44473f67771d367&query=New%20York';
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                resultDiv.innerHTML = `<p>Data from API: ${JSON.stringify(data)}</p>`;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultDiv.innerHTML = '<p>Error fetching data from the API</p>';
            });
    }
});