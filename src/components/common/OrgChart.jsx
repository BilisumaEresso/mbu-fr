import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { teamMembers } from '../../data/team.js'
import './OrgChart.css'

const getOrgData = (t) => ({

  ga: {
    id: 'ga',
    title: t('roles.ga.title'),
    sub: t('roles.ga.sub'),
    reportsTo: t('roles.ga.reportsTo'),
    icon: 'groups',
    theme: 'green',
    ancestors: [],
    desc: t('roles.ga.desc'),
    responsibilities: t('roles.ga.responsibilities', { returnObjects: true }),
  },
  bod: {
    id: 'bod',
    title: t('roles.bod.title'),
    sub: t('roles.bod.sub'),
    reportsTo: t('roles.bod.reportsTo'),
    icon: 'gavel',
    theme: 'green',
    ancestors: ['ga'],
    desc: t('roles.bod.desc'),
    responsibilities: t('roles.bod.responsibilities', { returnObjects: true }),
  },
  cc: {
    id: 'cc',
    title: t('roles.cc.title'),
    sub: t('roles.cc.sub'),
    reportsTo: t('roles.cc.reportsTo'),
    icon: 'verified_user',
    theme: 'green',
    ancestors: ['ga'],
    desc: t('roles.cc.desc'),
    responsibilities: t('roles.cc.responsibilities', { returnObjects: true }),
  },
  gm: {
    id: 'gm',
    title: t('roles.gm.title'),
    sub: t('roles.gm.sub'),
    reportsTo: t('roles.gm.reportsTo'),
    icon: 'person',
    theme: 'terracotta',
    ancestors: ['ga', 'bod'],
    desc: t('roles.gm.desc'),
    responsibilities: t('roles.gm.responsibilities', { returnObjects: true }),
  },
  lawyer: {
    id: 'lawyer',
    title: t('roles.lawyer.title'),
    sub: t('roles.lawyer.sub'),
    reportsTo: t('roles.lawyer.reportsTo'),
    icon: 'policy',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: t('roles.lawyer.desc'),
    responsibilities: t('roles.lawyer.responsibilities', { returnObjects: true }),
  },
  sec: {
    id: 'sec',
    title: t('roles.sec.title'),
    sub: t('roles.sec.sub'),
    reportsTo: t('roles.sec.reportsTo'),
    icon: 'badge',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: t('roles.sec.desc'),
    responsibilities: t('roles.sec.responsibilities', { returnObjects: true }),
  },
  plan: {
    id: 'plan',
    title: t('roles.plan.title'),
    sub: t('roles.plan.sub'),
    reportsTo: t('roles.plan.reportsTo'),
    icon: 'query_stats',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: t('roles.plan.desc'),
    responsibilities: t('roles.plan.responsibilities', { returnObjects: true }),
  },
  auditor: {
    id: 'auditor',
    title: t('roles.auditor.title'),
    sub: t('roles.auditor.sub'),
    reportsTo: t('roles.auditor.reportsTo'),
    icon: 'fact_check',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: t('roles.auditor.desc'),
    responsibilities: t('roles.auditor.responsibilities', { returnObjects: true }),
  },
  ict: {
    id: 'ict',
    title: t('roles.ict.title'),
    sub: t('roles.ict.sub'),
    reportsTo: t('roles.ict.reportsTo'),
    icon: 'terminal',
    theme: 'green',
    ancestors: ['ga', 'bod', 'gm'],
    desc: t('roles.ict.desc'),
    responsibilities: t('roles.ict.responsibilities', { returnObjects: true }),
  },
  dm: {
    id: 'dm',
    title: t('roles.dm.title'),
    sub: t('roles.dm.sub'),
    reportsTo: t('roles.dm.reportsTo'),
    icon: 'manage_accounts',
    theme: 'terracotta',
    ancestors: ['ga', 'bod', 'gm'],
    desc: t('roles.dm.desc'),
    responsibilities: t('roles.dm.responsibilities', { returnObjects: true }),
  },
  agri: {
    id: 'agri',
    title: t('roles.agri.title'),
    sub: t('roles.agri.sub'),
    reportsTo: t('roles.agri.reportsTo'),
    icon: 'psychiatry',
    theme: 'dept',
    ancestors: ['ga', 'bod', 'gm', 'dm'],
    desc: t('roles.agri.desc'),
    responsibilities: t('roles.agri.responsibilities', { returnObjects: true }),
  },
  marketing: {
    id: 'marketing',
    title: t('roles.marketing.title'),
    sub: t('roles.marketing.sub'),
    reportsTo: t('roles.marketing.reportsTo'),
    icon: 'storefront',
    theme: 'dept',
    ancestors: ['ga', 'bod', 'gm', 'dm'],
    desc: t('roles.marketing.desc'),
    responsibilities: t('roles.marketing.responsibilities', { returnObjects: true }),
  },
  hr: {
    id: 'hr',
    title: t('roles.hr.title'),
    sub: t('roles.hr.sub'),
    reportsTo: t('roles.hr.reportsTo'),
    icon: 'corporate_fare',
    theme: 'dept',
    ancestors: ['ga', 'bod', 'gm', 'dm'],
    desc: t('roles.hr.desc'),
    responsibilities: t('roles.hr.responsibilities', { returnObjects: true }),
  },
  finance: {
    id: 'finance',
    title: t('roles.finance.title'),
    sub: t('roles.finance.sub'),
    reportsTo: t('roles.finance.reportsTo'),
    icon: 'account_balance_wallet',
    theme: 'dept',
    ancestors: ['ga', 'bod', 'gm', 'dm'],
    desc: t('roles.finance.desc'),
    responsibilities: t('roles.finance.responsibilities', { returnObjects: true }),
  },
})

const getTiers = (t) => ([
  {
    key: 'tier1',
    number: t('tiers.tier1.number'),
    title: t('tiers.tier1.title'),
    sub: t('tiers.tier1.sub'),
    icon: 'gavel',
    theme: 'green',
    nodeIds: ['ga', 'cc', 'bod'],
  },
  {
    key: 'tier2',
    number: t('tiers.tier2.number'),
    title: t('tiers.tier2.title'),
    sub: t('tiers.tier2.sub'),
    icon: 'manage_accounts',
    theme: 'terracotta',
    nodeIds: ['gm', 'lawyer', 'sec', 'plan', 'auditor', 'ict', 'dm'],
  },
  {
    key: 'tier3',
    number: t('tiers.tier3.number'),
    title: t('tiers.tier3.title'),
    sub: t('tiers.tier3.sub'),
    icon: 'psychiatry',
    theme: 'dept',
    nodeIds: ['agri', 'marketing', 'hr', 'finance'],
  },
])

export default function OrgChart() {
  const { t } = useTranslation('orgchart')
  const ORG_DATA = getOrgData(t)
  const TIERS = getTiers(t)
  const [activeId, setActiveId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [isExporting, setIsExporting] = useState(false)
  const [expandedTiers, setExpandedTiers] = useState({
    tier1: true,
    tier2: false,
    tier3: false,
  })
  const chartRef = useRef(null)
  const inspectorRef = useRef(null)

  const toggleTier = (tierKey) => {
    setExpandedTiers((prev) => ({
      ...prev,
      [tierKey]: !prev[tierKey],
    }))
  }

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
      ctx.lineTo(550, 840)
      ctx.stroke()

      // Horizontal Connectors
      const drawHLine = (x1, y, x2) => {
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.stroke()
      }

      // GA -> CC (higher) & BOD (lower) — staggered per source diagram
      drawHLine(550, 185, 740)
      drawHLine(360, 205, 550)

      // GM Spine to Advisory (staggered per source diagram)
      drawHLine(360, 375, 550) // Lawyer
      drawHLine(550, 395, 740) // Secretary
      drawHLine(360, 480, 550) // Planning
      drawHLine(550, 530, 740) // Auditor
      drawHLine(550, 595, 740) // ICT

      // DM to 4 Depts
      drawHLine(140, 875, 960)
      ;[140, 410, 690, 960].forEach((x) => {
        ctx.beginPath()
        ctx.moveTo(x, 875)
        ctx.lineTo(x, 905)
        ctx.stroke()
      })

      // Draw Boxes (ordered by vertical position, matching source diagram stagger)
      drawBox(410, 100, 280, 48, 'General Assembly', '#173124', '#ffffff', '#173124')
      drawBox(720, 160, 240, 48, 'Control Committee', '#173124', '#ffffff', '#173124')
      drawBox(140, 180, 240, 48, 'Board of Directors', '#173124', '#ffffff', '#173124')

      drawBox(250, 275, 600, 48, 'General Manager', '#9d4320', '#ffffff', '#9d4320')

      drawBox(140, 350, 240, 48, 'Lawyer', '#173124', '#ffffff', '#173124')
      drawBox(720, 370, 240, 48, 'Executive Secretary', '#173124', '#ffffff', '#173124')
      drawBox(100, 455, 280, 52, 'Preparing Plan, Evaluate & Budgeting', '#173124', '#ffffff', '#173124')
      drawBox(720, 505, 240, 48, 'Internal Auditor', '#173124', '#ffffff', '#173124')
      drawBox(720, 570, 240, 48, 'ICT Expert', '#173124', '#ffffff', '#173124')

      drawBox(250, 700, 600, 48, 'Deputy Manager', '#9d4320', '#ffffff', '#9d4320')

      drawBox(30, 905, 220, 58, 'Agriculture & Farmers Service', '#fdf6ee', '#9d4320', '#d88d60')
      drawBox(290, 905, 220, 58, 'Marketing Department', '#fdf6ee', '#9d4320', '#d88d60')
      drawBox(550, 905, 250, 58, 'Human Resource & General Service', '#fdf6ee', '#9d4320', '#d88d60')
      drawBox(830, 905, 240, 58, 'Finance & Procurement Dept', '#fdf6ee', '#9d4320', '#d88d60')

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
    <div className="org-root" ref={chartRef} aria-label={t('ui.ariaLabel')}>
      {/* Modern Control Toolbar */}
      <div className="org-toolbar">
        <div className="org-toolbar__status">
          <span className="material-symbols-outlined org-toolbar__status-icon">account_tree</span>
          <span className="org-toolbar__text">
            {currentFocusId
              ? `${t('ui.selectedPrefix')} ${ORG_DATA[currentFocusId].title}`
              : t('ui.defaultStatus')}
          </span>
        </div>

        <div className="org-toolbar__actions">
          {activeId && (
            <button
              type="button"
              className="org-action-btn org-action-btn--reset"
              onClick={() => setActiveId(null)}
            >
              <span>{t('ui.clearFocus')}</span>
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          )}

          <button
            type="button"
            className="org-action-btn"
            onClick={handleExportPNG}
            disabled={isExporting}
            title={t('ui.downloadTitle')}
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>{isExporting ? t('ui.generating') : t('ui.saveImage')}</span>
          </button>

          <button
            type="button"
            className="org-action-btn"
            onClick={() => window.print()}
            title={t('ui.printTitle')}
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>{t('ui.print')}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          Exact Source Architecture: Continuous Center Spine with Left/Right Nodes
          ========================================================================= */}
      <div className="org-spine-container desktop-tree-only">
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
            <span className="org-box__title">{ORG_DATA.ga.title}</span>
            <span className="material-symbols-outlined org-box__info">
              {activeId === 'ga' ? 'expand_less' : 'info'}
            </span>
          </button>
        </div>

        {/* 2. Control Committee (Right, higher) then Board of Directors (Left, lower) — per source diagram */}
        <div className="org-spine-row org-spine-row--staggered">
          <div className="org-spine-side org-spine-side--left org-spine-side--empty" />
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
              <span className="org-box__title">{ORG_DATA.cc.title}</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'cc' ? 'expand_less' : 'info'}
              </span>
            </button>
          </div>
        </div>

        <div className="org-spine-row org-spine-row--staggered">
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
              <span className="org-box__title">{ORG_DATA.bod.title}</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'bod' ? 'expand_less' : 'info'}
              </span>
            </button>
            <div className={`org-branch-line org-branch-line--to-center ${activeAncestors.includes('bod') ? 'org-branch-line--active' : ''}`} />
          </div>
          <div className="org-spine-side org-spine-side--right org-spine-side--empty" />
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
            <span className="org-box__title org-box__title--lg">{ORG_DATA.gm.title}</span>
            <span className="material-symbols-outlined org-box__info">
              {activeId === 'gm' ? 'expand_less' : 'info'}
            </span>
          </button>
        </div>

        {/* 4. Support Roles — Vertically staggered per source diagram */}
        {/* Lawyer (Left, higher) */}
        <div className="org-spine-row org-spine-row--staggered">
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
              <span className="org-box__title">{ORG_DATA.lawyer.title}</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'lawyer' ? 'expand_less' : 'info'}
              </span>
            </button>
            <div className={`org-branch-line org-branch-line--to-center ${activeAncestors.includes('lawyer') ? 'org-branch-line--active' : ''}`} />
          </div>
          <div className="org-spine-side org-spine-side--right org-spine-side--empty" />
        </div>

        {/* Executive Secretary (Right, lower) */}
        <div className="org-spine-row org-spine-row--staggered">
          <div className="org-spine-side org-spine-side--left org-spine-side--empty" />
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
              <span className="org-box__title">{ORG_DATA.sec.title}</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'sec' ? 'expand_less' : 'info'}
              </span>
            </button>
          </div>
        </div>

        {/* Preparing Plan Expert (Left, higher) */}
        <div className="org-spine-row org-spine-row--staggered">
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
              <span className="org-box__title">{ORG_DATA.plan.title}</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'plan' ? 'expand_less' : 'info'}
              </span>
            </button>
            <div className={`org-branch-line org-branch-line--to-center ${activeAncestors.includes('plan') ? 'org-branch-line--active' : ''}`} />
          </div>
          <div className="org-spine-side org-spine-side--right org-spine-side--empty" />
        </div>

        {/* Internal Auditor (Right, lower) */}
        <div className="org-spine-row org-spine-row--staggered">
          <div className="org-spine-side org-spine-side--left org-spine-side--empty" />
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
              <span className="org-box__title">{ORG_DATA.auditor.title}</span>
              <span className="material-symbols-outlined org-box__info">
                {activeId === 'auditor' ? 'expand_less' : 'info'}
              </span>
            </button>
          </div>
        </div>

        {/* ICT Expert (Right, lowest) */}
        <div className="org-spine-row org-spine-row--staggered">
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
              <span className="org-box__title">{ORG_DATA.ict.title}</span>
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
            <span className="org-box__title org-box__title--lg">{ORG_DATA.dm.title}</span>
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

      {/* =========================================================================
          Mobile Tiered Accordion Structure (< 900px)
          ========================================================================= */}
      <div className="org-mobile-accordion mobile-tree-only" role="region" aria-label={t('ui.tiersAriaLabel')}>
        {TIERS.map((tier) => {
          const isOpen = expandedTiers[tier.key]
          const hasSelectedNode = tier.nodeIds.includes(activeId)
          return (
            <div
              key={tier.key}
              className={`org-tier-card org-tier-card--${tier.theme} ${isOpen ? 'org-tier-card--open' : ''} ${hasSelectedNode ? 'org-tier-card--has-active' : ''}`}
            >
              <button
                type="button"
                className="org-tier-card__header"
                onClick={() => toggleTier(tier.key)}
                aria-expanded={isOpen}
              >
                <div className="org-tier-card__header-left">
                  <div className={`org-tier-card__icon-box org-tier-card__icon-box--${tier.theme}`}>
                    <span className="material-symbols-outlined">{tier.icon}</span>
                  </div>
                  <div className="org-tier-card__titles">
                    <div className="org-tier-card__badge-row">
                      <span className="org-tier-card__num">{tier.number}</span>
                      <span className="org-tier-card__count">{t('ui.rolesCount', { count: tier.nodeIds.length })}</span>
                    </div>
                    <h4 className="org-tier-card__title">{tier.title}</h4>
                    <p className="org-tier-card__sub">{tier.sub}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined org-tier-card__chevron">
                  {isOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {isOpen && (
                <div className="org-tier-card__body">
                  <div className="org-tier-card__roles-list">
                    {tier.nodeIds.map((id) => {
                      const node = ORG_DATA[id]
                      const isSelected = activeId === id
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`org-mobile-role-btn org-mobile-role-btn--${node.theme} ${isSelected ? 'org-mobile-role-btn--active' : ''}`}
                          onClick={() => handleNodeClick(id)}
                          aria-expanded={isSelected}
                        >
                          <span className="material-symbols-outlined org-mobile-role-btn__icon">{node.icon}</span>
                          <div className="org-mobile-role-btn__info">
                            <span className="org-mobile-role-btn__title">{node.title}</span>
                            <span className="org-mobile-role-btn__sub">{node.sub}</span>
                          </div>
                          <span className="material-symbols-outlined org-mobile-role-btn__arrow">
                            {isSelected ? 'expand_less' : 'info'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Living Inspector Panel (Seamlessly Connected Dossier with Auto-scroll) */}
      {activeNode && (
        <div className="org-inspector-wrapper" ref={inspectorRef}>
          {/* Visual Connector Bridge Linking Chart to Dossier */}
          <div className="org-inspector-bridge">
            <div className="org-inspector-bridge__line" />
            <div className="org-inspector-bridge__badge">
              <span className="material-symbols-outlined text-xs">manage_search</span>
              <span>{t('ui.roleProfile')}</span>
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
                aria-label={t('ui.dismissInspector')}
                title={t('ui.closeDossier')}
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
                      <span className="org-inspector-panel__leader-tag">{t('ui.appointedLeadership')}</span>
                      <h5 className="org-inspector-panel__leader-name">{appointedLeader.name}</h5>
                      <p className="org-inspector-panel__leader-title">{appointedLeader.title}</p>
                      {appointedLeader.email && (
                        <div className="org-inspector-panel__leader-contacts">
                          <a
                            href={`mailto:${appointedLeader.email}`}
                            className="org-inspector-panel__leader-link"
                            title={t('ui.emailTitle', { name: appointedLeader.name })}
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
                      {t('ui.keyMandates')}
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





