import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import DropdownMenu from "./components/DropdownMenu";

type Venue = {
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  coordinates: string;
};

const VENUES: Venue[] = [
  {
    name: "Sandton Training Centre",
    address: "123 Rivonia Road, Sandton, Johannesburg, 2196",
    phone: "+27 11 234 5678",
    email: "sandton@empoweringnation.org",
    mapUrl: "https://maps.google.com/?q=-26.1076,28.0567",
    coordinates: "-26.1076, 28.0567",
  },
  {
    name: "Soweto Training Centre",
    address: "456 Vilakazi Street, Orlando West, Soweto, Johannesburg, 1804",
    phone: "+27 11 345 6789",
    email: "soweto@empoweringnation.org",
    mapUrl: "https://maps.google.com/?q=-26.2485,27.9090",
    coordinates: "-26.2485, 27.9090",
  },
  {
    name: "Randburg Training Centre",
    address: "789 Republic Road, Randburg, Johannesburg, 2194",
    phone: "+27 11 456 7890",
    email: "randburg@empoweringnation.org",
    mapUrl: "https://maps.google.com/?q=-26.0965,28.0132",
    coordinates: "-26.0965, 28.0132",
  },
];

export default function ContactScreen() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<null | { name: string; message: string }>(null);
  const router = useRouter();

  const openMap = (mapUrl: string) => {
    Linking.openURL(mapUrl).catch((err) => console.error("Failed to open map:", err));
  };

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

      {/* Dropdown Menu */}
      <View style={styles.menuContainer}>
        <DropdownMenu />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Send us a message or find our venues below</Text>

        {/* Contact Form Section FIRST */}
        <View style={styles.formCard}>
          <Text style={styles.sectionHeader}>Get in Touch</Text>

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

          {submittedData && (
            <View style={styles.displayContainer}>
              <Text style={styles.displayTitle}>Your Submitted Details:</Text>
              <Text style={styles.displayText}>Name: {submittedData.name}</Text>
              <Text style={styles.displayText}>Message: {submittedData.message}</Text>
            </View>
          )}
        </View>

        {/* Venue Info Section SECOND */}
        <Text style={[styles.sectionHeader, { marginTop: 30 }]}>Our Venues</Text>
        <Text style={styles.subtitle}>Find our training centres across Johannesburg</Text>

        {VENUES.map((venue, index) => (
          <View key={index} style={styles.venueCard}>
            <Text style={styles.venueName}>{venue.name}</Text>

            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}> Address:</Text>
              <Text style={styles.contactValue}>{venue.address}</Text>
            </View>

            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}> Phone:</Text>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${venue.phone}`)}>
                <Text style={styles.contactLink}>{venue.phone}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}> Email:</Text>
              <TouchableOpacity onPress={() => Linking.openURL(`mailto:${venue.email}`)}>
                <Text style={styles.contactLink}>{venue.email}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.mapButton} onPress={() => openMap(venue.mapUrl)}>
              <Text style={styles.mapButtonText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  menuContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 100,
  },
  container: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(123, 44, 191, 0.9)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  formCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
    marginTop: 10,
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
  venueCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(123, 44, 191, 0.3)",
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  venueName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
  },
  contactRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ddd",
    marginRight: 8,
    minWidth: 80,
  },
  contactValue: {
    fontSize: 16,
    color: "#eee",
    flex: 1,
  },
  contactLink: {
    fontSize: 16,
    color: "#D0A3FF",
    textDecorationLine: "underline",
  },
  mapButton: {
    backgroundColor: "#7B2CBF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 15,
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
