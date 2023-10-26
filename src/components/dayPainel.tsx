import { StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import DateClimate from "./dateClimate";

type dayProp = {
    day: string,
    date: string,
    temperatureDay: string,
    umidDay: string,
    stateWeather: string,
    linkIcon: string,
    setId: () => void,
    select: boolean
}
export default function DayPainel({day, date, temperatureDay, umidDay, stateWeather, linkIcon, setId, select}: dayProp) {
    return (
        <TouchableOpacity
            style={
                {
                    ...styles.containerDayPainel,
                    backgroundColor: select?"rgba(100, 205, 255, 0.3)":"rgb(255,255,255)",
                    borderColor: select?"rgba(100, 205, 255, 0.3)":"rgb(230,230,230)",
                }
            }
            onPress={() => setId()}
        >

            <View style={styles.containerData}>
                <Text style={styles.textDay}>{day}</Text>
                <Text style={styles.textDate}>{date}</Text>
            </View>

            <View style={styles.containerIcon}>
                <Image 
                    style={{width: "100%", height: "100%"}}
                    source={{uri: linkIcon}}
                />
            </View>

            <View style={styles.containerWeather}>
                <View>
                    <Text style={styles.textDate}>{stateWeather}</Text>
                    <DateClimate 
                        valueClimate={temperatureDay}
                        typeDateClimate="temp"
                    />
                    <DateClimate
                        valueClimate={umidDay}
                        typeDateClimate="umid"
                    />
                </View>
            </View>
        </TouchableOpacity>
    )    
}

const styles = StyleSheet.create({
    containerDayPainel: {
        alignItems: "center",
        width: 100,
        padding: 5,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "rgb(230,230,230)",
        backgroundColor: "rgb(255,255,255)"
    },

    containerData: {
        alignItems: "center",
        width: "100%"
    },

    textDay:{
        fontSize: 16,
        fontFamily: "Inter-SemiBold",
        color: "rgb(50,50,50)"
    },

    textDate:{
        fontSize: 14,
        fontFamily: "Inter-Regular",
        color: "rgb(50,50,50)"
    },
    containerIcon:{
        justifyContent: "center",
        alignItems:"center",
        width: "100%",
        height: 60
    },

    containerWeather: {
        justifyContent: "flex-end",
        alignItems:"center",

        width: "100%",
        height: 80
    }
})