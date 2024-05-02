import places from '~/content/places.json';
import scheduleItems from '~/content/schedule.json'

export default function usePlaces() {
    const getPlaceById = (id) => {
        return places.find((place) => place.id === id);
    };

    const getAllPlaces = () => {
        return places;
    }

    const getScheduledPlaces = () => {
        const scheduledPlaces = places.filter(place => scheduleItems.includes(place.id));
        // Sort by scheduleItems time the time is in datetime format
        scheduledPlaces.sort((a, b) => new Date(a.time) - new Date(b.time));
        return scheduledPlaces;
    }

    return { getAllPlaces, getPlaceById, getScheduledPlaces };
}
