import places from '~/content/places.json';

export default function usePlaces() {
    const getPlaceById = (id) => {
        return places.find((place) => place.id === id);
    };

    const getAllPlaces = () => {
        return places;
    }

    return { getAllPlaces, getPlaceById };
}
