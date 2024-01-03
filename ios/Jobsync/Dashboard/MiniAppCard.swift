//
//  MFEContentCard.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/11/23.
//

import SwiftUI

struct MiniAppCard: View {
  let app: MiniApp
  
  var body: some View {
    HStack {
      Image(systemName: app.icon)
        .frame(width: 48, height: 48)
        .font(.title)
        .foregroundColor(.white)
        .background(.jsPrimary)
        .cornerRadius(8)
      VStack(alignment: .leading) {
        Text(app.name)
          .font(.title2)
          .fontWeight(.bold)
          .foregroundColor(.jsNeutralText)
        Text(app.description)
          .foregroundColor(.jsNeutralText)
          .font(.caption)
      }
      Spacer()
    }
    .themedCard()
  }
}

#Preview {
  MiniAppCard(app: MINI_APPS[0])
    .padding()
    .themedBackground()
}
