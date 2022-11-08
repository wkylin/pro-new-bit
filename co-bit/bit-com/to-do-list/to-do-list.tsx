import React, { ReactNode, version } from 'react';

export type ToDoListProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function ToDoList({ children }: ToDoListProps) {
  return (
    <div>
      <div>React: vv{ version }</div>
      {children}
    </div>
  );
}
