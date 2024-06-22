declare var native: typeof import("react-native").NativeModules;
if (typeof native === "undefined") {
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
