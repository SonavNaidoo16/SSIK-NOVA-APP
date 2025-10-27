import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ContactScreen() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<null | { name: string; message: string }>(null);
  const router = useRouter();

  const handleSubmit = () => {
    if (!name || !message) {
      alert("Please fill in all fields before sending your message.");
      return;
    }

    setSubmittedData({ name, message });
    alert(`Thank you ${name}, we might get back to you soon!`);
    setName("");
    setMessage("");
  };

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Contact Us</Text>

          <Text style={styles.info}>Address: 123 Training Road, Durban</Text>
          <Text style={styles.info}>Phone: +27 11 234 5678</Text>
          <Text style={styles.info}>Email: info@empoweringnation.org</Text>

          <Text style={[styles.subtitle, { marginTop: 25 }]}>Get in Touch</Text>

          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Your Message</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message"
            placeholderTextColor="#999"
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
       
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.back("/home")}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>

          {submittedData && (
            <View style={styles.displayContainer}>
              <Text style={styles.displayTitle}>Your Submitted Details:</Text>
              <Text style={styles.displayText}>Name: {submittedData.name}</Text>
              <Text style={styles.displayText}>Message: {submittedData.message}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)", // dark overlay to make content pop
  },
  container: {
    padding: 20,
    // center card vertically if small content
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)", // slightly translucent
    borderRadius: 20,
    padding: 25,
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(123, 44, 191, 0.9)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ddd",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "#eee",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#7B2CBF",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#7B2CBF",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  backButton: {
    backgroundColor: "#9C4DCC",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  displayContainer: {
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    padding: 15,
  },
  displayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  displayText: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 4,
  },
});
