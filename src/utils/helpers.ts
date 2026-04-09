export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatTime(timeString: string): string {
  return timeString;
}

export function getDaysUntilSunday(): number {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  return daysUntilSunday;
}

export function getNextSundayDate(): Date {
  const today = new Date();
  const daysUntilSunday = getDaysUntilSunday();
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  nextSunday.setHours(9, 0, 0, 0);
  return nextSunday;
}

export function getCountdownToSunday(): { days: number; hours: number; minutes: number } {
  const now = new Date();
  const nextSunday = getNextSundayDate();

  if (now.getDay() === 0 && now.getHours() >= 9 && now.getHours() < 11) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const diff = nextSunday.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    health: 'bg-red-100 text-red-800',
    family: 'bg-blue-100 text-blue-800',
    work: 'bg-yellow-100 text-yellow-800',
    gratitude: 'bg-green-100 text-green-800',
    guidance: 'bg-purple-100 text-purple-800',
    other: 'bg-gray-100 text-gray-800',
  };
  return colors[category] || colors.other;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    health: 'Health',
    family: 'Family',
    work: 'Work',
    gratitude: 'Gratitude',
    guidance: 'Guidance',
    other: 'Other',
  };
  return labels[category] || category;
}

export function getStatusBadge(status: string): { label: string; className: string } {
  const badges: Record<string, { label: string; className: string }> = {
    needed: {
      label: 'Needed',
      className: 'bg-terracotta-100 text-terracotta-800',
    },
    claimed: {
      label: 'Claimed',
      className: 'bg-sage-100 text-sage-800',
    },
    'extra-welcome': {
      label: 'Extra Welcome',
      className: 'bg-gold-100 text-gold-800',
    },
  };
  return badges[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
}

export function getEventTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'sunday-gathering': 'Sunday Gathering',
    social: 'Social Event',
    service: 'Service Project',
    special: 'Special Event',
  };
  return labels[type] || type;
}

export function getEventTypeColor(type: string): string {
  const colors: Record<string, string> = {
    'sunday-gathering': 'bg-sage-100 text-sage-800',
    social: 'bg-gold-100 text-gold-800',
    service: 'bg-terracotta-100 text-terracotta-800',
    special: 'bg-navy-100 text-navy-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
