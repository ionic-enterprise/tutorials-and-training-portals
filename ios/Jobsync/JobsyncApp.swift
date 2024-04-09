//
//  JobsyncApp.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/5/23.
//

import SwiftUI
import IonicPortals

@main
struct JobsyncApp: App {
    init() {
        PortalsRegistrationManager.shared.register(key: "YOUR_KEY_HERE")
    }
    
    var body: some Scene {
        WindowGroup {
          ContentView()
        }
    }
}
