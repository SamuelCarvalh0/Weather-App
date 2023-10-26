import axios from 'axios'
import { API_KEY_WEATHER } from "@env"

export type resultSearchType = {
    id: number,
    city: string,
    state: string,
    country: string,
    latitude: number,
    longitude: number
}

export default async function LocalSearch(cityName: string): Promise<resultSearchType[] | null> {
    const key = API_KEY_WEATHER
    const limitResult = 3
    const linkAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limitResult}&appid=${key}`
    let resultSearch = []

    try {
        const searchCity = await axios.get(linkAPI)

        if(searchCity.data[0]===undefined){
            return null
        }
        
        for (let index = 0; index < searchCity.data.length; index++) {
            const element = searchCity.data[index];

            const city: string = element.name
            const state: string = element.state
            const country: string = element.country
            const latitude: number = element.lat
            const longitude: number = element.lon
            
            resultSearch.push({
                id: index,
                city,
                state,
                country,
                latitude,
                longitude
            })
            
        }
        return resultSearch

    } catch (error) {
        return null
    }
}