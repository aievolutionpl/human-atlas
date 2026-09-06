import {flushSync} from 'react-dom';
import {registerAtlasTools} from './agent-tools';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Activity,ArrowUpRight,ChevronRight,Dices,Expand,Focus,Info,Layers3,Minus,Pause,Play,Plus,RotateCcw,RotateCw,Scan,Shrink,Sparkles,Tag,Search,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Slider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
import {Sheet,SheetContent,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import {Combobox,ComboboxInput,ComboboxContent,ComboboxList,ComboboxItem,ComboboxEmpty} from '@/components/ui/combobox';
import AnatomyScene from './scene';
import {DEFAULT_VISIBLE,SYSTEMS,EXPLANATIONS,ORGANS,REGIONS,regionOf,explanation,type Atlas,type Concept,type SceneState,type SystemId,type View,type Region} from './anatomy';
import {t,tf,type Lang,DEFAULT_LANG} from './i18n';
import {plName} from './pl-anatomy';
const initial:SceneState={explode:0,visible:DEFAULT_VISIBLE,selected:[],isolate:false,view:'three-quarter',rotate:false,reset:0};
const VIEW_KEYS={ 'three-quarter':'viewThreeQuarter',front:'viewFront',side:'viewSide',back:'viewBack'} as const;
const ORGAN_PRESET:SystemId[]=['cardiac','respiratory','digestive','urinary','endocrine','reproductive'];
type Tab='layers'|'organs'|'view'|'search'|null;
export default function Home(){
 const detailTitle=useRef<HTMLHeadingElement>(null);
 const [lang,setLang]=useState<Lang>(DEFAULT_LANG);
 useEffect(()=>{document.documentElement.lang=lang;},[lang]);
 const [atlas,setAtlas]=useState<Atlas|null>(null),[state,setState]=useState(initial),[progress,setProgress]=useState(0),[error,setError]=useState(''),[panel,setPanel]=useState<Tab>(null),[details,setDetails]=useState(false),[about,setAbout]=useState(false),[query,setQuery]=useState(''),[chosen,setChosen]=useState<Concept|null>(null);
 const [xray,setXray]=useState(false),[spin,setSpin]=useState(false),[glow,setGlow]=useState(true),[labels,setLabels]=useState(false),[hq,setHq]=useState(true),[zoomPct,setZoomPct]=useState(100),[region,setRegion]=useState<Region>('all'),[organFocus,setOrganFocus]=useState<string|null>(null);
 const [lighting,setLighting]=useState({exposure:1,key:1,rim:1,ambient:1});
 const lightPresets:{id:string;v:{exposure:number;key:number;rim:number;ambient:number}}[]=[
  {id:'lightSoft',v:{exposure:.78,key:.6,rim:.55,ambient:1.45}},
  {id:'lightStd',v:{exposure:1,key:1,rim:1,ambient:1}},
  {id:'lightStudio',v:{exposure:1.05,key:1.45,rim:1.35,ambient:.6}},
 ];
 const [isFs,setFs]=useState(false);
 useEffect(()=>{const h=()=>setFs(!!document.fullscreenElement);document.addEventListener('fullscreenchange',h);return()=>document.removeEventListener('fullscreenchange',h);},[]);
 const toggleFs=()=>{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else document.documentElement.requestFullscreen().catch(()=>{});};
 const pickRandom=()=>{if(!atlas||!atlas.concepts.length)return;for(let tries=0;tries<12;tries++){const c=atlas.concepts[Math.floor(Math.random()*atlas.concepts.length)];if(c&&c.elements.length){choose(c);return;}}};
 useEffect(()=>{const abort=new AbortController();setProgress(0);setError('');setAtlas(null);setChosen(null);setDetails(false);setState({...initial,visible:DEFAULT_VISIBLE});fetch('/models/atlas.json',{signal:abort.signal}).then(r=>{if(!r.ok)throw new Error(t('catalogueError',lang));return r.json();}).then(data=>setAtlas(data as Atlas)).catch(e=>{if(e.name!=='AbortError')setError(e.message);});return()=>abort.abort();},[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement)return;if(e.key==='/'){e.preventDefault();setPanel('search');setDetails(false);}else if(e.key==='r'||e.key==='R'){pickRandom();}else if(e.key==='f'||e.key==='F'){toggleFs();}else if(e.key==='x'||e.key==='X'){setXray(v=>!v);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[atlas]);
 const parts=useMemo(()=>new Map(atlas?.parts.map(p=>[p.id,p])),[atlas]);
 const counts=useMemo(()=>Object.fromEntries(SYSTEMS.map(s=>[s.id,atlas?.parts.filter(p=>p.system===s.id).length??0])),[atlas]);
 const activeSystems=SYSTEMS.filter(s=>counts[s.id]>0);
 const bodyBounds=useMemo(()=>{if(!atlas||!atlas.parts.length)return null;let lo=Infinity,hi=-Infinity;for(const p of atlas.parts){lo=Math.min(lo,p.bounds[0][1]);hi=Math.max(hi,p.bounds[1][1]);}return [lo,hi] as [number,number];},[atlas]);
 const selectedParts=state.selected.map(id=>parts.get(id)).filter(p=>!!p),selected=selectedParts[0],system=SYSTEMS.find(s=>s.id===selected?.system);
 const visibleCount=atlas?.parts.filter(p=>state.isolate?state.selected.includes(p.id):state.visible.includes(p.system)||state.selected.includes(p.id)).length??0;
 const results=useMemo(()=>{if(!atlas)return[];const term=query.toLowerCase().trim();if(!term)return ['heart','brain','liver','stomach','spleen','pancreas','urinary bladder','trachea'].map(name=>atlas.concepts.find(c=>c.name.toLowerCase()===name)).filter((x):x is Concept=>!!x);return atlas.concepts.filter(c=>c.name.toLowerCase().includes(term)||c.id.toLowerCase().includes(term)).sort((a,b)=>a.name.length-b.name.length).slice(0,80);},[atlas,query]);
 const choose=(c:Concept)=>{setChosen(c);setState(s=>({...s,selected:c.elements,isolate:false,rotate:false}));setDetails(true);setPanel(null);setOrganFocus(null);};
 useEffect(()=>{if(!atlas)return;return registerAtlasTools(atlas,c=>flushSync(()=>choose(c)));},[atlas]);
 const choosePart=(id:string)=>{const p=parts.get(id);if(!p)return;setChosen({id:p.conceptId,name:p.name,elements:[id]});setState(s=>({...s,selected:[id],isolate:false,rotate:false}));setDetails(true);setPanel(null);setOrganFocus(null);};
 const toggle=(id:SystemId)=>{setDetails(false);setOrganFocus(null);setState(s=>({...s,selected:[],isolate:false,visible:s.visible.includes(id)?s.visible.filter(x=>x!==id):[...s.visible,id]}));};
 const reset=()=>{setState(s=>({...initial,visible:DEFAULT_VISIBLE,reset:s.reset+1}));setChosen(null);setDetails(false);setPanel(null);setOrganFocus(null);setRegion('all');};
 const openPanel=(next:Tab)=>{setDetails(false);setPanel(p=>p===next?null:next);};
 const switchLang=()=>setLang(l=>l==='pl'?'en':'pl');
 const fmt=(n:number)=>n.toLocaleString(lang==='pl'?'pl-PL':'en-US');
 const LN=(name:string)=>lang==='pl'?plName(name):name;
 const aboutP1=t('aboutP1',lang).split('<br/>');
 const zoom=(dir:1|-1)=>setState(s=>({...s,zoomSeq:{dir,id:(s.zoomSeq?.id??0)+1}}));
 const frame=(r:Region)=>{setRegion(r);setState(s=>({...s,region:r,regionSeq:{id:(s.regionSeq?.id??0)+1}}));};
 const openOrgan=(en:string)=>{if(!atlas||!bodyBounds)return;const c=findConcept(en);if(!c)return;const el=c.elements[0],p=parts.get(el);
  setChosen(c);setOrganFocus(en);setState(s=>({...s,selected:c.elements,isolate:false,rotate:false}));
  if(p&&bodyBounds){const [lo,hi]=bodyBounds;const r=regionOf((p.bounds[0][1]+p.bounds[1][1])/2,lo,hi);setRegion(r);setState(s=>({...s,regionSeq:{id:(s.regionSeq?.id??0)+1},region:r}));}
  setDetails(true);setPanel(null);};
 const animateTo=(v:number)=>setState(s=>({...s,explode:v,view:v>.8?'front':s.view,rotate:false}));
 const exploder=useRef<ReturnType<typeof setInterval>|null>(null);
 const runAssemble=()=>{clearInterval(exploder.current!);const step=()=>{setState(s=>{const v=Math.max(0,+(s.explode-.04).toFixed(3));if(v<=0){clearInterval(exploder.current!);return {...s,explode:0};}return {...s,explode:v};});};exploder.current=setInterval(step,16);};
 const runExplode=()=>{clearInterval(exploder.current!);const step=()=>{setState(s=>{const v=Math.min(1,+(s.explode+.04).toFixed(3));if(v>=1){clearInterval(exploder.current!);return {...s,explode:1,view:'front'};}return {...s,explode:v};});};exploder.current=setInterval(step,16);};
 useEffect(()=>()=>{if(exploder.current)clearInterval(exploder.current);},[]);
 const findConcept=(en:string)=>{if(!atlas)return null;const cs=atlas.concepts;return cs.find(c=>c.name.toLowerCase()===en)??cs.find(c=>new RegExp(`\\b${en}\\b`,'i').test(c.name))??null;};
 const organList=useMemo(()=>ORGANS.map(o=>({...o,concept:findConcept(o.en)})),[atlas]);
 return <main className="studio">
 {atlas&&<AnatomyScene atlas={atlas} state={{...state,xray,spin,glow,labels,hq,lighting,inspectorOpen:details&&selectedParts.length>0}} lang={lang} onSelect={choosePart} onProgress={n=>{setProgress(n);if(n===100)setError('');}} onError={setError} onZoom={z=>setZoomPct(Math.round(z*100))}/>}
 <div className="vignette"/>
 <header className="identity">
  <div className="eyebrow"><span className="status-dot"/> {t('tagline',lang)}</div>
  <h1>Human Atlas<Badge variant="outline" className="edition">3D</Badge></h1>
  <div className="brand-line"><img src="/brand/logo-mark.png" alt="" className="brand-mark"/><span className="brand-name">AI Evolution Polska</span></div>
  <div className="identity-meta">{atlas?fmt(atlas.parts.length):'2 234'} {t('metaPieces',lang)} <span>·</span> BodyParts3D</div>
  <div className="lang-switch" role="group" aria-label={t('langToggleAria',lang)}>
   <button type="button" className={lang==='pl'?'on':''} onClick={lang==='pl'?undefined:switchLang} aria-pressed={lang==='pl'}>PL</button>
   <button type="button" className={lang==='en'?'on':''} onClick={lang==='en'?undefined:switchLang} aria-pressed={lang==='en'}>EN</button>
  </div>
 </header>
 <nav className="top-actions" aria-label="Explorer panels">
  <Button variant="ghost" className={panel==='layers'?'active':''} onClick={()=>openPanel('layers')} aria-label={t('systems',lang)}><Layers3 size={18}/><span>{t('systems',lang)}</span></Button>
  <Button variant="ghost" className={panel==='organs'?'active':''} onClick={()=>openPanel('organs')} aria-label={t('organGallery',lang)}><Sparkles size={18}/><span>{t('organGallery',lang)}</span></Button>
  <Button variant="ghost" className={panel==='view'?'active':''} onClick={()=>openPanel('view')} aria-label={t('viewPanel',lang)}><Scan size={18}/><span>{t('viewPanel',lang)}</span></Button>
  <Button variant="ghost" className={panel==='search'?'active':''} onClick={()=>openPanel('search')} aria-label={t('searchAria',lang)}><Search size={18}/><kbd>/</kbd></Button>
  <Button variant="ghost" className="icon-button" aria-label={t('randomStructure',lang)} title={t('randomStructure',lang)+' (R)'} onClick={pickRandom}><Dices size={18}/></Button>
  <Button variant="ghost" className="icon-button" aria-label={isFs?t('exitFullscreen',lang):t('fullscreen',lang)} title={(isFs?t('exitFullscreen',lang):t('fullscreen',lang))+' (F)'} onClick={toggleFs}>{isFs?<Shrink size={18}/>:<Expand size={18}/>}</Button>
  <Button variant="ghost" className="icon-button" aria-label={t('aboutAria',lang)} onClick={()=>{setDetails(false);setPanel(null);setAbout(true);}}><Info size={18}/></Button>
 </nav>
 <section className={`layers-panel glass ${panel==='layers'?'mobile-open':''}`} aria-label={t('systems',lang)}>
  <div className="panel-heading"><span>{t('systems',lang)}</span><Button variant="ghost" className="mobile-only icon-button" onClick={()=>setPanel(null)} aria-label={t('systems',lang)}><X size={18}/></Button><Badge variant="secondary" className="desktop-only small-number">{activeSystems.length}</Badge></div>
  <div className="layer-presets"><Button variant="ghost" aria-pressed={activeSystems.every(x=>state.visible.includes(x.id))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:activeSystems.map(x=>x.id)}))}>{t('presetAll',lang)}</Button><Button variant="ghost" aria-pressed={state.visible.length===1&&state.visible[0]==='skeletal'} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['skeletal']}))}>{t('presetSkeleton',lang)}</Button><Button variant="ghost" aria-pressed={state.visible.length===ORGAN_PRESET.length&&ORGAN_PRESET.every(id=>state.visible.includes(id))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:ORGAN_PRESET}))}>{t('presetOrgans',lang)}</Button></div>
  <div className="system-list">{activeSystems.map(s=><div className={`system-row ${state.visible.includes(s.id)?'enabled':''}`} key={s.id}><Button variant="ghost" className="system-name" title={tf('showOnly',lang,{x:s.name[lang].toLowerCase()})} onClick={()=>setState(v=>({...v,visible:[s.id],isolate:false,selected:[]}))}><span className="system-dot" style={{background:s.color}}/>{s.name[lang]}<span className="system-count">{counts[s.id]}</span></Button><Switch checked={state.visible.includes(s.id)} onCheckedChange={()=>toggle(s.id)} aria-label={tf('showSystem',lang,{x:s.name[lang].toLowerCase()})}/></div>)}</div>
  <div className="panel-foot"><span>{fmt(visibleCount)} {t('piecesVisible',lang)}</span><Button variant="ghost" onClick={()=>setState(s=>({...s,visible:[],selected:[],isolate:false}))}>{t('hideAll',lang)}</Button></div>
 </section>
 {panel==='organs'&&<section className="organs-panel glass" aria-label={t('organGallery',lang)}>
  <div className="panel-heading"><span>{t('organGallery',lang)}</span><Button variant="ghost" className="icon-button" onClick={()=>setPanel(null)} aria-label={t('systems',lang)}><X size={18}/></Button></div>
  <p className="organs-desc">{t('organGalleryDesc',lang)}</p>
  <div className="organ-grid">{organList.map(o=><Button variant="ghost" key={o.en} className={`organ-card ${organFocus===o.en?'active':''}`} onClick={()=>openOrgan(o.en)} disabled={!o.concept}>
   <span className="organ-name">{o.pl}</span><span className="organ-en">{lang==='pl'?o.en:''}</span>
   <span className="organ-open">{t('openOrgan',lang)} <ChevronRight size={12}/></span>
  </Button>)}</div>
 </section>}
 {panel==='view'&&<section className="view-panel glass" aria-label={t('viewPanel',lang)}>
  <div className="panel-heading"><span>{t('viewPresets',lang)}</span><Button variant="ghost" className="icon-button" onClick={()=>setPanel(null)} aria-label={t('systems',lang)}><X size={18}/></Button></div>
  <div className="fx-row"><span className="fx-label">{t('regions',lang)}</span><div className="chip-row">{REGIONS.map(r=><Button key={r.id} variant="ghost" className={`chip ${region===r.id?'active':''}`} aria-pressed={region===r.id} onClick={()=>frame(r.id)}>{r[lang]}</Button>)}</div></div>
  <div className="fx-row"><span className="fx-label">{t('fxLabel',lang)}</span>
   <div className="fx-toggles">
    <Button variant="ghost" className={`chip ${xray?'active':''}`} aria-pressed={xray} onClick={()=>setXray(v=>!v)}><Scan size={13}/>{t('fxXray',lang)}</Button>
    <Button variant="ghost" className={`chip ${labels?'active':''}`} aria-pressed={labels} onClick={()=>setLabels(v=>!v)}><Tag size={13}/>{t('fxLabels',lang)}</Button>
    <Button variant="ghost" className={`chip ${glow?'active':''}`} aria-pressed={glow} onClick={()=>setGlow(v=>!v)}><Sparkles size={13}/>{t('fxGlow',lang)}</Button>
    <Button variant="ghost" className={`chip ${spin?'active':''}`} aria-pressed={spin} onClick={()=>setSpin(v=>!v)}><RotateCw size={13}/>{t('fxSpin',lang)}</Button>
   </div></div>
  <div className="fx-row"><span className="fx-label">{t('animLabel',lang)}</span>
   <div className="fx-toggles">
    <Button variant="ghost" className="chip" onClick={runExplode}><Play size={13}/>{t('animExplode',lang)}</Button>
    <Button variant="ghost" className="chip" onClick={runAssemble}><Pause size={13}/>{t('animAssemble',lang)}</Button>
    <Button variant="ghost" className="chip" onClick={()=>animateTo(1)}>{t('everyPiece',lang)} 100%</Button>
    <Button variant="ghost" className="chip" onClick={()=>animateTo(0)}>{t('assembled',lang)} 0%</Button>
   </div></div>
  <div className="fx-row"><span className="fx-label">{t('lighting',lang)}</span>
   <div className="light-grid">
    <label className="light-row"><span>{t('exposure',lang)}</span><Slider min={30} max={160} step={1} value={[Math.round(lighting.exposure*100)]} onValueChange={v=>setLighting(l=>({...l,exposure:(Array.isArray(v)?v[0]:v)/100}))}/><output>{Math.round(lighting.exposure*100)}%</output></label>
    <label className="light-row"><span>{t('lightKey',lang)}</span><Slider min={0} max={200} step={1} value={[Math.round(lighting.key*100)]} onValueChange={v=>setLighting(l=>({...l,key:(Array.isArray(v)?v[0]:v)/100}))}/><output>{Math.round(lighting.key*100)}%</output></label>
    <label className="light-row"><span>{t('lightRim',lang)}</span><Slider min={0} max={200} step={1} value={[Math.round(lighting.rim*100)]} onValueChange={v=>setLighting(l=>({...l,rim:(Array.isArray(v)?v[0]:v)/100}))}/><output>{Math.round(lighting.rim*100)}%</output></label>
    <label className="light-row"><span>{t('lightAmbient',lang)}</span><Slider min={0} max={200} step={1} value={[Math.round(lighting.ambient*100)]} onValueChange={v=>setLighting(l=>({...l,ambient:(Array.isArray(v)?v[0]:v)/100}))}/><output>{Math.round(lighting.ambient*100)}%</output></label>
   </div>
   <div className="fx-toggles">{lightPresets.map(pr=><Button key={pr.id} variant="ghost" className={`chip ${lighting.exposure===pr.v.exposure&&lighting.key===pr.v.key?'active':''}`} onClick={()=>setLighting(pr.v)}>{t(pr.id as never,lang)}</Button>)}</div>
  </div>
  <div className="fx-row"><span className="fx-label">{t('fxQuality',lang)}</span>
   <div className="fx-toggles">
    <Button variant="ghost" className={`chip ${!hq?'active':''}`} aria-pressed={!hq} onClick={()=>setHq(false)}>{t('qLow',lang)}</Button>
    <Button variant="ghost" className={`chip ${hq?'active':''}`} aria-pressed={hq} onClick={()=>setHq(true)}>{t('qHigh',lang)}</Button>
   </div></div>
 </section>}
 {panel==='search'&&<section className="search-panel glass" aria-label={t('findStructure',lang)}><div className="panel-heading"><span>{t('findStructure',lang)}</span><Button variant="ghost" className="icon-button" onClick={()=>setPanel(null)} aria-label={t('systems',lang)}><X size={18}/></Button></div><Combobox<Concept> items={results} value={null} onValueChange={value=>{if(value)choose(value);}} inputValue={query} onInputValueChange={setQuery} itemToStringLabel={c=>LN(c.name)} filter={null} open onOpenChange={open=>{if(!open)setPanel(null);}}><ComboboxInput autoFocus placeholder={t('searchPlaceholder',lang)} aria-label={t('searchAria',lang)} showTrigger={false}/><ComboboxContent className="anatomy-search-results"><ComboboxEmpty>{t('searchEmpty',lang)}</ComboboxEmpty><ComboboxList>{(c:Concept)=><ComboboxItem key={c.id} value={c}><span className="search-result-name">{LN(c.name)}</span><span className="small-number">{c.elements.length} {c.elements.length===1?t('piece',lang):t('pieces',lang)}</span></ComboboxItem>}</ComboboxList></ComboboxContent></Combobox><p className="search-note">{query?t('searchHintQuery',lang):t('searchHintStart',lang)}</p></section>}
 <nav className="view-controls glass" aria-label="Camera controls">
  {(['three-quarter','front','side','back'] as View[]).map((v,i)=><Button variant="ghost" key={v} className={state.view===v?'active':''} aria-pressed={state.view===v} disabled={state.explode>.8&&v!=='front'} onClick={()=>setState(s=>({...s,view:v,reset:s.reset+1,rotate:false}))} title={`${t(VIEW_KEYS[v],lang)} · ${t('viewSuffix',lang)}`} aria-label={`${t(VIEW_KEYS[v],lang)} · ${t('viewSuffix',lang)}`}><span>{['¾','F','S','B'][i]}</span></Button>)}
  <i/>
  <Button variant="ghost" aria-label={t('zoomIn',lang)} title={t('zoomIn',lang)} onClick={()=>zoom(1)}><Plus size={17}/></Button>
  <Button variant="ghost" aria-label={t('zoomOut',lang)} title={t('zoomOut',lang)} onClick={()=>zoom(-1)}><Minus size={17}/></Button>
  <Button variant="ghost" aria-label={t('centerBody',lang)} title={t('centerBody',lang)} onClick={()=>frame('all')}><RotateCcw size={17}/></Button>
  <Button variant="ghost" disabled={state.explode>=.4} aria-label={state.rotate?t('pauseRotation',lang):t('rotateBody',lang)} title={t('autoRotate',lang)} className={state.rotate?'active':''} onClick={()=>setState(s=>({...s,rotate:!s.rotate}))}>{state.rotate?<Pause size={17}/>:<RotateCw size={18}/>}</Button>
 </nav>
 <div className="scene-caption"><span className="caption-line"/><span>{organFocus?ORGANS.find(o=>o.en===organFocus)?.[lang]?.toUpperCase():state.isolate?(chosen?LN(chosen.name):t('captionSelected',lang)):state.explode>.95?t('captionInventory',lang):state.explode>.05?t('captionSeparated',lang):t('captionAdult',lang)}</span><span className="caption-line"/></div>
 <div className="bottom-dock glass">
  <Button variant="ghost" className="mobile-only dock-layers" onClick={()=>openPanel('layers')} aria-label={t('systems',lang)}><Layers3 size={20}/><span>{t('systems',lang)}</span></Button>
  <div className="explode-control">
   <div className="explode-label"><label id="explode-label">{t('explode',lang)}</label>
    <div className="explode-buttons"><Button variant="ghost" className="mini-btn" onClick={runAssemble} aria-label={t('animAssemble',lang)}><Minus size={13}/></Button><output>{Math.round(state.explode*100)}<span>%</span></output><Button variant="ghost" className="mini-btn" onClick={runExplode} aria-label={t('animExplode',lang)}><Plus size={13}/></Button></div>
   </div>
   <Slider aria-labelledby="explode-label" min={0} max={100} step={1} value={[state.explode*100]} onValueChange={v=>setState(s=>({...s,explode:(Array.isArray(v)?v[0]:v)/100,view:(Array.isArray(v)?v[0]:v)>80?'front':s.view,rotate:false}))}/>
   <div className="slider-endpoints"><span>{t('assembled',lang)}</span><span>{t('everyPiece',lang)}</span></div>
  </div>
  <div className="zoom-readout" title={t('zoomIn',lang)}>{zoomPct}%</div>
  <Button variant="ghost" className="dock-reset" onClick={reset} aria-label={t('resetView',lang)}><RotateCcw size={18}/><span>{t('reset',lang)}</span></Button>
 </div>
 <footer className="studio-footer"><span className="footer-side">{state.explode>.8?t('dragPan',lang):t('dragOrbit',lang)} <b>·</b> {t('pinchZoom',lang)} <b>·</b> {t('tapInspect',lang)}</span><a className="brand-footer" href="https://aievolutionpolska.pl" target="_blank" rel="noreferrer" title="aievolutionpolska.pl"><img src="/brand/logo-mark.png" alt=""/><span className="brand-footer-name">AI EVOLUTION POLSKA</span><span className="brand-footer-url">aievolutionpolska.pl</span></a><span className="footer-side footer-right"><Button variant="ghost" onClick={()=>{setDetails(false);setPanel(null);setAbout(true);}}>{t('sourceCredits',lang)} <ArrowUpRight size={12}/></Button></span></footer>
 {progress<100&&!error&&<div className="loading glass" role="status"><Activity size={18}/><div><strong>{t('loadingTitle',lang)}</strong><span>{progress}% · {tf('loadingPieces',lang,{n:atlas?fmt(atlas.parts.length):'2 234'})}</span><div className="loading-track"><i style={{width:`${progress}%`}}/></div></div></div>}
 {error&&<div className="loading glass error" role="alert"><p>{error}</p><Button variant="ghost" onClick={()=>location.reload()}>{t('reloadViewer',lang)}</Button></div>}
 <Sheet open={details&&selectedParts.length>0} modal={false} disablePointerDismissal onOpenChange={setDetails}><SheetContent initialFocus={detailTitle} className={`detail-sheet glass ${state.isolate?'is-isolated':''}`} showCloseButton={true}><div className="detail-header"><div className="detail-accent" style={{background:system?.color}}/><div className="eyebrow">{system?.name[lang]??t('anatomyFallback',lang)}</div><SheetTitle ref={detailTitle} tabIndex={-1} className="structure-title">{chosen?LN(chosen.name):''}</SheetTitle>{chosen&&organFocus&&<div className="organ-polish">{ORGANS.find(o=>o.en===organFocus)?.pl}</div>}</div><div className="detail-scroll" key={`${chosen?.id}-${state.isolate}-${lang}`}><SheetDescription className="structure-description">{chosen&&selected?explanation(chosen.name,selected.system,lang):''}</SheetDescription>{chosen&&!EXPLANATIONS[chosen.name.toLowerCase()]&&<span className="context-note">{t('contextNote',lang)}</span>}<div className="structure-meta"><span>{t('atlasRef',lang)}<strong>{chosen?.id}</strong></span><span>{t('selectedPieces',lang)}<strong>{fmt(state.selected.length)}</strong></span></div>{selectedParts.length>1&&<div className="member-list"><h3>{t('includedStructures',lang)}</h3>{selectedParts.slice(0,50).map(p=><Button variant="ghost" key={p.id} onClick={()=>choosePart(p.id)}><span>{LN(p.name)}</span><ChevronRight size={14}/></Button>)}{selectedParts.length>50&&<p>{tf('morePieces',lang,{n:selectedParts.length-50})}</p>}</div>}<div className="detail-actions-inline"><Button className="primary-action" onClick={()=>setState(s=>({...s,isolate:!s.isolate,explode:0}))}><Focus size={18}/>{state.isolate?t('showSurrounding',lang):t('isolate',lang)}</Button><Button variant="ghost" className="secondary-action" onClick={()=>zoom(1)}><Plus size={14}/> {t('zoomIn',lang)}</Button><Button variant="ghost" className="secondary-action" onClick={()=>zoom(-1)}><Minus size={14}/> {t('zoomOut',lang)}</Button></div><a className="source-link" href="https://lifesciencedb.jp/bp3d/" target="_blank" rel="noreferrer">{t('viewSource',lang)} <ArrowUpRight size={14}/></a></div><div className="detail-actions"><Button className={`primary-action ${state.isolate?'active':''}`} onClick={()=>setState(s=>({...s,isolate:!s.isolate,explode:0}))}><Focus size={18}/>{state.isolate?t('showSurrounding',lang):t('isolate',lang)}<ChevronRight size={16}/></Button><Button variant="ghost" className="secondary-action" onClick={()=>{setState(s=>({...s,selected:[],isolate:false}));setDetails(false);setOrganFocus(null);}}>{t('clearSelection',lang)}</Button></div></SheetContent></Sheet>
 <Sheet open={about} onOpenChange={setAbout}><SheetContent className="about-sheet glass"><div className="eyebrow">{t('aboutEyebrow',lang)}</div><SheetTitle className="structure-title">{t('aboutTitle',lang)}</SheetTitle><SheetDescription>{t('aboutDesc',lang)}</SheetDescription><div className="about-copy"><div className="about-build"><img src="/brand/logo-aiep.png" alt="AI Evolution Polska"/><div><strong>{t('aboutBuildTitle',lang)}</strong><p>{t('aboutFork',lang)}</p><p>{t('aboutAI',lang)}</p><p>{t('aboutFree',lang)}</p><a className="github-link" href="https://github.com/aievolutionpl/human-atlas" target="_blank" rel="noreferrer">{t('aboutGithub',lang)} <ArrowUpRight size={14}/></a></div></div><p><strong>{aboutP1[0]}</strong><br/>{aboutP1[1]}</p><p>{t('aboutP2',lang)}</p><p>{t('aboutP3',lang)}</p><h3>{t('aboutCreditsHeading',lang)}</h3><p>{t('sourceBody',lang)}</p><a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html" target="_blank" rel="noreferrer">{t('datasetLicense',lang)} <ArrowUpRight size={14}/></a><a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noreferrer">{t('originalData',lang)} <ArrowUpRight size={14}/></a><a href="https://academic.oup.com/nar/article/37/suppl_1/D782/1000752" target="_blank" rel="noreferrer">{t('sourcePublication',lang)} <ArrowUpRight size={14}/></a></div></SheetContent></Sheet>
 </main>;
}
