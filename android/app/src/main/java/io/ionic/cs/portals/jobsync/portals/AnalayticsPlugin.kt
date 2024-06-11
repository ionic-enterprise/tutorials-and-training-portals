package io.ionic.cs.portals.Jobsync.portals

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import androidx.annotation.Keep
import io.ionic.cs.portals.jobsync.util.NetworkManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.http.Body
import retrofit2.http.POST

@Keep
data class AnalyticsBody(
  val action: String?,
  val screen: String?,
  val params: String?,
  val platform: String
)
@Keep
data class AnalyticsResult(val success: Boolean)

interface AnalyticsAPIService {
  @POST("analytics")
  suspend fun analytics(@Body body: AnalyticsBody): AnalyticsResult
}
@CapacitorPlugin(name="Analytics")
class AnalyticsPlugin: Plugin() {
  private val http: AnalyticsAPIService by lazy {
    NetworkManager.instance.create(AnalyticsAPIService::class.java)
  }
  @PluginMethod()
  fun logAction(call: PluginCall) {
    val action = call.getString("action");
    if(action == null) {
      call.reject("Input option 'action' must be provided.")
      return
    }
    val params = call.getObject("params")?.toString() ?: ""
    val body = AnalyticsBody(action, null, params, "android")
    logEvent(body) { success ->
      if(success) { call.resolve() } else { call.reject("Something went wrong.") }
    }
  }

  @PluginMethod()
  fun logScreen(call: PluginCall) {
    val screen = call.getString("screen");
    if(screen == null) {
      call.reject("Input option 'screen' must be provided.")
      return
    }
    val params = call.getObject("params")?.toString() ?: ""
    val body = AnalyticsBody(null, screen, params, "android")
    logEvent(body) { success ->
      if(success) { call.resolve() } else { call.reject("Something went wrong.") }
    }
  }

  private fun logEvent(body: AnalyticsBody, completion: (Boolean) -> Unit) {
    CoroutineScope(Dispatchers.IO).launch {
      withContext(Dispatchers.Main) {
        val result = runCatching { http.analytics(body) }
        result.onSuccess { completion(it.success) }
          .onFailure { completion(false) }
      }
    }
  }
}