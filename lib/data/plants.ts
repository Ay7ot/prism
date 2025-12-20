export interface Turbine {
  id: string;
  name: string;
  type: "Gas Turbine" | "Steam Turbine";
  model: string;
  serialNumber: string;
  status: "online" | "offline" | "warning";
  capacity: {
    iso: number;
    net: number;
  };
  metrics: {
    generation: {
      power: number;
      current: number;
      voltage: number;
    };
    temperature: {
      value: number;
      high: number;
      cool: number;
    };
    vibrations: {
      seismic: number;
      acceleration: number;
      displacement: number;
    };
    pressure: {
      high: number;
      low: number;
    };
  };
}

export interface Plant {
  id: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  status: "online" | "offline" | "maintenance";
  turbines: Turbine[];
  totalCapacity: number;
  currentOutput: number;
  workforce: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const createTurbine = (
  id: string,
  name: string,
  type: "Gas Turbine" | "Steam Turbine",
  status: "online" | "offline" | "warning" = "online"
): Turbine => ({
  id,
  name,
  type,
  model: type === "Gas Turbine" ? "GE Frame 9E Turbine" : "GE Steam Turbine",
  serialNumber: `MX${Math.random().toString().slice(2, 8)}DT`,
  status,
  capacity: {
    iso: type === "Gas Turbine" ? 126 : 80,
    net: type === "Gas Turbine" ? 102 : 65,
  },
  metrics: {
    generation: {
      power: type === "Gas Turbine" ? 116 : 118,
      current: 400,
      voltage: 400,
    },
    temperature: {
      value: type === "Gas Turbine" ? 6199 : 1299,
      high: 2400,
      cool: 900,
    },
    vibrations: {
      seismic: 2400,
      acceleration: 400,
      displacement: type === "Gas Turbine" ? 400 : 50,
    },
    pressure: {
      high: 2400,
      low: 40,
    },
  },
});

export const plants: Plant[] = [
  {
    id: "alaoji",
    name: "Alaoji Power Plant",
    shortName: "Alaoji",
    location: "Abia",
    state: "Abia State",
    status: "online",
    totalCapacity: 504,
    currentOutput: 420,
    workforce: 148,
    coordinates: { lat: 5.1167, lng: 7.3667 },
    turbines: [
      createTurbine("alaoji-gt1", "Turbine 1", "Gas Turbine"),
      createTurbine("alaoji-gt2", "Turbine 2", "Gas Turbine"),
      createTurbine("alaoji-gt3", "Turbine 3", "Gas Turbine", "warning"),
      createTurbine("alaoji-gt4", "Turbine 4", "Gas Turbine"),
      createTurbine("alaoji-st1", "Turbine 5", "Steam Turbine"),
      createTurbine("alaoji-st2", "Turbine 6", "Steam Turbine"),
    ],
  },
  {
    id: "olorunsogo",
    name: "Olorunsogo Power Plant",
    shortName: "Olorunsogo",
    location: "Ogun",
    state: "Ogun State",
    status: "online",
    totalCapacity: 676,
    currentOutput: 580,
    workforce: 165,
    coordinates: { lat: 6.9167, lng: 3.4167 },
    turbines: [
      createTurbine("olorunsogo-gt1", "Turbine 1", "Gas Turbine"),
      createTurbine("olorunsogo-gt2", "Turbine 2", "Gas Turbine"),
      createTurbine("olorunsogo-gt3", "Turbine 3", "Gas Turbine"),
      createTurbine("olorunsogo-gt4", "Turbine 4", "Gas Turbine"),
      createTurbine("olorunsogo-st1", "Turbine 5", "Steam Turbine"),
      createTurbine("olorunsogo-st2", "Turbine 6", "Steam Turbine"),
    ],
  },
  {
    id: "calabar",
    name: "Calabar Power Plant",
    shortName: "Calabar",
    location: "Calabar",
    state: "Cross River State",
    status: "online",
    totalCapacity: 561,
    currentOutput: 490,
    workforce: 132,
    coordinates: { lat: 4.9517, lng: 8.322 },
    turbines: [
      createTurbine("calabar-gt1", "Turbine 1", "Gas Turbine"),
      createTurbine("calabar-gt2", "Turbine 2", "Gas Turbine"),
      createTurbine("calabar-gt3", "Turbine 3", "Gas Turbine"),
      createTurbine("calabar-gt4", "Turbine 4", "Gas Turbine"),
      createTurbine("calabar-gt5", "Turbine 5", "Gas Turbine"),
    ],
  },
  {
    id: "geregu",
    name: "Geregu Power Plant",
    shortName: "Geregu",
    location: "Kogi",
    state: "Kogi State",
    status: "online",
    totalCapacity: 434,
    currentOutput: 380,
    workforce: 120,
    coordinates: { lat: 7.4969, lng: 6.7317 },
    turbines: [
      createTurbine("geregu-gt1", "Turbine 1", "Gas Turbine", "warning"),
      createTurbine("geregu-gt2", "Turbine 2", "Gas Turbine"),
      createTurbine("geregu-gt3", "Turbine 3", "Gas Turbine"),
    ],
  },
  {
    id: "omotosho",
    name: "Omotosho Power Plant",
    shortName: "Omotosho",
    location: "Ondo",
    state: "Ondo State",
    status: "online",
    totalCapacity: 504,
    currentOutput: 450,
    workforce: 142,
    coordinates: { lat: 6.7167, lng: 4.7833 },
    turbines: [
      createTurbine("omotosho-gt1", "Turbine 1", "Gas Turbine"),
      createTurbine("omotosho-gt2", "Turbine 2", "Gas Turbine"),
      createTurbine("omotosho-gt3", "Turbine 3", "Gas Turbine"),
      createTurbine("omotosho-gt4", "Turbine 4", "Gas Turbine"),
    ],
  },
  {
    id: "omoku",
    name: "Omoku Power Plant",
    shortName: "Omoku",
    location: "Rivers",
    state: "Rivers State",
    status: "online",
    totalCapacity: 150,
    currentOutput: 130,
    workforce: 85,
    coordinates: { lat: 5.3333, lng: 6.6667 },
    turbines: [
      createTurbine("omoku-gt1", "Turbine 1", "Gas Turbine"),
      createTurbine("omoku-gt2", "Turbine 2", "Gas Turbine"),
    ],
  },
  {
    id: "gbarain",
    name: "Gbarain Power Plant",
    shortName: "Gbarain",
    location: "Bayelsa",
    state: "Bayelsa State",
    status: "online",
    totalCapacity: 225,
    currentOutput: 200,
    workforce: 95,
    coordinates: { lat: 4.9333, lng: 6.2667 },
    turbines: [
      createTurbine("gbarain-gt1", "Turbine 1", "Gas Turbine"),
      createTurbine("gbarain-gt2", "Turbine 2", "Gas Turbine"),
    ],
  },
  {
    id: "sapele",
    name: "Sapele Power Plant",
    shortName: "Sapele",
    location: "Delta",
    state: "Delta State",
    status: "online",
    totalCapacity: 450,
    currentOutput: 398,
    workforce: 155,
    coordinates: { lat: 5.8833, lng: 5.6833 },
    turbines: [
      createTurbine("sapele-gt1", "Turbine 1", "Gas Turbine"),
      createTurbine("sapele-gt2", "Turbine 2", "Gas Turbine"),
      createTurbine("sapele-gt3", "Turbine 3", "Gas Turbine"),
      createTurbine("sapele-st1", "Turbine 4", "Steam Turbine"),
    ],
  },
  {
    id: "ihovbor",
    name: "Ihovbor Power Plant",
    shortName: "Ihovbor",
    location: "Edo",
    state: "Edo State",
    status: "online",
    totalCapacity: 450,
    currentOutput: 400,
    workforce: 138,
    coordinates: { lat: 6.35, lng: 5.6167 },
    turbines: [
      createTurbine("ihovbor-gt1", "Turbine 1", "Gas Turbine"),
      createTurbine("ihovbor-gt2", "Turbine 2", "Gas Turbine"),
      createTurbine("ihovbor-gt3", "Turbine 3", "Gas Turbine"),
      createTurbine("ihovbor-gt4", "Turbine 4", "Gas Turbine"),
    ],
  },
];

export const getPlantById = (id: string): Plant | undefined => {
  return plants.find((plant) => plant.id === id);
};

export const getTotalStats = () => {
  const totalPlants = plants.length;
  const onlinePlants = plants.filter((p) => p.status === "online").length;
  const totalCapacity = plants.reduce((sum, p) => sum + p.totalCapacity, 0);
  const totalOutput = plants.reduce((sum, p) => sum + p.currentOutput, 0);
  const totalWorkforce = plants.reduce((sum, p) => sum + p.workforce, 0);

  return {
    totalPlants,
    onlinePlants,
    totalCapacity,
    totalOutput,
    totalWorkforce,
  };
};

