//
//  DashboardView.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/8/23.
//

import SwiftUI

struct DashboardView: View {
  let cols = [GridItem(.flexible()), GridItem(.flexible())]
  
  @ObservedObject var vm = DashboardViewModel()
  
  var body: some View {
    NavigationStack {
      ZStack {
        Color.neutral.soft.ignoresSafeArea()
        VStack(alignment: .leading) {
          
          ForEach(vm.microFrontends) { mfe in
            NavigationLink(value: mfe) {
              MicroFrontendTile(mfe: mfe)
                .padding(.horizontal, 10)
                .padding(.vertical, 1)
            }
            .navigationDestination(for: MicroFrontend.self) { mfe in
              Text("\(mfe.name)")
            }
          }
          
          Spacer()
        }
        .padding(.top, 30)
        .navigationTitle("Dashboard")
        .toolbarBackground(Color.white, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
      }
    }
    
  }
}

#Preview {
  DashboardView()
}
