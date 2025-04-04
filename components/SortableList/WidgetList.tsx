import { View } from "../Themed";
import Tile from "./Tile";

const tiles = [
  {
    id: "spent",
  },
  {
    id: "cashback",
  },
  {
    id: "recent",
  },
  {
    id: "cards",
  },
];

const WidgetList = () => {
  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 15,
        width: "100%",
      }}
    >
      {[...tiles].map((tile, index) => (
        <Tile
          onLongPress={() => true}
          key={tile.id + "-" + index}
          id={tile.id}
        />
      ))}
    </View>
  );
};

export default WidgetList;
