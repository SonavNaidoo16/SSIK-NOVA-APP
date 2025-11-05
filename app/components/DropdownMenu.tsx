import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DropdownMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/home" },
    { label: "About Us", path: "/about" },
    { label: "Courses", path: "/courses" },
    { label: "Course Plan", path: "/courseplan" },
    { label: "Payment", path: "/checkout" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavigate = (path: string) => {
    router.push(path as any);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.menuButtonText}>☰ Menu</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.path)}
            >
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 100,
  },
  menuButton: {
    backgroundColor: "#7B2CBF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  menuButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    borderRadius: 10,
    padding: 10,
    minWidth: 200,
    borderWidth: 1,
    borderColor: "#7B2CBF",
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  menuItemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

