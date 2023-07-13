import { component$ } from '@builder.io/qwik'
import { AUTH_ACTIONS } from '~/auth'
import { Button, GithubIcon, GoogleIcon, Spinner } from '~/shared'
import type { AuthActionButton } from '~/auth'

export interface ButtonGroupProps {
  action: AuthActionButton
  onAuthGithub: () => void
  onAuthGoogle: () => void
  isLoading?: boolean
}

export const ButtonGroup = component$<ButtonGroupProps>(
  ({ action, onAuthGithub, onAuthGoogle, isLoading = false }) => {
    return (
      <div
        data-test-id='btn-group'
        class='w-full flex items-center justify-center gap-1'
      >
        <Button onClick={onAuthGithub} disabled={isLoading}>
          <div class='flex items-center gap-2'>
            {isLoading && action === AUTH_ACTIONS.GITHUB && <Spinner />}
            {isLoading && action !== AUTH_ACTIONS.GITHUB && <GithubIcon />}
            {!isLoading && <GithubIcon />}
            Github
          </div>
        </Button>
        <Button onClick={onAuthGoogle} disabled={isLoading}>
          <div class='flex items-center gap-2'>
            {isLoading && action === AUTH_ACTIONS.GOOGLE && <Spinner />}
            {isLoading && action !== AUTH_ACTIONS.GOOGLE && (
              <picture class='grayscale'>
                <GoogleIcon height={24} />
              </picture>
            )}
            {!isLoading && <GoogleIcon height={24} />}
            Google
          </div>
        </Button>
      </div>
    )
  }
)
