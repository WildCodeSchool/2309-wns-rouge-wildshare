import { useState } from "react";
import MenuItem from "../molecules/menuItem";
import {
  SubFavRessourcesItemsTypes,
  SubGroupsItemsTypes,
} from "@/types/menu.types";

export default function Menu(): React.ReactNode {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const subGroupsItems: SubGroupsItemsTypes[] = [
    {
      id: "1",
      title: "Groupe 1",
    },
    {
      id: "2",
      title: "Nom de groupe super long pour voir le résultat",
    },
    {
      id: "3",
      title: "Hello Groupe",
    },
  ];

  const subFavRessourcesItems: SubFavRessourcesItemsTypes[] = [
    {
      id: "1",
      title: "Ressources images",
      link: "#",
    },
    {
      id: "2",
      title: "Ressources PDF",
      link: "#",
    },
    {
      id: "3",
      title: "Ressources Excel",
      link: "#",
    },
  ];

  return (
    <menu
      className={
        menuOpened
          ? "menu_container menu_container--opened"
          : "menu_container menu_container--closed"
      }
    >
      <div className="menu_wrapper">
        <MenuItem
          title="Mon dashboard"
          menuOpened={menuOpened}
          focused={true}
          focusedClassName="bi bi-person-fill"
          className="bi bi-person"
          hasSubItems={false}
        />
        <MenuItem
          title="Mes groupes"
          menuOpened={menuOpened}
          focused={false}
          focusedClassName="bi bi-person-fill"
          className="bi bi-people"
          hasSubItems={subGroupsItems.length > 0}
          subItems={subGroupsItems}
        />
        <MenuItem
          title="Mes ressources favorites"
          menuOpened={menuOpened}
          focused={false}
          className="bi bi-star"
          focusedClassName="bi bi-star-fill"
          hasSubItems={subFavRessourcesItems.length > 0}
          subItems={subFavRessourcesItems}
        />
        <button onClick={() => setMenuOpened(!menuOpened)}>
          <i
            className={
              !menuOpened
                ? "bi bi-chevron-double-right"
                : "bi bi-chevron-double-left"
            }
          />
        </button>
      </div>
    </menu>
  );
}
