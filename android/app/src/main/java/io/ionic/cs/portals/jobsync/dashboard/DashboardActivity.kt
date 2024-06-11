package io.ionic.cs.portals.jobsync.dashboard

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.MediumTopAppBar
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberTopAppBarState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import io.ionic.cs.portals.jobsync.portals.WebApps
import io.ionic.cs.portals.jobsync.ui.theme.GrayBorder
import io.ionic.cs.portals.jobsync.ui.theme.JobsyncTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(navController: NavHostController) {
  val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior(rememberTopAppBarState())
  Scaffold(
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
    topBar = {
      Column {
        MediumTopAppBar(
          colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White),
          title = {
            Text("Dashboard",
              maxLines = 1,
              overflow = TextOverflow.Ellipsis,
              fontWeight = FontWeight.Bold,
              fontSize = MaterialTheme.typography.headlineLarge.fontSize,
            ) },
        )
        Divider(color = GrayBorder, thickness = 1.dp)
      }
    }
  ) { innerPadding ->
    DashboardList(navController = navController, modifier = Modifier.padding(innerPadding))
  }
}

@Composable
fun DashboardList(navController: NavHostController, modifier: Modifier = Modifier) {
  LazyColumn(
    modifier = modifier.fillMaxSize().padding(top = 20.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues( vertical = 10.dp)
  ) {
    items(WebApps.metadata.size) { index ->
      WebAppCard(WebApps.metadata[index]) { navController.navigate("App/$index")}
    }
  }
}

@Preview(showBackground = true)
@Composable
fun DashboardScreenPreview() {
  val navController = rememberNavController()
  JobsyncTheme {
    DashboardScreen(navController)
  }
}