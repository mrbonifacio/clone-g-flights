export interface AirportResponse {
    status: boolean;
    timestamp: number;
    data: Airport[];
}

export interface Airport {
    presentation: {
        title: string;
        suggestionTitle: string;
        subtitle: string;
    };
    navigation: {
        entityId: string;
        entityType: "CITY" | "AIRPORT";
        localizedName: string;
        relevantFlightParams: {
            skyId: string;
            entityId: string;
            flightPlaceType: "CITY" | "AIRPORT";
            localizedName: string;
        };
        relevantHotelParams: {
            entityId: string;
            entityType: "CITY";
            localizedName: string;
        };
    };
}
