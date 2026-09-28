export interface StoredItem {
  name: string;
  title: string;
  detail: string;
  kind: 'standard' | 'custom';
  ownerUid: string;
}

export function changedSignupIds(before: Record<string, StoredItem>, after: Record<string, StoredItem>): string[] {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])].filter(id => {
    const previous = before[id], next = after[id];
    if (!previous || !next) return previous !== next;
    // Firestore may return fields in a different order than the form creates them.
    // Rewriting an unchanged entry owned by someone else rejects the entire batch.
    return previous.name !== next.name || previous.title !== next.title ||
      previous.detail !== next.detail || previous.kind !== next.kind || previous.ownerUid !== next.ownerUid;
  });
}
