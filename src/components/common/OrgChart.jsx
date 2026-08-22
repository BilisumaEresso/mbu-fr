import { useState, useRef, useEffect } from 'react'
import { teamMembers } from '../../data/team.js'
import './OrgChart.css'

const ORG_DATA = {
  ga: {
    id: 'ga',
    title: 'General Assembly',
    sub: 'Supreme Governing Body',
    reportsTo: 'Delegate representation of 135 member primary cooperatives',
    icon: 'groups',
    theme: 'green',
    ancestors: [],
    desc: 'The supreme decision-making authority of Meki Batu Union, composed of elected delegate representatives from all 135 primary member cooperatives across East Shewa and Arsi zones.',
    responsibilities: [
      'Supreme statutory and strategic authority over union policy and bylaws',
      'Elects and oversees the Board of Directors and the Control Committee',
      'Approves annual union audit reports and member dividend allocations',
    ],
  },
  bod: {
    id: 'bod',
    title: 'Board of Directors',
    sub: 'Elected Leadership',
    reportsTo: 'Reports directly to General Assembly',
    icon: 'gavel',
    theme: 'green',
    ancestors: ['ga'],
    desc: 'Elected cooperative leaders responsible for strategic union governance, long-term policy formulation, capital investment approvals, and hiring/oversight of executive management.',
    responsibilities: [
      'Strategic governance, multi-year roadmaps, and capital investment decisions',
      'Appointment, performance evaluation, and oversight of the General Manager',
      'Safeguards cooperative assets, member equity, and institutional reputation',
    ],
  },
  cc: {
    id: 'cc',
    title: 'Control Committee',
    sub: 'Internal Oversight',
    reportsTo: 'Reports independently to General Assembly',
    icon: 'verified_user',
    theme: 'green',
    ancestors: ['ga'],
    desc: 'Independent oversight committee elected by members to audit financial health, enforce statutory compliance, verify cooperative bylaws, and ensure organizational transparency.',
    responsibilities: [
      'Independent financial and statutory compliance audits across all union units',
      'Direct statutory reporting line to the General Assembly without management filtering',
      'Verification of cooperative bylaws, asset registers, and procurement ethics',
    ],
  },
  gm: {
    id: 'gm',
    title: 'General Manager',
    sub: 'Chief Executive Officer',
    reportsTo: 'Reports to Board of Directors',
    icon: 'person',
    theme: 'terracotta',
    ancestors: ['ga', 'bod'],
    desc: 'Top executive officer accountable for overall operational management, strategic program execution, institutional partner relations, and commercial growth of the union.',
    responsibilities: [
      'Total leadership of union operations, commercial growth, and 8,089+ member impact',
      'Lead institutional liaison with government ministries, UNIDO, LVIA, and commercial buyers',
      'Direct supervision of executive support experts and the Deputy Manager',
    ],
  },
  lawyer: {
    id: 'lawyer',
    title: 'Lawyer',
    sub: 'Legal Advisory',
    reportsTo: 'Reports directly to General Manager',
    icon: 'policy',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: 'Provides legal counsel, contracts management, regulatory compliance oversight, and defense of cooperative member property and commercial rights.',
    responsibilities: [
      'Drafts and reviews off-take supply contracts, export agreements, and supplier covenants',
      'Defends cooperative legal standing, land leases, and asset titles in legal jurisdictions',
      'Advises the GM on statutory labor law, cooperative regulations, and risk mitigation',
    ],
  },
  sec: {
    id: 'sec',
    title: 'Executive Secretary',
    sub: 'Executive Office',
    reportsTo: 'Reports directly to General Manager',
    icon: 'badge',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: 'Coordinates executive office operations, board communications, official records, delegate meetings, and executive administrative workflows.',
    responsibilities: [
      'Maintains official archives, executive minutes, board resolutions, and delegate registry',
      'Coordinates executive scheduling, official partner protocol, and board assemblies',
      'Facilitates internal executive correspondence between GM and department heads',
    ],
  },
  plan: {
    id: 'plan',
    title: 'Preparing Plan, Evaluate and Budgeting Senior Expert',
    sub: 'Planning & Evaluation',
    reportsTo: 'Reports directly to General Manager',
    icon: 'query_stats',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: 'Leads annual operational planning, capital budgeting, project feasibility analysis, performance evaluation metrics, and socio-economic impact tracking.',
    responsibilities: [
      'Formulates comprehensive annual operational plans and capital budget models',
      'Conducts quarterly key performance indicator (KPI) assessments across departments',
      'Prepares donor project feasibility studies, socio-economic impact reviews, and grant reports',
    ],
  },
  auditor: {
    id: 'auditor',
    title: 'Internal Auditor',
    sub: 'Audit & Compliance',
    reportsTo: 'Reports directly to General Manager',
    icon: 'fact_check',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: 'Conducts periodic internal operational and fiscal audits, risk assessments, inventory checks, and ensures financial discipline across all union departments.',
    responsibilities: [
      'Executes regular fiscal, store inventory, and procurement control audits',
      'Identifies operational bottlenecks, financial leakages, and recommends corrective measures',
      'Submits independent monthly and quarterly audit reports directly to the General Manager',
    ],
  },
  ict: {
    id: 'ict',
    title: 'ICT Expert',
    sub: 'Systems & Technology',
    reportsTo: 'Reports directly to General Manager',
    icon: 'terminal',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: 'Manages digital cooperative platforms, logistics ERP tracking, IT infrastructure, network security, and member data management systems.',
    responsibilities: [
      'Oversees union digital platforms, member databases, and logistics management systems',
      'Maintains IT infrastructure, cloud connectivity, network security, and hardware uptime',
      'Drives digital agronomy integration and electronic record-keeping for primary cooperatives',
    ],
  },
  dm: {
    id: 'dm',
    title: 'Deputy Manager',
    sub: 'Operations & Department Oversight',
    reportsTo: 'Reports directly to General Manager',
    icon: 'manage_accounts',
    theme: 'terracotta',
    ancestors: ['ga', 'bod', 'gm'],
    desc: 'Assists the General Manager in daily administration and exercises direct operational coordination across the four primary operating departments.',
    responsibilities: [
      'Direct operational coordination across Agriculture, Marketing, HR, and Finance departments',
      'Monitors day-to-day workflow alignment, resource allocation, and field dispatch operations',
      'Acts on behalf of the General Manager during executive absences and special field assignments',
    ],
  },
  agri: {
    id: 'agri',
    title: 'Agriculture and Farmers Service Center Department',
    sub: 'Agronomy & Inputs',
    reportsTo: 'Reports directly to Deputy Manager',
    icon: 'psychiatry',
    theme: 'dept',
    ancestors: ['ga', 'bod', 'gm', 'dm'],
    desc: 'Oversees certified seed multiplication (maize, bean, onion, wheat), agronomy extension, pest management support, irrigation equipment services, and input distribution to primary co-ops.',
    responsibilities: [
      'Multiplies certified high-yield seeds (Maize BH-661, Bean Seeri 125, Onion Naafis, Wheat Qaqqabaa)',
      'Provides modern agronomy training, pest monitoring, and GlobalG.A.P certification support',
      'Procures and distributes quality fertilizers, agrochemicals, and drip irrigation hardware',
    ],
  },
  marketing: {
    id: 'marketing',
    title: 'Marketing Department',
    sub: 'Trade & Distribution',
    reportsTo: 'Reports directly to Deputy Manager',
    icon: 'storefront',
    theme: 'dept',
    ancestors: ['ga', 'bod', 'gm', 'dm'],
    desc: 'Manages wholesale commercial off-taking, Addis Ababa retail distribution outlets, export packaging compliance, Ethiopian Airlines catering supply, and international export trade.',
    responsibilities: [
      'Off-takes and aggregates 50,000+ tonnes of fresh member produce annually',
      'Operates 5 direct retail consumer outlets in Addis Ababa and supplies major supermarket chains',
      'Manages high-grade fruit/vegetable supply contracts for Ethiopian Airlines catering and export',
    ],
  },
  hr: {
    id: 'hr',
    title: 'Human Resource Management and General Service Department',
    sub: 'HR, Fleet & Facilities',
    reportsTo: 'Reports directly to Deputy Manager',
    icon: 'corporate_fare',
    theme: 'dept',
    ancestors: ['ga', 'bod', 'gm', 'dm'],
    desc: 'Administers staff talent, training, union transport fleet logistics, cold-chain vehicle dispatch, facility maintenance, and union security protocols.',
    responsibilities: [
      'Manages union staffing, performance evaluations, employee benefits, and skills training',
      'Dispatches and maintains the temperature-controlled vehicle fleet for fresh produce logistics',
      'Maintains union headquarters, packhouses, cold-storage warehouses, and physical security',
    ],
  },
  finance: {
    id: 'finance',
    title: 'Finance and Procurement Department',
    sub: 'Finance & Supply',
    reportsTo: 'Reports directly to Deputy Manager',
    icon: 'account_balance_wallet',
    theme: 'dept',
    ancestors: ['ga', 'bod', 'gm', 'dm'],
    desc: 'Manages financial reporting, member dividend allocation, asset accounting, treasury management, farm input procurement, and banking relationships.',
    responsibilities: [
      'Manages financial accounting, 94.5 million ETB own capital treasury, and statutory financial audits',
      'Administers transparent member dividend distributions and primary cooperative accounts',
      'Directs bulk commercial procurement of seed stocks, machinery, and agricultural inputs',
    ],
  },
}

export default function OrgChart() {
  const [activeId, setActiveId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [isExporting, setIsExporting] = useState(false)
  const chartRef = useRef(null)
  const inspectorRef = useRef(null)

  const currentFocusId = activeId || hoveredId
  const activeAncestors = currentFocusId && ORG_DATA[currentFocusId]
    ? [currentFocusId, ...ORG_DATA[currentFocusId].ancestors]
    : []

  const activeNode = activeId ? ORG_DATA[activeId] : null
  const appointedLeader = activeId ? teamMembers.find((m) => m.orgId === activeId) : null

  const handleNodeClick = (id) => {
    if (activeId === id) {
      setActiveId(null)
    } else {
      setActiveId(id)
    }
  }

  // Smoothly scroll the inspector card into clear view whenever a new item is selected
  useEffect(() => {
    if (activeId && inspectorRef.current) {
      // Small timeout ensures the DOM has rendered the panel before scrolling
      const timer = setTimeout(() => {
        inspectorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 60)
      return () => clearTimeout(timer)
    }
  }, [activeId])

  // Save / Export Chart as High-Res PNG matching the exact source diagram
  const handleExportPNG = () => {
    setIsExporting(true)
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const scale = 2
      const width = 1100
      const height = 980

      canvas.width = width * scale
      canvas.height = height * scale
      ctx.scale(scale, scale)

      // Background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)

      // Header Banner
      ctx.fillStyle = '#173124'
      ctx.fillRect(0, 0, width, 76)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 22px Inter, sans-serif'
      ctx.fillText('Meki Batu Union Org.structure', 40, 46)

      const drawBox = (x, y, w, h, title, bg, textCol, borderCol) => {
        ctx.fillStyle = bg
        ctx.strokeStyle = borderCol
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.roundRect(x, y, w, h, 6)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = textCol
        ctx.font = 'bold 12.5px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(title, x + w / 2, y + h / 2 + 4)
      }

      // Central Spine Line
      ctx.strokeStyle = '#2d6a4f'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(550, 100)
      ctx.lineTo(550, 810)
      ctx.stroke()

      // Horizontal Connectors
      const drawHLine = (x1, y, x2) => {
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.stroke()
      }

      // GA -> BOD & CC
      drawHLine(360, 205, 550)
      drawHLine(550, 185, 740)

      // GM Spine to Advisory
      drawHLine(360, 375, 550) // Lawyer
      drawHLine(550, 395, 740) // Secretary
      drawHLine(360, 485, 550) // Planning
      drawHLine(550, 485, 740) // Auditor
      drawHLine(550, 560, 740) // ICT

      // DM to 4 Depts
      drawHLine(140, 845, 960)
      ;[140, 410, 690, 960].forEach((x) => {
        ctx.beginPath()
        ctx.moveTo(x, 845)
        ctx.lineTo(x, 875)
        ctx.stroke()
      })

      // Draw Boxes
      drawBox(410, 100, 280, 48, 'General Assembly', '#173124', '#ffffff', '#173124')
      drawBox(140, 180, 240, 48, 'Board of Directors', '#173124', '#ffffff', '#173124')
      drawBox(720, 160, 240, 48, 'Control Committee', '#173124', '#ffffff', '#173124')

      drawBox(250, 275, 600, 48, 'General Manager', '#9d4320', '#ffffff', '#9d4320')

      drawBox(140, 350, 240, 48, 'Lawyer', '#173124', '#ffffff', '#173124')
      drawBox(720, 370, 240, 48, 'Executive Secretary', '#173124', '#ffffff', '#173124')
      drawBox(100, 460, 280, 52, 'Preparing Plan, Evaluate & Budgeting', '#173124', '#ffffff', '#173124')
      drawBox(720, 460, 240, 48, 'Internal Auditor', '#173124', '#ffffff', '#173124')
      drawBox(720, 535, 240, 48, 'ICT Expert', '#173124', '#ffffff', '#173124')

      drawBox(250, 670, 600, 48, 'Deputy Manager', '#9d4320', '#ffffff', '#9d4320')

      drawBox(30, 875, 220, 58, 'Agriculture & Farmers Service', '#fdf6ee', '#9d4320', '#d88d60')
      drawBox(290, 875, 220, 58, 'Marketing Department', '#fdf6ee', '#9d4320', '#d88d60')
      drawBox(550, 875, 250, 58, 'Human Resource & General Service', '#fdf6ee', '#9d4320', '#d88d60')
      drawBox(830, 875, 240, 58, 'Finance & Procurement Dept', '#fdf6ee', '#9d4320', '#d88d60')

      // Download Trigger
      const link = document.createElement('a')
      link.download = `Meki_Batu_Union_Org_Structure.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to export image', err)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="org-root" ref={chartRef} aria-label="Meki Batu Union Organizational Structure">
      {/* Modern Control Toolbar */}
      <div className="org-toolbar">
        <div className="org-toolbar__status">
          <span className="org-toolbar__pulse-dot" />
          <span className="org-toolbar__text">
            {currentFocusId
              ? `Selected: ${ORG_DATA[currentFocusId].title}`
              : 'Interactive Organizational Tree • Click any role to view mandate'}
          </span>
        </div>

        <div className="org-toolbar__actions">
          {activeId && (
            <button
              type="button"
              className="org-action-btn org-action-btn--reset"
              onClick={() => setActiveId(null)}
            >
              <span>Clear Focus</span>
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          )}

          <button
            type="button"
            className="org-action-btn"
            onClick={handleExportPNG}
            disabled={isExporting}
            title="Download high-resolution image"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>{isExporting ? 'Generating...' : 'Save Image'}</span>
          </button>

          <button
            type="button"
            className="org-action-btn"
            onClick={() => window.print()}
            title="Print or Save PDF"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          Exact Source Architecture: Continuous Center Spine with Left/Right Nodes
          ========================================================================= */}
      <div className="org-spine-container">
        {/* Continuous Animated Spine Line */}
        <div className={`org-central-spine ${currentFocusId ? 'org-central-spine--active' : ''}`} />

        {/* 1. General Assembly (Top Center) */}
        <div className="org-spine-center-item org-spine-center-item--ga">
          <button
            type="button"
            className={`org-box org-box--green org-box--ga ${activeId === 'ga' ? 'org-box--active' : ''}`}
            onClick={() => handleNodeClick('ga')}
            onMouseEnter={() => setHoveredId('ga')}
            onMouseLeave={() => setHoveredId(null)}
            aria-expanded={activeId === 'ga'}
          >
            <span className="material-symbols-outlined org-box__icon">groups</span>
            <span className="org-box__title">General Assembly</span>
            <span className="material-symbols-outlined org-box__info">
              {activeId === 'ga' ? 'expand_less' : 'info'}
            </span>
          </button>
        </div>

        {/* 2. Board of Directors (Left) & Control Committee (Right) */}
        <div className="org-spine-row">
          <div className="org-spine-side org-spine-side--left">
            <button
              type="button"
              className={`org-box org-box--green ${activeId === 'bod' ? 'org-box--active' : ''}`}
              onClick={() => handleNodeClick('bod')}
              onMouseEnter={() => setHoveredId('bod')}
              onMouseLeave={() => setHoveredId(null)}
              aria-expanded={activeId === 'bod'}
            >
              <span className="material-symbols-outlined org-box__icon">gavel</span>
              <span className="org-box__title">Board of Directors</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'bod' ? 'expand_less' : 'info'}
              </span>
            </button>
            <div className={`org-branch-line org-branch-line--to-center ${activeAncestors.includes('bod') ? 'org-branch-line--active' : ''}`} />
          </div>

          <div className="org-spine-side org-spine-side--right">
            <div className={`org-branch-line org-branch-line--from-center ${activeAncestors.includes('cc') ? 'org-branch-line--active' : ''}`} />
            <button
              type="button"
              className={`org-box org-box--green ${activeId === 'cc' ? 'org-box--active' : ''}`}
              onClick={() => handleNodeClick('cc')}
              onMouseEnter={() => setHoveredId('cc')}
              onMouseLeave={() => setHoveredId(null)}
              aria-expanded={activeId === 'cc'}
            >
              <span className="material-symbols-outlined org-box__icon">verified_user</span>
              <span className="org-box__title">Control Committee</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'cc' ? 'expand_less' : 'info'}
              </span>
            </button>
          </div>
        </div>

        {/* 3. General Manager (Wide Centered Terracotta Bar) */}
        <div className="org-spine-center-item org-spine-center-item--exec">
          <button
            type="button"
            className={`org-box org-box--terracotta org-box--wide ${activeId === 'gm' ? 'org-box--active' : ''}`}
            onClick={() => handleNodeClick('gm')}
            onMouseEnter={() => setHoveredId('gm')}
            onMouseLeave={() => setHoveredId(null)}
            aria-expanded={activeId === 'gm'}
          >
            <span className="material-symbols-outlined org-box__icon">person</span>
            <span className="org-box__title org-box__title--lg">General Manager</span>
            <span className="material-symbols-outlined org-box__info">
              {activeId === 'gm' ? 'expand_less' : 'info'}
            </span>
          </button>
        </div>

        {/* 4. Support Roles (Alternating exactly as shown in source slide) */}
        {/* Pair 1: Lawyer (Left) & Executive Secretary (Right) */}
        <div className="org-spine-row">
          <div className="org-spine-side org-spine-side--left">
            <button
              type="button"
              className={`org-box org-box--green ${activeId === 'lawyer' ? 'org-box--active' : ''}`}
              onClick={() => handleNodeClick('lawyer')}
              onMouseEnter={() => setHoveredId('lawyer')}
              onMouseLeave={() => setHoveredId(null)}
              aria-expanded={activeId === 'lawyer'}
            >
              <span className="material-symbols-outlined org-box__icon">policy</span>
              <span className="org-box__title">Lawyer</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'lawyer' ? 'expand_less' : 'info'}
              </span>
            </button>
            <div className={`org-branch-line org-branch-line--to-center ${activeAncestors.includes('lawyer') ? 'org-branch-line--active' : ''}`} />
          </div>

          <div className="org-spine-side org-spine-side--right">
            <div className={`org-branch-line org-branch-line--from-center ${activeAncestors.includes('sec') ? 'org-branch-line--active' : ''}`} />
            <button
              type="button"
              className={`org-box org-box--green ${activeId === 'sec' ? 'org-box--active' : ''}`}
              onClick={() => handleNodeClick('sec')}
              onMouseEnter={() => setHoveredId('sec')}
              onMouseLeave={() => setHoveredId(null)}
              aria-expanded={activeId === 'sec'}
            >
              <span className="material-symbols-outlined org-box__icon">badge</span>
              <span className="org-box__title">Executive Secretary</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'sec' ? 'expand_less' : 'info'}
              </span>
            </button>
          </div>
        </div>

        {/* Pair 2: Preparing Plan (Left) & Internal Auditor (Right) */}
        <div className="org-spine-row">
          <div className="org-spine-side org-spine-side--left">
            <button
              type="button"
              className={`org-box org-box--green org-box--multiline ${activeId === 'plan' ? 'org-box--active' : ''}`}
              onClick={() => handleNodeClick('plan')}
              onMouseEnter={() => setHoveredId('plan')}
              onMouseLeave={() => setHoveredId(null)}
              aria-expanded={activeId === 'plan'}
            >
              <span className="material-symbols-outlined org-box__icon">query_stats</span>
              <span className="org-box__title">Preparing Plan, Evaluate and Budgeting Senior Expert</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'plan' ? 'expand_less' : 'info'}
              </span>
            </button>
            <div className={`org-branch-line org-branch-line--to-center ${activeAncestors.includes('plan') ? 'org-branch-line--active' : ''}`} />
          </div>

          <div className="org-spine-side org-spine-side--right">
            <div className={`org-branch-line org-branch-line--from-center ${activeAncestors.includes('auditor') ? 'org-branch-line--active' : ''}`} />
            <button
              type="button"
              className={`org-box org-box--green ${activeId === 'auditor' ? 'org-box--active' : ''}`}
              onClick={() => handleNodeClick('auditor')}
              onMouseEnter={() => setHoveredId('auditor')}
              onMouseLeave={() => setHoveredId(null)}
              aria-expanded={activeId === 'auditor'}
            >
              <span className="material-symbols-outlined org-box__icon">fact_check</span>
              <span className="org-box__title">Internal Auditor</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'auditor' ? 'expand_less' : 'info'}
              </span>
            </button>
          </div>
        </div>

        {/* Row 3: ICT Expert (Right) */}
        <div className="org-spine-row">
          <div className="org-spine-side org-spine-side--left org-spine-side--empty" />
          <div className="org-spine-side org-spine-side--right">
            <div className={`org-branch-line org-branch-line--from-center ${activeAncestors.includes('ict') ? 'org-branch-line--active' : ''}`} />
            <button
              type="button"
              className={`org-box org-box--green ${activeId === 'ict' ? 'org-box--active' : ''}`}
              onClick={() => handleNodeClick('ict')}
              onMouseEnter={() => setHoveredId('ict')}
              onMouseLeave={() => setHoveredId(null)}
              aria-expanded={activeId === 'ict'}
            >
              <span className="material-symbols-outlined org-box__icon">terminal</span>
              <span className="org-box__title">ICT Expert</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'ict' ? 'expand_less' : 'info'}
              </span>
            </button>
          </div>
        </div>

        {/* 5. Deputy Manager (Wide Centered Terracotta Bar) */}
        <div className="org-spine-center-item org-spine-center-item--exec mt-2">
          <button
            type="button"
            className={`org-box org-box--terracotta org-box--wide ${activeId === 'dm' ? 'org-box--active' : ''}`}
            onClick={() => handleNodeClick('dm')}
            onMouseEnter={() => setHoveredId('dm')}
            onMouseLeave={() => setHoveredId(null)}
            aria-expanded={activeId === 'dm'}
          >
            <span className="material-symbols-outlined org-box__icon">manage_accounts</span>
            <span className="org-box__title org-box__title--lg">Deputy Manager</span>
            <span className="material-symbols-outlined org-box__info">
              {activeId === 'dm' ? 'expand_less' : 'info'}
            </span>
          </button>
        </div>

        {/* 6. Four Operating Departments (Peach/Warm Sand cards in a balanced 4-column layout) */}
        <div className="org-depts-section">
          {/* Connector tree feeding 4 departments */}
          <div className="org-depts-tree-line">
            <svg className="org-depts-svg" viewBox="0 0 1000 28" preserveAspectRatio="none">
              <path
                d="M 125,28 L 125,14 L 875,14 L 875,28 M 375,14 L 375,28 M 625,14 L 625,28 M 500,0 L 500,14"
                className={`org-line ${activeAncestors.includes('dm') ? 'org-line--active' : ''}`}
              />
            </svg>
          </div>

          <div className="org-depts-grid">
            {['agri', 'marketing', 'hr', 'finance'].map((id) => {
              const dept = ORG_DATA[id]
              return (
                <button
                  key={id}
                  type="button"
                  className={`org-box org-box--dept ${activeId === id ? 'org-box--active' : ''}`}
                  onClick={() => handleNodeClick(id)}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-expanded={activeId === id}
                >
                  <span className="material-symbols-outlined org-box__icon">{dept.icon}</span>
                  <div className="org-box__label-wrap">
                    <span className="org-box__title">{dept.title}</span>
                  </div>
                  <span className="material-symbols-outlined org-box__info">
                    {activeId === id ? 'expand_less' : 'info'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Living Inspector Panel (Seamlessly Connected Dossier with Auto-scroll) */}
      {activeNode && (
        <div className="org-inspector-wrapper" ref={inspectorRef}>
          {/* Visual Connector Bridge Linking Chart to Dossier */}
          <div className="org-inspector-bridge">
            <div className="org-inspector-bridge__line" />
            <div className="org-inspector-bridge__badge">
              <span className="material-symbols-outlined text-xs">manage_search</span>
              <span>Role Profile &amp; Mandate</span>
            </div>
            <div className="org-inspector-bridge__line" />
          </div>

          <div
            className="org-inspector-panel"
            role="region"
            aria-live="polite"
          >
            <div className="org-inspector-panel__top">
              <div className="org-inspector-panel__meta">
                <span className={`org-badge org-badge--${activeNode.theme}`}>
                  <span className="material-symbols-outlined text-xs">verified</span>
                  {activeNode.sub}
                </span>
                <span className="org-badge org-badge--line">
                  <span className="material-symbols-outlined text-xs">account_tree</span>
                  {activeNode.reportsTo}
                </span>
              </div>
              <button
                type="button"
                className="org-inspector-panel__close"
                onClick={() => setActiveId(null)}
                aria-label="Dismiss inspector"
                title="Close dossier"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="org-inspector-panel__content-grid">
              {/* Left Column: Role Profile Overview */}
              <div className="org-inspector-panel__left">
                <div className="org-inspector-panel__header">
                  <div className={`org-inspector-panel__icon-box org-inspector-panel__icon-box--${activeNode.theme}`}>
                    <span className="material-symbols-outlined org-inspector-panel__icon">{activeNode.icon}</span>
                  </div>
                  <div className="org-inspector-panel__titles">
                    <h4 className="org-inspector-panel__title">{activeNode.title}</h4>
                    <p className="org-inspector-panel__sub">{activeNode.sub}</p>
                  </div>
                </div>

                {appointedLeader && (
                  <div className="org-inspector-panel__leader">
                    <div className="org-inspector-panel__leader-photo-wrap">
                      <img
                        src={appointedLeader.photo}
                        alt={appointedLeader.name}
                        className="org-inspector-panel__leader-photo"
                      />
                    </div>
                    <div className="org-inspector-panel__leader-info">
                      <span className="org-inspector-panel__leader-tag">Appointed Leadership</span>
                      <h5 className="org-inspector-panel__leader-name">{appointedLeader.name}</h5>
                      <p className="org-inspector-panel__leader-title">{appointedLeader.title}</p>
                      {appointedLeader.email && (
                        <div className="org-inspector-panel__leader-contacts">
                          <a
                            href={`mailto:${appointedLeader.email}`}
                            className="org-inspector-panel__leader-link"
                            title={`Email ${appointedLeader.name}`}
                          >
                            <span className="material-symbols-outlined text-xs">mail</span>
                            <span>{appointedLeader.email}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <p className="org-inspector-panel__desc">{activeNode.desc}</p>
              </div>

              {/* Right Column: Key Mandates & Responsibilities */}
              {activeNode.responsibilities && (
                <div className="org-inspector-panel__right">
                  <div className="org-inspector-panel__responsibilities-card">
                    <h5 className="org-inspector-panel__section-heading">
                      <span className="material-symbols-outlined text-xs">checklist</span>
                      Key Mandates &amp; Responsibilities
                    </h5>
                    <ul className="org-inspector-panel__list">
                      {activeNode.responsibilities.map((resp, i) => (
                        <li key={i} className="org-inspector-panel__list-item">
                          <span className="org-inspector-panel__bullet" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}





