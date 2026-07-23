import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode, RefObject } from 'react';

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
    coverImages: [eWalletPageUrls[6], eWalletPageUrls[7], eWalletPageUrls[5]],
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
    phase: 'Research',
    title: '调研分析',
    body: '讨论需求、整理文档、市场调研、竞品分析，并形成产品初步框架。',
  },
  {
    phase: 'Design',
    title: '方案设计',
    body: '完成功能模块分类、视觉风格探索、规范设定、组件库搭建、设计排期与界面设计。',
  },
  {
    phase: 'Delivery',
    title: '测试开发',
    body: '配合开发跟进视觉还原，完成功能测试、验收与上线。',
  },
];

const eWalletInsights = [
  {
    title: '产品背景',
    body: 'E 钱包 App 是易方达重要的直销渠道，承载产品信息展示、销售、用户资产管理等核心功能。随着用户习惯改变和品牌升级，需要同步进行设计风格升级。',
  },
  {
    title: '核心用户',
    body: '调研显示男女分布均衡，年龄集中在 30-40 岁；约 6% 用户持有 80% 的账户资产，易方达账户资产在 20 万以上的用户成为本次改版研究核心。',
  },
  {
    title: '旧版问题',
    body: '旧版在业务、品牌、用户和视觉维度存在重点不突出、功能入口不直观、品牌符号弱、内容展示低效和视觉语言不统一等问题。',
  },
  {
    title: '设计目标',
    body: '从视觉层、交互层和架构层同时优化：明确层级、降噪减负、强化品牌，简化路径并合并功能，让主要模块和定制化推荐更突出。',
  },
];

const eWalletColors = [
  { label: '品牌色', value: '#0063BA', color: '#0063BA' },
  { label: '辅助色', value: '#1EB9E1', color: '#1EB9E1' },
  { label: '辅助色', value: '#FFC819', color: '#FFC819' },
  { label: '字体', value: 'PingFang / Helvetica', color: 'linear-gradient(135deg, #f5f9ff, #bfdff6)' },
];

const eWalletSlides = [
  { title: '产品背景与项目流程', image: eWalletPageUrls[0] },
  { title: '用户调研与核心人群', image: eWalletPageUrls[1] },
  { title: '旧版解析与设计目的', image: eWalletPageUrls[2] },
  { title: '品牌传递', image: eWalletPageUrls[3] },
  { title: '风格定义', image: eWalletPageUrls[4] },
  { title: '首页改版展示', image: eWalletPageUrls[5] },
  { title: '基金页与基金详情', image: eWalletPageUrls[6] },
  { title: '我的页面与全量界面', image: eWalletPageUrls[7] },
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

function EWalletCasePage({ onOpenContact, project }: { onOpenContact: () => void; project: Project }) {
  return (
    <main className="efund-case-shell ewallet-case-shell">
      <section className="efund-case-hero">
        <nav className="efund-case-nav" aria-label="Case navigation">
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

        <div className="efund-light-rays" aria-hidden="true">
          <LightRays
            raysOrigin="top-center"
            raysColor="#0063BA"
            raysSpeed={0.75}
            lightSpread={1.05}
            rayLength={1.55}
            fadeDistance={1.15}
            saturation={1}
            followMouse
            mouseInfluence={0.06}
            noiseAmount={0.06}
            distortion={0.04}
          />
        </div>

        <div className="efund-hero-grid">
          <FadeIn className="efund-hero-copy">
            <p className="efund-case-kicker">App Design / Finance Product Redesign</p>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
            <div className="efund-role-strip" aria-label="Project facts">
              <span>Role: {project.role}</span>
              <span>Year: {project.year}</span>
              <span>Scope: {project.scope.join(' / ')}</span>
            </div>
          </FadeIn>

          <FadeIn className="efund-hero-visual" delay={0.08}>
            <img src={eWalletPageUrls[5]} alt="E钱包 APP 首页改版展示" />
          </FadeIn>
        </div>
      </section>

      <section className="efund-case-band">
        <FadeIn className="efund-section-intro">
          <p className="efund-case-kicker">Project Process</p>
          <h2>从调研到上线的完整设计流程</h2>
          <p>围绕直销 App 的核心业务场景，将调研分析、方案设计与测试开发串成可落地的产品改版路径。</p>
        </FadeIn>

        <div className="efund-module-track">
          {eWalletProcess.map((item, index) => (
            <FadeIn className="efund-module-item" delay={index * 0.06} key={item.phase}>
              <span>{item.phase}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="efund-case-band">
        <FadeIn className="efund-section-intro">
          <p className="efund-case-kicker">Research / Problem / Goal</p>
          <h2>重点梳理</h2>
          <p>将 PDF 中的背景、用户、旧版问题与设计目标重排成更适合网页阅读的案例结构。</p>
        </FadeIn>

        <div className="efund-insight-grid">
          {eWalletInsights.map((item, index) => (
            <FadeIn className="efund-insight-card" delay={index * 0.04} key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="efund-case-band">
        <div className="efund-system-band">
          <FadeIn className="efund-system-copy">
            <p className="efund-case-kicker">Style Definition</p>
            <h2>品牌视觉系统</h2>
            <p>
              在易方达品牌规范基础上，提高蓝色饱和度，配合辅助青与辅助黄，让界面保持母品牌基因，同时更轻盈、更年轻。
            </p>
          </FadeIn>

          <FadeIn className="efund-token-panel" delay={0.08}>
            {eWalletColors.map((item) => (
              <div className="efund-color-token" key={item.value}>
                <span style={{ background: item.color }} />
                <strong>{item.value}</strong>
                <em>{item.label}</em>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="efund-case-band">
        <FadeIn className="efund-section-intro">
          <p className="efund-case-kicker">Interface Presentation</p>
          <h2>核心界面展示</h2>
          <p>重点展示首页、基金页、基金详情和我的页面的结构升级、信息层级和资产管理体验。</p>
        </FadeIn>

        <div className="efund-showcase-grid">
          {[
            { label: 'Home Page', image: eWalletPageUrls[5] },
            { label: 'Fund / Fund Details', image: eWalletPageUrls[6] },
            { label: 'My Page', image: eWalletPageUrls[7] },
            { label: 'Style System', image: eWalletPageUrls[4] },
          ].map((item, index) => (
            <FadeIn className="efund-showcase-frame" delay={(index % 2) * 0.06} key={item.label}>
              <img src={item.image} alt={`E钱包 APP ${item.label}`} loading="lazy" />
              <span>{item.label}</span>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="efund-case-band">
        <FadeIn className="efund-section-intro">
          <p className="efund-case-kicker">Full Case Pages</p>
          <h2>完整案例页面</h2>
          <p>保留 PDF 的 8 个原始章节画面，作为网页案例的补充浏览内容。</p>
        </FadeIn>

        <div className="efund-slide-grid">
          {eWalletSlides.map((slide, index) => (
            <FadeIn className="efund-slide-card" delay={(index % 4) * 0.04} key={slide.title}>
              <img src={slide.image} alt={`E钱包 APP ${slide.title}`} loading="lazy" />
              <div>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{slide.title}</strong>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <footer className="efund-case-footer">
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
