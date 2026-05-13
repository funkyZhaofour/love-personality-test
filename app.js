const dims=[["intimacy","亲密需求"],["security","依恋安全感"],["boundary","独立边界"],["emotion","情绪稳定"],["communication","沟通能力"],["commitment","责任承诺"],["empathy","共情能力"],["reality","现实规划"]];
let idx=0;let answers=[];
let latestResultText="";
let latestScores=null;
let latestTypes=null;
let partnerData=null;
let latestCoupleText="";

const home=document.getElementById("home"),quiz=document.getElementById("quiz"),result=document.getElementById("result"),coupleResult=document.getElementById("coupleResult");

function cleanBaseUrl(){
  return location.origin + location.pathname;
}

function parsePartnerFromUrl(){
  const params=new URLSearchParams(location.search);
  const data=params.get("partner");
  if(!data)return null;
  try{
    return JSON.parse(decodeURIComponent(escape(atob(data))));
  }catch(e){
    console.warn("partner parse failed",e);
    return null;
  }
}

partnerData=parsePartnerFromUrl();
if(partnerData){
  const notice=document.getElementById("inviteNotice");
  notice.classList.remove("hidden");
  notice.innerText=`你正在接受对方的配对邀请。对方结果：${partnerData.types?.[0]?.name || "已完成测试"}。你完成测试后，会自动生成你们的双人匹配报告。`;
}

document.getElementById("startBtn").onclick=()=>{home.classList.add("hidden");quiz.classList.remove("hidden");render()};
document.getElementById("prevBtn").onclick=()=>{if(idx>0){idx--;answers.pop();render()}};
document.getElementById("restartBtn").onclick=()=>location.href=cleanBaseUrl();
document.getElementById("restartCoupleBtn").onclick=()=>location.href=cleanBaseUrl();

document.querySelectorAll(".options button").forEach(btn=>{
  btn.onclick=()=>{
    answers[idx]=Number(btn.dataset.score);
    idx++;
    if(idx>=QUESTIONS.length)showResult();
    else render();
  }
});

function render(){
  const q=QUESTIONS[idx];
  document.getElementById("moduleName").innerText=q.dimensionName;
  document.getElementById("counter").innerText=`${idx+1}/${QUESTIONS.length}`;
  document.getElementById("question").innerText=`${q.id}. ${q.text}`;
  document.getElementById("bar").style.width=`${idx/QUESTIONS.length*100}%`;
}

function calcScores(){
  const raw={};
  dims.forEach(([k])=>raw[k]=0);
  QUESTIONS.forEach((q,i)=>raw[q.dimension]+=answers[i]||0);
  const scores={};
  dims.forEach(([k])=>scores[k]=Math.round(raw[k]/24*100));
  return scores;
}

function archetypes(s){
  return[
    {name:"🐘 稳定建设者",score:s.commitment*.35+s.reality*.25+s.emotion*.2+s.communication*.2,desc:"你重视长期、承诺和现实稳定，适合认真经营关系。",line:"你不是随便开始的人，但一旦认真，就会想把关系建设好。"},
    {name:"🐬 共情连接者",score:s.empathy*.35+s.communication*.25+s.intimacy*.2+s.security*.2,desc:"你重视理解、照顾和情绪连接，关系中很看重双向回应。",line:"你真正想要的不是热闹，而是被理解、被回应、被认真对待。"},
    {name:"🐺 独立探索者",score:s.boundary*.45+s.emotion*.2+s.reality*.2+(100-s.intimacy)*.15,desc:"你边界感强，需要自由和个人空间，不喜欢被关系过度吞没。",line:"你不是不想恋爱，你只是不能接受在恋爱里失去自己。"},
    {name:"🐶 热情陪伴者",score:s.intimacy*.4+s.security*.25+s.empathy*.2+s.communication*.15,desc:"你需要陪伴、回应和情感确认，恋爱中投入感较强。",line:"你爱一个人的时候，会希望关系是有温度、有回应、有陪伴的。"},
    {name:"🦊 理性筛选者",score:s.reality*.35+s.boundary*.25+s.communication*.2+s.emotion*.2,desc:"你看重现实条件、沟通质量和关系结构，不太容易被短期感觉冲昏头。",line:"你不是冷漠，你只是很清楚：只有感觉没有结构的关系走不远。"},
    {name:"🐼 温和包容者",score:s.empathy*.35+s.emotion*.25+s.communication*.2+s.commitment*.2,desc:"你比较温和、愿意理解和包容，但要注意不要长期压抑自己。",line:"你容易理解别人，但也要记得：你的感受同样重要。"}
  ].sort((a,b)=>b.score-a.score);
}

function showResult(){
  quiz.classList.add("hidden");
  latestScores=calcScores();
  latestTypes=archetypes(latestScores);
  const main=latestTypes[0],sub=latestTypes[1];

  if(partnerData){
    showCoupleResult(partnerData,{scores:latestScores,types:latestTypes});
    return;
  }

  result.classList.remove("hidden");
  document.getElementById("typeTitle").innerText=`${main.name} + ${sub.name}`;
  document.getElementById("oneLine").innerText=main.line;
  document.getElementById("typeDesc").innerText=`你的主类型是「${main.name}」，辅类型是「${sub.name}」。${main.desc} 同时，你也带有「${sub.name}」的特征：${sub.desc}`;
  drawRadar("radar",latestScores);
  renderScores(latestScores);
  renderAnalysis(latestScores);

  latestResultText=`我的恋爱人格测试结果：${main.name} + ${sub.name}\n${main.line}\n八维得分：`+dims.map(([k,n])=>`${n}${latestScores[k]}`).join("，");

  document.getElementById("copyBtn").onclick=()=>copyText(latestResultText,"已复制我的结果");
}

function makeInvitePayload(){
  const payload={
    scores:latestScores,
    types:latestTypes.slice(0,2).map(t=>({name:t.name,line:t.line,desc:t.desc})),
    createdAt:Date.now()
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

document.getElementById("shareTestBtn").onclick=async()=>{
  const url=cleanBaseUrl();
  const text=`这个恋爱人格测试挺有意思的，测测你在恋爱里是什么样的人：${url}`;
  await shareOrCopy("恋爱人格测试",text,url,"已复制普通测试链接，可以发给朋友");
};

document.getElementById("shareFreshTestBtn").onclick=async()=>{
  const url=cleanBaseUrl();
  const text=`这个恋爱人格测试挺有意思的，测测你在恋爱里是什么样的人：${url}`;
  await shareOrCopy("恋爱人格测试",text,url,"已复制普通测试链接，可以发给朋友");
};

document.getElementById("inviteBtn").onclick=async()=>{
  const code=makeInvitePayload();
  const url=`${cleanBaseUrl()}?partner=${code}`;
  const text=`我做了一个恋爱人格测试，想看看我们两个的匹配分析。你也测一下：${url}`;
  await shareOrCopy("恋爱人格双人匹配测试",text,url,"已复制配对邀请链接，可以发给对方");
};

async function shareOrCopy(title,text,url,successMsg){
  if(navigator.share){
    try{
      await navigator.share({title,text,url});
      return;
    }catch(e){}
  }
  await copyText(text,successMsg);
}

async function copyText(text,msg="已复制"){
  try{
    await navigator.clipboard.writeText(text);
    alert(msg);
  }catch(e){
    alert(text);
  }
}

function renderScores(s){
  const box=document.getElementById("scores");
  box.innerHTML="";
  dims.forEach(([k,n])=>{
    const div=document.createElement("div");
    div.className="item";
    div.innerHTML=`<strong>${n}：${s[k]}</strong><div class="scorebar"><div style="width:${s[k]}%"></div></div>`;
    box.appendChild(div);
  });
}

function addItem(id,text,cls=""){
  const div=document.createElement("div");
  div.className="item "+cls;
  div.innerText=text;
  document.getElementById(id).appendChild(div);
}

function renderAnalysis(s){
  ["strengths","risks","matches"].forEach(id=>document.getElementById(id).innerHTML="");

  if(s.commitment>=70)addItem("strengths","责任承诺较强：你不是随便玩玩型，更倾向认真经营长期关系。");
  if(s.communication>=70)addItem("strengths","沟通修复能力较好：出现问题时，你更愿意把事情说清楚。");
  if(s.emotion>=70)addItem("strengths","情绪稳定度较高：冲突中不容易彻底失控。");
  if(s.boundary>=70)addItem("strengths","边界感清晰：你不容易在关系中失去自我。");
  if(s.reality>=70)addItem("strengths","现实规划意识强：你会考虑未来、金钱和长期可持续。");
  if(document.getElementById("strengths").innerHTML==="")addItem("strengths","你的关系状态比较均衡，没有特别极端的单一倾向。");

  if(s.security>=70)addItem("risks","安全感需求偏高：对方冷淡或回应慢时，你可能容易多想。");
  if(s.intimacy>=75&&s.boundary<=45)addItem("risks","亲密需求很高但边界偏弱：容易把对方放得太重，需要保留自我空间。");
  if(s.boundary>=75&&s.intimacy<=45)addItem("risks","边界很强但亲密表达偏低：对方可能觉得你不够主动或不够热。");
  if(s.emotion<=45)addItem("risks","情绪稳定分偏低：冲突中需要注意语气、冲动和事后修复。");
  if(s.communication<=45)addItem("risks","沟通分偏低：容易回避问题或不表达真实需求。");
  if(document.getElementById("risks").innerHTML==="")addItem("risks","目前没有明显高风险短板，但真实关系仍需要看行为一致性。");

  if(s.boundary>=65)addItem("matches","适合尊重边界、有独立生活、不会过度控制你的人。");
  if(s.intimacy>=65)addItem("matches","适合愿意表达、愿意回应、能提供稳定陪伴的人。");
  if(s.reality>=65)addItem("matches","适合有规划、金钱观清晰、愿意共同建设未来的人。");
  if(s.security>=65)addItem("matches","适合情绪稳定、回应清楚、不玩忽冷忽热的人。");
  if(s.empathy>=65)addItem("matches","适合懂得双向照顾，而不是只索取情绪价值的人。");
  if(document.getElementById("matches").innerHTML==="")addItem("matches","适合节奏稳定、愿意沟通、不过度极端的人。");
}

function compatibility(a,b){
  const s1=a.scores, s2=b.scores;
  const parts=[];

  function sim(k,weight,label){
    const diff=Math.abs(s1[k]-s2[k]);
    const score=Math.max(0,100-diff);
    parts.push({k,label,score,weight,diff,a:s1[k],b:s2[k]});
    return score*weight;
  }

  let total=0, weight=0;
  const configs=[
    ["commitment",1.25,"长期承诺"],
    ["reality",1.2,"现实规划"],
    ["communication",1.15,"沟通修复"],
    ["emotion",1.1,"情绪稳定"],
    ["boundary",1.0,"边界节奏"],
    ["intimacy",1.0,"亲密需求"],
    ["security",0.9,"安全感"],
    ["empathy",0.9,"共情照顾"]
  ];
  configs.forEach(([k,w,label])=>{total+=sim(k,w,label);weight+=w;});
  const score=Math.round(total/weight);

  return {score,parts:parts.sort((x,y)=>y.score-x.score)};
}

function showCoupleResult(a,b){
  coupleResult.classList.remove("hidden");
  const c=compatibility(a,b);
  const level=c.score>=85?"高度匹配":c.score>=70?"比较匹配":c.score>=55?"可以磨合":"需要谨慎磨合";

  document.getElementById("coupleTitle").innerText=`${level}｜匹配度 ${c.score}`;
  document.getElementById("coupleSummary").innerText=`对方是「${a.types?.[0]?.name||"未知类型"}」，你是「${b.types?.[0]?.name||"未知类型"}」。这个分数不是判断谁好谁坏，而是分析你们在亲密节奏、边界、沟通、现实规划上的结构是否容易配合。`;

  drawCoupleRadar("coupleRadar",a.scores,b.scores);
  renderCoupleScores(c);
  renderCoupleAnalysis(a,b,c);

  latestCoupleText=`我们的恋爱人格匹配结果：${level}，匹配度 ${c.score}\n对方：${a.types?.[0]?.name||""}\n我：${b.types?.[0]?.name||""}`;
  document.getElementById("copyCoupleBtn").onclick=()=>copyText(latestCoupleText,"已复制匹配结果");
}

function renderCoupleScores(c){
  const box=document.getElementById("coupleScores");
  box.innerHTML="";
  c.parts.forEach(p=>{
    const div=document.createElement("div");
    div.className="item";
    div.innerHTML=`<strong>${p.label}：${p.score}</strong><div class="mini">对方 ${p.a}｜我 ${p.b}｜差异值 ${p.diff}</div><div class="scorebar"><div style="width:${p.score}%"></div></div>`;
    box.appendChild(div);
  });
}

function topStrengths(s){
  return dims.map(([k,n])=>({k,n,v:s[k]})).sort((a,b)=>b.v-a.v).slice(0,3);
}
function lowPoints(s){
  return dims.map(([k,n])=>({k,n,v:s[k]})).sort((a,b)=>a.v-b.v).slice(0,2);
}

function renderCoupleAnalysis(a,b,c){
  ["coupleStrengths","coupleRisks","coupleAdvice"].forEach(id=>document.getElementById(id).innerHTML="");

  const aTop=topStrengths(a.scores).map(x=>`${x.n}${x.v}`).join("、");
  const bTop=topStrengths(b.scores).map(x=>`${x.n}${x.v}`).join("、");
  addItem("coupleStrengths",`对方优势维度：${aTop}。`);
  addItem("coupleStrengths",`你的优势维度：${bTop}。`);

  const close=c.parts.filter(p=>p.score>=80).slice(0,3);
  if(close.length){
    close.forEach(p=>addItem("coupleStrengths",`共同优势：你们在「${p.label}」上比较接近，关系中更容易形成共同节奏。`,"good"));
  }

  const far=c.parts.filter(p=>p.score<65).slice(0,3);
  if(far.length){
    far.forEach(p=>addItem("coupleRisks",`差异点：「${p.label}」差异明显。对方 ${p.a}，你 ${p.b}，容易成为相处摩擦点。`,"warn"));
  }else{
    addItem("coupleRisks","目前没有特别突出的结构性差异，后续重点观察真实相处中的一致性。","good");
  }

  const aLow=lowPoints(a.scores).map(x=>`${x.n}${x.v}`).join("、");
  const bLow=lowPoints(b.scores).map(x=>`${x.n}${x.v}`).join("、");
  addItem("coupleRisks",`对方相对短板：${aLow}。`);
  addItem("coupleRisks",`你的相对短板：${bLow}。`);

  const s1=a.scores,s2=b.scores;
  if(Math.abs(s1.intimacy-s2.intimacy)>=25)addItem("coupleAdvice","建议提前沟通联系频率、见面频率和表达爱意的方式。一个人觉得正常，另一个人可能会觉得冷淡。");
  if(Math.abs(s1.boundary-s2.boundary)>=25)addItem("coupleAdvice","建议明确边界：社交、手机隐私、个人时间、异性朋友等问题不要靠猜。");
  if(Math.abs(s1.reality-s2.reality)>=25)addItem("coupleAdvice","建议尽早谈现实问题：城市、职业、金钱观、婚育节奏。越晚谈，成本越高。");
  if(Math.abs(s1.communication-s2.communication)>=25)addItem("coupleAdvice","建议约定冲突处理方式：能不能当天沟通、是否接受冷静期、如何修复关系。");
  if(Math.abs(s1.security-s2.security)>=25)addItem("coupleAdvice","建议关注安全感差异：一方可能需要更多确认，另一方可能觉得压力，需要找到双方都舒服的表达方式。");
  if(document.getElementById("coupleAdvice").innerHTML==="")addItem("coupleAdvice","你们的整体结构比较平衡，建议继续观察真实互动：是否守约、是否愿意沟通、是否能互相照顾。");
}

function drawRadar(canvasId,s){
  const c=document.getElementById(canvasId),ctx=c.getContext("2d");
  const w=c.width,h=c.height,cx=w/2,cy=h/2,R=145;
  ctx.clearRect(0,0,w,h);
  const labels=dims.map(d=>d[1]),vals=dims.map(d=>s[d[0]]),n=labels.length;

  ctx.strokeStyle="#ddd";ctx.fillStyle="#666";ctx.font="13px sans-serif";
  for(let ring=1;ring<=4;ring++){
    ctx.beginPath();
    for(let i=0;i<n;i++){
      const a=-Math.PI/2+i*2*Math.PI/n,r=R*ring/4,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.closePath();ctx.stroke();
  }
  for(let i=0;i<n;i++){
    const a=-Math.PI/2+i*2*Math.PI/n;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();
    const lx=cx+Math.cos(a)*(R+34),ly=cy+Math.sin(a)*(R+34);
    ctx.fillText(labels[i],lx-28,ly+4);
  }
  ctx.beginPath();
  vals.forEach((v,i)=>{
    const a=-Math.PI/2+i*2*Math.PI/n,r=R*v/100,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  });
  ctx.closePath();ctx.fillStyle="rgba(0,0,0,.14)";ctx.fill();ctx.strokeStyle="#111";ctx.lineWidth=2;ctx.stroke();
}

function drawCoupleRadar(canvasId,s1,s2){
  drawRadarBase(canvasId);
  drawRadarShape(canvasId,s1,"rgba(0,0,0,.16)","#111");
  drawRadarShape(canvasId,s2,"rgba(177,0,62,.16)","#b1003e");
}

function drawRadarBase(canvasId){
  const c=document.getElementById(canvasId),ctx=c.getContext("2d");
  const w=c.width,h=c.height,cx=w/2,cy=h/2,R=145,n=dims.length;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle="#ddd";ctx.fillStyle="#666";ctx.font="13px sans-serif";
  for(let ring=1;ring<=4;ring++){
    ctx.beginPath();
    for(let i=0;i<n;i++){
      const a=-Math.PI/2+i*2*Math.PI/n,r=R*ring/4,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.closePath();ctx.stroke();
  }
  for(let i=0;i<n;i++){
    const a=-Math.PI/2+i*2*Math.PI/n;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();
    const lx=cx+Math.cos(a)*(R+34),ly=cy+Math.sin(a)*(R+34);
    ctx.fillText(dims[i][1],lx-28,ly+4);
  }
  ctx.fillStyle="#111";ctx.fillText("对方",20,25);
  ctx.fillStyle="#b1003e";ctx.fillText("我",20,45);
}

function drawRadarShape(canvasId,s,fill,stroke){
  const c=document.getElementById(canvasId),ctx=c.getContext("2d");
  const w=c.width,h=c.height,cx=w/2,cy=h/2,R=145,n=dims.length;
  const vals=dims.map(d=>s[d[0]]);
  ctx.beginPath();
  vals.forEach((v,i)=>{
    const a=-Math.PI/2+i*2*Math.PI/n,r=R*v/100,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  });
  ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();
}

async function saveCardImage(cardId,filename,title,text){
  const btn=event?.target;
  const old=btn?.innerText;
  try{
    if(btn)btn.innerText="正在生成图片...";
    const card=document.getElementById(cardId);
    const canvas=await html2canvas(card,{scale:2,backgroundColor:"#ffffff",useCORS:true});
    const image=canvas.toDataURL("image/png");

    if(navigator.share && navigator.canShare){
      const blob=await (await fetch(image)).blob();
      const file=new File([blob],filename,{type:"image/png"});
      if(navigator.canShare({files:[file]})){
        await navigator.share({title,text,files:[file]});
        if(btn)btn.innerText=old;
        return;
      }
    }

    const link=document.createElement("a");
    link.href=image;
    link.download=filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if(btn)btn.innerText=old;
  }catch(err){
    console.error(err);
    alert("生成图片失败，请稍后再试");
    if(btn)btn.innerText=old;
  }
}

document.getElementById("saveImageBtn").onclick=()=>saveCardImage("shareCard","love-personality-result.png","我的恋爱人格测试结果","测测你在恋爱里是什么样的人");
document.getElementById("saveCoupleImageBtn").onclick=()=>saveCardImage("coupleShareCard","love-couple-match-result.png","我们的恋爱人格匹配结果","双人恋爱人格匹配报告");
