import { useRouter } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropdownMenu from "./components/DropdownMenu";

const SIX_WEEK_COURSES = [
  { id: "child-minding", title: "Child Minding", fee: 750 },
  { id: "cooking", title: "Cooking", fee: 750 },
  { id: "garden-maintenance", title: "Garden Maintenance", fee: 750 },
];

export default function SixWeekSummaryScreen() {
  const router = useRouter();

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
        <Text style={styles.title}>Summary of Six-Week Courses</Text>
        <Text style={styles.subtitle}>
          These short courses run over 6 weeks. Click on any course to view details.
        </Text>

        {SIX_WEEK_COURSES.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() => router.push(`/course/${course.id}` as any)}
          >
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseFee}>Fee: R{course.fee}</Text>
            <Text style={styles.courseLink}>Tap to view details →</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
    textShadowColor: "rgba(123, 44, 191, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#bbb",
  },
  courseCard: {
    backgroundColor: "rgba(123, 44, 191, 0.15)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 4,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: "#fff",
  },
  courseFee: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 5,
  },
  courseLink: {
    fontSize: 14,
    color: "#D0A3FF",
    fontWeight: "600",
    marginTop: 5,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 30,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

