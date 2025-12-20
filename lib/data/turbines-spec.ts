// Real turbine specifications based on manufacturer data

export const turbineSpecs = {
    // Siemens SGT5-2000E (Geregu NIPP)
    sgt5_2000e: {
        manufacturer: "Siemens Energy",
        model: "SGT5-2000E",
        type: "Gas Turbine",
        capacity: {
            iso: 172.5, // MW ISO base load
            net: 165, // MW net output
        },
        operatingParameters: {
            exhaustTemp: 542, // °C
            compressorPressureRatio: 18.4,
            exhaustMassFlow: 485, // kg/s
            efficiency: 38.5, // %
            speedRPM: 3000,
        },
        controlSystem: "SPPA-T3000",
        fuelType: "Natural Gas",
    },

    // GE 9E (Frame 9E) - Most other NDPHC plants
    ge_9e: {
        manufacturer: "GE Gas Power",
        model: "GE Frame 9E",
        type: "Gas Turbine",
        capacity: {
            iso: 128, // MW ISO base load
            net: 123, // MW net output
        },
        operatingParameters: {
            exhaustTemp: 540, // °C
            compressorPressureRatio: 12.6,
            exhaustMassFlow: 420, // kg/s
            efficiency: 35.5, // %
            speedRPM: 3000,
        },
        controlSystem: "Mark VIe",
        fuelType: "Natural Gas / Dual Fuel",
    },

    // GE Steam Turbine (Combined Cycle)
    ge_steam: {
        manufacturer: "GE Gas Power",
        model: "GE D11 Steam Turbine",
        type: "Steam Turbine",
        capacity: {
            iso: 85, // MW ISO
            net: 80, // MW net
        },
        operatingParameters: {
            inletTemp: 538, // °C
            inletPressure: 120, // bar
            exhaustPressure: 0.05, // bar
            efficiency: 42, // %
            speedRPM: 3000,
        },
        controlSystem: "Mark VIe",
        fuelType: "Steam",
    },
};

export type TurbineSpecKey = keyof typeof turbineSpecs;

