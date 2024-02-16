//
//  AnalyticsPlugin.swift
//  Jobsync
//
//  Created by Eric Horodyski on 2/16/24.
//

import Foundation
import Capacitor

struct AnalyticsInput: Encodable {
    let action: String?
    let screen: String?
    let params: String?
    let platform: String
}

struct AnalyticsOutput: Decodable {
    let success: Bool
}

class AnalyticsPlugin: CAPInstancePlugin, CAPBridgedPlugin {
    private var http: NetworkManager = NetworkManager()

    let jsName = "Analytics"
    let identifier = "Analytics"
    let pluginMethods: [CAPPluginMethod] = [
        .init(name: "logAction", returnType: CAPPluginReturnPromise),
        .init(name: "logScreen", returnType: CAPPluginReturnPromise)
    ]
    
    @objc func logAction(_ call: CAPPluginCall) {
        guard let action = call.getString("action") else {
            call.reject("Input option 'action' must be provided.")
            return
        }
        
        let params: String? = self.stringify(call.getObject("params"))
        let input = AnalyticsInput(action: action, screen: nil, params: params, platform: "ios")
        
        self.logEvent(input) { success in
            success ? call.resolve() : call.reject("Something went wrong.")
        }
    }
    
    @objc func logScreen(_ call: CAPPluginCall) {
        guard let screen = call.getString("screen") else {
            call.reject("Input option 'screen' must be provided.")
            return
        }
        
        let params: String? = self.stringify(call.getObject("params"))
        let input = AnalyticsInput(action: nil, screen: screen, params: params, platform: "ios")
        
        self.logEvent(input) { success in
            success ? call.resolve() : call.reject("Something went wrong.")
        }
    }

    private func stringify(_ json: Capacitor.JSObject?) -> String? {
        guard let json = json else { return nil }
        
        do {
            let data = try JSONSerialization.data(withJSONObject: json, options: [])
            return String(data: data, encoding: .utf8)
        } catch {
            return nil
        }
    }
    
    private func logEvent(_ input: AnalyticsInput, completion: @escaping (Bool) -> Void) {
        http.post("/analytics", input: input, output: AnalyticsOutput.self) { result in
            switch result {
            case .success(let res):
                completion(res.success)
            case .failure:
                completion(false)
            }
        }
    }
}
