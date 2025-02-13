import { AirportResponse } from "@/types/airport";
import { api } from "../api";

export const searchAirports = async (query: string): Promise<AirportResponse> => {
    try {
        const response = await api.get<AirportResponse>('/api/v1/flights/searchAirport', {
            params: {
                query, // Nome da cidade ou código do aeroporto
                locale: 'en-US',
            },
        });

        if (!response.data || response.data.data.length === 0) {
            throw new Error('Nenhum aeroporto encontrado.');
        }

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar aeroportos:', error);
        return { status: false, timestamp: Date.now(), data: [] };
    }
};
