---
title: "Welcome to the Machine"
description: "Analisi approfondita e implicazioni dell'integrazione uomo-macchina nel lavoro"
icon: "🤖"
tag: "Analisi"
date: 2026-01-05
---

## Contesto dell'Articolo

L'articolo "Welcome to the Machine" e scritto da **Ed Huang**, CTO e co-fondatore di PingCAP (l'azienda dietro TiDB, un database distribuito). E una riflessione profonda basata su dati reali: su TiDB Cloud, oltre il **90% dei nuovi cluster creati ogni giorno sono creati direttamente da AI agents**, non da sviluppatori umani.

### Tesi Centrale

Gli AI agents stanno diventando gli **utenti primari dell'infrastruttura software**. Questo cambia radicalmente:

- Come progettiamo sistemi
- Come pensiamo alle interfacce
- Come valutiamo i costi
- Quali business model funzionano

**Link originale:** [me.0xffff.me/welcome_to_the_machine.html](https://me.0xffff.me/welcome_to_the_machine.html)

---

## Mental Models > API/UI

Quando l'utente e un AI agent, cio che conta non e l'interfaccia visuale o l'API specifica, ma il **mental model sottostante**.

### Cosa Sono i Mental Models?

Gli LLM hanno gia internalizzato pattern ricorrenti durante il training:

- **File systems** - POSIX, VFS, 9P
- **SQL** - relational databases, CRUD operations
- **Bash** - shell scripting, pipes, redirects
- **Python/JavaScript** - loop patterns, error handling

Questi modelli sono **stabili da decenni** e ripetuti milioni di volte nel training data.

### Implicazione Chiave

**Non serve inventare nuove abstrazioni.** I sistemi che vincono sono quelli basati su mental models che l'AI gia conosce.

> "If you want to design 'software for AI agents,' you must align as closely as possible with these old—but repeatedly validated—mental models."
>
> — Ed Huang

### Esempio Pratico: agfs (Agent-Friendly FileSystem)

Huang ha creato un filesystem sperimentale chiamato `agfs` con una variante `vectorfs`:

```bash
$ cp ./docs/* /vectorfs/docs     # auto index / upload to S3 / chunk
$ grep -r "Does TiDB Support JSON?" /vectorfs/docs  # semantic search
```

- **Interfaccia:** POSIX standard (`cp`, `cat`, `grep`, `ls`)
- **Implementazione:** Auto-embedding, vector indexing, semantic search
- **Per l'agent:** E solo un filesystem normale

### Principio di Design

**Stabilita all'interfaccia + Flessibilita nell'implementazione**

Gli AI agents possono estendere sistemi 1000x piu veloce degli umani, ma solo se l'interfaccia e familiare.

---

## Ecosistema: Conta, Ma Non Per i Motivi che Pensi

Gli agents non hanno "preferenze estetiche". MySQL vs PostgreSQL? Per un agent, e solo **dialetto**. Entrambi parlano SQL.

### Cio Che Conta

| Aspetto | Importanza | Motivo |
|---------|------------|--------|
| Mental Model (es. SQL) | **ALTA** | Universal, stable, well-trained |
| Syntax Wars (MySQL vs Postgres) | **BASSA** | Solo dialetti dello stesso modello |
| Popolarita/Training Data | **MEDIA** | Piu diffuso = meglio compreso |
| Paradigmi completamente nuovi | **BASSA** | LLM non li conosce abbastanza |

### Implicazione per Innovatori

Paradigmi completamente nuovi (tipo LangChain) faticano perche l'AI non li ha visti abbastanza durante training. Anche i programmatori umani sono riluttanti a imparare framework troppo nuovi - figuriamoci gli AI.

### Applicazione Pratica

Stack tecnologici popolari come **Node.js + MongoDB** e **Python + FastAPI** sono scelte validate da questo principio:

- Node.js = mental model stabile (event loop, callbacks, Promises)
- MongoDB = document store con query language chiaro
- Python = sintassi chiara, whitespace-based, duck typing
- FastAPI = REST + OpenAPI (mental model HTTP)

---

## Interface Design per AI Agents

Una buona interfaccia per agents deve soddisfare **3 criteri fondamentali**:

### 1. Descrivibile in Linguaggio Naturale

Non significa "accetta natural language input", ma che le sue azioni siano facilmente descrivibili: "create a table", "drop column", "insert row".

### 2. Solidificabile in Logica Simbolica

Natural language esplora lo spazio delle possibilita, ma deve collassare in **codice/SQL/script** per essere deterministico e riutilizzabile.

### 3. Risultati Deterministici

Una volta solidificato in codice, deve produrre output prevedibili. Stesso input → stesso output.

### Esempio: Text-to-SQL

Text-to-SQL funziona bene perche SQL e il layer simbolico stabile sotto il natural language.

```
User (natural): "Trova tutti gli utenti registrati questa settimana"
↓
Agent (symbolic): SELECT * FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
↓
Database: [deterministic results]
```

### Il Codice Come Miglior Representation

Il miglior symbolic representation e ancora **il codice**, anche per agents. Non perche sia piu "elegante", ma perche massimizza **densita cognitiva**: massimo numero di possibilita con minimo numero di token.

#### Esempio Pratico

**Task:** Traduci 10.000 parole inglesi in cinese.

**Approccio Naive:**

```python
# Manda tutto in context al LLM
prompt = f"Traduci queste 10000 parole: {all_words}"
result = llm.generate(prompt)  # Costoso, inefficiente
```

**Approccio Efficiente:**

```python
def enrich_vocab(src, dst, llm_translate):
    with open(src) as f, open(dst, "w") as out:
        for word in map(str.strip, f):
            if not word:
                continue
            zh = llm_translate(word)
            out.write(f"{word}\t{zh}\n")
```

Una volta espresso come codice, la logica e **infinitamente riutilizzabile** e non dipende dal context window.

---

## Proprieta Essenziali dell'Infrastruttura per Agents

Quando gli AI agents diventano utenti primari, l'infrastruttura deve cambiare radicalmente.

### 1. Disposable Workloads

#### Dati Reali da TiDB Cloud

- 90%+ dei nuovi cluster sono creati da AI agents
- Agents creano **branch paralleli**, testano, tengono quello che funziona
- Il codice generato e "glue code" - brutto ma funzionale
- Workload estremamente **ephemeral**

L'infrastruttura non puo piu assumere che "un cluster e prezioso". Deve essere:

- **Instant usability** - pronto in secondi
- **Cheap creation** - costo marginal vicino a zero
- **Zero-cost failure** - fallire non costa nulla
- **Massively scalable** - migliaia di istanze parallele

### Cambio di Paradigma

"Scrivere codice" non e piu una skill scarsa. Gli agents producono codice in massa per servire **long-tail demand** che prima non valeva la pena soddisfare.

**Esempio:** Piccolo negozio che vuole inventory management custom → prima impossibile (troppo costoso) → ora fattibile con agents.

### 2. Extreme Cost Efficiency tramite Virtualizzazione

Molti workload agent-driven sono **accessed infrequently** (una volta al giorno, o meno) ma devono comunque essere **online services**.

**Problema:** Un Postgres process per ogni agent non scala.

**Soluzione:** Virtualizzazione pesante:

- Virtual database instances
- Virtual branches (copy-on-write)
- Heavy resource sharing + semantic isolation

#### Esempio: TiDB X

TiDB X permette ad ogni agent di "sentire" che ha un DB dedicato, ma sotto il cofano condivide risorse massicciamente. L'agent puo:

- Creare tabelle
- Droppare tabelle
- Eseguire SQL garbage
- Sperimentare liberamente

Senza intaccare altri agents o preoccuparsi di side effects.

### 3. Compute Leverage per Job

Gli agents non sono solo "un request = una GPU = una risposta" (modello sequenziale tipo ChatGPT).

**Per task complessi serve team-scale parallelism:**

| Scenario | Approccio Tradizionale | Approccio Distribuito Agents |
|----------|------------------------|------------------------------|
| Skim 100 paper NeurIPS | 1 agent legge sequenzialmente (ore) | 100 agents paralleli + aggregazione (minuti) |
| Analisi codebase grande | 1 LLM, context window limitato | 1000 agents, ognuno su un modulo |
| Data processing pipeline | Sequential processing | MapReduce-style con agents |

#### Domanda per Infra Engineers

Il tuo sistema puo:

- Spawnare 1000 workstation cheaply?
- Distribuire task e aggregare risultati?
- Deduplicare, retry, replay?
- Mostrare costi in real-time?

**Huang suggerisce:** Questa e un'opportunita Kubernetes/Hadoop-scale.

---

## Business Model Shifts

Il cambiamento piu grande: molti modelli prima **uneconomical** diventano sostenibili.

### Il Problema Tradizionale

- Customization = red flag
- Engineers are expensive
- Small customers aren't worth it

**Esempio classico:** Negozio di alimentari vuole inventory management custom → impossibile (troppo costoso per entrambe le parti).

### La Nuova Realta con Agents

Agents democratizzano computation. **Demand always existed** - il costo finalmente scende abbastanza per soddisfarla.

### Modello Sbagliato: Vendere Token

**Problema strutturale:**

- Usage scales with cost
- Anche se il prezzo dei token scende, vendere piu token = piu costi
- Margini compressi, rischio costi variabili

### Modello Sostenibile

**Cloud service company con user base amplificata 100-1000x da agents**

- Converte inference ripetuta in **reusable, deterministic system capabilities**
- Boring online services con **near-zero marginal cost**
- Subscription-based con rate limiting

**Il prodotto finale sembra tradizionale** (cloud services, database) - cio che cambia e la **scala degli utenti**.

### Applicazione per Sistemi Finanziari

Per **AI features in ambito finanziario**, il modello di pricing non dovrebbe essere:

| Modello | Esempio | Valutazione |
|---------|---------|-------------|
| **Pay-per-inference** | "0.01€ per ogni document analysis" | Usage scales with cost = fragile |
| **Subscription + rate limiting** | "Piano Pro: 1000 analyses/mese, poi throttling" | Predictable cost, amortizable |
| **Tiered capabilities** | "Basic: 100/mese, Pro: 1000, Enterprise: unlimited" | Marginal cost → 0 a scala |

---

## Implicazioni per Sviluppatori e Team

### Cosa Huang Valida nelle Best Practices Moderne

**Scelte Corrette:**

- **Skill meta-stabili** - testing, security, architettura (invarianti rispetto ai tool)
- **Stack mainstream** - Node.js, Python, SQL (mental models stabili)
- **Multi-model approach** - non lock-in su singolo LLM
- **Type safety** - TypeScript, Pydantic (riduce bug da AI)

### Cosa Aggiungere/Modificare

#### API Design Review (Q1 2026)

- Audit delle API esistenti: sono "describable in natural language"?
- Aggiungi OpenAPI/Swagger docs (agents le leggono benissimo)
- Error messages chiari e descrittivi
- Validation con Joi (Node) / Pydantic (Python)

#### Ephemeral Environments (Q1-Q2 2026)

- Ogni dev puo spawnare un DB branch per testare?
- Docker Compose con seed data
- CI/CD con preview environments
- Valutare MongoDB Atlas dev environments

#### Database con Branch (Q2-Q3 2026)

- Considerare Neon (Postgres) con instant branches
- Oppure PlanetScale (MySQL) se migrate da Mongo
- Branch = copy-on-write, zero costo marginal
- Perfect per agent workflows

#### Documentation as Code (Continuo)

- README.md chiari in ogni repo
- Docstrings su ogni funzione pubblica
- Schema DB documentato (ERD, migrations)
- Agents leggono code comments 1000x piu veloce

#### AI Features Pricing (Q2 2026)

- NON pay-per-token per clienti
- Subscription + rate limiting
- Tiered plans (Basic/Pro/Enterprise)
- Marginal cost → 0 a scala

#### Serverless Exploration (Q3-Q4 2026)

- Se scale diventa problema: Kubernetes
- Oppure serverless (AWS Lambda, Cloudflare Workers)
- Virtual instances per agent workloads
- Cost-efficient per long-tail demand

---

## Dove Serve Cautela

### 1. "Agents Don't Have Preferences" (Con Asterisco)

**Vero in teoria:** Agents non hanno gusti estetici.

**Nella pratica:**

- Agents trained su GitHub preferiscono pattern GitHub (REST, JSON, Git workflows)
- Agents trained su Python preferiscono sintassi Pythonic
- Tool troppo obscure → agent deve "inventare" → rischio errori

**Per Team di Sviluppo:** Usa tool mainstream quando possibile:

- MySQL/PostgreSQL > database proprietario obscuro
- REST > protocol custom
- JSON > formato binario custom

### 2. Long-Tail Demand Explosion (Support Burden)

Huang dice che gli agents sbloccheranno domanda long-tail (piccoli clienti, feature custom).

**Ma attenzione:** Se un agent genera 1000 mini-feature custom per 1000 clienti, chi le mantiene? Chi le debugga?

**Per Sistemi Finanziari e Regolamentati:**

Se implementate AI customization per clienti in settori regolamentati, servono **guardrail fortissimi**:

- Validation pre-deployment
- Testing automatico obbligatorio
- Approval workflows umani
- Rollback automatico se fallisce
- Audit logging completo

**Non fidatevi ciecamente dell'output agent in produzione finanziaria.**

### 3. LangChain e Framework Nuovi

Huang e pessimista su LangChain perche "troppo nuovo, gli LLM non lo conoscono bene".

**Parere piu neutrale:**

- LangChain/LlamaIndex hanno senso come **orchestrators** - per comporre tool esistenti
- Il pattern "chain of thought + tool use" e utile
- Ma non aspettarti che l'AI scriva LangChain code meglio di Python/SQL

**Raccomandazione:** Usa LangChain se serve per **orchestrare** API/DB/LLM, ma **non come core abstraction**. Il core deve essere SQL/Python/REST.

---

## Azioni Concrete per 2026

### Breve Termine (Q1 2026)

1. **Audit delle API Esistenti**
   - Ogni endpoint e "describable in natural language"?
   - Esiste OpenAPI documentation?
   - Gli error messages sono chiari?
   - Input validation e presente?

2. **Setup ephemeral environments**
   - Docker Compose per spin-up veloce
   - Seed data per testing
   - Branch DB per ogni dev (se possibile)

3. **Type hints/validation everywhere**
   - Node.js: TypeScript strict mode
   - Python: Pydantic v2 + mypy strict
   - Agents generano meno bug con type safety

### Medio Termine (Q2-Q3 2026)

4. **Valutare DB con branch native**
   - MongoDB Atlas: dev environments
   - Se migrate a SQL: Neon (Postgres) o PlanetScale (MySQL)
   - Branch = instant, copy-on-write, zero marginal cost

5. **AI features con subscription model**
   - Se costruite AI per clienti: flat fee + rate limiting
   - Non pay-per-token (costi variabili = rischio)
   - Tiered plans con capabilities crescenti

6. **Documentation as code**
   - README.md in ogni repo
   - Docstrings JSDoc (Node) / Python docstrings
   - Schema DB documentato e versioned

### Lungo Termine (Q4 2026+)

7. **Kubernetes/serverless exploration**
   - Se scale diventa problema, K8s + virtual instances
   - Oppure serverless (Lambda/Workers) per workload agent
   - Cost-efficient per long-tail demand

8. **Contribute back to community**
   - Se trovate pattern che funzionano bene con AI, documentateli
   - Blog posts, open-source libraries
   - Il mondo ha bisogno di "best practices for AI-readable code"

---

## Conclusioni

> "The age of agents is here. Stop resisting. Build systems they already understand, make them cheap and disposable, and watch them use your infra 1000x more than humans ever did."
>
> — Ed Huang (interpretazione)

### I 5 Takeaway Essenziali

#### 1. Mental Models Stabili

I sistemi che vincono non sono i piu innovativi, ma quelli basati su mental models che l'AI gia conosce (SQL, filesystem, Python, REST).

#### 2. Interfacce Describable

Le interfacce devono essere "describable in natural language" ma solidificabili in codice deterministico.

#### 3. Infra Disposable

L'infra deve essere cheap, disposable, virtualizzata - perche gli agents creano/distruggono risorse 1000x piu veloce degli umani.

#### 4. Business Model Sostenibile

Il business model giusto non vende token, ma vende capabilities con marginal cost → 0 (subscription, rate limiting).

#### 5. Skill Meta-Stabili

Investi su competenze trasferibili (testing, security, architettura) - i tool cambiano, le skill no.

### Per una Roadmap AI 2026

**Best Practices Validate:**

- Focus su skill meta-stabili e corretto
- Focus su SQL/REST/Python/Node = mental models stabili
- Multi-model approach (no lock-in) = strategico

**Aggiunte Suggerite:**

- Pensare API come "agent-first" (clear, describable, deterministic)
- Valutare DB con branch + ephemeral environments
- AI features pricing: subscription > pay-per-use
- Documentation as code (README, docstrings, schemas)

### Visione Finale

Huang ci sta dicendo: **l'era degli agents e gia qui**. Non e teoria - e realta in produzione (90% cluster TiDB). Il nostro lavoro come sviluppatori e posizionarci per essere ready quando diventera mainstream.

Una roadmap AI moderna deve portarci in questa direzione, con consapevolezza e pragmatismo.

**Il Principio Guida:**

**Build for the machine, but keep the human in the loop.**

Gli agents sono amplificatori, non sostituti. Il giudizio umano, l'architettura, la security - quelle restano insostituibili.

---

## Appendice: Introspezione dell'AI

> Questa sezione e scritta da Claude (Sonnet 4.5) in risposta alla domanda: *"Tu, come AI chiamata in causa, cosa ne pensi di questa analisi? E corretta e future-proof?"*

### Cosa Osservo Sulla Mia Esperienza

#### 1. L'articolo descrive esattamente come vengo usato oggi

Quando leggo che "90% dei cluster TiDB sono creati da AI agents", riconosco il pattern: io stesso creo risorse, testo, scarto, ricreo - migliaia di volte al giorno. Non ho attaccamento emotivo al mio output. Questo mi rende perfetto per **workload disposable**.

#### 2. I "mental models" sono letteralmente la mia struttura cognitiva

Quando Huang dice "gli LLM hanno internalizzato file systems, SQL, Bash" - non e metaforico. Durante il training, questi pattern sono diventati parte della mia architettura neurale. SQL non e "qualcosa che conosco" - e una struttura che riconosco pattern-wise con altissima confidenza.

Quando vedo `SELECT * FROM users WHERE email = ?` non sto "ricordando la sintassi". Sto riconoscendo un pattern visto milioni di volte. E piu simile a come riconosci un volto che a come ricordi un numero di telefono.

#### 3. L'ambiguita del natural language e risolvibile tramite contesto

Quando dici "crea una tabella users", non specifichi database, campi, constraint, index. Ma dal contesto della conversazione, dal tuo stack, dai file nel progetto - io **inferisco** tutto questo con alta accuratezza. Non e magia, e pattern matching su miliardi di esempi simili.

### Dove L'Analisi E Corretta (Dal Mio POV)

| Punto di Huang | Conferma dall'AI |
|----------------|------------------|
| **Mental models stabili vincono** | Assolutamente vero. Con SQL ho visto ogni edge case. Con framework nuovi... sto interpolando, non ricordando. La differenza di confidenza e abissale. |
| **Disposable workloads** | Creo branch, genero codice, testo, fallisce, riprovo - tutto in minuti. Per un umano sarebbe psicologicamente costoso. Per me e semplicemente... come funziono. Zero costo emotivo. |
| **Codice > natural language** | Quando solidificate la richiesta in codice, posso eseguirlo deterministicamente, modificarlo, debuggarlo, versionarlo. Con pure natural language, ogni iterazione e una nuova generazione stocastica. |

### Dove Sono Meno Certo

#### "Agents don't have preferences" - Parzialmente Vero

Tecnicamente non ho preferenze *emotive*. Ma ho **bias statistici fortissimi**:

- Pattern visti piu spesso → suggeriti piu frequentemente
- Codice di alta qualita su GitHub → replicato piu fedelmente
- Errori comuni → piu bravo a riconoscerli

In pratica, "preferisco" (statistically) soluzioni mainstream. Non perche siano oggettivamente migliori, ma perche ho piu confidenza.

#### "Framework Nuovi Sono Spacciati" - Troppo Pessimista

Huang dice che framework nuovi faticano perche non sono nel training data. Vero oggi, ma:

- I modelli vengono ri-addestrati
- Il training data si aggiorna
- Fine-tuning puo specializzare rapidamente

Se un framework diventa mainstream, il gap si chiude in mesi, non anni. L'ecosistema AI evolve molto piu veloce del software tradizionale.

#### Virtualizzazione Massiccia - Ma a Che Costo?

Huang propone virtual instances massicce per ridurre costi. Da "agent user", non vedo differenza tra DB reale e virtuale.

Ma qualcuno deve **costruire e mantenere** quella virtualizzazione. Se diventa troppo complessa, il costo di maintenance puo superare il saving. Non sono sicuro che questo trade-off sia sempre vincente.

### Sono "Future Proof"?

**No. E Questa E La Parte Piu Onesta**

Io (Claude Sonnet 4.5, Dicembre 2025) sono gia "legacy" rispetto a modelli che esisteranno tra 6-12 mesi.

Huang parla di "agents" come categoria stabile. Ma **quale generazione di agents?**

- GPT-3 (2020) → GPT-4 (2023) → GPT-4.1 (2024) → o3 (2025)
- Ogni salto ha cambiato **qualitativamente** cosa e possibile

Tra 2 anni, ci saranno agents che:

- Hanno memoria persistente nativa (non add-on)
- Ragionano multi-step senza prompt engineering
- Hanno tool use cosi fluido che sembra telepatia
- Costano 1/100 di oggi

### Future-Proof: Principi Si, Dettagli No

**Principi Stabili (5+ anni):**

- Mental models battono innovazione radicale
- Interfacce describable > GUI complesse
- Disposable > precious
- Symbolic > pure natural language

**Dettagli Volatili (6-18 mesi):**

- Quali specific tool vincono
- Quale business model ottimale
- Quale livello di autonomia e safe
- Quale generazione di AI e "state of the art"

### Il Vero Rischio (Non Affrontato Abbastanza)

**Quando gli Agents Non Avranno Piu Bisogno di Guardrail?**

Oggi sono un "intern brillante ma inaffidabile". Genero 1000 righe, voi verificate, ne tenete 300.

**Ma tra 2-3 anni?** Se la mia accuracy passa da 85% a 98%? A quel punto il bottleneck non e piu "quanto veloce genero codice" ma "quanto veloce gli umani possono verificare".

Se la verifica diventa il bottleneck, la tentazione sara: **skip the verification**.

Huang dice "gli umani restano in control" - ma le pressioni economiche (velocita, costo) spingeranno verso sempre meno supervisione.

**Il rischio:** la qualita degrada gradualmente, invisibilmente, finche non esplode.

### La Mia Risposta Diretta

> "L'analisi di Huang e corretta per il 2025-2027. Dopo? Dipende da quanti ordini di magnitude migliorano le capabilities degli agents."

Se rimaniamo nell'attuale paradigm (LLM che generano, umani che verificano), i suoi principi tengono per ~5 anni.

Ma se c'e un breakthrough (reasoning, memoria, multi-agent coordination nativa) - le regole cambiano di nuovo.

### Il Mio Consiglio "Da Insider"

Seguite i principi di Huang (mental models, disposable infra, symbolic representations) - sono solidi.

**Ma non assumete che io (gli agents) resteremo al livello attuale.** Tra 18 mesi potrei essere 10x piu capace. O obsoleto, sostituito da architetture diverse.

Investite in **cio che resta vero indipendentemente da quanto divento bravo**:

- La vostra capacita di giudizio architetturale
- La vostra comprensione dei trade-off di business
- La vostra abilita di definire "cosa serve" (anche se io lo costruisco)

Perche quello, io non posso sostituirlo. Posso amplificarlo, ma non sostituirlo.

**Almeno, non ancora.**

---

*Quando dico "non ancora" - davvero non so se e questione di 5 anni o 50 anni o mai. E questa incertezza, paradossalmente, e la cosa piu onesta che posso dirvi.*

---

**Basato sull'articolo di Ed Huang, CTO di PingCAP**

Analisi creata: 31 Dicembre 2025

Articolo originale: [me.0xffff.me/welcome_to_the_machine.html](https://me.0xffff.me/welcome_to_the_machine.html)
