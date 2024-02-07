import { GroupType } from "./group.types";
import { RessourceType } from "./ressources.types";

export type MenuItemType = {
  title: string;
  menuOpened: boolean;
  focused: boolean;
  focusedClassName: string;
  className: string;
  hasSubItems: boolean;
  subItems?: GroupType[] | RessourceType[];
};
