export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick?: (_: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export default function Button(props: ButtonProps) {
  const { type = 'button', children , isDisabled = false, isLoading = false } = props

  const _onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(evt)
    }
  }

  const text = isLoading ? 'Loading...' : children;

  return (
    <button className="cursor-pointer p-4 border-white border shadow-pixel m-1" disabled={isDisabled} onClick={_onClick} type={type}>{text}</button>
  )
}
