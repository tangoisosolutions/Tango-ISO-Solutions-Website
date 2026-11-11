function showPage(name){
 document.querySelectorAll('.page-view').forEach(p=>p.classList.remove('active'));
 const target=document.getElementById('page-'+name); if(target) target.classList.add('active');
 document.querySelectorAll('#singleLinks a').forEach(a=>a.classList.toggle('active',a.dataset.page===name));
 window.scrollTo({top:0,behavior:'smooth'});document.getElementById('singleLinks').classList.remove('open');
}

const modal=document.getElementById('docModal');
function openModal(std){if(typeof std==='string'){const sel=document.getElementById('standard');if(sel)sel.value=std}modal.classList.add('open');document.body.style.overflow='hidden'}
function mailTo(subject,lines){return fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:'5ec7c8c4-0921-4335-a950-3717f4875b64',subject:'Tango Website: '+subject,from_name:'Tango ISO Solutions Website',message:lines.join('\n')})}).then(r=>r.json()).then(d=>{if(!d.success)throw 0;return true}).catch(()=>{location.href='mailto:tangoisosolutions@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));return false})}
function sendContact(e){e.preventDefault();const f=e.target,m=document.getElementById('contactMsg'),v=[...f.querySelectorAll('input,select,textarea')].map(x=>x.value);m.style.display='block';m.textContent='Sending…';mailTo('Enquiry - '+v[3],['Name: '+v[0],'Email: '+v[1],'Company: '+v[2],'Requirement: '+v[3],'','Message:',v[4]]).then(ok=>{m.textContent=ok?'Thank you! Your enquiry has been sent. We will get back to you soon.':'We could not send it directly, so your email app should open instead.';if(ok)f.reset()});return false}
function closeModal(){modal.classList.remove('open');document.body.style.overflow=''}
function toggleMenu(){document.getElementById('singleLinks').classList.toggle('open')}
function notify(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4200)}
document.getElementById('docForm').addEventListener('submit',e=>{e.preventDefault();const g=id=>document.getElementById(id).value;closeModal();mailTo('Document enquiry - '+g('standard')+' '+g('type'),['Standard: '+g('standard'),'Document: '+g('type'),'Company: '+g('company'),'Industry: '+g('modalIndustry'),'Email: '+g('email'),'Format: '+g('format'),'','Details:',g('details')]).then(ok=>notify(ok?'Thank you! Your enquiry has been sent.':'Opening your email app to send the enquiry.'))});
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.querySelectorAll('#singleLinks a').forEach(a=>a.addEventListener('click',()=>document.getElementById('singleLinks').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();


const standards={
"9001":"ISO 9001:2026","14001":"ISO 14001:2026","45001":"ISO 45001:2018","22000":"ISO 22000:2018","27001":"ISO/IEC 27001:2022","37001":"ISO 37001:2025","50001":"ISO 50001:2018"
};
const checklistItems=[
{id:"scope",name:"Organisation context, scope and boundaries",desc:"Business profile, products/services, sites, interested parties, scope and context information.",applies:["ALL"]},
{id:"processmap",name:"Process map / interaction map",desc:"Current process sequence, interactions, owners and interfaces.",applies:["ALL"]},
{id:"orgchart",name:"Organisation chart and role responsibilities",desc:"Reporting lines, key roles, authorities and responsibilities.",applies:["ALL"]},
{id:"policy",name:"Existing policies and objectives",desc:"Quality, environmental, OH&S, food safety, information security, anti-bribery and energy policies/objectives as applicable.",applies:["ALL"]},
{id:"legal",name:"Legal and other requirements register",desc:"Applicable legislation, permits, licences, contractual and other compliance obligations.",applies:["14001","45001","22000","27001","37001","50001"]},
{id:"risk",name:"Risk and opportunity assessment",desc:"Existing risk methodology, risk register and treatment/action plans.",applies:["ALL"]},
{id:"competence",name:"Competence, training and awareness records",desc:"Competency matrix, training plans, qualifications and awareness evidence.",applies:["ALL"]},
{id:"supplier",name:"Supplier / contractor / external provider information",desc:"Approved supplier list, evaluation criteria, outsourced processes and contractor controls.",applies:["9001","14001","45001","22000","27001","37001","50001"]},
{id:"operations",name:"Operational controls and work instructions",desc:"Process SOPs, acceptance criteria, operating controls and service/product delivery information.",applies:["9001","14001","45001","22000","27001","50001"]},
{id:"monitor",name:"Monitoring, measurement and equipment records",desc:"KPIs, inspection/monitoring records, calibration and measurement equipment details.",applies:["9001","14001","45001","22000","50001"]},
{id:"emergency",name:"Emergency preparedness and response information",desc:"Emergency scenarios, response plans, drills, equipment and contact arrangements.",applies:["14001","45001","22000","27001"]},
{id:"incident",name:"Incident, nonconformity and corrective action records",desc:"Incident reports, complaints, nonconformities, root-cause analysis and corrective actions.",applies:["ALL"]},
{id:"audit",name:"Previous internal / external audit reports",desc:"Audit programme, reports, findings, closure evidence and certification audit reports if available.",applies:["ALL"]},
{id:"review",name:"Management review records",desc:"Previous management review inputs, decisions, actions and outputs if available.",applies:["ALL"]},
{id:"customer",name:"Customer requirements, complaints and feedback",desc:"Customer specifications, feedback, complaints, satisfaction data and service requirements.",applies:["9001","22000"]},
{id:"environment",name:"Environmental aspects, impacts and lifecycle information",desc:"Aspect-impact register, significance criteria, emissions, waste, resource use and lifecycle considerations.",applies:["14001"]},
{id:"ohs",name:"Hazard identification and OH&S risk assessments",desc:"Task/activity hazard register, risk criteria, hierarchy of controls and worker consultation evidence.",applies:["45001"]},
{id:"food",name:"Food safety plans, hazard analysis and PRP information",desc:"Product descriptions, flow diagrams, hazard analysis, HACCP/OPRP plans, allergens and traceability/recall data.",applies:["22000"]},
{id:"infosec",name:"Information asset inventory and security risk information",desc:"Asset register, information classification, risk assessment, access controls, incident and supplier security information.",applies:["27001"]},
{id:"soa",name:"Statement of Applicability and control status (if available)",desc:"Existing SoA, control inclusion/exclusion rationale and implementation status.",applies:["27001"]},
{id:"bribery",name:"Anti-bribery risk and business relationship information",desc:"Third-party register, due diligence, gifts/hospitality, conflicts of interest, donations and reporting channels.",applies:["37001"]},
{id:"energy",name:"Energy review, consumption and performance information",desc:"Energy sources, bills/meters, significant energy uses, EnPIs, energy baseline and improvement opportunities.",applies:["50001"]},
{id:"foodtrace",name:"Traceability, withdrawal and recall records",desc:"Lot/batch traceability, mock recall, withdrawal/recall procedure and test records.",applies:["22000"]},
{id:"privacy",name:"Privacy / personal data and applicable security obligations",desc:"Personal data processing, privacy obligations, retention and data subject handling where applicable.",applies:["27001"]}
];
const processDocs=["Quality / management system manual or system overview","Documented information control procedure / method","Record retention and control matrix","Objectives and action plans","Internal audit programme and audit procedure","Nonconformity and corrective action procedure","Management review procedure / agenda and minutes format","Competence and training matrix","Supplier / external provider evaluation method","Operational planning and control documents"];
const standardDocs={
"9001":["Customer requirements review procedure","Design and development controls (if applicable)","Production / service provision controls","Identification and traceability controls (where applicable)","Release / inspection records"],
"14001":["Environmental policy and aspects-impact register","Compliance obligations evaluation method and records","Operational environmental controls","Emergency preparedness and response plans","Environmental monitoring and performance evaluation records"],
"45001":["OH&S policy and hazard identification / risk assessment","Worker consultation and participation process","Operational OH&S controls and permit systems as applicable","Emergency preparedness and response plans","Incident investigation and OH&S performance records"],
"22000":["Food safety policy and food safety team responsibilities","Product descriptions and intended use","Process flow diagrams and on-site flow confirmation","Hazard analysis, HACCP plan and OPRP plan","Prerequisite programmes, allergen and traceability controls"],
"27001":["Information security policy and risk assessment methodology","Information security risk treatment plan","Statement of Applicability","Access control and asset management procedures","Information security incident management and business continuity interfaces"],
"37001":["Anti-bribery policy and compliance function responsibilities","Anti-bribery risk assessment and due diligence process","Gifts, hospitality, donations and conflicts controls","Reporting, investigation and non-retaliation process","Business associate controls and monitoring"],
"50001":["Energy policy and energy planning method","Energy review and significant energy uses","Energy baseline and energy performance indicators","Energy data collection and measurement plan","Energy objectives, targets and action plans"]
};
const SB_URL='https://hihresztklcxlvcxzvjp.supabase.co',SB_KEY='sb_publishable_KNEF2kOc4kPFiuhiT17T0g_wt9UpBxc',SB_BUCKET='client-uploads';
const subId='TG-'+new Date().toISOString().slice(0,10).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,6).toUpperCase();
const okExt=['pdf','doc','docx','xls','xlsx','ppt','pptx','png','jpg','jpeg'];
async function sbUpload(files,folder,input){
 const note=input.parentElement.querySelector('span');
 if(!document.getElementById('consent').checked){alert('Please tick the consent box before uploading files.');input.value='';return[]}
 const done=[];
 for(const f of files){
  const ext=f.name.split('.').pop().toLowerCase();
  if(!okExt.includes(ext)){alert(f.name+': this file type is not allowed.');continue}
  if(f.size>20*1024*1024){alert(f.name+' is larger than 20 MB.');continue}
  if(note)note.textContent='Uploading '+f.name+'…';
  const path=[subId,...folder.split('/'),Date.now()+'-'+f.name.replace(/[^\w.\-]+/g,'_')].map(encodeURIComponent).join('/');
  try{const r=await fetch(SB_URL+'/storage/v1/object/'+SB_BUCKET+'/'+path,{method:'POST',headers:{apikey:SB_KEY,'Content-Type':f.type||'application/octet-stream','x-upsert':'false'},body:f});if(!r.ok)throw 0;done.push(f.name)}
  catch(e){alert('Upload failed for '+f.name+'. Check your connection and try again, or email the file to tangoisosolutions@gmail.com.')}
 }
 return done}
document.getElementById('subIdLabel').textContent=subId;
let selected=[],processes=[],uploads={},turtleUploads={},current=0;
const $=id=>document.getElementById(id);
function chosen(){return [...document.querySelectorAll('#standardOptions input:checked')].map(x=>x.value)}
function updateStandards(){selected=chosen();$('selectedCount').textContent=selected.length+' selected';document.querySelectorAll('.std-option').forEach(l=>l.classList.toggle('selected',l.querySelector('input').checked))}
document.querySelectorAll('#standardOptions input').forEach(x=>x.addEventListener('change',updateStandards));
function addProcess(){const input=$('processInput'),v=input.value.trim();if(!v)return;if(processes.some(x=>x.toLowerCase()===v.toLowerCase())){alert('This process is already listed.');return}processes.push(v);input.value='';renderProcesses()}
function removeProcess(i){processes.splice(i,1);renderProcesses()}
function renderProcesses(){$('processList').innerHTML=processes.length?processes.map((p,i)=>`<div class="process-row"><span><b>${i+1}.</b> ${esc(p)}</span><button onclick="removeProcess(${i})">Remove</button></div>`).join(''):'<div class="callout">No processes added yet. Add at least one process to continue.</div>'}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function applicable(item){return item.applies.includes('ALL')?selected: item.applies.filter(x=>selected.includes(x))}
function renderChecklist(){
 const items=checklistItems.filter(x=>applicable(x).length);
 $('checklist').innerHTML=items.map(it=>{const done=!!uploads[it.id];return `<div class="check-item ${done?'done':''}"><div><b>${esc(it.name)}</b><small>${esc(it.desc)}</small><div class="applies">Applies to: ${applicable(it).map(x=>standards[x]).join(' • ')}</div></div><div class="filebox"><input type="file" multiple data-upload="${it.id}" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"><span>${done?esc(uploads[it.id].join(', ')):'No file selected'}</span></div></div>`}).join('');
 $('checklist').querySelectorAll('input[type=file]').forEach(inp=>inp.addEventListener('change',async e=>{const id=e.target.dataset.upload,n=await sbUpload([...e.target.files],id,e.target);if(n.length)uploads[id]=n;renderChecklist()}));
 updateUploadProgress();
}
function updateUploadProgress(){const total=checklistItems.filter(x=>applicable(x).length).length,done=checklistItems.filter(x=>applicable(x).length&&uploads[x.id]?.length).length,p=total?Math.round(done/total*100):0;$('checkCount').textContent=`${done} / ${total} uploaded`;$('uploadPercent').textContent=p+'%';$('uploadBar').style.width=p+'%'}
function renderTurtles(){$('turtleList').innerHTML=processes.map((p,i)=>`<div class="process-upload"><h3>${i+1}. ${esc(p)}</h3><p>Upload the turtle diagram showing inputs, outputs, with-what/resources, with-whom/competence, how/methods and performance indicators/criteria.</p><div class="filebox"><input type="file" data-turtle="${i}" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg"><span>${turtleUploads[i]?esc(turtleUploads[i]):'No turtle diagram uploaded'}</span></div></div>`).join('');$('turtleList').querySelectorAll('input').forEach(inp=>inp.addEventListener('change',async e=>{const i=e.target.dataset.turtle,n=await sbUpload([...e.target.files].slice(0,1),'turtle/'+(+i+1)+'-'+processes[i].replace(/[^\w\-]+/g,'_'),e.target);if(n.length)turtleUploads[i]=n[0];renderTurtles()}));updateTurtleCount()}
function updateTurtleCount(){const done=processes.filter((p,i)=>turtleUploads[i]).length;$('turtleCount').textContent=`${done} / ${processes.length} uploaded`}
function validateStep(n){
 if(n===0&&selected.length===0){alert('Select at least one ISO standard.');return false}
 if(n===1){if(!$('builderCompany').value.trim()||!$('builderIndustry').value.trim()||!$('scope').value.trim()){alert('Please complete company name, industry and proposed scope.');return false}if(!processes.length){alert('Add all processes in scope before continuing.');return false}}
 return true
}
function nextStep(){if(!validateStep(current))return;if(current===1)renderChecklist();if(current===2)renderTurtles();if(current===3)renderReview();showStep(Math.min(4,current+1))}
function prevStep(){showStep(Math.max(0,current-1))}
function showStep(n){current=n;for(let i=0;i<5;i++){$('step'+i).classList.toggle('hidden',i!==n);document.querySelector(`.stepnav[data-step="${i}"]`).classList.toggle('active',i===n);document.querySelector(`.stepnav[data-step="${i}"]`).classList.toggle('done',i<n)}$('stepLabel').textContent=`Step ${n+1} of 5`;$('progressLabel').textContent=`${n*25}% complete`;$('progressBar').style.width=(n*25)+'%';window.scrollTo({top:$('wizard').offsetTop-90,behavior:'smooth'})}
function renderReview(){
 const items=checklistItems.filter(x=>applicable(x).length),uploaded=items.filter(x=>uploads[x.id]?.length).length,turtleDone=processes.filter((p,i)=>turtleUploads[i]).length,missing=items.length-uploaded,missingT=turtleDone<processes.length;
 $('sumStandards').textContent=selected.length;$('sumEvidence').textContent=`${uploaded}/${items.length}`;$('sumTurtles').textContent=`${turtleDone}/${processes.length}`;
 const ready=missing===0&&!missingT;$('readyBadge').textContent=ready?'Inputs complete':'Inputs missing';$('readyBadge').style.background=ready?'#e8f6f1':'#fff3e4';$('generateBtn').disabled=!ready;
 $('readinessMessage').className='callout '+(ready?'':'warning');$('readinessMessage').innerHTML=ready?'<b>All listed intake items have files selected.</b> This confirms file selection only; Tango must still review file contents, applicability, adequacy and completeness before generation.':'<b>Generation is locked.</b> Upload '+missing+' remaining checklist item(s) and '+(processes.length-turtleDone)+' remaining turtle diagram(s).';
 const docs=new Set(processDocs);selected.forEach(s=>(standardDocs[s]||[]).forEach(d=>docs.add(d)));
 $('docList').innerHTML=[...docs].map(d=>`<li>${esc(d)}</li>`).join('');
}
function generatePlan(){
 const data={submissionId:subId,company:$('builderCompany').value,industry:$('builderIndustry').value,scope:$('scope').value,standards:selected.map(s=>standards[s]),processes,documents:[...document.querySelectorAll('#docList li')].map(x=>x.textContent),uploads,turtleUploads};
 const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Tango_AutoDocs_Generation_Plan.json';a.click();URL.revokeObjectURL(url);mailTo('Document Builder brief - '+data.company+' ('+subId+')',['Submission ID: '+subId,'Company: '+data.company,'Industry: '+data.industry,'Scope: '+data.scope,'Standards: '+data.standards.join(', '),'Processes: '+processes.join('; '),'Documents: '+data.documents.join('; ')]);
 $('generatedResult').classList.remove('hidden');$('generatedResult').innerHTML='<b>Document plan submitted.</b> Reference <b>'+subId+'</b>. Your brief has been sent to the Tango team and a copy downloaded to your device. We will review your inputs and prepare your draft document pack.';
}
$('processInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addProcess()}});

document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('.standard-mini').forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')showPage('standards')}));
