export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick?: (_: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { type = 'button', children , isDisabled = false, isLoading = false, className = '' } = props

  const _onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(evt)
    }
  }

  const text = isLoading ? 'Loading...' : children;
  const isCursorPointer = !isDisabled && !isLoading;
  const _isDisabled = isDisabled || isLoading;

  return (
    <button className={`${isCursorPointer ? 'cursor-pointer' : 'cursor-default'} p-4 border-white border shadow-pixel m-1 ${className}`} disabled={_isDisabled} onClick={_onClick} type={type}>{text}</button>
  )
}
