export const GithubIcon = ({ size = 24, color = 'currentcolor' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 1024 1024'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z'
        transform='scale(64)'
        fill={color}
      />
    </svg>
  )
}

export const GoogleIcon = ({
  height = undefined,
  width = undefined,
}: {
  height?: number
  width?: number
}) => {
  let w
  let h
  if (width) {
    w = width
    h = width * 1.02
  } else if (height) {
    h = height
    w = height * 0.98
  } else {
    w = 24
    h = 24 * 1.02
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlns:v='https://vecta.io/nano'
      width={w}
      height={h}
      viewBox='0 0 186.69 190.5'
    >
      <g transform='translate(1184.583 765.171)'>
        <path
          clip-path='none'
          mask='none'
          d='M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z'
          fill='#4285f4'
        />
        <path
          clip-path='none'
          mask='none'
          d='M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z'
          fill='#34a853'
        />
        <path
          clip-path='none'
          mask='none'
          d='M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z'
          fill='#fbbc05'
        />
        <path
          d='M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z'
          fill='#ea4335'
          clip-path='none'
          mask='none'
        />
      </g>
    </svg>
  )
}

export const CloseIcon = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 21 21'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        fill='none'
        fill-rule='evenodd'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <path d='m7.5 7.5 6 6' />
        <path d='m13.5 7.5-6 6' />
      </g>
    </svg>
  )
}

export const LeftArrowIcon = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 21 21'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        fill='none'
        fill-rule='evenodd'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        transform='translate(3 6)'
      >
        <path d='m4.499.497-3.999 4.002 4 4.001' />
        <path d='m13.5 4.5h-13' />
      </g>
    </svg>
  )
}

export const MenuIcon = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 21 21'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        fill='none'
        fill-rule='evenodd'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <path d='m4.5 6.5h12' />
        <path d='m4.498 10.5h11.997' />
        <path d='m4.5 14.5h11.995' />
      </g>
    </svg>
  )
}
