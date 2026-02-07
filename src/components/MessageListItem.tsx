import {
  IonItem,
  IonLabel,
  IonAvatar,
  IonBadge
} from '@ionic/react';
import { Message } from '../data/messages';
import './MessageListItem.css';

interface MessageListItemProps {
  message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  /**
   * Retorna el color del badge según el estado del personaje
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

  /**
   * Retorna el emoji según el género
   */
  const getGenderEmoji = (gender: string): string => {
    switch (gender.toUpperCase()) {
      case 'MALE':
        return '♂️';
      case 'FEMALE':
        return '♀️';
      default:
        return '⚫';
    }
  };

  return (
    <IonItem id="message-list-item" routerLink={`/message/${message.id}`} detail={false}>
      {/* Avatar con imagen del personaje */}
      <IonAvatar slot="start" className="character-avatar">
        <img src={message.image} alt={message.name} />
      </IonAvatar>

      {/* Información del personaje */}
      <IonLabel className="ion-text-wrap">
        <h2 className="character-name">
          {message.name}
        </h2>
        <div className="character-info">
          <p>
            <strong>Género:</strong> {getGenderEmoji(message.gender)} {message.gender}
          </p>
          <p>
            <strong>Especie:</strong> {message.species}
          </p>
        </div>
      </IonLabel>

      {/* Badge de estado */}
      <IonBadge 
        slot="end" 
        color={getStatusColor(message.status)}
        className="status-badge"
      >
        {message.status}
      </IonBadge>
    </IonItem>
  );
};

export default MessageListItem;
