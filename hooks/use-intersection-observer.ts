import 'intersection-observer'
import {useEffect, useRef} from 'react'

/**
 * Use IntersectionObserver on client side
 *
 * @returns
 * MutableRefObject<HTMLDivElement>
 */
export const useIntersectionObserver = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
  const ioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const iOTargetElement = ioRef.current

    if(!iOTargetElement) {
      return
    }

    const io = new IntersectionObserver(callback, options)
    io.observe(iOTargetElement)
    return () => io.unobserve(iOTargetElement)
  }, [callback, ioRef, options])

  return {ioRef}
}
