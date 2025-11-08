import { SerialPort } from "serialport";
import { USB_BAUD_RATE, USB_SERIAL_PORT } from "../services/constants";

export const sendSignal = () => {
  const port = new SerialPort({
    path: USB_SERIAL_PORT,
    baudRate: USB_BAUD_RATE,
  });

  port.write("A", function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("message written");
  });
};
