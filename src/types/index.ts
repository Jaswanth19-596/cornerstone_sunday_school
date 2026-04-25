export interface Member {
  id: string;
  name: string;
  photo: string;
  bio: string;
  role?: string;
  joinedDate: string;
  isActive: boolean;
}

export interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  submittedBy: string;
  date: string;
  category: 'health' | 'family' | 'work' | 'gratitude' | 'guidance' | 'other';
  prayerCount: number;
  isPrivate: boolean;
}

export interface BreakfastItem {
  id: string;
  name: string;
  category: 'food' | 'drink' | 'supplies';
  status: 'needed' | 'claimed' | 'extra-welcome';
  claimedBy?: string;
  quantity?: string;
}

export interface Song {
  id: string;
  title: string;
  artist?: string;
  lyricsUrl?: string;
  audioUrl?: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  scriptureText?: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  handoutUrl?: string;
  series?: string;
}

export interface WeeklyPlan {
  id: string;
  date: string;
  breakfastMenu: {
    main: string;
    sides: string[];
    drinks: string[];
  };
  songs: Song[];
  sermon: Sermon;
  questionOfWeek: string;
  location: string;
  startTime: string;
  endTime: string;
}

export interface Participant {
  email: string;
  invitedAt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  description: string;
  type: 'sunday-gathering' | 'social' | 'service' | 'special';
  image?: string;
  rsvpLink?: string;
  participants?: Participant[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  photo?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface NotificationPreference {
  id: string;
  email: string;
  phone?: string;
  preferences: {
    weeklyReminder: boolean;
    prayerRequests: boolean;
    eventUpdates: boolean;
    emergencyAlerts: boolean;
  };
}

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};
