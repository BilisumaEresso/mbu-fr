import storeImg from '../assets/images/resources/store.webp'
import fleetImg from '../assets/images/resources/fleet.jpg'
import packhouseImg from '../assets/images/resources/packhouse.webp'
import irrigationImg from '../assets/images/resources/irrigation.jpg'

export const resources = [
  {
    id: 'central-cold-hub',
    name: 'Cold Storage & Warehousing',
    tag: 'Storage Hub',
    stat: '2,000 Tonnes',
    location: 'Meki Hub',
    desc: 'Multi-chamber temperature-controlled cold rooms and warehouses serving 153 cooperatives.',
    image: storeImg,
    icon: 'warehouse',
  },
  {
    id: 'refrigerated-fleet',
    name: 'Refrigerated Transport Fleet',
    tag: 'Cold-Chain Logistics',
    stat: '18+ Fleet & Tractors',
    location: 'Rift Valley & Addis Ababa',
    desc: 'Insulated cold-chain trucks and farm tractors ensuring farm-gate freshness to final market.',
    image: fleetImg,
    icon: 'local_shipping',
  },
  {
    id: 'central-packhouse',
    name: 'Central Export Pack House',
    tag: 'Grading & Packaging',
    stat: '50,000t / Year',
    location: 'Meki Pack House',
    desc: 'Standardized grading, sanitary washing, and GlobalG.A.P certified export packaging lines.',
    image: packhouseImg,
    icon: 'factory',
  },
  {
    id: 'irrigation-schemes',
    name: 'Lake Ziway Irrigation Schemes',
    tag: 'Water & Irrigation',
    stat: '600 Hectares',
    location: 'Dembal Lake Basin',
    desc: 'River-fed electric pumping stations and modern drip systems powering year-round cultivation.',
    image: irrigationImg,
    icon: 'water_drop',
  },
]
