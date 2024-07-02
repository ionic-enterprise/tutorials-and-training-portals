package io.ionic.cs.portals.jobsync.portals

import android.media.Image
import io.ionic.cs.portals.jobsync.R
import java.util.Locale

data class WebAppMetadata(val name: String, val description: String, val imageResource: Int) {
  val displayName get() = name.replace('_', ' ').split(" ").joinToString(" ") { name ->
    name.replaceFirstChar { if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString() }
  }
}

class WebApps {
  companion object {
    val metadata: List<WebAppMetadata> = listOf(
      WebAppMetadata("expenses", "Submit expenses for business purposes.", R.drawable.expenses),
      WebAppMetadata("tasks", "Track tasks for transparent project updates.", R.drawable.tasks),
      WebAppMetadata("time_tracking", "Stay on schedule by tracking time spent.", R.drawable.time_tracking),
      WebAppMetadata("contacts", "Quickly locate and update contact records.", R.drawable.contacts)
      )
  }
}

