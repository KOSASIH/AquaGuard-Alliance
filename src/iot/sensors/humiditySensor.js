const Sensor = require('sensor-library'); // Hypothetical sensor library

class HumiditySensor {
    constructor(pin) {
        this.sensor = new Sensor.Humidity(pin);
    }

    async readHumidity() {
        try {
            const humidity = await this.sensor.read();
            console.log(`Current Humidity: ${humidity}%`);
            return humidity;
        } catch (error) {
            console.error("Error reading humidity:", error);
            return null;
        }
    }
}

module.exports = HumiditySensor;
