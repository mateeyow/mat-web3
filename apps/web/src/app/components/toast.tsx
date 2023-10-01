import hotToast from 'react-hot-toast'

export const toast = (message: string) => {
  return hotToast.custom((t) => (
    <div className={`${t.visible ? 'animate-slide-in' : 'animate-leave'} m-1 p-2 border-white border shadow-pixel bg-white`}>
      <p className='text-primary text-xs'>
        {message}
      </p>
    </div>
  ))
}
