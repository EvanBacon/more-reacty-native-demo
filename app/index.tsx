import { Text, View } from "react-native";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      picker: unknown;
      /** MKMapView */
      "map-view": import("react-native").ViewProps & { zoomEnabled?: boolean };
    }
  }
}

export default function TabOneScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text
        onPress={() => {
          console.log(">Calendar", native.calendar);
          // native.calendar.createEvent();
        }}
      >
        Create Event
      </Text>
      <picker />
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
