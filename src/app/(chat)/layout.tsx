import { ReactNode } from "react";
import { Providers } from "~/components/providers/Providerts";

export default function chatLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Providers>{children}</Providers>
    </div>
  );
}
