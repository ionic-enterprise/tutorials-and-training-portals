package io.ionic.cs.portals.jobsync

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import io.ionic.cs.portals.jobsync.dashboard.DashboardScreen
import io.ionic.cs.portals.jobsync.login.LoginScreen
import io.ionic.cs.portals.jobsync.portals.WebApps
import io.ionic.cs.portals.jobsync.ui.theme.JobsyncTheme
import io.ionic.cs.portals.jobsync.portals.WebAppScreen

class MainActivity : AppCompatActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      val navController = rememberNavController()
      JobsyncTheme {
        NavHost(navController = navController, startDestination = "Login") {
          composable("Login") {
            LoginScreen(navController)
          }
          composable("Dashboard") {
            DashboardScreen(navController)
          }
          composable("App/{id}", arguments = listOf(navArgument("id") {
            type = NavType.IntType
          })) {
            val id = it.arguments?.getInt("id") ?: 0
            WebAppScreen(navController, WebApps.metadata[id])
          }
        }
      }
    }
  }
}
