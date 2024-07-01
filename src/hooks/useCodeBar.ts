import {
  BarcodeFormat,
  BarcodeScanner,
} from "@capacitor-mlkit/barcode-scanning";
import { Capacitor } from "@capacitor/core";
import { useEffect } from "react";
import { Camera } from "@capacitor/camera";
export const useBarCodeScanner = () => {
  const isGoogleBarcodeScannerModuleAvailable = async () => {
    try {
      const { available } =
        await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      return available;
    } catch (error) {
      throw error;
    }
  };

  const installGoogleBarcodeScannerModule = async () => {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    } catch (error) {
      throw error;
    }
  };

  const checkPermissions = async () => {
    try {
      const { camera } = await BarcodeScanner.checkPermissions();
      return camera;
    } catch (error) {
      throw error;
    }
  };

  const requestPermissions = async () => {
    try {
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera;
    } catch (error) {
      throw error;
    }
  };

  const requestPermissionsCamera = async () => {
    try {
      const { camera } = await Camera.checkPermissions();
      if (camera !== "granted") {
        const { camera } = await Camera.requestPermissions({
          permissions: ["camera"],
        });
        return camera;
      }
      return camera;
    } catch (error) {
      throw error;
    }
  };

  const initPlugin = async () => {
    try {
      await requestPermissionsCamera();
      if ((await checkPermissions()) !== "granted") {
        await requestPermissions();
        if (!(await isGoogleBarcodeScannerModuleAvailable())) {
          await installGoogleBarcodeScannerModule();
        }
      } else {
        if (!(await isGoogleBarcodeScannerModuleAvailable())) {
          await installGoogleBarcodeScannerModule();
        }
      }
    } catch (error: any) {
      throw error;
    }
  };

  const onScan = async () => {
    if (!Capacitor.isNativePlatform()) return null;
    try {
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode],
      });
      return barcodes;
    } catch (error: any) {
      if (error?.message?.includes("scan canceled")) return;
      console.log({
        message: "Error al escanear el código QR",
        color: "danger",
      });
      throw error;
    }
  };

  useEffect(() => {
    let listener: any;
    if (Capacitor.isNativePlatform()) {
      listener = BarcodeScanner.addListener(
        "barcodeScanned",
        async (result) => {
          await listener.remove();
          document
            .querySelector("body")
            ?.classList.remove("barcode-scanner-active");
          await BarcodeScanner.stopScan();
        }
      );
      initPlugin();
    }

    return () => {
      if (listener) listener.remove();
    };
  }, []);

  

  return {
    onScan,
  };
};

export default useBarCodeScanner;
