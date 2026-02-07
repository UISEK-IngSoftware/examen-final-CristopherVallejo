import { useState } from 'react';
import { Message, getMessage } from '../data/messages';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonLoading,
  IonCard,
  IonCardContent,
  IonText,
  IonBadge,
  IonAvatar,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewMessage.css';

function ViewMessage() {
  const [message, setMessage] = useState<Message>();
  const [loading, setLoading] = useState(true);
  const params = useParams<{ id: string }>();

  /**
   * Obtiene el color del badge según el estado
   */
  const getStatusColor = (status: string): string => {
    switch (status.toUpperCase()) {
      case 'ALIVE':
        return 'success';
      case 'DEAD':
        return 'danger';
      default:
        return 'medium';
    }
  };

  useIonViewWillEnter(() => {
    setLoading(true);
    getMessage(parseInt(params.id, 10))
      .then((msg) => {
        setMessage(msg);
      })
      .catch((error) => {
        console.error('Error al cargar el personaje:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Personajes" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Cargando..." />
        
        {message ? (
          <>
            {/* Imagen del personaje */}
            <div className="character-header">
              <IonAvatar className="large-avatar">
                <img src={message.image} alt={message.name} />
              </IonAvatar>
            </div>

            {/* Información principal */}
            <IonItem>
              <IonLabel className="ion-text-wrap">
                <h2 className="character-title">
                  {message.name}
                </h2>
                <p>
                  <strong>Especie:</strong> {message.species}
                </p>
                <p>
                  <strong>Género:</strong> {message.gender}
                </p>
              </IonLabel>
            </IonItem>

            {/* Estado */}
            <div className="ion-padding">
              <IonBadge 
                color={getStatusColor(message.status)}
                className="large-badge"
              >
                Estado: {message.status}
              </IonBadge>
              <p className="created-date">
                <strong>Agregado:</strong> {new Date(message.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Descripción */}
            <IonCard>
              <IonCardContent>
                <h3>Detalles del Personaje</h3>
                <p>
                  <strong>ID:</strong> {message.id}
                </p>
                <p>
                  <strong>Nombre:</strong> {message.name}
                </p>
                <p>
                  <strong>Especie:</strong> {message.species}
                </p>
                <p>
                  <strong>Género:</strong> {message.gender}
                </p>
                <p>
                  <strong>Estado Vital:</strong> {message.status}
                </p>
              </IonCardContent>
            </IonCard>
          </>
        ) : (
          !loading && (
            <IonCard className="error-card">
              <IonCardContent>
                <IonText>
                  <h2>❌ Personaje no encontrado</h2>
                </IonText>
              </IonCardContent>
            </IonCard>
          )
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
