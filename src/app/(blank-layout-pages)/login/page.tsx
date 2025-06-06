'use client'

// Component Imports
import Login from '@views/Login'
import App from '../../app'

// Type Imports
import type { Mode } from '@core/types'

interface LoginPageProps {
  mode: Mode
}

const LoginPage = ({ mode }: LoginPageProps) => {
  return (
    <App>
      <Login mode={mode} />
    </App>
  )
}

export default LoginPage
