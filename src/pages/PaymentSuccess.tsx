import { Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <main className="min-h-screen bg-[#070710] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center border border-neon-green/30 bg-[#0a0a16] p-10 md:p-14">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/10 flex items-center justify-center">
          <Check className="w-10 h-10 text-neon-green" />
        </div>

        <h1
          className="font-display text-4xl md:text-5xl tracking-wider text-neon-green mb-4"
          style={{ textShadow: "0 0 20px rgba(170,255,0,0.3)" }}
        >
          PAYMENT CONFIRMED
        </h1>

        <p className="font-body text-white/70 text-base md:text-lg mb-3">
          Your LuxPlay credits have been secured! 🎮
        </p>

        <p className="font-body text-white/50 text-sm mb-8">
          You'll receive a confirmation email with your order details shortly.
          Present this at the venue on opening day to load your credits onto your play card.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-[#070710] bg-neon-green px-8 py-3 hover:shadow-[0_0_30px_rgba(170,255,0,0.4)] transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO LUXPLAY
        </Link>
      </div>
    </main>
  );
};

export default PaymentSuccess;
