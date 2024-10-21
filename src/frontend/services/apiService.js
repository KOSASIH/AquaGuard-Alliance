const API_URL = 'https:// api.aquaguard.io';

const apiService = {
    async fetchCommunityEvents() {
        try {
            const response = await fetch(`${API_URL}/events`);
            return response.json();
        } catch (error) {
            console.error("Error fetching community events:", error);
            return [];
        }
    },
};

export default apiService;
