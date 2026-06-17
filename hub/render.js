const CD={"GENE": {"full_name": "Gyrokinetic Electromagnetic Numerical Experiment", "long_desc": "GENE 是全球最广泛使用的回旋动理学湍流模拟代码之一，由德国马普等离子体物理研究所（Max Planck IPP）Frank Jenko 团队开发。采用连续体欧拉方法在五维相空间中直接求解回旋动理学方程，支持托卡马克和仿星器几何。可模拟 ITG/TEM/ETG 等多种微观不稳定性，支持通量管（flux tube）和全局（global）两种模拟模式，包含碰撞算符、电磁涨落和多粒子种耦合。2025 年在 Nature Communications 发表的多代码对比验证中，GENE 被确认为达到成熟阶段的核心湍流代码。", "features": ["连续体回旋动理学", "通量管/全局双模式", "电磁涨落", "线性/非线性", "托卡马克+仿星器", "Landau-Boltzmann 碰撞算符"], "links": ["https://genecode.org", "https://doi.org/10.1038/s41467-025-56997-2"]}, "GTC": {"full_name": "Gyrokinetic Toroidal Code", "long_desc": "GTC（回旋动理学环向代码）是由加州大学欧文分校林志宏教授团队开发的全球首个大规模并行回旋动理学 Particle-in-Cell（PIC）代码。采用 δf PIC 方法在真实托卡马克几何中模拟等离子体微观湍流和新经典输运。1998 年在 Science 发表里程碑论文，首次证实带状流对湍流输运的抑制作用。近期版本支持高能粒子与阿尔芬本征模相互作用、全域模拟和 GPU 加速。GTC 是回旋动理学 PIC 方向的标杆。", "features": ["PIC 回旋动理学", "全球模拟", "带状流-湍流相互作用", "高能粒子-波", "GPU 加速"], "links": ["http://phoenix.ps.uci.edu/gtc/", "https://doi.org/10.1126/science.281.5384.1835"]}, "DESC": {"full_name": "DESC Stellarator Equilibrium and Optimization Suite", "long_desc": "DESC 是普林斯顿大学 Egemen Kolemen 团队开发的新一代仿星器三维 MHD 平衡与优化代码套件。采用伪谱法和 JAX 自动微分框架，直接在真实空间中求解力平衡方程，摆脱了传统 VMEC 对磁面的假设，能够处理磁岛和随机磁场区域。计算速度比传统方法快 10-100 倍，梯度信息通过自动微分精确获取，可直接耦合优化算法进行仿星器线圈和磁场设计。2023 年以三部曲形式发表在 Journal of Plasma Physics。", "features": ["伪谱法 MHD 平衡", "JAX 自动微分", "磁岛/随机场处理", "GPU 加速", "仿星器优化", "准对称设计"], "links": ["https://github.com/PlasmaControl/DESC", "https://doi.org/10.1017/S0022377823000861"]}, "TORAX": {"full_name": "TORAX — Tokamak Rapid Axisymmetric Simulator", "long_desc": "TORAX 是 Google DeepMind 与 EPFL 瑞士等离子体中心合作开发的下一代托卡马克输运模拟框架。基于 JAX 可微分编程框架，采用有限体积法求解 1.5D 核心输运方程，可在数秒内完成完整的放电方案模拟。支持自动微分和 GPU 加速，能够高效地进行参数扫描、不确定性量化和逆问题求解。TORAX 代表了聚变模拟向 AI 驱动、快速迭代的新范式，已成功应用于 T-15MD、ITER 等装置的预测性模拟。", "features": ["1.5D 核心输运", "JAX 可微分编程", "有限体积法", "快速放电模拟", "自动微分", "GPU 加速"], "links": ["https://github.com/google-deepmind/torax", "https://doi.org/10.48550/arXiv.2406.06718"]}, "GX": {"full_name": "GX — GPU-native Local Gyrokinetic Turbulence Code", "long_desc": "GX 是原生 GPU 局域回旋动理学湍流代码，由 Bill Dorland 和 Noah Mandell 领导的 GX Team 开发。采用 Hermite-Laguerre 伪谱方法在速度空间展开，充分利用 GPU 的大规模并行能力。相比传统 CPU 代码，GX 的参数扫描速度提升 100 倍以上，特别适合进行大规模参数空间探索和不确定性分析。支持多种回旋动理学模型（静电/电磁、线性/非线性），正在成为新一代快速湍流预测的标准工具。", "features": ["GPU-native 回旋动理学", "Hermite-Laguerre 谱方法", "超快参数扫描", "不确定性量化", "Python 接口"], "links": ["https://gx.readthedocs.io/"]}, "WarpX": {"full_name": "WarpX — Advanced Electromagnetic Particle-In-Cell Code", "long_desc": "WarpX 是新一代开源高性能电磁 Particle-in-Cell（PIC）代码，由 Jean-Luc Vay、Axel Huebl 等领导的国际团队开发，托管于 ECAP/BLAST 框架下。支持 1D/2D/3D/RZ 几何、自适应网格细化（AMR）、完美匹配层（PML）吸收边界和 boosted-frame 技术，已实现 Exascale GPU 加速。主要应用于激光尾波加速、惯性约束聚变相关的高能量密度等离子体、束流输运和强场物理。2025 年已增强 FRC（场反位形）聚变模拟能力，是 US DOE Exascale 计算项目（ECP）的核心 PIC 代码之一。", "features": ["电磁PIC", "AMR", "boosted-frame", "GPU Exascale", "PML边界", "FRC聚变"], "links": ["https://github.com/BLAST-WarpX/warpx", "https://warpx.readthedocs.io/"]}, "EIRENE": {"full_name": "EIRENE — Kinetic Neutral Particle & Radiation Transport Code", "long_desc": "EIRENE 是全球磁约束聚变边界物理的标准中性粒子蒙特卡洛输运代码，由 FZ Jülich 的 Detlev Reiter 团队开发维护。采用三维动理学方法模拟中性气体分子、原子和光子在等离子体边界和偏滤器区域的输运过程，涵盖原子-分子反应、电荷交换、电离和辐射等多物理过程。EIRENE 通常与 SOLPS（2D 流体等离子体求解器）耦合为 SOLPS-EIRENE 套件，或与 EMC3 耦合处理仿星器三维边界输运。该套件是 ITER 边界和偏滤器设计的核心工具，对预测脱靶状态、杂质输运和靶板热负荷至关重要。", "features": ["蒙特卡洛", "中性粒子输运", "原子-分子反应", "SOLPS耦合", "偏滤器模拟", "辐射输运"], "links": ["https://www.eirene.de/", "https://github.com/iterorganization/EIRENE"]}, "VMEC": {"full_name": "VMEC — Variational Moments Equilibrium Code", "long_desc": "VMEC 是磁约束聚变领域最经典的三维理想 MHD 平衡求解器，由 S.P. Hirshman 和 ORNL/PPPL 仿星器社区开发。采用变分矩方法和傅里叶谱展开，在固定边界条件下计算三维环形等离子体的 MHD 平衡磁场位形，假设嵌套磁面存在。VMEC 是仿星器设计（W7-X、LHD、HSX、CFQS）的标准平衡求解器，也是 STELLOPT、SIMSOPT 等仿星器优化代码的核心输入。其输出包括磁面几何、iota 剖面、极向和环向磁通坐标映射，经过 40 余年验证，至今仍是仿星器研究的基石代码。", "features": ["变分法", "谱方法", "MHD平衡", "仿星器标准", "嵌套磁面", "傅里叶展开"], "links": ["https://github.com/ORNL-Fusion/VMEC_8_00"]}, "M3D-C1": {"full_name": "M3D-C1 — 3D Extended MHD Code with C1 Finite Elements", "long_desc": "M3D-C1 是 PPPL 的 S.C. Jardin 和 N.M. Ferraro 团队开发的高阶三维扩展 MHD 代码。采用 C1 连续有限元方法（保证磁通函数一阶导数连续），支持双流体和单流体扩展 MHD 模型，可求解托卡马克真实 X-point 几何下的非线性等离子体演化。主要应用于 ELM（边界局域模）爆发机理、垂直位移事件（VDE）、等离子体破裂、halo 电流和共振磁扰动（RMP）响应等瞬态事件模拟。2024 年在 Nuclear Fusion 发表了该代码对托卡马克瞬态的非线性 MHD 建模综述。", "features": ["C1有限元", "扩展MHD", "X-point几何", "ELM模拟", "破裂/VDE", "双流体"], "links": ["https://w3.pppl.gov/~nferraro/m3dc1.html"]}, "Gkeyll": {"full_name": "Gkeyll — Discontinuous Galerkin Gyrokinetic Code", "long_desc": "Gkeyll 是由 Ammar Hakim 团队开发的高阶间断伽辽金（DG）动理学代码，同时支持 Vlasov-Maxwell 和回旋动理学模型。采用能量守恒的半离散 DG 格式，在速度空间使用 discontinuous Galerkin 方法，能够实现无噪声（noise-free）的动理学模拟。主要用于托卡马克边界刮削层（SOL）湍流、鞘层物理、等离子体-壁相互作用等边界等离子体问题，也可用于空间等离子体基础研究。2023-2024 年扩展了电磁回旋动理学能力，支持全 f 分布函数演化，是边界湍流研究的重要前沿代码。", "features": ["间断伽辽金", "动理学", "无噪声模拟", "SOL湍流", "鞘层物理", "Vlasov-Maxwell"], "links": ["https://gkeyll.readthedocs.io/", "https://github.com/ammarhakim/gkyl"]}, "OSIRIS": {"full_name": "OSIRIS — Relativistic Electromagnetic PIC Code", "long_desc": "OSIRIS 是 UCLA 等离子体模拟组和葡萄牙 IST 联合开发的相对论全电磁 PIC 代码，是激光等离子体加速领域的标杆性模拟工具。支持 1D/2D/3D 全电磁模型、电流沉积和电荷守恒方案、动态负载平衡和 MPI+OpenMP 并行。主要应用于激光尾波电子加速（LWFA）、质子加速（TNSA/RPA）、正电子产生、惯性约束聚变中的激光-等离子体相互作用和强场 QED 效应。OSIRIS 的开创性模拟直接推动了激光等离子体加速领域的多项实验突破。", "features": ["全电磁PIC", "激光尾波加速", "电荷守恒", "QED效应", "并行负载平衡"], "links": ["https://plasmasim.physics.ucla.edu/codes/osiris"]}, "VPIC": {"full_name": "VPIC — Vector Particle-In-Cell Code", "long_desc": "VPIC 是 LANL（洛斯阿拉莫斯国家实验室）开发的高性能相对论全电磁 PIC 代码，专为大规模并行架构优化。采用矢量数据结构和混合模式并行（MPI+线程），在 Exascale 超级计算机上实现极高效率的粒子推送和场求解。主要应用于磁重联、湍流、激光等离子体相互作用和高能量密度物理。VPIC 以极简实现实现顶级性能，2024 年在 Frontier 等 Exascale 系统上展示了数十亿粒子规模的激光聚变模拟。", "features": ["全电磁PIC", "矢量数据结构", "Exascale", "磁重联", "激光等离子体"], "links": ["https://github.com/lanl/vpic"]}, "TRANSP": {"full_name": "TRANSP — Tokamak TRANsport Simulation Code", "long_desc": "TRANSP（原名 TRANSPORT）是 PPPL 开发的托卡马克输运分析与模拟代码，已有 40 余年历史，是全球磁约束聚变实验数据分析的标准工具。采用经典的时变输运方程求解框架，通过实验约束和唯象输运模型进行约束分析和预测模拟。核心功能包括：功率平衡分析、粒子输运、动量输运、快离子轨道分析（NUBEAM 耦合）、杂质输运和源项计算。TRANSP 被 ITER、JET、DIII-D、EAST 等全球主要托卡马克广泛使用，是实验分析和输运模型验证的标准平台。", "features": ["输运分析", "功率平衡", "NUBEAM耦合", "杂质输运", "ITER/JET标配"], "links": ["https://w3.pppl.gov/transp/"]}, "RAPTOR": {"full_name": "RAPTOR — RApid Plasma Transport simulatOR", "long_desc": "RAPTOR 是 EPFL 瑞士等离子体中心开发的快速托卡马克输运模拟器，专为实时控制和离线快速预测设计。采用 1D 输运方程建模，结合降阶模型和神经网络的代理方法，可在毫秒量级完成完整的放电演化预测。RAPTOR 已成功部署于 TCV、ASDEX Upgrade 和 JET 等装置的实时控制系统，作为等离子体状态观测器提供在线剖面预测。2023-2025 年扩展了结合物理约束的神经网络代理模型，被 TCV real-time control 框架集成。", "features": ["快速输运模拟", "实时控制", "降阶模型", "神经网络代理", "TCV/AUG部署"], "links": ["https://github.com/SPCData/raptor"]}, "SOLPS-ITER": {"full_name": "SOLPS-ITER — Scrape-Off Layer Plasma Simulation for ITER", "long_desc": "SOLPS-ITER 是 ITER 组织主导、国际合作开发的边界等离子体模拟代码套件，是目前全球磁约束聚变刮削层/偏滤器物理的标准工具。由二维流体代码 B2(.5) 和三维动理学蒙特卡洛中性粒子代码 EIRENE 耦合组成，支持氘-氚、杂质和多粒子种耦合输运。SOLPS-ITER 是 ITER 偏滤器设计优化（钨偏滤器与气体注入方案）、脱靶预测、热通量评估和第一壁保护的核心工具，也被 EAST、JET、ASDEX Upgrade、DIII-D、KSTAR 等装置广泛用于边界物理分析。", "features": ["B2+EIRENE耦合", "刮削层物理", "偏滤器设计", "脱靶模拟", "ITER核心工具"], "links": ["https://github.com/iterorganization/SOLPS-ITER", "https://solps-iter.org/"]}, "CGYRO": {"full_name": "CGYRO — Collisional Gyrokinetic Code", "long_desc": "CGYRO 是 General Atomics（GA）Jeff Candy 团队开发的亚离子拉莫尔半径尺度回旋动理学湍流代码。采用局域通量管近似和谱方法（场向坐标+Fourier+Laguerre展开）求解回旋动理学方程，重点处理碰撞算符和电磁涨落。CGYRO 以其精确的完全线性化 Fokker-Planck 碰撞算符著称，能够精确捕获托卡马克芯部的 ITG、TEM、ETG 等多尺度湍流输运。是 GACODE（GA/PPPL/ORNL 合作框架）的核心湍流求解器之一，已广泛用于 DIII-D、JET、ITER 等装置的预测性模拟。", "features": ["回旋动理学", "谱方法", "Fokker-Planck碰撞", "电磁湍流", "局域通量管"], "links": ["https://github.com/gafusion/gacode"]}, "GS2": {"full_name": "GS2 — Gyrokinetic Stability and Transport Code", "long_desc": "GS2 是经典的回旋动理学湍流稳定性和输运代码，由 PPPL Bill Dorland 团队（后转为多机构联合）开发，是 GENE/GYRO 之前的第一代通用回旋动理学连续体求解器。采用局域通量管近似，在气球模坐标中使用有限差分和伪谱混合方法求解线性和非线性回旋动理学方程。虽然已不再是最现代的回旋代码，但 GS2 对理解回旋动理学湍流物理（包括 ETG 驱动的电子热输运、带状流物理）做出了奠基性贡献，其方法论被后续代码广泛继承。", "features": ["回旋动理学", "气球模坐标", "局域通量管", "线性/非线性", "历史经典"], "links": ["https://gyrokinetics.gitlab.io/gs2/"]}, "SPEC": {"full_name": "SPEC — Stepped Pressure Equilibrium Code", "long_desc": "SPEC 是普林斯顿大学 Stuart Hudson 和 PPPL 团队开发的三维 MHD 平衡求解器，创新性地采用多区域变分原理（MRxMHD），将等离子体划分为多个嵌套的压力台阶区域。与 VMEC 不同，SPEC 不假设全局磁面存在，可自然处理磁岛、随机磁场区域和部分破坏的磁面结构。这使得 SPEC 在分析仿星器磁岛物理、三维 MHD 平衡分岔和会切/开放场线区域（如 W7-X 岛偏滤器）方面具有独特优势。SPEC 正在成为仿星器和三维托卡马克平衡物理研究的重要补充工具。", "features": ["多区域MHD", "磁岛处理", "变分原理", "仿星器专用", "压力台阶"], "links": ["https://github.com/PrincetonUniversity/SPEC"]}, "XGC": {"full_name": "XGC — X-point Gyrokinetic Code", "long_desc": "XGC 是 PPPL 开发的全球第一款全 f 回旋动理学全域代码，也是唯一能同时处理托卡马克芯部和刮削层/偏滤器全 X-point 几何的动理学代码。采用 PIC 方法，在真实托卡马克磁面上进行全域回旋动理学模拟，跨芯部-边界-刮削层（SOL）连续区域。支持中性粒子回旋动理学和动理学电子，可模拟偏滤器鞘层、跨 LCFS 输运和 ELM 热脉冲沉积等关键过程。XGC 是 ITER 和 SPARC 等下一代装置边界物理预测的关键工具。", "features": ["全域PIC", "全f分布", "X-point几何", "芯部-边界耦合", "偏滤器动理学"], "links": ["https://xgc.pppl.gov/"]}, "ASCOT5": {"full_name": "ASCOT5 — Accelerated Simulation of Charged particle Orbits in Tori", "long_desc": "ASCOT5 是欧洲 EUROfusion 资助开发的第五代带电粒子轨道蒙特卡洛代码，由芬兰 VTT/CSC 联合多国团队开发。采用 GPU 加速和 MPI 并行，在三维真实磁场中追踪快离子、聚变产物（α粒子）、杂质离子和中性粒子的完整轨道。主要应用于高能粒子约束和损失评估（NBI 快离子、α粒子）、第一壁热负荷预测、杂质输运和气体注入模拟。ASCOT5 已广泛用于 JET、ASDEX Upgrade、W7-X 和 ITER 的高能粒子物理、第一壁工程和杂质控制研究。", "features": ["GPU加速蒙特卡洛", "粒子轨道追踪", "高能粒子损失", "第一壁热负荷", "3D磁场"], "links": ["https://github.com/fusion-energy/ASCOT5"]}, "BOUT++": {"full_name": "BOUT++ — Boundary Turbulence Simulation Framework", "long_desc": "BOUT++ 是国际上主流的托卡马克边界等离子体湍流模拟框架，由英国 York 大学 Ben Dudson 团队领导的多国合作项目。采用有限差分方法在 3D 磁场对齐坐标中求解流体和双流体 Braginskii 方程，支持任意环形几何和 X-point 位形。主要研究边界局域模（ELM）、刮削层湍流、blob/filament 传播、偏滤器热通量展宽和 RMP 响应等关键物理过程。BOUT++ 以其开源社区驱动模式和丰富的物理模块生态著称。", "features": ["边界湍流", "Braginskii方程", "X-point几何", "ELM/blob", "开源社区"], "links": ["https://github.com/boutproject/BOUT-dev", "https://boutproject.github.io/"]}, "Hermes-3": {"full_name": "Hermes-3 — 3D Plasma Fluid & Neutral Transport Code", "long_desc": "Hermes-3 是英国 CCFE/York 大学开发的先进三维等离子体流体与中性粒子耦合输运代码，是 BOUT++ 生态系统的高级分支。采用各向异性热传导模型和漂移流体方程，与 EIRENE 中性粒子代码耦合，在真实托卡马克三维几何中模拟边界等离子体和偏滤器物理。特别擅长处理偏滤器脱靶、跨场输运与平行输运耦合、以及气体注入响应等复杂边界过程。Hermes-3 被 EUROfusion 和 UKAEA 选为 STEP 原型堆边界设计的核心工具之一。", "features": ["3D流体", "各向异性输运", "EIRENE耦合", "偏滤器脱靶", "STEP设计工具"], "links": ["https://github.com/boutproject/hermes-3"]}, "UEDGE": {"full_name": "UEDGE — 2D Edge Plasma Fluid Code", "long_desc": "UEDGE 是 LLNL（劳伦斯利弗莫尔国家实验室）开发的二维等离子体边界流体模拟代码，是刮削层/偏滤器物理的经典工具。采用 2D 多流体方程（电子、离子独立温度），耦合简化中性粒子模型或 DEGAS 中性蒙特卡洛代码。主要应用于偏滤器等离子体参数分布预测、杂质辐射和脱靶分析，特别在 DIII-D 装置上得到广泛验证。UEDGE 是 SOLPS-ITER 之前的边界流体模拟先行者，至今仍在 NSTX-U、DIII-D 等装置上活跃使用。", "features": ["2D流体", "多流体模型", "偏滤器模拟", "中性粒子耦合", "DIII-D验证"], "links": ["https://github.com/LLNL/uedge"]}, "EMC3-EIRENE": {"full_name": "EMC3-EIRENE — 3D Edge Monte Carlo + EIRENE Neutral Transport", "long_desc": "EMC3-EIRENE 是全球唯一能够处理三维仿星器和托卡马克三维扰动场边界等离子体的模拟套件，由 IPP Greifswald 开发。EMC3 采用蒙特卡洛方法求解三维等离子体流体方程，与 EIRENE 耦合处理三维中性粒子输运。其独特之处在于不依赖环形对称性假设，能够处理仿星器自然的三维边界几何（如 W7-X 岛偏滤器）以及托卡马克中 RMP 线圈产生的三维扰动边界。EMC3-EIRENE 是 W7-X 偏滤器设计优化的唯一全三维分析工具，也在 EAST 三维边界研究中得到应用。", "features": ["3D蒙特卡洛", "仿星器边界", "EIRENE耦合", "W7-X偏滤器", "无轴对称假设"], "links": ["https://www.ipp.mpg.de/emc3"]}, "JOREK": {"full_name": "JOREK — Non-linear Extended MHD Code for Tokamak Transients", "long_desc": "JOREK 是 EUROfusion 资助的非线性扩展 MHD 代码，由多国联合团队（IPP Garching、CEA、CCFE 等）开发，是目前模拟托卡马克瞬态事件的最先进代码之一。采用 G1 连续 Bezier 有限元方法，在真实 X-point 几何和磁面对齐网格上求解约化 MHD 和扩展 MHD 方程。核心应用包括 ELM 爆发全过程（触发→崩塌→热脉冲→恢复）、等离子体破裂演化、垂直位移事件（VDE）、破裂缓解（SPI/MPI 注入）和 RMP 锁模物理。2024 年在 Nuclear Fusion 发表综述论文系统总结了该代码在托卡马克瞬态 MHD 建模中的最新进展。", "features": ["Bezier有限元", "扩展MHD", "ELM全过程", "破裂模拟", "SPI缓解"], "links": ["https://jorek.eu/", "https://doi.org/10.1088/1741-4326/ad5a21"]}, "NIMROD": {"full_name": "NIMROD — Non-Ideal Magnetohydrodynamics with Rotation, Open Discussion", "long_desc": "NIMROD 是美国多机构（UW-Madison、TTU 等）联合开发的非理想 MHD 代码，专注于研究托卡马克和其他聚变装置中的宏观 MHD 稳定性和三维非线性演化。采用 2D 有限元+1D 傅里叶展开的混合离散方法，求解包括电阻、粘滞、各向异性热传导和双流体效应的扩展 MHD 方程。核心应用包括锯齿振荡、锁模、新经典撕裂模（NTM）、电阻壁模（RWM）和等离子体破裂模拟。NIMROD 在理解 DIII-D 和 NSTX 的破裂物理方面做出了关键贡献。", "features": ["混合有限元/傅里叶", "非理想MHD", "NTM/RWM", "破裂", "双流体"], "links": ["https://github.com/nimrod-team/NIMROD"]}, "MARS-F": {"full_name": "MARS-F — MHD-kinetic Stability Code", "long_desc": "MARS-F 是 General Atomics 开发的环形 MHD-动理学混合稳定性代码，广泛应用于高能粒子驱动的不稳定性研究。采用有限元方法求解线性 MHD 方程，通过动理学响应函数耦合高能粒子（α粒子、NBI 快离子）对 MHD 模的动理学效应。核心应用包括环形阿尔芬本征模（TAE）、高能粒子模（EPM）、鱼骨模以及电阻壁模（RWM）的稳定性评估。MARS-F 是 ITER 高能粒子物理设计中 TAE 稳定性预测和 α 粒子损失评估的标准工具之一。", "features": ["MHD-动理学耦合", "TAE/RWM", "高能粒子", "有限元", "ITER稳定性评估"], "links": ["https://fusion.gat.com/global/theory/home"]}, "TGLF": {"full_name": "TGLF — Trapped Gyro-Landau-Fluid Transport Model", "long_desc": "TGLF 是 General Atomics（GA）开发的最广泛使用的准线性回旋流体输运模型，是 GA 标准输运代码套件（GACODE）的核心组件。基于捕获粒子回旋朗道流体近似，将非线性湍流饱和规则参数化为线性增长率和本征模结构的函数，可在毫秒内计算湍流输运通量。TGLF 已成功复现多个装置（DIII-D、JET、ASDEX Upgrade、EAST）的芯部输运实验数据，是 ITER 和 SPARC 等下一代装置输运预测的标准降阶模型。2024 年发布了 TGLF-SAT2 饱和规则更新版本，显著提升了高 β 等离子体预测精度。", "features": ["准线性输运", "回旋流体", "SAT2饱和规则", "快速预测", "ITER/SPARC标配"], "links": ["https://github.com/gafusion/gacode"]}, "GYRO": {"full_name": "GYRO — Gyrokinetic Continuum Turbulence Code", "long_desc": "GYRO 是 General Atomics 的 Jeff Candy 和 Ron Waltz 团队开发的经典回旋动理学连续体湍流代码，是 CGYRO 的前身和 GACODE 套件的奠基之作。采用局域通量管近似和谱/有限差分混合方法求解五维回旋动理学方程。GYRO 在 2000 年代确立了许多回旋动理学验证基准（如 Cyclone Base Case），是证实湍流带状流相互作用和 Dimits shift 物理的里程碑式代码。虽然现已大部分被 CGYRO 取代，但仍作为轻量级验证工具和教学代码广泛使用。", "features": ["回旋动理学连续体", "局域通量管", "Cyclone基准", "带状流物理", "教学验证"], "links": ["https://github.com/gafusion/gacode"]}, "TGYRO": {"full_name": "TGYRO — Transport + GYRO Integrated Modeling Code", "long_desc": "TGYRO 是 General Atomics 开发的芯部等离子体剖面演化求解器，将湍流输运代码（TGLF/CGYRO/GYRO）与新经典输运代码（NEO）耦合，自洽求解温度和密度剖面演化。采用稳态通量匹配方法，在给定的加热/电流驱动功率和边界条件下预测 H 模式台基以上芯部剖面的自组织演化。TGYRO 的核心创新是在每个径向位置调用回旋动理学代码计算湍流通量，然后迭代求解全局输运方程，实现第一性原理预测。是 ITER 和 SPARC 芯部输运预测的标准集成建模工具之一。", "features": ["剖面演化", "TGLF/CGYRO耦合", "自洽输运", "ITER/SPARC预测", "集成建模"], "links": ["https://github.com/gafusion/gacode"]}};
/* Fusion Hub Render Engine */
let curTab='codes',curDom='all',curLic='all',curRoute='all',paperFor='';

function getDom(c){
  if(c.p.includes('湍流')||c.p.includes('回旋'))return'湍流输运';
  if(c.p.includes('MHD')&&(c.p.includes('平衡')||c.p.includes('稳定')))return'MHD平衡/稳定';
  if(c.p.includes('边界')||c.p.includes('偏滤器')||c.p.includes('SOL'))return'边界/偏滤器';
  if(c.p.includes('仿星'))return'仿星器优化';
  if(c.p.includes('集成')||c.p.includes('数据标准'))return'集成建模';
  if(c.p.includes('PIC')||c.p.includes('激光'))return'粒子模拟';
  if(c.p.includes('反应堆')||c.p.includes('系统代码'))return'反应堆工程';
  if(c.p.includes('中子')||c.p.includes('材料')||c.p.includes('活化'))return'中子学/材料';
  if(c.p.includes('诊断'))return'诊断';
  if(c.p.includes('加热'))return'加热/电流驱动';
  if(c.p.includes('控制'))return'控制/实时';
  return'其他';
}
const DOMS=['湍流输运','MHD平衡/稳定','边界/偏滤器','仿星器优化','集成建模','粒子模拟','反应堆工程','中子学/材料','加热/电流驱动','控制/实时','诊断','其他'];
const ROUTES=['托卡马克','仿星器','FRC','惯性约束','球形托卡马克','Z箍缩','磁惯性','反向场箍缩'];

function paperLink(name){
  if(!name)return'';
  // Find matching papers by code name or title keyword
  var p=P||[],count=0;
  for(var i=0;i<p.length;i++){
    var c=p[i].c||'',t=p[i].t||'';
    if(c.toLowerCase().indexOf(name.toLowerCase())>=0||t.toLowerCase().indexOf(name.toLowerCase())>=0)count++;
  }
  if(count>0)return ' · <a href="javascript:showPapers(\''+name.replace(/'/g,"\\'")+'\')" style="color:var(--ac)">📄 '+count+'篇相关论文</a>';
  return'';
}

function showPapers(name){
  paperFor=name;
  document.querySelectorAll('nav a').forEach(function(a){a.classList.remove('sel')});
  document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active')});
  document.getElementById('papers').classList.add('active');
  document.getElementById('search').value='';
  curTab='papers';
  renderPapers();
}

function renderCodes(){
  var a=C||[];var q=(document.getElementById('search').value||'').toLowerCase();
  var flt=a.filter(function(c){
    if(curDom!=='all'&&getDom(c)!==curDom)return 0;
    if(curLic==='open'&&!c.o)return 0;if(curLic==='closed'&&c.o)return 0;
    if(q){var s=(c.n+' '+c.d+' '+c.tm+' '+c.inst+' '+c.p+' '+(c.t||[]).join(' ')).toLowerCase();if(s.indexOf(q)<0)return 0;}
    return 1;
  });
  document.getElementById('stC').innerHTML='<div class="sti"><div class="n">'+a.length+'</div><div class="l">收录代码</div></div><div class="sti"><div class="n">'+a.filter(function(c){return c.o}).length+'</div><div class="l">开源</div></div><div class="sti"><div class="n">'+a.filter(function(c){return!c.o}).length+'</div><div class="l">闭源/需申请</div></div><div class="sti"><div class="n">'+DOMS.length+'</div><div class="l">物理领域</div></div>';
  document.getElementById('tbC').innerHTML='<span class="lb">领域</span><div class="gr"><span class="tag'+(curDom==='all'?' on':'')+'" onclick="setDom(\'all\')">全部</span>'+DOMS.map(function(d){return'<span class="tag'+(curDom===d?' on':'')+'" onclick="setDom(\''+d+'\')">'+d+'</span>'}).join('')+'</div><span class="lb" style="margin-left:.6rem">许可</span><div class="gr"><span class="tag'+(curLic==='all'?' on':'')+'" onclick="setLic(\'all\')">全部</span><span class="tag'+(curLic==='open'?' on':'')+'" onclick="setLic(\'open\')">开源</span><span class="tag'+(curLic==='closed'?' on':'')+'" onclick="setLic(\'closed\')">需申请</span></div><span class="cnt">匹配 '+flt.length+' 个</span>';
  document.getElementById('gdC').innerHTML=flt.map(function(c){
    var pl=paperLink(c.n);
    var hasD=!!CD&&!!CD[c.n];return'<div class="card'+(hasD?' has-detail':'')+'"'+(hasD?' data-code="'+c.n+'" onclick="openDetail(this.dataset.code)"':'')+'><div class="hd"><div class="ic">'+c.n[0]+'</div><div><div class="tl">'+c.n+'</div><div class="me">'+c.p+'</div></div><span class="lc '+(c.o?'lo':'lc2')+'" style="margin-left:auto">'+(c.o?'开源':'需申请')+'</span></div><div class="ds">'+c.d+'</div><div class="tgs">'+(c.t||[]).slice(0,4).map(function(t){return'<span>'+t+'</span>'}).join('')+'</div><div class="ft">👤 '+c.tm+' · 🏛 '+c.inst+pl+'<a href="'+c.url+'" target="_blank" style="margin-left:auto">GitHub / 主页 →</a></div></div>'
  }).join('')||'<div style="text-align:center;padding:3rem;color:var(--mu);grid-column:1/-1">没有匹配</div>';
}

function renderDevices(){
  var d=D||[];var q=(document.getElementById('search').value||'').toLowerCase();
  var flt=d.filter(function(x){if(curRoute!=='all'&&x.r!==curRoute)return 0;if(q&&(x.n+x.r+x.loc+x.h).toLowerCase().indexOf(q)<0)return 0;return 1});
  document.getElementById('stD').innerHTML='<div class="sti"><div class="n">'+d.length+'</div><div class="l">收录装置</div></div><div class="sti"><div class="n">'+[...new Set(d.map(function(x){return x.r}))].length+'</div><div class="l">技术路线</div></div><div class="sti"><div class="n">'+[...new Set(d.map(function(x){return x.loc.split('/')[0]}))].length+'</div><div class="l">国家/地区</div></div><div class="sti"><div class="n">'+d.length+'</div><div class="l">收录数量</div></div>';
  document.getElementById('tbD').innerHTML='<span class="lb">路线</span><div class="gr"><span class="tag'+(curRoute==='all'?' on':'')+'" onclick="setRoute(\'all\')">全部</span>'+ROUTES.map(function(r){return'<span class="tag'+(curRoute===r?' on':'')+'" onclick="setRoute(\''+r+'\')">'+r+'</span>'}).join('')+'</div><span class="cnt">匹配 '+flt.length+' 台</span>';
  var rc={托卡马克:'rt-t',仿星器:'rt-s',FRC:'rt-f',惯性约束:'rt-i',磁惯性:'rt-o',球形托卡马克:'rt-t',Z箍缩:'rt-o','反向场箍缩':'rt-o'};
  document.getElementById('gdD').innerHTML=flt.map(function(x){
    var pl=paperLink(x.n);
    return'<div class="card dc"><div class="hd"><div class="ic">'+x.n[0]+'</div><div><div class="tl">'+x.n+'</div><div class="me">📍 '+x.loc+' · ⚡ '+x.q+'</div></div><span class="rt '+(rc[x.r]||'rt-o')+'" style="margin-left:auto">'+x.r+'</span></div><div class="ds">📐 '+x.s+'</div><div class="ds" style="font-size:.76rem">'+x.h+'</div><div class="ft">💰 '+x.f+pl+(x.w?' · <a href="'+x.w+'" target="_blank">官网 →</a>':'')+'</div></div>'
  }).join('')||'<div style="text-align:center;padding:3rem;color:var(--mu);grid-column:1/-1">没有匹配</div>';
}

function renderCompanies(){
  var m=M||[];var q=(document.getElementById('search').value||'').toLowerCase();
  var flt=m.filter(function(x){return!q||(x.n+x.d+x.r+x.loc).toLowerCase().indexOf(q)>=0});
  document.getElementById('stM').innerHTML='<div class="sti"><div class="n">'+m.length+'</div><div class="l">收录企业</div></div><div class="sti"><div class="n">'+m.filter(function(x){return x.ty==='国外企业'}).length+'</div><div class="l">国外</div></div><div class="sti"><div class="n">'+m.filter(function(x){return x.ty!=='国外企业'}).length+'</div><div class="l">国内</div></div><div class="sti"><div class="n">'+m.length+'</div><div class="l">收录数量</div></div>';
  document.getElementById('tbM').innerHTML='<span class="cnt">匹配 '+flt.length+' 家</span>';
  document.getElementById('gdM').innerHTML=flt.map(function(x){return'<div class="card cc"><div class="hd"><div class="ic">'+x.n[0]+'</div><div><div class="tl">'+x.n+'</div><div class="me">'+x.e+'</div></div><span class="rt rt-t" style="margin-left:auto">'+x.ty+'</span></div><div class="ds">'+x.d+'</div><div class="me">📍 '+x.loc+' · 🏷 '+x.r+'</div><div class="me">📊 '+x.v+'</div><div class="ft">'+(x.w?'<a href="'+x.w+'" target="_blank">官网 →</a>':'')+'</div></div>'}).join('')||'<div style="text-align:center;padding:3rem;color:var(--mu);grid-column:1/-1">没有匹配</div>';
}

function renderPapers(){
  var p=P||[],q=(document.getElementById('search').value||'').toLowerCase();
  var flt=p;
  if(paperFor){
    flt=p.filter(function(x){var c=x.c||'',t=x.t||'';return c.toLowerCase().indexOf(paperFor.toLowerCase())>=0||t.toLowerCase().indexOf(paperFor.toLowerCase())>=0});
  }
  if(q){flt=flt.filter(function(x){return(x.t+' '+x.a+' '+x.h).toLowerCase().indexOf(q)>=0})}
  document.getElementById('stP').innerHTML='<div class="sti"><div class="n">'+flt.length+'</div><div class="l">'+(paperFor?paperFor+' 相关论文':'收录文献')+'</div></div><div class="sti"><div class="n">'+[...new Set(flt.map(function(x){return x.c}))].filter(Boolean).length+'</div><div class="l">关联代码</div></div><div class="sti"><div class="n">'+[...new Set(flt.map(function(x){return x.y}))].size+'</div><div class="l">覆盖年份</div></div><div class="sti"><div class="n">'+flt.length+'</div><div class="l">收录数量</div></div>';
  document.getElementById('tbP').innerHTML=(paperFor?'<span style="color:var(--ac);cursor:pointer;font-weight:700" onclick="backFromPapers()">← 返回</span> ':'')+'<span class="cnt">匹配 '+flt.length+' 篇</span>';
  document.getElementById('gdP').innerHTML=flt.map(function(x){return'<div class="card"><div class="hd"><div class="ic">'+x.t[0]+'</div><div><div class="tl">'+x.t.slice(0,60)+(x.t.length>60?'…':'')+'</div><div class="me">👤 '+x.a+' · 📅 '+x.y+' · 📰 '+x.j+'</div></div></div><div class="ds">'+x.h+'</div><div class="ft">'+(x.l?'<a href="'+x.l+'" target="_blank">论文链接 →</a>':'')+'</div></div>'}).join('')||'<div style="text-align:center;padding:3rem;color:var(--mu);grid-column:1/-1">没有匹配</div>';
}

function backFromPapers(){
  paperFor='';
  document.querySelectorAll('nav a').forEach(function(a){a.classList.remove('sel')});
  document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active')});
  document.getElementById('codes').classList.add('active');
  document.getElementById('navCodes').classList.add('sel');
  curTab='codes';curDom='all';curLic='all';curRoute='all';
  renderCodes();
}

function renderFunding(){
  var f=F||[];var q=(document.getElementById('search').value||'').toLowerCase();
  var flt=f.filter(function(x){return!q||(x.n+' '+x.o+' '+x.h).toLowerCase().indexOf(q)>=0});
  document.getElementById('stF').innerHTML='<div class="sti"><div class="n">'+f.length+'</div><div class="l">融资事件</div></div><div class="sti"><div class="n">'+[...new Set(f.map(function(x){return x.o}))].length+'</div><div class="l">涉及企业</div></div><div class="sti"><div class="n">'+new Set(f.map(function(x){return x.y})).size+'</div><div class="l">覆盖年份</div></div><div class="sti"><div class="n">'+f.length+'</div><div class="l">收录数量</div></div>';
  document.getElementById('tbF').innerHTML='<span class="cnt">匹配 '+flt.length+' 条</span>';
  document.getElementById('gdF').innerHTML=flt.map(function(x){return'<div class="card"><div class="hd"><div class="ic">'+x.n[0]+'</div><div><div class="tl">'+x.o+' · '+x.ev+'</div><div class="me">💰 '+x.amt+' · 📅 '+x.y+'</div></div></div><div class="ds">'+x.h+'</div></div>'}).join('')||'<div style="text-align:center;padding:3rem;color:var(--mu);grid-column:1/-1">没有匹配</div>';
}

function renderNews(){
  var n=N||[];var q=(document.getElementById('search').value||'').toLowerCase();
  var flt=n.filter(function(x){return!q||(x.t+' '+x.s+' '+x.p).toLowerCase().indexOf(q)>=0});
  document.getElementById('stN').innerHTML='<div class="sti"><div class="n">'+n.length+'</div><div class="l">行业新闻</div></div><div class="sti"><div class="n">'+[...new Set(n.map(function(x){return x.p}))].length+'</div><div class="l">新闻类型</div></div><div class="sti"><div class="n">'+new Set(n.map(function(x){return x.d.slice(0,4)})).size+'</div><div class="l">覆盖年份</div></div><div class="sti"><div class="n">'+n.length+'</div><div class="l">收录数量</div></div>';
  document.getElementById('tbN').innerHTML='<span class="cnt">匹配 '+flt.length+' 条</span>';
  document.getElementById('gdN').innerHTML=flt.map(function(x){return'<div class="card"><div class="hd"><div class="ic">'+x.t.slice(0,2)+'</div><div><div class="tl">'+x.t.slice(0,60)+(x.t.length>60?'…':'')+'</div><div class="me">📅 '+x.d+' · 🏷 '+x.p+'</div></div></div><div class="ds">'+x.s+'</div><div class="ft">'+(x.u?'<a href="'+x.u+'" target="_blank">原文链接 →</a>':'')+'</div></div>'}).join('')||'<div style="text-align:center;padding:3rem;color:var(--mu);grid-column:1/-1">没有匹配</div>';
}

function setDom(d){curDom=curDom===d?'all':d;render()}
function setLic(l){curLic=curLic===l?'all':l;render()}
function setRoute(r){curRoute=curRoute===r?'all':r;render()}

function render(){
  if(curTab==='codes')renderCodes();
  else if(curTab==='devices')renderDevices();
  else if(curTab==='companies')renderCompanies();
  else if(curTab==='papers')renderPapers();
  else if(curTab==='funding')renderFunding();
  else renderNews();
}

function switchTab(t){
  paperFor='';curTab=t;curDom='all';curLic='all';curRoute='all';
  document.querySelectorAll('nav a').forEach(function(a){a.classList.remove('sel')});
  document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active')});
  document.getElementById(t).classList.add('active');
  document.getElementById('nav'+t[0].toUpperCase()+t.slice(1)).classList.add('sel');
  document.getElementById('search').value='';render();
}

function openDetail(name){
  var d=CD&&CD[name];if(!d)return;
  var c=null;for(var i=0;i<C.length;i++){if(C[i].n===name){c=C[i];break}}
  var meta='';
  if(c){
    var dom=getDom(c);var lic=c.o?'开源':'需申请';var licCls=c.o?'lo':'lc2';
    meta='<div class="d-meta"><span class="d-mtag">'+dom+'</span><span class="lc '+licCls+'">'+lic+'</span>'+(c.t||[]).slice(0,6).map(function(t){return'<span class="d-tag">'+t+'</span>'}).join('')+'</div>';
  }
  var links='';if(d.links&&d.links.length)links='<div class="d-links">'+d.links.map(function(l){var host=l.replace(/https?:\\/\\//,'').split('/')[0];return'<a href="'+l+'" target="_blank">'+host+'</a>'}).join(' · ')+'</div>';
  var feats='';if(d.features&&d.features.length)feats='<div class="d-features-label">核心特性</div><div class="d-features">'+d.features.map(function(f){return'<span>'+f+'</span>'}).join('')+'</div>';
  var htm='<button class="detail-close" onclick="closeDetail()">×</button><h2>'+name+'</h2><div class="d-sub">'+d.full_name+'</div>'+meta+'<div class="d-body">'+d.long_desc+'</div>'+feats+links;
  document.getElementById('detailBox').innerHTML=htm;
  document.getElementById('detailOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeDetail(){
  document.getElementById('detailOverlay').classList.remove('open');
  document.body.style.overflow='';
}
function init(){renderCodes();document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDetail()})}
