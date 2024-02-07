import { useState } from "react";
import { MenuItemType } from "@/types/menu.types";

export default function MenuItem(props: MenuItemType): React.ReactNode {
  const [subMenuExpanded, setSubMenuExpanded] = useState<boolean>(false);

  const itemClassName = props.focused
    ? "menu_item menu_item--focused"
    : "menu_item";

  const contentClassName = props.menuOpened
    ? "menu_item_content_flex-start"
    : "menu_item_content_center";

  const chevronClassName = subMenuExpanded
    ? "bi bi-chevron-up sub_menu_chevron"
    : "bi bi-chevron-down sub_menu_chevron";

  const items = props.subItems?.map((item) => {
    if ("name" in item) {
      return (
        <a href={`/group/${item.token}`} key={item.id}>
          <li>{item.name}</li>
        </a>
      );
    } else {
      return (
        <a
          href={item.link === null ? item.file?.path : item.link?.url}
          key={item.id}
        >
          <li>{item.title}</li>
        </a>
      );
    }
  });

  return (
    <div className="menu_item_container">
      <div className={`${itemClassName} ${contentClassName}`}>
        <i
          className={props.focused ? props.focusedClassName : props.className}
        />
        {props.menuOpened && <a href="#">{props.title}</a>}
        {props.menuOpened && props.hasSubItems && (
          <i
            className={chevronClassName}
            onClick={() => setSubMenuExpanded(!subMenuExpanded)}
          />
        )}
      </div>
      {props.menuOpened && props.hasSubItems && subMenuExpanded && (
        <div className="sub_menu_item">
          <ul>{items}</ul>
        </div>
      )}
      {props.title === "Mes groupes" && props.menuOpened && (
        <button className="btn_primary menu_button_add_group">
          <i className="bi bi-plus-circle"/>
          <span>Ajouter un groupe</span>
        </button>
      )}
    </div>
  );
}
