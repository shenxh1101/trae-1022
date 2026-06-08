import { Restaurant } from '@/types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: '锦园江南菜馆',
    cuisine: '江浙菜',
    rating: 4.8,
    pricePerPerson: 128,
    distance: 300,
    address: '商圈东路88号锦华大厦3层',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20chinese%20restaurant%20interior%20with%20warm%20lighting%20wooden%20furniture%20elegant%20decor&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20restaurant%20private%20dining%20room%20elegant%20chinese%20style&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20restaurant%20hall%20with%20lanterns%20and%20traditional%20decor&image_size=square_hd'
    ],
    signatureDishes: ['松鼠桂鱼', '龙井虾仁', '东坡肉'],
    businessStatus: 'busy',
    queueInfo: {
      waitingTables: 8,
      avgWaitTime: 25
    },
    promotions: [
      { type: '新用户优惠', description: '首次到店消费满200减30' },
      { type: '会员专享', description: '会员专享8.8折优惠' }
    ],
    availableTimes: ['11:00', '11:30', '12:00', '12:30', '17:00', '17:30', '18:00', '18:30', '19:00'],
    tags: ['有包厢', '可预订', '提供WiFi']
  },
  {
    id: '2',
    name: '川味轩',
    cuisine: '川菜',
    rating: 4.6,
    pricePerPerson: 98,
    distance: 150,
    address: '商圈南街56号2层',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20restaurant%20modern%20interior%20red%20decor%20spicy%20theme&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20spicy%20restaurant%20with%20red%20accents&image_size=square_hd'
    ],
    signatureDishes: ['水煮鱼', '麻婆豆腐', '夫妻肺片'],
    businessStatus: 'open',
    queueInfo: {
      waitingTables: 3,
      avgWaitTime: 10
    },
    promotions: [
      { type: '午市特惠', description: '周一至周五午市7.8折' }
    ],
    availableTimes: ['11:00', '11:30', '12:00', '12:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
    tags: ['辣度可选', '提供WiFi', '扫码点餐']
  },
  {
    id: '3',
    name: '和风日料',
    cuisine: '日料',
    rating: 4.9,
    pricePerPerson: 268,
    distance: 450,
    address: '商圈西路120号1层',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20restaurant%20sushi%20bar%20modern%20minimalist&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20cuisine%20restaurant%20interior%20with%20wooden%20sushi%20counter&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20tatami%20private%20room%20restaurant&image_size=square_hd'
    ],
    signatureDishes: ['特选刺身拼盘', '鳗鱼饭', '海胆寿司'],
    businessStatus: 'open',
    queueInfo: {
      waitingTables: 0,
      avgWaitTime: 0
    },
    promotions: [
      { type: '双人套餐', description: '双人精选套餐特惠588元' }
    ],
    availableTimes: ['11:30', '12:00', '12:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'],
    tags: ['新鲜食材', '榻榻米包间', '可拍照']
  },
  {
    id: '4',
    name: '老北京涮肉',
    cuisine: '火锅',
    rating: 4.7,
    pricePerPerson: 158,
    distance: 200,
    address: '商圈北街35号',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20hotpot%20restaurant%20traditional%20interior%20copper%20pot%20traditional%20style&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotpot%20pot%20restaurant%20cozy%20atmosphere%20warm%20lighting&image_size=square_hd'
    ],
    signatureDishes: ['手切鲜羊肉', '麻酱烧饼', '爆肚'],
    businessStatus: 'busy',
    queueInfo: {
      waitingTables: 12,
      avgWaitTime: 35
    },
    promotions: [
      { type: '夜宵特惠', description: '21:00后菜品6.8折' }
    ],
    availableTimes: ['11:00', '11:30', '12:00', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'],
    tags: ['铜锅涮肉', '深夜食堂', '夜宵']
  },
  {
    id: '5',
    name: '意式风情餐厅',
    cuisine: '西餐',
    rating: 4.5,
    pricePerPerson: 188,
    distance: 600,
    address: '商圈广场1号购物中心4层',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=italian%20restaurant%20romantic%20candle%20light%20elegant%20fine%20dining&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=western%20restaurant%20pasta%20and%20wine%20romantic%20atmosphere&image_size=square_hd'
    ],
    signatureDishes: ['黑松露意面', '战斧牛排', '提拉米苏'],
    businessStatus: 'open',
    queueInfo: {
      waitingTables: 2,
      avgWaitTime: 8
    },
    promotions: [
      { type: '情侣套餐', description: '情人节特供双人套餐688元' }
    ],
    availableTimes: ['11:30', '12:00', '12:30', '17:30', '18:00', '18:30', '19:00', '19:30'],
    tags: ['浪漫约会', '有红酒', '可拍照']
  },
  {
    id: '6',
    name: '粤韵茶餐厅',
    cuisine: '粤菜',
    rating: 4.4,
    pricePerPerson: 88,
    distance: 100,
    address: '商圈东路20号',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20dim%20sum%20restaurant%20bright%20modern%20chinese%20style&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hong%20hong%20kong%20style%20cafe%20restaurant%20interior&image_size=square_hd'
    ],
    signatureDishes: ['虾饺皇', '流沙包', '蜜汁叉烧'],
    businessStatus: 'open',
    queueInfo: {
      waitingTables: 5,
      avgWaitTime: 15
    },
    promotions: [
      { type: '早茶特惠', description: '早茶时段8折优惠' }
    ],
    availableTimes: ['08:00', '08:30', '09:00', '09:30', '10:00', '11:00', '11:30', '12:00', '17:00', '17:30', '18:00'],
    tags: ['早茶', '下午茶', '港式点心']
  },
  {
    id: '7',
    name: '湘当有味',
    cuisine: '湘菜',
    rating: 4.3,
    pricePerPerson: 78,
    distance: 250,
    address: '商圈南街88号',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20spicy%20restaurant%20casual%20dining%20vibrant%20colors&image_size=square_hd'
    ],
    signatureDishes: ['剁椒鱼头', '小炒黄牛肉', '口味虾'],
    businessStatus: 'closed',
    queueInfo: {
      waitingTables: 0,
      avgWaitTime: 0
    },
    promotions: [
      { type: '开业特惠', description: '全场菜品8.5折' }
    ],
    availableTimes: ['11:00', '11:30', '12:00', '17:00', '17:30', '18:00', '18:30'],
    tags: ['湘菜', '辣', '下饭']
  },
  {
    id: '8',
    name: '泰香阁',
    cuisine: '东南亚菜',
    rating: 4.6,
    pricePerPerson: 118,
    distance: 380,
    address: '商圈西路66号3层',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=thai%20restaurant%20tropical%20decor%20golden%20colors%20elephant%20decor&image_size=square_hd'
    ],
    signatureDishes: ['冬阴功汤', '咖喱蟹', '泰式沙拉'],
    businessStatus: 'open',
    queueInfo: {
      waitingTables: 4,
      avgWaitTime: 12
    },
    promotions: [
      { type: '工作日特惠', description: '周三泰国啤酒买一送一' }
    ],
    availableTimes: ['11:30', '12:00', '12:30', '17:30', '18:00', '18:30', '19:00'],
    tags: ['异域风情', '酸辣开胃', '适合聚会']
  }
];

export const cuisines = ['全部', '江浙菜', '川菜', '日料', '火锅', '西餐', '粤菜', '湘菜', '东南亚菜'];
