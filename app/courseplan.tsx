import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { useRouter } from "expo-router";

type Course = {
  id: string;
  title: string;
  fee: number;
  duration: string;
};

const SIX_MONTH_COURSES: Course[] = [
  { id: "first-aid", title: "First Aid", fee: 1500, duration: "6 months" },
  { id: "sewing", title: "Sewing", fee: 1500, duration: "6 months" },
  { id: "landscaping", title: "Landscaping", fee: 1500, duration: "6 months" },
  { id: "life-skills", title: "Life Skills", fee: 1500, duration: "6 months" },
];

const SIX_WEEK_COURSES: Course[] = [
  { id: "child-minding", title: "Child Minding", fee: 750, duration: "6 weeks" },
  { id: "cooking", title: "Cooking", fee: 750, duration: "6 weeks" },
  { id: "garden-maintenance", title: "Garden Maintenance", fee: 750, duration: "6 weeks" },
];

export default function CoursesScreen() {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const router = useRouter();

  const toggleGroup = (groupName: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName]
    );
  };

  const selectedCourses = [
    ...(selectedGroups.includes("6-month") ? SIX_MONTH_COURSES : []),
    ...(selectedGroups.includes("6-week") ? SIX_WEEK_COURSES : []),
  ];

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Select a Course Group</Text>

        {/* 6-Month Group */}
        <TouchableOpacity
          style={[
            styles.card,
            selectedGroups.includes("6-month") && styles.cardSelected,
          ]}
          onPress={() => toggleGroup("6-month")}
        >
          <Text style={styles.title}>Six-Month Courses</Text>
          <Text style={styles.meta}>
            Includes: Sewing, Landscaping, Life Skills, First Aid
          </Text>
          <Text style={styles.meta}>Duration: 6 Months · R1500 each</Text>
          <Text
            style={[
              styles.check,
              selectedGroups.includes("6-month") && styles.checkSelected,
            ]}
          >
            {selectedGroups.includes("6-month") ? "Selected" : "Tap to Add"}
          </Text>
        </TouchableOpacity>

        {/* 6-Week Group */}
        <TouchableOpacity
          style={[
            styles.card,
            selectedGroups.includes("6-week") && styles.cardSelected,
          ]}
          onPress={() => toggleGroup("6-week")}
        >
          <Text style={styles.title}>Six-Week Courses</Text>
          <Text style={styles.meta}>
            Includes: Child Minding, Cooking, Garden Maintenance
          </Text>
          <Text style={styles.meta}>Duration: 6 Weeks · R750 each</Text>
          <Text
            style={[
              styles.check,
              selectedGroups.includes("6-week") && styles.checkSelected,
            ]}
          >
            {selectedGroups.includes("6-week") ? "Selected" : "Tap to Add"}
          </Text>
        </TouchableOpacity>

        {/* Checkout Button */}
        {selectedCourses.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              router.push({
                pathname: "/checkout",
                params: { selected: JSON.stringify(selectedCourses) },
              })
            }
          >
            <Text style={styles.checkoutText}>
              Go to Checkout ({selectedCourses.length} Courses)
            </Text>
          </TouchableOpacity>
        )}

        {/* Back Button */}
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
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
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
    marginBottom: 25,
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
    backgroundColor: "#7B2CBF",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
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
    marginTop: 20,
    alignSelf: "center",
  },
  backText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
