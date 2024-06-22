declare global {
  namespace JSX {
    interface IntrinsicElements {
      picker: unknown;
      /** MKMapView */
      "map-view": import("react-native").ViewProps & { zoomEnabled?: boolean };

      // p: import("react-native").TextProps;
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
        <p>Hey</p>
      </div>

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
