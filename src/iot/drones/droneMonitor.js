const Drone = require('drone-library'); // Hypothetical drone library

class DroneMonitor {
    constructor(droneId) {
        this.drone = new Drone(droneId);
    }

    async getStatus() {
        try {
            const status = await this.drone.getStatus();
            console.log("Drone Status:", status);
            return status;
        } catch (error) {
            console.error("Error fetching drone status:", error);
            return null;
        }
    }

    async getTelemetry() {
        try {
            const telemetry = await this.drone.getTelemetry();
            console.log("Drone Telemetry:", telemetry);
            return telemetry;
        } catch (error) {
            console.error("Error fetching drone telemetry:", error);
            return null;
        }
    }
}

module.exports = DroneMonitor;
