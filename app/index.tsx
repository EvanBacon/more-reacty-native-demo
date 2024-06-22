import { Text } from "react-native";

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
    <div
      style={{
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "red",
        }}
      >
        <Text>Hey</Text>
      </div>

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
          console.log("Touch");
        }}
      />
    </div>
  );
}
