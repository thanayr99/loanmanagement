import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b0034] via-[#29004e] to-[#0b0018] text-white">

      <Navbar />

      {/* MAIN SECTION */}
      <div className="pt-32 px-10 md:px-20 flex flex-col md:flex-row items-center justify-between">

        {/* LEFT */}
        <div className="max-w-xl">
          <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
            Fast • Secure • Trusted
          </span>

          <h1 className="text-6xl font-extrabold leading-tight mt-6">
            The Future of <br />
            <span className="text-pink-500">Online Loans</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-relaxed">
            Get instant loan approvals, automated verification, secure transactions, 
            and 24/7 financial support — all from a single smart platform.
          </p>

          <div className="flex gap-6 mt-8">
            <button className="px-7 py-3 bg-pink-600 rounded-xl font-semibold hover:bg-pink-700 transition shadow-xl shadow-pink-800/30">
              Apply Now
            </button>

            <button className="px-7 py-3 border border-pink-400 text-pink-400 rounded-xl font-semibold hover:bg-pink-500 hover:text-white transition">
              Explore Demo
            </button>
          </div>
        </div>

        {/* RIGHT — LOTTIE */}
        <div className="mt-14 md:mt-0 w-[480px]">
          <DotLottieReact
            src="https://lottie.host/6a203866-5e8c-4b14-9de0-ac86c3750aee/4m4zxi9sPs.lottie"
            loop
            autoplay
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>

      {/* GLASS CARDS SECTION */}
      <div className="mt-32 px-10 md:px-20 pb-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {[ 
            {title:"Fast Approval", txt:"AI-driven verification gives approvals within minutes."},
            {title:"Secure Platform", txt:"Bank-grade encryption keeps your data protected."},
            {title:"24/7 Support", txt:"Get non-stop financial assistance anytime."}
        ].map((c, i) => (
          <div key={i} className="p-7 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/20 transition shadow-xl">
            <h3 className="text-2xl font-bold mb-3">{c.title}</h3>
            <p className="text-gray-300">{c.txt}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
