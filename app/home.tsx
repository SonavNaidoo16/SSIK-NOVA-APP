import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams()
  const name = params.name || "user";

  const handleLogout = () => {
    router.replace("/"); // goes back to index.tsx
  };

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Empowering The Nation</Text>
        <Text style={styles.subtitle}>Welcome, {name}</Text>
        <Text style={styles.subtitle}>Choose a course or option below</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.navigate("/courses?courseId=first-aid")}
        >
          <Text style={styles.cardTitle}>Courses</Text>
          <Text style={styles.cardText}>
            Learn essential skills for emergencies.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.navigate("/courseplan")}
        >
          <Text style={styles.cardTitle}>Course Plan</Text>
          <Text style={styles.cardText}>
            choose between either a six week course or six month course.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.navigate("/about")}
        >
          <Text style={styles.cardTitle}>About Us</Text>
          <Text style={styles.cardText}>
            Learn more about Empowering the Nation.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.navigate("/contact")}
        >
          <Text style={styles.cardTitle}>Contact Us</Text>
          <Text style={styles.cardText}>
            Reach out for more info or assistance.
          </Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Developed by S.S.I.K Nova</Text>
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
  container: {
    padding: 20,
    alignItems: "center",
    paddingTop: 80, // space for logout button
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#bbb",
  },
  card: {
    backgroundColor: "rgba(123, 44, 191, 0.15)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: "100%",
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#fff",
  },
  cardText: {
    fontSize: 14,
    color: "#ccc",
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#7B2CBF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});