export interface FlightSearchParams {
    originSkyId: string;
    destinationSkyId: string;
    originEntityId: string;
    destinationEntityId: string;
    date?: string;
    returnDate?: string;
    cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
    adults: number;
    childrens?: number;
    infants?: number;
    sortBy: 'price_high' | 'fastest' | 'outbound_take_off_time' | 'outbound_landing_time' | 'return_take_off_time' | 'return_landing_time';
    currency?: 'USD';
    market?: 'en-US';
    countryCode?: 'US';
}

export interface FlightsResponseData {
    status: boolean;
    timestamp: number;
    sessionId: string;
    data: {
        context: {
            status: string;
            totalResults: number;
        };
        itineraries: Record<number, Itinerary>;
        messages: string[];
        filterStats: {
            duration: {
                min: number;
                max: number;
            };
            airports: Record<number, Airport>;
            carriers: Record<number, Carrier>;
            stopPrices: {
                direct: PriceInfo;
                one: PriceInfo;
                twoOrMore: PriceInfo;
            };
        };
    };
}

interface Itinerary {
    id: string;
    price: Price;
    legs: Leg[];
    farePolicy: FarePolicy;
    eco: Eco;
    tags: Tags;
}

interface Price {
    raw: number;
    formatted: string;
}

interface Leg {
    id: string;
    origin: AirportDetails;
    destination: AirportDetails;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string; // ISO 8601
    arrival: string; // ISO 8601
    timeDeltaInDays: number;
    carriers: CarrierDetails[];
    segments: Segment[];
}

interface AirportDetails {
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
}

interface CarrierDetails {
    id: number;
    logoUrl: string;
    name: string;
    operationType: string;
}

interface Segment {
    id: string;
    origin: Location;
    destination: Location;
    departure: string; // ISO 8601
    arrival: string; // ISO 8601
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: Carrier;
    operatingCarrier: Carrier;
}

interface Location {
    flightPlaceId: string;
    displayCode: string;
    parent: LocationParent;
    name: string;
    type: string;
}

interface LocationParent {
    flightPlaceId: string;
    displayCode: string;
}

interface FarePolicy {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
}

interface Eco {
    ecoContenderDelta: number;
}

interface Tags {
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
    tags: string[];
}

interface Airport {
    id: string;
    name: string;
    city: string;
}

interface Carrier {
    id: number;
    logoUrl: string;
    name: string;
}

interface PriceInfo {
    isPresent: boolean;
    formattedPrice: string;
}
