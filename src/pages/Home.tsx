import { DatePickerWithRange } from "@/components/date-range-picker";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";

export const Home = () => {
    return (
        <div className="h-screen place-items-center p-2">
            <h1 className="text-3xl sm:text-6xl m-8">Flights</h1>
            <div className="absolute right-4 top-4">
                <ModeToggle />
            </div>

            <div className="flex flex-wrap sm:flex items-center justify-center gap-2">
                <div className="flex gap-2 items-center">
                    <Input
                        className="max-w-[200px]"
                        type="text"
                        placeholder="Origem"
                    />
                    <ArrowLeftRight className="max-w-12 max-h-12" />
                    <Input
                        className="max-w-[200px]"
                        type="text"
                        placeholder="Destino"
                    />
                </div>
                <DatePickerWithRange />
            </div>
        </div>
    );
};