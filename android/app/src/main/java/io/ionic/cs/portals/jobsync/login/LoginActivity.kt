package io.ionic.cs.portals.jobsync.login

import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import io.ionic.cs.portals.jobsync.R
import io.ionic.cs.portals.jobsync.ui.theme.JobsyncTheme
import io.ionic.cs.portals.jobsync.ui.theme.Blue100
import io.ionic.cs.portals.jobsync.ui.theme.GrayBorder
import io.ionic.cs.portals.jobsync.util.CredentialsManager

@Composable
private fun transparentTextFieldColors() = TextFieldDefaults.colors(
  focusedContainerColor = Color.Transparent,
  unfocusedContainerColor = Color.Transparent,
  disabledContainerColor = Color.Transparent,
  errorContainerColor = Color.Transparent,
  unfocusedIndicatorColor = GrayBorder
)

@Composable
fun LoginScreen(navController: NavHostController) {
  var username by remember { mutableStateOf("test@jobsync.com") }
  var password by remember { mutableStateOf("P@ssword123") }

  Column(
    Modifier.fillMaxSize(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    OutlinedCard(modifier = Modifier.padding(15.dp),
      colors = CardDefaults.cardColors(containerColor = Color.White)
    ) {
      Column(modifier = Modifier.padding(20.dp).fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally,
      ) {
        Image(
          painter = painterResource(id = R.drawable.logo),
          contentDescription = "Jobsync",
          modifier = Modifier
            .size(150.dp)
            .padding(10.dp)
            .align(Alignment.CenterHorizontally)
        )
        TextField(modifier = Modifier.fillMaxWidth(),
          value = username,
          onValueChange = { username = it },
          colors = transparentTextFieldColors(),
          keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
        )
        TextField(modifier = Modifier.fillMaxWidth(),
          value = password,
          onValueChange = { password = it },
          colors = transparentTextFieldColors(),
          visualTransformation = PasswordVisualTransformation(),
          keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
        )
        Button(modifier = Modifier.fillMaxWidth().padding(top = 18.dp),
          onClick = {
            CredentialsManager.login(username, password) {
              Log.d("Eric", CredentialsManager.credentials.toString())
              navController.navigate("Dashboard")
            }
          },
          colors = ButtonDefaults.buttonColors(containerColor = Blue100),
          shape = RoundedCornerShape(8.dp)

        ) {
          Text("Login",
            modifier = Modifier.padding(5.dp),
            fontSize = MaterialTheme.typography.titleMedium.fontSize
          )
        }
      }
    }
  }
}

@Preview(showBackground = true)
@Composable
fun LoginScreenPreview() {
  val navController = rememberNavController()
  JobsyncTheme {
    LoginScreen(navController)
  }
}