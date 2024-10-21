class DataAggregator {
    constructor(sensorManager, droneMonitor) {
        this.sensorManager = sensorManager;
        this.droneMonitor = droneMonitor;
    }

    async aggregateData() {
        const sensorData = await this.sensorManager.collectData();
        const droneStatus = await this.droneMonitor.getStatus();
        const droneTelemetry = await this.droneMonitor.getTelemetry();
        return { sensorData, droneStatus, droneTelemetry };
    }
}

module.exports = DataAggregator;
