import newsHeroImg from '../assets/images/heroes/newsHero.webp'
import farmerMembershipImg from '../assets/images/community/FarmerMembership.webp'
import buyerHeroImg from '../assets/images/heroes/buyerHero_thumb.webp'
import farmerHeroImg from '../assets/images/heroes/farmerHero.webp'
import womenFarmerImg from '../assets/images/community/womenFarmer.webp'
import aboutHeroFarmImg from '../assets/images/heroes/about_hero_farm.webp'

export const news = [
  {
    id: 1,
    title: 'Record Yields Anticipated for the 2024 Rift Valley Harvest Season',
    category: 'Harvest Report',
    categoryType: 'primary',
    date: 'Oct 15, 2024',
    author: 'Meki Batu Agronomy Team',
    readTime: '4 min read',
    location: 'Meki, Oromia Region',
    desc: "Early reports from across our cooperative network indicate unprecedented yields and exceptional quality profiles for this year's harvest, driven by favorable weather conditions and improved sustainable farming practices implemented earlier this year.",
    excerpt: "Early reports from across our cooperative network indicate unprecedented yields and exceptional quality profiles for this year's harvest.",
    fullContent: [
      "The 2024 harvest season is shaping up to be one of the most prolific in Meki Batu Union's history. Early field audits across our 153 primary member cooperatives indicate a 28% increase in overall crop yield compared to the previous fiscal year.",
      "Favorable rainfall patterns across the Great Rift Valley, paired with modern drip irrigation systems introduced through our union mechanization program, have created optimal growing conditions for both fresh fruit and vegetable crops.",
      "Furthermore, over 12,000 member farmers completed GlobalG.A.P soil management and organic fertilization workshops earlier this spring. This emphasis on soil health has not only boosted output volume but also elevated crop grade metrics across all major export commodities.",
      "Our central packhouses in Meki are currently operating at peak efficiency to process, grade, and package incoming harvests for immediate domestic distribution and international shipment to European trade partners."
    ],
    highlights: [
      '28% overall yield increase verified across member cooperatives',
      'Over 12,000 farmers trained in sustainable soil management',
      'Expanded cold-chain logistics operational for peak season export'
    ],
    img: newsHeroImg,
    featuredLarge: true,
  },
  {
    id: 2,
    title: 'Annual Cooperative Members Summit Concludes',
    category: 'Community',
    categoryType: 'secondary',
    date: 'Oct 12, 2024',
    author: 'Cooperative Governance Board',
    readTime: '3 min read',
    location: 'Addis Ababa, Ethiopia',
    desc: 'Over 500 cooperative leaders gathered to discuss strategic initiatives, resource allocation, and market projections for the upcoming fiscal year.',
    excerpt: 'Over 500 cooperative leaders gathered to discuss strategic initiatives, resource allocation, and market projections.',
    fullContent: [
      "The 2024 Meki Batu Union Annual General Assembly brought together over 500 delegates representing 153 primary agricultural cooperatives across East Shewa Zone.",
      "Key topics addressed during the three-day summit included dividend distribution protocols, bulk seed purchasing programs, and the adoption of modern agricultural technology.",
      "Delegates unanimously approved a new capital reinvestment plan allocating 15% of annual net revenue toward expanding regional storage warehouses and farmer micro-loan funds."
    ],
    highlights: [
      'Over 500 primary cooperative leaders attended',
      '15% capital reinvestment plan approved for storage & infrastructure',
      'Unanimous agreement on dividend distribution framework'
    ],
    img: farmerMembershipImg,
    featuredSmall: true,
  },
  {
    id: 3,
    title: 'New Trade Agreement Secured with European Buyers',
    category: 'Export Update',
    categoryType: 'primary',
    date: 'Oct 05, 2024',
    author: 'Global Export Operations',
    readTime: '5 min read',
    location: 'Frankfurt & Meki',
    desc: 'Meki Batu Union is proud to announce a long-term partnership expanding our premium grade export volume to Scandinavian markets.',
    excerpt: 'Meki Batu Union is proud to announce a long-term partnership expanding our premium grade export volume to Scandinavian markets.',
    fullContent: [
      "Meki Batu Union has formally signed a multi-year supply agreement with major European fresh produce importers, guaranteeing direct trade access for our cooperative farmers.",
      "The agreement covers seasonal shipments of high-grade red tomatoes, green beans, and papaya cultivated strictly under GlobalG.A.P certified protocols.",
      "This partnership reinforces fair trade pricing, providing member farmers with guaranteed minimum price floors above volatile spot market rates."
    ],
    highlights: [
      'Multi-year export contract signed with European import partners',
      'Guaranteed price floors protecting smallholder farmer incomes',
      '100% compliant with international food safety certifications'
    ],
    img: buyerHeroImg,
  },
  {
    id: 4,
    title: 'Expansion of Central Processing Facility Completed',
    category: 'Infrastructure',
    categoryType: 'primary',
    date: 'Sep 28, 2024',
    author: 'Engineering & Logistics',
    readTime: '4 min read',
    location: 'Meki Packhouse Hub',
    desc: 'The newly upgraded facility increases our processing capacity by 30%, ensuring faster turnaround times and improved quality control during peak season.',
    excerpt: 'The newly upgraded facility increases our processing capacity by 30%, ensuring faster turnaround times and improved quality control.',
    fullContent: [
      "Construction and calibration of our upgraded 3,500 square meter central packing and sorting facility in Meki Town has been successfully finalized.",
      "Equipped with automated optical sorting lines and temperature-controlled pre-cooling chambers, the facility can now process up to 150 metric tonnes of produce daily.",
      "The upgrade reduces post-harvest handling loss by an estimated 18%, preserving freshness from harvest field to export vessel."
    ],
    highlights: [
      '30% increase in daily sorting and washing throughput',
      '18% reduction in post-harvest spoilage loss',
      'Integrated cold storage chambers ensuring continuous freshness'
    ],
    img: farmerHeroImg,
  },
  {
    id: 5,
    title: 'Launch of the Women in Agriculture Initiative',
    category: 'Sustainability',
    categoryType: 'secondary',
    date: 'Sep 20, 2024',
    author: 'Social Impact Committee',
    readTime: '3 min read',
    location: 'Oromia Region',
    desc: 'A new seed-funding program designed to empower female cooperative members with micro-loans and specialized agronomy training.',
    excerpt: 'A new seed-funding program designed to empower female cooperative members with micro-loans and specialized agronomy training.',
    fullContent: [
      "Meki Batu Union is proud to unveil the Women in Agriculture Empowerment Program, created to foster gender equity and financial independence among female farmers.",
      "The initiative provides tailored micro-financing packages for greenhouse farming, high-yield seed varieties, and modern irrigation tools.",
      "In addition to financial backing, participants receive hands-on agronomy mentorship and leadership training to support female representation on primary cooperative boards."
    ],
    highlights: [
      'Micro-finance seed funding granted to 250 female farmers',
      'Specialized agronomic and business management training',
      'Promotes female leadership across local primary co-op boards'
    ],
    img: womenFarmerImg,
  },
  {
    id: 6,
    title: 'GlobalG.A.P Renewal Achieved Across 14 Cooperatives',
    category: 'Certification',
    categoryType: 'primary',
    date: 'Sep 15, 2024',
    author: 'Quality Assurance Directorate',
    readTime: '4 min read',
    location: 'Audit Center, Meki',
    desc: 'Our commitment to sustainable and safe agricultural practices has been recognized with the successful renewal of key international certifications.',
    excerpt: 'Our commitment to sustainable and safe agricultural practices has been recognized with the successful renewal of key international certifications.',
    fullContent: [
      "Following rigorous independent third-party audits, Meki Batu Union has officially renewed its GlobalG.A.P (Good Agricultural Practices) certification for the 2024-2025 season.",
      "The certification validates strict compliance with international food safety, chemical residue limits, environmental conservation, and worker welfare standards.",
      "This benchmark allows our produce to be seamlessly accepted by premium supermarket chains across Europe, the Middle East, and Asia."
    ],
    highlights: [
      '100% compliance score across international safety standards',
      'Third-party audit verified traceably from farm to export port',
      'Opens premium international supermarket supply channels'
    ],
    img: aboutHeroFarmImg,
  },
  {
    id: 7,
    title: 'Green Beans Export Operations Expand with New Cold-Chain Links',
    category: 'Export Update',
    categoryType: 'primary',
    date: 'Jun 12, 2024',
    author: 'Agronomy Task Force',
    readTime: '3 min read',
    location: 'Dugda Woreda',
    desc: 'Meki Batu Union scales up export-grade green bean volumes with enhanced field-to-packhouse refrigerated transit.',
    excerpt: 'Meki Batu Union scales up export-grade green bean volumes with enhanced refrigerated transit.',
    fullContent: [
      "Following successful field expansion in the lowlands of Dugda Woreda, Meki Batu Union has scaled up export volume for premium green beans.",
      "Cultivated under controlled drip irrigation, the crop meets stringent European import specifications for freshness, uniform sizing, and residue compliance."
    ],
    highlights: [
      'High-grade green bean export volumes scaled up',
      'Direct contract farming agreements established with 80 smallholders'
    ],
    img: farmerHeroImg,
  },
]
