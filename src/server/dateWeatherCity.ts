import axios from 'axios'
import { API_KEY_WEATHER } from "@env"


type localParams = {
    lat: number,
    long: number
}


export type DateWeather = [
    {
        id: number
        data: string
        day: string
        weather: WeatherProps[]
    }
]
type WeatherProps = {
    hour: string,
    temp: number,
    humi: number,
    wind: number,
    descriptionWeather: string,
    iconWeather: string
}

const Hj = new Date().toLocaleDateString()
const dayText = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export default async function dateWeatherCity({lat, long}:localParams ): Promise<DateWeather> {
    const key = API_KEY_WEATHER
    const lang = "pt_br"
    const unit = "metric"
    const linkAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=${unit}&lang=${lang}`
    
    try {
        const response = await axios.get(linkAPI)
        const responseWeather = await response.data.list

        const weather = []
        let dataAPI: string = ""
        let countIndexData: number = 0

        let dataWeather: DateWeather = [{}] as DateWeather

        for (let index = 0; index < responseWeather.length; index++) {
            const element = responseWeather[index];
            const IndexHourWeather = responseWeather.length>1?(responseWeather.length%2):1

            const weatherProps: WeatherProps = {
                hour: element.dt_txt.slice(11, 16),
                temp: element.main.temp.toFixed(0),
                humi: element.main.humidity.toFixed(0),
                wind: element.wind.speed.toFixed(0),
                descriptionWeather: element.weather[IndexHourWeather].description,
                iconWeather:  element.weather[IndexHourWeather].icon
            }
            
            if (index === 0) {
                weather.push(weatherProps)

                dataAPI = element.dt_txt.slice(8, 10)+"-"+element.dt_txt.slice(5, 7)+"-"+element.dt_txt.slice(0, 4)
                const { data, day } = formatDay(dataAPI)

                dataWeather.splice(countIndexData,1,{id: countIndexData, data: data, day: day, weather: weather})
            }
            
            if (index !== 0){

                if (dataAPI === element.dt_txt.slice(8, 10)+"-"+element.dt_txt.slice(5, 7)+"-"+element.dt_txt.slice(0, 4)) {

                    dataWeather[countIndexData].weather.push(weatherProps)

                }
                else{
                    countIndexData = countIndexData + 1
                    dataAPI = element.dt_txt.slice(8, 10)+"-"+element.dt_txt.slice(5, 7)+"-"+element.dt_txt.slice(0, 4)
                    const { data, day } = formatDay(dataAPI)
                    dataWeather.push({id: countIndexData, data: data, day: day, weather: [weatherProps]})
                }

            }
        }
        return dataWeather

    } catch (error) {
        const DateWeather: DateWeather = [
            {
                id: 0,
                data: '',
                day: '',
                weather: [
                    {
                        hour: '0',
                        temp: 0,
                        humi: 0,
                        wind: 0,
                        descriptionWeather: '0',
                        iconWeather: '0'

                    }
                ]
            }
        ]
        return DateWeather
    }
}

function formatDay(date:string) {

    const day = new Date(Number(date.slice(6, 10)), Number(date.slice(3,5))-1, Number(date.slice(0,2)))
    const localFormatDate = date.replace(/-/g, "/")

    if(localFormatDate === Hj){
        return {day: "Hoje", data: localFormatDate.slice(0,5)}
    }
    return {day: dayText[day.getDay()], data: localFormatDate.slice(0,5)}
}

