import waterFlow from '../../assets/motifs/water-flow.svg'
import './SectionDivider.css'

export default function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <img src={waterFlow} alt="" />
    </div>
  )
}
