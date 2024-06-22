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
import EventKitUI

@ReactModule
class calendar: NSObject, RCTBridgeModule {
  
  @ReactMethod
  @objc func createEvent() {
    // Create event
    let event = EKEvent(eventStore: EKEventStore())
    event.title = "My Event"
    event.startDate = Date()
    event.endDate = Date().addingTimeInterval(60 * 60)

// On main thread
    DispatchQueue.main.async {
      let rootViewController = UIApplication.shared.keyWindow?.rootViewController
      // Present event
      let controller = EKEventEditViewController()
      controller.event = event
      rootViewController?.present(controller, animated: true, completion: nil)
    }
  }
}

@ReactView(jsName: "map-view")
class MapView: RCTViewManager {

  @ReactProperty
  var zoomEnabled: Bool?

  override func view() -> UIView {
    MKMapView()
  }
}
