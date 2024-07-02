package io.ionic.cs.portals.jobsync.portals

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.compose.ui.viewinterop.AndroidView
import io.ionic.cs.portals.jobsync.util.CredentialsManager
import io.ionic.portals.PortalBuilder
import io.ionic.portals.PortalView
import io.ionic.portals.PortalsPlugin
import io.ionic.portals.PortalsPubSub
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun WebAppScreen(navController: NavHostController, metadata: WebAppMetadata) {
  val pubSub = PortalsPubSub()
  pubSub.subscribe("navigate:back") {
    CoroutineScope(Dispatchers.Main).launch {
      navController.popBackStack()
    }
    pubSub.unsubscribe("navigate:back", it.subscriptionRef)
  }

  Scaffold { innerPadding ->
    Column(
      Modifier.fillMaxSize().padding(innerPadding),
      verticalArrangement = Arrangement.Center,
      horizontalAlignment = Alignment.CenterHorizontally
    ) {
      AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { context ->
          val portal = PortalBuilder(metadata.name)
            .setStartDir("portals/${metadata.name}")
            .setInitialContext(CredentialsManager.credentials!!.toMap())
            .addPlugin(AnalyticsPlugin::class.java)
            .addPluginInstance(PortalsPlugin(pubSub))

          if(metadata.liveUpdate != null) {
            portal.setLiveUpdateConfig(context, metadata.liveUpdate)
          }

          PortalView(context, portal.create())
        })
    }
  }
}