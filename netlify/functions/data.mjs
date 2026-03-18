export default async (req) => {
  const body = await req.json().catch(() => ({}));
  const { action = 'projects' } = body;

  if (action === 'projects') {
    return new Response(JSON.stringify({
      ok: true,
      workspace: 'Acme Corp',
      projects: [
        { id: 'p1', name: 'API Platform v3', identifier: 'API', emoji: '🚀', members: 6, total: 84, done: 51, inProgress: 18, todo: 15, priority: 'high', cycle: 'Cycle 12', lead: 'Sarah Chen', health: 'on_track' },
        { id: 'p2', name: 'Mobile App 2.0', identifier: 'MOB', emoji: '📱', members: 4, total: 62, done: 29, inProgress: 14, todo: 19, priority: 'high', cycle: 'Cycle 12', lead: 'Marcus Rodriguez', health: 'at_risk' },
        { id: 'p3', name: 'Design System', identifier: 'DS', emoji: '🎨', members: 3, total: 41, done: 38, inProgress: 2, todo: 1, priority: 'medium', cycle: 'Cycle 11', lead: 'Priya Patel', health: 'on_track' },
        { id: 'p4', name: 'Data Pipeline', identifier: 'DATA', emoji: '⚡', members: 5, total: 33, done: 12, inProgress: 8, todo: 13, priority: 'medium', cycle: 'Cycle 13', lead: 'James Wilson', health: 'off_track' },
      ],
      initiatives: [
        { name: 'Q2 2025 — Platform Scaling', projects: ['API Platform v3', 'Data Pipeline'], progress: 67 },
        { name: 'Q2 2025 — Mobile Relaunch', projects: ['Mobile App 2.0', 'Design System'], progress: 52 },
      ],
      cycles: [
        { id: 'c11', name: 'Cycle 11', status: 'completed', start: '2025-02-17', end: '2025-03-02', completed: 47, total: 47 },
        { id: 'c12', name: 'Cycle 12', status: 'active', start: '2025-03-03', end: '2025-03-16', completed: 31, total: 48 },
        { id: 'c13', name: 'Cycle 13', status: 'upcoming', start: '2025-03-17', end: '2025-03-30', completed: 0, total: 0 },
      ],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (action === 'work_items') {
    const { projectId = 'p1', view = 'board' } = body;
    const items = [
      { id: 'API-241', title: 'OAuth token refresh fails after 24h timeout', type: 'bug', priority: 'urgent', state: 'in_progress', assignee: 'Sarah Chen', labels: ['auth', 'backend'], estimate: '4h', cycle: 'Cycle 12', module: 'Authentication', created: '2025-03-14', comments: 8, agentAssigned: true },
      { id: 'API-240', title: 'Add rate limiting to public endpoints', type: 'feature', priority: 'high', state: 'in_progress', assignee: 'Marcus Rodriguez', labels: ['backend', 'security'], estimate: '1d', cycle: 'Cycle 12', module: 'API Layer', created: '2025-03-13', comments: 4, agentAssigned: false },
      { id: 'API-239', title: 'Optimize N+1 queries in /projects endpoint', type: 'improvement', priority: 'high', state: 'in_progress', assignee: 'James Wilson', labels: ['performance', 'backend'], estimate: '6h', cycle: 'Cycle 12', module: 'Core Platform', created: '2025-03-12', comments: 2, agentAssigned: true },
      { id: 'API-238', title: 'Update OpenAPI spec to v3.1', type: 'task', priority: 'medium', state: 'todo', assignee: 'Priya Patel', labels: ['documentation'], estimate: '3h', cycle: 'Cycle 12', module: 'API Layer', created: '2025-03-11', comments: 1, agentAssigned: false },
      { id: 'API-237', title: 'WebSocket connection drops on mobile', type: 'bug', priority: 'high', state: 'todo', assignee: 'Sarah Chen', labels: ['backend', 'mobile'], estimate: '1d', cycle: 'Cycle 12', module: 'Core Platform', created: '2025-03-11', comments: 6, agentAssigned: false },
      { id: 'API-236', title: 'Add cursor-based pagination', type: 'feature', priority: 'medium', state: 'todo', assignee: 'Alex Kumar', labels: ['backend'], estimate: '2d', cycle: 'Cycle 13', module: 'API Layer', created: '2025-03-10', comments: 3, agentAssigned: false },
      { id: 'API-235', title: 'Implement request deduplication', type: 'feature', priority: 'medium', state: 'done', assignee: 'Marcus Rodriguez', labels: ['backend', 'performance'], estimate: '1d', cycle: 'Cycle 12', module: 'API Layer', created: '2025-03-08', comments: 9, agentAssigned: true },
      { id: 'API-234', title: 'Fix memory leak in worker process', type: 'bug', priority: 'urgent', state: 'done', assignee: 'Sarah Chen', labels: ['backend', 'performance'], estimate: '3h', cycle: 'Cycle 12', module: 'Core Platform', created: '2025-03-07', comments: 14, agentAssigned: false },
    ];
    return new Response(JSON.stringify({ ok: true, items, total: items.length }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (action === 'wiki') {
    return new Response(JSON.stringify({
      ok: true,
      pages: [
        { id: 'w1', title: 'Engineering Guidelines', icon: '📐', lastEdited: '2h ago', author: 'Sarah Chen', views: 284, category: 'Engineering', children: ['Code Review Process', 'Git Branching Strategy', 'CI/CD Pipeline'] },
        { id: 'w2', title: 'API Runbook', icon: '📡', lastEdited: '1d ago', author: 'James Wilson', views: 412, category: 'Engineering', children: ['Authentication', 'Rate Limiting', 'Error Codes'] },
        { id: 'w3', title: 'Incident Response', icon: '🚨', lastEdited: '3d ago', author: 'Marcus Rodriguez', views: 187, category: 'Operations', children: ['P0 Protocol', 'Escalation Matrix', 'Post-Mortems'] },
        { id: 'w4', title: 'Product Roadmap Q2 2025', icon: '🗺', lastEdited: '4h ago', author: 'Priya Patel', views: 621, category: 'Product', children: ['API Platform v3', 'Mobile 2.0', 'Design System'] },
        { id: 'w5', title: 'Onboarding Guide', icon: '👋', lastEdited: '1w ago', author: 'Alex Kumar', views: 93, category: 'HR', children: ['Day 1 Setup', 'Team Intro', 'Tools & Access'] },
        { id: 'w6', title: 'Architecture Overview', icon: '🏗', lastEdited: '2d ago', author: 'Sarah Chen', views: 348, category: 'Engineering', children: ['System Design', 'Data Flow', 'Infrastructure'] },
      ],
      recentlyEdited: ['Product Roadmap Q2 2025', 'Engineering Guidelines', 'API Runbook'],
      aiGenerated: ['Incident Response · Auto-updated after last P0', 'API Runbook · Rate Limiting section AI-drafted'],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (action === 'desk') {
    return new Response(JSON.stringify({
      ok: true,
      tickets: [
        { id: 'DSK-089', title: 'Cannot export project data to CSV', customer: 'TechCorp Inc', email: 'ops@techcorp.com', priority: 'high', status: 'open', assignee: 'Sarah Chen', workItem: 'API-242', created: '2h ago', tags: ['export', 'data'] },
        { id: 'DSK-088', title: 'OAuth login broken for GSuite users', customer: 'Acme Solutions', email: 'admin@acmesolutions.io', priority: 'urgent', status: 'in_progress', assignee: 'Marcus Rodriguez', workItem: 'API-241', created: '4h ago', tags: ['auth', 'oauth'] },
        { id: 'DSK-087', title: 'Webhook notifications not firing', customer: 'StartupXYZ', email: 'dev@startupxyz.com', priority: 'high', status: 'in_progress', assignee: 'James Wilson', workItem: 'API-243', created: '6h ago', tags: ['webhooks', 'backend'] },
        { id: 'DSK-086', title: 'API rate limit too aggressive for enterprise plan', customer: 'Global Enterprises', email: 'cto@globalent.com', priority: 'medium', status: 'open', assignee: null, workItem: null, created: '1d ago', tags: ['rate-limit', 'enterprise'] },
        { id: 'DSK-085', title: 'Mobile app crashes on iOS 17.4', customer: 'RetailChain Co', email: 'tech@retailchain.com', priority: 'urgent', status: 'resolved', assignee: 'Priya Patel', workItem: 'MOB-128', created: '2d ago', tags: ['mobile', 'crash'] },
        { id: 'DSK-084', title: 'Bulk import fails for >500 items', customer: 'DataHeavy Corp', email: 'eng@dataheavy.io', priority: 'medium', status: 'resolved', assignee: 'Alex Kumar', workItem: 'API-238', created: '3d ago', tags: ['import', 'performance'] },
      ],
      stats: { open: 2, inProgress: 2, resolved: 2, avgResolutionHours: 8.4, csat: 4.7 },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ ok: false }), { status: 400 });
};
export const config = { path: '/api/data' };
