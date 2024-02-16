package io.ionic.cs.portals.jobsync.util

import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object NetworkManager {
  private const val BASE_URL = "https://88tkyz16e2.execute-api.us-east-2.amazonaws.com/v1/"
  private const val X_API_KEY = "kRJoNgYv0z4jK8YyhhzJU94HEJCWPUeG1UzTRkAF"

  private val client: OkHttpClient by lazy {
    OkHttpClient.Builder()
      .addInterceptor { chain ->
        val request: Request = chain.request().newBuilder()
          .addHeader("x-api-key", X_API_KEY)
          .build()
        chain.proceed(request)
      }
      .build()
  }

  val instance: Retrofit by lazy {
    Retrofit.Builder()
      .baseUrl(BASE_URL)
      .client(client)
      .addConverterFactory(GsonConverterFactory.create())
      .build()
  }
}