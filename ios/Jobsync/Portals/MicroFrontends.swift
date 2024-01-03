//
//  MicroFrontends.swift
//  Jobsync
//
//  Created by Eric Horodyski on 12/11/23.
//

import Foundation

let MINI_APPS: [MiniApp] = [
  .init(
    id: "expenses",
    name: "Expenses",
    icon: "dollarsign.arrow.circlepath",
    description: "Submit expenses for business related activities."
  ),
  .init(
    id: "tasks",
    name: "Tasks",
    icon: "list.star",
    description: "Track tasks for transparent project updates."
  ),
  .init(
    id: "time-tracking",
    name: "Time Tracking",
    icon: "person.crop.circle.badge.clock",
    description: "Stay on schedule by tracking time spent."
  )
];
