import{i as e,t}from"./app-shell-BpaO_bSO.js";import{d as n,g as r,l as i,o as a,r as o,u as s,v as c,x as l}from"./index-BKXA6G1x.js";import{n as u,r as d}from"./badge-X50nQsIY.js";import{t as f}from"./download-BQw4hGOk.js";import{r as p,t as m}from"./readiness-DpinMHpk.js";import{t as h}from"./job-match-panel-37Ww4aH6.js";import{t as g}from"./evidence-viewer-CkDb-JLp.js";import{t as _}from"./printer-Cyl8QfRI.js";import{t as v}from"./button-o6J326Dd.js";import{c as y,n as b,r as x,t as S}from"./impact-BtoBHW8J.js";import{n as C,t as w}from"./passport-document-uAOwiO6d.js";import{t as T}from"./pipeline-state-Hzn30EdO.js";var E=d(`file-braces`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1`,key:`1oajmo`}],[`path`,{d:`M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1`,key:`mpwhp6`}]]),D=d(`share-2`,[[`circle`,{cx:`18`,cy:`5`,r:`3`,key:`gq8acd`}],[`circle`,{cx:`6`,cy:`12`,r:`3`,key:`w7nqdw`}],[`circle`,{cx:`18`,cy:`19`,r:`3`,key:`1xt0gg`}],[`line`,{x1:`8.59`,x2:`15.42`,y1:`13.51`,y2:`17.49`,key:`47mynk`}],[`line`,{x1:`15.41`,x2:`8.59`,y1:`6.51`,y2:`10.49`,key:`1n3mei`}]]),O=l(c());function k(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function A(e){return[e.page?`หน้า ${e.page}`:null,e.paragraph?`ย่อหน้า ${e.paragraph}`:null,e.commit?`commit ${e.commit}`:null,e.filePath??null,e.section??null].filter(Boolean).join(` · `)}function j({candidate:e,skills:t,publicUrl:n,readiness:r}){let i=t.filter(e=>e.verified),a=t.reduce((e,t)=>e+t.evidence.length,0),o=new Date().toLocaleString(`th-TH`),s=i.map(e=>`
      <section class="skill">
        <div class="skill-head">
          <h3>${k(e.name)}</h3>
          <span class="chip">${k(e.level)}</span>
          <span class="chip">ความเชื่อมั่น ${Math.round(e.confidence*100)}%</span>
          <span class="chip ok">ยืนยันแล้ว</span>
        </div>
        <p class="muted">${k(e.description)}</p>
        ${e.evidence.map(e=>`
          <div class="evidence">
            <p class="src">${k(e.sourceName)} <span class="muted">${k(A(e))}</span></p>
            <blockquote><mark>${k(e.quote)}</mark></blockquote>
            <p class="muted small">เหตุผลของ AI: ${k(e.reasoning)}</p>
          </div>`).join(``)}
      </section>`).join(``),c=r?`<section class="block">
        <h2>คะแนนความพร้อมทำงาน (อธิบายได้)</h2>
        <p class="score">${r.total}<span class="muted">/100</span></p>
        <table>
          <thead><tr><th>องค์ประกอบ</th><th>น้ำหนัก</th><th>คะแนน</th><th>เหตุผลจากหลักฐาน</th></tr></thead>
          <tbody>
            ${r.components.map(e=>`<tr>
                  <td>${k(e.labelTh)}</td>
                  <td>${Math.round(e.weight*100)}%</td>
                  <td>${e.score}</td>
                  <td class="small">${k(e.reason)}</td>
                </tr>`).join(``)}
          </tbody>
        </table>
      </section>`:``;return`<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8" />
<title>Skill Passport ${k(e.passportNumber)}</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: "Noto Sans Thai", "Sarabun", "IBM Plex Sans Thai", system-ui, -apple-system, "Segoe UI", sans-serif; color: #312e2b; margin: 0; line-height: 1.55; }
  h1 { font-size: 22px; margin: 0; }
  h2 { font-size: 15px; margin: 0 0 8px; letter-spacing: .01em; }
  h3 { font-size: 14px; margin: 0; }
  header { border-bottom: 2px solid #c96442; padding-bottom: 12px; margin-bottom: 16px; }
  .eyebrow { text-transform: uppercase; letter-spacing: .14em; font-size: 9px; color: #8a827b; margin: 0 0 6px; }
  .muted { color: #6f6862; }
  .small { font-size: 11px; }
  .meta { display: flex; flex-wrap: wrap; gap: 14px; font-size: 11px; margin-top: 10px; }
  .meta div { border: 1px solid #e6e0d8; border-radius: 6px; padding: 6px 10px; }
  .block { border: 1px solid #e6e0d8; border-radius: 8px; padding: 12px 14px; margin-bottom: 14px; page-break-inside: avoid; }
  .score { font-size: 30px; font-weight: 700; margin: 4px 0 10px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { text-align: left; border-bottom: 1px solid #ece6de; padding: 5px 6px; vertical-align: top; }
  .skill { border: 1px solid #e6e0d8; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px; page-break-inside: avoid; }
  .skill-head { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 4px; }
  .chip { font-size: 10px; border: 1px solid #ded7cd; border-radius: 999px; padding: 2px 8px; color: #6f6862; }
  .chip.ok { border-color: #7d9a72; color: #4f6a46; }
  .evidence { margin-top: 8px; border-left: 3px solid #c96442; padding-left: 10px; }
  .src { font-size: 11px; font-weight: 600; margin: 0 0 4px; }
  blockquote { margin: 0 0 4px; font-size: 12px; }
  mark { background: #f6e2bc; padding: 1px 2px; }
  ul { margin: 6px 0 0; padding-left: 18px; font-size: 11px; }
  footer { margin-top: 18px; border-top: 1px solid #e6e0d8; padding-top: 10px; font-size: 10px; color: #6f6862; }
</style>
</head>
<body>
  <header>
    <p class="eyebrow">SkillLens AI · หนังสือเดินทางทักษะดิจิทัล</p>
    <h1>${k(e.name)}</h1>
    <p class="muted small">${k(e.headline)}</p>
    <div class="meta">
      <div><strong>เลขที่พาสปอร์ต</strong><br />${k(e.passportNumber)}</div>
      <div><strong>สถานะการยืนยัน</strong><br />${k(e.verificationStatus)}</div>
      <div><strong>ความพร้อมทำงาน</strong><br />${e.workReadiness}%</div>
      <div><strong>ทักษะที่ยืนยันแล้ว</strong><br />${i.length} รายการ · หลักฐาน ${a} ชิ้น</div>
      <div><strong>ออกเอกสารเมื่อ</strong><br />${k(o)}</div>
      <div><strong>ลิงก์ตรวจสอบ</strong><br />${k(n)}</div>
    </div>
  </header>

  ${c}

  <section class="block">
    <h2>แผงป้องกันอคติ (Anti-Bias)</h2>
    <p class="small muted">ระบบตรวจพบข้อมูลที่อาจก่อให้เกิดอคติ ${x.length} รายการ และตัดออกก่อนคำนวณคะแนนทุกครั้ง</p>
    <table>
      <thead><tr><th>ฟิลด์ที่พบ</th><th>พบใน</th><th>การจัดการ</th></tr></thead>
      <tbody>
        ${x.map(e=>`<tr><td>${k(e.field)}</td><td class="small">${k(e.detectedIn)}</td><td class="small">${k(e.action)}</td></tr>`).join(``)}
      </tbody>
    </table>
    <h3 style="margin-top:10px">ฟิลด์ที่ระบบห้ามใช้</h3>
    <ul>
      ${b.map(e=>`<li>${k(e.labelTh)} (${k(e.field)}) — ${k(e.reason)}</li>`).join(``)}
    </ul>
    <h3 style="margin-top:10px">สัญญาณที่ระบบใช้ได้</h3>
    <ul>${S.map(e=>`<li>${k(e)}</li>`).join(``)}</ul>
  </section>

  <h2 style="margin:16px 0 8px">ทักษะที่ยืนยันแล้ว พร้อมข้อความหลักฐานที่ถูกอ้างอิง</h2>
  ${s}

  <footer>
    เอกสารนี้ออกโดย SkillLens AI Registry · ทุกทักษะต้องมีหลักฐานประกอบ · ตรวจสอบความถูกต้องได้ที่ ${k(n)}
  </footer>
</body>
</html>`}function M(e){let t=j(e),n=document.createElement(`iframe`);n.setAttribute(`aria-hidden`,`true`),n.style.position=`fixed`,n.style.right=`0`,n.style.bottom=`0`,n.style.width=`0`,n.style.height=`0`,n.style.border=`0`,document.body.appendChild(n);let r=n.contentDocument;if(!r)return document.body.removeChild(n),!1;r.open(),r.write(t),r.close();let i=()=>{n.contentWindow?.focus(),n.contentWindow?.print(),window.setTimeout(()=>n.remove(),1500)};return n.contentWindow?.document.readyState===`complete`?window.setTimeout(i,120):n.onload=()=>window.setTimeout(i,120),!0}var N=r();function P(e){return[e.page?`page ${e.page}`:null,e.paragraph?`¶ ${e.paragraph}`:null,e.commit?`commit ${e.commit}`:null,e.filePath??null,e.section??null].filter(Boolean).join(` · `)}function F(){let r=o[0],[c,l]=(0,O.useState)(null),[d,b]=(0,O.useState)(null);(0,O.useEffect)(()=>{b(T())},[]);let x=d?.skills??i,S=d?.jobMatches??a,k=(0,O.useMemo)(()=>S.map(e=>({id:e.id,title:e.title,company:e.company,location:e.location,matchScore:e.matchScore,matching:e.matchingSkills,missing:e.missingSkills,rationale:e.rationale,advice:e.advice,justifications:e.matchingSkills.flatMap(e=>{let t=x.find(t=>t.name===e),n=t?.evidence[0];return!t||!n?[]:[{skill:t.name,quote:n.quote,source:n.sourceName,locator:P(n),confidence:n.confidence,evidence:n}]})})),[x,S]);function A(){let e={passportNumber:r.passportNumber,owner:r.name,verificationStatus:r.verificationStatus,workReadiness:r.workReadiness,issuedAt:new Date().toISOString(),skills:i.map(e=>({name:e.name,category:e.category,level:e.level,confidence:e.confidence,verified:e.verified,evidence:e.evidence.map(e=>({source:e.sourceName,page:e.page,commit:e.commit,quote:e.quote,confidence:e.confidence}))}))},t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),n=URL.createObjectURL(t),a=document.createElement(`a`);a.href=n,a.download=`${r.passportNumber}.json`,a.click(),URL.revokeObjectURL(n)}let j=`/p/${r.passportNumber}`,F=typeof window>`u`?j:`${window.location.origin}${j}`;return(0,N.jsxs)(t,{title:`Digital Skill Passport`,description:`รูปแบบทางการ พร้อม QR Code, สถานะการยืนยัน, สรุปหลักฐาน และลายมือชื่อดิจิทัล`,actions:(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(v,{size:`sm`,variant:`outline`,onClick:()=>M({candidate:r,skills:i,publicUrl:F,readiness:y[0].readiness}),children:[(0,N.jsx)(_,{className:`size-4`}),`ส่งออก PDF`]}),(0,N.jsxs)(v,{size:`sm`,variant:`outline`,onClick:A,children:[(0,N.jsx)(E,{className:`size-4`}),`JSON`]}),(0,N.jsx)(v,{asChild:!0,size:`sm`,variant:`outline`,children:(0,N.jsxs)(n,{to:`/reevaluate`,children:[(0,N.jsx)(e,{className:`size-4`}),`ขอประเมินใหม่`]})}),(0,N.jsxs)(v,{size:`sm`,onClick:()=>{navigator.clipboard?.writeText(F),s.success(`คัดลอกลิงก์สาธารณะแล้ว`,{description:F})},children:[(0,N.jsx)(D,{className:`size-4`}),`แชร์`]})]}),children:[(0,N.jsx)(w,{candidate:r,skills:i,publicUrl:F}),(0,N.jsx)(h,{matches:k,className:`mt-6`,title:`Job matching & ranking filters`,onOpenEvidence:(e,t)=>l({evidence:e,skillName:t})}),c?(0,N.jsx)(g,{evidence:c.evidence,skillName:c.skillName,onClose:()=>l(null),className:`mt-4`}):null,(0,N.jsx)(p,{breakdown:y[0].readiness,className:`mt-6`}),(0,N.jsx)(m,{className:`mt-4`}),(0,N.jsxs)(`div`,{className:`mt-6 grid gap-4 lg:grid-cols-2`,children:[(0,N.jsxs)(`section`,{className:`panel flex items-center gap-5 p-5`,children:[(0,N.jsx)(`div`,{className:`rounded-md bg-card p-3`,children:(0,N.jsx)(C,{value:F,size:104})}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h2`,{className:`font-display text-base font-semibold`,children:`QR → Public Passport`}),(0,N.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:`สแกนเพื่อเปิดหน้าสาธารณะที่แสดงเฉพาะทักษะที่ยืนยันแล้วและสรุปหลักฐาน`}),(0,N.jsx)(v,{asChild:!0,size:`sm`,variant:`outline`,className:`mt-3`,children:(0,N.jsx)(n,{to:`/p/$passportNumber`,params:{passportNumber:r.passportNumber},children:`เปิด Public Passport`})})]})]}),(0,N.jsxs)(`section`,{className:`panel p-5`,children:[(0,N.jsx)(`h2`,{className:`font-display text-base font-semibold`,children:`Export documents`}),(0,N.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:`เอกสารทางการสำหรับสมัครงานและการพิจารณาคัดเลือก`}),(0,N.jsx)(v,{asChild:!0,size:`sm`,className:`mt-3`,children:(0,N.jsxs)(n,{to:`/documents`,children:[(0,N.jsx)(f,{className:`size-4`}),`ไปที่ศูนย์เอกสาร`]})}),(0,N.jsxs)(`p`,{className:`mt-3 flex items-center gap-2 text-xs text-muted-foreground`,children:[(0,N.jsx)(u,{className:`size-3.5 text-success`}),`Resume (ATS) · Portfolio · Skill Passport · Verification Report · Candidate Report`]})]})]})]})}export{F as component};