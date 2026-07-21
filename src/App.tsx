import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode, RefObject } from 'react';

import DotField from './components/DotField';
import LightRays from './components/LightRays';

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

const portraitUrl = assetUrl('assets/kun-avatar-transparent.png');

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const decorations = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Moon 3D icon',
    className: 'about-deco about-deco-a',
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: 'Abstract 3D object',
    className: 'about-deco about-deco-b',
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Lego 3D icon',
    className: 'about-deco about-deco-c',
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: 'Grouped 3D objects',
    className: 'about-deco about-deco-d',
  },
];

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
      assetUrl('assets/projects/efundgpt-app/home-detail.png'),
      assetUrl('assets/projects/efundgpt-app/home-interface.png'),
      assetUrl('assets/projects/efundgpt-app/home-cover.png'),
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
    name: 'EFund platform',
    slug: 'efund-platform',
    category: 'Web design',
    summary:
      'A web platform direction for fund discovery, analytics, and portfolio management.',
    role: 'UX/UI Designer',
    year: '2026',
    scope: ['Web Design', 'Dashboard', 'Financial Platform'],
    coverImages: [
      assetUrl('assets/projects/efund-platform/cover-1.webp'),
      assetUrl('assets/projects/efund-platform/cover-2.webp'),
      assetUrl('assets/projects/efund-platform/cover-3.webp'),
    ],
    detailImages: [
      assetUrl('assets/projects/efund-platform/cover-1.webp'),
      assetUrl('assets/projects/efund-platform/cover-2.webp'),
      assetUrl('assets/projects/efund-platform/cover-3.webp'),
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

function ContactButton() {
  return (
    <a className="contact-button" href="mailto:hello@kun.studio">
      Contact Me
    </a>
  );
}

function isFileBuild() {
  return window.location.protocol === 'file:';
}

function getProjectPath(project: Project) {
  return isFileBuild() ? `#/projects/${project.slug}` : `/projects/${project.slug}`;
}

function getProjectsHomePath() {
  return isFileBuild() ? '#projects' : '/#projects';
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

function HeroSection() {
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
        <ContactButton />
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

function AboutSection() {
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
          我拥有六年以上设计经验，专注于 App、网页设计与用户体验。我很享受与希望脱颖而出、展现最佳形象的企业合作。让我们一起创造令人惊喜的作品！
        </p>
        <ContactButton />
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
            className={`project-card project-link-card${
              project.slug === 'efundgpt-app' ? ' project-card-feature-left' : ''
            }`}
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

function Footer() {
  return (
    <footer className="footer" id="contact">
      <a href="mailto:hello@kun.studio">hello@kun.studio</a>
    </footer>
  );
}

function HomePage() {
  return (
    <main className="site-shell">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <Footer />
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

function ProjectDetailPage({ project }: { project: Project }) {
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
          <a href="mailto:hello@kun.studio">Contact</a>
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
        <a href="mailto:hello@kun.studio">Contact Me</a>
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
  const hashProjectSlug = route.hash.match(/^#\/projects\/([^/]+)\/?$/)?.[1];
  const projectSlug = hashProjectSlug ?? route.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const project = projects.find((item) => item.slug === projectSlug);
  const isHomePath = route.pathname === '/' || route.pathname.endsWith('/index.html');
  const isFileHomePath = isFileBuild() && !hashProjectSlug;

  useEffect(() => {
    document.title = project ? `${project.name} -- KUN Portfolio` : 'KUN -- UX/UI Designer';
  }, [project]);

  if ((isHomePath || isFileHomePath) && !hashProjectSlug) {
    return <HomePage />;
  }

  if (project) {
    return <ProjectDetailPage project={project} />;
  }

  return <NotFoundPage />;
}
