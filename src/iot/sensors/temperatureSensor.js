const Sensor = require('sensor-library'); // Hypothetical sensor library

class TemperatureSensor {
    constructor(pin) {
        this.sensor = new Sensor.Temperature(pin);
    }

    async readTemperature() {
        try {
            const temperature = await this.sensor.read();
            console.log(`Current Temperature: ${temperature}°C`);
            return temperature;
        } catch (error) {
            console.error("Error reading temperature:", error);
            return null;
        }
    }
}

module.exports = TemperatureSensor;
