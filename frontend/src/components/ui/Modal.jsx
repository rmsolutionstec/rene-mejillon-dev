import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
export default function Modal({ open, onClose, title, children }) {
  const dialog = useRef(null)
  const close = useRef(onClose)
  const titleId = useId()
  useEffect(() => { close.current = onClose }, [onClose])
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const element = dialog.current
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element.showModal()
    return () => {
      element.close()
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open])
  if (!open) return null
  return createPortal(<dialog ref={dialog} aria-labelledby={titleId}
    onCancel={(event) => { event.preventDefault(); close.current() }}
    onClick={(event) => { if (event.target === event.currentTarget) close.current() }}
    className="w-[calc(100%-2rem)] max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl p-0 text-white-text bg-black-secondary border border-gray-border backdrop:bg-black/80">
    <div className="p-5 sm:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <h2 id={titleId} className="text-xl font-bold">{title}</h2>
        <button type="button" onClick={onClose} aria-label="Cerrar diálogo" className="btn-ghost px-3 py-1">✕</button>
      </div>{children}
    </div>
  </dialog>, document.body)
}
