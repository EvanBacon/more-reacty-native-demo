import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View, ViewProps } from "@/components/Themed";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "map-view": ViewProps & { zoomEnabled?: boolean };
    }
  }
}

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Text
        onPress={() => {
          console.log(">Calendar", native.calendar);
          native.calendar.createEvent();
        }}
        style={styles.title}
      >
        Create Event
      </Text>
      <map-view
        style={{ flex: 1 }}
        zoomEnabled={false}
        onTouchStart={() => {
          console.log("Hey");
        }}
      />
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
