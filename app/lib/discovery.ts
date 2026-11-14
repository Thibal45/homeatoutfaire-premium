/** Ephemeral page interactions. No storage, request or automatic submission. */
export const DISCOVER_SERVICE_EVENT = "hatf:discover-service";
export const OPEN_PLANNER_EVENT = "hatf:open-planner";
export function discoverService(index: number) {
  window.dispatchEvent(
    new window.CustomEvent(DISCOVER_SERVICE_EVENT, { detail: index }),
  );
}
export function openPlanner(service?: string) {
  window.dispatchEvent(
    new window.CustomEvent(OPEN_PLANNER_EVENT, { detail: service }),
  );
}
