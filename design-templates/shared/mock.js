/* 共享模拟数据：结构对齐 src/api/schemas.py 的 SessionResponse 与 selection_report.build_report_data */
(function () {
  const ev = (scope, stage_id, label, duration_ms, status = 'completed') => ({
    scope, stage_id, label, status, duration_ms,
  })

  const selectionReport = {
    decision: {
      status: 'recommend',
      status_label: '推荐',
      primary_candidate_id: 'c1',
      primary_candidate_name: '2.5D 硅中介层（CoWoS-S 类）',
      summary: '在 350W 功耗、4 颗 HBM3 的约束下，硅中介层方案的互连密度与热扩散路径最成熟，量产案例最多，综合得分领先。',
      confidence: 'medium',
      confidence_label: '中',
      evidence_coverage: 0.82,
      requires_human_review: false,
      rationale: [
        '硅中介层的微凸点间距可支撑 HBM3 全带宽互连，性能维度得分最高 [E1][E3]。',
        '大面积中介层带来的翘曲与成本问题可通过分块中介层与产能预定缓解 [E5]。',
        '有机 RDL 方案成本更低，但在 4 颗 HBM3 堆叠下信号完整性余量不足 [E2]。',
      ],
      prerequisites: ['提前 2–3 个季度锁定中介层产能', '完成 350W 下的封装级热仿真'],
      unresolved_items: ['硅桥方案在国内封测厂的量产良率缺少公开数据'],
    },
    requirements: {
      business_goal: '为 7nm AI 推理加速芯片选择先进封装方案',
      application_scenario: '数据中心推理加速卡，单卡 TDP≈350W',
      hard_constraints: ['集成 4 颗 HBM3', 'TDP ≈ 350W', '年产量 5 万片', '可在国内或台湾地区量产'],
      active_criteria: [
        { criterion_id: 'performance', label: '生产效率/性能', weight: 0.3 },
        { criterion_id: 'thermal', label: '散热与热管理', weight: 0.2 },
        { criterion_id: 'maturity', label: '量产成熟度', weight: 0.2 },
        { criterion_id: 'cost', label: '成本', weight: 0.15 },
        { criterion_id: 'risk', label: '风险', weight: 0.15 },
      ],
      inactive_criteria: [
        { criterion_id: 'power', label: '功耗与能效' },
        { criterion_id: 'scalability', label: '扩展性' },
      ],
    },
    candidates: [
      { candidate_id: 'c1', name: '2.5D 硅中介层', tag: 'CoWoS-S 类', summary: '整片硅中介层承载 SoC 与 HBM，TSV 垂直互连。', total: 4.21 },
      { candidate_id: 'c2', name: '有机 RDL 中介层', tag: 'CoWoS-R / InFO 类', summary: '以多层有机 RDL 替代硅中介层，成本与翘曲更优。', total: 3.46 },
      { candidate_id: 'c3', name: '嵌入式硅桥', tag: 'EMIB / CoWoS-L 类', summary: '局部硅桥连接相邻裸片，兼顾尺寸与成本。', total: 3.88 },
    ],
    comparison: [
      { criterion_id: 'performance', label: '生产效率/性能', weight: 0.3, cells: [
        { score: 4.8, confidence: '高', evidence_ids: ['E1', 'E3'], rationale: 'HBM3 全带宽，微凸点间距 ≤40μm' },
        { score: 3.4, confidence: '中', evidence_ids: ['E2'], rationale: '布线密度受限，4 颗 HBM 余量偏紧' },
        { score: 4.3, confidence: '中', evidence_ids: ['E4'], rationale: '桥接区域密度接近硅中介层' } ] },
      { criterion_id: 'thermal', label: '散热与热管理', weight: 0.2, cells: [
        { score: 4.2, confidence: '中', evidence_ids: ['E3'], rationale: '硅导热好，热点扩散均匀' },
        { score: 3.5, confidence: '中', evidence_ids: ['E2'], rationale: '有机层热阻更高' },
        { score: 3.9, confidence: '低', evidence_ids: [], rationale: '缺少 350W 级实测数据' } ] },
      { criterion_id: 'maturity', label: '量产成熟度', weight: 0.2, cells: [
        { score: 4.6, confidence: '高', evidence_ids: ['E1', 'E5'], rationale: '主流 AI 加速器大量采用' },
        { score: 3.8, confidence: '中', evidence_ids: ['E2'], rationale: '中端产品已量产' },
        { score: 3.1, confidence: '低', evidence_ids: ['E4'], rationale: '国内封测厂案例较少' } ] },
      { criterion_id: 'cost', label: '成本', weight: 0.15, cells: [
        { score: 2.9, confidence: '中', evidence_ids: ['E5'], rationale: '大尺寸中介层成本高' },
        { score: 4.4, confidence: '中', evidence_ids: ['E2'], rationale: '材料与工艺成本较低' },
        { score: 3.8, confidence: '低', evidence_ids: [], rationale: '硅桥局部使用，成本居中' } ] },
      { criterion_id: 'risk', label: '风险', weight: 0.15, cells: [
        { score: 3.6, confidence: '中', evidence_ids: ['E5'], rationale: '产能紧张是主要风险' },
        { score: 3.2, confidence: '中', evidence_ids: ['E2'], rationale: '信号完整性风险' },
        { score: 3.3, confidence: '低', evidence_ids: ['E4'], rationale: '供应链可得性不确定' } ] },
    ],
    risks: [
      { candidate_name: '2.5D 硅中介层', category: '供应链', severity: 'high', description: '中介层产能持续紧张，交付周期可能超过 2 个季度。', basis_label: '相关证据', evidence_ids: ['E5'] },
      { candidate_name: '2.5D 硅中介层', category: '可靠性', severity: 'medium', description: '大尺寸中介层翘曲可能影响 HBM 微凸点良率。', basis_label: '推断', evidence_ids: [] },
      { candidate_name: '嵌入式硅桥', category: '供应链', severity: 'medium', description: '国内可量产的封测厂选择有限。', basis_label: '待验证', evidence_ids: ['E4'] },
      { candidate_name: '有机 RDL 中介层', category: '失效', severity: 'low', description: '高频信号在长走线上的损耗需进一步验证。', basis_label: '相关证据', evidence_ids: ['E2'] },
    ],
    evidence_gaps: ['硅桥方案在国内封测厂的量产良率缺少公开数据', '有机 RDL 方案在 350W 下的热循环可靠性数据不足'],
    evidence: [
      { evidence_id: 'E1', source: 'vector', title: '先进封装技术路线综述 · 第 3 章', snippet: '硅中介层通过 TSV 与微凸点实现高密度互连，可支撑多颗 HBM 与逻辑裸片的并排集成……', criterion: '性能' },
      { evidence_id: 'E2', source: 'vector', title: '有机中介层与 RDL 工艺对比', snippet: '有机 RDL 线宽/线距通常在 2/2μm 量级，成本优势明显，但在超大带宽场景下布线资源受限……', criterion: '性能 / 成本' },
      { evidence_id: 'E3', source: 'graph', title: '知识图谱：HBM3 —[互连需求]→ 2.5D 集成', snippet: 'HBM3 单堆栈 1024 位宽接口，需要中介层提供短距离高密度布线。', criterion: '性能 / 散热' },
      { evidence_id: 'E4', source: 'graph', title: '知识图谱：硅桥嵌入 —[应用于]→ 多芯粒处理器', snippet: '硅桥仅在裸片边缘提供高密度互连，其余区域使用常规基板。', criterion: '成熟度' },
      { evidence_id: 'E5', source: 'web', title: '2026 年先进封装产能观察', snippet: '面向 AI 加速器的 2.5D 封装产能仍偏紧，主要厂商持续扩产……', criterion: '成本 / 风险' },
    ],
    audit: { review_label: '审查通过', evidence_round: 2, review_round: 1, warnings: ['1 项评分置信度为低，建议补充实测数据'] },
  }

  const ragAnswer = [
    { type: 'p', text: 'EUV 光刻的**随机缺陷**源于曝光与显影过程中的离散统计涨落，在特征尺寸逼近 20nm 以下时尤为显著，主要有三个来源：' },
    { type: 'ul', items: [
      '**光子散粒噪声**：EUV 光子能量约 92 eV，同等剂量下光子数远少于 DUV，局部剂量涨落直接导致线宽粗糙与孔洞缺失 [1]。',
      '**光刻胶化学随机性**：光酸产生剂分布、酸扩散与淬灭反应的离散性会放大局部差异 [2]。',
      '**二次电子作用范围**：光电子与二次电子的散射距离不确定，造成边缘模糊 [3]。',
    ] },
    { type: 'p', text: '常见缓解手段包括：提高曝光剂量（以吞吐量为代价）、采用金属氧化物光刻胶提高吸收率、引入高数值孔径 EUV 以改善成像对比度，以及结合工艺窗口优化与刻蚀修正 [1][4]。' },
  ]

  const ragSources = [
    { id: 1, source: 'vector', title: 'EUV 光刻原理与工艺挑战.pdf', locator: '第 12 页', score: 0.91, snippet: '在相同剂量下，EUV 光子数约为 ArF 的 1/14，光子散粒噪声成为随机缺陷的主导因素……' },
    { id: 2, source: 'vector', title: '光刻胶材料进展综述', locator: '§4.2', score: 0.86, snippet: '化学放大胶中酸扩散长度与随机缺陷率呈强相关……' },
    { id: 3, source: 'graph', title: '知识图谱：二次电子 —[导致]→ 线边缘粗糙度', locator: '2 跳关系', score: 0.79, snippet: '二次电子平均散射距离约数纳米，影响图形边缘定义。' },
    { id: 4, source: 'web', title: 'High-NA EUV 量产进展报道', locator: 'Tavily', score: 0.72, snippet: '高数值孔径 EUV 将分辨率提升至约 8nm 半节距……' },
  ]

  const sessions = [
    {
      thread_id: 's-sel-01', title: '先进封装方案选型 · AI 加速卡', updated: '10 分钟前',
      status: 'completed', query_type: 'technology_selection', response_type: 'report',
      query: '我们要为一款 7nm AI 推理加速芯片选择先进封装方案，单卡功耗约 350W，需要集成 4 颗 HBM3，年产量 5 万片，帮我做技术选型。',
      clarification_history: [
        { q: '是否有封装供应商或量产地域方面的限制？', a: '优先考虑可在国内或台湾地区量产的方案。' },
        { q: '性能、成本、量产成熟度中，哪一项优先级最高？', a: '性能优先，成本控制在中等即可。' },
      ],
      answer: '已完成技术选型评估，推荐 **2.5D 硅中介层（CoWoS-S 类）** 作为首选方案，置信度中。完整报告包含 3 个候选方案的加权对比、4 项风险与 5 条证据。',
      report_data: selectionReport,
      reports: [
        { report_id: 'r-02', title: '先进封装方案选型报告 v2', created_at: '10:42', format: 'docx' },
        { report_id: 'r-01', title: '先进封装方案选型报告 v1', created_at: '10:31', format: 'markdown' },
      ],
      warnings: ['1 项评分置信度为低，建议补充实测数据'],
      progress: [
        ev('router', 'prepare_short_term_memory', '准备短期记忆', 120),
        ev('router', 'classify_query', '识别请求类型', 860),
        ev('router', 'recall_memory', '召回长期记忆', 410),
        ev('selection', 'parse_requirements', '解析选型需求', 1820),
        ev('selection', 'generate_candidates', '生成候选方案', 2410),
        ev('selection', 'screen_hard_constraints', '筛选硬约束', 940),
        ev('selection', 'plan_evidence_tasks', '规划证据任务', 1130),
        ev('selection', 'retrieve_evidence', '检索并评估证据 · 第 1 轮', 6240),
        ev('selection', 'optimize_evidence_queries', '生成定向补检任务', 1310),
        ev('selection', 'retrieve_evidence', '检索并评估证据 · 第 2 轮', 4980),
        ev('selection', 'evaluate_candidates', '计算候选评分', 2870),
        ev('selection', 'analyze_risks', '分析方案风险', 2140),
        ev('selection', 'generate_recommendation', '生成推荐结论', 2650),
        ev('selection', 'review_recommendation', '审查推荐结论', 1720),
        ev('selection', 'generate_report', '生成技术选型报告', 1460),
        ev('router', 'build_query_response', '整理统一响应', 90),
        ev('router', 'persist_memory_candidates', '持久化记忆候选', 330),
      ],
    },
    {
      thread_id: 's-rag-01', title: 'EUV 随机缺陷的来源', updated: '35 分钟前',
      status: 'completed', query_type: 'rag_qa', response_type: 'answer',
      query: 'EUV 光刻中的随机缺陷（stochastic defects）主要来源是什么？有哪些缓解手段？',
      answer_blocks: ragAnswer, sources: ragSources, warnings: [],
      progress: [
        ev('router', 'prepare_short_term_memory', '准备短期记忆', 110),
        ev('router', 'classify_query', '识别请求类型', 720),
        ev('router', 'recall_memory', '召回长期记忆', 380),
        ev('rag', 'analyze_question', '分析问题', 1240),
        ev('rag', 'vector_retrieve', '向量检索', 640),
        ev('rag', 'graph_retrieve', '图谱检索', 910),
        ev('rag', 'merge_retrieval_results', '融合检索结果', 40),
        ev('rag', 'grade_documents', '筛选相关证据', 1580),
        ev('rag', 'transform_query', '改写查询', 980),
        ev('rag', 'vector_retrieve', '向量检索', 590),
        ev('rag', 'graph_retrieve', '图谱检索', 870),
        ev('rag', 'grade_documents', '筛选相关证据', 1430),
        ev('rag', 'web_search', '联网检索', 2310),
        ev('rag', 'generate', '生成回答', 3620),
        ev('rag', 'assess_generation', '评估回答质量', 1190),
        ev('router', 'build_query_response', '整理统一响应', 80),
      ],
    },
    {
      thread_id: 's-sel-02', title: 'CMP 后清洗设备选型', updated: '1 小时前',
      status: 'awaiting_user', query_type: 'technology_selection', response_type: 'answer',
      query: '帮我选一款适合 12 寸产线的 CMP 后清洗设备。',
      answer: '为了给出可审计的选型结论，还需要确认以下信息：',
      clarification_questions: [
        '主要清洗对象是铜互连层、钨插塞还是浅沟槽隔离（STI）层？',
        '目标产能大约是多少片/小时？是否需要与现有 CMP 机台直连？',
        '对颗粒残留与金属污染的指标要求是多少（如 ≥45nm 颗粒数）？',
      ],
      progress: [
        ev('router', 'classify_query', '识别请求类型', 690),
        ev('selection', 'parse_requirements', '解析选型需求', 1540),
        ev('selection', 'clarify_requirements', '生成需求澄清问题', 1320, 'paused'),
      ],
    },
    {
      thread_id: 's-rag-02', title: 'GAA 与 FinFET 漏电对比', updated: '刚刚',
      status: 'running', query_type: 'rag_qa', response_type: null,
      query: '对比 GAA 与 FinFET 在 3nm 节点的漏电控制能力。',
      progress: [
        ev('router', 'prepare_short_term_memory', '准备短期记忆', 100),
        ev('router', 'classify_query', '识别请求类型', 780),
        ev('router', 'recall_memory', '召回长期记忆', 360),
        ev('rag', 'analyze_question', '分析问题', 1180),
        ev('rag', 'vector_retrieve', '向量检索', 610),
        ev('rag', 'graph_retrieve', '图谱检索', null, 'running'),
      ],
    },
    {
      thread_id: 's-dir-01', title: '你能帮我做什么？', updated: '昨天',
      status: 'completed', query_type: 'direct_response', response_type: 'answer',
      query: '你能帮我做什么？',
      answer: '我是面向半导体领域的技术助手，可以：\n1）回答工艺、器件、材料、封装等技术问题，并给出知识库与联网来源；\n2）做技术选型：解析需求、生成候选、按证据评分并输出可下载的选型报告。',
      progress: [ev('router', 'classify_query', '识别请求类型', 640), ev('router', 'respond_directly', '生成直接响应', 980)],
    },
  ]

  const graph = {
    router: [
      ['prepare_short_term_memory', '准备短期记忆'], ['classify_query', '识别请求类型'], ['recall_memory', '召回长期记忆'],
      ['invoke', '执行子工作流'], ['build_query_response', '整理统一响应'], ['persist_memory_candidates', '持久化记忆'],
    ],
    rag: [
      ['analyze_question', '分析问题'], ['vector_retrieve', '向量检索'], ['graph_retrieve', '图谱检索'],
      ['merge_retrieval_results', '融合结果'], ['grade_documents', '证据筛选'], ['transform_query', '改写查询'],
      ['web_search', '联网检索'], ['generate', '生成回答'], ['assess_generation', '质量评估'],
    ],
    selection: [
      ['parse_requirements', '解析需求'], ['clarify_requirements', '需求澄清'], ['generate_candidates', '生成候选'],
      ['screen_hard_constraints', '硬约束筛选'], ['plan_evidence_tasks', '规划证据'], ['retrieve_evidence', '检索证据'],
      ['optimize_evidence_queries', '定向补检'], ['evaluate_candidates', '候选评分'], ['analyze_risks', '风险分析'],
      ['generate_recommendation', '推荐结论'], ['review_recommendation', '审查推荐'], ['generate_report', '生成报告'],
    ],
  }

  const STATUS = {
    running: { label: '运行中', tone: 'info' },
    completed: { label: '已完成', tone: 'ok' },
    awaiting_user: { label: '待补充', tone: 'warn' },
    needs_human_review: { label: '待人工审核', tone: 'warn' },
    cancelled: { label: '已取消', tone: 'mute' },
    error: { label: '出错', tone: 'err' },
  }
  const TYPE = {
    rag_qa: { label: '知识问答', short: '问答' },
    technology_selection: { label: '技术选型', short: '选型' },
    direct_response: { label: '直接回复', short: '对话' },
  }
  const SOURCE = { vector: '向量库', graph: '知识图谱', web: '联网' }

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
  const inline = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(E?\d+)\]/g, '<sup class="cite" data-ref="$1">$1</sup>')
    .replace(/\n/g, '<br>')
  const blocks = (list) => (list || []).map((b) => b.type === 'ul'
    ? `<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`
    : `<p>${inline(b.text)}</p>`).join('')
  const ms = (v) => v == null ? '…' : v >= 1000 ? (v / 1000).toFixed(1) + 's' : v + 'ms'
  const totalMs = (s) => (s.progress || []).reduce((a, e) => a + (e.duration_ms || 0), 0)
  const pct = (v) => Math.round(v * 100) + '%'

  window.MOCK = {
    project: { project_id: 'project-wafer-01', name: '晶圆智选 · 研发一部', user_id: 'user-001', api: 'http://127.0.0.1:8000' },
    sessions, graph, STATUS, TYPE, SOURCE,
    util: { esc, inline, blocks, ms, totalMs, pct },
  }
})()
