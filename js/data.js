/* =========================================
   GABRIELLA LIMA PORTFOLIO GAME — Data
   ========================================= */

const TIMELINE_EVENTS = [
  {
    id: 'jean-leal',
    year: '2015',
    company: 'Jean Leal Imobiliária',
    role: 'Real Estate Intern',
    icon: '🏢',
    summary: 'Customer service, bank accounts, loans, client acquisition',
    lesson: '"Aprendi que todo negócio precisa de sistemas — e que gente feliz compra mais."',
    details: 'Meu primeiro emprego de verdade. Aprendi a lidar com clientes difíceis, processar documentos bancários e entender que relacionamento é tudo em qualquer setor.',
    skills: [{ id: 'business', points: 10, label: '+10 Business Fundamentals' }],
    bg: 'office',
    special: false
  },
  {
    id: 'vitrage-gnd',
    year: '2017–2019',
    company: 'Vitrage & GND',
    role: 'Sales Consultant',
    icon: '🛍️',
    summary: 'Sales, customer service, cashier, store organization, inventory management',
    lesson: '"Aprendi a vender. A conversar. A fechar. Isso mudou tudo."',
    details: 'Dois anos trabalhando em varejo me ensinaram que venda não é empurrar produto — é entender o que o cliente realmente precisa. Fechei metas consistentemente e ganhei confiança pra conquistar qualquer cliente.',
    skills: [{ id: 'sales', points: 15, label: '+15 Sales & Client Acquisition' }],
    bg: 'retail',
    special: false
  },
  {
    id: 'studio-praia',
    year: '2020',
    company: 'Studio Praia',
    role: 'Multi-role Specialist',
    icon: '💅',
    summary: 'Services, customer service, social media, advertising, content creation',
    lesson: '"Comecei como profissional de beleza enquanto cursava faculdade. E aprendi a fazer de tudo."',
    details: 'Além dos serviços de beleza, eu mesma cuidava das redes sociais, criava os conteúdos e fazia as peças de divulgação. Foi aqui que descobri que amava criar conteúdo que atrai clientes de verdade.',
    skills: [
      { id: 'content', points: 20, label: '+20 Content Creation' },
      { id: 'social', points: 15, label: '+15 Social Media' }
    ],
    stats: 'Primeiros conteúdos orgânicos que geraram fila de espera',
    bg: 'salon',
    special: false
  },
  {
    id: 'gabeauty',
    year: '2020',
    company: 'Studio Gabeauty',
    role: 'CEO & Founder',
    icon: '✨',
    summary: 'Built and ran end-to-end: services, scheduling, finance, customer relationships, social media',
    lesson: '"Abri meu próprio espaço. 1 ano depois lancei minha própria linha de cosméticos. Aprendi o que é ser dona do próprio sonho."',
    details: 'Construí do zero: marca, espaço físico, processos, time, financeiro. Em 1 ano lancei uma linha própria de cosméticos. Cheguei a 50+ clientes agendados por mês só com estratégia orgânica.',
    skills: [
      { id: 'business', points: 25, label: '+25 Business & Operations' },
      { id: 'marketing', points: 20, label: '+20 Marketing' }
    ],
    stats: '50+ clientes agendados/mês | Linha própria de cosméticos em 1 ano',
    bg: 'studio',
    special: false
  },
  {
    id: 'furto',
    year: '2020–2023',
    company: 'O FURTO',
    role: 'Momento Crítico',
    icon: '💔',
    summary: 'Cheguei pra trabalhar e tinham levado TUDO.',
    lesson: '"Tentei reconstruir. Foi muito difícil. Mas isso me fez mais forte do que eu imaginava ser."',
    details: 'Meu estúdio, meu estoque de cosméticos, meus produtos. Levaram tudo. Tentei ficar, mas reconstruir era pesado demais. Decidi que precisava de outro caminho — e esse foi o começo da minha virada.',
    skills: [{ id: 'resilience', points: 30, label: '+30 Resiliência' }],
    bg: 'dark',
    special: true,
    furtoEvent: true
  },
  {
    id: 'gd-beauty',
    year: '2024',
    company: 'GD Beauty Salon',
    role: 'Manager',
    icon: '💼',
    summary: 'Daily operations, conflict resolution, inventory, scheduling, finance, marketing',
    lesson: '"Comecei a gerenciar outros salões. Aplicava tudo que tinha aprendido — e funcionava."',
    details: 'Assumi a gestão completa de salão: processos, equipe, financeiro, marketing. Aprendi a transformar operações caóticas em sistemas eficientes. Foi minha volta por cima.',
    skills: [{ id: 'management', points: 20, label: '+20 Team Management' }],
    bg: 'salon',
    special: false
  },
  {
    id: 'spazzio',
    year: '2025',
    company: 'Spazzio Beauty',
    role: 'Team Supervisor',
    icon: '🏆',
    summary: 'Day to day operations, team performance, customer satisfaction, content creation, management meetings',
    lesson: '"Liderava equipes maiores. Descobri que amava gerenciar operações. Fui além de supervisora — fui a pessoa que transformava times."',
    details: 'Responsável pelo desempenho da equipe, satisfação dos clientes e criação de conteúdo. Aprendi a escalar operações e liderar pessoas com performance consistente.',
    skills: [{ id: 'operations', points: 25, label: '+25 Operations Management' }],
    bg: 'office',
    special: false
  },
  {
    id: 'cleaning-defenders',
    year: '2025–2026',
    company: 'Cleaning Defenders',
    role: 'Business & Marketing Manager',
    icon: '🚀',
    summary: 'Daily ops, scheduling, client communication, payroll prep, paid ads on Google, Yelp & Thumbtack',
    lesson: '"Passei a trabalhar remotamente. De qualquer lugar, gerencio tudo. E os números falam por si."',
    details: 'Gerenciamento remoto completo: operações, comunicação com clientes, preparação de folha de pagamento, e estratégia completa de marketing pago. Em 3 meses: crescimento de +210%.',
    skills: [
      { id: 'remote', points: 30, label: '+30 Remote Management' },
      { id: 'marketing', points: 25, label: '+25 Marketing & Paid Ads' }
    ],
    stats: 'Q1 2025: $28.7k → Q1 2026: $89.4k (+210% em 3 meses)',
    statsHighlight: true,
    bg: 'dashboard',
    special: false,
    isCurrent: true
  }
];

const SKILLS = {
  business: {
    id: 'business',
    name: 'Business & Operations',
    icon: '⚙️',
    color: '#A32729',
    description: 'Daily operations, scheduling, vendor coordination. Your full back office handled.',
    examples: ['Jean Leal', 'Studio Gabeauty', 'Cleaning Defenders'],
    result: '+210% growth (Cleaning Defenders)'
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing & Paid Ads',
    icon: '📈',
    color: '#FFD700',
    description: 'Strategy and execution on Google, Yelp, Thumbtack & Meta. Campaigns that bring real jobs.',
    examples: ['Studio Gabeauty', 'Cleaning Defenders'],
    result: '+210% growth em 3 meses'
  },
  content: {
    id: 'content',
    name: 'Content Creation',
    icon: '🎬',
    color: '#E87B89',
    description: 'Reels, TikToks & photos. Content that looks good and converts.',
    examples: ['Studio Praia', 'Studio Gabeauty', 'Cleaning Defenders', 'Lehua'],
    result: '8+ vídeos virais, 6+ fotoshoots produzidos'
  },
  social: {
    id: 'social',
    name: 'Social Media',
    icon: '📱',
    color: '#7ECCC4',
    description: 'Calendars, posting, DMs, comments, community. Your brand stays alive while you run the business.',
    examples: ['Studio Praia', 'Studio Gabeauty', 'Spazzio Beauty'],
    result: 'Múltiplas empresas com presença forte e consistente'
  },
  sales: {
    id: 'sales',
    name: 'Sales & Client Acquisition',
    icon: '🤝',
    color: '#FFC107',
    description: 'Lead handling, follow ups, closing. Turning interest into booked, paying clients.',
    examples: ['Vitrage', 'Jean Leal', 'Studio Gabeauty'],
    result: '50+ clientes agendados/mês (Studio Gabeauty)'
  },
  management: {
    id: 'management',
    name: 'Team Management',
    icon: '👥',
    color: '#A32729',
    description: 'Conflict resolution, performance, motivation. Leading teams of 20+.',
    examples: ['GD Beauty Salon', 'Spazzio Beauty'],
    result: 'Times de 20+ pessoas coordenados'
  },
  operations: {
    id: 'operations',
    name: 'Operations Management',
    icon: '🏗️',
    color: '#8B3A3A',
    description: 'Process mapping, system building, scaling. Turning chaos into scalable operations.',
    examples: ['Spazzio Beauty', 'GD Beauty', 'Cleaning Defenders'],
    result: 'Operações escaladas em 3 empresas diferentes'
  },
  resilience: {
    id: 'resilience',
    name: 'Resiliência',
    icon: '💪',
    color: '#E87B89',
    description: 'Enfrentar o impossível e virar de cima. Reconstruir quando tudo parece perdido.',
    examples: ['Pós-furto (2020-2023)'],
    result: 'De perder tudo → liderar crescimento de +210%'
  },
  remote: {
    id: 'remote',
    name: 'Remote Management',
    icon: '🌐',
    color: '#7ECCC4',
    description: 'Managing full business operations from anywhere in the world. Asynchronous and effective.',
    examples: ['Cleaning Defenders (2025-2026)'],
    result: 'Gerenciamento 100% remoto com crescimento real'
  },
  finance: {
    id: 'finance',
    name: 'Financial Support',
    icon: '💰',
    color: '#FFD700',
    description: 'Invoices, payroll prep, expense tracking, monthly reports.',
    examples: ['Studio Gabeauty', 'GD Beauty', 'Cleaning Defenders'],
    result: 'Crescimento controlado e escalável'
  }
};

const SCENARIOS = [
  {
    id: 'ecommerce',
    type: 'DESAFIO 1',
    title: 'E-commerce em caos',
    desc: 'Você tem uma loja online com $10k/mês de receita, mas precisa chegar a $30k. Os anúncios não convertem, o conteúdo é fraco e as vendas estagnaram. Como você resolve?',
    choices: [
      {
        id: 'paid-ads',
        icon: '📈',
        name: 'Marketing & Paid Ads',
        desc: 'Vou rodar anúncios no Google, Meta e Yelp. Baseado no Cleaning Defenders, cresci 210% em 3 meses.',
        result: 'Campanhas estruturadas. ROAS subindo.',
        resultFull: 'Reestruturação completa das campanhas. Novos criativos, nova segmentação. Em 3 meses: receita triplicou.',
        points: 50
      },
      {
        id: 'content',
        icon: '🎬',
        name: 'Content Creation',
        desc: 'Vou produzir reels e shorts que convertem. Fiz isso em 5 empresas diferentes.',
        result: 'Conteúdo viral. Alcance orgânico explodindo.',
        resultFull: 'Estratégia de conteúdo que educa e vende. Reels com chamada pra ação clara. Engajamento subiu 340%.',
        points: 50
      },
      {
        id: 'sales',
        icon: '🤝',
        name: 'Sales & Client Acquisition',
        desc: 'Vou implementar follow-ups, funil de vendas e treinamento. 12+ anos fazendo isso.',
        result: 'Taxa de conversão de leads subiu 180%.',
        resultFull: 'Processos de vendas implementados. Scripts, CRM, follow-up automatizado. Conversão de leads: +180%.',
        points: 50
      },
      {
        id: 'full',
        icon: '🚀',
        name: 'Full Package',
        desc: 'Vou fazer tudo junto. Operações, marketing, content, vendas. É o meu melhor combo.',
        result: '+210% crescimento. Como Cleaning Defenders.',
        resultFull: 'O package completo: operações, conteúdo, anúncios e vendas funcionando juntos. Resultado: $10k → $31k em 3 meses.',
        points: 60
      }
    ]
  },
  {
    id: 'team',
    type: 'DESAFIO 2',
    title: 'Time desorganizado',
    desc: 'Sua empresa cresceu mas a operação está caótica. 20+ pessoas, sem processos claros, conflitos constantes e performance inconsistente. Como você resolve?',
    choices: [
      {
        id: 'operations',
        icon: '⚙️',
        name: 'Business & Operations',
        desc: 'Vou mapear processos, criar sistemas, organizar o caos. Fiz isso em 3 empresas.',
        result: 'Processos mapeados. Operação eficiente.',
        resultFull: 'SOPs criados para cada função. Checklists, sistemas de agendamento, fluxo de comunicação. Antes: caos. Depois: máquina.',
        points: 50
      },
      {
        id: 'management',
        icon: '👥',
        name: 'Team Management',
        desc: 'Vou resolver conflitos, alinhar expectativas, motivar. Liderava times de 20+.',
        result: 'Team performance subiu 65%. Conflitos resolvidos.',
        resultFull: 'One-on-ones, alinhamento de metas, gestão de conflitos. O time passou a ter clareza de papel e motivação real.',
        points: 50
      },
      {
        id: 'full',
        icon: '🚀',
        name: 'Full Package',
        desc: 'Processos + gestão de pessoas juntos. É o que realmente transforma empresas.',
        result: 'Operação escalável. Time motivado. Resultados.',
        resultFull: 'Sistemas operacionais + liderança de pessoas. Em 2 meses: turn-over caiu, performance subiu e a empresa estava pronta pra crescer.',
        points: 60
      },
      {
        id: 'finance',
        icon: '💰',
        name: 'Financial Support',
        desc: 'Vou mapear o financeiro, entender onde o dinheiro vai e criar previsibilidade.',
        result: 'Custos controlados. Margem protegida.',
        resultFull: 'Mapeamento de despesas, payroll organizado, relatórios mensais. Dinheiro que antes sumia agora está rastreado e controlado.',
        points: 50
      }
    ]
  },
  {
    id: 'brand',
    type: 'DESAFIO 3',
    title: 'Marca sem identidade',
    desc: 'Sua empresa existe há 3 anos mas não tem visual forte. Sem logo profissional, sem paleta de cores, sem direção criativa. Os clientes não lembram de você. Como você resolve isso?',
    choices: [
      {
        id: 'content',
        icon: '🎬',
        name: 'Content Creation',
        desc: 'Vou criar visual + conteúdo que conta sua história e faz o cliente se sentir parte disso.',
        result: 'Identidade visual + conteúdo coerente.',
        resultFull: 'Criação de conteúdo com estética consistente. Paleta definida, templates, feed coeso. Clientes passaram a reconhecer a marca.',
        points: 50
      },
      {
        id: 'brand',
        icon: '🎨',
        name: 'Brand Direction',
        desc: 'Vou desenhar um sistema de identidade completo. Fiz pra Cleaning Defenders e Lehua.',
        result: 'Sistema de identidade completo entregue.',
        resultFull: 'Logo system, paleta, tipografia, mascote, aplicações. A empresa passou a ser reconhecida onde quer que aparecesse.',
        points: 50
      },
      {
        id: 'social',
        icon: '📱',
        name: 'Social Media',
        desc: 'Vou viralizar sua marca com conteúdo autêntico e presença constante.',
        result: 'Alcance orgânico +280%. Seguidores engajados.',
        resultFull: 'Calendário editorial, stories diários, posts que geram conversa. Presença que faz o cliente te lembrar quando precisa.',
        points: 50
      },
      {
        id: 'full',
        icon: '🚀',
        name: 'Full Package',
        desc: 'Brand + content + social media. Como fiz pra Cleaning Defenders. Do zero à marca forte.',
        result: 'Marca reconhecível. +340% engajamento.',
        resultFull: 'Do logo ao TikTok. Identidade visual, conteúdo consistente, gestão de redes. Como no Cleaning Defenders — de empresa sem rosto a marca que as pessoas reconhecem.',
        points: 60
      }
    ]
  }
];

const RESULT_PROFILES = {
  full: {
    emoji: '🚀',
    title: 'Você precisa do Full Package',
    desc: 'Você entende que crescimento real acontece quando todas as peças se encaixam juntas. Operações, marketing, conteúdo e vendas funcionando como um sistema. É exatamente o que ofereço.'
  },
  marketing: {
    emoji: '📈',
    title: 'Você acredita no poder do marketing',
    desc: 'Você sabe que crescimento vem de presença, alcance e anúncios bem feitos. Com a estratégia certa de paid media e conteúdo, sua empresa pode escalar rápido.'
  },
  operations: {
    emoji: '⚙️',
    title: 'Você valoriza operações eficientes',
    desc: 'Você entende que crescimento sem estrutura é caos. Processos, sistemas e equipe alinhada são o que transforma negócios.'
  },
  content: {
    emoji: '🎬',
    title: 'Você sabe que conteúdo é rei',
    desc: 'Você reconhece que presença digital autêntica e consistente é o que atrai clientes de verdade. Conteúdo que educa, entretém e vende.'
  },
  mixed: {
    emoji: '🌟',
    title: 'Você pensa de forma estratégica',
    desc: 'Você avalia cada problema com calma e escolhe a solução certa para cada situação. Essa mentalidade é o que diferencia bons líderes.'
  }
};

const VIDEOS = [
  { id: '085bXXagkNQ', label: 'Cleaning Defenders', company: 'Cleaning Defenders' },
  { id: 'FFMFxRoOZvo', label: 'Content Reel', company: 'Cleaning Defenders' },
  { id: 'UpQfwuuGGeU', label: 'Brand Showcase', company: 'Cleaning Defenders' },
  { id: 'uyp0_f2q2JA', label: 'Behind the Scenes', company: 'Studio Gabeauty' },
  { id: 'DRwd_3zDlo4', label: 'Product Reel', company: 'Studio Gabeauty' },
  { id: 'pAGl043sCF8', label: 'Social Content', company: 'Lehua Shop' },
  { id: 'UAwEzgDPTMk', label: 'Marketing Reel', company: 'Cleaning Defenders' },
  { id: 'jsCwETvtMJQ', label: 'Campaign Content', company: 'Cleaning Defenders' }
];

const GALLERY_PHOTOS = [
  { emoji: '📸', label: 'Campaign Shoot — Cleaning Defenders', desc: 'Direção criativa + produção', category: 'Campanha' },
  { emoji: '💅', label: 'Studio Gabeauty — Produto', desc: 'Fotografia de produto para e-commerce', category: 'Produto' },
  { emoji: '🌸', label: 'Lehua Shop — Lifestyle', desc: 'Sessão lifestyle para crochet brand', category: 'Lifestyle' },
  { emoji: '🦸', label: 'Mascote Cleaning Defenders', desc: 'Comic book hero — direção artística', category: 'Branding' },
  { emoji: '✨', label: 'Social Media Content', desc: 'Grid feed para redes sociais', category: 'Social' },
  { emoji: '🏪', label: 'Spazzio Beauty — Equipe', desc: 'Fotografia institucional e de equipe', category: 'Institucional' }
];

const BRAND_IDENTITIES = [
  {
    name: 'Cleaning Defenders',
    year: '2026',
    emoji: '🦸',
    tagline: 'Comic book hero. Friendly, bold, reconhecível.',
    desc: 'Sistema de identidade completo: logo, mascote, paleta e aplicações. Conceito baseado em super-herói amigável para empresa de limpeza residencial.',
    palette: ['#E85D49', '#1A1A2E', '#FFD700', '#FFFEF9'],
    features: ['Logo System', 'Mascote', 'Instagram Grid', 'Yelp Listing', 'Uniforme', 'Van Wrap'],
    bannerBg: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)',
    bannerColor: '#FFD700'
  },
  {
    name: 'Lehua Shop',
    year: '2025',
    emoji: '🌺',
    tagline: 'Hand-drawn flower mark. 70s wordmark. Soft pinks, deep wine reds.',
    desc: 'Identidade visual para loja de crochet artesanal. Estética vintage-floral com tipografia retrô e paleta feminina e delicada.',
    palette: ['#F4C2C2', '#8B1A4A', '#F9E4B7', '#4A2C0A'],
    features: ['Logo + Wordmark', 'Tags de Produto', 'Packaging', 'Instagram Stories', 'Paleta Completa'],
    bannerBg: 'linear-gradient(135deg, #F9E4B7 0%, #F4C2C2 100%)',
    bannerColor: '#8B1A4A'
  }
];
