import React, { ReactNode, version } from 'react';

export type SayHelloProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
  /**
   * background color
   */
  backgroundColor?: string;
};

export function SayHello({ children,backgroundColor = '#fff' }: SayHelloProps) {
  return (
    <div style ={{backgroundColor}}>
      <div>React: v{version}</div>
      <div>bit lane</div>
      {children}
    </div>
  );
}
