import { AlertTriangle, HeartHandshake, Mail, RefreshCcw, Hammer } from "lucide-react";

const SoftPlayUpdateSection = () => {
  return (
    <section id="softplay-update" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan" />

      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-20 md:py-28 max-w-5xl mx-auto">
        {/* Header badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 border-2 border-neon-pink bg-neon-pink/10 text-neon-pink font-display text-xs md:text-sm tracking-[0.3em] uppercase px-5 py-3 animate-pulse">
            <AlertTriangle className="w-4 h-4" />
            IMPORTANT SOFT PLAY UPDATE
            <AlertTriangle className="w-4 h-4" />
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-center mb-4">
          <span className="text-gradient-neon">A MESSAGE FROM BAZ</span>
        </h2>
        <p className="font-display text-sm md:text-base tracking-[0.3em] text-white/50 text-center mb-10 md:mb-14">
          SOFT PLAY OPENING — HONEST UPDATE
        </p>

        {/* Letter body */}
        <div className="border border-white/10 bg-[#0a0a16] p-6 md:p-10 lg:p-14 space-y-5 font-body text-white/80 text-base md:text-lg leading-relaxed">
          <p className="text-white">Dear Customers,</p>

          <p>
            I am deeply sorry to be writing this message again. Unfortunately the
            <strong className="text-white"> LuxPlay Soft Play will not be opening on the date previously announced.</strong>
          </p>

          <p>
            The truth is we have faced setback after setback on this project. Despite
            our team working late into the night and into the early hours of the morning,
            we have not been able to finish the soft play to the standard and safety
            level our customers deserve.
          </p>

          <p>
            Over the last few weeks we have dealt with a significant water leak, the
            theft of our van keys and door keys, logistical delays and ongoing
            <strong className="text-white"> manpower shortages</strong>. Every time we feel we are
            approaching the finish line, another obstacle appears.
          </p>

          <p>
            I want to take full responsibility. I was overly ambitious and
            underestimated the scale of the project and the resources required to
            complete it within the timeframe I had promised. That is on me, and for
            that I sincerely apologise.
          </p>

          <p>
            This is not for a lack of effort, and it is not for a lack of expertise —
            we have experienced professionals on site working incredibly hard. What we
            need most right now is simply more hands. We are stretched beyond our
            limits and doing everything we can to bring this venue to life for the
            community.
          </p>

          {/* What happens next */}
          <div className="border-l-4 border-neon-pink pl-5 md:pl-6 py-2 my-8 space-y-3">
            <p className="font-display text-xs tracking-[0.3em] text-neon-pink mb-2">
              WHAT HAPPENS NEXT
            </p>
            <ul className="space-y-3 text-white/85">
              <li className="flex gap-3">
                <RefreshCcw className="w-5 h-5 text-neon-cyan shrink-0 mt-1" />
                <span><strong className="text-white">All soft play bookings are automatically cancelled</strong> — you do not need to do anything.</span>
              </li>
              <li className="flex gap-3">
                <RefreshCcw className="w-5 h-5 text-neon-cyan shrink-0 mt-1" />
                <span>Every customer will receive a <strong className="text-white">full refund</strong> (please allow approximately 10–14 days).</span>
              </li>
              <li className="flex gap-3">
                <HeartHandshake className="w-5 h-5 text-neon-green shrink-0 mt-1" />
                <span>As a thank-you for your patience, you will also receive <strong className="text-neon-green">£5 of complimentary arcade credit</strong> to use whenever you visit.</span>
              </li>
              <li className="flex gap-3">
                <HeartHandshake className="w-5 h-5 text-neon-green shrink-0 mt-1" />
                <span>The <strong className="text-white">LuxPlay Arcade is open and stays open</strong> — come down and enjoy it any time.</span>
              </li>
            </ul>
          </div>

          {/* Walk-in plan */}
          <p>
            Once the soft play is fully completed, inspected and ready — which we
            expect to be within the <strong className="text-white">next week or two</strong> —
            we will reopen using a <strong className="text-neon-cyan">walk-in system</strong> instead of
            pre-booked sessions, so no family is ever let down by a fixed date again.
          </p>

          {/* Community appeal */}
          <div className="border-2 border-neon-cyan bg-neon-cyan/5 p-5 md:p-7 my-8">
            <div className="flex items-start gap-3 mb-3">
              <Hammer className="w-6 h-6 text-neon-cyan shrink-0 mt-1" />
              <p className="font-display text-xl md:text-2xl tracking-wider text-neon-cyan glow-cyan">
                A GENUINE APPEAL TO THE COMMUNITY
              </p>
            </div>
            <p className="mb-3">
              We have the skills on site — what we are short on is <strong className="text-white">man power</strong>.
              If you are a <strong className="text-white">builder, labourer, tradesperson, soft play specialist,
              handyperson, electrician, flooring fitter, decorator</strong> — or simply
              someone with relevant experience who can spare a few hours — we would
              be incredibly grateful for your help getting this final stretch over the line.
            </p>
            <a
              href="mailto:luxplayuk@gmail.com?subject=I%20can%20help%20build%20LuxPlay%20Soft%20Play"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest bg-neon-cyan text-[#070710] px-5 py-3 mt-2 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              I CAN HELP — EMAIL US
            </a>
          </div>

          <p>
            To everyone who has been patient and supportive throughout this journey —
            thank you. I am deeply sorry for letting you down again. We have not given
            up, and we will not give up. We are building this for you.
          </p>

          <div className="pt-4">
            <p className="text-white">Sincerely,</p>
            <p className="font-display text-2xl md:text-3xl tracking-wider text-gradient-neon mt-1">BAZ</p>
            <p className="font-display text-xs tracking-[0.3em] text-white/40">LUXPLAY FOUNDER</p>
          </div>
        </div>

        {/* Contact footer */}
        <div className="text-center mt-8">
          <p className="font-body text-white/50 text-sm">
            Questions about your refund or booking? Email{" "}
            <a href="mailto:luxplayuk@gmail.com" className="text-neon-cyan underline font-semibold">
              luxplayuk@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SoftPlayUpdateSection;
