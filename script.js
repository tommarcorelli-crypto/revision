// script.js — Logique applicative
// Les données (fiches) sont chargées depuis data.js via fetch()

let FICHES = []; // Sera rempli au chargement


// ═══════════════════════════════════════════
// LABELS & CONFIG
// ═══════════════════════════════════════════
const catLabels = {
  reseau:"Réseau", admin:"Admin système", secu:"Sécurité", methodo:"Méthodologie",
  reglem:"Réglementation", ebios:"EBIOS RM", wef:"WEF / Logs",
  proto:"Protocoles", ad:"Sécurité AD", crypto:"Cryptographie",
  norme:"Normes", superv:"Supervision", linux:"Linux", windows:"Windows",
  cloud:"Cloud", ia:"IA & Cyber", cisco:"Cisco IOS", hacking:"Pentest/Hacking",
  devops:"DevOps", bdd:"Bases de données", web:"Sécurité Web", reseauavance:"Réseau Avancé",
  general:"Info générale", sisr:"SISR", auto:"Automatisation",
  wifi:"Wi-Fi", proxmox:"Proxmox VE", virt:"Virtualisation réseau"
};

const catOrder = ["reseau","cisco","reseauavance","admin","secu","methodo","reglem","ebios","wef",
                  "proto","ad","crypto","norme","superv","cloud","ia","hacking","devops","bdd","web","linux","windows",
                  "wifi","proxmox","virt","general","sisr","auto"];

let seen = new Set();
let levels = {}; // id -> 1..5
let currentFilter = "all";
let filteredList = [];
let weakFilterOn = false;

// ─── Persistence ───
function saveSeen() {
  try { localStorage.setItem("revision_seen", JSON.stringify([...seen])); } catch(e){}
}
function loadSeen() {
  try {
    const s = localStorage.getItem("revision_seen");
    if (s) seen = new Set(JSON.parse(s));
  } catch(e){}
}
function saveLevels() {
  try { localStorage.setItem("revision_levels", JSON.stringify(levels)); } catch(e){}
}
function loadLevels() {
  try {
    const s = localStorage.getItem("revision_levels");
    if (s) levels = JSON.parse(s);
  } catch(e){}
}
function saveQuizBest(pct) {
  try {
    const prev = parseInt(localStorage.getItem("revision_quiz_best") || "0");
    if (pct > prev) localStorage.setItem("revision_quiz_best", pct);
  } catch(e){}
}
function loadQuizBest() {
  try { return localStorage.getItem("revision_quiz_best") || null; } catch(e){ return null; }
}

// ─── Reset modal ───
function openReset() {
  document.getElementById("reset-modal").classList.add("open");
}
function closeReset() {
  document.getElementById("reset-modal").classList.remove("open");
}
function confirmReset() {
  if (document.getElementById("reset-seen").checked) {
    seen = new Set();
    levels = {};
    try { localStorage.removeItem("revision_seen"); localStorage.removeItem("revision_levels"); } catch(e){}
  }
  if (document.getElementById("reset-quiz").checked) {
    try { localStorage.removeItem("revision_quiz_best"); } catch(e){}
    document.getElementById("stat-quiz").textContent = "—";
  }
  closeReset();
  updateProgress();
  renderCards();
  if (document.getElementById("stats-view").style.display !== "none") renderStats();
}

// ─── Dark mode ───
function toggleDark() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "" : "dark");
  document.getElementById("dark-toggle").textContent = isDark ? "🌙" : "☀️";
  try { localStorage.setItem("revision_dark", isDark ? "0" : "1"); } catch(e){}
}
function loadDark() {
  try {
    if (localStorage.getItem("revision_dark") === "1") {
      document.documentElement.setAttribute("data-theme","dark");
      document.getElementById("dark-toggle").textContent = "☀️";
    }
  } catch(e){}
}

// ─── Keyboard shortcuts ───
document.addEventListener("keydown", e => {
  // Escape ferme les modals
  if (e.key === "Escape") {
    if (document.getElementById("reset-modal").classList.contains("open")) { closeReset(); return; }
    closeDetail();
  }
  // Navigation dans le panel fiche
  if (document.getElementById("overlay").classList.contains("open")) {
    if (e.key === "ArrowRight") {
      const nx = document.querySelector(".nav-btn:last-child:not(:disabled)");
      if (nx) nx.click();
    }
    if (e.key === "ArrowLeft") {
      const pv = document.querySelector(".nav-btn:first-child:not(:disabled)");
      if (pv) pv.click();
    }
    // Touches 1-5 pour le niveau de maîtrise
    if (["1","2","3","4","5"].includes(e.key)) {
      const lvl = parseInt(e.key);
      const lvBtn = document.querySelectorAll(".level-btn")[lvl-1];
      if (lvBtn) lvBtn.click();
    }
  }
  // Flashcards
  if (document.getElementById("flashcard-view").style.display !== "none") {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipCard(); }
    if (e.key === "ArrowRight") fcNavigate(1);
    if (e.key === "ArrowLeft") fcNavigate(-1);
  }
  // Quiz — touches 1-4 pour répondre, Enter pour suivant
  if (document.getElementById("quiz-view").style.display !== "none") {
    if (["1","2","3","4"].includes(e.key)) {
      const idx = parseInt(e.key) - 1;
      const opts = document.querySelectorAll(".quiz-opt:not(:disabled)");
      if (opts[idx]) opts[idx].click();
    }
    if (e.key === "Enter") {
      const nxt = document.getElementById("quiz-next");
      if (nxt && nxt.style.display !== "none") nxt.click();
    }
  }
});

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
// TERMINAL SIMULÉ
// ═══════════════════════════════════════════
const TERM_SHELLS = {
  linux: {
    label: "🐧 Linux/Bash",
    prompt: "user@linux:~$",
    color: "#86efac",
    intro: [
      {t:"ok", s:"Bienvenue dans le terminal Linux simulé !"},
      {t:"info", s:"Tape 'help' pour voir les commandes disponibles."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES DISPONIBLES ==="},
        {t:"ok",s:"Navigation : ls, pwd, cd, cat, find, grep"},
        {t:"ok",s:"Réseau : ip a, ip r, ss -tulnp, ping, dig, nmap, netstat"},
        {t:"ok",s:"Processus : ps aux, top, kill, nice"},
        {t:"ok",s:"Sécurité : chmod, chown, sudo -l, last, lastb"},
        {t:"ok",s:"Services : systemctl status/start/stop/enable"},
        {t:"ok",s:"Logs : tail -f, journalctl, grep"},
        {t:"ok",s:"Forensique : find -perm -4000, sha256sum, lsof, history"},
        {t:"ok",s:"Paquets : apt update, apt install, dpkg -l"},
        {t:"ok",s:"LVM : pvs, vgs, lvs"},
        {t:"ok",s:"Multi-distro : apk add/update (Alpine), pacman -Syu/-S (Arch), dnf install (CentOS/RHEL), rc-service (OpenRC)"},
        {t:"ok",s:"Autres : uname, uptime, df -h, free -h, whoami, id, env"},
        {t:"info",s:"Tape 'clear' pour vider l'écran."}
      ],
      "ls": () => [{t:"ok",s:"total 48"},{t:"ok",s:"drwxr-xr-x 2 user user 4096 jun 12 09:00 Documents"},{t:"ok",s:"drwxr-xr-x 2 user user 4096 jun 12 08:30 Downloads"},{t:"ok",s:"-rw-r--r-- 1 user user  220 jun 12 08:00 .bash_profile"},{t:"ok",s:"-rw-r--r-- 1 user user 3526 jun 12 08:00 .bashrc"},{t:"ok",s:"-rw------- 1 user user  128 jun 12 09:15 .bash_history"}],
      "ls -la": () => [{t:"ok",s:"total 64"},{t:"ok",s:"drwxr-xr-x 5 user user 4096 jun 12 09:00 ."},{t:"ok",s:"drwxr-xr-x 3 root root 4096 jun 12 07:00 .."},{t:"ok",s:"drwxr-xr-x 2 user user 4096 jun 12 08:30 Documents"},{t:"ok",s:"drwx------ 2 user user 4096 jun 12 08:00 .ssh"},{t:"ok",s:"-rw------- 1 user user  128 jun 12 09:15 .bash_history"}],
      "pwd": () => [{t:"ok",s:"/home/user"}],
      "whoami": () => [{t:"ok",s:"user"}],
      "id": () => [{t:"ok",s:"uid=1000(user) gid=1000(user) groupes=1000(user),4(adm),24(cdrom),27(sudo),100(users)"}],
      "uname -a": () => [{t:"ok",s:"Linux kali 6.1.0-18-amd64 #1 SMP Debian 6.1.76 x86_64 GNU/Linux"}],
      "uptime": () => [{t:"ok",s:" 09:15:42 up 2 days,  3:22,  2 users,  load average: 0.12, 0.08, 0.03"}],
      "env": () => [{t:"ok",s:"SHELL=/bin/bash"},{t:"ok",s:"HOME=/home/user"},{t:"ok",s:"USER=user"},{t:"ok",s:"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"},{t:"ok",s:"TERM=xterm-256color"},{t:"ok",s:"LANG=fr_FR.UTF-8"}],
      "ip a": () => [{t:"ok",s:"1: lo: <LOOPBACK,UP,LOWER_UP>"},{t:"ok",s:"    inet 127.0.0.1/8 scope host lo"},{t:"ok",s:"2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>"},{t:"ok",s:"    link/ether 00:0c:29:ab:cd:ef brd ff:ff:ff:ff:ff:ff"},{t:"ok",s:"    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0"},{t:"ok",s:"    inet6 fe80::20c:29ff:feab:cdef/64 scope link"}],
      "ip r": () => [{t:"ok",s:"default via 192.168.1.1 dev eth0 proto dhcp metric 100"},{t:"ok",s:"192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100"}],
      "ip link": () => [{t:"ok",s:"1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN"},{t:"ok",s:"2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP"}],
      "ss -tulnp": () => [{t:"ok",s:"Netid  State   Recv-Q  Send-Q  Local Address:Port"},{t:"ok",s:"tcp    LISTEN  0       128     0.0.0.0:22     0.0.0.0:*    users:((\"sshd\",pid=1234))"},{t:"ok",s:"tcp    LISTEN  0       5       0.0.0.0:80     0.0.0.0:*    users:((\"nginx\",pid=5678))"},{t:"ok",s:"tcp    LISTEN  0       128     0.0.0.0:443    0.0.0.0:*    users:((\"nginx\",pid=5678))"},{t:"ok",s:"udp    UNCONN  0       0       0.0.0.0:53     0.0.0.0:*    users:((\"dnsmasq\",pid=900))"}],
      "ss -tp": () => [{t:"ok",s:"State     Recv-Q  Send-Q  Local Address:Port          Peer Address:Port"},{t:"ok",s:"ESTAB     0       0       192.168.1.100:22           192.168.1.10:50234  users:((\"sshd\",pid=2001))"},{t:"ok",s:"ESTAB     0       0       192.168.1.100:443          93.184.216.34:41290 users:((\"nginx\",pid=5678))"}],
      "netstat -tulnp": () => [{t:"warn",s:"AVERTISSEMENT: netstat est déprécié. Utilisez 'ss -tulnp' à la place."},{t:"ok",s:"Proto Recv-Q Send-Q Local Address    Foreign Address  State  PID/Prog"},{t:"ok",s:"tcp   0      0      0.0.0.0:22       0.0.0.0:*        LISTEN 1234/sshd"},{t:"ok",s:"tcp   0      0      0.0.0.0:80       0.0.0.0:*        LISTEN 5678/nginx"}],
      "ping": () => [{t:"warn",s:"Usage: ping -c 4 <IP>"}],
      "ping -c 4 8.8.8.8": () => [{t:"ok",s:"PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data."},{t:"ok",s:"64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12.3 ms"},{t:"ok",s:"64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=11.8 ms"},{t:"ok",s:"64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=12.1 ms"},{t:"ok",s:"64 bytes from 8.8.8.8: icmp_seq=4 ttl=118 time=12.5 ms"},{t:"ok",s:"--- 8.8.8.8 ping statistics ---"},{t:"ok",s:"4 packets transmitted, 4 received, 0% packet loss, time 3004ms"},{t:"ok",s:"rtt min/avg/max = 11.8/12.2/12.5 ms"}],
      "dig domaine.fr A +short": () => [{t:"ok",s:"217.70.184.38"}],
      "dig google.com A +short": () => [{t:"ok",s:"142.250.74.174"}],
      "nmap -sV 192.168.1.1": () => [{t:"ok",s:"Starting Nmap 7.94 ( https://nmap.org )"},{t:"ok",s:"Nmap scan report for 192.168.1.1"},{t:"ok",s:"PORT   STATE SERVICE VERSION"},{t:"ok",s:"22/tcp open  ssh     OpenSSH 8.9 (protocol 2.0)"},{t:"ok",s:"80/tcp open  http    nginx 1.24.0"},{t:"ok",s:"443/tcp open ssl/http nginx 1.24.0"},{t:"ok",s:"Service detection performed. 3 services on 192.168.1.1"}],
      "ps aux": () => [{t:"ok",s:"USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"},{t:"ok",s:"root         1  0.0  0.1 169076 10832 ?        Ss   07:00   0:01 /sbin/init"},{t:"ok",s:"root      1234  0.0  0.0  72300  6172 ?        Ss   07:01   0:00 sshd: /usr/sbin/sshd"},{t:"ok",s:"user      2001  0.0  0.1  76220  9328 pts/0    Ss   09:00   0:00 -bash"},{t:"ok",s:"root      5678  0.0  0.1  79456  8764 ?        Ss   07:02   0:00 nginx: master process"}],
      "ps aux | grep nginx": () => [{t:"ok",s:"root  5678  0.0  0.1  79456  8764 ?   Ss  07:02  0:00 nginx: master process /etc/nginx/nginx.conf"},{t:"ok",s:"www-d 5679  0.0  0.1  79912  7832 ?   S   07:02  0:00 nginx: worker process"}],
      "top": () => [{t:"ok",s:"top - 09:15:42 up 2 days,  3:22,  2 users,  load: 0.12, 0.08, 0.03"},{t:"ok",s:"Tasks: 142 total,   1 running, 141 sleeping"},{t:"ok",s:"%Cpu(s):  2.3 us,  0.5 sy,  0.0 ni, 96.8 id"},{t:"ok",s:"MiB Mem :   7876.5 total,   4231.2 free,   2104.8 used"},{t:"info",s:"(simulation — 'top' interactif non disponible dans ce terminal)"}],
      "free -h": () => [{t:"ok",s:"              total        used        free      shared  buff/cache   available"},{t:"ok",s:"Mem:           7.7Gi       2.1Gi       4.1Gi       156Mi       1.5Gi       5.3Gi"},{t:"ok",s:"Swap:          2.0Gi          0B       2.0Gi"}],
      "df -h": () => [{t:"ok",s:"Filesystem      Size  Used Avail Use% Mounted on"},{t:"ok",s:"/dev/sda1        40G   12G   26G  32% /"},{t:"ok",s:"tmpfs           3.9G     0  3.9G   0% /dev/shm"},{t:"ok",s:"/dev/sdb1       100G   45G   55G  45% /data"}],
      "du -sh /var/log/*": () => [{t:"ok",s:"4.0K\t/var/log/auth.log"},{t:"ok",s:"12K\t/var/log/syslog"},{t:"ok",s:"1.2M\t/var/log/nginx"},{t:"ok",s:"256K\t/var/log/dpkg.log"}],
      "chmod 750 fichier": () => [{t:"ok",s:"Droits appliqués : rwxr-x--- (propriétaire=rwx, groupe=r-x, autres=---)"}],
      "chmod 777 fichier": () => [{t:"warn",s:"⚠️  MAUVAISE PRATIQUE : chmod 777 donne tous les droits à tout le monde !"},{t:"warn",s:"Ne jamais utiliser en production. Préférez 750 ou 640."}],
      "chown user:group fichier": () => [{t:"ok",s:"Propriétaire changé vers user:group"}],
      "sudo -l": () => [{t:"ok",s:"Matching Defaults entries for user on linux:"},{t:"ok",s:"    env_reset, mail_badpass"},{t:"ok",s:"User user may run the following commands on linux:"},{t:"ok",s:"    (ALL : ALL) ALL"}],
      "last": () => [{t:"ok",s:"user     pts/0        192.168.1.10     Mon jun 12 09:00   still logged in"},{t:"ok",s:"user     pts/0        192.168.1.10     Sun jun 11 14:32 - 18:45  (04:12)"},{t:"ok",s:"reboot   system boot  6.1.0-18-amd64   Sat jun 10 06:00"}],
      "lastb": () => [{t:"ok",s:"root     ssh:notty    45.33.32.156     Mon jun 12 08:45 - 08:45  (00:00)"},{t:"ok",s:"admin    ssh:notty    178.62.43.89     Mon jun 12 08:43 - 08:43  (00:00)"},{t:"warn",s:"ℹ️  Des tentatives de bruteforce SSH ont été détectées. Envisagez fail2ban."}],
      "systemctl status nginx": () => [{t:"ok",s:"● nginx.service - A high performance web server"},{t:"ok",s:"     Loaded: loaded (/lib/systemd/system/nginx.service; enabled)"},{t:"ok",s:"     Active: active (running) since Mon 2024-06-10 07:02:15 UTC"},{t:"ok",s:"    Process: 5678 ExecStart=/usr/sbin/nginx"},{t:"ok",s:"   Main PID: 5678 (nginx)"},{t:"ok",s:"jun 10 07:02:15 linux nginx[5678]: nginx: the configuration file ...syntax is ok"}],
      "systemctl status sshd": () => [{t:"ok",s:"● sshd.service - OpenBSD Secure Shell server"},{t:"ok",s:"     Active: active (running) since Mon 2024-06-10 07:01:00 UTC"},{t:"ok",s:"    Process: 1234 ExecStart=/usr/sbin/sshd -D"},{t:"ok",s:"   Main PID: 1234 (sshd)"}],
      "systemctl list-units --type=service --state=failed": () => [{t:"ok",s:"UNIT                  LOAD   ACTIVE SUB    DESCRIPTION"},{t:"warn",s:"mysql.service         loaded failed failed MySQL Database"},{t:"ok",s:""},{t:"ok",s:"LOAD   = Reflects whether the unit definition was properly loaded."},{t:"ok",s:"ACTIVE = The high-level unit activation state."},{t:"ok",s:"1 unit listed. Pass --all to see loaded but inactive units."}],
      "journalctl -u sshd -n 20": () => [{t:"ok",s:"jun 12 09:00:01 linux sshd[2001]: Accepted publickey for user from 192.168.1.10"},{t:"warn",s:"jun 12 08:45:32 linux sshd[2888]: Failed password for root from 45.33.32.156"},{t:"warn",s:"jun 12 08:45:30 linux sshd[2887]: Failed password for root from 45.33.32.156"},{t:"ok",s:"jun 12 08:40:01 linux sshd[2001]: Accepted publickey for user from 192.168.1.10"}],
      "journalctl -p err -b": () => [{t:"err",s:"jun 12 07:03:12 linux kernel: EXT4-fs error (device sda1): ...checksum"},{t:"warn",s:"jun 12 07:02:55 linux systemd[1]: mysql.service: Main process exited, code=exited"},{t:"err",s:"jun 12 07:02:55 linux systemd[1]: mysql.service: Failed with result 'exit-code'"}],
      "tail -f /var/log/auth.log": () => [{t:"ok",s:"jun 12 09:00:01 linux sshd[2001]: Accepted publickey for user"},{t:"ok",s:"jun 12 09:01:22 linux sudo: user : TTY=pts/0 ; COMMAND=/bin/bash"},{t:"info",s:"(simulation — flux en temps réel non disponible)"}],
      "grep 'Failed password' /var/log/auth.log": () => [{t:"warn",s:"jun 12 08:45:32 linux sshd: Failed password for root from 45.33.32.156 port 52341"},{t:"warn",s:"jun 12 08:45:30 linux sshd: Failed password for admin from 45.33.32.156 port 52340"},{t:"warn",s:"jun 12 08:43:11 linux sshd: Failed password for root from 178.62.43.89 port 41029"},{t:"info",s:"3 tentatives détectées — recommandé: configurer fail2ban"}],
      "find / -perm -4000 -type f 2>/dev/null": () => [{t:"warn",s:"=== Fichiers SUID trouvés ==="},  {t:"ok",s:"/usr/bin/sudo"},{t:"ok",s:"/usr/bin/passwd"},{t:"ok",s:"/usr/bin/su"},{t:"ok",s:"/usr/bin/ping"},{t:"warn",s:"/tmp/suspicious_suid"},{t:"warn",s:"⚠️  /tmp/suspicious_suid est suspect ! Un fichier SUID dans /tmp = compromission possible."}],
      "sha256sum /bin/bash": () => [{t:"ok",s:"5a8ea5cbeb77f3e77073e34f02e16f47e83e63b6e0399f8a9d4e7b5f23e4b12c  /bin/bash"}],
      "history": () => [{t:"ok",s:"  1  sudo apt update"},{t:"ok",s:"  2  sudo apt install nginx"},{t:"ok",s:"  3  systemctl start nginx"},{t:"ok",s:"  4  ss -tulnp"},{t:"ok",s:"  5  ip a"},{t:"ok",s:"  6  history"}],
      "pvs": () => [{t:"ok",s:"  PV         VG      Fmt  Attr PSize   PFree"},{t:"ok",s:"  /dev/sdb1  vg_data lvm2 a--  100.00g  55.00g"}],
      "vgs": () => [{t:"ok",s:"  VG      #PV #LV #SN Attr   VSize   VFree"},{t:"ok",s:"  vg_data   1   2   0 wz--n- 100.00g 55.00g"}],
      "lvs": () => [{t:"ok",s:"  LV      VG      Attr       LSize   Pool Origin"},{t:"ok",s:"  lv_data vg_data -wi-ao---- 30.00g"},{t:"ok",s:"  lv_logs vg_data -wi-ao---- 15.00g"}],
      "apt update": () => [{t:"ok",s:"Atteint:1 http://security.ubuntu.com/ubuntu jammy-security InRelease"},{t:"ok",s:"Atteint:2 http://fr.archive.ubuntu.com/ubuntu jammy InRelease"},{t:"ok",s:"Lecture des listes de paquets... Fait"},{t:"ok",s:"Construction de l'arbre des dépendances... Fait"},{t:"ok",s:"17 packages can be upgraded. Run 'apt list --upgradable'."}],
      "apt install nmap -y": () => [{t:"ok",s:"Lecture des listes de paquets..."},{t:"ok",s:"Construction de l'arbre des dépendances..."},{t:"ok",s:"Les NOUVEAUX paquets suivants seront installés : nmap nmap-common"},{t:"ok",s:"0 mis à jour, 2 nouvellement installés, 0 à enlever"},{t:"ok",s:"Téléchargement de nmap 7.94_1_amd64.deb..."},{t:"ok",s:"Traitement de nmap (7.94-1) ..."},{t:"ok",s:"nmap installé avec succès."}],
      "dpkg -l | grep nginx": () => [{t:"ok",s:"ii  nginx          1.24.0-1ubuntu1  amd64  small, powerful, scalable web/proxy server"}],
      "ufw status verbose": () => [{t:"ok",s:"Status: active"},{t:"ok",s:"Logging: on (low)"},{t:"ok",s:"Default: deny (incoming), allow (outgoing)"},{t:"ok",s:""},{t:"ok",s:"To                         Action      From"},{t:"ok",s:"22/tcp                     ALLOW IN    Anywhere"},{t:"ok",s:"80/tcp                     ALLOW IN    Anywhere"},{t:"ok",s:"443/tcp                    ALLOW IN    Anywhere"}],
      "iptables -L -n -v": () => [{t:"ok",s:"Chain INPUT (policy DROP 0 packets, 0 bytes)"},{t:"ok",s:" pkts bytes target  prot opt  source     destination"},{t:"ok",s:"  120  8640 ACCEPT  tcp  --   0.0.0.0/0  0.0.0.0/0   tcp dpt:22"},{t:"ok",s:"  850 61200 ACCEPT  tcp  --   0.0.0.0/0  0.0.0.0/0   tcp dpt:80"},{t:"ok",s:"Chain FORWARD (policy DROP)"},{t:"ok",s:"Chain OUTPUT (policy ACCEPT)"}],
      "dmesg | tail -10": () => [{t:"ok",s:"[    0.000000] Linux version 6.1.0-18-amd64"},{t:"ok",s:"[    1.234567] eth0: renamed from enp3s0"},{t:"ok",s:"[    2.345678] EXT4-fs (sda1): mounted filesystem"},{t:"ok",s:"[86421.234567] device eth0 entered promiscuous mode"}],
      "cat /etc/passwd": () => [{t:"ok",s:"root:x:0:0:root:/root:/bin/bash"},{t:"ok",s:"daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin"},{t:"ok",s:"www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin"},{t:"ok",s:"user:x:1000:1000:user,,,:/home/user:/bin/bash"}],
      "cat /etc/shadow": () => [{t:"err",s:"cat: /etc/shadow: Permission denied"},{t:"warn",s:"ℹ️  Utilisez 'sudo cat /etc/shadow' — le fichier est lisible par root uniquement."}],
      "fail2ban-client status sshd": () => [{t:"ok",s:"Status for the jail: sshd"},{t:"ok",s:"|- Filter: Currently failed: 3 | Total failed: 47"},{t:"ok",s:"`- Actions: Currently banned: 2 | Total banned: 5"},{t:"ok",s:"   Banned IP list: 45.33.32.156  178.62.43.89"}],
      "ssh-keygen -t ed25519": () => [{t:"ok",s:"Generating public/private ed25519 key pair."},{t:"ok",s:"Enter file in which to save the key (/home/user/.ssh/id_ed25519):"},{t:"ok",s:"Your identification has been saved in /home/user/.ssh/id_ed25519"},{t:"ok",s:"Your public key has been saved in /home/user/.ssh/id_ed25519.pub"},{t:"ok",s:"The key fingerprint is: SHA256:abc123def456 user@linux"},{t:"info",s:"✅ Clé Ed25519 générée — bien meilleure que RSA 2048 !"}],
      "apk update": () => [{t:"ok",s:"fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/main/x86_64/APKINDEX.tar.gz"},{t:"ok",s:"fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/community/x86_64/APKINDEX.tar.gz"},{t:"ok",s:"v3.19.1-114-g2c1d3e [https://dl-cdn.alpinelinux.org/alpine/v3.19/main]"},{t:"ok",s:"OK: 22839 distinct packages available"}],
      "apk add nginx": () => [{t:"ok",s:"(1/5) Installing pcre2 (10.42-r1)"},{t:"ok",s:"(2/5) Installing nginx (1.24.0-r7)"},{t:"ok",s:"Executing nginx-1.24.0-r7.pre-install"},{t:"ok",s:"OK: 12 MiB in 18 packages"}],
      "rc-service nginx start": () => [{t:"ok",s:" * Starting nginx ..."},{t:"ok",s:" * start-stop-daemon: nginx started [  ok ]"},{t:"info",s:"ℹ️  Alpine utilise OpenRC, pas systemd — pas de 'systemctl' ici."}],
      "rc-update add nginx default": () => [{t:"ok",s:" * service nginx added to runlevel default"}],
      "pacman -Syu": () => [{t:"ok",s:":: Synchronizing package databases..."},{t:"ok",s:" core                  130.2 KiB"},{t:"ok",s:" extra                  1780.4 KiB"},{t:"ok",s:":: Starting full system upgrade..."},{t:"ok",s:"resolving dependencies..."},{t:"ok",s:" there is nothing to do"}],
      "pacman -S htop": () => [{t:"ok",s:"resolving dependencies..."},{t:"ok",s:"Packages (1) htop-3.3.0-1"},{t:"ok",s:"Total Installed Size:  0.20 MiB"},{t:"ok",s:":: Proceed with installation? [Y/n]"},{t:"ok",s:"(1/1) installing htop"}],
      "dnf install httpd -y": () => [{t:"ok",s:"Last metadata expiration check: 0:12:34 ago."},{t:"ok",s:"Dependencies resolved."},{t:"ok",s:"Installing: httpd  2.4.57-5.el9  (appstream)"},{t:"ok",s:"Installed:  httpd-2.4.57-5.el9.x86_64"},{t:"ok",s:"Complete!"}],
      "systemctl enable --now firewalld": () => [{t:"ok",s:"Created symlink /etc/systemd/system/multi-user.target.wants/firewalld.service → /usr/lib/systemd/system/firewalld.service."},{t:"ok",s:"firewalld.service actif (running)"}],
      "rpm -qa | grep httpd": () => [{t:"ok",s:"httpd-2.4.57-5.el9.x86_64"},{t:"ok",s:"httpd-tools-2.4.57-5.el9.x86_64"}],
    }
  },
  cisco: {
    label: "🔵 Cisco IOS",
    prompt: "Router#",
    color: "#60a5fa",
    intro: [
      {t:"ok", s:"Bienvenue dans le simulateur Cisco IOS !"},
      {t:"info", s:"Mode privileged EXEC actif. Tape 'help' pour les commandes."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES CISCO IOS DISPONIBLES ==="},
        {t:"ok",s:"Vérification : show version, show run, show start, show ip int brief"},
        {t:"ok",s:"VLAN/Switch : show vlan brief, show interfaces trunk, show mac address-table"},
        {t:"ok",s:"Routage : show ip route, show ip protocols, show ip ospf neighbor"},
        {t:"ok",s:"Sécurité : show ip nat translations, show crypto ipsec sa, show access-lists"},
        {t:"ok",s:"Diagnostic : ping, traceroute, show arp, show cdp neighbors"},
        {t:"ok",s:"STP : show spanning-tree, show etherchannel summary"},
        {t:"ok",s:"QoS/HSRP : show policy-map interface, show standby"},
        {t:"info",s:"Tape une commande pour voir sa sortie simulée."}
      ],
      "show version": () => [{t:"ok",s:"Cisco IOS Software, Version 15.7(3)M5, RELEASE SOFTWARE"},{t:"ok",s:"ROM: System Bootstrap, Version 15.7(3)M5"},{t:"ok",s:"Router uptime is 4 days, 6 hours, 12 minutes"},{t:"ok",s:"System image file is 'flash:c2900-universalk9-mz.SPA.157-3.M5.bin'"},{t:"ok",s:"cisco CISCO2911/K9 (revision 1.0) with 491520K/32768K bytes of memory."},{t:"ok",s:"1 Gigabit Ethernet interface"},{t:"ok",s:"1 ATM interface"},{t:"ok",s:"Cisco IOS Software License is: advipservicesk9"}],
      "show running-config": () => [{t:"ok",s:"Building configuration..."},{t:"ok",s:""},{t:"ok",s:"Current configuration : 2847 bytes"},{t:"ok",s:"!"},{t:"ok",s:"version 15.7"},{t:"ok",s:"service password-encryption"},{t:"ok",s:"!"},{t:"ok",s:"hostname Router"},{t:"ok",s:"!"},{t:"ok",s:"enable secret 5 $1$mERr$IimqM7V3gCkf6lQiuUy2A."},{t:"ok",s:"!"},{t:"ok",s:"ip domain-name lab.local"},{t:"ok",s:"ip ssh version 2"}],
      "show ip interface brief": () => [{t:"ok",s:"Interface            IP-Address      OK? Method Status   Protocol"},{t:"ok",s:"GigabitEthernet0/0   192.168.1.1     YES manual up       up"},{t:"ok",s:"GigabitEthernet0/1   10.0.0.1        YES manual up       up"},{t:"ok",s:"GigabitEthernet0/2   unassigned      YES unset  down     down"},{t:"warn",s:"GigabitEthernet0/2 est DOWN/DOWN — vérifier câble ou configuration"}],
      "show ip route": () => [{t:"ok",s:"Codes: C-connected, S-static, O-OSPF, D-EIGRP, B-BGP"},{t:"ok",s:""},{t:"ok",s:"     10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks"},{t:"ok",s:"C       10.0.0.0/30 is directly connected, GigabitEthernet0/1"},{t:"ok",s:"S       10.10.10.0/24 [1/0] via 10.0.0.2"},{t:"ok",s:"O    192.168.2.0/24 [110/2] via 10.0.0.2, 00:12:34, GigabitEthernet0/1"},{t:"ok",s:"C    192.168.1.0/24 is directly connected, GigabitEthernet0/0"},{t:"ok",s:"S*   0.0.0.0/0 [1/0] via 10.0.0.254"}],
      "show ip ospf neighbor": () => [{t:"ok",s:"Neighbor ID     Pri   State       Dead Time  Address       Interface"},{t:"ok",s:"2.2.2.2           1   FULL/DR     00:00:34   10.0.0.2      GigabitEthernet0/1"},{t:"ok",s:"3.3.3.3           1   FULL/BDR    00:00:31   10.0.0.3      GigabitEthernet0/1"}],
      "show vlan brief": () => [{t:"ok",s:"VLAN Name                             Status    Ports"},{t:"ok",s:"---- -------------------------------- --------- ------"},{t:"ok",s:"1    default                          active    Gi0/0, Gi0/3"},{t:"ok",s:"10   PRODUCTION                       active    Gi0/1, Gi0/2, Gi0/4"},{t:"ok",s:"20   MANAGEMENT                       active    Gi0/5"},{t:"ok",s:"99   NATIVE                           active"}],
      "show interfaces trunk": () => [{t:"ok",s:"Port        Mode         Encapsulation  Status        Native vlan"},{t:"ok",s:"Gi0/10      on           802.1q         trunking      99"},{t:"ok",s:""},{t:"ok",s:"Port        Vlans allowed on trunk"},{t:"ok",s:"Gi0/10      10,20,99"},{t:"ok",s:""},{t:"ok",s:"Port        Vlans allowed and active in management domain"},{t:"ok",s:"Gi0/10      10,20,99"}],
      "show spanning-tree": () => [{t:"ok",s:"VLAN0010"},{t:"ok",s:"  Spanning tree enabled protocol rstp"},{t:"ok",s:"  Root ID    Priority    24586"},{t:"ok",s:"             Address     aabb.cc00.0100"},{t:"ok",s:"             This bridge is the root"},{t:"ok",s:""},{t:"ok",s:"Interface        Role Sts Cost   Prio.Nbr Type"},{t:"ok",s:"Gi0/1            Desg FWD 4      128.1    P2p"},{t:"ok",s:"Gi0/2            Desg FWD 4      128.2    P2p"}],
      "show mac address-table": () => [{t:"ok",s:"          Mac Address Table"},{t:"ok",s:"-------------------------------------------"},{t:"ok",s:"Vlan    Mac Address       Type        Ports"},{t:"ok",s:"----    -----------       --------    -----"},{t:"ok",s:"  10    0050.7966.6800   DYNAMIC     Gi0/1"},{t:"ok",s:"  10    0050.7966.6801   DYNAMIC     Gi0/2"},{t:"ok",s:"  20    aabb.cc00.0100   DYNAMIC     Gi0/10"}],
      "show ip nat translations": () => [{t:"ok",s:"Pro  Inside global   Inside local   Outside local  Outside global"},{t:"ok",s:"tcp  203.0.113.1:1234  192.168.1.10:1234  8.8.8.8:53  8.8.8.8:53"},{t:"ok",s:"tcp  203.0.113.1:5678  192.168.1.20:5678  142.250.74.174:443  142.250.74.174:443"}],
      "show arp": () => [{t:"ok",s:"Protocol  Address          Age (min)  Hardware Addr   Type   Interface"},{t:"ok",s:"Internet  192.168.1.1             -  aabb.cc00.0100  ARPA   GigabitEthernet0/0"},{t:"ok",s:"Internet  192.168.1.100           5  0050.7966.6800  ARPA   GigabitEthernet0/0"},{t:"ok",s:"Internet  192.168.1.200           2  0050.7966.6801  ARPA   GigabitEthernet0/0"}],
      "show cdp neighbors detail": () => [{t:"ok",s:"-------------------------"},{t:"ok",s:"Device ID: SW-CORE-01"},{t:"ok",s:"Entry address(es): IP address: 10.0.0.2"},{t:"ok",s:"Platform: cisco WS-C3750X-48P,  Capabilities: Switch"},{t:"ok",s:"Interface: GigabitEthernet0/0,  Port ID (outgoing port): GigabitEthernet1/0/1"},{t:"ok",s:"Version: Cisco IOS Software, Version 12.2(55)SE"}],
      "show access-lists": () => [{t:"ok",s:"Extended IP access list PROTECT-LAN"},{t:"ok",s:"    10 permit tcp 192.168.1.0 0.0.0.255 any eq 443 (50 matches)"},{t:"ok",s:"    20 permit tcp 192.168.1.0 0.0.0.255 any eq 80 (120 matches)"},{t:"ok",s:"    30 deny   tcp any any eq 23 (0 matches)"},{t:"ok",s:"    40 deny   ip 10.0.0.0 0.255.255.255 192.168.1.0 0.0.0.255 (2 matches)"},{t:"warn",s:"    999 deny   ip any any (implicit, 5 matches)"}],
      "show crypto ipsec sa": () => [{t:"ok",s:"interface: GigabitEthernet0/1"},{t:"ok",s:"    Crypto map tag: VPN-MAP, local addr 10.0.0.1"},{t:"ok",s:"   protected vrf: (none)"},{t:"ok",s:"   local  ident (addr/mask/prot/port): (192.168.1.0/255.255.255.0/0/0)"},{t:"ok",s:"   remote ident (addr/mask/prot/port): (10.10.10.0/255.255.255.0/0/0)"},{t:"ok",s:"   #pkts encaps: 1240, #pkts encrypt: 1240, #pkts digest: 1240"},{t:"ok",s:"   #pkts decaps: 980, #pkts decrypt: 980, #pkts verify: 980"}],
      "show etherchannel summary": () => [{t:"ok",s:"Flags:  D - down        P - bundled in port-channel"},{t:"ok",s:"        I - stand-alone  s - suspended"},{t:"ok",s:"        H - Hot-standby"},{t:"ok",s:""},{t:"ok",s:"Group  Port-channel  Protocol    Ports"},{t:"ok",s:"------+-------------+-----------+-------"},{t:"ok",s:"1      Po1(SU)      LACP      Gi0/1(P)  Gi0/2(P)"}],
      "show standby": () => [{t:"ok",s:"GigabitEthernet0/0 - Group 1"},{t:"ok",s:"  State is Active"},{t:"ok",s:"    1 state change, last state change 04:12:34"},{t:"ok",s:"  Virtual IP address is 192.168.1.254"},{t:"ok",s:"  Active virtual MAC address is 0000.0c07.ac01"},{t:"ok",s:"  Local virtual MAC address is 0000.0c07.ac01 (default)"},{t:"ok",s:"  Hello time 3 sec, hold time 10 sec"},{t:"ok",s:"  Standby router is 192.168.1.2, priority 90"}],
      "show policy-map interface GigabitEthernet0/1": () => [{t:"ok",s:"GigabitEthernet0/1"},{t:"ok",s:"  Service-policy output: QOS-WAN"},{t:"ok",s:""},{t:"ok",s:"    Class-map: VOIX (match-all)"},{t:"ok",s:"      5 minute offered rate 128000 bps, drop rate 0000 bps"},{t:"ok",s:"      Match: protocol rtp"},{t:"ok",s:"      Priority: 512 kbps, burst bytes 12800"},{t:"ok",s:""},{t:"ok",s:"    Class-map: class-default (match-any)"},{t:"ok",s:"      Fair-queue: 256 queues"}],
      "ping 192.168.1.100": () => [{t:"ok",s:"Type escape sequence to abort."},{t:"ok",s:"Sending 5, 100-byte ICMP Echos to 192.168.1.100, timeout is 2 seconds:"},{t:"ok",s:"!!!!!"},{t:"ok",s:"Success rate is 100 percent (5/5), round-trip min/avg/max = 1/1/4 ms"}],
      "ping 10.10.10.10": () => [{t:"ok",s:"Sending 5, 100-byte ICMP Echos to 10.10.10.10, timeout is 2 seconds:"},{t:"err",s:"....."},{t:"err",s:"Success rate is 0 percent (0/5)"},{t:"warn",s:"⚠️  Aucune réponse — vérifier la route et la connectivité vers 10.10.10.10"}],
      "traceroute 8.8.8.8": () => [{t:"ok",s:"Type escape sequence to abort."},{t:"ok",s:"Tracing the route to dns.google (8.8.8.8)"},{t:"ok",s:"  1 10.0.0.254 4 msec 4 msec 4 msec"},{t:"ok",s:"  2 203.0.113.1 8 msec 8 msec 8 msec"},{t:"ok",s:"  3 * * *"},{t:"ok",s:"  4 8.8.8.8 16 msec 15 msec 16 msec"}],
      "show ip dhcp snooping binding": () => [{t:"ok",s:"MacAddress          IpAddress       Lease(sec)  Type      VLAN  Interface"},{t:"ok",s:"------------------  ---------------  ----------  --------  ----  --------------------"},{t:"ok",s:"00:50:79:66:68:00   192.168.1.100    86400       dhcp-sno  10    GigabitEthernet0/1"},{t:"ok",s:"00:50:79:66:68:01   192.168.1.101    86400       dhcp-sno  10    GigabitEthernet0/2"},{t:"ok",s:"Total number of bindings: 2"}],
      "configure terminal": () => [{t:"warn",s:"Entering configuration commands, one per line.  End with CNTL/Z."},{t:"info",s:"(simulation) Le mode config n'est pas disponible ici — utilisez les commandes 'show' pour l'apprentissage."}],
      "conf t": () => [{t:"warn",s:"Entering configuration commands, one per line.  End with CNTL/Z."},{t:"info",s:"(simulation) Le mode config n'est pas disponible ici — utilisez les commandes 'show' pour l'apprentissage."}],
    }
  },
  powershell: {
    label: "🟦 PowerShell",
    prompt: "PS C:\\Users\\Admin>",
    color: "#93c5fd",
    intro: [
      {t:"ok", s:"Windows PowerShell 7.4"},
      {t:"info", s:"Tape 'help' pour voir les commandes disponibles."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES POWERSHELL DISPONIBLES ==="},
        {t:"ok",s:"Système : Get-Process, Get-Service, Get-Disk, Get-Volume, Get-FileHash"},
        {t:"ok",s:"Réseau : Test-NetConnection, Get-NetTCPConnection, Get-NetFirewallRule, Resolve-DnsName"},
        {t:"ok",s:"Registre : Get-ItemProperty HKLM:\\..., HKCU:\\Run"},
        {t:"ok",s:"AD : Get-ADUser, Get-ADGroupMember, Get-ADComputer, Get-ADDefaultDomainPasswordPolicy"},
        {t:"ok",s:"Sécurité : Get-ExecutionPolicy, Get-WinEvent, auditpol /get /category:*"},
        {t:"ok",s:"Firewall : Get-NetFirewallRule, netsh advfirewall show allprofiles"},
        {t:"ok",s:"BitLocker : manage-bde -status, Get-BitLockerVolume"},
        {t:"ok",s:"Distante : Invoke-Command, Enter-PSSession, Get-PSSession"},
        {t:"info",s:"PowerShell manipule des OBJETS — pas du texte comme bash."}
      ],
      "Get-Process": () => [{t:"ok",s:"NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName"},{t:"ok",s:"------    -----      -----     ------      --  -- -----------"},{t:"ok",s:"    34    42.23     108.45       2.34    1234   1 chrome"},{t:"ok",s:"    12    18.54      52.34       0.12    5678   1 explorer"},{t:"ok",s:"    45    65.12     180.23      12.45    9012   1 svchost"},{t:"ok",s:"     8     4.32      12.10       0.05    3456   0 lsass"},{t:"ok",s:"     5     2.10       8.45       0.02    2345   0 winlogon"}],
      "Get-Process | Sort-Object WorkingSet -Desc | Select-Object -First 5": () => [{t:"ok",s:"NPM(K)    PM(M)      WS(M)     CPU(s)    Id ProcessName"},{t:"ok",s:"    45    65.12     180.23      12.45  9012 svchost"},{t:"ok",s:"    34    42.23     108.45       2.34  1234 chrome"},{t:"ok",s:"    12    18.54      52.34       0.12  5678 explorer"}],
      "Get-Service": () => [{t:"ok",s:"Status   Name               DisplayName"},{t:"ok",s:"------   ----               -----------"},{t:"ok",s:"Running  AdobeARMservice    Adobe Acrobat Update Service"},{t:"ok",s:"Running  bits               Background Intelligent Transfer"},{t:"ok",s:"Stopped  Fax                Fax"},{t:"ok",s:"Running  lsass              Local Security Authority"},{t:"ok",s:"Running  WinDefend          Windows Defender Antivirus"}],
      "Get-Service | Where-Object {$_.Status -eq 'Stopped' -and $_.StartType -eq 'Automatic'}": () => [{t:"warn",s:"Status   Name        DisplayName"},{t:"warn",s:"------   ----        -----------"},{t:"warn",s:"Stopped  wuauserv    Windows Update"},{t:"warn",s:"⚠️  Services Auto mais arrêtés détectés — Windows Update n'est pas actif !"}],
      "Get-ExecutionPolicy -List": () => [{t:"ok",s:"        Scope ExecutionPolicy"},{t:"ok",s:"        ----- ---------------"},{t:"ok",s:"MachinePolicy        Undefined"},{t:"ok",s:"   UserPolicy        Undefined"},{t:"ok",s:"      Process        Undefined"},{t:"ok",s:"  CurrentUser        RemoteSigned"},{t:"ok",s:" LocalMachine        AllSigned"}],
      "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} -MaxEvents 10": () => [{t:"warn",s:"TimeCreated            Id    Message"},{t:"warn",s:"-----------            --    -------"},{t:"warn",s:"2024-06-12 08:45:32  4625  An account failed to log on. Account: root"},{t:"warn",s:"2024-06-12 08:45:30  4625  An account failed to log on. Account: Administrator"},{t:"warn",s:"2024-06-12 08:43:11  4625  An account failed to log on. Account: admin"},{t:"info",s:"ℹ️  3 échecs de connexion récents. Vérifiez les sources IP et envisagez un verrouillage."}],
      "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624} -MaxEvents 5": () => [{t:"ok",s:"TimeCreated            Id    Message"},{t:"ok",s:"-----------            --    -------"},{t:"ok",s:"2024-06-12 09:00:01  4624  An account was successfully logged on. Admin"},{t:"ok",s:"2024-06-12 08:40:00  4624  An account was successfully logged on. Alice"}],
      "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688} -MaxEvents 5": () => [{t:"ok",s:"TimeCreated            Id    Process               CommandLine"},{t:"ok",s:"-----------            --    -------               -----------"},{t:"ok",s:"2024-06-12 09:01:22  4688  cmd.exe               cmd /c whoami"},{t:"warn",s:"2024-06-12 09:00:55  4688  powershell.exe        -enc JAB...==  (base64 !)"},{t:"warn",s:"⚠️  PowerShell encodé en base64 détecté — souvent signe d'activité malveillante !"}],
      "Get-NetTCPConnection -State Listen | Sort-Object LocalPort": () => [{t:"ok",s:"LocalAddress  LocalPort RemoteAddress RemotePort State   OwningProcess"},{t:"ok",s:"0.0.0.0       80        0.0.0.0       0          Listen  4"},{t:"ok",s:"0.0.0.0       135       0.0.0.0       0          Listen  996  (RPC)"},{t:"ok",s:"0.0.0.0       443       0.0.0.0       0          Listen  4"},{t:"ok",s:"0.0.0.0       445       0.0.0.0       0          Listen  4   (SMB !)"},{t:"ok",s:"0.0.0.0       3389      0.0.0.0       0          Listen  1124 (RDP !)"},{t:"warn",s:"⚠️  RDP (3389) et SMB (445) exposés — vérifier si c'est intentionnel"}],
      "Test-NetConnection -ComputerName 8.8.8.8 -Port 53": () => [{t:"ok",s:"ComputerName     : 8.8.8.8"},{t:"ok",s:"RemoteAddress    : 8.8.8.8"},{t:"ok",s:"RemotePort       : 53"},{t:"ok",s:"InterfaceAlias   : Ethernet0"},{t:"ok",s:"SourceAddress    : 192.168.1.100"},{t:"ok",s:"TcpTestSucceeded : True"}],
      "Test-NetConnection -ComputerName 10.0.0.5 -Port 3389": () => [{t:"warn",s:"ComputerName     : 10.0.0.5"},{t:"warn",s:"RemoteAddress    : 10.0.0.5"},{t:"warn",s:"RemotePort       : 3389"},{t:"warn",s:"TcpTestSucceeded : False"},{t:"warn",s:"ℹ️  Port 3389 inaccessible sur 10.0.0.5 — vérifier pare-feu ou que RDP est actif"}],
      "Resolve-DnsName google.fr -Type MX": () => [{t:"ok",s:"Name           Type   TTL    Section    NameExchange   Preference"},{t:"ok",s:"----           ----   ---    -------    ------------   ----------"},{t:"ok",s:"google.fr      MX     300    Answer     smtp.google.com  10"}],
      "Get-NetFirewallRule -Enabled True -Direction Inbound | Select-Object DisplayName,Action | Select-Object -First 10": () => [{t:"ok",s:"DisplayName                                        Action"},{t:"ok",s:"-----------                                        ------"},{t:"ok",s:"World Wide Web Services (HTTP Traffic-In)          Allow"},{t:"ok",s:"World Wide Web Services (HTTPS Traffic-In)         Allow"},{t:"ok",s:"Windows Remote Management (HTTP-In)               Allow"},{t:"ok",s:"Remote Desktop - User Mode (TCP-In)               Allow"},{t:"warn",s:"File and Printer Sharing (Echo Request-ICMPv4-In)  Allow"}],
      "netsh advfirewall show allprofiles": () => [{t:"ok",s:"Domain Profile Settings:"},{t:"ok",s:"State                               ON"},{t:"ok",s:"Firewall Policy                     BlockInbound,AllowOutbound"},{t:"ok",s:""},{t:"ok",s:"Private Profile Settings:"},{t:"ok",s:"State                               ON"},{t:"ok",s:""},{t:"ok",s:"Public Profile Settings:"},{t:"ok",s:"State                               ON"},{t:"ok",s:"Firewall Policy                     BlockInbound,AllowOutbound"},{t:"ok",s:"Ok."}],
      "Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'": () => [{t:"ok",s:"OneDrive    : C:\\Users\\Admin\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe"},{t:"ok",s:"Teams       : C:\\Users\\Admin\\AppData\\Local\\Microsoft\\Teams\\Update.exe --processStart"},{t:"warn",s:"svchost32   : C:\\Temp\\svchost32.exe"},{t:"warn",s:"⚠️  svchost32.exe dans C:\\Temp est suspect ! Analysez ce binaire."}],
      "Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'": () => [{t:"ok",s:"SecurityHealth  : C:\\Windows\\System32\\SecurityHealthSystray.exe"},{t:"ok",s:"WindowsDefender : C:\\Program Files\\Windows Defender\\MSASCuiL.exe"}],
      "manage-bde -status": () => [{t:"ok",s:"Disk volumes that can be protected with"},{t:"ok",s:"BitLocker Drive Encryption:"},{t:"ok",s:"Volume C: [System]"},{t:"ok",s:" [OS Volume]"},{t:"ok",s:" Size:                 238.47 GB"},{t:"ok",s:" BitLocker Version:    2.0"},{t:"ok",s:" Conversion Status:    Fully Encrypted"},{t:"ok",s:" Percentage Encrypted: 100.0%"},{t:"ok",s:" Encryption Method:    XTS-AES 256"},{t:"ok",s:" Protection Status:    Protection On"}],
      "Get-FileHash C:\\Windows\\System32\\cmd.exe -Algorithm SHA256": () => [{t:"ok",s:"Algorithm  Hash                                                              Path"},{t:"ok",s:"---------  ----                                                              ----"},{t:"ok",s:"SHA256     D06E9F9BEE8E77F59C0B7C6A2B24A0B5F7E8A3C1D2E4F5A6B7C8D9E0F1A2B3C4  C:\\Windows\\System32\\cmd.exe"}],
      "auditpol /get /category:*": () => [{t:"ok",s:"System audit policy"},{t:"ok",s:""},{t:"ok",s:"Category/Subcategory                      Setting"},{t:"ok",s:"System"},{t:"ok",s:"  Security System Extension                No Auditing"},{t:"ok",s:"  System Integrity                         Success and Failure"},{t:"ok",s:"Logon/Logoff"},{t:"ok",s:"  Logon                                   Success and Failure"},{t:"ok",s:"  Logoff                                  Success"},{t:"ok",s:"Object Access"},{t:"ok",s:"  File System                              No Auditing"},{t:"warn",s:"ℹ️  'File System' non audité — activer pour détecter accès aux fichiers sensibles"}],
      "Get-ADUser -Filter {Enabled -eq $false}": () => [{t:"ok",s:"DistinguishedName : CN=old_service,OU=Services,DC=lab,DC=local"},{t:"ok",s:"Enabled           : False"},{t:"ok",s:"GivenName         : service"},{t:"ok",s:"SamAccountName    : old_service"},{t:"ok",s:""},{t:"ok",s:"DistinguishedName : CN=John Smith,OU=Users,DC=lab,DC=local"},{t:"ok",s:"Enabled           : False"},{t:"ok",s:"SamAccountName    : jsmith"}],
      "Get-ADGroupMember 'Domain Admins' -Recursive": () => [{t:"ok",s:"SamAccountName  ObjectClass DistinguishedName"},{t:"ok",s:"--------------  ----------- -----------------"},{t:"ok",s:"Administrator   user        CN=Administrator,CN=Users,DC=lab,DC=local"},{t:"ok",s:"alice           user        CN=Alice Martin,OU=IT,DC=lab,DC=local"},{t:"warn",s:"svc_backup      user        CN=svc_backup,OU=Services,DC=lab,DC=local"},{t:"warn",s:"⚠️  svc_backup dans Domain Admins ! Un compte de service ne devrait jamais être DA."}],
      "Get-ADDefaultDomainPasswordPolicy": () => [{t:"ok",s:"ComplexityEnabled           : True"},{t:"ok",s:"DistinguishedName           : DC=lab,DC=local"},{t:"ok",s:"LockoutDuration             : 00:30:00"},{t:"ok",s:"LockoutObservationWindow    : 00:30:00"},{t:"ok",s:"LockoutThreshold            : 5"},{t:"ok",s:"MaxPasswordAge              : 90.00:00:00"},{t:"ok",s:"MinPasswordAge              : 1.00:00:00"},{t:"ok",s:"MinPasswordLength           : 12"},{t:"ok",s:"PasswordHistoryCount        : 24"}],
      "gpresult /r": () => [{t:"ok",s:"Microsoft (R) Windows (R) Operating System Group Policy Result tool"},{t:"ok",s:""},{t:"ok",s:"RSOP data for LAB\\Admin on WORKSTATION01"},{t:"ok",s:""},{t:"ok",s:"OS Configuration:            Member Workstation"},{t:"ok",s:"OS Version:                  10.0.22621"},{t:"ok",s:"Site Name:                   Default-First-Site-Name"},{t:"ok",s:""},{t:"ok",s:"Applied Group Policy Objects"},{t:"ok",s:"  Default Domain Policy"},{t:"ok",s:"  Security Baseline - Workstations"},{t:"ok",s:"  BitLocker Policy"}],
      "gpupdate /force": () => [{t:"ok",s:"Updating Policy..."},{t:"ok",s:""},{t:"ok",s:"Computer Policy update has completed successfully."},{t:"ok",s:"User Policy update has completed successfully."}],
      "Invoke-Command -ComputerName SRV01 -ScriptBlock { hostname }": () => [{t:"ok",s:"SRV01"}],
      "Get-PSSession": () => [{t:"ok",s:"Id Name       ComputerName State       ConfigurationName Availability"},{t:"ok",s:"-- ----       ------------ -----       ----------------- ------------"},{t:"ok",s:" 1 Session1   SRV01        Opened      Microsoft.PowerShell Available"}],
      "Get-CimInstance -ClassName Win32_OperatingSystem": () => [{t:"ok",s:"SystemDirectory   : C:\\Windows\\system32"},{t:"ok",s:"Organization      :"},{t:"ok",s:"BuildNumber       : 22621"},{t:"ok",s:"RegisteredUser    : Admin"},{t:"ok",s:"SerialNumber      : 00330-50000-00000-AAOEM"},{t:"ok",s:"Version           : 10.0.22621"}],
      "Get-CimInstance -ClassName Win32_LogicalDisk": () => [{t:"ok",s:"DeviceID DriveType ProviderName VolumeName    Size           FreeSpace"},{t:"ok",s:"-------- --------- ------------ ----------    ----           ---------"},{t:"ok",s:"C:       3                      Windows       256098066432   158034067456"},{t:"ok",s:"D:       3                      Data          1099511627776  850000000000"}],
      "whoami": () => [{t:"ok",s:"lab\\admin"}],
      "whoami /groups": () => [{t:"ok",s:"GROUP INFORMATION"},{t:"ok",s:"Group Name                           Attributes"},{t:"ok",s:"==================================== ============"},{t:"ok",s:"LAB\\Domain Admins                    Mandatory group, Enabled"},{t:"ok",s:"NT AUTHORITY\\Authenticated Users     Mandatory group, Enabled"},{t:"ok",s:"BUILTIN\\Administrators               Mandatory group, Enabled by default"}],
      "net localgroup administrators": () => [{t:"ok",s:"Alias name     administrators"},{t:"ok",s:"Members"},{t:"ok",s:""},{t:"ok",s:"Administrator"},{t:"ok",s:"alice"},{t:"warn",s:"hacker_tool"},{t:"warn",s:"⚠️  'hacker_tool' dans le groupe Administrators est suspect !"}],
    }
  }
};

let currentShell = "linux";
let termHistory = [];
let termHistIdx = -1;
let termInitialized = false;

function initTerminal() {
  if (termInitialized) return;
  termInitialized = true;
  const tabsEl = document.getElementById("term-tabs");
  const infoEl = document.getElementById("term-info");
  tabsEl.innerHTML = "";
  Object.entries(TERM_SHELLS).forEach(([key, sh]) => {
    const btn = document.createElement("button");
    btn.className = "term-tab" + (key === currentShell ? " active" : "");
    btn.textContent = sh.label;
    btn.onclick = () => switchShell(key);
    tabsEl.appendChild(btn);
  });
  infoEl.textContent = "💡 Terminal simulé — tape 'help' ou clique sur un exemple";
  buildTermHelp();
  clearTerm();
  printIntro();
  const inp = document.getElementById("term-input");
  inp.addEventListener("keydown", onTermKey);
  inp.focus();
}

function switchShell(key) {
  currentShell = key;
  document.querySelectorAll(".term-tab").forEach((b,i) => {
    b.classList.toggle("active", Object.keys(TERM_SHELLS)[i] === key);
  });
  const sh = TERM_SHELLS[key];
  document.getElementById("term-prompt").textContent = sh.prompt;
  document.getElementById("term-prompt").style.color = sh.color;
  termHistory = [];
  termHistIdx = -1;
  clearTerm();
  printIntro();
  buildTermHelp();
}

function clearTerm() {
  document.getElementById("term-output").innerHTML = "";
}

function printIntro() {
  const sh = TERM_SHELLS[currentShell];
  sh.intro.forEach(l => addLine(l.t, l.s));
}

function addLine(type, text) {
  const out = document.getElementById("term-output");
  const div = document.createElement("div");
  div.className = "term-line " + type;
  div.innerHTML = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}

function onTermKey(e) {
  const inp = e.target;
  if (e.key === "Enter") {
    const cmd = inp.value.trim();
    inp.value = "";
    if (cmd) { termHistory.unshift(cmd); termHistIdx = -1; }
    if (cmd === "clear") { clearTerm(); return; }
    execTermCmd(cmd);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (termHistIdx < termHistory.length - 1) { termHistIdx++; inp.value = termHistory[termHistIdx]; }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (termHistIdx > 0) { termHistIdx--; inp.value = termHistory[termHistIdx]; }
    else { termHistIdx = -1; inp.value = ""; }
  }
}

function execTermCmd(cmd) {
  const sh = TERM_SHELLS[currentShell];
  addLine("cmd", sh.prompt + " " + cmd);
  if (!cmd) return;
  const cmds = sh.commands;
  // Exact match
  if (cmds[cmd]) { cmds[cmd]().forEach(l => addLine(l.t, l.s)); return; }
  // Partial match
  const key = Object.keys(cmds).find(k => cmd.startsWith(k.split(" ")[0]) && k !== "help");
  if (key) { cmds[key]().forEach(l => addLine(l.t, l.s)); return; }
  // Unknown
  addLine("err", "Commande non reconnue : '" + cmd + "'");
  addLine("dim", "Tape 'help' pour voir les commandes disponibles.");
}

function buildTermHelp() {
  const sh = TERM_SHELLS[currentShell];
  const help = document.getElementById("term-help");
  const examples = Object.keys(sh.commands).filter(k => k !== "help").slice(0, 20);
  help.innerHTML = examples.map(cmd =>
    `<div class="term-help-item" onclick="document.getElementById('term-input').value='${escHtml(cmd)}';document.getElementById('term-input').focus()"><code>${escHtml(cmd)}</code>cliquer pour tester</div>`
  ).join("");
}

function init() {
  loadDark();
  loadSeen();
  loadLevels();
  const total = FICHES.length;
  const cats = new Set(FICHES.map(f => f.cat)).size;
  document.getElementById("stat-total").textContent = total;
  document.getElementById("subtitle-text").textContent = total + " fiches · Réseau, Cisco, Linux, PowerShell, Pentest, DevOps et plus";
  const best = loadQuizBest();
  if (best) document.getElementById("stat-quiz").textContent = best + "%";
  buildFilters();
  buildQuizCatFilter();
  buildFcCatSelect();
  renderCards();
  updateProgress();
}

function buildFilters() {
  const container = document.getElementById("filters");
  const total = FICHES.length;
  container.innerHTML = `<button class="filter-btn active" onclick="filterCards('all',this)">Tout (${total})</button>`;
  catOrder.forEach(cat => {
    const count = FICHES.filter(f => f.cat === cat).length;
    if (count === 0) return;
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.textContent = catLabels[cat] + " (" + count + ")";
    btn.onclick = function() { filterCards(cat, this); };
    container.appendChild(btn);
  });
}

function filterCards(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderCards();
}

// Groupement des catégories par thème
const catGroups = [
  { label:"🌐 Réseau", cats:["reseau","reseauavance","proto","cisco","wifi"] },
  { label:"🛡️ Sécurité", cats:["secu","hacking","web","ad","crypto","wef"] },
  { label:"⚙️ Administration", cats:["admin","linux","windows","devops","cloud","proxmox","virt"] },
  { label:"📋 Méthodes & Normes", cats:["methodo","reglem","ebios","norme","superv","ia","bdd"] },
  { label:"🖥️ Général & SISR", cats:["general","sisr","auto"] }
];

function toggleWeakFilter(btn) {
  weakFilterOn = !weakFilterOn;
  btn.classList.toggle("active", weakFilterOn);
  renderCards();
}

function renderCards() {
  const search = (document.getElementById("search-box").value || "").toLowerCase().trim();
  const sortVal = document.getElementById("sort-select").value;
  const grid = document.getElementById("cards-grid");
  const noRes = document.getElementById("no-results");
  grid.innerHTML = "";

  let filtered = currentFilter === "all" ? FICHES : FICHES.filter(f => f.cat === currentFilter);
  if (search) {
    filtered = filtered.filter(f =>
      f.titre.toLowerCase().includes(search) ||
      (f.sub && f.sub.toLowerCase().includes(search)) ||
      (f.def && f.def.toLowerCase().includes(search)) ||
      (f.keywords && f.keywords.some(k => k.toLowerCase().includes(search)))
    );
  }
  if (weakFilterOn) {
    filtered = filtered.filter(f => !levels[f.id] || levels[f.id] <= 2);
  }

  // Tri
  if (sortVal === "level-asc") {
    filtered = [...filtered].sort((a,b) => (levels[a.id]||0) - (levels[b.id]||0));
  } else if (sortVal === "level-desc") {
    filtered = [...filtered].sort((a,b) => (levels[b.id]||0) - (levels[a.id]||0));
  } else if (sortVal === "alpha") {
    filtered = [...filtered].sort((a,b) => a.titre.localeCompare(b.titre));
  }

  filteredList = filtered;
  noRes.style.display = filtered.length === 0 ? "block" : "none";

  // Affichage avec ou sans regroupement
  const isGrouped = currentFilter === "all" && sortVal === "default" && !search && !weakFilterOn;

  if (isGrouped) {
    catGroups.forEach(group => {
      const groupItems = filtered.filter(f => group.cats.includes(f.cat));
      if (groupItems.length === 0) return;
      const sep = document.createElement("div");
      sep.className = "section-header";
      const doneInGroup = groupItems.filter(f => seen.has(f.id)).length;
      sep.innerHTML = `<div class="section-header-line"></div><span class="section-header-title">${group.label}</span><span class="section-header-count">${doneInGroup}/${groupItems.length}</span><div class="section-header-line"></div>`;
      grid.appendChild(sep);
      groupItems.forEach((f, i) => grid.appendChild(makeCard(f, filtered.indexOf(f))));
    });
  } else {
    filtered.forEach((f, i) => grid.appendChild(makeCard(f, i)));
  }
}

function makeCard(f, idx) {
  const div = document.createElement("div");
  const lv = levels[f.id] || 0;
  div.className = "card" + (seen.has(f.id) ? " done" : "") + (lv ? " level-" + lv : "");
  div.onclick = () => openDetail(f.id, idx);
  const stars = [1,2,3,4,5].map(i => `<span class="star${i<=lv?' on':''}">★</span>`).join("");
  div.innerHTML =
    (seen.has(f.id) ? '<span class="card-done-mark">✓</span>' : "") +
    '<span class="card-badge badge-' + f.cat + '">' + catLabels[f.cat] + '</span>' +
    '<div class="card-title">' + f.titre + '</div>' +
    '<div class="card-desc">' + (f.sub || "") + '</div>' +
    '<div class="card-level">' + stars + '</div>';
  return div;
}

function updateProgress() {
  const total = FICHES.length;
  const n = seen.size;
  const mastered = Object.values(levels).filter(v => v >= 4).length;
  const pct = total > 0 ? Math.round((n / total) * 100) : 0;
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-label").textContent = n + " / " + total + " fiches vues";
  document.getElementById("progress-pct").textContent = pct + "%";
  document.getElementById("stat-seen").textContent = n;
  document.getElementById("stat-mastered").textContent = mastered;
}

// ═══════════════════════════════════════════
// DÉTAIL
// ═══════════════════════════════════════════
function openDetail(id, indexInFiltered) {
  const f = FICHES.find(x => x.id === id);
  if (!f) return;
  const idx = (indexInFiltered !== undefined) ? indexInFiltered : filteredList.findIndex(x => x.id === id);
  seen.add(id);
  saveSeen();
  updateProgress();
  renderCards();

  let extraHTML = "";
  if (f.extra_table) {
    let thead = f.extra_table_headers ? "<thead><tr>" + f.extra_table_headers.map(h => "<th>" + h + "</th>").join("") + "</tr></thead>" : "";
    let tbody = "<tbody>" + f.extra_table.map(r => "<tr>" + r.map(c => "<td>" + c + "</td>").join("") + "</tr>").join("") + "</tbody>";
    extraHTML = '<div class="section"><div class="section-label">Tableau de référence</div><table class="table-mini">' + thead + tbody + '</table></div>';
  }

  function buildCmds(cmds) {
    return cmds.map(s =>
      '<div class="cmd-section"><div class="cmd-section-title">' + s.section + '</div>' +
      s.items.map(i => '<div class="cmd-block"><code>' + escHtml(i.cmd) + '</code><span class="cmd-comment">' + escHtml(i.comment) + '</span></div>').join("") +
      '</div>'
    ).join("");
  }

  let mainContent = "";
  const schemaHTML = f.schema ? '<div class="section"><div class="section-label">📊 Schéma</div><div class="schema-box">' + f.schema + '</div></div>' : "";
  if (f.is_cmd) {
    mainContent = '<div class="section"><div class="section-label">Définition</div><p class="def-text">' + f.def + '</p></div>' +
      schemaHTML +
      '<div class="section"><div class="section-label">Commandes essentielles</div>' + buildCmds(f.cmds) + '</div>';
  } else {
    mainContent = '<div class="section"><div class="section-label">Définition</div><p class="def-text">' + f.def + '</p></div>' +
      schemaHTML +
      extraHTML +
      '<div class="section"><div class="section-label">Points clés</div><ul class="key-list">' +
      f.points.map(p => '<li>' + p + '</li>').join("") + '</ul></div>';
  }

  const prevId = filteredList[idx - 1] ? filteredList[idx - 1].id : null;
  const nextId = filteredList[idx + 1] ? filteredList[idx + 1].id : null;
  const isDone = seen.has(id);
  const lv = levels[id] || 0;
  const levelEmojis = ["😰","😕","😐","🙂","🎯"];
  const levelLabels = ["Inconnu","À retravailler","Moyen","Bien","Maîtrisé"];
  const starsHtml = [1,2,3,4,5].map(i =>
    `<button class="level-btn${lv===i?' active':''}" onclick="setLevel(${id},${i})" title="${levelLabels[i-1]}">${i<=lv?'★':'☆'}</button>`
  ).join("");

  document.getElementById("detail-content").innerHTML =
    '<span class="detail-badge badge-' + f.cat + '">' + catLabels[f.cat] + '</span>' +
    '<h2 class="detail-title">' + f.titre + '</h2>' +
    '<p class="detail-sub">' + (f.sub || "") + '</p>' +
    mainContent +
    '<div class="section"><div class="section-label">⚠️ Piège classique</div><div class="piege-box">' + f.piege + '</div></div>' +
    '<div class="section"><div class="section-label">✅ À retenir</div><div class="retenir-box">' + f.retenir + '</div></div>' +
    '<div class="section"><div class="section-label">Mots-clés</div><div class="kw-grid">' +
    f.keywords.map(k => '<span class="kw">' + k + '</span>').join("") + '</div></div>' +
    '<div class="panel-level"><span class="panel-level-label">Niveau de maîtrise</span>' + starsHtml +
    (lv ? `<span style="font-size:12px;color:var(--text3);margin-left:4px">${levelEmojis[lv-1]} ${levelLabels[lv-1]}</span>` : '') +
    '</div>' +
    '<button class="btn-done' + (isDone ? ' marked' : '') + '" id="btn-done-' + id + '" onclick="toggleDone(' + id + ')">' +
    (isDone ? '✓ Vue !' : 'Marquer comme vue ✓') + '</button>' +
    '<div class="panel-nav">' +
    '<button class="nav-btn" onclick="openDetail(' + prevId + ',' + (idx-1) + ')"' + (!prevId ? ' disabled' : '') + '>← Précédente</button>' +
    '<button class="nav-btn" onclick="openDetail(' + nextId + ',' + (idx+1) + ')"' + (!nextId ? ' disabled' : '') + '>Suivante →</button>' +
    '</div>';

  document.getElementById("overlay").classList.add("open");
}

function escHtml(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function toggleDone(id) {
  seen.add(id);
  saveSeen();
  updateProgress();
  renderCards();
  const btn = document.getElementById("btn-done-" + id);
  if (btn) { btn.classList.add("marked"); btn.textContent = "✓ Vue !"; }
}

function setLevel(id, lv) {
  levels[id] = lv;
  seen.add(id);
  saveLevels();
  saveSeen();
  updateProgress();
  renderCards();
  // Refresh les boutons dans le panel ouvert
  const currentLv = levels[id] || 0;
  const levelEmojis = ["😰","😕","😐","🙂","🎯"];
  const levelLabels = ["Inconnu","À retravailler","Moyen","Bien","Maîtrisé"];
  document.querySelectorAll(".level-btn").forEach((btn, i) => {
    const btnLv = i + 1;
    btn.classList.toggle("active", btnLv === lv);
    btn.textContent = btnLv <= lv ? "★" : "☆";
  });
  // Update the label next to stars
  const existing = document.querySelector(".panel-level span[style]");
  if (existing) {
    existing.textContent = levelEmojis[lv-1] + " " + levelLabels[lv-1];
  } else {
    const pl = document.querySelector(".panel-level");
    if (pl) {
      const sp = document.createElement("span");
      sp.style.cssText = "font-size:12px;color:var(--text3);margin-left:4px";
      sp.textContent = levelEmojis[lv-1] + " " + levelLabels[lv-1];
      pl.appendChild(sp);
    }
  }
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById("overlay")) closeDetail();
}
function closeDetail() {
  document.getElementById("overlay").classList.remove("open");
}

// ═══════════════════════════════════════════
// MODE
// ═══════════════════════════════════════════
function setMode(mode, btn) {
  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("fiche-view").style.display = mode === "fiches" ? "" : "none";
  document.getElementById("quiz-view").style.display = mode === "quiz" ? "" : "none";
  document.getElementById("flashcard-view").style.display = mode === "flashcard" ? "" : "none";
  document.getElementById("stats-view").style.display = mode === "stats" ? "" : "none";
  document.getElementById("terminal-view").style.display = mode === "terminal" ? "" : "none";
  if (mode === "quiz") showQuizStart();
  if (mode === "flashcard") initFlashcards();
  if (mode === "stats") renderStats();
  if (mode === "terminal") initTerminal();
}

// ═══════════════════════════════════════════
// FLASHCARDS
// ═══════════════════════════════════════════
let fcList = [];
let fcIndex = 0;
let fcFlipped = false;
let fcSeen = new Set();

function buildFcCatSelect() {
  const sel = document.getElementById("fc-cat-select");
  catOrder.forEach(cat => {
    const count = FICHES.filter(f => f.cat === cat && !f.is_cmd).length;
    if (count === 0) return;
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = catLabels[cat] + " (" + count + ")";
    sel.appendChild(opt);
  });
}

function initFlashcards() {
  const cat = document.getElementById("fc-cat-select").value;
  fcList = (cat === "all" ? FICHES : FICHES.filter(f => f.cat === cat)).filter(f => !f.is_cmd);
  fcIndex = 0;
  fcFlipped = false;
  fcSeen = new Set();
  renderFlashcard();
}

function shuffleFlashcards() {
  fcList = shuffle(fcList);
  fcIndex = 0;
  fcFlipped = false;
  fcSeen = new Set();
  renderFlashcard();
}

function renderFlashcard() {
  if (fcList.length === 0) return;
  const f = fcList[fcIndex];
  fcFlipped = false;
  document.getElementById("flashcard").classList.remove("flipped");
  document.getElementById("fc-front-text").textContent = f.titre;
  document.getElementById("fc-front-sub").textContent = f.sub || catLabels[f.cat];
  document.getElementById("fc-back-text").textContent = f.def;
  document.getElementById("fc-back-sub").textContent = "✅ " + f.retenir;
  document.getElementById("fc-counter").textContent = (fcIndex+1) + " / " + fcList.length;
  document.getElementById("fc-prev").disabled = fcIndex === 0;
  document.getElementById("fc-next").disabled = fcIndex === fcList.length - 1;
  fcSeen.add(fcIndex);
  renderFcDots();
}

function renderFcDots() {
  const max = Math.min(fcList.length, 30);
  const dots = document.getElementById("fc-dots");
  dots.innerHTML = "";
  for (let i = 0; i < max; i++) {
    const d = document.createElement("div");
    d.className = "fc-dot" + (i === fcIndex ? " current" : fcSeen.has(i) ? " seen" : "");
    dots.appendChild(d);
  }
}

function flipCard() {
  fcFlipped = !fcFlipped;
  document.getElementById("flashcard").classList.toggle("flipped", fcFlipped);
}

function fcNavigate(dir) {
  const newIdx = fcIndex + dir;
  if (newIdx < 0 || newIdx >= fcList.length) return;
  fcIndex = newIdx;
  renderFlashcard();
}

// ═══════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════
function renderStats() {
  const container = document.getElementById("cat-stats-container");
  container.innerHTML = "";
  catOrder.forEach(cat => {
    const total = FICHES.filter(f => f.cat === cat).length;
    if (total === 0) return;
    const done = FICHES.filter(f => f.cat === cat && seen.has(f.id)).length;
    const mastered = FICHES.filter(f => f.cat === cat && (levels[f.id] || 0) >= 4).length;
    const pct = Math.round((done / total) * 100);
    const row = document.createElement("div");
    row.className = "cat-stat-row";
    row.innerHTML = `<span class="cat-stat-label">${catLabels[cat]}</span>` +
      `<div class="cat-stat-bar"><div class="cat-stat-fill" style="width:${pct}%"></div></div>` +
      `<span class="cat-stat-pct">${pct}%</span>` +
      `<span style="font-size:10px;color:var(--text3);width:54px;flex-shrink:0;text-align:right">${mastered}/${total} 🎯</span>`;
    container.appendChild(row);
  });
}

// ═══════════════════════════════════════════
// QUIZ
// ═══════════════════════════════════════════
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let quizCorrectIndex = -1;
let quizCatFilter = "all";
let quizTimerInterval = null;
let quizTimerLeft = 0;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuizCatFilter() {
  const container = document.getElementById("quiz-cat-filter");
  const allBtn = document.createElement("button");
  allBtn.className = "quiz-cat-btn active";
  allBtn.textContent = "Tout";
  allBtn.onclick = function() { quizCatFilter = "all"; setQuizCatActive(this); };
  container.appendChild(allBtn);
  catOrder.forEach(cat => {
    const count = FICHES.filter(f => f.cat === cat && !f.is_cmd).length;
    if (count < 2) return;
    const btn = document.createElement("button");
    btn.className = "quiz-cat-btn";
    btn.textContent = catLabels[cat];
    btn.onclick = function() { quizCatFilter = cat; setQuizCatActive(this); };
    container.appendChild(btn);
  });
}

function setQuizCatActive(btn) {
  document.querySelectorAll(".quiz-cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function buildQuestions() {
  const pool = [];
  let fichePool = FICHES.filter(f => !f.is_cmd);
  if (quizCatFilter !== "all") fichePool = fichePool.filter(f => f.cat === quizCatFilter);
  if (fichePool.length < 4) fichePool = FICHES.filter(f => !f.is_cmd);

  fichePool.forEach(f => {
    const wrongDefs = shuffle(FICHES.filter(x => x.id !== f.id && !x.is_cmd))
      .slice(0, 3).map(x => x.def.substring(0, 90) + "…");
    pool.push({
      question: "Quelle est la bonne définition de <strong>" + f.titre + "</strong> ?",
      correct: f.def.substring(0, 90) + "…",
      wrong: wrongDefs,
      explanation: f.retenir,
      cat: f.cat
    });
    const wrongPieges = shuffle(FICHES.filter(x => x.id !== f.id && !x.is_cmd))
      .slice(0, 3).map(x => x.piege);
    pool.push({
      question: "Quel est le piège classique concernant <strong>" + f.titre + "</strong> ?",
      correct: f.piege,
      wrong: wrongPieges,
      explanation: f.retenir,
      cat: f.cat
    });
    const wrongRetenir = shuffle(FICHES.filter(x => x.id !== f.id && !x.is_cmd))
      .slice(0, 3).map(x => x.retenir);
    pool.push({
      question: "Que faut-il retenir en priorité sur <strong>" + f.titre + "</strong> ?",
      correct: f.retenir,
      wrong: wrongRetenir,
      explanation: f.def.substring(0, 120) + "…",
      cat: f.cat
    });
  });

  // Questions à trous — générées depuis les fiches non-cmd
  fichePool.forEach(f => {
    if (!f.retenir) return;
    // Extraire les segments "terme = définition courte" dans retenir
    const segments = f.retenir.split(/[.\n]/).filter(s => s.includes("=") && s.trim().length > 8);
    segments.slice(0, 2).forEach(seg => {
      const parts = seg.split("=");
      if (parts.length < 2) return;
      const terme = parts[0].trim().replace(/^[^a-zA-ZÀ-ÿ0-9]+/, "").trim();
      const valeur = parts.slice(1).join("=").trim().split(/[,;(]/)[0].trim();
      if (!terme || terme.length < 2 || terme.length > 40 || !valeur || valeur.length < 3) return;
      const blankedRetenir = f.retenir.replace(
        new RegExp(terme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
        '<span class="blank-hint">___</span>'
      );
      pool.push({
        type: "trous",
        question: "Complète : dans le contexte de <strong>" + f.titre + "</strong>, que signifie <strong>___</strong> ?<br><small style='color:var(--text3)'>" + blankedRetenir + "</small>",
        correct: terme,
        acceptedAnswers: [terme.toLowerCase(), terme.toLowerCase().replace(/[^a-z0-9àâéèêëîïôùûüç]/g,"")],
        explanation: f.retenir,
        cat: f.cat
      });
    });
  });

  const countSel = parseInt(document.getElementById("quiz-count").value);
  const shuffled = shuffle(pool);
  return countSel === 0 ? shuffled : shuffled.slice(0, countSel);
}

function showQuizStart() {
  const area = document.getElementById("quiz-area");
  area.innerHTML = '<div style="text-align:center;padding:2rem 1rem">' +
    '<p style="color:var(--text2);font-size:14px;margin-bottom:1.25rem">Choisis une catégorie et les options ci-dessus, puis lance le quiz.</p>' +
    '<button class="quiz-restart" onclick="startQuiz()">▶ Démarrer le quiz</button></div>';
}

function startQuiz() {
  quizQuestions = buildQuestions();
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  stopTimer();
  renderQuestion();
}

function stopTimer() {
  if (quizTimerInterval) { clearInterval(quizTimerInterval); quizTimerInterval = null; }
}

function startTimer(seconds) {
  stopTimer();
  if (seconds <= 0) return;
  quizTimerLeft = seconds;
  updateTimerBar(seconds, seconds);
  quizTimerInterval = setInterval(() => {
    quizTimerLeft--;
    updateTimerBar(quizTimerLeft, seconds);
    if (quizTimerLeft <= 0) {
      stopTimer();
      if (!quizAnswered) autoAnswerWrong();
    }
  }, 1000);
}

function updateTimerBar(left, total) {
  const fill = document.getElementById("quiz-timer-fill");
  if (!fill) return;
  const pct = (left / total) * 100;
  fill.style.width = pct + "%";
  fill.classList.toggle("urgent", pct < 30);
}

function autoAnswerWrong() {
  quizAnswered = true;
  const q = quizQuestions[quizIndex];
  if (q && q.type === "trous") {
    // Trous: show correct answer on timer expiry
    const inp = document.getElementById("quiz-trous-input");
    if (inp) inp.disabled = true;
    const btn = document.getElementById("quiz-trous-btn");
    if (btn) btn.disabled = true;
    const feedback = document.getElementById("quiz-trous-feedback");
    if (feedback) feedback.innerHTML = '<span class="trous-ko">⏱️ Temps écoulé ! Réponse : <strong>' + escHtml(q.correct) + '</strong></span>';
  } else {
    const opts = document.querySelectorAll(".quiz-opt");
    opts.forEach(o => {
      o.disabled = true;
      if (parseInt(o.getAttribute("data-idx")) === quizCorrectIndex) o.classList.add("reveal-correct");
    });
  }
  const expl = document.getElementById("quiz-expl");
  if (expl) expl.classList.add("show");
  const nxt = document.getElementById("quiz-next");
  if (nxt) nxt.style.display = "";
}

function renderQuestion() {
  const area = document.getElementById("quiz-area");
  if (quizIndex >= quizQuestions.length) {
    stopTimer();
    const pct = Math.round((quizScore / quizQuestions.length) * 100);
    saveQuizBest(pct);
    document.getElementById("stat-quiz").textContent = pct + "%";
    const emoji = pct >= 80 ? "🎉" : pct >= 60 ? "💪" : "📚";
    const msg = pct >= 80 ? "Excellent travail !" : pct >= 60 ? "Bon travail, continue !" : "Continue à réviser les fiches.";
    area.innerHTML = '<div class="quiz-end">' +
      '<div class="big-score">' + pct + '%</div>' +
      '<div class="score-label">' + quizScore + ' / ' + quizQuestions.length + ' bonnes réponses<br>' + emoji + ' ' + msg + '</div>' +
      '<button class="quiz-restart" onclick="startQuiz()">🔄 Recommencer</button>' +
      '</div>';
    return;
  }

  const q = quizQuestions[quizIndex];
  quizAnswered = false;

  const timerSec = parseInt(document.getElementById("quiz-timer-sel").value);
  const timerBar = timerSec > 0 ? '<div class="quiz-timer-bar"><div class="quiz-timer-fill" id="quiz-timer-fill"></div></div>' : '';

  const header = '<span style="font-size:11px;color:var(--text3);font-weight:600">Q' + (quizIndex+1) + '/' + quizQuestions.length +
    ' &nbsp;·&nbsp; <span class="card-badge badge-' + q.cat + '">' + catLabels[q.cat] + '</span>' +
    (q.type === "trous" ? ' &nbsp;·&nbsp; <span style="color:var(--blue);font-weight:700">✏️ À trous</span>' : '') +
    '</span><br><br>';

  const footer = '<div class="quiz-footer">' +
    '<span class="quiz-score">Score : ' + quizScore + ' / ' + quizIndex + '</span>' +
    '<button class="quiz-next" id="quiz-next" style="display:none" onclick="nextQuestion()">Question suivante →</button>' +
    '</div>';

  const expl = '<div class="quiz-explanation" id="quiz-expl">💡 <strong>À retenir :</strong> ' + escHtml(q.explanation) + '</div>';

  if (q.type === "trous") {
    // Fill-in-the-blank rendering
    area.innerHTML = '<div class="quiz-container">' +
      '<div class="quiz-question">' + header + q.question + '</div>' +
      timerBar +
      '<div class="quiz-trous-wrap">' +
      '<input class="quiz-trous-input" id="quiz-trous-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Ta réponse…" oninput="this.value=this.value" onkeydown="if(event.key===\'Enter\')submitTrous()">' +
      '<button class="quiz-trous-btn" id="quiz-trous-btn" onclick="submitTrous()">Valider ✓</button>' +
      '</div>' +
      '<div class="quiz-trous-feedback" id="quiz-trous-feedback"></div>' +
      expl + footer + '</div>';
    // Focus input after render
    setTimeout(() => { const inp = document.getElementById("quiz-trous-input"); if (inp) inp.focus(); }, 50);
  } else {
    // Multiple-choice rendering
    const options = shuffle([q.correct, ...q.wrong]);
    quizCorrectIndex = options.indexOf(q.correct);
    let optsHtml = options.map((opt, i) =>
      '<button class="quiz-opt" data-idx="' + i + '" onclick="answerQuiz(this,' + i + ')">' + escHtml(opt) + '</button>'
    ).join("");
    area.innerHTML = '<div class="quiz-container">' +
      '<div class="quiz-question">' + header + q.question + '</div>' +
      timerBar +
      '<div class="quiz-options" id="quiz-options">' + optsHtml + '</div>' +
      expl + footer + '</div>';
  }

  if (timerSec > 0) startTimer(timerSec);
}

function submitTrous() {
  if (quizAnswered) return;
  const inp = document.getElementById("quiz-trous-input");
  if (!inp) return;
  const val = inp.value.trim();
  if (!val) return;

  quizAnswered = true;
  stopTimer();

  const q = quizQuestions[quizIndex];
  const normalize = s => s.toLowerCase().trim().replace(/[^a-z0-9àâéèêëîïôùûüç]/g, "");
  const normalVal = normalize(val);
  const isCorrect = (q.acceptedAnswers || [q.correct.toLowerCase()]).some(a => normalize(a) === normalVal);

  inp.disabled = true;
  const btn = document.getElementById("quiz-trous-btn");
  if (btn) btn.disabled = true;

  const feedback = document.getElementById("quiz-trous-feedback");
  if (feedback) {
    if (isCorrect) {
      feedback.innerHTML = '<span class="trous-ok">✅ Correct ! <strong>' + escHtml(q.correct) + '</strong></span>';
    } else {
      feedback.innerHTML = '<span class="trous-ko">❌ Faux. La bonne réponse était : <strong>' + escHtml(q.correct) + '</strong></span>';
    }
  }

  if (isCorrect) quizScore++;
  const expl = document.getElementById("quiz-expl");
  if (expl) expl.classList.add("show");
  const nxt = document.getElementById("quiz-next");
  if (nxt) nxt.style.display = "";
}

function answerQuiz(btn, idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  stopTimer();

  const isCorrect = (idx === quizCorrectIndex);
  document.querySelectorAll(".quiz-opt").forEach(o => {
    o.disabled = true;
    const oIdx = parseInt(o.getAttribute("data-idx"));
    if (oIdx === idx) o.classList.add(isCorrect ? "correct" : "wrong");
    if (!isCorrect && oIdx === quizCorrectIndex) o.classList.add("reveal-correct");
  });

  if (isCorrect) quizScore++;
  const expl = document.getElementById("quiz-expl");
  if (expl) expl.classList.add("show");
  const nxt = document.getElementById("quiz-next");
  if (nxt) nxt.style.display = "";
}

function nextQuestion() {
  quizIndex++;
  renderQuestion();
}


// Enregistrement du Service Worker (mode hors ligne / PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("Service Worker non enregistré :", err);
    });
  });
}

// ═══════════════════════════════════════════
// CHARGEMENT DES DONNÉES & DÉMARRAGE
// ═══════════════════════════════════════════
(async function bootstrap() {
  try {
    // Chargement des fiches depuis data.js
    const res = await fetch("data.js");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const text = await res.text();

    // Évaluation sécurisée du contenu (tableau JS pur)
    // data.js expose le tableau FICHES directement
    const match = text.match(/^(?:\/\/[^\n]*\n)*\s*(?:const\s+)?FICHES\s*=\s*([\s\S]+?)\s*\]\s*;?\s*$/m);
    if (match) {
      // Utiliser Function() pour évaluer le tableau sans polluer le scope global
      FICHES = Function('"use strict"; return (' + match[1] + '])')();
    } else {
      // Fallback: évaluation directe (data.js assigne FICHES)
      FICHES = Function('"use strict"; ' + text + '; return FICHES;')();
    }

    if (!Array.isArray(FICHES) || FICHES.length === 0) {
      throw new Error("FICHES vide ou invalide");
    }

    console.log("[App] " + FICHES.length + " fiches chargées depuis data.js");
    init();

  } catch (err) {
    console.error("[App] Erreur de chargement des fiches :", err);
    document.getElementById("subtitle-text").textContent =
      "⚠️ Erreur de chargement — ouvrir via un serveur web (pas file://)";
  }
})();

// Enregistrement du Service Worker (PWA / mode hors ligne)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(err => {
      console.warn("Service Worker non enregistré :", err);
    });
  });
}
