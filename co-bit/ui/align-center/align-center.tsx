import React, { ReactNode, version } from 'react'
import styles from './index.module.less'

export type AlignCenterProps = {
  /**
   * a node to be rendered in the special component!!.
   */
  children?: ReactNode
}

export function AlignCenter({ children }: AlignCenterProps) {
  return <div className={styles.alignCenter}>
    <h2>{version}</h2>
    {children}
  </div>
}
