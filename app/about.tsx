import { useRouter } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }} // cosmic background
      style={styles.background}
    >
      <View style={styles.overlay} />

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

        {/* Courses */}
        <View style={styles.card}>
          <Text style={styles.title}>Courses</Text>

          {/* First Aid */}
          <Text style={styles.subtitle}>First Aid</Text>
          <Text style={styles.text}>Fee: R1500</Text>
          <Text style={styles.text}>Why take it: Learn how to handle emergencies and give basic life support.</Text>
          <Text style={styles.bullet}>• How to treat wounds and bleeding</Text>
          <Text style={styles.bullet}>• Burns and fractures care</Text>
          <Text style={styles.bullet}>• Managing emergency scenes</Text>
          <Text style={styles.bullet}>• CPR (Cardio-Pulmonary Resuscitation)</Text>
          <Text style={styles.bullet}>• Helping someone with choking or blocked airways</Text>

          {/* Sewing */}
          <Text style={styles.subtitle}>Sewing</Text>
          <Text style={styles.text}>Fee: R1500</Text>
          <Text style={styles.text}>Why take it: Learn to tailor, alter, and create your own garments.</Text>
          <Text style={styles.bullet}>• Types of stitches</Text>
          <Text style={styles.bullet}>• How to thread and use a sewing machine</Text>
          <Text style={styles.bullet}>• Sewing buttons, zips, hems, and seams</Text>
          <Text style={styles.bullet}>• Alterations and adjustments</Text>
          <Text style={styles.bullet}>• Designing and making new clothes</Text>

          {/* Landscaping */}
          <Text style={styles.subtitle}>Landscaping</Text>
          <Text style={styles.text}>Fee: R1500</Text>
          <Text style={styles.text}>Why take it: Make your garden look amazing!</Text>
          <Text style={styles.bullet}>• Working with indigenous and exotic plants and trees</Text>
          <Text style={styles.bullet}>• Installing fountains, statues, benches, tables, and built-in braais</Text>
          <Text style={styles.bullet}>• Balancing plants and trees in your garden</Text>
          <Text style={styles.bullet}>• Planning garden layouts</Text>

          {/* Life Skills */}
          <Text style={styles.subtitle}>Life Skills</Text>
          <Text style={styles.text}>Fee: R1500</Text>
          <Text style={styles.text}>Why take it: Learn practical skills for everyday life.</Text>
          <Text style={styles.bullet}>• Opening a bank account</Text>
          <Text style={styles.bullet}>• Your rights at work (basic labour law)</Text>
          <Text style={styles.bullet}>• Reading and writing basics</Text>
          <Text style={styles.bullet}>• Basic math skills</Text>

          {/* Child Minding */}
          <Text style={styles.subtitle}>Child Minding</Text>
          <Text style={styles.text}>Fee: R750</Text>
          <Text style={styles.text}>Why take it: Take care of babies and toddlers safely.</Text>
          <Text style={styles.bullet}>• Caring for babies from birth to 1 year</Text>
          <Text style={styles.bullet}>• Toddler care</Text>
          <Text style={styles.bullet}>• Educational toys and activities</Text>

          {/* Cooking */}
          <Text style={styles.subtitle}>Cooking</Text>
          <Text style={styles.text}>Fee: R750</Text>
          <Text style={styles.text}>Why take it: Cook tasty and healthy meals for your family.</Text>
          <Text style={styles.bullet}>• Nutrition basics</Text>
          <Text style={styles.bullet}>• Proteins, carbs, and veggies</Text>
          <Text style={styles.bullet}>• Meal planning</Text>
          <Text style={styles.bullet}>• Healthy and delicious recipes</Text>
          <Text style={styles.bullet}>• Cooking techniques</Text>

          {/* Garden Maintenance */}
          <Text style={styles.subtitle}>Garden Maintenance</Text>
          <Text style={styles.text}>Fee: R750</Text>
          <Text style={styles.text}>Why take it: Keep your garden healthy and beautiful.</Text>
          <Text style={styles.bullet}>• Watering tips for different plants</Text>
          <Text style={styles.bullet}>• Pruning and propagation</Text>
          <Text style={styles.bullet}>• Planting techniques</Text>
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
  container: {
    padding: 20,
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
