import { PricingSection } from "@/components/pricing/PricingSection";

interface PackagesTabProps {
  onDemoAccess: (sessionData: any) => void;
}

export function PackagesTab({ onDemoAccess }: PackagesTabProps) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-4">
      <div className="px-6 pt-8 pb-2 text-center">
        <h2 className="text-2xl font-display font-light text-glow mb-1">Uplink Packages</h2>
        <p className="text-sm text-muted-foreground">
          Choose a subscription or a single session. More add-ons coming soon.
        </p>
      </div>
      <PricingSection onDemoAccess={onDemoAccess} />
    </div>
  );
}
