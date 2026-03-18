export default async (req) => {
  const body = await req.json().catch(() => ({}));
  const { action = 'triage', input = '', workItems = [], project = '' } = body;

  const now = new Date();

  if (action === 'triage') {
    // AI triage of a new work item
    const text = input.toLowerCase();
    const priority = text.includes('crash') || text.includes('down') || text.includes('critical') || text.includes('p0') ? 'urgent'
      : text.includes('bug') || text.includes('error') || text.includes('broken') || text.includes('fail') ? 'high'
      : text.includes('improve') || text.includes('enhance') || text.includes('slow') ? 'medium' : 'low';

    const type = text.includes('bug') || text.includes('crash') || text.includes('error') || text.includes('broken') ? 'bug'
      : text.includes('feature') || text.includes('add') || text.includes('new') || text.includes('implement') ? 'feature'
      : text.includes('improve') || text.includes('refactor') || text.includes('optimize') ? 'improvement'
      : text.includes('doc') || text.includes('readme') || text.includes('wiki') ? 'documentation' : 'task';

    const labels = [];
    if (text.includes('api') || text.includes('endpoint') || text.includes('rest')) labels.push('backend');
    if (text.includes('ui') || text.includes('frontend') || text.includes('css') || text.includes('design')) labels.push('frontend');
    if (text.includes('auth') || text.includes('login') || text.includes('permission')) labels.push('auth');
    if (text.includes('perf') || text.includes('slow') || text.includes('optimize')) labels.push('performance');
    if (text.includes('test') || text.includes('spec') || text.includes('coverage')) labels.push('testing');
    if (labels.length === 0) labels.push('needs-triage');

    const assignees = {
      bug: 'Sarah Chen',
      feature: 'Marcus Rodriguez',
      improvement: 'Priya Patel',
      documentation: 'James Wilson',
      task: 'Alex Kumar',
    };

    const summaries = {
      urgent: `🚨 Critical issue detected — immediate attention required. Assigning to on-call engineer with P0 escalation.`,
      high: `⚠️ High priority issue. Likely impacts user experience or core functionality. Recommend resolving in current cycle.`,
      medium: `📋 Medium priority item. Scheduled for next sprint. No immediate user impact detected.`,
      low: `💡 Low priority enhancement. Added to backlog. Can be picked up in any upcoming cycle.`,
    };

    return new Response(JSON.stringify({
      ok: true,
      action: 'triage',
      result: {
        title: input.substring(0, 80),
        type,
        priority,
        labels,
        assignee: assignees[type] || 'Alex Kumar',
        cycle: priority === 'urgent' || priority === 'high' ? 'Cycle 12 (Current)' : 'Cycle 13 (Next)',
        module: text.includes('auth') ? 'Authentication' : text.includes('api') ? 'API Layer' : text.includes('ui') ? 'UI Components' : 'Core Platform',
        estimate: priority === 'urgent' ? '2h' : priority === 'high' ? '4h' : priority === 'medium' ? '1d' : '2d',
        aiSummary: summaries[priority],
        confidence: 0.94,
        wikiLinks: [`${project || 'API'} Runbook`, 'Engineering Guidelines', 'Incident Response'],
        slackChannel: '#' + (priority === 'urgent' ? 'incidents' : 'engineering'),
        agentRun: `TRIAGE-${Date.now().toString(36).toUpperCase()}`,
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (action === 'summarize') {
    const total = workItems.length || 24;
    const done = Math.floor(total * 0.58);
    const inProgress = Math.floor(total * 0.21);
    const todo = total - done - inProgress;

    return new Response(JSON.stringify({
      ok: true,
      action: 'summarize',
      result: {
        summary: `${project || 'Project'} is progressing well. ${done}/${total} work items completed (${Math.round(done/total*100)}% done). ${inProgress} items actively in progress across 4 engineers. Top blockers: API rate limiting affecting 2 items, design review pending on 3 UI components. Cycle 12 on track to close by end of week.`,
        stats: { total, done, inProgress, todo, blockers: 2, onTrack: true },
        topContributors: ['Sarah Chen (8 items)', 'Marcus Rodriguez (6 items)', 'Priya Patel (5 items)'],
        riskyItems: ['AUTH-241: OAuth token refresh — no assignee', 'PERF-184: DB query optimization — blocked 3 days'],
        nextActions: ['Unblock AUTH-241 by EOD', 'Schedule design review for UI components', 'Close 3 in-progress items before cycle end'],
        generatedAt: now.toISOString(),
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (action === 'draft') {
    const drafts = {
      'bug': `**Bug Report: ${input.substring(0, 40)}**\n\n**Description**\n${input}\n\n**Steps to Reproduce**\n1. Navigate to the affected page\n2. Perform the action described\n3. Observe the unexpected behavior\n\n**Expected Behavior**\nThe system should handle this gracefully without errors.\n\n**Actual Behavior**\n${input}\n\n**Environment**\n- Browser: Chrome 122\n- OS: macOS 14\n- Version: 2.4.1\n\n**Priority**: High — impacts user workflow`,
      'feature': `**Feature Request: ${input.substring(0, 40)}**\n\n**Problem Statement**\n${input}\n\n**Proposed Solution**\nImplement a dedicated interface that allows users to ${input.toLowerCase()}.\n\n**Acceptance Criteria**\n- [ ] User can perform the action in < 3 clicks\n- [ ] Works across all supported browsers\n- [ ] Mobile responsive\n- [ ] Accessible (WCAG 2.1 AA)\n\n**Technical Notes**\nConsider caching strategy and API rate limits.\n\n**Priority**: Medium`,
      'default': `**Work Item: ${input.substring(0, 40)}**\n\n**Overview**\n${input}\n\n**Scope**\nThis item covers the implementation and testing of the described functionality.\n\n**Definition of Done**\n- [ ] Implementation complete\n- [ ] Unit tests written (>80% coverage)\n- [ ] Code reviewed and approved\n- [ ] Documentation updated\n- [ ] QA sign-off\n\n**Estimate**: 1-2 days`,
    };
    const type = input.toLowerCase().includes('bug') || input.toLowerCase().includes('error') ? 'bug'
      : input.toLowerCase().includes('feature') || input.toLowerCase().includes('add') ? 'feature' : 'default';

    return new Response(JSON.stringify({
      ok: true,
      action: 'draft',
      result: {
        draft: drafts[type],
        type,
        wordCount: drafts[type].split(' ').length,
        generatedAt: now.toISOString(),
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (action === 'agent_run') {
    // Simulate Plane AI agent executing on a work item
    const steps = [
      { step: 1, action: 'context_fetch', desc: 'Fetching work item context + related wiki pages', ms: 120 },
      { step: 2, action: 'duplicate_check', desc: `Scanned 847 existing work items — 0 duplicates found`, ms: 340 },
      { step: 3, action: 'priority_score', desc: `Scored priority: ${input.toLowerCase().includes('bug') ? 'High (0.89)' : 'Medium (0.67)'}`, ms: 89 },
      { step: 4, action: 'assignee_match', desc: 'Matched to best-fit engineer based on skills + workload', ms: 210 },
      { step: 5, action: 'cycle_placement', desc: 'Placed in Cycle 12 — 3 open slots available', ms: 67 },
      { step: 6, action: 'wiki_link', desc: 'Linked 2 relevant wiki pages from knowledge base', ms: 145 },
      { step: 7, action: 'notify', desc: 'Notified assignee via Slack · #engineering', ms: 98 },
    ];
    return new Response(JSON.stringify({ ok: true, action: 'agent_run', steps, totalMs: steps.reduce((s,x)=>s+x.ms,0), runId: `AR-${Date.now().toString(36).toUpperCase()}` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ ok: false, error: 'Unknown action' }), { status: 400 });
};
export const config = { path: '/api/ai' };
