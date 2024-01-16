// BLE Configuration for the Arduino R4 WiFi 

#include <ArduinoBLE.h>
#include "Arduino_LED_Matrix.h"

BLEService customService("ee4e5719-e214-4217-ba3e-c5de249a3b3c");                                            // Custom service UUID
BLEStringCharacteristic dataCharacteristic("66559f85-2ef4-4d2a-b34d-94f875dab6b4", BLERead | BLEWrite, 20);  // Custom characteristic UUID

ArduinoLEDMatrix matrix;
// byte frame[8][12] = {
//   { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
//   { 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
//   { 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 },
//   { 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
//   { 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 },
//   { 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0 },
//   { 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0 },
//   { 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0 }
// };


const uint32_t sleepy[] = {
  0x18018018,
  0xc001801,
  0xb21aa026
};

uint32_t connected[] = {
  0x18018018,
  0xc001801,
  0x80180000
};

void setup() {
  Serial.begin(9600);
  // Initialize BLE
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
  }

  BLE.setLocalName("Looney");
  BLE.setAdvertisedService(customService);
  customService.addCharacteristic(dataCharacteristic);
  BLE.addService(customService);
  BLE.advertise();
  matrix.begin();
  Serial.println("Bluetooth device active, waiting for connections...");
}

void loop() {
  matrix.loadFrame(sleepy);
  BLEDevice central = BLE.central();

  if (central) {
    Serial.print("Connected to central: ");
    Serial.println(central.address());
    matrix.loadFrame(connected);

    while (central.connected()) {
      if (dataCharacteristic.written()) {
        String value = dataCharacteristic.value();

        Serial.print("Received string: ");
        Serial.println(value);
      }
    }
    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }
}
