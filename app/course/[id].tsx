import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropdownMenu from "../components/DropdownMenu";

const COURSE_DETAILS: Record<string, {
  title: string;
  fee: number;
  purpose: string;
  content: string[];
  duration: string;
}> = {
  "first-aid": {
    title: "First Aid",
    fee: 1500,
    purpose: "To provide first aid awareness and basic life support.",
    content: [
      "Wounds and bleeding",
      "Burns and fractures",
      "Emergency scene management",
      "Cardio-Pulmonary Resuscitation (CPR)",
      "Respiratory distress e.g., Choking, blocked airway"
    ],
    duration: "6 months (12 weeks)"
  },
  "sewing": {
    title: "Sewing",
    fee: 1500,
    purpose: "To provide alterations and new garment tailoring services",
    content: [
      "Types of stitches",
      "Threading a sewing machine",
      "Sewing buttons, zips, hems and seams",
      "Alterations",
      "Designing and sewing new garments"
    ],
    duration: "6 months (12 weeks)"
  },
  "landscaping": {
    title: "Landscaping",
    fee: 1500,
    purpose: "To provide landscaping services for new and established gardens",
    content: [
      "Indigenous and exotic plants and trees",
      "Fixed structures (fountains, statues, benches, tables, built-in braai)",
      "Balancing of plants and trees in a garden",
      "Aesthetics of plant shapes and colours",
      "Garden layout"
    ],
    duration: "6 months (12 weeks)"
  },
  "life-skills": {
    title: "Life Skills",
    fee: 1500,
    purpose: "To provide skills to navigate basic life necessities",
    content: [
      "Opening a bank account",
      "Basic labour law (know your rights)",
      "Basic reading and writing literacy",
      "Basic numeric literacy"
    ],
    duration: "6 months (12 weeks)"
  },
  "child-minding": {
    title: "Child Minding",
    fee: 750,
    purpose: "To provide basic child and baby care",
    content: [
      "Birth to six-month old baby needs",
      "Seven-month to one year old needs",
      "Toddler needs",
      "Educational toys"
    ],
    duration: "6 weeks"
  },
  "cooking": {
    title: "Cooking",
    fee: 750,
    purpose: "To prepare and cook nutritious family meals",
    content: [
      "Nutritional requirements for a healthy body",
      "Types of protein, carbohydrates and vegetables",
      "Planning meals",
      "Tasty and nutritious recipes",
      "Preparation and cooking of meals"
    ],
    duration: "6 weeks"
  },
  "garden-maintenance": {
    title: "Garden Maintenance",
    fee: 750,
    purpose: "To provide basic knowledge of watering, pruning and planting in a domestic garden.",
    content: [
      "Water restrictions and the watering requirements of indigenous and exotic plants",
      "Pruning and propagation of plants",
      "Planting techniques for different plant types"
    ],
    duration: "6 weeks"
  }
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const course = COURSE_DETAILS[id || ""];

  if (!course) {
    return (
      <ImageBackground
        source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }}
        style={styles.background}
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Course Not Found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

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
        <Text style={styles.title}>{course.title}</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Duration:</Text>
          <Text style={styles.infoValue}>{course.duration}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Fee:</Text>
          <Text style={styles.infoValue}>R{course.fee}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Purpose</Text>
          <Text style={styles.sectionText}>{course.purpose}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Content</Text>
          {course.content.map((item, index) => (
            <Text key={index} style={styles.bulletPoint}>
              • {item}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#fff",
    textShadowColor: "rgba(123, 44, 191, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  infoCard: {
    backgroundColor: "rgba(123, 44, 191, 0.2)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D0A3FF",
  },
  sectionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
    textShadowColor: "rgba(123, 44, 191, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ddd",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ddd",
    marginLeft: 10,
    marginBottom: 6,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 30,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

