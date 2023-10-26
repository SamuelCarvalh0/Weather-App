import { AntDesign } from '@expo/vector-icons';
import {
  Modal,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native"

type ModalProps = {
    ModalDisplay: boolean,
    displayListCity: boolean,
    listSearchCity: ListSearch[] | undefined,
    setDisplayListCity: (prop:boolean) => void,
    searchLocal: (prop: string) => void,
    selectedCity: (local: string, lon: number, lat: number) => void,
    setVisibleModal: (prop:boolean) => void,
}

type ListSearch = {
    local: string,
    lat: number,
    lon: number
}

export default function ModalSearch({ModalDisplay, listSearchCity, displayListCity, setDisplayListCity, searchLocal, selectedCity, setVisibleModal}: ModalProps){
  
  return (
    <Modal
      transparent
      animationType='slide'
      visible={ModalDisplay}
    >
      <KeyboardAvoidingView
        style={styles.containerModal}
      >
        <View style={styles.containerSearch}>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={()=>setVisibleModal(false)}
          >
            <AntDesign
              name="left"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          <TextInput 
            style={styles.textSearchResult}
            placeholder='Localização..'
            placeholderTextColor="rgb(100,100,100)"
            autoFocus
            onChangeText={(text)=> {
              if(text){
                setDisplayListCity(true)
                searchLocal(text)
              }else{
                setDisplayListCity(false)
              }
            }}
          />
        </View>

        <FlatList
        data={listSearchCity}
        renderItem={({item})=> (
          <TouchableOpacity
            style={{display: displayListCity?"flex":"none"}}
            onPress={()=> {
              const textVerifiqued = "Cidade não encontrada.."
              if(item.local===textVerifiqued){
                return
              }
              selectedCity(item.local, item.lat, item.lon)
              setDisplayListCity(false)
              setVisibleModal(false)
            }}
          >
            <Text style={styles.textAlertSearch}>
              {item.local}
            </Text>
          </TouchableOpacity>
        )} 
        keyboardShouldPersistTaps={'handled'}     
        />
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgb(255,255,255)"
  },

  buttonClose:{
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(230,230,230)"

  },

  containerSearch: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,

    width: "100%",
    height: 50,

    backgroundColor: "rgb(255,255,255)"
  },

  textSearchResult: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",

    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(230,230,230)",
    
    color: "rgb(50,50,50)",
  },
  
  textAlertSearch: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginVertical: 5
  }
})