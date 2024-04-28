export default function useDate() {
    const getTime = (timestamp) => {
        return new Date(timestamp).toLocaleString('is-IS', { hour: 'numeric', minute: 'numeric', hour12: false });
    }

    const getDate = (timestamp) => {
        return new Date(timestamp).toLocaleString('is-IS', { month: 'long', day: 'numeric' });
    }

    return { getTime, getDate };
}
