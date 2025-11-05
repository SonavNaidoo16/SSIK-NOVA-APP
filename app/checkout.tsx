import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
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

type Course = {
  id: string;
  title: string;
  fee: number;
  duration?: string;
};

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const parsedSelected: Course[] = useMemo(() => {
    try {
      if (typeof params.selected === "string") {
        return JSON.parse(params.selected) as Course[];
      }
      return [];
    } catch (e) {
      return [];
    }
  }, [params.selected]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = useMemo(
    () => parsedSelected.reduce((sum, c) => sum + (c.fee || 0), 0),
    [parsedSelected]
  );

  // Simple discount rule: 10% off when selecting 3 or more courses
  const discountRate = parsedSelected.length >= 3 ? 0.1 : 0;
  const discount = Math.round(subtotal * discountRate);
  const total = subtotal - discount;

  const handleSubmit = () => {
    if (!fullName || !email || !phone) {
      Alert.alert("Missing details", "Please complete all contact fields.");
      return;
    }
    Alert.alert(
      "Request received",
      "A consultant will contact you shortly to assist with your booking."
    );
    router.replace("/home");
  };

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Your Invoice</Text>
        {parsedSelected.length === 0 ? (
          <Text style={styles.empty}>No courses selected.</Text>
        ) : (
          <View style={styles.card}>
            {parsedSelected.map((c) => (
              <View key={c.id} style={styles.row}>
                <Text style={styles.rowTitle}>{c.title}</Text>
                <Text style={styles.rowValue}>R{c.fee}</Text>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.rowTitle}>Subtotal</Text>
              <Text style={styles.rowValue}>R{subtotal}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Discount</Text>
              <Text style={styles.rowValue}>- R{discount}</Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalTitle}>Total</Text>
              <Text style={styles.totalValue}>R{total}</Text>
            </View>
            <Text style={styles.note}>
              Discount policy: 10% off when you select 3 or more courses.
            </Text>
          </View>
        )}

        <Text style={styles.header}>Request a Consultant</Text>
        <View style={styles.card}>
          <TextInput
            placeholder="Full name"
            placeholderTextColor="#bbb"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#bbb"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#bbb"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <TextInput
            placeholder="Notes (optional)"
            placeholderTextColor="#bbb"
            value={notes}
            onChangeText={setNotes}
            style={[styles.input, styles.multiline]}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Verify & Request Consultant</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
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
  container: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 12,
    textShadowColor: "rgba(123,44,191,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  empty: {
    color: "#eee",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  rowTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  rowValue: {
    color: "#eee",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 10,
  },
  totalRow: {
    paddingTop: 10,
  },
  totalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  totalValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  note: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 8,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  multiline: {
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#7B2CBF",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 6,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    alignSelf: "center",
    marginTop: 6,
  },
  backText: {
    color: "#CFAAFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
