import storeImg from '../assets/images/resources/store.webp'
import store480 from '../assets/images/resources/store-480w.webp'
import store800 from '../assets/images/resources/store-800w.webp'

import fleetImg from '../assets/images/resources/fleet.webp'
import fleet480 from '../assets/images/resources/fleet-480w.webp'
import fleet800 from '../assets/images/resources/fleet-800w.webp'

import packhouseImg from '../assets/images/resources/packhouse.webp'
import packhouse480 from '../assets/images/resources/packhouse-480w.webp'
import packhouse800 from '../assets/images/resources/packhouse-800w.webp'

import irrigationImg from '../assets/images/resources/irrigation.webp'
import irrigation480 from '../assets/images/resources/irrigation-480w.webp'
import irrigation800 from '../assets/images/resources/irrigation-800w.webp'

import mechanisationImg from '../assets/images/resources/mechanisation_resource.webp'
import mechanisation480 from '../assets/images/resources/mechanisation_resource-480w.webp'
import mechanisation800 from '../assets/images/resources/mechanisation_resource-800w.webp'

import { Warehouse, Truck, Factory, Droplet, Tractor } from 'lucide-react'

export const resources = [
  {
    id: 'central-cold-hub',
    name: 'Cold Storage & Warehousing',
    tag: 'Storage Hub',
    stat: '2,000 Tonnes',
    location: 'Meki Hub',
    desc: 'Multi-chamber temperature-controlled cold rooms and warehouses serving 136 cooperatives.',
    image: storeImg,
    imageSrcSet: `${store480} 480w, ${store800} 800w, ${storeImg} 1535w`,
    icon: Warehouse,
    features: ['Multi-Chamber Cold Rooms', 'Backup Power Supply', 'Direct Coop Intake'],
  },
  {
    id: 'refrigerated-fleet',
    name: 'Refrigerated Transport Fleet',
    tag: 'Cold-Chain Logistics',
    stat: '18+ Logistics Fleet',
    location: 'Rift Valley & Addis Ababa',
    desc: 'Insulated cold-chain trucks and express logistics ensuring farm-gate freshness to final market.',
    image: fleetImg,
    imageSrcSet: `${fleet480} 480w, ${fleet800} 800w, ${fleetImg} 1537w`,
    icon: Truck,
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
    imageSrcSet: `${packhouse480} 480w, ${packhouse800} 800w, ${packhouseImg} 1537w`,
    icon: Factory,
    features: ['Multi-Tier Optical Grading', 'Sanitary Washing Lines', 'GlobalG.A.P Export Cartons'],
  },
  {
    id: 'irrigation-schemes',
    name: 'Lake Ziway Irrigation Schemes',
    tag: 'Water & Irrigation',
    stat: '6,065 Hectares',
    location: 'Dembal Lake Basin',
    desc: 'River-fed electric pumping stations and modern drip systems powering year-round cultivation.',
    image: irrigationImg,
    imageSrcSet: `${irrigation480} 480w, ${irrigation800} 800w, ${irrigationImg} 1537w`,
    icon: Droplet,
    features: ['Electric River Pumping', 'Modern Drip Infrastructure', 'Year-Round Cultivation'],
  },
  {
    id: 'agricultural-mechanization',
    name: 'Agricultural Mechanization & Tractor Fleet',
    tag: 'Farm Mechanization',
    stat: '12+ Heavy Tractors',
    location: 'Meki, Batu & Farm Clusters',
    desc: 'Modern John Deere tractor fleets equipped with heavy-duty disk plows and implements, providing subsidized land preparation, tilling, and ridging for smallholder farmers.',
    image: mechanisationImg,
    imageSrcSet: `${mechanisation480} 480w, ${mechanisation800} 800w, ${mechanisationImg} 1536w`,
    icon: Tractor,
    features: ['Heavy-Duty Disk Plowing', 'Subsidized Member Rates', 'Precision Seedbed Preparation'],
  },
]
