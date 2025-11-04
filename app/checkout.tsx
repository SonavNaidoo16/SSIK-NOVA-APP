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
  const [selectedCourses, setSelectedCourses] = useState<string[]>(() => {
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
  const [showTotal, setShowTotal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const toggleCourse = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
    setShowTotal(false);
  };

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

  const calculateTotal = () => {
    if (selectedCourses.length === 0) {
      Alert.alert("Error", "Please select at least one course.");
      return;
    }

    if (!validateForm()) {
      Alert.alert("Error", "Please fill in all contact details correctly.");
      return;
    }

    setShowTotal(true);
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

  const handleRequestConsultant = () => {
    if (selectedCourses.length === 0) {
      Alert.alert("Error", "Please select at least one course.");
      return;
    }

    if (!validateForm()) {
      Alert.alert("Error", "Please fill in all contact details correctly.");
      return;
    }

    Alert.alert(
      "Request Submitted",
      `Thank you ${name}! A consultant will contact you soon at ${email} or ${phone}.`
    );
    
    // Reset form
    setName("");
    setPhone("");
    setEmail("");
    setSelectedCourses([]);
    setShowTotal(false);
  };

  const handlePayment = () => {
    if (!cardName || !cardNumber || !expiry || !cvv) {
      Alert.alert("Error", "Please fill in all card details.");
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

          <TextInput
            style={styles.input}
            placeholder="Name on Card"
            placeholderTextColor="#ccc"
            value={cardName}
            onChangeText={setCardName}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            maxLength={16}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            placeholderTextColor="#ccc"
            value={expiry}
            onChangeText={setExpiry}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
            maxLength={3}
          />

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
          Enter your contact details and select courses to get a quote
        </Text>

        {/* Contact Form */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Contact Details</Text>

          <Text style={styles.label}>Name *</Text>
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

          <Text style={styles.label}>Phone Number *</Text>
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

          <Text style={styles.label}>Email Address *</Text>
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

        {/* Course Selection */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Select Courses</Text>
          <Text style={styles.subtitle}>Select one or more courses (discounts apply)</Text>

          {ALL_COURSES.map((course) => {
            const isSelected = selectedCourses.includes(course.id);
            return (
              <TouchableOpacity
                key={course.id}
                style={[
                  styles.courseRow,
                  isSelected && styles.courseRowSelected,
                ]}
                onPress={() => toggleCourse(course.id)}
              >
                <View style={styles.checkboxContainer}>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{course.title}</Text>
                    <Text style={styles.courseDuration}>{course.duration}</Text>
                  </View>
                  <Text style={styles.courseFee}>R{course.fee}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Calculator Button */}
        <TouchableOpacity style={styles.calculatorButton} onPress={calculateTotal}>
          <Text style={styles.calculatorButtonText}>Calculate Total</Text>
        </TouchableOpacity>

        {/* Total Display */}
        {showTotal && selectedCourseData.length > 0 && (
          <View style={styles.totalCard}>
            <Text style={styles.totalTitle}>Quote Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>R{subtotal.toFixed(2)}</Text>
            </View>

            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Discount ({Math.round(discountRate * 100)}%):
                </Text>
                <Text style={[styles.summaryValue, styles.discountText]}>
                  -R{discount.toFixed(2)}
                </Text>
              </View>
            )}

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

            <Text style={styles.note}>
              * This is a quote, not a formal invoice
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowPayment(true)}
            >
              <Text style={styles.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Request Consultant Button */}
        <TouchableOpacity
          style={styles.consultantButton}
          onPress={handleRequestConsultant}
        >
          <Text style={styles.consultantButtonText}>
            Request Consultant to Contact Me
          </Text>
        </TouchableOpacity>

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
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    margin: 10,
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
  courseRow: {
    backgroundColor: "rgba(123, 44, 191, 0.1)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  courseRowSelected: {
    backgroundColor: "rgba(123, 44, 191, 0.3)",
    borderColor: "#7B2CBF",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#7B2CBF",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#7B2CBF",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  courseDuration: {
    fontSize: 12,
    color: "#bbb",
  },
  courseFee: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D0A3FF",
  },
  calculatorButton: {
    backgroundColor: "#7B2CBF",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
  },
  calculatorButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
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
  consultantButton: {
    backgroundColor: "#9C4DCC",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  consultantButtonText: {
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
