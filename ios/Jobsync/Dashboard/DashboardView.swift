//
//  DashboardView.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/8/23.
//

import SwiftUI

struct DashboardView: View {
    let cols = [GridItem(.flexible()), GridItem(.flexible())]

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading) {
                
                ForEach(MINI_APPS) { mfe in
                    NavigationLink(value: mfe) {
                        MiniAppCard(app: mfe)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 1)
                    }
                    //.navigationDe
                    //         .navigationDestination(for: MicroFrontend.self) { mfe in
                    //              Text("\(mfe.name)")
                    //          }
                }
                
                Spacer()
            }
            .padding(.top, 30)
            .navigationTitle("Dashboard")
            .toolbarBackground(Color.white, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .themedBackground()
        }
    }
}

#Preview {
    DashboardView()
}
