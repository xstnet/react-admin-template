// 类型断言

export function isLeafMenu(menu: any): menu is Menu.LeafMenuItemType {
  if (typeof menu.children === 'undefined') {
    return true;
  }
  if (Array.isArray(menu.children) && menu.children.length === 0) {
    return true;
  }
  return false;
}

export function isSubMenu(menu: any): menu is Menu.SubMenuType {
  // group 也包含 children
  if (isGroupMenu(menu)) {
    return false;
  }
  if (
    typeof menu.children !== 'undefined' &&
    Array.isArray(menu.children) &&
    menu.children.length > 0
  ) {
    return true;
  }
  return false;
}

export function isExtendMenu(menu: any): menu is Menu.ExtendMenuType {
  if (typeof menu.path === 'string' && typeof menu.label === 'string') {
    return true;
  }
  return false;
}

export function isGroupMenu(menu: any): menu is Menu.MenuItemGroupType {
  if (typeof menu.type !== 'undefined' && menu.type === 'group') {
    return true;
  }
  return false;
}

export function isDividerMenu(menu: any): menu is Menu.MenuDividerType {
  if (typeof menu.type !== 'undefined' && menu.type === 'divider') {
    return true;
  }
  return false;
}
