//
//  CredentialManager.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/13/23.
//

import Foundation

@MainActor class CredentialsManager: ObservableObject {
    @Published var credentials: Credentials? = nil
    @Published var status: RequestStatus = .success
    
    private let http: NetworkManager
    
    init(http: NetworkManager) {
        self.http = http
    }
    
    func login (_ username: String, with password: String) async {
        let input = LoginInput(username: username, password: password)
        self.status = .loading
        
        do {
            let credentials = try await http.post("/auth", input: input, output: Credentials.self).get()
            self.credentials = credentials
            self.status = .success
        } catch {
            /* In a production application, a failure scenario would be handled properly.
               This demo does not use an actual auth backend; setting the credentials
               manaually will allow the app to continue normal operation.
            */
            self.credentials = Credentials(
                accessToken: "8f633ea6-de27-4110-96cf-bc10fa3a0b86",
                refreshToken: "da5ca0ea-5831-4373-a298-879dfa5a6fcb"
            )
        }
    }
}
