import React, { useState, useEffect, useCallback, useMemo } from 'react'

import type { UserType } from '@/types/user'

// --- Icon Definitions (Remixicon style) ---
const AddIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z' />
  </svg>
)

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z' />
  </svg>
)

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M13.1716 12.0007L8.22183 7.05093L9.63604 5.63672L16 12.0007L9.63604 18.3646L8.22183 16.9504L13.1716 12.0007Z' />
  </svg>
)

const CheckboxBlankIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5Z' />
  </svg>
)

const CheckboxFillIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM19 19V5H5V19H19ZM16.0002 9.30334L11.7575 13.546L10.3433 12.1318L8.92907 13.546L11.7575 16.3744L17.4144 10.7175L16.0002 9.30334Z' />
  </svg>
)

// --- Types ---
type CalendarView = 'month' | 'week' | 'day' | 'list'
type EventType = 'viewAll' | 'personal' | 'business' | 'family' | 'holiday' | 'etc'

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  type: EventType
  color: string // Tailwind bg color class e.g., 'bg-blue-500'
}

interface EventFilterItem {
  id: EventType
  label: string
  color: string // Tailwind bg color class for the checkbox dot
  isChecked: boolean
}

const EVENT_TYPE_COLORS: Record<Exclude<EventType, 'viewAll'>, string> = {
  personal: 'bg-red-400',
  business: 'bg-blue-500',
  family: 'bg-green-500',
  holiday: 'bg-yellow-400',
  etc: 'bg-purple-500'
}

// --- Sample Data ---
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: "Doctor's Appointment",
    start: new Date(2025, 5, 19, 10, 0),
    end: new Date(2025, 5, 19, 11, 0),
    type: 'personal',
    color: EVENT_TYPE_COLORS.personal
  },
  {
    id: '2',
    title: 'Meeting With Client',
    start: new Date(2025, 5, 19, 14, 0),
    end: new Date(2025, 5, 19, 15, 30),
    type: 'business',
    color: EVENT_TYPE_COLORS.business
  },
  {
    id: '3',
    title: '4p Design Review',
    start: new Date(2025, 5, 20, 16, 0),
    end: new Date(2025, 5, 20, 17, 0),
    type: 'business',
    color: EVENT_TYPE_COLORS.business
  },
  {
    id: '4',
    title: 'Family Trip',
    start: new Date(2025, 5, 21),
    end: new Date(2025, 5, 22),
    allDay: true,
    type: 'family',
    color: EVENT_TYPE_COLORS.family
  },
  {
    id: '5',
    title: 'Dart Game?',
    start: new Date(2025, 5, 17, 18, 0),
    end: new Date(2025, 5, 17, 19, 0),
    type: 'etc',
    color: EVENT_TYPE_COLORS.etc
  },
  {
    id: '6',
    title: 'Dinner',
    start: new Date(2025, 5, 17, 20, 0),
    end: new Date(2025, 5, 17, 21, 30),
    type: 'personal',
    color: EVENT_TYPE_COLORS.personal
  },
  {
    id: '7',
    title: 'Monthly Meeting',
    start: new Date(2025, 6, 1, 9, 0),
    end: new Date(2025, 6, 1, 10, 30),
    type: 'business',
    color: EVENT_TYPE_COLORS.business
  }
]

const initialFilters: EventFilterItem[] = [
  { id: 'viewAll', label: 'View All', color: 'bg-gray-700', isChecked: true },
  { id: 'personal', label: 'Personal', color: EVENT_TYPE_COLORS.personal, isChecked: true },
  { id: 'business', label: 'Business', color: EVENT_TYPE_COLORS.business, isChecked: true },
  { id: 'family', label: 'Family', color: EVENT_TYPE_COLORS.family, isChecked: true },
  { id: 'holiday', label: 'Holiday', color: EVENT_TYPE_COLORS.holiday, isChecked: true },
  { id: 'etc', label: 'ETC', color: EVENT_TYPE_COLORS.etc, isChecked: true }
]

// --- Date Utils ---
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay() // 0 = Sunday

const addMonths = (date: Date, months: number) => {
  const d = new Date(date)

  d.setMonth(d.getMonth() + months)

  return d
}

const addDays = (date: Date, days: number) => {
  const d = new Date(date)

  d.setDate(d.getDate() + days)

  return d
}

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()

const isToday = (date: Date) => isSameDay(date, new Date())

const formatEventTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })

interface AgendaContentProps {
  user: UserType
}

const AgendaContent: React.FC<AgendaContentProps> = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 20)) // June 20, 2025
  const [currentView, setCurrentView] = useState<CalendarView>('month')
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)
  const [eventFilters, setEventFilters] = useState<EventFilterItem[]>(initialFilters)

  const filteredEvents = useMemo(() => {
    const activeFilterTypes = eventFilters.filter(f => f.isChecked && f.id !== 'viewAll').map(f => f.id)

    if (
      eventFilters.find(f => f.id === 'viewAll' && f.isChecked) ||
      activeFilterTypes.length === eventFilters.length - 1
    ) {
      return events
    }

    return events.filter(event => activeFilterTypes.includes(event.type))
  }, [events, eventFilters])

  const handlePrev = () => {
    if (currentView === 'month') setCurrentDate(prev => addMonths(prev, -1))
    else if (currentView === 'week') setCurrentDate(prev => addDays(prev, -7))
    else if (currentView === 'day') setCurrentDate(prev => addDays(prev, -1))
  }

  const handleNext = () => {
    if (currentView === 'month') setCurrentDate(prev => addMonths(prev, 1))
    else if (currentView === 'week') setCurrentDate(prev => addDays(prev, 7))
    else if (currentView === 'day') setCurrentDate(prev => addDays(prev, 1))
  }

  const handleFilterChange = (filterId: EventType) => {
    setEventFilters(prevFilters => {
      if (filterId === 'viewAll') {
        const newState = !prevFilters.find(f => f.id === 'viewAll')?.isChecked

        return prevFilters.map(f => ({ ...f, isChecked: newState }))
      }

      const newFilters = prevFilters.map(f => (f.id === filterId ? { ...f, isChecked: !f.isChecked } : f))
      const allOthersChecked = newFilters.filter(f => f.id !== 'viewAll').every(f => f.isChecked)

      return newFilters.map(f => (f.id === 'viewAll' ? { ...f, isChecked: allOthersChecked } : f))
    })
  }

  const renderHeader = () => {
    let dateDisplay = ''

    if (currentView === 'month') dateDisplay = currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' })
    else if (currentView === 'week') {
      const startOfWeek = addDays(currentDate, -currentDate.getDay())
      const endOfWeek = addDays(startOfWeek, 6)

      dateDisplay = `${startOfWeek.toLocaleDateString([], { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString([], { day: 'numeric', year: 'numeric' })}`
    } else if (currentView === 'day')
      dateDisplay = currentDate.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    else dateDisplay = currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' }) // List view shows month

    const viewButtons: { id: CalendarView; label: string }[] = [
      { id: 'month', label: 'Month' },
      { id: 'week', label: 'Week' },
      { id: 'day', label: 'Day' },
      { id: 'list', label: 'List' }
    ]

    return (
      <div className='flex items-center justify-between p-4 border-b border-gray-200'>
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => console.log('Add Event Clicked')}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center'
          >
            <AddIcon className='w-5 h-5 mr-2' /> Add Event
          </button>
        </div>
        <div className='flex items-center space-x-2'>
          <button onClick={handlePrev} className='p-2 rounded-md hover:bg-gray-100'>
            <ChevronLeftIcon className='w-6 h-6 text-gray-600' />
          </button>
          <h2 className='text-xl font-semibold text-gray-700 w-52 text-center'>{dateDisplay}</h2>
          <button onClick={handleNext} className='p-2 rounded-md hover:bg-gray-100'>
            <ChevronRightIcon className='w-6 h-6 text-gray-600' />
          </button>
        </div>
        <div className='flex items-center space-x-1 bg-gray-100 p-1 rounded-md'>
          {viewButtons.map(btn => (
            <button
              key={btn.id}
              onClick={() => setCurrentView(btn.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${currentView === btn.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderMiniCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInThisMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const dayCells = Array(firstDay)
      .fill(null)
      .concat(Array.from({ length: daysInThisMonth }, (_, i) => i + 1))

    const today = new Date()

    return (
      <div className='p-4'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-sm font-semibold text-gray-700'>
            {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <div className='flex'>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, -1))}
              className='p-1 hover:bg-gray-100 rounded'
            >
              <ChevronLeftIcon className='w-4 h-4 text-gray-500' />
            </button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className='p-1 hover:bg-gray-100 rounded'>
              <ChevronRightIcon className='w-4 h-4 text-gray-500' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1'>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className='grid grid-cols-7 gap-1'>
          {dayCells.map((day, i) => (
            <button
              key={i}
              onClick={() => day && setCurrentDate(new Date(year, month, day))}
              disabled={!day}
              className={`p-1.5 text-xs rounded-full hover:bg-blue-100 focus:outline-none
                ${!day ? 'invisible' : ''}
                ${day && isSameDay(new Date(year, month, day), currentDate) ? 'bg-blue-600 text-white' : 'text-gray-700'}
                ${day && isToday(new Date(year, month, day)) && !isSameDay(new Date(year, month, day), currentDate) ? 'text-blue-600 font-bold ring-1 ring-blue-500' : ''}
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderEventFilters = () => (
    <div className='p-4 border-t border-gray-200'>
      <h3 className='text-sm font-semibold text-gray-700 mb-3'>Event Filters</h3>
      <div className='space-y-2'>
        {eventFilters.map(filter => (
          <label
            key={filter.id}
            className='flex items-center space-x-2 cursor-pointer text-sm text-gray-600 hover:text-gray-800'
          >
            <input
              type='checkbox'
              checked={filter.isChecked}
              onChange={() => handleFilterChange(filter.id)}
              className='opacity-0 absolute h-0 w-0' // Hide actual checkbox
            />
            {filter.isChecked ? (
              <CheckboxFillIcon
                className={`w-5 h-5 ${filter.id === 'viewAll' ? 'text-gray-700' : filter.color.replace('bg-', 'text-')}`}
              />
            ) : (
              <CheckboxBlankIcon className='w-5 h-5 text-gray-400' />
            )}
            <span>{filter.label}</span>
          </label>
        ))}
      </div>
    </div>
  )

  const renderMonthView = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInThisMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const dayCells = []

    for (let i = 0; i < firstDay; i++) dayCells.push({ key: `empty-${i}`, date: null })
    for (let i = 1; i <= daysInThisMonth; i++) dayCells.push({ key: `day-${i}`, date: new Date(year, month, i) })

    const today = new Date()
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
      <div className='flex-grow flex flex-col'>
        <div className='grid grid-cols-7 border-b border-gray-200'>
          {daysOfWeek.map(day => (
            <div key={day} className='p-2 text-center text-xs font-medium text-gray-500 uppercase'>
              {day}
            </div>
          ))}
        </div>
        <div className='grid grid-cols-7 grid-rows-5 flex-grow'>
          {dayCells.map(cell => (
            <div
              key={cell.key}
              className={`border-r border-b border-gray-200 p-2 ${cell.date ? 'min-h-[100px]' : 'bg-gray-50'}`}
            >
              {cell.date && (
                <>
                  <span
                    className={`text-xs ${isToday(cell.date) ? 'bg-blue-600 text-white rounded-full px-1.5 py-0.5' : 'text-gray-700'}`}
                  >
                    {cell.date.getDate()}
                  </span>
                  <div className='mt-1 space-y-1'>
                    {filteredEvents
                      .filter(e => isSameDay(e.start, cell.date as Date))
                      .slice(0, 2)
                      .map(event => (
                        <div key={event.id} className={`${event.color} text-white text-xs p-1 rounded truncate`}>
                          {event.title}
                        </div>
                      ))}
                    {filteredEvents.filter(e => isSameDay(e.start, cell.date as Date)).length > 2 && (
                      <div className='text-xs text-gray-500 text-right mt-1'>
                        + {filteredEvents.filter(e => isSameDay(e.start, cell.date as Date)).length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Placeholder for other views
  const renderWeekView = () => <div className='p-6 text-center text-gray-500'>Week View - Placeholder</div>
  const renderDayView = () => <div className='p-6 text-center text-gray-500'>Day View - Placeholder</div>
  const renderListView = () => <div className='p-6 text-center text-gray-500'>List View - Placeholder</div>

  const renderCalendarView = () => {
    switch (currentView) {
      case 'month':
        return renderMonthView()
      case 'week':
        return renderWeekView()
      case 'day':
        return renderDayView()
      case 'list':
        return renderListView()
      default:
        return renderMonthView()
    }
  }

  return (
    <div className='bg-white rounded-xl shadow-lg flex flex-col h-full'>
      {renderHeader()}
      <div className='flex flex-grow overflow-hidden'>
        <div className='w-64 border-r border-gray-200 flex-shrink-0 flex flex-col'>
          {renderMiniCalendar()}
          {renderEventFilters()}
        </div>
        <div className='flex-grow flex flex-col overflow-auto'>{renderCalendarView()}</div>
      </div>
    </div>
  )
}

export default AgendaContent
