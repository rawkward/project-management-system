import { Header } from "@/shared/ui/header/Header"
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);
