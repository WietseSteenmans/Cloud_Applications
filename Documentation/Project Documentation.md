# Jarfish-Teacher Assistant
## Augmented Reality
## September 25, 2016
### Team
- [Gert Claessens](https://github.com/Wizla)
- [Wido Steenmans](https://github.com/WickedWido)
- [Wietse Steenmans](https://github.com/WietseSteenmans)

### Probleemstelling
Onderwijs is één van de grote steunpilaren van onze samenleving. Zonder onderwijs zou de samenleving niet zijn wat het nu is.
Om te kunnen voldoen aan de steeds sneller stijgende vraag aan hoger opgeleide mensen, zijn er ook meer leerkrachten nodig. Deze leerkrachten worden ondersteund door de middelen die ze tot hun beschikking krijgen. Betere middelen laten de leerkrachten toe om hun werk beter te kunnen uitvoeren. Er zou dus gezegd kunnen worden dat betere middelen leiden tot een betere educatie.

Het is de 21ste eeuw, daar horen ook de nodige tools bij. Wij zagen nog flink wat ruimte voor verbetering.

Zo is het bijvoorbeeld niet evident om op een snelle en efficiënte manier te polsen naar de mening van een hele klas. De leerkracht moet manueel de vingers die in de lucht steken tellen zodat er kan gezien worden hoe de klas ergens over denkt.
Dit is een tijdrovend werkje dat gespendeerd kan worden aan belangrijkere zaken.

Tijdens grotere presentaties dient het publiek enkel te luisteren, zonder dat men de informatie actief verwerkt. Informatie overdracht kan verbeterd worden door het publiek actief te betrekken bij de presentatie. Tools die pijlen naar de opinie van een zaal en hier een conclusie van kunnen weergeven zouden hier bij kunnen helpen.

Een mogelijk bijkomend effect is dat er zo meer volk naar dergelijke presentaties gelokt wordt.

Vanaf nu is het gedaan met giswerk en vingertellen tijdens lessen en presentaties.


### Doel van het Project
Het doel van dit project is de nood vervullen van het managen van input van groepen. Dit zal gebeuren aan de hand van een smartphone waarop een app is geïnstalleerd. Deze zal te downloaden zijn via de app-store. De app zal gebruik maken van de smartphone camera om visueel de omgeving vast te leggen. Het publiek zal dan een antwoord moeten "aanduiden" aan de hand van een bordje waar verschillende tekens/markeringen op staan. Elk teken staat voor een verschillend antwoord. De bordjes kunnen eenvoudig zelf gemaakt worden door markeringen op een blad/karton te printen en deze op een stok te bevestigen.

De app op de smartphone is een companion app, horend bij een website. Het één is nutteloos zonder het ander. De website dient simultaan met de companion app open gezet te worden op een PC die verbonden is met een beamer of groot scherm.

De leerkracht of presentator kan zijn/haar eigen scenario maken. Dit wilt zeggen dat men zelf eigen vragen kan opstellen, er verschillende antwoorden aan toe voegen en het correct antwoord later weergeven met een weergave van wat de klas dacht over het onderwerp van de vraag. Het aanmaken van die les zal gebeuren op de website.

Dit is altijd in de vorm van multiple choice vragen omdat we op een beperkte manier de signalen uitlezen. De antwoorden van de ondervraagden zullen als grafieken worden weergegeven omdat dit een efficiënte manier is om data te visualiseren.

Overigens kunnen er ook extra features toegevoegd worden om de lessen interactiever te maken.

De technologie die we gebruiken voor het registreren van de antwoorden is ons voorlopig nog niet duidelijk en is ons vooral onbekend terein.

Hier zijn onze eerste gedachten. Eerst dachten we aan bordjes uitlezen met een teken op, een kruis of een cirkel. Dit is niet altijd even praktisch, zeker niet in een lagere school klas waar al deze tekens volop aanwezig kunnen zijn. Verder keken we naar kleuren en lichtbronnen om de boodschap over te brengen maar dit is evenzeer niet zo efficiënt omdat het dan beter is om in een donkere kamer te werken en dit niet altijd even gewenst is en omdat het naar onze schijn heel moeilijk gaat zijn omdat te programmeren.

We dachten ook aan QR-codes maar daar kwamen al direct voor een obstakel te staan. Hoe gaat een niet high-end fototoestel de QR-codes helemaal achteraan in de klas detecteren? Hier is een oplossing voor, omdat we met een beperkt aantal antwoorden per vraag zitten kunnen we met kleinere QR-codes werken. [Hier](https://artoolkit.org/documentation/doku.php?id=3_Marker_Training:marker_multi) een voorbeeld.

Met de beperkte QR-codes gaan we nu verder. We hopen dat dit een mooi resultaat geeft.

### Methodologie
Dit project wordt uitgevoerd door drie studenten Elektronica-ICT aan de AP Hogeschool voor het vak Cloud Applications. Er wordt aan het project gewerkt in een agile omgeving. Zodat we zo snel mogelijk een werkende basis hebben. Waarna er per sprint nieuwe features worden toegevoegd. Ook zal er op geregelde basis een samenkomst zijn en wordt er besproken wat de volgende stappen zijn voor het project in goede banen te leiden.

### Verwachte Resultaten
Er wordt verwacht dat leerkrachten tevreden gaan zijn met een uitgewerkte tool om hun lessen interactiever te maken. We zouden graag hebben dat leerkrachten dit gebruiken in hun lessen omdat we er van overtuigd zijn dat dit een meerwaarde is voor de manier van les geven. Ook hopen we dat de leerstof beter aan komt bij de leerlingen zodat zelfs de minder presterende leerlingen het sneller begrijpen.

Dan gaan we er van uit dat dit moet leiden tot gemotiveerdere leerlingen. Hierbij hopen we ook dat de peerpressure aan het licht komt bij kleinere kinderen. Ze zullen kijken naar wat andere "coole" kinderen antwoorden en hen proberen na te doen. Zodat kinderen het inzien dat andere mensen fout kunnen zijn en meer overtuigd in hun eigen denken gaan staan zelfs wanneer dit verkeerd is.

We verwachten dat mensen die spreken voor een grote zaal of groep mensen er gebruik van zullen maken. Veel mensen in die sector proberen vaak te innoveren en we hopen dat dit een tool is waarmee ze verder iets kunnen bereiken.

## Technologie
### Companion App
- Android Studio voor het mobile platform
- OpenCv, image processor
- Artoolkit
### Website
- HTML/CSS/Javascript/Bootstrap/Angular
- NodeJS voor backend
- Azure/Amazon voor de hosting

## Uitkomst voor de Maatschappij
Het zal vooral in de educatieve sector gebruikt kunnen worden. Dus voor scholen zal dit zeker een toevoeging zijn bij de middelen die ter beschikking zijn voor het betrekken van leerlingen bij de lessen.
Maar het kan even goed gebruikt worden wanneer er een deelname verwacht wordt van een groot publiek, zoals bij zaal sprekers(TED) of zelfs bij standup comedians. Zodat er een nieuwe interactieve relatie onstaat tussen publiek, wat nu deelnemers worden, en de spreken die de deelnemers leidt door heen nieuwe informatie.

## User Stories / Actoren
### Actoren
- Leerkracht
- Leerlingen
- Smartphone met de companion app geïnstalleerd
- De website
- Computer verbonden aan een groot genoeg scherm, zodat de hele klas mee kan lezen

### User Stories
1. Als leerkracht, wil ik mijn lessen voorbereiden op een website, om te laten zien aan mijn studenten op een groot scherm.
2. Als leerkracht, wil ik een dashboard zien met een lijst van al mijn lessen.
3. Als leerkracht, wil ik de website kunnen besturen met mijn smartphone (remote).
4. Als leerkracht, wil ik vragen stellen aan mijn studenten op een groot scherm.
5. Als leerkracht, wil ik de klas in beeld brengen met mijn smartphone, om zo te polsen naar antwoorden.
6. Als leerkracht, wil ik de antwoorden van mijn studenten weergeven op een groot scherm.
7. Als leerkracht, wil ik het juiste antwoord weergeven op een groot scherm aan mijn leerlingen.
8. Als leerkracht, wil ik mijn lessen delen met andere leerkrachten.
9. Als leerkracht, wil ik lessen van andere leerkrachten bekijken en eventueel opslaan.

## Use Cases
### Use Case 1
1. De Leerkracht zal naar een website surfen, deze website zal men voor heel de klas projecteren (Beamer).
2. De leerkracht kan een vragenscenario selecteren op de smartphone.
  - Ja/neen vraag
  - Multiple Choice met maximum 4 mogelijke antwoorden
3. De vraag wordt weergegeven op de website.
4. De leerlingen maken visueel hun keuze duidelijk. (gebaar/bordje met QR of kleur opsteken)
  - Waarschijnlijk gaan we met een kleine QR code werken.
5. De leerkracht probeert de volledige klasruimte zo goed mogelijk in beeld te brengen.
6. De antwoorden worden geteld door de app. (OpenCV)
7. De leerkracht duwt op een knop om het tellen te stoppen
8. Vervolgens worden de gegevens naar de website gestuurd.
9. Resultaten zullen op het scherm getoond worden, samen met het correcte antwoord.
  - Voor een Ja/neen vraag zal dit een Pie grafiek zijn.
  - Voor de multiple choice zullen het balk grafieken zijn.
10. De leerkracht duwt op next, vervolgens zal er een nieuwe vraag worden gekozen.
11. De tussenstand zal worden geprojecteerd door de beamer.

### Use Case 2
1. Een zaal spreker organiseert een seminarie waar hij spreekt over de scholingsgraad in derdewereldslanden.
2. Op voorhand wordt de vraag geconstrueerd "Hoeveel % van de kinderen tussen de 16 en 18 gaat naar school".
3. De antwoorden kunnen dan zijn "A: 10%, B: 25%".
4. De zaal loopt vol en krijgen allemaal een papiertje met daarop een bolletje getekend en een kruisje op de andere kant.
5. De spreker opent met zijn vraag. Mensen steken hun papier in de lucht.
6. De foto is genomen en doorgestuurd.
7. De resultaten verschijnen samen met het antwoord en iedereen verschiet van de resultaten!
8. Nu heeft de spreker de aandacht van iedereen in de zaal.
9. Succes!

## Mockups
We hebben twee soorten mockups gemaakt omdat er gewerkt wordt met een app en website.

### Web Mockup

Wanneer iemand surft naar de website zal die een unieke QR-code te zien krijgen. Wanneer deze gescand wordt met de app zal de websessie met de app gesynct worden.
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/QrCode-MockUp.png "QRcode")

Na de eerste stap zal er een laadscherm getoond worden totdat de twee devices verbonden zijn.
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/Connecting-MockUp.jpg "Connecting")

Via de gsm wordt er genavigeerd en zullen de geselecteerde vragen getoond worden. Het is natuurlijk ook mogelijk om met knoppen op de website te navigeren. Hier onder twee voorbeelden:

1. Ja/Neen vraag
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/Yes-NoWeb-MockUp.png "Yes-No")
2. Multiple choice vraag
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/MultipleChoiceWeb-MockUp.png "MultipleChoice")

### App Mockup
De app zal gebruikt worden als afstandsbediening voor de website.
Eerst zal de QR-code gescand worden. Dan zal er een sessie worden gestart en het volgende keuze scherm getoond worden.
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/MainMobile-MockUp.png "MultipleChoice")

Bij het selecteren van real-time zal je keuze krijgen tussen een aantal prefabs.
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/RealTime-Mockup.png "RealTime Menu")

Hierop volgen de keuze schermen:
1. Yes/No Question:
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/Yes-No-MockUp.png "Yes-No")
2. MultipleChoice:
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/MultipleChoice-MockUp.png "MultipleChoice")

Bij het selecteren van playbooks kan je vervolgens kiezen tussen je eigen playbooks.
![alttext](https://raw.githubusercontent.com/WietseSteenmans/Cloud_Applications/master/Images/Playbooks-MockUp.png "Playbooks")
## Links
- https://github.com/WietseSteenmans/Cloud_Applications
