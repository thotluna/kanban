import { component$, Slot } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

export enum BUTTON_TYPE {
  SUBMIT = 'submit',
  BUTTON = 'button',
  LINK = 'link',
}

export interface ButtonProps {
  type?: string
  id?: string
  classText?: string | undefined
  disabled?: boolean
  accent?: boolean
  href?: string | undefined

  onClick?: () => void
}

export const Button = component$<ButtonProps>(
  ({
    id,
    classText,
    type = BUTTON_TYPE.BUTTON,
    disabled = false,
    accent = false,
    href,
    onClick,
  }) => {
    const basicStyle =
      'border-emerald-700 text-emerald-400 hover:border-emerald-300 hover:text-slate-700 hover:bg-emerald-500   '
    const accentStyle =
      'border-emerald-500 bg-emerald-500 text-slate-700 hover:bg-emerald-400 hover:border-emerald-400'
    const disabledStyle =
      'border-slate-500 bg-transparent text-slate-400 cursor-not-allowed '

    return (
      <>
        {type === BUTTON_TYPE.BUTTON && (
          <button
            id={id}
            class={[
              'px-8 py-2 font-semibold border-2 rounded-md transition-colors duration-150 disabled:border-slate-500 disabled:bg-transparent disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-1',
              accent ? accentStyle : basicStyle,
              classText,
            ]}
            onClick$={onClick}
            disabled={disabled}
          >
            <Slot />
          </button>
        )}
        {type === BUTTON_TYPE.LINK && (
          <Link
            id={id}
            class={[
              'px-8 py-2 font-semibold border-2 rounded-md transition-colors duration-150 flex items-center justify-center gap-1',
              disabled ? disabledStyle : accent ? accentStyle : basicStyle,
              classText,
            ]}
            href={href}
          >
            <Slot />
          </Link>
        )}
      </>
    )
  }
)
