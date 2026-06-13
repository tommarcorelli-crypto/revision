// data.js — Données des fiches
// Pour ajouter une fiche : copier un bloc existant, changer l'id, compléter les champs.
window.FICHES_DATA = [
// ────────────────────────────────────────────────────────
// RÉSEAU
// ────────────────────────────────────────────────────────
{id:101,cat:"reseau",titre:"Le protocole DHCP",sub:"DORA, bail, ports UDP 67/68",
 schema:`<svg viewBox="0 0 440 280" xmlns="http://www.w3.org/2000/svg"><defs><marker id="dh-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker><marker id="dh-ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead-green"/></marker></defs><rect class="sd-box" x="15" y="10" width="110" height="32" rx="4"/><text class="sd-text" x="70" y="26">Client</text><rect class="sd-box-accent" x="315" y="10" width="110" height="32" rx="4"/><text class="sd-text" x="370" y="26">Serveur DHCP</text><line class="sd-box sd-dash" x1="70" y1="42" x2="70" y2="265"/><line class="sd-box sd-dash" x1="370" y1="42" x2="370" y2="265"/><line class="sd-arrow" x1="70" y1="75" x2="370" y2="75" marker-end="url(#dh-ab)"/><text class="sd-text-small" x="220" y="65">① DISCOVER</text><text class="sd-text-small" x="220" y="76">(broadcast — Qui est le serveur DHCP ?)</text><line class="sd-arrow-rev" x1="370" y1="130" x2="70" y2="130" marker-end="url(#dh-ag)"/><text class="sd-text-small" x="220" y="120">② OFFER</text><text class="sd-text-small" x="220" y="131">(unicast — Je propose 192.168.1.10)</text><line class="sd-arrow" x1="70" y1="185" x2="370" y2="185" marker-end="url(#dh-ab)"/><text class="sd-text-small" x="220" y="175">③ REQUEST</text><text class="sd-text-small" x="220" y="186">(broadcast — J'accepte cette IP)</text><line class="sd-arrow-rev" x1="370" y1="240" x2="70" y2="240" marker-end="url(#dh-ag)"/><text class="sd-text-small" x="220" y="230">④ ACKNOWLEDGE</text><text class="sd-text-small" x="220" y="241">(unicast — IP confirmée, bail = Xs)</text><text class="sd-label" x="220" y="268">UDP 68 (client) → UDP 67 (serveur)</text></svg>`,
 def:"DHCP (Dynamic Host Configuration Protocol) attribue automatiquement des adresses IP et paramètres réseau aux machines d'un réseau.",
 points:["Processus DORA : Discover → Offer → Request → Acknowledge","Le client envoie un broadcast UDP pour trouver un serveur DHCP","Le serveur propose une IP via un bail (lease) avec durée limitée","Plages d'exclusion : réserver des IPs pour les équipements statiques","Port UDP 67 (serveur) / 68 (client)","Relay DHCP (ip helper-address Cisco) : permet à un serveur de servir plusieurs sous-réseaux"],
 piege:"Ne pas confondre bail et adresse statique. Si le serveur DHCP tombe, les nouveaux clients n'obtiennent plus d'IP.",
 retenir:"DORA = 4 étapes. Bail = durée de location. UDP 67/68. ip helper-address = relay.",
 keywords:["DORA","lease","UDP 67/68","broadcast","scope","exclusion","relay","ip helper-address"]},

{id:102,cat:"reseau",titre:"Le système DNS",sub:"A, AAAA, CNAME, MX, PTR, port 53",
 def:"DNS (Domain Name System) traduit les noms de domaine en adresses IP et inversement.",
 points:["Arborescence : racine → TLD (.fr, .com) → domaine → sous-domaine","Résolution directe : nom → IP (A ou AAAA). Résolution inverse : IP → nom (PTR)","A = IPv4, AAAA = IPv6, CNAME = alias, MX = messagerie, NS = serveur de noms","Port 53 UDP (requêtes), TCP (transferts de zone et réponses > 512 octets)","TTL = durée de vie en cache. Zone = portion de l'arborescence gérée par un serveur","DNS over HTTPS (DoH) et DNS over TLS (DoT) = chiffrement des requêtes DNS"],
 piege:"CNAME ne peut pas pointer vers une IP, seulement vers un autre nom. MX pointe vers un nom (jamais une IP).",
 retenir:"A=IPv4, AAAA=IPv6, CNAME=alias, MX=mail, PTR=inverse. Port 53. TTL = durée de cache.",
 keywords:["A","AAAA","CNAME","MX","PTR","NS","port 53","TTL","DoH","DoT","zone"]},

{id:103,cat:"reseau",titre:"Adressage IPv4 & Subnetting",sub:"CIDR, masque, calcul d'hôtes",
 def:"L'adressage IPv4 identifie chaque machine sur un réseau via une adresse 32 bits en 4 octets.",
 points:["Adresse réseau = AND logique entre IP et masque","Broadcast = dernière adresse du réseau","Notation CIDR : /24 = 256 adresses, /25 = 128 adresses…","Nb d'hôtes = 2^(32−préfixe) − 2 (réseau + broadcast)","VLSM = Variable Length Subnet Mask pour optimiser l'adressage","Plages privées : 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 (RFC 1918)"],
 piege:"La première (réseau) et la dernière (broadcast) adresse ne sont jamais assignables à un hôte. Toujours soustraire 2.",
 retenir:"Hôtes = 2^n − 2. /24 = 254 hôtes. /25 = 126 hôtes. RFC 1918 = plages privées.",
 keywords:["CIDR","broadcast","masque","AND logique","VLSM","RFC 1918","10.0.0.0","192.168.0.0","subnetting"]},

{id:104,cat:"reseau",titre:"Modèle OSI & TCP/IP",sub:"Couches, PDU, encapsulation",
 schema:`<svg viewBox="0 0 440 225" xmlns="http://www.w3.org/2000/svg"><text x="85" y="12" class="sd-label">OSI (7 couches)</text><text x="260" y="12" class="sd-label">TCP/IP (4 couches)</text><text x="385" y="12" class="sd-label">PDU</text><rect class="sd-box" x="10" y="20" width="150" height="27" rx="4"/><text class="sd-text" x="85" y="33.5">Application (7)</text><rect class="sd-box" x="10" y="47" width="150" height="27" rx="4"/><text class="sd-text" x="85" y="60.5">Présentation (6)</text><rect class="sd-box" x="10" y="74" width="150" height="27" rx="4"/><text class="sd-text" x="85" y="87.5">Session (5)</text><rect class="sd-box" x="10" y="101" width="150" height="27" rx="4"/><text class="sd-text" x="85" y="114.5">Transport (4)</text><rect class="sd-box" x="10" y="128" width="150" height="27" rx="4"/><text class="sd-text" x="85" y="141.5">Réseau (3)</text><rect class="sd-box" x="10" y="155" width="150" height="27" rx="4"/><text class="sd-text" x="85" y="168.5">Liaison (2)</text><rect class="sd-box" x="10" y="182" width="150" height="27" rx="4"/><text class="sd-text" x="85" y="195.5">Physique (1)</text><rect class="sd-box" x="190" y="20" width="140" height="81" rx="4"/><text class="sd-text" x="260" y="60.5">Application</text><rect class="sd-box" x="190" y="101" width="140" height="27" rx="4"/><text class="sd-text" x="260" y="114.5">Transport</text><rect class="sd-box" x="190" y="128" width="140" height="27" rx="4"/><text class="sd-text" x="260" y="141.5">Internet</text><rect class="sd-box" x="190" y="155" width="140" height="54" rx="4"/><text class="sd-text" x="260" y="182">Accès réseau</text><rect class="sd-box-accent" x="345" y="20" width="85" height="81" rx="4"/><text class="sd-text" x="387.5" y="60.5">Données</text><rect class="sd-box-accent" x="345" y="101" width="85" height="27" rx="4"/><text class="sd-text" x="387.5" y="114.5">Segment</text><rect class="sd-box-accent" x="345" y="128" width="85" height="27" rx="4"/><text class="sd-text" x="387.5" y="141.5">Paquet</text><rect class="sd-box-accent" x="345" y="155" width="85" height="27" rx="4"/><text class="sd-text" x="387.5" y="168.5">Trame</text><rect class="sd-box-accent" x="345" y="182" width="85" height="27" rx="4"/><text class="sd-text" x="387.5" y="195.5">Bit</text></svg>`,
 def:"Modèles de référence décrivant comment les données transitent sur un réseau en couches distinctes.",
 points:["OSI 7 couches : Physique, Liaison, Réseau, Transport, Session, Présentation, Application","TCP/IP 4 couches : Accès réseau, Internet, Transport, Application","PDU : bit (1), trame (2), paquet (3), segment TCP / datagramme UDP (4)","Encapsulation descendante, désencapsulation montante","Switch L2 = couche 2, routeur = couche 3, pare-feu = souvent couche 3/4/7","Proxy/WAF = couche 7 (application)"],
 piege:"Switch = couche 2. Routeur = couche 3. Un IPS inline peut agir jusqu'en couche 7.",
 retenir:"OSI 7 couches. TCP/IP 4 couches. PDU = trame (L2), paquet (L3), segment (L4).",
 keywords:["OSI","TCP/IP","encapsulation","PDU","couche 2","couche 3","switch","routeur","WAF","proxy"]},

{id:105,cat:"reseau",titre:"VLAN & Trunking 802.1Q",sub:"Segmentation logique, trunk, VLAN natif",
 schema:`<svg viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box" x="10" y="10" width="80" height="28" rx="4"/><text class="sd-text" x="50" y="24">PC VLAN 10</text><rect class="sd-box" x="10" y="55" width="80" height="28" rx="4"/><text class="sd-text" x="50" y="69">PC VLAN 20</text><rect class="sd-box" x="10" y="100" width="80" height="28" rx="4"/><text class="sd-text" x="50" y="114">PC VLAN 10</text><rect class="sd-box-accent" x="130" y="40" width="80" height="90" rx="6"/><text class="sd-text" x="170" y="75">Switch A</text><text class="sd-text-small" x="170" y="90">Access</text><text class="sd-text-small" x="170" y="103">ports</text><rect class="sd-box-accent" x="240" y="40" width="80" height="90" rx="6"/><text class="sd-text" x="280" y="75">Switch B</text><text class="sd-text-small" x="280" y="90">Access</text><text class="sd-text-small" x="280" y="103">ports</text><rect class="sd-box" x="360" y="55" width="70" height="28" rx="4"/><text class="sd-text" x="395" y="69">PC VLAN 10</text><rect class="sd-box" x="360" y="100" width="70" height="28" rx="4"/><text class="sd-text" x="395" y="114">PC VLAN 20</text><line class="sd-box" x1="90" y1="24" x2="130" y2="60"/><line class="sd-box" x1="90" y1="69" x2="130" y2="85"/><line class="sd-box" x1="90" y1="114" x2="130" y2="110"/><line class="sd-box" x1="320" y1="69" x2="360" y2="69"/><line class="sd-box" x1="320" y1="100" x2="360" y2="114"/><rect class="sd-box-accent" x="178" y="78" width="64" height="22" rx="4"/><text class="sd-text" x="210" y="89">TRUNK</text><line class="sd-box" x1="210" y1="60" x2="210" y2="78"/><line class="sd-box" x1="210" y1="100" x2="210" y2="130"/><text class="sd-text-small" x="210" y="143">802.1Q tag : [DA][SA][TPID 0x8100][TCI: PCP+DEI+VID][Type][Data]</text><rect class="sd-box" x="10" y="160" width="415" height="55" rx="4"/><text class="sd-text-small" x="218" y="177">Port Access : une trame reçue → ajout du tag VLAN</text><text class="sd-text-small" x="218" y="192">Port Trunk : trame envoyée avec tag 802.1Q (sauf VLAN natif = sans tag)</text><text class="sd-text-small" x="218" y="207">VLAN natif par défaut = VLAN 1 → à changer pour éviter le VLAN hopping</text></svg>`,
 def:"Un VLAN (Virtual LAN) segmente logiquement un réseau sur le même équipement physique pour isoler les flux.",
 points:["Port access = membre d'un seul VLAN. Port trunk = transporte plusieurs VLANs","Tag 802.1Q inséré dans la trame Ethernet — 12 bits pour l'ID VLAN (0 à 4094)","VLAN natif = VLAN envoyé sans tag sur un trunk (défaut VLAN 1 — à changer !)","Inter-VLAN routing : routeur ou switch L3 obligatoire pour faire communiquer 2 VLANs","Avantages : isolation des broadcasts, sécurité, flexibilité","VTP (VLAN Trunking Protocol) : propager les VLANs automatiquement entre switches Cisco"],
 piege:"2 machines sur des VLANs différents ne communiquent JAMAIS directement, même sur le même switch physique.",
 retenir:"VLAN = isolation logique. 802.1Q = tagging. Trunk = multi-VLAN. VLAN natif = sans tag.",
 keywords:["VLAN","802.1Q","trunk","VLAN natif","inter-VLAN","switch L3","VTP","segmentation","broadcast"]},

{id:106,cat:"reseau",titre:"IPv6 — Fondamentaux",sub:"Adressage, types d'adresses, transition",
 def:"IPv6 est le successeur d'IPv4 avec un espace d'adressage de 128 bits pour répondre à l'épuisement des adresses.",
 points:["128 bits = 340 sextillions d'adresses possibles","Notation hexadécimale : 2001:0db8:85a3::8a2e:0370:7334","Types d'adresses : unicast globale (2000::/3), lien-local (fe80::/10), multicast (ff00::/8)","Pas de broadcast en IPv6 — remplacé par le multicast","NDP (Neighbor Discovery Protocol) remplace ARP","Mécanismes de transition : double stack, tunneling 6to4, NAT64"],
 piege:"IPv6 n'a pas de broadcast. Le ARP est remplacé par NDP. Les adresses lien-local (fe80::) ne sont pas routables.",
 retenir:"128 bits, pas de broadcast, NDP remplace ARP. Lien-local = fe80::/10. Multicast = ff00::/8.",
 keywords:["IPv6","128 bits","NDP","lien-local","fe80","multicast","double stack","6to4","NAT64","unicast"]},

// ────────────────────────────────────────────────────────
// CISCO
// ────────────────────────────────────────────────────────
{id:201,cat:"cisco",titre:"IOS Cisco — Navigation et modes",sub:"Mode utilisateur, privilégié, config globale",
 def:"Cisco IOS (Internetwork Operating System) est le système d'exploitation des équipements Cisco, avec une hiérarchie de modes de configuration.",
 points:["Mode user EXEC (>) : commandes de visualisation limitées (ping, traceroute)","Mode privileged EXEC (#) : accès complet avec 'enable' (mot de passe enable)","Mode configuration globale (config)# : avec 'configure terminal' (conf t)","Mode sous-interface (config-if)# : avec 'interface GigabitEthernet0/0'","Sortir : Ctrl+Z ou 'end' = retour au mode #. 'exit' = remonte d'un niveau","'?' = aide contextuelle. Tab = complétion automatique des commandes"],
 piege:"'write memory' ou 'copy run start' = sauvegarder la config. Sans ça, tout est perdu au redémarrage.",
 retenir:"> = user. # = privilégié. (config)# = global. (config-if)# = interface. Ctrl+Z = retour au #. copy run start = sauvegarder.",
 keywords:["IOS","enable","configure terminal","conf t","show","copy run start","write memory","Ctrl+Z","mode"]},

{id:202,cat:"cisco",titre:"Cisco — Configuration VLAN et ports",sub:"switchport, access, trunk",
 def:"Configuration des VLANs sur un switch Cisco IOS avec les commandes switchport.",
 is_cmd:true,
 cmds:[
   {section:"Création et gestion des VLANs", items:[
     {cmd:"vlan 10", comment:"# Créer le VLAN 10 (mode config)"},
     {cmd:"name PRODUCTION", comment:"# Nommer le VLAN"},
     {cmd:"show vlan brief", comment:"# Lister tous les VLANs et leurs ports"},
     {cmd:"show interfaces trunk", comment:"# Voir les ports trunk actifs"}
   ]},
   {section:"Port access (un seul VLAN)", items:[
     {cmd:"interface GigabitEthernet0/1", comment:"# Entrer sur l'interface"},
     {cmd:"switchport mode access", comment:"# Mode accès (un seul VLAN)"},
     {cmd:"switchport access vlan 10", comment:"# Assigner au VLAN 10"},
     {cmd:"spanning-tree portfast", comment:"# PortFast pour les postes clients (pas les switches)"}
   ]},
   {section:"Port trunk (plusieurs VLANs)", items:[
     {cmd:"switchport mode trunk", comment:"# Mode trunk"},
     {cmd:"switchport trunk native vlan 99", comment:"# Changer le VLAN natif (ne pas laisser VLAN 1)"},
     {cmd:"switchport trunk allowed vlan 10,20,99", comment:"# Autoriser uniquement ces VLANs"}
   ]}
 ],
 piege:"PortFast ne doit JAMAIS être activé sur un port connecté à un autre switch — cela désactive la protection STP et peut créer des boucles.",
 retenir:"switchport mode access + access vlan X = port access. switchport mode trunk = trunk. VLAN natif = à changer (pas VLAN 1).",
 keywords:["switchport","access","trunk","VLAN natif","portfast","STP","show vlan","show interfaces trunk"]},

{id:203,cat:"cisco",titre:"Cisco — Routage inter-VLAN & Router-on-a-Stick",sub:"Sous-interfaces, encapsulation 802.1Q",
 schema:`<svg viewBox="0 0 440 220" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ros-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker></defs><rect class="sd-box-accent" x="170" y="8" width="100" height="48" rx="6"/><text class="sd-text" x="220" y="26">Routeur</text><text class="sd-text-small" x="220" y="39">G0/0.10 = 192.168.10.1</text><text class="sd-text-small" x="220" y="51">G0/0.20 = 192.168.20.1</text><line class="sd-box" x1="220" y1="56" x2="220" y2="82"/><text class="sd-text-small" x="220" y="76">trunk 802.1Q</text><rect class="sd-box-accent" x="170" y="82" width="100" height="32" rx="6"/><text class="sd-text" x="220" y="98">Switch L2</text><text class="sd-text-small" x="220" y="110">trunk vers routeur</text><line class="sd-box" x1="200" y1="114" x2="120" y2="148"/><line class="sd-box" x1="240" y1="114" x2="320" y2="148"/><rect class="sd-box" x="60" y="148" width="120" height="36" rx="4"/><text class="sd-text" x="120" y="163">VLAN 10</text><text class="sd-text-small" x="120" y="176">192.168.10.0/24</text><rect class="sd-box" x="260" y="148" width="120" height="36" rx="4"/><text class="sd-text" x="320" y="163">VLAN 20</text><text class="sd-text-small" x="320" y="176">192.168.20.0/24</text><line class="sd-arrow" x1="120" y1="148" x2="165" y2="100" marker-end="url(#ros-ab)"/><line class="sd-arrow" x1="320" y1="148" x2="275" y2="100" marker-end="url(#ros-ab)"/><text class="sd-label" x="220" y="205">1 seul câble physique → N sous-interfaces logiques (encapsulation dot1Q)</text></svg>`,
 def:"Le routage inter-VLAN sur Cisco peut se faire via des sous-interfaces (router-on-a-stick) ou un switch L3.",
 is_cmd:true,
 cmds:[
   {section:"Router-on-a-Stick (sous-interfaces routeur)", items:[
     {cmd:"interface GigabitEthernet0/0.10", comment:"# Créer une sous-interface pour le VLAN 10"},
     {cmd:"encapsulation dot1Q 10", comment:"# Associer au VLAN 10 avec tag 802.1Q"},
     {cmd:"ip address 192.168.10.1 255.255.255.0", comment:"# Adresse IP = passerelle du VLAN 10"},
     {cmd:"interface GigabitEthernet0/0.20", comment:"# Sous-interface VLAN 20"},
     {cmd:"encapsulation dot1Q 20", comment:"# Tag VLAN 20"},
     {cmd:"ip address 192.168.20.1 255.255.255.0", comment:"# Passerelle VLAN 20"}
   ]},
   {section:"Switch L3 (SVI — Switched Virtual Interface)", items:[
     {cmd:"ip routing", comment:"# Activer le routage IP sur le switch L3"},
     {cmd:"interface vlan 10", comment:"# Créer l'interface virtuelle VLAN 10"},
     {cmd:"ip address 192.168.10.1 255.255.255.0", comment:"# IP = passerelle"},
     {cmd:"no shutdown", comment:"# Activer l'interface"}
   ]}
 ],
 piege:"Pour router-on-a-stick, le port du switch vers le routeur doit être configuré en TRUNK. Sans 'ip routing' sur un switch L3, aucun routage n'est possible.",
 retenir:"Sous-interface = encapsulation dot1Q X. SVI = interface vlan X + ip routing. Toujours activer avec no shutdown.",
 keywords:["router-on-a-stick","sous-interface","encapsulation dot1Q","SVI","ip routing","no shutdown","inter-VLAN"]},

{id:204,cat:"cisco",titre:"Cisco — ACL (Access Control Lists)",sub:"ACL standard, étendue, named",
 def:"Les ACL Cisco filtrent le trafic réseau en autorisant ou bloquant des paquets selon des critères (IP, protocole, port).",
 points:["ACL standard (1–99) : filtre uniquement sur l'IP source — à placer proche de la DESTINATION","ACL étendue (100–199) : filtre sur source, destination, protocole, port — à placer proche de la SOURCE","Named ACL : même fonctionnalité avec un nom lisible au lieu d'un numéro","Traitement séquentiel : dès qu'une règle correspond, les suivantes sont ignorées","Implicit deny all : toute ACL se termine par un 'deny any' implicite non visible","Application : 'ip access-group NOM in|out' sur une interface"],
 piege:"Si une ACL ne contient que des 'permit', le implicit deny all bloque tout le reste. Il faut toujours vérifier ce qui est permis implicitement.",
 retenir:"Standard = IP source seulement, proche destination. Étendue = source+dest+port, proche source. Implicit deny all à la fin.",
 keywords:["ACL","standard","étendue","named","permit","deny","implicit deny","access-group","in","out"]},

{id:205,cat:"cisco",titre:"Cisco — Routage statique & dynamique",sub:"ip route, OSPF, EIGRP",
 def:"Cisco supporte le routage statique (manuel) et dynamique (protocoles de routage) pour acheminer les paquets.",
 is_cmd:true,
 cmds:[
   {section:"Routes statiques", items:[
     {cmd:"ip route 192.168.20.0 255.255.255.0 192.168.10.2", comment:"# Route statique vers 192.168.20.0/24 via le next-hop"},
     {cmd:"ip route 0.0.0.0 0.0.0.0 10.0.0.1", comment:"# Route par défaut (default route)"},
     {cmd:"show ip route", comment:"# Afficher la table de routage"}
   ]},
   {section:"OSPF (protocole dynamique à état de liens)", items:[
     {cmd:"router ospf 1", comment:"# Activer OSPF avec le process ID 1"},
     {cmd:"network 192.168.1.0 0.0.0.255 area 0", comment:"# Annoncer ce réseau dans l'area 0"},
     {cmd:"show ip ospf neighbor", comment:"# Voir les voisins OSPF"},
     {cmd:"show ip ospf database", comment:"# Base de données des LSA"}
   ]},
   {section:"Vérification générale", items:[
     {cmd:"show ip protocols", comment:"# Protocoles de routage actifs"},
     {cmd:"show ip route ospf", comment:"# Routes apprises via OSPF (O dans la table)"}
   ]}
 ],
 piege:"Le wildcard mask OSPF est l'inverse du masque subnet : /24 = masque 255.255.255.0 = wildcard 0.0.0.255.",
 retenir:"ip route = statique. 'router ospf 1' + network = OSPF. show ip route = table de routage. AD : directe=0, statique=1, OSPF=110.",
 keywords:["ip route","default route","OSPF","area 0","wildcard","show ip route","next-hop","AD","EIGRP","network"]},

{id:206,cat:"cisco",titre:"Cisco — STP & Rapid STP",sub:"Spanning Tree Protocol, prévention des boucles",
 schema:`<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box-accent" x="165" y="8" width="110" height="38" rx="6"/><text class="sd-text" x="220" y="23">Root Bridge</text><text class="sd-text-small" x="220" y="35">BID = 4096 + MAC:AA</text><text class="sd-text-small" x="220" y="46">(priorité la plus basse)</text><rect class="sd-box" x="30" y="110" width="110" height="38" rx="6"/><text class="sd-text" x="85" y="125">Switch B</text><text class="sd-text-small" x="85" y="137">BID = 32768 + MAC:BB</text><text class="sd-text-small" x="85" y="148">Root Port → Root</text><rect class="sd-box" x="300" y="110" width="110" height="38" rx="6"/><text class="sd-text" x="355" y="125">Switch C</text><text class="sd-text-small" x="355" y="137">BID = 32768 + MAC:CC</text><text class="sd-text-small" x="355" y="148">Root Port → Root</text><line class="sd-box" x1="185" y1="46" x2="100" y2="110"/><line class="sd-box" x1="255" y1="46" x2="340" y2="110"/><text class="sd-text-small" x="130" y="83">DP (désigné)</text><text class="sd-text-small" x="295" y="83">DP (désigné)</text><line class="sd-box" x1="140" y1="129" x2="300" y2="129"/><rect class="sd-box" x="170" y="119" width="100" height="20" rx="3"/><text class="sd-text-small" x="220" y="132">🚫 BLK (bloqué)</text><text class="sd-label" x="220" y="175">Root Bridge = plus petit Bridge ID (priorité + MAC)</text><text class="sd-label" x="220" y="189">Lien B↔C bloqué → évite la boucle. RSTP = convergence 1-2s.</text></svg>`,
 def:"STP (Spanning Tree Protocol) prévient les boucles dans un réseau commuté en désactivant logiquement des liens redondants.",
 points:["Election du Root Bridge : le switch avec le plus petit Bridge ID (priorité + MAC) devient Root","Ports Root : chaque switch (non-Root) a un port vers le Root. Port désigné = port actif sur chaque segment","Port bloqué (Blocking) = ports redondants désactivés par STP pour éviter les boucles","STP classique (802.1D) : convergence lente (30-50 secondes). RSTP (802.1w) = convergence rapide (1-2 s)","PVST+ = Cisco Rapid PVST+ = STP par VLAN","Commande : 'spanning-tree mode rapid-pvst'"],
 piege:"Si STP est désactivé sur un réseau avec des liens redondants, une tempête de broadcast peut paralyser tout le réseau en secondes.",
 retenir:"STP = anti-boucle. Root Bridge = plus petit Bridge ID. RSTP = rapide. PortFast = bypass STP pour postes clients.",
 keywords:["STP","RSTP","Root Bridge","Bridge ID","blocking","Rapid PVST+","PortFast","boucle","convergence","802.1w"]},

{id:207,cat:"cisco",titre:"Cisco — NAT & PAT",sub:"Traduction d'adresses, surcharge",
 schema:`<svg viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg"><defs><marker id="nat-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker><marker id="nat-ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead-green"/></marker></defs><rect class="sd-box" x="5" y="30" width="100" height="26" rx="4"/><text class="sd-text" x="55" y="44">PC1 :1025</text><text class="sd-text-small" x="55" y="55">192.168.1.10</text><rect class="sd-box" x="5" y="75" width="100" height="26" rx="4"/><text class="sd-text" x="55" y="89">PC2 :3456</text><text class="sd-text-small" x="55" y="100">192.168.1.11</text><rect class="sd-box" x="5" y="120" width="100" height="26" rx="4"/><text class="sd-text" x="55" y="134">PC3 :7890</text><text class="sd-text-small" x="55" y="145">192.168.1.12</text><rect class="sd-box-accent" x="160" y="60" width="120" height="90" rx="6"/><text class="sd-text" x="220" y="82">Routeur NAT</text><text class="sd-text-small" x="220" y="97">inside: eth0</text><text class="sd-text-small" x="220" y="109">outside: eth1</text><text class="sd-text-small" x="220" y="121">203.0.113.1</text><text class="sd-text-small" x="220" y="136">(IP publique)</text><rect class="sd-box" x="335" y="75" width="100" height="40" rx="4"/><text class="sd-text" x="385" y="92">Internet</text><text class="sd-text-small" x="385" y="105">Serveur distant</text><line class="sd-arrow" x1="105" y1="43" x2="160" y2="90" marker-end="url(#nat-ab)"/><line class="sd-arrow" x1="105" y1="88" x2="160" y2="100" marker-end="url(#nat-ab)"/><line class="sd-arrow" x1="105" y1="133" x2="160" y2="110" marker-end="url(#nat-ab)"/><line class="sd-arrow" x1="280" y1="95" x2="335" y2="95" marker-end="url(#nat-ab)"/><text class="sd-text-small" x="307" y="88">203.0.113.1</text><text class="sd-text-small" x="307" y="100">:1025/:3456/:7890</text><rect class="sd-box" x="5" y="178" width="430" height="42" rx="4"/><text class="sd-text-small" x="220" y="194">Table PAT : 192.168.1.10:1025 ↔ 203.0.113.1:1025</text><text class="sd-text-small" x="220" y="210">            192.168.1.11:3456 ↔ 203.0.113.1:3456   (N IPs privées → 1 IP publique)</text></svg>`,
 def:"NAT (Network Address Translation) traduit les adresses IP privées en adresses publiques pour permettre l'accès à Internet.",
 points:["NAT statique : 1 IP privée → 1 IP publique fixe","NAT dynamique : pool d'IPs publiques partagé entre plusieurs hôtes","PAT (Port Address Translation) / NAT overload : N IP privées → 1 IP publique avec des ports différents","Interface 'inside' = réseau privé. Interface 'outside' = réseau public","Commandes : 'ip nat inside source' + 'ip nat inside/outside' sur les interfaces","'show ip nat translations' = voir la table NAT"],
 piege:"PAT utilise les ports pour distinguer les sessions — les ports source changent. Certains protocoles (SIP, FTP actif) posent des problèmes avec PAT.",
 retenir:"NAT statique = 1:1. PAT = N:1 avec ports. inside = LAN. outside = WAN. show ip nat translations.",
 keywords:["NAT","PAT","overload","inside","outside","statique","dynamique","ip nat inside source","show ip nat"]},

{id:208,cat:"cisco",titre:"Cisco — Port Security & DHCP Snooping",sub:"Sécurité sur les ports switch",
 def:"Port Security et DHCP Snooping sont des mécanismes de sécurité Cisco pour protéger les couches 2 du réseau.",
 points:["Port Security : limite le nombre de MAC autorisées sur un port (évite MAC flooding)","Violation modes : shutdown (désactive le port), restrict (log + drop), protect (drop silencieux)","Sticky : apprend automatiquement les MACs et les mémorise dans la config running","DHCP Snooping : bloque les réponses DHCP sur les ports non fiables (untrusted)","Port trusted DHCP Snooping = uniquement le port vers le vrai serveur DHCP","ARP Inspection (DAI) : protège contre l'ARP spoofing — s'appuie sur la table DHCP snooping"],
 piege:"Si le port en 'shutdown' violation est déclenché, il faut le remettre manuellement avec 'no shutdown' (ou err-disable recovery).",
 retenir:"Port Security = limite MAC. DHCP Snooping = bloque faux DHCP. DAI = anti-ARP spoofing. Sticky = apprentissage automatique.",
 keywords:["port security","DHCP snooping","DAI","ARP inspection","MAC flooding","sticky","violation","shutdown","trusted","untrusted"]},

{id:209,cat:"cisco",titre:"Cisco — Commandes de diagnostic",sub:"show, debug, ping, traceroute",
 def:"Les commandes show et debug sont essentielles pour diagnostiquer et résoudre les problèmes sur les équipements Cisco.",
 is_cmd:true,
 cmds:[
   {section:"Commandes show essentielles", items:[
     {cmd:"show version", comment:"# Version IOS, uptime, RAM, interfaces"},
     {cmd:"show running-config", comment:"# Configuration active (en RAM)"},
     {cmd:"show startup-config", comment:"# Configuration sauvegardée (NVRAM)"},
     {cmd:"show interfaces GigabitEthernet0/0", comment:"# État et stats d'une interface"},
     {cmd:"show ip interface brief", comment:"# Résumé de toutes les interfaces (IP + état)"},
     {cmd:"show cdp neighbors detail", comment:"# Voisins Cisco connectés (CDP)"}
   ]},
   {section:"Diagnostic réseau", items:[
     {cmd:"ping 192.168.1.1", comment:"# Tester la connectivité"},
     {cmd:"traceroute 8.8.8.8", comment:"# Tracer le chemin"},
     {cmd:"show arp", comment:"# Table ARP du routeur"},
     {cmd:"show mac address-table", comment:"# Table MAC du switch"}
   ]},
   {section:"Débogage (attention en production)", items:[
     {cmd:"debug ip routing", comment:"# Voir les changements de table de routage (verbose!)"},
     {cmd:"no debug all", comment:"# TOUJOURS stopper le debug après usage"},
     {cmd:"terminal monitor", comment:"# Voir les logs en session SSH/Telnet"}
   ]}
 ],
 piege:"'debug all' sur un routeur en production peut le surcharger jusqu'au crash. Toujours utiliser des debugs ciblés et stopper avec 'no debug all'.",
 retenir:"show ip int brief = vue rapide. show run = config active. copy run start = sauvegarder. no debug all = stopper les debugs.",
 keywords:["show version","show running-config","show ip interface brief","show arp","debug","cdp","ping","traceroute","copy run start"]},

// ────────────────────────────────────────────────────────
// RÉSEAU AVANCÉ
// ────────────────────────────────────────────────────────
{id:301,cat:"reseauavance",titre:"Protocoles de routage — OSPF, BGP, EIGRP",sub:"Comparaison et cas d'usage",
 schema:`<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box-accent" x="150" y="90" width="140" height="60" rx="4"/><text class="sd-text" x="220" y="113">Area 0</text><text class="sd-text-small" x="220" y="129">(Backbone)</text><rect class="sd-box" x="10" y="20" width="110" height="50" rx="4"/><text class="sd-text" x="65" y="45">Area 1</text><rect class="sd-box" x="320" y="20" width="110" height="50" rx="4"/><text class="sd-text" x="375" y="45">Area 2</text><rect class="sd-box" x="10" y="170" width="110" height="50" rx="4"/><text class="sd-text" x="65" y="195">Area 3</text><rect class="sd-box" x="320" y="170" width="110" height="50" rx="4"/><text class="sd-text" x="375" y="195">Area 4</text><rect class="sd-box" x="85" y="55" width="60" height="28" rx="4"/><text class="sd-text" x="115" y="69">ABR</text><rect class="sd-box" x="295" y="55" width="60" height="28" rx="4"/><text class="sd-text" x="325" y="69">ABR</text><rect class="sd-box" x="85" y="140" width="60" height="28" rx="4"/><text class="sd-text" x="115" y="154">ABR</text><rect class="sd-box" x="295" y="140" width="60" height="28" rx="4"/><text class="sd-text" x="325" y="154">ABR</text><line class="sd-box" x1="65" y1="45" x2="115" y2="69"/><line class="sd-box" x1="220" y1="90" x2="115" y2="83"/><line class="sd-box" x1="375" y1="45" x2="325" y2="69"/><line class="sd-box" x1="220" y1="90" x2="325" y2="83"/><line class="sd-box" x1="65" y1="195" x2="115" y2="168"/><line class="sd-box" x1="220" y1="150" x2="115" y2="154"/><line class="sd-box" x1="375" y1="195" x2="325" y2="168"/><line class="sd-box" x1="220" y1="150" x2="325" y2="154"/><text class="sd-label" x="220" y="232">Toutes les areas doivent passer par Area 0 (obligatoire)</text></svg>`,
 def:"Les protocoles de routage dynamiques permettent aux routeurs d'échanger leurs tables de routage automatiquement.",
 extra_table:[
   ["OSPF","IGP — état de liens","110","Area, LSA, Dijkstra","Entreprises, campus"],
   ["EIGRP","IGP — vecteur de distance avancé (Cisco)","90","Bande passante + délai","Réseaux Cisco purs"],
   ["BGP","EGP — vecteur de chemin","20 (eBGP)","AS Path, politiques complexes","Internet, ISP, multi-homing"],
   ["RIP v2","IGP — vecteur de distance","120","Sauts (max 15)","Petits réseaux, legacy"]
 ],
 extra_table_headers:["Protocole","Type","Distance admin.","Métrique","Usage typique"],
 points:["OSPF : zones (area) pour réduire la taille des LSA. Area 0 = backbone obligatoire","BGP : protocole d'internet. Chaque AS a un numéro (ASN). eBGP = entre AS, iBGP = dans un AS","EIGRP : protocole Cisco propriétaire (maintenant ouvert). Convergence rapide","Distance administrative : préférence quand plusieurs protocoles proposent la même route"],
 piege:"OSPF area 0 est obligatoire. Toutes les autres areas doivent se connecter à area 0. Une area isolée ne peut pas router vers les autres.",
 retenir:"OSPF = état de liens, area. BGP = internet, AS. EIGRP = Cisco, rapide. Distance admin : EIGRP(90) < OSPF(110) < RIP(120).",
 keywords:["OSPF","BGP","EIGRP","RIP","area 0","AS","LSA","distance administrative","IGP","EGP","eBGP","iBGP"]},

{id:302,cat:"reseauavance",titre:"Spanning Tree — Optimisations",sub:"BPDU Guard, Root Guard, Loop Guard",
 def:"Au-delà du STP de base, Cisco propose des mécanismes de protection avancés pour renforcer la stabilité et la sécurité du réseau.",
 points:["BPDU Guard : désactive un port si un BPDU est reçu (évite qu'un switch non autorisé rejoigne la topologie)","Root Guard : empêche un port de devenir Root Port (protège le Root Bridge élu)","Loop Guard : détecte la perte unilatérale de BPDUs et met le port en loop-inconsistent","PortFast : passe immédiatement en Forwarding (pour les postes clients uniquement)","Uplinkfast et Backbone Fast : accélèrent la convergence STP (802.1D classique)","Cisco recommande : BPDU Guard sur tous les ports PortFast"],
 piege:"BPDU Guard + PortFast = à activer sur TOUS les ports vers des postes clients. Ne jamais activer PortFast sur un port trunk vers un autre switch.",
 retenir:"BPDU Guard = désactive si BPDU reçu. Root Guard = protège Root Bridge. PortFast = postes clients uniquement.",
 keywords:["BPDU Guard","Root Guard","Loop Guard","PortFast","Uplinkfast","convergence STP","err-disable","topology change"]},

{id:303,cat:"reseauavance",titre:"Qualité de Service (QoS)",sub:"DSCP, priorité, files d'attente",
 def:"La QoS (Quality of Service) permet de prioriser certains types de trafic (voix, vidéo) sur des liens à bande passante limitée.",
 points:["Classification : identifier le trafic (DSCP, CoS, ACL). Marquage : apposer le label de priorité","Mise en file d'attente (queuing) : FIFO, WFQ, CBWFQ, LLQ (pour la voix)","Priorité : trafic voix = EF (Expedited Forwarding, DSCP 46). Signalisation = AF31","Policing : limiter le trafic à une bande passante max (drop si dépassement)","Shaping : lisser le trafic (buffer si dépassement, pas de drop)","Trust boundary : à quel niveau faire confiance aux marquages des terminaux"],
 piege:"Policing = drop si dépassement (dégradation). Shaping = buffer si dépassement (retard). La voix supporte mal le retard mais pas les drops.",
 retenir:"QoS = classer + marquer + mettre en file. Voix = EF DSCP 46. Policing = drop. Shaping = buffer.",
 keywords:["QoS","DSCP","CoS","LLQ","CBWFQ","policing","shaping","EF","AF","voix","priorité","marking"]},

{id:304,cat:"reseauavance",titre:"WAN & Technologies de connexion",sub:"MPLS, SD-WAN, fibre, 4G/5G",
 def:"Les technologies WAN permettent de connecter des sites distants entre eux via des réseaux à longue distance.",
 points:["MPLS (Multiprotocol Label Switching) : réseau privé opérateur, étiquettes pour acheminer le trafic, SLA garanti","SD-WAN (Software-Defined WAN) : agrège plusieurs liens WAN (MPLS + fibre + 4G), centralise la gestion","Fibre optique : FTTH (jusqu'au domicile), FTTO (jusqu'au bureau), FTTB (jusqu'au bâtiment)","4G/5G : backup WAN, sites isolés. 5G = latence < 1ms, débit > 1 Gbps","VPN IPsec site-to-site : alternative économique à MPLS sur internet public","Leased line (ligne louée) : débit symétrique dédié, coût élevé"],
 piege:"MPLS n'est pas chiffré par défaut. Sur MPLS, les données circulent en clair entre les PE (Provider Edge) et CE (Customer Edge). Il faut ajouter IPsec si la confidentialité est requise.",
 retenir:"MPLS = privé opérateur, SLA. SD-WAN = multi-liens + orchestration. IPsec = chiffrement sur internet public. 5G = latence < 1ms.",
 keywords:["MPLS","SD-WAN","FTTH","IPsec site-to-site","leased line","PE","CE","4G","5G","WAN","agrégation"]},

// ────────────────────────────────────────────────────────
// HACKING ÉTHIQUE / PENTEST
// ────────────────────────────────────────────────────────
{id:401,cat:"hacking",titre:"Méthodologie Pentest",sub:"Phases, cadre légal, types de tests",
 def:"Un test d'intrusion (pentest) est une attaque simulée et autorisée pour identifier les vulnérabilités d'un système avant qu'un attaquant ne le fasse.",
 points:["5 phases : Reconnaissance → Scan → Exploitation → Post-exploitation → Rapport","Black box : l'auditeur n'a aucune info. Grey box : info partielle. White box : info complète","Cadre légal : TOUJOURS avoir une autorisation écrite avant de commencer (lettre de mission)","Bug bounty : programme officiel où des hackers externes signalent des vulnérabilités en échange d'une récompense","CVSS (Common Vulnerability Scoring System) : score de 0 à 10 pour quantifier la sévérité d'une vuln","CVE (Common Vulnerabilities and Exposures) : identifiant unique pour chaque vulnérabilité connue"],
 piege:"Un pentest sans autorisation écrite = infraction pénale (article 323-1 du Code pénal). L'intention bienveillante ne protège pas.",
 retenir:"Pentest = attaque autorisée. 5 phases. Black/Grey/White box. CVSS = gravité. CVE = identifiant vuln. Autorisation écrite OBLIGATOIRE.",
 keywords:["pentest","black box","grey box","white box","CVSS","CVE","reconnaissance","exploitation","post-exploitation","bug bounty","lettre de mission"]},

{id:402,cat:"hacking",titre:"Outils de pentest essentiels",sub:"Nmap, Metasploit, Burp Suite, Wireshark",
 def:"Un auditeur utilise une gamme d'outils spécialisés pour chaque phase du test d'intrusion.",
 is_cmd:true,
 cmds:[
   {section:"Reconnaissance et scan (Nmap)", items:[
     {cmd:"nmap -sS -sV -O 192.168.1.0/24", comment:"# Scan SYN + version services + OS"},
     {cmd:"nmap -p 1-65535 192.168.1.1", comment:"# Scan tous les ports"},
     {cmd:"nmap --script vuln 192.168.1.1", comment:"# Scripts de détection de vulnérabilités"},
     {cmd:"nmap -sU -p 53,161 192.168.1.1", comment:"# Scan UDP (DNS, SNMP)"}
   ]},
   {section:"Analyse de trafic (Wireshark/tcpdump)", items:[
     {cmd:"tcpdump -i eth0 -w capture.pcap", comment:"# Capturer tout le trafic"},
     {cmd:"tcpdump -i eth0 'port 80 or port 443'", comment:"# Filtrer HTTP/HTTPS"},
     {cmd:"tshark -r capture.pcap -Y 'http.request'", comment:"# Analyser les requêtes HTTP"}
   ]},
   {section:"Exploitation web (Burp Suite / curl)", items:[
     {cmd:"curl -X POST -d 'user=admin&pass=test' http://cible/login", comment:"# Tester un formulaire"},
     {cmd:"sqlmap -u 'http://cible/page?id=1' --dbs", comment:"# Détecter injections SQL"}
   ]}
 ],
 piege:"Ces outils ne doivent JAMAIS être utilisés sur des systèmes sans autorisation explicite. Nmap sur un réseau d'entreprise sans accord = intrusion caractérisée.",
 retenir:"Nmap = scan réseau. Metasploit = exploitation. Burp Suite = proxy web / test applis. Wireshark = analyse trafic. sqlmap = injection SQL.",
 keywords:["nmap","metasploit","burp suite","wireshark","tcpdump","sqlmap","tshark","scan","exploitation","proxy"]},

{id:403,cat:"hacking",titre:"Vulnérabilités web — OWASP Top 10",sub:"Injections, XSS, CSRF, IDOR…",
 def:"L'OWASP Top 10 liste les vulnérabilités web les plus critiques, servant de référence pour les développeurs et les auditeurs.",
 extra_table:[
   ["A01 — Broken Access Control","Accès à des ressources sans les droits requis (IDOR, élévation de privilèges)"],
   ["A02 — Cryptographic Failures","Données sensibles non chiffrées, algorithmes faibles (MD5, SHA-1)"],
   ["A03 — Injection","SQL injection, XPath, LDAP, OS Command injection"],
   ["A04 — Insecure Design","Absence de contrôles de sécurité dès la conception"],
   ["A07 — Auth Failures","Brute force, mots de passe faibles, session fixation"],
   ["A08 — SSRF","Server-Side Request Forgery : le serveur fait des requêtes pour l'attaquant"]
 ],
 extra_table_headers:["Vuln","Description"],
 points:["XSS (Cross-Site Scripting) : injection de code JS dans une page web vue par d'autres utilisateurs","CSRF : forcer un utilisateur authentifié à effectuer une action à son insu","IDOR (Insecure Direct Object Reference) : accéder à un objet en changeant l'ID dans l'URL","SQLi : modifier une requête SQL via l'input utilisateur pour extraire ou modifier des données"],
 piege:"OWASP ne classe pas les vulnérabilités uniquement par fréquence mais aussi par impact et exploitabilité. A01 (Broken Access Control) est devenu #1 car très fréquent et facile à exploiter.",
 retenir:"OWASP Top 10 = référence sécurité web. SQLi = requête SQL modifiée. XSS = JS injecté. CSRF = action forcée. IDOR = accès par ID.",
 keywords:["OWASP","SQLi","XSS","CSRF","IDOR","SSRF","injection","broken access control","session","A01","A03"]},

{id:404,cat:"hacking",titre:"Social Engineering & Phishing",sub:"Techniques de manipulation humaine",
 def:"Le social engineering exploite la psychologie humaine pour obtenir des informations ou des accès, contournant les défenses techniques.",
 points:["Phishing : email frauduleux imitant une entité de confiance pour voler des credentials","Spear phishing : phishing ciblé avec des informations personnalisées sur la victime","Vishing : phishing par appel téléphonique (Voice + Phishing)","Smishing : phishing par SMS","Pretexting : créer un scénario crédible pour extorquer des informations (se faire passer pour la DSI)","Baiting : laisser une clé USB infectée dans un lieu public espérant qu'elle soit branchée"],
 piege:"Le maillon faible est toujours l'humain. Les attaques de social engineering réussissent même dans les entreprises les mieux protégées techniquement.",
 retenir:"Phishing = email. Spear phishing = ciblé. Vishing = voix. Smishing = SMS. Pretexting = scénario inventé. Formation = meilleure défense.",
 keywords:["phishing","spear phishing","vishing","smishing","pretexting","baiting","social engineering","humain","sensibilisation"]},

// ────────────────────────────────────────────────────────
// DEVOPS & CI/CD
// ────────────────────────────────────────────────────────
{id:501,cat:"devops",titre:"DevOps — Culture et principes",sub:"CI/CD, IaC, collaboration Dev+Ops",
 def:"DevOps est une culture et un ensemble de pratiques qui unifient développement (Dev) et opérations (Ops) pour livrer des logiciels plus rapidement et de façon plus fiable.",
 points:["CI (Continuous Integration) : chaque commit est automatiquement compilé et testé","CD (Continuous Delivery) : l'artefact est automatiquement prêt à déployer en production","CD (Continuous Deployment) : déploiement automatique en production sans intervention manuelle","IaC (Infrastructure as Code) : décrire l'infrastructure sous forme de code versionnable (Terraform, Ansible)","Monitoring : logs centralisés, métriques, alerting (ELK Stack, Prometheus, Grafana)","DORA metrics : fréquence de déploiement, délai de livraison, taux d'échec, MTTR"],
 piege:"CI/CD sans tests automatisés = déploiement automatique de bugs en production. La qualité des tests est aussi importante que la pipeline.",
 retenir:"CI = tester à chaque commit. CD = déployer automatiquement. IaC = infrastructure en code. DORA = mesurer la performance DevOps.",
 keywords:["CI/CD","IaC","Terraform","Ansible","Jenkins","GitHub Actions","DevOps","DORA","Continuous Deployment","pipeline"]},

{id:502,cat:"devops",titre:"Docker & Conteneurs",sub:"Images, conteneurs, volumes, réseau",
 schema:`<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg"><defs><marker id="dk-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker></defs><rect class="sd-box" x="5" y="8" width="90" height="32" rx="4"/><text class="sd-text" x="50" y="24">Dockerfile</text><rect class="sd-box" x="5" y="60" width="90" height="32" rx="4"/><text class="sd-text" x="50" y="76">Registry</text><text class="sd-text-small" x="50" y="87">(Docker Hub)</text><line class="sd-arrow" x1="95" y1="24" x2="140" y2="24" marker-end="url(#dk-ab)"/><text class="sd-text-small" x="117" y="18">build</text><line class="sd-arrow" x1="140" y1="50" x2="95" y2="76" marker-end="url(#dk-ab)"/><text class="sd-text-small" x="100" y="62">push</text><line class="sd-arrow" x1="140" y1="50" x2="95" y2="38" marker-end="url(#dk-ab)"/><rect class="sd-box-accent" x="140" y="8" width="100" height="80" rx="6"/><text class="sd-text" x="190" y="30">Image</text><text class="sd-text-small" x="190" y="44">Couches (layers)</text><text class="sd-text-small" x="190" y="57">read-only</text><text class="sd-text-small" x="190" y="70">nginx:latest</text><line class="sd-arrow" x1="240" y1="48" x2="285" y2="48" marker-end="url(#dk-ab)"/><text class="sd-text-small" x="262" y="42">run</text><rect class="sd-box-accent" x="285" y="8" width="150" height="115" rx="6"/><text class="sd-text" x="360" y="28">Conteneur</text><rect class="sd-box" x="295" y="35" width="130" height="22" rx="3"/><text class="sd-text-small" x="360" y="47">Layer R/W (thin)</text><rect class="sd-box" x="295" y="62" width="130" height="22" rx="3"/><text class="sd-text-small" x="360" y="74">Processus isolé</text><rect class="sd-box" x="295" y="89" width="130" height="22" rx="3"/><text class="sd-text-small" x="360" y="101">Ports / Réseau</text><rect class="sd-box" x="5" y="130" width="430" height="22" rx="4"/><text class="sd-text-small" x="220" y="143">Volume : /host/data → /container/data  (données persistantes hors du conteneur)</text><rect class="sd-box" x="5" y="157" width="430" height="40" rx="4"/><text class="sd-text-small" x="220" y="171">Réseau : bridge (défaut) | host | none | overlay (Swarm)</text><text class="sd-text-small" x="220" y="187">Noyau partagé avec l'hôte — isolation via namespaces + cgroups</text></svg>`,
 def:"Docker est une plateforme de conteneurisation qui empaquète une application et ses dépendances dans un conteneur portable.",
 is_cmd:true,
 cmds:[
   {section:"Gestion des conteneurs", items:[
     {cmd:"docker run -d -p 80:80 --name web nginx", comment:"# Lancer nginx en arrière-plan, port 80"},
     {cmd:"docker ps", comment:"# Lister les conteneurs en cours d'exécution"},
     {cmd:"docker ps -a", comment:"# Tous les conteneurs (même arrêtés)"},
     {cmd:"docker exec -it web bash", comment:"# Ouvrir un shell dans le conteneur"},
     {cmd:"docker logs web", comment:"# Voir les logs du conteneur"},
     {cmd:"docker stop web && docker rm web", comment:"# Stopper et supprimer"}
   ]},
   {section:"Images", items:[
     {cmd:"docker build -t monapp:1.0 .", comment:"# Construire une image depuis un Dockerfile"},
     {cmd:"docker images", comment:"# Lister les images locales"},
     {cmd:"docker pull ubuntu:22.04", comment:"# Télécharger une image depuis Docker Hub"}
   ]},
   {section:"Réseau et volumes", items:[
     {cmd:"docker volume create mydata", comment:"# Créer un volume persistant"},
     {cmd:"docker run -v mydata:/app/data nginx", comment:"# Monter un volume"},
     {cmd:"docker network create mynet", comment:"# Créer un réseau custom"}
   ]}
 ],
 piege:"Un conteneur est éphémère : tout ce qui n'est pas dans un volume est perdu à la suppression. Données importantes = toujours dans un volume.",
 retenir:"docker run = lancer. docker ps = lister. docker exec = entrer. docker build = créer image. Volume = persistance.",
 keywords:["docker","conteneur","image","Dockerfile","volume","docker run","docker ps","docker exec","docker hub","réseau docker"]},


{id:504,cat:"devops",titre:"Git & Gestion de version",sub:"Branches, merge, rebase, workflow",
 def:"Git est un système de contrôle de version distribué permettant de suivre les modifications du code source et de collaborer.",
 is_cmd:true,
 cmds:[
   {section:"Commandes de base", items:[
     {cmd:"git init && git clone https://repo.git", comment:"# Initialiser ou cloner un dépôt"},
     {cmd:"git add . && git commit -m 'message'", comment:"# Stager et commiter les changements"},
     {cmd:"git push origin main", comment:"# Pousser vers la branche main du remote"},
     {cmd:"git pull origin main", comment:"# Récupérer et merger les changements distants"}
   ]},
   {section:"Branches", items:[
     {cmd:"git branch feature-login", comment:"# Créer une branche"},
     {cmd:"git checkout -b feature-login", comment:"# Créer et basculer sur la branche"},
     {cmd:"git merge feature-login", comment:"# Merger dans la branche courante"},
     {cmd:"git rebase main", comment:"# Rebaser la branche courante sur main"}
   ]},
   {section:"Inspection", items:[
     {cmd:"git log --oneline --graph", comment:"# Historique visuel des commits"},
     {cmd:"git diff HEAD~1", comment:"# Voir les changements depuis le dernier commit"},
     {cmd:"git stash", comment:"# Mettre de côté les modifications en cours"}
   ]}
 ],
 piege:"git rebase réécrit l'historique. Ne JAMAIS rebaser une branche déjà poussée sur un dépôt partagé — cela crée des conflits pour tous les autres.",
 retenir:"add + commit + push = cycle de base. branch = isolation. merge = fusion. rebase = réécriture historique (à éviter sur remote).",
 keywords:["git","commit","branch","merge","rebase","push","pull","stash","origin","main","HEAD","conflits"]},

// ────────────────────────────────────────────────────────
// BASES DE DONNÉES
// ────────────────────────────────────────────────────────
{id:601,cat:"bdd",titre:"SQL — Fondamentaux",sub:"SELECT, JOIN, INDEX, transactions",
 def:"SQL (Structured Query Language) est le langage standard pour interroger et manipuler les bases de données relationnelles.",
 is_cmd:true,
 cmds:[
   {section:"Requêtes de base", items:[
     {cmd:"SELECT nom, email FROM utilisateurs WHERE actif = 1 ORDER BY nom;", comment:"# Sélectionner avec filtre et tri"},
     {cmd:"SELECT u.nom, c.titre FROM users u JOIN commandes c ON u.id = c.user_id;", comment:"# INNER JOIN"},
     {cmd:"INSERT INTO utilisateurs (nom, email) VALUES ('Alice', 'alice@ex.com');", comment:"# Insérer"},
     {cmd:"UPDATE utilisateurs SET email = 'new@ex.com' WHERE id = 5;", comment:"# Modifier"},
     {cmd:"DELETE FROM utilisateurs WHERE id = 5;", comment:"# Supprimer"}
   ]},
   {section:"Performance et sécurité", items:[
     {cmd:"CREATE INDEX idx_email ON utilisateurs(email);", comment:"# Créer un index pour accélérer les recherches"},
     {cmd:"EXPLAIN SELECT * FROM utilisateurs WHERE email = 'test@ex.com';", comment:"# Analyser le plan d'exécution"},
     {cmd:"SELECT * FROM users WHERE id = ?;", comment:"# Requête préparée = protection contre SQLi"}
   ]},
   {section:"Transactions", items:[
     {cmd:"BEGIN TRANSACTION;", comment:"# Démarrer une transaction"},
     {cmd:"ROLLBACK;", comment:"# Annuler en cas d'erreur"},
     {cmd:"COMMIT;", comment:"# Valider les changements"}
   ]}
 ],
 piege:"Concaténer des inputs utilisateur directement dans une requête SQL = injection SQL. Toujours utiliser des requêtes préparées (paramètres).",
 retenir:"SELECT + WHERE + JOIN = base. INDEX = performance. Requêtes préparées = sécurité anti-SQLi. Transaction = ACID.",
 keywords:["SQL","SELECT","JOIN","INDEX","EXPLAIN","transaction","COMMIT","ROLLBACK","injection SQL","requête préparée","ACID"]},

{id:602,cat:"bdd",titre:"Bases NoSQL — MongoDB, Redis, Elasticsearch",sub:"Types, cas d'usage, différences",
 def:"Les bases NoSQL (Not Only SQL) offrent des modèles de données alternatifs aux bases relationnelles pour des besoins spécifiques de scalabilité ou de flexibilité.",
 extra_table:[
   ["Document (MongoDB)","Collections de documents JSON/BSON","Apps web, catalogues produits","Flexible, pas de schéma fixe"],
   ["Clé-Valeur (Redis)","Paires clé-valeur en mémoire","Cache, sessions, files de messages","Ultra-rapide (mémoire)"],
   ["Colonne (Cassandra)","Tables avec colonnes variables par ligne","IoT, time-series, gros volumes","Haute disponibilité, horizontale"],
   ["Recherche (Elasticsearch)","Index inversé, full-text search","Logs (ELK), moteur de recherche","Recherche complexe, facettes"]
 ],
 extra_table_headers:["Type","Modèle","Cas d'usage","Avantage clé"],
 points:["NoSQL = scalabilité horizontale (ajouter des noeuds) vs SQL = verticale (machines plus puissantes)","CAP Theorem : Consistency, Availability, Partition Tolerance — on ne peut en avoir que 2 sur 3","BASE vs ACID : NoSQL favorise la disponibilité (Basically Available, Soft state, Eventually consistent)","Redis = in-memory, volatile par défaut (configurer la persistance RDB/AOF pour ne pas perdre les données)"],
 piege:"Redis stocke en mémoire : sans persistance configurée, toutes les données sont perdues au redémarrage. Activer RDB ou AOF.",
 retenir:"MongoDB = documents JSON. Redis = cache mémoire ultra-rapide. Elasticsearch = recherche full-text. CAP = 2 sur 3 max.",
 keywords:["NoSQL","MongoDB","Redis","Elasticsearch","Cassandra","CAP theorem","BASE","ACID","scalabilité","sharding","réplication"]},

// ────────────────────────────────────────────────────────
// SÉCURITÉ WEB
// ────────────────────────────────────────────────────────
{id:701,cat:"web",titre:"HTTPS & TLS",sub:"Handshake, certificats, HSTS",
 schema:`<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg"><defs><marker id="tls-arrow-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker><marker id="tls-arrow-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead-green"/></marker></defs><rect class="sd-box" x="15" y="10" width="110" height="32" rx="4"/><text class="sd-text" x="70" y="26">Client</text><rect class="sd-box" x="315" y="10" width="110" height="32" rx="4"/><text class="sd-text" x="370" y="26">Serveur</text><line class="sd-box sd-dash" x1="70" y1="42" x2="70" y2="230"/><line class="sd-box sd-dash" x1="370" y1="42" x2="370" y2="230"/><line class="sd-arrow" x1="70" y1="70" x2="370" y2="70" marker-end="url(#tls-arrow-b)"/><text class="sd-text-small" x="220" y="63">① ClientHello (versions, cipher suites)</text><line class="sd-arrow-rev" x1="370" y1="115" x2="70" y2="115" marker-end="url(#tls-arrow-g)"/><text class="sd-text-small" x="220" y="100">② ServerHello + Certificat</text><text class="sd-text-small" x="220" y="113">+ clé publique</text><line class="sd-arrow" x1="70" y1="160" x2="370" y2="160" marker-end="url(#tls-arrow-b)"/><text class="sd-text-small" x="220" y="153">③ Échange de clé (chiffré avec clé pub.)</text><line class="sd-arrow-rev" x1="370" y1="200" x2="70" y2="200" marker-end="url(#tls-arrow-g)" marker-start="url(#tls-arrow-g)"/><line class="sd-arrow" x1="70" y1="200" x2="370" y2="200" marker-end="url(#tls-arrow-b)" marker-start="url(#tls-arrow-b)"/><text class="sd-text-small" x="220" y="190">④ Finished (les deux sens)</text><text class="sd-text-small" x="220" y="230">Session chiffrée — Application Data</text></svg>`,
 def:"HTTPS sécurise les communications web en chiffrant les données avec TLS (Transport Layer Security).",
 points:["TLS handshake : ClientHello → ServerHello + certificat → échange de clé → session chiffrée","TLS 1.2 = acceptable. TLS 1.3 = recommandé (handshake réduit, PFS obligatoire)","PFS (Perfect Forward Secrecy) : chaque session utilise des clés éphémères — une clé compromise ne déchiffre pas les sessions passées","HSTS (HTTP Strict Transport Security) : force le navigateur à toujours utiliser HTTPS","Certificate Transparency (CT) : logs publics de tous les certificats émis — détecte les certificats frauduleux","OCSP Stapling : le serveur fournit lui-même la preuve de validité du certificat"],
 piege:"HTTPS garantit la confidentialité et l'intégrité — pas l'authenticité du site. Un site malveillant avec un certificat Let's Encrypt valide utilise HTTPS.",
 retenir:"TLS 1.3 = recommandé. PFS = clés éphémères. HSTS = forcer HTTPS. OCSP = révocation. TLS ≠ authenticité du site.",
 keywords:["TLS","TLS 1.3","PFS","HSTS","OCSP","Certificate Transparency","handshake","cipher suite","SNI","Let's Encrypt"]},

{id:702,cat:"web",titre:"Sécurité des API REST",sub:"JWT, OAuth2, rate limiting",
 def:"Les API REST exposent des endpoints HTTP qui doivent être sécurisés pour éviter les accès non autorisés et les abus.",
 points:["Authentification API : API Key, JWT (JSON Web Token), OAuth2 + OIDC","JWT = header.payload.signature en base64 — vérifier la signature côté serveur (jamais côté client uniquement)","OAuth2 : framework d'autorisation — le client obtient un token d'accès sans voir le mot de passe de l'utilisateur","Rate limiting : limiter le nombre de requêtes par IP/token pour éviter le brute force et le scraping","CORS (Cross-Origin Resource Sharing) : contrôler quels domaines peuvent appeler l'API","Input validation : valider et sanitiser toutes les données reçues par l'API"],
 piege:"Stocker le JWT dans localStorage = vulnérable au XSS. Préférer les cookies HttpOnly + SameSite=Strict.",
 retenir:"JWT = token signé à vérifier côté serveur. OAuth2 = autorisation sans partager le mdp. Rate limiting = anti brute force. CORS = contrôle des origines.",
 keywords:["JWT","OAuth2","OIDC","API Key","rate limiting","CORS","HttpOnly","SameSite","Bearer token","refresh token"]},

{id:703,cat:"web",titre:"WAF — Web Application Firewall",sub:"ModSecurity, règles, bypass",
 def:"Un WAF (Web Application Firewall) analyse le trafic HTTP/HTTPS pour détecter et bloquer les attaques applicatives (SQLi, XSS, etc.).",
 points:["Opère en couche 7 (application) — analyse le contenu des requêtes HTTP","Modes : détection (log sans bloquer), prévention (bloque activement)","OWASP CRS (Core Rule Set) = ensemble de règles open-source pour ModSecurity","Déploiement : inline (en coupure), reverse proxy, cloud WAF (Cloudflare, AWS WAF)","Virtual patching : bloquer une vulnérabilité connue via une règle WAF en attendant le patch applicatif","Limites : ne remplace pas la sécurité du code, peut être contourné, génère des faux positifs"],
 piege:"Un WAF n'est pas une solution magique. Il peut être contourné par des techniques d'obfuscation. La sécurité du code source reste indispensable.",
 retenir:"WAF = couche 7, HTTP. OWASP CRS = règles de base. Virtual patching = protection temporaire. WAF ≠ remplace la sécurité du code.",
 keywords:["WAF","ModSecurity","OWASP CRS","virtual patching","Cloudflare","inline","reverse proxy","faux positif","couche 7"]},

// ────────────────────────────────────────────────────────
// ADMIN SYSTÈME (complété)
// ────────────────────────────────────────────────────────
{id:802,cat:"admin",titre:"Active Directory — Bases",sub:"Domaine, OU, GPO, Kerberos",
 schema:`<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box" x="150" y="10" width="140" height="32" rx="4"/><text class="sd-text" x="220" y="26">Forêt</text><rect class="sd-box-accent" x="150" y="65" width="140" height="32" rx="4"/><text class="sd-text" x="220" y="81">Domaine (sisr.local)</text><rect class="sd-box" x="40" y="120" width="110" height="32" rx="4"/><text class="sd-text" x="95" y="136">OU Ventes</text><rect class="sd-box" x="165" y="120" width="110" height="32" rx="4"/><text class="sd-text" x="220" y="136">OU IT</text><rect class="sd-box" x="290" y="120" width="110" height="32" rx="4"/><text class="sd-text" x="345" y="136">OU Direction</text><rect class="sd-box" x="40" y="180" width="110" height="32" rx="4"/><text class="sd-text" x="95" y="196">Users / PC</text><rect class="sd-box-accent" x="165" y="180" width="110" height="32" rx="4"/><text class="sd-text" x="220" y="196">DC (AD DS)</text><rect class="sd-box" x="290" y="180" width="110" height="32" rx="4"/><text class="sd-text" x="345" y="196">Users / PC</text><line class="sd-box" x1="220" y1="42" x2="220" y2="65"/><line class="sd-box" x1="220" y1="97" x2="95" y2="120"/><line class="sd-box" x1="220" y1="97" x2="220" y2="120"/><line class="sd-box" x1="220" y1="97" x2="345" y2="120"/><line class="sd-box" x1="95" y1="152" x2="95" y2="180"/><line class="sd-box" x1="220" y1="152" x2="220" y2="180"/><line class="sd-box" x1="345" y1="152" x2="345" y2="180"/></svg>`,
 def:"Active Directory (AD) est le service d'annuaire Microsoft qui centralise la gestion des identités et des ressources dans un réseau Windows.",
 points:["Domaine = unité d'administration de base. OU = conteneur logique pour organiser les objets","GPO (Group Policy Object) = règles appliquées automatiquement aux objets d'une OU","DC (Domain Controller) = serveur qui héberge AD DS et centralise l'authentification Kerberos","LDAP = protocole d'interrogation de l'AD (port 389 / 636 pour LDAPS chiffré)","Kerberos port 88 = protocole d'authentification par tickets (TGT → TGS)","Forêt > Domaine > OU — la forêt est l'unité d'administration la plus haute (relations d'approbation)"],
 piege:"GPO liée au domaine = s'applique à TOUT le domaine. GPO liée à une OU = seulement les objets de cette OU.",
 retenir:"AD = annuaire centralisé. DC = serveur AD. OU = conteneur. GPO = règles auto. LDAP port 389. Kerberos port 88.",
 keywords:["Active Directory","OU","GPO","DC","LDAP","LDAPS","Kerberos","forêt","domaine","port 389","port 88"]},

{id:803,cat:"admin",titre:"Sauvegarde & PRA/PCA",sub:"3-2-1, RTO, RPO, stratégies",
 schema:`<svg viewBox="0 0 440 195" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box-accent" x="155" y="10" width="130" height="36" rx="6"/><text class="sd-text" x="220" y="32">Données originales</text><line class="sd-box" x1="220" y1="46" x2="70" y2="90"/><line class="sd-box" x1="220" y1="46" x2="220" y2="90"/><line class="sd-box" x1="220" y1="46" x2="370" y2="90"/><rect class="sd-box" x="15" y="90" width="110" height="42" rx="4"/><text class="sd-text" x="70" y="108">Copie 1</text><text class="sd-text-small" x="70" y="123">Disque local (rapide)</text><rect class="sd-box" x="165" y="90" width="110" height="42" rx="4"/><text class="sd-text" x="220" y="108">Copie 2</text><text class="sd-text-small" x="220" y="123">Support différent (NAS)</text><rect class="sd-box-accent" x="315" y="90" width="110" height="42" rx="4"/><text class="sd-text" x="370" y="108">Copie 3</text><text class="sd-text-small" x="370" y="123">Hors site / Cloud</text><text class="sd-label" x="220" y="160">3 copies des données, sur 2 supports différents, dont 1 hors site</text><text class="sd-label" x="220" y="175">RPO = fréquence des sauvegardes · RTO = temps de restauration</text></svg>`,
 def:"La sauvegarde et les plans de reprise garantissent la disponibilité et la récupération des données après un incident.",
 points:["Complète : copie de tout, simple à restaurer mais longue. Incrémentale : changements depuis la dernière sauvegarde","Différentielle : changements depuis la dernière sauvegarde COMPLÈTE — compromis","Règle 3-2-1 : 3 copies, sur 2 supports différents, dont 1 hors site (ou cloud)","RTO (Recovery Time Objective) = temps max acceptable d'interruption","RPO (Recovery Point Objective) = perte de données max tolérée (ex: sauvegardes toutes les 4h = RPO max 4h)","PRA = reprise après sinistre. PCA = continuité en mode dégradé pendant le sinistre"],
 piege:"Une sauvegarde non testée = sauvegarde inutile. Tester régulièrement les restaurations en conditions réelles.",
 retenir:"3-2-1 = règle d'or. RTO = temps de reprise. RPO = perte de données max. Complète > Différentielle > Incrémentale = compromis.",
 keywords:["sauvegarde complète","incrémentale","différentielle","3-2-1","PRA","PCA","RTO","RPO","hors site","restauration"]},

// ────────────────────────────────────────────────────────
// SÉCURITÉ (complété)
// ────────────────────────────────────────────────────────
{id:901,cat:"secu",titre:"Pare-feu & Zones réseau",sub:"Stateful, DMZ, iptables, pfSense",
 def:"Un pare-feu contrôle le trafic réseau en appliquant des règles pour autoriser ou bloquer les flux entre différentes zones.",
 points:["Stateless = filtre paquet par paquet (IP, port) sans contexte. Stateful = suit l'état des connexions (NEW, ESTABLISHED, RELATED)","DMZ = zone semi-ouverte pour serveurs accessibles d'internet (web, mail, reverse proxy)","Règle fondamentale : deny all par défaut, autoriser explicitement (whitelist)","Next-Gen Firewall (NGFW) = pare-feu applicatif + IPS + DPI (Deep Packet Inspection) + SSL inspection","pfSense/OPNsense = pare-feux open-source populaires en lab et en production PME","Zero Trust Network Access (ZTNA) = remplace les VPN, vérifie chaque accès"],
 piege:"Stateful ≠ applicatif. Un firewall stateful analyse l'état de la connexion mais pas le contenu applicatif. Il faut un NGFW ou WAF pour la couche 7.",
 retenir:"Stateful > Stateless. DMZ = zone intermédiaire. Deny all par défaut. NGFW = couche 7 + IPS.",
 keywords:["pare-feu","stateful","DMZ","deny all","iptables","pfSense","NGFW","DPI","ZTNA","whitelist","ACL"]},

{id:902,cat:"secu",titre:"Malwares & Ransomwares",sub:"Types, vecteurs, EDR, protection",
 def:"Les malwares sont des logiciels malveillants conçus pour nuire, voler des données ou extorquer de l'argent.",
 points:["Ransomware : chiffre les données et demande une rançon (WannaCry, Ryuk, LockBit)","Trojan : programme légitime en apparence cachant une fonction malveillante","Rootkit : se cache dans le noyau pour maintenir un accès persistant","Fileless malware : s'exécute entièrement en mémoire (PowerShell, WMI), ne laisse pas de fichier sur disque","C2 (Command & Control) : serveur que le malware contacte pour recevoir des ordres","EDR = Endpoint Detection & Response : analyse comportementale, détection des techniques MITRE ATT&CK"],
 piege:"Payer la rançon ne garantit pas la récupération des données et finance le cybercrime. La vraie protection = sauvegardes hors ligne + segmentation.",
 retenir:"Ransomware = chiffrement + rançon. Fileless = en mémoire, difficile à détecter. EDR > Antivirus. C2 = centre de commande.",
 keywords:["ransomware","fileless","C2","EDR","rootkit","trojan","spyware","WannaCry","LockBit","ATT&CK","PowerShell"]},

{id:903,cat:"secu",titre:"Authentification & MFA",sub:"Facteurs, OTP, SSO, Kerberos, NTLM",
 schema:`<svg viewBox="0 0 440 290" xmlns="http://www.w3.org/2000/svg"><defs><marker id="krb-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker><marker id="krb-ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead-green"/></marker></defs><rect class="sd-box" x="10" y="10" width="90" height="32" rx="4"/><text class="sd-text" x="55" y="26">Client</text><rect class="sd-box-accent" x="175" y="10" width="90" height="32" rx="4"/><text class="sd-text" x="220" y="21">KDC</text><text class="sd-text-small" x="220" y="33">(AS + TGS)</text><rect class="sd-box" x="340" y="10" width="90" height="32" rx="4"/><text class="sd-text" x="385" y="26">Serveur</text><line class="sd-box sd-dash" x1="55" y1="42" x2="55" y2="272"/><line class="sd-box sd-dash" x1="220" y1="42" x2="220" y2="272"/><line class="sd-box sd-dash" x1="385" y1="42" x2="385" y2="272"/><line class="sd-arrow" x1="55" y1="75" x2="220" y2="75" marker-end="url(#krb-ab)"/><text class="sd-text-small" x="137" y="67">① AS-REQ</text><text class="sd-text-small" x="137" y="78">(identité utilisateur)</text><line class="sd-arrow-rev" x1="220" y1="118" x2="55" y2="118" marker-end="url(#krb-ag)"/><text class="sd-text-small" x="137" y="110">② AS-REP</text><text class="sd-text-small" x="137" y="121">TGT chiffré (clé KDC)</text><line class="sd-arrow" x1="55" y1="163" x2="220" y2="163" marker-end="url(#krb-ab)"/><text class="sd-text-small" x="137" y="155">③ TGS-REQ</text><text class="sd-text-small" x="137" y="166">(TGT + service demandé)</text><line class="sd-arrow-rev" x1="220" y1="206" x2="55" y2="206" marker-end="url(#krb-ag)"/><text class="sd-text-small" x="137" y="198">④ TGS-REP</text><text class="sd-text-small" x="137" y="209">Ticket de service (ST)</text><line class="sd-arrow" x1="55" y1="248" x2="385" y2="248" marker-end="url(#krb-ab)"/><text class="sd-text-small" x="220" y="238">⑤ AP-REQ</text><text class="sd-text-small" x="220" y="251">(ST → accès au service)</text><text class="sd-label" x="220" y="278">Port 88 UDP/TCP — TGT = ticket d'identité. ST = ticket de service.</text></svg>`,
 def:"L'authentification vérifie l'identité d'un utilisateur avant de lui accorder l'accès à un système.",
 points:["3 facteurs : SAIS (mot de passe), POSSÈDE (token/téléphone), SUIS (biométrie)","MFA = au moins 2 facteurs différents. 2FA = 2 facteurs","OTP/TOTP : code à usage unique valable 30 secondes (Google Authenticator, FreeOTP — RFC 6238)","SSO (Single Sign-On) : une seule auth pour plusieurs services — SAML 2.0, OAuth2, OIDC","Kerberos = protocol d'auth par tickets (TGT → TGS). Port 88","NTLM = ancien, challenge-response, vulnérable au Pass-the-Hash"],
 piege:"SSO = point de défaillance unique. Si le compte est compromis, TOUS les services SSO sont compromis. MFA obligatoire sur le SSO.",
 retenir:"MFA = 2+ facteurs. TOTP = code 30s. SSO = une auth pour tout. Kerberos > NTLM. Port 88 = Kerberos.",
 keywords:["MFA","OTP","TOTP","SSO","SAML","OAuth2","Kerberos","NTLM","2FA","biométrie","TGT","port 88"]},

{id:904,cat:"secu",titre:"Moindre privilège & Hardening",sub:"CIS Benchmarks, surface d'attaque",
 def:"Le principe de moindre privilège limite les droits de chaque entité au strict nécessaire pour réduire la surface d'attaque.",
 points:["Supprimer les droits admin locaux des utilisateurs standards","Désactiver les ports et services inutilisés (SSH, RDP, Telnet si non utilisés)","Renommer/désactiver les comptes par défaut (Administrator, root, admin)","CIS Benchmarks = référentiels de durcissement par OS et application (Windows, Linux, Docker, Kubernetes)","GPO de durcissement : désactiver NTLM, bloquer USB, politique de mots de passe robuste","Attack surface = somme de tous les vecteurs d'attaque possibles — à minimiser"],
 piege:"Un service tournant avec des droits admin = si compromis, l'attaquant a les droits admin. Toujours utiliser des comptes de service dédiés.",
 retenir:"Moindre privilège = donner uniquement le nécessaire. CIS Benchmarks = référence. Désactiver l'inutile. Comptes de service dédiés.",
 keywords:["moindre privilège","hardening","CIS","surface d'attaque","GPO","compte de service","désactiver","default credentials"]},

// ────────────────────────────────────────────────────────
// EBIOS RM & WEF (inchangés — enrichis)
// ────────────────────────────────────────────────────────
{id:1001,cat:"ebios",titre:"EBIOS RM — Vue d'ensemble",sub:"Méthode ANSSI, ISO 27005, 5 ateliers",
 def:"EBIOS RM est la méthode officielle française d'analyse et de gestion des risques numériques, créée par l'ANSSI, alignée sur ISO 27005 et ISO 31000.",
 points:["Créée et maintenue par l'ANSSI. Compatible ISO 27005 et ISO 31000","Approche centrée sur les scénarios d'attaque réalistes","Fait le pont entre la direction (gouvernance) et les équipes techniques","5 ateliers collaboratifs et itératifs","Livrable final : PACS (Plan d'Amélioration Continu de la Sécurité)","Complémentaire à ISO 27001 : EBIOS RM = méthode d'analyse, ISO 27001 = cadre de management"],
 piege:"EBIOS RM ne se résume pas à un audit technique. C'est une démarche collaborative impliquant direction ET équipes techniques.",
 retenir:"ANSSI + ISO 27005 + 5 ateliers + PACS. Vision scénarios d'attaque réalistes.",
 keywords:["ANSSI","ISO 27005","ISO 31000","PACS","Risk Manager","scénarios","gouvernance","SMSI"]},

{id:1002,cat:"ebios",titre:"Vocabulaire EBIOS RM",sub:"Valeur métier, bien support, CID",
 def:"Le vocabulaire EBIOS RM est indispensable pour conduire ou présenter une analyse de risques.",
 points:["Valeur métier = élément crucial pour l'organisation (fichier client, processus de facturation, réputation)","Bien support = composant IT qui héberge la valeur métier (serveur AD, NAS, pare-feu)","Événement redouté = atteinte à une valeur via perte de Confidentialité, Intégrité ou Disponibilité (CID)","Source de risque (SR) = acteur à l'origine de la menace (cybercriminel, concurrent, employé, catastrophe)","Objectif visé (OV) = ce que la source cherche (rançon, vol de données, sabotage)","Vraisemblance = probabilité qu'un scénario se réalise"],
 piege:"Valeur métier ≠ Bien support. Fichier client = valeur métier. Serveur qui le stocke = bien support. Distinction souvent testée à l'examen.",
 retenir:"Valeur métier = QUOI protéger. Bien support = SUR QUOI. SR + OV = QUI attaque et POURQUOI. CID = axes d'impact.",
 keywords:["valeur métier","bien support","événement redouté","SR","OV","CID","vraisemblance","EBIOS"]},

{id:1003,cat:"ebios",titre:"Les 5 Ateliers EBIOS RM",sub:"Structure complète, PACS",
 def:"EBIOS RM se conduit en 5 ateliers collaboratifs menés par le Risk Manager.",
 points:["Atelier 1 — Cadrage : périmètre, valeurs métiers, biens supports, événements redoutés, conformité réglementaire","Atelier 2 — Sources de risques : identifier les SR et leurs OV. Ex: groupe cybercriminel → rançon via ransomware","Atelier 3 — Scénarios stratégiques : chemins d'attaque macroscopiques, analyse de l'écosystème (sous-traitants, cloud)","Atelier 4 — Scénarios opérationnels : détail technique, vulnérabilités, techniques ATT&CK, vraisemblance","Atelier 5 — Traitement : contre-mesures (réduction/acceptation/transfert/évitement), PACS, risque résiduel"],
 piege:"L'ordre est progressif : impossible de faire l'Atelier 4 (technique) sans l'Atelier 2 (qui attaque ?) et l'Atelier 3 (comment ?).",
 retenir:"1=Périmètre, 2=Qui, 3=Comment (macro), 4=Comment (technique), 5=Remédiation + PACS.",
 keywords:["atelier 1","atelier 2","atelier 3","atelier 4","atelier 5","PACS","scénario stratégique","scénario opérationnel","risque résiduel"]},

{id:1004,cat:"wef",titre:"WEF — Architecture et modes Push/Pull",sub:"WEC, abonnements, Source-Initiated",
 def:"Windows Event Forwarding (WEF) centralise les journaux Windows vers un collecteur WEC, sans agent tiers, via GPO.",
 points:["3 entités : source (poste/serveur), WEC (collecteur), abonnement (règle de collecte)","Protocoles : WinRM + WS-Management. Ports : TCP 5985 (HTTP) ou TCP 5986 (HTTPS recommandé)","Source-Initiated (PUSH) : la source contacte le WEC → recommandé ANSSI, scalable, automatique via GPO","Collector-Initiated (PULL) : le WEC contacte les sources → lourd, liste rigide, déconseillé en production","Les logs arrivent dans le journal ForwardedEvents au format XML Microsoft","Conversion XML → Syslog/JSON via NXLog ou Logstash avant injection dans le SIEM"],
 piege:"PUSH = les sources initient = Source-Initiated. L'examen inverse souvent les définitions. Retenir : Source-Initiated = les SOURCES poussent.",
 retenir:"WEF = natif Windows, sans agent. PUSH = recommandé. WEC = collecteur. ForwardedEvents → NXLog → SIEM.",
 keywords:["WEF","WEC","WinRM","source-initiated","push","pull","abonnement","port 5985","ForwardedEvents","NXLog","GPO"]},

// ────────────────────────────────────────────────────────
// RÉGLEMENTATION
// ────────────────────────────────────────────────────────
{id:1101,cat:"reglem",titre:"Le RGPD pour le technicien",sub:"Obligations techniques IT",
 def:"Le RGPD impose des obligations techniques aux équipes IT pour protéger les données personnelles.",
 points:["Chiffrement des bases contenant des données personnelles","Journalisation des accès aux données sensibles (qui, quand, quoi)","Droit à l'oubli = suppression complète et vérifiable des données à la demande","Notification à la CNIL en cas de fuite sous 72h","Minimisation des données = ne collecter que le strict nécessaire","DPO = responsable RGPD. Privacy by Design = sécurité dès la conception"],
 piege:"RGPD = toutes les données personnelles, pas seulement les données sensibles. Une adresse email suffit à identifier une personne.",
 retenir:"72h pour notifier la CNIL. Chiffrement + journalisation = obligations techniques. DPO = responsable RGPD.",
 keywords:["RGPD","CNIL","DPO","chiffrement","journalisation","72h","minimisation","Privacy by Design","données personnelles"]},

{id:1102,cat:"reglem",titre:"Zero Trust & LPM/NIS2",sub:"Never trust, OIV, ANSSI",
 def:"Zero Trust est un modèle de sécurité moderne. LPM et NIS2 imposent des obligations légales aux entités critiques.",
 points:["Zero Trust : never trust, always verify. Micro-segmentation, MFA, surveillance continue","ZTNA (Zero Trust Network Access) remplace progressivement les VPN traditionnels","LPM 2013 : désigne les OIV (Opérateurs d'Importance Vitale) — énergie, transports, santé","OIV doivent déclarer incidents à l'ANSSI et appliquer des règles strictes","NIS2 (2023) : directive EU, entités essentielles (EE) et importantes (EI), ~10 000 entités en France","ANSSI = autorité nationale cybersécurité française — recommandations, EBIOS, certifications"],
 piege:"OIV (LPM française) ≠ OES (NIS2 européenne). Les deux concepts coexistent en France sous la supervision de l'ANSSI.",
 retenir:"Zero Trust = never trust, always verify. OIV = LPM France. NIS2 = directive EU. ANSSI = autorité nationale.",
 keywords:["Zero Trust","ZTNA","LPM","NIS2","OIV","OES","ANSSI","micro-segmentation","entités essentielles","NIS2"]},

// ────────────────────────────────────────────────────────
// CRYPTOGRAPHIE
// ────────────────────────────────────────────────────────
{id:1201,cat:"crypto",titre:"Chiffrement symétrique vs asymétrique",sub:"AES, RSA, ECDSA, TLS",
 extra_table:[
   ["Symétrique","Même clé pour chiffrer/déchiffrer","Rapide, gros volumes","AES-256, AES-128, ChaCha20"],
   ["Asymétrique","Clé publique + clé privée","Plus lent, petits volumes","RSA-2048, ECDSA, Ed25519"]
 ],
 extra_table_headers:["Type","Principe","Performance","Exemples"],
 def:"Deux grandes familles cryptographiques selon la gestion des clés.",
 points:["En pratique TLS : asymétrique pour échanger la clé de session, symétrique pour chiffrer les données","AES-256 = standard recommandé (symétrique). RSA-2048 minimum (asymétrique)","ECDSA / Ed25519 = alternative à RSA sur courbes elliptiques — clés plus courtes, même sécurité","ChaCha20-Poly1305 = alternatif à AES, plus rapide sur mobile (pas d'accélération matérielle AES)"],
 piege:"RSA ne chiffre pas directement les données volumineuses — il chiffre la clé de session AES. Confondre les deux usages est une erreur classique.",
 retenir:"AES = symétrique, rapide. RSA = asymétrique, échange de clé. TLS combine les deux. Ed25519 = ECDSA moderne.",
 keywords:["AES","RSA","symétrique","asymétrique","ECDSA","Ed25519","TLS","ChaCha20","clé de session","AES-256"]},

{id:1202,cat:"crypto",titre:"Hachage, PKI & Certificats",sub:"SHA-256, bcrypt, CA, X.509, OCSP",
 def:"Le hachage et la PKI sont les fondements de l'intégrité et de l'authenticité en cryptographie.",
 points:["Hachage : irréversible, déterministe, résistant aux collisions. SHA-256 = standard actuel","MD5 et SHA-1 = obsolètes (collisions connues). bcrypt/Argon2 = stockage mots de passe avec sel","PKI = infrastructure de gestion des certificats X.509 (lier clé publique à une identité)","CA = tiers de confiance qui signe les certificats (Let's Encrypt, DigiCert, ANSSI pour France)","Chaîne de confiance : Root CA → Intermediate CA → certificat final","OCSP Stapling = le serveur prouve lui-même la validité du certificat (plus rapide que OCSP classique)"],
 piege:"HTTPS ne garantit pas que le site est légitime, seulement que la connexion est chiffrée. Un site de phishing peut avoir un certificat TLS valide.",
 retenir:"SHA-256 = intégrité. bcrypt = mdp. PKI = gestion certificats. CA = tiers de confiance. OCSP = révocation.",
 keywords:["SHA-256","MD5","SHA-1","bcrypt","Argon2","PKI","X.509","CA","OCSP","Let's Encrypt","sel","collision"]},

// ────────────────────────────────────────────────────────
// SUPERVISION & SIEM
// ────────────────────────────────────────────────────────
{id:1301,cat:"superv",titre:"SIEM — Fonctionnement et usage",sub:"ELK, Splunk, corrélation, EPS",
 schema:`<svg viewBox="0 0 440 165" xmlns="http://www.w3.org/2000/svg"><defs><marker id="siem-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker></defs><rect class="sd-box" x="5" y="35" width="75" height="50" rx="4"/><text class="sd-text-small" x="42" y="55">Sources</text><text class="sd-text-small" x="42" y="68">FW, AD, OS…</text><rect class="sd-box" x="95" y="35" width="75" height="50" rx="4"/><text class="sd-text-small" x="132" y="55">Collecte</text><text class="sd-text-small" x="132" y="68">agents/syslog</text><rect class="sd-box" x="185" y="35" width="75" height="50" rx="4"/><text class="sd-text-small" x="222" y="55">Normali-</text><text class="sd-text-small" x="222" y="68">sation</text><rect class="sd-box-accent" x="275" y="35" width="75" height="50" rx="4"/><text class="sd-text-small" x="312" y="55">Corré-</text><text class="sd-text-small" x="312" y="68">lation</text><rect class="sd-box" x="365" y="35" width="70" height="50" rx="4"/><text class="sd-text-small" x="400" y="55">Alerte</text><text class="sd-text-small" x="400" y="68">/ SOAR</text><line class="sd-arrow" x1="80" y1="60" x2="95" y2="60" marker-end="url(#siem-ab)"/><line class="sd-arrow" x1="170" y1="60" x2="185" y2="60" marker-end="url(#siem-ab)"/><line class="sd-arrow" x1="260" y1="60" x2="275" y2="60" marker-end="url(#siem-ab)"/><line class="sd-arrow" x1="350" y1="60" x2="365" y2="60" marker-end="url(#siem-ab)"/><text class="sd-label" x="220" y="120">EPS = volume d'événements/seconde — base de la licence</text><text class="sd-label" x="220" y="135">Rétention légale ≥ 1 an · SOAR = automatisation de la réponse</text></svg>`,
 def:"Un SIEM centralise, normalise et corrèle les logs de toute l'infrastructure pour détecter les incidents de sécurité.",
 points:["Collecte : firewalls, serveurs, AD, postes, applications, équipements réseau","Normalisation : formats hétérogènes (Windows XML, Syslog, JSON, CEF) → format commun","Corrélation : 10 échecs de connexion + 1 succès = brute force. Multiple alertes corrélées = APT","EPS (Events Per Second) = métrique de volume, souvent base de la licence","Rétention légale : souvent 1 an minimum (RGPD, exigences sectorielles)","SOAR (Security Orchestration, Automation and Response) = automatiser la réponse aux incidents"],
 piege:"Un SIEM sans tuning génère des milliers de faux positifs. La qualité des règles de corrélation est aussi importante que la collecte.",
 retenir:"SIEM = collecter + normaliser + corréler + alerter. EPS = coût licence. SOAR = automatiser la réponse.",
 keywords:["SIEM","Splunk","ELK","QRadar","Sentinel","corrélation","EPS","Syslog","CEF","SOAR","normalisation","rétention"]},

{id:1302,cat:"superv",titre:"Supervision réseau — SNMP, Zabbix, Nagios",sub:"MIB, alertes, monitoring",
 def:"La supervision réseau surveille la disponibilité et les performances des équipements en temps réel.",
 points:["SNMP (Simple Network Management Protocol) : port UDP 161 (requêtes) et 162 (traps)","SNMPv1/v2 = communauté en clair (vulnérable). SNMPv3 = authentification + chiffrement","MIB (Management Information Base) = catalogue des objets supervisables d'un équipement","Nagios/Icinga = checks actifs (le serveur interroge), alertes email/SMS, plugins","Zabbix = agents actifs/passifs, SNMP, dashboards, templates","Prometheus + Grafana = stack de monitoring moderne pour les conteneurs et microservices"],
 piege:"SNMPv1/v2 transmettent le nom de communauté en clair — interceptable par un sniff réseau. Toujours SNMPv3 en production.",
 retenir:"SNMP UDP 161. SNMPv3 = sécurisé. Nagios/Zabbix = monitoring legacy. Prometheus + Grafana = moderne (conteneurs).",
 keywords:["SNMP","SNMPv3","MIB","UDP 161","trap","Nagios","Zabbix","Icinga","Prometheus","Grafana","monitoring","alerting"]},

// ────────────────────────────────────────────────────────
// CLOUD
// ────────────────────────────────────────────────────────
{id:1401,cat:"cloud",titre:"IaaS, PaaS, SaaS — Modèles Cloud",sub:"Responsabilité partagée",
 schema:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><text class="sd-label" x="75" y="14">IaaS</text><text class="sd-label" x="220" y="14">PaaS</text><text class="sd-label" x="365" y="14">SaaS</text><rect class="sd-box" x="10" y="22" width="130" height="26" rx="3"/><text class="sd-text-small" x="75" y="39">Données</text><rect class="sd-box" x="10" y="50" width="130" height="26" rx="3"/><text class="sd-text-small" x="75" y="67">Applications</text><rect class="sd-box" x="10" y="78" width="130" height="26" rx="3"/><text class="sd-text-small" x="75" y="95">Runtime/Middleware</text><rect class="sd-box" x="10" y="106" width="130" height="26" rx="3"/><text class="sd-text-small" x="75" y="123">OS</text><rect class="sd-box-accent" x="10" y="134" width="130" height="26" rx="3"/><text class="sd-text-small" x="75" y="151">Réseau/Stockage/Serveurs</text><rect class="sd-box" x="155" y="22" width="130" height="26" rx="3"/><text class="sd-text-small" x="220" y="39">Données</text><rect class="sd-box" x="155" y="50" width="130" height="26" rx="3"/><text class="sd-text-small" x="220" y="67">Applications</text><rect class="sd-box-accent" x="155" y="78" width="130" height="26" rx="3"/><text class="sd-text-small" x="220" y="95">Runtime/Middleware</text><rect class="sd-box-accent" x="155" y="106" width="130" height="26" rx="3"/><text class="sd-text-small" x="220" y="123">OS</text><rect class="sd-box-accent" x="155" y="134" width="130" height="26" rx="3"/><text class="sd-text-small" x="220" y="151">Réseau/Stockage/Serveurs</text><rect class="sd-box" x="300" y="22" width="130" height="26" rx="3"/><text class="sd-text-small" x="365" y="39">Données/Config</text><rect class="sd-box-accent" x="300" y="50" width="130" height="26" rx="3"/><text class="sd-text-small" x="365" y="67">Applications</text><rect class="sd-box-accent" x="300" y="78" width="130" height="26" rx="3"/><text class="sd-text-small" x="365" y="95">Runtime/Middleware</text><rect class="sd-box-accent" x="300" y="106" width="130" height="26" rx="3"/><text class="sd-text-small" x="365" y="123">OS</text><rect class="sd-box-accent" x="300" y="134" width="130" height="26" rx="3"/><text class="sd-text-small" x="365" y="151">Réseau/Stockage/Serveurs</text><text class="sd-label" x="220" y="180">Normal = géré par le client · Accentué = géré par le fournisseur</text><text class="sd-label" x="220" y="195">Le client reste TOUJOURS responsable de ses données et de ses accès</text></svg>`,
 extra_table:[
   ["IaaS","Infrastructure as a Service","OS + middleware + apps + données","AWS EC2, Azure VM"],
   ["PaaS","Platform as a Service","Applications + données seulement","Azure App Service, Heroku"],
   ["SaaS","Software as a Service","Données + config utilisateur","Microsoft 365, Salesforce"]
 ],
 extra_table_headers:["Modèle","Nom","Vous gérez","Exemples"],
 def:"Le cloud computing se divise en 3 modèles de service selon le niveau de délégation au fournisseur.",
 points:["Responsabilité partagée : fournisseur = sécurité DU cloud. Client = sécurité DANS le cloud","Cloud privé (on-premise), public (AWS/Azure/GCP), hybride (mix)","CASB = sécurité entre utilisateurs et services cloud (visibilité, contrôle)","FinOps = gouvernance des coûts cloud — éviter le cloud sprawl et les ressources inutilisées"],
 piege:"En SaaS, le client reste responsable des accès (MFA, moindre privilège) et de ses données. La responsabilité n'est jamais entièrement déléguée.",
 retenir:"IaaS > PaaS > SaaS = de plus en plus délégué. Responsabilité partagée = toujours applicable.",
 keywords:["IaaS","PaaS","SaaS","AWS","Azure","GCP","responsabilité partagée","CASB","cloud hybride","FinOps"]},

{id:1402,cat:"cloud",titre:"Sécurité Cloud — IAM & Misconfigurations",sub:"Principe moindre privilège, CSPM",
 def:"La sécurité cloud repose sur une gestion rigoureuse des identités et la détection des mauvaises configurations.",
 points:["IAM = contrôle qui peut faire quoi sur quelles ressources cloud (policies, rôles, groupes)","Principe du moindre privilège dans le cloud : rôles précis, jamais d'admin global","Service accounts : les ressources doivent avoir leurs propres identités (pas de credentials humains partagés)","Bucket S3 public ou blob Azure accessible = fuite fréquente et critique","CSPM (Cloud Security Posture Management) = détecte les misconfigs en continu","Shared credentials ou access keys dans le code source = risque maximal (GitHub bots scannent en temps réel)"],
 piege:"Laisser des access keys AWS en dur dans un repo GitHub = compromission quasi garantie en moins d'une heure.",
 retenir:"IAM = contrôle accès cloud. Moindre privilège. CSPM = anti-misconfig. Jamais de credentials dans le code.",
 keywords:["IAM","CSPM","S3 public","access key","service account","moindre privilège","misconfiguration","shared credentials","rotation"]},

// ────────────────────────────────────────────────────────
// NORMES
// ────────────────────────────────────────────────────────
{id:1501,cat:"norme",titre:"ISO 27001 / 27005 / 27002",sub:"SMSI, risques, contrôles",
 extra_table:[
   ["ISO 27001","SMSI — Cadre de management","Oui","Exigences : politique, organisation, amélioration continue"],
   ["ISO 27005","Gestion des risques SI","Non","Méthode d'analyse des risques (compatible EBIOS RM)"],
   ["ISO 27002","Catalogue de contrôles","Non","114 mesures organisées en 14 domaines"]
 ],
 extra_table_headers:["Norme","Objet","Certification","Contenu"],
 def:"Les normes ISO 27000 forment une famille complète pour la sécurité de l'information.",
 points:["ISO 27001 = QUOI mettre en place. ISO 27005 = COMMENT analyser les risques. ISO 27002 = COMMENT implémenter les contrôles","PDCA (Plan-Do-Check-Act) = cycle d'amélioration continue appliqué au SMSI","Audit ISO 27001 : vérifie documentation + implémentation + amélioration continue"],
 piege:"ISO 27001 ne dit pas COMMENT faire — elle dit QUOI faire. ISO 27005 et EBIOS RM donnent la méthode.",
 retenir:"27001 = certification SMSI. 27005 = méthode risques. 27002 = catalogue contrôles. PDCA = amélioration continue.",
 keywords:["ISO 27001","ISO 27005","ISO 27002","SMSI","PDCA","certification","risques","contrôles","EBIOS RM","audit"]},

{id:1502,cat:"norme",titre:"ITIL — Gestion des services IT",sub:"Incident, problème, changement, SLA",
 def:"ITIL est un référentiel de bonnes pratiques pour la gestion des services informatiques, structurant les processus ITSM.",
 points:["Incident = interruption non planifiée ou dégradation de la qualité de service (traitement immédiat)","Problème = cause racine d'un ou plusieurs incidents récurrents (investigation long terme)","Changement = modification contrôlée nécessitant un change request (RFC) et un CAB (Change Advisory Board)","SLA = engagement contractuel sur la qualité (disponibilité, temps de réponse, MTTR)","CMDB = inventaire de tous les composants IT et leurs relations (Configuration Items)","MTTR (Mean Time To Repair) / MTBF (Mean Time Between Failures) = métriques de fiabilité"],
 piege:"Incident ≠ Problème. L'incident = symptôme (le service est down, traiter maintenant). Le problème = cause racine (éviter la récurrence).",
 retenir:"Incident = urgence. Problème = cause racine. Changement = planifié. SLA = engagement qualité. CMDB = inventaire.",
 keywords:["ITIL","incident","problème","changement","SLA","CMDB","MTTR","MTBF","CAB","RFC","Service Desk"]},

// ────────────────────────────────────────────────────────
// IA & CYBERSÉCURITÉ
// ────────────────────────────────────────────────────────
{id:1601,cat:"ia",titre:"IA & Cybersécurité",sub:"Usages offensifs et défensifs",
 def:"L'intelligence artificielle transforme à la fois les attaques et les défenses en cybersécurité.",
 points:["Défensif : détection d'anomalies comportementales (UEBA), analyse de malwares, triage SIEM automatisé","Offensif : phishing hyper-personnalisé (LLMs), automatisation des scans, génération d'exploits","Adversarial ML : empoisonnement des données d'entraînement, attaques d'évasion des modèles de détection","Deep fakes : usurpation d'identité vocale/visuelle pour fraude au président, vishing","LLM Jailbreaking : manipuler un modèle de langage pour produire du contenu malveillant","EDR + ML : détection des comportements anormaux et des malwares fileless"],
 piege:"L'IA améliore la détection MAIS crée de nouvelles surfaces d'attaque. Les modèles eux-mêmes peuvent être ciblés (adversarial attacks).",
 retenir:"IA défensive = UEBA, SIEM augmenté. IA offensive = phishing ciblé, deep fakes. Adversarial ML = nouvelle menace.",
 keywords:["UEBA","ML","adversarial","LLM","deep fake","vishing","EDR","fileless","fraude au président","jailbreak"]},

// ────────────────────────────────────────────────────────
// COMMANDES LINUX
// ────────────────────────────────────────────────────────
{id:1701,cat:"linux",titre:"Linux — Réseau",sub:"ip, ss, nmap, tcpdump, dig",
 def:"Commandes essentielles pour diagnostiquer et analyser le réseau sous Linux.",
 is_cmd:true,
 cmds:[
   {section:"Interfaces et adressage", items:[
     {cmd:"ip a", comment:"# Toutes les interfaces et IPs"},
     {cmd:"ip r", comment:"# Table de routage"},
     {cmd:"ip link set eth0 up/down", comment:"# Activer/désactiver une interface"},
     {cmd:"nmcli con show", comment:"# Connexions NetworkManager"}
   ]},
   {section:"Diagnostic", items:[
     {cmd:"ping -c 4 8.8.8.8", comment:"# Test connectivité"},
     {cmd:"traceroute 8.8.8.8", comment:"# Chemin des paquets"},
     {cmd:"dig domaine.fr A +short", comment:"# Résolution DNS rapide"},
     {cmd:"ss -tulnp", comment:"# Ports en écoute (remplace netstat)"},
     {cmd:"ss -tp", comment:"# Connexions TCP avec processus"}
   ]},
   {section:"Capture et scan", items:[
     {cmd:"tcpdump -i eth0 port 80 -w capture.pcap", comment:"# Capturer le trafic HTTP"},
     {cmd:"nmap -sS -sV -O 192.168.1.0/24", comment:"# Scan SYN + versions + OS"},
     {cmd:"nmap --script vuln 192.168.1.1", comment:"# Détection de vulnérabilités"}
   ]}
 ],
 piege:"ss remplace netstat (distributions modernes). nmap sans autorisation sur un réseau tiers = infraction pénale.",
 retenir:"ip a = interfaces. ip r = routes. ss -tulnp = ports. nmap = scan. tcpdump = capture. dig = DNS.",
 keywords:["ip a","ip r","ss","nmap","tcpdump","ping","traceroute","dig","nslookup","netstat","ss -tulnp"]},

{id:1702,cat:"linux",titre:"Linux — Sécurité & Droits",sub:"chmod, ufw, iptables, journaux",
 def:"Commandes Linux pour gérer les droits, configurer le pare-feu et surveiller les logs de sécurité.",
 is_cmd:true,
 cmds:[
   {section:"Droits et utilisateurs", items:[
     {cmd:"chmod 750 fichier", comment:"# rwxr-x--- (proprio=rwx, groupe=rx, autres=rien)"},
     {cmd:"chown user:groupe fichier", comment:"# Changer propriétaire et groupe"},
     {cmd:"sudo -l", comment:"# Lister les droits sudo de l'utilisateur courant"},
     {cmd:"passwd -l nomutilisateur", comment:"# Verrouiller un compte utilisateur"}
   ]},
   {section:"Firewall", items:[
     {cmd:"ufw status verbose", comment:"# État du pare-feu UFW"},
     {cmd:"ufw allow 22/tcp && ufw deny 23/tcp", comment:"# Autoriser SSH, bloquer Telnet"},
     {cmd:"iptables -L -n -v --line-numbers", comment:"# Règles iptables avec numéros"},
     {cmd:"iptables-save > /etc/iptables.rules", comment:"# Sauvegarder les règles"}
   ]},
   {section:"Logs", items:[
     {cmd:"tail -f /var/log/auth.log", comment:"# Logs d'authentification en temps réel"},
     {cmd:"grep 'Failed password' /var/log/auth.log | tail -20", comment:"# Derniers échecs SSH"},
     {cmd:"journalctl -u sshd -f", comment:"# Logs SSH via journald (systemd)"},
     {cmd:"last && lastb", comment:"# Connexions réussies / échouées"}
   ]}
 ],
 piege:"chmod 777 = tout le monde peut tout faire. Ne JAMAIS en production. Principe de moindre privilège : chmod 750 ou 640 maximum.",
 retenir:"chmod 750 = sécurisé. ufw = firewall simplifié. tail -f auth.log = surveillance temps réel. lastb = tentatives échouées.",
 keywords:["chmod","chown","sudo","ufw","iptables","auth.log","journalctl","last","lastb","passwd","systemd"]},

{id:1703,cat:"linux",titre:"SSH & Hardening Linux",sub:"sshd_config, fail2ban, clés Ed25519",
 def:"SSH est le protocole d'administration à distance sécurisé. Sa configuration est un point clé du hardening Linux.",
 is_cmd:true,
 cmds:[
   {section:"Clés SSH", items:[
     {cmd:"ssh-keygen -t ed25519 -C 'admin@serveur'", comment:"# Générer une paire Ed25519 (recommandé)"},
     {cmd:"ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host", comment:"# Déployer la clé publique"},
     {cmd:"chmod 600 ~/.ssh/id_ed25519", comment:"# Protéger la clé privée (obligatoire)"}
   ]},
   {section:"/etc/ssh/sshd_config (extraits)", items:[
     {cmd:"PermitRootLogin no", comment:"# Interdire root en SSH"},
     {cmd:"PasswordAuthentication no", comment:"# Forcer l'auth par clé uniquement"},
     {cmd:"Port 2222", comment:"# Changer le port (sécurité par l'obscurité, pas suffisant seul)"},
     {cmd:"AllowUsers alice bob", comment:"# Whitelist des utilisateurs SSH"},
     {cmd:"MaxAuthTries 3", comment:"# Max 3 tentatives d'auth"}
   ]},
   {section:"Fail2ban", items:[
     {cmd:"fail2ban-client status sshd", comment:"# IPs bannies pour SSH"},
     {cmd:"fail2ban-client set sshd unbanip 1.2.3.4", comment:"# Débannir une IP"},
     {cmd:"fail2ban-client status", comment:"# État global de fail2ban"}
   ]}
 ],
 piege:"PermitRootLogin no est insuffisant si un utilisateur peut 'sudo su'. Combiner avec AllowUsers et PasswordAuthentication no.",
 retenir:"PermitRootLogin no + PasswordAuthentication no + fail2ban = hardening SSH minimal. Ed25519 > RSA pour les clés.",
 keywords:["ssh","sshd_config","PermitRootLogin","PasswordAuthentication","fail2ban","Ed25519","AllowUsers","MaxAuthTries","Port 22"]},

{id:1704,cat:"linux",titre:"Forensics Linux",sub:"sha256sum, SUID, lsof, historique",
 def:"Commandes pour l'investigation numérique et la vérification d'intégrité sous Linux.",
 is_cmd:true,
 cmds:[
   {section:"Intégrité", items:[
     {cmd:"sha256sum fichier.iso", comment:"# Hash SHA-256 d'un fichier"},
     {cmd:"sha256sum -c checksums.txt", comment:"# Vérifier une liste de hashs"},
     {cmd:"find / -newer /tmp/reference -type f 2>/dev/null", comment:"# Fichiers modifiés récemment"}
   ]},
   {section:"Recherche de vulnérabilités", items:[
     {cmd:"find / -perm -4000 -type f 2>/dev/null", comment:"# Fichiers SUID (vecteur d'élévation)"},
     {cmd:"find / -perm -2000 -type f 2>/dev/null", comment:"# Fichiers SGID"},
     {cmd:"lsof -i :4444", comment:"# Processus sur port 4444 (souvent Metasploit/C2)"},
     {cmd:"netstat -anp | grep LISTEN", comment:"# Ports en écoute avec PID"}
   ]},
   {section:"Traces et activité", items:[
     {cmd:"history", comment:"# Historique bash (peut être effacé par un attaquant !)"},
     {cmd:"w && who", comment:"# Utilisateurs connectés"},
     {cmd:"stat /bin/bash", comment:"# Dates d'accès et modification (altération possible)"},
     {cmd:"ls -la /tmp /var/tmp /dev/shm", comment:"# Répertoires souvent utilisés par malwares"}
   ]}
 ],
 piege:"Un attaquant peut vider l'historique bash (history -c). Les logs et l'historique locaux ne sont fiables que s'ils sont centralisés via WEF/SIEM.",
 retenir:"sha256sum = intégrité. SUID = find -perm -4000. lsof -i = processus/port. /tmp et /dev/shm = malwares fréquents.",
 keywords:["sha256sum","SUID","SGID","find","lsof","history","who","stat","forensics","/tmp","/dev/shm","intégrité"]},

// ────────────────────────────────────────────────────────
// COMMANDES WINDOWS
// ────────────────────────────────────────────────────────
{id:1801,cat:"windows",titre:"Windows — Réseau & Diagnostic",sub:"ipconfig, netstat, PowerShell",
 def:"Commandes Windows essentielles pour diagnostiquer le réseau.",
 is_cmd:true,
 cmds:[
   {section:"Configuration réseau", items:[
     {cmd:"ipconfig /all", comment:"# Toutes interfaces, IPs, MAC, DNS"},
     {cmd:"ipconfig /release && ipconfig /renew", comment:"# Renouveler le bail DHCP"},
     {cmd:"ipconfig /flushdns", comment:"# Vider le cache DNS"},
     {cmd:"route print", comment:"# Table de routage"}
   ]},
   {section:"Diagnostic", items:[
     {cmd:"ping -n 4 8.8.8.8", comment:"# Test connectivité (4 paquets)"},
     {cmd:"tracert 8.8.8.8", comment:"# Traceroute Windows"},
     {cmd:"nslookup domaine.fr 8.8.8.8", comment:"# Résolution DNS via serveur spécifique"},
     {cmd:"Test-NetConnection 192.168.1.1 -Port 443", comment:"# PowerShell — tester un port"}
   ]},
   {section:"Connexions", items:[
     {cmd:"netstat -ano", comment:"# Connexions actives + PID"},
     {cmd:"netstat -b", comment:"# Connexions + nom du processus (admin requis)"},
     {cmd:"Get-NetTCPConnection | Where-Object {$_.State -eq 'Listen'}", comment:"# PowerShell — ports en écoute"}
   ]}
 ],
 piege:"netstat -ano montre le PID. Pour le nom du processus : tasklist /FI 'PID eq XXXX' ou netstat -b (admin requis).",
 retenir:"ipconfig /all = config. ipconfig /flushdns = cache DNS. netstat -ano = connexions+PID. Test-NetConnection = PowerShell moderne.",
 keywords:["ipconfig","netstat","tracert","nslookup","route print","Test-NetConnection","PowerShell","ping","DNS cache","PID"]},

{id:1802,cat:"windows",titre:"Windows — AD & GPO PowerShell",sub:"RSAT, comptes, événements",
 def:"Commandes PowerShell pour gérer Active Directory et auditer les événements de sécurité Windows.",
 is_cmd:true,
 cmds:[
   {section:"Utilisateurs AD", items:[
     {cmd:"Get-ADUser -Filter {Enabled -eq $false}", comment:"# Comptes désactivés"},
     {cmd:"Get-ADGroupMember 'Domain Admins' -Recursive", comment:"# Membres Domain Admins (récursif)"},
     {cmd:"Search-ADAccount -LockedOut | Unlock-ADAccount", comment:"# Déverrouiller tous les comptes bloqués"},
     {cmd:"Get-ADUser alice -Properties PasswordLastSet,LastLogonDate", comment:"# Infos mdp et dernière connexion"}
   ]},
   {section:"GPO", items:[
     {cmd:"gpresult /r", comment:"# GPO appliquées au compte courant"},
     {cmd:"gpresult /h C:\\gpo_rapport.html", comment:"# Rapport HTML des GPO"},
     {cmd:"gpupdate /force", comment:"# Forcer le rechargement des GPO"}
   ]},
   {section:"Événements de sécurité", items:[
     {cmd:"Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} -MaxEvents 30", comment:"# Échecs de connexion (4625)"},
     {cmd:"Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624} -MaxEvents 10", comment:"# Connexions réussies (4624)"},
     {cmd:"Get-WinEvent -FilterHashtable @{LogName='Security';Id=4648}", comment:"# Connexions avec credentials explicites"}
   ]}
 ],
 piege:"Get-ADUser nécessite le module RSAT (Remote Server Administration Tools). Sur un DC, disponible nativement.",
 retenir:"4625 = échec connexion. 4624 = succès. 4648 = credentials explicites. gpresult /r = GPO actives. RSAT requis hors DC.",
 keywords:["Get-ADUser","Get-ADGroupMember","gpresult","gpupdate","4624","4625","4648","Get-WinEvent","RSAT","Domain Admins"]},

{id:1803,cat:"windows",titre:"Windows — Firewall & BitLocker",sub:"netsh, auditpol, manage-bde",
 def:"Commandes pour configurer le pare-feu Windows, l'audit et le chiffrement des disques BitLocker.",
 is_cmd:true,
 cmds:[
   {section:"Windows Defender Firewall", items:[
     {cmd:"netsh advfirewall show allprofiles", comment:"# État des 3 profils (Domain, Private, Public)"},
     {cmd:"netsh advfirewall set allprofiles state on", comment:"# Activer le pare-feu"},
     {cmd:"New-NetFirewallRule -DisplayName 'Block Telnet' -Direction Inbound -LocalPort 23 -Protocol TCP -Action Block", comment:"# Bloquer Telnet (PowerShell)"}
   ]},
   {section:"Politique d'audit", items:[
     {cmd:"auditpol /get /category:*", comment:"# Toute la politique d'audit"},
     {cmd:"auditpol /set /subcategory:'Logon' /success:enable /failure:enable", comment:"# Activer audit connexions"},
     {cmd:"net accounts", comment:"# Politique des mots de passe local"}
   ]},
   {section:"BitLocker", items:[
     {cmd:"manage-bde -status", comment:"# État chiffrement BitLocker tous volumes"},
     {cmd:"manage-bde -on C: -RecoveryPassword", comment:"# Activer BitLocker sur C:"},
     {cmd:"Get-FileHash C:\\Windows\\System32\\cmd.exe -Algorithm SHA256", comment:"# Hash d'un fichier système"}
   ]}
 ],
 piege:"auditpol active l'audit MAIS sans l'observateur d'événements configuré, les logs ne seront pas générés. Les deux doivent être actifs.",
 retenir:"netsh advfirewall = pare-feu CMD. auditpol = politique d'audit. manage-bde = BitLocker. Get-FileHash = intégrité.",
 keywords:["netsh advfirewall","auditpol","BitLocker","manage-bde","sfc","DISM","Get-FileHash","net accounts","profil firewall"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — RÉSEAU
// ────────────────────────────────────────────────────────
{id:107,cat:"reseau",titre:"ARP & Protocoles de résolution",sub:"ARP, RARP, Gratuitous ARP, ARP spoofing",
 schema:`<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arp-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker><marker id="arp-ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead-green"/></marker><marker id="arp-ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead-red"/></marker></defs><rect class="sd-box" x="10" y="10" width="100" height="32" rx="4"/><text class="sd-text" x="60" y="26">PC A</text><text class="sd-text-small" x="60" y="38">192.168.1.1</text><rect class="sd-box" x="170" y="10" width="100" height="32" rx="4"/><text class="sd-text" x="220" y="26">PC B</text><text class="sd-text-small" x="220" y="38">192.168.1.2</text><rect class="sd-box" x="330" y="10" width="100" height="32" rx="4"/><text class="sd-text" x="380" y="26">PC C</text><text class="sd-text-small" x="380" y="38">192.168.1.3</text><line class="sd-box sd-dash" x1="60" y1="50" x2="60" y2="245"/><line class="sd-box sd-dash" x1="220" y1="50" x2="220" y2="245"/><line class="sd-box sd-dash" x1="380" y1="50" x2="380" y2="245"/><line class="sd-arrow" x1="60" y1="85" x2="380" y2="85" marker-end="url(#arp-ab)"/><text class="sd-text-small" x="220" y="76">① ARP Request (broadcast FF:FF:FF:FF:FF:FF)</text><text class="sd-text-small" x="220" y="87">« Qui a 192.168.1.2 ? Dites-le à 192.168.1.1 »</text><line class="sd-arrow-rev" x1="220" y1="135" x2="60" y2="135" marker-end="url(#arp-ag)"/><text class="sd-text-small" x="140" y="126">② ARP Reply (unicast)</text><text class="sd-text-small" x="140" y="137">« C'est moi ! MAC = AA:BB:CC:DD:EE:02 »</text><rect class="sd-box-accent" x="10" y="160" width="175" height="32" rx="4"/><text class="sd-text" x="97" y="172">Cache ARP de PC A</text><text class="sd-text-small" x="97" y="184">192.168.1.2 → AA:BB:CC:DD:EE:02</text><line class="sd-arrow" x1="60" y1="155" x2="60" y2="160"/><text class="sd-label" x="220" y="230">ARP Spoofing : PC C répond à la place de PC B</text><text class="sd-label" x="220" y="244">→ empoisonne le cache ARP de PC A (MITM)</text></svg>`,
 def:"ARP (Address Resolution Protocol) résout les adresses IP en adresses MAC au niveau de la couche 2 du modèle OSI.",
 points:["ARP Request : broadcast 'Qui a l'IP X ?' — ARP Reply : 'C'est moi, voilà ma MAC'","Table ARP locale : cache des correspondances IP↔MAC avec TTL court","Gratuitous ARP : une machine annonce sa propre IP pour mettre à jour le cache des autres","ARP Spoofing / Poisoning : un attaquant répond à des requêtes ARP avec sa propre MAC pour intercepter le trafic (MITM)","IPv6 remplace ARP par NDP (Neighbor Discovery Protocol) — message NS/NA","Contre-mesures : DAI (Dynamic ARP Inspection) sur les switches, segmentation VLAN"],
 piege:"La table ARP est dynamique et non authentifiée. N'importe quel hôte peut envoyer un ARP Reply non sollicité pour empoisonner le cache d'un autre.",
 retenir:"ARP = IP→MAC. Gratuitous ARP = auto-annonce. ARP Spoofing = MITM L2. DAI = protection switch.",
 keywords:["ARP","MAC","RARP","ARP spoofing","gratuitous ARP","DAI","MITM","cache ARP","NDP","broadcast"]},

{id:108,cat:"reseau",titre:"Protocoles de transport — TCP vs UDP",sub:"3-way handshake, flags, fiabilité",
 schema:`<svg viewBox="0 0 440 220" xmlns="http://www.w3.org/2000/svg"><defs><marker id="tcp-arrow-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker><marker id="tcp-arrow-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead-green"/></marker></defs><rect class="sd-box" x="15" y="10" width="110" height="32" rx="4"/><text class="sd-text" x="70" y="26">Client</text><rect class="sd-box" x="315" y="10" width="110" height="32" rx="4"/><text class="sd-text" x="370" y="26">Serveur</text><line class="sd-box sd-dash" x1="70" y1="42" x2="70" y2="200"/><line class="sd-box sd-dash" x1="370" y1="42" x2="370" y2="200"/><line class="sd-arrow" x1="70" y1="75" x2="370" y2="75" marker-end="url(#tcp-arrow-b)"/><text class="sd-text-small" x="220" y="68">① SYN (seq=x)</text><line class="sd-arrow-rev" x1="370" y1="120" x2="70" y2="120" marker-end="url(#tcp-arrow-g)"/><text class="sd-text-small" x="220" y="113">② SYN-ACK (seq=y, ack=x+1)</text><line class="sd-arrow" x1="70" y1="165" x2="370" y2="165" marker-end="url(#tcp-arrow-b)"/><text class="sd-text-small" x="220" y="158">③ ACK (ack=y+1)</text><text class="sd-text-small" x="220" y="200">Connexion établie — transfert de données</text></svg>`,
 def:"TCP et UDP sont les deux protocoles de couche transport. TCP assure la fiabilité, UDP privilégie la vitesse.",
 extra_table:[
   ["TCP","Orienté connexion","Oui (accusé réception)","Oui","SSH, HTTP, FTP, SMTP"],
   ["UDP","Sans connexion","Non","Non","DNS, DHCP, VoIP, TFTP, streaming"]
 ],
 extra_table_headers:["Proto","Connexion","Fiabilité","Ordre garanti","Usage"],
 points:["TCP 3-way handshake : SYN → SYN-ACK → ACK puis transfert de données","Flags TCP : SYN (initiation), ACK (acquittement), FIN (fermeture), RST (reset forcé), PSH, URG","Numéros de séquence : permettent de reordonner les segments et détecter les pertes","Contrôle de congestion : slow start, congestion avoidance (algorithme de Tahoe/Reno/CUBIC)","Port source + IP source + port dest + IP dest = socket (identifiant unique de connexion)","SYN Flood = attaque DoS qui envoie des SYN sans jamais répondre au SYN-ACK"],
 piege:"UDP n'a pas de 3-way handshake donc pas de state réseau — les ACL stateless ne peuvent pas filtrer UDP par état de connexion.",
 retenir:"TCP = fiable, ordonné, lent. UDP = rapide, non fiable. SYN-SYN/ACK-ACK = handshake. SYN Flood = DoS.",
 keywords:["TCP","UDP","SYN","ACK","FIN","RST","handshake","séquence","socket","port","SYN flood","3-way"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — SÉCURITÉ AD
// ────────────────────────────────────────────────────────
{id:2001,cat:"ad",titre:"Attaques sur Active Directory",sub:"Pass-the-Hash, Kerberoasting, Golden Ticket",
 def:"Active Directory est une cible privilégiée des attaquants car il centralise toutes les identités et tous les accès de l'entreprise.",
 points:["Pass-the-Hash (PtH) : utiliser le hash NTLM d'un mot de passe sans le connaître pour s'authentifier sur d'autres machines","Kerberoasting : demander des TGS pour des comptes de service (SPN), les chiffrer avec AES/RC4 et les craquer hors ligne","DCSync : imiter un DC pour extraire les hashes de tous les comptes du domaine (via drsuapi)","Golden Ticket : forger un TGT avec le hash du compte KRBTGT — accès illimité pendant la durée de validité (10 ans par défaut !)","Silver Ticket : forger un TGS pour un service spécifique sans passer par le KDC","BloodHound : outil qui cartographie les chemins d'attaque AD (délégation, membership, ACL)"],
 piege:"Un Golden Ticket reste valide même après reset du mot de passe de l'utilisateur. Il faut renouveler deux fois le hash KRBTGT pour l'invalider.",
 retenir:"PtH = hash NTLM réutilisé. Kerberoasting = crack TGS offline. Golden Ticket = KRBTGT compromis. DCSync = extraction hashes.",
 keywords:["Pass-the-Hash","Kerberoasting","DCSync","Golden Ticket","Silver Ticket","KRBTGT","SPN","BloodHound","TGT","TGS","NTLM"]},

{id:2002,cat:"ad",titre:"Durcissement Active Directory",sub:"Tiering, LAPS, PAW, Protected Users",
 def:"La sécurisation d'AD repose sur un modèle de niveaux (tiering) et des mesures techniques pour limiter la propagation latérale.",
 points:["Modèle à 3 niveaux (Tiering) : Tier 0 (DC, PKI), Tier 1 (serveurs), Tier 2 (postes) — interdire la connexion cross-tier","LAPS (Local Administrator Password Solution) : mot de passe admin local unique et rotatif par machine, stocké dans AD","PAW (Privileged Access Workstation) : station dédiée pour les tâches d'administration — jamais utilisée pour naviguer/mailer","Protected Users : groupe AD qui désactive NTLM, RC4, délégation Kerberos pour les membres","Credential Guard (Windows 10+) : isole les secrets LSASS dans un VBS pour bloquer les attaques PtH","Audit : surveiller les événements 4728, 4732 (ajout dans groupes), 4769 (requêtes Kerberos service)"],
 piege:"LAPS ne gère que le compte Administrator local. Les comptes de service avec SPN doivent être durcis séparément (MSA, gMSA).",
 retenir:"Tiering = isoler Tier 0/1/2. LAPS = mdp admin local unique. PAW = station dédiée admin. Protected Users = désactive NTLM.",
 keywords:["tiering","LAPS","PAW","Protected Users","Credential Guard","gMSA","délégation","NTLM","Kerberos","Tier 0","audit AD"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — PROTOCOLES
// ────────────────────────────────────────────────────────
{id:2101,cat:"proto",titre:"Protocoles de messagerie",sub:"SMTP, POP3, IMAP, ports, sécurité",
 def:"Les protocoles de messagerie gèrent l'envoi (SMTP) et la réception (POP3/IMAP) des emails.",
 extra_table:[
   ["SMTP","Envoi d'emails","25 (serveur↔serveur), 587 (client→serveur), 465 (SMTPS)"],
   ["IMAP","Réception — emails sur serveur","143 (clair), 993 (IMAPS/TLS)"],
   ["POP3","Réception — télécharge et supprime","110 (clair), 995 (POP3S/TLS)"],
   ["SPF","Anti-spoofing — autorise les IPs émettrices","Enregistrement DNS TXT"],
   ["DKIM","Signature cryptographique des emails","Enregistrement DNS TXT (clé publique)"],
   ["DMARC","Politique de rejet si SPF/DKIM échouent","Enregistrement DNS TXT (_dmarc)"]
 ],
 extra_table_headers:["Proto","Rôle","Port / Détail"],
 points:["SMTP port 25 = entre serveurs (MTA). Port 587 = soumission client avec authentification (STARTTLS)","IMAP = emails restent sur le serveur, synchronisation multi-device. POP3 = télécharge et supprime","SPF + DKIM + DMARC = triade anti-phishing/usurpation — manquant = facilement spooféable","Open relay : serveur SMTP qui accepte d'envoyer des mails pour n'importe quel domaine — blacklisté automatiquement"],
 piege:"Port 25 ouvert en entrée = normal pour un MX. Port 25 ouvert en sortie depuis un réseau interne = risque de spam/exfiltration — à bloquer.",
 retenir:"SMTP 25/587. IMAP 143/993. POP3 110/995. SPF+DKIM+DMARC = anti-usurpation. Open relay = danger.",
 keywords:["SMTP","IMAP","POP3","SPF","DKIM","DMARC","port 25","port 587","STARTTLS","MX","open relay","messagerie"]},

{id:2102,cat:"proto",titre:"Protocoles VPN — IPsec, OpenVPN, WireGuard",sub:"Modes, IKE, tunneling",
 def:"Les VPN chiffrent et encapsulent le trafic pour créer des tunnels sécurisés sur des réseaux publics.",
 extra_table:[
   ["IPsec/IKEv2","Transport & Tunnel","AES-256 + SHA-256","Rapide, natif OS, site-to-site ou client"],
   ["OpenVPN","SSL/TLS sur UDP/TCP","OpenSSL (AES, ChaCha20)","Très configurable, contourne les firewalls"],
   ["WireGuard","UDP","ChaCha20-Poly1305","Ultra-rapide, code minimal, moderne"],
   ["SSL VPN","HTTPS (443)","TLS","Accès web via navigateur, facile à déployer"]
 ],
 extra_table_headers:["Protocole","Couche","Chiffrement","Caractéristiques"],
 points:["IPsec mode Transport : chiffre uniquement le payload. Mode Tunnel : encapsule tout le paquet IP","IKE Phase 1 : établit un canal sécurisé (SA). IKE Phase 2 : négocie les clés pour les données","Split tunneling : seul le trafic vers le réseau privé passe par le VPN (attention aux risques)","WireGuard = ~4000 lignes de code vs OpenVPN ~600 000 — surface d'attaque bien plus faible"],
 piege:"Split tunneling permet à un attaquant sur le réseau local d'un utilisateur VPN de potentiellement atteindre le réseau d'entreprise si l'endpoint est compromis.",
 retenir:"IPsec = standard, deux modes. WireGuard = moderne, rapide. OpenVPN = flexible. Split tunneling = risque sécurité.",
 keywords:["IPsec","IKE","OpenVPN","WireGuard","tunnel","transport","split tunneling","AES","ChaCha20","VPN","SSL VPN"]},

{id:2103,cat:"proto",titre:"Protocoles de supervision & temps",sub:"SNMP, NTP, Syslog, RADIUS",
 def:"Des protocoles spécialisés gèrent la supervision, la synchronisation horaire, les logs et l'authentification réseau.",
 points:["NTP (Network Time Protocol) : synchronisation horaire. Stratum 0 = horloge atomique, Stratum 1 = serveur NTP primaire","NTP port UDP 123. Essentiel pour Kerberos (tolérance de 5 min), SIEM et logs judiciaires","Syslog : protocole de centralisation des logs. Port UDP 514 (non chiffré) / TCP 6514 (TLS — RFC 5424)","RADIUS (Remote Authentication Dial-In User Service) : authentification centralisée pour les équipements réseau, 802.1X","TACACS+ (Cisco) : séparation authentification/autorisation/comptabilité (AAA). Chiffré intégralement","802.1X (NAC) : contrôle d'accès au port — authentifie avant d'accorder l'accès au réseau"],
 piege:"Si les horloges ne sont pas synchronisées, Kerberos rejette les tickets (différence > 5 min), les logs sont inutilisables pour la forensique et les certificats peuvent sembler expirés.",
 retenir:"NTP UDP 123 = synchro horloge. Syslog UDP 514. RADIUS = auth réseau. TACACS+ = AAA Cisco. 802.1X = NAC.",
 keywords:["NTP","Syslog","RADIUS","TACACS+","802.1X","AAA","NAC","stratum","UDP 514","UDP 123","horloge","Kerberos"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — HACKING
// ────────────────────────────────────────────────────────
{id:405,cat:"hacking",titre:"Exploitation réseau & MITM",sub:"Wireshark, ARP poisoning, SSL Strip",
 def:"Les attaques réseau visent à intercepter, modifier ou perturber les communications entre deux parties.",
 points:["MITM (Man-in-the-Middle) : l'attaquant se positionne entre deux machines pour intercepter les échanges","ARP Poisoning : envoyer de faux ARP Reply pour rediriger le trafic vers sa machine (outil : arpspoof, ettercap)","SSL Stripping : dégrader une connexion HTTPS en HTTP pour lire les données en clair (outil : mitmproxy)","DNS Spoofing : répondre à des requêtes DNS avec de fausses IPs pour rediriger vers un faux site","Wireshark : analyseur de paquets. Filtres essentiels : http, dns, tcp.port==443, ip.addr==x.x.x.x","Promiscuous mode : capture tout le trafic sur le segment réseau (nécessite les droits admin ou accès physique)"],
 piege:"HSTS et certificate pinning rendent le SSL Stripping inefficace sur les sites bien configurés. Ce n'est plus aussi simple qu'avant.",
 retenir:"MITM = interception. ARP Poisoning = redirection L2. SSL Strip = dégradation HTTPS. Wireshark = analyse trafic.",
 keywords:["MITM","ARP poisoning","SSL stripping","Wireshark","mitmproxy","DNS spoofing","promiscuous","HSTS","ettercap","trafic"]},

{id:406,cat:"hacking",titre:"Post-exploitation & Persistence",sub:"Pivot, C2, backdoors, couverture des traces",
 def:"La phase post-exploitation consiste à maintenir l'accès, étendre la compromission et atteindre les objectifs finaux.",
 points:["Pivot : utiliser une machine compromise comme relais pour atteindre d'autres segments réseau non accessibles directement","Lateral movement : se déplacer d'une machine à l'autre via PtH, PtT, WMI, PSExec, SMB","C2 (Command & Control) : canal de communication entre l'attaquant et les machines compromises (HTTP/S, DNS, ICMP)","Persistence : tâches planifiées, service malveillant, clés Run de registre, WMI event subscriptions","Living off the Land (LotL) : utiliser des outils légitimes du système (PowerShell, WMI, certutil) pour éviter la détection","Couverture des traces : effacer les logs (wevtutil, history -c), modifier les timestamps (timestomping)"],
 piege:"Les EDR modernes détectent les techniques LotL via l'analyse comportementale, même sans signature virale. La furtivité n'est plus garantie.",
 retenir:"Pivot = rebond réseau. Lateral movement = PtH/PSExec. C2 = canal de contrôle. LotL = outils légitimes détournés.",
 keywords:["pivot","lateral movement","C2","persistence","LotL","PowerShell","WMI","PSExec","timestomping","wevtutil","SMB"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — SÉCURITÉ
// ────────────────────────────────────────────────────────
{id:905,cat:"secu",titre:"Cryptographie appliquée — PKI & TLS",sub:"Handshake complet, cipher suites, révocation",
 schema:`<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box-accent" x="155" y="10" width="130" height="36" rx="6"/><text class="sd-text" x="220" y="24">Root CA</text><text class="sd-text-small" x="220" y="37">(hors ligne, auto-signé)</text><line class="sd-box" x1="220" y1="46" x2="220" y2="75"/><rect class="sd-box" x="100" y="75" width="130" height="36" rx="6"/><text class="sd-text" x="165" y="89">Intermediate CA</text><text class="sd-text-small" x="165" y="102">(signé par Root CA)</text><rect class="sd-box" x="260" y="75" width="130" height="36" rx="6"/><text class="sd-text" x="325" y="89">Intermediate CA 2</text><text class="sd-text-small" x="325" y="102">(signé par Root CA)</text><line class="sd-box" x1="220" y1="46" x2="165" y2="75"/><line class="sd-box" x1="220" y1="46" x2="325" y2="75"/><line class="sd-box" x1="165" y1="111" x2="100" y2="148"/><line class="sd-box" x1="165" y1="111" x2="220" y2="148"/><rect class="sd-box" x="45" y="148" width="110" height="36" rx="4"/><text class="sd-text" x="100" y="162">site.example.com</text><text class="sd-text-small" x="100" y="175">(cert final — signé</text><rect class="sd-box" x="165" y="148" width="110" height="36" rx="4"/><text class="sd-text" x="220" y="162">api.example.com</text><text class="sd-text-small" x="220" y="175">par Inter CA)</text><text class="sd-label" x="220" y="210">Chaîne de confiance : navigateur vérifie Root CA → Inter CA → cert final</text><text class="sd-label" x="220" y="224">CRL / OCSP = révocation en temps réel</text></svg>`,
 def:"La PKI et TLS forment l'épine dorsale de la sécurité des communications sur internet et les réseaux d'entreprise.",
 points:["TLS 1.3 handshake (1-RTT) : ClientHello → ServerHello + Encrypted Extensions + Certificate + Finished → Finished client","Cipher suite TLS 1.3 : TLS_AES_256_GCM_SHA384 — algorithme d'échange, chiffrement symétrique, MAC","ECDHE = Elliptic Curve Diffie-Hellman Ephemeral : PFS garanti, clés éphémères par session","Certificate Transparency (CT Logs) : tous les certificats publics sont enregistrés dans des logs auditables","CRL (Certificate Revocation List) = liste des certificats révoqués. OCSP = vérification en temps réel","PKI privée d'entreprise : Root CA hors ligne + Issuing CA en ligne — hiérarchie critique à protéger"],
 piege:"TLS inspecté (SSL inspection) par un proxy génère un certificat de remplacement signé par une CA interne. Si cette CA est compromise, tout le trafic HTTPS peut être déchiffré.",
 retenir:"TLS 1.3 = 1-RTT, PFS obligatoire, ECDHE. CT Logs = transparence. CRL/OCSP = révocation. CA Root = hors ligne.",
 keywords:["TLS 1.3","ECDHE","PFS","cipher suite","CT logs","CRL","OCSP","PKI","Root CA","Issuing CA","SNI","inspection TLS"]},

{id:906,cat:"secu",titre:"SOC & Réponse à incident",sub:"Phases IR, MITRE ATT&CK, triage",
 def:"Un SOC (Security Operations Center) surveille en continu l'infrastructure et gère la réponse aux incidents de sécurité.",
 points:["Phases IR (NIST SP 800-61) : Préparation → Détection & Analyse → Confinement → Éradication → Récupération → Leçons apprises","MITRE ATT&CK : framework de 14 tactiques et des centaines de techniques d'attaque connues — base de référence pour la détection","Indicateurs de compromission (IoC) : hashes, IPs, domaines, signatures comportementales","Triage : P1 (critique, actif) → P2 (important) → P3 (faible impact) — time to detect/respond = KPIs essentiels","Threat hunting : recherche proactive d'attaquants déjà présents (hypothèse + données + validation)","Playbooks : procédures documentées par type d'incident (ransomware, credential stuffing, exfiltration)"],
 piege:"La détection ne suffit pas — un MTTD (Mean Time to Detect) bas sans MTTR (Mean Time to Respond) bas ne limite pas l'impact d'une attaque.",
 retenir:"IR : Prépa → Détection → Confinement → Éradication → Récup → Leçons. MITRE ATT&CK = 14 tactiques. IoC = indicateurs.",
 keywords:["SOC","SIEM","IR","MITRE ATT&CK","IoC","MTTD","MTTR","triage","threat hunting","playbook","containment","NIST"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — CLOUD & DEVOPS
// ────────────────────────────────────────────────────────
{id:1403,cat:"cloud",titre:"Kubernetes — Sécurité",sub:"RBAC, Network Policies, Secrets, PodSecurity",
 def:"La sécurité Kubernetes couvre le contrôle d'accès, l'isolation réseau et la protection des secrets dans les clusters.",
 points:["RBAC K8s : Role + RoleBinding (namespace) ou ClusterRole + ClusterRoleBinding (cluster entier)","Network Policies : règles L3/L4 pour contrôler le trafic entre pods (par défaut, tout est ouvert !)","Secrets K8s : stockés en base64 (pas chiffrés !) dans etcd — activer l'encryption at rest obligatoire","Pod Security Admission : remplace PodSecurityPolicy (deprecated) — profils baseline/restricted","Image scanning : scanner les images (Trivy, Snyk) avant déploiement — vulnérabilités dans les layers","Least privilege : ServiceAccount dédié avec RBAC minimal par workload, jamais le 'default' SA"],
 piege:"Les Secrets K8s ne sont PAS chiffrés par défaut dans etcd — juste encodés en base64. Sans encryption at rest activée, n'importe qui avec accès à etcd peut les lire.",
 retenir:"RBAC = contrôle accès. Network Policy = isolation pods. Secrets = base64 seulement → activer encryption etcd. Image scanning = obligatoire.",
 keywords:["RBAC","Network Policy","Secrets","etcd","encryption at rest","Pod Security","Trivy","ServiceAccount","image scanning","K8s sécurité"]},

{id:505,cat:"devops",titre:"Infrastructure as Code — Terraform & Ansible",sub:"State, modules, idempotence, inventaire",
 def:"L'IaC permet de gérer l'infrastructure de façon déclarative, versionnable et reproductible.",
 extra_table:[
   ["Terraform","Déclaratif (HCL)","Provisioning infrastructure (VMs, réseaux, cloud)","State file (.tfstate)"],
   ["Ansible","Déclaratif (YAML)","Configuration, déploiement applis, orchestration","Agentless (SSH/WinRM)"],
   ["Puppet","Déclaratif (DSL)","Configuration à grande échelle (agents)","Master/Agent"],
   ["Chef","Impératif (Ruby)","Configuration serveurs (recettes, cookbooks)","Workstation/Server/Node"]
 ],
 extra_table_headers:["Outil","Paradigme","Usage principal","Architecture"],
 points:["Terraform state : fichier qui mémorise l'état réel de l'infra — à stocker dans un backend partagé (S3, Azure Blob) jamais en local","Idempotence : exécuter un playbook Ansible plusieurs fois doit produire le même résultat","terraform plan = aperçu des changements. terraform apply = application. terraform destroy = destruction","Vault (HashiCorp) : gestion centralisée des secrets pour l'IaC — ne jamais stocker de credentials en dur dans le code"],
 piege:"Le state Terraform contient souvent des secrets en clair (mots de passe, clés). Toujours sécuriser le backend avec chiffrement + accès restreint.",
 retenir:"Terraform = provisioning cloud, state file. Ansible = config sans agent, idempotent. Vault = secrets IaC.",
 keywords:["Terraform","Ansible","HCL","YAML","state","idempotence","plan","apply","Vault","backend","agentless","IaC"]},

{id:506,cat:"devops",titre:"CI/CD Sécurisé — DevSecOps",sub:"SAST, DAST, SCA, secrets scanning",
 def:"DevSecOps intègre la sécurité à chaque étape du pipeline CI/CD plutôt qu'en fin de développement.",
 points:["SAST (Static Application Security Testing) : analyse du code source sans l'exécuter (SonarQube, Semgrep, CodeQL)","DAST (Dynamic Application Security Testing) : teste l'application en cours d'exécution (OWASP ZAP, Burp API)","SCA (Software Composition Analysis) : analyse les dépendances tierces et leurs CVE (Snyk, OWASP Dependency-Check)","Secrets scanning : détecter les clés API, tokens, passwords dans le code (GitLeaks, TruffleHog, GitHub Advanced Security)","Container scanning : analyser les images Docker pour les vulnérabilités (Trivy, Clair)","Shift left : intégrer les contrôles de sécurité le plus tôt possible dans le cycle de développement"],
 piege:"Un pipeline CI/CD qui échoue sur une CVE critique MAIS laisse le développeur bypasser le blocage (--force) n'apporte aucune sécurité réelle.",
 retenir:"SAST = code source statique. DAST = appli en exécution. SCA = dépendances. Shift left = sécurité dès le dev. Secrets scanning = obli.",
 keywords:["DevSecOps","SAST","DAST","SCA","secrets scanning","shift left","SonarQube","Semgrep","Trivy","GitLeaks","CVE","pipeline"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — LINUX AVANCÉ
// ────────────────────────────────────────────────────────
{id:1705,cat:"linux",titre:"Linux — Processus & Performances",sub:"ps, top, htop, strace, lsof",
 def:"Surveiller et diagnostiquer les processus et performances d'un système Linux.",
 is_cmd:true,
 cmds:[
   {section:"Processus", items:[
     {cmd:"ps aux | grep nginx", comment:"# Chercher un processus par nom"},
     {cmd:"ps aux --sort=-%cpu | head -10", comment:"# Top 10 processus par CPU"},
     {cmd:"top -b -n 1 | head -20", comment:"# Snapshot top en mode batch"},
     {cmd:"kill -9 <PID>", comment:"# Forcer la fin d'un processus (SIGKILL)"},
     {cmd:"nice -n 10 commande", comment:"# Lancer avec priorité réduite (nice 0=normal, 19=min)"}
   ]},
   {section:"Ressources", items:[
     {cmd:"free -h", comment:"# RAM utilisée / libre / swap"},
     {cmd:"df -h", comment:"# Espace disque par partition"},
     {cmd:"du -sh /var/log/*", comment:"# Taille des sous-répertoires"},
     {cmd:"iostat -x 1 5", comment:"# Stats I/O disque (5 mesures, 1s intervalle)"},
     {cmd:"vmstat 1 5", comment:"# Mémoire virtuelle, swap, CPU en temps réel"}
   ]},
   {section:"Debug avancé", items:[
     {cmd:"strace -p <PID>", comment:"# Tracer les appels système d'un processus"},
     {cmd:"lsof -p <PID>", comment:"# Fichiers ouverts par un processus"},
     {cmd:"dmesg | tail -20", comment:"# Messages noyau récents (boot, erreurs hw)"}
   ]}
 ],
 piege:"kill -9 (SIGKILL) ne laisse pas le processus se terminer proprement — il peut laisser des ressources locked (fichiers, sockets). Préférer kill -15 (SIGTERM) en premier.",
 retenir:"ps aux = processus. free -h = RAM. df -h = disque. strace = appels système. lsof = fichiers ouverts. kill -15 avant -9.",
 keywords:["ps","top","kill","SIGKILL","SIGTERM","free","df","du","iostat","strace","lsof","dmesg","nice","PID"]},

{id:1706,cat:"linux",titre:"Linux — Systemd & Services",sub:"systemctl, journald, units, targets",
 def:"Systemd est le système d'init moderne des distributions Linux, gérant les services, les logs et le démarrage.",
 is_cmd:true,
 cmds:[
   {section:"Gestion des services", items:[
     {cmd:"systemctl status nginx", comment:"# État d'un service + derniers logs"},
     {cmd:"systemctl start|stop|restart nginx", comment:"# Démarrer / arrêter / redémarrer"},
     {cmd:"systemctl enable|disable nginx", comment:"# Activer / désactiver au démarrage"},
     {cmd:"systemctl list-units --type=service --state=failed", comment:"# Services en échec"}
   ]},
   {section:"Journaux (journald)", items:[
     {cmd:"journalctl -u nginx -n 50 --no-pager", comment:"# 50 dernières lignes du service nginx"},
     {cmd:"journalctl -b", comment:"# Logs depuis le dernier démarrage"},
     {cmd:"journalctl --since '1 hour ago'", comment:"# Logs de la dernière heure"},
     {cmd:"journalctl -p err -b", comment:"# Seulement les erreurs depuis le boot"}
   ]},
   {section:"Analyse démarrage", items:[
     {cmd:"systemd-analyze blame", comment:"# Services qui ralentissent le boot"},
     {cmd:"systemd-analyze critical-chain", comment:"# Chaîne critique du démarrage"}
   ]}
 ],
 piege:"systemctl disable ne stoppe pas le service en cours d'exécution. Il faut aussi faire systemctl stop pour l'arrêter immédiatement.",
 retenir:"systemctl status/start/stop/enable. journalctl -u = logs service. systemd-analyze blame = performance boot.",
 keywords:["systemctl","journald","journalctl","systemd","service","enable","disable","unit file","target","boot","blame"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — WINDOWS AVANCÉ
// ────────────────────────────────────────────────────────
{id:1804,cat:"windows",titre:"Windows — Registre & Persistance",sub:"reg, regedit, clés Run, HKLM/HKCU",
 def:"Le registre Windows est la base de données centrale de configuration du système — vecteur courant de persistance malveillante.",
 is_cmd:true,
 cmds:[
   {section:"Lecture et modification", items:[
     {cmd:"reg query HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", comment:"# Clés de démarrage automatique (toutes sessions)"},
     {cmd:"reg query HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", comment:"# Clés démarrage (session courante)"},
     {cmd:"reg add HKLM\\... /v NomValeur /t REG_SZ /d 'valeur'", comment:"# Ajouter une valeur"},
     {cmd:"reg delete HKLM\\... /v NomValeur /f", comment:"# Supprimer une valeur"}
   ]},
   {section:"Forensique — clés sensibles", items:[
     {cmd:"reg query HKLM\\SYSTEM\\CurrentControlSet\\Services", comment:"# Services installés (vecteur rootkit)"},
     {cmd:"reg query HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options", comment:"# IFEO = technique de hijacking"},
     {cmd:"reg query HKCU\\SOFTWARE\\Classes\\ms-settings\\shell\\open\\command", comment:"# Bypass UAC connu (fodhelper)"}
   ]},
   {section:"Analyse de sécurité", items:[
     {cmd:"Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'", comment:"# PowerShell — clés Run"},
     {cmd:"autorunsc.exe -a * -c -h", comment:"# Sysinternals Autoruns — toutes les persistances"}
   ]}
 ],
 piege:"Les clés HKCU\\Run ne nécessitent PAS de droits admin — un attaquant sans privilège peut installer une persistance sur la session utilisateur.",
 retenir:"Run = persistance démarrage. HKLM = toutes sessions (admin requis). HKCU = session courante (user suffisant). Autoruns = outil d'audit.",
 keywords:["registre","HKLM","HKCU","Run","persistance","Autoruns","IFEO","bypass UAC","reg query","fodhelper","services","regedit"]},

{id:1805,cat:"windows",titre:"Windows — Forensique & Artefacts",sub:"Prefetch, LNK, Amcache, EVTX",
 def:"L'investigation numérique Windows s'appuie sur de nombreux artefacts laissés par le système et les applications.",
 points:["Prefetch : fichiers .pf dans C:\\Windows\\Prefetch — trace d'exécution d'un programme (nom, nb d'exécutions, dernière date)","LNK files : raccourcis automatiquement créés dans Recent — révèlent les fichiers ouverts récemment","Amcache.hve : registre qui trace les exécutables installés/exécutés avec leur hash SHA-1","ShimCache (AppCompatCache) : trace les binaires exécutés — persiste après suppression du fichier","$MFT (Master File Table) : table NTFS de tous les fichiers — récupérable même après suppression","EventLog (.evtx) : journaux Windows au format XML binaire — Event IDs clés : 4624/4625/4688/7045"],
 piege:"La suppression d'un fichier n'efface pas son entrée dans Amcache, ShimCache ou Prefetch — ces artefacts permettent de prouver l'exécution même si le binaire a été supprimé.",
 retenir:"Prefetch = exécution programmes. LNK = fichiers récents. Amcache = hashes exécutables. 4688 = process creation. 7045 = nouveau service.",
 keywords:["Prefetch","LNK","Amcache","ShimCache","MFT","EVTX","4624","4625","4688","7045","forensique Windows","artefacts","NTFS"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — MÉTHODO & GOUVERNANCE
// ────────────────────────────────────────────────────────
{id:1901,cat:"methodo",titre:"Gestion de projet IT — Agile & Scrum",sub:"Sprints, Kanban, retrospective, vélocité",
 def:"Les méthodes agiles permettent de livrer des projets IT par itérations courtes avec une adaptation continue aux besoins.",
 extra_table:[
   ["Sprint","Itération de 1 à 4 semaines produisant un incrément livrable","Scrum"],
   ["Backlog","Liste priorisée des fonctionnalités à développer","Scrum/Kanban"],
   ["Daily Scrum","Réunion quotidienne de 15 min : hier / aujourd'hui / bloquants","Scrum"],
   ["Retrospective","Bilan de sprint : ce qui a bien marché / à améliorer","Scrum"],
   ["Kanban","Visualisation du flux de travail en colonnes (To Do / Doing / Done)","Kanban"],
   ["Vélocité","Points de story réalisés par sprint — mesure de capacité","Scrum"]
 ],
 extra_table_headers:["Concept","Description","Méthode"],
 points:["Product Owner : définit les priorités du backlog. Scrum Master : facilite la méthode et lève les obstacles","Definition of Done : critères objectifs pour considérer une tâche terminée (tests passés, code review, déployé)","Story points : estimation relative de la complexité (suite de Fibonacci : 1,2,3,5,8,13…)","Manifeste Agile : individus > processus, logiciel fonctionnel > documentation, collaboration > contrat, adaptation > plan"],
 piege:"Scrum n'est pas une méthode projet standard — c'est un framework empirique. Il n'élimine pas la planification mais la rend itérative et adaptative.",
 retenir:"Sprint = itération. PO = priorités. SM = facilite. Backlog = liste priorisée. Vélocité = capacité. Definition of Done = critères.",
 keywords:["Scrum","Sprint","backlog","Product Owner","Scrum Master","Kanban","vélocité","story points","retrospective","Agile","daily"]},

{id:1902,cat:"methodo",titre:"Gestion des risques IT",sub:"Probabilité, impact, SMSI, traitement",
 def:"La gestion des risques IT identifie, évalue et traite les menaces pour protéger les actifs et assurer la continuité.",
 extra_table:[
   ["Réduction","Mettre en place des contrôles pour diminuer la probabilité ou l'impact","Patch, MFA, firewall"],
   ["Transfert","Déléguer le risque financier à un tiers","Assurance cyber, contrat SLA"],
   ["Acceptation","Tolérer le risque (coût traitement > impact)","Risque résiduel documenté"],
   ["Évitement","Supprimer l'activité qui génère le risque","Abandonner un projet risqué"]
 ],
 extra_table_headers:["Traitement","Description","Exemple"],
 points:["Risque = Probabilité × Impact. La matrice risque permet de prioriser les traitements","Risque inhérent = avant contrôles. Risque résiduel = après contrôles — toujours accepté par la direction","SMSI (ISO 27001) : cycle PDCA appliqué à la gestion des risques — Plan, Do, Check, Act","Appétit au risque : niveau de risque acceptable défini par la direction — cadre de toutes les décisions"],
 piege:"Accepter un risque ≠ ignorer un risque. L'acceptation formelle doit être documentée et signée par un responsable. Un risque accepté implicitement est un risque non géré.",
 retenir:"Risque = Proba × Impact. 4 traitements : Réduire / Transférer / Accepter / Éviter. Résiduel = après contrôles, validé par direction.",
 keywords:["risque inhérent","risque résiduel","probabilité","impact","traitement","SMSI","appétit au risque","PDCA","ISO 27001","matrice risque"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — WEF / LOGS
// ────────────────────────────────────────────────────────
{id:1005,cat:"wef",titre:"Event IDs Windows essentiels",sub:"4624, 4625, 4688, 7045, 1102…",
 def:"Les Event IDs sont des identifiants numériques uniques pour chaque type d'événement dans les journaux Windows.",
 extra_table:[
   ["4624","Security","Connexion réussie — Logon Type 2=interactif, 3=réseau, 10=remote","Toujours"],
   ["4625","Security","Échec de connexion — 0xC000006A=mauvais mdp, 0xC0000234=compte verrouillé","Toujours"],
   ["4688","Security","Création d'un processus (process creation) — commande exécutée","Audit activé"],
   ["4698/4702","Security","Tâche planifiée créée/modifiée — vecteur de persistance","Audit activé"],
   ["7045","System","Nouveau service installé — rootkits, backdoors","Toujours"],
   ["1102","Security","Journal d'audit effacé — signe d'anti-forensique","Toujours"],
   ["4720","Security","Compte utilisateur créé","Toujours"],
   ["4728/4732","Security","Membre ajouté à un groupe de sécurité global/local","Toujours"]
 ],
 extra_table_headers:["Event ID","Journal","Description","Collecte"],
 points:["Logon Type 3 (réseau) + compte admin = mouvement latéral potentiel à investiguer","4688 nécessite d'activer 'Audit Process Creation' dans la politique d'audit ET 'Include command line' pour voir la commande","Corrélation : 4625 répétés + 4624 = brute force réussi. 1102 + 7045 = compromission active possible"],
 piege:"L'Event ID 4624 seul ne suffit pas à identifier une connexion suspecte. Le Logon Type et le compte sont indispensables pour le contexte.",
 retenir:"4624=connexion OK. 4625=échec. 4688=process. 7045=service. 1102=log effacé. 4720=compte créé. Logon Type 3=réseau.",
 keywords:["4624","4625","4688","7045","1102","4720","4728","4732","Logon Type","event ID","Windows","EVTX","audit"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — RÉGLEMENTATION
// ────────────────────────────────────────────────────────
{id:1103,cat:"reglem",titre:"PCI DSS & Secteur financier",sub:"Données cartes, 12 exigences, QSA",
 def:"PCI DSS (Payment Card Industry Data Security Standard) est le standard de sécurité obligatoire pour toute organisation qui traite des données de cartes bancaires.",
 extra_table:[
   ["Req 1-2","Réseau sécurisé","Firewall, mots de passe par défaut changés"],
   ["Req 3-4","Protection données cartes","Chiffrement stockage (PAN), chiffrement transit (TLS)"],
   ["Req 5-6","Programme vulnérabilités","Antivirus, patches, développement sécurisé"],
   ["Req 7-9","Contrôle accès","Moindre privilège, MFA, sécurité physique"],
   ["Req 10-11","Monitoring & Tests","Logs, SIEM, tests d'intrusion réguliers"],
   ["Req 12","Politique sécurité","Politique documentée, formation, gestion fournisseurs"]
 ],
 extra_table_headers:["Exigences","Domaine","Points clés"],
 points:["PAN (Primary Account Number) = numéro de carte — ne jamais stocker non chiffré, masquer dans les logs","QSA (Qualified Security Assessor) = auditeur certifié pour les audits PCI DSS de niveau 1","SAQ (Self-Assessment Questionnaire) = auto-évaluation pour les niveaux inférieurs","Tokenisation : remplacer le PAN par un token sans valeur — meilleure pratique pour réduire la PCI scope"],
 piege:"Même un prestataire qui traite les paiements à votre place ne vous exonère pas de PCI DSS — vous restez responsable de la conformité de votre chaîne.",
 retenir:"PCI DSS = 12 exigences. PAN = chiffré obligatoire. Tokenisation = réduit la scope. QSA = auditeur certifié.",
 keywords:["PCI DSS","PAN","tokenisation","QSA","SAQ","chiffrement cartes","conformité","scope","niveau 1","audit PCI"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — SUPERVISION AVANCÉE
// ────────────────────────────────────────────────────────
{id:1303,cat:"superv",titre:"ELK Stack — Elasticsearch, Logstash, Kibana",sub:"Pipeline de logs, index, dashboards",
 def:"L'ELK Stack est la suite open-source de référence pour la collecte, l'indexation et la visualisation des logs.",
 points:["Logstash (ou Beats) : collecte et normalise les logs (filtres grok, champs enrichis, géolocalisation IP)","Elasticsearch : stockage et indexation full-text distribuée. Index = ensemble de documents. Shard = partition","Kibana : interface web pour visualiser les données (dashboards, Discover, Lens, alertes)","Filebeat / Winlogbeat / Packetbeat : agents légers (Beats) pour collecter logs, events Windows, trafic réseau","Pipeline : Source → Beat/Agent → Logstash (enrichissement) → Elasticsearch → Kibana","Retention : gérer les Index Lifecycle Management (ILM) — hot/warm/cold/delete pour les coûts"],
 piege:"Elasticsearch exposé sans authentification = fuite massive de données (nombreux clusters publics indexés par Shodan). Activer X-Pack Security obligatoirement.",
 retenir:"Beats = collecte. Logstash = normalisation. Elasticsearch = indexation. Kibana = visualisation. ILM = lifecycle. Auth obligatoire.",
 keywords:["ELK","Elasticsearch","Logstash","Kibana","Filebeat","Winlogbeat","Beats","index","shard","grok","ILM","X-Pack","SIEM"]},

// ────────────────────────────────────────────────────────
// NOUVELLES FICHES — CISCO AVANCÉ
// ────────────────────────────────────────────────────────
{id:210,cat:"cisco",titre:"Cisco — HSRPv2 & Redondance passerelle",sub:"HSRP, VRRP, GLBP, VIP",
 def:"Les protocoles de redondance de passerelle (FHRP) assurent la disponibilité de la passerelle par défaut sans configuration manuelle sur les hôtes.",
 points:["HSRP (Cisco propriétaire) : un routeur Actif + un Standby. VIP partagée, MAC virtuelle 0000.0c07.acXX","VRRP (standard IEEE) : identique à HSRP mais interopérable. VIP peut être l'IP réelle du master","GLBP (Cisco) : load balancing actif-actif entre plusieurs routeurs — chacun répond à des requêtes ARP","Préemption : permettre au routeur avec la priorité la plus haute de reprendre le rôle Actif après un incident","Priority : valeur 0-255, défaut 100. Tracking d'interface : réduire la priorité si l'uplink tombe","Hello HSRP = 3s. Hold time = 10s. Changer ces valeurs pour accélérer la convergence"],
 piege:"Sans preempt configuré, le routeur Standby ne reprendra pas automatiquement le rôle Actif même avec une priorité plus haute.",
 retenir:"HSRP = Cisco, Actif+Standby, VIP. VRRP = standard. GLBP = load balancing. Preempt = reprendre Actif automatiquement.",
 keywords:["HSRP","VRRP","GLBP","FHRP","VIP","actif","standby","preempt","priorité","tracking","redondance passerelle"]},

{id:211,cat:"cisco",titre:"Cisco — EtherChannel & LACP",sub:"LACP, PAgP, agrégation de liens",
 def:"EtherChannel agrège plusieurs liens physiques entre deux switches en un seul lien logique pour la bande passante et la redondance.",
 is_cmd:true,
 cmds:[
   {section:"Configuration LACP (standard IEEE 802.3ad)", items:[
     {cmd:"interface range GigabitEthernet0/1-2", comment:"# Sélectionner les interfaces à agréger"},
     {cmd:"channel-group 1 mode active", comment:"# LACP actif (négocie avec le voisin)"},
     {cmd:"interface port-channel 1", comment:"# Interface logique agrégée"},
     {cmd:"switchport mode trunk", comment:"# Configurer le trunk sur le port-channel"}
   ]},
   {section:"Vérification", items:[
     {cmd:"show etherchannel summary", comment:"# État de tous les EtherChannels (P=bundled, I=standalone)"},
     {cmd:"show interfaces port-channel 1", comment:"# Stats du lien agrégé"},
     {cmd:"show lacp neighbor", comment:"# Infos sur le voisin LACP"}
   ]}
 ],
 piege:"Les interfaces dans un EtherChannel doivent avoir EXACTEMENT la même configuration (vitesse, duplex, VLAN, trunk/access) — toute différence désactive le bundle.",
 retenir:"EtherChannel = agrégation liens. LACP (mode active/passive) = standard. PAgP = Cisco. show etherchannel summary = vérification.",
 keywords:["EtherChannel","LACP","PAgP","port-channel","agrégation","802.3ad","active","passive","bundle","show etherchannel"]},

// ────────────────────────────────────────────────────────
// CISCO — FICHES SUPPLÉMENTAIRES
// ────────────────────────────────────────────────────────
{id:212,cat:"cisco",titre:"Cisco — Sécurisation IOS",sub:"Mots de passe, SSH, bannières, service password-encryption",
 def:"La sécurisation d'un équipement Cisco commence par la protection des accès en console, VTY et privilégié.",
 is_cmd:true,
 cmds:[
   {section:"Mots de passe et accès", items:[
     {cmd:"enable secret MonMDP_Fort!", comment:"# Mot de passe enable chiffré (MD5) — remplace 'enable password'"},
     {cmd:"service password-encryption", comment:"# Chiffre tous les mots de passe en clair dans la config (type 7, faible)"},
     {cmd:"username admin privilege 15 secret MonMDP!", comment:"# Compte local avec niveau max"},
     {cmd:"security passwords min-length 10", comment:"# Longueur minimale des mots de passe"}
   ]},
   {section:"SSH obligatoire (bannir Telnet)", items:[
     {cmd:"ip domain-name lab.local", comment:"# Requis pour générer les clés RSA"},
     {cmd:"crypto key generate rsa modulus 2048", comment:"# Générer clés RSA 2048 bits"},
     {cmd:"ip ssh version 2", comment:"# Forcer SSHv2 (v1 vulnérable)"},
     {cmd:"line vty 0 15", comment:"# Lignes VTY (accès distant)"},
     {cmd:"transport input ssh", comment:"# Autoriser SSH uniquement (pas Telnet !)"},
     {cmd:"login local", comment:"# Authentifier sur la base locale"}
   ]},
   {section:"Bannière et timeout", items:[
     {cmd:"banner motd # Accès réservé aux personnes autorisées. #", comment:"# Message d'avertissement légal"},
     {cmd:"exec-timeout 5 0", comment:"# Déconnexion après 5 min d'inactivité"},
     {cmd:"no ip http server", comment:"# Désactiver le serveur HTTP"},
     {cmd:"no ip http secure-server", comment:"# Désactiver HTTPS (si non utilisé)"}
   ]}
 ],
 piege:"'enable password' stocke le MDP en clair. Toujours utiliser 'enable secret' (MD5) ou mieux, un type 9 (scrypt) si l'IOS le supporte.",
 retenir:"enable secret > enable password. ip ssh version 2 + transport input ssh = SSH obligatoire. exec-timeout = déconnexion auto.",
 keywords:["enable secret","service password-encryption","ssh version 2","transport input ssh","login local","banner motd","exec-timeout","crypto key"]},

{id:213,cat:"cisco",titre:"Cisco — DHCP Snooping & IP Source Guard",sub:"Protection DHCP, ARP Inspection dynamique",
 is_cmd:true,
 def:"DHCP Snooping, DAI et IP Source Guard forment la triade de sécurité L2 de Cisco contre les attaques d'usurpation.",
 cmds:[
   {section:"DHCP Snooping", items:[
     {cmd:"ip dhcp snooping", comment:"# Activer DHCP Snooping globalement"},
     {cmd:"ip dhcp snooping vlan 10,20", comment:"# Activer sur les VLANs 10 et 20"},
     {cmd:"interface GigabitEthernet0/1", comment:"# Port vers le serveur DHCP légitime"},
     {cmd:"ip dhcp snooping trust", comment:"# Marquer comme trusted (serveur DHCP)"},
     {cmd:"show ip dhcp snooping binding", comment:"# Table IP-MAC-Port (base pour DAI et IPSG)"}
   ]},
   {section:"Dynamic ARP Inspection (DAI)", items:[
     {cmd:"ip arp inspection vlan 10,20", comment:"# Activer DAI sur les VLANs"},
     {cmd:"ip arp inspection trust", comment:"# Interface trusted (uplink vers routeur)"},
     {cmd:"show ip arp inspection vlan 10", comment:"# Stats DAI"}
   ]},
   {section:"IP Source Guard", items:[
     {cmd:"ip verify source", comment:"# Activer IPSG sur un port (filtre par IP+MAC)"},
     {cmd:"show ip verify source", comment:"# Table des entrées IPSG"}
   ]}
 ],
 piege:"DHCP Snooping doit être activé avant DAI et IP Source Guard — ils utilisent sa table de liaisons. Sans la table, tout le trafic DHCP est bloqué.",
 retenir:"DHCP Snooping → table IP/MAC. DAI = anti-ARP spoofing. IP Source Guard = filtre IP par port. trust = uplink/serveur DHCP.",
 keywords:["DHCP Snooping","DAI","Dynamic ARP Inspection","IP Source Guard","trusted","binding table","vlan","L2 security"]},

{id:214,cat:"cisco",titre:"Cisco — Gestion des accès AAA",sub:"RADIUS, TACACS+, 802.1X, dot1x",
 def:"L'AAA (Authentication, Authorization, Accounting) centralise la gestion des accès aux équipements réseau.",
 is_cmd:true,
 cmds:[
   {section:"Configuration AAA de base", items:[
     {cmd:"aaa new-model", comment:"# Activer le modèle AAA (obligatoire en premier)"},
     {cmd:"aaa authentication login default group radius local", comment:"# Auth via RADIUS, puis local si RADIUS down"},
     {cmd:"aaa authorization exec default group radius local", comment:"# Autorisation de session exec"},
     {cmd:"aaa accounting exec default start-stop group radius", comment:"# Comptabilité des sessions"}
   ]},
   {section:"Serveur RADIUS", items:[
     {cmd:"radius server MON-RADIUS", comment:"# Définir un serveur RADIUS"},
     {cmd:"address ipv4 10.0.0.10 auth-port 1812 acct-port 1813", comment:"# IP et ports"},
     {cmd:"key MonSecretPartagé!", comment:"# Clé partagée (shared secret)"}
   ]},
   {section:"802.1X (NAC)", items:[
     {cmd:"dot1x system-auth-control", comment:"# Activer 802.1X globalement"},
     {cmd:"interface GigabitEthernet0/1", comment:"# Port à contrôler"},
     {cmd:"authentication port-control auto", comment:"# Mode auto = attendre authentification"},
     {cmd:"dot1x pae authenticator", comment:"# Rôle authenticator pour ce port"}
   ]}
 ],
 piege:"Sans 'aaa new-model', les commandes aaa authentication sont ignorées. Et sans fallback 'local', si le serveur RADIUS est down, plus d'accès possible.",
 retenir:"aaa new-model = premier. RADIUS = auth centralisée. TACACS+ = AAA Cisco avancé. 802.1X = NAC par port. Toujours prévoir le fallback local.",
 keywords:["AAA","aaa new-model","RADIUS","TACACS+","802.1X","dot1x","NAC","authentication","authorization","accounting","fallback"]},

// ────────────────────────────────────────────────────────
// POWERSHELL — FICHES COMPLÈTES
// ────────────────────────────────────────────────────────
{id:2201,cat:"windows",titre:"PowerShell — Bases & Navigation",sub:"Get-Help, alias, pipeline, objets",
 def:"PowerShell est un shell orienté objet et un langage de script développé par Microsoft, fondamental pour l'administration Windows.",
 is_cmd:true,
 cmds:[
   {section:"Navigation et découverte", items:[
     {cmd:"Get-Command *process*", comment:"# Trouver toutes les commandes contenant 'process'"},
     {cmd:"Get-Help Get-Process -Examples", comment:"# Aide avec exemples pour Get-Process"},
     {cmd:"Get-Alias ls", comment:"# Voir l'alias complet (ls = Get-ChildItem)"},
     {cmd:"Get-Member", comment:"# Voir les propriétés et méthodes d'un objet (via pipeline)"}
   ]},
   {section:"Navigation système de fichiers", items:[
     {cmd:"Set-Location C:\\Users", comment:"# cd en PS (alias: cd, sl)"},
     {cmd:"Get-ChildItem -Recurse -Filter *.log", comment:"# Lister récursivement les .log (alias: ls, dir)"},
     {cmd:"Get-Item C:\\Windows\\System32\\cmd.exe | Select-Object *", comment:"# Toutes les propriétés d'un fichier"},
     {cmd:"Copy-Item C:\\src\\* D:\\dest\\ -Recurse", comment:"# Copier récursivement"},
     {cmd:"Remove-Item C:\\temp\\* -Recurse -Force", comment:"# Supprimer avec force (pas de confirmation)"}
   ]},
   {section:"Pipeline et filtrage", items:[
     {cmd:"Get-Process | Where-Object {$_.CPU -gt 100} | Sort-Object CPU -Descending", comment:"# Processus > 100s CPU"},
     {cmd:"Get-Service | Select-Object Name,Status | Export-Csv services.csv -NoTypeInformation", comment:"# Exporter en CSV"},
     {cmd:"1..10 | ForEach-Object { Write-Host \"Ligne $_\" }", comment:"# Boucle forEach"}
   ]}
 ],
 piege:"PowerShell manipule des OBJETS, pas du texte. Le pipeline passe des objets complets avec propriétés, ce qui le rend bien plus puissant que bash.",
 retenir:"Get-Command = chercher. Get-Help = aide. Pipeline = objets. Where-Object = filtrer. Select-Object = choisir propriétés.",
 keywords:["Get-Command","Get-Help","Get-ChildItem","Where-Object","Select-Object","pipeline","ForEach-Object","alias","Export-Csv"]},

{id:2202,cat:"windows",titre:"PowerShell — Sécurité & Exécution",sub:"ExecutionPolicy, Bypass, AMSI, logging",
 def:"La politique d'exécution PowerShell et les mécanismes de sécurité modernes contrôlent l'exécution des scripts.",
 is_cmd:true,
 cmds:[
   {section:"ExecutionPolicy", items:[
     {cmd:"Get-ExecutionPolicy -List", comment:"# Voir la politique pour chaque scope"},
     {cmd:"Set-ExecutionPolicy RemoteSigned -Scope LocalMachine", comment:"# Scripts locaux OK, distants doivent être signés"},
     {cmd:"Set-ExecutionPolicy Restricted -Scope CurrentUser", comment:"# Aucun script autorisé (scope utilisateur)"},
     {cmd:"Unblock-File .\\script.ps1", comment:"# Débloquer un script téléchargé"}
   ]},
   {section:"Journalisation (défense)", items:[
     {cmd:"# Activer via GPO : Computer > Admin Templates > Windows Components > PowerShell", comment:""},
     {cmd:"# Script Block Logging : enregistre TOUT le code PS dans EventLog 4104", comment:""},
     {cmd:"# Transcription : sauvegarde session complète dans un fichier texte", comment:""},
     {cmd:"Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-PowerShell/Operational';Id=4104} -MaxEvents 10", comment:"# Voir les blocs de script logués"}
   ]},
   {section:"Analyse forensique PS", items:[
     {cmd:"(Get-PSReadLineOption).HistorySavePath", comment:"# Chemin de l'historique PS (PSReadLine)"},
     {cmd:"Get-Content $env:APPDATA\\Microsoft\\Windows\\PowerShell\\PSReadLine\\ConsoleHost_history.txt", comment:"# Historique des commandes"},
     {cmd:"Get-WinEvent -LogName 'Microsoft-Windows-PowerShell/Operational' | Where-Object {$_.Id -eq 4104}", comment:"# Script blocks"}
   ]}
 ],
 piege:"Restricted ExecutionPolicy ne bloque pas le bypass : 'powershell -ExecutionPolicy Bypass -File script.ps1' contourne tout. Ce n'est pas une mesure de sécurité suffisante seule.",
 retenir:"ExecutionPolicy = RemoteSigned en production. Script Block Logging (4104) = détecter les scripts malveillants. PSReadLine = historique.",
 keywords:["ExecutionPolicy","RemoteSigned","Bypass","AMSI","4104","Script Block Logging","PSReadLine","Transcription","Constrained Language Mode"]},

{id:2203,cat:"windows",titre:"PowerShell — Administration système",sub:"Services, processus, disques, registre",
 def:"PowerShell pour administrer les services Windows, processus, disques et le registre.",
 is_cmd:true,
 cmds:[
   {section:"Processus et services", items:[
     {cmd:"Get-Process | Sort-Object WorkingSet -Desc | Select-Object -First 10", comment:"# Top 10 par RAM"},
     {cmd:"Stop-Process -Name notepad -Force", comment:"# Tuer un processus par nom"},
     {cmd:"Get-Service | Where-Object {$_.Status -eq 'Stopped' -and $_.StartType -eq 'Automatic'}", comment:"# Services auto arrêtés (anomalie !)"},
     {cmd:"Restart-Service -Name Spooler -Force", comment:"# Redémarrer le spouleur d'impression"}
   ]},
   {section:"Disques et fichiers", items:[
     {cmd:"Get-PSDrive | Where-Object {$_.Provider -like '*FileSystem*'}", comment:"# Disques et espace disponible"},
     {cmd:"Get-Disk | Get-Partition | Get-Volume", comment:"# Informations volumes NTFS"},
     {cmd:"Get-FileHash C:\\Windows\\System32\\ntoskrnl.exe -Algorithm SHA256", comment:"# Hash du noyau Windows"},
     {cmd:"Get-Acl C:\\SensitiveFolder | Format-List", comment:"# Droits NTFS d'un dossier"}
   ]},
   {section:"Registre", items:[
     {cmd:"Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion'", comment:"# Infos version Windows"},
     {cmd:"Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'", comment:"# Programmes au démarrage (utilisateur)"},
     {cmd:"Set-ItemProperty 'HKLM:\\...' -Name 'NomValeur' -Value 'données'", comment:"# Modifier une valeur de registre"},
     {cmd:"New-Item 'HKLM:\\SOFTWARE\\MonApp' -Force", comment:"# Créer une clé de registre"}
   ]}
 ],
 piege:"Get-Service retourne des objets ServiceController. Pour démarrer/arrêter, utiliser Start-Service/Stop-Service — pas net start/stop (différent).",
 retenir:"Get-Process/Stop-Process. Get-Service/Restart-Service. Get-FileHash = intégrité. Get-Acl = droits NTFS. Get-ItemProperty = registre.",
 keywords:["Get-Process","Stop-Process","Get-Service","Restart-Service","Get-Disk","Get-Volume","Get-FileHash","Get-Acl","Get-ItemProperty","registre"]},

{id:2204,cat:"windows",titre:"PowerShell — Réseau & Sécurité",sub:"Test-NetConnection, Invoke-WebRequest, firewall",
 def:"PowerShell pour diagnostiquer le réseau, tester la connectivité et gérer le pare-feu Windows.",
 is_cmd:true,
 cmds:[
   {section:"Diagnostic réseau", items:[
     {cmd:"Test-NetConnection -ComputerName 8.8.8.8 -Port 53", comment:"# Tester la connectivité TCP sur un port"},
     {cmd:"Test-NetConnection -ComputerName dc01.lab.local -CommonTCPPort RDP", comment:"# Tester RDP (port 3389)"},
     {cmd:"Resolve-DnsName domaine.fr -Type MX", comment:"# Résoudre les enregistrements MX"},
     {cmd:"Get-NetIPConfiguration", comment:"# Config réseau complète (IP, gateway, DNS)"},
     {cmd:"Get-NetTCPConnection -State Listen | Sort-Object LocalPort", comment:"# Ports en écoute triés"}
   ]},
   {section:"Firewall Windows", items:[
     {cmd:"Get-NetFirewallRule -Enabled True -Direction Inbound | Select-Object DisplayName,Action", comment:"# Règles actives entrantes"},
     {cmd:"New-NetFirewallRule -DisplayName 'Block RDP externe' -Direction Inbound -LocalPort 3389 -Protocol TCP -RemoteAddress Internet -Action Block", comment:"# Bloquer RDP depuis internet"},
     {cmd:"Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True", comment:"# Activer tous les profils firewall"}
   ]},
   {section:"Téléchargement et web", items:[
     {cmd:"Invoke-WebRequest -Uri https://example.com -OutFile C:\\tmp\\page.html", comment:"# Télécharger (alias: iwr, wget, curl)"},
     {cmd:"[System.Net.Dns]::GetHostAddresses('domaine.fr')", comment:"# Résolution DNS .NET"},
     {cmd:"(New-Object System.Net.WebClient).DownloadFile('https://url','C:\\out.exe')", comment:"# Téléchargement .NET (technique LotL !)"}
   ]}
 ],
 piege:"Invoke-WebRequest et WebClient sont souvent utilisés par les attaquants (LotL) pour télécharger des payloads. Le Script Block Logging (4104) les capture.",
 retenir:"Test-NetConnection = telnet moderne. Get-NetFirewallRule = audit règles. New-NetFirewallRule = bloquer. Resolve-DnsName = DNS.",
 keywords:["Test-NetConnection","Get-NetTCPConnection","Get-NetFirewallRule","New-NetFirewallRule","Invoke-WebRequest","Resolve-DnsName","Get-NetIPConfiguration"]},

{id:2205,cat:"windows",titre:"PowerShell — Scripts et automatisation",sub:"Variables, fonctions, try/catch, modules",
 def:"PowerShell comme langage de script : variables, fonctions, gestion d'erreurs et modules pour l'automatisation IT.",
 is_cmd:true,
 cmds:[
   {section:"Variables et types", items:[
     {cmd:"$texte = 'Bonjour'; $nb = 42; $tab = @(1,2,3)", comment:"# String, entier, tableau"},
     {cmd:"$hash = @{Nom='Alice'; Age=30}", comment:"# Hashtable (dictionnaire)"},
     {cmd:"$env:USERNAME", comment:"# Variables d'environnement"},
     {cmd:"[int]'42' + 8", comment:"# Cast de type : conversion string → int"}
   ]},
   {section:"Fonctions et boucles", items:[
     {cmd:"function Get-InfoServeur { param($Server) Invoke-Command -ComputerName $Server -ScriptBlock { hostname } }", comment:"# Fonction avec paramètre"},
     {cmd:"foreach ($srv in $servers) { Test-NetConnection $srv -Port 443 }", comment:"# Boucle foreach"},
     {cmd:"1..100 | Where-Object { $_ % 2 -eq 0 }", comment:"# Nombres pairs de 1 à 100"}
   ]},
   {section:"Gestion des erreurs et modules", items:[
     {cmd:"try { Get-Item 'C:\\inexistant' -ErrorAction Stop } catch { Write-Host \"Erreur: $_\" }", comment:"# Try/Catch"},
     {cmd:"Get-Module -ListAvailable | Where-Object {$_.Name -like '*AD*'}", comment:"# Modules AD disponibles"},
     {cmd:"Import-Module ActiveDirectory", comment:"# Charger le module AD"},
     {cmd:"Save-Module PSScriptAnalyzer -Path C:\\Modules", comment:"# Télécharger un module sans l'installer"}
   ]}
 ],
 piege:"$ErrorActionPreference = 'SilentlyContinue' masque toutes les erreurs silencieusement — dangereux en production car les échecs passent inaperçus.",
 retenir:"Hashtable = @{}. Tableau = @(). try/catch = gestion erreurs. Import-Module = charger module. foreach = itération.",
 keywords:["variable","hashtable","tableau","foreach","try","catch","Import-Module","ErrorAction","param","function","ScriptBlock"]},

{id:2206,cat:"windows",titre:"PowerShell — Active Directory avancé",sub:"Recherches, comptes, groupes, GPO, RBAC",
 def:"Administration avancée d'Active Directory avec PowerShell et le module RSAT.",
 is_cmd:true,
 cmds:[
   {section:"Recherches AD avancées", items:[
     {cmd:"Get-ADUser -Filter {PasswordNeverExpires -eq $true} -Properties PasswordNeverExpires", comment:"# Comptes avec MDP sans expiration"},
     {cmd:"Get-ADUser -Filter {LastLogonDate -lt (Get-Date).AddDays(-90)}", comment:"# Comptes inactifs depuis 90 jours"},
     {cmd:"Get-ADComputer -Filter * -Properties LastLogonDate | Where-Object {$_.LastLogonDate -lt (Get-Date).AddDays(-30)}", comment:"# Machines inactives"},
     {cmd:"Get-ADObject -LDAPFilter '(adminCount=1)' -Properties *", comment:"# Objets avec adminCount=1 (protégés SD)"}
   ]},
   {section:"Groupes et membres", items:[
     {cmd:"Get-ADGroupMember 'Domain Admins' -Recursive | Select-Object SamAccountName,ObjectClass", comment:"# Membres récursifs Domain Admins"},
     {cmd:"Get-ADUser alice | Get-ADPrincipalGroupMembership | Select-Object Name", comment:"# Groupes d'un utilisateur"},
     {cmd:"Add-ADGroupMember -Identity 'IT Team' -Members alice,bob", comment:"# Ajouter des membres"},
     {cmd:"New-ADGroup -Name 'SecurityTeam' -GroupScope Global -GroupCategory Security", comment:"# Créer un groupe"}
   ]},
   {section:"Audit et sécurité", items:[
     {cmd:"Get-ADDefaultDomainPasswordPolicy", comment:"# Politique de MDP du domaine"},
     {cmd:"Set-ADAccountControl -Identity alice -PasswordNeverExpires $false", comment:"# Forcer expiration MDP"},
     {cmd:"Search-ADAccount -PasswordExpired | Select-Object SamAccountName", comment:"# Comptes avec MDP expiré"},
     {cmd:"Get-ADFineGrainedPasswordPolicy -Filter *", comment:"# Politiques de MDP granulaires (PSO)"}
   ]}
 ],
 piege:"adminCount=1 indique des comptes protégés par AdminSDHolder. Leurs ACL sont réinitialisées toutes les heures — les modifications manuelles sont écrasées.",
 retenir:"PasswordNeverExpires = risque. LastLogonDate = identifier inactifs. adminCount=1 = protégé. Get-ADFineGrainedPasswordPolicy = PSO.",
 keywords:["Get-ADUser","Get-ADGroupMember","Get-ADComputer","adminCount","PasswordNeverExpires","LastLogonDate","PSO","Get-ADFineGrainedPasswordPolicy","RSAT"]},

{id:2207,cat:"windows",titre:"PowerShell — WMI/CIM & Gestion distante",sub:"Invoke-Command, Enter-PSSession, CIM, WinRM",
 def:"PowerShell Remoting et WMI/CIM permettent d'administrer des machines distantes sans console physique.",
 is_cmd:true,
 cmds:[
   {section:"PowerShell Remoting (WinRM)", items:[
     {cmd:"Enable-PSRemoting -Force", comment:"# Activer WinRM (nécessite admin)"},
     {cmd:"Enter-PSSession -ComputerName SRV01 -Credential (Get-Credential)", comment:"# Session interactive distante"},
     {cmd:"Invoke-Command -ComputerName SRV01,SRV02 -ScriptBlock { Get-Service spooler }", comment:"# Exécuter sur plusieurs serveurs"},
     {cmd:"$s = New-PSSession -ComputerName SRV01; Invoke-Command -Session $s { ... }", comment:"# Session persistante réutilisable"}
   ]},
   {section:"CIM (remplace WMI)", items:[
     {cmd:"Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object Caption,LastBootUpTime", comment:"# OS et dernier boot"},
     {cmd:"Get-CimInstance -ClassName Win32_LogicalDisk | Select-Object DeviceID,Size,FreeSpace", comment:"# Disques et espace"},
     {cmd:"Get-CimInstance -ClassName Win32_Process | Where-Object {$_.Name -eq 'powershell.exe'}", comment:"# Processus PowerShell actifs"},
     {cmd:"Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{CommandLine='calc.exe'}", comment:"# Créer un processus via CIM (LotL !)"}
   ]},
   {section:"Gestion des sessions distantes", items:[
     {cmd:"Get-PSSession", comment:"# Lister les sessions PS ouvertes"},
     {cmd:"Remove-PSSession -ComputerName SRV01", comment:"# Fermer les sessions"},
     {cmd:"Test-WSMan -ComputerName SRV01", comment:"# Tester si WinRM est actif"}
   ]}
 ],
 piege:"Invoke-Command avec -AsJob exécute en arrière-plan. Invoke-CimMethod Create est utilisé par certains malwares pour spawner des processus — à surveiller via 4688.",
 retenir:"Enter-PSSession = shell distant. Invoke-Command = commande distante. Get-CimInstance = infos système. Enable-PSRemoting = activer WinRM.",
 keywords:["Invoke-Command","Enter-PSSession","Get-CimInstance","WMI","CIM","WinRM","PSRemoting","New-PSSession","Enable-PSRemoting","4688"]},

// ────────────────────────────────────────────────────────
// LINUX — FICHES SUPPLÉMENTAIRES
// ────────────────────────────────────────────────────────
{id:1707,cat:"linux",titre:"Linux — Gestion des paquets",sub:"apt, yum/dnf, snap, pip, compilation",
 def:"Gestion des logiciels sous les différentes distributions Linux.",
 is_cmd:true,
 cmds:[
   {section:"Debian/Ubuntu (apt)", items:[
     {cmd:"apt update && apt upgrade -y", comment:"# Mettre à jour la liste et les paquets"},
     {cmd:"apt install nmap -y", comment:"# Installer un paquet"},
     {cmd:"apt remove --purge nginx", comment:"# Supprimer avec les fichiers de config"},
     {cmd:"apt autoremove", comment:"# Supprimer les dépendances inutilisées"},
     {cmd:"apt list --installed | grep nginx", comment:"# Vérifier si un paquet est installé"},
     {cmd:"dpkg -l | grep openssh", comment:"# Lister les paquets installés (dpkg)"}
   ]},
   {section:"RHEL/CentOS/Fedora (dnf/yum)", items:[
     {cmd:"dnf update -y", comment:"# Mettre à jour (Fedora/RHEL 8+)"},
     {cmd:"yum install httpd -y", comment:"# Installer Apache (CentOS 7/RHEL 7)"},
     {cmd:"rpm -qa | grep apache", comment:"# Lister paquets RPM installés"},
     {cmd:"dnf history list", comment:"# Historique des opérations dnf"}
   ]},
   {section:"Compilation depuis les sources", items:[
     {cmd:"./configure --prefix=/usr/local && make && make install", comment:"# Compiler et installer"},
     {cmd:"checkinstall", comment:"# Créer un paquet .deb/.rpm depuis les sources (recommandé)"}
   ]}
 ],
 piege:"apt upgrade sans apt update préalable peut installer des versions obsolètes. Toujours faire les deux. Sur RHEL, yum est remplacé par dnf depuis RHEL 8.",
 retenir:"apt update + upgrade. apt install/remove. dpkg -l = list. dnf = RHEL/Fedora moderne. rpm -qa = paquets RPM.",
 keywords:["apt","apt update","apt upgrade","apt install","dpkg","yum","dnf","rpm","snap","checkinstall","paquet","dépendances"]},

{id:1708,cat:"linux",titre:"Linux — Bash scripting",sub:"Variables, boucles, conditions, fonctions",
 def:"Écrire des scripts Bash pour automatiser les tâches d'administration système sous Linux.",
 is_cmd:true,
 cmds:[
   {section:"Structure de base", items:[
     {cmd:"#!/bin/bash", comment:"# Shebang — interpréteur"},
     {cmd:"set -euo pipefail", comment:"# Mode strict : exit on error, unset var error, pipe fail"},
     {cmd:"VAR='valeur'; echo \"$VAR\"", comment:"# Variable et interpolation"},
     {cmd:"readonly CONFIG='/etc/app.conf'", comment:"# Variable en lecture seule"},
     {cmd:"$0=nom script, $1=1er arg, $#=nb args, $?=code retour dernier cmd", comment:"# Variables spéciales"}
   ]},
   {section:"Conditions et boucles", items:[
     {cmd:"if [ -f '/etc/passwd' ]; then echo 'existe'; fi", comment:"# Test fichier existant"},
     {cmd:"if [[ $USER == 'root' ]]; then echo 'root!'; fi", comment:"# Double bracket = plus robuste"},
     {cmd:"for i in {1..10}; do echo \"Valeur: $i\"; done", comment:"# Boucle for"},
     {cmd:"while read line; do echo \"$line\"; done < fichier.txt", comment:"# Lire fichier ligne par ligne"},
     {cmd:"case $OS in ubuntu) apt update;; centos) yum update;; esac", comment:"# Switch/case"}
   ]},
   {section:"Fonctions et gestion d'erreurs", items:[
     {cmd:"function log() { echo \"[$(date)] $*\" >> /var/log/myscript.log; }", comment:"# Fonction de logging"},
     {cmd:"trap 'echo \"Erreur ligne $LINENO\"; exit 1' ERR", comment:"# Piéger les erreurs"},
     {cmd:"cmd || { echo 'Échec'; exit 1; }", comment:"# Exécuter ou quitter si erreur"}
   ]}
 ],
 piege:"set -e fait quitter le script à la première erreur — pratique mais peut masquer des erreurs dans les pipes. Utiliser 'set -euo pipefail' pour une protection maximale.",
 retenir:"#!/bin/bash + set -euo pipefail = bonne pratique. [[ ]] > [ ]. $? = code retour. trap ERR = gestion erreurs. readonly = protéger.",
 keywords:["bash","shebang","set -e","set -u","pipefail","if","for","while","case","function","trap","$?","readonly","#!/bin/bash"]},

{id:1709,cat:"linux",titre:"Linux — Gestion des utilisateurs & groupes",sub:"useradd, passwd, groupmod, sudo, PAM",
 def:"Administration des comptes utilisateurs, groupes et privilèges sous Linux.",
 is_cmd:true,
 cmds:[
   {section:"Utilisateurs", items:[
     {cmd:"useradd -m -s /bin/bash -G sudo alice", comment:"# Créer alice avec home, bash, groupe sudo"},
     {cmd:"usermod -aG docker alice", comment:"# Ajouter alice au groupe docker (sans retirer les autres)"},
     {cmd:"passwd alice", comment:"# Définir/changer le mot de passe"},
     {cmd:"passwd -l alice", comment:"# Verrouiller le compte (! devant le hash)"},
     {cmd:"userdel -r alice", comment:"# Supprimer alice et son répertoire home"},
     {cmd:"chage -l alice", comment:"# Informations d'expiration du compte"}
   ]},
   {section:"Groupes", items:[
     {cmd:"groupadd securite", comment:"# Créer un groupe"},
     {cmd:"gpasswd -d alice securite", comment:"# Retirer alice du groupe"},
     {cmd:"id alice", comment:"# UID, GID, groupes de alice"},
     {cmd:"groups alice", comment:"# Groupes de alice"},
     {cmd:"cat /etc/group | grep alice", comment:"# Vérifier les groupes dans /etc/group"}
   ]},
   {section:"Sudo & PAM", items:[
     {cmd:"visudo", comment:"# Éditer sudoers de façon sécurisée"},
     {cmd:"alice ALL=(ALL:ALL) NOPASSWD: /usr/bin/apt", comment:"# Autoriser alice à utiliser apt sans MDP"},
     {cmd:"grep 'pam_tally2\\|pam_faillock' /etc/pam.d/*", comment:"# Vérifier verrouillage après échecs"}
   ]}
 ],
 piege:"usermod -G sans -a REMPLACE tous les groupes de l'utilisateur. Toujours utiliser usermod -aG pour AJOUTER un groupe.",
 retenir:"useradd -m -s /bin/bash. usermod -aG (avec -a !). passwd -l = verrouiller. visudo = sudoers. chage = expiration.",
 keywords:["useradd","usermod","userdel","groupadd","passwd","sudo","visudo","chage","PAM","id","groups","/etc/passwd","/etc/shadow"]},

{id:1710,cat:"linux",titre:"Linux — Cron & Tâches planifiées",sub:"crontab, anacron, systemd timers, at",
 def:"Planification de tâches automatiques sous Linux avec cron, anacron, systemd timers et at.",
 is_cmd:true,
 cmds:[
   {section:"Crontab", items:[
     {cmd:"crontab -e", comment:"# Éditer le crontab de l'utilisateur courant"},
     {cmd:"crontab -l", comment:"# Lister les crons de l'utilisateur"},
     {cmd:"crontab -u alice -l", comment:"# Crons de alice (en tant que root)"},
     {cmd:"0 2 * * 1 /usr/bin/backup.sh", comment:"# Chaque lundi à 2h00 (min h dom m dow)"},
     {cmd:"*/5 * * * * /usr/bin/check.sh >> /var/log/check.log 2>&1", comment:"# Toutes les 5 min avec log"},
     {cmd:"cat /etc/cron.d/* /var/spool/cron/crontabs/*", comment:"# Voir TOUS les crons (forensique)"}
   ]},
   {section:"Systemd Timers (moderne)", items:[
     {cmd:"systemctl list-timers --all", comment:"# Tous les timers systemd avec prochaine exécution"},
     {cmd:"systemctl status backup.timer", comment:"# État d'un timer"},
     {cmd:"journalctl -u backup.service", comment:"# Logs d'exécution du service associé"}
   ]},
   {section:"at (exécution unique)", items:[
     {cmd:"echo '/bin/reboot' | at 23:00", comment:"# Redémarrer à 23h"},
     {cmd:"at -l", comment:"# Liste des jobs at en attente"},
     {cmd:"atrm 3", comment:"# Supprimer le job at n°3"}
   ]}
 ],
 piege:"Les crontabs système sont dans /etc/cron.d/, /etc/cron.hourly/etc. — différents du crontab utilisateur. Pour la forensique, vérifier TOUS ces emplacements.",
 retenir:"crontab -e = éditer. '0 2 * * 1' = lundi 2h. systemctl list-timers = timers systemd. /var/spool/cron/ = crons utilisateurs.",
 keywords:["crontab","cron.d","anacron","systemd timer","at","planification","forensique","/var/spool/cron","list-timers","crontab -l"]},

// ────────────────────────────────────────────────────────
// CISCO — COMMANDES SUPPLÉMENTAIRES
// ────────────────────────────────────────────────────────
{id:215,cat:"cisco",titre:"Cisco — Configuration IPv6",sub:"Adresses, OSPFv3, NDP, tunnel",
 def:"Configuration d'IPv6 sur les équipements Cisco IOS.",
 is_cmd:true,
 cmds:[
   {section:"Activation et adressage IPv6", items:[
     {cmd:"ipv6 unicast-routing", comment:"# Activer le routage IPv6 (global)"},
     {cmd:"interface GigabitEthernet0/0", comment:"# Sur l'interface"},
     {cmd:"ipv6 address 2001:db8:1::1/64", comment:"# Adresse IPv6 statique"},
     {cmd:"ipv6 address autoconfig", comment:"# SLAAC (auto-configuration)"},
     {cmd:"ipv6 enable", comment:"# Active IPv6 et génère une adresse lien-local"},
     {cmd:"show ipv6 interface brief", comment:"# Résumé des interfaces IPv6"}
   ]},
   {section:"OSPFv3", items:[
     {cmd:"ipv6 router ospf 1", comment:"# Démarrer OSPFv3"},
     {cmd:"router-id 1.1.1.1", comment:"# Router ID (format IPv4)"},
     {cmd:"interface GigabitEthernet0/0", comment:"# Activer OSPFv3 sur l'interface"},
     {cmd:"ipv6 ospf 1 area 0", comment:"# Annoncer dans l'area 0"},
     {cmd:"show ipv6 ospf neighbor", comment:"# Voisins OSPFv3"}
   ]},
   {section:"Vérification", items:[
     {cmd:"show ipv6 route", comment:"# Table de routage IPv6"},
     {cmd:"show ipv6 neighbors", comment:"# Table NDP (équivalent ARP pour IPv6)"},
     {cmd:"ping ipv6 2001:db8::1", comment:"# Ping IPv6"}
   ]}
 ],
 piege:"Sans 'ipv6 unicast-routing', le routeur accepte mais ne route pas les paquets IPv6. Et sans 'ipv6 enable', les interfaces n'ont même pas d'adresse lien-local.",
 retenir:"ipv6 unicast-routing = activer routage. ipv6 address = adresser. ipv6 ospf 1 area 0 = OSPFv3. show ipv6 neighbors = NDP.",
 keywords:["ipv6 unicast-routing","ipv6 address","OSPFv3","SLAAC","NDP","show ipv6 route","show ipv6 neighbors","lien-local","2001:db8"]},

{id:216,cat:"cisco",titre:"Cisco — QoS Configuration",sub:"class-map, policy-map, DSCP, LLQ",
 def:"Configuration de la Qualité de Service sur Cisco IOS avec MQC (Modular QoS CLI).",
 is_cmd:true,
 cmds:[
   {section:"Classification (class-map)", items:[
     {cmd:"class-map match-all VOIX", comment:"# Créer une classe 'VOIX'"},
     {cmd:"match protocol rtp", comment:"# Identifier le trafic RTP"},
     {cmd:"match dscp ef", comment:"# Ou par marquage DSCP EF (46)"},
     {cmd:"class-map match-any DATA-CRITIQUE", comment:"# 'any' = OU logique"},
     {cmd:"match protocol https", comment:"# Trafic HTTPS"}
   ]},
   {section:"Policy-map (action)", items:[
     {cmd:"policy-map QOS-WAN", comment:"# Créer une politique"},
     {cmd:"class VOIX", comment:"# Agir sur la classe VOIX"},
     {cmd:"priority 512", comment:"# LLQ : 512 kbps garanti strict pour la voix"},
     {cmd:"class DATA-CRITIQUE", comment:"# Agir sur la classe DATA"},
     {cmd:"bandwidth percent 40", comment:"# Garantir 40% de bande passante"},
     {cmd:"class class-default", comment:"# Tout le reste"},
     {cmd:"fair-queue", comment:"# WFQ pour le trafic non classé"}
   ]},
   {section:"Application et vérification", items:[
     {cmd:"interface Serial0/0", comment:"# Appliquer sur l'interface WAN"},
     {cmd:"service-policy output QOS-WAN", comment:"# En sortie vers le WAN"},
     {cmd:"show policy-map interface Serial0/0", comment:"# Stats QoS : counters, drops, queue"}
   ]}
 ],
 piege:"LLQ (priority) garantit la bande passante mais peut affamer les autres classes si trop utilisé. Limiter la voix à 33% max de la bande passante totale.",
 retenir:"class-map = identifier. policy-map = action. priority = LLQ voix. bandwidth = CBWFQ. service-policy output = appliquer.",
 keywords:["class-map","policy-map","QoS","DSCP","EF","LLQ","priority","CBWFQ","bandwidth","service-policy","MQC","shaping"]},

{id:217,cat:"cisco",titre:"Cisco — VPN & Tunnels",sub:"GRE, IPsec IKEv2, site-to-site",
 def:"Configuration des tunnels GRE et VPN IPsec site-to-site sur routeur Cisco.",
 is_cmd:true,
 cmds:[
   {section:"Tunnel GRE (non chiffré)", items:[
     {cmd:"interface Tunnel0", comment:"# Créer l'interface tunnel"},
     {cmd:"ip address 172.16.0.1 255.255.255.0", comment:"# IP du tunnel"},
     {cmd:"tunnel source GigabitEthernet0/0", comment:"# Interface physique source"},
     {cmd:"tunnel destination 203.0.113.2", comment:"# IP publique du routeur distant"},
     {cmd:"tunnel mode gre ip", comment:"# Mode GRE (défaut, peut être omis)"}
   ]},
   {section:"IPsec IKEv2 site-to-site", items:[
     {cmd:"crypto ikev2 proposal PROP1", comment:"# Phase 1 — paramètres IKE"},
     {cmd:"encryption aes-cbc-256", comment:"# Chiffrement AES-256"},
     {cmd:"integrity sha512", comment:"# Intégrité SHA-512"},
     {cmd:"group 20", comment:"# DH group 20 (ECDH 384 bits)"},
     {cmd:"crypto ikev2 policy 10", comment:"# Politique IKEv2"},
     {cmd:"proposal PROP1", comment:"# Référencer la proposition"},
     {cmd:"show crypto ikev2 sa", comment:"# État des SA IKEv2"}
   ]},
   {section:"Vérification", items:[
     {cmd:"show crypto ipsec sa", comment:"# Tunnels IPsec actifs, paquets chiffrés"},
     {cmd:"show interfaces Tunnel0", comment:"# État du tunnel GRE"},
     {cmd:"debug crypto ikev2", comment:"# Déboguer IKE (verbose, couper après)"}
   ]}
 ],
 piege:"GRE est non chiffré — c'est un tunnel d'encapsulation, pas un VPN sécurisé. Pour la sécurité, toujours coupler GRE avec IPsec.",
 retenir:"GRE = encapsulation. IPsec = chiffrement. IKEv2 phase 1 = canal sécurisé, phase 2 = données. show crypto ipsec sa = vérifier.",
 keywords:["GRE","IPsec","IKEv2","tunnel","site-to-site","AES-256","SHA","DH group","crypto map","show crypto ipsec sa"]},

// ────────────────────────────────────────────────────────
// LINUX AVANCÉ — FICHES SUPPLÉMENTAIRES
// ────────────────────────────────────────────────────────
{id:1711,cat:"linux",titre:"Linux — LVM & Gestion du stockage",sub:"pvcreate, vgcreate, lvcreate, resize",
 def:"LVM (Logical Volume Manager) abstrait le stockage physique pour une gestion flexible des partitions.",
 is_cmd:true,
 cmds:[
   {section:"Création LVM", items:[
     {cmd:"pvcreate /dev/sdb /dev/sdc", comment:"# Initialiser les disques physiques"},
     {cmd:"vgcreate vg_data /dev/sdb /dev/sdc", comment:"# Créer un groupe de volumes"},
     {cmd:"lvcreate -L 50G -n lv_base vg_data", comment:"# Créer un volume logique de 50 Go"},
     {cmd:"mkfs.ext4 /dev/vg_data/lv_base", comment:"# Formater en ext4"},
     {cmd:"mount /dev/vg_data/lv_base /data", comment:"# Monter le volume"}
   ]},
   {section:"Extension à chaud", items:[
     {cmd:"lvextend -L +20G /dev/vg_data/lv_base", comment:"# Étendre de 20 Go"},
     {cmd:"resize2fs /dev/vg_data/lv_base", comment:"# Étendre le filesystem ext4 (à chaud !)"},
     {cmd:"lvextend -r -L +20G /dev/vg_data/lv_base", comment:"# Tout en une commande (-r = resize)"}
   ]},
   {section:"Vérification", items:[
     {cmd:"pvs && vgs && lvs", comment:"# Résumé des PV, VG, LV"},
     {cmd:"pvdisplay /dev/sdb", comment:"# Détail du volume physique"},
     {cmd:"vgdisplay vg_data", comment:"# Détail du groupe de volumes"}
   ]}
 ],
 piege:"resize2fs fonctionne à chaud pour étendre ext4, mais XFS utilise xfs_growfs. La réduction d'un LV est risquée et nécessite de démonter le filesystem.",
 retenir:"pvcreate → vgcreate → lvcreate = création LVM. lvextend -r = étendre + resize à chaud. pvs/vgs/lvs = état.",
 keywords:["LVM","pvcreate","vgcreate","lvcreate","lvextend","resize2fs","pvs","vgs","lvs","ext4","XFS","stockage"]},

{id:1712,cat:"linux",titre:"Linux — Réseau avancé & IPTables",sub:"NAT, FORWARD, masquerade, règles stateful",
 def:"Configuration avancée du réseau Linux avec iptables : NAT, routage et pare-feu complet.",
 is_cmd:true,
 cmds:[
   {section:"iptables — Règles de base", items:[
     {cmd:"iptables -L -n -v --line-numbers", comment:"# Lister toutes les règles avec compteurs"},
     {cmd:"iptables -A INPUT -p tcp --dport 22 -m state --state NEW -j ACCEPT", comment:"# Autoriser SSH (stateful)"},
     {cmd:"iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT", comment:"# Autoriser les connexions établies"},
     {cmd:"iptables -P INPUT DROP", comment:"# Politique par défaut = tout bloquer"}
   ]},
   {section:"NAT et routage", items:[
     {cmd:"echo 1 > /proc/sys/net/ipv4/ip_forward", comment:"# Activer le routage IP (temporaire)"},
     {cmd:"sysctl -w net.ipv4.ip_forward=1", comment:"# Activer le routage (persistant via sysctl.conf)"},
     {cmd:"iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE", comment:"# NAT masquerade (partage internet)"},
     {cmd:"iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to 192.168.1.10:8080", comment:"# Redirection de port (DNAT)"}
   ]},
   {section:"Sauvegarde et restauration", items:[
     {cmd:"iptables-save > /etc/iptables/rules.v4", comment:"# Sauvegarder les règles"},
     {cmd:"iptables-restore < /etc/iptables/rules.v4", comment:"# Restaurer les règles"},
     {cmd:"apt install iptables-persistent", comment:"# Rendre les règles persistantes au reboot"}
   ]}
 ],
 piege:"iptables -P INPUT DROP sans règle ESTABLISHED/RELATED = coupure immédiate des connexions actives ! Toujours ajouter ESTABLISHED/RELATED avant de bloquer.",
 retenir:"iptables -L -n -v = lister. -P INPUT DROP = bloquer par défaut. MASQUERADE = NAT. DNAT = redirection port. iptables-save = persister.",
 keywords:["iptables","ACCEPT","DROP","MASQUERADE","DNAT","SNAT","ip_forward","ESTABLISHED","RELATED","INPUT","OUTPUT","FORWARD","nat"]},

// INFORMATIQUE GÉNÉRALE
// ────────────────────────────────────────────────────────
{id:2301,cat:"general",titre:"Représentation des données",sub:"Binaire, hexadécimal, unités de mesure",
 def:"Toute donnée informatique est stockée et transmise sous forme binaire (0/1), regroupée en unités plus lisibles pour les humains.",
 points:["Bit = unité de base (0 ou 1). Octet (byte) = 8 bits = 256 valeurs possibles (0-255)",
   "Hexadécimal (base 16) : 0-9 puis A-F. 1 octet = 2 chiffres hexa (ex: 0xFF = 255)",
   "Préfixes binaires (informatique) : 1 Kio = 1024 octets, 1 Mio = 1024 Kio, 1 Gio = 1024 Mio",
   "Préfixes décimaux (marketing/disques) : 1 Ko = 1000 octets, 1 Go = 1000 Mo — d'où l'écart entre capacité annoncée et réelle",
   "ASCII = 1 octet/caractère (128 caractères). UTF-8 = encodage variable (1 à 4 octets) compatible ASCII, supporte tous les alphabets",
   "Conversion rapide : binaire → décimal = somme des puissances de 2 activées (ex: 1010 = 8+2 = 10)"],
 piege:"1 Go (disque, marketing, base 10) ≠ 1 Gio (mémoire, base 2). Un disque \"1 To\" affiche environ 931 Gio dans l'OS — ce n'est pas un défaut, c'est la différence d'unité.",
 retenir:"Octet = 8 bits. Hexa = base 16 (0-F). Kio/Mio/Gio = base 2 (×1024). Ko/Mo/Go = base 10 (×1000). UTF-8 = encodage moderne.",
 keywords:["bit","octet","byte","hexadécimal","binaire","ASCII","UTF-8","Kio","Mio","Gio","base 2","base 16","encodage"]},

{id:2302,cat:"general",titre:"Architecture d'un ordinateur",sub:"CPU, RAM, bus, stockage, BIOS/UEFI",
 def:"Un ordinateur repose sur l'architecture de Von Neumann : un processeur exécute des instructions stockées en mémoire, en échangeant des données via des bus.",
 points:["CPU (processeur) : ALU (calculs), registres (stockage ultra-rapide), cache L1/L2/L3 (mémoire tampon proche du CPU)",
   "RAM (mémoire vive) : volatile, rapide, contient les programmes en cours d'exécution. Plus de RAM = plus de programmes simultanés",
   "Stockage : HDD (mécanique, lent) vs SSD (mémoire flash, rapide) — NVMe = SSD branché en PCIe (le plus rapide)",
   "Bus : chemins de communication entre composants (bus de données, d'adresses, de contrôle). PCIe = bus d'extension moderne",
   "BIOS/UEFI : firmware démarré à l'allumage, initialise le matériel puis lance le bootloader (GRUB, Windows Boot Manager)",
   "UEFI remplace le BIOS : démarrage plus rapide, support des disques >2 To (GPT), Secure Boot"],
 piege:"Le cache CPU (L1/L2/L3) est plus rapide mais beaucoup plus petit que la RAM. Plus on s'éloigne du CPU (cache → RAM → SSD → HDD), plus c'est lent mais plus c'est grand et moins cher.",
 retenir:"CPU exécute, RAM stocke temporairement (volatile), disque stocke durablement. BIOS/UEFI démarre le matériel. UEFI = moderne, GPT, Secure Boot.",
 keywords:["CPU","RAM","cache","BIOS","UEFI","SSD","HDD","NVMe","bus PCIe","GRUB","bootloader","Von Neumann","GPT"]},

// SISR — SYSTÈMES & RÉSEAUX
// ────────────────────────────────────────────────────────
{id:2401,cat:"sisr",titre:"SISR — Virtualisation & Hyperviseurs",sub:"Type 1/2, VMware, Proxmox, Hyper-V, conteneurs",
 schema:`<svg viewBox="0 0 440 215" xmlns="http://www.w3.org/2000/svg"><text class="sd-label" x="110" y="14">Type 1 — Bare-metal</text><text class="sd-label" x="330" y="14">Type 2 — Hosted</text><rect class="sd-box" x="20" y="20" width="180" height="22" rx="3"/><text class="sd-text-small" x="110" y="31">VM1</text><rect class="sd-box" x="20" y="45" width="85" height="22" rx="3"/><text class="sd-text-small" x="62" y="56">VM2</text><rect class="sd-box" x="115" y="45" width="85" height="22" rx="3"/><text class="sd-text-small" x="157" y="56">VM3</text><rect class="sd-box-accent" x="20" y="70" width="180" height="22" rx="3"/><text class="sd-text-small" x="110" y="81">Hyperviseur (ESXi/Proxmox)</text><rect class="sd-box" x="20" y="95" width="180" height="22" rx="3"/><text class="sd-text-small" x="110" y="106">Matériel physique</text><rect class="sd-box" x="240" y="20" width="180" height="22" rx="3"/><text class="sd-text-small" x="330" y="31">VM1</text><rect class="sd-box" x="240" y="45" width="85" height="22" rx="3"/><text class="sd-text-small" x="282" y="56">VM2</text><rect class="sd-box" x="335" y="45" width="85" height="22" rx="3"/><text class="sd-text-small" x="377" y="56">VM3</text><rect class="sd-box-accent" x="240" y="70" width="180" height="22" rx="3"/><text class="sd-text-small" x="330" y="81">Hyperviseur (VirtualBox)</text><rect class="sd-box" x="240" y="95" width="180" height="22" rx="3"/><text class="sd-text-small" x="330" y="106">OS hôte (Windows/Linux)</text><rect class="sd-box" x="240" y="120" width="180" height="22" rx="3"/><text class="sd-text-small" x="330" y="131">Matériel physique</text><line class="sd-box" x1="220" y1="14" x2="220" y2="145"/><rect class="sd-box" x="20" y="150" width="180" height="50" rx="4"/><text class="sd-text-small" x="110" y="165">✅ Performant, production</text><text class="sd-text-small" x="110" y="179">ESXi, Proxmox VE, Hyper-V Server</text><text class="sd-text-small" x="110" y="193">KVM (Linux)</text><rect class="sd-box" x="240" y="150" width="180" height="50" rx="4"/><text class="sd-text-small" x="330" y="165">⚡ Pratique, labo/tests</text><text class="sd-text-small" x="330" y="179">VirtualBox, VMware Workstation</text><text class="sd-text-small" x="330" y="193">VMware Fusion (macOS)</text></svg>`,
 def:"La virtualisation permet d'exécuter plusieurs systèmes (VM) sur une seule machine physique, en partageant les ressources via un hyperviseur.",
 points:["Hyperviseur Type 1 (bare-metal) : tourne directement sur le matériel — ESXi, Proxmox VE, Hyper-V Server. Performant, utilisé en production",
   "Hyperviseur Type 2 (hosted) : tourne sur un OS existant — VirtualBox, VMware Workstation. Pratique pour tests/labo",
   "VM (machine virtuelle) = OS complet virtualisé avec son propre noyau. Conteneur (Docker/LXC) = partage le noyau de l'hôte, plus léger",
   "Réseau virtuel : commutateur virtuel (vSwitch) relie les VM entre elles et/ou à l'extérieur — modes bridge, NAT, host-only, isolé",
   "Snapshot = image figée d'une VM à un instant T (rollback rapide). Clone = copie indépendante complète",
   "Migration à chaud (vMotion/Live Migration) : déplacer une VM en fonctionnement vers un autre hôte sans interruption"],
 piege:"Un snapshot n'est PAS une sauvegarde : il dépend du disque d'origine et de l'hyperviseur. Garder des snapshots longtemps dégrade les performances et peut saturer le stockage.",
 retenir:"Type 1 = bare-metal (prod). Type 2 = sur OS (labo). VM = noyau propre, conteneur = noyau partagé. Snapshot ≠ sauvegarde. vMotion = migration à chaud.",
 keywords:["hyperviseur","Type 1","Type 2","VMware","ESXi","Proxmox","Hyper-V","VirtualBox","snapshot","vMotion","vSwitch","conteneur","LXC"]},

{id:2402,cat:"sisr",titre:"SISR — Haute disponibilité & Sauvegarde",sub:"RAID, cluster, RPO/RTO, stratégies de sauvegarde",
 def:"La haute disponibilité (HA) vise à minimiser les interruptions de service ; la sauvegarde vise à pouvoir restaurer les données en cas de sinistre.",
 points:["RAID 0 = répartition (perf, 0 tolérance panne). RAID 1 = miroir (tolère 1 panne, perte 50% capacité)",
   "RAID 5 = bande + parité répartie (tolère 1 disque, besoin min. 3 disques). RAID 6 = parité double (tolère 2 disques)",
   "RAID 10 = miroir de bandes (perf + tolérance, besoin min. 4 disques pairs)",
   "RPO (Recovery Point Objective) = perte de données maximale acceptable (ex: 1h de données perdues)",
   "RTO (Recovery Time Objective) = temps maximal acceptable pour restaurer le service après incident",
   "Sauvegarde 3-2-1 : 3 copies des données, sur 2 supports différents, dont 1 hors site (cloud, autre bâtiment)",
   "Sauvegarde complète vs incrémentielle (depuis la dernière sauvegarde) vs différentielle (depuis la dernière complète)"],
 piege:"RAID n'est PAS une sauvegarde ! Le RAID protège contre la panne d'un disque, pas contre la suppression accidentelle, le ransomware ou l'incendie de la salle serveur.",
 retenir:"RAID 1=miroir, RAID 5=parité simple, RAID 6=parité double, RAID 10=miroir+bandes. RPO=perte tolérée, RTO=temps de retour. Règle 3-2-1 pour les sauvegardes.",
 keywords:["RAID 0","RAID 1","RAID 5","RAID 6","RAID 10","RPO","RTO","sauvegarde","3-2-1","haute disponibilité","cluster","incrémentielle"]},

// AUTOMATISATION
// ────────────────────────────────────────────────────────
{id:2501,cat:"auto",titre:"Automatisation — Ansible",sub:"Playbooks, inventaire, idempotence, modules",
 def:"Ansible est un outil d'automatisation IT (configuration, déploiement) sans agent, qui se connecte en SSH et exécute des tâches décrites en YAML.",
 points:["Inventaire (inventory) : liste des machines cibles, organisées en groupes (ex: [web], [db])",
   "Playbook : fichier YAML décrivant une liste de tâches (tasks) à appliquer sur des hôtes",
   "Module : unité d'action réutilisable (apt, copy, service, user, template…) — chaque tâche appelle un module",
   "Idempotence : exécuter un playbook plusieurs fois produit le même résultat final, sans effet de bord (principe clé d'Ansible)",
   "Rôle (role) : structure standardisée pour organiser playbooks, variables, templates et fichiers réutilisables",
   "Facts : informations collectées automatiquement sur l'hôte (OS, IP, RAM…) utilisables comme variables"],
 piege:"Ansible nécessite Python sur les machines cibles (sauf modules 'raw'), et un accès SSH avec privilèges suffisants (souvent via 'become: true' pour sudo).",
 retenir:"Inventaire = liste des hôtes. Playbook = tâches YAML. Module = action (apt, service...). Idempotent = rejouable sans risque. Rôle = organisation réutilisable.",
 keywords:["Ansible","playbook","inventaire","idempotence","module","rôle","YAML","become","facts","SSH","ansible-playbook"]},

// LINUX — MULTI-DISTRIBUTIONS
// ────────────────────────────────────────────────────────
{id:1713,cat:"linux",titre:"Linux — Multi-distributions (Debian, Alpine, Arch, CentOS)",sub:"Gestionnaires de paquets et init systems",
 def:"Chaque famille de distributions Linux a son propre gestionnaire de paquets et parfois son propre système d'init — savoir les reconnaître est essentiel en SISR.",
 is_cmd:true,
 cmds:[
   {section:"Debian / Ubuntu (APT, dpkg)", items:[
     {cmd:"apt update && apt upgrade -y", comment:"# Mettre à jour la liste des paquets puis le système"},
     {cmd:"apt install <paquet> -y", comment:"# Installer un paquet"},
     {cmd:"apt remove --purge <paquet>", comment:"# Désinstaller un paquet + sa config"},
     {cmd:"dpkg -l | grep <paquet>", comment:"# Vérifier si un paquet est installé"}
   ]},
   {section:"Alpine Linux (APK — léger, conteneurs)", items:[
     {cmd:"apk update", comment:"# Mettre à jour l'index des paquets"},
     {cmd:"apk add <paquet>", comment:"# Installer un paquet"},
     {cmd:"apk del <paquet>", comment:"# Désinstaller un paquet"},
     {cmd:"apk info -e <paquet>", comment:"# Vérifier si un paquet est installé"},
     {cmd:"rc-service <service> start", comment:"# Alpine utilise OpenRC, pas systemd"}
   ]},
   {section:"Arch Linux (Pacman — rolling release)", items:[
     {cmd:"pacman -Syu", comment:"# Synchroniser et mettre à jour tout le système"},
     {cmd:"pacman -S <paquet>", comment:"# Installer un paquet"},
     {cmd:"pacman -R <paquet>", comment:"# Désinstaller un paquet"},
     {cmd:"pacman -Qi <paquet>", comment:"# Infos sur un paquet installé"},
     {cmd:"yay -S <paquet>", comment:"# AUR (Arch User Repository) via un helper comme yay"}
   ]},
   {section:"CentOS / RHEL / Fedora (DNF/YUM)", items:[
     {cmd:"dnf update -y", comment:"# Mettre à jour le système (remplace yum sur les versions récentes)"},
     {cmd:"dnf install <paquet> -y", comment:"# Installer un paquet"},
     {cmd:"dnf remove <paquet>", comment:"# Désinstaller un paquet"},
     {cmd:"rpm -qa | grep <paquet>", comment:"# Vérifier si un paquet est installé (format RPM)"},
     {cmd:"systemctl enable --now <service>", comment:"# Activer + démarrer un service (systemd, comme Debian récent)"}
   ]}
 ],
 piege:"Alpine n'utilise PAS systemd mais OpenRC : 'systemctl' n'existera pas, il faut 'rc-service' et 'rc-update add <service> default' pour l'activation au démarrage.",
 retenir:"Debian/Ubuntu = apt/dpkg. Alpine = apk + OpenRC (rc-service). Arch = pacman (rolling). CentOS/RHEL = dnf/rpm + systemd. Toujours identifier la distro avant de taper une commande !",
 keywords:["apt","dpkg","apk","OpenRC","rc-service","pacman","yay","dnf","yum","rpm","Alpine","Arch","CentOS","Debian","rolling release"]},

// ────────────────────────────────────────────────────────
// Wi-Fi
// ────────────────────────────────────────────────────────
{id:2601,cat:"wifi",titre:"Wi-Fi — Standards 802.11 et fréquences",sub:"802.11a/b/g/n/ac/ax, 2.4 GHz, 5 GHz, 6 GHz",
 def:"Le Wi-Fi désigne un ensemble de standards IEEE 802.11 permettant la communication sans fil locale. Chaque génération améliore le débit, la portée ou l'efficacité spectrale.",
 extra_table:[
   ["802.11b","Wi-Fi 1","2.4 GHz","11 Mbps","2000 — legacy, à éviter"],
   ["802.11g","Wi-Fi 3","2.4 GHz","54 Mbps","2003 — encore fréquent"],
   ["802.11n","Wi-Fi 4","2.4 / 5 GHz","600 Mbps","2009 — MIMO, canal 40 MHz"],
   ["802.11ac","Wi-Fi 5","5 GHz","3.5 Gbps","2013 — MU-MIMO, canal 80/160 MHz"],
   ["802.11ax","Wi-Fi 6/6E","2.4 / 5 / 6 GHz","9.6 Gbps","2019 — OFDMA, TWT, meilleure densité"],
   ["802.11be","Wi-Fi 7","2.4 / 5 / 6 GHz","46 Gbps","2024 — MLO, 320 MHz"]
 ],
 extra_table_headers:["Standard","Génération","Bande","Débit max","Remarque"],
 points:["2.4 GHz : portée longue, mais seulement 3 canaux non chevauchants (1, 6, 11). Très encombré en milieu urbain",
   "5 GHz : portée plus courte, 23+ canaux non chevauchants, moins de perturbations — recommandé pour les usages HD",
   "6 GHz (Wi-Fi 6E) : bande vierge, faible portée, idéal pour les environnements très denses",
   "MIMO = Multiple Input Multiple Output : plusieurs antennes pour augmenter le débit",
   "MU-MIMO (Wi-Fi 5/6) : communications simultanées avec plusieurs clients",
   "OFDMA (Wi-Fi 6) : divise le canal en sous-canaux pour servir plusieurs clients en même temps — meilleur en environnement dense"],
 piege:"2.4 GHz et 5 GHz ne sont pas interchangeables. Les appareils IoT anciens (ampoules, prises) n'acceptent souvent que la bande 2.4 GHz — ils ne se connectent pas sur un réseau 5 GHz pur.",
 retenir:"Wi-Fi 4=n, Wi-Fi 5=ac, Wi-Fi 6=ax. 2.4 GHz=portée, 5 GHz=débit. Canaux non chevauchants 2.4 GHz = 1,6,11. OFDMA = efficacité en densité.",
 keywords:["802.11ac","802.11ax","Wi-Fi 6","MIMO","MU-MIMO","OFDMA","2.4 GHz","5 GHz","6 GHz","canal","débit","TWT"]},

{id:2602,cat:"wifi",titre:"Wi-Fi — Sécurité WPA2 / WPA3",sub:"CCMP, SAE, PMKID, Enterprise vs Personal",
 def:"La sécurité Wi-Fi évolue avec les standards WPA (Wi-Fi Protected Access). WPA2 reste dominant, WPA3 devient le nouveau standard recommandé.",
 extra_table:[
   ["WEP","RC4","Non","Cassable en < 1 min — INTERDIT"],
   ["WPA","TKIP","Partiel","Obsolète, vulnérable"],
   ["WPA2-Personal","AES-CCMP","Oui","Standard actuel — vulnérable au PMKID attack"],
   ["WPA2-Enterprise","AES-CCMP + RADIUS","Oui","802.1X — recommandé entreprise"],
   ["WPA3-Personal","SAE (Dragonfly)","Oui","Résistant au brute-force offline"],
   ["WPA3-Enterprise","AES-256 + RADIUS","Oui","192-bit mode, le plus sécurisé"]
 ],
 extra_table_headers:["Standard","Chiffrement","Sécurisé","Usage"],
 points:["WPA2-Personal : clé PSK partagée — si compromise, tout le réseau est compromis",
   "WPA3-Personal : SAE (Simultaneous Authentication of Equals) remplace le handshake PSK — résistant au brute-force offline et au PMKID attack",
   "WPA2/3-Enterprise : chaque utilisateur s'authentifie avec ses propres credentials via un serveur RADIUS (802.1X)",
   "PMKID Attack (WPA2) : capture d'un seul paquet suffit pour tenter un brute-force offline de la PSK",
   "Management Frame Protection (MFP/PMF) : obligatoire en WPA3, protège contre les deauth attacks",
   "Segmentation : réseau invités isolé du réseau interne (VLAN dédié, pas de bridge direct)"],
 piege:"WPA2-Personal avec une PSK forte reste acceptable en petite structure, mais en entreprise, utiliser ABSOLUTE MENT WPA2/3-Enterprise. Une PSK connue de tous les employés = zéro confidentialité entre eux.",
 retenir:"WEP=mort. WPA2-Personal=PSK partagée. WPA3=SAE, résistant brute-force. Enterprise=RADIUS+802.1X. PMF=obligatoire WPA3.",
 keywords:["WPA2","WPA3","SAE","CCMP","TKIP","WEP","PSK","RADIUS","802.1X","PMKID","PMF","brute-force","Enterprise"]},

{id:2603,cat:"wifi",titre:"Wi-Fi — Déploiement et optimisation",sub:"AP, contrôleur, roaming, canal, puissance",
 def:"Le déploiement Wi-Fi en entreprise nécessite une planification rigoureuse pour garantir la couverture, les performances et la sécurité.",
 points:["Site survey : cartographie radio préalable pour positionner les AP, éviter les zones mortes et les interférences co-canal",
   "Cellule radio : zone de couverture d'un AP. Le chevauchement entre AP doit être de 15-20% pour permettre le roaming sans coupure",
   "Roaming (itinérance) : le client bascule vers l'AP le plus proche. 802.11r (Fast BSS Transition) accélère le roaming pour la VoIP",
   "Contrôleur Wi-Fi (WLC) : centralise la configuration et la sécurité de tous les AP — Cisco WLC, Aruba, Unifi",
   "SSID caché : fausse sécurité — le SSID est visible dans les probe requests des clients. Ne pas confondre avec une vraie sécurité",
   "Isolation client : empêche les clients Wi-Fi de communiquer entre eux (utile sur réseau invité)"],
 piege:"Augmenter la puissance d'émission d'un AP ne résout pas toujours les problèmes de couverture : si le client ne peut pas répondre avec la même puissance (asymétrie), la connexion reste dégradée.",
 retenir:"Site survey avant déploiement. Chevauchement 15-20%. Canaux non chevauchants. WLC = gestion centralisée. Cacher le SSID = fausse sécurité.",
 keywords:["site survey","AP","WLC","roaming","802.11r","SSID","canal","puissance","interférence","client isolation","Unifi","Aruba"]},

// ────────────────────────────────────────────────────────
// PROXMOX
// ────────────────────────────────────────────────────────
{id:2701,cat:"proxmox",titre:"Proxmox VE — Architecture et interface",sub:"Nœuds, cluster, datacenter, stockage",
 def:"Proxmox Virtual Environment est un hyperviseur Type 1 open-source basé sur Debian, combinant KVM (machines virtuelles) et LXC (conteneurs Linux) avec une interface web complète.",
 points:["Architecture : nœud (serveur physique) → cluster (ensemble de nœuds) → datacenter (vue globale)",
   "KVM : virtualisation complète, supporte Windows, Linux, FreeBSD — chaque VM a son propre noyau",
   "LXC (Linux Containers) : partage le noyau Proxmox, beaucoup plus léger — uniquement Linux",
   "Stockage : local (LVM, ZFS, ext4), partagé (NFS, Ceph, iSCSI) nécessaire pour la migration à chaud",
   "Interface web : https://IP:8006 — accessible sans client lourd. Gestion complète (VM, réseau, stockage, cluster)",
   "HA (High Availability) : nécessite un cluster 3 nœuds minimum + stockage partagé — redémarre les VM automatiquement"],
 piege:"La migration à chaud (live migration) entre nœuds nécessite un stockage PARTAGÉ (Ceph, NFS, iSCSI). Avec du stockage local uniquement, seule la migration à froid (VM éteinte) est possible.",
 retenir:"Proxmox = KVM + LXC + interface web. Port 8006. Migration à chaud = stockage partagé obligatoire. HA = 3 nœuds minimum.",
 keywords:["Proxmox","KVM","LXC","nœud","cluster","datacenter","Ceph","ZFS","NFS","live migration","HA","8006"]},

{id:2702,cat:"proxmox",titre:"Proxmox VE — Commandes qm et pct",sub:"Gestion VMs (qm) et conteneurs (pct) en CLI",
 def:"Les outils CLI qm (QEMU/KVM machines) et pct (Proxmox Container Toolkit) permettent d'administrer VMs et conteneurs Proxmox depuis le terminal.",
 is_cmd:true,
 cmds:[
   {section:"qm — Gestion des VMs", items:[
     {cmd:"qm list", comment:"# Lister toutes les VMs avec leur état"},
     {cmd:"qm start 100", comment:"# Démarrer la VM 100"},
     {cmd:"qm stop 100", comment:"# Arrêter proprement la VM 100"},
     {cmd:"qm shutdown 100", comment:"# Arrêt ACPI (gracieux, recommandé)"},
     {cmd:"qm reset 100", comment:"# Redémarrage forcé (équivalent bouton reset)"},
     {cmd:"qm status 100", comment:"# État de la VM 100"},
     {cmd:"qm config 100", comment:"# Voir la configuration complète d'une VM"},
     {cmd:"qm set 100 --memory 4096", comment:"# Modifier la RAM (en MB)"},
     {cmd:"qm set 100 --cores 4", comment:"# Modifier le nombre de cœurs"},
     {cmd:"qm migrate 100 pve2 --live", comment:"# Migration à chaud vers le nœud pve2"},
     {cmd:"qm snapshot 100 snap-avant-maj", comment:"# Créer un snapshot"},
     {cmd:"qm rollback 100 snap-avant-maj", comment:"# Restaurer un snapshot"},
     {cmd:"qm terminal 100", comment:"# Ouvrir un terminal série dans la VM"}
   ]},
   {section:"pct — Gestion des conteneurs LXC", items:[
     {cmd:"pct list", comment:"# Lister tous les conteneurs"},
     {cmd:"pct start 200", comment:"# Démarrer le conteneur 200"},
     {cmd:"pct stop 200", comment:"# Stopper le conteneur 200"},
     {cmd:"pct enter 200", comment:"# Entrer dans le conteneur (shell interactif)"},
     {cmd:"pct exec 200 -- bash -c 'apt update'", comment:"# Exécuter une commande dans le conteneur"},
     {cmd:"pct config 200", comment:"# Voir la configuration du conteneur"},
     {cmd:"pct set 200 --memory 2048", comment:"# Modifier la RAM du conteneur"},
     {cmd:"pct snapshot 200 snap1", comment:"# Snapshot d'un conteneur"},
     {cmd:"pct restore 200 /path/backup.tar.gz", comment:"# Restaurer depuis une archive"}
   ]},
   {section:"Commandes Proxmox générales", items:[
     {cmd:"pvecm status", comment:"# État du cluster Proxmox"},
     {cmd:"pvecm nodes", comment:"# Lister les nœuds du cluster"},
     {cmd:"pvesm status", comment:"# État des stockages"},
     {cmd:"vzdump 100 --storage local --compress zstd", comment:"# Sauvegarder une VM/CT"},
     {cmd:"pveversion", comment:"# Version de Proxmox VE"}
   ]}
 ],
 piege:"pct enter nécessite que le conteneur soit démarré. Sur les VMs KVM, utiliser 'qm terminal' ou une console VNC via l'interface web — SSH direct dans la VM reste la meilleure option.",
 retenir:"qm = VMs KVM. pct = conteneurs LXC. qm start/stop/snapshot/migrate. pct start/stop/enter/exec. vzdump = sauvegarde. pvecm = cluster.",
 keywords:["qm","pct","vzdump","pvecm","pvesm","qm list","qm migrate","pct enter","snapshot","rollback","Proxmox CLI"]},

{id:2703,cat:"proxmox",titre:"Proxmox VE — Réseau et stockage",sub:"Bridges, bonds, ZFS, Ceph, LVM-Thin",
 def:"La configuration réseau et stockage est au cœur de Proxmox VE pour connecter les VMs et assurer la persistance des données.",
 points:["vmbr0 : bridge réseau virtuel par défaut — les VMs se connectent à vmbr0 pour accéder au réseau physique",
   "Bridge (vmbr) : équivalent d'un switch virtuel connectant VMs et interface physique (eth0/enp3s0)",
   "Bond (agrégation) : regrouper plusieurs interfaces physiques (LACP 802.3ad) pour la redondance et le débit",
   "VLAN sur Proxmox : ajouter un tag VLAN sur l'interface VM (ex: vmbr0.10) — le switch doit être en mode trunk",
   "ZFS : système de fichiers avancé (checksums, snapshots instantanés, compression, RAID logiciel). Recommandé pour la prod",
   "LVM-Thin : permet les thin provisioning et snapshots rapides pour les VMs — par défaut sur un disque local",
   "Ceph : stockage distribué natif dans Proxmox — réplication des données entre nœuds pour la HA"],
 piege:"Ne jamais mettre le journal ZFS (ZIL) et le cache lecture (L2ARC) sur le même SSD que le stockage principal — utiliser un SSD dédié pour le ZIL en production pour éviter la corruption.",
 retenir:"vmbr0 = bridge VMs. Bond = agrégation interfaces. ZFS = robuste, snapshots. LVM-Thin = thin provisioning. Ceph = stockage distribué HA.",
 keywords:["vmbr","bridge","bond","VLAN","ZFS","LVM-Thin","Ceph","thin provisioning","snapshot","Proxmox réseau","LACP"]},

// ────────────────────────────────────────────────────────
// vSwitch / Réseau virtuel
// ────────────────────────────────────────────────────────
{id:2801,cat:"virt",titre:"vSwitch — Commutation virtuelle",sub:"VMware vSwitch, Distributed vSwitch, Proxmox bridge, Hyper-V",
 schema:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box" x="5" y="8" width="430" height="180" rx="8"/><text class="sd-label" x="220" y="22">Hôte ESXi / Proxmox</text><rect class="sd-box-accent" x="15" y="30" width="120" height="28" rx="4"/><text class="sd-text-small" x="75" y="44">VM1 (vNIC)</text><rect class="sd-box-accent" x="145" y="30" width="120" height="28" rx="4"/><text class="sd-text-small" x="205" y="44">VM2 (vNIC)</text><rect class="sd-box-accent" x="275" y="30" width="120" height="28" rx="4"/><text class="sd-text-small" x="335" y="44">VM3 (vNIC)</text><line class="sd-box" x1="75" y1="58" x2="75" y2="82"/><line class="sd-box" x1="205" y1="58" x2="205" y2="82"/><line class="sd-box" x1="335" y1="58" x2="335" y2="82"/><rect class="sd-box-accent" x="15" y="82" width="380" height="32" rx="4"/><text class="sd-text" x="205" y="96">vSwitch (commutateur virtuel)</text><text class="sd-text-small" x="205" y="108">Port groups : VLAN10 | VLAN20 | Management</text><line class="sd-box" x1="150" y1="114" x2="150" y2="138"/><line class="sd-box" x1="265" y1="114" x2="265" y2="138"/><rect class="sd-box" x="80" y="138" width="130" height="28" rx="4"/><text class="sd-text-small" x="145" y="148">vmnic0 (NIC physique)</text><text class="sd-text-small" x="145" y="160">Uplink vers switch réseau</text><rect class="sd-box" x="230" y="138" width="130" height="28" rx="4"/><text class="sd-text-small" x="295" y="148">vmnic1 (NIC physique)</text><text class="sd-text-small" x="295" y="160">Uplink redondant (teaming)</text></svg>`,
 def:"Un vSwitch (commutateur virtuel) est un switch logiciel qui connecte les VMs entre elles et au réseau physique, directement dans l'hyperviseur.",
 extra_table:[
   ["VMware Standard Switch (vSS)","Par hôte ESXi","Gratuit","Simple, limité à un hôte"],
   ["VMware Distributed Switch (vDS)","Centralisé vCenter","vSphere Enterprise+","Gestion centralisée, port mirroring, LACP"],
   ["Proxmox Linux Bridge (vmbr)","Par nœud","Open-source","Bridge Linux natif, simple et efficace"],
   ["Open vSwitch (OVS)","Multi-plateforme","Open-source","SDN, VXLAN, QoS avancé, OpenStack"],
   ["Hyper-V Virtual Switch","Par hôte Hyper-V","Inclus Windows Server","Externe/Interne/Privé"]
 ],
 extra_table_headers:["Type","Portée","Licence","Particularités"],
 points:["Port group : groupe de ports virtuels sur un vSwitch, avec VLAN ID et politiques réseau (sécurité, trafic, teaming)",
   "Uplink : connexion entre le vSwitch et une carte réseau physique (NIC) de l'hôte — la sortie vers le réseau physique",
   "Promiscuous mode : permet à une VM de voir tout le trafic du vSwitch (utile pour les IDS/IPS virtuels, dangereux sinon)",
   "MAC address changes / Forged transmits : politiques de sécurité VMware — désactiver pour éviter les attaques MAC spoofing",
   "VXLAN : encapsulation L2 dans UDP pour étendre les VLANs entre datacenters (utilisé par NSX, OpenStack)",
   "SR-IOV : Virtual Function direct — bypass le vSwitch, la VM accède directement au NIC physique (ultra-faible latence)"],
 piege:"Le mode Promiscuous activé sur un port group VMware permet à toutes les VMs du groupe de voir le trafic des autres — ne jamais activer en production sans raison valide (sniffer, IDS).",
 retenir:"vSwitch = switch logiciel dans l'hyperviseur. Uplink = NIC physique. Port group = politiques. Promiscuous = tout voir (danger). OVS = SDN avancé.",
 keywords:["vSwitch","vSS","vDS","Open vSwitch","OVS","port group","uplink","promiscuous","VXLAN","SR-IOV","vmbr","Hyper-V switch"]},

// ────────────────────────────────────────────────────────
// SAUVEGARDE WINDOWS
// ────────────────────────────────────────────────────────
{id:2901,cat:"windows",titre:"Sauvegarde Windows — WSB, Veeam, Robocopy",sub:"Windows Server Backup, Veeam, stratégies",
 def:"La sauvegarde Windows s'appuie sur des outils natifs (WSB, Robocopy) ou tiers (Veeam) pour protéger les données et systèmes.",
 is_cmd:true,
 cmds:[
   {section:"Windows Server Backup (wbadmin)", items:[
     {cmd:"wbadmin start backup -backupTarget:D: -include:C: -allCritical -quiet", comment:"# Sauvegarde complète système vers D:"},
     {cmd:"wbadmin get versions", comment:"# Lister les versions de sauvegarde disponibles"},
     {cmd:"wbadmin start recovery -version:MM/DD/YYYY-HH:MM -itemType:Volume -items:C: -recoveryTarget:D:", comment:"# Restaurer un volume"},
     {cmd:"wbadmin get status", comment:"# Voir l'état de la sauvegarde en cours"},
     {cmd:"wbadmin delete systemstatebackup -keepVersions:3", comment:"# Garder uniquement les 3 dernières versions"}
   ]},
   {section:"Robocopy (synchronisation)", items:[
     {cmd:"robocopy C:\\Data D:\\Backup /MIR /LOG:C:\\robocopy.log", comment:"# Miroir complet avec log (/MIR = supprime les fichiers supprimés à la source)"},
     {cmd:"robocopy C:\\Data D:\\Backup /E /COPYALL /R:3 /W:5", comment:"# Copie récursive, tous attributs, 3 tentatives"},
     {cmd:"robocopy C:\\Data D:\\Backup /E /XO", comment:"# Ne copie que les fichiers plus récents (incrémental)"},
     {cmd:"robocopy C:\\Src D:\\Dst /DCOPY:ALL /COPY:DATSOU /MIR /LOG+:robocopy.log", comment:"# Préserver les ACL et timestamps"}
   ]},
   {section:"VSS (Volume Shadow Copy Service)", items:[
     {cmd:"vssadmin list shadows", comment:"# Lister les clichés instantanés (shadow copies)"},
     {cmd:"vssadmin create shadow /for=C:", comment:"# Créer un cliché instantané de C:"},
     {cmd:"vssadmin delete shadows /for=C: /oldest", comment:"# Supprimer le plus ancien shadow copy"},
     {cmd:"diskshadow", comment:"# Outil avancé VSS (scripts de sauvegarde complexes)"}
   ]},
   {section:"PowerShell — Sauvegarde", items:[
     {cmd:"Get-WBPolicy", comment:"# Voir la politique Windows Server Backup"},
     {cmd:"Start-WBBackup -Policy (Get-WBPolicy)", comment:"# Lancer une sauvegarde selon la politique"},
     {cmd:"Get-WBJob -Previous 5", comment:"# Voir les 5 dernières sauvegardes"}
   ]}
 ],
 piege:"Robocopy /MIR synchronise en miroir — il SUPPRIME les fichiers à la destination qui n'existent plus à la source. Ne jamais l'utiliser avec une destination de sauvegarde long terme sans en être conscient.",
 retenir:"wbadmin = WSB natif. Robocopy /MIR = miroir, /XO = incrémental. VSS = clichés instantanés. Veeam = solution tiers pro. Toujours tester la restauration !",
 keywords:["wbadmin","Robocopy","VSS","shadow copy","Veeam","sauvegarde Windows","restauration","/MIR","incrémental","WSB"]},

// ────────────────────────────────────────────────────────
// RADIUS / 802.1X Wi-Fi Enterprise
// ────────────────────────────────────────────────────────
{id:3001,cat:"wifi",titre:"Wi-Fi Enterprise — RADIUS et 802.1X",sub:"EAP-TLS, PEAP, FreeRADIUS, authentification",
 schema:`<svg viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg"><defs><marker id="rx-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker><marker id="rx-ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead-green"/></marker></defs><rect class="sd-box" x="10" y="10" width="90" height="38" rx="4"/><text class="sd-text" x="55" y="26">Supplicant</text><text class="sd-text-small" x="55" y="38">(PC / téléphone)</text><rect class="sd-box-accent" x="175" y="10" width="90" height="38" rx="4"/><text class="sd-text" x="220" y="26">Authenticator</text><text class="sd-text-small" x="220" y="38">(AP / Switch)</text><rect class="sd-box" x="340" y="10" width="90" height="38" rx="4"/><text class="sd-text" x="385" y="26">Auth Server</text><text class="sd-text-small" x="385" y="38">(RADIUS)</text><line class="sd-box sd-dash" x1="55" y1="48" x2="55" y2="210"/><line class="sd-box sd-dash" x1="220" y1="48" x2="220" y2="210"/><line class="sd-box sd-dash" x1="385" y1="48" x2="385" y2="210"/><line class="sd-arrow" x1="55" y1="75" x2="220" y2="75" marker-end="url(#rx-ab)"/><text class="sd-text-small" x="137" y="68">① EAPOL-Start</text><line class="sd-arrow-rev" x1="220" y1="100" x2="55" y2="100" marker-end="url(#rx-ag)"/><text class="sd-text-small" x="137" y="93">② EAP-Request/Identity</text><line class="sd-arrow" x1="55" y1="125" x2="220" y2="125" marker-end="url(#rx-ab)"/><text class="sd-text-small" x="137" y="118">③ EAP-Response (identité)</text><line class="sd-arrow" x1="220" y1="150" x2="385" y2="150" marker-end="url(#rx-ab)"/><text class="sd-text-small" x="302" y="143">④ RADIUS Access-Request</text><line class="sd-arrow-rev" x1="385" y1="175" x2="220" y2="175" marker-end="url(#rx-ag)"/><text class="sd-text-small" x="302" y="168">⑤ RADIUS Access-Accept</text><text class="sd-text-small" x="302" y="180">+ VLAN attribué</text><line class="sd-arrow-rev" x1="220" y1="205" x2="55" y2="205" marker-end="url(#rx-ag)"/><text class="sd-text-small" x="137" y="198">⑥ EAP-Success → accès réseau</text></svg>`,
 def:"Le Wi-Fi Enterprise utilise le protocole 802.1X pour authentifier chaque utilisateur individuellement via un serveur RADIUS, éliminant la PSK partagée.",
 points:["Architecture : Supplicant (client) → Authenticator (AP/switch) → Authentication Server (RADIUS)",
   "EAP (Extensible Authentication Protocol) : protocole d'authentification dans 802.1X — plusieurs méthodes EAP existent",
   "PEAP (Protected EAP) : le plus courant en entreprise — tunnel TLS puis authentification MSCHAPv2 (AD credentials)",
   "EAP-TLS : le plus sécurisé — certificat client obligatoire des deux côtés. Pas de mot de passe",
   "FreeRADIUS : serveur RADIUS open-source — supporte PEAP, EAP-TLS, intégration LDAP/AD",
   "Dynamic VLAN assignment : le serveur RADIUS renvoie l'attribut Tunnel-Private-Group-ID pour assigner dynamiquement un VLAN selon l'utilisateur ou le groupe"],
 piege:"PEAP avec MSCHAPv2 est vulnérable si le certificat serveur n'est pas validé côté client (attaque de type evil twin AP). Toujours configurer la validation du certificat serveur dans les profils clients.",
 retenir:"802.1X = auth par utilisateur. RADIUS = serveur auth. PEAP = tunnel TLS + MSCHAPv2. EAP-TLS = cert client. Dynamic VLAN = assignation VLAN par RADIUS.",
 keywords:["802.1X","RADIUS","EAP","PEAP","EAP-TLS","FreeRADIUS","MSCHAPv2","supplicant","authenticator","dynamic VLAN","Enterprise Wi-Fi"]},

// ────────────────────────────────────────────────────────
// pfSense / OPNsense
// ────────────────────────────────────────────────────────
{id:3101,cat:"secu",titre:"pfSense / OPNsense — Pare-feu open-source",sub:"Interfaces, règles, NAT, VPN, packages",
 def:"pfSense et OPNsense sont des distributions FreeBSD spécialisées en pare-feu/routeur open-source, utilisées en PME et en lab. OPNsense est le fork actif maintenu recommandé.",
 points:["Architecture : WAN (internet) → pfSense/OPNsense → LAN (réseau interne) ± DMZ (serveurs exposés)",
   "Interfaces : WAN, LAN, OPT1/OPT2... — chaque interface peut avoir ses propres règles de filtrage",
   "Règles de filtrage : appliquées de haut en bas, première règle qui correspond = appliquée. Défaut = DENY ALL",
   "NAT : outbound NAT automatique (LAN → WAN) + port forwarding (redirection de ports entrants)",
   "VPN intégré : OpenVPN, IPsec, WireGuard — gestion graphique complète via l'interface web",
   "Packages utiles : pfBlockerNG (blocage IP/DNS, listes de blocage), Suricata/Snort (IDS/IPS), HAProxy (load balancer), ntopng (supervision trafic)"],
 piege:"Les règles pfSense s'appliquent sur l'interface d'ENTRÉE du paquet — une règle sur l'interface LAN contrôle ce qui entre depuis le LAN vers le pare-feu (trafic sortant du LAN). Beaucoup de débutants confondent le sens.",
 retenir:"pfSense/OPNsense = FreeBSD + pare-feu graphique. Règles = interface d'entrée, top-down. pfBlockerNG = blocage pub/malware. Suricata = IDS/IPS. Règle par défaut = tout bloquer.",
 keywords:["pfSense","OPNsense","FreeBSD","WAN","LAN","DMZ","NAT","pfBlockerNG","Suricata","Snort","HAProxy","VPN","règles pare-feu"]},

// ────────────────────────────────────────────────────────
// NGINX / Apache
// ────────────────────────────────────────────────────────
{id:3201,cat:"admin",titre:"Nginx — Serveur web et reverse proxy",sub:"server blocks, proxy_pass, SSL, headers sécurité",
 def:"Nginx est un serveur web/proxy haute performance, largement utilisé comme reverse proxy devant des applications (Node.js, PHP, Django) ou comme serveur de fichiers statiques.",
 is_cmd:true,
 cmds:[
   {section:"Configuration — server block de base", items:[
     {cmd:"server {\n    listen 80;\n    server_name monsite.fr www.monsite.fr;\n    return 301 https://$host$request_uri;\n}", comment:"# Redirection HTTP → HTTPS"},
     {cmd:"server {\n    listen 443 ssl;\n    server_name monsite.fr;\n    ssl_certificate /etc/letsencrypt/live/monsite.fr/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/monsite.fr/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n    ssl_ciphers HIGH:!aNULL:!MD5;\n}", comment:"# HTTPS avec TLS 1.2/1.3"}
   ]},
   {section:"Reverse proxy", items:[
     {cmd:"location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n}", comment:"# Proxy vers app Node.js sur port 3000"},
     {cmd:"upstream backend {\n    server 10.0.0.1:8080 weight=3;\n    server 10.0.0.2:8080 weight=1;\n}", comment:"# Load balancing entre 2 serveurs"}
   ]},
   {section:"Headers de sécurité", items:[
     {cmd:"add_header Strict-Transport-Security 'max-age=31536000; includeSubDomains' always;", comment:"# HSTS — forcer HTTPS"},
     {cmd:"add_header X-Frame-Options DENY;", comment:"# Bloquer le clickjacking"},
     {cmd:"add_header X-Content-Type-Options nosniff;", comment:"# Bloquer le MIME sniffing"},
     {cmd:"add_header Content-Security-Policy \"default-src 'self'\";", comment:"# CSP — restreindre les sources"}
   ]},
   {section:"Commandes CLI", items:[
     {cmd:"nginx -t", comment:"# Tester la syntaxe de la configuration"},
     {cmd:"nginx -s reload", comment:"# Recharger la config sans coupure"},
     {cmd:"systemctl status nginx", comment:"# État du service"},
     {cmd:"tail -f /var/log/nginx/access.log /var/log/nginx/error.log", comment:"# Surveiller les logs en temps réel"}
   ]}
 ],
 piege:"Ne jamais recharger Nginx sans 'nginx -t' préalable — une erreur de syntaxe avec 'nginx -s reload' peut laisser l'ancien processus tourner sans que les changements soient appliqués, ou crasher le serveur.",
 retenir:"nginx -t = tester. nginx -s reload = recharger. proxy_pass = reverse proxy. HSTS + X-Frame-Options + CSP = headers sécurité essentiels. TLS 1.2/1.3 uniquement.",
 keywords:["nginx","server block","proxy_pass","reverse proxy","upstream","HSTS","CSP","X-Frame-Options","ssl_certificate","nginx -t","reload","Let's Encrypt"]},

{id:3202,cat:"admin",titre:"Apache — Serveur web et .htaccess",sub:"VirtualHost, mod_rewrite, mod_security, headers",
 def:"Apache HTTP Server est le serveur web le plus historique, toujours très répandu, avec un système de modules extensibles et les fichiers .htaccess pour la configuration par répertoire.",
 is_cmd:true,
 cmds:[
   {section:"VirtualHost HTTPS", items:[
     {cmd:"<VirtualHost *:443>\n    ServerName monsite.fr\n    DocumentRoot /var/www/monsite\n    SSLEngine on\n    SSLCertificateFile /etc/ssl/certs/monsite.crt\n    SSLCertificateKeyFile /etc/ssl/private/monsite.key\n    SSLProtocol TLSv1.2 TLSv1.3\n</VirtualHost>", comment:"# HTTPS avec TLS"},
     {cmd:"<VirtualHost *:80>\n    ServerName monsite.fr\n    Redirect permanent / https://monsite.fr/\n</VirtualHost>", comment:"# Redirection HTTP vers HTTPS"}
   ]},
   {section:".htaccess — Réécriture et sécurité", items:[
     {cmd:"RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]", comment:"# Forcer HTTPS via .htaccess"},
     {cmd:"Options -Indexes", comment:"# Désactiver le listing de répertoire"},
     {cmd:"<Files '.htaccess'>\n    Require all denied\n</Files>", comment:"# Protéger le .htaccess lui-même"},
     {cmd:"Header always set X-Frame-Options DENY\nHeader always set X-Content-Type-Options nosniff", comment:"# Headers sécurité"}
   ]},
   {section:"Commandes CLI", items:[
     {cmd:"apachectl configtest", comment:"# Tester la syntaxe de la configuration"},
     {cmd:"apachectl graceful", comment:"# Recharger sans coupure"},
     {cmd:"a2ensite monsite.conf && a2dissite 000-default.conf", comment:"# Activer/désactiver un VirtualHost (Debian)"},
     {cmd:"a2enmod rewrite ssl headers", comment:"# Activer des modules Apache"},
     {cmd:"apache2ctl -M | grep rewrite", comment:"# Vérifier si mod_rewrite est actif"}
   ]}
 ],
 piege:"Le fichier .htaccess est lu à chaque requête — sur un site à fort trafic, préférer la configuration directe dans le VirtualHost (AllowOverride None) pour les performances. .htaccess = pratique mais lent.",
 retenir:"apachectl configtest = tester. a2ensite/a2enmod = activer. Options -Indexes = désactiver listing. .htaccess = pratique mais lent. AllowOverride None = ignorer .htaccess.",
 keywords:["Apache","VirtualHost","mod_rewrite","htaccess","a2ensite","a2enmod","apachectl","SSLEngine","AllowOverride","mod_security","listing répertoire"]},

// ────────────────────────────────────────────────────────
// IoT / BLUETOOTH
// ────────────────────────────────────────────────────────
{id:3301,cat:"secu",titre:"IoT & Protocoles sans fil — Sécurité",sub:"Bluetooth, Zigbee, Z-Wave, MQTT, menaces",
 def:"L'Internet des Objets (IoT) introduit des protocoles sans fil spécifiques et des surfaces d'attaque nouvelles souvent négligées en entreprise.",
 extra_table:[
   ["Bluetooth Classic","2.4 GHz","~10-100m","Audio, périphériques","Bluejacking, Bluesnarfing, KNOB attack"],
   ["BLE (Bluetooth Low Energy)","2.4 GHz","~10-50m","Capteurs, balises, IoT","Relay attacks, spoofing"],
   ["Zigbee (802.15.4)","2.4 GHz","~10-100m","Domotique, capteurs","Replay attacks, clés hardcodées"],
   ["Z-Wave","868/908 MHz","~30-100m","Domotique premium","Peu d'attaques connues, fréquences dédiées"],
   ["LoRaWAN","Sub-GHz","~2-15 km","Capteurs longue portée","Replay attacks, clé root exposée"]
 ],
 extra_table_headers:["Protocole","Fréquence","Portée","Usage","Risques"],
 points:["MQTT (Message Queuing Telemetry Transport) : protocole publish/subscribe léger pour IoT. Port 1883 (clair) / 8883 (TLS). Souvent exposé sans authentification",
   "Shodan : moteur de recherche d'équipements connectés — de nombreux appareils IoT sont visibles et accessibles publiquement",
   "Mots de passe par défaut : premier vecteur d'attaque IoT. Beaucoup d'appareils sortent d'usine avec admin/admin ou root/root",
   "Segmentation réseau IoT : isoler les équipements IoT dans un VLAN dédié sans accès au réseau entreprise",
   "KNOB Attack (Bluetooth) : forcer la négociation d'une clé de chiffrement courte (1 octet) pour brute-forcer la connexion",
   "Firmware : mises à jour souvent rares ou inexistantes sur les appareils IoT — vecteur de vulnérabilités persistantes"],
 piege:"Un équipement IoT compromis sur le réseau principal peut devenir une tête de pont pour pivoter vers le SI de l'entreprise. La segmentation VLAN est non-négociable dès qu'on parle d'IoT en entreprise.",
 retenir:"IoT = segmenter en VLAN dédié. Changer les credentials par défaut. MQTT port 1883 = non chiffré. Shodan indexe les équipements non sécurisés. Firmware = mettre à jour.",
 keywords:["IoT","Bluetooth","BLE","Zigbee","Z-Wave","MQTT","LoRaWAN","Shodan","VLAN IoT","KNOB attack","firmware","credentials par défaut"]},

// ── BGP ──
{id:3401,cat:"reseauavance",titre:"BGP — Protocole de routage Internet",sub:"AS, attributs, eBGP/iBGP, Route Reflector, communautés",
 def:"BGP (Border Gateway Protocol) est le protocole de routage inter-AS utilisé sur Internet. C'est un protocole à vecteur de chemin (path vector) qui échange des routes entre Autonomous Systems.",
 points:[
   "AS (Autonomous System) : ensemble de réseaux sous une même politique de routage, identifié par un ASN. ASN publics attribués par les RIR (RIPE, ARIN…)",
   "eBGP : BGP entre deux AS différents (TTL=1 par défaut). iBGP : BGP au sein du même AS — nécessite full-mesh ou Route Reflector",
   "Attributs BGP (ordre de sélection) : WEIGHT (Cisco local) → LOCAL_PREF → AS_PATH → ORIGIN → MED → eBGP vs iBGP → IGP metric",
   "LOCAL_PREF : préférence de sortie du trafic (plus élevé = préféré). Propagé dans tout l'AS via iBGP",
   "AS_PATH : liste des AS traversés — détection de boucles + chemin le plus court en nombre d'AS",
   "MED : indique au voisin le chemin d'entrée préféré dans notre AS. Propagé uniquement au voisin direct",
   "Communautés BGP : attribut pour taguer des routes (ex: 65000:100 = ne pas redistribuer)",
   "Route Reflector (RR) : évite le full-mesh iBGP — redistribue les routes reçues d'un client vers les autres"
 ],
 piege:"iBGP nécessite un full-mesh de sessions entre tous les routeurs BGP d'un AS (ou un Route Reflector). Sans ça, les routes apprises par iBGP ne sont PAS redistribuées — règle anti-boucle.",
 retenir:"BGP = vecteur de chemin, inter-AS. eBGP = entre AS. iBGP = dans l'AS. LOCAL_PREF = sortie. AS_PATH = longueur. MED = entrée. Communautés = politiques de routage.",
 keywords:["BGP","AS","ASN","eBGP","iBGP","LOCAL_PREF","AS_PATH","MED","communauté","Route Reflector","WEIGHT","route map","RPKI","RIR"]},

{id:3402,cat:"reseauavance",titre:"BGP — Configuration Cisco et sécurité",sub:"neighbor, prefix-list, route-map, GTSM, RPKI",
 is_cmd:true,
 def:"Configuration BGP sur Cisco IOS et mécanismes de sécurité pour protéger le routage Internet.",
 cmds:[
   {section:"Configuration de base", items:[
     {cmd:"router bgp 65001", comment:"# Démarrer BGP avec l'ASN 65001"},
     {cmd:"bgp router-id 1.1.1.1", comment:"# Router ID (recommandé : IP loopback)"},
     {cmd:"neighbor 203.0.113.1 remote-as 65002", comment:"# Voisin eBGP dans l'AS 65002"},
     {cmd:"neighbor 10.0.0.2 remote-as 65001", comment:"# Voisin iBGP (même AS)"},
     {cmd:"neighbor 10.0.0.2 update-source Loopback0", comment:"# Source iBGP = loopback (stabilité)"},
     {cmd:"network 192.168.1.0 mask 255.255.255.0", comment:"# Annoncer un préfixe"},
     {cmd:"show bgp summary", comment:"# État des voisins BGP"},
     {cmd:"show bgp ipv4 unicast", comment:"# Table BGP complète"}
   ]},
   {section:"Filtrage avec prefix-list et route-map", items:[
     {cmd:"ip prefix-list ALLOW-OUT seq 10 permit 192.168.0.0/16 le 24", comment:"# Autoriser /16 à /24"},
     {cmd:"ip prefix-list ALLOW-OUT seq 20 deny 0.0.0.0/0 le 32", comment:"# Refuser tout le reste"},
     {cmd:"route-map SET-LP permit 10", comment:"# Route-map pour modifier LOCAL_PREF"},
     {cmd:" set local-preference 200", comment:"# Augmenter LOCAL_PREF"},
     {cmd:"neighbor 203.0.113.1 route-map ALLOW-OUT out", comment:"# Appliquer en sortie"}
   ]},
   {section:"Sécurité BGP", items:[
     {cmd:"neighbor 203.0.113.1 password MonSecret!", comment:"# Authentification MD5"},
     {cmd:"neighbor 203.0.113.1 ttl-security hops 1", comment:"# GTSM — TTL Security anti-spoofing"},
     {cmd:"no bgp default ipv4-unicast", comment:"# Désactiver annonce automatique IPv4"},
     {cmd:"show bgp ipv4 unicast | include Invalid", comment:"# Préfixes RPKI invalides (hijack)"}
   ]}
 ],
 piege:"Ne jamais annoncer plus de préfixes que nécessaire à un voisin eBGP — utiliser des prefix-lists strictes en entrée ET en sortie. Un routeur mal filtré peut provoquer un BGP hijack.",
 retenir:"router bgp ASN + neighbor remote-as. PREFIX-LIST = filtrer. LOCAL_PREF = sortie. GTSM + MD5 = sécurité session. RPKI = valider l'origine des préfixes.",
 keywords:["router bgp","neighbor","prefix-list","route-map","LOCAL_PREF","GTSM","RPKI","BGP hijack","show bgp summary","TTL security","MD5"]},

// ── DNS AVANCÉ ──
{id:3501,cat:"reseau",titre:"DNS avancé — Zones, transferts et DNSSEC",sub:"AXFR, TSIG, DNSSEC, split-horizon, RPZ, DoT",
 def:"Au-delà de la résolution simple, le DNS gère des zones, des transferts sécurisés et peut signer cryptographiquement ses enregistrements avec DNSSEC.",
 points:[
   "Zone primaire (master) : source autoritaire. Zone secondaire (slave) : copie synchronisée via transfert de zone",
   "AXFR : transfert complet de zone. IXFR : transfert incrémental (modifications uniquement) — plus efficace",
   "TSIG : clé symétrique partagée entre serveurs DNS pour authentifier les transferts — empêche le vol de zone",
   "DNSSEC : signe cryptographiquement les enregistrements. RRSIG = signature, DNSKEY = clé publique, DS = empreinte dans la zone parent",
   "Chain of trust DNSSEC : Root → TLD (.fr) → domaine — chaque niveau valide le suivant via les enregistrements DS",
   "Split-horizon : serveur DNS qui retourne des réponses différentes selon la source (interne vs externe)",
   "RPZ (Response Policy Zone) : liste noire DNS — bloquer des domaines malveillants au niveau DNS (DNS firewall)",
   "DNS over HTTPS (DoH) / DNS over TLS (DoT) : chiffrement des requêtes DNS pour la confidentialité"
 ],
 piege:"Un serveur DNS avec transfert de zone ouvert (AXFR sans restriction) expose toute la structure interne du réseau. Restreindre les transferts aux seuls serveurs secondaires légitimes est obligatoire.",
 retenir:"AXFR = transfert complet. TSIG = authentifier transferts. DNSSEC = signature crypto. Split-horizon = réponses différentes int/ext. RPZ = DNS firewall. DoT/DoH = requêtes chiffrées.",
 keywords:["AXFR","IXFR","TSIG","DNSSEC","RRSIG","DNSKEY","DS","split-horizon","RPZ","DoH","DoT","zone primaire","zone secondaire"]},

{id:3502,cat:"reseau",titre:"DNS avancé — Bind9 et Windows DNS",sub:"named.conf, zones, rndc, PowerShell DNS",
 is_cmd:true,
 def:"Configuration pratique d'un serveur DNS Bind9 (Linux) et Windows DNS Server avec les commandes d'administration et de diagnostic.",
 cmds:[
   {section:"Bind9 — named.conf (extraits)", items:[
     {cmd:"options {\n  listen-on { 192.168.1.1; };\n  allow-query { 192.168.0.0/16; };\n  allow-transfer { none; };\n  forwarders { 8.8.8.8; 1.1.1.1; };\n  dnssec-validation auto;\n};", comment:"# Config globale sécurisée"},
     {cmd:"zone \"mondomaine.local\" IN {\n  type master;\n  file \"/etc/bind/zones/mondomaine.local\";\n  allow-transfer { 192.168.1.2; };\n};", comment:"# Zone primaire — transfert vers secondaire uniquement"},
     {cmd:"zone \"1.168.192.in-addr.arpa\" IN {\n  type master;\n  file \"/etc/bind/zones/rev.192.168.1\";\n};", comment:"# Zone inverse (PTR)"}
   ]},
   {section:"Bind9 — commandes CLI", items:[
     {cmd:"named-checkconf /etc/bind/named.conf", comment:"# Vérifier la syntaxe de la config"},
     {cmd:"named-checkzone mondomaine.local /etc/bind/zones/mondomaine.local", comment:"# Vérifier une zone"},
     {cmd:"rndc reload", comment:"# Recharger sans redémarrer"},
     {cmd:"rndc flush", comment:"# Vider le cache DNS"},
     {cmd:"rndc querylog on", comment:"# Activer le log des requêtes"},
     {cmd:"dig @localhost mondomaine.local SOA", comment:"# Tester le SOA de la zone locale"}
   ]},
   {section:"Windows DNS — PowerShell", items:[
     {cmd:"Add-DnsServerPrimaryZone -Name 'corp.local' -ZoneFile 'corp.local.dns'", comment:"# Créer une zone primaire"},
     {cmd:"Add-DnsServerResourceRecordA -ZoneName 'corp.local' -Name 'srv01' -IPv4Address '10.0.0.10'", comment:"# Ajouter un enregistrement A"},
     {cmd:"Get-DnsServerZone", comment:"# Lister toutes les zones"},
     {cmd:"Clear-DnsServerCache", comment:"# Vider le cache DNS Windows"},
     {cmd:"Set-DnsServerForwarder -IPAddress '8.8.8.8','1.1.1.1'", comment:"# Configurer les forwarders"}
   ]}
 ],
 piege:"allow-transfer { none; } doit être la valeur par défaut globale — puis autoriser explicitement les secondaires dans chaque zone. Laisser 'any' expose toutes les zones à n'importe qui.",
 retenir:"named-checkconf = vérifier. rndc reload = recharger. rndc flush = vider cache. allow-transfer restreint par zone. Windows DNS = Add-DnsServerResourceRecordA.",
 keywords:["Bind9","named.conf","named-checkconf","rndc","allow-transfer","forwarders","Add-DnsServerResourceRecordA","Get-DnsServerZone","SOA","PTR","zone inverse"]},

// ── PKI ENTREPRISE ──
{id:3601,cat:"crypto",titre:"PKI Entreprise — Architecture et ADCS",sub:"Root CA hors ligne, Issuing CA, templates, auto-enrollment",
 schema:`<svg viewBox="0 0 440 250" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box-accent" x="155" y="8" width="130" height="42" rx="6"/><text class="sd-text" x="220" y="24">Root CA</text><text class="sd-text-small" x="220" y="36">HORS LIGNE — coffre-fort</text><text class="sd-text-small" x="220" y="47">Signe les Sub CA uniquement</text><line class="sd-box" x1="220" y1="50" x2="220" y2="80"/><rect class="sd-box" x="130" y="80" width="180" height="42" rx="6"/><text class="sd-text" x="220" y="96">Issuing CA (Sub CA)</text><text class="sd-text-small" x="220" y="108">EN LIGNE — émet les certificats</text><text class="sd-text-small" x="220" y="119">certsrv.msc / ADCS</text><line class="sd-box" x1="180" y1="122" x2="110" y2="155"/><line class="sd-box" x1="220" y1="122" x2="220" y2="155"/><line class="sd-box" x1="260" y1="122" x2="330" y2="155"/><rect class="sd-box" x="50" y="155" width="120" height="36" rx="4"/><text class="sd-text" x="110" y="169">Serveurs web</text><text class="sd-text-small" x="110" y="181">(template : Web Server)</text><rect class="sd-box" x="160" y="155" width="120" height="36" rx="4"/><text class="sd-text" x="220" y="169">Utilisateurs AD</text><text class="sd-text-small" x="220" y="181">(auto-enrollment GPO)</text><rect class="sd-box" x="270" y="155" width="120" height="36" rx="4"/><text class="sd-text" x="330" y="169">Équipements</text><text class="sd-text-small" x="330" y="181">(WiFi 802.1X, VPN)</text><text class="sd-label" x="220" y="218">CRL publiée régulièrement par l'Issuing CA</text><text class="sd-label" x="220" y="232">Root CA déployée via GPO → Trusted Root sur tous les postes du domaine</text></svg>`,
 def:"Une PKI (Public Key Infrastructure) d'entreprise permet d'émettre et gérer des certificats numériques en interne pour les serveurs, utilisateurs et équipements.",
 points:[
   "Architecture deux niveaux : Root CA (hors ligne, protégée) → Issuing CA (en ligne, émet les certificats quotidiens)",
   "Root CA hors ligne : éteinte et rangée dans un coffre quand elle ne signe pas de nouveaux certificats subordonnés — protection maximale de la clé racine",
   "ADCS (Active Directory Certificate Services) : PKI Microsoft intégrée à AD. Gestion via certsrv.msc ou PowerShell",
   "Auto-enrollment : les machines et utilisateurs du domaine reçoivent automatiquement leurs certificats via GPO",
   "Certificate Templates : modèles définissant le type de certificat (serveur web, auth utilisateur, carte à puce, code signing…)",
   "CRL (Certificate Revocation List) : liste des certificats révoqués, publiée régulièrement. OCSP = vérification en temps réel",
   "SAN (Subject Alternative Names) : champ permettant un certificat valide pour plusieurs noms/IPs — obligatoire depuis Chrome 58"
 ],
 piege:"Un certificat auto-signé n'est PAS une PKI. Sans Root CA déployée via GPO comme Trusted Root, les navigateurs afficheront des erreurs TLS même avec un certificat ADCS techniquement valide.",
 retenir:"Root CA = hors ligne. Issuing CA = en ligne, émet. ADCS = PKI Microsoft dans AD. Auto-enrollment = GPO. CRL/OCSP = révocation. SAN = noms alternatifs obligatoires.",
 keywords:["PKI","Root CA","Issuing CA","ADCS","certsrv","auto-enrollment","Certificate Template","CRL","OCSP","SAN","GPO","révocation","subordinate CA"]},

{id:3602,cat:"crypto",titre:"PKI Entreprise — openssl et certutil",sub:"CSR, PFX, chaîne de confiance, révocation",
 is_cmd:true,
 def:"Gestion pratique des certificats en entreprise avec openssl (Linux/Windows) et certutil (Windows).",
 cmds:[
   {section:"OpenSSL — Génération et inspection", items:[
     {cmd:"openssl genrsa -out server.key 2048", comment:"# Générer une clé privée RSA 2048 bits"},
     {cmd:"openssl req -new -key server.key -out server.csr -subj '/CN=srv.corp.local'", comment:"# Générer une CSR"},
     {cmd:"openssl x509 -in server.crt -text -noout", comment:"# Inspecter un certificat (dates, SAN, issuer)"},
     {cmd:"openssl verify -CAfile ca.crt server.crt", comment:"# Vérifier la chaîne de confiance"},
     {cmd:"openssl s_client -connect monserveur:443 -showcerts", comment:"# Inspecter le certificat d'un serveur HTTPS"},
     {cmd:"openssl pkcs12 -export -in server.crt -inkey server.key -out server.pfx", comment:"# Exporter en PFX (format Windows)"}
   ]},
   {section:"certutil — Windows", items:[
     {cmd:"certutil -ping", comment:"# Tester la connectivité avec l'Issuing CA"},
     {cmd:"certutil -addstore Root ca.crt", comment:"# Installer la CA dans le store Trusted Root"},
     {cmd:"certutil -store My", comment:"# Lister les certificats personnels"},
     {cmd:"certutil -revoke <SerialNumber>", comment:"# Révoquer un certificat"},
     {cmd:"certutil -CRL", comment:"# Publier une nouvelle CRL manuellement"}
   ]},
   {section:"PowerShell ADCS", items:[
     {cmd:"Get-CertificationAuthority", comment:"# Lister les CA du domaine (module PSPKI)"},
     {cmd:"Get-IssuedRequest -CertificationAuthority 'CA01\\Corp-CA'", comment:"# Voir les certificats émis"},
     {cmd:"Revoke-Certificate -CertificationAuthority 'CA01\\Corp-CA' -SerialNumber '...' -Reason KeyCompromise", comment:"# Révoquer"},
     {cmd:"Get-RevokedRequest -CertificationAuthority 'CA01\\Corp-CA'", comment:"# Voir les certificats révoqués"}
   ]}
 ],
 piege:"Une CSR sans extension SAN donnera un certificat sans SAN — rejeté par les navigateurs modernes. Toujours ajouter le champ subjectAltName dans le fichier de configuration openssl lors de la génération.",
 retenir:"openssl req = CSR. openssl x509 -text = inspecter. certutil -addstore Root = confiance. PFX = format Windows. Révoquer = certutil -revoke + publier CRL.",
 keywords:["openssl","certutil","CSR","PFX","PKCS12","SAN","chaîne de confiance","certutil -addstore","CRL","revoke","PSPKI","Get-CertificationAuthority"]},

// ── SIEM ──
{id:3701,cat:"superv",titre:"SIEM — Règles de corrélation et cas d'usage",sub:"Brute force, latéralisation, exfiltration, ransomware",
 def:"Les règles de corrélation SIEM transforment des événements bruts en alertes exploitables en détectant des patterns d'attaque sur plusieurs sources de logs.",
 extra_table:[
   ["Brute force SSH/RDP","≥5 Event 4625 en <60s depuis même IP","4625 Windows / auth.log Linux","IP connue ? Fail2ban déclenché ?"],
   ["Brute force réussi","≥5 échecs + 1 succès (4624) même IP/compte","4625 puis 4624","Logon Type 3 = latéral"],
   ["Mouvement latéral","Connexion réseau (Type 3) admin sur >3 machines en <10min","4624 Logon Type 3","Pass-the-Hash probable"],
   ["Nouveau service suspect","Event 7045 + fichier dans C:\\Temp ou C:\\Users","7045 + Sysmon 11","Hash VirusTotal du binaire"],
   ["Exfiltration DNS",">500 requêtes DNS vers même domaine en <1h","DNS query logs","DNS tunneling (dnscat2, iodine)"],
   ["Ransomware","Renommage massif >100 fichiers en <30s + Event 4663","Sysmon 11 / 4663","Isoler immédiatement"],
   ["Golden Ticket","TGS (4769) sans TGT préalable (4768)","4768 + 4769","KRBTGT compromis — reset x2"],
   ["Kerberoasting",">10 demandes TGS pour comptes SPN en <30s","4769 RC4 (0x17)","Encryption type 0x17 = suspect"]
 ],
 extra_table_headers:["Scénario","Règle de corrélation","Sources","Investigation"],
 points:[
   "Tuning : calibrer les seuils selon l'environnement — trop bas = faux positifs, trop haut = faux négatifs",
   "Baseline : définir le comportement normal avant de créer des règles d'anomalie",
   "Contexte : enrichir les alertes avec asset management (criticité), threat intel (IP malveillante) et identité (RH)",
   "MITRE ATT&CK mapping : associer chaque règle à une technique ATT&CK (T1110 = Brute Force, T1550.002 = Pass-the-Hash…)"
 ],
 piege:"Une alerte SIEM sans contexte a peu de valeur. Un Event 4625 isolé = normal. 500 Event 4625 depuis une IP externe sur Administrator en 2 minutes = brute force actif. Le volume ET le contexte font l'alerte.",
 retenir:"Corrélation = pattern sur plusieurs événements. Baseline = comportement normal. Tuning = calibrer les seuils. MITRE mapping = classer. Enrichir avec asset + threat intel.",
 keywords:["corrélation","brute force","mouvement latéral","exfiltration","ransomware","Golden Ticket","Kerberoasting","4625","4769","7045","Sysmon","tuning","baseline","MITRE ATT&CK"]},

{id:3702,cat:"superv",titre:"SIEM — Splunk et requêtes SPL",sub:"Search Processing Language, stats, alertes, dashboards",
 is_cmd:true,
 def:"Splunk est l'un des SIEM les plus répandus. SPL (Search Processing Language) permet d'analyser les logs avec des requêtes puissantes.",
 cmds:[
   {section:"Requêtes SPL de détection", items:[
     {cmd:"index=windows EventCode=4625 | stats count by src_ip, user | where count > 5", comment:"# Brute force : >5 échecs par IP/user"},
     {cmd:"index=windows EventCode=4624 Logon_Type=3 | stats count by src_ip, user, dest | where count > 3", comment:"# Mouvement latéral"},
     {cmd:"index=windows EventCode=7045 | table _time, host, ServiceName, ServiceFileName", comment:"# Nouveaux services installés"},
     {cmd:"index=dns | stats count by query | where count > 500 | sort -count", comment:"# Exfiltration DNS potentielle"},
     {cmd:"index=windows EventCode=4769 TicketEncryptionType=0x17 | stats count by user | where count > 10", comment:"# Kerberoasting — RC4"},
     {cmd:"index=sysmon EventCode=11 TargetFilename=*\\\\Temp\\\\* | table _time, host, user, TargetFilename", comment:"# Fichiers créés dans Temp"}
   ]},
   {section:"Commandes SPL utiles", items:[
     {cmd:"| stats count by field1, field2", comment:"# Compter et grouper"},
     {cmd:"| eval risk=if(count>100,'HIGH','LOW')", comment:"# Champ calculé"},
     {cmd:"| rex field=_raw 'user=(?<username>[^\\s]+)'", comment:"# Extraction regex"},
     {cmd:"| lookup threat_intel.csv ip OUTPUT reputation", comment:"# Enrichir avec threat intel"},
     {cmd:"| timechart span=1h count by user", comment:"# Graphique temporel"},
     {cmd:"| table _time, host, user, src_ip | sort -_time", comment:"# Tableau trié"}
   ]},
   {section:"Alertes et gestion", items:[
     {cmd:"| tstats count WHERE index=windows by host span=1d", comment:"# Volume de logs par hôte (EPS)"},
     {cmd:"index=_internal source=*scheduler* status=success", comment:"# Vérifier les alertes planifiées"}
   ]}
 ],
 piege:"Les recherches Splunk en temps réel consomment beaucoup de ressources. Préférer les alertes planifiées (scheduled) avec une fenêtre de 5-15 min plutôt que des recherches continues.",
 retenir:"SPL : | stats count by. | where = filtrer. | eval = calculer. | rex = regex. | lookup = enrichir. | timechart = graphique. Alertes = scheduled, pas real-time systématique.",
 keywords:["Splunk","SPL","stats","where","eval","rex","lookup","timechart","EventCode","index","savedsearch","tstats","scheduled alert"]},

// ── OSPF AVANCÉ ──
{id:3801,cat:"reseauavance",titre:"OSPF avancé — LSA, areas spéciales, redistribution",sub:"Types LSA, stub, NSSA, redistribute, authentification",
 def:"Compréhension avancée d'OSPF : types de LSA, areas spéciales et redistribution inter-protocoles.",
 extra_table:[
   ["Type 1","Router LSA","Tous routeurs","Liens et coûts du routeur","Intra-area"],
   ["Type 2","Network LSA","DR (multi-accès)","Routeurs sur segment broadcast","Intra-area"],
   ["Type 3","Summary LSA","ABR","Préfixes des autres areas","Inter-area"],
   ["Type 4","ASBR Summary","ABR","Localisation de l'ASBR","Inter-area"],
   ["Type 5","External LSA","ASBR","Routes externes redistribuées","Toutes areas sauf stub"],
   ["Type 7","NSSA External","ASBR en NSSA","Routes externes dans NSSA","Converti en Type 5 par ABR"]
 ],
 extra_table_headers:["Type","Nom","Généré par","Contenu","Portée"],
 points:[
   "Stub Area : bloque les LSA Type 5 (routes externes). Trafic externe via route par défaut injectée par l'ABR",
   "Totally Stubby Area (Cisco) : bloque Type 3, 4 et 5 — seule route par défaut entre. Tables de routage très légères",
   "NSSA : comme stub mais permet un ASBR local (redistribution) via LSA Type 7, converti en Type 5 par l'ABR",
   "E1 (External Type 1) : coût OSPF + coût externe accumulé — plus précis. E2 (Type 2) : coût fixe = coût à l'ASBR (défaut)",
   "Redistribution : injecter des routes d'un autre protocole dans OSPF — nécessite de préciser metric et metric-type",
   "Authentification OSPF : MD5 par interface (ip ospf authentication message-digest) ou au niveau de l'area"
 ],
 piege:"La redistribution mutuelle entre deux protocoles (ex: OSPF ↔ EIGRP) sans route-map et tag peut créer des boucles de routage. Toujours utiliser des route-maps avec des tags pour filtrer.",
 retenir:"LSA Type 3=inter-area, Type 5=externe, Type 7=NSSA. Stub=pas de Type5. Totally Stubby=défaut seulement. E2=coût fixe (défaut). Redistribution = route-map obligatoire.",
 keywords:["LSA","Type 1","Type 3","Type 5","Type 7","stub area","totally stubby","NSSA","ABR","ASBR","redistribution","E1","E2","authentification OSPF","MD5"]},

// ── LOAD BALANCING ──
{id:3901,cat:"admin",titre:"Load Balancing — HAProxy et algorithmes",sub:"Round-robin, least-conn, health checks, sticky sessions",
 is_cmd:true,
 def:"Le load balancing répartit le trafic entre plusieurs serveurs pour la haute disponibilité. HAProxy est la référence open-source.",
 cmds:[
   {section:"haproxy.cfg — Configuration de base", items:[
     {cmd:"frontend web_front\n  bind *:80\n  bind *:443 ssl crt /etc/ssl/monsite.pem\n  redirect scheme https if !{ ssl_fc }\n  default_backend web_servers", comment:"# Frontend HTTP/HTTPS"},
     {cmd:"backend web_servers\n  balance roundrobin\n  option httpchk GET /health\n  server web1 10.0.0.1:80 check inter 2s rise 2 fall 3\n  server web2 10.0.0.2:80 check inter 2s rise 2 fall 3\n  server web3 10.0.0.3:80 check inter 2s rise 2 fall 3 backup", comment:"# Backend round-robin + health check (web3=backup)"}
   ]},
   {section:"Algorithmes de répartition", items:[
     {cmd:"balance roundrobin", comment:"# Tour à tour — le plus simple"},
     {cmd:"balance leastconn", comment:"# Connexions minimales — idéal longues connexions (BDD, WebSocket)"},
     {cmd:"balance source", comment:"# Sticky par IP source (attention : NAT = problème)"},
     {cmd:"balance uri", comment:"# Basé sur l'URI — même URL = même serveur (cache)"},
     {cmd:"cookie SERVERID insert indirect nocache", comment:"# Sticky session via cookie (meilleur que source)"}
   ]},
   {section:"ACL et routing avancé", items:[
     {cmd:"acl is_api path_beg /api/", comment:"# ACL : chemin commence par /api/"},
     {cmd:"acl is_static path_end .jpg .css .js .png", comment:"# ACL : fichiers statiques"},
     {cmd:"use_backend api_servers if is_api", comment:"# Rediriger l'API vers backend dédié"},
     {cmd:"haproxy -c -f /etc/haproxy/haproxy.cfg", comment:"# Tester la configuration"},
     {cmd:"echo 'show stat' | socat stdio /var/run/haproxy.sock", comment:"# Stats en temps réel"}
   ]}
 ],
 piege:"balance source (sticky par IP) ne fonctionne pas derrière un NAT — tous les utilisateurs ont la même IP source et atterrissent sur le même serveur, annulant l'effet du load balancing.",
 retenir:"roundrobin = équitable. leastconn = longues connexions. source = sticky IP (attention NAT). cookie = sticky session fiable. health check = rise/fall. backup = serveur de secours.",
 keywords:["HAProxy","load balancing","roundrobin","leastconn","balance source","sticky session","health check","ACL","backend","frontend","cookie","socat"]},

// ── MÉTRIQUES RÉSEAU ──
{id:4001,cat:"reseau",titre:"Métriques réseau — Latence, débit, QoS et SLA",sub:"RTT, jitter, bande passante, MOS, 5 nines",
 def:"La mesure des métriques réseau est fondamentale pour le diagnostic, la QoS et la négociation des SLA.",
 extra_table:[
   ["Latence (RTT)","Aller-retour d'un paquet","ms","<10ms LAN, <50ms WAN, <150ms VoIP","ping, mtr"],
   ["Jitter","Variation de la latence","ms","<30ms pour la VoIP (ITU G.114)","iperf3, Wireshark"],
   ["Bande passante","Débit maximal théorique","Mbps/Gbps","Selon le lien","iperf3"],
   ["Débit réel","Débit effectif mesuré","Mbps","Toujours < bande passante","iperf3, speedtest"],
   ["Perte de paquets","% paquets perdus","%","0% idéal, >1% = problème VoIP","ping -c 1000, mtr"],
   ["MOS","Qualité voix perçue","1-5","≥4 = bonne qualité (G.711)","calculé"],
   ["Disponibilité SLA","%  uptime garanti","% / nines","99.9%=8.7h/an, 99.99%=52min/an","monitoring"]
 ],
 extra_table_headers:["Métrique","Définition","Unité","Seuil référence","Outil"],
 points:[
   "VoIP dégradée si : latence >150ms OU jitter >30ms OU perte >1% — ces trois métriques combinées donnent le MOS",
   "iperf3 : test de bande passante — serveur (-s), client (-c IP -t 30 -P 4 pour 4 flux parallèles)",
   "mtr (My Traceroute) : combine ping + traceroute, mesure latence et pertes hop par hop en temps réel",
   "Règle des 5 nines : 99.999% = 5.26 minutes d'indisponibilité par an — standard datacenter critique",
   "Vitesse lumière en fibre : ~200 000 km/s — Paris↔New York ≈ 28ms minimum théorique (aller simple)"
 ],
 piege:"Un lien à 1 Gbps avec 200ms de latence est inutilisable pour la VoIP et limité en TCP (débit réel TCP ≈ fenêtre TCP / RTT). La latence est souvent plus critique que la bande passante.",
 retenir:"VoIP : latence <150ms, jitter <30ms, perte <1%. iperf3 = test débit. mtr = latence hop par hop. 99.9% = 8.7h d'indispo/an. RTT LAN <1ms.",
 keywords:["latence","RTT","jitter","bande passante","throughput","MOS","SLA","iperf3","mtr","perte de paquets","5 nines","99.999%","VoIP","QoS"]},

// ── POWERSHELL DSC ──
{id:4101,cat:"windows",titre:"PowerShell DSC — Desired State Configuration",sub:"Configuration as Code Windows, LCM, ressources",
 is_cmd:true,
 def:"PowerShell DSC est un framework de Configuration as Code pour Windows — décrire l'état désiré d'un système et le maintenir automatiquement.",
 cmds:[
   {section:"Structure d'une configuration DSC", items:[
     {cmd:"Configuration MonServeurWeb {\n  param([string]$Machine)\n  Node $Machine {\n    WindowsFeature IIS {\n      Ensure = 'Present'\n      Name = 'Web-Server'\n    }\n    Service W3SVC {\n      Name = 'W3SVC'\n      State = 'Running'\n      StartupType = 'Automatic'\n    }\n  }\n}", comment:"# Config DSC : IIS installé et démarré"},
     {cmd:"MonServeurWeb -Machine 'SRV-WEB01'", comment:"# Génère le fichier MOF"},
     {cmd:"Start-DscConfiguration -Path .\\MonServeurWeb -Wait -Verbose", comment:"# Appliquer la configuration"},
     {cmd:"Test-DscConfiguration -ComputerName SRV-WEB01", comment:"# Vérifier la conformité"},
     {cmd:"Get-DscConfiguration", comment:"# Voir la config actuellement appliquée"}
   ]},
   {section:"LCM (Local Configuration Manager)", items:[
     {cmd:"Get-DscLocalConfigurationManager", comment:"# Voir le mode LCM (Push/Pull, fréquence)"},
     {cmd:"[DSCLocalConfigurationManager()]\nconfiguration LCMConfig {\n  Settings {\n    RefreshMode = 'Pull'\n    ConfigurationMode = 'ApplyAndAutoCorrect'\n    RefreshFrequencyMins = 30\n  }\n}", comment:"# LCM Pull — réapplique toutes les 30 min"},
     {cmd:"Set-DscLocalConfigurationManager -Path .\\LCMConfig", comment:"# Appliquer la config LCM"}
   ]},
   {section:"Ressources DSC", items:[
     {cmd:"Get-DscResource", comment:"# Lister toutes les ressources disponibles"},
     {cmd:"Find-Module -Tag DSC | Install-Module", comment:"# Installer ressources depuis PSGallery"},
     {cmd:"# Built-in : File, Registry, Service, WindowsFeature, User, Group", comment:""},
     {cmd:"# Communauté : xWebAdministration, xNetworking, cNtfsPermissions", comment:""}
   ]}
 ],
 piege:"DSC en mode ApplyAndAutoCorrect réapplique la configuration régulièrement — un changement manuel sera réécrasé au prochain cycle. Toujours documenter les exceptions ou les exclure de DSC.",
 retenir:"DSC = état désiré déclaratif → MOF → Start-DscConfiguration. LCM = moteur (Push ou Pull). Test-DscConfiguration = vérifier conformité. ApplyAndAutoCorrect = auto-correction.",
 keywords:["DSC","Desired State Configuration","MOF","LCM","Push","Pull","Start-DscConfiguration","Test-DscConfiguration","ApplyAndAutoCorrect","WindowsFeature","ressource DSC"]},

// ── IPSEC ──
{id:4201,cat:"secu",titre:"IPSec — Architecture et modes",sub:"AH, ESP, tunnel vs transport, IKE phases, SA",
 def:"IPSec (Internet Protocol Security) est une suite de protocoles sécurisant les communications IP au niveau 3. Il est utilisé pour les VPN site-à-site et d'accès distant.",
 extra_table:[
   ["AH (Authentication Header)","51","Authentification + intégrité","Pas de chiffrement — rarement utilisé seul"],
   ["ESP (Encapsulating Security Payload)","50","Chiffrement + intégrité + auth","Le plus utilisé — remplace AH dans la pratique"],
   ["IKE (Internet Key Exchange)","UDP 500 / 4500","Négociation des SA et échange de clés","IKEv1 (obsolète), IKEv2 (recommandé)"],
   ["NAT-T (NAT Traversal)","UDP 4500","Encapsulation ESP dans UDP","Obligatoire quand il y a du NAT sur le chemin"]
 ],
 extra_table_headers:["Protocole","Port/Proto","Rôle","Remarque"],
 points:[
   "Mode tunnel : encapsule le paquet IP original entier dans un nouveau paquet IP — utilisé pour les VPN site-à-site (entre routeurs/firewalls)",
   "Mode transport : chiffre uniquement le payload du paquet IP original — utilisé pour les connexions hôte-à-hôte (ex: L2TP/IPSec client)",
   "SA (Security Association) : contrat unidirectionnel entre deux pairs définissant les algorithmes, clés et durée de vie. Une session IPSec = 2 SA (aller + retour)",
   "IKE Phase 1 (ISAKMP SA) : établit un canal sécurisé pour la négociation — mode Main (6 messages) ou Aggressive (3 messages, moins sécurisé)",
   "IKE Phase 2 (IPSec SA) : négocie les SA IPSec (algorithmes ESP/AH, durée de vie) dans le tunnel Phase 1",
   "IKEv2 : plus simple (4 messages), supporte MOBIKE (mobilité), EAP — recommandé pour les nouveaux déploiements",
   "PFS (Perfect Forward Secrecy) : génère de nouvelles clés Diffie-Hellman à chaque Phase 2 — compromission d'une clé n'affecte pas les sessions passées"
 ],
 piege:"Ouvrir uniquement UDP 500 et UDP 4500 ne suffit pas toujours — le protocole ESP (IP proto 50) doit aussi être autorisé dans le pare-feu. Beaucoup d'administrateurs oublient ESP et se demandent pourquoi le VPN ne monte pas.",
 retenir:"ESP=chiffrement+intégrité. Tunnel=VPN site-à-site. Transport=hôte-à-hôte. IKE Phase1=canal sécurisé. Phase2=SA IPSec. IKEv2=recommandé. PFS=nouvelles clés à chaque Phase2.",
 keywords:["IPSec","AH","ESP","IKE","IKEv1","IKEv2","SA","tunnel","transport","NAT-T","PFS","ISAKMP","UDP 500","UDP 4500","Phase 1","Phase 2"]},

{id:4202,cat:"secu",titre:"IPSec — Configuration Cisco et Linux",sub:"crypto map, transform-set, strongSwan, VPN site-à-site",
 is_cmd:true,
 def:"Configuration pratique d'un VPN IPSec site-à-site sur Cisco IOS et Linux (strongSwan/libreswan).",
 cmds:[
   {section:"Cisco IOS — VPN site-à-site", items:[
     {cmd:"crypto isakmp policy 10\n  encr aes 256\n  hash sha256\n  authentication pre-share\n  group 14\n  lifetime 86400", comment:"# Phase 1 IKEv1 — AES-256, SHA-256, DH groupe 14"},
     {cmd:"crypto isakmp key MonSecret address 203.0.113.2", comment:"# Clé pré-partagée pour le pair"},
     {cmd:"crypto ipsec transform-set TS-AES esp-aes 256 esp-sha256-hmac\n  mode tunnel", comment:"# Phase 2 — transform-set ESP AES-256"},
     {cmd:"crypto map VPN-MAP 10 ipsec-isakmp\n  set peer 203.0.113.2\n  set transform-set TS-AES\n  match address ACL-VPN", comment:"# Crypto map reliant tout ensemble"},
     {cmd:"interface GigabitEthernet0/0\n  crypto map VPN-MAP", comment:"# Appliquer sur l'interface WAN"},
     {cmd:"show crypto isakmp sa", comment:"# État des SA Phase 1"},
     {cmd:"show crypto ipsec sa", comment:"# État des SA Phase 2 (compteurs paquets)"}
   ]},
   {section:"Linux strongSwan — /etc/ipsec.conf", items:[
     {cmd:"conn site-to-site\n  left=192.168.1.1\n  leftsubnet=192.168.1.0/24\n  right=203.0.113.2\n  rightsubnet=10.0.0.0/24\n  ike=aes256-sha256-modp2048!\n  esp=aes256-sha256!\n  keyexchange=ikev2\n  authby=secret\n  auto=start", comment:"# Tunnel IKEv2 site-à-site"},
     {cmd:"ipsec up site-to-site", comment:"# Monter le tunnel"},
     {cmd:"ipsec status", comment:"# État des tunnels"},
     {cmd:"ipsec statusall", comment:"# Détail complet SA et compteurs"}
   ]}
 ],
 piege:"Sur Cisco, la crypto map doit être appliquée sur l'interface WAN (interface côté internet), PAS sur l'interface LAN. Une erreur fréquente consiste à l'appliquer sur la mauvaise interface, ce qui empêche tout établissement du tunnel.",
 retenir:"Phase1=isakmp policy. Phase2=transform-set. crypto map = lie tout. show crypto isakmp sa + ipsec sa = diagnostic. strongSwan = ipsec up + ipsec status.",
 keywords:["crypto map","transform-set","isakmp policy","show crypto ipsec sa","strongSwan","ipsec up","IKEv2","pre-share","VPN site-à-site","ESP","AES-256"]},

// ── SNMP V3 ──
{id:4301,cat:"superv",titre:"SNMP v3 — Supervision sécurisée",sub:"USM, auth/priv, MIB, OID, traps, walk",
 def:"SNMP (Simple Network Management Protocol) v3 est la version sécurisée du protocole de supervision réseau, intégrant authentification et chiffrement absents des versions 1 et 2c.",
 extra_table:[
   ["SNMPv1","community string (clair)","Aucun","Obsolète — à désactiver"],
   ["SNMPv2c","community string (clair)","Aucun","Encore très répandu — non sécurisé"],
   ["SNMPv3 noAuthNoPriv","username","Aucun","Mieux que v2c mais sans protection réelle"],
   ["SNMPv3 authNoPriv","HMAC-MD5 ou SHA","Aucun","Authentifié mais trafic en clair"],
   ["SNMPv3 authPriv","HMAC-SHA","AES ou DES","Recommandé — authentifié et chiffré"]
 ],
 extra_table_headers:["Version","Authentification","Chiffrement","Usage"],
 points:[
   "MIB (Management Information Base) : base de données hiérarchique décrivant les objets supervisables. Chaque objet a un OID (Object Identifier)",
   "OID : identifiant numérique hiérarchique ex: 1.3.6.1.2.1.1.1.0 = sysDescr (description du système)",
   "GET : récupérer la valeur d'un OID. GETNEXT/WALK : parcourir la MIB. SET : modifier une valeur. TRAP/INFORM : notification asynchrone de l'équipement vers le NMS",
   "USM (User-based Security Model) : modèle de sécurité SNMPv3 — définit utilisateur, mot de passe auth, mot de passe priv et algorithmes",
   "VACM (View-based Access Control Model) : contrôle quelles parties de la MIB chaque utilisateur peut lire/écrire",
   "Community string v1/v2c : équivalent d'un mot de passe en clair transmis avec chaque requête — 'public' et 'private' sont les valeurs par défaut à changer absolument"
 ],
 is_cmd:true,
 cmds:[
   {section:"Commandes snmpwalk et snmpget", items:[
     {cmd:"snmpwalk -v3 -u monuser -l authPriv -a SHA -A 'PassAuth!' -x AES -X 'PassPriv!' 192.168.1.1", comment:"# Walk SNMPv3 authPriv complet"},
     {cmd:"snmpget -v3 -u monuser -l authPriv -a SHA -A 'PassAuth!' -x AES -X 'PassPriv!' 192.168.1.1 1.3.6.1.2.1.1.1.0", comment:"# Récupérer sysDescr"},
     {cmd:"snmpwalk -v2c -c public 192.168.1.1 1.3.6.1.2.1.2.2", comment:"# Walk des interfaces (IF-MIB) en v2c"},
     {cmd:"snmptrap -v3 -u monuser -l authPriv ... 192.168.1.100 '' 1.3.6.1.6.3.1.1.5.3", comment:"# Envoyer un trap SNMPv3"}
   ]},
   {section:"Configuration Cisco SNMPv3", items:[
     {cmd:"snmp-server group MONGROUPE v3 priv", comment:"# Créer un groupe SNMPv3 authPriv"},
     {cmd:"snmp-server user MONUSER MONGROUPE v3 auth sha MonPassAuth priv aes 128 MonPassPriv", comment:"# Créer un utilisateur SNMPv3"},
     {cmd:"snmp-server host 192.168.1.100 version 3 priv MONUSER", comment:"# Envoyer les traps vers le NMS"},
     {cmd:"show snmp user", comment:"# Vérifier les utilisateurs SNMP"},
     {cmd:"show snmp group", comment:"# Vérifier les groupes et accès"}
   ]}
 ],
 piege:"SNMPv2c avec community 'public' en lecture et 'private' en écriture est encore présent sur des milliers d'équipements en production. L'accès en écriture SNMP permet de modifier la configuration d'un équipement réseau.",
 retenir:"SNMPv3 authPriv = seul mode vraiment sécurisé. USM = sécurité utilisateur. MIB = base objets. OID = identifiant. TRAP = notification async. Changer les community strings par défaut.",
 keywords:["SNMP","SNMPv3","USM","VACM","MIB","OID","authPriv","community string","snmpwalk","snmpget","trap","NMS","GET","SET","walk"]},

// ── DOCKER RÉSEAU ──
{id:4401,cat:"devops",titre:"Docker — Réseau et networking",sub:"bridge, host, overlay, macvlan, DNS interne, compose",
 def:"Docker propose plusieurs modes réseau pour connecter les conteneurs entre eux et avec l'extérieur. Comprendre ces modes est essentiel pour déployer des applications en production.",
 extra_table:[
   ["bridge","Réseau privé virtuel sur l'hôte","Défaut — isolation entre conteneurs, NAT vers l'extérieur","Cas général, développement"],
   ["host","Partage la stack réseau de l'hôte","Pas d'isolation réseau — performances maximales","Services haute performance (monitoring, proxy)"],
   ["overlay","Réseau multi-hôtes (Swarm)","Communication entre conteneurs sur différents hôtes","Docker Swarm, microservices distribués"],
   ["macvlan","Adresse MAC dédiée par conteneur","Le conteneur apparaît comme un équipement physique sur le LAN","IoT, legacy apps nécessitant une IP LAN directe"],
   ["none","Aucune interface réseau","Isolation totale","Traitements batch sans réseau"]
 ],
 extra_table_headers:["Mode","Principe","Caractéristique","Usage"],
 points:[
   "DNS interne Docker : sur un réseau bridge personnalisé, Docker fournit un DNS interne — les conteneurs se joignent par nom (ex: ping db fonctionne si le conteneur s'appelle 'db')",
   "Réseau bridge par défaut (docker0) : les conteneurs peuvent communiquer par IP mais PAS par nom — utiliser un réseau bridge personnalisé",
   "Port mapping : -p 8080:80 expose le port 80 du conteneur sur le port 8080 de l'hôte via iptables NAT",
   "Réseau overlay Swarm : chiffré par défaut (--opt encrypted), utilise VXLAN pour communiquer entre hôtes",
   "Docker Compose networks : chaque stack Compose crée automatiquement un réseau bridge nommé — tous les services de la stack peuvent se joindre par nom de service"
 ],
 is_cmd:true,
 cmds:[
   {section:"Gestion des réseaux Docker", items:[
     {cmd:"docker network ls", comment:"# Lister tous les réseaux"},
     {cmd:"docker network create --driver bridge mon-reseau", comment:"# Créer un réseau bridge personnalisé"},
     {cmd:"docker network create --driver overlay --attachable mon-overlay", comment:"# Réseau overlay Swarm"},
     {cmd:"docker network inspect mon-reseau", comment:"# Détails : sous-réseau, conteneurs connectés"},
     {cmd:"docker run -d --network mon-reseau --name app nginx", comment:"# Connecter un conteneur à un réseau"},
     {cmd:"docker network connect mon-reseau conteneur-existant", comment:"# Connecter un conteneur existant"}
   ]},
   {section:"Docker Compose — réseau", items:[
     {cmd:"services:\n  web:\n    image: nginx\n    networks: [frontend]\n  db:\n    image: postgres\n    networks: [frontend, backend]\nnetworks:\n  frontend:\n  backend:\n    internal: true", comment:"# Isolation par réseau dans Compose (backend=pas d'accès internet)"}
   ]}
 ],
 piege:"Sur le réseau bridge par défaut (docker0), la résolution DNS par nom de conteneur ne fonctionne PAS. Il faut créer un réseau bridge personnalisé pour bénéficier du DNS interne Docker — piège classique en dev.",
 retenir:"bridge=NAT+isolation. host=performances max. overlay=multi-hôtes Swarm. macvlan=IP LAN directe. DNS interne=réseau bridge PERSONNALISÉ uniquement. -p = port mapping.",
 keywords:["Docker","bridge","host","overlay","macvlan","docker network","DNS Docker","port mapping","docker0","Compose","VXLAN","Swarm","none"]},

// ── KUBERNETES BASICS ──
{id:4501,cat:"devops",titre:"Kubernetes — Concepts fondamentaux",sub:"Pod, Deployment, Service, Ingress, Namespace, ConfigMap",
 schema:`<svg viewBox="0 0 440 245" xmlns="http://www.w3.org/2000/svg"><defs><marker id="k8s-ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" class="sd-arrowhead"/></marker></defs><rect class="sd-box" x="150" y="8" width="140" height="30" rx="4"/><text class="sd-text" x="220" y="27">Utilisateur</text><line class="sd-arrow" x1="220" y1="38" x2="220" y2="56" marker-end="url(#k8s-ab)"/><rect class="sd-box-accent" x="150" y="56" width="140" height="28" rx="4"/><text class="sd-text-small" x="220" y="74">Ingress (routing HTTP/S)</text><line class="sd-arrow" x1="220" y1="84" x2="220" y2="102" marker-end="url(#k8s-ab)"/><rect class="sd-box-accent" x="150" y="102" width="140" height="28" rx="4"/><text class="sd-text-small" x="220" y="120">Service (ClusterIP)</text><rect class="sd-box" x="10" y="148" width="420" height="92" rx="6"/><text class="sd-label" x="220" y="162">Namespace / Cluster</text><rect class="sd-box" x="30" y="173" width="120" height="55" rx="4"/><text class="sd-text-small" x="90" y="193">Deployment</text><text class="sd-text-small" x="90" y="208">replicas: 3</text><rect class="sd-box-accent" x="170" y="173" width="80" height="55" rx="3"/><text class="sd-text-small" x="210" y="195">Pod A</text><text class="sd-text-small" x="210" y="210">Conteneur(s)</text><rect class="sd-box-accent" x="260" y="173" width="80" height="55" rx="3"/><text class="sd-text-small" x="300" y="195">Pod B</text><text class="sd-text-small" x="300" y="210">Conteneur(s)</text><rect class="sd-box-accent" x="350" y="173" width="65" height="55" rx="3"/><text class="sd-text-small" x="382" y="195">Pod C</text><text class="sd-text-small" x="382" y="210">Conteneur(s)</text><line class="sd-arrow" x1="220" y1="130" x2="210" y2="173" marker-end="url(#k8s-ab)"/><line class="sd-arrow" x1="220" y1="130" x2="300" y2="173" marker-end="url(#k8s-ab)"/><line class="sd-arrow" x1="220" y1="130" x2="382" y2="173" marker-end="url(#k8s-ab)"/></svg>`,
 def:"Kubernetes (K8s) est le système d'orchestration de conteneurs standard. Il automatise le déploiement, la mise à l'échelle et la gestion des applications conteneurisées.",
 points:[
   "Pod : unité de base de K8s — un ou plusieurs conteneurs partageant le même réseau (localhost) et le même stockage. Éphémère par nature",
   "Deployment : gère un ensemble de Pods identiques (replicas), assure la mise à jour progressive (rolling update) et le retour arrière (rollback)",
   "Service : expose un ensemble de Pods via une IP virtuelle stable (ClusterIP) et un DNS interne. Types : ClusterIP (interne), NodePort (port sur chaque nœud), LoadBalancer (cloud)",
   "Ingress : contrôleur HTTP/HTTPS exposant les Services vers l'extérieur avec routage par URL/host, TLS terminaison — remplace plusieurs LoadBalancers",
   "Namespace : isolation logique des ressources K8s — permet de séparer dev/staging/prod ou différentes équipes dans le même cluster",
   "ConfigMap / Secret : injecter de la configuration ou des credentials dans les Pods sans les coder en dur dans l'image",
   "PersistentVolume (PV) / PersistentVolumeClaim (PVC) : stockage persistant pour les Pods — nécessaire pour les bases de données",
   "Node : machine physique ou VM dans le cluster. Control Plane (master) : kube-apiserver, etcd, scheduler, controller-manager"
 ],
 piege:"Un Pod tué et recréé obtient une nouvelle IP — ne jamais pointer directement sur l'IP d'un Pod en production. Toujours utiliser un Service comme point d'accès stable, qui fait le load balancing vers les Pods.",
 retenir:"Pod=conteneurs colocalisés. Deployment=gestion replicas+rolling update. Service=IP stable vers Pods. Ingress=HTTP routing externe. Namespace=isolation. ConfigMap/Secret=config externe.",
 keywords:["Kubernetes","K8s","Pod","Deployment","Service","Ingress","Namespace","ConfigMap","Secret","PVC","ClusterIP","NodePort","LoadBalancer","rolling update","etcd"]},

{id:4502,cat:"devops",titre:"Kubernetes — Commandes kubectl",sub:"get, apply, describe, logs, exec, scale, rollout",
 is_cmd:true,
 def:"kubectl est l'outil CLI pour administrer un cluster Kubernetes. Maîtriser ses commandes est indispensable pour opérer K8s au quotidien.",
 cmds:[
   {section:"Ressources — lire et inspecter", items:[
     {cmd:"kubectl get pods -n mon-namespace", comment:"# Lister les pods d'un namespace"},
     {cmd:"kubectl get all -n mon-namespace", comment:"# Tout voir : pods, services, deployments…"},
     {cmd:"kubectl describe pod mon-pod -n mon-namespace", comment:"# Détails complets d'un pod (events, IP, volumes)"},
     {cmd:"kubectl get events --sort-by=.lastTimestamp -n mon-namespace", comment:"# Événements triés — diagnostic"},
     {cmd:"kubectl top pods -n mon-namespace", comment:"# Consommation CPU/RAM des pods (metrics-server requis)"}
   ]},
   {section:"Déploiement et mise à jour", items:[
     {cmd:"kubectl apply -f deployment.yaml", comment:"# Créer ou mettre à jour depuis un fichier YAML"},
     {cmd:"kubectl scale deployment mon-app --replicas=5 -n mon-namespace", comment:"# Scaler à 5 replicas"},
     {cmd:"kubectl rollout status deployment/mon-app -n mon-namespace", comment:"# Suivre l'avancement d'un déploiement"},
     {cmd:"kubectl rollout undo deployment/mon-app -n mon-namespace", comment:"# Rollback vers la version précédente"},
     {cmd:"kubectl set image deployment/mon-app app=monimage:v2 -n mon-namespace", comment:"# Mettre à jour l'image (rolling update)"}
   ]},
   {section:"Debug et logs", items:[
     {cmd:"kubectl logs mon-pod -n mon-namespace -f", comment:"# Logs en temps réel (follow)"},
     {cmd:"kubectl logs mon-pod -n mon-namespace --previous", comment:"# Logs du conteneur précédent (après crash)"},
     {cmd:"kubectl exec -it mon-pod -n mon-namespace -- bash", comment:"# Shell interactif dans un pod"},
     {cmd:"kubectl port-forward svc/mon-service 8080:80 -n mon-namespace", comment:"# Tunnel local vers un service K8s"}
   ]},
   {section:"Ressources YAML de base", items:[
     {cmd:"kubectl run test --image=busybox --rm -it -- sh", comment:"# Pod éphémère pour debug réseau"},
     {cmd:"kubectl get secret mon-secret -o jsonpath='{.data.password}' | base64 -d", comment:"# Décoder un secret K8s"},
     {cmd:"kubectl config get-contexts", comment:"# Voir les clusters/contextes disponibles"},
     {cmd:"kubectl config use-context mon-cluster", comment:"# Changer de cluster"}
   ]}
 ],
 piege:"kubectl delete pod mon-pod ne supprime PAS définitivement le pod si un Deployment le gère — le Deployment en recréera un immédiatement. Pour supprimer définitivement, supprimer le Deployment lui-même.",
 retenir:"apply -f = créer/MAJ. scale --replicas = monter en charge. rollout undo = rollback. logs -f = temps réel. exec -it = shell dans pod. port-forward = debug local. delete pod ≠ delete deployment.",
 keywords:["kubectl","apply","get pods","describe","logs","exec","scale","rollout","port-forward","rollback","set image","config use-context","top pods","namespace"]},

// ── ANSIBLE AVANCÉ ──
{id:4601,cat:"auto",titre:"Ansible avancé — Roles, Vault, Jinja2, handlers",sub:"Structure roles, variables chiffrées, templates, notifications",
 def:"Au-delà des playbooks simples, Ansible propose des fonctionnalités avancées pour organiser le code, sécuriser les secrets et gérer les notifications de changement.",
 is_cmd:true,
 cmds:[
   {section:"Structure d'un role Ansible", items:[
     {cmd:"ansible-galaxy init mon-role", comment:"# Créer la structure d'un role"},
     {cmd:"mon-role/\n  tasks/main.yml      # Tâches principales\n  handlers/main.yml   # Handlers (redémarrage service…)\n  templates/          # Templates Jinja2 (.j2)\n  vars/main.yml       # Variables du role\n  defaults/main.yml   # Variables par défaut (surchargeables)\n  files/              # Fichiers statiques à copier\n  meta/main.yml       # Métadonnées (dépendances)", comment:"# Structure complète d'un role"}
   ]},
   {section:"Handlers — notifications de changement", items:[
     {cmd:"# Dans tasks/main.yml :\n- name: Copier la config nginx\n  template:\n    src: nginx.conf.j2\n    dest: /etc/nginx/nginx.conf\n  notify: Restart nginx", comment:"# Déclenche le handler si changement"},
     {cmd:"# Dans handlers/main.yml :\n- name: Restart nginx\n  service:\n    name: nginx\n    state: restarted", comment:"# Handler exécuté une fois en fin de play si notifié"}
   ]},
   {section:"Ansible Vault — chiffrement des secrets", items:[
     {cmd:"ansible-vault create vars/secrets.yml", comment:"# Créer un fichier chiffré"},
     {cmd:"ansible-vault edit vars/secrets.yml", comment:"# Modifier un fichier chiffré"},
     {cmd:"ansible-vault encrypt_string 'MonMotDePasse' --name 'db_password'", comment:"# Chiffrer une variable inline"},
     {cmd:"ansible-playbook site.yml --ask-vault-pass", comment:"# Lancer avec demande du mot de passe vault"},
     {cmd:"ansible-playbook site.yml --vault-password-file ~/.vault_pass", comment:"# Lancer avec fichier de mot de passe"}
   ]},
   {section:"Templates Jinja2", items:[
     {cmd:"# nginx.conf.j2 :\nserver {\n    listen {{ nginx_port | default(80) }};\n    server_name {{ inventory_hostname }};\n    {% if ssl_enabled %}\n    ssl_certificate {{ ssl_cert_path }};\n    {% endif %}\n}", comment:"# Variables, filtres et conditions dans les templates"}
   ]}
 ],
 piege:"Les handlers ne s'exécutent qu'UNE SEULE fois à la fin du play, même si notifiés plusieurs fois. Si le play échoue avant la fin, les handlers ne s'exécutent PAS — utiliser 'meta: flush_handlers' pour forcer l'exécution intermédiaire.",
 retenir:"Role = structure organisée (tasks/handlers/templates/vars). Vault = chiffrement secrets. Handler = exécuté une fois en fin de play si notifié. Jinja2 = templates dynamiques avec {{ variable }}.",
 keywords:["Ansible","role","handler","notify","Vault","ansible-vault","Jinja2","template","defaults","vars","ansible-galaxy","flush_handlers","encrypt_string"]},

// ── NFS / SMB ──
{id:4701,cat:"admin",titre:"Partages réseau — NFS et SMB/CIFS",sub:"Montage NFS, Samba, /etc/fstab, permissions, Active Directory",
 is_cmd:true,
 def:"NFS (Network File System) et SMB/CIFS (Samba) sont les deux protocoles de partage de fichiers réseau les plus répandus en entreprise.",
 cmds:[
   {section:"NFS — Serveur Linux", items:[
     {cmd:"# /etc/exports :\n/data/partage 192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)", comment:"# Partager /data/partage sur le LAN"},
     {cmd:"exportfs -rav", comment:"# Appliquer les modifications de /etc/exports"},
     {cmd:"showmount -e 192.168.1.10", comment:"# Voir les exports d'un serveur NFS"},
     {cmd:"mount -t nfs 192.168.1.10:/data/partage /mnt/nfs", comment:"# Monter un partage NFS"},
     {cmd:"# /etc/fstab :\n192.168.1.10:/data/partage /mnt/nfs nfs defaults,_netdev 0 0", comment:"# Montage automatique au démarrage"}
   ]},
   {section:"Samba — Partage SMB/CIFS Linux→Windows", items:[
     {cmd:"# /etc/samba/smb.conf :\n[MonPartage]\n  path = /data/partage\n  valid users = @domaine\n  read only = no\n  browsable = yes\n  create mask = 0660\n  directory mask = 0770", comment:"# Définir un partage Samba"},
     {cmd:"testparm", comment:"# Vérifier la configuration smb.conf"},
     {cmd:"smbpasswd -a monuser", comment:"# Ajouter un utilisateur Samba"},
     {cmd:"net ads join -U Administrator", comment:"# Joindre Samba à un domaine AD"},
     {cmd:"smbclient //192.168.1.10/MonPartage -U user%password", comment:"# Tester l'accès au partage"}
   ]},
   {section:"Montage SMB depuis Linux", items:[
     {cmd:"mount -t cifs //192.168.1.10/Partage /mnt/smb -o username=user,password=pass,domain=CORP", comment:"# Monter un partage SMB/CIFS"},
     {cmd:"# /etc/fstab :\n//192.168.1.10/Partage /mnt/smb cifs credentials=/etc/samba/.creds,_netdev 0 0", comment:"# Montage automatique (credentials dans fichier)"}
   ]}
 ],
 piege:"NFS v3 ne gère PAS l'authentification utilisateur — la sécurité repose uniquement sur l'IP source. Sur un réseau non maîtrisé, utiliser NFSv4 avec Kerberos (krb5p) pour l'authentification et le chiffrement.",
 retenir:"NFS = /etc/exports + exportfs -rav. SMB/CIFS = smb.conf + testparm. Montage fstab = _netdev pour attendre le réseau. NFS v3 = sécurité par IP seulement. Samba = pont Linux/Windows.",
 keywords:["NFS","SMB","CIFS","Samba","/etc/exports","exportfs","smb.conf","testparm","mount","fstab","cifs","showmount","net ads join","_netdev"]},

// ── GPO AVANCÉES ──
{id:4801,cat:"ad",titre:"GPO avancées — Filtrage, loopback, RSOP, dépannage",sub:"WMI filter, loopback processing, gpresult, RSOP",
 is_cmd:true,
 def:"Au-delà de la création de GPO simples, la maîtrise du filtrage WMI, du mode loopback et des outils de diagnostic est indispensable en production.",
 cmds:[
   {section:"Diagnostic GPO — commandes essentielles", items:[
     {cmd:"gpresult /R", comment:"# Résumé des GPO appliquées à l'utilisateur/ordinateur courant"},
     {cmd:"gpresult /H C:\\gpo-report.html /F", comment:"# Rapport HTML détaillé de toutes les GPO appliquées"},
     {cmd:"gpresult /USER domaine\\user /R", comment:"# GPO pour un utilisateur spécifique"},
     {cmd:"gpupdate /force", comment:"# Forcer l'actualisation des GPO immédiatement"},
     {cmd:"gpupdate /force /logoff", comment:"# Forcer + déconnexion (nécessaire pour certaines GPO user)"},
     {cmd:"Get-GPResultantSetOfPolicy -ReportType Html -Path C:\\rsop.html", comment:"# RSOP PowerShell — rapport détaillé"}
   ]},
   {section:"Filtrage et ciblage", items:[
     {cmd:"# Filtrage de sécurité : par défaut 'Authenticated Users' — remplacer par un groupe AD spécifique", comment:""},
     {cmd:"# Filtrage WMI — exemples de requêtes :\nSELECT * FROM Win32_OperatingSystem WHERE Version LIKE '10.%'", comment:"# Cibler Windows 10/11 uniquement"},
     {cmd:"SELECT * FROM Win32_ComputerSystem WHERE Model LIKE '%Latitude%'", comment:"# Cibler les Dell Latitude"},
     {cmd:"# Loopback processing : applique les GPO ordinateur à la session utilisateur\n# Mode Replace : remplace les GPO user par celles de l'OU ordinateur\n# Mode Merge : fusionne GPO user + GPO ordinateur (ordinateur en priorité)", comment:""}
   ]},
   {section:"GPO PowerShell", items:[
     {cmd:"Get-GPO -All | Select DisplayName,GpoStatus", comment:"# Lister toutes les GPO et leur état"},
     {cmd:"Get-GPOReport -Name 'Ma GPO' -ReportType Html -Path C:\\gpo.html", comment:"# Rapport HTML d'une GPO"},
     {cmd:"New-GPO -Name 'Nouvelle GPO' | New-GPLink -Target 'OU=Postes,DC=corp,DC=local'", comment:"# Créer et lier une GPO en une ligne"},
     {cmd:"Backup-GPO -All -Path C:\\GPO-Backup", comment:"# Sauvegarder toutes les GPO"},
     {cmd:"Restore-GPO -Name 'Ma GPO' -Path C:\\GPO-Backup", comment:"# Restaurer une GPO depuis une sauvegarde"}
   ]}
 ],
 piege:"gpresult /R montre les GPO appliquées mais PAS les GPO refusées par filtrage de sécurité ou WMI. Utiliser gpresult /H pour le rapport HTML complet qui indique les GPO refusées et pourquoi.",
 retenir:"gpresult /H = rapport complet. gpupdate /force = appliquer immédiatement. Filtrage sécurité = groupe AD. Filtrage WMI = requête WQL. Loopback = GPO ordinateur sur session user. Backup-GPO = sauvegarder.",
 keywords:["GPO","gpresult","gpupdate","RSOP","WMI filter","loopback processing","filtrage sécurité","Get-GPO","Backup-GPO","New-GPLink","Group Policy","GPOReport"]},

{id:4901,cat:"sisr",titre:"RAID — Niveaux et tolérance de panne",sub:"RAID 0/1/5/6/10, parité, reconstruction",
 schema:`<svg viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg"><text class="sd-label" x="110" y="14">RAID 0 — Stripe</text><rect class="sd-box" x="20" y="25" width="80" height="70" rx="4"/><text class="sd-text-small" x="60" y="45">Disque 1</text><text class="sd-text-small" x="60" y="60">A1</text><text class="sd-text-small" x="60" y="75">A3</text><rect class="sd-box" x="115" y="25" width="80" height="70" rx="4"/><text class="sd-text-small" x="155" y="45">Disque 2</text><text class="sd-text-small" x="155" y="60">A2</text><text class="sd-text-small" x="155" y="75">A4</text><text class="sd-text-small" x="110" y="105">Perf x2 · 0 tolérance (1 panne = tout perdu)</text><text class="sd-label" x="330" y="14">RAID 1 — Mirror</text><rect class="sd-box" x="240" y="25" width="80" height="70" rx="4"/><text class="sd-text-small" x="280" y="45">Disque 1</text><text class="sd-text-small" x="280" y="60">A1</text><text class="sd-text-small" x="280" y="75">A2</text><rect class="sd-box-accent" x="335" y="25" width="80" height="70" rx="4"/><text class="sd-text-small" x="375" y="45">Disque 2</text><text class="sd-text-small" x="375" y="60">A1</text><text class="sd-text-small" x="375" y="75">A2</text><text class="sd-text-small" x="330" y="105">Copie identique · tolère 1 panne · capacité=1 disque</text><text class="sd-label" x="110" y="130">RAID 5 — Parité répartie</text><rect class="sd-box" x="15" y="140" width="62" height="60" rx="4"/><text class="sd-text-small" x="46" y="158">D1</text><text class="sd-text-small" x="46" y="173">A1</text><text class="sd-text-small" x="46" y="188">B2</text><rect class="sd-box" x="82" y="140" width="62" height="60" rx="4"/><text class="sd-text-small" x="113" y="158">D2</text><text class="sd-text-small" x="113" y="173">A2</text><text class="sd-text-small" x="113" y="188">Pb</text><rect class="sd-box-accent" x="149" y="140" width="62" height="60" rx="4"/><text class="sd-text-small" x="180" y="158">D3</text><text class="sd-text-small" x="180" y="173">Pa</text><text class="sd-text-small" x="180" y="188">B1</text><text class="sd-text-small" x="110" y="215">Parité tournante · tolère 1 panne · capacité=(N-1)</text><text class="sd-label" x="330" y="130">RAID 10 — Mirror+Stripe</text><rect class="sd-box" x="240" y="140" width="42" height="60" rx="3"/><text class="sd-text-small" x="261" y="158">D1</text><text class="sd-text-small" x="261" y="173">A1</text><rect class="sd-box-accent" x="286" y="140" width="42" height="60" rx="3"/><text class="sd-text-small" x="307" y="158">D2</text><text class="sd-text-small" x="307" y="173">A1</text><rect class="sd-box" x="332" y="140" width="42" height="60" rx="3"/><text class="sd-text-small" x="353" y="158">D3</text><text class="sd-text-small" x="353" y="173">A2</text><rect class="sd-box-accent" x="378" y="140" width="42" height="60" rx="3"/><text class="sd-text-small" x="399" y="158">D4</text><text class="sd-text-small" x="399" y="173">A2</text><text class="sd-text-small" x="330" y="215">2 paires miroir, données stripées · capacité=N/2</text></svg>`,
 def:"Le RAID (Redundant Array of Independent Disks) combine plusieurs disques pour améliorer la performance et/ou la tolérance aux pannes.",
 points:["RAID 0 (striping) : répartition des données sur N disques — performance x2+ mais 0 tolérance, panne = perte totale","RAID 1 (mirroring) : duplication intégrale sur 2 disques, tolère 1 panne, capacité = 1 disque","RAID 5 : parité répartie sur N disques (min 3), tolère 1 panne, capacité = (N-1) disques","RAID 6 : parité double, tolère 2 pannes simultanées, capacité = (N-2) disques","RAID 10 : mirroring + striping (min 4 disques), bon compromis perf/tolérance, capacité = N/2","RAID logiciel (mdadm, LVM, Storage Spaces) vs RAID matériel (carte contrôleur dédiée avec cache)"],
 piege:"Le RAID n'est PAS une sauvegarde : il protège contre la panne disque, pas contre une suppression accidentelle, une corruption logique ou un ransomware. De plus, la reconstruction (rebuild) d'un RAID 5 est longue et sollicite fortement les disques restants — risque accru de 2e panne pendant cette fenêtre.",
 retenir:"RAID0=perf seule (0 tolérance). RAID1=miroir (1 panne, capacité÷2). RAID5=parité simple (1 panne, capacité=N-1). RAID6=parité double (2 pannes). RAID10=miroir+stripe. RAID ≠ sauvegarde.",
 keywords:["RAID 0","RAID 1","RAID 5","RAID 6","RAID 10","parité","mirroring","striping","mdadm","tolérance de panne","hot spare","rebuild"]},

{id:4902,cat:"linux",titre:"Sauvegarde Linux — rsync, tar, cron",sub:"Archivage, synchronisation incrémentale, planification",
 def:"La sauvegarde sous Linux repose sur des outils en ligne de commande simples, combinés via des scripts shell et planifiés avec cron.",
 points:["tar -czvf archive.tar.gz /dossier : archive compressée complète (c=créer, z=gzip, v=verbose, f=fichier)","tar -xzvf archive.tar.gz -C /destination : extraction d'une archive","rsync -avz source/ destination/ : synchronisation incrémentale (a=archive, v=verbose, z=compression) — ne copie que les différences","rsync --delete : supprime côté destination les fichiers absents de la source → crée un miroir exact","rsync sur SSH : rsync -avz -e ssh user@host:/chemin/ /local/ — transfert chiffré vers un serveur distant","crontab -e : édite les tâches planifiées. Format : minute heure jour-du-mois mois jour-semaine commande","Exemple : 0 2 * * * rsync -a /data/ /backup/ → sauvegarde quotidienne à 2h du matin","logrotate : gère automatiquement la rotation, compression et purge des fichiers de logs/archives"],
 piege:"rsync --delete supprime définitivement côté destination ce qui n'existe plus côté source. Si la source est corrompue ou si le sens source/destination est inversé par erreur, la sauvegarde est détruite. Toujours tester avec --dry-run avant d'exécuter pour de vrai.",
 retenir:"tar = archive/compression ponctuelle. rsync = synchronisation incrémentale rapide (--delete = miroir exact). cron = planification (min heure jour mois jour_sem cmd). Toujours --dry-run avant --delete.",
 keywords:["rsync","tar","cron","crontab","logrotate","--delete","--dry-run","sauvegarde Linux","incrémentale","gzip","SSH"]},

{id:4903,cat:"reseau",titre:"VLSM — Sous-réseaux à taille variable",sub:"Découpage optimisé, CIDR, sommarisation",
 def:"Le VLSM (Variable Length Subnet Masking) permet de découper un réseau en sous-réseaux de tailles différentes adaptées au besoin réel de chaque segment, évitant le gaspillage d'adresses IP.",
 points:["Méthode : lister les besoins en hôtes par sous-réseau, trier du PLUS GRAND au plus petit, puis allouer les blocs dans cet ordre","Formule : hôtes utilisables = 2^(nb bits hôte) − 2 (on retire l'adresse réseau et l'adresse de broadcast)","Exemple sur 192.168.1.0/24 avec besoins de 100, 50, 20 et 10 hôtes : /25 (126 hôtes), /26 (62 hôtes), /27 (30 hôtes), /28 (14 hôtes)","L'adresse réseau du bloc suivant = adresse réseau précédente + taille du bloc précédent","Notation CIDR /xx équivalente au masque décimal : /24 = 255.255.255.0, /25 = 255.255.255.128, /26 = 255.255.255.192…","Sommarisation (agrégation de routes) = opération inverse de VLSM : regrouper plusieurs sous-réseaux contigus en une seule route pour alléger les tables de routage"],
 piege:"Oublier de retirer 2 adresses (réseau + broadcast) lors du calcul du nombre d'hôtes utilisables, ou allouer les petits blocs en premier ce qui fragmente l'espace et empêche d'aligner correctement les plus grands blocs ensuite.",
 retenir:"Trier du plus grand au plus petit besoin avant d'allouer. Hôtes utilisables = 2^(bits hôte)−2. /24=255.255.255.0. Sommarisation = regrouper plusieurs réseaux contigus en une route.",
 keywords:["VLSM","CIDR","subnetting","masque de sous-réseau","sommarisation","agrégation de routes","hôtes utilisables","adresse de broadcast"]},

{id:4904,cat:"reseauavance",titre:"MPLS & SD-WAN",sub:"Label switching, VRF, overlay, failover",
 schema:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect class="sd-box-accent" x="170" y="8" width="100" height="34" rx="6"/><text class="sd-text" x="220" y="22">Contrôleur</text><text class="sd-text-small" x="220" y="35">SD-WAN (orchestration)</text><rect class="sd-box" x="20" y="90" width="110" height="50" rx="4"/><text class="sd-text" x="75" y="108">Site A</text><text class="sd-text-small" x="75" y="123">Edge SD-WAN</text><rect class="sd-box" x="165" y="90" width="110" height="50" rx="4"/><text class="sd-text" x="220" y="108">Site B</text><text class="sd-text-small" x="220" y="123">Edge SD-WAN</text><rect class="sd-box" x="310" y="90" width="110" height="50" rx="4"/><text class="sd-text" x="365" y="108">Site C</text><text class="sd-text-small" x="365" y="123">Edge SD-WAN</text><line class="sd-box sd-dash" x1="220" y1="42" x2="75" y2="90"/><line class="sd-box sd-dash" x1="220" y1="42" x2="220" y2="90"/><line class="sd-box sd-dash" x1="220" y1="42" x2="365" y2="90"/><line class="sd-box" x1="130" y1="112" x2="165" y2="112"/><text class="sd-text-small" x="147" y="108">MPLS</text><line class="sd-box" x1="130" y1="130" x2="165" y2="130"/><text class="sd-text-small" x="147" y="143">Internet</text><line class="sd-box" x1="275" y1="115" x2="310" y2="115"/><text class="sd-text-small" x="292" y="108">4G/5G</text><text class="sd-label" x="220" y="170">Tunnels overlay chiffrés (IPsec) sur tous les liens disponibles</text><text class="sd-label" x="220" y="185">Le contrôleur pousse les politiques de routage selon QoS/latence</text></svg>`,
 def:"MPLS et SD-WAN sont deux technologies WAN utilisées pour interconnecter des sites distants, avec des approches très différentes.",
 points:["MPLS (MultiProtocol Label Switching) : insère un label entre les couches 2 et 3, les routeurs cœur commutent selon ce label sans relire l'en-tête IP complet — plus rapide que le routage IP classique","Label Edge Router (LER) : ajoute/retire le label en entrée/sortie du réseau opérateur. Label Switch Router (LSR) : commute uniquement selon le label","MPLS VPN : isole le trafic de plusieurs clients sur l'infrastructure mutualisée de l'opérateur via des VRF (Virtual Routing and Forwarding)","SD-WAN : couche logicielle qui choisit dynamiquement le meilleur lien (MPLS, Internet, 4G/5G) selon des critères de QoS, latence, perte de paquets","SD-WAN apporte chiffrement natif, failover automatique entre liens, et réduit la dépendance au MPLS souvent coûteux","Architecture SD-WAN : un contrôleur central pousse les politiques vers des appliances 'edge' sur chaque site, qui établissent des tunnels overlay (généralement IPsec)"],
 piege:"SD-WAN ne remplace pas toujours MPLS pour les applications critiques temps réel (voix, ToIP) qui exigent une QoS garantie de bout en bout. En pratique, on déploie souvent un modèle hybride : MPLS conservé pour le trafic critique + Internet/4G géré par SD-WAN pour le reste.",
 retenir:"MPLS = commutation par labels, rapide mais coûteux, QoS garantie par l'opérateur. SD-WAN = orchestration logicielle multi-liens, chiffré, failover automatique. Hybride MPLS+SD-WAN = solution courante en entreprise.",
 keywords:["MPLS","SD-WAN","label switching","LER","LSR","VRF","overlay","IPsec","WAN","failover","QoS"]},

{id:4905,cat:"cloud",titre:"AWS & Azure — Services essentiels et équivalences",sub:"EC2/VM, S3/Blob, VPC/VNet, IAM, conteneurs",
 extra_table:[
   ["Calcul (VM)","EC2","Virtual Machines"],
   ["Stockage objet","S3","Blob Storage"],
   ["Réseau virtuel","VPC","VNet"],
   ["Identité & accès","IAM","Azure AD / Entra ID"],
   ["Conteneurs orchestrés","EKS","AKS"],
   ["Fonctions serverless","Lambda","Azure Functions"],
   ["Base de données managée","RDS","Azure SQL Database"],
   ["DNS managé","Route 53","Azure DNS"]
 ],
 def:"AWS et Azure sont les deux principaux fournisseurs de cloud public. Connaître les équivalences entre leurs services facilite la transition entre plateformes et la lecture de documentation.",
 points:["Le modèle de responsabilité partagée s'applique sur les deux plateformes (voir fiche IaaS/PaaS/SaaS)","Régions et zones de disponibilité (AZ) : répartir les ressources sur plusieurs AZ d'une région pour la haute disponibilité","IAM (AWS) / Entra ID (Azure) : appliquer le principe du moindre privilège via des rôles plutôt que des comptes/clés partagés","Stockage objet (S3/Blob) : accès via API HTTP/HTTPS, avec des classes de stockage (chaud, froid/cool, archive) selon la fréquence d'accès","Réseaux virtuels (VPC/VNet) : sous-réseaux, security groups (AWS) / NSG (Azure), peering entre réseaux virtuels","Infrastructure as Code (Terraform, CloudFormation, ARM/Bicep) : déployer ces ressources de façon reproductible et versionnée"],
 piege:"Les security groups AWS sont STATEFUL par défaut (le trafic de réponse est autorisé automatiquement), alors que les NACL (Network ACL) sont STATELESS (il faut autoriser explicitement l'aller ET le retour). Confondre les deux couches de filtrage est une erreur fréquente.",
 retenir:"EC2≈Virtual Machines, S3≈Blob Storage, VPC≈VNet, IAM≈Entra ID, Lambda≈Azure Functions, EKS≈AKS, RDS≈Azure SQL Database. Toujours : moindre privilège + plusieurs AZ pour la haute disponibilité.",
 keywords:["AWS","Azure","EC2","S3","VPC","IAM","Lambda","EKS","AKS","Blob Storage","VNet","Entra ID","security group","NACL","Terraform","haute disponibilité","région","zone de disponibilité"]}

];
