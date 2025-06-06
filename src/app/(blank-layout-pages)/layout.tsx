// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import { getServerMode } from '@/app/getServerMode'

const Layout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'
  const mode = getServerMode()

  return (
    <Providers direction={direction}>
      <BlankLayout>{children}</BlankLayout>
    </Providers>
  )
}

export default Layout
