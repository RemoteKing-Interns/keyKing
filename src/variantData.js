// src/variantData.js
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
        transponderChip: "433 MHz",
        remote: "433 MHz",
        smartProParts: ["AKK260", "AKK263"],
        rwsSmartAerialPlus: false,
        rwaPlusMBox: false,
        silcaKeyCutting: ["1077", "6127", "5992 Emergency Blade"]
      },
      programmingInfo: [
        { feature: "Programming Spare Keys", supported: true },
        { feature: "Programming All Keys Lost", supported: true },
        { feature: "Minimum Key Required", value: "0" },
        { feature: "Existing Key Will Be Erased", supported: true },
        { feature: "Add Keys Without Existing", supported: true },
        { feature: "Erase Keys Without Adding", supported: true },
        { feature: "Pin Code Required (by OBD)", supported: true },
        { feature: "Precoding Required", supported: false },
        { feature: "Precoding Done Remotely", supported: false },
        { feature: "Program Remote", supported: true }
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