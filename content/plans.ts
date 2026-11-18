// Mowing plans. Prices per visit live in content/prices.ts.
import { SLUG } from './prices.ts';

export interface Plan {
  /** Stable, URL-safe ID. Also the price column: 'weekly' or 'fortnightly'. */
  id: 'weekly' | 'fortnightly';
  /** Display name. */
  name: string;
  /** How often the crew visits. */
  frequency: 'weekly' | 'fortnightly';
  /** One-sentence description. */
  summary: string;
  /** Which lawns and people the plan suits. */
  bestFor: string;
  /** What every visit on this plan includes. */
  includes: string[];
  /** Seasonal rule, shown beside the plan. */
  seasonNote: string;
  /** Months (1–12) when this plan visits less often; drawn faded on the plan calendar. */
  quietMonths: number[];
}

const everyVisit = ['Mow', 'Edge', 'Whipper-snip', 'Blow paths and driveway', 'Clippings taken away', 'Your stripe pattern'];

export const plans: Plan[] = [
  {
    id: 'weekly', name: 'Weekly stripes', frequency: 'weekly',
    summary: 'Same crew, same day, every week. The stripes never get a chance to fade.',
    bestFor: 'Couch and kikuyu lawns in the growing season, and anyone who wants the stripes always sharp',
    includes: everyVisit,
    seasonNote: 'June–August visits drop to fortnightly and are charged at the fortnightly rate',
    quietMonths: [6, 7, 8],
  },
  {
    id: 'fortnightly', name: 'Fortnightly stripes', frequency: 'fortnightly',
    summary: 'A visit every second week on your suburb’s round day.',
    bestFor: 'Slower-growing buffalo and fescue lawns, and smaller budgets',
    includes: everyVisit,
    seasonNote: 'Same rhythm all year',
    quietMonths: [],
  },
];

export function validatePlans(list: readonly Plan[]): void {
  const ids = new Set<string>();
  for (const plan of list) {
    const at = `plans.ts: plan "${plan.id}"`;
    if (!SLUG.test(plan.id)) throw new Error(`${at}: id must be URL-safe`);
    if (ids.has(plan.id)) throw new Error(`${at}: duplicate id`);
    ids.add(plan.id);
    for (const field of ['name', 'summary', 'bestFor', 'seasonNote'] as const) {
      if (!plan[field].trim()) throw new Error(`${at}: ${field} is required`);
    }
    if (!plan.includes.length || plan.includes.some(item => !item.trim())) throw new Error(`${at}: includes needs at least one non-empty item`);
    if (plan.quietMonths.some(month => !Number.isInteger(month) || month < 1 || month > 12)) throw new Error(`${at}: quietMonths must be 1–12`);
  }
}

validatePlans(plans);
