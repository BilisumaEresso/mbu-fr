import { useState, useEffect } from 'react'
import './HeroCrossfade.css'

export default function HeroCrossfade({ images = [], interval = 7000, onPlayClick }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    /* respect prefers-reduced-motion — same check as Reveal.jsx */
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!motionOk || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  if (!images.length) return null

  return (
    <div className="hero-crossfade">
      {images.map((img, i) => (
        <img
          key={i}
          className={`hero-crossfade__img${i === current ? ' hero-crossfade__img--active' : ''}`}
          src={img.src}
          alt={img.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
      {onPlayClick && (
        <button
          className="hero-crossfade__play"
          onClick={onPlayClick}
          aria-label="Watch our story"
        >
          <span className="material-symbols-outlined" aria-hidden="true">play_arrow</span>
          <span className="hero-crossfade__play-label">Watch our story</span>
        </button>
      )}
    </div>
  )
}
