import React from 'react'

// Props estándar para todos los iconos, permite pasar clases, etc.
type IconProps = React.HTMLAttributes<HTMLElement> & {
  className?: string
}

// Crea un componente de icono base para no repetir el `<i>`
const createIcon = (remixIconClass: string): React.FC<IconProps> => {
  const IconComponent: React.FC<IconProps> = ({ className, ...props }) => (
    <i className={`${remixIconClass} ${className || ''}`} {...props} />
  )

  IconComponent.displayName = remixIconClass.replace(/ri-|-line/g, '') // Nombre para DevTools

  return IconComponent
}

// Iconos que necesitas según tu código de referencia
export const ArrowLeftIcon = createIcon('ri-arrow-left-line')
export const ChevronDownIcon = createIcon('ri-arrow-down-s-line')
export const ChevronUpIcon = createIcon('ri-arrow-up-s-line')
export const PencilSquareIcon = createIcon('ri-pencil-line')
export const ChatBubbleLeftRightIcon = createIcon('ri-chat-1-line')
export const CalendarDaysIcon = createIcon('ri-calendar-todo-line')
export const EnvelopeIcon = createIcon('ri-mail-line')
export const ListBulletIcon = createIcon('ri-list-unordered')
export const PaperAirplaneIcon = createIcon('ri-send-plane-2-line')
