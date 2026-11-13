import { ArrowUpRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SteveSupportBanner() {
  return (
    <aside className="steve-support-banner" aria-label="Support Steve’s family">
      <Button asChild variant="memorial" className="steve-support-banner-link">
        <a href="https://www.gofundme.com/f/our-superhero-steve" target="_blank" rel="noopener noreferrer">
          <span className="steve-support-banner-message">
            <Heart aria-hidden="true" className="steve-support-banner-heart" />
            <span>Support Steve’s Family – GoFundMe</span>
            <ArrowUpRight aria-hidden="true" />
          </span>
        </a>
      </Button>
    </aside>
  );
}