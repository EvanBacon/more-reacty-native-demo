# Swift Macros experiment

This is a simple experiment of using [ReactBridge](https://github.com/ikhvorost/ReactBridge) with Expo Router.

## Built-in Views

React Native needs to have less boilerplate ([opinion: built-in react views](https://x.com/baconbrix/status/1773800723383275952?s=46&t=4GpE_iEDNlOGqhX9K_d56A)). This experiment patches React Native to support using lowercase JSX views that are registered just in time.

```swift
// Map View available via <map-view />
@ReactView(jsName: "map-view")
class MapView: RCTViewManager {

  @ReactProperty
  var zoomEnabled: Bool?

  override func view() -> UIView {
    MKMapView()
  }
}
```

Which can be used in JS-land (notice: no imports are required). This is because the React babel plugin converts this code to `React.createElement("map-view", { zoomEnabled: true })` which is then passed to React Native.

```jsx
function App() {
  return <map-view zoomEnabled style={{ flex: 1 }} />;
}
```

This can be typed the same as views in `react-dom` or React Three Fiber:

```ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      /** MKMapView */
      "map-view": import("react-native").ViewProps & { zoomEnabled?: boolean };
    }
  }
}
```

---

To make this work, I patched `react-native/Libraries/Renderer/shims/ReactNativeViewConfigRegistry.js` to instantiate the view when it's missing:

```js
if (typeof name[0] === "string" && /[a-z]/.test(name[0])) {
  // Just-in-time register the native view for lowercase names to replicate the behavior of
  // react-dom.
  const createReactNativeComponentClass = require("./createReactNativeComponentClass");
  const getNativeComponentAttributes = require("../../ReactNative/getNativeComponentAttributes");

  // Essentially just `requireNativeComponent('...');`.
  createReactNativeComponentClass(name, () =>
    getNativeComponentAttributes(name)
  );
  callback = viewConfigCallbacks.get(name);
}
```

## Built-in APIs

In the browser, APIs are just installed on the JS global object, e.g. `navigator.geolocation`. This experiment patches React Native to work similarly by using the global `native` object, e.g. `native.geolocation` instead of importing `react-native` and using `NativeModules`.

```js
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
```

This makes web interop a bit nicer too because you can just do:

```js
if (typeof native !== "undefined") {
  native.geolocation.getCurrentPosition();
}
```

This can be typed like the browser (in the future this can be generated from parsing the Swift/Kotlin code):

```ts
declare global {
  interface Window {
    native: typeof import("react-native").NativeModules & {
      /** Custom native module */
      geolocation: {
        /** Get the current position. */
        getCurrentPosition: () => void;
      };
    };
  }
}
```

## Result

The result is a React Native that feels more like the web and requires substantially less boilerplate/bundling. Standard web projects start with only a handful of imports, but React Native has thousands (~1,945 [last I checked](https://x.com/baconbrix/status/1773800723383275952?s=46&t=4GpE_iEDNlOGqhX9K_d56A)). Even with the fastest bundler in the world, this will still require seconds to create the graph.

I've demonstrated here that you can still have types, doc blocks, and all the other benefits of React without the boilerplate of React Native.

Overall, this workflow lends itself better to jumping between JS and native code to expose new APIs or views. It's also easier to maintain because there are fewer bridging APIs to keep in sync. In the future, we should generate the TypeScript types and doc blocks from the Swift/Kotlin code, but that's a problem for another day.

## Web interop

Though it's not perfect, and possibly more confusing than helpful— I did play with adding a `div` view which just re-exports `RCTView`. Works like a View component but uses syntax that lends itself much better to use with a shared web codebase.
