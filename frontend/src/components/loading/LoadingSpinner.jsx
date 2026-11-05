import './LoadingSpinner.css'

export function LoadingSpinner({
    message = 'Loading...',
    size = 'md',          // 'sm' | 'md' | 'lg'
    fullScreen = false
}) {
    return (
        <div className={`loading-wrapper ${fullScreen ? 'fullscreen' : ''}`}>
            <div className={`loading-spinner spinner-${size}`}></div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    )
}

