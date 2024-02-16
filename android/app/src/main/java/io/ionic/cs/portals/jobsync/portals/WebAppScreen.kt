package io.ionic.cs.portals.jobsync.portals

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun WebAppScreen(navController: NavHostController, metadata: WebAppMetadata) {
  Scaffold { innerPadding ->
    Column(
      Modifier.fillMaxSize().padding(innerPadding),
      verticalArrangement = Arrangement.Center,
      horizontalAlignment = Alignment.CenterHorizontally
    ) {
      Button(onClick = {
        CoroutineScope(Dispatchers.Main).launch { navController.popBackStack() }
      }) {
        Text("Done")
      }
    }
  }
}