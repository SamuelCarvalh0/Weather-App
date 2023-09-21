import { StyleSheet, Text, View } from "react-native";
import {Thermometer, Droplet} from 'lucide-react-native';

type dateClimateProp = {
    valueClimate: string,
    typeDateClimate: 'temp' | 'umid'
}

export default function DateClimate({valueClimate, typeDateClimate}: dateClimateProp) {

    return(
        <View style={styles.container}>
            {typeDateClimate==='temp'?(
                <Thermometer
                    color="red"
                    size={15}
                    strokeWidth={2}
                    fill="red"
                />
            ):(
                <Droplet
                    color="aqua"
                    size={15}
                    strokeWidth={2}
                    fill="aqua"
                />
            )}
            
            <Text style={styles.textDateClimate}>{valueClimate}</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingVertical: 2,
        height: 20
    },
    textDateClimate: {
        fontSize: 12,
        marginLeft: 2,  
        color: "rgb(255,255,255)"
    }
})