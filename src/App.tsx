import { Button, ttsUi, Text, ttsUiFragment } from "@typed-tabletop-simulator/ui";

export const App = ({ list, showButton, onClick }: { list: string[]; showButton?: boolean; onClick?: Function }) => {
  return (
    <panel width={800} height={800} position={[0, 0, -5]} rotation={[180, 180, 0]}>
      <verticalLayout {...{ childAlignment: "MiddleCenter", childForceExpandHeight: false, spacing: 20 }}>
        {list.map((item, index) => (
          <text textSize={50} color="White" text={item} />
        ))}
      </verticalLayout>
      {showButton ? (
        <panel
          position={[0, -800, 0]}
          height={100}
          color="Blue"
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        >
          <text textSize={50} color="White" text={"START GAME"} />
        </panel>
      ) : (
        <panel position={[0, -800, 0]} height={100} />
      )}
    </panel>
  );
};
