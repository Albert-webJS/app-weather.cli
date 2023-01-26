import axios from "axios";
import { TOKEN_KEYWORDS, getKeyValue } from "./storage.service.js";

export const geyIconByValue = (iconValue) => {
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

export const getCurrentWheather = async (city) => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_KEYWORDS.token));
  if (!token)
    throw new Error(
      "token is not definet, need set API key. Use command -t [API_KEY]"
    );

  const params = {
    params: {
      q: city,
      appid: token,
      lang: "ru",
      units: "metric",
    },
  };

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    params
  );
  return data;
};
