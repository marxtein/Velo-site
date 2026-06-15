# Fusion Twin Platform 竞品研究报告

**日期**：2026-06-15  
**研究对象**：https://fusiontwin.io/ （Next Step Fusion）  
**上下文**：VeloAlpha PolyFusion 产品定位参考

---

## 一、基本信息

| 维度 | Fusion Twin Platform |
|------|---------------------|
| 公司 | Next Step Fusion |
| 产品定位 | 云端托卡马克等离子体模拟平台（数字孪生） |
| 网站 | https://fusiontwin.io/ |
| GitHub | https://github.com/Next-Step-Fusion |
| 博客 | https://blog.nextfusion.org |
| 核心技术 | NSFsim（Grad-Shafranov 1.5D 输运模拟） |
| 托管 | Cloudflare Pages（React SPA） |

---

## 二、技术栈分析

### 模拟引擎

| 属性 | NSFsim |
|------|--------|
| 方法 | Grad-Shafranov 1.5D 轴对称（2D 求解 + 1D 动力学） |
| 类型 | 含时（time-dependent）、自由边界（free-boundary） |
| 兼容 | IMAS（ITER 集成建模标准） |
| 能力 | 正向计算、逆向计算、破裂模拟、VDE、平衡重建、放电方案开发 |

### 耦合作态代码

| 代码 | 用途 |
|------|------|
| TRAVIS | ECRH/ECCD 射线追踪 |
| ASCOT5 | NBI 和快粒子 |
| TGLF | 湍流输运 |
| MISHKA（替代） | 台基区（pedestal）神经网络代理 |

### Web 技术栈

| 层 | 技术 |
|----|------|
| 前端框架 | React (Vite 构建) |
| UI 库 | Mantine |
| 可视化 | Plotly.js |
| 代码编辑 | CodeMirror |
| 字体 | Google Fonts (Inter, Oxygen, Poppins) |
| 分析 | Cloudflare Analytics |
| 托管 | Cloudflare Pages |

---

## 三、支持的装置

| 装置 | 类型 | 国家 |
|------|------|------|
| DIII-D | 常规托卡马克 | 美国 |
| ISTTOK | 小型托卡马克 | 葡萄牙 |
| EAST | 超导托卡马克 | 中国 |
| SMART | 球形托卡马克 | 西班牙 |
| DTT | 偏滤器测试 | 意大利 |
| NSF NTT | 托卡马克 | Next Step Fusion 自有 |

---

## 四、产品生态

### 平台组件

| 组件 | 说明 | 开源 |
|------|------|------|
| Fusion Twin Platform | Web 端运行模拟的主平台 | ❌ |
| Public Web API | 远程运行 NSFsim，支持 Python/MATLAB | ✅ 示例代码开源 |
| Fusion Data Viewer | HDF5 聚变数据浏览与可视化 | ✅ 开源 |
| Tokamak Replica Builder | 可视化编辑托卡马克极向截面 | ✅ 开源 |
| SOL Box Model | 刮削层 0D 缩减物理模型 | ✅ 开源 |

### API 能力

- 提交、运行和监控 NSFsim 模拟任务
- 开发和测试等离子体控制器
- 构建自动化工作流
- 提供 Python / MATLAB 示例代码

---

## 五、与 VeloAlpha PolyFusion 对比

| 维度 | Fusion Twin | PolyFusion |
|------|------------|------------|
| **物理方法** | Grad-Shafranov 1.5D（平衡求解） | 近轴展开 + 0D 功率平衡 |
| **维度** | 2D（截面+径向） | 0D（全局参数） |
| **位形** | **仅托卡马克** | 仿星器 + 托卡马克 + 磁镜 + FRC |
| **面向对象** | 实验验证、控制开发 | 概念设计、路线筛选 |
| **计算速度** | 中等（含时输运） | **极快**（0D 瞬时） |
| **真实装置** | DIII-D/EAST/ISTTOK 等 6+ | W7-X/LHD/HSX/CFQS 等 6 个 |
| **部署方式** | 云端 API（商业） | 开源本地 Python + Web UI |
| **开源程度** | 部分开源（工具链） | **全开源** |
| **UI** | React SPA, 专业交互 | 单页 HTML + Plotly.js |
| **团队** | 等离子体科学家 + 软件工程师 + ML | 物理算法 + 计算数学 |
| **成熟度** | 已发布，有用户（API 公开） | 研发中，内测阶段 |

---

## 六、关键差异与启示

### Fusion Twin 做得好（值得参考）

1. **云 API 模式**：用户不装软件，通过 API 直接提交模拟任务，降低门槛
2. **组件化生态**：Data Viewer、Replica Builder、SOL Box 模型各自独立可复用
3. **Google Fonts + Mantine**：UI 品质感高，开发者体验好
4. **Cloudflare 部署**：全球 CDN 加速，国内访问较快
5. **IMAS 兼容**：与国际聚变数据库标准对接

### Fusion Twin 的局限

1. **仅托卡马克**：不支持仿星器、磁镜、FRC
2. **物理分辨率中等**：1.5D 比 3D 简化，但对概念设计偏重
3. **部分闭源**：核心模拟引擎 NSFsim 未开源（平台是付费服务）
4. **面向实验控制**：偏向已建装置的运行优化，而非新位形设计

### PolyFusion 的差异化优势

1. **多概念位形**：仿星器/托卡马克/磁镜/FRC 一站式比选 → 独有
2. **极快**：0D 模型秒出结果，适合大规模参数扫描
3. **全开源**：代码、预设、路线图全公开
4. **近轴几何**：仿星器位形自由度高，UI 展示 bean-shape 截面

---

## 七、建议

| 方向 | 具体行动 |
|------|---------|
| API 化 | 参考 Fusion Twin 的 API 模式，让 PolyFusion 可远程调用 |
| 组件化 | 将截面绘制、数据查看器、preset 管理器拆成独立模块 |
| Cloudflare | 接 Cloudflare CDN 提升全球访问速度 |
| 装置库扩充 | PolyFusion 已支持 6 个仿星器，可补 EAST/JT-60SA 等托卡马克 |
| 用户生态 | 建 GitHub Examples 仓库 + Python API 客户端 |

---

**结论**：Fusion Twin 定位在"实验装置的云端数字孪生"，偏运营和验证；PolyFusion 定位在"多概念位形的极速概念设计"，偏创新和筛选。两者互补而非直接竞争——但它们共享同一批聚变工程师作为用户，谁先建立 API 生态和用户粘性，谁就占优。
