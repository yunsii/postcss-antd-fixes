import React from 'react'

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: IButtonProps) {
  const { children, ...rest } = props

  return <button {...rest}>{children}</button>
}
