import './WhatsAppButton.css'

const WHATSAPP_NUMBER = '251904686868'
const DEFAULT_MESSAGE = encodeURIComponent("Hello Meki Batu Union, I'd like to inquire about...")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg
        className="whatsapp-btn__icon"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.004L2 22l5.143-1.348A9.957 9.957 0 0 0 12.01 22c5.507 0 9.99-4.478 9.99-9.984 0-2.668-1.037-5.176-2.924-7.062A9.92 9.92 0 0 0 12.012 2zm5.72 14.152c-.244.688-1.42 1.309-1.96 1.373-.507.06-1.157.086-3.327-.798-2.775-1.13-4.542-3.953-4.68-4.137-.138-.184-1.12-1.492-1.12-2.846 0-1.354.707-2.017.96-2.287.253-.27.553-.338.737-.338.184 0 .368.002.53.01.173.007.404-.066.634.485.244.586.83 2.028.9 2.173.07.145.115.316.023.499-.092.183-.138.298-.276.459-.138.161-.29.36-.414.483-.138.138-.282.288-.12.565.161.276.716 1.182 1.54 1.916 1.06.942 1.954 1.234 2.23 1.372.276.138.437.115.598-.069.161-.184.69-.805.874-1.08.184-.276.368-.23.621-.138.253.092 1.61.758 1.886.896.276.138.46.207.529.322.069.115.069.666-.175 1.354z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
