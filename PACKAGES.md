# Packages

This monorepo contains all packages required to build iOS and Android applications that use Portals. You do not have to use a monorepo structure when building a Portals project; however, a monorepo structure decreases the maintenance effort required by Ionic. 

## iOS

The iOS application using Portals can be found in `/ios` and run within Xcode by launching `Jobsync.xcodeproj`. Jobsync is the name of the demo project, and is themed as an intranet-based superapp wherein Portals present individual web applications based around common employee features such as time tracking and expense reporting.

Frameworks: SwiftUI, Swift Package Manager

## Android

The Android application using Portals can be found in `/android` and run within Android Studio by loading the folder. Jobsync is the name of the demo project, and is themed as an intranet-based superapp wherein Portals present individual web applications based around common employee features such as time tracking and expense reporting.

Frameworks: Jetpack Compose, Maven

## Web

The `/web` directory contains three different types of packages:

- `apps` contains standalone web apps to be presented through Portals in the iOS/Android app.
- `artifacts` contains native artifacts that can be used with the <a href="https://https://ionic.io/docs/portals/cli/overview" target="_blank">Portals CLI</a> `serve` command.
- `shared` contains code shared across the different web apps.

Web apps use React. However, training materials will have you work within `shared/portals`, a plain TypeScript package, when implementing Portals. 


Frameworks: React, Joy UI