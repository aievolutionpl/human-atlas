export type Lang='pl'|'en';
export const DEFAULT_LANG:Lang='pl';
type Bi={pl:string;en:string};
export const UI:{
 tagline:Bi; metaPieces:Bi; findStructure:Bi; searchAria:Bi; aboutAria:Bi;
 searchPlaceholder:Bi; searchEmpty:Bi; piece:Bi; pieces:Bi;
 searchHintQuery:Bi; searchHintStart:Bi;
 systems:Bi; presetAll:Bi; presetSkeleton:Bi; presetOrgans:Bi;
 showOnly:Bi; showSystem:Bi; piecesVisible:Bi; hideAll:Bi;
 viewThreeQuarter:Bi; viewFront:Bi; viewSide:Bi; viewBack:Bi; viewSuffix:Bi;
 pauseRotation:Bi; rotateBody:Bi; autoRotate:Bi; resetView:Bi; reset:Bi;
 captionSelected:Bi; captionInventory:Bi; captionSeparated:Bi; captionAdult:Bi;
 explode:Bi; assembled:Bi; everyPiece:Bi;
 dragOrbit:Bi; dragPan:Bi; pinchZoom:Bi; tapInspect:Bi; sourceCredits:Bi;
 loadingTitle:Bi; loadingPieces:Bi; catalogueError:Bi; reloadViewer:Bi;
 anatomyFallback:Bi; atlasRef:Bi; selectedPieces:Bi; includedStructures:Bi;
 morePieces:Bi; viewSource:Bi; contextNote:Bi;
 isolate:Bi; showSurrounding:Bi; clearSelection:Bi;
 aboutEyebrow:Bi; aboutTitle:Bi; aboutDesc:Bi;
 aboutP1:Bi; aboutP2:Bi; aboutP3:Bi; sourceHeading:Bi; sourceBody:Bi;
 datasetLicense:Bi; originalData:Bi; sourcePublication:Bi;
 madeBy:Bi; langToggleAria:Bi; sceneErrorWebgl:Bi; sceneErrorLoad:Bi; sceneErrorContext:Bi;
 organGallery:Bi; organGalleryDesc:Bi; backToBody:Bi; openOrgan:Bi;
 regions:Bi; regionAll:Bi; animLabel:Bi; animExplode:Bi; animAssemble:Bi;
 zoomIn:Bi; zoomOut:Bi; viewPanel:Bi; viewPresets:Bi; vpDefault:Bi; vpHead:Bi; vpChest:Bi; vpPelvis:Bi; vpLegs:Bi;
 fxLabel:Bi; fxXray:Bi; fxLabels:Bi; fxSpin:Bi; fxQuality:Bi; qLow:Bi; qHigh:Bi;
 centerBody:Bi; focusSel:Bi; fxGlow:Bi;
 randomStructure:Bi; fullscreen:Bi; exitFullscreen:Bi; visitSite:Bi; footerBrand:Bi;
 lighting:Bi; exposure:Bi; lightKey:Bi; lightRim:Bi; lightAmbient:Bi; lightSoft:Bi; lightStd:Bi; lightStudio:Bi;
}={
  tagline:{pl:'INTERAKTYWNA ANATOMIA',en:'INTERACTIVE ANATOMY'},
  metaPieces:{pl:'zmodelowanych elementów',en:'modeled pieces'},
  findStructure:{pl:'Znajdź strukturę',en:'Find a structure'},
  searchAria:{pl:'Szukaj struktur anatomicznych',en:'Search anatomy'},
  aboutAria:{pl:'O tym atlasie',en:'About this atlas'},
  searchPlaceholder:{pl:'Serce, kość udowa, nerw czaszkowy…',en:'Heart, femur, cranial nerve…'},
  searchEmpty:{pl:'Brak struktur spełniających kryteria.',en:'No structures match your search.'},
  piece:{pl:'element',en:'piece'},pieces:{pl:'elementów',en:'pieces'},
  searchHintQuery:{pl:'Wyświetlam do 80 wyników. Doprecyzuj wyszukiwanie, aby znaleźć mniejsze struktury.',en:'Showing up to 80 matches. Refine your search to find smaller structures.'},
  searchHintStart:{pl:'Zacznij od głównego narządu albo przeszukaj wszystkie nazwane struktury.',en:'Start with a major organ, or search every named structure.'},
  systems:{pl:'Układy',en:'Systems'},
  presetAll:{pl:'Wszystko',en:'All'},presetSkeleton:{pl:'Szkielet',en:'Skeleton'},presetOrgans:{pl:'Narządy',en:'Organs'},
  showOnly:{pl:'Pokaż tylko: {x}',en:'Show only {x}'},showSystem:{pl:'Pokaż: {x}',en:'Show {x}'},
  piecesVisible:{pl:'elementów widocznych',en:'pieces visible'},
  hideAll:{pl:'Ukryj wszystko',en:'Hide all'},
  viewThreeQuarter:{pl:'¾',en:'three-quarter'},viewFront:{pl:'przód',en:'front'},viewSide:{pl:'bok',en:'side'},viewBack:{pl:'tył',en:'back'},viewSuffix:{pl:'widok',en:'view'},
  pauseRotation:{pl:'Zatrzymaj obrót',en:'Pause rotation'},rotateBody:{pl:'Obróć ciało',en:'Rotate body'},autoRotate:{pl:'Autoobrót',en:'Auto rotate'},
  resetView:{pl:'Reset widoku i warstw',en:'Reset view and layers'},reset:{pl:'Reset',en:'Reset'},
  captionSelected:{pl:'WYBRANA STRUKTURA',en:'SELECTED STRUCTURE'},
  captionInventory:{pl:'INWENTARZ ANATOMICZNY',en:'ANATOMICAL INVENTORY'},
  captionSeparated:{pl:'RODZIELONE STRUKTURY',en:'SEPARATED STRUCTURES'},
  captionAdult:{pl:'CZŁOWIEK DOROSŁY · MĘŻCZYZNA',en:'ADULT HUMAN · MALE'},
  explode:{pl:'Rozsuń anatomię',en:'Explode anatomy'},
  assembled:{pl:'Złożone',en:'Assembled'},everyPiece:{pl:'Każdy element',en:'Every piece'},
  dragOrbit:{pl:'Przeciągnij, aby obracać',en:'Drag to orbit'},dragPan:{pl:'Przeciągnij, aby przesuwać',en:'Drag to pan'},
  pinchZoom:{pl:'uszczypnij, aby przybliżyć',en:'Pinch to zoom'},tapInspect:{pl:'kliknij, aby obejrzeć',en:'Tap to inspect'},
  sourceCredits:{pl:'Źródła i licencje',en:'Source & credits'},
  loadingTitle:{pl:'Przygotowanie anatomii',en:'Preparing the anatomy'},
  loadingPieces:{pl:'Wczytywanie {n} elementów',en:'Loading {n} pieces'},
  catalogueError:{pl:'Nie udało się wczytać katalogu anatomii.',en:'The anatomy catalogue could not be loaded.'},
  reloadViewer:{pl:'Odśwież podgląd',en:'Reload viewer'},
  anatomyFallback:{pl:'ANATOMIA',en:'ANATOMY'},
  atlasRef:{pl:'Identyfikator atlasu',en:'Atlas reference'},
  selectedPieces:{pl:'Wybrane elementy',en:'Selected pieces'},
  includedStructures:{pl:'Struktury wchodzące w skład',en:'Included structures'},
  morePieces:{pl:'I jeszcze {n} zmodelowanych elementów.',en:'And {n} more modeled pieces.'},
  viewSource:{pl:'Źródło danych anatomicznych',en:'View anatomical source'},
  contextNote:{pl:'Opis układu · struktura zidentyfikowana na podstawie danych źródłowych',en:'System overview · structure identified from source anatomy'},
  isolate:{pl:'Izoluj strukturę',en:'Isolate structure'},showSurrounding:{pl:'Pokaż otaczającą anatomię',en:'Show surrounding anatomy'},
  clearSelection:{pl:'Wyczyść wybór',en:'Clear selection'},
  aboutEyebrow:{pl:'ŹRÓDŁA I ZAKRES',en:'SOURCE & SCOPE'},
  aboutTitle:{pl:'Ciało. Odsłonięte.',en:'A body, revealed.'},
  aboutDesc:{pl:'Odkrywaj referencyjną anatomię dorosłego mężczyzny z bazy BodyParts3D.',en:'Explore the adult male reference anatomy from BodyParts3D.'},
  aboutP1:{pl:'Mężczyzna · BodyParts3D<br/>2 234 pojedynczych siatek 3D i 3 432 nazwane pojęcia z referencyjnej anatomii dorosłego mężczyzny.',en:'Male · BodyParts3D<br/>2,234 individual meshes and 3,432 named concepts from an adult male reference anatomy.'},
  aboutP2:{pl:'Ten model nie zawiera każdej struktury i każdej wariacji ludzkiego ciała. Nazwane pojęcia mogą obejmować wiele elementów; każda siatka źródłowa jest renderowana raz.',en:'This reference does not contain every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.'},
  aboutP3:{pl:'Kolory i podział na układy służą eksploracji. Geometria została uproszczona dla przeglądarki, a krótkie opisy mają charakter wyłącznie edukacyjny. To atlas anatomiczny, nie narzędzie diagnostyczne ani chirurgiczne.',en:'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.'},
  sourceHeading:{pl:'Źródło',en:'Source'},
  sourceBody:{pl:'BodyParts3D, © The Database Center for Life Science, licencja CC BY 4.0 International.',en:'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.'},
  datasetLicense:{pl:'Licencja zbioru danych',en:'Dataset license'},
  originalData:{pl:'Oryginalna geometria i metadane',en:'Original geometry & metadata'},
  sourcePublication:{pl:'Publikacja źródłowa',en:'Read the source publication'},
  madeBy:{pl:'produkt firmy',en:'a product by'},
  langToggleAria:{pl:'Zmień język',en:'Switch language'},
  sceneErrorWebgl:{pl:'Ta przeglądarka nie uruchomiła podglądu 3D. Spróbuj przeglądarki z włączonym WebGL.',en:'This browser could not start the 3D viewer. Please try a browser with WebGL enabled.'},
  sceneErrorLoad:{pl:'Nie udało się wczytać anatomii.',en:'Could not load the anatomy.'},
  sceneErrorContext:{pl:'Sesja 3D została wstrzymana przez urządzenie. Odśwież stronę, aby kontynuować.',en:'The 3D session was paused by your device. Reload to continue.'},
  organGallery:{pl:'Organy',en:'Organs'},
  organGalleryDesc:{pl:'Wybierz narząd, aby ujrzeć go na ciele i przeczytać opis.',en:'Pick an organ to locate it on the body and read its description.'},
  backToBody:{pl:'Wróć do ciała',en:'Back to body'},openOrgan:{pl:'Otwórz',en:'Open'},
  regions:{pl:'Regiony ciała',en:'Body regions'},regionAll:{pl:'Całe ciało',en:'Whole body'},
  animLabel:{pl:'Animacja',en:'Animation'},animExplode:{pl:'Rozsuń',en:'Explode'},animAssemble:{pl:'Złóż',en:'Assemble'},
  zoomIn:{pl:'Przybliż',en:'Zoom in'},zoomOut:{pl:'Oddal',en:'Zoom out'},viewPanel:{pl:'Widok',en:'View'},viewPresets:{pl:'Zarządzanie widokiem',en:'View controls'},
  vpDefault:{pl:'Standard',en:'Default'},vpHead:{pl:'Głowa',en:'Head'},vpChest:{pl:'Klatka',en:'Chest'},vpPelvis:{pl:'Miednica',en:'Pelvis'},vpLegs:{pl:'Nogi',en:'Legs'},
  fxLabel:{pl:'Efekty',en:'Effects'},fxXray:{pl:'Rentgen',en:'X-ray'},fxLabels:{pl:'Etykiety',en:'Labels'},fxSpin:{pl:'Obrót',en:'Spin'},fxQuality:{pl:'Jakość',en:'Quality'},qLow:{pl:'Niska',en:'Low'},qHigh:{pl:'Wysoka',en:'High'},
  centerBody:{pl:'Wyśrodkuj',en:'Center body'},focusSel:{pl:'Przybliż zaznaczone',en:'Focus selection'},fxGlow:{pl:'Poświata',en:'Glow'},
  randomStructure:{pl:'Losowa struktura',en:'Random structure'},fullscreen:{pl:'Pełny ekran',en:'Fullscreen'},exitFullscreen:{pl:'Zamknij pełny ekran',en:'Exit fullscreen'},
  visitSite:{pl:'aievolutionpolska.pl',en:'aievolutionpolska.pl'},footerBrand:{pl:'AI EVOLUTION POLSKA',en:'AI EVOLUTION POLSKA'},
  lighting:{pl:'Oświetlenie',en:'Lighting'},exposure:{pl:'Ekspozycja',en:'Exposure'},
  lightKey:{pl:'Światło główne',en:'Key light'},lightRim:{pl:'Światło tylne',en:'Rim light'},lightAmbient:{pl:'Wypełnienie',en:'Fill light'},
  lightSoft:{pl:'Miękkie',en:'Soft'},lightStd:{pl:'Standard',en:'Standard'},lightStudio:{pl:'Kontrast',en:'Contrast'},
 };
export function t(key: keyof typeof UI,lang:Lang):string{return UI[key][lang];}
export function tf(key: keyof typeof UI,lang:Lang,vars:Record<string,string|number>):string{let s=UI[key][lang];for(const[k,v]of Object.entries(vars))s=s.replaceAll(`{${k}}`,String(v));return s;}
// Anatomical structure names in the dataset keep their source nomenclature (Latin/English),
// which matches how Polish anatomy references name these structures.
