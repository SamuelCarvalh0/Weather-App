import { Feather } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet } from "react-native";

type dayWeatherProps = {
    hour: string,
    urlIconWeather: string,
    descriptionWeather: string,
    temperature: string,
    humidity: string,
    speedWind: string
}
export default function DetailsDayWeahter( {hour, urlIconWeather, descriptionWeather, temperature, humidity, speedWind}: dayWeatherProps){
    return (
        <View style={styles.container}>
            <Text style={styles.textHour}>{hour}</Text>

            <Image
                style={{width: 100, height: 100}}
                source={{uri: urlIconWeather}}
            />

            <Text style={styles.textWeatherDescription}>{descriptionWeather}</Text>

            <View>
                <View style={styles.containerWeatherProps}>
                    <Text style={styles.textWeatherProps}>{temperature}</Text>
                    <Feather
                        name="thermometer"
                        size={15}
                        color="rgb(255,0,0)"
                    />
                </View>

                <View style={styles.containerWeatherProps}>
                    <Text style={styles.textWeatherProps}>{humidity}</Text>
                    <Feather
                        name="droplet"
                        size={15}
                        color="rgb(0,0,255)"
                    />
                </View>

                <View style={styles.containerWeatherProps}>
                    <Text style={styles.textWeatherProps}>{speedWind}</Text>
                    <Feather
                        name="wind"
                        size={15}
                        color="rgb(0,200,0)"
                    />
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",

        marginRight: 20,
        padding: 10,
        width: 120,
        height: 270
    },

    containerWeatherProps: {
        flexDirection: "row",
        justifyContent: "center",

        width: 100,
        height: 20,
        marginBottom: 5
    },

    textHour: {
        height: 20,

        fontSize: 16,
        fontFamily: "Inter-SemiBold",

        color: "rgb(50,50,50)"
    },

    textWeatherDescription: {
        height: 40,
        marginBottom: 20,

        fontSize: 16,
        fontFamily: "Inter-Regular",

        color: "rgb(50,50,50)"
    },

    textWeatherProps: {
        fontSize: 14,
        fontFamily: "Inter-Regular",

        marginRight: 15,
        
        color: "rgb(50,50,50)"
    }
})