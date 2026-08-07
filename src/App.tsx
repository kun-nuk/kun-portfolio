import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode, RefObject } from 'react';

import DotField from './components/DotField';
import BorderGlow from './components/BorderGlow';
import LightRays from './components/LightRays';
import SpotlightCard from './components/SpotlightCard';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

const portraitUrl = assetUrl('assets/kun-avatar-transparent.png');
const launchScreenUrl = assetUrl('assets/projects/efundgpt-app/launch-screen.png');
const eWalletPageUrls = Array.from({ length: 8 }, (_, index) =>
  assetUrl(`assets/projects/e-wallet-app/page-${index + 1}.jpg`),
);
const eWalletInterfaceShowcaseUrl = assetUrl('assets/projects/e-wallet-app/interface-showcase.png');
const eWalletHomeCoverNewUrl = assetUrl('assets/projects/e-wallet-app/ewallet-home-cover-new.png');
const eWalletStyleDefinitionUrl = assetUrl(
  'assets/projects/e-wallet-app/ewallet-style-definition.png',
);
const eWalletHeroHomeScreenUrl = assetUrl('assets/projects/e-wallet-app/hero-home-screen.png');
const eWalletBrandDeliveryOverviewUrl = assetUrl('assets/projects/e-wallet-app/brand-delivery-overview.jpg');
const eWalletBrandGenePanelUrl = assetUrl('assets/projects/e-wallet-app/brand-gene-panel.png');
const eWalletBrandExposurePanelUrl = assetUrl('assets/projects/e-wallet-app/brand-exposure-panel.png');
const eWalletBrandSymbolPanelUrl = assetUrl('assets/projects/e-wallet-app/brand-symbol-panel.png');
const eWalletGridLayoutPanelUrl = assetUrl('assets/projects/e-wallet-app/grid-layout-panel.png');
const eWalletGraphicSystemPanelUrl = assetUrl('assets/projects/e-wallet-app/graphic-system-panel.png');
const eWalletPersonaZhangUrl = assetUrl('assets/projects/e-wallet-app/persona-zhang.png');
const eWalletPersonaChenUrl = assetUrl('assets/projects/e-wallet-app/persona-chen.png');
const eWalletPersonaCaiUrl = assetUrl('assets/projects/e-wallet-app/persona-cai.png');
const discoverPageUrls = Array.from({ length: 12 }, (_, index) =>
  assetUrl(`assets/projects/yifaxian-platform/pdf/page-${String(index + 1).padStart(2, '0')}.jpg`),
);
const discoverComponentSpecUrl = assetUrl(
  'assets/projects/yifaxian-platform/mastergo/ws-component-spec.png',
);
const discoverProjectDisassemblyUrl = assetUrl(
  'assets/projects/yifaxian-platform/mastergo/ws-project-disassembly-detail.png',
);
const discoverProjectDisassemblyCoverUrl = assetUrl(
  'assets/projects/yifaxian-platform/mastergo/ws-project-disassembly-cover.jpg',
);

const contactDetails = [
  { label: '微信', value: 'KunnnnuK' },
  { label: '电话', value: '13450491082' },
  { label: '邮箱', value: '543827446@qq.com' },
];

const marqueeImages = [
  {
    src: assetUrl('assets/projects/efundgpt-app/home-cover.png'),
    alt: 'EFundGPT 首页封面设计',
  },
  {
    src: assetUrl('assets/projects/efundgpt-app/home-detail.png'),
    alt: 'EFundGPT 首页详情模块设计',
  },
  {
    src: assetUrl('assets/projects/efundgpt-app/home-interface.png'),
    alt: 'EFundGPT 移动端界面总览',
  },
  {
    src: eWalletPageUrls[5],
    alt: 'E 钱包首页改版界面',
  },
  {
    src: eWalletPageUrls[6],
    alt: 'E 钱包基金页面与基金详情界面',
  },
  {
    src: eWalletPageUrls[7],
    alt: 'E 钱包我的页面与资产管理界面',
  },
  {
    src: discoverPageUrls[0],
    alt: '易发现平台项目封面',
  },
  {
    src: discoverPageUrls[5],
    alt: '易发现平台设计流程页面',
  },
  {
    src: discoverPageUrls[11],
    alt: '易发现平台深浅色界面展示',
  },
  {
    src: assetUrl('assets/efundgpt/page-1.png'),
    alt: 'EFundGPT 项目展示第 1 页',
  },
  {
    src: assetUrl('assets/efundgpt/page-2.png'),
    alt: 'EFundGPT 项目展示第 2 页',
  },
  {
    src: assetUrl('assets/efundgpt/page-3.png'),
    alt: 'EFundGPT 项目展示第 3 页',
  },
  {
    src: assetUrl('assets/projects/efundgpt-app/home-interface.png'),
    alt: 'EFundGPT 移动端界面总览',
  },
  {
    src: assetUrl('assets/projects/efundgpt-app/home-detail.png'),
    alt: 'EFundGPT 首页详情模块设计',
  },
  {
    src: launchScreenUrl,
    alt: 'EFundGPT 启动页设计',
  },
  {
    src: eWalletPageUrls[5],
    alt: 'E 钱包首页改版界面',
  },
  {
    src: discoverPageUrls[9],
    alt: '易发现平台工具栏与搜索入口界面',
  },
  {
    src: discoverPageUrls[10],
    alt: '易发现平台组件与数据看板界面',
  },
];

type Decoration = {
  src: string;
  alt: string;
  className: string;
};

const decorations: Decoration[] = [];

const services = [
  {
    number: '01',
    name: 'App DESIGN',
    description:
      '根据业务目标与用户场景，设计清晰易用的 App 产品界面，覆盖信息架构、核心流程与视觉呈现。',
  },
  {
    number: '02',
    name: 'Web DESIGN',
    description:
      '设计简洁、现代且强调转化的网页体验，关注布局、字体层级、视觉节奏与用户体验。',
  },
  {
    number: '03',
    name: 'AIGC',
    description:
      '结合 AI 生成内容与设计流程，快速探索视觉方向、生成素材，并提升产品创意与执行效率。',
  },
  {
    number: '04',
    name: 'IP DESIGN',
    description:
      '构建具有识别度的 IP 与品牌视觉体系，从角色、标志到延展元素，形成清晰且记忆点强的形象。',
  },
  {
    number: '05',
    name: 'INDIVIDUAL PRACTICE',
    description:
      '持续进行个人设计练习与概念项目探索，沉淀界面、动效、AIGC 与视觉表达能力。',
  },
];

type Project = {
  number: string;
  name: string;
  slug: string;
  legacySlugs?: string[];
  category: string;
  summary: string;
  role: string;
  year: string;
  scope: string[];
  coverImages: string[];
  detailImages: string[];
  caseSections?: Array<{
    title: string;
    body: string;
  }>;
};

type EWalletImagePreview = {
  image: string;
  label?: string;
  title: string;
  projectName?: string;
};

const projects: Project[] = [
  {
    number: '01',
    name: 'EFundGPT',
    slug: 'efundgpt-app',
    category: 'App design',
    summary:
      '移动端 AI 金融助手体验设计，围绕启动页、首页信息架构与资产内容展示建立清晰的产品视觉方向。',
    role: 'UX/UI Designer',
    year: '2026',
    scope: ['App Design', 'AI Experience', 'Finance UI'],
    coverImages: [
      assetUrl('assets/projects/efundgpt-app/home-cover.png'),
      assetUrl('assets/projects/efundgpt-app/home-interface.png'),
      launchScreenUrl,
    ],
    detailImages: [
      assetUrl('assets/projects/efundgpt-app/mockup.png'),
      assetUrl('assets/efundgpt/page-1.png'),
      assetUrl('assets/efundgpt/page-2.png'),
      assetUrl('assets/efundgpt/page-3.png'),
      assetUrl('assets/efundgpt/page-4.png'),
      assetUrl('assets/efundgpt/page-5.png'),
      assetUrl('assets/efundgpt/page-6.png'),
      assetUrl('assets/efundgpt/page-7.png'),
      assetUrl('assets/efundgpt/page-8.png'),
      assetUrl('assets/efundgpt/page-9.png'),
    ],
  },
  {
    number: '02',
    name: 'E钱包 APP',
    slug: 'e-wallet-app',
    legacySlugs: ['efund-platform'],
    category: 'App design',
    summary:
      '易方达 E 钱包 App 作为直销渠道，承载产品信息展示、销售与用户资产管理。本次案例围绕品牌升级、信息架构重组和移动端基金交易体验进行设计焕新。',
    role: 'UX/UI Designer',
    year: '2026',
    scope: ['App Redesign', 'Finance UI', 'Design System'],
    coverImages: [eWalletStyleDefinitionUrl, eWalletInterfaceShowcaseUrl, eWalletHomeCoverNewUrl],
    detailImages: [
      eWalletPageUrls[5],
      eWalletPageUrls[0],
      eWalletPageUrls[1],
      eWalletPageUrls[2],
      eWalletPageUrls[3],
      eWalletPageUrls[4],
      eWalletPageUrls[6],
      eWalletPageUrls[7],
    ],
  },
  {
    number: '03',
    name: '易发现平台',
    slug: 'yifaxian-platform',
    legacySlugs: ['solaris-digital'],
    category: 'WEB DESIGN',
    summary:
      '易发现是为企业员工打造的一站式工作平台，整合企业内部数据、场景和信息，统一功能入口、统一账户体系以及统一使用体验。',
    role: 'UX/UI Designer',
    year: '2026',
    scope: ['Web Design', 'Enterprise Platform', 'Design System'],
    coverImages: [
      discoverProjectDisassemblyUrl,
      discoverProjectDisassemblyCoverUrl,
      discoverPageUrls[0],
    ],
    detailImages: [
      discoverPageUrls[0],
      discoverPageUrls[1],
      discoverPageUrls[2],
      discoverPageUrls[3],
      discoverPageUrls[4],
      discoverPageUrls[5],
      discoverPageUrls[6],
      discoverPageUrls[7],
      discoverPageUrls[8],
      discoverPageUrls[9],
      discoverPageUrls[10],
      discoverPageUrls[11],
    ],
  },
];

const eWalletProcess = [
  {
    phase: '01',
    title: '调研分析',
    body: '讨论需求、整理文档、市场调研、竞品分析，并形成产品初步框架。',
  },
  {
    phase: '02',
    title: '方案设计',
    body: '完成功能模块分类、视觉风格探索、规范设定、组件库搭建、设计排期与界面设计。',
  },
  {
    phase: '03',
    title: '测试开发',
    body: '配合开发跟进视觉还原，完成功能测试、验收与上线。',
  },
];

const eWalletResearchStats = [
  {
    value: '51% : 49%',
    label: '性别分布',
    body: '女性 51%，男性 49%，男女用户比例基本均衡。',
  },
  {
    value: '30-40 岁',
    label: '核心年龄',
    body: '用户年龄集中在 30-40 岁，占比 39.7%。',
  },
  {
    value: '6%',
    label: '资产核心用户',
    body: '约 6% 用户持有 80% 的账户资产，20 万以上资产用户成为重点研究对象。',
  },
];

const eWalletAgeDistribution = [
  { label: '20 岁以下', value: 0.1 },
  { label: '20-30 岁', value: 21.4 },
  { label: '30-40 岁', value: 39.7 },
  { label: '40-50 岁', value: 21.6 },
  { label: '50-60 岁', value: 12.4 },
  { label: '60 岁以上', value: 4.8 },
];

const eWalletPreferenceDistribution = [
  { label: '最低类别 C0', value: 1.0 },
  { label: '安益型 C1', value: 1.1 },
  { label: '保守型 C2', value: 4.4 },
  { label: '稳健型 C3', value: 30.3 },
  { label: '积极型 C4', value: 21.2 },
  { label: '激进型 C5', value: 2.0 },
  { label: '未知', value: 40.0 },
];

const eWalletPersonas = [
  {
    name: '张某某',
    age: '20 岁',
    type: '上进青年',
    avatar: eWalletPersonaZhangUrl,
    needs:
      '比较注重产品的安全性和收益情况，渴望财富增长，具有较强的自我提升意愿。',
    behavior:
      '积极进取，善于自主学习，利用碎片时间通过互联网学习理财知识。常浏览理财信息，并乐意尝试各种金融产品。',
  },
  {
    name: '陈某某',
    age: '36 岁',
    type: '职场白领',
    avatar: eWalletPersonaChenUrl,
    needs:
      '追求生活品质，注重高效、专业的服务体验，在直销 app 上购买基金的目的明确。',
    behavior:
      '关注专业机构的市场行情分析、媒体资讯等。对市场行情和理财需求有清楚认知，有主见，不需要直销 app 给过多引导和资讯。',
  },
  {
    name: '蔡某某',
    age: '58 岁',
    type: '佛系长者',
    avatar: eWalletPersonaCaiUrl,
    needs:
      '偏爱购买保障类和权益类产品，希望 app 给一些引导、推荐和专业分析。',
    behavior:
      '基金持有周期较长，不会频繁交易，倾向客户经理一对一的投资教育形式。通过朋友告知或客户经理推荐购买基金咨询人工客服较多。',
  },
];

const eWalletProblemGroups = [
  {
    title: '业务维度',
    points: ['缺乏运营活动推广区域', '快捷功能入口、产品推荐位不直观', '重点和特色内容不突出'],
  },
  {
    title: '品牌维度',
    points: ['IP 形象延展弱', '品牌核心塑造不明确', '缺乏直接的品牌符号或标识'],
  },
  {
    title: '用户维度',
    points: ['不满足目标用户群体', '内容单调不够丰富', '图标辨别度差'],
  },
  {
    title: '视觉维度',
    points: ['版本老旧，内容展示低效', '页面色彩搭配混乱，主色调不明确', '缺乏品质感与品牌设计语言'],
  },
];

const eWalletDesignGoals = [
  {
    title: '视觉层',
    body: '层级明确，降噪减负，规范统一，强化品牌，适当增加情感化设计，提升用户体验。',
  },
  {
    title: '交互层',
    body: '简化路径，优化信息展示层级，避免多次跳转，减少认知和学习成本，提升操作体验。',
  },
  {
    title: '架构层',
    body: '合并功能，凸显主要模块；增加用户引流与定制化推荐，提升用户操作体验和转化率。',
  },
];

const eWalletBrandDelivery = [
  {
    title: '提炼品牌基因',
    body: '沿用易方达品牌符号，通常用在卡片右上角，传达品牌并丰富页面。',
    image: eWalletBrandGenePanelUrl,
  },
  {
    title: '强化品牌外露',
    body: '通过易方达品牌传播度强化 E钱包品牌知名度，并在多种场景露出品牌以强化用户记忆。',
    image: eWalletBrandExposurePanelUrl,
  },
  {
    title: '打造品牌符号',
    body: '在 UI 设计中通过界面内容结合情感化设计做衍生，让用户通过色彩、图形对品牌产生记忆与认知。',
    image: eWalletBrandSymbolPanelUrl,
  },
];

const eWalletColorTokens = [
  { label: '品牌色', value: '#0063BA', color: '#0063BA' },
  { label: '辅助色', value: '#1EB9E1', color: '#1EB9E1' },
  { label: '辅助色', value: '#FFC819', color: '#FFC819' },
];

const eWalletTypography = [
  { label: '中文字体', value: '苹方 PingFang' },
  { label: '数字字体', value: 'Helvetica 1234567890' },
];

const eWalletGridRules = [
  '界面模块化设计，强化信息层次。',
  '建立统一布局基础，提升团队输出的一致性。',
  '以 8 的整数倍建立间距规则，适配不同机型分辨率。',
];

const eWalletInterfaces = [
  {
    title: '首页改版展示',
    label: 'Home Page',
    image: eWalletPageUrls[5],
    body: '首页围绕搜索、登录、资产信息、运营活动、金刚区和产品内容进行重组，让用户更快触达核心信息，也让品牌基因在高频入口中持续外露。',
    points: [
      '搜索区域降低信息查找门槛，提高触达内容效率。',
      '登录成功后展示资产信息，并提供一键登录与完善资料引导。',
      '瓷片区与金刚区减少操作路径，品牌色与辅助色配合轻质感图标，提升识别效率。',
      '对产品内容重新划分，突出基金亮点、深入解剖分析和内容分流。',
    ],
  },
  {
    title: '基金页与基金详情',
    label: 'Fund / Details',
    image: eWalletPageUrls[6],
    body: '基金相关页面将旧版拥挤的筛选与信息展示重构为更清晰的层级，让用户从基金分类、发行阶段到详情走势都能快速判断。',
    points: [
      '基金类型入口直达对应产品列表，提高获取效率。',
      '筛选区域改造为金刚区，并配合图标帮助用户直观理解。',
      '新增新发基金和最近浏览模块，优化基金信息获取路径。',
      '详情页顶部集中展示基金核心信息，并强化涨跌、收益曲线和关键互动问题。',
    ],
  },
  {
    title: '我的页面与资产管理',
    label: 'My Page',
    image: eWalletPageUrls[7],
    body: '“我的”页面被定义为资产管理和账户体系管理的核心场景，重点提升持仓、收益、快捷入口和资产信息的可读性。',
    points: [
      '增加美元资产模块，满足不同用户需求。',
      '按不同收益类型划分，让收益信息一目了然。',
      '通过收益数据可视化提升信息获取效率。',
      '增加快捷入口，减少路径跳转，优化操作体验。',
    ],
  },
];

const discoverProcess = [
  {
    phase: '01',
    title: '调研',
    body: '项目前期与项目组成员一同面向客户，与客户进行访谈，明确用户需求，了解用户喜好。',
  },
  {
    phase: '02',
    title: '需求',
    body: '与业务、产品确认主要功能及信息架构，补充完善产品交互设计方案。',
  },
  {
    phase: '03',
    title: '目标',
    body: '优化产品体验，统一视觉风格，建立系统设计规范。',
  },
  {
    phase: '04',
    title: '设计',
    body: '优化交互设计，落地界面视觉设计。',
  },
  {
    phase: '05',
    title: '输出',
    body: '对接研发及测试，对项目进行设计验收和反馈收集。',
  },
];

const discoverUserQuotes = [
  '每天都需要打开很多系统，在不同系统中切换。',
  '总是找不到操作在哪里。',
  '功能操作链路过长，导致信息传递不及时。',
  '每次都需要在一堆文字数据里找我想要的内容。',
  '系统界面看着有点老旧。',
];

const discoverPainPoints = [
  {
    code: 'Q1',
    title: '风格规范不统一',
    body: '未制定统一的组件规范，集成多套组件样式状态，造成产品整体风格、交互不统一。',
  },
  {
    code: 'Q2',
    title: '信息架构不清晰',
    body: '信息内容平铺堆叠，未做明确的信息区域划分与功能合并，造成用户的信息查找困难。',
  },
  {
    code: 'Q3',
    title: '功能信息分布分散',
    body: '用户需要在多个系统中寻找相应的数据信息，切换系统与加载界面会耗费大量时间。',
  },
];

const discoverGoals = [
  {
    layer: '表现层',
    title: '强化产品属性',
    points: [
      '搭建组件库规范：使用组件搭建界面，保持页面交互一致性，减少用户学习成本。',
      'UI 视觉升级：重新定义产品整体视觉风格，打造产品专属风格。',
    ],
  },
  {
    layer: '框架层',
    title: '提升用户体验',
    points: [
      '模块划分：功能拆解，划分页面区块并调整信息结构。',
      '功能合并：相同能力合并，减少能力分散，帮助用户快速高效获取信息。',
    ],
  },
  {
    layer: '战略层',
    title: '减少路径跳转',
    points: [
      '搭建场景组件：提炼原有界面重要信息，通过窗口化方式让用户随时监控内容。',
      '功能组件侧边栏：在页面右侧新增轻量工具栏，方便用户调用其他系统功能信息。',
    ],
  },
];

const discoverColorTokens = [
  { label: '品牌色 1', value: '#0088FF', color: '#0088FF' },
  { label: '品牌色 2', value: '#1EB9E1', color: '#1EB9E1' },
  { label: '警示', value: '#F1A000', color: '#F1A000' },
  { label: '安全', value: '#47A550', color: '#47A550' },
  { label: '危险', value: '#CF4A4A', color: '#CF4A4A' },
  { label: '辅助', value: '#CFDAE6', color: '#CFDAE6' },
];

const discoverWorkbenchLayers = [
  {
    title: '信息层面',
    body: '通过不同维度对事项进行划分，并通过标签、字体颜色对重点信息进行强调，方便用户快速获取信息。',
  },
  {
    title: '数据层面',
    body: '把数据信息以可视化形式展示出来，让使用者清晰查看数据构成和数据趋势。',
  },
  {
    title: '业务层面',
    body: '在业务场景下组合关键指标数据、图表、列表等多种内容类型，为用户提供更全面的信息参考。',
  },
  {
    title: '颗粒度调整',
    body: '用户可自行调整组件颗粒度大小，从小颗粒度提醒到大颗粒度分析组件，适配不同工作深度。',
  },
];

const discoverInterfaces: EWalletImagePreview[] = [
  {
    label: 'Design Cycle',
    title: '设计流程',
    image: discoverPageUrls[1],
    projectName: '易发现平台',
  },
  {
    label: 'Workspace',
    title: '工作台组件拆解',
    image: discoverPageUrls[7],
    projectName: '易发现平台',
  },
  {
    label: 'Toolbar / Search',
    title: '工具栏与搜索入口',
    image: discoverPageUrls[9],
    projectName: '易发现平台',
  },
  {
    label: 'Light / Dark Mode',
    title: '同异视觉形象',
    image: discoverPageUrls[11],
    projectName: '易发现平台',
  },
];

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '80px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

type ContactButtonProps = {
  children?: ReactNode;
  className?: string;
  onOpenContact: () => void;
};

function ContactButton({ children = 'Contact Me', className = '', onOpenContact }: ContactButtonProps) {
  return (
    <button className={`contact-button${className ? ` ${className}` : ''}`} type="button" onClick={onOpenContact}>
      {children}
    </button>
  );
}

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => !element.hasAttribute('disabled') && element.offsetParent !== null);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    const originalOverflow = document.body.style.overflow;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const copyValue = async (label: string, value: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        document.execCommand('copy');
        document.body.removeChild(field);
      }

      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel(null), 1600);
    } catch {
      setCopiedLabel(null);
    }
  };

  return (
    <div
      className="contact-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        aria-labelledby="contact-modal-title"
        aria-modal="true"
        className="contact-modal"
        ref={modalRef}
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="contact-modal-close"
          type="button"
          aria-label="关闭联系方式弹窗"
          onClick={onClose}
          ref={closeButtonRef}
        >
          <X aria-hidden="true" />
        </button>

        <p className="contact-modal-kicker">Contact KUN</p>
        <div className="contact-modal-title-row">
          <h2 id="contact-modal-title">Contact</h2>
          <p>联系方式</p>
        </div>

        <div className="contact-info-list">
          {contactDetails.map((item) => (
            <div className="contact-info-row" key={item.label}>
              <div className="contact-info-copy">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <button
                type="button"
                aria-label={`复制${item.label}`}
                onClick={() => copyValue(item.label, item.value)}
              >
                {copiedLabel === item.label ? '已复制' : '复制'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function isFileBuild() {
  return window.location.protocol === 'file:';
}

function getProjectPath(project: Project) {
  return `#/projects/${project.slug}`;
}

function getProjectsHomePath() {
  return '#projects';
}

function getHomePath() {
  return '#top';
}

function navigateTo(path: string) {
  if (path.startsWith('#')) {
    window.location.hash = path;
  } else {
    window.history.pushState(null, '', path);
  }

  window.dispatchEvent(new PopStateEvent('popstate'));

  if (path.includes('#')) {
    window.setTimeout(() => {
      const hash = path.split('#')[1];

      if (hash && !hash.startsWith('/projects/')) {
        document.getElementById(hash)?.scrollIntoView({ block: 'start' });
      } else {
        window.scrollTo({ top: 0 });
      }
    }, 0);
    return;
  }

  window.scrollTo({ top: 0 });
}

function handleInternalRouteClick(event: ReactMouseEvent<HTMLAnchorElement>, path: string) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
    return;
  }

  event.preventDefault();
  navigateTo(path);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useHeroMagnet() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitMotionRef = useRef<HTMLDivElement>(null);
  const dotFieldRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      portraitMotionRef.current?.style.setProperty('transform', 'translate3d(0, 0, 0)');
      dotFieldRef.current?.style.setProperty('transform', 'translate3d(0, 0, 0)');
      return undefined;
    }

    let frameId = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHeroVisible = true;

    const writeTransform = (x: number, y: number) => {
      const transform = `translate3d(${x}px, ${y}px, 0)`;

      if (portraitMotionRef.current) {
        portraitMotionRef.current.style.transform = transform;
      }

      if (dotFieldRef.current) {
        dotFieldRef.current.style.transform = transform;
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;

      const deltaX = Math.abs(targetX - currentX);
      const deltaY = Math.abs(targetY - currentY);

      if (deltaX < 0.08 && deltaY < 0.08) {
        currentX = targetX;
        currentY = targetY;
        writeTransform(currentX, currentY);
        frameId = 0;
        return;
      }

      writeTransform(currentX, currentY);
      frameId = requestAnimationFrame(animate);
    };

    const scheduleAnimation = () => {
      if (frameId === 0) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isHeroVisible) {
        return;
      }

      const portrait = portraitRef.current;

      if (!portrait) {
        return;
      }

      const rect = portrait.getBoundingClientRect();
      const padding = Math.max(360, window.innerWidth * 0.22);
      const inRange =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!inRange) {
        targetX = 0;
        targetY = 0;
        scheduleAnimation();
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxX = 130;
      const maxY = 92;
      targetX = clamp(((event.clientX - centerX) / padding) * maxX, -maxX, maxX);
      targetY = clamp(((event.clientY - centerY) / padding) * maxY, -maxY, maxY);

      scheduleAnimation();
    };

    const resetMagnet = () => {
      targetX = 0;
      targetY = 0;
      scheduleAnimation();
    };

    const heroElement = portraitRef.current?.closest('.hero-section') ?? null;
    const observer =
      heroElement && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              isHeroVisible = entries.some((entry) => entry.isIntersecting);

              if (!isHeroVisible) {
                resetMagnet();
              }
            },
            { threshold: 0 },
          )
        : null;

    if (observer && heroElement) {
      observer.observe(heroElement);
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', resetMagnet);
    window.addEventListener('pointerleave', resetMagnet);

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetMagnet);
      window.removeEventListener('pointerleave', resetMagnet);
    };
  }, [prefersReducedMotion]);

  return { dotFieldRef, portraitMotionRef, portraitRef };
}

type MagneticPortraitProps = {
  portraitMotionRef: RefObject<HTMLDivElement>;
  portraitRef: RefObject<HTMLDivElement>;
};

function MagneticPortrait({ portraitMotionRef, portraitRef }: MagneticPortraitProps) {
  return (
    <div className="portrait-shell" ref={portraitRef}>
      <div className="portrait-motion" ref={portraitMotionRef}>
        <div className="portrait-glow" />
        <img src={portraitUrl} alt="KUN UX/UI Designer portrait" draggable={false} />
      </div>
    </div>
  );
}

function SiteNav() {
  return (
    <SpotlightCard className="hero-nav-wrap" spotlightColor="rgba(180, 196, 210, 0.08)">
      <nav className="hero-nav" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </SpotlightCard>
  );
}

function EWalletCaseNav() {
  return (
    <div className="ewallet-case-nav-wrap">
      <nav className="ewallet-case-nav" aria-label="Case navigation">
        <span className="ewallet-case-nav-brand">
          <span aria-hidden="true" />
          KUN Product Designer
        </span>
        <a href={getHomePath()} onClick={(event) => handleInternalRouteClick(event, getHomePath())}>
          <ArrowLeft aria-hidden="true" size={18} strokeWidth={2.4} />
          返回首页
        </a>
      </nav>
    </div>
  );
}

function HeroSection({ onOpenContact }: { onOpenContact: () => void }) {
  const { dotFieldRef, portraitMotionRef, portraitRef } = useHeroMagnet();

  return (
    <section className="hero-section" id="top">
      <div className="hero-dot-field" ref={dotFieldRef}>
        <DotField
          dotRadius={1.7}
          dotSpacing={15}
          cursorRadius={560}
          bulgeStrength={82}
          glowRadius={240}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(187, 204, 215, 0.24)"
          gradientTo="rgba(182, 0, 168, 0.18)"
          glowColor="rgba(118, 33, 176, 0.42)"
        />
      </div>

      <div className="hero-title-shell">
        <h1 className="hero-heading">Hi, i&apos;m KUN</h1>
      </div>

      <MagneticPortrait portraitMotionRef={portraitMotionRef} portraitRef={portraitRef} />

      <div className="hero-bottom">
        <p>UX/UI Designer for app, web and finance product systems</p>
        <ContactButton onOpenContact={onOpenContact} />
      </div>
    </section>
  );
}

function MarqueeSection() {
  const firstRow = marqueeImages.slice(0, 11);
  const secondRow = marqueeImages.slice(11);

  return (
    <section className="marquee-section" aria-label="Motion project previews">
      <MarqueeRow images={firstRow} direction="forward" />
      <MarqueeRow images={secondRow} direction="reverse" />
    </section>
  );
}

type MarqueeRowProps = {
  images: Array<{
    alt: string;
    src: string;
  }>;
  direction: 'forward' | 'reverse';
};

function MarqueeRow({ images, direction }: MarqueeRowProps) {
  const repeatedImages = [...images, ...images];

  return (
    <div className="marquee-window">
      <div className={`marquee-track marquee-${direction}`}>
        {repeatedImages.map((image, index) => {
          const isDuplicate = index >= images.length;

          return (
            <img
              aria-hidden={isDuplicate ? 'true' : undefined}
              key={`${image.src}-${index}`}
              src={image.src}
              alt={isDuplicate ? '' : image.alt}
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
  );
}

function AboutSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="about-section" id="about">
      {decorations.map((item) => (
        <img
          className={item.className}
          key={item.src}
          src={item.src}
          alt={item.alt}
          loading="lazy"
        />
      ))}

      <FadeIn className="about-content">
        <h2 className="section-heading gradient-heading">About me</h2>
        <p>
          哈喽，你好呀～～我拥有六年以上设计经验，专注于 App、网页设计与用户体验。我很享受与希望脱颖而出、展现最佳形象的企业合作。让我们一起创造令人惊喜的作品！
        </p>
        <ContactButton onOpenContact={onOpenContact} />
      </FadeIn>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <FadeIn>
        <h2 className="section-heading dark-heading">Services</h2>
      </FadeIn>

      <div className="services-list">
        {services.map((service, index) => (
          <FadeIn className="service-row" delay={index * 0.06} key={service.number}>
            <span>{service.number}</span>
            <div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <FadeIn>
        <h2 className="section-heading gradient-heading">Projects</h2>
      </FadeIn>

      <div className="project-stack">
        {projects.map((project, index) => (
          <BorderGlow
            className={`project-glow-card project-glow-card-${project.slug}`}
            key={project.number}
            animated={index === 0}
            backgroundColor="#0c0c0c"
            borderRadius="clamp(36px, 5vw, 60px)"
            colors={['#2d8cff', '#a56cff', '#ff4fb8']}
            coneSpread={24}
            edgeSensitivity={24}
            fillOpacity={0.2}
            glowColor="205 90 68"
            glowIntensity={1.15}
            glowRadius={34}
          >
            <a
              className={`project-card project-link-card project-card-feature-left project-card-${project.slug}`}
              href={getProjectPath(project)}
              onClick={(event) => handleInternalRouteClick(event, getProjectPath(project))}
            >
              <div className="project-card-top">
                <div className="project-title-group">
                  <span>{project.number}</span>
                  <div>
                    <p>{project.category}</p>
                    <h3>{project.name}</h3>
                  </div>
                </div>
                <span className="live-button">View Case</span>
              </div>

              <div className="project-images">
                <div className="project-left">
                  <img src={project.coverImages[0]} alt={`${project.name} preview 1`} loading="lazy" />
                  <img src={project.coverImages[1]} alt={`${project.name} preview 2`} loading="lazy" />
                </div>
                <img
                  className="project-main"
                  src={project.coverImages[2]}
                  alt={`${project.name} main preview`}
                  loading="lazy"
                />
              </div>
            </a>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}

function Footer({ onOpenContact }: { onOpenContact: () => void }) {
  const handleBackToTop = () => {
    document.getElementById('top')?.scrollIntoView({ block: 'start' });
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-actions">
        <button type="button" onClick={onOpenContact}>Contact Me</button>
        <button type="button" onClick={handleBackToTop}>Back To Top</button>
      </div>
    </footer>
  );
}

function HomePage({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <main className="site-shell">
      <SiteNav />
      <HeroSection onOpenContact={onOpenContact} />
      <MarqueeSection />
      <AboutSection onOpenContact={onOpenContact} />
      <ServicesSection />
      <ProjectsSection />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}

function EWalletSectionHeading({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <FadeIn className="ewallet-section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <div>{children}</div>
    </FadeIn>
  );
}

function EWalletBarList({
  items,
  title,
}: {
  items: Array<{ label: string; value: number }>;
  title: string;
}) {
  return (
    <div className="ewallet-chart-card">
      <h3>{title}</h3>
      <div className="ewallet-bar-list">
        {items.map((item) => (
          <div className="ewallet-bar-row" key={item.label}>
            <div>
              <span>{item.label}</span>
              <strong>{item.value.toFixed(1)}%</strong>
            </div>
            <div className="ewallet-bar-track">
              <i
                className="ewallet-bar-fill"
                style={{ '--bar-value': `${item.value}%` } as CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EWalletImageLightbox({
  image,
  onClose,
}: {
  image: EWalletImagePreview | null;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!image) {
      return undefined;
    }

    setZoom(1);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) {
    return null;
  }

  const zoomOut = () => {
    setZoom((currentZoom) => Math.max(1, Number((currentZoom - 0.25).toFixed(2))));
  };

  const zoomIn = () => {
    setZoom((currentZoom) => Math.min(2.5, Number((currentZoom + 0.25).toFixed(2))));
  };

  return (
    <div
      className="ewallet-image-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title}完整图片`}
      onClick={onClose}
    >
      <div className="ewallet-image-lightbox" onClick={(event) => event.stopPropagation()}>
        <div className="ewallet-image-lightbox-header ewallet-image-lightbox-header-controls-only">
          <div className="ewallet-image-lightbox-controls">
            <button type="button" onClick={zoomOut} aria-label="缩小图片">
              <ZoomOut aria-hidden="true" />
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={zoomIn} aria-label="放大图片">
              <ZoomIn aria-hidden="true" />
            </button>
            <button type="button" onClick={onClose} aria-label="关闭图片预览">
              <X aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="ewallet-image-lightbox-viewport">
          <img
            src={image.image}
            alt={`${image.projectName ?? 'E钱包 APP'} ${image.title}完整展示`}
            style={{ width: `${zoom * 100}%`, maxWidth: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

function EWalletCasePage({ project }: { project: Project }) {
  const [previewImage, setPreviewImage] = useState<EWalletImagePreview | null>(null);

  return (
    <>
      <EWalletCaseNav />
      <main className="ewallet-replica-shell">
      <section className="ewallet-hero" id="ewallet-top">
        <div className="ewallet-hero-grid">
          <FadeIn className="ewallet-hero-copy">
            <p className="ewallet-kicker">App Design / Finance Product Redesign</p>
            <h1>
              <span>E钱包 <strong>APP</strong></span>
            </h1>
            <p>
              易方达 E 钱包 App 作为重要的直销渠道，承载产品信息展示、销售、用户资产管理等核心功能。本次案例围绕品牌升级、信息架构重组和移动端基金交易体验进行设计焕新。
            </p>
            <div className="ewallet-hero-meta" aria-label="Project facts">
              <span>Role: {project.role}</span>
              <span>Year: {project.year}</span>
              <span>Scope: {project.scope.join(' / ')}</span>
            </div>
          </FadeIn>

          <FadeIn className="ewallet-cover-board" delay={0.08}>
            <img src={eWalletHeroHomeScreenUrl} alt="E钱包 APP 首页界面展示" />
          </FadeIn>
        </div>
      </section>

      <section className="ewallet-section ewallet-background-section">
        <EWalletSectionHeading eyebrow="Project Background" title="产品背景与项目流程">
          <p>
            近年来，国民投资理财意识日渐觉醒，投资理财需求不断激增。“E钱包”APP 作为易方达重要的直销渠道，承担产品信息展示、销售、用户资产管理等核心能力。随着互联网时代用户习惯改变和其他官方形象的品牌升级，E钱包也需要同步完成设计风格升级。
          </p>
        </EWalletSectionHeading>

        <div className="ewallet-process-grid">
          {eWalletProcess.map((item, index) => (
            <BorderGlow
              animated={index === 0}
              backgroundColor="#f7fbff"
              borderRadius={28}
              className="ewallet-process-glow-card"
              colors={['#0063ba', '#1eb9e1', '#78aaff']}
              coneSpread={24}
              edgeSensitivity={24}
              fillOpacity={0.2}
              glowColor="203 100 58"
              glowIntensity={0.8}
              glowRadius={28}
              key={item.phase}
            >
              <FadeIn className="ewallet-process-card" delay={index * 0.06}>
                <span>{item.phase}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </FadeIn>
            </BorderGlow>
          ))}
        </div>
      </section>

      <section className="ewallet-section ewallet-research-section">
        <EWalletSectionHeading eyebrow="User Research" title="用户调研">
          <p>
            易方达 E钱包整体用户男女分布均衡，年龄集中在 30-40 岁，登录频次以 1-5 次/月较多，投资偏好集中在稳健型和积极型。资产高度集中，因此高资产用户是本次改版研究核心。
          </p>
        </EWalletSectionHeading>

        <div className="ewallet-stat-grid">
          {eWalletResearchStats.map((item, index) => (
            <FadeIn className="ewallet-stat-card" delay={index * 0.05} key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <p>{item.body}</p>
            </FadeIn>
          ))}
        </div>

        <div className="ewallet-chart-grid">
          <FadeIn>
            <EWalletBarList title="年龄分布" items={eWalletAgeDistribution} />
          </FadeIn>
          <FadeIn delay={0.06}>
            <EWalletBarList title="投资偏好" items={eWalletPreferenceDistribution} />
          </FadeIn>
        </div>

        <FadeIn className="ewallet-persona-panel">
          <div>
            <p className="ewallet-kicker">Personas</p>
            <h3>典型用户画像</h3>
            <p>
              越来越多年轻人开始投资理财，年轻人的新投资偏好和理财习惯成为金融市场的重要变量。如何抓住年轻人群，是金融投资互联网平台保持持续增长不可忽略的问题。
            </p>
          </div>
          <div className="ewallet-persona-list">
            {eWalletPersonas.map((persona, index) => (
              <article className="ewallet-persona-card" key={persona.name}>
                <div className="ewallet-persona-head">
                  <img src={persona.avatar} alt={`${persona.name}用户画像`} loading="lazy" />
                  <div>
                    <span>{persona.name}</span>
                    <strong>{persona.age}</strong>
                    <p>{persona.type}</p>
                  </div>
                  <em>{String(index + 1).padStart(2, '0')}</em>
                </div>
                <div className="ewallet-persona-copy">
                  <h4>需求偏好：</h4>
                  <p>{persona.needs}</p>
                  <h4>行为偏好：</h4>
                  <p>{persona.behavior}</p>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="ewallet-section ewallet-problem-section">
        <EWalletSectionHeading eyebrow="Old Version Analysis / Design Purpose" title="旧版解析与设计目标">
          <p>
            旧版问题集中在业务承接、品牌表达、用户效率和视觉语言四个维度。设计目标从视觉层、交互层、架构层同时推进，让信息层级、操作路径和品牌表达更清晰。
          </p>
        </EWalletSectionHeading>

        <div className="ewallet-problem-goal-grid">
          <div className="ewallet-problem-list">
            {eWalletProblemGroups.map((group, index) => (
              <FadeIn className="ewallet-problem-card" delay={index * 0.04} key={group.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="ewallet-goal-panel" delay={0.08}>
            {eWalletDesignGoals.map((goal) => (
              <article key={goal.title}>
                <h3>{goal.title}</h3>
                <p>{goal.body}</p>
              </article>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="ewallet-section ewallet-brand-section">
        <div className="ewallet-brand-grid">
          <EWalletSectionHeading eyebrow="Brand Delivery" title="品牌传递">
            <p>
              品牌传递是旧版设计中缺失的一环。为了缓解产品推广中品牌知名度和信任度不足的问题，页面需要在不同场景持续展示品牌要素，强化用户认知和记忆。
            </p>
          </EWalletSectionHeading>

          <FadeIn className="ewallet-brand-image" delay={0.08}>
            <img src={eWalletBrandDeliveryOverviewUrl} alt="E钱包 APP 品牌传递概览" loading="lazy" />
          </FadeIn>
        </div>

        <div className="ewallet-brand-card-grid">
          {eWalletBrandDelivery.map((item, index) => (
            <FadeIn className="ewallet-brand-card" delay={index * 0.04} key={item.title}>
              <div className="ewallet-brand-card-copy">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
              <img className="ewallet-brand-card-image" src={item.image} alt={`E钱包 APP ${item.title}`} loading="lazy" />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="ewallet-section ewallet-style-section">
        <EWalletSectionHeading eyebrow="Style Definition" title="风格定义">
          <p>
            整体焕新升级后，界面采用更时尚、更轻盈的视觉语言，同时让页面结构与功能布局更加清晰。
          </p>
        </EWalletSectionHeading>

        <div className="ewallet-style-grid">
          <FadeIn className="ewallet-style-card ewallet-color-panel">
            <h3>颜色规范</h3>
            <div>
              {eWalletColorTokens.map((item) => (
                <article className="ewallet-color-token" key={item.value}>
                  <span style={{ background: item.color }} />
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="ewallet-style-card ewallet-typography-card" delay={0.04}>
            <h3>字体规范</h3>
            {eWalletTypography.map((item) => (
              <article className="ewallet-type-token" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
            <div className="ewallet-type-showcase" aria-label="字体展示">
              <span>Aa</span>
              <div>
                <strong>E钱包 APP</strong>
                <p>1234567890</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="ewallet-style-card ewallet-style-card-with-image" delay={0.08}>
            <h3>网格布局</h3>
            <ul>
              {eWalletGridRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <img
              className="ewallet-style-support-image ewallet-grid-layout-image"
              src={eWalletGridLayoutPanelUrl}
              alt="E钱包 APP 网格布局辅助说明"
              loading="lazy"
            />
          </FadeIn>

          <FadeIn className="ewallet-style-card ewallet-style-card-wide ewallet-style-card-with-image" delay={0.12}>
            <h3>图形体系</h3>
            <img
              className="ewallet-style-support-image ewallet-graphic-system-image"
              src={eWalletGraphicSystemPanelUrl}
              alt="E钱包 APP 图形体系展示"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      <section className="ewallet-section ewallet-interface-section">
        <EWalletSectionHeading eyebrow="Interface Presentation" title="核心界面展示">
          <p>把 PDF 中的界面讲解重排为可阅读的网页卡片，截图用于展示界面效果，文字要点单独放大呈现。</p>
        </EWalletSectionHeading>

        <div className="ewallet-interface-stack">
          {eWalletInterfaces.map((item, index) => (
            <FadeIn
              className={`ewallet-interface-card${index % 2 === 1 ? ' ewallet-interface-card-reverse' : ''}`}
              delay={(index % 2) * 0.05}
              key={item.title}
            >
              <div className="ewallet-interface-visual">
                <button
                  type="button"
                  className="ewallet-interface-visual-button"
                  onClick={() => setPreviewImage(item)}
                  aria-label={`查看${item.title}完整图片`}
                >
                  <img src={item.image} alt={`E钱包 APP ${item.title}`} loading="lazy" />
                  <span>{item.label}</span>
                </button>
              </div>
              <div className="ewallet-interface-copy">
                <p className="ewallet-kicker">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

        <EWalletImageLightbox image={previewImage} onClose={() => setPreviewImage(null)} />
      </main>
    </>
  );
}

function DiscoverSectionHeading({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <FadeIn className="discover-section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <div>{children}</div>
    </FadeIn>
  );
}

function DiscoverImageButton({
  image,
  label,
  title,
  onPreview,
}: EWalletImagePreview & {
  onPreview: (image: EWalletImagePreview) => void;
}) {
  return (
    <button
      type="button"
      className="discover-image-button"
      onClick={() => onPreview({ image, label, title, projectName: '易发现平台' })}
      aria-label={`查看${title}完整图片`}
    >
      <img src={image} alt={`易发现平台 ${title}`} loading="lazy" />
      {label ? <span>{label}</span> : null}
    </button>
  );
}

function DiscoverCaseNav() {
  return (
    <div className="discover-case-nav-wrap">
      <nav className="discover-case-nav" aria-label="Case navigation">
        <span className="discover-case-nav-brand">
          <span aria-hidden="true" />
          KUN Product Designer
        </span>
        <a href={getHomePath()} onClick={(event) => handleInternalRouteClick(event, getHomePath())}>
          <ArrowLeft aria-hidden="true" size={18} strokeWidth={2.4} />
          返回首页
        </a>
      </nav>
    </div>
  );
}

function DiscoverCasePage({ project }: { project: Project }) {
  const [previewImage, setPreviewImage] = useState<EWalletImagePreview | null>(null);

  return (
    <>
      <DiscoverCaseNav />
      <main className="discover-case-shell">
        <section className="discover-hero" id="discover-top">
          <div className="discover-hero-grid">
            <FadeIn className="discover-hero-copy">
              <p className="discover-kicker">Web Design / Enterprise Work Platform</p>
              <h1>
                易发现
                <span>eFind</span>
              </h1>
              <p>
                易发现是为企业员工打造的一站式工作平台，整合企业内部数据、场景和信息，统一功能入口、统一账户体系以及统一使用体验，为企业员工提升效能，降低学习成本。
              </p>
              <div className="discover-hero-meta" aria-label="Project facts">
                <span>Role: {project.role}</span>
                <span>Year: {project.year}</span>
                <span>Scope: {project.scope.join(' / ')}</span>
              </div>
            </FadeIn>

            <FadeIn className="discover-hero-visual" delay={0.08}>
              <DiscoverImageButton
                image={discoverPageUrls[0]}
                label="Cover"
                title="产品背景与封面"
                onPreview={setPreviewImage}
              />
            </FadeIn>
          </div>
        </section>

      <section className="discover-section discover-overview-section">
        <DiscoverSectionHeading eyebrow="Project Background" title="产品背景与设计流程">
          <p>
            根据业务方需求，产品诉求被拆成两部分：打造专属品牌文化，并设计出流畅舒适的用户体验。改版围绕“分散、冗杂、无序”的旧状态，推进到“整合、独立、统一”的新体验。
          </p>
        </DiscoverSectionHeading>

        <div className="discover-process-grid">
          {discoverProcess.map((item, index) => (
            <FadeIn className="discover-process-card" delay={index * 0.04} key={item.phase}>
              <span>{item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="discover-section discover-research-section">
        <DiscoverSectionHeading eyebrow="User Research" title="用户调研与问题定义">
          <p>
            前期通过客户访谈和问卷反馈，重点确认员工在多系统切换、信息查找、操作路径和旧版视觉上的主要阻力。
          </p>
        </DiscoverSectionHeading>

        <div className="discover-research-grid">
          <FadeIn className="discover-quote-panel">
            <p className="discover-kicker">Feedback</p>
            <h3>用户访问反馈</h3>
            <ul>
              {discoverUserQuotes.map((quote) => (
                <li key={quote}>{quote}</li>
              ))}
            </ul>
          </FadeIn>

          <div className="discover-pain-grid">
            {discoverPainPoints.map((item, index) => (
              <FadeIn className="discover-pain-card" delay={index * 0.04} key={item.code}>
                <span>{item.code}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="discover-section discover-goals-section">
        <DiscoverSectionHeading eyebrow="Design Goals" title="设计目标">
          <p>通过表现层、框架层和战略层三个目标，提升产品的视觉交互体验。</p>
        </DiscoverSectionHeading>

        <div className="discover-goal-grid">
          {discoverGoals.map((goal, index) => (
            <FadeIn className="discover-goal-card" delay={index * 0.04} key={goal.layer}>
              <p>{goal.layer}</p>
              <h3>{goal.title}</h3>
              <ul>
                {goal.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="discover-section discover-system-section">
        <DiscoverSectionHeading eyebrow="Design System" title="视觉规范与组件系统">
          <p>
            共搭建 50+ 组件集，可根据基础业务场景进行变体，同时支持一键切换深浅色模式，节约人力输出成本。
          </p>
        </DiscoverSectionHeading>

        <div className="discover-system-grid">
          <FadeIn className="discover-system-card discover-color-card">
            <h3>颜色规范</h3>
            <div>
              {discoverColorTokens.map((item) => (
                <article key={item.value}>
                  <span style={{ background: item.color }} />
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="discover-system-card discover-type-card" delay={0.04}>
            <h3>字体与基础规则</h3>
            <article>
              <span>中文 / 英文字体</span>
              <strong>阿里巴巴普惠体 2.0</strong>
            </article>
            <article>
              <span>数字字体</span>
              <strong>DIN PRO 1234567890</strong>
            </article>
            <article>
              <span>圆角与间距</span>
              <strong>2px radius / 8px spacing base</strong>
            </article>
          </FadeIn>

          <FadeIn className="discover-system-visual" delay={0.08}>
            <DiscoverImageButton
              image={discoverComponentSpecUrl}
              title="组件库与设计规范"
              onPreview={setPreviewImage}
            />
          </FadeIn>
        </div>
      </section>

      <section className="discover-section discover-workbench-section">
        <DiscoverSectionHeading eyebrow="Project Disassembly" title="工作台与组件拆解">
          <p>
            通过预设工作台、组件库和工作台组装能力，用户可以灵活组装个性化工作空间，持续概览、监控和预警工作内容。
          </p>
        </DiscoverSectionHeading>

        <div className="discover-workbench-grid">
          <FadeIn className="discover-workbench-panel">
            <button
              type="button"
              className="discover-workbench-background-button"
              onClick={() =>
                setPreviewImage({
                  image: discoverProjectDisassemblyUrl,
                  title: '工作台与组件拆解',
                  projectName: '易发现平台',
                })
              }
              aria-label="查看工作台与组件拆解完整图片"
            >
              <img src={discoverProjectDisassemblyUrl} alt="易发现平台 工作台与组件拆解完整展示" loading="lazy" />
            </button>
            <div className="discover-workbench-copy discover-workbench-copy-overlay">
              {discoverWorkbenchLayers.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="discover-section discover-interface-section">
        <DiscoverSectionHeading eyebrow="Interface Presentation" title="核心页面展示">
          <p>
            将 PDF 中的关键页面以可读网页卡片呈现。点击图片可打开完整大图，并支持放大查看。
          </p>
        </DiscoverSectionHeading>

        <div className="discover-interface-grid">
          {discoverInterfaces.map((item, index) => (
            <FadeIn className="discover-interface-card" delay={(index % 3) * 0.04} key={item.title}>
              <DiscoverImageButton {...item} onPreview={setPreviewImage} />
              <div>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <EWalletImageLightbox image={previewImage} onClose={() => setPreviewImage(null)} />
      </main>
    </>
  );
}

function useRouteLocation() {
  const [route, setRoute] = useState(() => ({
    hash: window.location.hash,
    pathname: window.location.pathname,
  }));

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute({
        hash: window.location.hash,
        pathname: window.location.pathname,
      });
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return route;
}

function ProjectDetailPage({ onOpenContact, project }: { onOpenContact: () => void; project: Project }) {
  if (project.slug === 'e-wallet-app') {
    return <EWalletCasePage project={project} />;
  }

  if (project.slug === 'yifaxian-platform') {
    return <DiscoverCasePage project={project} />;
  }

  const isEfundProject = project.slug === 'efundgpt-app';

  return (
    <main className={`case-detail-shell${isEfundProject ? ' case-detail-shell-efund' : ''}`}>
      <section className={`case-detail-hero${isEfundProject ? ' case-detail-hero-efund' : ''}`}>
        <nav className="case-detail-nav" aria-label="Case navigation">
          <a
            href={getProjectsHomePath()}
            onClick={(event) => handleInternalRouteClick(event, getProjectsHomePath())}
          >
            KUN Portfolio
          </a>
          <button className="case-contact-link" type="button" onClick={onOpenContact}>
            Contact
          </button>
        </nav>

        {isEfundProject ? (
          <div className="case-detail-light-rays" aria-hidden="true">
            <LightRays
              raysOrigin="top-center"
              raysColor="#0088FF"
              raysSpeed={0.85}
              lightSpread={1.05}
              rayLength={1.75}
              fadeDistance={1.18}
              saturation={1}
              followMouse
              mouseInfluence={0.08}
              noiseAmount={0.08}
              distortion={0.06}
            />
          </div>
        ) : null}

        <div className="case-detail-hero-grid">
          <FadeIn className="case-detail-copy">
            <p className="case-detail-kicker">{project.category}</p>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>

            <div className="case-detail-facts" aria-label="Project facts">
              <span>Role: {project.role}</span>
              <span>Year: {project.year}</span>
              <span>Scope: {project.scope.join(' / ')}</span>
            </div>
          </FadeIn>

          <FadeIn className="case-detail-hero-visual" delay={0.08}>
            <img src={project.detailImages[0]} alt={`${project.name} case cover`} />
          </FadeIn>
        </div>
      </section>

      {project.caseSections && project.caseSections.length > 0 ? (
        <section className="case-detail-section">
          <div className="case-copy-grid">
            {project.caseSections.map((section) => (
              <FadeIn className="case-copy-block" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </FadeIn>
            ))}
          </div>
        </section>
      ) : null}

      <section className="case-detail-section">
        <FadeIn className="case-section-intro">
          <p className="case-detail-kicker">Selected Screens</p>
          <h2>Visual case gallery</h2>
          <p>关键界面以完整页面形式呈现，方便查看启动页、首页结构和核心视觉细节。</p>
        </FadeIn>

        <div className="case-gallery-grid">
          {project.detailImages.map((image, index) => (
            <FadeIn className="case-gallery-card" delay={(index % 3) * 0.04} key={image}>
              <img src={image} alt={`${project.name} screen ${index + 1}`} loading="lazy" />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </FadeIn>
          ))}
        </div>
      </section>

      <footer className="case-detail-footer">
        <a
          href={getProjectsHomePath()}
          onClick={(event) => handleInternalRouteClick(event, getProjectsHomePath())}
        >
          Back to Projects
        </a>
        <button className="case-contact-link" type="button" onClick={onOpenContact}>
          Contact Me
        </button>
      </footer>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="case-detail-shell">
      <section className="not-found-section">
        <p className="case-detail-kicker">404</p>
        <h1>Project not found</h1>
        <a
          href={getProjectsHomePath()}
          onClick={(event) => handleInternalRouteClick(event, getProjectsHomePath())}
        >
          Back to Projects
        </a>
      </section>
    </main>
  );
}

export default function App() {
  const route = useRouteLocation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const hashProjectSlug = route.hash.match(/^#\/projects\/([^/]+)\/?$/)?.[1];
  const projectSlug = hashProjectSlug ?? route.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const project = projects.find(
    (item) => item.slug === projectSlug || item.legacySlugs?.includes(projectSlug ?? ''),
  );
  const isHomePath = route.pathname === '/' || route.pathname.endsWith('/index.html');
  const isFileHomePath = isFileBuild() && !hashProjectSlug;
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  useEffect(() => {
    document.title = project ? `${project.name} -- KUN Portfolio` : 'KUN -- UX/UI Designer';
  }, [project]);

  let page: ReactNode;

  if ((isHomePath || isFileHomePath) && !hashProjectSlug) {
    page = <HomePage onOpenContact={openContactModal} />;
  } else if (project) {
    page = <ProjectDetailPage onOpenContact={openContactModal} project={project} />;
  } else {
    page = <NotFoundPage />;
  }

  return (
    <>
      {page}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
}
