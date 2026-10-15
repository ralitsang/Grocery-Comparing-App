// Bulgarian Supermarket & Product Catalog (Sofia Focus)
// All prices and calculations strictly in EUR (€)

export const STORES = [
  {
    id: 'kaufland',
    name: 'Kaufland',
    slug: 'kaufland',
    badge: 'Хипермаркет',
    type: 'Hypermarket',
    color: '#e10915',
    accentBg: 'bg-red-500/10',
    borderColor: 'border-red-500',
    textColor: 'text-red-600',
    logo: '🔴',
    description: 'Огромно разнообразие, собствена марка K-Classic и чести седмични промоции.'
  },
  {
    id: 'lidl',
    name: 'Lidl',
    slug: 'lidl',
    badge: 'Хард Дискаунтър',
    type: 'Hard Discount',
    color: '#0050aa',
    accentBg: 'bg-blue-500/10',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
    logo: '🔵',
    description: 'Висококачествени собствени марки (Pilos, Pikok, Milbona) на най-ниски цени.'
  },
  {
    id: 'tmarket',
    name: 'T-Market',
    slug: 'tmarket',
    badge: 'Практичен Дискаунтър',
    type: 'Discount Supermarket',
    color: '#ea580c',
    accentBg: 'bg-orange-500/10',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-600',
    logo: '🟠',
    description: 'Практичен избор със собствени марки Extra Line и Optima, и онлайн магазин e-tmarket.bg.'
  },
  {
    id: 'billa',
    name: 'Billa',
    slug: 'billa',
    badge: 'Квартален Супермаркет',
    type: 'Supermarket',
    color: '#f59e0b',
    accentBg: 'bg-amber-500/10',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-600',
    logo: '🟡',
    description: 'Удобни локации, бранд Clever и уикенд намаления с Billa Card.'
  },
  {
    id: 'fantastico',
    name: 'Fantastico',
    slug: 'fantastico',
    badge: 'Премиум Супермаркет',
    type: 'Premium Supermarket',
    color: '#dc2626',
    accentBg: 'bg-rose-500/10',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-600',
    logo: '🟣',
    description: 'Софийска верига с топ селекция свежо месо, фермерски деликатеси и готова храна.'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'Всички', icon: '🛒' },
  { id: 'dairy', name: 'Млечни и яйца', icon: '🥛' },
  { id: 'meat', name: 'Месо и деликатеси', icon: '🥩' },
  { id: 'produce', name: 'Плодове и зеленчуци', icon: '🍎' },
  { id: 'bakery', name: 'Хляб и замразени', icon: '🍞' },
  { id: 'pantry', name: 'Бакалия и консерви', icon: '🌾' },
  { id: 'snacks', name: 'Сладки и солени', icon: '🍫' },
  { id: 'drinks', name: 'Напитки и бира', icon: '☕' },
  { id: 'household', name: 'Хигиена и дом', icon: '🧼' }
];

export const PRODUCTS = [
  // --- 1. МЛЕЧНИ ПРОДУКТИ И ЯЙЦА ---
  {
    id: 'milk-fresh-32',
    name: 'Прясно мляко 3.2% (1L)',
    category: 'dairy',
    unit: 'L',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: true,
    description: 'Пастьоризирано краве мляко по БДС стандарт',
    prices: {
      lidl: { brand: 'Pilos', priceEUR: 1.15, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic', priceEUR: 0.95, packQty: 1.0, packUnit: 'L', isPromo: true, promoNote: 'Седмична промоция (-15%)' },
      tmarket: { brand: 'Extra Line 3.2%', priceEUR: 1.05, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      billa: { brand: 'Clever', priceEUR: 1.09, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      fantastico: { brand: 'Верея', priceEUR: 1.45, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'yogurt-bds-36',
    name: 'Кисело мляко 3.6% БДС (400g)',
    category: 'dairy',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 2.0,
    isBDS: true,
    description: 'Българско кисело мляко с жива закваска Lactobacillus bulgaricus',
    prices: {
      lidl: { brand: 'Pilos БДС', priceEUR: 0.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic БДС', priceEUR: 0.62, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      tmarket: { brand: 'Extra Line БДС', priceEUR: 0.58, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 3.6%', priceEUR: 0.59, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Billa Card уикенд' },
      fantastico: { brand: 'Верея БДС', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'yogurt-strained-10',
    name: 'Цедено кисело мляко 10% (500g)',
    category: 'dairy',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Плътно цедено кисело мляко за разядки и десерти',
    prices: {
      lidl: { brand: 'Pilos Гръцки тип 500g', priceEUR: 1.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 500g', priceEUR: 1.39, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура промоция (-15%)' },
      tmarket: { brand: 'Extra Line 500g', priceEUR: 1.49, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 500g', priceEUR: 1.55, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Олимпус 500g', priceEUR: 2.15, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'cheese-white-bds',
    name: 'Бяло саламурено сирене БДС (800g/кг)',
    category: 'dairy',
    unit: 'kg',
    step: 0.5,
    defaultQty: 0.8,
    isBDS: true,
    description: 'Зряло краве сирене по Български държавен стандарт',
    prices: {
      lidl: { brand: 'Pilos (кутия 800g)', priceEUR: 5.20, packQty: 0.8, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic (кутия 800g)', priceEUR: 4.49, packQty: 0.8, packUnit: 'kg', isPromo: true, promoNote: 'Топ оферта (-10%)' },
      tmarket: { brand: 'Extra Line (кутия 800g)', priceEUR: 4.89, packQty: 0.8, packUnit: 'kg', isPromo: true, promoNote: 'Специална цена брошура' },
      billa: { brand: 'Clever (вакуум 400g)', priceEUR: 2.75, packQty: 0.4, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Димитър Маджаров (500g)', priceEUR: 4.85, packQty: 0.5, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'kashkaval-cow-bds',
    name: 'Кашкавал от краве мляко БДС (400g)',
    category: 'dairy',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: true,
    description: 'Български кашкавал от краве мляко с 45-дневно зреене',
    prices: {
      lidl: { brand: 'Milbona БДС 400g', priceEUR: 3.90, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic БДС 400g', priceEUR: 3.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      tmarket: { brand: 'Extra Line БДС 400g', priceEUR: 3.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Billa Brand 400g', priceEUR: 4.20, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Карабулак 400g', priceEUR: 5.10, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'butter-82-250',
    name: 'Краве масло 82% (250g)',
    category: 'dairy',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Натурално краве масло екстра качество 82% масленост',
    prices: {
      lidl: { brand: 'Pilos Немско масло 250g', priceEUR: 1.85, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Lidl Plus купон (-14%)' },
      kaufland: { brand: 'K-Classic 250g', priceEUR: 2.10, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      tmarket: { brand: 'Optima 250g', priceEUR: 1.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 250g', priceEUR: 1.99, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'President 250g', priceEUR: 3.20, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'sour-cream-20',
    name: 'Заквасена сметана 20% (350g)',
    category: 'dairy',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Гъста заквасена сметана за готвене и сосове',
    prices: {
      lidl: { brand: 'Pilos 20% 350g', priceEUR: 1.25, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 20% 350g', priceEUR: 1.05, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Супер цена брошура (-16%)' },
      tmarket: { brand: 'Extra Line 20% 350g', priceEUR: 1.15, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 20% 350g', priceEUR: 1.20, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Верея 20% 350g', priceEUR: 1.55, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'mozzarella-125',
    name: 'Моцарела класическа (125g)',
    category: 'dairy',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Прясно сирене моцарела в саламура за пица и салата Капрезе',
    prices: {
      lidl: { brand: 'Milbona 125g', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 125g', priceEUR: 0.69, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Италианска седмица (-20%)' },
      tmarket: { brand: 'Lovilio 125g', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 125g', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Galbani 125g', priceEUR: 1.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'cottage-cheese-300',
    name: 'Извара фина (300g)',
    category: 'dairy',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Нискомаслена натурална краве извара с високо съдържание на протеин',
    prices: {
      lidl: { brand: 'Pilos 300g', priceEUR: 1.15, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 300g', priceEUR: 1.09, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      tmarket: { brand: 'Extra Line 300g', priceEUR: 0.99, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Бюджетна оферта' },
      billa: { brand: 'Clever 300g', priceEUR: 1.10, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Олимпус 350g', priceEUR: 1.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'eggs-l-10',
    name: 'Яйца размер L (10 бр.)',
    category: 'dairy',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Пресни кокоши яйца клас А, размер L, от български производител',
    prices: {
      lidl: { brand: 'Freshona L (10 бр.)', priceEUR: 2.20, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic L (10 бр.)', priceEUR: 1.89, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Червен петък (-12%)' },
      tmarket: { brand: 'Extra Line L (10 бр.)', priceEUR: 2.05, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever L (10 бр.)', priceEUR: 2.10, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Свободно отглеждане (10 бр.)', priceEUR: 2.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },

  // --- 2. МЕСО, ДЕЛИКАТЕСИ И РИБА ---
  {
    id: 'chicken-breast-1kg',
    name: 'Пилешко филе охладено (кг)',
    category: 'meat',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Прясно охладено пилешко филе без кожа и кост',
    prices: {
      lidl: { brand: 'Pikok Охладено 1kg', priceEUR: 5.80, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Purland Охладено 1kg', priceEUR: 4.99, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Кауфланд карта (-13%)' },
      tmarket: { brand: 'Охладено филе 1kg', priceEUR: 5.70, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Clever Пилешко 1kg', priceEUR: 5.95, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Градус Премиум 1kg', priceEUR: 6.75, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'chicken-legs-1kg',
    name: 'Пилешки бутчета охладени (кг)',
    category: 'meat',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Охладени цели пилешки бутчета с кожа и кост',
    prices: {
      lidl: { brand: 'Pikok (кг)', priceEUR: 2.45, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Purland (кг)', priceEUR: 2.09, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Седмична брошура (-15%)' },
      tmarket: { brand: 'Българско пилешко (кг)', priceEUR: 2.19, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Clever (кг)', priceEUR: 2.39, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Градус (кг)', priceEUR: 2.95, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'minced-meat-500g',
    name: 'Кайма свинска 60/40 (500g)',
    category: 'meat',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Охладена свинска кайма за скара и готвене',
    prices: {
      lidl: { brand: 'Grillmeister 500g', priceEUR: 2.30, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Purland 500g', priceEUR: 2.25, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      tmarket: { brand: 'Свинска кайма 500g', priceEUR: 2.20, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'T-Market брошура' },
      billa: { brand: 'Billa Месарница 500g', priceEUR: 2.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Тандем 500g', priceEUR: 3.10, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'pork-neck-1kg',
    name: 'Свински врат без кост (кг)',
    category: 'meat',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Охладен свински врат без кост, идеален за сочни пържоли',
    prices: {
      lidl: { brand: 'Grillmeister (кг)', priceEUR: 5.49, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Purland (кг)', priceEUR: 4.69, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Червен петък брошура (-20%)' },
      tmarket: { brand: 'Охладено свинско (кг)', priceEUR: 4.99, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Топ оферта от брошурата' },
      billa: { brand: 'Billa Месарница (кг)', priceEUR: 5.89, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Прясно българско (кг)', priceEUR: 6.69, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'pork-chops-1kg',
    name: 'Свински котлет с кост (кг)',
    category: 'meat',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Охладени свински котлети за фурна и грил',
    prices: {
      lidl: { brand: 'Grillmeister (кг)', priceEUR: 4.45, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Purland (кг)', priceEUR: 3.89, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Супер уикенд (-15%)' },
      tmarket: { brand: 'Охладен котлет (кг)', priceEUR: 4.19, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Billa Месарница (кг)', priceEUR: 4.69, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Селекция Фантастико (кг)', priceEUR: 5.49, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'lukanka-pana-200g',
    name: 'Луканка Панагюрска БДС (200g)',
    category: 'meat',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: true,
    description: 'Традиционна сурово-сушена луканка по защитен БДС стандарт',
    prices: {
      lidl: { brand: 'Pikok БДС 200g', priceEUR: 2.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic БДС 200g', priceEUR: 2.49, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Седмична брошура (-14%)' },
      tmarket: { brand: 'Extra Line БДС 200g', priceEUR: 2.59, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Billa БДС 200g', priceEUR: 2.89, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Димитър Маджаров 200g', priceEUR: 3.75, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'krenvirshi-bds-300g',
    name: 'Кренвирши свински БДС (300g)',
    category: 'meat',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: true,
    description: 'Варено-пушени свински кренвирши по утвърден стандарт Стара Планина / БДС',
    prices: {
      lidl: { brand: 'Pikok БДС 300g', priceEUR: 1.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic БДС 300g', priceEUR: 1.75, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Топ оферта брошура' },
      tmarket: { brand: 'Кен 300g', priceEUR: 1.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Billa БДС 300g', priceEUR: 1.99, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Тандем 300g', priceEUR: 2.55, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'bacon-sliced-200g',
    name: 'Бекон пушен нарязан (200g)',
    category: 'meat',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Ароматен пушен свински бекон на филийки за паста Карбонара и закуска',
    prices: {
      lidl: { brand: 'Dulano 200g', priceEUR: 1.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 200g', priceEUR: 1.59, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Акция на седмицата (-15%)' },
      tmarket: { brand: 'Extra Line 200g', priceEUR: 1.69, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 200g', priceEUR: 1.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Тандем 200g', priceEUR: 2.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'salmon-fillet-fresh',
    name: 'Филе от сьомга прясно (кг)',
    category: 'meat',
    unit: 'kg',
    step: 0.5,
    defaultQty: 0.5,
    isBDS: false,
    description: 'Охладено филе от атлантическа сьомга с кожа, богато на Омега-3',
    prices: {
      lidl: { brand: 'Охладена сьомга (кг)', priceEUR: 15.90, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'Норвежка сьомга (кг)', priceEUR: 13.99, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Рибен уикенд (-15%)' },
      tmarket: { brand: 'Филе сьомга (кг)', priceEUR: 14.80, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Billa Рибен сектор (кг)', priceEUR: 16.50, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Премиум прясна риба (кг)', priceEUR: 18.90, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },

  // --- 3. ПЛОДОВЕ И ЗЕЛЕНЧУЦИ ---
  {
    id: 'bananas-1kg',
    name: 'Банани Extra (кг)',
    category: 'produce',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.5,
    isBDS: false,
    description: 'Свежи жълти банани клас I',
    prices: {
      lidl: { brand: 'Вносни пресни (кг)', priceEUR: 1.35, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'Вносни клас I (кг)', priceEUR: 1.09, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Супер цена за деня' },
      tmarket: { brand: 'Вносни банани (кг)', priceEUR: 1.25, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Billa градина (кг)', priceEUR: 1.39, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Chiquita (кг)', priceEUR: 1.49, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'tomatoes-pink-1kg',
    name: 'Домати розови български (кг)',
    category: 'produce',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Традиционни сочни розови домати от български производители',
    prices: {
      lidl: { brand: 'Родна стряха (кг)', priceEUR: 1.85, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'Български ферми (кг)', priceEUR: 1.79, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      tmarket: { brand: 'Български домати (кг)', priceEUR: 1.89, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Български градини (кг)', priceEUR: 1.95, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Селекция Фантастико (кг)', priceEUR: 2.40, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'cucumbers-1kg',
    name: 'Краставици български оранжерийни (кг)',
    category: 'produce',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Свежи краставици клас I от български производители',
    prices: {
      lidl: { brand: 'Родна стряха (кг)', priceEUR: 1.19, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'Български ферми (кг)', priceEUR: 0.95, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Седмична брошура (-22%)' },
      tmarket: { brand: 'Пресни зеленчуци (кг)', priceEUR: 1.05, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Брошура намаление' },
      billa: { brand: 'Billa Градина (кг)', priceEUR: 1.25, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Селекция (кг)', priceEUR: 1.49, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'potatoes-1kg',
    name: 'Картофи български мити (кг)',
    category: 'produce',
    unit: 'kg',
    step: 1.0,
    defaultQty: 2.0,
    isBDS: false,
    description: 'Жълти картофи за готвене и пържене',
    prices: {
      lidl: { brand: 'Родна стряха (мрежа 2kg)', priceEUR: 1.30, packQty: 2.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic (мрежа 2.5kg)', priceEUR: 1.48, packQty: 2.5, packUnit: 'kg', isPromo: true, promoNote: 'Изгодно семейно' },
      tmarket: { brand: 'Картофи мити (кг)', priceEUR: 0.65, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Български картофи (кг)', priceEUR: 0.69, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Самоковски картофи (кг)', priceEUR: 0.79, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'apples-red-1kg',
    name: 'Ябълки Червена превъзходна (кг)',
    category: 'produce',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.5,
    isBDS: false,
    description: 'Сладки и сочни червени ябълки от български градини',
    prices: {
      lidl: { brand: 'Български ябълки (кг)', priceEUR: 1.15, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'Родно производство (кг)', priceEUR: 0.89, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Супер цена брошура (-25%)' },
      tmarket: { brand: 'Ябълки клас I (кг)', priceEUR: 0.99, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Billa Градина (кг)', priceEUR: 1.19, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Първокласни ябълки (кг)', priceEUR: 1.35, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'oranges-1kg',
    name: 'Портокали сочни за десерт (кг)',
    category: 'produce',
    unit: 'kg',
    step: 0.5,
    defaultQty: 2.0,
    isBDS: false,
    description: 'Свежи средиземноморски портокали с високо съдържание на витамин С',
    prices: {
      lidl: { brand: 'Гръцки портокали (кг)', priceEUR: 1.25, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'Клас I вносни (кг)', priceEUR: 0.99, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Цитрусова промоция (-20%)' },
      tmarket: { brand: 'Портокали (кг)', priceEUR: 1.09, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Billa градина (кг)', priceEUR: 1.29, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Премиум цитруси (кг)', priceEUR: 1.49, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'lemons-1kg',
    name: 'Лимони вносни (кг)',
    category: 'produce',
    unit: 'kg',
    step: 0.5,
    defaultQty: 0.5,
    isBDS: false,
    description: 'Жълти ароматни лимони клас I за чай, готвене и дресинги',
    prices: {
      lidl: { brand: 'Вносни лимони (кг)', priceEUR: 1.45, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'Вносни клас I (кг)', priceEUR: 1.15, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Седмично намаление' },
      tmarket: { brand: 'Лимони (кг)', priceEUR: 1.25, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Clever лимони (кг)', priceEUR: 1.39, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Селекция (кг)', priceEUR: 1.69, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'avocado-piece',
    name: 'Авокадо Ready-to-Eat (бр.)',
    category: 'produce',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Узряло кремообразно авокадо сорт Hass',
    prices: {
      lidl: { brand: 'Hass авокадо', priceEUR: 1.10, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Hass Ready-to-Eat', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Екзотична седмица (-22%)' },
      tmarket: { brand: 'Авокадо Hass', priceEUR: 0.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Billa градина', priceEUR: 1.15, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Премиум Hass', priceEUR: 1.39, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'peppers-red-1kg',
    name: 'Червени чушки / капия (кг)',
    category: 'produce',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Сладка червена капия за печене и салати',
    prices: {
      lidl: { brand: 'Българска капия (кг)', priceEUR: 1.75, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'Родно производство (кг)', priceEUR: 1.39, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Есенна брошура (-20%)' },
      tmarket: { brand: 'Червена капия (кг)', priceEUR: 1.49, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Billa Градина (кг)', priceEUR: 1.79, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Селекция (кг)', priceEUR: 2.10, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'onions-1kg',
    name: 'Кромид лук жълт (кг)',
    category: 'produce',
    unit: 'kg',
    step: 0.5,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Зрял жълт кромид лук за всяка традиционна гозба',
    prices: {
      lidl: { brand: 'Жълт лук (мрежа 1kg)', priceEUR: 0.65, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic (мрежа 1kg)', priceEUR: 0.49, packQty: 1.0, packUnit: 'kg', isPromo: true, promoNote: 'Супер изгодно' },
      tmarket: { brand: 'Лук зрял (кг)', priceEUR: 0.55, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      billa: { brand: 'Clever лук (кг)', priceEUR: 0.59, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null },
      fantastico: { brand: 'Български ферми (кг)', priceEUR: 0.75, packQty: 1.0, packUnit: 'kg', isPromo: false, promoNote: null }
    }
  },

  // --- 4. ХЛЯБ, ТЕСТЕНИ И ЗАМРАЗЕНИ ---
  {
    id: 'bread-white-650g',
    name: 'Хляб бял нарязан (650g)',
    category: 'bakery',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Традиционен бял заводски хляб на филийки',
    prices: {
      lidl: { brand: 'Castelli Нарязан 650g', priceEUR: 0.75, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic Нарязан 650g', priceEUR: 0.72, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      tmarket: { brand: 'Хляб бял нарязан 650g', priceEUR: 0.70, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Billa Пекарна 650g', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Симид Бял 650g', priceEUR: 0.89, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'bread-wholegrain-500g',
    name: 'Хляб пълнозърнест тост (500g)',
    category: 'bakery',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Здравословен пълнозърнест хляб за сандвичи и тост',
    prices: {
      lidl: { brand: 'Castelli Пълнозърнест 500g', priceEUR: 0.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic Тост 500g', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура намаление (-16%)' },
      tmarket: { brand: 'Extra Line Пълнозърнест 500g', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever Тост 500g', priceEUR: 0.89, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Бонус Пълнозърнест 500g', priceEUR: 1.25, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'flour-type-500',
    name: 'Брашно тип 500 (1kg)',
    category: 'bakery',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Пшенично брашно тип 500 за сладкиши, пити и хляб',
    prices: {
      lidl: { brand: 'Belbake 1kg', priceEUR: 0.72, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 1kg', priceEUR: 0.69, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      tmarket: { brand: 'Extra Line 1kg', priceEUR: 0.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 1kg', priceEUR: 0.68, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'София Мел Класик 1kg', priceEUR: 0.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'banitsa-frozen-1kg',
    name: 'Баница вита със сирене замразена (1kg)',
    category: 'bakery',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Готова вита баница с пълнеж от бяло сирене и яйца за директно печене',
    prices: {
      lidl: { brand: 'Таралеж Вита баница 1kg', priceEUR: 2.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Белла Вита баница 1kg', priceEUR: 2.39, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Топ оферта от брошурата (-20%)' },
      tmarket: { brand: 'Фамилия Баница 1kg', priceEUR: 2.59, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Белла Баница 1kg', priceEUR: 2.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Белла Премиум 1kg', priceEUR: 3.49, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'pastry-sheets-500g',
    name: 'Фини кори за баница (500g)',
    category: 'bakery',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Тънки точени кори за домашна баница, баклава и сладкиши',
    prices: {
      lidl: { brand: 'Belbake Кори 500g', priceEUR: 1.15, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Фамилия Кори 500g', priceEUR: 0.89, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Седмично намаление (-25%)' },
      tmarket: { brand: 'Белла Кори 500g', priceEUR: 0.99, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever Кори 500g', priceEUR: 1.05, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Белла Одрински 500g', priceEUR: 1.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'pizza-frozen-ristorante',
    name: 'Замразена пица Dr. Oetker Ristorante (330g)',
    category: 'bakery',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Хрупкава тънка пица със салам или моцарела за бърз обяд',
    prices: {
      lidl: { brand: 'Trattoria Alfredo 350g', priceEUR: 1.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Dr. Oetker Ristorante 330g', priceEUR: 2.19, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Хит оферта брошура (-26%)' },
      tmarket: { brand: 'Dr. Oetker Ristorante 330g', priceEUR: 2.35, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура акция' },
      billa: { brand: 'Dr. Oetker Ristorante 330g', priceEUR: 2.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Dr. Oetker Ristorante 330g', priceEUR: 3.10, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },

  // --- 5. БАКАЛИЯ И КОНСЕРВИ ---
  {
    id: 'oil-sunflower-1l',
    name: 'Слънчогледово олио (1L)',
    category: 'pantry',
    unit: 'L',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Рафинирано слънчогледово олио 100% чисто',
    prices: {
      lidl: { brand: "Vita D'or 1L", priceEUR: 1.30, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 1L', priceEUR: 1.10, packQty: 1.0, packUnit: 'L', isPromo: true, promoNote: 'Супер уикенд (-12%)' },
      tmarket: { brand: 'Extra Line 1L', priceEUR: 1.19, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 1L', priceEUR: 1.22, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      fantastico: { brand: 'Бисер Олива 1L', priceEUR: 1.55, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'olive-oil-extra-virgin-1l',
    name: 'Зехтин Extra Virgin (1L)',
    category: 'pantry',
    unit: 'L',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Студено пресован маслинов зехтин екстра върджин',
    prices: {
      lidl: { brand: 'Primadonna 1L', priceEUR: 7.90, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Bio Extra Virgin 1L', priceEUR: 6.99, packQty: 1.0, packUnit: 'L', isPromo: true, promoNote: 'Средиземноморска акция (-15%)' },
      tmarket: { brand: 'Extra Line 1L', priceEUR: 7.45, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      billa: { brand: 'Billa Bio 1L', priceEUR: 7.99, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null },
      fantastico: { brand: 'Monini Classico 1L', priceEUR: 10.50, packQty: 1.0, packUnit: 'L', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'sugar-white-1kg',
    name: 'Захар бяла кристална (1kg)',
    category: 'pantry',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Бяла кристална захар от захарно цвекло',
    prices: {
      lidl: { brand: 'Belbake 1kg', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 1kg', priceEUR: 0.82, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      tmarket: { brand: 'Extra Line 1kg', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 1kg', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Захарни Заводи 1kg', priceEUR: 0.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'rice-krina-1kg',
    name: 'Ориз бланширан / класически (1kg)',
    category: 'pantry',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Качествен бял ориз за традиционни ястия и гарнитури',
    prices: {
      lidl: { brand: 'Golden Sun 1kg', priceEUR: 1.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 1kg', priceEUR: 1.19, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Акция на седмицата (-15%)' },
      tmarket: { brand: 'Extra Line 1kg', priceEUR: 1.25, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 1kg', priceEUR: 1.35, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Крина 1kg', priceEUR: 1.89, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'pasta-spaghetti-500g',
    name: 'Спагети Barilla No. 5 (500g)',
    category: 'pantry',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Италианска паста от твърда пшеница Barilla No. 5',
    prices: {
      lidl: { brand: 'Combino Спагети 500g', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Barilla Спагети 500g', priceEUR: 1.15, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Топ брошура (-28%)' },
      tmarket: { brand: 'Barilla Спагети 500g', priceEUR: 1.25, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Акция' },
      billa: { brand: 'Clever Спагети 500g', priceEUR: 0.82, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Barilla Спагети 500g', priceEUR: 1.69, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'tuna-canned-160g',
    name: 'Риба тон консерва филе (160g)',
    category: 'pantry',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Стерилизирано филе от риба тон в растително масло',
    prices: {
      lidl: { brand: 'Nixe Риба тон 160g', priceEUR: 1.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic 160g', priceEUR: 1.19, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Седмична брошура (-20%)' },
      tmarket: { brand: 'Extra Line 160g', priceEUR: 1.29, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever 160g', priceEUR: 1.35, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Rio Mare 160g', priceEUR: 2.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'tomato-passata-500g',
    name: 'Доматена пасата / пюре (500g)',
    category: 'pantry',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Гъста пасирана доматена каша за пица, болонезе и супи',
    prices: {
      lidl: { brand: 'Baresa Passata 500g', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic Passata 500g', priceEUR: 0.65, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Акция (-18%)' },
      tmarket: { brand: 'Extra Line 500g', priceEUR: 0.69, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever Passata 500g', priceEUR: 0.75, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Mutti Passata 500g', priceEUR: 1.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'beans-canned-400g',
    name: 'Бял боб консерва готов (400g)',
    category: 'pantry',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Сварен бял фасул в консерва за бърза салата или яхния',
    prices: {
      lidl: { brand: 'Freshona Боб 400g', priceEUR: 0.75, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'K-Classic Боб 400g', priceEUR: 0.59, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Супер изгодно' },
      tmarket: { brand: 'Extra Line 400g', priceEUR: 0.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Clever Боб 400g', priceEUR: 0.69, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Бондюел 400g', priceEUR: 1.25, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'mayonnaise-krasi-200g',
    name: 'Майонеза Краси оригинал (200g)',
    category: 'pantry',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Любимата българска трапезна майонеза в кофичка 200g',
    prices: {
      lidl: { brand: 'Kania Майонеза 200g', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Майонеза Краси 200g', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура хит (-20%)' },
      tmarket: { brand: 'Майонеза Краси 200g', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Майонеза Краси 200g', priceEUR: 0.89, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Майонеза Краси 200g', priceEUR: 1.09, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },

  // --- 6. СЛАДКИ И СОЛЕНИ ИЗКУШЕНИЯ ---
  {
    id: 'chocolate-milka-100g',
    name: 'Шоколад Milka Alpine Milk (100g)',
    category: 'snacks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 2.0,
    isBDS: false,
    description: 'Алпийски млечен шоколад, класически сладък десерт',
    prices: {
      lidl: { brand: 'Milka 100g', priceEUR: 1.15, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Milka 100g', priceEUR: 0.89, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Хит оферта от брошурата (-25%)' },
      tmarket: { brand: 'Milka 100g', priceEUR: 0.95, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Топ намаление (-20%)' },
      billa: { brand: 'Milka 100g', priceEUR: 0.92, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Billa Card уикенд' },
      fantastico: { brand: 'Milka 100g', priceEUR: 1.29, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'wafers-borovets-box',
    name: 'Вафли Боровец кутия (20 бр.)',
    category: 'snacks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Традиционни български тунквани вафли в семейна кутия',
    prices: {
      lidl: { brand: 'Alesto Вафли кутия', priceEUR: 2.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Вафли Боровец кутия (20 бр.)', priceEUR: 1.99, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Сладък уикенд (-23%)' },
      tmarket: { brand: 'Вафли Боровец кутия', priceEUR: 2.15, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура оферта' },
      billa: { brand: 'Вафли Боровец кутия', priceEUR: 2.39, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Вафли Боровец кутия', priceEUR: 2.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'chips-lays-140g',
    name: "Чипс Lay's класически със сол (140g)",
    category: 'snacks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Хрупкав картофен чипс от подбрани сортове картофи',
    prices: {
      lidl: { brand: 'Snack Day Чипс 150g', priceEUR: 1.15, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: "Lay's Сол 140g", priceEUR: 1.35, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Парти промоция (-20%)' },
      tmarket: { brand: "Lay's Сол 140g", priceEUR: 1.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: "Lay's Сол 140g", priceEUR: 1.49, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: "Lay's Сол 140g", priceEUR: 1.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'biscuits-belvita-250g',
    name: 'Бисквити BelVita за закуска (250g)',
    category: 'snacks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Пълнозърнести бисквити за енергиен старт на деня',
    prices: {
      lidl: { brand: 'Sondey Бисквити 250g', priceEUR: 1.25, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'BelVita Зърнени 250g', priceEUR: 1.39, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Закуска промо (-18%)' },
      tmarket: { brand: 'BelVita Зърнени 250g', priceEUR: 1.49, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'BelVita Зърнени 250g', priceEUR: 1.55, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'BelVita Зърнени 250g', priceEUR: 1.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },

  // --- 7. НАПИТКИ, БИРА И КАФЕ ---
  {
    id: 'coffee-lavazza-250g',
    name: 'Кафе Lavazza Crema e Gusto (250g)',
    category: 'drinks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Мляно кафе с плътен аромат и кремообразен каймак',
    prices: {
      lidl: { brand: 'Bellarom 250g', priceEUR: 2.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Lavazza 250g', priceEUR: 2.89, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура топ оферта (-15%)' },
      tmarket: { brand: 'Lavazza 250g', priceEUR: 3.30, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Lavazza 250g', priceEUR: 3.35, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Lavazza 250g', priceEUR: 3.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'mineral-water-devin-15l',
    name: 'Минерална вода Девин (1.5L)',
    category: 'drinks',
    unit: 'L',
    step: 1.5,
    defaultQty: 1.5,
    isBDS: false,
    description: 'Натурална минерална вода от Родопите',
    prices: {
      lidl: { brand: 'Девин 1.5L', priceEUR: 0.48, packQty: 1.5, packUnit: 'L', isPromo: false, promoNote: null },
      kaufland: { brand: 'Девин 1.5L', priceEUR: 0.45, packQty: 1.5, packUnit: 'L', isPromo: false, promoNote: null },
      tmarket: { brand: 'Девин 1.5L', priceEUR: 0.46, packQty: 1.5, packUnit: 'L', isPromo: false, promoNote: null },
      billa: { brand: 'Девин 1.5L', priceEUR: 0.49, packQty: 1.5, packUnit: 'L', isPromo: false, promoNote: null },
      fantastico: { brand: 'Девин 1.5L', priceEUR: 0.55, packQty: 1.5, packUnit: 'L', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'beer-kamenitza-500ml',
    name: 'Бира Каменица / Загорка кен (500ml)',
    category: 'drinks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 2.0,
    isBDS: false,
    description: 'Светло пиво в кен 500ml от водещи български пивоварни',
    prices: {
      lidl: { brand: 'Загорка 500ml', priceEUR: 0.75, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Каменица 500ml', priceEUR: 0.62, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Бирен уикенд (-18%)' },
      tmarket: { brand: 'Каменица 500ml', priceEUR: 0.65, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура промоция' },
      billa: { brand: 'Загорка 500ml', priceEUR: 0.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Загорка 500ml', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'coca-cola-2l',
    name: 'Coca-Cola Classic / Zero (2L)',
    category: 'drinks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Оригинална газирана напитка Coca-Cola в семейна бутилка 2L',
    prices: {
      lidl: { brand: 'Freeway Cola 2L', priceEUR: 0.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Coca-Cola 2L', priceEUR: 1.39, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Топ оферта брошура (-20%)' },
      tmarket: { brand: 'Coca-Cola 2L', priceEUR: 1.49, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура акция' },
      billa: { brand: 'Coca-Cola 2L', priceEUR: 1.55, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Coca-Cola 2L', priceEUR: 1.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'orange-juice-1l',
    name: 'Натурален сок 100% портокал Cappy (1L)',
    category: 'drinks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: '100% натурален портокалов сок без добавена захар',
    prices: {
      lidl: { brand: 'Solevita 100% 1L', priceEUR: 1.35, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Cappy 100% 1L', priceEUR: 1.49, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Седмична брошура (-25%)' },
      tmarket: { brand: 'Cappy 100% 1L', priceEUR: 1.59, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Billa Bio 1L', priceEUR: 1.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Rauch 100% 1L', priceEUR: 2.19, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'wine-bulgarian-750ml',
    name: 'Българско вино Каберне / Мавруд (750ml)',
    category: 'drinks',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Качествено българско червено вино със защитено географско указание Тракийска низина',
    prices: {
      lidl: { brand: 'Червено вино ЗГУ 750ml', priceEUR: 3.49, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Вила Ямбол 750ml', priceEUR: 2.89, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Винен фестивал брошура (-24%)' },
      tmarket: { brand: 'Търговище 750ml', priceEUR: 3.19, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Menada 750ml', priceEUR: 3.29, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Катаржина 750ml', priceEUR: 5.49, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },

  // --- 8. ХИГИЕНА И БИТОВА ХИМИЯ ---
  {
    id: 'laundry-pods-ariel-24',
    name: 'Капсули за пране Ariel All-in-1 (24 бр.)',
    category: 'household',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Концентрирани капсули за безупречно чисто пране и отстраняване на петна',
    prices: {
      lidl: { brand: 'Formil Капсули (24 бр.)', priceEUR: 4.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Ariel All-in-1 (24 бр.)', priceEUR: 6.99, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Топ брошура оферта (-30%)' },
      tmarket: { brand: 'Ariel All-in-1 (24 бр.)', priceEUR: 7.49, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Хит цена брошура' },
      billa: { brand: 'Ariel All-in-1 (24 бр.)', priceEUR: 7.99, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Ariel All-in-1 (24 бр.)', priceEUR: 9.85, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'fabric-softener-lenor-12l',
    name: 'Омекотител за тъкани Lenor (1.2L)',
    category: 'household',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Дълготрайна свежест и мекота за вашите дрехи',
    prices: {
      lidl: { brand: 'Doussy Омекотител 1.5L', priceEUR: 1.95, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Lenor Spring 1.2L', priceEUR: 2.49, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Седмично намаление (-22%)' },
      tmarket: { brand: 'Lenor Spring 1.2L', priceEUR: 2.69, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      billa: { brand: 'Lenor Spring 1.2L', priceEUR: 2.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Lenor Spring 1.2L', priceEUR: 3.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'dish-soap-fairy-800ml',
    name: 'Препарат за съдове Fairy Lemon (800ml)',
    category: 'household',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Мощна формула срещу мазнини, изключително икономичен',
    prices: {
      lidl: { brand: 'W5 Препарат 1L', priceEUR: 1.15, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Fairy Lemon 800ml', priceEUR: 1.59, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Супер уикенд (-25%)' },
      tmarket: { brand: 'Fairy Lemon 800ml', priceEUR: 1.69, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура оферта' },
      billa: { brand: 'Fairy Lemon 800ml', priceEUR: 1.79, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Fairy Lemon 800ml', priceEUR: 2.25, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  },
  {
    id: 'toilet-paper-zewa-16',
    name: 'Тоалетна хартия Zewa Deluxe 3-пласта (16 ролки)',
    category: 'household',
    unit: 'бр.',
    step: 1.0,
    defaultQty: 1.0,
    isBDS: false,
    description: 'Мека и здрава трипластова тоалетна хартия в семейна опаковка',
    prices: {
      lidl: { brand: 'Floralys 3-пласта (16 ролки)', priceEUR: 4.65, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      kaufland: { brand: 'Zewa Deluxe (16 ролки)', priceEUR: 5.49, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Хит оферта брошура (-28%)' },
      tmarket: { brand: 'Emeka 3-пласта (16 ролки)', priceEUR: 5.19, packQty: 1.0, packUnit: 'бр.', isPromo: true, promoNote: 'Брошура намаление' },
      billa: { brand: 'Zewa Deluxe (16 ролки)', priceEUR: 5.89, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null },
      fantastico: { brand: 'Zewa Deluxe (16 ролки)', priceEUR: 7.45, packQty: 1.0, packUnit: 'бр.', isPromo: false, promoNote: null }
    }
  }
];

export const PRESET_BASKETS = [
  {
    id: 'brochures-all',
    title: '🔥 Всички топ промоции от брошурите',
    description: 'Всички 28 продукта с активни намаления и промоции от седмичните брошури на веригите.',
    items: [
      { productId: 'milk-fresh-32', qty: 2.0 },
      { productId: 'yogurt-bds-36', qty: 4.0 },
      { productId: 'yogurt-strained-10', qty: 1.0 },
      { productId: 'cheese-white-bds', qty: 0.8 },
      { productId: 'butter-82-250', qty: 1.0 },
      { productId: 'sour-cream-20', qty: 1.0 },
      { productId: 'mozzarella-125', qty: 2.0 },
      { productId: 'eggs-l-10', qty: 2.0 },
      { productId: 'chicken-breast-1kg', qty: 1.5 },
      { productId: 'chicken-legs-1kg', qty: 2.0 },
      { productId: 'minced-meat-500g', qty: 1.0 },
      { productId: 'pork-neck-1kg', qty: 1.5 },
      { productId: 'pork-chops-1kg', qty: 1.0 },
      { productId: 'lukanka-pana-200g', qty: 1.0 },
      { productId: 'krenvirshi-bds-300g', qty: 1.0 },
      { productId: 'bacon-sliced-200g', qty: 1.0 },
      { productId: 'salmon-fillet-fresh', qty: 0.5 },
      { productId: 'bananas-1kg', qty: 2.0 },
      { productId: 'cucumbers-1kg', qty: 1.5 },
      { productId: 'apples-red-1kg', qty: 2.0 },
      { productId: 'oranges-1kg', qty: 2.0 },
      { productId: 'lemons-1kg', qty: 0.5 },
      { productId: 'avocado-piece', qty: 2.0 },
      { productId: 'peppers-red-1kg', qty: 1.5 },
      { productId: 'potatoes-1kg', qty: 2.5 },
      { productId: 'bread-wholegrain-500g', qty: 1.0 },
      { productId: 'banitsa-frozen-1kg', qty: 1.0 },
      { productId: 'pastry-sheets-500g', qty: 1.0 },
      { productId: 'pizza-frozen-ristorante', qty: 2.0 },
      { productId: 'oil-sunflower-1l', qty: 1.0 },
      { productId: 'olive-oil-extra-virgin-1l', qty: 1.0 },
      { productId: 'rice-krina-1kg', qty: 1.0 },
      { productId: 'pasta-spaghetti-500g', qty: 2.0 },
      { productId: 'tuna-canned-160g', qty: 2.0 },
      { productId: 'tomato-passata-500g', qty: 1.0 },
      { productId: 'beans-canned-400g', qty: 2.0 },
      { productId: 'mayonnaise-krasi-200g', qty: 1.0 },
      { productId: 'chocolate-milka-100g', qty: 2.0 },
      { productId: 'wafers-borovets-box', qty: 1.0 },
      { productId: 'chips-lays-140g', qty: 1.0 },
      { productId: 'biscuits-belvita-250g', qty: 1.0 },
      { productId: 'coffee-lavazza-250g', qty: 1.0 },
      { productId: 'beer-kamenitza-500ml', qty: 4.0 },
      { productId: 'coca-cola-2l', qty: 2.0 },
      { productId: 'orange-juice-1l', qty: 2.0 },
      { productId: 'wine-bulgarian-750ml', qty: 1.0 },
      { productId: 'laundry-pods-ariel-24', qty: 1.0 },
      { productId: 'fabric-softener-lenor-12l', qty: 1.0 },
      { productId: 'dish-soap-fairy-800ml', qty: 1.0 },
      { productId: 'toilet-paper-zewa-16', qty: 1.0 }
    ]
  },
  {
    id: 'nsi-official',
    title: '🏛️ Официална кошница на НСИ',
    description: 'Официалната малка потребителска кошница на НСИ и КНСБ с пълните 16 базови хранителни стоки.',
    items: [
      { productId: 'milk-fresh-32', qty: 2.0 },
      { productId: 'yogurt-bds-36', qty: 4.0 },
      { productId: 'cheese-white-bds', qty: 0.8 },
      { productId: 'kashkaval-cow-bds', qty: 1.0 },
      { productId: 'butter-82-250', qty: 1.0 },
      { productId: 'eggs-l-10', qty: 2.0 },
      { productId: 'chicken-breast-1kg', qty: 1.5 },
      { productId: 'minced-meat-500g', qty: 1.0 },
      { productId: 'bananas-1kg', qty: 2.0 },
      { productId: 'tomatoes-pink-1kg', qty: 1.5 },
      { productId: 'potatoes-1kg', qty: 2.0 },
      { productId: 'bread-white-650g', qty: 2.0 },
      { productId: 'flour-type-500', qty: 1.0 },
      { productId: 'oil-sunflower-1l', qty: 1.0 },
      { productId: 'sugar-white-1kg', qty: 1.0 },
      { productId: 'coffee-lavazza-250g', qty: 1.0 },
      { productId: 'mineral-water-devin-15l', qty: 3.0 }
    ]
  },
  {
    id: 'weekly-family',
    title: '🛒 Голямо семейно пазаруване',
    description: 'Пълен седмичен списък за семейство: храни, напитки и основни домашни консумативи.',
    items: [
      { productId: 'milk-fresh-32', qty: 3.0 },
      { productId: 'yogurt-bds-36', qty: 6.0 },
      { productId: 'cheese-white-bds', qty: 1.6 },
      { productId: 'kashkaval-cow-bds', qty: 1.0 },
      { productId: 'butter-82-250', qty: 1.0 },
      { productId: 'eggs-l-10', qty: 3.0 },
      { productId: 'chicken-breast-1kg', qty: 2.0 },
      { productId: 'pork-neck-1kg', qty: 1.5 },
      { productId: 'minced-meat-500g', qty: 2.0 },
      { productId: 'bread-white-650g', qty: 3.0 },
      { productId: 'bananas-1kg', qty: 2.5 },
      { productId: 'tomatoes-pink-1kg', qty: 2.0 },
      { productId: 'cucumbers-1kg', qty: 1.5 },
      { productId: 'potatoes-1kg', qty: 3.0 },
      { productId: 'oil-sunflower-1l', qty: 2.0 },
      { productId: 'pasta-spaghetti-500g', qty: 2.0 },
      { productId: 'rice-krina-1kg', qty: 1.0 },
      { productId: 'coffee-lavazza-250g', qty: 1.0 },
      { productId: 'coca-cola-2l', qty: 2.0 },
      { productId: 'toilet-paper-zewa-16', qty: 1.0 },
      { productId: 'dish-soap-fairy-800ml', qty: 1.0 }
    ]
  },
  {
    id: 'student-budget',
    title: '🎒 Студентски бюджет',
    description: 'Най-изгодните основни калории и закуски на достъпна цена.',
    items: [
      { productId: 'milk-fresh-32', qty: 1.0 },
      { productId: 'yogurt-bds-36', qty: 2.0 },
      { productId: 'eggs-l-10', qty: 1.0 },
      { productId: 'bread-white-650g', qty: 1.0 },
      { productId: 'potatoes-1kg', qty: 2.0 },
      { productId: 'minced-meat-500g', qty: 1.0 },
      { productId: 'pasta-spaghetti-500g', qty: 1.0 },
      { productId: 'pizza-frozen-ristorante', qty: 1.0 },
      { productId: 'beer-kamenitza-500ml', qty: 2.0 },
      { productId: 'coffee-lavazza-250g', qty: 1.0 }
    ]
  },
  {
    id: 'breakfast-bds',
    title: '🇧🇬 Традиционна БДС закуска',
    description: 'Сирене, кисело мляко, масло, яйца, топла баница и хляб.',
    items: [
      { productId: 'yogurt-bds-36', qty: 2.0 },
      { productId: 'cheese-white-bds', qty: 0.5 },
      { productId: 'butter-82-250', qty: 1.0 },
      { productId: 'eggs-l-10', qty: 1.0 },
      { productId: 'banitsa-frozen-1kg', qty: 1.0 },
      { productId: 'bread-white-650g', qty: 1.0 }
    ]
  }
];

// Universal browser & module support
if (typeof window !== 'undefined') {
  window.AppCatalog = { STORES, CATEGORIES, PRODUCTS, PRESET_BASKETS };
}
