import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { LogOut, ChevronLeft } from "lucide-react";
import { teacherNotes, labSolutions } from "@/data/adminData";
import TerminalBlock from "@/components/TerminalBlock";

type CommandPart = {
  term: string;
  description: string;
};

const commandDescriptions: Record<string, string> = {
  nmap: "ferramenta usada para descobrir portas, serviços, versões e pistas de enumeração em um alvo autorizado.",
  curl: "cliente HTTP usado para ver a resposta bruta de uma página, endpoint ou arquivo sem depender do navegador.",
  grep: "filtra texto por padrão; aqui reduz a saída para linhas que contenham o termo procurado.",
  find: "procura arquivos e diretórios por critérios como permissão, nome, dono ou tipo.",
  getcap: "lista capabilities Linux aplicadas a binários.",
  cat: "mostra conteúdo de arquivo no terminal.",
  rm: "remove arquivos; no curso aparece para limpar artefatos temporários do lab.",
  gobuster: "ferramenta de enumeração por wordlist, usada para descobrir diretórios, arquivos ou vhosts.",
  smbclient: "cliente SMB que lista shares, acessa pastas compartilhadas e testa sessão nula ou credenciais.",
  "gpp-decrypt": "decifra o valor cpassword de Group Policy Preferences usando a chave pública conhecida da Microsoft.",
  "GetUserSPNs.py": "script do Impacket que enumera contas com SPN e pode solicitar tickets para Kerberoasting.",
  "GetNPUsers.py": "script do Impacket que testa contas sem pré-autenticação Kerberos e coleta hash AS-REP quando possível.",
  hashcat: "ferramenta de quebra offline de hashes; o modo escolhido define o tipo de hash analisado.",
  "psexec.py": "script do Impacket que usa credenciais válidas para executar comandos remotamente via SMB/RPC.",
  rpcclient: "cliente RPC para consultar informações de domínio, usuários e grupos em serviços Windows/Samba.",
  "bloodhound-python": "coletor que consulta o Active Directory e gera dados para análise de caminhos no BloodHound.",
  net: "ferramenta Windows/Samba para administrar usuários, grupos, senhas e recursos de domínio.",
  pypykatz: "ferramenta que analisa dumps do LSASS e extrai credenciais, hashes ou tickets quando presentes.",
  diskshadow: "utilitário Windows para criar e manipular cópias de sombra de volumes.",
  robocopy: "ferramenta robusta de cópia no Windows; com modo backup consegue copiar arquivos protegidos quando a permissão existe.",
  "secretsdump.py": "script do Impacket que extrai hashes de credenciais de sistemas Windows, online ou offline.",
  msfvenom: "gerador de payloads; aqui cria arquivo implantável para obter shell em laboratório autorizado.",
  linpeas: "script de enumeração local Linux; aponta pistas de privesc que precisam ser validadas manualmente.",
  "linpeas.sh": "script de enumeração local Linux; aponta pistas de privesc que precisam ser validadas manualmente.",
  "./linpeas.sh": "execução local do linPEAS no diretório atual do laboratório.",
  "/tmp/linpeas.sh": "caminho temporário do linPEAS no alvo Linux do laboratório.",
  wget: "cliente HTTP/FTP usado para baixar arquivos pelo terminal.",
  chmod: "altera permissões de arquivos e diretórios.",
  tee: "mostra a saída na tela e grava uma cópia em arquivo.",
  less: "visualizador de texto paginado, útil para revisar saídas longas.",
  sha256sum: "calcula hash SHA256 para identificar e registrar integridade de arquivo.",
  nc: "netcat: abre conexões TCP/UDP simples ou listeners em laboratório.",
  file: "identifica o tipo de um arquivo pelo conteúdo.",
  ls: "lista arquivos, permissões, tamanho e metadados básicos.",
  ssh: "cliente de acesso remoto seguro; usa usuário, host e credenciais para abrir uma sessão shell.",
  sudo: "executa um comando com privilégios elevados quando a política permite.",
  python3: "interpretador Python 3; aqui também pode servir arquivos via HTTP no laboratório.",
  "python3.8": "interpretador Python específico; nesta etapa é relevante porque possui capability perigosa.",
};

const optionDescriptions: Record<string, string> = {
  "-sC": "executa os scripts padrão do Nmap, equivalentes a --script=default; ajuda a coletar banners e enumeração inicial segura para CTF.",
  "-sV": "tenta identificar nome e versão dos serviços nas portas abertas.",
  "-sS": "SYN scan do Nmap; rápido e comum quando há privilégio/root.",
  "-sT": "TCP connect scan do Nmap; usa conexão completa quando não há privilégio para SYN scan.",
  "-sU": "UDP scan do Nmap; útil para DNS, SNMP, NTP e outros serviços UDP.",
  "-sn": "host discovery do Nmap sem varrer portas.",
  "-oN": "salva a saída normal em um arquivo, preservando evidência para relatório e revisão.",
  "-oA": "salva a saída em três formatos: normal, grepable e XML.",
  "-oX": "salva a saída em XML para importação ou processamento.",
  "-Pn": "pula a descoberta de host por ping e trata o alvo como ativo; útil quando ICMP ou probes iniciais são bloqueados.",
  "-p": "define a porta ou lista de portas que serão analisadas.",
  "-p-": "manda o Nmap varrer todas as portas TCP, de 1 a 65535.",
  "-p:payload": "no msfvenom, escolhe o payload que será colocado no arquivo gerado.",
  "--top-ports": "no Nmap, escaneia as portas mais comuns até o número informado.",
  "-F": "fast scan do Nmap, usando menos portas para uma triagem rápida.",
  "-A": "modo agressivo do Nmap: combina detecção de OS, versão, scripts padrão e traceroute.",
  "-O:nmap": "ativa tentativa de detecção de sistema operacional no Nmap.",
  "--script": "seleciona script NSE específico do Nmap.",
  "--script-help": "mostra ajuda de scripts NSE instalados.",
  "--reason": "mostra o motivo técnico do estado atribuído a cada porta.",
  "--open": "filtra a saída para mostrar apenas portas abertas ou provavelmente abertas.",
  "-iL": "lê alvos a partir de um arquivo.",
  "--exclude": "remove um alvo ou lista de alvos do escopo.",
  "-T": "define timing template do Nmap, de T0 a T5.",
  "--max-retries": "limita quantas vezes o Nmap repete probes sem resposta.",
  "--min-rate": "define uma taxa mínima de envio de pacotes para acelerar varreduras em laboratório.",
  "-L": "no smbclient, lista shares disponíveis no servidor em vez de abrir uma share específica.",
  "-L:curl": "no curl, segue redirects HTTP 301/302 até o destino final.",
  "-N": "tenta autenticar sem senha; usado para testar acesso anônimo ou sessão nula.",
  "-U": "define o usuário para autenticação RPC/SMB; string vazia indica tentativa sem usuário real.",
  "-s": "no curl, modo silencioso; remove barra de progresso e deixa a saída mais limpa para pipes.",
  "-i": "no grep, ignora diferença entre maiúsculas e minúsculas ao procurar o termo.",
  "-Ei": "no grep, usa expressão regular estendida e ignora maiúsculas/minúsculas.",
  "-R:grep": "no grep, busca recursivamente em diretórios.",
  "-perm": "no find, filtra por bits de permissão, como SUID 4000.",
  "-type": "no find, filtra por tipo de item, como f para arquivo e d para diretório.",
  "-u": "define usuário para autenticação em ferramentas como bloodhound-python.",
  "-u:url": "no gobuster, define a URL base que será enumerada.",
  "-p:password": "define senha em ferramentas que aceitam credenciais na linha de comando.",
  "-p:ports": "define porta ou lista de portas a escanear no Nmap.",
  "-w": "define a wordlist usada para testar caminhos, nomes ou senhas.",
  "-d": "define o domínio Active Directory consultado.",
  "-ns": "define o servidor DNS que o coletor deve usar para resolver o domínio.",
  "-c": "define quais coletores do BloodHound serão executados; All coleta o conjunto amplo.",
  "-c:python": "no Python, executa o código passado como string logo em seguida.",
  "-request": "solicita tickets Kerberos para contas com SPN, gerando material para Kerberoasting.",
  "-outputfile": "salva o resultado em um arquivo indicado, útil para passar para hashcat ou documentar evidência.",
  "-usersfile": "informa uma lista de usuários para testar em massa.",
  "-no-pass": "tenta a operação sem senha, comum em AS-REP Roasting para contas sem pré-autenticação.",
  "-m": "seleciona o modo do hashcat, ou seja, o tipo exato de hash que será quebrado.",
  "-m:python": "no Python, executa um módulo como programa.",
  "-ntds": "aponta o arquivo ntds.dit offline que contém o banco de credenciais do AD.",
  "-system": "aponta a hive SYSTEM usada para derivar chaves necessárias ao dump offline.",
  "-windows-auth": "usa autenticação integrada do Windows em vez de autenticação SQL local.",
  "-f": "define o formato do arquivo gerado pelo msfvenom.",
  "-f:rm": "no rm, força remoção sem pedir confirmação.",
  "-l:msfvenom": "no msfvenom, lista tipos disponíveis, como payloads, formatos ou encoders.",
  "-o": "define o arquivo de saída gerado por uma ferramenta.",
  "-O:wget": "no wget, define o caminho/nome do arquivo salvo.",
  "-la": "no ls, lista em formato longo incluindo arquivos ocultos.",
  "-lh": "no ls, lista em formato longo com tamanhos legíveis.",
  "+x": "adiciona permissão de execução ao arquivo no chmod.",
  "-R:less": "no less, preserva cores ANSI na visualização.",
  "-lvnp": "no netcat, abre listener verboso, sem DNS reverso, na porta indicada.",
  "-nv": "no netcat, conecta em modo verboso sem DNS reverso.",
  "-a": "em ferramentas de log, geralmente adiciona ao arquivo existente em vez de sobrescrever.",
  "/add": "adiciona o usuário ou objeto ao grupo informado.",
  "/domain": "aplica a operação no domínio, não apenas na máquina local.",
  "/user": "informa a credencial usada para autenticar a operação.",
  "/S": "define o servidor ou controlador de domínio contra o qual o comando será executado.",
  "/s": "no diskshadow, executa um script de comandos a partir de um arquivo.",
  "/b": "no robocopy, usa modo backup; requer privilégio apropriado e permite copiar arquivos protegidos.",
};

const valueDescriptions: Record<string, string> = {
  "scan.txt": "arquivo onde o resultado do scan inicial será salvo.",
  "kerb.txt": "arquivo que receberá o hash/ticket coletado para análise offline.",
  "asrep.txt": "arquivo onde os hashes AS-REP coletados serão salvos.",
  "hash.txt": "arquivo local contendo o hash que será quebrado.",
  "rockyou.txt": "wordlist usada para tentar senhas comuns em hashes de laboratório.",
  "/usr/share/wordlists/rockyou.txt": "caminho comum da wordlist rockyou em distribuições de pentest.",
  "users.txt": "lista de usuários que será testada pela ferramenta.",
  "common.txt": "wordlist de caminhos comuns usada para enumeração web.",
  "13100": "modo hashcat para Kerberos 5 TGS-REP etype 23, usado em Kerberoasting.",
  "18200": "modo hashcat para Kerberos 5 AS-REP etype 23, usado em AS-REP Roasting.",
  "8080": "porta TCP alvo; neste lab hospeda o Tomcat Manager.",
  "4444": "porta local onde o listener aguardará a shell reversa.",
  "All": "coleta ampla do BloodHound: usuários, grupos, sessões, ACLs e relações relevantes.",
  "LOCAL": "indica ao secretsdump que o dump será processado localmente, a partir dos arquivos informados.",
  "shadow.txt": "script de instruções que o diskshadow vai executar.",
  "ntds.dit": "banco do Active Directory com objetos do domínio e material de credenciais.",
  "SYSTEM": "hive do registro Windows necessária para extrair chaves usadas na leitura do ntds.dit.",
  "shell.war": "arquivo WAR gerado para deploy no Tomcat.",
  "java/jsp_shell_reverse_tcp": "payload JSP Java que conecta de volta para o listener do operador no lab.",
  "war": "formato de pacote de aplicação Java aceito pelo Tomcat Manager.",
  "linpeas.sh": "arquivo do linPEAS baixado para o operador ou transferido ao alvo.",
  "/tmp/linpeas.sh": "caminho temporário usado para executar linPEAS no alvo.",
  "/tmp/linpeas.txt": "arquivo de saída salvo para revisar achados depois.",
  "8000": "porta HTTP local usada para servir arquivo em laboratório.",
  "shell.aspx": "arquivo ASPX gerado para lab com IIS que executa ASP.NET.",
};

const positionalDescriptions: Record<string, Record<number, string>> = {
  nmap: {
    1: "alvo autorizado do scan; pode ser IP, hostname ou faixa.",
  },
  curl: {
    1: "URL consultada; a resposta ajuda a confirmar conteúdo, endpoint ou comportamento da aplicação.",
  },
  grep: {
    1: "termo ou expressão usada para filtrar a saída recebida.",
  },
  gobuster: {
    1: "modo de enumeração; dir procura diretórios e arquivos em uma aplicação web.",
  },
  smbclient: {
    1: "servidor ou share SMB que será listado ou acessado.",
  },
  "gpp-decrypt": {
    1: "valor cpassword extraído do Groups.xml para ser decifrado.",
  },
  "GetUserSPNs.py": {
    1: "domínio e credencial usados para consultar SPNs e solicitar tickets.",
  },
  "GetNPUsers.py": {
    1: "domínio consultado para testar usuários sem pré-autenticação Kerberos.",
  },
  hashcat: {
    1: "arquivo com hash a quebrar.",
    2: "wordlist usada nas tentativas de senha.",
  },
  "psexec.py": {
    1: "domínio, usuário, senha e host usados para abrir execução remota no alvo.",
  },
  rpcclient: {
    1: "host alvo do serviço RPC.",
  },
  "bloodhound-python": {
    1: "coletor Python do BloodHound; as opções seguintes definem domínio, credencial, DNS e escopo.",
  },
  net: {
    1: "subcomando do net; aqui opera em grupo, RPC ou senha conforme a linha.",
    2: "objeto alvo da operação, como grupo ou usuário.",
  },
  pypykatz: {
    1: "modo de análise; lsa indica extração de segredos associados ao LSASS.",
    2: "tipo de entrada; minidump informa que será analisado um dump de memória.",
    3: "arquivo de dump do LSASS a ser processado.",
  },
  diskshadow: {
    1: "script com instruções para criar ou expor a shadow copy.",
  },
  robocopy: {
    1: "origem da cópia, neste caso um caminho dentro da shadow copy.",
    2: "destino local da cópia.",
    3: "arquivo a copiar da origem para o destino.",
  },
  "secretsdump.py": {
    1: "modo local/offline após informar ntds.dit e SYSTEM.",
  },
  msfvenom: {
    1: "ferramenta que vai gerar o payload conforme opções de payload, host, porta, formato e saída.",
  },
  linpeas: {
    1: "script de enumeração local que deve ser interpretado e validado manualmente.",
  },
  "linpeas.sh": {
    1: "script de enumeração local que deve ser interpretado e validado manualmente.",
  },
  "./linpeas.sh": {
    1: "execução do linPEAS a partir do diretório atual.",
  },
  "/tmp/linpeas.sh": {
    1: "execução do linPEAS a partir de diretório temporário no alvo.",
  },
  wget: {
    1: "URL do arquivo a baixar.",
  },
  chmod: {
    1: "permissão que será aplicada.",
    2: "arquivo que receberá a alteração de permissão.",
  },
  tee: {
    1: "arquivo que receberá uma cópia da saída.",
  },
  less: {
    1: "arquivo que será lido de forma paginada.",
  },
  sha256sum: {
    1: "arquivo cujo hash será calculado.",
  },
  nc: {
    1: "host ou porta, dependendo do modo de conexão/listener.",
    2: "porta, quando o primeiro argumento é um host.",
  },
  file: {
    1: "arquivo cujo tipo será identificado.",
  },
  ls: {
    1: "arquivo ou diretório que será listado.",
  },
  ssh: {
    1: "usuário e host usados para abrir a sessão SSH.",
  },
  sudo: {
    1: "comando permitido para execução elevada segundo a regra de sudo.",
  },
  python3: {
    1: "módulo ou script chamado pelo Python.",
    2: "argumento do módulo ou script.",
  },
  "python3.8": {
    1: "código Python passado diretamente pela linha de comando.",
  },
};

const optionValueLabels: Record<string, string> = {
  "-oN": "nome do arquivo que receberá a saída normal do Nmap.",
  "-oA": "prefixo dos arquivos de saída normal, grepable e XML.",
  "-oX": "arquivo XML de saída.",
  "-p": "porta ou conjunto de portas selecionadas.",
  "-p:ports": "porta ou conjunto de portas selecionadas.",
  "-p:payload": "payload escolhido para gerar o artefato.",
  "--top-ports": "quantidade de portas comuns a escanear.",
  "--script": "nome ou expressão do script NSE a executar.",
  "--script-help": "script ou conjunto de scripts cuja ajuda será exibida.",
  "-iL": "arquivo com lista de alvos.",
  "--exclude": "alvo removido do escopo.",
  "-T": "nível de timing escolhido.",
  "--max-retries": "número máximo de novas tentativas.",
  "--min-rate": "taxa mínima de pacotes por segundo.",
  "-u": "nome de usuário usado na autenticação.",
  "-u:url": "URL base que será enumerada.",
  "-p:password": "senha usada na autenticação.",
  "-w": "wordlist usada pela ferramenta.",
  "-d": "nome do domínio consultado.",
  "-ns": "servidor DNS usado para resolver o domínio.",
  "-c": "conjunto de coletores selecionado.",
  "-c:python": "código Python a executar diretamente.",
  "-outputfile": "arquivo de saída da coleta.",
  "-usersfile": "arquivo com a lista de usuários.",
  "-m": "identificador do tipo de hash no hashcat.",
  "-m:python": "módulo Python que será executado.",
  "-perm": "permissão usada como filtro.",
  "-type": "tipo de item buscado pelo find.",
  "-ntds": "caminho do arquivo ntds.dit.",
  "-system": "caminho da hive SYSTEM.",
  "-f": "formato do payload gerado.",
  "-l:msfvenom": "categoria que será listada pelo msfvenom.",
  "-o": "arquivo de saída.",
  "-O:wget": "arquivo de destino do download.",
  "/user": "usuário e senha usados para autenticar a alteração.",
  "/S": "servidor ou controlador de domínio alvo.",
  "/s": "arquivo de script usado pelo diskshadow.",
};

const optionTokensWithValues = new Set(Object.keys(optionValueLabels));

function tokenizeCommand(command: string) {
  return command.match(/"[^"]*"|'[^']*'|\S+/g) || [];
}

function stripInlineComment(line: string) {
  const commentIndex = line.indexOf(" #");
  return commentIndex >= 0 ? line.slice(0, commentIndex).trim() : line;
}

function normalizeOption(token: string, commandName: string) {
  if (token.startsWith("/user:")) return "/user";
  if (token === "-p" && commandName === "bloodhound-python") return "-p:password";
  if (token === "-p" && commandName === "nmap") return "-p:ports";
  if (token === "-p" && commandName === "msfvenom") return "-p:payload";
  if (token === "-u" && commandName === "gobuster") return "-u:url";
  if (token === "-c" && commandName === "python3.8") return "-c:python";
  if (token === "-m" && commandName === "python3") return "-m:python";
  if (token === "-l" && commandName === "msfvenom") return "-l:msfvenom";
  if (token === "-f" && commandName === "rm") return "-f:rm";
  if (token === "-R" && commandName === "grep") return "-R:grep";
  if (token === "-O" && commandName === "nmap") return "-O:nmap";
  if (token === "-O" && commandName === "wget") return "-O:wget";
  if (token === "-L" && commandName === "curl") return "-L:curl";
  if (token === "-R" && commandName === "less") return "-R:less";
  return token;
}

function isOptionToken(token: string) {
  if (token.startsWith("-")) return true;
  if (token.startsWith("+")) return true;
  if (token.startsWith("//")) return false;
  if (optionDescriptions[token] || optionValueLabels[token]) return true;
  return /^\/[A-Za-z]+:/.test(token);
}

function isLikelyTechnicalCommand(commandName: string, tokens: string[]) {
  return Boolean(
    commandDescriptions[commandName] ||
      commandName.endsWith(".py") ||
      commandName.endsWith(".sh") ||
      tokens.some((token) => isOptionToken(token) || token.includes("://")),
  );
}

function describeValue(token: string, previousOption?: string) {
  const cleanToken = token.replace(/^["']|["']$/g, "");

  if (previousOption && optionValueLabels[previousOption]) {
    const knownValue = valueDescriptions[cleanToken];
    return knownValue ? `${optionValueLabels[previousOption]} Neste caso: ${knownValue}` : optionValueLabels[previousOption];
  }

  if (valueDescriptions[cleanToken]) return valueDescriptions[cleanToken];
  if (/^https?:\/\//.test(cleanToken)) return "URL alvo consultada pela ferramenta.";
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(cleanToken)) return "endereço IP do alvo autorizado no laboratório.";
  if (/^(?:\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(cleanToken)) return "faixa de rede em notação CIDR usada como escopo da varredura.";
  if (/^LHOST=/.test(cleanToken)) return "define o IP da máquina do operador que receberá a conexão reversa.";
  if (/^LPORT=/.test(cleanToken)) return "define a porta local onde o listener aguardará a conexão reversa.";
  if (/^\/\/[^/]+/.test(cleanToken)) return "alvo SMB em formato de servidor ou share.";
  if (/^<.+>$/.test(cleanToken)) return "placeholder que deve ser substituído pelo valor real do laboratório.";
  if (/^[\w.-]+\.[\w.-]+\/.+/.test(cleanToken)) return "domínio e credencial no formato aceito pela ferramenta.";
  if (/^[\w.-]+@(?:\d{1,3}\.){3}\d{1,3}$/.test(cleanToken)) return "usuário e host usados para autenticação remota.";
  if (/^\d+$/.test(cleanToken)) return "valor numérico usado pela opção anterior ou pelo subcomando.";
  if (/^[\w./\\:-]+\.(txt|war|DMP|dit|xml)$/i.test(cleanToken)) return "arquivo usado como entrada ou saída nesta etapa.";
  return "";
}

function buildPartsFromTokens(tokens: string[]): CommandPart[] {
  const commandName = tokens[0];

  if (!commandName || !isLikelyTechnicalCommand(commandName, tokens)) return [];

  const parts: CommandPart[] = [];
  const commandDescription = commandDescriptions[commandName] || "ferramenta ou script executado nesta etapa.";
  parts.push({ term: commandName, description: commandDescription });

  let positionalIndex = 0;
  let previousOption: string | undefined;

  tokens.slice(1).forEach((token) => {
    if (isOptionToken(token)) {
      const normalized = normalizeOption(token, commandName);
      parts.push({
        term: token,
        description: optionDescriptions[normalized] || optionDescriptions[token] || "opção que altera o comportamento da ferramenta nesta etapa.",
      });
      previousOption = optionTokensWithValues.has(normalized) ? normalized : undefined;
      return;
    }

    const valueDescription = describeValue(token, previousOption);

    if (valueDescription) {
      parts.push({ term: token, description: valueDescription });
    } else {
      positionalIndex += 1;
      const positionalDescription = positionalDescriptions[commandName]?.[positionalIndex];
      if (positionalDescription) parts.push({ term: token, description: positionalDescription });
    }

    previousOption = undefined;
  });

  return parts;
}

function buildCommandParts(command: string): CommandPart[] {
  const lines = command
    .split("\n")
    .map((line) => stripInlineComment(line.trim()))
    .filter((line) => line && !line.startsWith("#") && !line.startsWith(">"));

  return lines.flatMap((line) => {
    const tokens = tokenizeCommand(line);
    const parts: CommandPart[] = [];
    let segment: string[] = [];

    tokens.forEach((token) => {
      if (token === "|" || token === "&&" || token === ";") {
        parts.push(...buildPartsFromTokens(segment));
        parts.push({
          term: token,
          description: token === "|" ? "pipe: envia a saída do comando anterior para o próximo comando." : "separador/encadeador de comandos no shell.",
        });
        segment = [];
        return;
      }

      segment.push(token);
    });

    parts.push(...buildPartsFromTokens(segment));
    return parts;
  });
}

export default function AdminDayView() {
  const [, setLocation] = useLocation();
  const params = useParams<{ day: string }>();
  const day = parseInt(params.day || "1");

  const [activeTab, setActiveTab] = useState<"roteiro" | "solucoes">("roteiro");
  const [openBlock, setOpenBlock] = useState<number | null>(0);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      setLocation("/admin");
    }
  }, [setLocation]);

  const note = teacherNotes.find((n) => n.day === day);
  const solutions = labSolutions.filter((s) => {
    const labDay: Record<string, number> = {
      cap: 1, nibbles: 1, jerry: 1,
      forest: 2, active: 2,
      blackfield: 3,
    };
    return labDay[s.labId] === day;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setLocation("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #1a1a1a",
          background: "rgba(10,10,10,0.97)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 24px",
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setLocation("/admin/dashboard")}
              style={{
                background: "none",
                border: "1px solid #222",
                cursor: "pointer",
                color: "#555",
                padding: "5px 8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#d4913a",
                border: "1px solid #3a2800",
                padding: "2px 8px",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
              }}
            >
              PROFESSOR
            </span>
            <span style={{ color: "#666", fontSize: "0.82rem" }}>Dia {day}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "1px solid #2a2a2a",
              color: "#555",
              cursor: "pointer",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
            }}
          >
            <LogOut size={12} /> Sair
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 60px" }}>
        {note && (
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ margin: "0 0 6px 0", fontSize: "1.3rem", fontWeight: 700, color: "#e0e0e0" }}>
              {note.title}
            </h1>
            <p style={{ margin: 0, color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>
              <strong style={{ color: "#888" }}>Objetivo:</strong> {note.objective}
            </p>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 1, marginBottom: 28, borderBottom: "1px solid #1a1a1a" }}>
          {(["roteiro", "solucoes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #d4913a" : "2px solid transparent",
                padding: "10px 18px",
                cursor: "pointer",
                color: activeTab === tab ? "#d4913a" : "#555",
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
                marginBottom: -1,
              }}
            >
              {tab === "roteiro" ? "Roteiro" : "Solucoes dos Labs"}
            </button>
          ))}
        </div>

        {/* Roteiro tab */}
        {activeTab === "roteiro" && note && (
          <div>
            {note.blocks.map((block, bi) => (
              <div
                key={bi}
                style={{
                  border: "1px solid #1e1e1e",
                  marginBottom: 10,
                  background: "#0d0d0d",
                }}
              >
                <button
                  onClick={() => setOpenBlock(openBlock === bi ? null : bi)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "14px 18px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.9rem" }}>{block.title}</div>
                    <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 2 }}>{block.duration}</div>
                  </div>
                  <span style={{ color: "#444", fontSize: "1rem" }}>{openBlock === bi ? "−" : "+"}</span>
                </button>

                {openBlock === bi && (
                  <div style={{ padding: "0 18px 18px" }}>
                    <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16, marginBottom: 16 }}>
                      {block.content.map((item, ci) => (
                        <div
                          key={ci}
                          style={{
                            color: "#888",
                            fontSize: "0.87rem",
                            padding: "7px 0 7px 14px",
                            borderLeft: "2px solid #1e1e1e",
                            marginBottom: 6,
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {block.questions && block.questions.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            color: "#555",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: 10,
                          }}
                        >
                          Perguntas para a turma
                        </div>
                        {block.questions.map((q, qi) => (
                          <QuestionCard key={qi} ask={q.ask} expected={q.expected} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Solutions tab */}
        {activeTab === "solucoes" && (
          <div>
            {solutions.length === 0 && (
              <div style={{ color: "#444", fontSize: "0.88rem", padding: "16px 0" }}>
                Sem soluções detalhadas para este dia. Consulte os roteiros dos dias 1-3.
              </div>
            )}
            {solutions.map((sol) => (
              <SolutionCard key={sol.labId} solution={sol} />
            ))}

            {day === 2 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ color: "#555", fontSize: "0.8rem", marginBottom: 12, padding: "10px 14px", background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
                  Soluções completas de Forest e Active estao na base de dados. As mais frequentemente questionadas sao: Active (GPP password) e Forest (BloodHound path). Apresente no debrief noturno.
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function QuestionCard({ ask, expected }: { ask: string; expected: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        padding: "12px 14px",
        marginBottom: 8,
      }}
    >
      <div style={{ color: "#aaa", fontSize: "0.87rem", lineHeight: 1.5, marginBottom: 8 }}>
        Pergunta: <em style={{ color: "#c8c8c8" }}>{ask}</em>
      </div>
      {revealed ? (
        <div
          style={{
            color: "#4a9e8a",
            fontSize: "0.84rem",
            lineHeight: 1.5,
            padding: "8px 10px",
            background: "#061210",
            border: "1px solid #1a3a32",
          }}
        >
          Resposta esperada: {expected}
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          style={{
            background: "none",
            border: "1px solid #2a2a2a",
            color: "#555",
            cursor: "pointer",
            padding: "4px 12px",
            fontSize: "0.75rem",
          }}
        >
          Revelar resposta esperada
        </button>
      )}
    </div>
  );
}

function CommandBreakdown({ command }: { command: string }) {
  const parts = buildCommandParts(command);

  if (parts.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 8,
        background: "#090909",
        border: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          padding: "7px 10px",
          borderBottom: "1px solid #171717",
          color: "#666",
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Partes do comando
      </div>
      <div style={{ padding: "8px 10px" }}>
        {parts.map((part, i) => (
          <div
            key={`${part.term}-${i}`}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(92px, 180px) 1fr",
              gap: 10,
              padding: "6px 0",
              borderBottom: i === parts.length - 1 ? "none" : "1px solid #121212",
              alignItems: "start",
            }}
          >
            <code
              style={{
                color: "#d6f5d6",
                fontFamily: "monospace",
                fontSize: "0.78rem",
                wordBreak: "break-word",
              }}
            >
              {part.term}
            </code>
            <span style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.5 }}>{part.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionCard({ solution }: { solution: import("@/data/adminData").LabSolution }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: "1px solid #1e1e1e", marginBottom: 10, background: "#0d0d0d" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "14px 18px",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.9rem" }}>{solution.name}</div>
          <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 3 }}>
            {solution.steps.length} etapas — {solution.mitre.join(", ")}
          </div>
        </div>
        <span style={{ color: "#444" }}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 20px" }}>
          <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
            {solution.steps.map((step, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      background: "#111",
                      border: "1px solid #333",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      color: "#555",
                      flexShrink: 0,
                      fontFamily: "monospace",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: "#c8c8c8", fontWeight: 600, fontSize: "0.88rem" }}>{step.objective}</span>
                </div>
                <div
                  style={{
                    paddingLeft: 32,
                  }}
                >
                  <p style={{ color: "#777", fontSize: "0.84rem", margin: "0 0 8px 0", lineHeight: 1.6 }}>
                    {step.explanation}
                  </p>
                  {step.command && (
                    <>
                      <TerminalBlock
                        lines={step.command.split("\n").map((line) => ({
                          type: line.startsWith("#") ? "comment" : "prompt",
                          text: line,
                        }))}
                        label="comando"
                      />
                      <CommandBreakdown command={step.command} />
                    </>
                  )}
                  {step.output && (
                    <div
                      style={{
                        background: "#000",
                        border: "1px solid #1a1a1a",
                        padding: "8px 12px",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#aad4aa",
                        marginTop: 6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {step.output}
                    </div>
                  )}
                  {step.errors && (
                    <div
                      style={{
                        background: "#100808",
                        border: "1px solid #2a1010",
                        padding: "8px 12px",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#c06060",
                        marginTop: 6,
                      }}
                    >
                      ATENCAO: {step.errors}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: 8,
                      padding: "6px 10px",
                      background: "#061210",
                      border: "1px solid #1a3a32",
                      fontSize: "0.78rem",
                      color: "#4a9e8a",
                    }}
                  >
                    Confirmacao: {step.confirmation}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #1a1a1a" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#555",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Tecnicas MITRE ATT&CK
              </div>
              {solution.mitre.map((m) => (
                <span
                  key={m}
                  style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    color: "#d4913a",
                    border: "1px solid #3a2800",
                    padding: "2px 8px",
                    marginRight: 6,
                    marginBottom: 4,
                    fontFamily: "monospace",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { LogOut, ChevronLeft } from "lucide-react";
import { teacherNotes, labSolutions } from "@/data/adminData";
import TerminalBlock from "@/components/TerminalBlock";

type CommandPart = {
  term: string;
  description: string;
};

const commandDescriptions: Record<string, string> = {
  nmap: "ferramenta usada para descobrir portas, serviços, versões e pistas de enumeração em um alvo autorizado.",
  curl: "cliente HTTP usado para ver a resposta bruta de uma página, endpoint ou arquivo sem depender do navegador.",
  grep: "filtra texto por padrão; aqui reduz a saída para linhas que contenham o termo procurado.",
  find: "procura arquivos e diretórios por critérios como permissão, nome, dono ou tipo.",
  getcap: "lista capabilities Linux aplicadas a binários.",
  cat: "mostra conteúdo de arquivo no terminal.",
  rm: "remove arquivos; no curso aparece para limpar artefatos temporários do lab.",
  gobuster: "ferramenta de enumeração por wordlist, usada para descobrir diretórios, arquivos ou vhosts.",
  smbclient: "cliente SMB que lista shares, acessa pastas compartilhadas e testa sessão nula ou credenciais.",
  "gpp-decrypt": "decifra o valor cpassword de Group Policy Preferences usando a chave pública conhecida da Microsoft.",
  "GetUserSPNs.py": "script do Impacket que enumera contas com SPN e pode solicitar tickets para Kerberoasting.",
  "GetNPUsers.py": "script do Impacket que testa contas sem pré-autenticação Kerberos e coleta hash AS-REP quando possível.",
  hashcat: "ferramenta de quebra offline de hashes; o modo escolhido define o tipo de hash analisado.",
  "psexec.py": "script do Impacket que usa credenciais válidas para executar comandos remotamente via SMB/RPC.",
  rpcclient: "cliente RPC para consultar informações de domínio, usuários e grupos em serviços Windows/Samba.",
  "bloodhound-python": "coletor que consulta o Active Directory e gera dados para análise de caminhos no BloodHound.",
  net: "ferramenta Windows/Samba para administrar usuários, grupos, senhas e recursos de domínio.",
  pypykatz: "ferramenta que analisa dumps do LSASS e extrai credenciais, hashes ou tickets quando presentes.",
  diskshadow: "utilitário Windows para criar e manipular cópias de sombra de volumes.",
  robocopy: "ferramenta robusta de cópia no Windows; com modo backup consegue copiar arquivos protegidos quando a permissão existe.",
  "secretsdump.py": "script do Impacket que extrai hashes de credenciais de sistemas Windows, online ou offline.",
  msfvenom: "gerador de payloads; aqui cria arquivo implantável para obter shell em laboratório autorizado.",
  linpeas: "script de enumeração local Linux; aponta pistas de privesc que precisam ser validadas manualmente.",
  "linpeas.sh": "script de enumeração local Linux; aponta pistas de privesc que precisam ser validadas manualmente.",
  "./linpeas.sh": "execução local do linPEAS no diretório atual do laboratório.",
  "/tmp/linpeas.sh": "caminho temporário do linPEAS no alvo Linux do laboratório.",
  wget: "cliente HTTP/FTP usado para baixar arquivos pelo terminal.",
  chmod: "altera permissões de arquivos e diretórios.",
  tee: "mostra a saída na tela e grava uma cópia em arquivo.",
  less: "visualizador de texto paginado, útil para revisar saídas longas.",
  sha256sum: "calcula hash SHA256 para identificar e registrar integridade de arquivo.",
  nc: "netcat: abre conexões TCP/UDP simples ou listeners em laboratório.",
  file: "identifica o tipo de um arquivo pelo conteúdo.",
  ls: "lista arquivos, permissões, tamanho e metadados básicos.",
  ssh: "cliente de acesso remoto seguro; usa usuário, host e credenciais para abrir uma sessão shell.",
  sudo: "executa um comando com privilégios elevados quando a política permite.",
  python3: "interpretador Python 3; aqui também pode servir arquivos via HTTP no laboratório.",
  "python3.8": "interpretador Python específico; nesta etapa é relevante porque possui capability perigosa.",
};

const optionDescriptions: Record<string, string> = {
  "-sC": "executa os scripts padrão do Nmap, equivalentes a --script=default; ajuda a coletar banners e enumeração inicial segura para CTF.",
  "-sV": "tenta identificar nome e versão dos serviços nas portas abertas.",
  "-sS": "SYN scan do Nmap; rápido e comum quando há privilégio/root.",
  "-sT": "TCP connect scan do Nmap; usa conexão completa quando não há privilégio para SYN scan.",
  "-sU": "UDP scan do Nmap; útil para DNS, SNMP, NTP e outros serviços UDP.",
  "-sn": "host discovery do Nmap sem varrer portas.",
  "-oN": "salva a saída normal em um arquivo, preservando evidência para relatório e revisão.",
  "-oA": "salva a saída em três formatos: normal, grepable e XML.",
  "-oX": "salva a saída em XML para importação ou processamento.",
  "-Pn": "pula a descoberta de host por ping e trata o alvo como ativo; útil quando ICMP ou probes iniciais são bloqueados.",
  "-p": "define a porta ou lista de portas que serão analisadas.",
  "-p-": "manda o Nmap varrer todas as portas TCP, de 1 a 65535.",
  "-p:payload": "no msfvenom, escolhe o payload que será colocado no arquivo gerado.",
  "--top-ports": "no Nmap, escaneia as portas mais comuns até o número informado.",
  "-F": "fast scan do Nmap, usando menos portas para uma triagem rápida.",
  "-A": "modo agressivo do Nmap: combina detecção de OS, versão, scripts padrão e traceroute.",
  "-O:nmap": "ativa tentativa de detecção de sistema operacional no Nmap.",
  "--script": "seleciona script NSE específico do Nmap.",
  "--script-help": "mostra ajuda de scripts NSE instalados.",
  "--reason": "mostra o motivo técnico do estado atribuído a cada porta.",
  "--open": "filtra a saída para mostrar apenas portas abertas ou provavelmente abertas.",
  "-iL": "lê alvos a partir de um arquivo.",
  "--exclude": "remove um alvo ou lista de alvos do escopo.",
  "-T": "define timing template do Nmap, de T0 a T5.",
  "--max-retries": "limita quantas vezes o Nmap repete probes sem resposta.",
  "--min-rate": "define uma taxa mínima de envio de pacotes para acelerar varreduras em laboratório.",
  "-L": "no smbclient, lista shares disponíveis no servidor em vez de abrir uma share específica.",
  "-L:curl": "no curl, segue redirects HTTP 301/302 até o destino final.",
  "-N": "tenta autenticar sem senha; usado para testar acesso anônimo ou sessão nula.",
  "-U": "define o usuário para autenticação RPC/SMB; string vazia indica tentativa sem usuário real.",
  "-s": "no curl, modo silencioso; remove barra de progresso e deixa a saída mais limpa para pipes.",
  "-i": "no grep, ignora diferença entre maiúsculas e minúsculas ao procurar o termo.",
  "-Ei": "no grep, usa expressão regular estendida e ignora maiúsculas/minúsculas.",
  "-R:grep": "no grep, busca recursivamente em diretórios.",
  "-perm": "no find, filtra por bits de permissão, como SUID 4000.",
  "-type": "no find, filtra por tipo de item, como f para arquivo e d para diretório.",
  "-u": "define usuário para autenticação em ferramentas como bloodhound-python.",
  "-u:url": "no gobuster, define a URL base que será enumerada.",
  "-p:password": "define senha em ferramentas que aceitam credenciais na linha de comando.",
  "-p:ports": "define porta ou lista de portas a escanear no Nmap.",
  "-w": "define a wordlist usada para testar caminhos, nomes ou senhas.",
  "-d": "define o domínio Active Directory consultado.",
  "-ns": "define o servidor DNS que o coletor deve usar para resolver o domínio.",
  "-c": "define quais coletores do BloodHound serão executados; All coleta o conjunto amplo.",
  "-c:python": "no Python, executa o código passado como string logo em seguida.",
  "-request": "solicita tickets Kerberos para contas com SPN, gerando material para Kerberoasting.",
  "-outputfile": "salva o resultado em um arquivo indicado, útil para passar para hashcat ou documentar evidência.",
  "-usersfile": "informa uma lista de usuários para testar em massa.",
  "-no-pass": "tenta a operação sem senha, comum em AS-REP Roasting para contas sem pré-autenticação.",
  "-m": "seleciona o modo do hashcat, ou seja, o tipo exato de hash que será quebrado.",
  "-m:python": "no Python, executa um módulo como programa.",
  "-ntds": "aponta o arquivo ntds.dit offline que contém o banco de credenciais do AD.",
  "-system": "aponta a hive SYSTEM usada para derivar chaves necessárias ao dump offline.",
  "-windows-auth": "usa autenticação integrada do Windows em vez de autenticação SQL local.",
  "-f": "define o formato do arquivo gerado pelo msfvenom.",
  "-f:rm": "no rm, força remoção sem pedir confirmação.",
  "-l:msfvenom": "no msfvenom, lista tipos disponíveis, como payloads, formatos ou encoders.",
  "-o": "define o arquivo de saída gerado por uma ferramenta.",
  "-O:wget": "no wget, define o caminho/nome do arquivo salvo.",
  "-la": "no ls, lista em formato longo incluindo arquivos ocultos.",
  "-lh": "no ls, lista em formato longo com tamanhos legíveis.",
  "+x": "adiciona permissão de execução ao arquivo no chmod.",
  "-R:less": "no less, preserva cores ANSI na visualização.",
  "-lvnp": "no netcat, abre listener verboso, sem DNS reverso, na porta indicada.",
  "-nv": "no netcat, conecta em modo verboso sem DNS reverso.",
  "-a": "em ferramentas de log, geralmente adiciona ao arquivo existente em vez de sobrescrever.",
  "/add": "adiciona o usuário ou objeto ao grupo informado.",
  "/domain": "aplica a operação no domínio, não apenas na máquina local.",
  "/user": "informa a credencial usada para autenticar a operação.",
  "/S": "define o servidor ou controlador de domínio contra o qual o comando será executado.",
  "/s": "no diskshadow, executa um script de comandos a partir de um arquivo.",
  "/b": "no robocopy, usa modo backup; requer privilégio apropriado e permite copiar arquivos protegidos.",
};

const valueDescriptions: Record<string, string> = {
  "scan.txt": "arquivo onde o resultado do scan inicial será salvo.",
  "kerb.txt": "arquivo que receberá o hash/ticket coletado para análise offline.",
  "asrep.txt": "arquivo onde os hashes AS-REP coletados serão salvos.",
  "hash.txt": "arquivo local contendo o hash que será quebrado.",
  "rockyou.txt": "wordlist usada para tentar senhas comuns em hashes de laboratório.",
  "/usr/share/wordlists/rockyou.txt": "caminho comum da wordlist rockyou em distribuições de pentest.",
  "users.txt": "lista de usuários que será testada pela ferramenta.",
  "common.txt": "wordlist de caminhos comuns usada para enumeração web.",
  "13100": "modo hashcat para Kerberos 5 TGS-REP etype 23, usado em Kerberoasting.",
  "18200": "modo hashcat para Kerberos 5 AS-REP etype 23, usado em AS-REP Roasting.",
  "8080": "porta TCP alvo; neste lab hospeda o Tomcat Manager.",
  "4444": "porta local onde o listener aguardará a shell reversa.",
  "All": "coleta ampla do BloodHound: usuários, grupos, sessões, ACLs e relações relevantes.",
  "LOCAL": "indica ao secretsdump que o dump será processado localmente, a partir dos arquivos informados.",
  "shadow.txt": "script de instruções que o diskshadow vai executar.",
  "ntds.dit": "banco do Active Directory com objetos do domínio e material de credenciais.",
  "SYSTEM": "hive do registro Windows necessária para extrair chaves usadas na leitura do ntds.dit.",
  "shell.war": "arquivo WAR gerado para deploy no Tomcat.",
  "java/jsp_shell_reverse_tcp": "payload JSP Java que conecta de volta para o listener do operador no lab.",
  "war": "formato de pacote de aplicação Java aceito pelo Tomcat Manager.",
  "linpeas.sh": "arquivo do linPEAS baixado para o operador ou transferido ao alvo.",
  "/tmp/linpeas.sh": "caminho temporário usado para executar linPEAS no alvo.",
  "/tmp/linpeas.txt": "arquivo de saída salvo para revisar achados depois.",
  "8000": "porta HTTP local usada para servir arquivo em laboratório.",
  "shell.aspx": "arquivo ASPX gerado para lab com IIS que executa ASP.NET.",
};

const positionalDescriptions: Record<string, Record<number, string>> = {
  nmap: {
    1: "alvo autorizado do scan; pode ser IP, hostname ou faixa.",
  },
  curl: {
    1: "URL consultada; a resposta ajuda a confirmar conteúdo, endpoint ou comportamento da aplicação.",
  },
  grep: {
    1: "termo ou expressão usada para filtrar a saída recebida.",
  },
  gobuster: {
    1: "modo de enumeração; dir procura diretórios e arquivos em uma aplicação web.",
  },
  smbclient: {
    1: "servidor ou share SMB que será listado ou acessado.",
  },
  "gpp-decrypt": {
    1: "valor cpassword extraído do Groups.xml para ser decifrado.",
  },
  "GetUserSPNs.py": {
    1: "domínio e credencial usados para consultar SPNs e solicitar tickets.",
  },
  "GetNPUsers.py": {
    1: "domínio consultado para testar usuários sem pré-autenticação Kerberos.",
  },
  hashcat: {
    1: "arquivo com hash a quebrar.",
    2: "wordlist usada nas tentativas de senha.",
  },
  "psexec.py": {
    1: "domínio, usuário, senha e host usados para abrir execução remota no alvo.",
  },
  rpcclient: {
    1: "host alvo do serviço RPC.",
  },
  "bloodhound-python": {
    1: "coletor Python do BloodHound; as opções seguintes definem domínio, credencial, DNS e escopo.",
  },
  net: {
    1: "subcomando do net; aqui opera em grupo, RPC ou senha conforme a linha.",
    2: "objeto alvo da operação, como grupo ou usuário.",
  },
  pypykatz: {
    1: "modo de análise; lsa indica extração de segredos associados ao LSASS.",
    2: "tipo de entrada; minidump informa que será analisado um dump de memória.",
    3: "arquivo de dump do LSASS a ser processado.",
  },
  diskshadow: {
    1: "script com instruções para criar ou expor a shadow copy.",
  },
  robocopy: {
    1: "origem da cópia, neste caso um caminho dentro da shadow copy.",
    2: "destino local da cópia.",
    3: "arquivo a copiar da origem para o destino.",
  },
  "secretsdump.py": {
    1: "modo local/offline após informar ntds.dit e SYSTEM.",
  },
  msfvenom: {
    1: "ferramenta que vai gerar o payload conforme opções de payload, host, porta, formato e saída.",
  },
  linpeas: {
    1: "script de enumeração local que deve ser interpretado e validado manualmente.",
  },
  "linpeas.sh": {
    1: "script de enumeração local que deve ser interpretado e validado manualmente.",
  },
  "./linpeas.sh": {
    1: "execução do linPEAS a partir do diretório atual.",
  },
  "/tmp/linpeas.sh": {
    1: "execução do linPEAS a partir de diretório temporário no alvo.",
  },
  wget: {
    1: "URL do arquivo a baixar.",
  },
  chmod: {
    1: "permissão que será aplicada.",
    2: "arquivo que receberá a alteração de permissão.",
  },
  tee: {
    1: "arquivo que receberá uma cópia da saída.",
  },
  less: {
    1: "arquivo que será lido de forma paginada.",
  },
  sha256sum: {
    1: "arquivo cujo hash será calculado.",
  },
  nc: {
    1: "host ou porta, dependendo do modo de conexão/listener.",
    2: "porta, quando o primeiro argumento é um host.",
  },
  file: {
    1: "arquivo cujo tipo será identificado.",
  },
  ls: {
    1: "arquivo ou diretório que será listado.",
  },
  ssh: {
    1: "usuário e host usados para abrir a sessão SSH.",
  },
  sudo: {
    1: "comando permitido para execução elevada segundo a regra de sudo.",
  },
  python3: {
    1: "módulo ou script chamado pelo Python.",
    2: "argumento do módulo ou script.",
  },
  "python3.8": {
    1: "código Python passado diretamente pela linha de comando.",
  },
};

const optionValueLabels: Record<string, string> = {
  "-oN": "nome do arquivo que receberá a saída normal do Nmap.",
  "-oA": "prefixo dos arquivos de saída normal, grepable e XML.",
  "-oX": "arquivo XML de saída.",
  "-p": "porta ou conjunto de portas selecionadas.",
  "-p:ports": "porta ou conjunto de portas selecionadas.",
  "-p:payload": "payload escolhido para gerar o artefato.",
  "--top-ports": "quantidade de portas comuns a escanear.",
  "--script": "nome ou expressão do script NSE a executar.",
  "--script-help": "script ou conjunto de scripts cuja ajuda será exibida.",
  "-iL": "arquivo com lista de alvos.",
  "--exclude": "alvo removido do escopo.",
  "-T": "nível de timing escolhido.",
  "--max-retries": "número máximo de novas tentativas.",
  "--min-rate": "taxa mínima de pacotes por segundo.",
  "-u": "nome de usuário usado na autenticação.",
  "-u:url": "URL base que será enumerada.",
  "-p:password": "senha usada na autenticação.",
  "-w": "wordlist usada pela ferramenta.",
  "-d": "nome do domínio consultado.",
  "-ns": "servidor DNS usado para resolver o domínio.",
  "-c": "conjunto de coletores selecionado.",
  "-c:python": "código Python a executar diretamente.",
  "-outputfile": "arquivo de saída da coleta.",
  "-usersfile": "arquivo com a lista de usuários.",
  "-m": "identificador do tipo de hash no hashcat.",
  "-m:python": "módulo Python que será executado.",
  "-perm": "permissão usada como filtro.",
  "-type": "tipo de item buscado pelo find.",
  "-ntds": "caminho do arquivo ntds.dit.",
  "-system": "caminho da hive SYSTEM.",
  "-f": "formato do payload gerado.",
  "-l:msfvenom": "categoria que será listada pelo msfvenom.",
  "-o": "arquivo de saída.",
  "-O:wget": "arquivo de destino do download.",
  "/user": "usuário e senha usados para autenticar a alteração.",
  "/S": "servidor ou controlador de domínio alvo.",
  "/s": "arquivo de script usado pelo diskshadow.",
};

const optionTokensWithValues = new Set(Object.keys(optionValueLabels));

function tokenizeCommand(command: string) {
  return command.match(/"[^"]*"|'[^']*'|\S+/g) || [];
}

function stripInlineComment(line: string) {
  const commentIndex = line.indexOf(" #");
  return commentIndex >= 0 ? line.slice(0, commentIndex).trim() : line;
}

function normalizeOption(token: string, commandName: string) {
  if (token.startsWith("/user:")) return "/user";
  if (token === "-p" && commandName === "bloodhound-python") return "-p:password";
  if (token === "-p" && commandName === "nmap") return "-p:ports";
  if (token === "-p" && commandName === "msfvenom") return "-p:payload";
  if (token === "-u" && commandName === "gobuster") return "-u:url";
  if (token === "-c" && commandName === "python3.8") return "-c:python";
  if (token === "-m" && commandName === "python3") return "-m:python";
  if (token === "-l" && commandName === "msfvenom") return "-l:msfvenom";
  if (token === "-f" && commandName === "rm") return "-f:rm";
  if (token === "-R" && commandName === "grep") return "-R:grep";
  if (token === "-O" && commandName === "nmap") return "-O:nmap";
  if (token === "-O" && commandName === "wget") return "-O:wget";
  if (token === "-L" && commandName === "curl") return "-L:curl";
  if (token === "-R" && commandName === "less") return "-R:less";
  return token;
}

function isOptionToken(token: string) {
  if (token.startsWith("-")) return true;
  if (token.startsWith("+")) return true;
  if (token.startsWith("//")) return false;
  if (optionDescriptions[token] || optionValueLabels[token]) return true;
  return /^\/[A-Za-z]+:/.test(token);
}

function isLikelyTechnicalCommand(commandName: string, tokens: string[]) {
  return Boolean(
    commandDescriptions[commandName] ||
      commandName.endsWith(".py") ||
      commandName.endsWith(".sh") ||
      tokens.some((token) => isOptionToken(token) || token.includes("://")),
  );
}

function describeValue(token: string, previousOption?: string) {
  const cleanToken = token.replace(/^["']|["']$/g, "");

  if (previousOption && optionValueLabels[previousOption]) {
    const knownValue = valueDescriptions[cleanToken];
    return knownValue ? `${optionValueLabels[previousOption]} Neste caso: ${knownValue}` : optionValueLabels[previousOption];
  }

  if (valueDescriptions[cleanToken]) return valueDescriptions[cleanToken];
  if (/^https?:\/\//.test(cleanToken)) return "URL alvo consultada pela ferramenta.";
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(cleanToken)) return "endereço IP do alvo autorizado no laboratório.";
  if (/^(?:\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(cleanToken)) return "faixa de rede em notação CIDR usada como escopo da varredura.";
  if (/^LHOST=/.test(cleanToken)) return "define o IP da máquina do operador que receberá a conexão reversa.";
  if (/^LPORT=/.test(cleanToken)) return "define a porta local onde o listener aguardará a conexão reversa.";
  if (/^\/\/[^/]+/.test(cleanToken)) return "alvo SMB em formato de servidor ou share.";
  if (/^<.+>$/.test(cleanToken)) return "placeholder que deve ser substituído pelo valor real do laboratório.";
  if (/^[\w.-]+\.[\w.-]+\/.+/.test(cleanToken)) return "domínio e credencial no formato aceito pela ferramenta.";
  if (/^[\w.-]+@(?:\d{1,3}\.){3}\d{1,3}$/.test(cleanToken)) return "usuário e host usados para autenticação remota.";
  if (/^\d+$/.test(cleanToken)) return "valor numérico usado pela opção anterior ou pelo subcomando.";
  if (/^[\w./\\:-]+\.(txt|war|DMP|dit|xml)$/i.test(cleanToken)) return "arquivo usado como entrada ou saída nesta etapa.";
  return "";
}

function buildPartsFromTokens(tokens: string[]): CommandPart[] {
  const commandName = tokens[0];

  if (!commandName || !isLikelyTechnicalCommand(commandName, tokens)) return [];

  const parts: CommandPart[] = [];
  const commandDescription = commandDescriptions[commandName] || "ferramenta ou script executado nesta etapa.";
  parts.push({ term: commandName, description: commandDescription });

  let positionalIndex = 0;
  let previousOption: string | undefined;

  tokens.slice(1).forEach((token) => {
    if (isOptionToken(token)) {
      const normalized = normalizeOption(token, commandName);
      parts.push({
        term: token,
        description: optionDescriptions[normalized] || optionDescriptions[token] || "opção que altera o comportamento da ferramenta nesta etapa.",
      });
      previousOption = optionTokensWithValues.has(normalized) ? normalized : undefined;
      return;
    }

    const valueDescription = describeValue(token, previousOption);

    if (valueDescription) {
      parts.push({ term: token, description: valueDescription });
    } else {
      positionalIndex += 1;
      const positionalDescription = positionalDescriptions[commandName]?.[positionalIndex];
      if (positionalDescription) parts.push({ term: token, description: positionalDescription });
    }

    previousOption = undefined;
  });

  return parts;
}

function buildCommandParts(command: string): CommandPart[] {
  const lines = command
    .split("\n")
    .map((line) => stripInlineComment(line.trim()))
    .filter((line) => line && !line.startsWith("#") && !line.startsWith(">"));

  return lines.flatMap((line) => {
    const tokens = tokenizeCommand(line);
    const parts: CommandPart[] = [];
    let segment: string[] = [];

    tokens.forEach((token) => {
      if (token === "|" || token === "&&" || token === ";") {
        parts.push(...buildPartsFromTokens(segment));
        parts.push({
          term: token,
          description: token === "|" ? "pipe: envia a saída do comando anterior para o próximo comando." : "separador/encadeador de comandos no shell.",
        });
        segment = [];
        return;
      }

      segment.push(token);
    });

    parts.push(...buildPartsFromTokens(segment));
    return parts;
  });
}

export default function AdminDayView() {
  const [, setLocation] = useLocation();
  const params = useParams<{ day: string }>();
  const day = parseInt(params.day || "1");

  const [activeTab, setActiveTab] = useState<"roteiro" | "solucoes">("roteiro");
  const [openBlock, setOpenBlock] = useState<number | null>(0);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      setLocation("/admin");
    }
  }, [setLocation]);

  const note = teacherNotes.find((n) => n.day === day);
  const solutions = labSolutions.filter((s) => {
    const labDay: Record<string, number> = {
      cap: 1, nibbles: 1, jerry: 1,
      forest: 2, active: 2,
      blackfield: 3,
    };
    return labDay[s.labId] === day;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setLocation("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #1a1a1a",
          background: "rgba(10,10,10,0.97)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 24px",
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setLocation("/admin/dashboard")}
              style={{
                background: "none",
                border: "1px solid #222",
                cursor: "pointer",
                color: "#555",
                padding: "5px 8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#d4913a",
                border: "1px solid #3a2800",
                padding: "2px 8px",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
              }}
            >
              PROFESSOR
            </span>
            <span style={{ color: "#666", fontSize: "0.82rem" }}>Dia {day}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "1px solid #2a2a2a",
              color: "#555",
              cursor: "pointer",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
            }}
          >
            <LogOut size={12} /> Sair
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 60px" }}>
        {note && (
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ margin: "0 0 6px 0", fontSize: "1.3rem", fontWeight: 700, color: "#e0e0e0" }}>
              {note.title}
            </h1>
            <p style={{ margin: 0, color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>
              <strong style={{ color: "#888" }}>Objetivo:</strong> {note.objective}
            </p>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 1, marginBottom: 28, borderBottom: "1px solid #1a1a1a" }}>
          {(["roteiro", "solucoes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #d4913a" : "2px solid transparent",
                padding: "10px 18px",
                cursor: "pointer",
                color: activeTab === tab ? "#d4913a" : "#555",
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
                marginBottom: -1,
              }}
            >
              {tab === "roteiro" ? "Roteiro" : "Solucoes dos Labs"}
            </button>
          ))}
        </div>

        {/* Roteiro tab */}
        {activeTab === "roteiro" && note && (
          <div>
            {note.blocks.map((block, bi) => (
              <div
                key={bi}
                style={{
                  border: "1px solid #1e1e1e",
                  marginBottom: 10,
                  background: "#0d0d0d",
                }}
              >
                <button
                  onClick={() => setOpenBlock(openBlock === bi ? null : bi)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "14px 18px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.9rem" }}>{block.title}</div>
                    <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 2 }}>{block.duration}</div>
                  </div>
                  <span style={{ color: "#444", fontSize: "1rem" }}>{openBlock === bi ? "−" : "+"}</span>
                </button>

                {openBlock === bi && (
                  <div style={{ padding: "0 18px 18px" }}>
                    <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16, marginBottom: 16 }}>
                      {block.content.map((item, ci) => (
                        <div
                          key={ci}
                          style={{
                            color: "#888",
                            fontSize: "0.87rem",
                            padding: "7px 0 7px 14px",
                            borderLeft: "2px solid #1e1e1e",
                            marginBottom: 6,
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {block.questions && block.questions.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            color: "#555",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: 10,
                          }}
                        >
                          Perguntas para a turma
                        </div>
                        {block.questions.map((q, qi) => (
                          <QuestionCard key={qi} ask={q.ask} expected={q.expected} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Solutions tab */}
        {activeTab === "solucoes" && (
          <div>
            {solutions.length === 0 && (
              <div style={{ color: "#444", fontSize: "0.88rem", padding: "16px 0" }}>
                Sem soluções detalhadas para este dia. Consulte os roteiros dos dias 1-3.
              </div>
            )}
            {solutions.map((sol) => (
              <SolutionCard key={sol.labId} solution={sol} />
            ))}

            {day === 2 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ color: "#555", fontSize: "0.8rem", marginBottom: 12, padding: "10px 14px", background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
                  Soluções completas de Forest e Active estao na base de dados. As mais frequentemente questionadas sao: Active (GPP password) e Forest (BloodHound path). Apresente no debrief noturno.
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function QuestionCard({ ask, expected }: { ask: string; expected: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        padding: "12px 14px",
        marginBottom: 8,
      }}
    >
      <div style={{ color: "#aaa", fontSize: "0.87rem", lineHeight: 1.5, marginBottom: 8 }}>
        Pergunta: <em style={{ color: "#c8c8c8" }}>{ask}</em>
      </div>
      {revealed ? (
        <div
          style={{
            color: "#4a9e8a",
            fontSize: "0.84rem",
            lineHeight: 1.5,
            padding: "8px 10px",
            background: "#061210",
            border: "1px solid #1a3a32",
          }}
        >
          Resposta esperada: {expected}
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          style={{
            background: "none",
            border: "1px solid #2a2a2a",
            color: "#555",
            cursor: "pointer",
            padding: "4px 12px",
            fontSize: "0.75rem",
          }}
        >
          Revelar resposta esperada
        </button>
      )}
    </div>
  );
}

function CommandBreakdown({ command }: { command: string }) {
  const parts = buildCommandParts(command);

  if (parts.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 8,
        background: "#090909",
        border: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          padding: "7px 10px",
          borderBottom: "1px solid #171717",
          color: "#666",
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Partes do comando
      </div>
      <div style={{ padding: "8px 10px" }}>
        {parts.map((part, i) => (
          <div
            key={`${part.term}-${i}`}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(92px, 180px) 1fr",
              gap: 10,
              padding: "6px 0",
              borderBottom: i === parts.length - 1 ? "none" : "1px solid #121212",
              alignItems: "start",
            }}
          >
            <code
              style={{
                color: "#d6f5d6",
                fontFamily: "monospace",
                fontSize: "0.78rem",
                wordBreak: "break-word",
              }}
            >
              {part.term}
            </code>
            <span style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.5 }}>{part.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionCard({ solution }: { solution: import("@/data/adminData").LabSolution }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: "1px solid #1e1e1e", marginBottom: 10, background: "#0d0d0d" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "14px 18px",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.9rem" }}>{solution.name}</div>
          <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 3 }}>
            {solution.steps.length} etapas — {solution.mitre.join(", ")}
          </div>
        </div>
        <span style={{ color: "#444" }}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 20px" }}>
          <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
            {solution.steps.map((step, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      background: "#111",
                      border: "1px solid #333",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      color: "#555",
                      flexShrink: 0,
                      fontFamily: "monospace",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: "#c8c8c8", fontWeight: 600, fontSize: "0.88rem" }}>{step.objective}</span>
                </div>
                <div
                  style={{
                    paddingLeft: 32,
                  }}
                >
                  <p style={{ color: "#777", fontSize: "0.84rem", margin: "0 0 8px 0", lineHeight: 1.6 }}>
                    {step.explanation}
                  </p>
                  {step.command && (
                    <>
                      <TerminalBlock
                        lines={step.command.split("\n").map((line) => ({
                          type: line.startsWith("#") ? "comment" : "prompt",
                          text: line,
                        }))}
                        label="comando"
                      />
                      <CommandBreakdown command={step.command} />
                    </>
                  )}
                  {step.output && (
                    <div
                      style={{
                        background: "#000",
                        border: "1px solid #1a1a1a",
                        padding: "8px 12px",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#aad4aa",
                        marginTop: 6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {step.output}
                    </div>
                  )}
                  {step.errors && (
                    <div
                      style={{
                        background: "#100808",
                        border: "1px solid #2a1010",
                        padding: "8px 12px",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#c06060",
                        marginTop: 6,
                      }}
                    >
                      ATENCAO: {step.errors}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: 8,
                      padding: "6px 10px",
                      background: "#061210",
                      border: "1px solid #1a3a32",
                      fontSize: "0.78rem",
                      color: "#4a9e8a",
                    }}
                  >
                    Confirmacao: {step.confirmation}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #1a1a1a" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#555",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Tecnicas MITRE ATT&CK
              </div>
              {solution.mitre.map((m) => (
                <span
                  key={m}
                  style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    color: "#d4913a",
                    border: "1px solid #3a2800",
                    padding: "2px 8px",
                    marginRight: 6,
                    marginBottom: 4,
                    fontFamily: "monospace",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { LogOut, ChevronLeft } from "lucide-react";
import { teacherNotes, labSolutions } from "@/data/adminData";
import TerminalBlock from "@/components/TerminalBlock";

type CommandPart = {
  term: string;
  description: string;
};

const commandDescriptions: Record<string, string> = {
  nmap: "ferramenta usada para descobrir portas, serviços, versões e pistas de enumeração em um alvo autorizado.",
  curl: "cliente HTTP usado para ver a resposta bruta de uma página, endpoint ou arquivo sem depender do navegador.",
  grep: "filtra texto por padrão; aqui reduz a saída para linhas que contenham o termo procurado.",
  find: "procura arquivos e diretórios por critérios como permissão, nome, dono ou tipo.",
  getcap: "lista capabilities Linux aplicadas a binários.",
  cat: "mostra conteúdo de arquivo no terminal.",
  rm: "remove arquivos; no curso aparece para limpar artefatos temporários do lab.",
  gobuster: "ferramenta de enumeração por wordlist, usada para descobrir diretórios, arquivos ou vhosts.",
  smbclient: "cliente SMB que lista shares, acessa pastas compartilhadas e testa sessão nula ou credenciais.",
  "gpp-decrypt": "decifra o valor cpassword de Group Policy Preferences usando a chave pública conhecida da Microsoft.",
  "GetUserSPNs.py": "script do Impacket que enumera contas com SPN e pode solicitar tickets para Kerberoasting.",
  "GetNPUsers.py": "script do Impacket que testa contas sem pré-autenticação Kerberos e coleta hash AS-REP quando possível.",
  hashcat: "ferramenta de quebra offline de hashes; o modo escolhido define o tipo de hash analisado.",
  "psexec.py": "script do Impacket que usa credenciais válidas para executar comandos remotamente via SMB/RPC.",
  rpcclient: "cliente RPC para consultar informações de domínio, usuários e grupos em serviços Windows/Samba.",
  "bloodhound-python": "coletor que consulta o Active Directory e gera dados para análise de caminhos no BloodHound.",
  net: "ferramenta Windows/Samba para administrar usuários, grupos, senhas e recursos de domínio.",
  pypykatz: "ferramenta que analisa dumps do LSASS e extrai credenciais, hashes ou tickets quando presentes.",
  diskshadow: "utilitário Windows para criar e manipular cópias de sombra de volumes.",
  robocopy: "ferramenta robusta de cópia no Windows; com modo backup consegue copiar arquivos protegidos quando a permissão existe.",
  "secretsdump.py": "script do Impacket que extrai hashes de credenciais de sistemas Windows, online ou offline.",
  msfvenom: "gerador de payloads; aqui cria arquivo implantável para obter shell em laboratório autorizado.",
  linpeas: "script de enumeração local Linux; aponta pistas de privesc que precisam ser validadas manualmente.",
  "linpeas.sh": "script de enumeração local Linux; aponta pistas de privesc que precisam ser validadas manualmente.",
  "./linpeas.sh": "execução local do linPEAS no diretório atual do laboratório.",
  "/tmp/linpeas.sh": "caminho temporário do linPEAS no alvo Linux do laboratório.",
  wget: "cliente HTTP/FTP usado para baixar arquivos pelo terminal.",
  chmod: "altera permissões de arquivos e diretórios.",
  tee: "mostra a saída na tela e grava uma cópia em arquivo.",
  less: "visualizador de texto paginado, útil para revisar saídas longas.",
  sha256sum: "calcula hash SHA256 para identificar e registrar integridade de arquivo.",
  nc: "netcat: abre conexões TCP/UDP simples ou listeners em laboratório.",
  file: "identifica o tipo de um arquivo pelo conteúdo.",
  ls: "lista arquivos, permissões, tamanho e metadados básicos.",
  ssh: "cliente de acesso remoto seguro; usa usuário, host e credenciais para abrir uma sessão shell.",
  sudo: "executa um comando com privilégios elevados quando a política permite.",
  python3: "interpretador Python 3; aqui também pode servir arquivos via HTTP no laboratório.",
  "python3.8": "interpretador Python específico; nesta etapa é relevante porque possui capability perigosa.",
};

const optionDescriptions: Record<string, string> = {
  "-sC": "executa os scripts padrão do Nmap, equivalentes a --script=default; ajuda a coletar banners e enumeração inicial segura para CTF.",
  "-sV": "tenta identificar nome e versão dos serviços nas portas abertas.",
  "-sS": "SYN scan do Nmap; rápido e comum quando há privilégio/root.",
  "-sT": "TCP connect scan do Nmap; usa conexão completa quando não há privilégio para SYN scan.",
  "-sU": "UDP scan do Nmap; útil para DNS, SNMP, NTP e outros serviços UDP.",
  "-sn": "host discovery do Nmap sem varrer portas.",
  "-oN": "salva a saída normal em um arquivo, preservando evidência para relatório e revisão.",
  "-oA": "salva a saída em três formatos: normal, grepable e XML.",
  "-oX": "salva a saída em XML para importação ou processamento.",
  "-Pn": "pula a descoberta de host por ping e trata o alvo como ativo; útil quando ICMP ou probes iniciais são bloqueados.",
  "-p": "define a porta ou lista de portas que serão analisadas.",
  "-p-": "manda o Nmap varrer todas as portas TCP, de 1 a 65535.",
  "-p:payload": "no msfvenom, escolhe o payload que será colocado no arquivo gerado.",
  "--top-ports": "no Nmap, escaneia as portas mais comuns até o número informado.",
  "-F": "fast scan do Nmap, usando menos portas para uma triagem rápida.",
  "-A": "modo agressivo do Nmap: combina detecção de OS, versão, scripts padrão e traceroute.",
  "-O:nmap": "ativa tentativa de detecção de sistema operacional no Nmap.",
  "--script": "seleciona script NSE específico do Nmap.",
  "--script-help": "mostra ajuda de scripts NSE instalados.",
  "--reason": "mostra o motivo técnico do estado atribuído a cada porta.",
  "--open": "filtra a saída para mostrar apenas portas abertas ou provavelmente abertas.",
  "-iL": "lê alvos a partir de um arquivo.",
  "--exclude": "remove um alvo ou lista de alvos do escopo.",
  "-T": "define timing template do Nmap, de T0 a T5.",
  "--max-retries": "limita quantas vezes o Nmap repete probes sem resposta.",
  "--min-rate": "define uma taxa mínima de envio de pacotes para acelerar varreduras em laboratório.",
  "-L": "no smbclient, lista shares disponíveis no servidor em vez de abrir uma share específica.",
  "-L:curl": "no curl, segue redirects HTTP 301/302 até o destino final.",
  "-N": "tenta autenticar sem senha; usado para testar acesso anônimo ou sessão nula.",
  "-U": "define o usuário para autenticação RPC/SMB; string vazia indica tentativa sem usuário real.",
  "-s": "no curl, modo silencioso; remove barra de progresso e deixa a saída mais limpa para pipes.",
  "-i": "no grep, ignora diferença entre maiúsculas e minúsculas ao procurar o termo.",
  "-Ei": "no grep, usa expressão regular estendida e ignora maiúsculas/minúsculas.",
  "-R:grep": "no grep, busca recursivamente em diretórios.",
  "-perm": "no find, filtra por bits de permissão, como SUID 4000.",
  "-type": "no find, filtra por tipo de item, como f para arquivo e d para diretório.",
  "-u": "define usuário para autenticação em ferramentas como bloodhound-python.",
  "-u:url": "no gobuster, define a URL base que será enumerada.",
  "-p:password": "define senha em ferramentas que aceitam credenciais na linha de comando.",
  "-p:ports": "define porta ou lista de portas a escanear no Nmap.",
  "-w": "define a wordlist usada para testar caminhos, nomes ou senhas.",
  "-d": "define o domínio Active Directory consultado.",
  "-ns": "define o servidor DNS que o coletor deve usar para resolver o domínio.",
  "-c": "define quais coletores do BloodHound serão executados; All coleta o conjunto amplo.",
  "-c:python": "no Python, executa o código passado como string logo em seguida.",
  "-request": "solicita tickets Kerberos para contas com SPN, gerando material para Kerberoasting.",
  "-outputfile": "salva o resultado em um arquivo indicado, útil para passar para hashcat ou documentar evidência.",
  "-usersfile": "informa uma lista de usuários para testar em massa.",
  "-no-pass": "tenta a operação sem senha, comum em AS-REP Roasting para contas sem pré-autenticação.",
  "-m": "seleciona o modo do hashcat, ou seja, o tipo exato de hash que será quebrado.",
  "-m:python": "no Python, executa um módulo como programa.",
  "-ntds": "aponta o arquivo ntds.dit offline que contém o banco de credenciais do AD.",
  "-system": "aponta a hive SYSTEM usada para derivar chaves necessárias ao dump offline.",
  "-windows-auth": "usa autenticação integrada do Windows em vez de autenticação SQL local.",
  "-f": "define o formato do arquivo gerado pelo msfvenom.",
  "-f:rm": "no rm, força remoção sem pedir confirmação.",
  "-l:msfvenom": "no msfvenom, lista tipos disponíveis, como payloads, formatos ou encoders.",
  "-o": "define o arquivo de saída gerado por uma ferramenta.",
  "-O:wget": "no wget, define o caminho/nome do arquivo salvo.",
  "-la": "no ls, lista em formato longo incluindo arquivos ocultos.",
  "-lh": "no ls, lista em formato longo com tamanhos legíveis.",
  "+x": "adiciona permissão de execução ao arquivo no chmod.",
  "-R:less": "no less, preserva cores ANSI na visualização.",
  "-lvnp": "no netcat, abre listener verboso, sem DNS reverso, na porta indicada.",
  "-nv": "no netcat, conecta em modo verboso sem DNS reverso.",
  "-a": "em ferramentas de log, geralmente adiciona ao arquivo existente em vez de sobrescrever.",
  "/add": "adiciona o usuário ou objeto ao grupo informado.",
  "/domain": "aplica a operação no domínio, não apenas na máquina local.",
  "/user": "informa a credencial usada para autenticar a operação.",
  "/S": "define o servidor ou controlador de domínio contra o qual o comando será executado.",
  "/s": "no diskshadow, executa um script de comandos a partir de um arquivo.",
  "/b": "no robocopy, usa modo backup; requer privilégio apropriado e permite copiar arquivos protegidos.",
};

const valueDescriptions: Record<string, string> = {
  "scan.txt": "arquivo onde o resultado do scan inicial será salvo.",
  "kerb.txt": "arquivo que receberá o hash/ticket coletado para análise offline.",
  "asrep.txt": "arquivo onde os hashes AS-REP coletados serão salvos.",
  "hash.txt": "arquivo local contendo o hash que será quebrado.",
  "rockyou.txt": "wordlist usada para tentar senhas comuns em hashes de laboratório.",
  "/usr/share/wordlists/rockyou.txt": "caminho comum da wordlist rockyou em distribuições de pentest.",
  "users.txt": "lista de usuários que será testada pela ferramenta.",
  "common.txt": "wordlist de caminhos comuns usada para enumeração web.",
  "13100": "modo hashcat para Kerberos 5 TGS-REP etype 23, usado em Kerberoasting.",
  "18200": "modo hashcat para Kerberos 5 AS-REP etype 23, usado em AS-REP Roasting.",
  "8080": "porta TCP alvo; neste lab hospeda o Tomcat Manager.",
  "4444": "porta local onde o listener aguardará a shell reversa.",
  "All": "coleta ampla do BloodHound: usuários, grupos, sessões, ACLs e relações relevantes.",
  "LOCAL": "indica ao secretsdump que o dump será processado localmente, a partir dos arquivos informados.",
  "shadow.txt": "script de instruções que o diskshadow vai executar.",
  "ntds.dit": "banco do Active Directory com objetos do domínio e material de credenciais.",
  "SYSTEM": "hive do registro Windows necessária para extrair chaves usadas na leitura do ntds.dit.",
  "shell.war": "arquivo WAR gerado para deploy no Tomcat.",
  "java/jsp_shell_reverse_tcp": "payload JSP Java que conecta de volta para o listener do operador no lab.",
  "war": "formato de pacote de aplicação Java aceito pelo Tomcat Manager.",
  "linpeas.sh": "arquivo do linPEAS baixado para o operador ou transferido ao alvo.",
  "/tmp/linpeas.sh": "caminho temporário usado para executar linPEAS no alvo.",
  "/tmp/linpeas.txt": "arquivo de saída salvo para revisar achados depois.",
  "8000": "porta HTTP local usada para servir arquivo em laboratório.",
  "shell.aspx": "arquivo ASPX gerado para lab com IIS que executa ASP.NET.",
};

const positionalDescriptions: Record<string, Record<number, string>> = {
  nmap: {
    1: "alvo autorizado do scan; pode ser IP, hostname ou faixa.",
  },
  curl: {
    1: "URL consultada; a resposta ajuda a confirmar conteúdo, endpoint ou comportamento da aplicação.",
  },
  grep: {
    1: "termo ou expressão usada para filtrar a saída recebida.",
  },
  gobuster: {
    1: "modo de enumeração; dir procura diretórios e arquivos em uma aplicação web.",
  },
  smbclient: {
    1: "servidor ou share SMB que será listado ou acessado.",
  },
  "gpp-decrypt": {
    1: "valor cpassword extraído do Groups.xml para ser decifrado.",
  },
  "GetUserSPNs.py": {
    1: "domínio e credencial usados para consultar SPNs e solicitar tickets.",
  },
  "GetNPUsers.py": {
    1: "domínio consultado para testar usuários sem pré-autenticação Kerberos.",
  },
  hashcat: {
    1: "arquivo com hash a quebrar.",
    2: "wordlist usada nas tentativas de senha.",
  },
  "psexec.py": {
    1: "domínio, usuário, senha e host usados para abrir execução remota no alvo.",
  },
  rpcclient: {
    1: "host alvo do serviço RPC.",
  },
  "bloodhound-python": {
    1: "coletor Python do BloodHound; as opções seguintes definem domínio, credencial, DNS e escopo.",
  },
  net: {
    1: "subcomando do net; aqui opera em grupo, RPC ou senha conforme a linha.",
    2: "objeto alvo da operação, como grupo ou usuário.",
  },
  pypykatz: {
    1: "modo de análise; lsa indica extração de segredos associados ao LSASS.",
    2: "tipo de entrada; minidump informa que será analisado um dump de memória.",
    3: "arquivo de dump do LSASS a ser processado.",
  },
  diskshadow: {
    1: "script com instruções para criar ou expor a shadow copy.",
  },
  robocopy: {
    1: "origem da cópia, neste caso um caminho dentro da shadow copy.",
    2: "destino local da cópia.",
    3: "arquivo a copiar da origem para o destino.",
  },
  "secretsdump.py": {
    1: "modo local/offline após informar ntds.dit e SYSTEM.",
  },
  msfvenom: {
    1: "ferramenta que vai gerar o payload conforme opções de payload, host, porta, formato e saída.",
  },
  linpeas: {
    1: "script de enumeração local que deve ser interpretado e validado manualmente.",
  },
  "linpeas.sh": {
    1: "script de enumeração local que deve ser interpretado e validado manualmente.",
  },
  "./linpeas.sh": {
    1: "execução do linPEAS a partir do diretório atual.",
  },
  "/tmp/linpeas.sh": {
    1: "execução do linPEAS a partir de diretório temporário no alvo.",
  },
  wget: {
    1: "URL do arquivo a baixar.",
  },
  chmod: {
    1: "permissão que será aplicada.",
    2: "arquivo que receberá a alteração de permissão.",
  },
  tee: {
    1: "arquivo que receberá uma cópia da saída.",
  },
  less: {
    1: "arquivo que será lido de forma paginada.",
  },
  sha256sum: {
    1: "arquivo cujo hash será calculado.",
  },
  nc: {
    1: "host ou porta, dependendo do modo de conexão/listener.",
    2: "porta, quando o primeiro argumento é um host.",
  },
  file: {
    1: "arquivo cujo tipo será identificado.",
  },
  ls: {
    1: "arquivo ou diretório que será listado.",
  },
  ssh: {
    1: "usuário e host usados para abrir a sessão SSH.",
  },
  sudo: {
    1: "comando permitido para execução elevada segundo a regra de sudo.",
  },
  python3: {
    1: "módulo ou script chamado pelo Python.",
    2: "argumento do módulo ou script.",
  },
  "python3.8": {
    1: "código Python passado diretamente pela linha de comando.",
  },
};

const optionValueLabels: Record<string, string> = {
  "-oN": "nome do arquivo que receberá a saída normal do Nmap.",
  "-oA": "prefixo dos arquivos de saída normal, grepable e XML.",
  "-oX": "arquivo XML de saída.",
  "-p": "porta ou conjunto de portas selecionadas.",
  "-p:ports": "porta ou conjunto de portas selecionadas.",
  "-p:payload": "payload escolhido para gerar o artefato.",
  "--top-ports": "quantidade de portas comuns a escanear.",
  "--script": "nome ou expressão do script NSE a executar.",
  "--script-help": "script ou conjunto de scripts cuja ajuda será exibida.",
  "-iL": "arquivo com lista de alvos.",
  "--exclude": "alvo removido do escopo.",
  "-T": "nível de timing escolhido.",
  "--max-retries": "número máximo de novas tentativas.",
  "--min-rate": "taxa mínima de pacotes por segundo.",
  "-u": "nome de usuário usado na autenticação.",
  "-u:url": "URL base que será enumerada.",
  "-p:password": "senha usada na autenticação.",
  "-w": "wordlist usada pela ferramenta.",
  "-d": "nome do domínio consultado.",
  "-ns": "servidor DNS usado para resolver o domínio.",
  "-c": "conjunto de coletores selecionado.",
  "-c:python": "código Python a executar diretamente.",
  "-outputfile": "arquivo de saída da coleta.",
  "-usersfile": "arquivo com a lista de usuários.",
  "-m": "identificador do tipo de hash no hashcat.",
  "-m:python": "módulo Python que será executado.",
  "-perm": "permissão usada como filtro.",
  "-type": "tipo de item buscado pelo find.",
  "-ntds": "caminho do arquivo ntds.dit.",
  "-system": "caminho da hive SYSTEM.",
  "-f": "formato do payload gerado.",
  "-l:msfvenom": "categoria que será listada pelo msfvenom.",
  "-o": "arquivo de saída.",
  "-O:wget": "arquivo de destino do download.",
  "/user": "usuário e senha usados para autenticar a alteração.",
  "/S": "servidor ou controlador de domínio alvo.",
  "/s": "arquivo de script usado pelo diskshadow.",
};

const optionTokensWithValues = new Set(Object.keys(optionValueLabels));

function tokenizeCommand(command: string) {
  return command.match(/"[^"]*"|'[^']*'|\S+/g) || [];
}

function stripInlineComment(line: string) {
  const commentIndex = line.indexOf(" #");
  return commentIndex >= 0 ? line.slice(0, commentIndex).trim() : line;
}

function normalizeOption(token: string, commandName: string) {
  if (token.startsWith("/user:")) return "/user";
  if (token === "-p" && commandName === "bloodhound-python") return "-p:password";
  if (token === "-p" && commandName === "nmap") return "-p:ports";
  if (token === "-p" && commandName === "msfvenom") return "-p:payload";
  if (token === "-u" && commandName === "gobuster") return "-u:url";
  if (token === "-c" && commandName === "python3.8") return "-c:python";
  if (token === "-m" && commandName === "python3") return "-m:python";
  if (token === "-l" && commandName === "msfvenom") return "-l:msfvenom";
  if (token === "-f" && commandName === "rm") return "-f:rm";
  if (token === "-R" && commandName === "grep") return "-R:grep";
  if (token === "-O" && commandName === "nmap") return "-O:nmap";
  if (token === "-O" && commandName === "wget") return "-O:wget";
  if (token === "-L" && commandName === "curl") return "-L:curl";
  if (token === "-R" && commandName === "less") return "-R:less";
  return token;
}

function isOptionToken(token: string) {
  if (token.startsWith("-")) return true;
  if (token.startsWith("+")) return true;
  if (token.startsWith("//")) return false;
  if (optionDescriptions[token] || optionValueLabels[token]) return true;
  return /^\/[A-Za-z]+:/.test(token);
}

function isLikelyTechnicalCommand(commandName: string, tokens: string[]) {
  return Boolean(
    commandDescriptions[commandName] ||
      commandName.endsWith(".py") ||
      commandName.endsWith(".sh") ||
      tokens.some((token) => isOptionToken(token) || token.includes("://")),
  );
}

function describeValue(token: string, previousOption?: string) {
  const cleanToken = token.replace(/^["']|["']$/g, "");

  if (previousOption && optionValueLabels[previousOption]) {
    const knownValue = valueDescriptions[cleanToken];
    return knownValue ? `${optionValueLabels[previousOption]} Neste caso: ${knownValue}` : optionValueLabels[previousOption];
  }

  if (valueDescriptions[cleanToken]) return valueDescriptions[cleanToken];
  if (/^https?:\/\//.test(cleanToken)) return "URL alvo consultada pela ferramenta.";
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(cleanToken)) return "endereço IP do alvo autorizado no laboratório.";
  if (/^(?:\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(cleanToken)) return "faixa de rede em notação CIDR usada como escopo da varredura.";
  if (/^LHOST=/.test(cleanToken)) return "define o IP da máquina do operador que receberá a conexão reversa.";
  if (/^LPORT=/.test(cleanToken)) return "define a porta local onde o listener aguardará a conexão reversa.";
  if (/^\/\/[^/]+/.test(cleanToken)) return "alvo SMB em formato de servidor ou share.";
  if (/^<.+>$/.test(cleanToken)) return "placeholder que deve ser substituído pelo valor real do laboratório.";
  if (/^[\w.-]+\.[\w.-]+\/.+/.test(cleanToken)) return "domínio e credencial no formato aceito pela ferramenta.";
  if (/^[\w.-]+@(?:\d{1,3}\.){3}\d{1,3}$/.test(cleanToken)) return "usuário e host usados para autenticação remota.";
  if (/^\d+$/.test(cleanToken)) return "valor numérico usado pela opção anterior ou pelo subcomando.";
  if (/^[\w./\\:-]+\.(txt|war|DMP|dit|xml)$/i.test(cleanToken)) return "arquivo usado como entrada ou saída nesta etapa.";
  return "";
}

function buildPartsFromTokens(tokens: string[]): CommandPart[] {
  const commandName = tokens[0];

  if (!commandName || !isLikelyTechnicalCommand(commandName, tokens)) return [];

  const parts: CommandPart[] = [];
  const commandDescription = commandDescriptions[commandName] || "ferramenta ou script executado nesta etapa.";
  parts.push({ term: commandName, description: commandDescription });

  let positionalIndex = 0;
  let previousOption: string | undefined;

  tokens.slice(1).forEach((token) => {
    if (isOptionToken(token)) {
      const normalized = normalizeOption(token, commandName);
      parts.push({
        term: token,
        description: optionDescriptions[normalized] || optionDescriptions[token] || "opção que altera o comportamento da ferramenta nesta etapa.",
      });
      previousOption = optionTokensWithValues.has(normalized) ? normalized : undefined;
      return;
    }

    const valueDescription = describeValue(token, previousOption);

    if (valueDescription) {
      parts.push({ term: token, description: valueDescription });
    } else {
      positionalIndex += 1;
      const positionalDescription = positionalDescriptions[commandName]?.[positionalIndex];
      if (positionalDescription) parts.push({ term: token, description: positionalDescription });
    }

    previousOption = undefined;
  });

  return parts;
}

function buildCommandParts(command: string): CommandPart[] {
  const lines = command
    .split("\n")
    .map((line) => stripInlineComment(line.trim()))
    .filter((line) => line && !line.startsWith("#") && !line.startsWith(">"));

  return lines.flatMap((line) => {
    const tokens = tokenizeCommand(line);
    const parts: CommandPart[] = [];
    let segment: string[] = [];

    tokens.forEach((token) => {
      if (token === "|" || token === "&&" || token === ";") {
        parts.push(...buildPartsFromTokens(segment));
        parts.push({
          term: token,
          description: token === "|" ? "pipe: envia a saída do comando anterior para o próximo comando." : "separador/encadeador de comandos no shell.",
        });
        segment = [];
        return;
      }

      segment.push(token);
    });

    parts.push(...buildPartsFromTokens(segment));
    return parts;
  });
}

export default function AdminDayView() {
  const [, setLocation] = useLocation();
  const params = useParams<{ day: string }>();
  const day = parseInt(params.day || "1");

  const [activeTab, setActiveTab] = useState<"roteiro" | "solucoes">("roteiro");
  const [openBlock, setOpenBlock] = useState<number | null>(0);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      setLocation("/admin");
    }
  }, [setLocation]);

  const note = teacherNotes.find((n) => n.day === day);
  const solutions = labSolutions.filter((s) => {
    const labDay: Record<string, number> = {
      cap: 1, nibbles: 1, jerry: 1,
      forest: 2, active: 2,
      blackfield: 3,
    };
    return labDay[s.labId] === day;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setLocation("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #1a1a1a",
          background: "rgba(10,10,10,0.97)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 24px",
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setLocation("/admin/dashboard")}
              style={{
                background: "none",
                border: "1px solid #222",
                cursor: "pointer",
                color: "#555",
                padding: "5px 8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#d4913a",
                border: "1px solid #3a2800",
                padding: "2px 8px",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
              }}
            >
              PROFESSOR
            </span>
            <span style={{ color: "#666", fontSize: "0.82rem" }}>Dia {day}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "1px solid #2a2a2a",
              color: "#555",
              cursor: "pointer",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
            }}
          >
            <LogOut size={12} /> Sair
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 60px" }}>
        {note && (
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ margin: "0 0 6px 0", fontSize: "1.3rem", fontWeight: 700, color: "#e0e0e0" }}>
              {note.title}
            </h1>
            <p style={{ margin: 0, color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>
              <strong style={{ color: "#888" }}>Objetivo:</strong> {note.objective}
            </p>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 1, marginBottom: 28, borderBottom: "1px solid #1a1a1a" }}>
          {(["roteiro", "solucoes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #d4913a" : "2px solid transparent",
                padding: "10px 18px",
                cursor: "pointer",
                color: activeTab === tab ? "#d4913a" : "#555",
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
                marginBottom: -1,
              }}
            >
              {tab === "roteiro" ? "Roteiro" : "Solucoes dos Labs"}
            </button>
          ))}
        </div>

        {/* Roteiro tab */}
        {activeTab === "roteiro" && note && (
          <div>
            {note.blocks.map((block, bi) => (
              <div
                key={bi}
                style={{
                  border: "1px solid #1e1e1e",
                  marginBottom: 10,
                  background: "#0d0d0d",
                }}
              >
                <button
                  onClick={() => setOpenBlock(openBlock === bi ? null : bi)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "14px 18px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.9rem" }}>{block.title}</div>
                    <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 2 }}>{block.duration}</div>
                  </div>
                  <span style={{ color: "#444", fontSize: "1rem" }}>{openBlock === bi ? "−" : "+"}</span>
                </button>

                {openBlock === bi && (
                  <div style={{ padding: "0 18px 18px" }}>
                    <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16, marginBottom: 16 }}>
                      {block.content.map((item, ci) => (
                        <div
                          key={ci}
                          style={{
                            color: "#888",
                            fontSize: "0.87rem",
                            padding: "7px 0 7px 14px",
                            borderLeft: "2px solid #1e1e1e",
                            marginBottom: 6,
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {block.questions && block.questions.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            color: "#555",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: 10,
                          }}
                        >
                          Perguntas para a turma
                        </div>
                        {block.questions.map((q, qi) => (
                          <QuestionCard key={qi} ask={q.ask} expected={q.expected} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Solutions tab */}
        {activeTab === "solucoes" && (
          <div>
            {solutions.length === 0 && (
              <div style={{ color: "#444", fontSize: "0.88rem", padding: "16px 0" }}>
                Sem soluções detalhadas para este dia. Consulte os roteiros dos dias 1-3.
              </div>
            )}
            {solutions.map((sol) => (
              <SolutionCard key={sol.labId} solution={sol} />
            ))}

            {day === 2 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ color: "#555", fontSize: "0.8rem", marginBottom: 12, padding: "10px 14px", background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
                  Soluções completas de Forest e Active estao na base de dados. As mais frequentemente questionadas sao: Active (GPP password) e Forest (BloodHound path). Apresente no debrief noturno.
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function QuestionCard({ ask, expected }: { ask: string; expected: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        padding: "12px 14px",
        marginBottom: 8,
      }}
    >
      <div style={{ color: "#aaa", fontSize: "0.87rem", lineHeight: 1.5, marginBottom: 8 }}>
        Pergunta: <em style={{ color: "#c8c8c8" }}>{ask}</em>
      </div>
      {revealed ? (
        <div
          style={{
            color: "#4a9e8a",
            fontSize: "0.84rem",
            lineHeight: 1.5,
            padding: "8px 10px",
            background: "#061210",
            border: "1px solid #1a3a32",
          }}
        >
          Resposta esperada: {expected}
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          style={{
            background: "none",
            border: "1px solid #2a2a2a",
            color: "#555",
            cursor: "pointer",
            padding: "4px 12px",
            fontSize: "0.75rem",
          }}
        >
          Revelar resposta esperada
        </button>
      )}
    </div>
  );
}

function CommandBreakdown({ command }: { command: string }) {
  const parts = buildCommandParts(command);

  if (parts.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 8,
        background: "#090909",
        border: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          padding: "7px 10px",
          borderBottom: "1px solid #171717",
          color: "#666",
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Partes do comando
      </div>
      <div style={{ padding: "8px 10px" }}>
        {parts.map((part, i) => (
          <div
            key={`${part.term}-${i}`}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(92px, 180px) 1fr",
              gap: 10,
              padding: "6px 0",
              borderBottom: i === parts.length - 1 ? "none" : "1px solid #121212",
              alignItems: "start",
            }}
          >
            <code
              style={{
                color: "#d6f5d6",
                fontFamily: "monospace",
                fontSize: "0.78rem",
                wordBreak: "break-word",
              }}
            >
              {part.term}
            </code>
            <span style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.5 }}>{part.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionCard({ solution }: { solution: import("@/data/adminData").LabSolution }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: "1px solid #1e1e1e", marginBottom: 10, background: "#0d0d0d" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "14px 18px",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.9rem" }}>{solution.name}</div>
          <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 3 }}>
            {solution.steps.length} etapas — {solution.mitre.join(", ")}
          </div>
        </div>
        <span style={{ color: "#444" }}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 20px" }}>
          <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
            {solution.steps.map((step, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      background: "#111",
                      border: "1px solid #333",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      color: "#555",
                      flexShrink: 0,
                      fontFamily: "monospace",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: "#c8c8c8", fontWeight: 600, fontSize: "0.88rem" }}>{step.objective}</span>
                </div>
                <div
                  style={{
                    paddingLeft: 32,
                  }}
                >
                  <p style={{ color: "#777", fontSize: "0.84rem", margin: "0 0 8px 0", lineHeight: 1.6 }}>
                    {step.explanation}
                  </p>
                  {step.command && (
                    <>
                      <TerminalBlock
                        lines={step.command.split("\n").map((line) => ({
                          type: line.startsWith("#") ? "comment" : "prompt",
                          text: line,
                        }))}
                        label="comando"
                      />
                      <CommandBreakdown command={step.command} />
                    </>
                  )}
                  {step.output && (
                    <div
                      style={{
                        background: "#000",
                        border: "1px solid #1a1a1a",
                        padding: "8px 12px",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#aad4aa",
                        marginTop: 6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {step.output}
                    </div>
                  )}
                  {step.errors && (
                    <div
                      style={{
                        background: "#100808",
                        border: "1px solid #2a1010",
                        padding: "8px 12px",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#c06060",
                        marginTop: 6,
                      }}
                    >
                      ATENCAO: {step.errors}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: 8,
                      padding: "6px 10px",
                      background: "#061210",
                      border: "1px solid #1a3a32",
                      fontSize: "0.78rem",
                      color: "#4a9e8a",
                    }}
                  >
                    Confirmacao: {step.confirmation}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #1a1a1a" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#555",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Tecnicas MITRE ATT&CK
              </div>
              {solution.mitre.map((m) => (
                <span
                  key={m}
                  style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    color: "#d4913a",
                    border: "1px solid #3a2800",
                    padding: "2px 8px",
                    marginRight: 6,
                    marginBottom: 4,
                    fontFamily: "monospace",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
