import Navbar from "./layouts/Navbar";
import Hero from "./sections/Hero";
import ChatButton from "./components/ChatButton";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 max-w-6xl mx-auto px-6">
        <Hero />
        <ChatButton />
      </main>
    </div>
  );
}

export default App;