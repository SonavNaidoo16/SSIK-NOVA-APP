import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type Course = {
  id: string;
  title: string;
  fee: number;
  duration: string;
};

function getDiscountRate(count: number): number {
  if (count <= 1) return 0;
  if (count === 2) return 0.05;
  if (count === 3) return 0.1;
  return 0.15;
}

export default function CheckoutScreen() {
  const { selected } = useLocalSearchParams();
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const courses: Course[] = selected ? JSON.parse(selected as string) : [];

  const subtotal = courses.reduce((sum, c) => sum + c.fee, 0);
  const discountRate = getDiscountRate(courses.length);
  const discount = Math.round(subtotal * discountRate);
  const total = subtotal - discount;

  const handlePayment = () => {
    if (!cardName || !cardNumber || !expiry || !cvv) {
      Alert.alert("Error", "Please fill in all card details.");
      return;
    }

    Alert.alert("Success", `Payment of R${total} confirmed!`);
    router.replace("/home");
  };

  if (!showPayment) {
    return (
      <ImageBackground
        source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.header}>Checkout</Text>

          <FlatList
            data={courses}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemText}>R{item.fee}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No courses selected.</Text>
            }
          />

          <View style={styles.summary}>
            <Text style={styles.text}>Subtotal: R{subtotal}</Text>
            <Text style={styles.text}>
              Discount ({Math.round(discountRate * 100)}%): -R{discount}
            </Text>
            <Text style={styles.total}>Total: R{total}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowPayment(true)}
          >
            <Text style={styles.buttonText}>Proceed to Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>Back to Courses</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // Payment Screen
  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.header}>Payment Details</Text>
        <Text style={styles.total}>Total: R{total}</Text>

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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    margin: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f5f5f5",
    textAlign: "center",
    marginBottom: 25,
  },
  text: { color: "#ddd", fontSize: 16, marginVertical: 4 },
  itemText: { color: "#eee", fontSize: 16 },
  total: {
    color: "#7B2CBF",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingVertical: 10,
  },
  summary: { marginTop: 20 },
  button: {
    backgroundColor: "#7B2CBF",
    padding: 14,
    borderRadius: 12,
    marginTop: 25,
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
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  backButton: { marginTop: 20, alignItems: "center" },
  backText: {
    color: "#B794F4",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },
});
