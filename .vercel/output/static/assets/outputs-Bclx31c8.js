import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{Bt as t,C as n,D as r,E as i,F as a,O as o,P as s,S as c,at as l,h as u,n as d,y as f}from"./app-shell-Cp8ydm8q.js";import{a as p,i as m,n as h,o as g,r as _,s as v}from"./index-C9LKr7_p.js";import{t as y}from"./textarea-CZqHZe2t.js";import{n as b,t as x}from"./card-D86gG5bp.js";import{n as S}from"./routing-CqhCCuT9.js";import{t as C}from"./summary-C8lgtCPd.js";function w(e){if(Array.isArray(e))return e.flatMap(e=>w(e));if(typeof e!=`string`)return[];let t=[],n=0,r,i,a,o,s,c=()=>{for(;n<e.length&&/\s/.test(e.charAt(n));)n+=1;return n<e.length},l=()=>(i=e.charAt(n),i!==`=`&&i!==`;`&&i!==`,`);for(;n<e.length;){for(r=n,s=!1;c();)if(i=e.charAt(n),i===`,`){for(a=n,n+=1,c(),o=n;n<e.length&&l();)n+=1;n<e.length&&e.charAt(n)===`=`?(s=!0,n=o,t.push(e.slice(r,a)),r=n):n=a+1}else n+=1;(!s||n>=e.length)&&t.push(e.slice(r))}return t}function T(e){return e instanceof Headers?e:Array.isArray(e)||typeof e==`object`?new Headers(e):null}function E(...e){return e.reduce((e,t)=>{let n=T(t);if(!n)return e;for(let[t,r]of n.entries())t===`set-cookie`?w(r).forEach(t=>e.append(`set-cookie`,t)):e.set(t,r);return e},new Headers)}var D=e(t());function O(e,t){return e.trim()?e.trim():t}function k(){return r(o(),n(`sales_owner`))}function A(){return i(o())}function j(){let e=A();return`${k()}\n${e}`}function M(){return S()?.system.name??`[direction]`}function N(){let e=f().missing.map(e=>`• ${e.label}`);return e.length?e.join(`
`):`• No obvious missing critical fields.`}var P=[{key:`intro`,label:`Pre-call intro`},{key:`followup`,label:`Follow-up`},{key:`missing`,label:`Missing inputs`},{key:`sample`,label:`Sample / study`},{key:`quote`,label:`Quote next steps`},{key:`procurement`,label:`Procurement`},{key:`proposal`,label:`Proposal cover`},{key:`cadence`,label:`Check-in`},{key:`breakup`,label:`Close the loop`}];function F(e){let t=O(n(`contact_name`),`[Name]`),r=O(n(`customer`),`[Company]`),i=O(n(`project_name`),`the X-ray / CT inspection project`),a=O(n(`disc_pain`),`[pain point]`),o=O(n(`part_desc`)||n(`disc_parts`),`[part / geometry]`),s=O(n(`materials`),`[material]`),c=O(n(`wall_thickness`),`[thickness]`),l=O(n(`inspect_task`)||n(`disc_defects`),`[inspection objective]`),u=O(n(`rate_volume`)||n(`disc_volume`),`[volume / cycle time]`),d=O(n(`roadmap1`),`[recommended next step]`),f=n(`call_date`)||`[scheduled date]`;switch(A(),e){case`intro`:return`Subject: Ahead of our call — X-ray / CT discovery

Hi ${t},

Looking forward to speaking on ${f}. I work with industrial X-ray and CT inspection — helping manufacturers in aerospace, additive, casting, defense, and advanced manufacturing find what other methods miss.

A few things that would help me prepare:

1. What parts are you looking to inspect, and what's the critical defect or measurement objective?
2. Are you working from a specific standard or customer quality requirement (Nadcap, ASTM, ISO, customer spec)?
3. What does your current inspection process look like today — film, legacy DR, outsourced CT, or something else?
4. Is this for a new capability, a capacity upgrade, or replacing existing equipment?

A sentence or two on each is plenty. It means I show up with the right reference material.

Best,
${j()}`;case`followup`:return`Subject: Follow-up — ${r} X-ray inspection discovery

Hi ${t},

Thank you for the time today. My understanding of the project is:

• Primary challenge: ${a}
• Parts/materials: ${o}; ${s}; thickness ${c}
• Inspection objective: ${l}
• Production need: ${u}
• Potential direction: ${M()}

The most useful next inputs are CAD/STP files, 2D drawings, acceptance criteria, current technique sheets or example images, and representative sample parts if available.

Recommended next step: ${d}

Best,
${j()}`;case`missing`:return`Subject: Missing inputs for X-ray / CT application review

Hi ${t},

To move ${i} forward accurately, could you please help us gather the following?

${N()}

The highest-value items are usually CAD/STP, 2D drawings, acceptance criteria, technique sheets/images, and representative samples.

Best,
${j()}`;case`sample`:return`Subject: Application study / sample scan inputs — ${r}

Hi ${t},

Based on the target inspection objective (${l}), an application study or sample scan would help confirm the right configuration before quoting.

Useful sample package:
• Representative production part(s)
• Known-good and known-bad samples if available
• CAD/STP and 2D drawing(s)
• Acceptance criteria / inspection procedure
• Any current film, CR, DDA, or CT images
• Desired detection target: ${O(n(`detector_req`),`[minimum feature size]`)}

Best,
${j()}`;case`quote`:return`Subject: Quote next steps — ${r} ${i}

Hi ${t},

Based on what we captured, we are aligning the proposed direction around ${M()}.

Before issuing or finalizing the quote, the main items to confirm are:

${N()}

Commercial timing captured so far:
• Budgetary quote deadline: ${O(n(`budget_quote_deadline`),`[date]`)}
• Final quote deadline: ${O(n(`final_quote_deadline`),`[date]`)}
• Target install: ${O(n(`target_install`),`[date]`)}
• Incoterms: ${O(n(`incoterms`),`[FCA / DAP / DDP]`)}

Best,
${j()}`;case`procurement`:return`Subject: Commercial clarification — Incoterms, payment, and project schedule

Hi ${t},

To align our proposal with your purchasing process, could you please confirm:

• Quoting entity / ordering entity
• Preferred Incoterms: ${O(n(`incoterms`),`[FCA / DAP / DDP]`)}
• Required payment terms or milestone structure
• Vendor setup requirements
• Required quote validity
• Any import, tariff, insurance, or delivery requirements
• Target PO date and required delivery / installation schedule

Best,
${j()}`;case`proposal`:return`Subject: Proposal — ${r} X-ray inspection project

Hi ${t},

Thank you for the opportunity to support ${r}. Based on the information captured so far, I am preparing / sending the proposal around:

• Application: ${o}
• Material / thickness: ${s}; ${c}
• Inspection objective: ${l}
• Throughput / workflow: ${u}
• Proposed direction: ${M()}
• Target timing: ${O(n(`target_install`)||n(`expected_order`),`[timing]`)}

After you have had a chance to review, I recommend a short technical/commercial review to confirm configuration, responsibilities, timeline, and any open exceptions.

Best,
${j()}`;case`cadence`:return`Subject: Checking in — ${r}

Hi ${t},

I wanted to check in on ${i} and see if your team has had a chance to review what we discussed.

• Primary driver: ${a}
• Application: ${o}
• Inspection need: ${l}
• Current next step: ${d}

Would it be useful to reconnect for 15–20 minutes on open technical questions, missing inputs, or quote timing?

Best,
${j()}`;case`breakup`:return`Subject: Should I close the loop for now? — ${r}

Hi ${t},

I wanted to close the loop on ${i}. My last understanding was that your team was evaluating ${M()} for ${o}, with the key driver being ${a}.

If this is still active, I am happy to help with the next step — sample scan, technical review, budgetary quote, or proposal clarification.

If priorities have shifted, no problem at all; I can pause follow-up and reconnect when the project becomes active again.

Best,
${j()}`}}function I(e){return e!==`__proto__`&&e!==`constructor`&&e!==`prototype`}function L(e,t){let n=Object.create(null);if(e)for(let t of Object.keys(e))I(t)&&(n[t]=e[t]);if(t&&typeof t==`object`)for(let e of Object.keys(t))I(e)&&(n[e]=t[e]);return n}function R(e){if(!e)return Object.create(null);let t=Object.create(null);for(let n of Object.keys(e))I(n)&&(t[n]=e[n]);return t}var z=()=>{throw Error(`createServerOnlyFn() functions can only be called on the server!`)},B=(e,t)=>{let n=t||e||{};n.method===void 0&&(n.method=`GET`);let r=e=>B(void 0,{...n,validator:e,inputValidator:e});return Object.assign(e=>B(void 0,{...n,...e}),{options:n,middleware:e=>{let t=[...n.middleware||[]];e.map(e=>{v in e?e.options.middleware&&t.push(...e.options.middleware):t.push(e)});let r=B(void 0,{...n,middleware:t});return r[v]=!0,r},validator:r,inputValidator:r,handler:(...e)=>{let[t,r]=e,i={...n,extractedFn:t,serverFn:r},a=[...i.middleware||[],W(i)];return t.method=n.method,Object.assign(async e=>{let n=await V(a,`client`,{...t,...i,data:e?.data,headers:e?.headers,signal:e?.signal,fetch:e?.fetch,context:R()}),r=p(n.error);if(r)throw r;if(n.error)throw n.error;return n.result},{...t,method:n.method,__executeServer:async e=>{let n=z(),r=n.contextAfterGlobalMiddlewares;return await V(a,`server`,{...t,...e,serverFnMeta:t.serverFnMeta,context:L(e.context,r),request:n.request}).then(e=>({result:e.result,error:e.error,context:e.sendContext}))}})}})};async function V(e,t,n){let r=H([...g()?.functionMiddleware||[],...e]);if(t===`server`){let e=z({throwIfNotFound:!1});e?.executedRequestMiddlewares&&(r=r.filter(t=>!e.executedRequestMiddlewares.has(t)))}let i=async e=>{let n=r.shift();if(!n)return e;try{let r=`validator`in n.options?n.options.validator:void 0;!r&&`inputValidator`in n.options&&(r=n.options.inputValidator),r&&t===`server`&&(e.data=await U(r,e.data));let a;if(t===`client`?`client`in n.options&&(a=n.options.client):`server`in n.options&&(a=n.options.server),a){let t=async(t={})=>{let n=await i({...e,...t,context:L(e.context,t.context),sendContext:L(e.sendContext,t.sendContext),headers:E(e.headers,t.headers),_callSiteFetch:e._callSiteFetch,fetch:e._callSiteFetch??t.fetch??e.fetch,result:t.result===void 0?t instanceof Response?t:e.result:t.result,error:t.error??e.error});if(n.error)throw n.error;return n},n=await a({...e,next:t});if(m(n))return{...e,error:n};if(n instanceof Response)return{...e,result:n};if(!n)throw Error(`User middleware returned undefined. You must call next() or return a result in your middlewares.`);return n}return i(e)}catch(t){return{...e,error:t}}};return i({...n,headers:n.headers||{},sendContext:n.sendContext||{},context:n.context||R(),_callSiteFetch:n.fetch})}function H(e,t=100){let n=new Set,r=[],i=(e,a)=>{if(a>t)throw Error(`Middleware nesting depth exceeded maximum of ${t}. Check for circular references.`);e.forEach(e=>{e.options.middleware&&i(e.options.middleware,a+1),n.has(e)||(n.add(e),r.push(e))})};return i(e,0),r}async function U(e,t){if(e==null)return{};if(`~standard`in e){let n=await e[`~standard`].validate(t);if(n.issues)throw Error(JSON.stringify(n.issues,void 0,2));return n.value}if(`parse`in e)return e.parse(t);if(typeof e==`function`)return e(t);throw Error(`Invalid validator type!`)}function W(e){return{"~types":void 0,options:{inputValidator:e.validator??e.inputValidator,client:async({next:t,sendContext:n,fetch:r,...i})=>{let a={...i,context:n,fetch:r};return t(await e.extractedFn?.(a))},server:async({next:t,...n})=>{let r=await e.serverFn?.(n);return t({...n,result:r})}}}}var G=B({method:`POST`}).handler(_(`68dd462549e8c2e4da03ad33191368701999b91fb87b5dde3567a1f558028f87`)),K=l();function q(){c(e=>e.deals);let[e,t]=(0,D.useState)(`handoff`),[n,r]=(0,D.useState)(``),[i,o]=(0,D.useState)(!1),s=e===`handoff`?C():e===`ai`?n:F(e),l=async e=>{o(!0),t(`ai`);let n=await G({data:{mode:e,summary:C()}});if(o(!1),!n.ok){h.error(n.error),r(n.error);return}r(n.text)};return(0,K.jsxs)(`div`,{children:[(0,K.jsx)(d,{kicker:`Handoff`,title:`Briefs and emails`,description:`Generated from the live capture. Copy, then send. Optional Grok polish is on-demand — it never runs by itself.`,actions:(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(u,{variant:`secondary`,onClick:()=>{a(s).then(()=>h.success(`Copied`))},children:`Copy`}),(0,K.jsx)(u,{variant:`outline`,disabled:i,onClick:()=>void l(`brief`),children:`Polish brief`}),(0,K.jsx)(u,{variant:`outline`,disabled:i,onClick:()=>void l(`questions`),children:`Suggest questions`})]})}),(0,K.jsxs)(`div`,{className:`mb-4 flex flex-wrap gap-1.5`,children:[(0,K.jsx)(J,{on:e===`handoff`,onClick:()=>t(`handoff`),label:`Internal handoff`}),P.map(n=>(0,K.jsx)(J,{on:e===n.key,onClick:()=>t(n.key),label:n.label},n.key)),n?(0,K.jsx)(J,{on:e===`ai`,onClick:()=>t(`ai`),label:`Grok output`}):null]}),(0,K.jsx)(x,{children:(0,K.jsxs)(b,{className:`pt-5`,children:[(0,K.jsx)(`p`,{className:`mb-2 text-xs text-subtle`,children:e===`handoff`?`Internal only — not customer-safe.`:e===`ai`?i?`Working…`:`Review before you send. Grok does not invent specs that are not in the capture — still check.`:`Customer-facing. Tokens filled from the active deal.`}),(0,K.jsx)(y,{readOnly:!0,value:i&&e===`ai`?`Working…`:s,className:`min-h-[420px] font-mono text-[12.5px] leading-relaxed`})]})}),(0,K.jsx)(`p`,{className:`mt-3 text-xs text-subtle`,children:`Also available: copy the live snapshot from Command, or export JSON from Deals.`})]})}function J({on:e,onClick:t,label:n}){return(0,K.jsx)(`button`,{type:`button`,onClick:t,className:s(`rounded-full border px-3 py-1.5 text-xs`,e?`border-accent bg-accent text-accent-fg`:`border-border bg-surface text-muted hover:text-fg`),children:n})}export{q as component};