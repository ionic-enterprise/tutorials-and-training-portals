package io.ionic.cs.portals.Jobsync.portals

import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import io.ionic.cs.portals.Jobsync.network.ApiClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun WebAppView(
    navHostController: NavHostController,
    metadata: WebAppMetadata
) {
    val credentials = ApiClient.credentials

    Button(onClick = {
        CoroutineScope(Dispatchers.Main).launch {
            navHostController.popBackStack()
        }
    }) {
        Text("Done")
    }
}