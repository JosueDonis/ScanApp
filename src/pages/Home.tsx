import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import useBarCodeScanner from "../hooks/useCodeBar";
import { Camera, CameraResultType } from "@capacitor/camera";

const Home: React.FC = () => {
  const dectectList = [
    "FACE_DETECTION",
    "LANDMARK_DETECTION",
    "LOGO_DETECTION",
  ];
  const key = "";
  const onCamera = async () => {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });
    const body = {
      requests: [
        {
          features: [
            {
              type: dectectList[0],
              maxResults: 10,
            },
          ],
          image: {
            content: photo?.base64String,
          },
        },
      ],
    };
    const resp = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
      body: JSON.stringify(body),
      method: "POST",
    });
    console.log(await resp.json());
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ScanApp</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={onCamera}>Scan Face</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
