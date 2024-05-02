import places from '~/content/places.json';

export default function usePlaces() {
    const getPlaceById = (id) => {
        return places.find((place) => place.id === id);
    };

    const getAllPlaces = (search) => {
        // get all favorite places from localstorage and sort by them
        const favoritePlaces = JSON.parse(localStorage.getItem('favorites')) || [];
        const allPlaces = places.map((place) => {
            return {
                ...place,
                isFavorite: favoritePlaces.includes(place.id),
            };
        });
        if (search) {
            // filter by all keys in the object
            return allPlaces.filter((place) => {
                return Object.keys(place).some((key) => {
                    return place[key].toString().toLowerCase().includes(search.toLowerCase());
                });
            });
        }
        return allPlaces.sort((a, b) => a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1);
    }

    const getScheduledPlaces = () => {
        const scheduledPlaces = places.filter(place => place.time);
        // Sort by scheduleItems time the time is in datetime format
        scheduledPlaces.sort((a, b) => new Date(a.time) - new Date(b.time));
        return scheduledPlaces;
    }

    return { getAllPlaces, getPlaceById, getScheduledPlaces };
}
