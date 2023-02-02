import axios from "axios"
import { environment as env } from '../environment/environment';


export const instance = axios.create({
    // baseURL: env.domain,
    params: {
        lang: "ru",
        units: "metric",
    }
})