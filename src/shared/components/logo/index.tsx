export const Logo = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 121 121'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='60' cy='61' r='60' fill='#72A0B9' />
      <path
        d='M27 58L51 105'
        stroke='#056721'
        stroke-width='15'
        stroke-linecap='round'
      />
      <path
        d='M51 105.251L112.694 8'
        stroke='#056721'
        stroke-width='15'
        stroke-linecap='round'
      />
    </svg>
  )
}
