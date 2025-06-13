// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import AuthLayout from './AuthLayout'

const Layout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <AuthLayout>
        <BlankLayout>{children}</BlankLayout>
      </AuthLayout>
    </Providers>
  )
}

export default Layout
