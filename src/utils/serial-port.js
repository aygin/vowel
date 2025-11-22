import { SerialPort } from "serialport";
import { USB_BAUD_RATE, USB_SERIAL_PORT } from "../services/constants";

let port = null;

const initSerialPort = () => {
  if (port && port.isOpen) {
    return port;
  }

  port = new SerialPort({
    path: USB_SERIAL_PORT,
    baudRate: USB_BAUD_RATE,
  });

  port.on("error", (err) => {
    console.error("Serial port error:", err.message);
  });

  return port;
};

export const sendSignal = () => {
  const serialPort = initSerialPort();

  serialPort.write("A", function (err) {
    if (err) {
      return console.log("Error on write:", err.message);
    }
    console.log("✅ Signal sent to Arduino");
  });
};
