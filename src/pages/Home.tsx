import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonLoading,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga los personajes desde la API
   */
  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const msgs = await getMessages();
      setMessages(msgs);
    } catch (err) {
      setError('Error al cargar los personajes. Por favor, intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadMessages();
  });

  /**
   * Maneja el refresh (deslizar hacia abajo)
   */
  const refresh = async (e: CustomEvent) => {
    await loadMessages();
    e.detail.complete();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personajes Futurama</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Personajes Futurama
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Loading */}
        <IonLoading isOpen={loading} message="Cargando personajes..." />

        {/* Error State */}
        {error && !loading && (
          <IonCard className="error-card">
            <IonCardContent>
              <IonText>
                <h2>❌ {error}</h2>
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* Empty State */}
        {!loading && !error && messages.length === 0 && (
          <IonCard className="empty-card">
            <IonCardContent>
              <IonText>
                <h2>📭 No hay personajes disponibles</h2>
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* List of Characters */}
        {!loading && !error && messages.length > 0 && (
          <IonList>
            {messages.map(m => <MessageListItem key={m.id} message={m} />)}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
