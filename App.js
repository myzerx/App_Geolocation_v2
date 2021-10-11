import React, { useState, useEffect } from "react"; //https://snack.expo.dev/@aboutreact/geolocation-example?session_id=snack-session-45GVESXWi

import {SafeAreaView, View, Text, StyleSheet, Image, PermissionsAndroid, Platform, Button,} from "react-native";

import Geolocation from "@react-native-community/geolocation";

const App = () => {
  const [currentLongitude, setCurrentLongitude] = useState("...");
  const [currentLatitude, setCurrentLatitude] = useState("...");
  const [locationStatus, setLocationStatus] = useState("");

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Requer Acesso a localização",
              message: "Esse aplicativo precisa acessar a sua localização",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus("Permissão Negada");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus("Carregando Localização...");

    setTimeout(function () {
      Geolocation.getCurrentPosition(
        
        (position) => {
          setLocationStatus("Você está aqui!");

          const currentLongitude = JSON.stringify(position.coords.longitude);
          
          const currentLatitude = JSON.stringify(position.coords.latitude);
          
          setCurrentLongitude(currentLongitude);
          
          setCurrentLatitude(currentLatitude);
          
        },
        (error) => {
          setLocationStatus(error.message);
        },
        { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
      );
    }, 5000);
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus("Você está aqui!");
        
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
       
        const currentLatitude = JSON.stringify(position.coords.latitude);
        
        setCurrentLongitude(currentLongitude);
        
        setCurrentLatitude(currentLatitude);
        
      },
      (error) => {
        setLocationStatus(error.message);
      },

      { enableHighAccuracy: false, maximumAge: 1000 }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://ecoplan.com.br/galeria/mapicon_laranja.png",
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.boldText}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
              color: "#FFFFFF",
            }}
          >
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
              color: "#FFFFFF",
            }}
          >
            Latitude: {currentLatitude}
          </Text>
          <View style={styles.button}>
            <Button
              title="Obter Localização"
              onPress={getOneTimeLocation}
              color="#8B0000"
            />
          </View>
        </View>
        <Text style={{ fontSize: 18, textAlign: "center", color: "grey" }}>
          APP Geolocation
        </Text>
        <Text style={{ fontSize: 18, textAlign: "center", color: "grey" }}>
         Ianso/Richard
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontSize: 25,
    color: "#FFFFFF",
    marginVertical: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});

export default App;
