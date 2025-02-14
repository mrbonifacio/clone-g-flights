import { FlightSearchParams, FlightsResponseData } from "@/types/flights";
import { api } from "../api";

export const searchFlights = async (params: FlightSearchParams): Promise<FlightsResponseData | null> => {
    try {
        const response = await api.get("/api/v1/flights/searchFlights", {
            params,
        });

        if (!response.data || response.data.data.length === 0) {
            throw new Error('Nenhum voo encontrado.');
        }

        return response.data as FlightsResponseData; // Tipo correto para a resposta
    } catch (error) {
        console.error("Erro ao buscar voos:", error);
        return null;
    }
};
