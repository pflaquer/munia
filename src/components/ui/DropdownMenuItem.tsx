import { Key, useRef } from 'react';
import { useMenuItem } from 'react-aria';
import { TreeState } from 'react-stately';
import type { Node } from '@react-types/shared';
import { cn } from '@/lib/cn';

interface MenuItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  onAction: (key: Key) => void;
  onClose: () => void;
}

export function DropdownMenuItem<T>({
  item,
  state,
  onAction,
  onClose,
}: MenuItemProps<T>) {
  // Get props for the menu item element
  let ref = useRef(null);
  let { menuItemProps, isDisabled } = useMenuItem(
    {
      key: item.key,
      onAction,
      onClose,
    },
    state,
    ref,
  );

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  let isFocused = state.selectionManager.focusedKey === item.key;
  let focusBg = item.key === 'delete' ? 'bg-red-500' : 'bg-violet-500';
  let focus = isFocused ? `${focusBg} text-white` : 'text-gray-900';

  return (
    <li
      {...menuItemProps}
      ref={ref}
      className={cn(
        `relative cursor-default select-none px-6 py-2 focus:outline-none`,
        focus,
        isDisabled && 'opacity-50',
      )}
    >
      {item.rendered}
    </li>
  );
}
