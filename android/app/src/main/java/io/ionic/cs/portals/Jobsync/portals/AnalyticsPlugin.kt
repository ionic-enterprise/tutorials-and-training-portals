package io.ionic.cs.portals.Jobsync.portals

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name="Analytics")
class AnalyticsPlugin: Plugin() {
    @PluginMethod()
    fun logAction(call: PluginCall) {
        println("AnalyticsPlugin: logAction")
    }

    @PluginMethod()
    fun logScreen(call: PluginCall) {
        println("AnalyticsPlugin: logScreen")
    }
}