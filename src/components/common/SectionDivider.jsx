import './SectionDivider.css'

export default function SectionDivider({ className = '' }) {
  return (
    <div className={`section-divider ${className}`.trim()} aria-hidden="true">
      <div className="section-divider__line" />
    </div>
  )
}
