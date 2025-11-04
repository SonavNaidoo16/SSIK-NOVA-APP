import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DropdownMenu from "./components/DropdownMenu";

type Course = {
  id: string;
  title: string;
  fee: number;
  duration: string;
};

const COURSES: Course[] = [
  { id: "first-aid", title: "First Aid", fee: 1500, duration: "6 months" },
  { id: "sewing", title: "Sewing", fee: 1500, duration: "6 months" },
  { id: "landscaping", title: "Landscaping", fee: 1500, duration: "6 months" },
  { id: "life-skills", title: "Life Skills", fee: 1500, duration: "6 months" },
  { id: "child-minding", title: "Child Minding", fee: 750, duration: "6 weeks" },
  { id: "cooking", title: "Cooking", fee: 750, duration: "6 weeks" },
  { id: "garden-maintenance", title: "Garden Maintenance", fee: 750, duration: "6 weeks" },
];

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
  const [selected, setSelected] = useState<Course[]>([]);
  const router = useRouter();

  const toggleSelect = (course: Course) => {
    setSelected((prev) => {
      if (prev.find((c) => c.id === course.id)) {
        return prev.filter((c) => c.id !== course.id);
      }
      return [...prev, course];
    });
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

        <Text style={styles.header}>Select Your Course</Text>
        <Text style={styles.subtitle}>
          Select courses to add to your cart for checkout
        </Text>

        {/* Course Selection */}
        {COURSES.map((item) => {
          const isSelected = selected.some((c) => c.id === item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => toggleSelect(item)}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.duration} · R{item.fee}
              </Text>
              <Text style={[styles.check, isSelected && styles.checkSelected]}>
                {isSelected ? "Selected" : "Tap to add"}
              </Text>
            </TouchableOpacity>
          );
        })}

        {selected.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              router.push({
                pathname: "/checkout",
                params: { selected: JSON.stringify(selected) },
              })
            }
          >
            <Text style={styles.checkoutText}>
              Go to Checkout ({selected.length})
            </Text>
          </TouchableOpacity>
        )}

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}>
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
    paddingTop: 100,
    paddingBottom: 40,
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
    color: "#D0A3FF",
    fontWeight: "600",
    marginTop: 4,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  cardSelected: {
    backgroundColor: "rgba(123,44,191,0.2)",
    borderColor: "#9D4EDD",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  meta: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 4,
  },
  check: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#aaa",
  },
  checkSelected: {
    color: "#D0A3FF",
  },
  checkoutButton: {
    backgroundColor: "#7B2CBF",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  backText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
