// src/variantData.js
const NA="Not Applicable";
export const variantData = {
  "Giulia": {
    "2016-2018": {
      vehicleInfo: {
        country: "Italy",
        series: "952",
        body: "Sedan",
        engine: "2.0L, 2.9L",
        drive: "RWD",
        dateRange: "2016–2018",
        keyType: "Proximity",
        silcaKeyProfile: "SIP22",
        silcaTransponder: "4A",
        transponderChip: "JMA TP12PV",
        remote: "433 MHz",
        KingParts: ["AKK260", "AKK263"],
        // rwsSmartAerialPlus: false,
        // rwaPlusMBox: false,
        silcaKeyCutting: ["1077", "6127", "5992 Emergency Blade"],
        Lishi:"LP-HU92-TL-AG",
      },
      programmingInfo: [
  {
    feature: "Cloning Options",
    brands: {
      KD: NA,
      JMA: NA,
      Keydiy: NA,
      Xhorse: NA,
    },
  },
  {
    feature: "Key Blade Options",
    brands: {
      KD: true,
      JMA: true,
    },
  },
  {
    feature: "Remote Options",
    brands: {
      Keydiy: false,
      Xhorse: true,
    },
  },
  {
    feature: "All Keys Lost",
    brands: {
      XTool: true,
      Autel: true,
      KD: true,
      JMA: false,
      Keydiy: false,
      Xhorse: true,
    }
  },
  {
    feature: "Add Spare Key",
    brands: {
      XTool: true,
      Autel: true,
      KD: false,
      JMA: false,
      Keydiy: true,
      Xhorse: true,
    }
  },
  // ...more features
],
      emergencyStart: "There is an emergency key position in the vehicle for starting when the remote battery is flat. The key is inserted near the gear lever and the remote buttons are pressed once when prompted.",
      obdPortLocation: "Under the dashboard, near pedals.",
      images: {
        car: "/images/Giulia.png",
        remote: "/images/giulia-remote.png",
        emergency: "/images/giulia-emergency.png",
        obd: "/images/giulia-obd.png"
      }
    }
    // Add more variants as needed
  }
  // Add more models as needed
};