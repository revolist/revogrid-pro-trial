export function createTreeRows() {
  return [
    { id: 'platform', parentId: null, name: 'Platform launch', owner: 'Maya Chen', status: 'Active', budget: 180000 },
    { id: 'platform-api', parentId: 'platform', name: 'API contracts', owner: 'Noah Smith', status: 'Review', budget: 42000 },
    { id: 'platform-grid', parentId: 'platform', name: 'Grid workflows', owner: 'Eva Green', status: 'Active', budget: 68000 },
    { id: 'platform-qa', parentId: 'platform', name: 'Regression suite', owner: 'Liam Brown', status: 'Planned', budget: 25000 },
    { id: 'analytics', parentId: null, name: 'Analytics refresh', owner: 'Olivia Lee', status: 'Active', budget: 120000 },
    { id: 'analytics-pivot', parentId: 'analytics', name: 'Pivot presets', owner: 'Mia Wilson', status: 'Active', budget: 39000 },
    { id: 'analytics-export', parentId: 'analytics', name: 'Export review', owner: 'Ethan Davis', status: 'Blocked', budget: 18000 },
    { id: 'ops', parentId: null, name: 'Operations readiness', owner: 'Ava Martin', status: 'Planned', budget: 76000 },
    { id: 'ops-training', parentId: 'ops', name: 'Team training', owner: 'James Clark', status: 'Planned', budget: 14000 },
    { id: 'ops-runbook', parentId: 'ops', name: 'Runbook', owner: 'Sofia Hall', status: 'Review', budget: 9000 },
  ];
}
