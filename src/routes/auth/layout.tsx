import { component$, Slot } from '@builder.io/qwik'
import { AuthButtonProvider } from '~/auth'

export default component$(() => {
  return (
    <AuthButtonProvider>
      <Slot />
    </AuthButtonProvider>
  )
})
