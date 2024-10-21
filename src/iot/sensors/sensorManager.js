const TemperatureSensor = require('./temperatureSensor');
const HumiditySensor = require('./humiditySensor');

class SensorManager {
    constructor(tempPin, humidityPin) {
        this.temperatureSensor = new TemperatureSensor(tempPin);
        this.humiditySensor = new HumiditySensor(humidityPin);
    }

    async collectData() {
        const temperature = await this.temperatureSensor.readTemperature();
        const humidity = await this.humiditySensor.readHumidity();
        return { temperature, humidity };
    }
}

module.exports = SensorManager;
