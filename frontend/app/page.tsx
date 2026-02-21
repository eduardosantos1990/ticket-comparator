"use client";

import { useEffect, useState } from "react";

interface Ticket {
  park: string;
  title: string;
  vendor: string;
  price: number;
  url: string;
}

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPark, setSelectedPark] = useState<string>("all");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Update this URL to match your backend deployment
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
        const response = await fetch(`${backendUrl}/api/tickets`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const parks = ["all", ...new Set(tickets.map((t) => t.park))];
  const filteredTickets = selectedPark === "all" 
    ? tickets 
    : tickets.filter((t) => t.park === selectedPark);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Orlando Theme Park Ticket Comparator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Compare ticket prices from multiple vendors
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
            {parks.map((park) => (
              <button
                key={park}
                onClick={() => setSelectedPark(park)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPark === park
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {park === "all" ? "All Parks" : park}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading tickets...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">Error: {error}</p>
          </div>
        )}

        {/* Tickets Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                      {ticket.park}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {ticket.vendor}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white line-clamp-2">
                    {ticket.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${ticket.price.toFixed(2)}
                    </div>
                    <a
                      href={ticket.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      View Deal
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No tickets found for the selected filter.
            </p>
          </div>
        )}
      </main>

      <footer className="mt-16 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Ticket Comparator - Compare prices from multiple vendors</p>
          <p className="mt-2">Powered by Vercel Analytics</p>
        </div>
      </footer>
    </div>
  );
}
