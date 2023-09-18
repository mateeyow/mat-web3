export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { type = 'button', children , isDisabled = false} = props

  const _onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(evt)
    }
  }

  return (
    <button disabled={isDisabled} onClick={_onClick} type={type}>{children}</button>
  )
}
