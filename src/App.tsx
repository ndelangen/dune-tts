import { Button, ttsUi, Text, ttsUiFragment } from "@typed-tabletop-simulator/ui";

import { HelloWorld } from "./HelloWorld";

export const App = ({ list }: { list: string[] }) => {
  return (
    <panel width={800} height={800} position={[0, 0, -5]} rotation={[180, 180, 0]}>
      <verticalLayout {...{ childAlignment: "MiddleCenter", childForceExpandHeight: false }}>
        {list.map((item, index) => (
          <text textSize={50} color="White" text={item} />
        ))}
      </verticalLayout>
    </panel>
  );
};
