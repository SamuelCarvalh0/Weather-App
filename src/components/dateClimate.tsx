import { StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';

type dateClimateProp = {
    valueClimate: string,
    typeDateClimate: 'temp' | 'umid'
}

export default function DateClimate({valueClimate, typeDateClimate}: dateClimateProp) {

    return(
        <View style={styles.container}>
            <Text
                style={styles.textDateClimate}
            >
                {valueClimate}
            </Text>

            
            {typeDateClimate==='temp'?(
                <Feather
                    name="thermometer"
                    size={15} 
                    color="rgb(255,0,0)"
                />
            ):(
                <Feather
                    name="droplet"
                    size={15} 
                    color="rgb(0,0,255)"
                />
            )}
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingVertical: 2,
        width: 50,
        height: 20
    },
    textDateClimate: {
        fontSize: 12,
        fontFamily: "Inter-Regular",
        color: "rgb(30,30,30)"
    }
})