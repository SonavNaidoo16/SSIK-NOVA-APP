import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }} 
      style={styles.background}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.brand}>SSIK NOVA</Text>
        <Text style={styles.title}>Empowering The Nation</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {username && password && (
          <Link href={{
            pathname: "/home",
            params: { name: username }
          }} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Link>
        )}

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)", // dark overlay to make text visible
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  brand: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#7B2CBF",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#7B2CBF",
    paddingVertical: 14,
    paddingHorizontal: 100,
    width: "auto",
    borderRadius: 25,
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
