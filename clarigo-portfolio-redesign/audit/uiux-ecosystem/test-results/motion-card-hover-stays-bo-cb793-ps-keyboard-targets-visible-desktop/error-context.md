# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: motion.spec.ts >> card hover stays bounded without distorting artwork and filtering keeps keyboard targets visible
- Location: tests\motion.spec.ts:27:5

# Error details

```
Error: Test timeout of 45000ms exceeded
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Clarigo portfolio home" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "Clarigo Infotech" [ref=e6]
      - navigation "Main navigation" [ref=e7]:
        - link "Home" [ref=e8] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/
        - link "Services" [ref=e9] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/services
        - link "Work" [ref=e10] [cursor=pointer]:
          - /url: /#portfolio
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/contact
      - link "Book a free AI consultation" [ref=e12] [cursor=pointer]:
        - /url: https://clarigoinfotech.com/contact
        - generic [ref=e13]: Book Free AI Consultation
  - main [ref=e17]:
    - generic [ref=e18]:
      - generic [aria-hidden]:
        - generic:
          - generic:
            - generic [aria-hidden]:
              - img:
                - generic: Aa
      - generic [ref=e20]:
        - generic [ref=e21]:
          - generic [ref=e22]: AI-FIRST ENGINEERING · 10+ YEARS OF DELIVERY
          - heading "Built for what's next." [level=1] [ref=e24]:
            - generic [ref=e25]: Built
            - generic [ref=e27]: for
            - generic [ref=e29]: what's
            - generic [ref=e31]: next.
          - paragraph [ref=e34]: Explore selected web and mobile projects from Clarigo's public portfolio.
          - generic [ref=e35]:
            - link "Explore selected work" [ref=e36] [cursor=pointer]:
              - /url: "#portfolio"
            - link "Let's build together" [ref=e39] [cursor=pointer]:
              - /url: https://clarigoinfotech.com/contact
          - generic "Portfolio inventory" [ref=e43]:
            - generic [ref=e44]:
              - strong [ref=e45]:
                - generic [ref=e46]: "19"
              - generic [ref=e47]: Web projects
            - generic [ref=e48]:
              - strong [ref=e49]:
                - generic [ref=e50]: "28"
              - generic [ref=e51]: Mobile projects
            - generic [ref=e52]:
              - strong [ref=e53]:
                - generic [ref=e54]: "20"
                - text: +
              - generic [ref=e55]: Countries served
        - generic [ref=e56]: SCROLL TO EXPLORE
    - generic [ref=e58]:
      - generic [ref=e59]:
        - generic [ref=e60]:
          - generic [ref=e61]: SELECTED WORK / THE PORTFOLIO
          - heading "Ideas into experiences." [level=2] [ref=e62]
        - paragraph [ref=e63]: From social communities to everyday tools. Explore 47 web and mobile projects, their interfaces, and the details that give each one its own identity.
      - generic [ref=e64]:
        - group "Filter projects by type" [ref=e65]:
          - button "All projects" [pressed] [ref=e66] [cursor=pointer]
          - button "Web & web apps 19" [ref=e67] [cursor=pointer]:
            - text: Web & web apps
            - generic [ref=e68]: "19"
          - button "Mobile apps 28" [ref=e69] [cursor=pointer]:
            - text: Mobile apps
            - generic [ref=e70]: "28"
        - searchbox "Search projects" [ref=e75]
      - generic [ref=e76]:
        - generic [ref=e77]: 47 PROJECTS
        - generic [ref=e78]: SELECT A PROJECT TO EXPLORE
      - generic [ref=e81]:
        - article [ref=e82]:
          - link "LivSocial — original project artwork 01 WEB / Social & community LivSocial A social web experience bringing posts, communities, business discovery, and personal connections into one workspace." [ref=e85] [cursor=pointer]:
            - /url: /portfolio/livsocial
            - generic [ref=e86]:
              - img "LivSocial — original project artwork" [ref=e89]
              - generic [ref=e90]: "01"
            - generic [ref=e92]:
              - generic [ref=e93]: WEB / Social & community
              - heading "LivSocial" [level=3] [ref=e94]
            - paragraph [ref=e98]: A social web experience bringing posts, communities, business discovery, and personal connections into one workspace.
        - article [ref=e99]:
          - link "StreamDexa — original project artwork 02 WEB / Digital assets & discovery StreamDexa A digital-asset website presentation with collection discovery, asset details, creator-oriented pages, and registration views." [ref=e102] [cursor=pointer]:
            - /url: /portfolio/streamdexa
            - generic [ref=e103]:
              - img "StreamDexa — original project artwork" [ref=e106]
              - generic [ref=e107]: "02"
            - generic [ref=e109]:
              - generic [ref=e110]: WEB / Digital assets & discovery
              - heading "StreamDexa" [level=3] [ref=e111]
            - paragraph [ref=e115]: A digital-asset website presentation with collection discovery, asset details, creator-oriented pages, and registration views.
        - article [ref=e116]:
          - link "Little Butterflies — original project artwork 03 WEB / Childcare & family Little Butterflies A family-focused website introducing Little Butterflies through childcare imagery, service information, and a welcoming visual identity." [ref=e119] [cursor=pointer]:
            - /url: /portfolio/little-butterflies
            - generic [ref=e120]:
              - img "Little Butterflies — original project artwork" [ref=e123]
              - generic [ref=e124]: "03"
            - generic [ref=e126]:
              - generic [ref=e127]: WEB / Childcare & family
              - heading "Little Butterflies" [level=3] [ref=e128]
            - paragraph [ref=e132]: A family-focused website introducing Little Butterflies through childcare imagery, service information, and a welcoming visual identity.
        - article [ref=e133]:
          - link "TukioConnect — original project artwork 04 WEB / Organization & collaboration TukioConnect An organization workspace with people lists, administrative navigation, and a dedicated account-entry experience." [ref=e136] [cursor=pointer]:
            - /url: /portfolio/tukioconnect
            - generic [ref=e137]:
              - img "TukioConnect — original project artwork" [ref=e140]
              - generic [ref=e141]: "04"
            - generic [ref=e143]:
              - generic [ref=e144]: WEB / Organization & collaboration
              - heading "TukioConnect" [level=3] [ref=e145]
            - paragraph [ref=e149]: An organization workspace with people lists, administrative navigation, and a dedicated account-entry experience.
        - article [ref=e150]:
          - link "Beliri — original project artwork 05 WEB / Fashion & commerce Beliri A fashion storefront with promotional campaigns, category discovery, and product-led browsing." [ref=e153] [cursor=pointer]:
            - /url: /portfolio/beliri
            - generic [ref=e154]:
              - img "Beliri — original project artwork" [ref=e157]
              - generic [ref=e158]: "05"
            - generic [ref=e160]:
              - generic [ref=e161]: WEB / Fashion & commerce
              - heading "Beliri" [level=3] [ref=e162]
            - paragraph [ref=e166]: A fashion storefront with promotional campaigns, category discovery, and product-led browsing.
        - article [ref=e167]:
          - link "Printlific — original project artwork 06 WEB / Photography & commerce Printlific A photo-printing storefront presenting personalized wall art, product formats, and image-led inspiration." [ref=e170] [cursor=pointer]:
            - /url: /portfolio/printlific
            - generic [ref=e171]:
              - img "Printlific — original project artwork" [ref=e174]
              - generic [ref=e175]: "06"
            - generic [ref=e177]:
              - generic [ref=e178]: WEB / Photography & commerce
              - heading "Printlific" [level=3] [ref=e179]
            - paragraph [ref=e183]: A photo-printing storefront presenting personalized wall art, product formats, and image-led inspiration.
        - article [ref=e184]:
          - link "Nerdrabbit — original project artwork 07 WEB / Talent & recruitment Nerdrabbit A recruitment website presentation focused on connecting cloud professionals with hiring opportunities." [ref=e187] [cursor=pointer]:
            - /url: /portfolio/nerdrabbit
            - generic [ref=e188]:
              - img "Nerdrabbit — original project artwork" [ref=e191]
              - generic [ref=e192]: "07"
            - generic [ref=e194]:
              - generic [ref=e195]: WEB / Talent & recruitment
              - heading "Nerdrabbit" [level=3] [ref=e196]
            - paragraph [ref=e200]: A recruitment website presentation focused on connecting cloud professionals with hiring opportunities.
        - article [ref=e201]:
          - link "ParaNest — original project artwork 08 WEB / Childcare & discovery ParaNest A childcare discovery website with distinct paths for finding a nanny and exploring employment." [ref=e204] [cursor=pointer]:
            - /url: /portfolio/paranest
            - generic [ref=e205]:
              - img "ParaNest — original project artwork" [ref=e208]
              - generic [ref=e209]: "08"
            - generic [ref=e211]:
              - generic [ref=e212]: WEB / Childcare & discovery
              - heading "ParaNest" [level=3] [ref=e213]
            - paragraph [ref=e217]: A childcare discovery website with distinct paths for finding a nanny and exploring employment.
        - article [ref=e218]:
          - link "Glocal Expert — original project artwork 09 WEB / Education interface Glocal Expert Clarigo’s Glocal Expert portfolio artwork presents a colorful education website with learning content and service information." [ref=e221] [cursor=pointer]:
            - /url: /portfolio/glocal-expert
            - generic [ref=e222]:
              - img "Glocal Expert — original project artwork" [ref=e225]
              - generic [ref=e226]: "09"
            - generic [ref=e228]:
              - generic [ref=e229]: WEB / Education interface
              - heading "Glocal Expert" [level=3] [ref=e230]
            - paragraph [ref=e234]: Clarigo’s Glocal Expert portfolio artwork presents a colorful education website with learning content and service information.
        - article [ref=e235]:
          - link "Mercury Mailroom — original project artwork 10 WEB / Workplace operations Mercury Mailroom A workplace mailroom system for mail-piece management, delivery tracking, and organization settings." [ref=e238] [cursor=pointer]:
            - /url: /portfolio/mercury-mailroom
            - generic [ref=e239]:
              - img "Mercury Mailroom — original project artwork" [ref=e242]
              - generic [ref=e243]: "10"
            - generic [ref=e245]:
              - generic [ref=e246]: WEB / Workplace operations
              - heading "Mercury Mailroom" [level=3] [ref=e247]
            - paragraph [ref=e251]: A workplace mailroom system for mail-piece management, delivery tracking, and organization settings.
        - article [ref=e252]:
          - link "Umeed — original project artwork 11 WEB / Matrimony & discovery Umeed A relationship-focused Umeed website with community information, registration messaging, and original mobile product compositions." [ref=e255] [cursor=pointer]:
            - /url: /portfolio/umeed
            - generic [ref=e256]:
              - img "Umeed — original project artwork" [ref=e259]
              - generic [ref=e260]: "11"
            - generic [ref=e262]:
              - generic [ref=e263]: WEB / Matrimony & discovery
              - heading "Umeed" [level=3] [ref=e264]
            - paragraph [ref=e268]: A relationship-focused Umeed website with community information, registration messaging, and original mobile product compositions.
        - article [ref=e269]:
          - link "Alum-connect — original project artwork 12 WEB / Education & services Alum-connect An education website presentation combining an online-learning introduction with student service information." [ref=e272] [cursor=pointer]:
            - /url: /portfolio/alum-connect
            - generic [ref=e273]:
              - img "Alum-connect — original project artwork" [ref=e276]
              - generic [ref=e277]: "12"
            - generic [ref=e279]:
              - generic [ref=e280]: WEB / Education & services
              - heading "Alum-connect" [level=3] [ref=e281]
            - paragraph [ref=e285]: An education website presentation combining an online-learning introduction with student service information.
        - article [ref=e286]:
          - link "Kegelklock — original project artwork 13 WEB / Exercise & wellbeing Kegelklock A program website introducing KegelKlock’s exercise offering through information, courses, and membership navigation." [ref=e289] [cursor=pointer]:
            - /url: /portfolio/kegelklock
            - generic [ref=e290]:
              - img "Kegelklock — original project artwork" [ref=e293]
              - generic [ref=e294]: "13"
            - generic [ref=e296]:
              - generic [ref=e297]: WEB / Exercise & wellbeing
              - heading "Kegelklock" [level=3] [ref=e298]
            - paragraph [ref=e302]: A program website introducing KegelKlock’s exercise offering through information, courses, and membership navigation.
        - article [ref=e303]:
          - link "RallyBridge — original project artwork 14 WEB / Sports & coaching RallyBridge A tennis and pickleball coaching website with course discovery, contact information, and account navigation." [ref=e306] [cursor=pointer]:
            - /url: /portfolio/rallybridge
            - generic [ref=e307]:
              - img "RallyBridge — original project artwork" [ref=e310]
              - generic [ref=e311]: "14"
            - generic [ref=e313]:
              - generic [ref=e314]: WEB / Sports & coaching
              - heading "RallyBridge" [level=3] [ref=e315]
            - paragraph [ref=e319]: A tennis and pickleball coaching website with course discovery, contact information, and account navigation.
        - article [ref=e320]:
          - link "Network Capital — original project artwork 15 WEB / Mortgage & finance Network Capital A mortgage website presenting home-loan and refinance pathways with a clear application entry point." [ref=e323] [cursor=pointer]:
            - /url: /portfolio/network-capital
            - generic [ref=e324]:
              - img "Network Capital — original project artwork" [ref=e327]
              - generic [ref=e328]: "15"
            - generic [ref=e330]:
              - generic [ref=e331]: WEB / Mortgage & finance
              - heading "Network Capital" [level=3] [ref=e332]
            - paragraph [ref=e336]: A mortgage website presenting home-loan and refinance pathways with a clear application entry point.
        - article [ref=e337]:
          - link "Whizora — original project artwork 16 WEB / Courses & learning Whizora A learning website with course discovery, program cards, instructor-onboarding forms, and a teaching workspace." [ref=e340] [cursor=pointer]:
            - /url: /portfolio/whizora
            - generic [ref=e341]:
              - img "Whizora — original project artwork" [ref=e344]
              - generic [ref=e345]: "16"
            - generic [ref=e347]:
              - generic [ref=e348]: WEB / Courses & learning
              - heading "Whizora" [level=3] [ref=e349]
            - paragraph [ref=e353]: A learning website with course discovery, program cards, instructor-onboarding forms, and a teaching workspace.
        - article [ref=e354]:
          - link "EStrata — original project artwork 17 WEB / Case operations EStrata An operations workspace presenting dashboard summaries, case records, task tables, findings, and account access." [ref=e357] [cursor=pointer]:
            - /url: /portfolio/estrata
            - generic [ref=e358]:
              - img "EStrata — original project artwork" [ref=e361]
              - generic [ref=e362]: "17"
            - generic [ref=e364]:
              - generic [ref=e365]: WEB / Case operations
              - heading "EStrata" [level=3] [ref=e366]
            - paragraph [ref=e370]: An operations workspace presenting dashboard summaries, case records, task tables, findings, and account access.
        - article [ref=e371]:
          - link "Been There — original project artwork 18 WEB / Services marketplace Been There A services marketplace website with skill search, freelancer discovery, and distinct client and freelancer pathways." [ref=e374] [cursor=pointer]:
            - /url: /portfolio/been-there
            - generic [ref=e375]:
              - img "Been There — original project artwork" [ref=e378]
              - generic [ref=e379]: "18"
            - generic [ref=e381]:
              - generic [ref=e382]: WEB / Services marketplace
              - heading "Been There" [level=3] [ref=e383]
            - paragraph [ref=e387]: A services marketplace website with skill search, freelancer discovery, and distinct client and freelancer pathways.
        - article [ref=e388]:
          - link "LeadForma — original project artwork 19 WEB / Lead capture & forms LeadForma A form-led web experience presenting lead information fields and a compact set of service choices." [ref=e391] [cursor=pointer]:
            - /url: /portfolio/leadforma
            - generic [ref=e392]:
              - img "LeadForma — original project artwork" [ref=e395]
              - generic [ref=e396]: "19"
            - generic [ref=e398]:
              - generic [ref=e399]: WEB / Lead capture & forms
              - heading "LeadForma" [level=3] [ref=e400]
            - paragraph [ref=e404]: A form-led web experience presenting lead information fields and a compact set of service choices.
        - article [ref=e405]:
          - link "LivSocial — original project artwork 20 MOBILE / Social & community LivSocial LivSocial’s mobile interface brings a social feed, profile discovery, and community content into a compact touch layout." [ref=e408] [cursor=pointer]:
            - /url: /portfolio/app-livsocial
            - generic [ref=e409]:
              - img "LivSocial — original project artwork" [ref=e412]
              - generic [ref=e413]: "20"
            - generic [ref=e415]:
              - generic [ref=e416]: MOBILE / Social & community
              - heading "LivSocial" [level=3] [ref=e417]
            - paragraph [ref=e421]: LivSocial’s mobile interface brings a social feed, profile discovery, and community content into a compact touch layout.
        - article [ref=e422]:
          - link "SimplyScouted — original project artwork 21 MOBILE / Sports recruitment SimplyScouted A sports-recruitment app presentation with athlete profiles, college-team discovery, portrait cards, and account introductions." [ref=e425] [cursor=pointer]:
            - /url: /portfolio/app-simplyscouted
            - generic [ref=e426]:
              - img "SimplyScouted — original project artwork" [ref=e429]
              - generic [ref=e430]: "21"
            - generic [ref=e432]:
              - generic [ref=e433]: MOBILE / Sports recruitment
              - heading "SimplyScouted" [level=3] [ref=e434]
            - paragraph [ref=e438]: A sports-recruitment app presentation with athlete profiles, college-team discovery, portrait cards, and account introductions.
        - article [ref=e439]:
          - link "InfiScribe — original project artwork 22 MOBILE / Document capture & files InfiScribe A document-scanning app presentation with camera capture, file organization, a document preview, and account access." [ref=e442] [cursor=pointer]:
            - /url: /portfolio/app-infiscribe
            - generic [ref=e443]:
              - img "InfiScribe — original project artwork" [ref=e446]
              - generic [ref=e447]: "22"
            - generic [ref=e449]:
              - generic [ref=e450]: MOBILE / Document capture & files
              - heading "InfiScribe" [level=3] [ref=e451]
            - paragraph [ref=e455]: A document-scanning app presentation with camera capture, file organization, a document preview, and account access.
        - article [ref=e456]:
          - link "SilaFlow — original project artwork 23 MOBILE / Logistics & shipment records SilaFlow A logistics-oriented mobile workspace presenting shipment records, company information, freight imagery, and account entry." [ref=e459] [cursor=pointer]:
            - /url: /portfolio/app-silaflow
            - generic [ref=e460]:
              - img "SilaFlow — original project artwork" [ref=e463]
              - generic [ref=e464]: "23"
            - generic [ref=e466]:
              - generic [ref=e467]: MOBILE / Logistics & shipment records
              - heading "SilaFlow" [level=3] [ref=e468]
            - paragraph [ref=e472]: A logistics-oriented mobile workspace presenting shipment records, company information, freight imagery, and account entry.
        - article [ref=e473]:
          - link "HabitStride — original project artwork 24 MOBILE / Habits & routines HabitStride A habit-tracking interface with routine lists, calendar context, and a visual progress overview." [ref=e476] [cursor=pointer]:
            - /url: /portfolio/app-habitstride
            - generic [ref=e477]:
              - img "HabitStride — original project artwork" [ref=e480]
              - generic [ref=e481]: "24"
            - generic [ref=e483]:
              - generic [ref=e484]: MOBILE / Habits & routines
              - heading "HabitStride" [level=3] [ref=e485]
            - paragraph [ref=e489]: A habit-tracking interface with routine lists, calendar context, and a visual progress overview.
        - article [ref=e490]:
          - link "TukioConnect — original project artwork 25 MOBILE / Team communication TukioConnect TukioConnect’s mobile presentation combines conversations, contact discovery, profile information, and call interfaces." [ref=e493] [cursor=pointer]:
            - /url: /portfolio/app-tukioconnect
            - generic [ref=e494]:
              - img "TukioConnect — original project artwork" [ref=e497]
              - generic [ref=e498]: "25"
            - generic [ref=e500]:
              - generic [ref=e501]: MOBILE / Team communication
              - heading "TukioConnect" [level=3] [ref=e502]
            - paragraph [ref=e506]: TukioConnect’s mobile presentation combines conversations, contact discovery, profile information, and call interfaces.
        - article [ref=e507]:
          - link "Pace of Play — original project artwork 26 MOBILE / Golf & course activity Pace of Play A golf application presentation combining course maps, pace indicators, score information, and round details." [ref=e510] [cursor=pointer]:
            - /url: /portfolio/app-pace-of-play
            - generic [ref=e511]:
              - img "Pace of Play — original project artwork" [ref=e514]
              - generic [ref=e515]: "26"
            - generic [ref=e517]:
              - generic [ref=e518]: MOBILE / Golf & course activity
              - heading "Pace of Play" [level=3] [ref=e519]
            - paragraph [ref=e523]: A golf application presentation combining course maps, pace indicators, score information, and round details.
        - article [ref=e524]:
          - link "Qcop App — original project artwork 27 MOBILE / Work records & documents Qcop App QCOP’s mobile artwork presents organized records, document imagery, summary information, and account access." [ref=e527] [cursor=pointer]:
            - /url: /portfolio/app-qcop-app
            - generic [ref=e528]:
              - img "Qcop App — original project artwork" [ref=e531]
              - generic [ref=e532]: "27"
            - generic [ref=e534]:
              - generic [ref=e535]: MOBILE / Work records & documents
              - heading "Qcop App" [level=3] [ref=e536]
            - paragraph [ref=e540]: QCOP’s mobile artwork presents organized records, document imagery, summary information, and account access.
        - article [ref=e541]:
          - link "Little Butterflies — original project artwork 28 MOBILE / Family & daily care Little Butterflies A family-oriented mobile presentation with language choices, a personal home, daily information, and conversation screens." [ref=e544] [cursor=pointer]:
            - /url: /portfolio/app-little-butterflies
            - generic [ref=e545]:
              - img "Little Butterflies — original project artwork" [ref=e548]
              - generic [ref=e549]: "28"
            - generic [ref=e551]:
              - generic [ref=e552]: MOBILE / Family & daily care
              - heading "Little Butterflies" [level=3] [ref=e553]
            - paragraph [ref=e557]: A family-oriented mobile presentation with language choices, a personal home, daily information, and conversation screens.
        - article [ref=e558]:
          - link "Case Management ASE — original project artwork 29 MOBILE / Case operations Case Management ASE A case-management mobile interface with dashboard modules, case records, and detailed information screens." [ref=e561] [cursor=pointer]:
            - /url: /portfolio/app-case-management-ase
            - generic [ref=e562]:
              - img "Case Management ASE — original project artwork" [ref=e565]
              - generic [ref=e566]: "29"
            - generic [ref=e568]:
              - generic [ref=e569]: MOBILE / Case operations
              - heading "Case Management ASE" [level=3] [ref=e570]
            - paragraph [ref=e574]: A case-management mobile interface with dashboard modules, case records, and detailed information screens.
        - article [ref=e575]:
          - link "Printlific — original project artwork 30 MOBILE / Photo personalization Printlific Printlific’s mobile interface presents photo selection, print-product discovery, and a personalized creation flow." [ref=e578] [cursor=pointer]:
            - /url: /portfolio/app-printlific
            - generic [ref=e579]:
              - img "Printlific — original project artwork" [ref=e582]
              - generic [ref=e583]: "30"
            - generic [ref=e585]:
              - generic [ref=e586]: MOBILE / Photo personalization
              - heading "Printlific" [level=3] [ref=e587]
            - paragraph [ref=e591]: Printlific’s mobile interface presents photo selection, print-product discovery, and a personalized creation flow.
        - article [ref=e592]:
          - link "Law Legend — original project artwork 31 MOBILE / Tax & learning content Law Legend A tax-themed learning interface with content categories, article-style information, and account screens." [ref=e595] [cursor=pointer]:
            - /url: /portfolio/app-law-legend
            - generic [ref=e596]:
              - img "Law Legend — original project artwork" [ref=e599]
              - generic [ref=e600]: "31"
            - generic [ref=e602]:
              - generic [ref=e603]: MOBILE / Tax & learning content
              - heading "Law Legend" [level=3] [ref=e604]
            - paragraph [ref=e608]: A tax-themed learning interface with content categories, article-style information, and account screens.
        - article [ref=e609]:
          - link "Racepace — original project artwork 32 MOBILE / Racing & team selection Racepace A racing-themed mobile presentation with driver discovery, selection controls, team formation, and race introductions." [ref=e612] [cursor=pointer]:
            - /url: /portfolio/app-racepace
            - generic [ref=e613]:
              - img "Racepace — original project artwork" [ref=e616]
              - generic [ref=e617]: "32"
            - generic [ref=e619]:
              - generic [ref=e620]: MOBILE / Racing & team selection
              - heading "Racepace" [level=3] [ref=e621]
            - paragraph [ref=e625]: A racing-themed mobile presentation with driver discovery, selection controls, team formation, and race introductions.
        - article [ref=e626]:
          - link "Been There — original project artwork 33 MOBILE / Local services Been There A services-marketplace app presenting job categories, people, task records, and profile information." [ref=e629] [cursor=pointer]:
            - /url: /portfolio/app-been-there
            - generic [ref=e630]:
              - img "Been There — original project artwork" [ref=e633]
              - generic [ref=e634]: "33"
            - generic [ref=e636]:
              - generic [ref=e637]: MOBILE / Local services
              - heading "Been There" [level=3] [ref=e638]
            - paragraph [ref=e642]: A services-marketplace app presenting job categories, people, task records, and profile information.
        - article [ref=e643]:
          - link "PantryOne — original project artwork 34 MOBILE / Food & groceries PantryOne A grocery-shopping interface with food categories, product cards, cart controls, and a personal account area." [ref=e646] [cursor=pointer]:
            - /url: /portfolio/app-pantryone
            - generic [ref=e647]:
              - img "PantryOne — original project artwork" [ref=e650]
              - generic [ref=e651]: "34"
            - generic [ref=e653]:
              - generic [ref=e654]: MOBILE / Food & groceries
              - heading "PantryOne" [level=3] [ref=e655]
            - paragraph [ref=e659]: A grocery-shopping interface with food categories, product cards, cart controls, and a personal account area.
        - article [ref=e660]:
          - link "EscapeTheHOA — original project artwork 35 MOBILE / Property discovery EscapeTheHOA A property-discovery app presenting home listings, location information, photos, and saved-interest controls." [ref=e663] [cursor=pointer]:
            - /url: /portfolio/app-escapethehoa
            - generic [ref=e664]:
              - img "EscapeTheHOA — original project artwork" [ref=e667]
              - generic [ref=e668]: "35"
            - generic [ref=e670]:
              - generic [ref=e671]: MOBILE / Property discovery
              - heading "EscapeTheHOA" [level=3] [ref=e672]
            - paragraph [ref=e676]: A property-discovery app presenting home listings, location information, photos, and saved-interest controls.
        - article [ref=e677]:
          - link "Dateflow — original project artwork 36 MOBILE / Dating & profiles Dateflow A dating-oriented mobile presentation with profile cards, personal details, preferences, and account entry." [ref=e680] [cursor=pointer]:
            - /url: /portfolio/app-dateflow
            - generic [ref=e681]:
              - img "Dateflow — original project artwork" [ref=e684]
              - generic [ref=e685]: "36"
            - generic [ref=e687]:
              - generic [ref=e688]: MOBILE / Dating & profiles
              - heading "Dateflow" [level=3] [ref=e689]
            - paragraph [ref=e693]: A dating-oriented mobile presentation with profile cards, personal details, preferences, and account entry.
        - article [ref=e694]:
          - link "Meravyaah — original project artwork 37 MOBILE / Matrimony & profiles Meravyaah A matrimony-themed mobile experience with member profiles, discovery cards, and personalized account screens." [ref=e697] [cursor=pointer]:
            - /url: /portfolio/app-meravyaah
            - generic [ref=e698]:
              - img "Meravyaah — original project artwork" [ref=e701]
              - generic [ref=e702]: "37"
            - generic [ref=e704]:
              - generic [ref=e705]: MOBILE / Matrimony & profiles
              - heading "Meravyaah" [level=3] [ref=e706]
            - paragraph [ref=e710]: A matrimony-themed mobile experience with member profiles, discovery cards, and personalized account screens.
        - article [ref=e711]:
          - link "Beliri — original project artwork 38 MOBILE / Fashion shopping Beliri Beliri’s mobile shopping presentation brings fashion campaigns, categories, product browsing, and customer information into one visual system." [ref=e714] [cursor=pointer]:
            - /url: /portfolio/app-beliri
            - generic [ref=e715]:
              - img "Beliri — original project artwork" [ref=e718]
              - generic [ref=e719]: "38"
            - generic [ref=e721]:
              - generic [ref=e722]: MOBILE / Fashion shopping
              - heading "Beliri" [level=3] [ref=e723]
            - paragraph [ref=e727]: Beliri’s mobile shopping presentation brings fashion campaigns, categories, product browsing, and customer information into one visual system.
        - article [ref=e728]:
          - link "Fynmate — original project artwork 39 MOBILE / Loan-adviser workspace Fynmate Fynmate’s archived composition shows a Digi-Loans-branded adviser interface with earnings records, profile information, and document fields." [ref=e731] [cursor=pointer]:
            - /url: /portfolio/app-fynmate
            - generic [ref=e732]:
              - img "Fynmate — original project artwork" [ref=e735]
              - generic [ref=e736]: "39"
            - generic [ref=e738]:
              - generic [ref=e739]: MOBILE / Loan-adviser workspace
              - heading "Fynmate" [level=3] [ref=e740]
            - paragraph [ref=e744]: Fynmate’s archived composition shows a Digi-Loans-branded adviser interface with earnings records, profile information, and document fields.
        - article [ref=e745]:
          - link "StreetSlate — original project artwork 40 MOBILE / Fieldwork & learning StreetSlate A field-oriented app presentation combining route maps, lead-information forms, learning questions, and account screens." [ref=e748] [cursor=pointer]:
            - /url: /portfolio/app-streetslate
            - generic [ref=e749]:
              - img "StreetSlate — original project artwork" [ref=e752]
              - generic [ref=e753]: "40"
            - generic [ref=e755]:
              - generic [ref=e756]: MOBILE / Fieldwork & learning
              - heading "StreetSlate" [level=3] [ref=e757]
            - paragraph [ref=e761]: A field-oriented app presentation combining route maps, lead-information forms, learning questions, and account screens.
        - article [ref=e762]:
          - 'link "Umeed — original project artwork 41 MOBILE / Community & profiles Umeed Archive: Ummed Umeed’s mobile presentation organizes matrimony profiles, member details, and account-entry screens." [ref=e765] [cursor=pointer]':
            - /url: /portfolio/app-ummed
            - generic [ref=e766]:
              - img "Umeed — original project artwork" [ref=e769]
              - generic [ref=e770]: "41"
            - generic [ref=e772]:
              - generic [ref=e773]: MOBILE / Community & profiles
              - heading "Umeed" [level=3] [ref=e774]
              - generic [ref=e775]: "Archive: Ummed"
            - paragraph [ref=e779]: Umeed’s mobile presentation organizes matrimony profiles, member details, and account-entry screens.
        - article [ref=e780]:
          - link "Bubble — original project artwork 42 MOBILE / Dining offers & rewards Bubble A dining-and-rewards app presentation with coupon discovery, a points-oriented home, contact views, and QR-related imagery." [ref=e783] [cursor=pointer]:
            - /url: /portfolio/app-bubble
            - generic [ref=e784]:
              - img "Bubble — original project artwork" [ref=e787]
              - generic [ref=e788]: "42"
            - generic [ref=e790]:
              - generic [ref=e791]: MOBILE / Dining offers & rewards
              - heading "Bubble" [level=3] [ref=e792]
            - paragraph [ref=e796]: A dining-and-rewards app presentation with coupon discovery, a points-oriented home, contact views, and QR-related imagery.
        - article [ref=e797]:
          - 'link "KegelKlock — original project artwork 43 MOBILE / Exercise routines KegelKlock Archive: Kegalklock KegelKlock’s mobile interface presents exercise choices, timing views, a calendar, and progress graphics." [ref=e800] [cursor=pointer]':
            - /url: /portfolio/app-kegalklock
            - generic [ref=e801]:
              - img "KegelKlock — original project artwork" [ref=e804]
              - generic [ref=e805]: "43"
            - generic [ref=e807]:
              - generic [ref=e808]: MOBILE / Exercise routines
              - heading "KegelKlock" [level=3] [ref=e809]
              - generic [ref=e810]: "Archive: Kegalklock"
            - paragraph [ref=e814]: KegelKlock’s mobile interface presents exercise choices, timing views, a calendar, and progress graphics.
        - article [ref=e815]:
          - link "Gymbet — original project artwork 44 MOBILE / Fitness & exercises Gymbet A fitness app presentation with illustrated exercises, circular activity controls, and account screens." [ref=e818] [cursor=pointer]:
            - /url: /portfolio/app-gymbet
            - generic [ref=e819]:
              - img "Gymbet — original project artwork" [ref=e822]
              - generic [ref=e823]: "44"
            - generic [ref=e825]:
              - generic [ref=e826]: MOBILE / Fitness & exercises
              - heading "Gymbet" [level=3] [ref=e827]
            - paragraph [ref=e831]: A fitness app presentation with illustrated exercises, circular activity controls, and account screens.
        - article [ref=e832]:
          - link "GoBroker — original project artwork 45 MOBILE / Real-estate workspace GoBroker A real-estate assistant interface with property details, account tools, reminders, and calendar views." [ref=e835] [cursor=pointer]:
            - /url: /portfolio/app-gobroker
            - generic [ref=e836]:
              - img "GoBroker — original project artwork" [ref=e839]
              - generic [ref=e840]: "45"
            - generic [ref=e842]:
              - generic [ref=e843]: MOBILE / Real-estate workspace
              - heading "GoBroker" [level=3] [ref=e844]
            - paragraph [ref=e848]: A real-estate assistant interface with property details, account tools, reminders, and calendar views.
        - article [ref=e849]:
          - link "Heartsync — original project artwork 46 MOBILE / Relationships & reflection Heartsync A relationship-themed mobile presentation using mood choices, reflection prompts, personal indicators, and account screens." [ref=e852] [cursor=pointer]:
            - /url: /portfolio/app-heartsync
            - generic [ref=e853]:
              - img "Heartsync — original project artwork" [ref=e856]
              - generic [ref=e857]: "46"
            - generic [ref=e859]:
              - generic [ref=e860]: MOBILE / Relationships & reflection
              - heading "Heartsync" [level=3] [ref=e861]
            - paragraph [ref=e865]: A relationship-themed mobile presentation using mood choices, reflection prompts, personal indicators, and account screens.
        - article [ref=e866]:
          - 'link "Examined Life — original project artwork 47 MOBILE / Wellbeing & reflection Examined Life Archive: Supplement Management The artwork listed under Supplement Management is branded Examined Life and presents a calm, reflection-oriented mobile experience." [active] [ref=e869] [cursor=pointer]':
            - /url: /portfolio/app-supplement-management
            - generic [ref=e870]:
              - img "Examined Life — original project artwork" [ref=e873]
              - generic [ref=e874]: "47"
            - generic [ref=e876]:
              - generic [ref=e877]: MOBILE / Wellbeing & reflection
              - heading "Examined Life" [level=3] [ref=e878]
              - generic [ref=e879]: "Archive: Supplement Management"
            - paragraph [ref=e883]: The artwork listed under Supplement Management is branded Examined Life and presents a calm, reflection-oriented mobile experience.
    - generic [ref=e885]:
      - generic [ref=e886]:
        - generic [ref=e887]: YOUR NEXT CHAPTER STARTS HERE
        - heading "Let's build something that matters." [level=2] [ref=e888]
      - link "Book a free consultation" [ref=e889] [cursor=pointer]:
        - /url: https://clarigoinfotech.com/contact
  - contentinfo [ref=e893]:
    - link "Clarigo portfolio home" [ref=e894] [cursor=pointer]:
      - /url: /
      - img "Clarigo Infotech" [ref=e895]
    - link "Start a conversation" [ref=e896] [cursor=pointer]:
      - /url: https://clarigoinfotech.com/contact
    - generic [ref=e900]: © 2026 Clarigo Infotech
  - alert [ref=e901]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('hero words, scroll reveals, image masks and progress animate then settle', async ({ page }, info) => {
  4   |   await page.addInitScript(() => {
  5   |     (window as typeof window & { wordEntrances: number }).wordEntrances = 0;
  6   |     document.addEventListener('animationstart', event => { if ((event as AnimationEvent).animationName === 'clarigoWordIn') (window as typeof window & { wordEntrances: number }).wordEntrances++; });
  7   |   });
  8   |   await page.goto('/portfolio/livsocial');
  9   |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  10  |   await expect.poll(() => page.locator('.motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).transform === 'none' && getComputedStyle(word).opacity === '1'))).toBe(true);
  11  |   expect(await page.evaluate(() => (window as typeof window & { wordEntrances: number }).wordEntrances)).toBeGreaterThan(0);
  12  |   const first = page.locator('.projectGallery>figure').first();
  13  |   expect(await first.evaluate(el => Number(getComputedStyle(el).opacity))).toBe(0);
  14  |   expect(await first.evaluate(el => getComputedStyle(el).clipPath)).not.toBe('none');
  15  |   const samples = await first.evaluate(el => new Promise<number[]>(resolve => {
  16  |     el.scrollIntoView({ block: 'center', behavior: 'instant' });
  17  |     const start = performance.now(), values: number[] = [];
  18  |     function frame() { values.push(Number(getComputedStyle(el).opacity)); if (performance.now() - start < 1050) requestAnimationFrame(frame); else resolve(values); } requestAnimationFrame(frame);
  19  |   }));
  20  |   expect(samples.some(value => value > 0 && value < 1)).toBe(true);
  21  |   await expect.poll(() => first.evaluate(el => ({ opacity: getComputedStyle(el).opacity, clip: getComputedStyle(el).clipPath, promotion: getComputedStyle(el).willChange })) ).toEqual({ opacity: '1', clip: 'none', promotion: 'auto' });
  22  |   expect(await page.locator('.portfolioProgress').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeGreaterThan(0);
  23  |   if (info.project.name === 'desktop') expect(await page.locator('[data-motion-parallax]').count()).toBeGreaterThan(0);
  24  |   else await expect(page.locator('[data-motion-parallax]')).toHaveCount(0);
  25  | });
  26  | 
  27  | test('card hover stays bounded without distorting artwork and filtering keeps keyboard targets visible', async ({ page }, info) => {
  28  |   await page.goto('/#portfolio');
  29  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  30  |   const card = page.locator('.projectEntrance').first();
  31  |   await card.scrollIntoViewIfNeeded();
  32  |   await expect.poll(() => card.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  33  |   await expect(card).toHaveAttribute('data-depth-enabled', info.project.name === 'desktop' ? 'true' : 'false');
  34  |   if (info.project.name === 'desktop') {
  35  |     const canvas=page.locator('.portfolioWebgl');await expect(canvas).toHaveAttribute('data-engine','three');
  36  |     const box = (await card.boundingBox())!;
  37  |     await page.mouse.move(box.x + box.width * .8, box.y + box.height * .3);
  38  |     await expect(canvas).toHaveAttribute('data-card-active','true');
  39  |     await expect.poll(()=>canvas.evaluate(node=>Number((node as HTMLElement).dataset.cardTilt))).toBeGreaterThan(.01);
  40  |     const scale=await canvas.evaluate(node=>Number((node as HTMLElement).dataset.cardScale));expect(scale).toBeGreaterThanOrEqual(.955);expect(scale).toBeLessThanOrEqual(.99);
  41  |     expect(await card.locator('.depthSurface').evaluate(element => { const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform); return matrix.m11 === 1 && matrix.m22 === 1 && matrix.m12 === 0 && matrix.m21 === 0; })).toBe(true);
  42  |     await page.mouse.move(1, 1);
  43  |     await expect(canvas).not.toHaveAttribute('data-card-active','true');
  44  |     await expect.poll(()=>card.locator('.visual img').evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
  45  |   }
  46  |   await page.getByRole('searchbox').fill('TukioConnect');
  47  |   await expect(page.locator('.projectCard')).toHaveCount(2);
  48  |   await page.getByRole('searchbox').clear();
  49  |   await expect(page.locator('.projectCard')).toHaveCount(47);
  50  |   const link = page.locator('.projectLink').last();
  51  |   await link.focus();
  52  |   await expect(link).toBeFocused();
> 53  |   await expect.poll(() => link.locator('..').locator('..').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
      |                                                                                                          ^ Error: Test timeout of 45000ms exceeded
  54  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  55  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  56  |   await expect(page.locator('.projectEntrance').first()).toHaveAttribute('data-depth-enabled', 'false');
  57  |   expect(await page.locator('.depthSurface').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none'))).toBe(true);
  58  | });
  59  | 
  60  | test('live reduced motion, deep links and dialog navigation preserve readable content', async ({ page }) => {
  61  |   await page.goto('/portfolio/app-habitstride');
  62  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  63  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  64  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  65  |   await expect.poll(() => page.locator('.motionWord, .featureColumn>article, .workflowSteps>li, .projectGallery>figure').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1' && getComputedStyle(node).transform === 'none'))).toBe(true);
  66  |   await page.getByRole('link', { name: 'Screenshots', exact: true }).click();
  67  |   const first = page.locator('.galleryOpen').first(); await first.click();
  68  |   await page.getByRole('button', { name: 'Next image', exact: true }).click();
  69  |   await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
  70  |   await expect.poll(() => page.locator('.galleryDialogImageFrame').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  71  |   expect(await page.locator('.galleryDialogImageFrame').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  72  |   await page.keyboard.press('Escape'); await expect(first).toBeFocused();
  73  |   await page.emulateMedia({ reducedMotion: 'no-preference' });
  74  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  75  |   expect(await page.locator('.motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).animationName === 'none'))).toBe(true);
  76  |   await page.goto('/portfolio/streamdexa#screens');
  77  |   await expect(page.locator('html')).toHaveAttribute('data-motion-skip-hero', '');
  78  |   await expect.poll(() => page.locator('.projectGallery>figure').first().evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  79  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  80  | });
  81  | 
  82  | test('the portfolio and detail content stay usable with JavaScript disabled', async ({ browser, page }) => {
  83  |   const context = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize()! });
  84  |   try {
  85  |     const staticPage = await context.newPage(); await staticPage.goto('/');
  86  |     await expect(staticPage.locator('.projectLink')).toHaveCount(47);
  87  |     await staticPage.locator('.projectLink[href="/portfolio/app-infiscribe"]').click();
  88  |     await expect(staticPage).toHaveURL('/portfolio/app-infiscribe');
  89  |     await expect(staticPage.locator('h1')).toHaveText('InfiScribe.');
  90  |     await expect(staticPage.locator('#overview')).toBeVisible();
  91  |     expect(await staticPage.locator('#screens').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  92  |   } finally { await context.close(); }
  93  | });
  94  | 
  95  | test('back navigation restores a readable portfolio and complete metadata', async ({ page }) => {
  96  |   await page.goto('/#portfolio');
  97  |   const link = page.locator('.projectLink[href="/portfolio/app-habitstride"]');
  98  |   await link.click();
  99  |   await expect(page).toHaveURL('/portfolio/app-habitstride');
  100 |   await page.goBack();
  101 |   await expect(page.locator('.projectCard')).toHaveCount(47);
  102 |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  103 |   await link.scrollIntoViewIfNeeded();
  104 |   await expect.poll(() => link.locator('..').locator('..').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  105 |   await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  106 |   await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  107 | });
  108 | 
```