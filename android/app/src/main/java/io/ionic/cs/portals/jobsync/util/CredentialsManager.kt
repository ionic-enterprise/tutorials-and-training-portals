package io.ionic.cs.portals.jobsync.util

import androidx.annotation.Keep
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.http.Body
import retrofit2.http.POST

@Keep
data class LoginBody(val username: String, val password: String)
@Keep
data class Credentials(val access_token: String, val refresh_token: String)

interface CredentialsAPIService {
  @POST("auth")
  suspend fun login(@Body loginBody: LoginBody): Credentials
}

object CredentialsManager {
  private val http: CredentialsAPIService by lazy {
    NetworkManager.instance.create(CredentialsAPIService::class.java)
  }
  private var _credentials: Credentials? = null

  val credentials: Credentials?
    get() = _credentials

  fun login(username: String, password: String, completion: () -> Unit) {
    CoroutineScope(Dispatchers.IO).launch {
      val result = runCatching { http.login(LoginBody(username, password)) }
      result.onSuccess { _credentials = it }
        .onFailure { _credentials = getDefaultCredentials() }
      withContext(Dispatchers.Main) { completion() }
    }
  }

  private fun getDefaultCredentials(): Credentials {
    return Credentials("8f633ea6-de27-4110-96cf-bc10fa3a0b86", "da5ca0ea-5831-4373-a298-879dfa5a6fcb")
  }
}