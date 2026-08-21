import storeImg from '../assets/images/resources/store.webp'
import fleetImg from '../assets/images/resources/fleet.webp'
import packhouseImg from '../assets/images/resources/packhouse.webp'
import irrigationImg from '../assets/images/resources/irrigation.webp'

export const resources = [
  {
    id: 'central-cold-hub',
    name: 'Cold Storage & Warehousing',
    tag: 'Storage Hub',
    stat: '2,000 Tonnes',
    location: 'Meki Hub',
    desc: 'Multi-chamber temperature-controlled cold rooms and warehouses serving 135 cooperatives.',
    image: storeImg,
    icon: 'warehouse',
    features: ['Multi-Chamber Cold Rooms', 'Backup Power Supply', 'Direct Coop Intake'],
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
    features: ['Active Temperature Control', 'Farm-to-Market Transit', 'Express Logistics Routes'],
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
    features: ['Multi-Tier Optical Grading', 'Sanitary Washing Lines', 'GlobalG.A.P Export Cartons'],
  },
  {
    id: 'irrigation-schemes',
    name: 'Lake Ziway Irrigation Schemes',
    tag: 'Water & Irrigation',
    stat: '5,910 Hectares',
    location: 'Dembal Lake Basin',
    desc: 'River-fed electric pumping stations and modern drip systems powering year-round cultivation.',
    image: irrigationImg,
    icon: 'water_drop',
    features: ['Electric River Pumping', 'Modern Drip Infrastructure', 'Year-Round Cultivation'],
  },
]
