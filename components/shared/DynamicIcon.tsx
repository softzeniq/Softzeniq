import * as LucideIcons from "lucide-react";

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // @ts-ignore
  const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
}
