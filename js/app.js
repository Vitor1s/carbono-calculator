const calculatorForm = document.querySelector("#calculator-form");
const result = document.querySelector("#result");
const resultText = document.querySelector("#result-text");
const manualDistance = document.querySelector("#manual-distance");
const distanceInput = document.querySelector("#distance");
const distanceHelp = document.querySelector("#distance-help");
const originInput = document.querySelector("#origin");
const destinationInput = document.querySelector("#destination");
const originList = document.querySelector("#origin-list");
const destinationList = document.querySelector("#destination-list");

populateLocationSuggestions(getRouteLocations(), originList);
updateDestinationSuggestions("", destinationList);

originInput.addEventListener("input", () => {
  updateDestinationSuggestions(originInput.value, destinationList);
});

manualDistance.addEventListener("change", () => {
  distanceInput.disabled = !manualDistance.checked;
  distanceInput.required = manualDistance.checked;
  distanceInput.placeholder = manualDistance.checked
    ? "Ex.: 430"
    : "Calculada automaticamente";
  distanceHelp.textContent = manualDistance.checked
    ? "Informe a distancia em quilometros."
    : "A distancia sera obtida com base na origem e no destino.";
});

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const origin = document.querySelector("#origin").value.trim();
  const destination = document.querySelector("#destination").value.trim();
  const distance = manualDistance.checked
    ? Number(distanceInput.value)
    : findRouteDistance(origin, destination);
  const transport = document.querySelector(
    'input[name="transport"]:checked',
  ).value;
  const passengers = Number(document.querySelector("#passengers").value);

  if (!distance) {
    distanceHelp.textContent =
      "Rota nao cadastrada. Ative 'Definir manualmente' e informe a distancia.";
    distanceInput.focus();
    return;
  }

  const emission = calculateEmission(distance, transport, passengers);
  const comparison = compareTransportEmissions(distance, passengers, transport);

  showResult(
    result,
    resultText,
    emission,
    transport,
    origin,
    destination,
    distance,
    passengers,
    comparison,
  );
});
