//
//  WebAppView.swift
//  Jobsync
//
//  Created by Eric Horodyski on 1/3/24.
//

import SwiftUI
import IonicPortals

struct WebAppView: View {
    @EnvironmentObject var credentialsManager: CredentialsManager
    @Environment(\.dismiss) var dismiss
    let metadata: WebAppMetadata
    
    var body: some View {
        PortalView(
            portal: .init(
                name: metadata.name,
                startDir: "portals/\(metadata.name)",
                initialContext: credentialsManager.credentials!.toJSObject()
            )
            .adding(AnalyticsPlugin())
        )
        .ignoresSafeArea()
        .navigationBarBackButtonHidden()
        .task {
            let stream = PortalsPubSub.subscribe(to: "navigate:back")
            for await _ in stream {
                self.dismiss()
            }
        }
    }
}

#Preview {
    WebAppView(metadata: WebApps.metadata[0])
        .environmentObject(CredentialsManager.preview)
}
