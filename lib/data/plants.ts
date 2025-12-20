export interface Turbine {
  id: string;
  name: string;
  type: "Gas Turbine" | "Steam Turbine";
  manufacturer: "Siemens Energy" | "GE Gas Power";
  model: string;
  serialNumber: string;
  controlSystem: string;
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
  manufacturer: "Siemens Energy" | "GE Gas Power",
  status: "online" | "offline" | "warning" = "online"
): Turbine => {
  // Siemens SGT5-2000E for Geregu
  const isSiemens = manufacturer === "Siemens Energy";
  const isGasTurbine = type === "Gas Turbine";

  // Generate realistic serial numbers
  const serialPrefix = isSiemens ? "SGT5" : "GE9E";
  const serialNumber = `${serialPrefix}-${Math.random().toString().slice(2, 8)}`;

  // Capacity based on actual specifications
  const capacity = isGasTurbine
    ? isSiemens
      ? { iso: 172.5, net: 165 } // SGT5-2000E
      : { iso: 128, net: 123 } // GE 9E
    : { iso: 85, net: 80 }; // GE Steam

  // Realistic current generation (80-95% of capacity)
  const loadFactor = 0.85 + Math.random() * 0.10;
  const currentPower = Math.round(capacity.iso * loadFactor);

  // Temperature varies by turbine type and load
  const baseTemp = isGasTurbine ? 540 : 538;
  const tempVariation = Math.round(Math.random() * 30 - 15);
  const currentTemp = baseTemp + tempVariation;

  return {
    id,
    name,
    type,
    manufacturer,
    model: isGasTurbine
      ? isSiemens
        ? "SGT5-2000E"
        : "GE Frame 9E"
      : "GE D11 Steam Turbine",
    serialNumber,
    controlSystem: isSiemens ? "SPPA-T3000" : "Mark VIe",
    status,
    capacity,
    metrics: {
      generation: {
        power: currentPower,
        current: Math.round(380 + Math.random() * 40),
        voltage: Math.round(15 + Math.random() * 3),
      },
      temperature: {
        value: currentTemp,
        high: isGasTurbine ? 600 : 560,
        cool: isGasTurbine ? 500 : 480,
      },
      vibrations: {
        seismic: Math.round(2.2 + Math.random() * 0.8),
        acceleration: Math.round(3.5 + Math.random() * 1.0),
        displacement: Math.round(40 + Math.random() * 20),
      },
      pressure: {
        high: isGasTurbine ? (isSiemens ? 18.4 : 12.6) : 120,
        low: isGasTurbine ? Math.round(1.0 + Math.random() * 0.3) : 0.05,
      },
    },
  };
};

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
      createTurbine("alaoji-gt1", "Turbine 1", "Gas Turbine", "GE Gas Power"),
      createTurbine("alaoji-gt2", "Turbine 2", "Gas Turbine", "GE Gas Power"),
      createTurbine("alaoji-gt3", "Turbine 3", "Gas Turbine", "GE Gas Power", "warning"),
      createTurbine("alaoji-gt4", "Turbine 4", "Gas Turbine", "GE Gas Power"),
      createTurbine("alaoji-st1", "Turbine 5", "Steam Turbine", "GE Gas Power"),
      createTurbine("alaoji-st2", "Turbine 6", "Steam Turbine", "GE Gas Power"),
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
      createTurbine("olorunsogo-gt1", "Turbine 1", "Gas Turbine", "GE Gas Power"),
      createTurbine("olorunsogo-gt2", "Turbine 2", "Gas Turbine", "GE Gas Power"),
      createTurbine("olorunsogo-gt3", "Turbine 3", "Gas Turbine", "GE Gas Power"),
      createTurbine("olorunsogo-gt4", "Turbine 4", "Gas Turbine", "GE Gas Power"),
      createTurbine("olorunsogo-st1", "Turbine 5", "Steam Turbine", "GE Gas Power"),
      createTurbine("olorunsogo-st2", "Turbine 6", "Steam Turbine", "GE Gas Power"),
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
      createTurbine("calabar-gt1", "Turbine 1", "Gas Turbine", "GE Gas Power"),
      createTurbine("calabar-gt2", "Turbine 2", "Gas Turbine", "GE Gas Power"),
      createTurbine("calabar-gt3", "Turbine 3", "Gas Turbine", "GE Gas Power"),
      createTurbine("calabar-gt4", "Turbine 4", "Gas Turbine", "GE Gas Power"),
      createTurbine("calabar-gt5", "Turbine 5", "Gas Turbine", "GE Gas Power"),
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
      createTurbine("geregu-gt1", "Turbine 1", "Gas Turbine", "Siemens Energy", "warning"),
      createTurbine("geregu-gt2", "Turbine 2", "Gas Turbine", "Siemens Energy"),
      createTurbine("geregu-gt3", "Turbine 3", "Gas Turbine", "Siemens Energy"),
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
      createTurbine("omotosho-gt1", "Turbine 1", "Gas Turbine", "GE Gas Power"),
      createTurbine("omotosho-gt2", "Turbine 2", "Gas Turbine", "GE Gas Power"),
      createTurbine("omotosho-gt3", "Turbine 3", "Gas Turbine", "GE Gas Power"),
      createTurbine("omotosho-gt4", "Turbine 4", "Gas Turbine", "GE Gas Power"),
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
      createTurbine("omoku-gt1", "Turbine 1", "Gas Turbine", "GE Gas Power"),
      createTurbine("omoku-gt2", "Turbine 2", "Gas Turbine", "GE Gas Power"),
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
      createTurbine("gbarain-gt1", "Turbine 1", "Gas Turbine", "GE Gas Power"),
      createTurbine("gbarain-gt2", "Turbine 2", "Gas Turbine", "GE Gas Power"),
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
      createTurbine("sapele-gt1", "Turbine 1", "Gas Turbine", "GE Gas Power"),
      createTurbine("sapele-gt2", "Turbine 2", "Gas Turbine", "GE Gas Power"),
      createTurbine("sapele-gt3", "Turbine 3", "Gas Turbine", "GE Gas Power"),
      createTurbine("sapele-st1", "Turbine 4", "Steam Turbine", "GE Gas Power"),
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
      createTurbine("ihovbor-gt1", "Turbine 1", "Gas Turbine", "GE Gas Power"),
      createTurbine("ihovbor-gt2", "Turbine 2", "Gas Turbine", "GE Gas Power"),
      createTurbine("ihovbor-gt3", "Turbine 3", "Gas Turbine", "GE Gas Power"),
      createTurbine("ihovbor-gt4", "Turbine 4", "Gas Turbine", "GE Gas Power"),
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

