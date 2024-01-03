//
//  CredentialsManager.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/12/23.
//

import Alamofire
import Foundation

typealias NetworkError = AFError

enum RequestStatus {
  case loading, success, failure
}

class NetworkManager: ObservableObject {
  
  func delete<Output: Decodable>(_ url: String, output _: Output.Type, completion: @escaping (Result<Output, NetworkError>) -> Void) {
    AF.request(Constants.BASE_URL + url, method: .delete, interceptor: self).validate().responseDecodable(of: Output.self) { response in
      completion(response.result)
    }
  }
  
  func get<Output: Decodable>(_ url: String, output _: Output.Type, completion: @escaping (Result<Output, NetworkError>) -> Void) {
    AF.request(Constants.BASE_URL + url, interceptor: self).validate().responseDecodable(of: Output.self) { response in
      completion(response.result)
    }
  }
  
  func post<Input: Encodable, Output: Decodable>(_ url: String, input: Input, output _: Output.Type) async throws -> Result<Output, NetworkError> {
    let headers: HTTPHeaders = [.init(name: "Content-Type", value: "application/json")]
    let task = AF.request(Constants.BASE_URL + url, method: .post, parameters: input, encoder: .json, headers: headers, interceptor: self)
      .validate()
      .serializingDecodable(Output.self)
    return await task.result
  }
  
  func put<Input: Encodable, Output: Decodable>(_ url: String, input: Input, Output _: Output.Type, completion: @escaping (Result<Output, NetworkError>) -> Void) {
    let headers: HTTPHeaders = [.init(name: "Content-Type", value: "application/json")]
    AF.request(Constants.BASE_URL + url, method: .put, parameters: input, encoder: .json, headers: headers, interceptor: self)
      .validate().responseDecodable(of: Output.self) { response in
        completion(response.result)
      }
  }
  
}

extension NetworkManager: RequestInterceptor {
  func adapt(_ urlRequest: URLRequest, for _: Session, completion: @escaping (Result<URLRequest, Error>) -> Void) {
    var request = urlRequest
    request.setValue(Constants.X_API_KEY, forHTTPHeaderField: "x-api-key")
    completion(.success(request))
  }
}
