export default function useFavorite() {
    // function to save the place id in the local storage as a favorite
    const saveFavorite = (id) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(id)) {
            favorites = favorites.filter(fav => fav !== id);
        } else {
            favorites.push(id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // function to check if the place is a favorite
    const isFavorite = (id) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(id);
    }

    return {
        saveFavorite,
        isFavorite
    }
}
