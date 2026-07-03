// FAQ content — shared by the FAQ page (FAQPage JSON-LD for SEO) and the
// FaqSection client component (accordion UI). Keep questions/answers here so
// the structured data never drifts from what's rendered.

export const FAQ_CATEGORIES = [
  { id: "general", label: "General Info", icon: "info" },
  { id: "logistics", label: "Logistics & Equipment", icon: "laptop_mac" },
  { id: "curriculum", label: "Curriculum", icon: "menu_book" },
];

export const FAQ_GROUPS = [
  {
    id: "general",
    icon: "info",
    label: "General Info",
    items: [
      {
        q: "What are the age requirements for Camp2Code?",
        a: "Camp2Code is a co-ed program built for young people between the ages of 8 and 19. We meet each learner at their level, so both first-timers and budding builders have a track that fits.",
      },
      {
        q: "How much does the program cost?",
        a: "We believe in accessible education. The core Camp2Code foundational program is heavily subsidized for selected candidates, and specific financial details are shared with you during the application phase.",
      },
    ],
  },
  {
    id: "logistics",
    icon: "laptop_mac",
    label: "Logistics & Equipment",
    items: [
      {
        q: "Is the program online or in-person in Abuja?",
        a: "We run a hybrid model. Most intensive coding sessions and mentorship happen online, with regular in-person meetups and hackathons here in Abuja to build community and ship projects together.",
      },
      {
        q: "What is the expected time commitment?",
        a: "To get the most out of the program, plan to dedicate around 10–15 hours per week. This covers live sessions, self-paced learning, and weekly project assignments.",
      },
      {
        q: "What equipment do I need to get started?",
        a: "A laptop and a stable internet connection are all you need to begin. If access to equipment is a barrier, reach out — we work with families case by case to keep the program within reach.",
      },
    ],
  },
  {
    id: "curriculum",
    icon: "menu_book",
    label: "Curriculum",
    items: [
      {
        q: "Do I need prior coding experience to join?",
        a: "No prior experience is required. Our foundational track starts from first principles, while more experienced learners can move into specialized tracks faster.",
      },
      {
        q: "Which tracks can I choose from?",
        a: "You can grow across six focus areas — Web Engineering, Mobile, Game Dev, Product Design, Business, and People Development — designed to take you from tech consumer to tech creator.",
      },
      {
        q: "How do you stay in touch with learners and parents?",
        a: "Day-to-day coordination, updates, and mentor support all happen through dedicated Camp2Code WhatsApp groups, so learners and parents are always in the loop.",
      },
    ],
  },
];
