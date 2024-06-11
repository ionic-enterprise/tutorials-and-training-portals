package io.ionic.cs.portals.jobsync

import android.app.Application
import io.ionic.portals.PortalManager

class Jobsync: Application() {
  override fun onCreate(): Unit {
    super.onCreate()
    PortalManager.register("YOUR_KEY_HERE")
  }
}