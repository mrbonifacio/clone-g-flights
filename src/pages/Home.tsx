import { useState } from "react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { useSearchAirports } from "@/services/hooks/use-search-airport";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export const Home = () => {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const { data: airports, fetchAirports, loading } = useSearchAirports();

    const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setOrigin(query);
        if (query.length > 2) fetchAirports(query);
    };

    const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setDestination(query);
        if (query.length > 2) fetchAirports(query);
    };

    return (
        <div className="h-screen place-items-center p-2">
            <h1 className="text-3xl sm:text-6xl m-8">Flights</h1>
            <div className="absolute right-4 top-4">
                <ModeToggle />
            </div>

            <div className="flex flex-wrap sm:flex items-center justify-center gap-2 relative">
                <div className="flex gap-2 items-center relative">
                    {/* Input de Origem com Popover */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Input
                                className="max-w-[200px]"
                                type="text"
                                placeholder="Origem"
                                value={origin}
                                onChange={handleOriginChange}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-full max-w-[200px]">
                            {(airports?.data ?? []).length > 0 ? (
                                <ul className="max-h-48 overflow-auto">
                                    {airports?.data.map((airport) => (
                                        <li
                                            key={airport.navigation.entityId}
                                            className="p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                                            onClick={() => setOrigin(airport.presentation.title)}
                                        >
                                            {airport.presentation.suggestionTitle}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">Nenhum aeroporto encontrado</p>
                            )}
                        </PopoverContent>
                    </Popover>

                    <ArrowLeftRight className="max-w-12 max-h-12" />

                    {/* Input de Destino com Popover */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Input
                                className="max-w-[200px]"
                                type="text"
                                placeholder="Destino"
                                value={destination}
                                onChange={handleDestinationChange}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-full max-w-[200px]">
                            {(airports?.data ?? []).length > 0 ? (
                                <ul className="max-h-48 overflow-auto">
                                    {airports?.data.map((airport) => (
                                        <li
                                            key={airport.navigation.entityId}
                                            className="p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                                            onClick={() => setDestination(airport.presentation.title)}
                                        >
                                            {airport.presentation.suggestionTitle}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">Nenhum aeroporto encontrado</p>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
                <DatePickerWithRange />
            </div>

            {/* Exibir loading enquanto carrega os resultados */}
            {loading && <p className="text-center mt-2">Buscando aeroportos...</p>}
        </div>
    );
};
