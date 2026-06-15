#!/usr/bin/env python3
"""Sync ALL Feishu Bitable data → Fusion Hub standalone HTML"""

import json, re, os

TASK = "E:/work/tecent/Velo_site_0.1/.task"

def load_json(filename):
    with open(os.path.join(TASK, filename), 'r') as f:
        raw = f.read()
    raw = raw[raw.find('{'):]
    return json.loads(raw)

def strip_md_url(s):
    """Extract URL from markdown link or return plain string"""
    if not s: return ""
    m = re.match(r'\[.*?\]\((.*?)\)', str(s))
    return m.group(1) if m else str(s)

def safe_str(v, fallback=""):
    if v is None: return fallback
    if isinstance(v, str): return v.strip()
    return str(v)

def dedup_key(n):
    """Generate dedup key from name"""
    return re.sub(r'[^a-z0-9]', '', n.lower())[:20]

# ===== CODES =====
def domain_from_text(text):
    t = safe_str(text).lower()
    if any(w in t for w in ['湍流','回旋']): return '湍流输运'
    if any(w in t for w in ['mhd','平衡']): return 'MHD平衡/稳定'
    if any(w in t for w in ['边界','偏滤器','sol']): return '边界/偏滤器'
    if any(w in t for w in ['仿星','stellarator','恒星器']): return '仿星器优化'
    if any(w in t for w in ['集成','建模','数据标准']): return '集成建模'
    if any(w in t for w in ['pic','激光']): return '粒子模拟'
    if any(w in t for w in ['反应堆','系统代码','设计']): return '反应堆工程'
    if any(w in t for w in ['中子','材料','活化','输运','氚']): return '中子学/材料'
    if any(w in t for w in ['诊断']): return '诊断'
    if any(w in t for w in ['加热','电流驱动','射频','波','ecrh','icrf']): return '加热/电流驱动'
    if any(w in t for w in ['控制','实时','脉冲']): return '控制/实时'
    return '其他'

print("=== Loading codes ===")
codes_raw = load_json('codes_json.txt')
codes_data = codes_raw['data']['data']
codes_js = []
seen_code = set()
for r in codes_data:
    n = safe_str(r[0])
    if not n: continue
    key = dedup_key(n)
    if key in seen_code: continue
    seen_code.add(key)
    url = strip_md_url(r[1]) if r[1] else ""
    desc = safe_str(r[7]) or safe_str(r[8], "待补充")
    tm_raw = safe_str(r[5], "待补充")
    # inst field (12) might be a link array like "[{'id':'recxxx'}]"
    inst_raw = safe_str(r[12], "")
    if inst_raw.startswith("[{") or not inst_raw:
        inst = "待补充"
    else:
        inst = inst_raw[:60]
    # Split team/inst from combined string like "Name / Institution"
    tm = tm_raw
    papers_raw = r[9]
    pp = len(papers_raw) if isinstance(papers_raw, list) else 0
    tags_raw = r[10]
    tags = []
    if isinstance(tags_raw, list):
        tags = [safe_str(t) for t in tags_raw if safe_str(t)]
    elif isinstance(tags_raw, str) and tags_raw.strip():
        tags = [t.strip() for t in tags_raw.replace('，',',').split(',') if t.strip()]
    p = domain_from_text(desc)
    o = 1 if 'github.com' in url.lower() or 'gitlab' in url.lower() else 0
    # Fix known bad URLs
    if '(' in url and 'http' in url and not url.startswith('https://'):
        url = '待补充'
    if not url or url == '待补充':
        o = 0
    
    codes_js.append({
        'n': n, 'd': desc[:120], 'p': p, 'tm': tm[:80], 
        'inst': inst[:60], 'url': url or '待补充', 'o': o, 't': tags[:5], 'pp': pp
    })

print(f"  {len(codes_js)} codes")

# ===== DEVICES =====
print("=== Loading devices ===")
devices_raw = load_json('devices_json.txt')
devices_data = devices_raw['data']['data']
devices_js = []
seen_dev = set()
for r in devices_data:
    n = safe_str(r[0])
    if not n: continue
    key = dedup_key(n)
    if key in seen_dev: continue
    seen_dev.add(key)
    
    route = safe_str(r[9], "托卡马克")
    loc = safe_str(r[11], "待补充")
    q_val = safe_str(r[5], "待补充") or safe_str(r[21], "待补充")
    funding = safe_str(r[2], "待补充") or safe_str(r[7], "待补充")
    specs = safe_str(r[4], "待补充")
    desc = safe_str(r[19], "待补充") or safe_str(r[2], "")[:150]
    website = strip_md_url(r[22]) if len(r) > 22 and r[22] else strip_md_url(r[13]) if len(r) > 13 and r[13] else ""
    if not website:
        website = safe_str(r[13], "") if len(r) > 13 else ""
        if website and 'http' not in website: website = ""
    
    devices_js.append({
        'n': n, 'r': route, 'loc': loc, 'q': q_val, 
        'f': funding[:80], 's': specs[:100], 'h': desc[:200], 'w': website
    })

print(f"  {len(devices_js)} devices")

# ===== COMPANIES =====
print("=== Loading companies ===")
companies_raw = load_json('companies_json.txt')
companies_data = companies_raw['data']['data']
companies_js = []
seen_comp = set()
for r in companies_data:
    n = safe_str(r[0])
    if not n: continue
    key = dedup_key(n)
    if key in seen_comp: continue
    seen_comp.add(key)
    
    e = safe_str(r[1], "")  # English name
    loc = safe_str(r[3], "待补充")  # 地点
    ty = safe_str(r[2], "待补充")  # 领域/路线
    desc = safe_str(r[5], "待补充")[:150]  # 备注
    scale = safe_str(r[4], "待补充")  # 规模
    website = strip_md_url(r[6]) if len(r) > 6 and r[6] else ""
    
    companies_js.append({
        'n': n, 'e': e, 'loc': loc, 'ty': ty, 
        'd': desc, 'v': scale[:80], 'w': website
    })

print(f"  {len(companies_js)} companies")

# ===== PAPERS =====
print("=== Loading papers ===")
papers_raw = load_json('papers_json.txt')
papers_data = papers_raw['data']['data']
papers_js = []
seen_paper = set()
for r in papers_data:
    t = safe_str(r[0])
    if not t: continue
    key = t[:50].strip()
    if key in seen_paper: continue
    seen_paper.add(key)
    
    a = safe_str(r[1], "待补充")
    j = safe_str(r[2], "待补充")
    y = safe_str(r[3], "待补充")
    h = safe_str(r[4], "待补充")[:150]
    c = safe_str(r[5], "待补充")
    l = strip_md_url(r[6]) if len(r) > 6 and r[6] else ""
    
    papers_js.append({'t': t[:80], 'a': a[:60], 'j': j[:40], 'y': y, 'h': h, 'c': c, 'l': l})

print(f"  {len(papers_js)} papers")

# ===== NEWS =====
print("=== Loading news ===")
news_raw = load_json('news_json.txt')
news_data = news_raw['data']['data']
news_js = []
seen_news = set()
for r in news_data:
    t = safe_str(r[0])
    if not t: continue
    key = t[:50].strip()
    if key in seen_news: continue
    seen_news.add(key)
    
    s = safe_str(r[1], "待补充")[:150]
    d = safe_str(r[2], "待补充")
    p = safe_str(r[3], "行业动态")
    u = strip_md_url(r[4]) if len(r) > 4 and r[4] else ""
    
    news_js.append({'t': t[:80], 's': s, 'd': d, 'p': p, 'u': u})

print(f"  {len(news_js)} news")

# ===== FUNDING =====
print("=== Loading funding ===")
funding_raw = load_json('funding_json.txt')
funding_data = funding_raw['data']['data']
funding_js = []
seen_fund = set()
for r in funding_data:
    n = safe_str(r[0])
    if not n: continue
    key = f"{n}:{safe_str(r[1])}:{safe_str(r[3])}"
    if key in seen_fund: continue
    seen_fund.add(key)
    
    ev = safe_str(r[1], "待补充")
    amt = safe_str(r[2], "待补充")
    y = safe_str(r[3], "待补充")
    h = safe_str(r[4], "待补充")[:150]
    
    funding_js.append({'n': n, 'ev': ev, 'amt': amt, 'y': y, 'h': h, 'o': n})

print(f"  {len(funding_js)} funding")

# ===== GENERATE data.js =====
print("=== Generating data.js ===")
def to_js_obj(d, fields):
    """Convert dict to compact JS object"""
    parts = []
    for k in fields:
        v = d.get(k, "")
        if isinstance(v, str):
            esc = v.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
            parts.append(f'{k}:"{esc}"')
        elif isinstance(v, list):
            parts.append(f'{k}:{json.dumps(v, ensure_ascii=False)}')
        elif isinstance(v, bool) or isinstance(v, int):
            parts.append(f'{k}:{json.dumps(v)}')
        else:
            parts.append(f'{k}:""')
    return '{' + ','.join(parts) + '}'

data_lines = [
    "// Fusion Hub Data — FULL SYNC from Feishu Bitable",
    f"// Codes: {len(codes_js)} | Devices: {len(devices_js)} | Companies: {len(companies_js)}",
    f"// Papers: {len(papers_js)} | News: {len(news_js)} | Funding: {len(funding_js)}",
    "",
]

# Codes
code_fields = ['n','d','p','tm','inst','url','o','t','pp']
data_lines.append(f"const C=[{','.join(to_js_obj(c, code_fields) for c in codes_js)}];")
data_lines.append("")

# Devices
dev_fields = ['n','r','loc','q','f','s','h','w']
data_lines.append(f"const D=[{','.join(to_js_obj(d, dev_fields) for d in devices_js)}];")
data_lines.append("")

# Companies
comp_fields = ['n','e','loc','ty','d','v','w']
data_lines.append(f"const M=[{','.join(to_js_obj(c, comp_fields) for c in companies_js)}];")
data_lines.append("")

# Papers
paper_fields = ['t','a','j','y','h','c','l']
data_lines.append(f"const P=[{','.join(to_js_obj(p, paper_fields) for p in papers_js)}];")
data_lines.append("")

# Funding
fund_fields = ['n','ev','amt','y','h','o']
data_lines.append(f"const F=[{','.join(to_js_obj(f, fund_fields) for f in funding_js)}];")
data_lines.append("")

# News
news_fields = ['t','s','d','p','u']
data_lines.append(f"const N=[{','.join(to_js_obj(n, news_fields) for n in news_js)}];")
data_lines.append("")

data_js = '\n'.join(data_lines)
with open('data_full.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print(f"data_full.js: {len(data_js)} bytes")
print("Done!")