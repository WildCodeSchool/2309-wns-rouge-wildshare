export type MenuItemTypes = {
  title: string;
  menuOpened: boolean;
  focused: boolean;
  focusedClassName: string;
  className: string;
  hasSubItems: boolean;
  subItems?: SubGroupsItemsTypes[] | SubFavRessourcesItemsTypes[];
};

export type SubGroupsItemsTypes = {
  id: string;
  title: string;
};

export type SubFavRessourcesItemsTypes = {
  id: string;
  title: string;
  link: string;
};
