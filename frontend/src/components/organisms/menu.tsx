import { useState } from "react";
import MenuItem from "../molecules/menuItem";
import { GroupType } from "@/types/group.types";
import { RessourceType } from "@/types/ressources.types";

export default function Menu(): React.ReactNode {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const groupItems: GroupType[] = [
    {
      id: 1,
      name: "Groupe 1",
      description: "Lorem ipsum",
      token: 1234,
      created_at: new Date(),
      created_by_id: 1,
      updated_at: new Date(),
      update_by_id: 1,
    },
    {
      id: 2,
      name: "Nom de groupe super long pour voir le résultat",
      description: "Lorem ipsum",
      token: 1234,
      created_at: new Date(),
      created_by_id: 2,
      updated_at: new Date(),
      update_by_id: 2,
    },
    {
      id: 3,
      name: "Hello Groupe",
      description: "Lorem ipsum",
      token: 1234,
      created_at: new Date(),
      created_by_id: 1,
      updated_at: new Date(),
      update_by_id: 1,
    },
  ];

  const ressourceItems: RessourceType[] = [
    {
      id: 1,
      title: "Bookmarks",
      description: "Nouveau bookmark",
      image: null,
      file: null,
      link: {
        id: 1,
        title: "Bookmarks",
        url: "https://www.google.fr",
        created_at: new Date(),
        created_by_id: 1,
        updated_at: new Date(),
        update_by_id: 1,
      },
      isFavorite: true,
      created_at: new Date(),
      created_by_id: 1,
      updated_at: new Date(),
      update_by_id: 1,
    },
    {
      id: 1,
      title: "Mon portfolio",
      description: "Mon super portfolio",
      image: null,
      file: null,
      link: {
        id: 1,
        title: "portfolio",
        url: "https://www.google.fr",
        created_at: new Date(),
        created_by_id: 1,
        updated_at: new Date(),
        update_by_id: 1,
      },
      isFavorite: true,
      created_at: new Date(),
      created_by_id: 1,
      updated_at: new Date(),
      update_by_id: 1,
    },
    {
      id: 1,
      title: "Road Trip Europe",
      description: "Mon super plan de voyage en Europe",
      image: null,
      link: null,
      file: {
        id: 1,
        title: "portfolio",
        type: "pdf",
        path: "https://www.google.fr",
        created_at: new Date(),
        created_by_id: 1,
        updated_at: new Date(),
        update_by_id: 1,
      },
      isFavorite: true,
      created_at: new Date(),
      created_by_id: 1,
      updated_at: new Date(),
      update_by_id: 1,
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
          hasSubItems={groupItems.length > 0}
          subItems={groupItems}
        />
        <MenuItem
          title="Mes ressources favorites"
          menuOpened={menuOpened}
          focused={false}
          className="bi bi-star"
          focusedClassName="bi bi-star-fill"
          hasSubItems={ressourceItems.length > 0}
          subItems={ressourceItems}
        />
        <button id="menu_wrapper_button" onClick={() => setMenuOpened(!menuOpened)}>
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
