import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode, RefObject } from 'react';

import DotField from './components/DotField';
import LightRays from './components/LightRays';

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

const portraitUrl = assetUrl('assets/kun-avatar-transparent.png');
const launchScreenUrl = assetUrl('assets/projects/efundgpt-app/launch-screen.png');
const eWalletPageUrls = Array.from({ length: 8 }, (_, index) =>
  assetUrl(`assets/projects/e-wallet-app/page-${index + 1}.jpg`),
);
const eWalletCoverOverviewUrl = assetUrl('assets/projects/e-wallet-app/cover-overview.png');
const eWalletDesignPurposeUrl = assetUrl('assets/projects/e-wallet-app/design-purpose.png');
const eWalletInterfaceShowcaseUrl = assetUrl('assets/projects/e-wallet-app/interface-showcase.png');

const contactDetails = [
  { label: '微信', value: 'KunnnnuK' },
  { label: '电话', value: '13450491082' },
  { label: '邮箱', value: '543827446@qq.com' },
];

const marqueeImages = [
  assetUrl('assets/projects/efundgpt-app/home-cover.png'),
  assetUrl('assets/projects/efundgpt-app/home-detail.png'),
  assetUrl('assets/projects/efundgpt-app/home-interface.png'),
  eWalletPageUrls[5],
  eWalletPageUrls[6],
  eWalletPageUrls[7],
  assetUrl('assets/projects/solaris-digital/cover-1.webp'),
  assetUrl('assets/projects/solaris-digital/cover-2.webp'),
  assetUrl('assets/projects/solaris-digital/cover-3.webp'),
  assetUrl('assets/efundgpt/page-1.png'),
  assetUrl('assets/efundgpt/page-2.png'),
  assetUrl('assets/efundgpt/page-3.png'),
  assetUrl('assets/projects/efundgpt-app/home-interface.png'),
  assetUrl('assets/projects/efundgpt-app/home-detail.png'),
  launchScreenUrl,
  eWalletPageUrls[5],
  assetUrl('assets/projects/solaris-digital/cover-1.webp'),
  assetUrl('assets/projects/solaris-digital/cover-2.webp'),
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

const projects: Project[] = [
  {
    number: '01',
    name: 'EFundGPT',
    slug: 'efundgpt-app',
    category: 'App design',
    summary:
      'A mobile AI finance assistant experience prepared as a visual case-study shell for future project copy.',
    role: 'UX/UI Designer',
    year: '2026',
    scope: ['App Design', 'AI Experience', 'Finance UI'],
    coverImages: [
      assetUrl('assets/projects/efundgpt-app/home-interface.png'),
      assetUrl('assets/projects/efundgpt-app/home-cover.png'),
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
    coverImages: [eWalletDesignPurposeUrl, eWalletInterfaceShowcaseUrl, eWalletCoverOverviewUrl],
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
    name: 'Solaris Digital',
    slug: 'solaris-digital',
    category: 'Client',
    summary:
      'A modern digital product website direction reserved for a future client case study.',
    role: 'UX/UI Designer',
    year: '2026',
    scope: ['Web Design', 'Product Site', 'Visual System'],
    coverImages: [
      assetUrl('assets/projects/solaris-digital/cover-1.webp'),
      assetUrl('assets/projects/solaris-digital/cover-2.webp'),
      assetUrl('assets/projects/solaris-digital/cover-3.webp'),
    ],
    detailImages: [
      assetUrl('assets/projects/solaris-digital/cover-1.webp'),
      assetUrl('assets/projects/solaris-digital/cover-2.webp'),
      assetUrl('assets/projects/solaris-digital/cover-3.webp'),
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
    value: '51% / 49%',
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
  { name: '张某某', age: '20 岁', type: '上进青年' },
  { name: '陈某某', age: '36 岁', type: '职场白领' },
  { name: '蔡某某', age: '58 岁', type: '佛系长者' },
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
  },
  {
    title: '强化品牌外露',
    body: '通过易方达品牌传播度强化 E钱包品牌知名度，并在多种场景露出品牌以强化用户记忆。',
  },
  {
    title: '打造品牌符号',
    body: '在 UI 设计中通过界面内容结合情感化设计做衍生，让用户通过色彩、图形对品牌产生记忆与认知。',
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

const eWalletGraphicSystem = ['金刚区图标', '咨询入口', '专题头图', '辅助图形'];

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

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
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
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="contact-modal-close" type="button" aria-label="关闭联系方式弹窗" onClick={onClose}>
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
              <button type="button" onClick={() => copyValue(item.label, item.value)}>
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

  useEffect(() => {
    let frameId = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

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

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', resetMagnet);
    window.addEventListener('pointerleave', resetMagnet);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetMagnet);
      window.removeEventListener('pointerleave', resetMagnet);
    };
  }, []);

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

      <FadeIn className="hero-nav-wrap">
        <nav className="hero-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#price">Price</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </FadeIn>

      <div className="hero-title-shell">
        <h1 className="hero-heading">Hi, i&apos;m KUN</h1>
      </div>

      <MagneticPortrait portraitMotionRef={portraitMotionRef} portraitRef={portraitRef} />

      <div className="hero-bottom">
        <p>UX/UI Designer</p>
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
  images: string[];
  direction: 'forward' | 'reverse';
};

function MarqueeRow({ images, direction }: MarqueeRowProps) {
  return (
    <div className="marquee-window">
      <div className={`marquee-track marquee-${direction}`}>
        {[...images, ...images].map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt="Motion website preview"
            loading="lazy"
          />
        ))}
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
    <section className="services-section" id="price">
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
        <h2 className="section-heading gradient-heading">Project</h2>
      </FadeIn>

      <div className="project-stack">
        {projects.map((project, index) => (
          <a
            className="project-card project-link-card project-card-feature-left"
            href={getProjectPath(project)}
            key={project.number}
            onClick={(event) => handleInternalRouteClick(event, getProjectPath(project))}
            style={{ top: 72 + index * 24 }}
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
        ))}
      </div>
    </section>
  );
}

function Footer({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <footer className="footer" id="contact">
      <button type="button" onClick={onOpenContact}>Contact Me</button>
    </footer>
  );
}

function HomePage({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <main className="site-shell">
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

function EWalletCasePage({ onOpenContact, project }: { onOpenContact: () => void; project: Project }) {
  return (
    <main className="ewallet-replica-shell">
      <section className="ewallet-hero" id="ewallet-top">
        <nav className="ewallet-nav" aria-label="Case navigation">
          <a
            href={getProjectsHomePath()}
            onClick={(event) => handleInternalRouteClick(event, getProjectsHomePath())}
          >
            KUN Portfolio
          </a>
          <button type="button" onClick={onOpenContact}>
            Contact
          </button>
        </nav>

        <div className="ewallet-hero-grid">
          <FadeIn className="ewallet-hero-copy">
            <p className="ewallet-kicker">App Design / Finance Product Redesign</p>
            <h1>
              <span>E钱包</span>
              <strong>APP</strong>
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
            <img src={eWalletPageUrls[0]} alt="E钱包 APP 产品背景与项目流程" />
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
            <FadeIn className="ewallet-process-card" delay={index * 0.06} key={item.phase}>
              <span>{item.phase}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </FadeIn>
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
            {eWalletPersonas.map((persona) => (
              <article className="ewallet-persona-card" key={persona.name}>
                <span>{persona.age}</span>
                <strong>{persona.name}</strong>
                <p>{persona.type}</p>
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
            <img src={eWalletPageUrls[3]} alt="E钱包 APP 品牌传递" loading="lazy" />
          </FadeIn>
        </div>

        <div className="ewallet-brand-card-grid">
          {eWalletBrandDelivery.map((item, index) => (
            <FadeIn className="ewallet-brand-card" delay={index * 0.04} key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
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

          <FadeIn className="ewallet-style-card" delay={0.04}>
            <h3>字体规范</h3>
            {eWalletTypography.map((item) => (
              <article className="ewallet-type-token" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </FadeIn>

          <FadeIn className="ewallet-style-card" delay={0.08}>
            <h3>网格布局</h3>
            <ul>
              {eWalletGridRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="ewallet-style-card" delay={0.12}>
            <h3>图形体系</h3>
            <div className="ewallet-tag-cloud">
              {eWalletGraphicSystem.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
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
                <img src={item.image} alt={`E钱包 APP ${item.title}`} loading="lazy" />
                <span>{item.label}</span>
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

      <footer className="ewallet-footer">
        <a
          href={getProjectsHomePath()}
          onClick={(event) => handleInternalRouteClick(event, getProjectsHomePath())}
        >
          Back to Projects
        </a>
        <button type="button" onClick={onOpenContact}>
          Contact Me
        </button>
      </footer>
    </main>
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
    return <EWalletCasePage onOpenContact={onOpenContact} project={project} />;
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
          <p>Full process copy will be added after the final case-study text is ready.</p>
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
