// Polish anatomical nomenclature translator for BodyParts3D names.
// Model: EN names are [modifiers...] head-noun [of X]; Polish anatomy uses
// [head-noun] [modifiers reversed, gender-inflected] [X-genitive].

// ——— Phrases: fixed compounds, longest match first ———
export const PHRASES:Record<string,string> = {
 'anatomical structure':'struktura anatomiczna',
 'arachnoid mater':'pajęczynówka','dura mater':'twarda błona','pia mater':'pajęczynówka wewnętrzna',
 'circle of willis':'krąg Willisa','cauda equina':'ogon koński',
 'linea alba':'kreska biała','ala of ilium':'skrzydło kości biodrowej',
 'rectus abdominis':'mięsień prosty brzucha','latissimus dorsi':'mięsień najszerszy grzbietu',
 'gluteus maximus':'mięsień pośladkowy wielki','gluteus medius':'mięsień pośladkowy średni',
 'gluteus minimus':'mięsień pośladkowy mały','biceps brachii':'mięsień dwugłowy ramienia',
 'triceps brachii':'mięsień trójgłowy ramienia','biceps femoris':'mięsień dwugłowy uda',
 'quadriceps femoris':'mięsień czworogłowy uda','tibialis anterior':'mięsień piszczelowy przedni',
 'tibialis posterior':'mięsień piszczelowy tylny','pectoralis major':'mięsień piersiowy większy',
 'pectoralis minor':'mięsień piersiowy mniejszy','sternocleidomastoid':'mięsień mostkowo-obojczykowo-sutkowy',
 'left atrium':'lewy przedsionek','right atrium':'prawy przedsionek',
 'left ventricle':'lewa komora','right ventricle':'prawa komora',
 'inferior vena cava':'żyła główna dolna','superior vena cava':'żyła główna górna',
 'common carotid artery':'tętnica szyjna wspólna','internal carotid artery':'tętnica szyjna wewnętrzna',
 'external carotid artery':'tętnica szyjna zewnętrzna',
 'spinal cord':'rdzeń kręgowy','brain stem':'pień mózgu','brainstem':'pień mózgu',
 'optic nerve':'nerw wzrokowy','optic chiasm':'skrzyżowanie wzrokowe','olfactory nerve':'nerw węchowy',
 'temporomandibular joint':'staw skroniowo-żuchwowy','sacroiliac joint':'staw krzyżowo-biodrowy',
 'hip joint':'staw biodrowy','knee joint':'staw kolanowy','shoulder joint':'staw ramienny',
 'elbow joint':'staw łokciowy','wrist joint':'staw nadgarstka','ankle joint':'staw skokowy',
 'pulmonary artery':'tętnica płucna','pulmonary vein':'żyła płucna',
 'globus pallidus':'gałka blada','corpus callosum':'spoidło wielkie mózgu',
 'substantia nigra':'istota czarna','gray matter':'istota szara','white matter':'istota biała',
 'square of':'kwadrat','mouth of':'ujście',
 'levator ani':'mięsień dźwigacz odbytu','common bile duct':'przewód żółciowy wspólny',
 'bile duct':'przewód żółciowy','cystic duct':'przewód pęcherzykowy',
 'anterior scalene':'mięsień skalinowy przedni','middle scalene':'mięsień skalinowy średni',
 'posterior scalene':'mięsień skalinowy tylny','scalene muscle':'mięsień skalinowy',
 'temporal bone':'kość skroniowa','frontal bone':'kość czołowa','zygomatic bone':'kość jarzmowa',
 'sphenoid bone':'kość klinowa','ethmoid bone':'kość sitowa','hyoid bone':'kość gnykowa',
 'occipital bone':'kość potyliczna','parietal bone':'kość ciemieniowa','pelvic bone':'kość miedniczna',
 'hip bone':'kość miedniczna','breast':'pierś','left breast':'lewa pierś','right breast':'prawa pierś','trapezius muscle':'mięsień czworoboczny','trapezius':'mięsień czworoboczny','ilium':'kość biodrowa','ischium':'kość kulszowa',
 'pubis':'kość łonowa','fibrous ring':'pierścień włóknisty',
};

// ——— Head nouns: word → [polish, gender m/f/n] ———
type G='m'|'f'|'n';
const NOUN:Record<string,[string,G]> = {
 artery:['tętnica','f'],arteries:['tętnice','f'],arteria:['tętnica','f'],vein:['żyła','f'],veins:['żyły','f'],vena:['żyła','f'],
 nerve:['nerw','m'],muscle:['mięsień','m'],bone:['kość','f'],cartilage:['chrząstka','f'],ligament:['więzadło','n'],
 tendon:['ścięgno','n'],fascia:['powięź','f'],joint:['staw','m'],disk:['krążek','m'],disc:['krążek','m'],
 symphysis:['spojenie','n'],process:['wyrostek','m'],vertebra:['krąg','m'],vertebrae:['kręgi','m'],rib:['żebro','n'],
 cage:['klatka','f'],sternum:['mostek','m'],clavicle:['obojczyk','m'],scapula:['łopatka','f'],phalanx:['paliczek','m'],
 branch:['gałąź','f'],branches:['gałęzie','f'],trunk:['pień','m'],tree:['drzewo','n'],segment:['segment','m'],
 lobe:['płat','m'],lobule:['zrazik','m'],sector:['sektor','m'],wall:['ściana','f'],head:['głowa','f'],
 body:['trzon','m'],neck:['szyja','f'],side:['strona','f'],region:['okolica','f'],part:['część','f'],
 parts:['części','f'],set:['zespół','m'],group:['grupa','f'],system:['układ','m'],division:['dział','m'],
 component:['składnik','m'],cluster:['skupisko','n'],content:['zawartość','f'],cavity:['jama','f'],
 space:['przestrzeń','f'],fossa:['dół','m'],foramen:['otwór','m'],canal:['kanał','m'],incisure:['wcięcie','n'],
 ganglion:['zwoj','m'],plexus:['splot','m'],tract:['droga','f'],cord:['rdzeń','m'],gyrus:['zakręt','m'],
 sulcus:['bruzda','f'],cortex:['kora','f'],nucleus:['jądro','n'],capsule:['torebka','f'],commissure:['spoidło','n'],
 peduncle:['warkocz','m'],colliculus:['wzgórek','m'],aqueduct:['akwedukt','m'],ventricle:['komora','f'],
 hemisphere:['półkula','f'],organ:['narząd','m'],gland:['gruczoł','m'],duct:['przewód','m'],sac:['worek','m'],
 valve:['zastawka','f'],cusp:['płat','m'],leaflet:['płat','m'],chamber:['jama','f'],septum:['przegroda','f'],
 sinus:['zatoka','f'],atrium:['przedsionek','m'],eyeball:['gałka oczna','f'],eyelid:['powieka','f'],
 lens:['soczewka','f'],iris:['tęczówka','f'],cornea:['rogówka','f'],sclera:['twardówka','f'],retina:['siatkówka','f'],
 canaliculus:['kanalik','m'],eye:['oko','n'],ear:['ucho','n'],tongue:['język','m'],lip:['warga','f'],
 tooth:['ząb','m'],teeth:['zęby','f'],incisor:['siekacz','m'],canine:['kieł','m'],molar:['ząb trzonowy','m'],
 premolar:['ząb przedtrzonowy','m'],gingiva:['dziąsło','n'],palate:['podniebienie','n'],uvula:['języczek','m'],
 concha:['małżowina','f'],pharynx:['gardło','n'],larynx:['krtań','f'],epiglottis:['nagłośnia','f'],
 trachea:['tchawica','f'],bronchus:['oskrzele','n'],bronchi:['oskrzela','n'],lung:['płuco','n'],lungs:['płuca','n'],
 pleura:['opłucna','f'],diaphragm:['przepona','f'],thorax:['klatka piersiowa','f'],heart:['serce','n'],
 aorta:['aorta','f'],esophagus:['przełyk','m'],stomach:['żołądek','m'],liver:['wątroba','f'],
 gallbladder:['pęcherzyk żółciowy','m'],pancreas:['trzustka','f'],spleen:['śledziona','f'],
 intestine:['jelito','n'],duodenum:['dwunastnica','f'],jejunum:['jelito czcze','n'],ileum:['jelito kręte','n'],
 cecum:['kątnica','f'],colon:['okrężnica','f'],rectum:['odbytnica','f'],appendix:['wyrostek robaczkowy','m'],
 mesentery:['krezka','f'],peritoneum:['otrzewna','f'],omentum:['sieć','f'],kidney:['nerka','f'],
 ureter:['moczowód','m'],bladder:['pęcherz','m'],urethra:['cewka moczowa','f'],prostate:['prostata','f'],
 testis:['jądro','n'],epididymis:['najądrze','n'],penis:['prącie','m'],glans:['żołądź','f'],
 vesicle:['pęcherzyk','m'],skin:['skóra','f'],hair:['włos','m'],hairs:['włosy','f'],vessel:['naczynie','n'],
 anastomosis:['zespolenie','n'],brain:['mózg','m'],cerebellum:['móżdżek','m'],pons:['most','m'],
 hippocampus:['hipokamp','m'],thalamus:['wzgórze','n'],hypothalamus:['podwzgórze','n'],
 medulla:['rdzeń','m'],fornix:['sklepienie','n'],lamina:['blaszka','f'],raphe:['szew','m'],
 fascia_:['powięź','f'],retinaculum:['troczek','m'],sesamoid:['trzeszczka','f'],metacarpal:['kość śródręcza','f'],
 metatarsal:['kość śródstopia','f'],talus:['kość skokowa','f'],calcaneus:['kość piętowa','f'],
 navicular:['kość łódkowata','f'],cuboid:['kość sześcienna','f'],cuneiform:['kość klinowata','f'],
 capitate:['kość główkowata','f'],hamate:['kość haczykowata','f'],scaphoid:['kość łódeczkowata','f'],
 lunate:['kość księżycowata','f'],triquetral:['kość trójgraniasta','f'],pisiform:['kość grochowata','f'],
 trapezium:['kość czworoboczna większa','f'],trapezoid:['kość czworoboczna mniejsza','f'],
 femur:['kość udowa','f'],patella:['rzepka','f'],tibia:['kość piszczelowa','f'],fibula:['kość strzałkowa','f'],
 radius:['kość promieniowa','f'],ulna:['kość łokciowa','f'],humerus:['kość ramienna','f'],
 maxilla:['szczęka','f'],mandible:['żuchwa','f'],vomer:['lemiesz','m'],sphenoid:['kość klinowa','f'],
 ethmoid:['kość sitowa','f'],skull:['czaszka','f'],jaw:['szczęka','f'],sacrum:['kość krzyżowa','f'],
 coccyx:['kość guziczna','f'],hand:['ręka','f'],forearm:['przedramię','n'],arm:['ramię','n'],
 thigh:['udo','n'],leg:['podudzie','n'],foot:['stopa','f'],feet:['stopy','f'],finger:['palec','m'],
 toe:['palec u stopy','m'],thumb:['kciuk','m'],abdomen:['brzuch','m'],pelvis:['miednica','f'],
 perineum:['krocze','n'],back:['plecy','f'],shoulder:['bark','m'],buttock:['pośladek','m'],
 breast:['pierś','f'],tonsil:['migdałek','m'],membrane:['błona','f'],layer:['warstwa','f'],zone:['strefa','f'],
 compartment:['przedział','m'],ring:['pierścień','m'],arch:['łuk','m'],notch:['wcięcie','n'],
 tubercle:['guzek','m'],spine_:['wyrostek kolczysty','m'],column:['kolumna','f'],
 musculature:['mięśnie','f'],plexus_:['splot','m'],nuclei:['jądra','n'],gyri:['zakręty','m'],
 sulci:['bruzdy','f'],lobules:['zraziki','m'],sinuses:['zatoki','f'],ducts:['przewody','m'],
};

// ——— Adjectives: word → [m, f, n] ———
const ADJ:Record<string,[string,string,string]> = {
 right:['prawy','prawa','prawe'],left:['lewy','lewa','lewe'],anterior:['przedni','przednia','przednie'],
 posterior:['tylny','tylna','tylne'],superior:['górny','górna','górne'],inferior:['dolny','dolna','dolne'],
 lateral:['boczny','boczna','boczne'],medial:['przyśrodkowy','przyśrodkowa','przyśrodkowe'],
 middle:['środkowy','środkowa','środkowe'],intermediate:['pośredni','pośrednia','pośrednie'],
 internal:['wewnętrzny','wewnętrzna','wewnętrzne'],external:['zewnętrzny','zewnętrzna','zewnętrzne'],
 superficial:['powierzchowny','powierzchowna','powierzchowne'],deep:['głęboki','głęboka','głębokie'],
 proximal:['bliski','bliska','bliskie'],distal:['dalszy','dalsza','dalsze'],
 dorsal:['grzbietowy','grzbietowa','grzbietowe'],palmar:['dłoniowy','dłoniowa','dłoniowe'],
 plantar:['podeszwowy','podeszwowa','podeszwowe'],apical:['wierzchołkowy','wierzchołkowa','wierzchołkowe'],
 basal:['podstawny','podstawna','podstawne'],transverse:['poprzeczny','poprzeczna','poprzeczne'],
 oblique:['skośny','skośna','skośne'],marginal:['brzeżny','brzeżna','brzeżne'],
 ascending:['wstępujący','wstępująca','wstępujące'],descending:['zstępujący','zstępująca','zstępujące'],
 recurrent:['nawrotny','nawrotna','nawrotne'],terminal:['końcowy','końcowa','końcowe'],
 accessory:['dodatkowy','dodatkowa','dodatkowe'],supreme:['najwyższy','najwyższa','najwyższe'],
 major:['większy','większa','większe'],minor:['mniejszy','mniejsza','mniejsze'],
 proper:['własny','własna','własne'],common:['wspólny','wspólna','wspólne'],
 central:['centralny','centralna','centralne'],great:['wielki','wielka','wielkie'],
 little:['mały','mała','małe'],small:['mały','mała','małe'],large:['gruby','gruba','grube'],
 segmental:['segmentowy','segmentowa','segmentowe'],lobar:['płatowy','płatowa','płatowe'],
 venous:['żylny','żylna','żylne'],arterial:['tętniczy','tętnicza','tętnicze'],
 pulmonary:['płucny','płucna','płucne'],costal:['żebrowa','żebrowa','żebrowe'],cardiac:['sercowy','sercowa','sercowe'],
 hepatic:['wątrobowy','wątrobowe','wątrobowe'],gastric:['żołądkowy','żołądkowa','żołądkowe'],
 splenic:['śledzionowy','śledzionowa','śledzionowe'],renal:['nerkowy','nerkowa','nerkowe'],
 mesenteric:['krezkowy','krezkowa','krezkowe'],cystic:['pęcherzykowy','pęcherzykowa','pęcherzykowe'],
 pancreatic:['trzustkowy','trzustkowa','trzustkowe'],suprarenal:['nadnerczowy','nadnerczowa','nadnerczowe'],
 adrenal:['nadnerczowy','nadnerczowa','nadnerczowe'],bronchial:['oskrzelowy','oskrzelowa','oskrzelowe'],
 cervical:['szyjny','szyjna','szyjne'],thoracic:['piersiowy','piersiowa','piersiowe'],
 lumbar:['lędźwiowy','lędźwiowa','lędźwiowe'],sacral:['krzyżowy','krzyżowa','krzyżowe'],
 frontal:['czołowy','czołowa','czołowe'],occipital:['potyliczny','potyliczna','potyliczne'],
 temporal:['skroniowy','skroniowa','skroniowe'],parietal:['ciemieniowy','ciemieniowa','ciemieniowe'],
 femoral:['udowy','udowa','udowe'],iliac:['biodrowy','biodrowa','biodrowe'],
 brachial:['ramienny','ramienna','ramienne'],radial:['promieniowy','promieniowa','promieniowe'],
 ulnar:['łokciowy','łokciowa','łokciowe'],median:['pośrodkowy','pośrodkowa','pośrodkowe'],
 tibial:['piszczelowy','piszczelowa','piszczelowe'],peroneal:['strzałkowy','strzałkowa','strzałkowe'],
 fibular:['strzałkowy','strzałkowa','strzałkowe'],popliteal:['podkolanowy','podkolanowa','podkolanowe'],
 jugular:['szyjny','szyjna','szyjne'],subclavian:['obojczykowy','obojczykowa','obojczykowe'],
 axillary:['pachowy','pachowa','pachowe'],epigastric:['nadbrzuszny','nadbrzuszna','nadbrzuszne'],
 intercostal:['międzyżebrowy','międzyżebrowa','międzyżebrowe'],phrenic:['przeponowy','przeponowa','przeponowe'],
 thyroid:['tarczowy','tarczowa','tarczowe'],coronary:['wieńcowy','wieńcowa','wieńcowe'],
 maxillary:['szczękowy','szczękowa','szczękowe'],zygomatic:['jarzmowy','jarzmowa','jarzmowe'],
 palatine:['podniebienny','podniebienna','podniebienne'],lingual:['językowy','językowa','językowe'],
 submandibular:['podżuchwowy','podżuchwowa','podżuchwowe'],sublingual:['podjęzykowy','podjęzykowa','podjęzykowe'],
 parotid:['przyuszny','przyuszna','przyuszne'],meningeal:['oponowy','oponowa','oponowe'],
 auricular:['uszny','uszna','uszne'],nasal:['nosowy','nosowa','nosowe'],lacrimal:['łzowy','łzowa','łzowe'],
 ethmoidal:['sitowy','sitowa','sitowe'],mental:['bródkowy','bródkowa','bródkowe'],
 infraorbital:['podoczodołowy','podoczodołowa','podoczodołowe'],supraorbital:['nadoczodołowy','nadoczodołowa','nadoczodołowe'],
 thoracic_:['piersiowy','piersiowa','piersiowe'],gluteal:['pośladkowy','pośladkowa','pośladkowe'],
 pudendal:['kroczaowy','kroczaowa','kroczaowe'],sacral_:['krzyżowy','krzyżowa','krzyżowe'],
 colic:['okrężnicowy','okrężnicowa','okrężnicowe'],cecal:['kątniczy','kątnicza','kątnicze'],
 rectal:['odbytniczy','odbytnicza','odbytnicze'],ileal:['kręty','kręta','kręte'],
 ureteric:['moczowodowy','moczowodowa','moczowodowe'],testicular:['jądrowy','jądrowa','jądrowe'],
 spermatic:['nasieniowodowy','nasieniowodowa','nasieniowodowe'],deferent:['nasieniowodowy','nasieniowodowa','nasieniowodowe'],
 vaginal:['pochwowy','pochwowa','pochwowe'],interosseous:['międzykostny','międzykostna','międzykostne'],
 digital:['palcowy','palcowa','palcowe'],genicular:['kolanowy','kolanowa','kolanowe'],
 carpal:['nadgarstkowy','nadgarstkowa','nadgarstkowe'],tarsal:['stępowy','stępowa','stępowe'],
 circumflex:['okalający','okalająca','okalające'],basilar:['podstawny','podstawna','podstawne'],
 spinal:['kręgowy','kręgowa','kręgowe'],cranial:['czaszkowy','czaszkowa','czaszkowe'],
 urinary:['moczowy','moczowa','moczowe'],sagittal:['strzałkowy','strzałkowa','strzałkowe'],
 uterine:['maciczny','maciczna','maciczne'],sphenopalatine:['klinowo-podniebienny','klinowo-podniebienna','klinowo-podniebienne'],
 biliary:['żółciowy','żółciowa','żółciowe'],aortic:['aortowy','aortowa','aortowe'],
 scalene:['skalinowy','skalinowa','skalinowe'],scalenus:['skalinowy','skalinowa','skalinowe'],
 saphenous:['odpiszczelowy','odpiszczelowa','odpiszczelowe'],cavernous:['jamisty','jamista','jamiste'],
 cerebral:['mózgowy','mózgowa','mózgowe'],cerebellar:['móżdżkowy','móżdżkowa','móżdżkowe'],
 callosal:['spoidłowy','spoidłowa','spoidłowe'],ciliary:['rzęskowy','rzęskowa','rzęskowe'],
 conjunctival:['spojuwkowy','spojuwkowa','spojuwkowe'],vocal:['głosowy','głosowa','głosowe'],
 laryngeal:['krtaniowy','krtaniowa','krtaniowe'],pharyngeal:['gardłowy','gardłowa','gardłowe'],
 thoracoepigastric:['piersiowo-nadbrzuszny','piersiowo-nadbrzuszna','piersiowo-nadbrzuszne'],
 interventricular:['międzykomorowy','międzykomorowa','międzykomorowe'],
 subsegmental:['subsegmentowy','subsegmentowa','subsegmentowe'],inferomedial:['dolno-przyśrodkowy','dolno-przyśrodkowa','dolno-przyśrodkowe'],
 posteromedial:['tylno-przyśrodkowy','tylno-przyśrodkowa','tylno-przyśrodkowe'],
 anterolateral:['przednio-boczny','przednio-boczna','przednio-boczne'],
 frontobasal:['czołowo-podstawny','czołowo-podstawowa','czołowo-podstawowe'],
 precentral:['przedśrodkowy','przedśrodkowa','przedśrodkowe'],postcentral:['zaśrodkowy','zaśrodkowa','zaśrodkowe'],
 parahippocampal:['przyhipokampowy','przyhipokampowa','przyhipokampowe'],
 fusiform:['wrzecionowaty','wrzecionowata','wrzecionowate'],cingulate:['zakrętu obręczy','zakrętu obręczy','zakrętu obręczy'],
 insular:['wyspowy','wyspowe','wyspowe'],prefrontal:['przedczołowy','przedczołowa','przedczołowe'],
 occipital_:['potyliczny','potyliczna','potyliczne'],sphenoidal:['klinowy','klinowa','klinowe'],
 ethmoid:['sitowy','sitowa','sitowe'],tendinous:['ścięgnisty','ścięgnista','ścięgniste'],
 superficial_:['powierzchowny','powierzchowna','powierzchowne'],flexor:['zginacz','zginacza','zginacza'],upper:['górny','górna','górne'],lower:['dolny','dolna','dolne'],
 extensor:['prostownik','prostownika','prostownika'],
};

// ——— Numerals: word → [m, f, n] ———
const NUM:Record<string,[string,string,string]> = {
 first:['pierwszy','pierwsza','pierwsze'],second:['drugi','druga','drugie'],third:['trzeci','trzecia','trzecie'],
 fourth:['czwarty','czwarta','czwarte'],fifth:['piąty','piąta','piąte'],sixth:['szósty','szósta','szóste'],
 seventh:['siódmy','siódma','siódme'],eighth:['ósmy','ósma','ósme'],ninth:['dziewiąty','dziewiąta','dziewiąte'],
 tenth:['dziesiąty','dziesiąta','dziesiąte'],eleventh:['jedenasty','jedenasta','jedenaste'],
 twelfth:['dwunasty','dwunasta','dwunaste'],
};

// ——— Genitives for "of X" ———
const GEN:Record<string,string> = {
 liver:'wątroby',lung:'płuca',lungs:'płuc',heart:'serca',kidney:'nerki',kidneys:'nerek',brain:'mózgu',
 stomach:'żołądka',intestine:'jelita',pancreas:'trzustki',spleen:'śledziony',colon:'okrężnicy',
 duodenum:'dwunastnicy',rectum:'odbytnicy',bladder:'pęcherza',larynx:'krtani',pharynx:'gardła',
 tongue:'języka',eye:'oka',ear:'ucha',nose:'nosa',neck:'szyi',head:'głowy',skull:'czaszki',
 jaw:'szczęęki'.replace('ęę','ę'),foot:'stopy',hand:'ręki',thigh:'uda',arm:'ramienia',
 forearm:'przedramienia',leg:'podudzia',skin:'skóry',tooth:'zęba',teeth:'zębów',hip:'biodra',
 knee:'kolana',shoulder:'barku',chest:'klatki piersiowej',abdomen:'brzucha',pelvis:'miednicy',
 uterus:'macicy',face:'twarzy',mouth:'ust',trachea:'tchawicy',esophagus:'przełyku',
 aorta:'aorty',heart_:'serca',
};

const WORD_FALLBACK:Record<string,string> = {
 of:'',and:'i',in:'w',to:'do',with:'z',part:'część',structure:'struktura',anatomical:'anatomiczna',
 musculature:'mięśnie',tissue:'tkanka',plexus:'splot',apparatus:'aparat',body:'ciało',
 variant:'wariant',entity:'obiekt',material:'materiał',immaterial:'niematerialny',
 subdivisions:'podziały',contents:'zawartość',region:'okolica',regions:'okolice',
 // łacina anatomiczna — mięśnie i kości (odmiana przez przypadki w uproszczeniu)
 digitorum:'palców',digiti:'palca',pollicis:'kciuka',indicis:'wskaziciela',minimi:'małego',
 hallucis:'palucha',carpi:'nadgarstka',profundus:'głęboki',superficialis:'powierzchowny',
 flexor:'zginacz',extensor:'prostownik',abductor:'odwodziciel',adductor:'przywodziciel',
 opponens:'przeciwstawiacz',lumbrical:'głęboki',lumbricals:'głębokie',interossei:'międzykostne',
 longus:'długi',brevis:'krótki',magnus:'wielki',medius:'średni',maximus:'wielki',
 lateralis:'boczny',medialis:'przyśrodkowy',intermedius:'pośredni',rectus:'prosty',
 obliquus:'skośny',transversus:'poprzeczny',spinatus:'kolcowy',
 capitis:'głowy',colli:'szyi',cervicis:'szyi',thoracis:'klatki piersiowej',abdominis:'brzucha',
 lumborum:'lędźwi',scapulae:'łopatki',femoris:'uda',brachii:'ramienia',
 ani:'odbytu',oris:'ust',oculi:'oka',palpebrarum:'powiek',nasi:'nosy'.replace('nosy','nosu'),
 superioris:'górnej',inferioris:'dolnej',teres:'obły',piriformis:'gruszkowaty',
 gemellus:'bliźniaczy',quadratus:'czworoboczny',psoas:'lędźwiowy',iliacus:'biodrowy',
 scalenus:'skalinowy',splenius:'czepiec',longissimus:'najdłuższy',iliocostalis:'biodrowo-żebrowy',
 semispinalis:'półkolcowy',spinalis:'kolcowy',multifidus:'wielodzielny',
 semitendinosus:'półścięgnisty',semimembranosus:'półbłoniasty',biceps:'dwugłowy',triceps:'trójgłowy',
 gastrocnemius:'brzuchaty',soleus:'płaszczkowaty',plantaris:'podeszwowy',popliteus:'podkolanowy',
 tibialis:'piszczelowy',fibularis:'strzałkowy',peroneus:'strzałkowy',sartorius:'krawiecki',
 gracilis:'smukły',pectineus:'grzebieniowy',vastus:'obszerny',tensor:'napinacz',
 latae:'szerokiej',fasciae:'powięzi',pectoralis:'piersiowy',serratus:'zębaty',
 subscapularis:'podłopatkowy',supraspinatus:'ponadkolcowy',infraspinatus:'podkolcowy',
 teres_:'obły',rhomboid:'rombowy',levator:'dźwigacz',platysma:'szeroki szyi',
 digastric:'dwubrzuścowy',mylohyoid:'żuchwowo-gnykowy',geniohyoid:'bródkowo-gnykowy',
 sternohyoid:'mostkowo-gnykowy',sternothyroid:'mostkowo-tarczowy',thyrohyoid:'tarczowo-gnykowy',
 omohyoid:'łopatkowo-gnykowy',cricothyroid:'pierścienno-tarczowy',stylohyoid:'gnykowo-sutkowy',
 arytenoid:'nalewkowaty',aryepiglotticus:'nalewkowo-nagłośniowy',thyroarytenoid:'tarczowo-nalewkowy',
 vocalis:'głosowy',constrictor:'zwieracz',pharyngeus:'gardłowy',salpingopharyngeus:'trąbkowo-gardłowy',
 palatopharyngeus:'podniebiano-gardłowy',palatoglossus:'podniebiano-językowy',
 genioglossus:'bródkowo-językowy',hyoglossus:'gnykowo-językowy',styloglossus:'sutowo-językowy',
 uvulae:'języczka',ampulla:'bańka',infundibulum:'lejek',isthmus:'przesmyk',anus:'odbyt',
};

function sideSide(side:string|null,phrase:string|null,core:string,baseLowerSrc:string):string{
 if(!side)return core;
 // infer gender: first known noun in core, else head noun of the base, else feminine
 const g:G=(():G=>{
  for(const w of core.split(/\s+/)){const n=NOUN[w.toLowerCase()];if(n)return n[1];}
  for(const w of baseLowerSrc.split(/\s+/).reverse()){const n=NOUN[w.toLowerCase()];if(n)return n[1];}
  return 'f';
 })();
 const form=gForm(ADJ[side],g)??side;
 // Polish: adjective precedes head noun ('lewa żyła płucna'), else postfix ('płuco lewe')
 const words=core.split(/\s+/);
 const headFirst=NOUN[words[0].toLowerCase()]!==undefined;
 return headFirst?[form,...words].join(' '):[...words,form].join(' ');
}

const PHRASE_KEYS=Object.keys(PHRASES).sort((a,b)=>b.length-a.length);
const TOKEN=/[A-Za-z]+/g;

function gForm(entry:[string,string,string]|undefined,g:G):string|undefined{
 if(!entry)return undefined;return g==='m'?entry[0]:g==='f'?entry[1]:entry[2];
}
/** Translate one name. Head noun goes first, modifiers follow in reverse order, gender-inflected. */
export function plName(name:string):string{
 const trimmed=name.trim();if(!trimmed)return trimmed;
 const lower=trimmed.toLowerCase();
 // 0) leading Left/Right pulled out and appended with gender of the phrase result? Simpler: append as prefix words after translation (Polish anatomy accepts 'lewa żyła płucna').
 const sideMatch=lower.match(/^(left|right)\s+(.*)$/);
 const side=sideMatch?sideMatch[1]:null;
 const base=sideMatch?sideMatch[2]:trimmed;
 const baseLower=base.toLowerCase();
 // 1) fixed phrases (on base without side prefix)
 for(const p of PHRASE_KEYS){
  if(baseLower===p)return sideSide(side,p,PHRASES[p],base);
  const idx=baseLower.indexOf(p);
  if(idx>=0){
   const before=trimmed.slice(0,idx),after=trimmed.slice(idx+p.length);
   if(!/[A-Za-z]$/.test(before)&&!/^[A-Za-z]/.test(after)){
    const rest=plName(after).trim();
    const core=(!rest||/^(mięsień|kość|żebro|zęb[ay]|błona)$/i.test(rest))?PHRASES[p]:[PHRASES[p],rest].join(' ');
    return sideSide(side,p,core,base);
   }
  }
 }
 // 2) "X of Y" → X + genitive(Y)
 const ofIdx=baseLower.indexOf(' of ');
 if(ofIdx>0){
  const left=base.slice(0,ofIdx),right=base.slice(ofIdx+4);
  const rw=right.toLowerCase().match(TOKEN);
  const genKey=rw?rw[rw.length-1]:null;
  const gen=genKey?GEN[genKey]:null;
  if(gen)return `${plName(left)} ${gen}`.replace(/\s+/g,' ').trim();
 }
 // 3) [modifiers] head-noun
 const words=base.match(TOKEN);
 if(!words)return trimmed;
 // pattern like "X bone" where X is itself a bone noun → single Polish noun
 const lowerWords=words.map(w=>w.toLowerCase());
 if(lowerWords[lowerWords.length-1]==='bone'){
  const stem=lowerWords.slice(0,-1).join(' ');
  if(NOUN[stem])return NOUN[stem][0];
 }
 // pattern like "X muscle" where X is a latin muscle name → "mięsień X"
 if(lowerWords[lowerWords.length-1]==='muscle'){
  const stem=base.slice(0,base.length-6).trim();
  const inner=plName(stem);
  if(!/\bmięsień\b/.test(inner))return `mięsień ${inner}`.replace(/\s+/g,' ').trim();
  return inner.replace(/\s+mięsień\s+/g,' ').trim();
 }
 // drop redundant trailing "bone"/"tooth" already folded into the head noun
 if(lowerWords.length>1&&(lowerWords[lowerWords.length-1]==='bone'||lowerWords[lowerWords.length-1]==='tooth')){
  const stem=base.slice(0,base.lastIndexOf(' '));
  const translated=plName(stem);
  if(translated.toLowerCase()!==stem.toLowerCase())return translated;
 }
 let headIdx=-1,head:[string,G]|undefined;
 for(let i=words.length-1;i>=0;i--){const n=NOUN[words[i].toLowerCase()];if(n){headIdx=i;head=n;break;}}
 if(headIdx>=0&&head){
  const [headPl,g]=head;
  const mods:string[]=[];
  for(let i=headIdx-1;i>=0;i--){const w=words[i].toLowerCase();
   const a=gForm(ADJ[w],g)??gForm(NUM[w],g);
   mods.push(a??plainWord(words[i]));}
  const tail=words.slice(headIdx+1).map(plainWord).join(' ');
  const core=[headPl,...mods,tail].filter(Boolean).join(' ').replace(/\s+/g,' ').trim();
  return sideSide(side,null,core,base);
 }
 // 4) word-by-word fallback
 return postProcess(words.map(plainWord).join(' '));
}
function postProcess(s:string):string{
 let out=s.replace(/\s+/g,' ').trim();
 // dedupe immediately repeated noun: "kość kość śródręcza" → "kość śródręcza"
 out=out.replace(/(^|\s)([\p{L}]+) (?=\s|$)/gu,'$1$2');
 // strip a dangling trailing head-word echo: "... przedni mięsień"
 out=out.replace(/\s+mięsień$/u,'');
 // lowercase first letter when the rest starts lowercase (plName keeps source casing)
 out=out.charAt(0).toLowerCase()+out.slice(1);
 return out;
}
function plainWord(w:string):string{
 const lower=w.toLowerCase();
 const hit=WORD_FALLBACK[lower];
 if(hit!==undefined)return capitalizeLike(w,hit);
 const n=NOUN[lower];if(n)return capitalizeLike(w,n[0]);
 const a=ADJ[lower];if(a)return capitalizeLike(w,a[0]);
 const num=NUM[lower];if(num)return capitalizeLike(w,num[0]);
 return w;
}
function capitalizeLike(src:string,target:string){return /^[A-Z]/.test(src)?target.charAt(0).toUpperCase()+target.slice(1):target;}
