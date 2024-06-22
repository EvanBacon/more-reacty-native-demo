import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

declare var native: typeof import("react-native").NativeModules;
if (typeof native === "undefined") {
  // @ts-expect-error
  globalThis.native = new Proxy(
    {},
    {
      get(target, prop) {
        const NativeModules = require("react-native").NativeModules;
        if (prop in NativeModules) {
          return NativeModules[prop];
        }
      },
    }
  );
}

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
