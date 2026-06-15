#!/usr/bin/env python3
"""Sync ALL Feishu Bitable data → data_full.js (v4 — field[12] institution + funding fix)"""

import json, re, os

TASK = "E:/work/tecent/Velo_site_0.1/.task"

def load_json(filename):
    with open(os.path.join(TASK, filename), 'r') as f:
        raw = f.read()
    return json.loads(raw[raw.find('{'):])

def strip_md_url(s):
    if not s: return ""
    m = re.match(r'\[.*?\]\((.*?)\)', str(s))
    return m.group(1) if m else str(s)

def safe_str(v, fallback=""):
    if v is None: return fallback
    if isinstance(v, str): return v.strip()
    return str(v)

def clean_array_str(s):
    s = str(s).strip()
    s = re.sub(r"^\[['\"]", "", s); s = re.sub(r"['\"]\]$", "", s)
    return s.strip()

def is_placeholder(n):
    """Check if name is a placeholder/test entry"""
    if not n or n in ('_','占位','待补充','None','test','Test','NoneType'): return True
    if n.startswith('占位'): return True
    return False

def extract_inst(tm_str):
    """Extract institution short name from team string like 'Name / Institution'"""
    parts = tm_str.rsplit('/', 1)
    if len(parts) == 2:
        return parts[1].strip()[:60]
    parts = tm_str.split(' / ', 1)
    if len(parts) == 2:
        return parts[1].strip()[:60]
    return ""

def build_inst_map():
    """Build {record_id: institution_name} mapping from 单位 table"""
    try:
        data = load_json('institutions_json.txt')
        recs = data.get('data', {}).get('data', [])
        rids = data.get('data', {}).get('record_id_list', [])
        inst_map = {}
        for rec, rid in zip(recs, rids):
            name = safe_str(rec[0]) if rec else '待补充'
            if name and name != '待补充':
                inst_map[rid] = name
        print(f"  Loaded {len(inst_map)} institution records")
        return inst_map
    except Exception as e:
        print(f"  WARN: Could not load institution map: {e}")
        return {}

def clean_funding(val):
    """Clean merged funding values — take first part before semicolon"""
    if not val: return val
    val = str(val)
    # If it has semicolons (merged values), take the first part
    if '；' in val:
        parts = val.split('；')
        val = parts[0].strip()
    elif ';' in val:
        parts = val.split(';')
        val = parts[0].strip()
    return val[:80]

def domain_from_text(text):
    t = safe_str(text).lower()
    if any(w in t for w in ['湍流','回旋']): return '湍流输运'
    if any(w in t for w in ['mhd','平衡','稳定']): return 'MHD平衡/稳定'
    if any(w in t for w in ['边界','偏滤器','sol']): return '边界/偏滤器'
    if any(w in t for w in ['仿星','stellarator','恒星器']): return '仿星器优化'
    if any(w in t for w in ['集成建模','数据标准']): return '集成建模'
    if any(w in t for w in ['pic','激光']): return '粒子模拟'
    if any(w in t for w in ['反应堆','系统代码']): return '反应堆工程'
    if any(w in t for w in ['中子','材料','活化','氚']): return '中子学/材料'
    if any(w in t for w in ['诊断']): return '诊断'
    if any(w in t for w in ['加热','电流驱动','射频','波','ecrh','icrf']): return '加热/电流驱动'
    if any(w in t for w in ['控制','实时','脉冲']): return '控制/实时'
    return '其他'

# ===== CODES =====
print("=== Codes ===")
inst_map = build_inst_map()
codes_raw = load_json('codes_json.txt')
codes_data = codes_raw['data']['data']
codes_js, seen = [], set()
for r in codes_data:
    n = safe_str(r[0])
    if is_placeholder(n): continue
    k = n.lower().strip()[:30]; 
    if k in seen: continue
    seen.add(k)
    url = strip_md_url(r[1]) if r[1] else ""
    desc = safe_str(r[7]) or safe_str(r[8], "待补充")
    tm = safe_str(r[5], "待补充")
    
    # Institution: use field[12] "发布单位" (linked field), fallback to team extraction
    f12 = r[12] if len(r) > 12 else None
    inst = "待补充"
    if f12 and isinstance(f12, list) and len(f12) > 0:
        iid = f12[0].get('id', '') if isinstance(f12[0], dict) else ''
        inst = inst_map.get(iid, '')
    if not inst or inst == '待补充':
        inst = extract_inst(tm)
    if not inst: inst = "待补充"
    
    pp = len(r[9]) if isinstance(r[9], list) else 0
    tags_raw = r[10]; tags = []
    if isinstance(tags_raw, list):
        tags = [safe_str(t) for t in tags_raw if safe_str(t)]
    elif isinstance(tags_raw, str) and tags_raw.strip():
        tags = [t.strip() for t in tags_raw.replace('，',',').split(',') if t.strip()]
    
    p = domain_from_text(desc)
    
    # Open source detection:
    # 1. URL pattern: github.com/ORG/REPO or gitlab.*/ORG/REPO
    # 2. Manual verification list (individually web-searched 2026-06-15)
    MANUAL_OPEN = {
        'GTC','GENE','GX','BOUT++','OpenMC','WarpX','OSIRIS',
        'CGYRO','GYRO','TGLF','TGYRO','EIRENE','EMC3-EIRENE',
        'SOLPS-ITER','M3D-C1','Bluemira','FESTIM','Gkeyll','Hermes-3',
        'IPS','pyrokinetics','DAGMC','FIDASIM','Power Balance Models',
        'SPEC','AORSA','ASCOT5','QuaLiKiz','ASTRA','CRONOS','METIS',
        'GS2','LUKE','TORAY','UEDGE','FISPACT-II','JOREK','OMFIT','TRANSP',
    }
    o = 0
    if n in MANUAL_OPEN:
        o = 1
    elif url and url != '待补充':
        if re.match(r'https?://github\.com/[^/]+/[^/\s\)]+', url): o = 1
        elif re.match(r'https?://gitlab\.[^/]+/[^/]+/[^/\s\)]+', url): o = 1
    
    # Fix broken URLs
    if '(' in url and url.startswith('http://'): url = '待补充'; o = 0
    if not url or url == '待补充': o = 0
    
    codes_js.append({'n':n,'d':desc[:120],'p':p,'tm':tm[:80],'inst':inst,'url':url or '待补充','o':o,'t':tags[:5],'pp':pp})
print(f"  {len(codes_js)}")

# ===== DEVICES =====
print("=== Devices ===")
devices_raw = load_json('devices_json.txt')
devices_data = devices_raw['data']['data']
devices_js, seen = [], set()
for r in devices_data:
    n = safe_str(r[0])
    if is_placeholder(n): continue
    k = n.lower().strip()[:30]
    if k in seen: continue
    seen.add(k)
    route = safe_str(r[9], "托卡马克")
    loc = safe_str(r[11], "待补充")
    q_val = safe_str(r[5], "待补充")
    funding = clean_funding(safe_str(r[6], "")) or clean_funding(safe_str(r[3], "")) or "待补充"
    specs = safe_str(r[4], "待补充")
    desc = safe_str(r[19], "待补充")[:200]
    website = safe_str(r[12], "") if len(r) > 12 else ""
    if website and 'http' not in website: website = ""
    devices_js.append({'n':n,'r':route,'loc':loc,'q':q_val,'f':funding[:80],'s':specs[:100],'h':desc,'w':website})
print(f"  {len(devices_js)}")

# ===== COMPANIES =====
print("=== Companies ===")
companies_raw = load_json('companies_json.txt')
companies_data = companies_raw['data']['data']
companies_js, seen = [], set()
for r in companies_data:
    n = safe_str(r[0])
    if is_placeholder(n): continue
    k = n.lower().strip()[:30]
    if k in seen: continue
    seen.add(k)
    if '瞬原' in n: continue  # skip velo data
    e = safe_str(r[21], "")
    loc_raw = safe_str(r[2], "待补充")
    country = clean_array_str(r[24]) if r[24] else ""
    loc = (f"{country} {loc_raw}"[:60]) if country and country not in loc_raw else loc_raw[:60]
    ty = clean_array_str(r[18]) if r[18] else "待补充"
    if ty == 'None': ty = "待补充"
    route = safe_str(r[13], "待补充")
    scale = safe_str(r[16], "待补充")
    desc = safe_str(r[19], "待补充")[:150]
    website = strip_md_url(r[9]) if len(r) > 9 and r[9] else ""
    companies_js.append({'n':n,'e':e,'loc':loc,'ty':ty,'d':desc,'v':scale[:80],'w':website,'r':route[:80]})
print(f"  {len(companies_js)}")

# ===== PAPERS (only with links, resolve code links, remove URL-titles) =====
print("=== Papers ===")

# Build code ID -> name mapping for resolving linked code fields
def build_code_map():
    try:
        data = load_json('codes_with_id.json')
        recs = data.get('data', {}).get('data', [])
        rids = data.get('data', {}).get('record_id_list', [])
        code_map = {}
        for rec, rid in zip(recs, rids):
            name = safe_str(rec[0])
            if name:
                code_map[rid] = name
        return code_map
    except:
        return {}

code_map = build_code_map()
print(f"  Loaded {len(code_map)} code IDs")

def resolve_code_links(val):
    """Resolve linked code record IDs to comma-separated code names"""
    if not val: return "待补充"
    if isinstance(val, list):
        names = []
        for item in val:
            if isinstance(item, dict) and 'id' in item:
                name = code_map.get(item['id'], '')
                if name: names.append(name)
        return ','.join(names) if names else "待补充"
    if isinstance(val, str) and not val.startswith('[{'): return val
    return "待补充"

papers_raw = load_json('papers_json.txt')
papers_data = papers_raw['data']['data']
papers_js, seen = [], set()
for r in papers_data:
    t = safe_str(r[0])
    if not t or is_placeholder(t): continue
    # Skip URL-like titles
    if t.startswith('http'): continue
    # Skip duplicates
    key = t[:50].strip()
    if key in seen: continue
    seen.add(key)
    
    # Link field [12]
    l = safe_str(r[12], ""); l = strip_md_url(l) if l else ""
    # ONLY keep papers with links
    if not l: continue
    
    h = safe_str(r[8], "") or safe_str(r[3], "待补充")
    date_str = safe_str(r[10], "")
    y = date_str[:4] if len(date_str) >= 4 else "待补充"
    
    # Code association — field[4] 关联代码 (link field), resolve to names
    c_raw = resolve_code_links(r[4])
    
    a = "待补充"; j = "待补充"
    papers_js.append({'t':t[:80],'a':a,'j':j,'y':y,'h':h[:150],'c':c_raw,'l':l})
print(f"  {len(papers_js)}")

# ===== NEWS =====
print("=== News ===")
news_raw = load_json('news_json.txt')
news_data = news_raw['data']['data']
news_js, seen = [], set()
for r in news_data:
    t = safe_str(r[0])
    if not t or is_placeholder(t): continue
    key = t[:50].strip()
    if key in seen: continue
    seen.add(key)
    s = safe_str(r[3], "待补充")[:150]
    d_raw = safe_str(r[5], "待补充"); d = d_raw[:10] if d_raw else "待补充"
    p = clean_array_str(r[7]) if r[7] else "行业动态"
    u = strip_md_url(r[4]) if len(r) > 4 and r[4] else ""
    news_js.append({'t':t[:80],'s':s,'d':d,'p':p,'u':u})
print(f"  {len(news_js)}")

# ===== FUNDING =====
print("=== Funding ===")
funding_raw = load_json('funding_json.txt')
funding_data = funding_raw['data']['data']
funding_js, seen = [], set()
for r in funding_data:
    n = safe_str(r[0])
    if is_placeholder(n): continue
    ev = safe_str(r[1], "待补充")
    amt = safe_str(r[2], "待补充")
    y_raw = safe_str(r[3], "待补充")
    y = y_raw[:4] if len(y_raw) >= 4 else y_raw[:10] if y_raw else "待补充"
    h = safe_str(r[4], "待补充")[:150]
    key = f"{n}:{ev}:{amt}:{y}"
    if key in seen: continue
    seen.add(key)
    funding_js.append({'n':n,'ev':ev,'amt':amt,'y':y,'h':h,'o':n})
print(f"  {len(funding_js)}")

# ===== GENERATE =====
print("=== Generating ===")
def to_js_obj(d, fields):
    parts = []
    for k in fields:
        v = d.get(k, "")
        if isinstance(v, str):
            esc = v.replace('\\','\\\\').replace('"','\\"').replace('\n',' ')
            parts.append(f'{k}:"{esc}"')
        elif isinstance(v, list):
            parts.append(f'{k}:{json.dumps(v, ensure_ascii=False)}')
        elif isinstance(v, (bool, int)):
            parts.append(f'{k}:{json.dumps(v)}')
        else:
            parts.append(f'{k}:""')
    return '{'+','.join(parts)+'}'

lines = [
    "// Fusion Hub Data — AUTO-GENERATED",
    f"// {len(codes_js)}C {len(devices_js)}D {len(companies_js)}M {len(papers_js)}P {len(news_js)}N {len(funding_js)}F",
    "",
    f"const C=[{','.join(to_js_obj(c, ['n','d','p','tm','inst','url','o','t','pp']) for c in codes_js)}];",
    "",
    f"const D=[{','.join(to_js_obj(d, ['n','r','loc','q','f','s','h','w']) for d in devices_js)}];",
    "",
]
comp_fields = ['n','e','loc','ty','d','v','w','r']
lines.append(f"const M=[{','.join(to_js_obj(c, comp_fields) for c in companies_js)}];")
lines.append("")
lines.append(f"const P=[{','.join(to_js_obj(p, ['t','a','j','y','h','c','l']) for p in papers_js)}];")
lines.append("")
lines.append(f"const F=[{','.join(to_js_obj(f, ['n','ev','amt','y','h','o']) for f in funding_js)}];")
lines.append("")
lines.append(f"const N=[{','.join(to_js_obj(n, ['t','s','d','p','u']) for n in news_js)}];")
lines.append("")

data_js = '\n'.join(lines)
with open('data_full.js', 'w', encoding='utf-8') as f:
    f.write(data_js)
print(f"data_full.js: {len(data_js)} bytes, total {len(codes_js)+len(devices_js)+len(companies_js)+len(papers_js)+len(news_js)+len(funding_js)} records")
print("Done!")
