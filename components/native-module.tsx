import { requireNativeComponent } from "react-native";

export const MapView = requireNativeComponent("MapView");

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
