export const getIconByValue = (iconValue) => {
    const key = parseInt(iconValue);
    const emoji = new Map([
        [1, "🌞"],
        [2, "🌤"],
        [3, "☁️"],
        [4, "☁️"],
        [9, "🌧"],
        [10, "🌦"],
        [11, "🌩"],
        [13, "❄"],
        [50, "❄"],
    ]);
    return emoji.get(key);
};
