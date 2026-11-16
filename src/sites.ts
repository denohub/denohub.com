export const categories = ['游戏', '开发', 'AI'] as const;

export type Category = (typeof categories)[number];

export interface Site {
  name: string;
  url: string;
  category: Category;
  description: string;
}

export const sites: Site[] = [
  {
    name: 'recomp',
    url: 'https://recomp.denohub.com',
    category: '游戏',
    description: 'Switch 游戏静态重编译项目索引，可在 PC、Mac、Linux 与手机原生运行。',
  },
  {
    name: 'nes',
    url: 'https://nes.denohub.com',
    category: '游戏',
    description: 'NES 经典游戏在线合集，打开即玩坦克大战、魂斗罗、超级马里奥。',
  },
  {
    name: 'nesdb',
    url: 'https://nesdb.denohub.com',
    category: '游戏',
    description: 'NES 游戏数据库，按 CRC32、卡带编号、发行商与 Mapper 检索。',
  },
  {
    name: 'k3mc',
    url: 'https://k3mc.denohub.com',
    category: '游戏',
    description: 'Kimi K3 打造的网页版体素沙盒，支持生存与创造模式。',
  },
  {
    name: 'miniapp',
    url: 'https://miniapp.denohub.com',
    category: '开发',
    description: 'AI 驱动的小程序生态选型与风险评估，覆盖框架、组件库与 SDK。',
  },
  {
    name: 'models',
    url: 'https://models.denohub.com',
    category: 'AI',
    description: '收录提供免费额度的 LLM 中转站与聚合网关，并标注可用模型。',
  },
  {
    name: 'glitch-token',
    url: 'https://glitch-token.denohub.com',
    category: 'AI',
    description: '系统整理 GPT 词表中的故障 token，附成因与指纹说明。',
  },
];
