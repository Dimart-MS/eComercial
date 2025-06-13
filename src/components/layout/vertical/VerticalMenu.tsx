// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuSection label='Información'>
          <MenuItem href='/panel' icon={<i className='ri-layout-4-line' />}>
            Panel
          </MenuItem>
          <SubMenu label='Información' icon={<i className='ri-bill-line' />}>
            <MenuItem href='/panel/contactos'>Contactos</MenuItem>
            <MenuItem href='/panel/empresas'>Empresas</MenuItem>
            <MenuItem href='/panel/diccionarios'>Diccionarios</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label='Comunicación'>
          <MenuItem href='/panel/chat' icon={<i className='ri-calendar-line' />}>
            Chat
          </MenuItem>
          <MenuItem href='/panel/agenda' icon={<i className='ri-drag-drop-line' />}>
            Agenda
          </MenuItem>
          <MenuItem href='/panel/email' icon={<i className='ri-mail-open-line' />}>
            Email
          </MenuItem>
          <MenuItem href='/panel/kanban' icon={<i className='ri-user-settings-line' />}>
            Kanban
          </MenuItem>
          {/* <SubMenu label='Comunicación' icon={<i className='ri-file-copy-line' />}></SubMenu> */}
        </MenuSection>
        <MenuSection label='operaciones'>
          <MenuItem href='/panel/account-settings' icon={<i className='ri-user-settings-line' />}>
            Account Settings
          </MenuItem>
          <MenuItem href='/panel/cotizacion' icon={<i className='ri-wallet-line' />}>
            Cotisación
          </MenuItem>
          {/* <SubMenu label='Auth Pages' icon={<i className='ri-shield-keyhole-line' />}>
            <MenuItem href='/login' target='_blank'>
              Login
            </MenuItem>
            <MenuItem href='/register' target='_blank'>
              Register
            </MenuItem>
            <MenuItem href='/forgot-password' target='_blank'>
              Forgot Password
            </MenuItem>
          </SubMenu> */}
          {/* <MenuItem href='/panel/card-basic' icon={<i className='ri-bar-chart-box-line' />}>
            Cards
          </MenuItem> */}
        </MenuSection>
        {/* <MenuItem href='/panel/form-layouts' icon={<i className='ri-layout-4-line' />}>
            Form Layouts
          </MenuItem> */}
      </Menu>
    </ScrollWrapper>
  )
}

export interface SearchItem {
  label: string
  href: string
  type: 'menu' | 'submenu'
  parent?: string
}

export const flatMenuItems: SearchItem[] = [
  { label: 'Panel', href: '/panel', type: 'menu' },
  { label: 'Contactos', href: '/panel/contactos', type: 'submenu', parent: 'Información' },
  { label: 'Empresas', href: '/panel/empresas', type: 'submenu', parent: 'Información' },
  { label: 'Diccionarios', href: '/panel/diccionarios', type: 'submenu', parent: 'Información' },
  { label: 'Chat', href: '/panel/chat', type: 'menu' },
  { label: 'Agenda', href: '/panel/agenda', type: 'menu' },
  { label: 'Email', href: '/panel/email', type: 'menu' },
  { label: 'Kanban', href: '/panel/kanban', type: 'menu' },
  { label: 'Account Settings', href: '/panel/account-settings', type: 'menu' },
  { label: 'Cotisación', href: '/panel/cotizacion', type: 'menu' }
]

export default VerticalMenu
