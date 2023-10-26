import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  Text, 
  View,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import DayPainel from './src/components/dayPainel';
import LocalSearch from './src/server/localSearch';
import { useEffect, useState } from 'react';
import dateWeatherCity, { DateWeather } from './src/server/dateWeatherCity';
import DetailsDayWeahter from './src/components/detailsDayWeather';
import { useFonts } from "expo-font";
import { Feather } from '@expo/vector-icons';
import ModalSearch from './src/components/modalSeach';

type SearchCityProps = {
  id: number,
  local: string,
  lat: number,
  lon: number
}

const initialCity = "São Paulo"
const initialLat = -19.9536171
const initialLon = -44.0109041

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("./assets/Inter-Bold.ttf"),
    "Inter-Regular": require("./assets/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/Inter-SemiBold.ttf"),
  })

  const [visibleModal, setvisibleModal] = useState(false)

  const [searchCity, setSearchCity] = useState<string>("São Paulo - São Paulo - BR")
  const [listSearchCity, setListSearchCity] = useState<SearchCityProps[]>()
  const [previsionWeather, setPrevisionWeather] = useState<DateWeather>()
  const [idDetailsDayWeather, setIdDetailsDayWeather] = useState(0)
  
  const [displaylistCity, setDisplayListCity] = useState(false)
  const [colorTextAlert, setColorTextAlert] = useState("rgb(50,50,50)")

  useEffect(()=>{
    searchLocal(initialCity)
    searchWeather(initialLat, initialLon)
    
  },[])

  async function searchLocal(city: string) {
    const response = await LocalSearch(city)

    if (response) {
      const ListCity = response.map(item => {
        return {
          local: item.city+" - "+item.state+" - "+item.country,
          id: item.id,
          lat: item.latitude,
          lon: item.longitude
        }
      })
      setColorTextAlert("rgb(50,50,50)")
      setListSearchCity(ListCity)
      return
    }
    
    setListSearchCity(
      [
        {id: 0,
         local: "Cidade não encontrada..",
         lat: 0,
         lon: 0
        }
      ]
    )

    setColorTextAlert("rgb(255,0,0)")

  }

  function selectedCity(nameCity: string, lat: number, lon: number) {
    setSearchCity(nameCity)
    searchWeather(lat, lon)
    setSearchCity(nameCity)

  }

  async function searchWeather(lat: number,long: number) {
    const dateWeather: DateWeather = await dateWeatherCity({lat: lat, long: long})
    setPrevisionWeather(dateWeather)
  }

  return (

    previsionWeather===undefined || fontsLoaded===false
    ?(
      <View 
        style={
          {
            flex: 1,
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "rgb(255,255,255)"
          }
        }
      >
        <Text style={{fontSize: 18, fontWeight: "bold", color: "rgb(50,50,50)"}}>Loading..</Text>
        <StatusBar style="light"/>
      </View>
      
    )
    :(
      <SafeAreaView style={styles.container}>
        <View style={styles.containerCity}>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={()=>setvisibleModal(true)}
          >
            <Feather
            name='search'
            size={24}
            />
          </TouchableOpacity>
          <Pressable
            onPress={()=>setvisibleModal(true)}
          >
            <Text
            style={styles.textCity}>
            {searchCity}
            </Text>
          </Pressable>
        </View>

        <ModalSearch
          ModalDisplay={visibleModal}
          displayListCity={displaylistCity}
          listSearchCity={listSearchCity}
          searchLocal={searchLocal}
          selectedCity={selectedCity}
          setDisplayListCity={setDisplayListCity}
          setVisibleModal={setvisibleModal}
        />

        <View style={{...styles.containerTitleDetailDayWeather, marginTop: 20}}>
          <Text style={styles.titleDetailsDayWeather}>
            Previsão para 5 dias 
          </Text>
        </View>

        <FlatList
          style={{maxHeight: 200, width: "100%", position: "relative"}}
          data={previsionWeather}
          renderItem={({item})=> (
            <DayPainel
              day={item.day}
              date={item.data}
              temperatureDay={String(item.weather[0].temp) + "°C"}
              umidDay={String(item.weather[0].humi) + " %"}
              stateWeather={item.weather[0].descriptionWeather}
              linkIcon={`https://openweathermap.org/img/wn/${item.weather[0].iconWeather}@2x.png`}
              select={item.id===idDetailsDayWeather?true:false}
              setId={() => setIdDetailsDayWeather(item.id)}
            />
          )}
          keyExtractor={item=>String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.containerTitleDetailDayWeather}>
          <Text style={styles.titleDetailsDayWeather}>
            {previsionWeather[idDetailsDayWeather].day} - {previsionWeather[idDetailsDayWeather].data} 
          </Text>
        </View>
        

        <FlatList
          style={styles.containerDetailsWeather}
          data={previsionWeather[idDetailsDayWeather].weather}
          renderItem={({item})=>(
            <DetailsDayWeahter
              hour={item.hour}
              urlIconWeather={`https://openweathermap.org/img/wn/${item.iconWeather}@2x.png`}
              descriptionWeather={item.descriptionWeather}
              temperature={item.temp + "°C"}
              humidity={item.humi + " %"}
              speedWind={item.wind + "m/s"}
            />
          )}
          keyExtractor={item=>String(item.hour)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <StatusBar style="dark"/>
      </SafeAreaView>
    )
    
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: Platform.OS==="ios"?60:45,
    paddingHorizontal: 10,

    backgroundColor: 'rgb(255,255,255)'
  },

  containerCity:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap",

    width: "100%",
    height: 50,
    borderRadius: 10
  },

  buttonSearch:{
    justifyContent: "center",
    alignItems: "center",

    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 1,

    borderColor: "rgb(230,230,230)",
    backgroundColor: "rgb(255,255,255)"
  },

  textCity: {
    maxWidth: 300,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    color: "rgb(50,50,50)",
  },

  containerTitleDetailDayWeather: {
    justifyContent: "center",
    alignItems: "flex-start",

    width: "100%",
    marginTop: 20,
    marginBottom: 5,

  },
  containerDetailsWeather: {
    width: "100%",
    maxHeight: 270,
    borderRadius: 10,
    backgroundColor: "rgba(100, 205, 255, 0.3)",

  },

  titleDetailsDayWeather: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",

    color: "rgb(50,50,50)"
  }
});
