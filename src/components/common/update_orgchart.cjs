const fs = require('fs');
const path = 'c:/Users/billy/Desktop/MBU/src/components/common/OrgChart.jsx';
let content = fs.readFileSync(path, 'utf-8');

// 1. Add import
content = content.replace(
  "import { teamMembers } from '../../data/team.js'",
  "import { useTranslation } from 'react-i18next'\nimport { teamMembers } from '../../data/team.js'"
);

// 2. Convert ORG_DATA and TIERS
content = content.replace('const ORG_DATA = {', 'const getOrgData = (t) => ({\n');

const roles = ['ga', 'bod', 'cc', 'gm', 'lawyer', 'sec', 'plan', 'auditor', 'ict', 'dm', 'agri', 'marketing', 'hr', 'finance'];
for (const role of roles) {
  content = content.replace(new RegExp(`(  ${role}: \\{[\\s\\S]*?title:\\s*)('.*?')`, 'g'), `$1t('roles.${role}.title')`);
  content = content.replace(new RegExp(`(  ${role}: \\{[\\s\\S]*?sub:\\s*)('.*?')`, 'g'), `$1t('roles.${role}.sub')`);
  content = content.replace(new RegExp(`(  ${role}: \\{[\\s\\S]*?reportsTo:\\s*)('.*?')`, 'g'), `$1t('roles.${role}.reportsTo')`);
  content = content.replace(new RegExp(`(  ${role}: \\{[\\s\\S]*?desc:\\s*)('.*?')`, 'g'), `$1t('roles.${role}.desc')`);
  
  content = content.replace(new RegExp(`(  ${role}: \\{[\\s\\S]*?responsibilities:\\s*)(\\[[\\s\\S]*?\\])`, 'g'), `$1t('roles.${role}.responsibilities', { returnObjects: true })`);
}

content = content.replace('}\n\nconst TIERS = [', '})\n\nconst getTiers = (t) => ([');

const tiers = ['tier1', 'tier2', 'tier3'];
for (const tier of tiers) {
  content = content.replace(new RegExp(`(    key: '${tier}',\\s*number:\\s*)('.*?')`, 'g'), `$1t('tiers.${tier}.number')`);
  content = content.replace(new RegExp(`(    key: '${tier}',[\\s\\S]*?title:\\s*)('.*?')`, 'g'), `$1t('tiers.${tier}.title')`);
  content = content.replace(new RegExp(`(    key: '${tier}',[\\s\\S]*?sub:\\s*)('.*?')`, 'g'), `$1t('tiers.${tier}.sub')`);
}

content = content.replace('  },\n]\n\nexport default function OrgChart() {', '  },\n])\n\nexport default function OrgChart() {\n  const { t } = useTranslation(\'orgchart\')\n  const ORG_DATA = getOrgData(t)\n  const TIERS = getTiers(t)');

// 3. Replace strings in UI
content = content.replace('aria-label="Meki Batu Union Organizational Structure"', 'aria-label={t(\'ui.ariaLabel\')}');
content = content.replace('Selected: ${ORG_DATA[currentFocusId].title}', '${t(\'ui.selectedPrefix\')} ${ORG_DATA[currentFocusId].title}');
content = content.replace("'Interactive Organizational Tree • Click any role to view mandate'", "t('ui.defaultStatus')");
content = content.replace('<span>Clear Focus</span>', "<span>{t('ui.clearFocus')}</span>");
content = content.replace('title="Download high-resolution image"', "title={t('ui.downloadTitle')}");
content = content.replace("{isExporting ? 'Generating...' : 'Save Image'}", "{isExporting ? t('ui.generating') : t('ui.saveImage')}");
content = content.replace('title="Print or Save PDF"', "title={t('ui.printTitle')}");
content = content.replace("<span>Print</span>", "<span>{t('ui.print')}</span>");

content = content.replace('<span className="org-box__title">General Assembly</span>', '<span className="org-box__title">{ORG_DATA.ga.title}</span>');
content = content.replace('<span className="org-box__title">Control Committee</span>', '<span className="org-box__title">{ORG_DATA.cc.title}</span>');
content = content.replace('<span className="org-box__title">Board of Directors</span>', '<span className="org-box__title">{ORG_DATA.bod.title}</span>');
content = content.replace('<span className="org-box__title org-box__title--lg">General Manager</span>', '<span className="org-box__title org-box__title--lg">{ORG_DATA.gm.title}</span>');
content = content.replace('<span className="org-box__title">Lawyer</span>', '<span className="org-box__title">{ORG_DATA.lawyer.title}</span>');
content = content.replace('<span className="org-box__title">Executive Secretary</span>', '<span className="org-box__title">{ORG_DATA.sec.title}</span>');
content = content.replace('<span className="org-box__title">Preparing Plan, Evaluate and Budgeting Senior Expert</span>', '<span className="org-box__title">{ORG_DATA.plan.title}</span>');
content = content.replace('<span className="org-box__title">Internal Auditor</span>', '<span className="org-box__title">{ORG_DATA.auditor.title}</span>');
content = content.replace('<span className="org-box__title">ICT Expert</span>', '<span className="org-box__title">{ORG_DATA.ict.title}</span>');
content = content.replace('<span className="org-box__title org-box__title--lg">Deputy Manager</span>', '<span className="org-box__title org-box__title--lg">{ORG_DATA.dm.title}</span>');

content = content.replace('aria-label="Hierarchical Governance Tiers"', 'aria-label={t(\'ui.tiersAriaLabel\')}');
content = content.replace('<span className="org-tier-card__count">{tier.nodeIds.length} Roles</span>', '<span className="org-tier-card__count">{t(\'ui.rolesCount\', { count: tier.nodeIds.length })}</span>');

content = content.replace('<span>Role Profile &amp; Mandate</span>', "<span>{t('ui.roleProfile')}</span>");

content = content.replace('aria-label="Dismiss inspector"', "aria-label={t('ui.dismissInspector')}");
content = content.replace('title="Close dossier"', "title={t('ui.closeDossier')}");

content = content.replace('<span className="org-inspector-panel__leader-tag">Appointed Leadership</span>', '<span className="org-inspector-panel__leader-tag">{t(\'ui.appointedLeadership\')}</span>');

content = content.replace('title={`Email ${appointedLeader.name}`}', 'title={t(\'ui.emailTitle\', { name: appointedLeader.name })}');

content = content.replace('Key Mandates &amp; Responsibilities', "{t('ui.keyMandates')}");

fs.writeFileSync(path, content, 'utf-8');
console.log('Update completed');
