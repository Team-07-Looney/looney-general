import axios from "axios";
import { characteristicsStore } from "$lib/bluetoothStore";

/**
 * Send the a specific face to the arduino
 * @param {*} uri the face that needs to be send (refer to the arduino ms)
 * @param {*} characteristic the characteristic of the device retrieved
 */
export const sendDataViaBluetooth = async (uri) => {
  // Running with localhost because technically the browser access the containers in localhost
  // since here we do not have server side rendering
  const response = await axios.get(`http://localhost:3011/faces/${uri}`);
  
  const hexArray = response.data;

  let characteristic;
  characteristicsStore.subscribe((value) => {
    characteristic = value;
  });
  console.log(characteristic);

  try {
    if (!characteristic) {
      throw new Error("No characteristic found to send data.");
    }

    const buffer = new ArrayBuffer(hexArray.length * 4);
    const view = new Uint32Array(buffer);

    for (let i = 0; i < hexArray.length; i++) {
      view[i] = hexArray[i];
    }

    await characteristic.writeValue(buffer);
    console.log("String sent to the device successfully!");
  } catch (e) {
    console.error("Error sending array:", e);
  }
};
