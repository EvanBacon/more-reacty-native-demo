import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { MapView } from "@/components/native-module";

export default function TabOneScreen() {
  console.log(">Calendar", native.CalendarModule);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <MapView style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
