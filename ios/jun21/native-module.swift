//
//  native-module.swift
//  jun21
//
//  Created by Evan Bacon on 6/22/24.
//

import Foundation
import React
import ReactBridge

@ReactModule
class CalendarModule: NSObject, RCTBridgeModule {
  
  @ReactMethod
  @objc func createEvent(title: String, location: String) {
    print("Create event '\(title)' at '\(location)'")
  }
}
