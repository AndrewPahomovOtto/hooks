import {Dispatch, ReactElement, SetStateAction, useCallback, useState} from 'react'
import {createPortal} from 'react-dom'

const useAction = (
  fn: Dispatch<SetStateAction<boolean>>,
  args: SetStateAction<boolean>,
) => useCallback(() => fn(args), [fn, args])

/**
 * Returns a component that renders its children in Portal.
 *
 * @remarks
 * Also returns methods for managing the visibility of the popup, as well as for getting its status.
 */
export function usePopup(initial = false) {
  const [isShown, setIsShown] = useState(initial)

  const Popup = useCallback(
    (props: {children: ReactElement}) => isShown ? createPortal(props.children, document.body) : null,
    [isShown],
  )

  return {
    hide  : useAction(setIsShown, false),
    isShown,
    Popup,
    show  : useAction(setIsShown, true),
    toggle: useAction(setIsShown, !isShown),
  }
}
