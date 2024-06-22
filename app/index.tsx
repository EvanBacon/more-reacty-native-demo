export default function Home() {
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
        onTouchStart={async () => {
          alert(
            JSON.stringify(
              await fetch("/api/hello").then((res) => res.json()),
              null,
              2
            )
          );
        }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "red",
        }}
      >
        <p>Hey</p>
      </div>

      {process.env.EXPO_OS === "ios" && (
        <>
          <picker />

          <map-view
            style={{ flex: 1 }}
            zoomEnabled={false}
            onTouchStart={() => {
              console.log("Touch");
            }}
          />
        </>
      )}
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /** MKMapView */
      "map-view": import("react-native").ViewProps & { zoomEnabled?: boolean };
      /** SwiftUI Picker */
      picker: unknown;
    }
  }
}
