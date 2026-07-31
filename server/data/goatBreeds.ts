/**
 * FarmLens AI - Goat Breed Knowledge Base
 * Structured recognition knowledge layer covering 50 key goat breeds, commercial lines, fiber producers, and indigenous African/global types.
 */

export type GoatType = 'Meat' | 'Dairy' | 'Fiber' | 'Dual-purpose' | 'Local' | 'Other';

export interface GoatBreedEntry {
  name: string;
  type: GoatType;
  keyVisualCharacteristics: string[];
  importantDistinguishingFeatures: string[];
  commonConfusions: string[];
  identificationCaution: string;
  breedStatus: 'Distinct breed' | 'Local breed/type' | 'Regional population' | 'Crossbreed/common hybrid';
}

export const GOAT_BREEDS: GoatBreedEntry[] = [
  // --- AFRICAN INDIGENOUS & MEAT BREEDS ---
  {
    name: 'West African Dwarf',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Small, compact body frame with short legs and low stature',
      'Short, coarse coat with wide variation in colors (black, brown, white, pied, dark chocolate)',
      'Short to medium horizontal ears',
      'Short, thick, backward-curving horns in both sexes',
      'Compact head with straight facial profile',
      'Short upright tail'
    ],
    importantDistinguishingFeatures: [
      'Distinctively short leg length relative to body depth (achondroplasic dwarfism)',
      'Compact, stocky, low-to-the-ground body carriage',
      'Strong, hardy tropical build resistant to trypanosomiasis'
    ],
    commonConfusions: ['Nigerian Dwarf', 'Pygmy Goat', 'Local West African Crossbreds'],
    identificationCaution: 'Do not identify West African Dwarf from coat color alone. Coat color is highly variable. Must confirm small compact size, short legs, and body proportions.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Anglo-Nubian (Nubian)',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Large, tall frame with long sturdy legs',
      'Distinctive long, wide, pendulous (drooping) ears hanging close to the head and extending past the muzzle',
      'Strongly convex facial profile ("Roman nose")',
      'Short glossy coat, highly variable in color and markings (spotted, patched, brown, black, white)',
      'Horns may be present or polled'
    ],
    importantDistinguishingFeatures: [
      'Long pendulous ears reaching past the mouth',
      'Pronounced convex Roman nose head profile',
      'Tall, leggy, large-bodied dual-purpose build'
    ],
    commonConfusions: ['Damascus Goat', 'Jamnapari', 'Boer (head profile)', 'Local Lop-Eared Crosses'],
    identificationCaution: 'Do not identify as Anglo-Nubian if ears are erect or medium length. Long drooping ears AND Roman nose profile are required for high confidence.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Boer',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Heavy, blocky, highly muscular body frame with broad chest',
      'Distinctive white body with reddish-brown to dark red head and neck',
      'Medium-to-long pendulous drooping ears',
      'Strong, backward-curving horns',
      'Roman nose facial profile'
    ],
    importantDistinguishingFeatures: [
      'Classic reddish-brown head/neck contrasting with a white body',
      'Heavy, thick-set meat conformation with deep muscular quarters',
      'Downward hanging ears'
    ],
    commonConfusions: ['Kalahari Red (solid red)', 'Savanna (solid white)', 'Boer crossbreds'],
    identificationCaution: 'While the white body with brown head is iconic, crossbreds often show partial patterns. Heavy meat body width and drooping ears are crucial.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Red Sokoto (Maradi)',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Uniform deep red to dark chestnut coat',
      'Short, fine, glossy hair',
      'Medium build with good proportions',
      'Short to medium horizontal ears',
      'Short, backward-pointing horns in both sexes',
      'Straight facial profile'
    ],
    importantDistinguishingFeatures: [
      'Deep, uniform red leather-quality coat without white patches',
      'Medium size, native to Northern Nigeria and Niger Republic',
      'Compact, neat head and horn structure'
    ],
    commonConfusions: ['Kalahari Red', 'Red West African Local Goats', 'Boer cross'],
    identificationCaution: 'Do not label any red goat as Red Sokoto. Must evaluate indigenous Northern Nigerian medium build and solid red coat tone.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Sahelian (West African Long-Legged)',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Very tall, leggy frame with slender body',
      'Short hair, highly variable color (white, spotted, brown, black, grey)',
      'Medium pendulous or semi-pendulous ears',
      'Long twisted or backward-curving horns',
      'Shallow chest and lean body'
    ],
    importantDistinguishingFeatures: [
      'Extremely long legs and high ground clearance adapted for desert grazing',
      'Slender, narrow body frame',
      'Native to Sahelian arid zones of West Africa'
    ],
    commonConfusions: ['Balami (sheep)', 'Red Sokoto (tall crosses)', 'Anglo-Nubian crosses'],
    identificationCaution: 'Check body depth vs leg length. Sahelian goats have very long legs and light body weight compared to compact dwarf breeds.',
    breedStatus: 'Regional population'
  },
  {
    name: 'Kalahari Red',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Entirely red or dark red coat',
      'Heavy muscular meat build',
      'Fully pigmented skin (dark hide under red hair)',
      'Medium-to-long pendulous ears',
      'Strong backward horns'
    ],
    importantDistinguishingFeatures: [
      'Solid dark red coat color over entire body',
      'Heavy South African meat conformation similar to Boer structure',
      'Pendulous ears'
    ],
    commonConfusions: ['Red Sokoto', 'Boer (red head)', 'Red Boer cross'],
    identificationCaution: 'Kalahari Red is larger and heavier-set than Red Sokoto, with longer pendulous ears.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Savanna (White South African Meat Goat)',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Solid white coat with black pigmented skin, horns, and hooves',
      'Heavy, muscular frame',
      'Medium pendulous ears',
      'Strong backward-curving horns',
      'Vigorous, rustic body conformation'
    ],
    importantDistinguishingFeatures: [
      'All-white coat paired with dark black skin pigmentation',
      'Boer-like heavy muscular frame',
      'Hardy South African commercial meat breed'
    ],
    commonConfusions: ['White Boer', 'Saanen (dairy)', 'Kiko'],
    identificationCaution: 'Saanen is a lean dairy goat with erect ears; Savanna is a heavy meat goat with pendulous ears and black skin.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Small East African / East African Dwarf',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Compact to medium size with fine legs',
      'Short hair, coat color highly variable (black, brown, spotted, piebald)',
      'Short erect or horizontal ears',
      'Short horns pointing backward'
    ],
    importantDistinguishingFeatures: [
      'Widespread indigenous East African scavenging goat',
      'Fine bone structure, highly hardy and drought tolerant'
    ],
    commonConfusions: ['West African Dwarf', 'Mubende', 'Local East African Cross'],
    identificationCaution: 'Slightly longer legs than West African Dwarf; evaluate regional provenance.',
    breedStatus: 'Local breed/type'
  },
  {
    name: 'Somali (Galla / Boran Goat)',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Pure white short coat (sometimes with reddish/black head and neck trim)',
      'Tall, leggy body with good depth',
      'Short, medium ears pointing forward',
      'Black pigmented skin under white coat',
      'Medium curved horns'
    ],
    importantDistinguishingFeatures: [
      'White coat with dark skin, adapted to Horn of Africa arid rangelands',
      'Tall, leggy frame larger than Small East African'
    ],
    commonConfusions: ['Savanna', 'Sahelian', 'Saanen'],
    identificationCaution: 'Check ear structure and leg length. Galla ears are short and erect/horizontal, not pendulous.',
    breedStatus: 'Regional population'
  },
  {
    name: 'Mubende',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Medium to large frame with deep body',
      'Predominantly clean black or dark brown hair',
      'Straight back line',
      'Short erect ears',
      'Strong horns'
    ],
    importantDistinguishingFeatures: [
      'Ugandan indigenous meat breed known for high quality leather',
      'Deep black coat on medium-large frame'
    ],
    commonConfusions: ['Black Bengal', 'Small East African', 'West African Dwarf'],
    identificationCaution: 'Larger leg length and body mass than West African Dwarf.',
    breedStatus: 'Regional population'
  },
  {
    name: 'Keffa / Ethiopian Highland Goat',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Thick hair coat, often dark brown, black, or variegated',
      'Compact, stocky body adapted to cold mountain climates',
      'Short erect ears',
      'Heavy horns'
    ],
    importantDistinguishingFeatures: [
      'Thicker fleece/coat suited for high altitudes in Ethiopia',
      'Stocky mountain build'
    ],
    commonConfusions: ['Small East African', 'Local Highland Crosses'],
    identificationCaution: 'Evaluate hair thickness and mountain origin context.',
    breedStatus: 'Local breed/type'
  },
  {
    name: 'Sudanese Nubian / Desert Goat',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Tall frame with long legs',
      'Long drooping pendulous ears',
      'Convex Roman nose profile',
      'Variable coat colors (black, tan, brown, patched)',
      'Large udder in lactating females'
    ],
    importantDistinguishingFeatures: [
      'Ancestral stock of the Anglo-Nubian breed',
      'Long drooping ears combined with drought-adapted arid build'
    ],
    commonConfusions: ['Anglo-Nubian', 'Sahelian', 'Damascus'],
    identificationCaution: 'Very similar to Anglo-Nubian; context and local African origin are relevant.',
    breedStatus: 'Regional population'
  },

  // --- GLOBAL DAIRY BREEDS ---
  {
    name: 'Saanen',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Large, elegant dairy frame',
      'Solid white to light cream coat',
      'Short fine hair',
      'Erect or forward-pointing medium ears',
      'Straight or slightly dished facial profile',
      'Well-developed dairy udder in females'
    ],
    importantDistinguishingFeatures: [
      'Pure white/cream color without dark spots',
      'Erect ears pointing forward',
      'Lean, wedge-shaped dairy body conformation'
    ],
    commonConfusions: ['White Alpine', 'Appenzell Goat', 'Savanna (meat)', 'White Local Goats'],
    identificationCaution: 'Do not label any white goat as Saanen. Check erect ear orientation and dairy wedge body profile.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'French Alpine',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Medium to large angular dairy build',
      'Variable classic patterns (e.g. Cou Blanc - white front, black rear; Cou Noir; Sundgau)',
      'Erect ears pointing forward',
      'Straight facial profile',
      'Short hair'
    ],
    importantDistinguishingFeatures: [
      'Distinctive multi-tone coat patterns with erect ears',
      'Angular, high-yielding dairy wedge conformation'
    ],
    commonConfusions: ['Toggenburg', 'Oberhasli', 'Local dairy crosses'],
    identificationCaution: 'Erect ears are essential. Check for classic French Alpine color markings.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Toggenburg',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Solid coat color ranging from light fawn to dark chocolate',
      'Distinct white facial stripes from eyes to muzzle',
      'White ears with dark spot in middle',
      'White lower legs and white triangle on each side of tail',
      'Erect, forward-pointing ears'
    ],
    importantDistinguishingFeatures: [
      'White facial stripes and white lower leg stockings on brown body',
      'Erect ears with white trim',
      'Swiss dairy frame'
    ],
    commonConfusions: ['British Alpine', 'Oberhasli'],
    identificationCaution: 'White facial stripes and leg markings are diagnostic for Toggenburg.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'American LaMancha',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Unique external ear reduction: "gopher ears" (max 1 inch, little to no cartilage) or "elf ears" (max 2 inches)',
      'Straight facial profile',
      'Short fine hair, any color combination allowed',
      'Lean dairy body conformation'
    ],
    importantDistinguishingFeatures: [
      'Apparent absence of external ears (gopher or elf ear mutation)',
      'Smooth, sleek dairy profile'
    ],
    commonConfusions: ['Earless crossbreds', 'Other dairy breeds'],
    identificationCaution: 'Extremely short pinnae (ears) are diagnostic for LaMancha.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Nigerian Dwarf',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Miniature dairy goat frame (proportionate, non-achondroplasic)',
      'Refined, lean dairy body carriage (unlike stocky Pygmy)',
      'Erect medium ears',
      'Straight facial profile',
      'Wide color variation (gold, chocolate, black, buckskin, chamoisee, spotted)',
      'Blue eyes common in some lines'
    ],
    importantDistinguishingFeatures: [
      'Proportionate miniature dairy build with longer legs relative to body than West African Dwarf',
      'Erect ears and refined dairy neck/udder'
    ],
    commonConfusions: ['West African Dwarf', 'Pygmy Goat', 'Mini-Alpine'],
    identificationCaution: 'Distinguish from Pygmy (which is heavy/cobby) and West African Dwarf (which has shorter stockier legs).',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Oberhasli',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Distinctive bay color ("chamoisée") ranging from light reddish-brown to deep mahogany',
      'Black facial stripes, black dorsal stripe, black belly, black lower legs',
      'Erect ears',
      'Straight facial profile'
    ],
    importantDistinguishingFeatures: [
      'Rich reddish-bay coat with black dorsal stripe and black face markings',
      'Swiss dairy frame with erect ears'
    ],
    commonConfusions: ['French Alpine (Chamoisée pattern)', 'Toggenburg'],
    identificationCaution: 'Check black facial stripes and dorsal line over bay coat.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Golden Guernsey',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Golden to pale bronze coat color',
      'Medium hair length, often with longer fringe along spine and legs',
      'Fine bone structure',
      'Erect or slightly horizontal ears',
      'Straight facial profile'
    ],
    importantDistinguishingFeatures: [
      'Rich golden hue across the entire body',
      'Delicate, smaller dairy frame compared to Saanen'
    ],
    commonConfusions: ['Fawn Alpine', 'Golden Guernsey cross'],
    identificationCaution: 'Golden coat tone and refined bone structure aid identification.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Sable Saanen',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Identical Saanen dairy conformation and erect ears',
      'Non-white coat color (derived from recessive color genes in Saanen heritage)'
    ],
    importantDistinguishingFeatures: [
      'Saanen dairy frame with colored coat (black, brown, cream, grey)'
    ],
    commonConfusions: ['Alpine', 'Saanen (white)'],
    identificationCaution: 'Classified separately from Saanen due to colored coat.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Murciana-Granadina (Spanish Dairy Goat)',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Solid black or solid mahogany-red coat',
      'Short hair (males have longer back hair)',
      'Medium erect ears',
      'Compact, high-yielding dairy udder'
    ],
    importantDistinguishingFeatures: [
      'Uniform dark black or mahogany shade without white spots',
      'Spanish Mediterranean dairy breed'
    ],
    commonConfusions: ['Black Alpine', 'Mubende'],
    identificationCaution: 'Solid dark coat with high-yielding dairy udder structure.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Majorera (Canary Islands Dairy Goat)',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Large, leggy frame',
      'Multicolored coat (often grey, dark red, spotted)',
      'Long ears, semi-pendulous',
      'Hardy Mediterranean dairy build'
    ],
    importantDistinguishingFeatures: [
      'Canary Islands origin, tolerant to extreme heat and dry feeds'
    ],
    commonConfusions: ['Anglo-Nubian', 'Sahelian'],
    identificationCaution: 'Semi-pendulous ears and Spanish island provenance.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Garganica',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Long, coarse jet-black hair coat',
      'Large twisted horns in both males and females',
      'Medium erect ears',
      'Hardy Southern Italian mountain breed'
    ],
    importantDistinguishingFeatures: [
      'Long shaggy black coat combined with prominent twisted horns'
    ],
    commonConfusions: ['Black Bengal', 'Valais Blackneck'],
    identificationCaution: 'Long black hair and long twisted horns are diagnostic.',
    breedStatus: 'Distinct breed'
  },

  // --- ASIAN & MIDDLE EASTERN BREEDS ---
  {
    name: 'Damascus (Shami / Aleppo Goat)',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Extremely long, flat, pendulous ears (often 20+ inches)',
      'Highly exaggerated Roman nose profile with undercut jaw in mature adults',
      'Tall, large frame',
      'Reddish-brown, mahogany, or cream coat',
      'Long silky hair'
    ],
    importantDistinguishingFeatures: [
      'Extraordinarily long drooping ears and distinctive blunt, humped facial profile in adults',
      'Middle Eastern giant goat breed'
    ],
    commonConfusions: ['Anglo-Nubian', 'Kamori', 'Jamnapari'],
    identificationCaution: 'Young Damascus kids have less exaggerated faces, but ears are extremely long.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Jamnapari (Jamunapari)',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Very large, tall frame with long leg length',
      'Long, flat, folded pendulous ears hanging downward',
      'Prominent convex Roman nose head profile',
      'Thick hair lock on hindquarters ("feathering")',
      'White coat with tan/reddish markings around neck and head'
    ],
    importantDistinguishingFeatures: [
      'Parrot-like beak Roman head profile with long folded ears',
      'Feathered long hair on thighs/hind legs',
      'Indian elite dual-purpose breed'
    ],
    commonConfusions: ['Anglo-Nubian', 'Beetal', 'Kamori'],
    identificationCaution: 'Long pendulous folded ears and convex profile are essential.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Beetal',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Large, muscular frame',
      'Long, broad, drooping flat ears',
      'Roman nose profile',
      'Short hair coat, predominantly black, brown, or red-spotted',
      'Heavy backward-curving spiral horns'
    ],
    importantDistinguishingFeatures: [
      'Punjab dual-purpose breed, darker coat than Jamnapari',
      'Heavy spiral horns and broad pendulous ears'
    ],
    commonConfusions: ['Jamnapari', 'Kamori', 'Anglo-Nubian'],
    identificationCaution: 'Dark coat colors (black/dark red) distinguish Beetal from classic white/tan Jamnapari.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Kamori',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Extremely long, wide, colorful pendulous ears',
      'Striking dark brown body with caramel/white marble spots and patterns',
      'Tall, elegant leggy frame',
      'Roman nose profile'
    ],
    importantDistinguishingFeatures: [
      'Intricate marble coat patterns paired with exceptionally long ears',
      'Pakistani Sindhi tall fancy goat breed'
    ],
    commonConfusions: ['Damascus', 'Jamnapari', 'Anglo-Nubian'],
    identificationCaution: 'Marbled brown-and-tan coat pattern is signature for Kamori.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Barbari',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Small, compact, neat body build',
      'Short, erect tubular ears pointing backward',
      'Short hair coat, white with red/brown spots ("dairy cow pattern")',
      'Neat twisted horns',
      'High prolificacy'
    ],
    importantDistinguishingFeatures: [
      'Small size, short erect tubular ears, spotted coat',
      'Adapted for stall-feeding in South Asia'
    ],
    commonConfusions: ['West African Dwarf', 'Black Bengal'],
    identificationCaution: 'Tubular erect ears separate Barbari from floppy-eared breeds.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Black Bengal',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Small, compact body frame with short legs',
      'Tight, short black coat (sometimes brown, white, or grey)',
      'Short erect ears pointing forward',
      'Small horns pointing upward/backward',
      'High meat quality and leather value'
    ],
    importantDistinguishingFeatures: [
      'Small size with erect ears and short black hair',
      'Native to Bangladesh and East India'
    ],
    commonConfusions: ['West African Dwarf', 'Mubende'],
    identificationCaution: 'Leg proportions are small like West African Dwarf; check geographical origin.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Black Bedouin Goat',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Long, shaggy jet-black hair coat',
      'Medium pendulous ears',
      'Hardy desert build with high water deprivation tolerance',
      'Medium size'
    ],
    importantDistinguishingFeatures: [
      'Shaggy long black hair coat insulating against desert heat',
      'Middle Eastern nomadic range goat'
    ],
    commonConfusions: ['Garganica', 'Black Bengal'],
    identificationCaution: 'Shaggy coat density in arid environments aids identification.',
    breedStatus: 'Regional population'
  },

  // --- GLOBAL MEAT & HERITAGE BREEDS ---
  {
    name: 'Kiko',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Large, deep-chested robust meat frame',
      'Coat typically white or cream (can vary: dark, brown, spotted)',
      'Medium ears, horizontal or semi-pendulous',
      'Large, sweeping spiral horns in mature bucks'
    ],
    importantDistinguishingFeatures: [
      'New Zealand meat breed selected for fast growth under low-input wild grazing',
      'Large sweeping horn structure in bucks, thick coat'
    ],
    commonConfusions: ['Savanna', 'Boer (white)', 'Spanish Goat'],
    identificationCaution: 'Horns are more sweeping/spiral than Boer horns.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Spanish Goat (Brush Goat)',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Medium frame, lean and rangy',
      'Horns usually large, wide-spreading, and twisted horizontally in bucks',
      'Short to long hair, any coat color pattern',
      'Medium horizontal ears'
    ],
    importantDistinguishingFeatures: [
      'Wide-spreading horizontal horns on bucks',
      'Hardy landrace meat goat of North America'
    ],
    commonConfusions: ['Kiko', 'Boer cross', 'Local crossbreds'],
    identificationCaution: 'Horns spread wide horizontally; body is leaner than blocky Boer.',
    breedStatus: 'Local breed/type'
  },
  {
    name: 'Myotonic (Tennessee Fainting Goat)',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Stocky, heavy-muscled body frame',
      'Prominent bulging eyes (socket structure)',
      'Medium horizontal ears',
      'Coarse coat, various colors (often black and white)',
      'Myotonia congenita muscle stiffness under sudden stimulus'
    ],
    importantDistinguishingFeatures: [
      'Heavy muscle width, distinct wide facial eye profile',
      'Temporary muscle stiffening (fainting response) when startled'
    ],
    commonConfusions: ['Pygmy Goat', 'Spanish Goat'],
    identificationCaution: 'Visual muscular thickness and facial eye prominence assist identification.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Pygmy Goat (African Pygmy)',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Extremely compact, cobby, heavy-barrel body frame',
      'Full beard in adult males and females',
      'Medium, erect ears',
      'Short thick legs',
      'Agouti color patterns (grizzle/grizzled brown, black, grey)'
    ],
    importantDistinguishingFeatures: [
      'Cobby, thick-barreled body shape ("beer keg on legs")',
      'Agouti coat color pattern with dark dorsal line and stocking legs'
    ],
    commonConfusions: ['Nigerian Dwarf', 'West African Dwarf'],
    identificationCaution: 'Pygmy is heavier and wider than Nigerian Dwarf (which is slender dairy-type).',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Texmaster',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Medium-heavy blocky meat frame',
      'Pied, red, white, or brown coat',
      'Medium pendulous ears',
      'Composed of Boer and Myotonic genetics'
    ],
    importantDistinguishingFeatures: [
      'Commercial US meat hybrid designed for low maintenance and heavy carcass yield'
    ],
    commonConfusions: ['Boer cross', 'Kiko cross'],
    identificationCaution: 'Requires farm registry records to distinguish from generic Boer crosses.',
    breedStatus: 'Crossbreed/common hybrid'
  },
  {
    name: 'Genemaster',
    type: 'Meat',
    keyVisualCharacteristics: [
      'Heavy muscular meat build',
      'White, brown, or multi-color coat',
      'Medium pendulous ears',
      'Kiko x Boer hybrid commercial line'
    ],
    importantDistinguishingFeatures: [
      'Commercial high-growth meat composite breed'
    ],
    commonConfusions: ['Boer', 'Kiko'],
    identificationCaution: 'Phenotypic traits blend Kiko and Boer features.',
    breedStatus: 'Crossbreed/common hybrid'
  },
  {
    name: 'Valais Blackneck',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Sharply divided color pattern: front half jet-black, rear half snow-white',
      'Long, shaggy hair coat',
      'Large backward-curving horns in both sexes',
      'Erect to horizontal medium ears'
    ],
    importantDistinguishingFeatures: [
      'Unmistakable 50/50 black (front) and white (back) color boundary across middle of body',
      'Long hair fleece, Swiss Valais mountain origin'
    ],
    commonConfusions: ['Bagot Goat', 'Peacock Goat'],
    identificationCaution: 'The sharp vertical black/white demarcation line is diagnostic.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Girgentana',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Extremely long, erect, corkscrew-shaped spiral horns on both males and females',
      'White coat with brown/grey spots around head and neck',
      'Beard on chin',
      'Medium size'
    ],
    importantDistinguishingFeatures: [
      'Vertical corkscrew spiral horns rising high above the head',
      'Sicilian heritage dairy goat'
    ],
    commonConfusions: ['Markhor (wild)', 'Kiko'],
    identificationCaution: 'Vertical corkscrew horn shape is unique among domestic goats.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Bagot Goat',
    type: 'Other',
    keyVisualCharacteristics: [
      'Black head, neck, and forequarters; white body and hindquarters',
      'Long, sweeping curved horns on males',
      'Long hair coat'
    ],
    importantDistinguishingFeatures: [
      'Black head and neck contrasting with white body',
      'UK semi-feral parkland heritage breed'
    ],
    commonConfusions: ['Valais Blackneck'],
    identificationCaution: 'Black covers only head/neck in Bagot, whereas Valais Blackneck is black through front legs/shoulders.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Arapawa Goat',
    type: 'Other',
    keyVisualCharacteristics: [
      'Medium frame',
      'Distinctive badger-like black facial stripes on brown background',
      'Sweeping wide horns',
      'New Zealand isolated feral island heritage breed'
    ],
    importantDistinguishingFeatures: [
      'Badger-face markings on rare feral-derived island stock'
    ],
    commonConfusions: ['British Alpine', 'Oberhasli'],
    identificationCaution: 'Rare heritage conservation breed.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Thuringian Goat (Thüringer Waldziege)',
    type: 'Dairy',
    keyVisualCharacteristics: [
      'Chocolate brown to reddish-brown coat',
      'White facial stripes running from horn base to muzzle',
      'White ear margins and leg stockings',
      'Erect ears'
    ],
    importantDistinguishingFeatures: [
      'German forest dairy breed with Toggenburg-like white facial stripes on dark chocolate coat'
    ],
    commonConfusions: ['Toggenburg', 'Oberhasli'],
    identificationCaution: 'Richer chocolate coat tone than Toggenburg.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Peacock Goat (Pfauenziege)',
    type: 'Dual-purpose',
    keyVisualCharacteristics: [
      'Front half of body light grey/white, rear half dark slate/black',
      'White facial stripes and white ear spots',
      'Long hair on thighs',
      'Large horns'
    ],
    importantDistinguishingFeatures: [
      'Swiss mountain breed with grey front and dark rear, facial stripes'
    ],
    commonConfusions: ['Valais Blackneck', 'Toggenburg'],
    identificationCaution: 'Grey front quarters (not black like Valais).',
    breedStatus: 'Distinct breed'
  },

  // --- FIBER BREEDS ---
  {
    name: 'Angora (Mohair Goat)',
    type: 'Fiber',
    keyVisualCharacteristics: [
      'Entire body covered in long, dense, ringlet-curled white mohair fleece',
      'Heavy drooping ringlet fleece covering face, legs, and body',
      'Medium pendulous or semi-pendulous ears',
      'Spiral backward horns'
    ],
    importantDistinguishingFeatures: [
      'Ringlet-curled silky mohair fleece covering the entire body',
      'Produces commercial mohair fiber'
    ],
    commonConfusions: ['Cashmere Goat', 'Pygora', 'Sheep (visual misclassification)'],
    identificationCaution: 'Do not confuse with sheep. Check goat tail (upward) and spiral goat horns.',
    breedStatus: 'Distinct breed'
  },
  {
    name: 'Cashmere Goat',
    type: 'Fiber',
    keyVisualCharacteristics: [
      'Coarse outer guard hair concealing dense, ultra-fine underdown fleece (cashmere)',
      'Variable coat colors (white, grey, brown, black)',
      'Large sweeping horns in bucks',
      'Hardy mountain/desert frame'
    ],
    importantDistinguishingFeatures: [
      'Dual-layer coat: long guard hair over soft underdown',
      'Central Asian / Himalayan fiber goat type'
    ],
    commonConfusions: ['Angora', 'Local Mountain Goat'],
    identificationCaution: 'Fleece is downy undercoat, unlike Angora ringlet locks.',
    breedStatus: 'Regional population'
  },
  {
    name: 'Pygora',
    type: 'Fiber',
    keyVisualCharacteristics: [
      'Small frame (Pygmy x Angora cross)',
      'Dense curly or fleece coat in varied colors (white, black, grey, brown)',
      'Medium ears'
    ],
    importantDistinguishingFeatures: [
      'Small body size combined with mohair-like fleece'
    ],
    commonConfusions: ['Angora', 'Nigora', 'Pygmy'],
    identificationCaution: 'Fleece quality on a small compact frame.',
    breedStatus: 'Crossbreed/common hybrid'
  },
  {
    name: 'Nigora',
    type: 'Fiber',
    keyVisualCharacteristics: [
      'Small to medium frame (Nigerian Dwarf x Angora)',
      'Fleece coat in diverse colors',
      'Erect or semi-erect ears'
    ],
    importantDistinguishingFeatures: [
      'Dairy-type small frame with fiber fleece'
    ],
    commonConfusions: ['Pygora', 'Angora'],
    identificationCaution: 'More refined leg structure than Pygora.',
    breedStatus: 'Crossbreed/common hybrid'
  }
];

export function getGoatKnowledgePromptSummary(): string {
  const summary = GOAT_BREEDS.map((g) => {
    return `- ${g.name} (${g.type}, ${g.breedStatus}): Key traits: ${g.keyVisualCharacteristics.slice(0, 3).join('; ')}. Distinguishing: ${g.importantDistinguishingFeatures.join('; ')}. Confusions: ${g.commonConfusions.join(', ')}. Caution: ${g.identificationCaution}`;
  }).join('\n');

  return `GOAT BREED RECONSTITUTION & REFERENCE KNOWLEDGE LAYER:\nUse the following reference for visual trait evaluation of 50 goat breeds, commercial lines, and African/global types:\n${summary}`;
}
