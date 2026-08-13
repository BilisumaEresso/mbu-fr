import { useState } from 'react'
import './InnerPage.css'

const OUTLETS_DATA = [
  {
    id: 'bole',
    name: 'Bole Branch',
    address: 'Around Edna Mall, next to Zefmesh Grand Mall, Addis Ababa',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  },
  {
    id: 'piassa',
    name: 'Piassa Outlet',
    address: 'Mahmoud Music Shop building ground floor, Piassa, Addis Ababa',
    hours: 'Mon - Sat: 8:00 AM - 5:30 PM',
  },
  {
    id: 'sarbet',
    name: 'Sarbet Market',
    address: 'Karls Square, near Oromia Offices, Sarbet, Addis Ababa',
    hours: 'Mon - Sun: 7:00 AM - 7:00 PM',
  },
  {
    id: 'kera',
    name: 'Kera Branch',
    address: 'Near Kera Slaughterhouse main road, Addis Ababa',
    hours: 'Mon - Sat: 6:00 AM - 4:00 PM',
  },
  {
    id: 'megenagna',
    name: 'Megenagna Store',
    address: 'Zequala Complex ground floor, Megenagna, Addis Ababa',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  },
]

function RetailOutlets() {
  const [selectedOutlet, setSelectedOutlet] = useState(OUTLETS_DATA[0].id)

  return (
    <>
      {/* ---- Hero Section ---- */}
      <section className="outlets-hero section">
        <div className="container outlets-hero__grid">
          <div className="outlets-hero__content">
            <h1 className="outlets-hero__title">Direct from Our Farms to You.</h1>
            <p className="outlets-hero__desc">
              Meki Batu Union operates five dedicated retail outlets across Addis Ababa, ensuring urban consumers have direct access to the freshest, sustainably grown produce from our cooperative farmers.
            </p>
            <div className="outlets-hero__actions">
              <a href="#locations" className="btn btn--primary">
                View Locations <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </a>
            </div>
          </div>
          <div className="outlets-hero__media">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo5eSTBDlwW5UL1G_6eoXkOClfG8CN6qbGiOdzcN9kRuZqJWSPun3J3suSl44BR9L4tN3_yJyhVAgafmnEjyzOdB_izkZcx9hCARIcjhmSkKqgqlEtyE5rK150cjr5nEOTC1MvRnn-vY8lD1WsgLEN5zPPD1VQKOdxueppk2O60WbSqd9_cecHNIG6NQXpy7Ub75NsoYCSjBH6mnRRSultCT8SY9_CPkwqu6zSwxohRp17D02SZTLz"
              alt="Pristine fresh produce display in a modern retail setting"
              className="outlets-hero__img"
            />
            <div className="outlets-hero__badge desktop-only">
              <div className="outlets-hero__badge-num">5</div>
              <div className="outlets-hero__badge-label">Addis Ababa Locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Locations List & Map Section ---- */}
      <section className="outlets-locations section section--alt" id="locations">
        <div className="container">
          <div className="outlets-locations__header">
            <h2 className="outlets-locations__title">Find an Outlet</h2>
            <p className="outlets-locations__desc">
              Visit one of our official union storefronts for verified quality and fair prices.
            </p>
          </div>

          <div className="outlets-locations__grid">
            {/* Outlets List Column */}
            <div className="outlets-list-col">
              {OUTLETS_DATA.map((outlet) => (
                <div
                  key={outlet.id}
                  className={`outlet-item-card ${selectedOutlet === outlet.id ? 'outlet-item-card--active' : ''}`}
                  onClick={() => setSelectedOutlet(outlet.id)}
                >
                  <div className="outlet-item-card__header">
                    <h3 className="outlet-item-card__title">{outlet.name}</h3>
                    <span className="material-symbols-outlined outlet-item-card__icon">storefront</span>
                  </div>
                  <div className="outlet-item-card__info">
                    <p className="outlet-item-card__address">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {outlet.address}
                    </p>
                    <p className="outlet-item-card__hours">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {outlet.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Column */}
            <div className="outlets-map-col">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoNRToErCqwWL-H3_mMI2J22OpFyclHMrQAPBwHexa5T-C19PECsKm7G95f3ZXs9_xmeCMTPKC-htpeNieWmgEIjwMKgsw27Xvi4Zsg9o_0whPZAcaApgLx4foxDm2BThIwqMOQs4elh5WQZ5KnMxIS1bzdfkUyIDdAJBSjTQ_K34XQRTR4HuKa4QeSydKe7ZKCxHZj-4NHYOu1MRF1Tou05zlV_9tyg449jkpg7q8gJ5JWm6J7oQ2"
                alt="Map showing 5 retail outlet locations across Addis Ababa"
                className="outlets-map-img"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RetailOutlets
