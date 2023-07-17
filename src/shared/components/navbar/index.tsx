import { $, component$, Slot, useSignal } from '@builder.io/qwik'

type NavbarProps = {
  avatarUrl?: string
}

export const Navbar = component$<NavbarProps>(({ avatarUrl }) => {
  const isOpen = useSignal(false)

  const handlerOnClick = $(() => {
    isOpen.value = false
  })

  return (
    <header class='relative w-full py-2 px-4 md:px-8 flex items-center justify-between bg-slate-700 lg:flex-row lg:min-w-max lg:justify-between'>
      <h2 class='text-2xl font-semibold lg:text-3xl'>Kanban-Qwik</h2>
      <div class=' flex items-center justify-between lg:w-auto'>
        <nav
          onClick$={handlerOnClick}
          class={[
            `absolute  w-full left-0 z-10 bg-slate-700  flex flex-col items-center transition-all duration-1000 [&>*]:p-2 ${
              isOpen.value ? 'top-[100%]' : 'top-[-200%]'
            } `,
            'lg:relative lg:w-auto lg:flex-row lg:flex lg:top-0 ',
            { hidden: !isOpen.value },
          ]}
        >
          <Slot />
        </nav>
        <div class='flex items-center gap-1'>
          <button
            class={[
              'inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-400',
              'lg:hidden',
            ]}
            aria-controls='mobile-menu'
            aria-expanded='false'
            onClick$={() => (isOpen.value = !isOpen.value)}
          >
            <span class='sr-only'>Open main menu</span>

            {!isOpen.value && (
              <svg
                class={[' h-6 w-6', { hidden: isOpen.value }]}
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            )}

            {isOpen.value && (
              <svg
                class={['h-6 w-6', { hidden: !isOpen.value }]}
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            )}
          </button>
          <picture class='w-8 h-8 rounded-full overflow-hidden border border-emerald-500 bg-emerald-500'>
            {avatarUrl && (
              <img class='w-8 h-8' width={24} height={24} src={avatarUrl}></img>
            )}
          </picture>
        </div>
      </div>
    </header>
  )
})
