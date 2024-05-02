export default function useDate() {
  const getTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("is-IS", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  };

  const getDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("is-IS", {
      month: "short",
      day: "numeric",
    });
  };

  const getWeekDay = (timestamp) => {
    return new Date(timestamp).toLocaleString("is-IS", { weekday: "long" });
  };

  return { getTime, getDate, getWeekDay };
}
