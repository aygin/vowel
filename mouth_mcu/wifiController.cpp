#include "wifiController.h"
#include <Arduino.h>

void print_somthing(void){
  Serial.begin(115200);
  Serial.println("I'm in the library");
}

WifiController::WifiController(const char* ssid_ , const char* pass_) {
  ssid = ssid_;
  pass = pass_;
}
