//
//  MFEContentCard.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/11/23.
//

import SwiftUI

struct MicroFrontendTile: View {
  let mfe: MicroFrontend
  
  var body: some View {
    HStack {
      Image(systemName: mfe.icon)
        .frame(width: 48, height: 48)
        .font(.title)
        .foregroundColor(.white)
        .background(Color.primary.color)
        .cornerRadius(8)
      VStack(alignment: .leading) {
        Text(mfe.name)
          .font(.title2)
          .fontWeight(.bold)
          .foregroundColor(.neutral.text)
        Text(mfe.description)
          .foregroundColor(.neutral.text)
          .font(.caption)
      }
      Spacer()
    }
    .padding()
    .background(.white)
    .cornerRadius(8)
    .overlay(
      RoundedRectangle(cornerRadius: 8)
        .stroke(Color.neutral.border, lineWidth: 1)
    )
  }
}

#Preview {
  ZStack {
    Color.neutral.soft.ignoresSafeArea(.all)
    MicroFrontendTile(mfe: MICRO_FRONTENDS[0])
  }
}
