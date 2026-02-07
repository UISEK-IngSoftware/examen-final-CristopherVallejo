import axios from 'axios';

// Interfaz para el Personaje de Futurama
export interface Message {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  createdAt: string;
  image: string;
}

// Interfaz para la respuesta de la API
interface ApiResponse {
  items: Message[];
}

// URL base de la API
const API_URL = 'https://futuramaapi.com/api/characters';

/**
 * Obtiene los personajes de Futurama desde la API
 * @returns Promise con el array de personajes
 */
export const getMessages = async (): Promise<Message[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL, {
      params: {
        orderBy: 'id',
        orderByDirection: 'asc',
        page: 1,
        size: 50
      }
    });
    return response.data.items;
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    throw error;
  }
};

/**
 * Obtiene un personaje específico por ID
 * @param id - ID del personaje
 * @returns El personaje encontrado o undefined
 */
export const getMessage = async (id: number): Promise<Message | undefined> => {
  try {
    const messages = await getMessages();
    return messages.find(m => m.id === id);
  } catch (error) {
    console.error('Error al obtener el personaje:', error);
    throw error;
  }
};
