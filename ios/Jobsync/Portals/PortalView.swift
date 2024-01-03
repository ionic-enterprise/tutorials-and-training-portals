//
//  PortalView.swift
//  Jobsync
//
//  Created by Eric Horodyski on 1/3/24.
//

import SwiftUI

struct PortalView: View {
    @EnvironmentObject var credentialsManager: CredentialsManager

    var body: some View {
        if let credentials = credentialsManager.credentials {
            Text(credentials.accessToken)
        } else {
            Text("There are no credentials")
        }
    }
}

#Preview {
    let credentialsManager = CredentialsManager(http: NetworkManager())
    let credentials = Credentials(
        accessToken: "8f633ea6-de27-4110-96cf-bc10fa3a0b86",
        refreshToken: "da5ca0ea-5831-4373-a298-879dfa5a6fcb"
    )
    credentialsManager.credentials = credentials
    
   return PortalView()
        .environmentObject(credentialsManager)
}
