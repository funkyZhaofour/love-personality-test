const dims=[["intimacy","亲密需求"],["security","依恋安全感"],["boundary","独立边界"],["emotion","情绪稳定"],["communication","沟通能力"],["commitment","责任承诺"],["empathy","共情能力"],["reality","现实规划"]];
let idx=0;let answers=[];
let latestResultText="";
const home=document.getElementById("home"),quiz=document.getElementById("quiz"),result=document.getElementById("result");
document.getElementById("startBtn").onclick=()=>{home.classList.add("hidden");quiz.classList.remove("hidden");render()};
document.getElementById("prevBtn").onclick=()=>{if(idx>0){idx--;answers.pop();render()}};
document.getElementById("restartBtn").onclick=()=>location.reload();

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
  result.classList.remove("hidden");
  const s=calcScores();
  const types=archetypes(s);
  const main=types[0],sub=types[1];

  document.getElementById("typeTitle").innerText=`${main.name} + ${sub.name}`;
  document.getElementById("oneLine").innerText=main.line;
  document.getElementById("typeDesc").innerText=`你的主类型是「${main.name}」，辅类型是「${sub.name}」。${main.desc} 同时，你也带有「${sub.name}」的特征：${sub.desc}`;

  drawRadar(s);
  renderScores(s);
  renderAnalysis(s);

  latestResultText=`我的恋爱人格测试结果：${main.name} + ${sub.name}\n${main.line}\n八维得分：`+dims.map(([k,n])=>`${n}${s[k]}`).join("，");

  document.getElementById("copyBtn").onclick=async()=>{
    try{
      await navigator.clipboard.writeText(latestResultText);
      alert("已复制结果");
    }catch(e){
      alert(latestResultText);
    }
  };
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

function addItem(id,text){
  const div=document.createElement("div");
  div.className="item";
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

function drawRadar(s){
  const c=document.getElementById("radar"),ctx=c.getContext("2d");
  const w=c.width,h=c.height,cx=w/2,cy=h/2,R=145;
  ctx.clearRect(0,0,w,h);
  const labels=dims.map(d=>d[1]),vals=dims.map(d=>s[d[0]]),n=labels.length;

  ctx.strokeStyle="#ddd";
  ctx.fillStyle="#666";
  ctx.font="13px sans-serif";

  for(let ring=1;ring<=4;ring++){
    ctx.beginPath();
    for(let i=0;i<n;i++){
      const a=-Math.PI/2+i*2*Math.PI/n,r=R*ring/4,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  for(let i=0;i<n;i++){
    const a=-Math.PI/2+i*2*Math.PI/n;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);
    ctx.stroke();
    const lx=cx+Math.cos(a)*(R+34),ly=cy+Math.sin(a)*(R+34);
    ctx.fillText(labels[i],lx-28,ly+4);
  }

  ctx.beginPath();
  vals.forEach((v,i)=>{
    const a=-Math.PI/2+i*2*Math.PI/n,r=R*v/100,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  });
  ctx.closePath();
  ctx.fillStyle="rgba(0,0,0,.14)";
  ctx.fill();
  ctx.strokeStyle="#111";
  ctx.lineWidth=2;
  ctx.stroke();
}

document.getElementById("saveImageBtn").onclick=async()=>{
  const btn=document.getElementById("saveImageBtn");
  const shareCard=document.getElementById("shareCard");
  try{
    btn.innerText="正在生成图片...";
    const canvas=await html2canvas(shareCard,{
      scale:2,
      backgroundColor:"#ffffff",
      useCORS:true
    });

    const image=canvas.toDataURL("image/png");

    if(navigator.share && navigator.canShare){
      const blob=await (await fetch(image)).blob();
      const file=new File([blob],"love-personality-result.png",{type:"image/png"});
      if(navigator.canShare({files:[file]})){
        await navigator.share({
          title:"我的恋爱人格测试结果",
          text:"测测你在恋爱里是什么样的人",
          files:[file]
        });
        btn.innerText="生成分享图片";
        return;
      }
    }

    const link=document.createElement("a");
    link.href=image;
    link.download="love-personality-result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    btn.innerText="生成分享图片";
  }catch(err){
    console.error(err);
    alert("生成图片失败，请稍后再试");
    btn.innerText="生成分享图片";
  }
};
