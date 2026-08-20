export default function MainLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white py-12">
      {children}
    </main>
  );
}
