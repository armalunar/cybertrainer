export interface TerminalLine {
  type: 'prompt' | 'output' | 'error' | 'comment';
  text: string;
}

export interface SlideContent {
  theory?: string[];
  table?: { headers: string[]; rows: string[][] };
  commands?: string[];
  terminal?: TerminalLine[];
  tips?: string[];
  list?: string[];
  checklist?: string[];
  note?: string;
}

export interface Slide {
  id: string;
  title: string;
  day: number;
  topic: string;
  type: 'theory' | 'commands' | 'terminal' | 'tips' | 'table' | 'lab' | 'checklist' | 'cheatsheet';
  content: SlideContent;
}

export interface Lab {
  id: string;
  name: string;
  day: number;
  os: 'Linux' | 'Windows';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  timed: boolean;
  timerMinutes?: number;
  topics: string[];
  description: string;
  hint: string;
}

export const labs: Lab[] = [
  // Day 1 - Easy
  {
    id: 'cap', name: 'Cap', day: 1, os: 'Linux', difficulty: 'Easy', timed: false,
    topics: ['FTP', 'Wireshark', 'PCAP', 'Linux capabilities'],
    description: 'Uma aplicação web captura tráfego de rede e serve arquivos PCAP. Analise o tráfego e explore uma capability mal configurada no Python.',
    hint: 'Observe a URL da aplicação web — o número no caminho identifica qual captura você está vendo. Tente outros valores.'
  },
  {
    id: 'nibbles', name: 'Nibbles', day: 1, os: 'Linux', difficulty: 'Easy', timed: false,
    topics: ['HTTP enumeration', 'File upload', 'Sudo abuse'],
    description: 'Um blog CMS com painel administrativo acessível em caminho não-óbvio. Credenciais simples, upload de arquivo para execução remota.',
    hint: 'Leia o código-fonte HTML da página inicial com atenção. Há um comentário relevante.'
  },
  {
    id: 'jerry', name: 'Jerry', day: 1, os: 'Windows', difficulty: 'Easy', timed: false,
    topics: ['Apache Tomcat', 'Default credentials', 'WAR deployment'],
    description: 'Apache Tomcat com Manager acessível. Credenciais padrão permitem upload de arquivo WAR malicioso para execução de código.',
    hint: 'Consulte listas de credenciais padrão do Apache Tomcat. O Manager está em /manager/html.'
  },
  {
    id: 'devel', name: 'Devel', day: 1, os: 'Windows', difficulty: 'Easy', timed: true, timerMinutes: 45,
    topics: ['FTP anônimo', 'IIS', 'Webshell ASPX', 'Kernel exploit'],
    description: 'FTP com acesso anônimo e permissão de escrita na raiz do IIS. Upload de webshell ASPX para RCE. Escalada via exploit de kernel.',
    hint: 'FTP anônimo permite escrita. Qual extensão o IIS executa por padrão?'
  },
  {
    id: 'blue', name: 'Blue', day: 1, os: 'Windows', difficulty: 'Easy', timed: true, timerMinutes: 45,
    topics: ['SMBv1', 'EternalBlue', 'MS17-010'],
    description: 'Windows 7 vulnerável ao EternalBlue (MS17-010). Exploit clássico via SMBv1 que resulta em acesso como SYSTEM.',
    hint: 'Execute scripts de vulnerabilidade do Nmap. O que os resultados revelam sobre a versão do SMB?'
  },
  {
    id: 'lame', name: 'Lame', day: 1, os: 'Linux', difficulty: 'Easy', timed: true, timerMinutes: 45,
    topics: ['Samba', 'CVE-2007-2447', 'Command injection'],
    description: 'Samba 3.0.20 vulnerável a injeção de comando no campo de username. Uma das máquinas mais antigas do HTB.',
    hint: 'Pesquise o CVE da versão do Samba encontrada no Nmap. O exploit envolve o campo de username.'
  },
  // Day 2 - Medium
  {
    id: 'forest', name: 'Forest', day: 2, os: 'Windows', difficulty: 'Medium', timed: false,
    topics: ['LDAP', 'AS-REP Roasting', 'BloodHound', 'DCSync'],
    description: 'DC do AD com enumeração via LDAP/RPC sem credenciais. AS-REP Roasting, BloodHound para mapear caminho até Domain Admin.',
    hint: 'Enumere usuários do domínio via RPC sem autenticação. Verifique quais não requerem pré-autenticação Kerberos.'
  },
  {
    id: 'sauna', name: 'Sauna', day: 2, os: 'Windows', difficulty: 'Medium', timed: false,
    topics: ['LDAP', 'AS-REP Roasting', 'AutoLogon', 'DCSync'],
    description: 'LDAP anônimo revela usuários. AS-REP Roasting para acesso inicial. Credenciais AutoLogon no registro para movimento lateral.',
    hint: 'Os nomes no site web podem sugerir usernames do domínio. Tente formatos comuns (nome.sobrenome, etc).'
  },
  {
    id: 'active', name: 'Active', day: 2, os: 'Windows', difficulty: 'Medium', timed: false,
    topics: ['SMB null session', 'GPP password', 'Kerberoasting'],
    description: 'SMB anônimo expõe share de replicação com Groups.xml contendo senha GPP criptografada. Kerberoasting para admin.',
    hint: 'Acesse o compartilhamento SMB anonimamente. Procure arquivos XML nas políticas de grupo.'
  },
  {
    id: 'monteverde', name: 'Monteverde', day: 2, os: 'Windows', difficulty: 'Medium', timed: true, timerMinutes: 60,
    topics: ['RPC enumeration', 'Password spray', 'Azure AD Connect'],
    description: 'Enumeração RPC expõe usuários. Spray de senha simples. Banco de dados Azure AD Connect contém credenciais em texto claro.',
    hint: 'Após listar usuários via RPC, tente senhas iguais ao próprio username para cada conta.'
  },
  {
    id: 'cascade', name: 'Cascade', day: 2, os: 'Windows', difficulty: 'Medium', timed: true, timerMinutes: 60,
    topics: ['LDAP attributes', 'AD Recycle Bin', 'VNC decrypt'],
    description: 'Atributos LDAP customizados contêm senha legada. AD Recycle Bin guarda objeto deletado com dados. Senha VNC para escalar.',
    hint: 'Enumere todos os atributos LDAP — não apenas os padrão. Preste atenção em campos incomuns.'
  },
  {
    id: 'cronos', name: 'Cronos', day: 2, os: 'Linux', difficulty: 'Medium', timed: true, timerMinutes: 60,
    topics: ['DNS zone transfer', 'SQLi auth bypass', 'Cron job privesc'],
    description: 'Transferência de zona DNS revela subdomínio administrativo. SQLi bypassa login. Cron job com escrita burca root.',
    hint: 'Tente uma transferência de zona DNS. Há subdomínios não visíveis no scan de porta inicial.'
  },
  // Day 3 - Hard
  {
    id: 'blackfield', name: 'Blackfield', day: 3, os: 'Windows', difficulty: 'Hard', timed: false,
    topics: ['AS-REP Roasting', 'BloodHound', 'ForceChangePassword', 'SeBackupPrivilege', 'NTDS'],
    description: 'SMB null session revela usernames. AS-REP Roasting. BloodHound mostra ForceChangePassword. SeBackupPrivilege para extrair NTDS.',
    hint: 'O share de perfis SMB contém diretórios com nomes de usuários do domínio.'
  },
  {
    id: 'sizzle', name: 'Sizzle', day: 3, os: 'Windows', difficulty: 'Hard', timed: false,
    topics: ['SCF attack', 'ADCS', 'Kerberoasting', 'DCSync'],
    description: 'Arquivo SCF em share SMB gravável captura hash NTLMv2. AD Certificate Services para autenticação. Kerberoasting até DCSync.',
    hint: 'Identifique shares SMB onde você pode escrever arquivos. Um arquivo especialmente criado pode capturar credenciais.'
  },
  {
    id: 'querier', name: 'Querier', day: 3, os: 'Windows', difficulty: 'Hard', timed: false,
    topics: ['MSSQL', 'xp_cmdshell', 'Responder', 'Silver Ticket'],
    description: 'Arquivo Excel no SMB tem string de conexão MSSQL. Habilitar xp_cmdshell. NTLMv2 via Responder para escalada.',
    hint: 'Baixe todos os arquivos dos shares SMB. Arquivos Office podem conter dados de conexão.'
  },
  {
    id: 'mantis', name: 'Mantis', day: 3, os: 'Windows', difficulty: 'Hard', timed: true, timerMinutes: 90,
    topics: ['Web app', '.NET decryption', 'MSSQL', 'Kerberos Bronze Bit'],
    description: 'Aplicação web .NET em porta 8080. Decriptar credenciais do banco de dados da configuração da app. MSSQL para credenciais do domínio.',
    hint: 'A aplicação web esconde dados codificados. Decodifique a string de conexão para obter credenciais.'
  },
  {
    id: 'reel2', name: 'Reel2', day: 3, os: 'Windows', difficulty: 'Hard', timed: true, timerMinutes: 90,
    topics: ['OWA phishing', 'JEA bypass', 'Sticky Notes'],
    description: 'Phishing via OWA com arquivo RTF captura NTLMv2. JEA constrained PowerShell com bypass. Sticky Notes contêm credenciais.',
    hint: 'Identifique o serviço de webmail acessível. Um arquivo de phishing pode capturar hashes automaticamente.'
  },
  {
    id: 'multimaster', name: 'Multimaster', day: 3, os: 'Windows', difficulty: 'Insane', timed: true, timerMinutes: 90,
    topics: ['SQLi WAF bypass', 'Sysmon', 'VS Code tunnel', 'Exchange abuse'],
    description: 'SQLi com bypass de WAF usando Unicode. Pivotar via Sysmon. Movimento lateral via túnel VS Code. Abuso de Exchange para privesc.',
    hint: 'A API web tem proteção WAF. Tente codificação Unicode para contornar os filtros de SQLi.'
  },
  // Day 4 - Extra
  {
    id: 'cap-speed', name: 'Cap (Speed Run)', day: 4, os: 'Linux', difficulty: 'Easy', timed: true, timerMinutes: 30,
    topics: ['Revisão rápida'],
    description: 'Refaça Cap com o tempo como pressão. Você já conhece o caminho — execute com eficiência.',
    hint: 'Sem dica. Você já sabe o que fazer.'
  },
  {
    id: 'nibbles-speed', name: 'Nibbles (Speed Run)', day: 4, os: 'Linux', difficulty: 'Easy', timed: true, timerMinutes: 30,
    topics: ['Revisão rápida'],
    description: 'Refaça Nibbles com cronômetro. Objetivo: root em menos de 30 minutos.',
    hint: 'Sem dica. Execute o fluxo completo do zero.'
  },
  {
    id: 'forest-speed', name: 'Forest (Speed Run)', day: 4, os: 'Windows', difficulty: 'Medium', timed: true, timerMinutes: 45,
    topics: ['Revisão AD'],
    description: 'Refaça Forest com cronômetro. Teste se você internalizou o fluxo de AS-REP Roasting → BloodHound → DCSync.',
    hint: 'Sem dica. Documente cada etapa como em um relatório real.'
  },
  {
    id: 'sauna-speed', name: 'Sauna (Speed Run)', day: 4, os: 'Windows', difficulty: 'Medium', timed: true, timerMinutes: 45,
    topics: ['Revisão AD'],
    description: 'Refaça Sauna com pressão de tempo. Foque em ser sistemático.',
    hint: 'Sem dica.'
  },
  {
    id: 'active-speed', name: 'Active (Speed Run)', day: 4, os: 'Windows', difficulty: 'Medium', timed: true, timerMinutes: 45,
    topics: ['Revisão AD'],
    description: 'GPP + Kerberoasting em menos de 45 minutos. Você consegue.',
    hint: 'Sem dica.'
  },
  {
    id: 'blackfield-speed', name: 'Blackfield (Speed Run)', day: 4, os: 'Windows', difficulty: 'Hard', timed: true, timerMinutes: 75,
    topics: ['Revisão avançada'],
    description: 'Hard em 75 minutos. Teste total de habilidade: AS-REP → BloodHound → SeBackupPrivilege → NTDS.',
    hint: 'Sem dica. Este é o teste.'
  },
  {
    id: 'querier-speed', name: 'Querier (Speed Run)', day: 4, os: 'Windows', difficulty: 'Hard', timed: true, timerMinutes: 75,
    topics: ['Revisão avançada'],
    description: 'MSSQL completo em 75 minutos. Demonstre domínio da cadeia de ataque.',
    hint: 'Sem dica.'
  },
  {
    id: 'multimaster-full', name: 'Multimaster (Desafio)', day: 4, os: 'Windows', difficulty: 'Insane', timed: true, timerMinutes: 90,
    topics: ['Desafio final'],
    description: 'Tentativa completa da cadeia Insane. Não é esperado completar — é esperado aprender.',
    hint: 'Unicode bypass: tente \u0027 em vez de aspas literais no campo da API.'
  },
];

export const slides: Slide[] = [
  // ==================== DAY 1 ====================
  {
    id: 'd1-tcpip-theory', title: 'Redes TCP/IP — Fundamentos', day: 1, topic: 'Redes',
    type: 'theory',
    content: {
      theory: [
        'TCP/IP é o conjunto de protocolos que sustenta toda a internet. Entender como ele funciona é pré-requisito para qualquer área de segurança.',
        'TCP (Transmission Control Protocol): orientado à conexão, entrega garantida e ordenada. Usa o 3-way handshake: SYN → SYN-ACK → ACK.',
        'UDP (User Datagram Protocol): sem conexão, mais rápido mas sem garantia de entrega. Usado por DNS, DHCP, streaming.',
        'IP (Internet Protocol): endereçamento lógico de máquinas na rede. IPv4 usa 32 bits (ex: 192.168.1.10). Máscara de sub-rede define quais bits identificam a rede.',
        'CIDR: notação compacta de máscara. /24 = 255.255.255.0 = 256 endereços. /32 = host único.',
        'Em CTF: compreender TCP/IP é essencial para análise de PCAP, enumeração de serviços e entender o que cada ferramenta faz na camada de rede.',
      ],
    }
  },
  {
    id: 'd1-ports-table', title: 'Portas e Serviços — Referência', day: 1, topic: 'Redes',
    type: 'table',
    content: {
      table: {
        headers: ['Porta', 'Protocolo', 'Serviço'],
        rows: [
          ['21', 'TCP', 'FTP — transferência de arquivo'],
          ['22', 'TCP', 'SSH — acesso remoto seguro'],
          ['23', 'TCP', 'Telnet — acesso remoto sem criptografia'],
          ['25', 'TCP', 'SMTP — envio de e-mail'],
          ['53', 'TCP/UDP', 'DNS — resolução de nomes'],
          ['80', 'TCP', 'HTTP — web sem criptografia'],
          ['110', 'TCP', 'POP3 — recebimento de e-mail'],
          ['139/445', 'TCP', 'SMB — compartilhamento de arquivos Windows'],
          ['443', 'TCP', 'HTTPS — web com TLS'],
          ['3306', 'TCP', 'MySQL — banco de dados'],
          ['3389', 'TCP', 'RDP — área de trabalho remota Windows'],
          ['5985/5986', 'TCP', 'WinRM — gerenciamento remoto Windows'],
          ['8080/8443', 'TCP', 'HTTP alternativo / proxy'],
        ]
      },
      tips: ['Decore estas portas. Em qualquer scan Nmap, a leitura rápida das portas abertas define a estratégia inicial.']
    }
  },
  {
    id: 'd1-dns-theory', title: 'DNS — Teoria e Enumeração', day: 1, topic: 'Redes',
    type: 'theory',
    content: {
      theory: [
        'DNS (Domain Name System): traduz nomes de domínio para endereços IP. Porta 53, UDP para queries, TCP para zone transfers.',
        'Tipos de registro: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (texto/SPF), NS (nameserver), PTR (reverso).',
        'Zone Transfer (AXFR): copia todos os registros de uma zona. Em ambientes mal configurados, expõe subdomínios internos.',
        'Em CTF: enumeração DNS é frequentemente o primeiro passo em máquinas com domínio — subdomínios revelam painéis admin, APIs internas.',
      ],
      commands: [
        'nslookup target.htb',
        'dig target.htb ANY',
        'dig @10.10.10.10 target.htb ANY',
        'dig axfr @10.10.10.10 target.htb   # zone transfer',
        'dig -x 10.10.10.10                  # reverse lookup',
        'host target.htb',
      ]
    }
  },
  {
    id: 'd1-dns-terminal', title: 'DNS — Terminal Realista', day: 1, topic: 'Redes',
    type: 'terminal',
    content: {
      terminal: [
        { type: 'prompt', text: 'dig axfr @10.10.10.10 target.htb' },
        { type: 'output', text: '; <<>> DiG 9.16.1 <<>> axfr @10.10.10.10 target.htb' },
        { type: 'output', text: ';; ANSWER SECTION:' },
        { type: 'output', text: 'target.htb.    600  IN  SOA   ns1.target.htb. admin.target.htb.' },
        { type: 'output', text: 'target.htb.    600  IN  A     10.10.10.10' },
        { type: 'output', text: 'admin.target.htb. 600 IN A   10.10.10.10' },
        { type: 'output', text: 'dev.target.htb.   600 IN A   10.10.10.10' },
        { type: 'output', text: 'ns1.target.htb.   600 IN A   10.10.10.10' },
        { type: 'comment', text: '# Zone transfer bem-sucedida: admin.target.htb e dev.target.htb revelados' },
        { type: 'prompt', text: 'echo "10.10.10.10  target.htb admin.target.htb dev.target.htb" >> /etc/hosts' },
        { type: 'comment', text: '# Adicione ao /etc/hosts antes de acessar os subdomínios' },
      ],
      tips: ['Se zone transfer falhar (REFUSED), tente subfinder, ffuf ou gobuster dns para descobrir subdomínios por força bruta.']
    }
  },
  {
    id: 'd1-http-theory', title: 'HTTP/HTTPS — Teoria', day: 1, topic: 'Web',
    type: 'theory',
    content: {
      theory: [
        'HTTP: protocolo sem estado, porta 80. HTTPS: HTTP sobre TLS, porta 443.',
        'Métodos: GET (buscar), POST (enviar dados), PUT/PATCH (atualizar), DELETE (remover), HEAD (só cabeçalhos), OPTIONS (capacidades).',
        'Códigos de status: 2xx sucesso, 3xx redirecionamento, 4xx erro do cliente (404 não encontrado, 403 proibido), 5xx erro do servidor.',
        'Cabeçalhos importantes: Authorization (credenciais), Cookie (sessão), X-Forwarded-For (IP real), Content-Type, Location (redirecionamento).',
      ],
      commands: [
        'curl -I http://target.htb              # somente cabeçalhos',
        'curl -v http://target.htb              # verbose com cabeçalhos',
        'curl -X POST -d "user=admin&pass=x" http://target.htb/login',
        'curl -b "session=abc123" http://target.htb/admin',
        'curl -H "Authorization: Bearer TOKEN" http://target.htb/api',
        'curl -L http://target.htb             # seguir redirecionamentos',
      ]
    }
  },
  {
    id: 'd1-ssh-theory', title: 'SSH — Teoria e Uso', day: 1, topic: 'Linux',
    type: 'theory',
    content: {
      theory: [
        'SSH (Secure Shell): acesso remoto criptografado, porta 22. Essencial para manter acesso após foothold.',
        'Autenticação por senha ou chave pública (preferível). Tipos de chave: RSA, ECDSA, ed25519.',
        'Arquivos: ~/.ssh/id_rsa (privada), ~/.ssh/id_rsa.pub (pública), ~/.ssh/authorized_keys (no servidor), ~/.ssh/known_hosts.',
        'Port Forwarding: -L (local), -R (remoto), -D (SOCKS proxy) — essencial para pivoting.',
      ],
      commands: [
        'ssh user@10.10.10.10',
        'ssh -i id_rsa user@10.10.10.10          # com chave privada',
        'ssh -p 2222 user@10.10.10.10            # porta alternativa',
        'ssh-keygen -t ed25519 -C "ctf"',
        'chmod 600 id_rsa                        # permissão obrigatória',
        'ssh -L 8080:localhost:80 user@10.10.10.10   # local port forward',
        'ssh -R 9090:localhost:4444 user@10.10.10.10 # remote port forward',
      ]
    }
  },
  {
    id: 'd1-ftp-terminal', title: 'FTP — Acesso Anônimo', day: 1, topic: 'Redes',
    type: 'terminal',
    content: {
      terminal: [
        { type: 'prompt', text: 'ftp 10.10.10.10' },
        { type: 'output', text: 'Connected to 10.10.10.10.' },
        { type: 'output', text: '220 (vsFTPd 3.0.3)' },
        { type: 'output', text: 'Name (10.10.10.10:kali): anonymous' },
        { type: 'output', text: '331 Please specify the password.' },
        { type: 'output', text: 'Password: [qualquer coisa]' },
        { type: 'output', text: '230 Login successful.' },
        { type: 'prompt', text: 'ls -la' },
        { type: 'output', text: '-rw-r--r--  1 0  0  1024 Jan 01 backup.zip' },
        { type: 'output', text: '-rw-r--r--  1 0  0   512 Jan 01 notes.txt' },
        { type: 'prompt', text: 'get backup.zip' },
        { type: 'output', text: '226 Transfer complete.' },
        { type: 'prompt', text: 'bye' },
      ],
      tips: ['FTP anônimo (anonymous/anything@) é encontrado com frequência em CTFs. Verifique sempre. Credenciais FTP em texto claro aparecem em PCAP — use filtro "ftp" no Wireshark.']
    }
  },
  {
    id: 'd1-smb-commands', title: 'SMB — Enumeração', day: 1, topic: 'Redes',
    type: 'commands',
    content: {
      theory: ['SMB (Server Message Block): porta 445. Compartilhamento de arquivos e impressoras Windows. SMBv1 tem EternalBlue (MS17-010). Sessão nula = acesso anônimo.'],
      commands: [
        'smbclient -L //10.10.10.10 -N          # listar shares, sem senha',
        'smbclient //10.10.10.10/share -N        # conectar anonimamente',
        'smbclient //10.10.10.10/share -U user   # com usuário',
        'enum4linux -a 10.10.10.10              # enumeração completa',
        'crackmapexec smb 10.10.10.10           # info rápida',
        'crackmapexec smb 10.10.10.10 -u user -p pass --shares',
        'crackmapexec smb 10.10.10.10 -u user -p pass --users',
      ],
      tips: ['Sempre tente acesso anônimo primeiro (-N). Muitos CTFs têm shares acessíveis sem credenciais com dados valiosos.']
    }
  },
  {
    id: 'd1-nmap-theory', title: 'Nmap — Fundamentos', day: 1, topic: 'Ferramentas',
    type: 'theory',
    content: {
      theory: [
        'Nmap: scanner de rede. SEMPRE o primeiro passo em qualquer CTF. Identifica portas abertas, serviços e versões.',
        'Tipos de scan: -sS (SYN/stealth — padrão, requer root), -sT (TCP connect), -sU (UDP), -sV (versão), -sC (scripts padrão).',
        'Timing: -T0 (mais lento/furtivo) a -T5 (mais rápido/barulhento). Padrão: -T3. Em CTF: use -T4.',
        'Output: -oN (normal), -oX (XML), -oG (grepable), -oA (todos). SEMPRE salve o output.',
        'Scripts NSE: --script=vuln (vulnerabilidades), --script=safe (não-destrutivos), scripts individuais por nome.',
      ],
      tips: [
        'Comando padrão para CTF: nmap -sC -sV -oN scan.txt 10.10.10.10',
        'Para todas as portas: nmap -p- --min-rate 5000 -oN allports.txt 10.10.10.10',
        'Sempre adicione -Pn se o host parece offline (firewall bloqueando ping)',
        'Analise cada porta aberta: serviço, versão, scripts. Não assuma — confirme.',
      ]
    }
  },
  {
    id: 'd1-nmap-terminal', title: 'Nmap — Terminal Realista', day: 1, topic: 'Ferramentas',
    type: 'terminal',
    content: {
      terminal: [
        { type: 'prompt', text: 'nmap -sC -sV -oN scan.txt 10.10.10.10' },
        { type: 'output', text: 'Starting Nmap 7.94 ( https://nmap.org )' },
        { type: 'output', text: 'Nmap scan report for 10.10.10.10' },
        { type: 'output', text: 'Host is up (0.023s latency).' },
        { type: 'output', text: '' },
        { type: 'output', text: 'PORT   STATE SERVICE VERSION' },
        { type: 'output', text: '22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu' },
        { type: 'output', text: '80/tcp open  http    Apache httpd 2.4.41' },
        { type: 'output', text: '|_http-title: Security Dashboard' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Nmap done: 1 IP address (1 host up) scanned in 12.45 seconds' },
        { type: 'comment', text: '# Erro comum: host parece offline' },
        { type: 'error', text: 'Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn' },
        { type: 'comment', text: '# Solução: adicionar -Pn' },
        { type: 'prompt', text: 'nmap -Pn -sC -sV -oN scan.txt 10.10.10.10' },
      ],
    }
  },
  {
    id: 'd1-linux-filesystem', title: 'Linux — Estrutura do Sistema', day: 1, topic: 'Linux',
    type: 'theory',
    content: {
      theory: [
        '/         — raiz do sistema de arquivos',
        '/etc      — arquivos de configuração (/etc/passwd, /etc/shadow, /etc/hosts, /etc/crontab)',
        '/home     — diretórios dos usuários',
        '/var      — dados variáveis: logs em /var/log/, spool em /var/spool/',
        '/tmp      — gravável por todos — alvo comum de ataques e uploads',
        '/proc     — sistema de arquivos virtual: info de processos (/proc/version, /proc/net/tcp)',
        '/opt      — software opcional instalado manualmente',
        '/usr/local/bin — binários instalados pelo usuário',
      ],
      commands: [
        'ls -la                                  # listar com ocultos',
        'cat /etc/passwd                         # usuários do sistema',
        'cat /etc/crontab                        # tarefas agendadas',
        'find / -perm -4000 2>/dev/null          # binários SUID',
        'find / -writable -type f 2>/dev/null    # arquivos graváveis',
        'history                                 # histórico de comandos',
        'whoami; id                              # usuário atual',
        'uname -a                                # info do kernel',
        'ps aux                                  # processos em execução',
        'netstat -tulpn                          # portas abertas',
      ]
    }
  },
  {
    id: 'd1-linux-permissions', title: 'Linux — Permissões e SUID', day: 1, topic: 'Linux',
    type: 'theory',
    content: {
      theory: [
        'Formato: -rwxr-xr-- = tipo / dono / grupo / outros',
        'Numérico: r=4, w=2, x=1. Somar: rwx=7, rw=6, rx=5, r=4.',
        '755 = rwxr-xr-x (padrão diretórios), 644 = rw-r--r-- (padrão arquivos).',
        'SUID (4000): executa com as permissões do dono do arquivo. Se dono=root e SUID ativo = roda como root.',
        'SGID (2000): executa com permissões do grupo do arquivo.',
        'Sticky bit (1000): somente o dono pode deletar (usado em /tmp).',
        'SUID é o vetor de escalada de privilégio mais comum em CTFs Linux.',
      ],
      commands: [
        'find / -perm -4000 -type f 2>/dev/null  # todos os binários SUID',
        'chmod 755 arquivo',
        'chmod +x script.sh',
        'chmod 4755 /usr/bin/python3             # setar SUID (requer root)',
        'ls -la /usr/bin/python3',
        'getcap -r / 2>/dev/null                 # buscar capabilities',
      ],
      tips: [
        'Após obter shell: execute imediatamente find / -perm -4000 2>/dev/null',
        'Consulte GTFOBins (gtfobins.github.io) para explorar qualquer binário SUID',
        'Capabilities (cap_setuid+ep) são equivalentes ao SUID mas mais granulares',
      ]
    }
  },
  {
    id: 'd1-linux-logs', title: 'Linux — Logs do Sistema', day: 1, topic: 'Linux',
    type: 'commands',
    content: {
      theory: ['Logs Linux são fundamentais para forense e investigação de incidentes. Saber onde procurar e como filtrar economiza tempo em CTFs.'],
      commands: [
        'tail -f /var/log/auth.log                   # autenticação em tempo real',
        'grep "Failed password" /var/log/auth.log    # falhas de login',
        'grep "Accepted" /var/log/auth.log           # logins bem-sucedidos',
        'cat /var/log/syslog | grep -i error         # erros gerais',
        'journalctl -u ssh                           # logs do serviço SSH',
        'journalctl --since "2024-01-01 00:00"       # por data',
        'last                                        # histórico de logins',
        'lastlog                                     # último login por usuário',
        'cat ~/.bash_history                         # histórico do bash',
        'cat /proc/version                           # versão do kernel/OS',
      ]
    }
  },
  {
    id: 'd1-windows-eventids', title: 'Windows — Event IDs Essenciais', day: 1, topic: 'Windows',
    type: 'table',
    content: {
      table: {
        headers: ['Event ID', 'Canal', 'Descrição'],
        rows: [
          ['4624', 'Security', 'Logon bem-sucedido'],
          ['4625', 'Security', 'Falha de logon'],
          ['4634', 'Security', 'Logoff'],
          ['4648', 'Security', 'Logon com credenciais explícitas (RunAs)'],
          ['4672', 'Security', 'Privilégios especiais atribuídos (logon de admin)'],
          ['4688', 'Security', 'Novo processo criado'],
          ['4697', 'Security', 'Serviço instalado no sistema'],
          ['4720', 'Security', 'Conta de usuário criada'],
          ['4722', 'Security', 'Conta de usuário ativada'],
          ['4728', 'Security', 'Usuário adicionado a grupo global'],
          ['4732', 'Security', 'Usuário adicionado a grupo local'],
          ['1102', 'Security', 'Log de auditoria limpo — CRÍTICO'],
        ]
      },
      tips: [
        '4625 em sequência rápida = indicador de brute force',
        '4688 mostra cadeia de processos — identifique processos pai suspeitos',
        '1102 = atacante limpando rastros. Investigue tudo antes deste evento.',
        '4672 logo após 4624 = admin logado. Correlacione com IP de origem.',
      ]
    }
  },
  {
    id: 'd1-wireshark', title: 'Wireshark — Filtros Essenciais', day: 1, topic: 'Forense',
    type: 'commands',
    content: {
      theory: ['Wireshark analisa arquivos .pcap e .pcapng. Follow TCP Stream reconstrói conversas completas. Export HTTP Objects extrai arquivos transferidos.'],
      commands: [
        'http                                        # todo tráfego HTTP',
        'http.request.method == "POST"              # somente POST',
        'http contains "password"                   # buscar string no HTTP',
        'dns                                        # queries DNS',
        'ftp                                        # comandos FTP',
        'ftp-data                                   # dados transferidos por FTP',
        'smb                                        # tráfego SMB',
        'ip.addr == 10.10.10.10                    # por IP',
        'tcp.port == 80                             # por porta',
        'tcp.stream eq 5                            # stream TCP específico',
      ],
      tips: [
        'Statistics → Protocol Hierarchy: visão geral dos protocolos no PCAP',
        'Follow → TCP Stream: reconstruir conversa completa',
        'File → Export Objects → HTTP: extrair arquivos transferidos',
        'FTP e Telnet transmitem credenciais em texto claro — sempre filtre',
      ]
    }
  },
  {
    id: 'd1-web-vulns', title: 'Web — Vulnerabilidades Comuns', day: 1, topic: 'Web',
    type: 'theory',
    content: {
      theory: [
        'SQL Injection: injeção de código SQL em queries. Payloads: \' OR \'1\'=\'1, admin\'--',
        'XSS: injeção de JavaScript no HTML. Payload: <script>alert(document.cookie)</script>',
        'LFI (Local File Inclusion): incluir arquivos locais via parâmetro. Payload: ?page=../../../../etc/passwd',
        'Command Injection: executar comandos OS via parâmetro. Payloads: ; ls, | whoami, && id',
        'IDOR (Insecure Direct Object Reference): alterar ID para acessar dados de outros usuários. Ex: ?id=1 → ?id=2',
        'Directory Traversal: acessar arquivos fora do diretório web. Payload: ../../../etc/passwd',
        'Upload inseguro: enviar arquivo com extensão maliciosa (.php, .aspx) quando apenas imagens são permitidas',
      ],
      commands: [
        'gobuster dir -u http://target.htb -w /usr/share/wordlists/dirb/common.txt',
        'ffuf -u http://target.htb/FUZZ -w /usr/share/wordlists/dirb/common.txt',
        'curl "http://target.htb/page?id=1\'"     # teste básico de SQLi',
        "curl 'http://target.htb/page?file=../../../../etc/passwd'   # LFI",
        'sqlmap -u "http://target.htb/?id=1" --dbs   # automatizar SQLi (lab apenas)',
      ]
    }
  },
  {
    id: 'd1-labs', title: 'Laboratórios — Dia 1 (Easy)', day: 1, topic: 'Labs',
    type: 'lab',
    content: {
      note: 'Todas as máquinas abaixo são do Hack The Box em ambiente autorizado. Conecte-se via VPN HTB antes de iniciar. Documente cada passo como se fosse um relatório real.'
    }
  },

  // ==================== DAY 2 ====================
  {
    id: 'd2-wazuh-theory', title: 'Wazuh — SIEM e XDR', day: 2, topic: 'Blue Team',
    type: 'theory',
    content: {
      theory: [
        'SIEM (Security Information and Event Management): coleta, normaliza e correlaciona eventos de segurança de múltiplas fontes.',
        'XDR (Extended Detection and Response): correlação entre endpoint, rede e nuvem em uma única plataforma.',
        'Wazuh Manager: servidor central que processa logs e gera alertas.',
        'Wazuh Agent: instalado nos endpoints (Windows/Linux). Coleta logs locais, FIM, SCA e envia ao Manager.',
        'Decoder: analisa o formato do log bruto e extrai campos estruturados (srcip, dstuser, action).',
        'Rule: define condições para gerar um alerta. Cada rule tem ID único e level de severidade (0-15).',
        'Alert level: 0-3 informativo, 4-6 baixo, 7-11 médio, 12-15 crítico. Level 7+ normalmente aparece no dashboard.',
        'FIM (File Integrity Monitoring): detecta criação, modificação e deleção de arquivos monitorados.',
        'SCA (Security Configuration Assessment): verifica conformidade com benchmarks de hardening.',
      ]
    }
  },
  {
    id: 'd2-wazuh-investigation', title: 'Wazuh — Investigando um Alerta', day: 2, topic: 'Blue Team',
    type: 'theory',
    content: {
      theory: [
        'Passo 1: Identifique o Rule ID e Level. Level 12+ = alta prioridade.',
        'Passo 2: Leia a descrição da rule. O que ela detecta exatamente?',
        'Passo 3: Analise os campos decodificados: srcip (IP origem), dstip (IP destino), user (usuário), file (arquivo), process (processo).',
        'Passo 4: Correlacione com outros alertas do mesmo srcip/user/host no mesmo intervalo de tempo.',
        'Passo 5: Mapeie para MITRE ATT&CK. Qual técnica descreve este comportamento?',
        'Passo 6: Determine se é falso positivo ou incidente real. Colete evidências.',
      ],
      tips: [
        'Filtre por srcip para ver todos os alertas de um mesmo IP — padrão revela intenção',
        'Correlacione timestamps: múltiplos alertas em segundos = automação/ferramenta',
        'FIM + login suspeito no mesmo host = comprometimento confirmado',
        'Wazuh mostra o log original — leia o raw log, não apenas o alerta processado',
      ]
    }
  },
  {
    id: 'd2-windows-logs', title: 'Windows — PowerShell e Event Viewer', day: 2, topic: 'Windows',
    type: 'commands',
    content: {
      theory: ['Consultas PowerShell para Event Viewer são fundamentais em blue team. Mais eficientes do que interface gráfica para filtrar grandes volumes de logs.'],
      commands: [
        '# Filtrar por Event ID',
        'Get-WinEvent -LogName Security -FilterXPath "*[System[EventID=4625]]" | Select -First 20',
        '',
        '# Múltiplos Event IDs',
        'Get-WinEvent -LogName Security | Where-Object {$_.Id -in @(4624,4625,4648)} | Format-List',
        '',
        '# Ler arquivo .evtx exportado',
        'Get-WinEvent -Path "C:\\log.evtx" -FilterXPath "*[System[EventID=1]]"',
        '',
        '# Sysmon — criação de processo',
        'Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" -FilterXPath "*[System[EventID=1]]"',
        '',
        '# Buscar por usuário específico',
        'Get-WinEvent -LogName Security | Where-Object {$_.Message -like "*Administrator*"}',
      ]
    }
  },
  {
    id: 'd2-sysmon', title: 'Sysmon — Event IDs', day: 2, topic: 'Windows',
    type: 'table',
    content: {
      table: {
        headers: ['Event ID', 'Evento Sysmon'],
        rows: [
          ['1', 'Criação de processo — command line completa, hash, pai'],
          ['2', 'Alteração de timestamp de arquivo'],
          ['3', 'Conexão de rede — IP/porta de origem e destino'],
          ['7', 'DLL carregada no processo'],
          ['10', 'Acesso a processo (OpenProcess)'],
          ['11', 'Arquivo criado'],
          ['12', 'Registro criado/deletado'],
          ['13', 'Registro modificado (valor set)'],
          ['15', 'Arquivo criado com stream alternativo (ADS)'],
          ['22', 'Query DNS'],
          ['23', 'Arquivo deletado (com hash)'],
        ]
      },
      tips: [
        'Sysmon Event 1 é o mais valioso: mostra processo pai + filho + command line + hash',
        'Sysmon Event 3 revela conexões de rede de processos — identifica beaconing C2',
        'Sysmon Event 7 (DLL) junto com Event 10 (OpenProcess) pode indicar injeção de código',
      ]
    }
  },
  {
    id: 'd2-ad-theory', title: 'Active Directory — Conceitos', day: 2, topic: 'Active Directory',
    type: 'theory',
    content: {
      theory: [
        'Domain: agrupamento lógico de computadores e usuários gerenciados centralmente por um Domain Controller (DC).',
        'Domain Controller: servidor executando AD DS. Autentica usuários, aplica políticas, armazena diretório.',
        'Usuários e Grupos: Domain Admins (admins locais ao domínio), Enterprise Admins (toda a floresta), Schema Admins.',
        'Kerberos: protocolo de autenticação padrão do AD. Baseado em tickets. TGT (Ticket Granting Ticket), TGS (Service Ticket). Porta 88.',
        'LDAP: protocolo de consulta ao diretório. Porta 389 (LDAP), 636 (LDAPS). Usado por ferramentas de enumeração.',
        'NTLM: protocolo legado de autenticação baseado em hash. Challenge-Response. Mais fraco que Kerberos.',
        'SPNs (Service Principal Names): identificam serviços Kerberos. Associados a contas de serviço — alvo de Kerberoasting.',
      ]
    }
  },
  {
    id: 'd2-ad-attacks', title: 'Active Directory — Ataques Comuns', day: 2, topic: 'Active Directory',
    type: 'theory',
    content: {
      theory: [
        'AS-REP Roasting: contas com "não requer pré-autenticação Kerberos" — qualquer um pode solicitar o hash TGT sem senha.',
        'Kerberoasting: solicitar tickets de serviço para contas com SPN. O ticket é criptografado com a senha da conta de serviço — quebrável offline.',
        'Pass-the-Hash: usar o hash NTLM diretamente para autenticar, sem precisar da senha em texto claro.',
        'DCSync: simular um DC pedindo replicação ao DC real — extrai todos os hashes do domínio.',
        'BloodHound: mapeia relações no AD e encontra caminhos de ataque até Domain Admin.',
      ],
      commands: [
        '# AS-REP Roasting',
        'GetNPUsers.py target.htb/ -usersfile users.txt -no-pass -outputfile asrep.txt',
        '',
        '# Kerberoasting',
        'GetUserSPNs.py target.htb/user:pass -request -outputfile kerb.txt',
        '',
        '# BloodHound coleta',
        'bloodhound-python -d target.htb -u user -p pass -ns 10.10.10.10 -c All',
        '',
        '# Crack de hash',
        'hashcat -m 18200 asrep.txt /usr/share/wordlists/rockyou.txt  # AS-REP',
        'hashcat -m 13100 kerb.txt /usr/share/wordlists/rockyou.txt   # Kerberoast',
      ]
    }
  },
  {
    id: 'd2-disk-forensics', title: 'Forense de Disco — Fundamentos', day: 2, topic: 'Forense',
    type: 'theory',
    content: {
      theory: [
        'Imagem forense: cópia bit-a-bit do disco. Formatos: .dd (raw), .E01 (EnCase, com metadados).',
        'Hash: MD5/SHA256 da imagem = cadeia de custódia. Sempre verifique antes e depois de trabalhar.',
        'NUNCA trabalhe na evidência original — sempre em uma cópia. Preservação é crítica.',
        'Timestamps MACB: Modified (conteúdo), Accessed (leitura), Changed ($MFT), Born (criação).',
        'Timeline: ordenar eventos por timestamp para reconstruir o que aconteceu e quando.',
      ],
      commands: [
        'sha256sum imagem.dd > hash_original.txt    # gerar hash',
        'sha256sum imagem.dd                        # verificar integridade',
        'mmls imagem.dd                             # tabela de partições',
        'fls -r imagem.dd                           # listar arquivos',
        'icat imagem.dd 12345                       # extrair por inode',
        'autopsy                                    # interface gráfica',
      ]
    }
  },
  {
    id: 'd2-windows-artifacts', title: 'Artefatos Windows — Referência', day: 2, topic: 'Forense',
    type: 'table',
    content: {
      table: {
        headers: ['Artefato', 'Localização', 'O que revela'],
        rows: [
          ['$MFT', 'Raiz NTFS', 'Todos os arquivos: nome, tamanho, timestamps, localização'],
          ['$Recycle.Bin', 'C:\\$Recycle.Bin\\', 'Arquivos deletados com nome original e timestamp'],
          ['Prefetch', 'C:\\Windows\\Prefetch\\', 'Evidência de execução de programa (até 128 apps)'],
          ['AmCache', 'C:\\Windows\\AppCompat\\Programs\\Amcache.hve', 'Execução de programa + SHA1 do binário'],
          ['ShimCache', 'SYSTEM hive → SYSTEM\\CurrentControlSet\\Control\\SessionManager\\AppCompatCache', 'Histórico de execução de programas'],
          ['LNK files', 'C:\\Users\\user\\AppData\\Roaming\\Microsoft\\Windows\\Recent\\', 'Arquivos abertos recentemente + timestamps'],
          ['Jump Lists', 'C:\\Users\\user\\AppData\\Roaming\\Microsoft\\Windows\\Recent\\AutomaticDestinations\\', 'Arquivos abertos por aplicação'],
          ['Registry hives', 'C:\\Windows\\System32\\config\\', 'SAM (hashes locais), SYSTEM, SOFTWARE'],
          ['NTUSER.DAT', 'C:\\Users\\user\\', 'Configurações do usuário, histórico do Explorer'],
          ['Browser History', 'AppData\\Local\\Google\\Chrome\\User Data\\Default\\', 'URLs visitadas, downloads'],
        ]
      },
      tips: ['Prefetch prova execução mesmo se o arquivo foi deletado. AmCache tem o SHA1 — consulte no VirusTotal se suspeito.']
    }
  },
  {
    id: 'd2-linux-artifacts', title: 'Artefatos Linux — Referência', day: 2, topic: 'Forense',
    type: 'table',
    content: {
      table: {
        headers: ['Artefato', 'Localização', 'O que revela'],
        rows: [
          ['/etc/passwd', '/etc/passwd', 'Usuários do sistema, shells, UIDs'],
          ['/etc/shadow', '/etc/shadow', 'Hashes de senhas'],
          ['bash_history', '~/.bash_history', 'Comandos executados pelo usuário'],
          ['auth.log', '/var/log/auth.log', 'Logins SSH, sudo, falhas de autenticação'],
          ['syslog', '/var/log/syslog', 'Eventos gerais do sistema'],
          ['cron', '/etc/crontab, /etc/cron.*', 'Tarefas agendadas — persistência comum'],
          ['authorized_keys', '~/.ssh/authorized_keys', 'Chaves SSH autorizadas — backdoor persistente'],
          ['/tmp', '/tmp', 'Arquivos temporários, uploads de atacantes'],
          ['/proc', '/proc/[PID]/', 'Processos em execução: cmdline, net/tcp'],
          ['wtmp/btmp', '/var/log/wtmp, /var/log/btmp', 'Histórico de logins bem-sucedidos/falhos'],
        ]
      }
    }
  },
  {
    id: 'd2-pcap-intermediate', title: 'PCAP — Análise Intermediária', day: 2, topic: 'Forense',
    type: 'commands',
    content: {
      theory: ['Análise avançada de PCAP: extrair credenciais, reconstruir sessões, identificar C2.'],
      commands: [
        '# Filtros avançados',
        'http.request.method == "POST" && http contains "password"',
        'ftp-data                                   # dados transferidos por FTP',
        'smtp                                       # tráfego de e-mail',
        'http.response.code == 200                  # respostas bem-sucedidas',
        '',
        '# Workflow de análise',
        '1. Statistics → Protocol Hierarchy (visão geral)',
        '2. Filtrar protocolo suspeito',
        '3. Follow → TCP Stream (reconstruir sessão)',
        '4. File → Export Objects → HTTP (extrair arquivos)',
        '5. Verificar credenciais em texto claro: FTP, Telnet, HTTP Basic Auth',
      ],
      tips: [
        'SMTP pode conter credenciais Base64 encoded — decodifique com: echo "base64" | base64 -d',
        'HTTP Basic Auth: "Authorization: Basic" + base64(user:senha)',
        'FTP command channel (porta 21): USER e PASS em texto claro',
        'Procure por data exfiltration: grandes transferências para IPs externos',
      ]
    }
  },
  {
    id: 'd2-labs', title: 'Laboratórios — Dia 2 (Medium)', day: 2, topic: 'Labs',
    type: 'lab',
    content: {
      note: 'Máquinas medium exigem encadeamento de vulnerabilidades. Não existe um único exploit — é uma série de passos. Documente cada etapa.'
    }
  },

  // ==================== DAY 3 ====================
  {
    id: 'd3-memory-theory', title: 'Forense de Memória — Fundamentos', day: 3, topic: 'Forense',
    type: 'theory',
    content: {
      theory: [
        'RAM contém evidências que nunca aparecem em disco: processos, conexões, chaves de criptografia, malware injetado.',
        'Formatos de dump: .raw (dump bruto), .mem, .vmem (VMware), .dmp (crash dump Windows).',
        'Aquisição: ferramenta dedicada no sistema alvo (WinPmem, DumpIt, LiME para Linux). Nunca copie sem ferramenta específica.',
        'Volatility 3: framework Python de análise de memória. Baseado em plugins por OS (windows.*, linux.*, mac.*).',
        'Identificar perfil: Volatility 3 detecta automaticamente o OS da memória.',
      ],
      commands: [
        'python3 vol.py -f memory.raw windows.info        # info do sistema',
        'python3 vol.py -f memory.raw windows.pslist      # lista de processos',
        'python3 vol.py -f memory.raw windows.pstree      # árvore de processos',
        'python3 vol.py -f memory.raw windows.cmdline     # linha de comando',
        'python3 vol.py -f memory.raw windows.netscan     # conexões de rede',
        'python3 vol.py -f memory.raw windows.dlllist     # DLLs carregadas',
        'python3 vol.py -f memory.raw windows.malfind     # regiões suspeitas',
        'python3 vol.py -f memory.raw windows.filescan    # arquivos abertos',
        'python3 vol.py -f memory.raw windows.hashdump    # hashes de senha',
        'python3 vol.py -f memory.raw windows.dumpfiles --physaddr 0x... # extrair arquivo',
      ]
    }
  },
  {
    id: 'd3-memory-malware', title: 'Volatility — Identificando Malware', day: 3, topic: 'Forense',
    type: 'terminal',
    content: {
      terminal: [
        { type: 'prompt', text: 'python3 vol.py -f memory.raw windows.pstree' },
        { type: 'output', text: 'PID  PPID  ImageFileName     Offset   Threads' },
        { type: 'output', text: '4    0     System            0x804d...  140' },
        { type: 'output', text: '672  4     smss.exe          0x821a...    3' },
        { type: 'output', text: '756  672   csrss.exe         0x81f2...   10' },
        { type: 'output', text: '836  672   winlogon.exe      0x820d...   19' },
        { type: 'output', text: '1748 1500  WINWORD.EXE       0x89ab...   12' },
        { type: 'output', text: '2156 1748  cmd.exe           0x8a3f...    1   <-- SUSPEITO' },
        { type: 'output', text: '2200 2156  powershell.exe    0x8b12...    4   <-- SUSPEITO' },
        { type: 'comment', text: '# Word gerando cmd.exe → powershell = macro maliciosa' },
        { type: 'prompt', text: 'python3 vol.py -f memory.raw windows.cmdline --pid 2200' },
        { type: 'output', text: 'PID 2200: powershell.exe -EncodedCommand JABjAD0ATgBlAHcALQBPAGIAagBlAGMA...' },
        { type: 'comment', text: '# Base64 encoded — decodifique: echo "JABj..." | base64 -d' },
      ],
      tips: [
        'malfind detecta memória com permissão RWX e header PE (MZ) — indica código injetado',
        'Processo sem pai visível ou com parent PID incorreto = suspeito',
        'netscan com Office/Word/Explorer fazendo conexões externas = comprometimento',
      ]
    }
  },
  {
    id: 'd3-malware-static', title: 'Malware — Análise Estática', day: 3, topic: 'Malware',
    type: 'commands',
    content: {
      theory: ['Análise estática: examinar o binário sem executar. Seguro, rápido. Ponto de partida obrigatório.'],
      commands: [
        'file malware.exe                        # tipo de arquivo',
        'strings malware.exe                     # strings ASCII',
        'strings -e l malware.exe               # strings Unicode (Windows)',
        'md5sum malware.exe; sha256sum malware.exe  # hashes',
        'objdump -d malware.exe                  # disassembly',
        'readelf -h malware.elf                  # ELF headers (Linux)',
        'xxd malware.exe | head -20              # hex dump',
      ],
      tips: [
        'Strings suspeitas: URLs (http://), IPs, cmd.exe, powershell.exe, regsvr32.exe',
        'Chaves de registry Run: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run = persistência',
        'Strings em Base64 longa = payload codificado',
        'Assinaturas de packer: "UPX" → use upx -d para desempacotar',
      ]
    }
  },
  {
    id: 'd3-mitre-framework', title: 'MITRE ATT&CK — Framework', day: 3, topic: 'MITRE',
    type: 'theory',
    content: {
      theory: [
        'MITRE ATT&CK: base de conhecimento de táticas e técnicas de adversários reais. Padrão da indústria.',
        'Táticas (o PORQUÊ): Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact.',
        'Técnicas (o COMO): identificadas por T-number. Ex: T1059.001 = PowerShell.',
        'Sub-técnicas: detalham implementações específicas de uma técnica.',
        'Uso em CTF: ao encontrar uma técnica, identifique a tática correspondente e documente o T-number no relatório.',
      ],
      table: {
        headers: ['Evidência', 'Técnica MITRE'],
        rows: [
          ['net user hacker /add', 'T1136.001 — Create Local Account'],
          ['Word.exe → cmd.exe (Event 4688)', 'T1055 — Process Injection'],
          ['Scheduled Task (Event 4698)', 'T1053.005 — Scheduled Task/Job'],
          ['LSASS memory access', 'T1003.001 — OS Credential Dumping: LSASS'],
          ['Regsvr32 executando DLL', 'T1218.010 — Regsvr32'],
          ['PowerShell encoded command', 'T1059.001 — PowerShell'],
          ['nmap / masscan', 'T1046 — Network Service Discovery'],
          ['Chave Run no Registry', 'T1547.001 — Registry Run Keys'],
        ]
      }
    }
  },
  {
    id: 'd3-privesc-linux', title: 'Privilege Escalation Linux — Metodologia', day: 3, topic: 'Red Team',
    type: 'commands',
    content: {
      theory: ['Escalada de privilégios Linux: mover de usuário limitado para root. Metodologia sistemática — nunca pule etapas.'],
      commands: [
        '# 1. Informações do sistema',
        'uname -a; cat /etc/os-release; cat /proc/version',
        '',
        '# 2. Usuário atual',
        'whoami; id; sudo -l',
        '',
        '# 3. SUID e capabilities',
        'find / -perm -4000 -type f 2>/dev/null',
        'getcap -r / 2>/dev/null',
        '',
        '# 4. Cron jobs',
        'cat /etc/crontab; ls -la /etc/cron.*; crontab -l',
        '',
        '# 5. Serviços rodando como root',
        'ps aux | grep root',
        '',
        '# 6. PATH e arquivos graváveis',
        'echo $PATH',
        'find / -writable -type f 2>/dev/null | grep -v proc',
        '',
        '# 7. Senhas em arquivos de configuração',
        'grep -r "password" /etc/ 2>/dev/null',
        'find / -name "*.conf" -exec grep -l "pass" {} \\; 2>/dev/null',
      ],
      tips: [
        'GTFOBins (gtfobins.github.io): referência para explorar qualquer binário SUID',
        'sudo -l: se mostra NOPASSWD, explore imediatamente via GTFOBins',
        'Cron com script gravável = escrita de payload + aguardar execução agendada',
      ]
    }
  },
  {
    id: 'd3-privesc-windows', title: 'Privilege Escalation Windows — Metodologia', day: 3, topic: 'Red Team',
    type: 'commands',
    content: {
      theory: ['Escalada Windows: tokens, serviços mal configurados, AlwaysInstallElevated, DLL hijacking.'],
      commands: [
        '# 1. Informações do usuário',
        'whoami /priv',
        'whoami /groups',
        '',
        '# 2. Sistema',
        'systeminfo',
        'wmic qfe get Caption,Description,HotFixID  # patches instalados',
        '',
        '# 3. Serviços com caminho não-aspado',
        'wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\\windows"',
        '',
        '# 4. Permissões de serviço',
        'accesschk.exe -uwcqv "Everyone" * /accepteula',
        'accesschk.exe -uwcqv "Users" * /accepteula',
        '',
        '# 5. AlwaysInstallElevated',
        'reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated',
        'reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated',
      ],
      tips: [
        'SeImpersonatePrivilege → JuicyPotato (2019) ou PrintSpoofer (2020) para SYSTEM',
        'LOLBAS (lolbas-project.github.io): binários Windows nativos para privesc/bypass',
        'Unquoted service path: se "C:\\Program Files\\App\\service.exe" → crie "C:\\Program.exe"',
      ]
    }
  },
  {
    id: 'd3-labs', title: 'Laboratórios — Dia 3 (Hard)', day: 3, topic: 'Labs',
    type: 'lab',
    content: {
      note: 'Máquinas difíceis exigem encadeamento complexo de técnicas. Espere gastar 2-4 horas em cada na primeira vez. Pesquise ativamente — não fique travado por mais de 20 minutos sem tentar uma abordagem diferente.'
    }
  },

  // ==================== DAY 4 ====================
  {
    id: 'd4-checklist', title: 'Checklist de Análise de Incidente', day: 4, topic: 'Revisão',
    type: 'checklist',
    content: {
      checklist: [
        'Qual IP atacou?',
        'Qual máquina foi comprometida?',
        'Qual usuário foi usado?',
        'Qual porta foi explorada?',
        'Qual processo suspeito rodou?',
        'Qual arquivo foi criado ou modificado?',
        'Qual comando foi executado?',
        'Qual horário do ataque?',
        'Qual persistência foi criada?',
        'Qual log comprova isso?',
        'Qual Event ID comprova isso?',
        'Qual alerta do Wazuh comprova isso?',
        'Qual técnica MITRE se encaixa?',
        'Qual artefato de disco confirma?',
        'Qual artefato de memória confirma?',
      ]
    }
  },
  {
    id: 'd4-cheatsheet', title: 'Cheat Sheet — Comandos Essenciais', day: 4, topic: 'Revisão',
    type: 'cheatsheet',
    content: {
      commands: [
        '# ========== RECONHECIMENTO ==========',
        'nmap -sC -sV -oN scan.txt <IP>',
        'nmap -p- --min-rate 5000 -oN allports.txt <IP>',
        'nmap -Pn -sC -sV <IP>         # quando host parece offline',
        '',
        '# ========== WEB ==========',
        'gobuster dir -u http://<IP> -w /usr/share/wordlists/dirb/common.txt',
        'ffuf -u http://<IP>/FUZZ -w /usr/share/wordlists/dirb/common.txt',
        'curl -v -X POST -d "user=admin" http://<IP>/login',
        '',
        '# ========== SMB ==========',
        'smbclient -L //<IP> -N',
        'smbclient //<IP>/share -N',
        'crackmapexec smb <IP> -u user -p pass --shares',
        '',
        '# ========== ACTIVE DIRECTORY ==========',
        'GetNPUsers.py <domain>/ -usersfile users.txt -no-pass',
        'GetUserSPNs.py <domain>/user:pass -request',
        'bloodhound-python -d <domain> -u user -p pass -ns <dc_ip> -c All',
        'secretsdump.py <domain>/user:pass@<IP>',
        '',
        '# ========== LINUX PRIVESC ==========',
        'find / -perm -4000 2>/dev/null',
        'sudo -l',
        'getcap -r / 2>/dev/null',
        'cat /etc/crontab',
        '',
        '# ========== WINDOWS PRIVESC ==========',
        'whoami /priv',
        'whoami /groups',
        'systeminfo',
        '',
        '# ========== FORENSE DE MEMÓRIA ==========',
        'python3 vol.py -f mem.raw windows.pslist',
        'python3 vol.py -f mem.raw windows.cmdline',
        'python3 vol.py -f mem.raw windows.netscan',
        'python3 vol.py -f mem.raw windows.malfind',
        '',
        '# ========== HASH CRACKING ==========',
        'hashcat -m 0 hash.txt rockyou.txt      # MD5',
        'hashcat -m 1000 hash.txt rockyou.txt   # NTLM',
        'hashcat -m 18200 hash.txt rockyou.txt  # AS-REP',
        'hashcat -m 13100 hash.txt rockyou.txt  # Kerberoast',
        'john hash.txt --wordlist=rockyou.txt',
        '',
        '# ========== CRIPTOGRAFIA / STEGO ==========',
        'echo "SGVsbG8=" | base64 -d',
        'echo "48656c6c6f" | xxd -r -p',
        'file arquivo.bin; strings arquivo.bin',
        'exiftool imagem.jpg',
        'steghide extract -sf imagem.jpg',
        'binwalk imagem.png',
        'foremost imagem.dd -o output/',
      ]
    }
  },
  {
    id: 'd4-fatal-errors', title: 'Erros Fatais — Nunca Faça Isso', day: 4, topic: 'Revisão',
    type: 'tips',
    content: {
      tips: [
        'Esquecer -Pn quando o host parece offline no Nmap — perde-se minutos por algo trivial',
        'Rodar gobuster sem especificar a wordlist — usa padrão vazio e encontra nada',
        'Assumir que a primeira porta aberta é o vetor — enumere TODAS as portas antes de explorar',
        'Não salvar o output do Nmap (-oN) — perde o scan e precisa refazer',
        'Não verificar acesso anônimo SMB antes de tentar autenticado',
        'Esquecer sudo -l imediatamente após obter um shell',
        'Reportar técnica MITRE errada — leia a descrição completa, não chute pelo nome',
        'Não documentar durante a prova — se não escreveu, não aconteceu',
        'Assumir que SMBv1 = EternalBlue sem verificar o patch level',
        'Usar ferramentas pesadas (sqlmap, metasploit) antes da enumeração manual básica',
      ]
    }
  },
  {
    id: 'd4-report', title: 'Como Escrever um Relatório', day: 4, topic: 'Revisão',
    type: 'theory',
    content: {
      theory: [
        '1. Sumário executivo (2 frases): O que aconteceu? Qual o impacto?',
        '2. Timeline: tabela com timestamp | evento | evidência. Ordene cronologicamente.',
        '3. Achados técnicos: para cada finding: descrição, evidência, técnica MITRE.',
        '4. Avaliação de impacto: o que o atacante pode ter acessado/modificado/exfiltrado.',
        '5. Recomendações: ações concretas para mitigar e prevenir.',
      ],
      tips: [
        'Seja específico: "Event ID 4625 às 03:14:22 de 192.168.1.100" não "houve falhas de login"',
        'Cada afirmação deve ter evidência que a suporta',
        'Técnicas MITRE dão credibilidade ao relatório — use os T-numbers corretos',
        'Timeline visual é mais impactante que texto corrido para apresentação',
      ]
    }
  },
  {
    id: 'd4-crypto', title: 'Criptografia e CTF Puzzles', day: 4, topic: 'CTF',
    type: 'commands',
    content: {
      theory: ['Puzzles de criptografia são comuns na categoria Misc/Crypto de CTFs. Conheça as codificações mais frequentes.'],
      commands: [
        '# Base64',
        'echo "SGVsbG8gV29ybGQ=" | base64 -d',
        'echo "Hello World" | base64',
        '',
        '# Hexadecimal',
        'echo "48656c6c6f" | xxd -r -p',
        'echo "Hello" | xxd',
        '',
        '# ROT13',
        'echo "Uryyb Jbeyq" | tr "A-Za-z" "N-ZA-Mn-za-m"',
        '',
        '# Hashes',
        'echo -n "senha" | md5sum',
        'echo -n "senha" | sha256sum',
        '',
        '# Esteganografia',
        'exiftool imagem.jpg            # metadados',
        'steghide info imagem.jpg       # verificar dados ocultos',
        'steghide extract -sf imagem.jpg -p ""   # extrair sem senha',
        'binwalk imagem.png             # arquivos embutidos',
        'foremost imagem.dd -o output/  # file carving',
        'strings imagem.png | grep -i flag',
        '',
        '# JWT',
        'cat token.txt | cut -d"." -f2 | base64 -d 2>/dev/null | python3 -m json.tool',
      ],
      tips: [
        'CyberChef (gchq.github.io/CyberChef): ferramenta online para qualquer codificação',
        'JWT com alg:none: remover assinatura pode bypassar verificação',
        'XOR com chave repetida: se chave curta, análise de frequência funciona',
        'Bacon cipher, Morse: reconheça os padrões visuais antes de tentar ferramentas',
      ]
    }
  },
  {
    id: 'd4-labs', title: 'Laboratórios Extra — Dia 4 (Cronometrados)', day: 4, topic: 'Labs',
    type: 'lab',
    content: {
      note: 'Todos os labs do Dia 4 têm cronômetro obrigatório. Simule condições reais de prova. Documente tudo conforme avança — não revise depois.'
    }
  },
];
