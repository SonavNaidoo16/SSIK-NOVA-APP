import { useRouter } from "expo-router";
import DropdownMenu from "./components/DropdownMenu";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
const SIX_MONTH_COURSES = [
  { id: "first-aid", title: "First Aid", fee: 1500 },
  { id: "sewing", title: "Sewing", fee: 1500 },
  { id: "landscaping", title: "Landscaping", fee: 1500 },
  { id: "life-skills", title: "Life Skills", fee: 1500 },
];

const SIX_WEEK_COURSES = [
  { id: "child-minding", title: "Child Minding", fee: 750 },
  { id: "cooking", title: "Cooking", fee: 750 },
  { id: "garden-maintenance", title: "Garden Maintenance", fee: 750 },
];

export default function CoursesScreen() {
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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Summary of Six-Month Courses</Text>
        <Text style={styles.subtitle}>
          These courses run over 12 weeks. Click on any course to view details.
        </Text>

        {/* Summary of Six-Month Courses */}
        <View style={styles.summaryCard}>
          {SIX_MONTH_COURSES.map((course) => (
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
                </View>

        <Text style={styles.header}>Summary of Six-Week Courses</Text>
        <Text style={styles.subtitle}>
          These short courses run over 6 weeks. Click on any course to view details.
        </Text>

        {/* Summary of Six-Week Courses */}
        <View style={styles.summaryCard}>
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
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back to Home</Text>
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
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
    textShadowColor: "rgba(123,44,191,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#bbb",
  },
  summaryCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: "100%",
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
  },
  courseCard: {
    backgroundColor: "rgba(123, 44, 191, 0.15)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 4,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#fff",
  },
  courseFee: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 4,
  },
  courseLink: {
    fontSize: 14,
    color: "#CFAAFF",
    fontWeight: "600",
    marginTop: 4,
  },
  backButton: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  backText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
