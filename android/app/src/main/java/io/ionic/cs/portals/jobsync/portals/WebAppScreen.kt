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

@Composable
fun WebAppScreen(navController: NavHostController, metadata: WebAppMetadata) {
  Scaffold { innerPadding ->
    Column(
      Modifier.fillMaxSize().padding(innerPadding),
      verticalArrangement = Arrangement.Center,
      horizontalAlignment = Alignment.CenterHorizontally
    ) {
      AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { context ->
          val portal = PortalBuilder("debug")
            .setStartDir("portals/debug")
            .setInitialContext(CredentialsManager.credentials!!.toMap())
            .create()
          PortalView(context, portal)
        })
    }
  }
}