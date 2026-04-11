export const PAGES = {
  HOME: "/",
  CRUD: "/crud",
  GUESTBOOK: "/guestbook",
  ADMIN_GUESTBOOK: "/admin/guestbook",
} as const;

export const SECTION_IDS = {
  // Homepage sections
  HERO: "hero",
  TOP_TOPICS: "top-topics",
  OBSESSION: "obsession",
  PROJECTS: "projects",
  SIDE_PROJECTS: "side-projects",
  TESTAPP_PTSP: "testapp-ptsp",
  MONTHLY: "monthly",
  UNEXPECTED_QUESTION: "unexpected-question",
  SIGNATURE_STYLE: "signature-style",
  ACHIEVEMENTS: "achievements",

  // Special pages
  CRUD: "crud",
  GUESTBOOK: "guestbook",
  ADMIN_GUESTBOOK: "admin-guestbook",
} as const;

export type PageType = (typeof PAGES)[keyof typeof PAGES];
export type SectionIdType = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
