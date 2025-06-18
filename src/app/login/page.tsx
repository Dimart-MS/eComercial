import Login from '@views/Login'
import { getServerMode } from '@core/utils/serverHelpers'
import AuthLayout from '../(blank-layout-pages)/AuthLayout'
import BlankLayout from '@/@layouts/BlankLayout'

const LoginPage = () => {
  const mode = getServerMode()

  return (
    <AuthLayout>
      <BlankLayout>
        <Login mode={mode} />
      </BlankLayout>
    </AuthLayout>
  )
}

export default LoginPage
