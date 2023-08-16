/* eslint-disable no-console */
import { useEffect } from 'react'

export default function useConsole() {
  useEffect(() => {
    console.log('onMount')

    return () => {
      console.log('onUnmount')
    }
  }, [])
}
