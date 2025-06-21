// MUI Imports
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
          <SubMenu label='Información' icon={<i className='ri-database-2-line' />}>
            <MenuItem href='/panel/contactos'>Contactos</MenuItem>
            <MenuItem href='/panel/empresas'>Empresas</MenuItem>
            <MenuItem href='/panel/productos-y-Serivicios'>Productos y Servicios</MenuItem>
            <MenuItem href='/panel/clasificaciones'>Clasificaciones</MenuItem>
            <MenuItem href='/panel/diccionarios'>Diccionarios</MenuItem>
          </SubMenu>
        </MenuSection>

        <MenuSection label='Comunicación'>
          <MenuItem href='/panel/chat' icon={<i className='ri-wechat-line' />}>
            Chat
          </MenuItem>
          <MenuItem href='/panel/agenda' icon={<i className='ri-calendar-line' />}>
            Agenda
          </MenuItem>
          <MenuItem href='/panel/email' icon={<i className='ri-mail-open-line' />}>
            Email
          </MenuItem>
          <MenuItem href='/panel/kanban' icon={<i className='ri-user-settings-line' />}>
            Kanban
          </MenuItem>
          <MenuItem href='/panel/lia' icon={<i className='ri-robot-2-line' />}>
            LIA
          </MenuItem>
        </MenuSection>

        <MenuSection label='Operaciones'>
          <MenuItem href='/panel/cotizaciones' icon={<i className='ri-file-list-line' />}>
            Cotizaciones
          </MenuItem>
          <MenuItem href='/panel/cotizacion' icon={<i className='ri-clipboard-line' />}>
            Pedidos
          </MenuItem>
          <MenuItem href='/panel/cotizacion' icon={<i className='ri-numbers-line' />}>
            Ventas
          </MenuItem>
          <MenuItem href='/panel/cotizacion' icon={<i className='ri-file-text-line' />}>
            Facturación
          </MenuItem>
          <SubMenu label='Métodos de Pago' icon={<i className='ri-bill-line' />}>
            <MenuItem href='/panel/openpay'>OpenPay</MenuItem>
            <MenuItem href='/panel/mercadopago'>Mercado Pago</MenuItem>
          </SubMenu>
        </MenuSection>
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
  { label: 'Contactos', href: '/panel/contactos', type: 'submenu', parent: 'Gestión de Datos' },
  { label: 'Empresas', href: '/panel/empresas', type: 'submenu', parent: 'Gestión de Datos' },
  {
    label: 'Productos y Servicios',
    href: '/panel/productos-y-Serivicios',
    type: 'submenu',
    parent: 'Gestión de Datos'
  },
  { label: 'Clasificaciones', href: '/panel/clasificaciones', type: 'submenu', parent: 'Gestión de Datos' },
  { label: 'Diccionarios', href: '/panel/diccionarios', type: 'submenu', parent: 'Gestión de Datos' },
  { label: 'Chat', href: '/panel/chat', type: 'menu' },
  { label: 'Agenda', href: '/panel/agenda', type: 'menu' },
  { label: 'Email', href: '/panel/email', type: 'menu' },
  { label: 'Kanban', href: '/panel/kanban', type: 'menu' },
  { label: 'Cotizaciones', href: '/panel/cotizaciones', type: 'menu' },
  { label: 'Pedidos', href: '/panel/cotizacion', type: 'menu' },
  { label: 'Ventas', href: '/panel/cotizacion', type: 'menu' },
  { label: 'Facturación', href: '/panel/cotizacion', type: 'menu' },
  { label: 'OpenPay', href: '/panel/openpay', type: 'submenu', parent: 'Métodos de Pago' },
  { label: 'Mercado Pago', href: '/panel/mercadopago', type: 'submenu', parent: 'Métodos de Pago' }
]

export default VerticalMenu
