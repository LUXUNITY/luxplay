import { Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import stevePhoto from "@/assets/steve-memorial.jpg.asset.json";

const tribute = [
  "It is with the heaviest of hearts that we share the devastating loss of our beloved manager and dear friend, Steve.",
  "Steve wasn’t just the manager of Lux Play. He was one of the very best things about this place.",
  "From the very beginning, Steve helped us build Lux Play from the ground up. He gave us his time, his energy and his heart, even while facing his own health challenges. His strength, courage and determination were unlike anything we have ever witnessed.",
  "He was an absolute gentleman. Always smiling, always laughing, always making everybody around him feel happier. He never complained, never made excuses and never hesitated to help. No matter how long the day or how difficult the work, Steve was always there, giving everything he had.",
  "He was caring, loving, incredibly hardworking and one of the bravest, strongest men we have ever had the privilege of knowing.",
  "But above everything else, Steve was a family man. He worked tirelessly, loved his family deeply and did everything he could to look after the people he loved.",
  "Steve helped make Lux Play what it is today. He brought laughter, kindness and a sense of family into this place that no amount of money could ever buy.",
  "We have lost far more than a manager. We have lost a truly wonderful man, a dear friend and an irreplaceable part of our Lux Play family.",
];

export default function SteveMemorial({ full = false }: { full?: boolean }) {
  return (
    <section id="remembering-steve" className="steve-memorial" aria-labelledby="steve-title">
      <div className="memorial-inner">
        {full && <Button asChild variant="link" className="memorial-back"><Link to="/"><ArrowLeft /> Back to LuxPlay</Link></Button>}
        <header className="memorial-header">
          <span className="memorial-candle" aria-hidden="true">🕯️</span>
          <p className="memorial-eyebrow">Forever part of the LuxPlay family</p>
          <h1 id="steve-title">In Loving Memory of <span>Steve <Heart aria-label="love" /></span></h1>
          <p className="memorial-subtitle">Our Manager. Our Friend. Our Family.</p>
        </header>
        <div className="memorial-story">
          <figure className="memorial-photo">
            <img src={stevePhoto.url} alt="Steve at LuxPlay, surrounded by the arcade he helped build" fetchPriority="high" />
            <figcaption>Steve, at the place he helped bring to life.</figcaption>
          </figure>
          <div className="memorial-words">
            {(full ? tribute : tribute.slice(0, 3)).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {!full && <p>He brought laughter, kindness and a sense of family into this place that no amount of money could ever buy.</p>}
            <blockquote>Steve, we will never forget you. Thank you for everything you gave us. We love you, mate. <span aria-label="love">❤️</span></blockquote>
            {!full && <Button asChild variant="link" className="memorial-read"><Link to="/remembering-steve">Read our full tribute to Steve <ArrowRight /></Link></Button>}
          </div>
        </div>
        <div className="memorial-support">
          <Heart className="memorial-support-heart" aria-hidden="true" />
          <h2>Please Help Us Support Steve’s Family</h2>
          <p>Steve spent his life looking after the people he loved. Now, in his absence, we want to do everything we can to look after them.</p>
          {full && <p>His family are facing an incredibly difficult time, both emotionally and financially. We are asking our wonderful community to come together and help support them with funeral expenses and the difficult road ahead.</p>}
          <p>Whether you can spare £1, £5, £10 or £100, every single contribution will mean something. No donation is too small.</p>
          <Button variant="memorial" disabled className="memorial-donate"><Heart /> Support Steve’s Family – GoFundMe</Button>
          <p className="memorial-note">The family’s GoFundMe link will be shared here soon.</p>
          <p>And if you’re unable to donate, simply sharing this page would mean the world.</p>
          {full && <p className="memorial-closing">Steve gave so much to everyone around him. Now it’s our turn to give something back.</p>}
        </div>
      </div>
    </section>
  );
}