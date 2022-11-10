import React from 'react';
              import styles from 'wui-react.module.less';
export type WuiReactProps = {
  /**
   * a text to be rendered in the component.
   */
  text: string
};

export function WuiReact({ text }: WuiReactProps) {
  return (
    <div>
      {text}
    </div>
  );
}