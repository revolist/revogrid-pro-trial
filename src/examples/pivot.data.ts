export function createPivotRows() {
  const rows = [];
  const regions = ['North', 'South', 'West'];
  const categories = ['Hardware', 'Services', 'Subscriptions'];
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  for (const [regionIndex, region] of regions.entries()) {
    for (const [categoryIndex, category] of categories.entries()) {
      for (const [quarterIndex, quarter] of quarters.entries()) {
        rows.push({
          region,
          category,
          quarter,
          revenue: 52000 + regionIndex * 12000 + categoryIndex * 8500 + quarterIndex * 6200,
          orders: 140 + regionIndex * 18 + categoryIndex * 24 + quarterIndex * 11,
          margin: 24 + regionIndex * 3 + categoryIndex * 2 + quarterIndex,
        });
      }
    }
  }

  return rows;
}
