function populateLocationSuggestions(locations, datalist) {
  datalist.innerHTML = locations
    .sort()
    .map((location) => `<option value="${location}"></option>`)
    .join("");
}

function updateDestinationSuggestions(origin, datalist) {
  populateLocationSuggestions(getPossibleDestinations(origin), datalist);
}

function showResult(
  resultElement,
  textElement,
  emission,
  transport,
  origin,
  destination,
  distance,
  passengers,
  comparison,
) {
  const factor = emissionFactors[transport];
  const totalEmission = distance * factor;
  const totalCredits = totalEmission / kilogramsPerCarbonCredit;
  const perPassengerCredits = emission / kilogramsPerCarbonCredit;

  textElement.textContent = `Estimativa para ${transportLabels[transport]} entre ${origin} e ${destination}.`;
  document.querySelector("#result-origin").textContent = origin;
  document.querySelector("#result-destination").textContent = destination;
  document.querySelector("#result-distance").textContent =
    `${distance.toFixed(1)} km`;
  document.querySelector("#result-transport").textContent =
    transportLabels[transport];
  document.querySelector("#result-passengers").textContent = passengers;
  document.querySelector("#result-factor").textContent =
    `${factor.toFixed(2)} kg CO2/km`;
  document.querySelector("#result-calculation").textContent =
    `${distance.toFixed(1)} km x ${factor.toFixed(2)} kg CO2/km = ${totalEmission.toFixed(2)} kg CO2`;
  document.querySelector("#result-total").textContent =
    `${totalEmission.toFixed(2)} kg CO2`;
  document.querySelector("#result-per-passenger").textContent =
    `${emission.toFixed(2)} kg CO2`;
  document.querySelector("#result-credits").textContent =
    `${totalCredits.toFixed(4)} crédito${totalCredits === 1 ? "" : "s"}`;
  document.querySelector("#result-credits-per-passenger").textContent =
    `${perPassengerCredits.toFixed(4)} crédito${perPassengerCredits === 1 ? "" : "s"}`;
  document.querySelector("#credits-progress").style.width =
    `${Math.min(totalCredits * 100, 100)}%`;
  renderTransportComparison(comparison, transport);
  resultElement.hidden = false;
}

function renderTransportComparison(comparison, selectedTransport) {
  const comparisonList = document.querySelector("#transport-comparison");
  const highestEmission = Math.max(
    ...comparison.map((item) => item.emission),
    1,
  );

  comparisonList.innerHTML = comparison
    .map((item) => {
      const isSelected = item.transport === selectedTransport;
      const differenceText = isSelected
        ? "Selecionado"
        : item.difference < 0
          ? `${Math.abs(item.difference).toFixed(2)} kg a menos`
          : `${item.difference.toFixed(2)} kg a mais`;

      return `
        <li class="comparison-row${isSelected ? " is-selected" : ""}">
          <span class="comparison-vehicle">
            <span class="transport-icon" aria-hidden="true">${transportIcons[item.transport]}</span>
            <strong>${transportLabels[item.transport]}</strong>
          </span>
          <span class="comparison-measure">
            <span class="comparison-bar-track" aria-hidden="true">
              <span class="comparison-bar" style="width: ${item.emission === 0 ? 3 : (item.emission / highestEmission) * 100}%"></span>
            </span>
            <span>${item.emission.toFixed(2)} kg CO2/pessoa</span>
          </span>
          <span>${differenceText}</span>
        </li>
      `;
    })
    .join("");
}
