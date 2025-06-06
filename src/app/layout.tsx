// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
// Type Imports
import type { ChildrenType } from '@core/types'
// Style Imports
import '@/app/globals.css'
// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
// Providers Mui
import Providers from '@components/Providers'

export const metadata = {
  title: 'Demo: Materio - NextJS Dashboard Free',
  description:
    'Develop next-level web apps with Materio Dashboard Free - NextJS. Now, updated with lightning-fast routing powered by MUI and App router.'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'
  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers direction={direction}>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
