import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600 opacity-20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Aarchi Gupta
          </span>
        </h2>

        <p className="mt-6 text-gray-400 text-lg max-w-2xl">
          I build intelligent full-stack applications combining modern frontend 
          engineering with AI-powered backend systems.
          Focused on scalable architecture, clean design, and smart automation.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            View Projects
          </button>

          <button className="px-6 py-3 border border-gray-600 hover:border-blue-500 rounded-lg transition">
            Contact Me
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;