import { SerialPort } from "serialport";
import { USB_BAUD_RATE } from "../services/constants";

let port = null;

export const findConnectedPort = async () => {
  const portPathRegex = new RegExp(/^\/dev\/tty\.usbserial-\d+$/);
  let foundPort = "";
  const currentPorts = await SerialPort.list();
  for (const port of currentPorts) {
    // console.log("port is", port);
    if (port.path !== undefined && portPathRegex.test(port.path)) {
      console.log("FOUND the port!", port.path);
      foundPort = port.path;
      break;
    }
  }
  if (foundPort === "") {
    console.log("PORT not FOUND!!!");
  }
  return foundPort;
};

const initSerialPort = async () => {
  if (port && port.isOpen) {
    return port;
  }

  const portPathName = await findConnectedPort();

  if (portPathName === "") {
    return;
  }

  port = new SerialPort({
    path: portPathName,
    baudRate: USB_BAUD_RATE,
  });

  port.on("error", (err) => {
    console.error("Serial port error:", err.message);
  });

  return port;
};

export const sendSignal = async () => {
  const serialPort = await initSerialPort();

  serialPort.write("A", function (err) {
    if (err) {
      return console.log("Error on write:", err.message);
    }
    console.log("✅ Signal sent to Arduino");
  });
};
