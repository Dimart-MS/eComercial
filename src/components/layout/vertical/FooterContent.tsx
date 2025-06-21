'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.footerContent, 'flex items-center gap-4')}>
      <p>
        <span>{`Copyright`}</span>
        <span>{`© ${new Date().getFullYear()} `}</span>
        <Link href='https://sitic.com.mx/' target='_blank' className='text-primary'>
          SITIC.
        </Link>
        <span>{` Todos los derechos Reservados`}</span>
      </p>
    </div>
  )
}

export default FooterContent
