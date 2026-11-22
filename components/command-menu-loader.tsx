"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { MenuData } from "./command-menu";

const Menu = dynamic(() => import("./command-menu").then((m) => m.CommandMenu), { ssr: false });

/** Loads the ⌘K palette (and cmdk) only on first use, so it costs nothing on page load. */
export function CommandMenuLoader({ data }: { data: MenuData }) {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (load) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setLoad(true);
      }
    };
    const onOpen = () => setLoad(true);
    addEventListener("keydown", onKey);
    addEventListener("sm:cmdk", onOpen);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("sm:cmdk", onOpen);
    };
  }, [load]);
  return load ? <Menu data={data} initialOpen /> : null;
}
