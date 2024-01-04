//
//  WebApps.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/11/23.
//

import Foundation

struct WebAppMetadata: Hashable {
    var name: String
    var icon: String
    var description: String
        
    var displayName: String {
        self.name.replacingOccurrences(of: "-", with: " ").capitalized
    }
}

struct WebApps {
    static let metadata: [WebAppMetadata] = [
        WebAppMetadata(name: "expenses", icon: "dollarsign.arrow.circlepath", description: "Submit expenses for business related activities."),
        WebAppMetadata(name: "tasks", icon: "list.star", description: "Track tasks for transparent project updates."),
        WebAppMetadata(name: "time-tracking", icon: "person.crop.circle.badge.clock", description: "Stay on schedule by tracking time spent.")
    ]
}
