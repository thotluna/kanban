import { component$ } from '@builder.io/qwik'
import { AUTH_ACTIONS } from '~/auth/constants'
import type { AuthActionButton } from '~/auth/types'
import { Button, BUTTON_TYPE, GithubIcon, GoogleIcon, Spinner } from '~/shared'

interface ButtonGroupProps {
  onGithub: () => void
  onGoogle: () => void
  isLoading: boolean
  action: AuthActionButton
}

export const ButtonGroup = component$<ButtonGroupProps>(
  ({ onGoogle, onGithub, isLoading, action }) => {
    return (
      <div class='w-full flex justify-between items-center py-1 gap-2'>
        <Button
          classText='w-full'
          type={BUTTON_TYPE.BUTTON}
          onClick={onGithub}
          disabled={isLoading}
        >
          {action !== AUTH_ACTIONS.GITHUB && <GithubIcon size={24} />}
          {action === AUTH_ACTIONS.GITHUB && <Spinner />}
          <span>Github</span>
        </Button>
        <Button
          classText='w-full'
          type={BUTTON_TYPE.BUTTON}
          onClick={onGoogle}
          disabled={isLoading}
        >
          {action === AUTH_ACTIONS.GOOGLE && <Spinner />}
          {action !== AUTH_ACTIONS.GOOGLE && (
            <picture class={!isLoading ? 'grayscale-0' : 'grayscale '}>
              <GoogleIcon width={24} height={24} />
            </picture>
          )}
          Google
        </Button>
      </div>
    )
  }
)
