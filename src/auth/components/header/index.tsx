import { component$ } from '@builder.io/qwik'
import { Logo } from '~/shared'

export interface HeaderProps {
  title: string
  link: string
  linkComment: string
}

export const Header = component$<HeaderProps>(
  ({ title, link, linkComment }) => {
    return (
      <header class='flex flex-col items-center gap-1 bg-slate-700'>
        <div class='w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center'>
          <Logo size={64} />
        </div>
        <h1 class='text-4xl'>{title}</h1>
        <span class='text-sm text-emerald-200'>
          Or <a href={link}>{linkComment}</a>
        </span>
      </header>
    )
  }
)
