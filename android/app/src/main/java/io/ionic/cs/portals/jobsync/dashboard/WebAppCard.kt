package io.ionic.cs.portals.jobsync.dashboard

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.ionic.cs.portals.jobsync.portals.WebAppMetadata
import io.ionic.cs.portals.jobsync.portals.WebApps
import io.ionic.cs.portals.jobsync.ui.theme.Blue100
import io.ionic.cs.portals.jobsync.ui.theme.JobsyncTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WebAppCard(app: WebAppMetadata, onClick: () -> Unit) {
  OutlinedCard(
    onClick = { onClick() },
    modifier = Modifier
      .fillMaxWidth()
      .padding(horizontal = 10.dp),
    colors = CardDefaults.cardColors(containerColor = Color.White)
  ) {
    Row {
      Image(
        painter = painterResource(id = app.imageResource),
        contentDescription = app.description,
        modifier = Modifier.iconModifier()
      )
      Column(Modifier.align(Alignment.CenterVertically)) {
        Text(
          app.displayName,
          fontSize = MaterialTheme.typography.titleLarge.fontSize,
          fontWeight = FontWeight.Bold,
          modifier = Modifier.padding(bottom = 3.dp),
        )
        Text(app.description, fontSize = MaterialTheme.typography.labelMedium.fontSize)
      }
    }
  }
}

@Composable
private fun Modifier.iconModifier() =
  this
    .padding(10.dp, 10.dp, 2.dp, 10.dp)
    .size(75.dp)
    .padding(5.dp)
    .background(color = Blue100, shape = RoundedCornerShape(10.dp))
    .padding(10.dp)

@Preview(showBackground = true)
@Composable
fun WebAppCardPreview() {
  val app = WebApps.metadata[2]
  JobsyncTheme {
    WebAppCard(app) {}
  }
}