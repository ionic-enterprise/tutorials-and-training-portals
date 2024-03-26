package io.ionic.cs.portals.Jobsync.portals

import androidx.compose.runtime.Composable
import androidx.compose.ui.viewinterop.AndroidView
import androidx.navigation.NavHostController
import com.google.gson.Gson
import io.ionic.cs.portals.Jobsync.network.ApiClient
import io.ionic.portals.PortalBuilder
import io.ionic.portals.PortalView

@Composable
fun WebAppView(
    navHostController: NavHostController,
    metadata: WebAppMetadata
) {
    val credentials = ApiClient.credentials
    val jsonCredentials = Gson().toJson(credentials)

    val portal = PortalBuilder(metadata.name)
        .setStartDir("portals/${metadata.name}")
        .setInitialContext(jsonCredentials)
        .create();

    AndroidView(factory = {
        PortalView(it, portal)
    })
}