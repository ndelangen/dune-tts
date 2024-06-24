import { Button, ttsUi } from "@typed-tabletop-simulator/ui";

import { HelloWorld } from "./HelloWorld";

export const App = () => {
  return (
    <panel color="Yellow" width={200} height={200} active>
      <HelloWorld />
      <Button onClick={() => log("clicked")} text="Click me!" />
    </panel>
  );
};
