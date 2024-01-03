import InputForm from "./InputForm";

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="w-full py-6 px-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Instant Review
          </h1>
        </div>
      </header>
      <main className="flex-1 py-10">
        <div className="container mx-auto space-y-6">
          <InputForm />
          <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Review
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The review will appear here once you enter a link and select a
              platform.
            </p>
          </div>
        </div>
      </main>
      <footer className="w-full py-4 px-4 bg-white dark:bg-gray-800 shadow-md mt-auto">
        <div className="container mx-auto flex items-center justify-center">
          <p className="text-gray-700 dark:text-gray-300">© Instant Review</p>
        </div>
      </footer>
    </div>
  );
}
