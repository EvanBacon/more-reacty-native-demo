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

// SwiftUI view available via <picker />
@ReactView(jsName: "picker")
class NativePicker: RCTViewManager {

  override func view() -> UIView {
    HostingView(content: {
      Picker("Picker", selection: .constant(0)) {
        Text("Option 1").tag(0)
        Text("Option 2").tag(1)
        Text("Option 3").tag(2)
      }
    })
  }
}

// Map View available via <map-view />
@ReactView(jsName: "map-view")
class MapView: RCTViewManager {

  @ReactProperty
  var zoomEnabled: Bool?

  override func view() -> UIView {
    MKMapView()
  }
}


@ReactView(jsName: "div")
class NativeView: RCTViewManager {

  override func view() -> UIView {
    RCTView()
  }
}

import SwiftUI
import UIKit

public final class HostingView: RCTView {
  public init(@ViewBuilder content: () -> some View) {
    super.init(frame: .zero)
    
    if #available(iOS 16.0, *) {
      let contentView = UIHostingConfiguration(content: content)
        .margins(.all, 0)
        .makeContentView()
      contentView.translatesAutoresizingMaskIntoConstraints = false
      addSubview(contentView)
      NSLayoutConstraint.activate([
        contentView.topAnchor.constraint(equalTo: topAnchor),
        contentView.leadingAnchor.constraint(equalTo: leadingAnchor),
        contentView.trailingAnchor.constraint(equalTo: trailingAnchor),
        contentView.bottomAnchor.constraint(equalTo: bottomAnchor)
      ])
    } else {
      
      // Fallback on earlier versions
    }
    
    
  }
  
  @available(*, unavailable)
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
