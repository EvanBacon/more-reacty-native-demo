//
//  native-module.swift
//  jun21
//
//  Created by Evan Bacon on 6/22/24.
//

import Foundation
import React
import ReactBridge
import MapKit

@ReactModule
class CalendarModule: NSObject, RCTBridgeModule {
  
  @ReactMethod
  @objc func createEvent(title: String, location: String) {
    print("Create event '\(title)' at '\(location)'")
  }
}

@ReactView(jsName: "mapview")
class MapView: RCTViewManager {

  @ReactProperty
  var zoomEnabled: Bool?

  override func view() -> UIView {
    MKMapView()
  }
}
