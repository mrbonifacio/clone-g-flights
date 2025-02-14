import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BellPlus, CalendarDays, ChartNoAxesCombined } from "lucide-react"

export function DetailsOfWebSite() {
    return (
        <div className="max-w-screen place-items-center mt-8">
            <h2 className="text-xl sm:text-3xl m-4">Useful tools to find the best deals</h2>
            <Accordion type="single" collapsible className="flex flex-col justify-center w-[70%] ">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className="flex sm:items-center gap-4">
                            <CalendarDays className="max-w-12 max-h-12" />
                            <div className="flex flex-col justify-start items-start sm:gap-3 ">
                                <span className="text-[8px] sm:text-sm">
                                    Find the cheapest days to travel
                                </span>
                                <span className="text-[8px] sm:text-sm">
                                    With the date grid and price graph, it's easy to find the best flight deals
                                </span>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-semibold sm:text-base">
                                Useful tools help you choose travel dates
                            </span>
                            <span className="text-[9px] sm:text-[14px]">
                                If your travel plans are flexible, use the form above to search for a specific trip. Then, try the Dates and Price Chart options on the Search page to find the cheapest days to travel to and from your destination, for round-trip flights.
                            </span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <div className="flex sm:items-center gap-4">
                            <ChartNoAxesCombined className="max-w-12 max-h-12" />
                            <div className="flex flex-col justify-start items-start sm:gap-3 ">
                                <span className="text-[8px] sm:text-sm">
                                    Check out the complete overview with pricing information
                                </span>
                                <span className="text-[8px] sm:text-sm">
                                    Price history and trend data shows you when to book to get the best price on your flight
                                </span>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-semibold sm:text-base">
                                Get smart information about flight prices
                            </span>
                            <span className="text-[9px] sm:text-[14px]">
                                Real-time information tells you whether a fare is lower or higher than normal and whether the price is good, so you don’t end up paying too much or missing out on the cheapest time to book. For some routes, you can also see historical data to help you better understand how prices change over time.
                            </span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <div className="flex sm:items-center gap-4">
                            <BellPlus className="max-w-12 max-h-12" />
                            <div className="flex flex-col justify-start items-start sm:gap-3 ">
                                <span className="text-[8px] sm:text-sm">
                                    Monitor the prices of a trip
                                </span>
                                <span className="text-[8px] sm:text-sm">
                                    Don't want to book yet? Track price changes for a specific route or flight and receive notifications when there are reductions.
                                </span>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-semibold sm:text-base">
                                Monitor flight prices to stay up to date with changes
                            </span>
                            <span className="text-[9px] sm:text-[14px]">
                                Track prices on specific dates (or any date if your plans are flexible) and discover the best deals. You can easily set up multi-leg tracking when searching for flights.
                            </span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div >
    )
}
