import { Helmet } from "react-helmet-async";
import { Download, Smartphone, Shield, Zap } from "lucide-react";

const APK_URL = "/api/download/apk";

const steps = [
  { icon: Download, text: "Tap Download — your browser will save the file" },
  { icon: Shield, text: 'Open it and tap "Install" — allow unknown sources if prompted' },
  { icon: Zap, text: "Launch AIs & Ears and start talking to Leo" },
];

export default function Install() {
  return (
    <>
      <Helmet>
        <title>Install AIs & Ears — Android</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
        style={{ background: "#121f30" }}
      >
        {/* Icon */}
        <div
          className="w-36 h-36 rounded-3xl overflow-hidden mb-6 shadow-2xl"
          style={{ border: "2px solid #82C4B0" }}
        >
          <img
            src="/icon.jpg"
            alt="AIs & Ears"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1
          className="text-5xl font-light mb-2"
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color: "#e8f4f1" }}
        >
          AIs & Ears
        </h1>
        <p
          className="text-sm tracking-widest uppercase mb-2"
          style={{ fontFamily: "Raleway, sans-serif", color: "#82C4B0" }}
        >
          Android Preview Build
        </p>
        <p
          className="text-base mb-10 max-w-xs"
          style={{ fontFamily: "Raleway, sans-serif", color: "#7a9db0" }}
        >
          Real-time AI voice companion. Leo hears everything — raw, unfiltered.
        </p>

        {/* Download Button */}
        <a
          href={APK_URL}
          className="flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-medium transition-opacity hover:opacity-90 active:opacity-75 mb-12 shadow-lg"
          style={{
            background: "#82C4B0",
            color: "#121f30",
            fontFamily: "Raleway, sans-serif",
            textDecoration: "none",
          }}
        >
          <Download size={22} strokeWidth={2} />
          Download APK
        </a>

        {/* Steps */}
        <div className="flex flex-col gap-5 max-w-xs w-full text-left">
          {steps.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "#172538" }}
              >
                <Icon size={16} style={{ color: "#82C4B0" }} strokeWidth={1.5} />
              </div>
              <p
                className="text-sm leading-relaxed pt-1"
                style={{ fontFamily: "Raleway, sans-serif", color: "#7a9db0" }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="flex items-center gap-2 mt-10">
          <Smartphone size={13} style={{ color: "#4a6b7a" }} />
          <p className="text-xs" style={{ fontFamily: "Raleway, sans-serif", color: "#4a6b7a" }}>
            Requires Android 8.0+ · ~67 MB
          </p>
        </div>
      </div>
    </>
  );
}
