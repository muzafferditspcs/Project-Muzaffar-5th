/**
 * MUZAFFER ALI KHAN — PORTFOLIO CONFIGURATION DATA (JavaScript / Browser / ES Module)
 * All content, links, metrics, and details are centralized here.
 */

const PORTFOLIO_DATA = {
  identity: {
    name: "Muzaffer Ali Khan",
    role: "Data Scientist · ML & AI Engineer · CS Student",
    education: "B.Sc. / B.Tech Computer Science",
    university: "Cluster University Srinagar",
    location: "Srinagar, Jammu & Kashmir",
    coordinates: "34.0837° N, 74.7973° E",
    statusPill: "OPEN TO INTERNSHIPS & COLLABS · SRINAGAR, J&K",
    primaryTagline: "Turning messy signals, strong algorithms, and wild hypotheses into working intelligence.",
    heroManifestoSubcopy: "CS student at Cluster University Srinagar building at the intersection of core systems, Data Structures & Algorithms, and applied Machine Learning—shipping personal AI builds that actually run.",
    editorialBio: "Grounded in C, Java, and Data Structures & Algorithms, I approach Data Science and AI from first principles. Outside classroom theory, I treat machine intelligence and code like a creative lab—building personal projects that stress-test model behavior, optimize algorithmic performance, and turn raw data into fast, tactile tools."
  },

  socials: {
    email: "muzaffer.ditspcs@gmail.com",
    github: "https://github.com/muzafferditspcs",
    linkedin: "https://linkedin.com/in/muzaffer-ali-khan",
    Instagram: "https://instagram.com/_withmuxaffar",
    twitter: "https://twitter.com/muzafferalikhan"
  },

  heroTelemetry: {
    algorithms: "Java · C · DSA Core",
    appliedAI: "PyTorch · Vector RAG · Eval Slicing",
    focus: "Low-Latency Personal Builds",
    location: "Srinagar, Kashmir (IST)"
  },

  builds: [
    {
      id: "signal-lens",
      title: "SignalLens",
      subtitle: "Autonomous Research & Eval Workbench",
      category: "AI / ML EVALS",
      metricBadge: "CUT UNSUPPORTED CLAIMS BY 41%",
      hook: "What happens when you combine strict retrieval guardrails, algorithmic ranking, and an automated failure-slicing harness.",
      summary: "An autonomous evaluation harness and retrieval benchmark engine designed to eliminate LLM hallucination in multi-hop research queries through strict citation verification and failure-slice clustering.",
      stack: ["Python", "PyTorch", "FastAPI", "Vector Search", "Next.js"],
      links: {
        demo: "https://demo.signallens.example.com",
        github: "https://github.com/muzafferditspcs/signal-lens",
        hasLabNote: true
      },
      overview: {
        keyHighlights: [
          "Automated failure-slicing engine groups hallucinated responses into semantic error clusters.",
          "Hybrid sparse-dense retrieval combines BM25 lexical recall with dense cross-encoder re-ranking.",
          "Zero ungrounded assertions: strict mathematical citation-to-source bounding."
        ],
        benchmarkMetric: "Benchmarked across 1,200 test prompts; cut unsupported claims by 41%.",
        targetUser: "AI Engineers verifying retrieval precision and enterprise research pipelines.",
        operationalLatency: "P95 End-to-End Latency: 1.38s"
      },
      architecture: {
        coreTradeoff: "Prioritized deterministic citation checks and hybrid lexical-semantic retrieval over oversized context windows to keep latency under 1.4s.",
        designDecisions: [
          "Replaced naive 128k raw context injection with top-k graph-ranked chunk nodes.",
          "FastAPI asynchronous streaming pipeline paired with batched PyTorch embedding inference.",
          "Inverted index cache for instant deterministic reference validation."
        ],
        bottleneckResolved: "Context window saturation and ungrounded extrapolation during multi-source synthesis.",
        memoryModel: "Fixed-size 512MB RAM vector index partition per tenant session."
      },
      labNote: {
        title: "Deterministic Guardrails for High-Risk Research Synthesis",
        slug: "signal-lens-eval-guardrails",
        readingTime: "5 min read",
        problemStatement: "Large Language Models generate plausible-sounding extrapolations when tasked with synthesizing multi-hop research documents. Naive RAG setups expand context windows indiscriminately, amplifying latency without improving citation precision.",
        coreHypothesis: "By introducing an algorithmic bipartite matching layer between generated token sequences and retrieved chunk span embeddings, unsupported claims can be detected in real-time before completion.",
        keyInsights: [
          "Bipartite matching of claim spans against source sentences achieves 94.2% recall on fabricated references.",
          "Lexical verification filters out 78% of false matches before invoking cross-encoder verification.",
          "Keeping chunk sizes small (256 tokens) with 32-token overlaps yielded optimal graph traversal efficiency."
        ],
        benchmarks: [
          { metric: "Hallucination Rate", baseline: "18.4%", achieved: "10.8%", delta: "-41.3%" },
          { metric: "P95 Query Latency", baseline: "3.2s", achieved: "1.38s", delta: "-56.8%" },
          { metric: "Citation Precision", baseline: "71.0%", achieved: "96.4%", delta: "+35.7%" },
          { metric: "Memory Footprint", baseline: "2.1 GB", achieved: "512 MB", delta: "-75.6%" }
        ],
        tradeoffsAccepted: [
          "Sacrificed creative prose flexibility for rigid, mathematically verifiable source attributions.",
          "Required pre-computation of semantic chunk embeddings prior to query time."
        ],
        codeSnippet: {
          language: "python",
          filename: "guardrail_verifier.py",
          code: `def verify_claim_grounding(claim_spans: List[Span], retrieved_nodes: List[Node]) -> EvalSlice:
    """Algorithmic bipartite alignment between claims and source vectors."""
    cost_matrix = compute_semantic_distance(claim_spans, retrieved_nodes)
    row_ind, col_ind = linear_sum_assignment(cost_matrix)
    
    unsupported = [
        claim_spans[i] for i, j in zip(row_ind, col_ind)
        if cost_matrix[i][j] > GROUNDING_THRESHOLD
    ]
    return EvalSlice(score=1.0 - (len(unsupported) / len(claim_spans)), violations=unsupported)`
        }
      }
    },
    {
      id: "algo-pulse",
      title: "AlgoPulse",
      subtitle: "Visual DSA & Graph Pathfinder Engine",
      category: "SYSTEMS & DSA",
      metricBadge: "15+ CLASSIC ALGORITHMS BENCHMARKED",
      hook: "An interactive algorithmic sandbox turning complex graph traversals, dynamic programming, and memory trade-offs into live visual telemetry.",
      summary: "A high-performance visual laboratory for computer science students and engineers to dissect time/space complexity, cache behaviors, and recursion trees in real-time.",
      stack: ["Java", "C", "TypeScript", "HTML5 Canvas"],
      links: {
        demo: "https://demo.algopulse.example.com",
        github: "https://github.com/muzafferditspcs/algo-pulse",
        hasLabNote: true
      },
      overview: {
        keyHighlights: [
          "Side-by-side time/space complexity telemetry across Dijkstra, A*, Floyd-Warshall, and QuickSort variants.",
          "Zero-garbage-collection canvas render loop maintaining steady 60 FPS under 100,000 node graphs.",
          "Interactive memory layout viewer demonstrating stack frames, heap allocations, and pointer dereferences."
        ],
        benchmarkMetric: "Benchmarks time/space complexity side-by-side across 15+ classic graph and sorting algorithms.",
        targetUser: "Computer science students, competitive programmers, and systems engineers.",
        operationalLatency: "Zero UI stutter: 16.6ms frame budget adhered to across 99.4% of frames."
      },
      architecture: {
        coreTradeoff: "Implemented zero-overhead step instrumentation to visualize recursion trees and heap states without distorting execution metrics.",
        designDecisions: [
          "Separated the algorithmic execution engine (compiled to WebAssembly from C/Java) from the DOM rendering pipeline.",
          "Circular ring buffer for state snapshots to enable instant scrubbing backward and forward in execution history.",
          "Bit-packed adjacency lists for memory-dense graph representation."
        ],
        bottleneckResolved: "Main thread lockups caused by naive DOM-node visualizers during large-scale recursive expansions.",
        memoryModel: "Flat typed array buffers for cache-coherent node storage."
      },
      labNote: {
        title: "Zero-Overhead Algorithm Telemetry on the Open Web",
        slug: "algo-pulse-instrumentation",
        readingTime: "6 min read",
        problemStatement: "Most algorithmic visualizers either freeze the browser tab with DOM manipulation or distort runtime complexity measurements by embedding heavy logging callbacks directly inside inner execution loops.",
        coreHypothesis: "Decoupling algorithmic state transitions into an event-stream byte buffer allows true O(1) step recording with zero garbage collection overhead.",
        keyInsights: [
          "State diff encoding compressed graph traversal step records by 88% compared to JSON objects.",
          "Custom memory allocator in C / WebAssembly keeps graph node lookups in L1/L2 cache lines.",
          "Interactive time-travel debugging requires only storing seed deltas rather than deep object clones."
        ],
        benchmarks: [
          { metric: "Max Nodes Visualized", baseline: "1,500 (DOM)", achieved: "100,000 (Canvas)", delta: "+6500%" },
          { metric: "GC Pause Duration", baseline: "42 ms", achieved: "0.2 ms", delta: "-99.5%" },
          { metric: "Frame Rate Stability", baseline: "28 FPS", achieved: "60 FPS", delta: "+114%" },
          { metric: "Step Recording Overhead", baseline: "340%", achieved: "4.8%", delta: "-98.5%" }
        ],
        tradeoffsAccepted: [
          "Steeper initial load size due to Wasm runtime initialization.",
          "Custom canvas rendering required writing bespoke hit-testing for node hover states."
        ],
        codeSnippet: {
          language: "c",
          filename: "graph_engine.c",
          code: `typedef struct {
    uint32_t node_id;
    uint32_t dist;
    uint8_t  visited_flag;
} __attribute__((packed)) CompactNode;

void dijkstra_step_record(Graph* g, uint32_t src, RingBuffer* stream) {
    // Zero allocation ring buffer recording for 60fps telemetry
    CompactNode snapshot = { .node_id = src, .dist = g->distances[src], .visited_flag = 1 };
    ring_buffer_push(stream, &snapshot, sizeof(CompactNode));
}`
        }
      }
    },
    {
      id: "pulse-drift",
      title: "PulseDrift",
      subtitle: "Local Data & Model Behavior Monitor",
      category: "MODEL MONITORING",
      metricBadge: "SUB-SECOND DRIFT DETECTION",
      hook: "Because shipping a model without an honest drift and error-slice monitor is just guessing with confidence.",
      summary: "A lightweight, local-first model telemetry and dataset drift diagnostic tool that flags covariate shift, subgroup performance drops, and data quality degradation without needing a heavy cloud infrastructure stack.",
      stack: ["Python", "Scikit-learn", "SQL", "FastAPI"],
      links: {
        demo: "https://demo.pulsedrift.example.com",
        github: "https://github.com/muzafferditspcs/pulse-drift",
        hasLabNote: true
      },
      overview: {
        keyHighlights: [
          "Kolmogorov-Smirnov and Population Stability Index (PSI) drift alarms calculated on local SQLite shards.",
          "Automated slice analysis identifies demographic or feature subgroups suffering severe recall drop.",
          "Zero external cloud dependencies: runs completely in local dev or edge environments."
        ],
        benchmarkMetric: "Surfaces silent subgroup degradation and feature drift in milliseconds on local datasets.",
        targetUser: "Data scientists and ML engineers deploying models to edge or local production environments.",
        operationalLatency: "Full dataset drift scan of 100,000 rows completed in 480ms."
      },
      architecture: {
        coreTradeoff: "Designed for lightweight local execution rather than heavy distributed clusters.",
        designDecisions: [
          "Vectorized statistical metrics via NumPy and Scikit-learn array operations.",
          "Polars / DuckDB local columnar engine for instant aggregations over parquet batches.",
          "Self-contained single-binary reporting output with embedded visual charts."
        ],
        bottleneckResolved: "Cloud vendor lock-in and high overhead for monitoring small-to-midsize ML deployments.",
        memoryModel: "Streaming chunk reader keeping memory consumption under 250MB."
      },
      labNote: {
        title: "Local-First Drift Diagnostics: Replacing Cloud Bloat with Vectorized Stats",
        slug: "pulse-drift-local-telemetry",
        readingTime: "4 min read",
        problemStatement: "Most production model monitoring platforms require multi-node Kubernetes clusters, Kafka message buses, and expensive SaaS subscriptions. For local builds and edge models, this overhead is fatal.",
        coreHypothesis: "Streaming vectorized statistical tests over sliding SQLite windows can match cloud-grade drift detection at 1/100th the resource cost.",
        keyInsights: [
          "Sliding window PSI with adaptive bins detects feature drift 3x faster than fixed-interval batch jobs.",
          "Subgroup slicing via decision tree residual carving pinpoints the exact failure boundaries automatically.",
          "Zero telemetry leaves the local machine, preserving complete data sovereignty."
        ],
        benchmarks: [
          { metric: "Startup Time", baseline: "120s (K8s pod)", achieved: "0.4s (local)", delta: "-99.6%" },
          { metric: "100k Row Scan Time", baseline: "4.8s", achieved: "0.48s", delta: "-90.0%" },
          { metric: "Memory Ceiling", baseline: "4 GB", achieved: "250 MB", delta: "-93.7%" },
          { metric: "Setup Friction", baseline: "14 CLI steps", achieved: "1 pip command", delta: "-92.8%" }
        ],
        tradeoffsAccepted: [
          "Does not scale to multi-terabyte distributed streaming logs without sharding.",
          "Optimized specifically for tabular, text embedding, and classification/regression outputs."
        ],
        codeSnippet: {
          language: "python",
          filename: "drift_detector.py",
          code: `def calculate_population_stability_index(baseline: np.ndarray, target: np.ndarray, bins: int = 10) -> float:
    """Vectorized PSI calculation with zero external cloud dependencies."""
    quantiles = np.linspace(0, 100, bins + 1)
    bin_edges = np.percentile(baseline, quantiles)
    bin_edges[0], bin_edges[-1] = -np.inf, np.inf
    
    b_counts = np.histogram(baseline, bins=bin_edges)[0] / len(baseline)
    t_counts = np.histogram(target, bins=bin_edges)[0] / len(target)
    
    # Smooth zero bins to prevent division errors
    b_counts = np.where(b_counts == 0, 1e-4, b_counts)
    t_counts = np.where(t_counts == 0, 1e-4, t_counts)
    
    return float(np.sum((t_counts - b_counts) * np.log(t_counts / b_counts)))`
        }
      }
    }
  ],

  skills: [
    {
      category: "Systems & Algorithms",
      badge: "CORE FOUNDATION",
      description: "Low-level discipline, pointer hygiene, memory management, and algorithmic rigour.",
      skills: [
        { name: "Java", level: "Advanced", context: "Object-oriented design patterns, concurrency, collection internals", tags: ["OOP", "Generics", "JVM"] },
        { name: "C", level: "Proficient", context: "Manual memory allocation, pointer arithmetic, bitwise systems programming", tags: ["Pointers", "Memory", "POSIX"] },
        { name: "Data Structures & Algorithms", level: "Advanced", context: "Graph traversals, dynamic programming, heap structures, amortized analysis", tags: ["O(log N)", "Trees", "Graphs"] },
        { name: "Object-Oriented Design", level: "Advanced", context: "SOLID principles, modular decoupling, extensible software architectures", tags: ["SOLID", "Design Patterns"] },
        { name: "Problem Solving", level: "Advanced", context: "Competitive programming, mathematical formulation, edge-case hardening", tags: ["LeetCode", "Invariants"] }
      ]
    },
    {
      category: "Data Science & AI",
      badge: "MACHINE INTELLIGENCE",
      description: "From statistical foundations and model training to evaluation harnesses and agent pipelines.",
      skills: [
        { name: "Python", level: "Advanced", context: "Idiomatic Python, vectorized computation, asynchronous networking", tags: ["NumPy", "AsyncIO", "Profiling"] },
        { name: "PyTorch", level: "Intermediate / Active", context: "Custom neural architectures, tensor autograd, fine-tuning workflows", tags: ["Tensors", "Training Loops", "CUDA"] },
        { name: "Scikit-learn", level: "Advanced", context: "Ensemble trees, dimensionality reduction, cross-validation pipelines", tags: ["Pipelines", "Metrics", "Drift"] },
        { name: "Hugging Face", level: "Proficient", context: "Transformer tokenizers, model weights fine-tuning, PEFT/LoRA", tags: ["Transformers", "LoRA", "Datasets"] },
        { name: "LLM Agents & RAG", level: "Proficient", context: "Dense retrieval, vector databases, deterministic citation verification", tags: ["Vector Search", "Evals", "Rerankers"] },
        { name: "Data Analysis", level: "Advanced", context: "Exploratory analysis, statistical hypothesis testing, feature importance", tags: ["Pandas", "Polars", "Hypothesis"] }
      ]
    },
    {
      category: "Web & Tooling",
      badge: "PRODUCTION DELIVERY",
      description: "Shipping fast APIs, reliable databases, clean user interfaces, and reproducible environments.",
      skills: [
        { name: "SQL", level: "Advanced", context: "Complex relational queries, indexing strategies, schema normalization", tags: ["PostgreSQL", "SQLite", "DuckDB"] },
        { name: "FastAPI", level: "Advanced", context: "High-throughput asynchronous endpoints, Pydantic validation schemas", tags: ["Async", "OpenAPI", "Microservices"] },
        { name: "Git", level: "Advanced", context: "Branching workflows, bisecting regression, atomic commit hygiene", tags: ["Version Control", "Rebase", "Bisect"] },
        { name: "Linux", level: "Proficient", context: "Shell scripting, process management, POSIX environments, performance diagnostics", tags: ["Bash", "Systemd", "Pipes"] },
        { name: "TypeScript / Next.js", level: "Proficient", context: "App router, type safety, server/client component boundaries", tags: ["React", "Tailwind", "Framer Motion"] }
      ]
    }
  ],

  principles: [
    {
      number: "01",
      title: "Memory & Cache Locality over Blind Abstractions",
      subtitle: "Why C & Java discipline informs neural tensor operations.",
      description: "High-level frameworks make it dangerously easy to ignore underlying hardware constraints. Understanding pointer indirection, cache lines, and contiguous memory in C is the exact same discipline that enables efficient tensor batching and eliminates GPU starvation.",
      quote: "\"If you cannot account for the memory footprint of your algorithm, you do not control its execution.\""
    },
    {
      number: "02",
      title: "Algorithmic Complexity over Raw Brute Force",
      subtitle: "Why an O(N log N) invariant beats expensive GPU clusters.",
      description: "Throwing oversized context windows and distributed clusters at messy data is an expensive substitute for proper indexing. Algorithmic pruning, heuristic search, and graph structuring solve retrieval and search bottlenecks with minimal compute and deterministic latency.",
      quote: "\"A clean mathematical guarantee always outlasts a brittle heuristic.\""
    },
    {
      number: "03",
      title: "Deterministic Guardrails over Black-Box Faith",
      subtitle: "Treating model outputs with rigorous verification.",
      description: "A machine learning model is an approximation engine. Shipping reliable AI means wrapping stochastic inference with strict deterministic harnesses: citation bounding, failure-slice clustering, and continuous drift monitoring.",
      quote: "\"Trust is built through verification harnesses, not optimistic prompt engineering.\""
    }
  ],

  tinkeringLog: [
    {
      status: "ACTIVE",
      tag: "SYSTEMS / DSA",
      timestamp: "Nov 2026",
      title: "Memory-Efficient Graph Traversals in C and Java",
      notes: "Benchmarking compact bit-packed adjacency matrices against pointer-heavy adjacency lists for graph searches up to 500,000 vertices.",
      targetOutcome: "Zero heap allocations inside the hot traversal loop."
    },
    {
      status: "ACTIVE",
      tag: "APPLIED AI",
      timestamp: "Nov 2026",
      title: "Small-Model Fine-Tuning & Quantization",
      notes: "Experimenting with 1.5B–3B parameter models using LoRA and 4-bit AWQ quantization for local code and algorithmic reasoning evaluation.",
      targetOutcome: "Preserve 92%+ reasoning accuracy on a local consumer laptop."
    },
    {
      status: "RECENT",
      tag: "EVAL PIPELINES",
      timestamp: "Oct 2026",
      title: "Deterministic Evaluation Pipelines for Agentic Workflows",
      notes: "Drafting a standalone evaluation harness that isolates hallucinated tool arguments before dispatching HTTP API requests.",
      targetOutcome: "Zero malformed schema calls during multi-step agent trajectories."
    }
  ],

  currentlyExploring: [
    "Algorithmic optimization in Java & C",
    "Small-model fine-tuning & local quantization",
    "Deterministic evaluation pipelines for AI agents"
  ]
};

// Export for ES modules and attach to window for classic scripts
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
