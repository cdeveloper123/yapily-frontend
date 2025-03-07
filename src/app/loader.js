export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  );
}
