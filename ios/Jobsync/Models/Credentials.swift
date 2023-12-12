//
//  Credentials.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/12/23.
//

import Foundation

struct Credentials: Decodable {
  var accessToken: String
  var refreshToken: String
  
  private enum CodingKeys: String, CodingKey {
    case accessToken = "access_token"
    case refreshToken = "refresh_token"
  }
}
