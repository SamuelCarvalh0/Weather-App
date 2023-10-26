import { Image, StyleSheet, Text, View } from "react-native";

export default function PainelMap({painelTitle}: {painelTitle: string}) {
    return (
        <View style={styles.containerPainelMap}>
            <Text style={styles.titlePainel}>{painelTitle}</Text>
            <Image
                source={require("../../assets/clima.jpg")}
                style={styles.imageMap}
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    containerPainelMap:{
        position: "relative",

        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 400,
        padding: 10,
        marginRight: 10,
        borderRadius: 20,

        backgroundColor: "rgb(70,70,70)",
    },

    titlePainel: {
        position: "absolute",
        left: 10,
        top: 10,
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
        color: "rgb(255,255,255)",
    },

    imageMap:{
        // flex: 1
        height: "50%",
        width: "100%",
        

    }
})