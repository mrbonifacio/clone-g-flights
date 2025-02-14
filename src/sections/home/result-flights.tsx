import { FlightsResponseData } from '@/types/flights';
import React from 'react';

type FlightResultsProps = {
    flightResults: FlightsResponseData | null;
    flightLoading: boolean;
};

export const FlightResults: React.FC<FlightResultsProps> = ({ flightResults, flightLoading }) => {
    if (flightLoading) {
        return <p className="text-center mt-2">Buscando voos...</p>;
    }

    return (
        <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {flightResults?.data?.itineraries &&
                    Object.values(flightResults.data.itineraries).map((itinerary, index) => (
                        <div key={index} className="p-4 shadow-md rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold mb-2">Itinerário #{index + 1}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Preço: {itinerary.price.formatted}</span>
                            </div>
                            <div className="mt-3">
                                <h4 className="font-medium">Trechos:</h4>
                                {itinerary.legs.map((leg, legIndex) => (
                                    <div key={legIndex} className="mb-4">
                                        <div className="text-sm">
                                            <strong>{leg.origin.city} → {leg.destination.city}</strong>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(leg.departure).toLocaleString()} - {new Date(leg.arrival).toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-400">Duração: {leg.durationInMinutes} minutos</div>
                                        {Array.isArray(leg.carriers) && leg.carriers.map((carrier, carrierIndex) => (
                                            <div key={carrierIndex} className="flex items-center mt-2">
                                                <img
                                                    src={carrier.logoUrl}
                                                    alt={carrier.name}
                                                    className="w-10 h-10 mr-2"
                                                />
                                                <span className="text-sm">{carrier.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3">
                                <h4 className="font-medium">Política de Tarifa:</h4>
                                <ul className="list-disc pl-5 text-sm">
                                    <li>Alterações Permitidas: {itinerary.farePolicy.isChangeAllowed ? "Sim" : "Não"}</li>
                                    <li>Cancelamento Permitido: {itinerary.farePolicy.isCancellationAllowed ? "Sim" : "Não"}</li>
                                    <li>Reembolso Parcial: {itinerary.farePolicy.isPartiallyRefundable ? "Sim" : "Não"}</li>
                                </ul>
                            </div>
                            <div className="mt-3">
                                <h4 className="font-medium">Tags:</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {itinerary.tags?.tags?.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-3 py-1">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

