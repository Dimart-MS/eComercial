'use client'

// Next Imports
import Link from 'next/link'


// Third-party Imports
import classnames from 'classnames'


// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  // Solución: fallback si la variable de entorno no existe
  const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL || '/'

  
return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span>{` by `}</span>
        <Link href='https://themeselection.com' target='_blank' className='text-primary'>
          ThemeSelection
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link href='https://themeselection.com/license' target='_blank' className='text-primary'>
            License
          </Link>
          <Link href='https://themeselection.com' target='_blank' className='text-primary'>
            More Themes
          </Link>
          {/* Solución: fallback "/" si docsUrl no existe */}
          <Link href={docsUrl} target='_blank' className='text-primary'>
            Documentation
          </Link>
          <Link
            href={`https://github.com/themeselection/${process.env.NEXT_PUBLIC_REPO_NAME || 'default-repo'}/issues`}
            target='_blank'
            className='text-primary'
          >
            Support
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
