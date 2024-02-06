import { useState } from "react";
import { MenuItemTypes } from "@/types/menu.types";

export default function MenuItem(props: MenuItemTypes): React.ReactNode {
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
          <ul>
            {props.subItems?.map((subItem) => (
              <a href="#" key={subItem.id}>
                <li>{subItem.title}</li>
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
