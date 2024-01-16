<script>
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import bluetoothMessage from "$lib/bluetoothMessage.js";

  let isAvailable;
  let deviceServer;
  let connectedDevice;
  let characteristic;

  onMount(async () => {
    await enableBluetooth();
  });

  async function enableBluetooth() {
    try {
      isAvailable = await navigator.bluetooth.getAvailability();
      console.log("Bluetooth is enabled: ", isAvailable);
    } catch (e) {
      console.error(e);
      isAvailable = false;
    }
  }

  async function requestBluetoothDevices() {
    try {
      console.log("Requesting Bluetooth Devices");
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["ee4e5719-e214-4217-ba3e-c5de249a3b3c"] }],
        optionalServices: ["ee4e5719-e214-4217-ba3e-c5de249a3b3c"],
      });
      deviceServer = await device.gatt.connect();
      connectedDevice = deviceServer.device;
      const service = await deviceServer.getPrimaryService(
        "ee4e5719-e214-4217-ba3e-c5de249a3b3c",
      );
      characteristic = await service.getCharacteristic(
        "66559f85-2ef4-4d2a-b34d-94f875dab6b4",
      );
      console.log(connectedDevice);
      console.log(characteristic);
      await sendDataToConnectedDevice();
    } catch (e) {
      console.error(e);
    }
  }

  async function sendDataToConnectedDevice() {
    try {
      const stringData = "3 4";
      if (!characteristic) {
        throw new Error("No characteristic found to send data.");
      }
      // Convert the string to an ArrayBuffer.
      const encoder = new TextEncoder(); // Create a new TextEncoder instance
      const buffer = encoder.encode(stringData); // Encode the string into an ArrayBuffer
      await characteristic.writeValue(buffer);
      console.log("String sent to the device successfully!");
      $bluetoothMessage = 'Your Looney is connected';
    } catch (e) {
      console.error("Error sending string:", e);
    }
  }
</script>

<div
  in:fly={{ x: 100, duration: 600 }}
  out:fly={{ x: 300, duration: 600 }}
  class="fixed z-[9] flex flex-row items-center"
>
  <img src="/src/img/tag.png" alt="tag" class="h-[80px]" />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="bg-accent rounded-xl w-[300px] h-[120px]
  flex flex-row gap-4 px-5 items-center shadow-2xl"
    style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
    on:click={() => requestBluetoothDevices()}
  >
    <img src="/src/img/bluetooth.png" alt="octopus" class="h-[85px] w-[90px]" />
    <p>{$bluetoothMessage}</p>
  </div>
</div>
