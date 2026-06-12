// ════════════════════════════════════════════════
// FICHES — Données de révision
// Ajouter de nouvelles fiches ici, jamais dans index.html
// ════════════════════════════════════════════════

const FICHES = [
// ────────────────────────────────────────────────────────
// RÉSEAU
// ────────────────────────────────────────────────────────
{id:101,cat:"reseau",titre:"Le protocole DHCP",sub:"DORA, bail, ports UDP 67/68",
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
 def:"Modèles de référence décrivant comment les données transitent sur un réseau en couches distinctes.",
 points:["OSI 7 couches : Physique, Liaison, Réseau, Transport, Session, Présentation, Application","TCP/IP 4 couches : Accès réseau, Internet, Transport, Application","PDU : bit (1), trame (2), paquet (3), segment TCP / datagramme UDP (4)","Encapsulation descendante, désencapsulation montante","Switch L2 = couche 2, routeur = couche 3, pare-feu = souvent couche 3/4/7","Proxy/WAF = couche 7 (application)"],
 piege:"Switch = couche 2. Routeur = couche 3. Un IPS inline peut agir jusqu'en couche 7.",
 retenir:"OSI 7 couches. TCP/IP 4 couches. PDU = trame (L2), paquet (L3), segment (L4).",
 keywords:["OSI","TCP/IP","encapsulation","PDU","couche 2","couche 3","switch","routeur","WAF","proxy"]},

{id:105,cat:"reseau",titre:"VLAN & Trunking 802.1Q",sub:"Segmentation logique, trunk, VLAN natif",
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
 def:"STP (Spanning Tree Protocol) prévient les boucles dans un réseau commuté en désactivant logiquement des liens redondants.",
 points:["Election du Root Bridge : le switch avec le plus petit Bridge ID (priorité + MAC) devient Root","Ports Root : chaque switch (non-Root) a un port vers le Root. Port désigné = port actif sur chaque segment","Port bloqué (Blocking) = ports redondants désactivés par STP pour éviter les boucles","STP classique (802.1D) : convergence lente (30-50 secondes). RSTP (802.1w) = convergence rapide (1-2 s)","PVST+ = Cisco Rapid PVST+ = STP par VLAN","Commande : 'spanning-tree mode rapid-pvst'"],
 piege:"Si STP est désactivé sur un réseau avec des liens redondants, une tempête de broadcast peut paralyser tout le réseau en secondes.",
 retenir:"STP = anti-boucle. Root Bridge = plus petit Bridge ID. RSTP = rapide. PortFast = bypass STP pour postes clients.",
 keywords:["STP","RSTP","Root Bridge","Bridge ID","blocking","Rapid PVST+","PortFast","boucle","convergence","802.1w"]},

{id:207,cat:"cisco",titre:"Cisco — NAT & PAT",sub:"Traduction d'adresses, surcharge",
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

{id:503,cat:"devops",titre:"Kubernetes (K8s) — Fondamentaux",sub:"Pods, services, déploiements",
 def:"Kubernetes est un orchestrateur de conteneurs open-source qui automatise le déploiement, la mise à l'échelle et la gestion des applications conteneurisées.",
 points:["Pod = plus petite unité K8s, contient 1 ou plusieurs conteneurs partageant le réseau et le stockage","Deployment = décrit l'état désiré (réplicas, image) et K8s le maintient automatiquement","Service = expose un groupe de pods avec une IP stable et du load balancing","Namespace = isolation logique des ressources (prod, staging, dev)","Ingress = point d'entrée HTTP/HTTPS vers les services K8s avec routage par hostname/path","kubectl = outil CLI de gestion du cluster"],
 piege:"Les pods sont éphémères. Ne jamais stocker des données importantes dans un pod sans PersistentVolume (PV). Les IP des pods changent à chaque redémarrage.",
 retenir:"Pod = conteneurs. Deployment = état désiré. Service = IP stable. Ingress = HTTP routing. kubectl = outil de contrôle.",
 keywords:["Kubernetes","K8s","pod","deployment","service","namespace","ingress","kubectl","réplicas","PersistentVolume","helm"]},

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
{id:801,cat:"admin",titre:"Virtualisation & Hyperviseurs",sub:"Type 1, Type 2, conteneurs, VMware",
 def:"La virtualisation permet de faire tourner plusieurs systèmes d'exploitation sur un seul serveur physique grâce à un hyperviseur.",
 points:["Hyperviseur Type 1 (bare-metal) : installé directement sur le matériel — VMware ESXi, Hyper-V, Proxmox","Hyperviseur Type 2 (hosted) : s'exécute dans un OS hôte — VirtualBox, VMware Workstation","Conteneur (Docker) : partage le noyau de l'hôte, plus léger, démarrage instantané","Snapshot = sauvegarde de l'état complet d'une VM à un instant T (impact performance en production)","Live migration (vMotion VMware) : déplacer une VM entre hôtes sans interruption","HA (High Availability) : redémarrage automatique des VMs si l'hôte physique tombe"],
 piege:"Type 1 ≠ Type 2. Type 1 = directement sur le hardware (plus performant, usage production). Type 2 = au-dessus d'un OS (plus pratique en desktop/lab).",
 retenir:"Type 1 = bare-metal (ESXi, Hyper-V). Type 2 = hosted (VirtualBox). Docker = plus léger qu'une VM. Snapshot ≠ sauvegarde fiable.",
 keywords:["hyperviseur","type 1","type 2","ESXi","Hyper-V","Docker","conteneur","snapshot","vMotion","Proxmox","HA"]},

{id:802,cat:"admin",titre:"Active Directory — Bases",sub:"Domaine, OU, GPO, Kerberos",
 def:"Active Directory (AD) est le service d'annuaire Microsoft qui centralise la gestion des identités et des ressources dans un réseau Windows.",
 points:["Domaine = unité d'administration de base. OU = conteneur logique pour organiser les objets","GPO (Group Policy Object) = règles appliquées automatiquement aux objets d'une OU","DC (Domain Controller) = serveur qui héberge AD DS et centralise l'authentification Kerberos","LDAP = protocole d'interrogation de l'AD (port 389 / 636 pour LDAPS chiffré)","Kerberos port 88 = protocole d'authentification par tickets (TGT → TGS)","Forêt > Domaine > OU — la forêt est l'unité d'administration la plus haute (relations d'approbation)"],
 piege:"GPO liée au domaine = s'applique à TOUT le domaine. GPO liée à une OU = seulement les objets de cette OU.",
 retenir:"AD = annuaire centralisé. DC = serveur AD. OU = conteneur. GPO = règles auto. LDAP port 389. Kerberos port 88.",
 keywords:["Active Directory","OU","GPO","DC","LDAP","LDAPS","Kerberos","forêt","domaine","port 389","port 88"]},

{id:803,cat:"admin",titre:"Sauvegarde & PRA/PCA",sub:"3-2-1, RTO, RPO, stratégies",
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
 def:"ARP (Address Resolution Protocol) résout les adresses IP en adresses MAC au niveau de la couche 2 du modèle OSI.",
 points:["ARP Request : broadcast 'Qui a l'IP X ?' — ARP Reply : 'C'est moi, voilà ma MAC'","Table ARP locale : cache des correspondances IP↔MAC avec TTL court","Gratuitous ARP : une machine annonce sa propre IP pour mettre à jour le cache des autres","ARP Spoofing / Poisoning : un attaquant répond à des requêtes ARP avec sa propre MAC pour intercepter le trafic (MITM)","IPv6 remplace ARP par NDP (Neighbor Discovery Protocol) — message NS/NA","Contre-mesures : DAI (Dynamic ARP Inspection) sur les switches, segmentation VLAN"],
 piege:"La table ARP est dynamique et non authentifiée. N'importe quel hôte peut envoyer un ARP Reply non sollicité pour empoisonner le cache d'un autre.",
 retenir:"ARP = IP→MAC. Gratuitous ARP = auto-annonce. ARP Spoofing = MITM L2. DAI = protection switch.",
 keywords:["ARP","MAC","RARP","ARP spoofing","gratuitous ARP","DAI","MITM","cache ARP","NDP","broadcast"]},

{id:108,cat:"reseau",titre:"Protocoles de transport — TCP vs UDP",sub:"3-way handshake, flags, fiabilité",
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
 keywords:["iptables","ACCEPT","DROP","MASQUERADE","DNAT","SNAT","ip_forward","ESTABLISHED","RELATED","INPUT","OUTPUT","FORWARD","nat"]}

];

// ═══════════════════════════════════════════
// LABELS & CONFIG
// ═══════════════════════════════════════════
const catLabels = {
  reseau:"Réseau", admin:"Admin système", secu:"Sécurité", methodo:"Méthodologie",
  reglem:"Réglementation", ebios:"EBIOS RM", wef:"WEF / Logs",
  proto:"Protocoles", ad:"Sécurité AD", crypto:"Cryptographie",
  norme:"Normes", superv:"Supervision", linux:"Linux", windows:"Windows",
  cloud:"Cloud", ia:"IA & Cyber", cisco:"Cisco IOS", hacking:"Pentest/Hacking",
  devops:"DevOps", bdd:"Bases de données", web:"Sécurité Web", reseauavance:"Réseau Avancé"
};

const catOrder = ["reseau","cisco","reseauavance","admin","secu","methodo","reglem","ebios","wef",
                  "proto","ad","crypto","norme","superv","cloud","ia","hacking","devops","bdd","web","linux","windows"];

let seen = new Set();
