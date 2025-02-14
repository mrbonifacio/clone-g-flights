import { useState } from "react";
import { searchFlights } from "../flights/search-flights";
import { FlightSearchParams, FlightsResponseData } from "@/types/flights";

export const useSearchFlights = () => {
    const [data, setData] = useState<FlightsResponseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFlights = async (params: FlightSearchParams) => {
        setLoading(true);
        setError(null);

        try {
            const result = await searchFlights(params);
            setData(result);
        } catch (err) {
            setError("Erro ao buscar voos.");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchFlights };
};
