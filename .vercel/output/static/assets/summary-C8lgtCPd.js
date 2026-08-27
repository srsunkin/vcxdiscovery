import{C as e,S as t,x as n,y as r}from"./app-shell-Cp8ydm8q.js";import{n as i}from"./routing-CqhCCuT9.js";import{t as a}from"./risk-DOHb1pA1.js";function o(e){return e.trim()?e.trim():`—`}function s(){if(!t.getState().hydrated)return``;let n=i(),r=a();return[`Customer: ${o(e(`customer`))} | Contact: ${o(e(`contact_name`))} | Date: ${o(e(`call_date`))}`,`Project: ${o(e(`project_name`))} | Stage: ${o(e(`stage`))} | Owner: ${o(e(`sales_owner`))}`,`Objective: ${o(e(`inspect_task`)||e(`disc_defects`))}`,`Pain / why now: ${o(e(`disc_pain`))}`,`Part / material: ${o(e(`part_desc`)||e(`disc_parts`))} | ${o(e(`materials`))} | Thickness: ${o(e(`wall_thickness`))} | Weight: ${o(e(`weight`))}`,`Defects / IQ: ${o(e(`inspect_task`))} | Detector: ${o(e(`detector_req`))} | Source: ${o(e(`xray_source`))}`,`Throughput: ${o(e(`rate_volume`)||e(`disc_volume`))} | Peak: ${o(e(`peak_avg`))}`,`Software/data: ${o(e(`software_req`))}`,`Site: ${o(e(`site_constraints`)||e(`disc_site`))} | Incoterms: ${o(e(`incoterms`))} | Budget: ${o(e(`budget_custom`))}`,`Suggested route: ${n?`${n.system.name} — ${n.reasons[0]??n.system.short}`:`—`}`,`Risks: ${r.items.filter(e=>e.level!==`ok`).slice(0,6).map(e=>e.text).join(`; `)||`No major risks detected`}`,`Next action: ${o(e(`roadmap1`))} | Owner: ${o(e(`next_action_owner`))} | Date: ${o(e(`next_action_date`))}`].join(`
`)}function c(){if(!t.getState().hydrated)return``;let i=r();return`INTERNAL HANDOFF

${s()}

Capture: ${i.filled}/${i.total} critical fields (${i.pct}%)

Required files:
- CAD/STP: ${n(`doc_cad`)?`Yes`:`No / not confirmed`}
- 2D drawings: ${n(`doc_2d`)?`Yes`:`No / not confirmed`}
- Technique: ${n(`doc_technique`)?`Yes`:`No / not confirmed`}
- Samples: ${n(`sample_yesfull`)||n(`sample_yespartial`)||e(`test_sample`)===`Full`||e(`test_sample`)===`Partial`?`Yes`:`No / not confirmed`}

Stakeholders:
- Budget owner: ${o(e(`stake_budget`))}
- Technical decision-maker: ${o(e(`stake_tech`))}
- Purchasing: ${o(e(`stake_purch`))}
- Operations/quality: ${o(e(`stake_ops`))}

Commercial timing:
- Budgetary quote: ${o(e(`budget_quote_deadline`))}
- Final quote: ${o(e(`final_quote_deadline`))}
- Target install: ${o(e(`target_install`))}
- Expected order: ${o(e(`expected_order`))}

Risks / mitigation:
${a().items.map(e=>`- ${e.text}`).join(`
`)}
${e(`risk_mitigation`)?`\nMitigation notes: ${e(`risk_mitigation`)}`:``}`}function l(){let n=r();if(!t.getState().hydrated)return{progress:`0% complete (0/${n.total})`,pct:0,missing:`—`,route:`—`,routeReason:``,risk:`Low`,next:`—`};let o=i(),s=a(),c=[e(`roadmap1`),e(`next_action_owner`),e(`next_action_date`)].filter(Boolean).join(` · `);return{progress:`${n.pct}% complete (${n.filled}/${n.total})`,pct:n.pct,missing:n.missing.slice(0,8).map(e=>e.label).join(`, `)+(n.missing.length>8?`…`:``)||`None`,route:o?.system.name??`—`,routeReason:o?.reasons[0]??``,risk:s.level,next:c||`—`}}export{s as n,l as r,c as t};