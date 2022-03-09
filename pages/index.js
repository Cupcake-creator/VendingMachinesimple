import ClientContent from "../components/ClientContent";
import ClientSidebar from "../components/ClientSidebar";
import { useState } from "react";

export default function Home() {
  const [buttons, setbuttons] = useState("");

  return (
    <>

      <ClientSidebar setvalbtn={setbuttons} />
      <ClientContent valbtn={buttons} />

    </>
  );
}
