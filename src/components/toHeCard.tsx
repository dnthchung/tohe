import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function ToHeCard() {
  return (
    <Card className="relative w-[320px] h-[512px] rounded-2xl overflow-hidden bg-white shadow-md">
      {/* Background image */}
      <img src="/images/72aa6512-9001-4206-8d8a-c57086aca1ce.png" alt="Ha Long-Cat Ba" className="absolute inset-0 object-cover w-full h-full" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Top-right icon */}
      <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
        <ArrowUpRight className="w-4 h-4 text-black" />
      </div>

      {/* Text content */}
      <CardContent className="absolute bottom-4 left-4 right-4 text-white space-y-2">
        <p className="text-sm">2 days 1 night</p>
        <h2 className="text-xl font-semibold">Ha Long-Cat Ba</h2>
        <p className="text-sm leading-snug">
          Set sail on a cruise through the stunning limestone karsts and emerald waters. Enjoy kayaking, cave exploring, and witnessing a spectacular sunset over the bay.
        </p>
        <p className="text-sm font-semibold mt-2">
          From $300 <span className="text-xs font-normal">PP</span>
        </p>
      </CardContent>
    </Card>
  );
}
