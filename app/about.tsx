import { useRouter } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropdownMenu from "./components/DropdownMenu";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }} // cosmic background
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Dropdown Menu */}
      <View style={styles.menuContainer}>
        <DropdownMenu />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* About Us */}
        <View style={styles.card}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.text}>
            Empowering the Nation was established by Precious Radebe in 2022 in Johannesburg, South Africa. 
            The organization is dedicated to making a positive impact on the lives of individuals and communities 
            through various initiatives and programs.
            Hundreds of domestic workers and gardeners have been trained on both the six-month long Leamerships and six-week Short Skills Training Programmes to empower themselves and can provide more marketable skills.
          </Text>
        </View>

        {/* Our Mission */}
        <View style={styles.card}>
          <Text style={styles.title}>Our Mission</Text>
          <Text style={styles.text}>
            Empowering the Nation is committed to fostering empowerment, education, and sustainable development.
            The organization aims to provide resources, support, and opportunities to underserved populations, 
            enabling them to overcome challenges and achieve their full potential.
          </Text>
        </View>

        {/* Our Vision */}
        <View style={styles.card}>
          <Text style={styles.title}>Our Vision</Text>
          <Text style={styles.text}>
            Our vision is to create a world where every individual has access to the tools and opportunities they need to thrive.
            We envision a future where communities are self-sufficient, resilient, and capable of driving positive change from within.
          </Text>
        </View>

        {/* Our Services */}
        <View style={styles.card}>
          <Text style={styles.title}>Our Services</Text>
          <View style={styles.list}>
            <Text style={styles.bullet}>• Consulting — Providing expert advice and strategies to help businesses grow and succeed.</Text>
            <Text style={styles.bullet}>• Training & Development — Offering workshops and training sessions to enhance skills and knowledge.</Text>
            <Text style={styles.bullet}>• Community Outreach — Engaging with local communities to support development and empowerment initiatives.</Text>
            <Text style={styles.bullet}>• Project Management — Assisting in the planning, execution, and completion of various projects.</Text>
          </View>
          <Text style={styles.text}>
            We are committed to delivering high-quality services that create value and drive positive outcomes 
            for our clients and communities.
          </Text>
        </View>

        {/* 🔙 Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}>
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
    backgroundColor: "rgba(0,0,0,0.7)",
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
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textShadowColor: "rgba(123, 44, 191, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 12,
    marginBottom: 4,
    textShadowColor: "rgba(123, 44, 191, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ddd",
  },
  list: {
    marginLeft: 10,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 6,
    color: "#ccc",
    marginLeft: 10,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 30,
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  backButtonText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
