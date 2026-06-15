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
    return'<div class="card"><div class="hd"><div class="ic">'+c.n[0]+'</div><div><div class="tl">'+c.n+'</div><div class="me">'+c.p+'</div></div><span class="lc '+(c.o?'lo':'lc2')+'" style="margin-left:auto">'+(c.o?'开源':'需申请')+'</span></div><div class="ds">'+c.d+'</div><div class="tgs">'+(c.t||[]).slice(0,4).map(function(t){return'<span>'+t+'</span>'}).join('')+'</div><div class="ft">👤 '+c.tm+' · 🏛 '+c.inst+pl+'<a href="'+c.url+'" target="_blank" style="margin-left:auto">GitHub / 主页 →</a></div></div>'
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

function init(){renderCodes()}
