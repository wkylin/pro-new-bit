import React, { ReactNode } from 'react';
import { Input } from 'antd';
// import "antd/lib/button/style/css"

export type ButtonProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Button({ children }: ButtonProps) {
  return (
    <div>
      <Input defaultValue="2333" />
      {children}
    </div>
  );
}
