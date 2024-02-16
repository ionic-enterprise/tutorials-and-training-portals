package io.ionic.cs.portals.Jobsync.portals

import androidx.compose.runtime.Composable
import androidx.compose.ui.viewinterop.AndroidView
import androidx.navigation.NavHostController
import com.google.gson.Gson
import io.ionic.cs.portals.Jobsync.network.ApiClient
import io.ionic.portals.PortalBuilder
import io.ionic.portals.PortalView
import io.ionic.portals.PortalsPlugin
import io.ionic.portals.PortalsPubSub
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun WebAppView(
    navHostController: NavHostController,
    metadata: WebAppMetadata
) {
    val credentials = ApiClient.credentials
    val pubsub = PortalsPubSub()
    pubsub.subscribe("navigate:back") {
        CoroutineScope(Dispatchers.Main).launch {
            navHostController.popBackStack()
        }
        pubsub.unsubscribe("navigate:back", it.subscriptionRef)
    }

    val portal = PortalBuilder(metadata.name)
        .setStartDir("portals/${metadata.name}")
        .setInitialContext(Gson().toJson(credentials))
        .addPlugin(AnalyticsPlugin::class.java)
        .addPluginInstance(PortalsPlugin(pubsub))
        .create();

    AndroidView(factory = {
        PortalView(it, portal)
    })
}