function calculateEmission(distanceKm, transport, passengers) {
  const factor = emissionFactors[transport];

  if (factor === undefined || distanceKm <= 0 || passengers <= 0) {
    throw new Error("Dados invalidos para o calculo.");
  }

  return (distanceKm * factor) / passengers;
}

function compareTransportEmissions(distanceKm, passengers, selectedTransport) {
  return Object.keys(emissionFactors).map((transport) => {
    const emission = calculateEmission(distanceKm, transport, passengers);

    return {
      transport,
      emission,
      difference:
        emission - calculateEmission(distanceKm, selectedTransport, passengers),
    };
  });
}
