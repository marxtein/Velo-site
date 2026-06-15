#!/usr/bin/env python3
"""Extract data from v4 hub HTML and write clean data.js"""
import re

f = open('v4_backup.html','r').read()

def extract(html, var):
    pat = f'const {var}=['
    start = html.find(pat)
    if start < 0: return ''
    depth = 0; i = start + len(pat) - 1
    while i < len(html):
        if html[i] == '[': depth += 1
        elif html[i] == ']': depth -= 1
        if depth == 0: break
        i += 1
    return html[start+len(pat):i]

codes = extract(f, 'C')
devices = extract(f, 'D')
companies = extract(f, 'M')
papers = extract(f, 'P')
funding = extract(f, 'F')

news_data = """{t:"ITER新版基线：非核运行验证再进入D-T阶段",s:"分阶段调试，非核等离子体/系统集成/D-T运行拆开管理",d:"2024-07",u:"https://www.iter.org/node/20687/new-baseline-prioritize-robust-start-exploitation",p:"装置/项目基线"},
{t:"JET最终D-T实验创造69兆焦聚变能量纪录",s:"JET在最终D-T实验中产生69MJ聚变能量，刷新2021年59MJ纪录",d:"2024-02",u:"https://www.gov.uk/government/news/jets-final-tritium-experiments-yield-new-fusion-energy-record",p:"实验纪录"},
{t:"EAST实现1066秒高约束模等离子体运行",s:"中国稳态托卡马克长脉冲控制继续全球领先",d:"2025-01",u:"https://bcas.cas.cn/head/202602/t20260214_1151007.html",p:"实验纪录"},
{t:"W7-X刷新43秒长脉冲高性能等离子体纪录",s:"仿星器稳态路线持续推进验证",d:"2025-05",u:"https://www.ornl.gov/news/ornls-pellet-injector-enables-world-record-performance-w7-x",p:"实验纪录"},
{t:"NIF单次聚变产额达8.6兆焦级别",s:"NIF持续提高惯性约束聚变实验输出至8.6MJ量级",d:"2025-04",u:"https://annual.llnl.gov/fy-2025/national-ignition-facility-2025",p:"实验纪录"},
{t:"BEST杜瓦底座完成安装进入核心装配阶段",s:"合肥BEST完成杜瓦底座关键安装节点",d:"2025-09",u:"https://english.hf.cas.cn/nr/headline/202510/t20251009_1075255.html",p:"装置建设"},
{t:"CFS计划弗吉尼亚建设首个并网商业聚变电站ARC",s:"CFS与Dominion Energy合作选址/电网/许可",d:"2024-12",u:"https://blog.cfs.energy/answering-the-call-for-more-energy/",p:"商业电站"},
{t:"CFS SPARC进入托卡马克装配阶段",s:"从部件制造推进到系统集成阶段",d:"2025-03",u:"https://blog.cfs.energy/cfs-takes-its-next-step-toward-fusion-energy-assembling-the-sparc-tokamak/",p:"装置建设"},
{t:"CFS完成8.63亿美元B2轮融资累计接近30亿美元",s:"超额认购轮，三井物产领衔日本12家企业联合体参与",d:"2025-08",u:"https://www.cfs.energy/news-and-media/commonwealth-fusion-systems-raises-863-million-series-b2-round-to-accelerate-the-commercialization-of-fusion-energy/",p:"融资"},
{t:"CFS与Google签署200MW聚变电力采购协议",s:"Google成为首批公开锚定聚变电力的科技客户",d:"2025-06",u:"https://blog.cfs.energy/powering-the-future-of-ai-with-fusion-energy/",p:"商业订单"},
{t:"Helion完成4.25亿美元F轮融资推进Polaris",s:"Polaris装置进入运行阶段推进发电示范",d:"2025-01",u:"https://www.helionenergy.com/newsroom/helion-announces-425m-series-f-investment-to-scale-commercialized-fusion-power",p:"融资/装置"},
{t:"Helion Orion项目获地方许可推进",s:"与微软购电协议绑定，选址/土地/许可执行",d:"2025-10",u:"https://www.helionenergy.com/newsroom/helion-receives-approvals-for-next-phase-of-construction-of-worlds-first-commercial-fusion-power-plant",p:"许可/商业电站"},
{t:"Helion发起HERCULES高校合作计划投入超1700万美元",s:"面向材料/等离子体/诊断/工程/人才培养布局生态",d:"2026-04",u:"https://www.helionenergy.com/newsroom",p:"研发合作"},
{t:"Zap Energy完成1.3亿美元D轮融资并启动Century平台",s:"Century工程测试平台运行验证重复脉冲和工厂级系统",d:"2024-10",u:"https://www.zapenergy.com/news/zap-attracts-130m-as-demo-system-begins-operations",p:"融资/装置"},
{t:"Zap Energy调整CEO强化一体化核工程战略",s:"Zabrina Johal任CEO，转向核工程/燃料循环/电站集成",d:"2026-05",u:"https://www.prnewswire.com/news-releases/zap-energy-advances-integrated-nuclear-strategy-and-appoints-zabrina-johal-as-ceo-302757297.html",p:"公司治理"},
{t:"Tokamak Energy完成1.25亿美元融资",s:"推进HTS磁体/ST40和聚变电站技术",d:"2024-11",u:"https://tokamakenergy.com/2024/11/20/tokamak-energy-raises-125m-to-commercialise-transformative-fusion-and-magnet-technologies/",p:"融资"},
{t:"Tokamak Energy与DOE/DESNZ推进5200万美元ST40升级",s:"英美政府联合支持商业聚变技术验证",d:"2024-12",u:"https://tokamakenergy.com/2024/12/05/tokamak-energy-partners-with-u-s-doe-and-uks-desnz-to-accelerate-fusion-development-through-52m-st40-upgrade/",p:"政府项目"},
{t:"Type One Energy与ORNL/TVA合作Infinity Two仿星器试点",s:"田纳西推进仿星器聚变电站关键工程验证",d:"2025-02",u:"https://typeoneenergy.com/",p:"装置建设/合作"},
{t:"Type One Energy完成Infinity Two初步设计评审",s:"从概念设计转向工程化推进",d:"2025-05",u:"https://typeoneenergy.com/type-one-energy-completes-formal-design-review/",p:"装置设计/评审"},
{t:"Proxima Fusion完成1.3亿欧元A轮融资",s:"建设仿星器示范电站技术，欧洲仿星器融资加速",d:"2025-06",u:"https://www.proximafusion.com/press-news/proxima-fusion-raises-eu130m-series-a-to-build-worlds-first-stellarator-based-fusion-power-plant-in-the-2030s",p:"融资"}"""

extra_codes = """{n:"JETTO",d:"1.5D核心输运仿真框架，密度/温度/电流动态分析",p:"核心输运",tm:"JET",inst:"JET",url:"https://github.com/JETTO-codes/JETTO",o:1,t:["输运","平衡"]},
{n:"GSPulse",d:"托卡马克脉冲设计与平衡轨迹优化",p:"实时控制",tm:"Columbia/CFS",inst:"Columbia/CFS",url:"https://github.com/jwai-cfs/GSPulse_public",o:1,t:["脉冲","平衡"]},
{n:"gsfit",d:"托卡马克等离子体边界重建，Grad-Shafranov约束",p:"MHD平衡",tm:"Tokamak Energy",inst:"Tokamak Energy",url:"https://github.com/tokamak-energy/gsfit",o:1,t:["平衡","拟合"]},
{n:"REPED",d:"核算托卡马克边缘剖面与核心耦合，经验/ML模型",p:"MHD稳定性",tm:"EPFL",inst:"EPFL",url:"待补充",o:0,t:["pedestal","预测"]},
{n:"GSevolve",d:"托卡马克等离子体平衡演化模拟",p:"MHD平衡",tm:"GA",inst:"General Atomics",url:"https://github.com/PrincetonUniversity/GSevolve",o:1,t:["平衡","演化"]},
{n:"DYON",d:"等离子体破裂与电流淬灭模拟",p:"实时控制",tm:"EUROfusion",inst:"EUROfusion",url:"https://gitlab.eufus.psnc.pl/Plasma_Initiation/dyon",o:1,t:["电路","破裂"]},
{n:"TASK",d:"综合托卡马克整体模拟（输运、源项等）",p:"集成建模",tm:"京都大学BPSI",inst:"京都大学BPSI",url:"http://bpsi.nucleng.kyoto-u.ac.jp/task/",o:1,t:["集成建模","输运"]},
{n:"JSOLVER",d:"固定边界MHD平衡求解",p:"MHD平衡",tm:"PPPL",inst:"PPPL",url:"https://github.com/PrincetonUniversity/JSOLVER",o:1,t:["平衡","求解器"]},
{n:"GLF23",d:"基于gyro-fluid的输运模型，H模式核心输运",p:"核心输运",tm:"多国",inst:"多国",url:"https://github.com/GeneralAtomics/GLF23",o:1,t:["输运","准线性"]},
{n:"LUKE",d:"Fokker-Planck波程序，漂移动理学+蒙特卡洛",p:"加热/电流驱动",tm:"EPFL",inst:"EPFL",url:"https://spcgit.epfl.ch/luke/tutorial.html",o:1,t:["漂移动理学","蒙特卡洛"]},
{n:"MARS",d:"磁流体不稳定性求解器，多流体/动理学EP效应",p:"MHD稳定性",tm:"General Atomics",inst:"General Atomics",url:"https://fusion.gat.com/global/theory/home",o:0,t:["稳定性","有限元","本征值"]},
{n:"MAS",d:"AE/EP等MHD分析",p:"MHD稳定性",tm:"EUROfusion",inst:"EUROfusion",url:"https://arxiv.org/abs/2304.09476",o:1,t:["平衡","稳定性"]},
{n:"REMA",d:"托卡马克MHD稳定性分析，加热RF射线追踪",p:"MHD稳定性",tm:"CEA",inst:"CEA",url:"待补充",o:0,t:["稳定性","有限元"]},
{n:"FEEQS.M",d:"有限元网格自由边界平衡计算/重建",p:"MHD平衡",tm:"PPPL",inst:"PPPL",url:"待补充",o:0,t:["平衡","有限元"]},
{n:"C3PO",d:"托卡马克波迹追踪程序，仿星器优化设计",p:"仿星器优化",tm:"IPP",inst:"IPP",url:"待补充",o:0,t:["优化","平衡"]}"""

extra_devices = """{n:"J-TEXT",r:"托卡马克",rt:"rt-t",loc:"中国武汉",q:"Q<0.001",f:"待补充",s:"大半径1.05m,B=2.0T",h:"华中科技大学；面向MHD不稳定性、RMP、破裂和边界物理研究",w:""},
{n:"EXL-50",r:"球形托卡马克",rt:"rt-t",loc:"中国廊坊",q:"Q<0.001",f:"待补充",s:"大半径0.50m,B=0.5T",h:"新奥聚变；验证无中心螺线管等离子体启动与电子加热方案",w:""},
{n:"STOR-M",r:"托卡马克",rt:"rt-t",loc:"加拿大",q:"待补充",f:"待补充",s:"大半径0.46m,B=0.7T",h:"加拿大高校托卡马克和等离子体教育平台",w:""},
{n:"TCABR",r:"托卡马克",rt:"rt-t",loc:"巴西圣保罗",q:"待补充",f:"待补充",s:"大半径0.61m,B=1.1T",h:"巴西托卡马克物理、射频加热和边界研究平台",w:""}"""

code_count = len(re.findall(r'\{n:', codes))
result = f"""// Fusion Hub Data — AUTO-GENERATED, DO NOT EDIT
// Last built: 2026-06-15
// Total: {code_count} codes

const C=[{codes},{extra_codes}];

const D=[{devices},{extra_devices}];

const M=[{companies}];

const P=[{papers}];

const F=[{funding}];

const N=[{news_data}];
"""

with open('data.js','w',encoding='utf-8') as out:
    out.write(result)

print("data.js written")
cc = len(re.findall(r'\{n:', codes)) + len(re.findall(r'\{n:', extra_codes))
dc = len(re.findall(r'\{n:', devices)) + len(re.findall(r'\{n:', extra_devices))
mc = len(re.findall(r'\{n:', companies))
pc = len(re.findall(r'\{t:', papers))
fc = len(re.findall(r'\{n:', funding))
nc = len(re.findall(r'\{t:', news_data))
print(f"C: {cc} codes, D: {dc} devices, M: {mc} companies, P: {pc} papers, F: {fc} funding, N: {nc} news")
