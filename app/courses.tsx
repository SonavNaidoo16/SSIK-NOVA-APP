import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

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

      <View style={styles.container}>
        <Text style={styles.header}>Select Your Course</Text>

        <FlatList
          data={COURSES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = selected.some((c) => c.id === item.id);
            return (
              <TouchableOpacity
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
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

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
      </View>
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
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(123,44,191,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
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
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#7B2CBF",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
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
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  backText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
