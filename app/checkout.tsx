import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

const ALL_COURSES: Course[] = [
  { id: "first-aid", title: "First Aid", fee: 1500, duration: "6 months" },
  { id: "sewing", title: "Sewing", fee: 1500, duration: "6 months" },
  { id: "landscaping", title: "Landscaping", fee: 1500, duration: "6 months" },
  { id: "life-skills", title: "Life Skills", fee: 1500, duration: "6 months" },
  { id: "child-minding", title: "Child Minding", fee: 750, duration: "6 weeks" },
  { id: "cooking", title: "Cooking", fee: 750, duration: "6 weeks" },
  { id: "garden-maintenance", title: "Garden Maintenance", fee: 750, duration: "6 weeks" },
];

function getDiscountRate(count: number): number {
  if (count <= 1) return 0;
  if (count === 2) return 0.05; // 5%
  if (count === 3) return 0.1;  // 10%
  return 0.15; // 15% for 4+
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export default function CheckoutScreen() {
  const { selected } = useLocalSearchParams();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCourses, _setSelectedCourses] = useState<string[]>(() => {
    // Initialize with courses from navigation params if available
    if (selected) {
      try {
        const courses: Course[] = JSON.parse(selected as string);
        return courses.map(c => c.id);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const validateForm = (): boolean => {
    const newErrors: { name?: string; phone?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const selectedCourseData = ALL_COURSES.filter((c) =>
    selectedCourses.includes(c.id)
  );

  const subtotal = selectedCourseData.reduce((sum, c) => sum + c.fee, 0);
  const discountRate = getDiscountRate(selectedCourses.length);
  const discount = subtotal * discountRate;
  const afterDiscount = subtotal - discount;
  const vat = afterDiscount * 0.15; // 15% VAT
  const total = afterDiscount + vat;


  const handlePayment = () => {
    if (!cardName || !cardNumber || !expiry || !cvv) {
      Alert.alert("Error", "Please fill in all card details.");
      return;
    }

    if (!validateForm()) {
      Alert.alert("Error", "Please fill in all contact details correctly.");
      return;
    }

    Alert.alert("Success", `Payment of R${total.toFixed(2)} confirmed!`);
    router.replace("/home");
  };

  if (showPayment) {
    // Payment Screen
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

        <ScrollView contentContainerStyle={styles.paymentContainer}>
          <Text style={styles.header}>Payment Details</Text>
          <Text style={styles.total}>Total: R{total.toFixed(2)}</Text>

          {/* Contact Details Form */}
          <View style={styles.paymentFormCard}>
            <Text style={styles.sectionTitle}>Contact Details</Text>

            <Text style={styles.label}>Name </Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Phone Number </Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <Text style={styles.label}>Email Address </Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Card Details Form */}
          <View style={styles.paymentFormCard}>
            <Text style={styles.sectionTitle}>Card Details</Text>

            <Text style={styles.label}>Name on Card </Text>
            <TextInput
              style={styles.input}
              placeholder="Name on Card"
              placeholderTextColor="#999"
              value={cardName}
              onChangeText={setCardName}
            />

            <Text style={styles.label}>Card Number </Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={16}
            />

            <Text style={styles.label}>Expiry Date (MM/YY) </Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor="#999"
              value={expiry}
              onChangeText={setExpiry}
            />

            <Text style={styles.label}>CVV </Text>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              placeholderTextColor="#999"
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
              maxLength={3}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Confirm Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowPayment(false)}
          >
            <Text style={styles.backText}>Back to Checkout</Text>
          </TouchableOpacity>
        </ScrollView>
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
        <Text style={styles.title}>Calculate Total Fees</Text>
        <Text style={styles.subtitle}>
          Review your selected courses and quote
        </Text>

        {/* Selected Courses Display */}
        {selectedCourseData.length > 0 ? (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Selected Courses</Text>
            {selectedCourseData.map((course) => (
              <View key={course.id} style={styles.selectedCourseRow}>
                <View style={styles.selectedCourseInfo}>
                  <Text style={styles.selectedCourseName}>{course.title}</Text>
                  <Text style={styles.selectedCourseDuration}>{course.duration}</Text>
                </View>
                <Text style={styles.selectedCourseFee}>R{course.fee}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>No Courses Selected</Text>
            <Text style={styles.noCoursesText}>
              Please go back to the courses page to select courses.
            </Text>
          </View>
        )}

        {/* Total Display - Always shown when courses are selected */}
        {selectedCourseData.length > 0 && (
          <View style={styles.totalCard}>
            <Text style={styles.totalTitle}>Quote Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>R{subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Discount ({Math.round(discountRate * 100)}%):
              </Text>
              <Text style={[styles.summaryValue, styles.discountText]}>
                -R{discount.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>After Discount:</Text>
              <Text style={styles.summaryValue}>R{afterDiscount.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>VAT (15%):</Text>
              <Text style={styles.summaryValue}>R{vat.toFixed(2)}</Text>
            </View>

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowPayment(true)}
            >
              <Text style={styles.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        )}

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
    justifyContent: "center",
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
    paddingBottom: 40,
  },
  paymentContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
    paddingBottom: 40,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    margin: 10,
  },
  paymentFormCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
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
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
    color: "#bbb",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f5f5f5",
    textAlign: "center",
    marginBottom: 25,
  },
  formCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#eee",
    marginTop: 12,
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
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
  },
  selectedCourseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(123, 44, 191, 0.15)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  selectedCourseInfo: {
    flex: 1,
  },
  selectedCourseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  selectedCourseDuration: {
    fontSize: 12,
    color: "#bbb",
  },
  selectedCourseFee: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D0A3FF",
  },
  noCoursesText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginTop: 10,
  },
  totalCard: {
    backgroundColor: "rgba(123, 44, 191, 0.2)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#7B2CBF",
  },
  totalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#ddd",
  },
  summaryValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  discountText: {
    color: "#4ade80",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.3)",
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#D0A3FF",
  },
  total: {
    color: "#7B2CBF",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  note: {
    fontSize: 12,
    color: "#bbb",
    marginTop: 10,
    fontStyle: "italic",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#7B2CBF",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
  },
  backText: {
    color: "#B794F4",
    fontSize: 16,
    fontWeight: "600",
  },
  backButtonText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});