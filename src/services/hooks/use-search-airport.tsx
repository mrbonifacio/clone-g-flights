import { useState } from "react";
import { searchAirports } from "../flights/search-airports";
import { AirportResponse } from "@/types/airport";

export const useSearchAirports = () => {
    const [data, setData] = useState<AirportResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAirports = async (query: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await searchAirports(query);
            setData(result);
        } catch (err) {
            setError("Erro ao buscar aeroportos.");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchAirports };
};
