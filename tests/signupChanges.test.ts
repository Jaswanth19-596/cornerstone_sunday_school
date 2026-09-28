import assert from 'node:assert/strict';
import { test } from 'node:test';
import { changedSignupIds, type StoredItem } from '../src/lib/signupChanges.ts';

const existing: StoredItem = { detail: '2 pots', kind: 'standard', name: 'Alice', ownerUid: 'alice', title: 'Coffee' };
const reordered: StoredItem = { name: 'Alice', title: 'Coffee', detail: '2 pots', kind: 'standard', ownerUid: 'alice' };
const friend: StoredItem = { name: 'Bob', title: 'Orange juice', detail: '1 gallon', kind: 'standard', ownerUid: 'bob' };

test('a friend can sign up without rewriting another person’s entry', () => {
  assert.notEqual(JSON.stringify(existing), JSON.stringify(reordered));
  assert.deepEqual(changedSignupIds({ coffee: existing }, { coffee: reordered, juice: friend }), ['juice']);
});

test('editing and canceling leave other people’s entries untouched', () => {
  const before = { coffee: existing, juice: friend };
  assert.deepEqual(changedSignupIds(before, { coffee: reordered, juice: { ...friend, name: 'Bob and family' } }), ['juice']);
  assert.deepEqual(changedSignupIds(before, { coffee: reordered }), ['juice']);
  assert.deepEqual(changedSignupIds(before, { coffee: reordered, juice: friend }), []);
});

test('custom items and all saved fields participate in change detection', () => {
  const custom: StoredItem = { ...friend, kind: 'custom', title: 'Muffins' };
  assert.deepEqual(changedSignupIds({ coffee: existing }, { coffee: reordered, custom }), ['custom']);
  for (const patch of [{ name: 'Carol' }, { title: 'Tea' }, { detail: '1 pot' }, { kind: 'custom' as const }, { ownerUid: 'carol' }]) {
    assert.deepEqual(changedSignupIds({ coffee: existing }, { coffee: { ...existing, ...patch } }), ['coffee']);
  }
});
