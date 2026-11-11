"use client";

import Cal from "@calcom/embed-react";

const CAL_LINK = "https://cal.com/mohammad-hassnain-abbas-jckt0j/30min";

export function MeetingSection() {
  return (
    <section
      id="meetings"
      className="section relative overflow-hidden"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="section-header mb-10">
        <h2 className="text-heading text-foreground mb-2">Book a Meeting</h2>
      </div>
      <div className="glass p-8 md:p-12 rounded-2xl max-w-md mx-auto">
        <div className="w-full max-w-xs mx-auto">
          <Cal
            calLink={CAL_LINK}
            config={{
              "ui.color-scheme": "dark",
              theme: "dark",
              branding: { brandColor: "#00f2ff" },
            }}
            className="w-full max-h-[600px] overflow-y-auto"
          />
        </div>
      </div>
    </section>
  );
}
