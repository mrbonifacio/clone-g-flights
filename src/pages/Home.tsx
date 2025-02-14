import { useEffect, useState } from "react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight, User } from "lucide-react";
import { useSearchAirports } from "@/services/hooks/use-search-airport";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useSearchFlights } from "@/services/hooks/use-search-flights";
import { Airport } from "@/types/airport";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { DetailsOfWebSite } from "@/sections/home/details-of-website";
import { formatDate } from "@/lib/format-date";
import { FlightResults } from "@/sections/home/result-flights";
import { useDebounce } from "@/hooks/use-debonce";

export const Home = () => {
    const [origin, setOrigin] = useState<Airport | null>(null);
    const [destination, setDestination] = useState<Airport | null>(null);
    const [originSearch, setOriginSearch] = useState("");
    const [destinationSearch, setDestinationSearch] = useState("");
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
    const [cabinClass, setCabinClass] = useState<"economy" | "premium_economy" | "business" | "first">("economy");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [sortBy, setSortBy] = useState<"price_high" | "fastest" | "outbound_take_off_time" | "outbound_landing_time" | "return_take_off_time" | "return_landing_time">("price_high");
    const { data: airports, fetchAirports } = useSearchAirports();
    const { fetchFlights, data: flightResults, loading: flightLoading } = useSearchFlights();

    // Debounce para evitar múltiplas chamadas à API enquanto o usuário digita
    const debouncedOriginSearch = useDebounce(originSearch, 300);
    const debouncedDestinationSearch = useDebounce(destinationSearch, 300);

    // Efeito para buscar os aeroportos apenas após o debounce
    useEffect(() => {
        if (debouncedOriginSearch.length > 2) fetchAirports(debouncedOriginSearch);
    }, [debouncedOriginSearch]);

    useEffect(() => {
        if (debouncedDestinationSearch.length > 2) fetchAirports(debouncedDestinationSearch);
    }, [debouncedDestinationSearch]);

    const handleAirportSelect = (airport: Airport, type: "origin" | "destination") => {
        if (type === "origin") {
            setOrigin(airport);
            setOriginSearch(airport.presentation.title); // Define o nome do aeroporto selecionado
        } else {
            setDestination(airport);
            setDestinationSearch(airport.presentation.title);
        }
    };

    const handleSearchFlights = () => {
        if (!origin || !destination || !dateRange.from) {
            alert("Por favor, selecione origem, destino e uma data válida.");
            return;
        }

        const flightParams = {
            originSkyId: origin.navigation.relevantFlightParams.skyId,
            destinationSkyId: destination.navigation.relevantFlightParams.skyId,
            originEntityId: origin.navigation.entityId,
            destinationEntityId: destination.navigation.entityId,
            date: formatDate(dateRange.from),
            returnDate: formatDate(dateRange.to),
            cabinClass,
            adults,
            childrens: children,
            infants,
            sortBy,
        };

        fetchFlights(flightParams);
    };

    return (
        <div className="h-screen place-items-center p-2">
            <h1 className="text-3xl sm:text-6xl m-8">Flights</h1>
            <div className="absolute right-4 top-4">
                <ModeToggle />
            </div>

            <div
                className="flex flex-col gap-2 bg-gray-300 bg-opacity-15 dark:bg-gray-900 dark:bg-opacity-15 p-4 rounded-xl max-w-[80%]"
            >
                <div
                    className="flex flex-wrap sm:flex items-center justify-center sm:justify-start gap-2 relative"
                >
                    <Select
                        value={cabinClass}
                        onValueChange={(value) =>
                            setCabinClass(
                                value as "economy" | "premium_economy" | "business" | "first"
                            )}
                    >
                        <SelectTrigger className="w-auto">Classe</SelectTrigger>
                        <SelectContent>
                            <SelectItem value="economy">Econômica</SelectItem>
                            <SelectItem value="premium_economy">Premium Econômica</SelectItem>
                            <SelectItem value="business">Executiva</SelectItem>
                            <SelectItem value="first">Primeira Classe</SelectItem>
                        </SelectContent>
                    </Select>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex items-center">
                                <User className="w-4 h-4" />
                                <span>
                                    {adults + children + infants}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[250px] p-4 space-y-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Adultos</label>
                                <Input
                                    type="number"
                                    min={1}
                                    value={adults}
                                    onChange={(e) => setAdults(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Crianças</label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={children}
                                    onChange={(e) => setChildren(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Bebês</label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={infants}
                                    onChange={(e) => setInfants(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Select value={sortBy}
                        onValueChange={(value) =>
                            setSortBy(
                                value as "price_high" | "fastest" | "outbound_take_off_time" | "outbound_landing_time" | "return_take_off_time" | "return_landing_time"
                            )}
                    >
                        <SelectTrigger className="w-auto">Ordenar por</SelectTrigger>
                        <SelectContent>
                            <SelectItem value="price_high">Maior Preço</SelectItem>
                            <SelectItem value="fastest">Mais Rápido</SelectItem>
                            <SelectItem value="outbound_take_off_time">Saída Ida</SelectItem>
                            <SelectItem value="outbound_landing_time">Chegada Ida</SelectItem>
                            <SelectItem value="return_take_off_time">Saída Volta</SelectItem>
                            <SelectItem value="return_landing_time">Chegada Volta</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div
                    className="flex flex-wrap sm:flex items-center justify-center gap-2 relative"
                >
                    <div className="flex gap-2 items-center relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Input
                                    className="max-w-[200px] z-10"
                                    type="text"
                                    placeholder="Origem"
                                    value={originSearch}
                                    onChange={(e) => setOriginSearch(e.target.value)}
                                />
                            </PopoverTrigger>
                            {originSearch.length > 2 && (
                                <PopoverContent className="w-full max-w-[200px] z-50">
                                    {flightLoading ? (
                                        <p className="text-sm text-gray-500 p-2">Carregando...</p>
                                    ) : (airports?.data ?? []).length > 0 ? (
                                        <ul className="max-h-48 overflow-auto">
                                            {airports?.data.map((airport) => (
                                                <li
                                                    key={airport.navigation.entityId}
                                                    className="p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    onClick={() => handleAirportSelect(airport, "origin")}
                                                >
                                                    {airport.presentation.suggestionTitle}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 p-2">Nenhum aeroporto encontrado</p>
                                    )}
                                </PopoverContent>
                            )}
                        </Popover>

                        <ArrowLeftRight className="max-w-12 max-h-12" />

                        <Popover>
                            <PopoverTrigger asChild>
                                <Input
                                    className="max-w-[200px] z-10"
                                    type="text"
                                    placeholder="Destino"
                                    value={destinationSearch}
                                    onChange={(e) => setDestinationSearch(e.target.value)}
                                />
                            </PopoverTrigger>
                            {destinationSearch.length > 2 && (
                                <PopoverContent className="w-full max-w-[200px] z-50">
                                    {flightLoading ? (
                                        <p className="text-sm text-gray-500 p-2">Carregando...</p>
                                    ) : (airports?.data ?? []).length > 0 ? (
                                        <ul className="max-h-48 overflow-auto">
                                            {airports?.data.map((airport) => (
                                                <li
                                                    key={airport.navigation.entityId}
                                                    className="p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    onClick={() => handleAirportSelect(airport, "destination")}
                                                >
                                                    {airport.presentation.suggestionTitle}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 p-2">Nenhum aeroporto encontrado</p>
                                    )}
                                </PopoverContent>
                            )}
                        </Popover>
                    </div>

                    <DatePickerWithRange onChange={setDateRange} />

                </div>
                <Button onClick={handleSearchFlights}>Buscar Voos</Button>
            </div>

            <FlightResults flightResults={flightResults} flightLoading={flightLoading} />

            <DetailsOfWebSite />

            <footer className="mt-6 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};
