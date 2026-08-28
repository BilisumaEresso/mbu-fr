import kumesaGudinaImg from '../assets/images/team/kumesa_gudina.webp'
import ashenafiRobaImg from '../assets/images/team/ashenafi_roba.webp'
import biyoUkeImg from '../assets/images/team/biyo_uke.webp'
import geletaDiribaImg from '../assets/images/team/geleta_diriba.webp'
import megarsoEbsoImg from '../assets/images/team/megarso_ebso.webp'
import lenchoHamdeImg from '../assets/images/team/lencho_hamde.webp'
import eresoAmbasoImg from '../assets/images/team/ereso_ambaso.webp'
import sisayYadesaImg from '../assets/images/team/sisay_yadesa.webp'

export const getTeamMembers = (t) => [
  {
    id: 'kumesa-gudina',
    name: t ? t('common:team.members.kumesaGudina.name', 'Kumesa Gudina') : 'Kumesa Gudina',
    title: t ? t('common:team.members.kumesaGudina.title', 'General Manager') : 'General Manager',
    roleCategory: t ? t('common:team.members.kumesaGudina.category', 'Executive') : 'Executive',
    department: t ? t('common:team.members.kumesaGudina.department', 'Executive Management') : 'Executive Management',
    email: 'kumesa.gudina@mekibatuunion.org',
    photo: kumesaGudinaImg,
    orgId: 'gm',
  },
  {
    id: 'ashenafi-roba',
    name: t ? t('common:team.members.ashenafiRoba.name', 'Ashenafi Roba') : 'Ashenafi Roba',
    title: t ? t('common:team.members.ashenafiRoba.title', 'Deputy Manager') : 'Deputy Manager',
    roleCategory: t ? t('common:team.members.ashenafiRoba.category', 'Executive') : 'Executive',
    department: t ? t('common:team.members.ashenafiRoba.department', 'Operational Management') : 'Operational Management',
    email: 'ashenafi.roba@mekibatuunion.org',
    photo: ashenafiRobaImg,
    orgId: 'dm',
  },
  {
    id: 'biyo-uke',
    name: t ? t('common:team.members.biyoUke.name', 'Biyo Uke') : 'Biyo Uke',
    title: t ? t('common:team.members.biyoUke.title', 'Lawyer & Legal Advisor') : 'Lawyer & Legal Advisor',
    roleCategory: t ? t('common:team.members.biyoUke.category', 'Executive Support') : 'Executive Support',
    department: t ? t('common:team.members.biyoUke.department', 'Legal Advisory') : 'Legal Advisory',
    email: 'biyo.uke@mekibatuunion.org',
    photo: biyoUkeImg,
    orgId: 'lawyer',
  },
  {
    id: 'geleta-diriba',
    name: t ? t('common:team.members.geletaDiriba.name', 'Geleta Diriba') : 'Geleta Diriba',
    title: t ? t('common:team.members.geletaDiriba.title', 'Senior Planning, Evaluation & Budgeting Expert') : 'Senior Planning, Evaluation & Budgeting Expert',
    roleCategory: t ? t('common:team.members.geletaDiriba.category', 'Executive Support') : 'Executive Support',
    department: t ? t('common:team.members.geletaDiriba.department', 'Planning & Evaluation') : 'Planning & Evaluation',
    email: 'geleta.diriba@mekibatuunion.org',
    photo: geletaDiribaImg,
    orgId: 'plan',
  },
  {
    id: 'megarso-ebso',
    name: t ? t('common:team.members.megarsoEbso.name', 'Megarso Ebso') : 'Megarso Ebso',
    title: t ? t('common:team.members.megarsoEbso.title', 'Agriculture & Farmer Service Center Dept Head') : 'Agriculture & Farmer Service Center Dept Head',
    roleCategory: t ? t('common:team.members.megarsoEbso.category', 'Department Head') : 'Department Head',
    department: t ? t('common:team.members.megarsoEbso.department', 'Agriculture & Inputs') : 'Agriculture & Inputs',
    email: 'megarso.ebso@mekibatuunion.org',
    photo: megarsoEbsoImg,
    orgId: 'agri',
  },
  {
    id: 'lencho-hamde',
    name: t ? t('common:team.members.lenchoHamde.name', 'Lencho Hamde') : 'Lencho Hamde',
    title: t ? t('common:team.members.lenchoHamde.title', 'Marketing Department Head') : 'Marketing Department Head',
    roleCategory: t ? t('common:team.members.lenchoHamde.category', 'Department Head') : 'Department Head',
    department: t ? t('common:team.members.lenchoHamde.department', 'Marketing & Commercial') : 'Marketing & Commercial',
    email: 'lencho.hamde@mekibatuunion.org',
    photo: lenchoHamdeImg,
    orgId: 'marketing',
  },
  {
    id: 'ereso-ambaso',
    name: t ? t('common:team.members.eresoAmbaso.name', 'Ereso Ambaso') : 'Ereso Ambaso',
    title: t ? t('common:team.members.eresoAmbaso.title', 'HR & General Service Department Head') : 'HR & General Service Department Head',
    roleCategory: t ? t('common:team.members.eresoAmbaso.category', 'Department Head') : 'Department Head',
    department: t ? t('common:team.members.eresoAmbaso.department', 'Human Resources & General Service') : 'Human Resources & General Service',
    email: 'ereso.ambaso@mekibatuunion.org',
    photo: eresoAmbasoImg,
    orgId: 'hr',
  },
  {
    id: 'sisay-yadesa',
    name: t ? t('common:team.members.sisayYadesa.name', 'Sisay Yadesa') : 'Sisay Yadesa',
    title: t ? t('common:team.members.sisayYadesa.title', 'Finance & Procurement Department Head') : 'Finance & Procurement Department Head',
    roleCategory: t ? t('common:team.members.sisayYadesa.category', 'Department Head') : 'Department Head',
    department: t ? t('common:team.members.sisayYadesa.department', 'Finance & Procurement') : 'Finance & Procurement',
    email: 'sisay.yadesa@mekibatuunion.org',
    photo: sisayYadesaImg,
    orgId: 'finance',
  },
]

export const teamMembers = getTeamMembers()
