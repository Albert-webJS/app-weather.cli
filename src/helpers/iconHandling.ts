export const getIconByValue = (iconValue: string): string => {
    const key: number = parseInt(iconValue);
    const emoji: Map<number, string> = new Map([
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

    return emoji.get(key) as string;
};