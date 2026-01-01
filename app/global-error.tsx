"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="antialiased min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col items-center justify-center p-4 text-center max-w-md mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-4">
            <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Critical Error</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            A critical error occurred preventing the application from loading.
          </p>
          <button
            onClick={() => {
              // try to recover
              reset();
              // fall back to reloading the window if reset doesn't work for global errors sometimes
              window.location.reload();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium text-lg"
          >
            <RotateCw className="w-5 h-5" />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
