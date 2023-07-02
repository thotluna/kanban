import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { ButtonGroup } from '../button-group'
import { FormEmail } from '../form-auth'
import { Logo } from '~/shared'
import type { AuthActionButton } from '~/auth/types'

type AuthenticationPanelProps = {
  title: string
  href: string
  messageLink: string
  onGithub: () => void
  onGoogle: () => void
  onEmail: () => void
  isLoading: boolean
  action: AuthActionButton
}

export const AuthenticationPanel = component$<AuthenticationPanelProps>(
  ({
    title,
    href,
    messageLink,
    onGithub,
    onGoogle,
    onEmail,
    isLoading,
    action,
  }) => {
    return (
      <article class='max-w-sm bg-slate-700 rounded-2xl p-4 flex flex-col items-center gap-4'>
        <header class=' flex gap-1 flex-col justify-between items-center'>
          <div class='w-16 h-16 bg-slate-500 rounded-full border-2 border-slate-300 flex items-center justify-center '>
            <Logo size={56} />
          </div>
          <h1 class='text-4xl'>{title}</h1>
          <span class='text-sm text-slate-300'>
            Or{' '}
            <Link href={href}>
              <span class='text-green-400'>{messageLink}</span>
            </Link>
          </span>
        </header>
        <ButtonGroup
          onGithub={onGithub}
          onGoogle={onGoogle}
          isLoading={isLoading}
          action={action}
        />
        <FormEmail
          onEmail={onEmail}
          submitTitle={title}
          hasTerms={true}
          isLoading={isLoading}
          action={action}
        />
      </article>
    )
  }
)
