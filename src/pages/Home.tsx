import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import useBarCodeScanner from '../hooks/useCodeBar';

const Home: React.FC = () => {
  const {onScan} = useBarCodeScanner();
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
        <IonButton onClick={onScan}>Scan</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;
