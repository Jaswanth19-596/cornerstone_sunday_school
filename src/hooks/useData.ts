import { useState, useCallback } from 'react';
import { events as defaultEvents, pastSermons as defaultResources } from '../data/mockData';
import type { Event, Sermon } from '../types';

const EVENTS_KEY = 'ss_events';
const RESOURCES_KEY = 'ss_resources';

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T[];
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Events ───────────────────────────────────────────────
export function useEvents() {
  const [events, setEvents] = useState<Event[]>(() =>
    loadFromStorage<Event>(EVENTS_KEY, defaultEvents)
  );

  const save = useCallback((updated: Event[]) => {
    setEvents(updated);
    saveToStorage(EVENTS_KEY, updated);
  }, []);

  const addEvent = useCallback(
    (event: Omit<Event, 'id'>) => {
      const newEvent: Event = { ...event, id: Date.now().toString() };
      save([...events, newEvent]);
    },
    [events, save]
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<Event>) => {
      save(events.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    },
    [events, save]
  );

  const deleteEvent = useCallback(
    (id: string) => {
      save(events.filter((e) => e.id !== id));
    },
    [events, save]
  );

  const resetEvents = useCallback(() => {
    localStorage.removeItem(EVENTS_KEY);
    setEvents(defaultEvents);
  }, []);

  return { events, addEvent, updateEvent, deleteEvent, resetEvents };
}

// ─── Resources (Sermons) ──────────────────────────────────
export function useResources() {
  const [resources, setResources] = useState<Sermon[]>(() =>
    loadFromStorage<Sermon>(RESOURCES_KEY, defaultResources)
  );

  const save = useCallback((updated: Sermon[]) => {
    setResources(updated);
    saveToStorage(RESOURCES_KEY, updated);
  }, []);

  const addResource = useCallback(
    (resource: Omit<Sermon, 'id'>) => {
      const newResource: Sermon = { ...resource, id: Date.now().toString() };
      save([...resources, newResource]);
    },
    [resources, save]
  );

  const updateResource = useCallback(
    (id: string, updates: Partial<Sermon>) => {
      save(resources.map((r) => (r.id === id ? { ...r, ...updates } : r)));
    },
    [resources, save]
  );

  const deleteResource = useCallback(
    (id: string) => {
      save(resources.filter((r) => r.id !== id));
    },
    [resources, save]
  );

  const resetResources = useCallback(() => {
    localStorage.removeItem(RESOURCES_KEY);
    setResources(defaultResources);
  }, []);

  return { resources, addResource, updateResource, deleteResource, resetResources };
}
