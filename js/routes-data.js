const routesData = {
  "sao-paulo-rio": {
    origin: "Sao Paulo",
    destination: "Rio de Janeiro",
    distanceKm: 430,
  },
  "belo-horizonte-sao-paulo": {
    origin: "Belo Horizonte",
    destination: "Sao Paulo",
    distanceKm: 585,
  },
  "brasilia-goiania": {
    origin: "Brasilia",
    destination: "Goiania",
    distanceKm: 210,
  },
  "curitiba-florianopolis": {
    origin: "Curitiba",
    destination: "Florianopolis",
    distanceKm: 300,
  },
  "recife-natal": {
    origin: "Recife",
    destination: "Natal",
    distanceKm: 290,
  },
  "porto-alegre-florianopolis": {
    origin: "Porto Alegre",
    destination: "Florianopolis",
    distanceKm: 475,
  },
  "salvador-feira-de-santana": {
    origin: "Salvador",
    destination: "Feira de Santana",
    distanceKm: 210,
  },
};

function normalizeLocation(location) {
  return location
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function findRouteDistance(origin, destination) {
  const normalizedOrigin = normalizeLocation(origin);
  const normalizedDestination = normalizeLocation(destination);

  return Object.values(routesData).find((route) => {
    const routeOrigin = normalizeLocation(route.origin);
    const routeDestination = normalizeLocation(route.destination);

    return (
      (routeOrigin === normalizedOrigin &&
        routeDestination === normalizedDestination) ||
      (routeOrigin === normalizedDestination &&
        routeDestination === normalizedOrigin)
    );
  })?.distanceKm;
}

function getRouteLocations() {
  const locations = new Set();

  Object.values(routesData).forEach((route) => {
    locations.add(route.origin);
    locations.add(route.destination);
  });

  return [...locations];
}

function getPossibleDestinations(origin) {
  const normalizedOrigin = normalizeLocation(origin);
  const destinations = new Set();

  Object.values(routesData).forEach((route) => {
    const routeOrigin = normalizeLocation(route.origin);
    const routeDestination = normalizeLocation(route.destination);

    if (routeOrigin === normalizedOrigin) {
      destinations.add(route.destination);
    }

    if (routeDestination === normalizedOrigin) {
      destinations.add(route.origin);
    }
  });

  return destinations.size ? [...destinations] : getRouteLocations();
}
