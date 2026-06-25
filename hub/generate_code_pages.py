#!/usr/bin/env python3
"""Fusion Hub Code Detail Page Generator

Reads codes_detail.json + C array from index.html → generates independent HTML pages.
Supports KaTeX-rendered mathematical formulas.
"""

import json
import os
import re
import demjson3

HUB_DIR = os.path.dirname(os.path.abspath(__file__))
CODES_DIR = os.path.join(HUB_DIR, "codes")
DETAIL_JSON = os.path.join(HUB_DIR, "codes_detail.json")
INDEX_HTML = os.path.join(HUB_DIR, "index.html")

# --- CSS reused from index.html (same design vars) ---
CSS = """<style>
:root{--bg:#f8f7f4;--surf:#fff;--txt:#1c1c1c;--mu:#5c5c5c;--ac:oklch(0.52 0.18 25);--bd:oklch(0.86 0.01 90);--tg:oklch(0.95 0.02 90)}
*,*::before,*::after{box-sizing:border-box;margin:0}
body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--txt);line-height:1.55}
a{color:var(--ac);text-decoration:none}a:hover{text-decoration:underline}
.breadcrumb{max-width:900px;margin:0 auto;padding:1rem 1.2rem 0;font-size:.78rem;color:var(--mu)}
.breadcrumb a{color:var(--ac);font-weight:500}
.container{max-width:900px;margin:0 auto;padding:1.2rem 1.2rem 3rem}
h1{font-family:Georgia,serif;font-size:1.6rem;margin-bottom:.15rem}
.subtitle{font-size:.85rem;color:var(--mu);margin-bottom:.6rem}
.meta-row{display:flex;flex-wrap:wrap;gap:.35rem;align-items:center;margin-bottom:1rem}
.mtag{font-size:.72rem;padding:2px 10px;border-radius:3px;font-weight:600}
.mtag-domain{background:oklch(0.92 0.03 24);color:oklch(0.42 0.13 26)}
.mtag-open{background:oklch(0.87 0.08 18);color:#0d7a3e}
.mtag-closed{background:oklch(0.86 0.06 16);color:#b23b1e}
.stag{font-size:.68rem;padding:2px 8px;border-radius:100px;background:var(--tg);color:var(--mu)}
.section{margin-bottom:1.6rem}
.section h2{font-family:Georgia,serif;font-size:1.1rem;margin-bottom:.5rem;padding-bottom:.25rem;border-bottom:2px solid var(--bd)}
.section h3{font-size:.9rem;color:var(--ac);margin:.8rem 0 .3rem}
.section p,.section .body-text{font-size:.88rem;line-height:1.75;color:var(--txt)}
.features-grid{display:flex;flex-wrap:wrap;gap:.35rem}
.fchip{font-size:.74rem;padding:4px 12px;border-radius:100px;background:oklch(0.95 0.03 20);color:oklch(0.4 0.12 26)}
.links-list{display:flex;flex-wrap:wrap;gap:.5rem}
.links-list a{font-size:.82rem;padding:3px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--surf);transition:.15s}
.links-list a:hover{background:var(--tg);text-decoration:none}
.formula-block{background:var(--surf);border:1px solid var(--bd);border-radius:8px;padding:1rem 1.2rem;margin:.6rem 0;overflow-x:auto}
.formula-block .katex-display{margin:.5rem 0!important}
.formula-label{font-size:.72rem;color:var(--mu);font-weight:600;margin-bottom:.3rem;text-transform:uppercase;letter-spacing:.5px}
.empty-note{color:var(--mu);font-size:.8rem;font-style:italic}
.variant-card{background:var(--surf);border:1px solid var(--bd);border-radius:8px;padding:1rem 1.2rem;margin:.6rem 0}
.variant-card h4{font-family:Georgia,serif;font-size:.9rem;color:var(--ac);margin-bottom:.4rem}
.variant-card .formula-block{margin:.4rem 0;border:none;padding:.5rem 0}
footer{text-align:center;padding:1.5rem;color:var(--mu);font-size:.72rem;border-top:1px solid var(--bd);margin-top:2rem}
@media(max-width:700px){.container{padding:.8rem .8rem 2rem}h1{font-size:1.3rem}.formula-block{padding:.6rem .8rem}}
</style>"""

# KaTeX CDN
KATEX_HEAD = """<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" crossorigin="anonymous"
    onload="renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false})"></script>"""


def get_domain_icon(domain):
    mapping = {
        "湍流输运": "🌊", "MHD平衡/稳定": "🧲", "边界/偏滤器": "🔥",
        "仿星器优化": "⭐", "集成建模": "🔗", "粒子模拟": "⚡",
        "反应堆工程": "🏭", "中子学/材料": "🔬", "加热/电流驱动": "📡",
        "控制/实时": "🎮", "诊断": "📊", "核心输运": "🔄",
        "MHD平衡": "🧲", "MHD稳定性": "🧲", "激光等离子体": "⚡",
        "边界物理": "🔥", "仿星器/MHD平衡": "⭐", "实时控制": "🎮",
        "加热/电流驱动/源": "📡", "等离子体理论": "📐",
    }
    return mapping.get(domain, "🔬")


def extract_codes_metadata():
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r"const C=\[(.+?)\];\s*(?:const D=|$)", content, re.DOTALL)
    if not match:
        raise ValueError("Could not find C array in index.html")
    js_array = "[" + match.group(1) + "]"
    codes = demjson3.decode(js_array)
    meta = {}
    for c in codes:
        meta[c["n"]] = {
            "domain": c.get("p", ""),
            "open_source": bool(c.get("o", 0)),
            "tags": c.get("t", []),
            "team": c.get("tm", ""),
            "institution": c.get("inst", ""),
            "website": c.get("url", ""),
            "short_desc": c.get("d", ""),
        }
    return meta


def load_details():
    with open(DETAIL_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def escape_html(text):
    if not text:
        return ""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def formula_section(label, formula):
    """Render a formula block with label. Formula is raw LaTeX (already includes $$)."""
    if not formula:
        return ""
    return f"""<div class="formula-block">
<div class="formula-label">{escape_html(label)}</div>
{formula}
</div>"""


def render_page(name, detail, meta):
    esc = escape_html
    m = meta or {}
    domain = m.get("domain", "")
    open_src = m.get("open_source", True)
    tags = m.get("tags", [])

    full_name = detail.get("full_name", name)
    long_desc = detail.get("long_desc", "")
    features = detail.get("features", [])
    links = detail.get("links", [])

    closure = detail.get("closure", "")
    closure_formula = detail.get("closure_formula", "")
    normalization = detail.get("normalization", "")
    normalization_formula = detail.get("normalization_formula", "")
    variants = detail.get("variants", "")
    variant_formulas = detail.get("variant_formulas", [])

    lic_label = "开源" if open_src else "需申请"
    lic_cls = "mtag-open" if open_src else "mtag-closed"

    sections = []

    # Description
    if long_desc:
        sections.append(f"""<div class="section">
<h2>📖 详细介绍</h2>
<p class="body-text">{esc(long_desc)}</p>
</div>""")

    # Features
    if features:
        chips = "\n".join(f'<span class="fchip">{esc(f)}</span>' for f in features)
        sections.append(f"""<div class="section">
<h2>⚙️ 核心特性</h2>
<div class="features-grid">{chips}</div>
</div>""")

    # === CLOSURE SECTION (text + formulas) ===
    closure_parts = []
    if closure:
        closure_parts.append(f'<p class="body-text">{esc(closure)}</p>')
    if closure_formula:
        closure_parts.append(formula_section("闭合方程组", closure_formula))
    if not closure_parts:
        closure_parts.append('<p class="empty-note">暂无数据</p>')
    sections.append(f"""<div class="section">
<h2>📐 方程闭合方式</h2>
{"".join(closure_parts)}
</div>""")

    # === NORMALIZATION SECTION ===
    norm_parts = []
    if normalization:
        norm_parts.append(f'<p class="body-text">{esc(normalization)}</p>')
    if normalization_formula:
        norm_parts.append(formula_section("归一化关系", normalization_formula))
    if not norm_parts:
        norm_parts.append('<p class="empty-note">暂无数据</p>')
    sections.append(f"""<div class="section">
<h2>📏 归一化方案</h2>
{"".join(norm_parts)}
</div>""")

    # === VARIANTS SECTION (text + per-variant formulas) ===
    var_parts = []
    if variants:
        var_parts.append(f'<p class="body-text">{esc(variants)}</p>')
    if variant_formulas:
        for vf in variant_formulas:
            vname = vf.get("name", "")
            vdesc = vf.get("desc", "")
            vformula = vf.get("formula", "")
            vcard = f'<div class="variant-card"><h4>{esc(vname)}</h4>'
            if vdesc:
                vcard += f'<p class="body-text" style="font-size:.82rem;color:var(--mu)">{esc(vdesc)}</p>'
            if vformula:
                vcard += f'<div class="formula-block" style="border:none;padding:.3rem 0">{vformula}</div>'
            vcard += '</div>'
            var_parts.append(vcard)
    if not var_parts:
        var_parts.append('<p class="empty-note">暂无数据</p>')
    sections.append(f"""<div class="section">
<h2>🔄 功能变体</h2>
{"".join(var_parts)}
</div>""")

    # Links
    if links:
        link_items = "\n".join(
            f'<a href="{esc(l)}" target="_blank" rel="noopener">{esc(l.replace("https://", "").replace("http://", "")[:60])}</a>'
            for l in links
        )
        sections.append(f"""<div class="section">
<h2>🔗 相关链接与论文</h2>
<div class="links-list">{link_items}</div>
</div>""")

    domain_icon = get_domain_icon(domain)

    return f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="description" content="Fusion Hub · {esc(name)} — {esc(full_name)}"/>
<title>{esc(name)} · Fusion Hub</title>
{KATEX_HEAD}
{CSS}
</head>
<body>

<div class="breadcrumb">
<a href="../index.html">← 返回 Fusion Hub 代码库</a>
</div>

<div class="container">

<h1>{esc(name)}</h1>
<div class="subtitle">{esc(full_name)}</div>

<div class="meta-row">
<span class="mtag mtag-domain">{domain_icon} {esc(domain)}</span>
<span class="mtag {lic_cls}">{esc(lic_label)}</span>
{"".join(f'<span class="stag">{esc(t)}</span>' for t in tags[:8])}
</div>

{"".join(sections)}

</div>

<footer>
Fusion Hub · 聚变信息入口 · <a href="../index.html">返回主页</a>
</footer>

</body>
</html>"""


def main():
    print("Loading code details...")
    details = load_details()
    print("Extracting code metadata from index.html...")
    meta = extract_codes_metadata()
    os.makedirs(CODES_DIR, exist_ok=True)
    generated = 0
    for name, detail in details.items():
        code_meta = meta.get(name, {})
        html = render_page(name, detail, code_meta)
        safe_name = name.replace("/", "_").replace("\\", "_")
        out_path = os.path.join(CODES_DIR, f"{safe_name}.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        generated += 1
    for name in meta:
        if name not in details:
            print(f"  ⚠ Code '{name}' has no detail entry in codes_detail.json")
    print(f"\nDone! Generated {generated} pages in {CODES_DIR}/")


if __name__ == "__main__":
    main()
