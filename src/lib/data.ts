export type AvailStatus = 'available' | 'limited' | 'unavailable'
export type CompanyType = 'gc' | 'sub' | 'both'

export interface Crew {
  id: string
  slug: string
  name: string
  type: CompanyType
  tagline: string
  bio: string
  city: string
  state: string
  zip: string
  radius_miles: number
  primary_trade: string
  trades: { name: string; verified: boolean; job_count: number }[]
  certifications: { name: string; issuer: string; expires?: string; verified: boolean }[]
  equipment: string[]
  availability: AvailStatus
  availability_note: string
  // Credentials
  licensed: boolean
  license_number?: string
  license_state?: string
  insured: boolean
  bonded: boolean
  sam_gov: boolean
  sam_gov_id?: string
  military_base_access: boolean
  years_experience: number
  employee_range: string
  // Scores
  clearscore: number
  review_count: number
  on_time_rate: number
  hire_again_rate: number
  // Reviews
  reviews: {
    id: string
    reviewer: string
    reviewer_trade: string
    relationship: string
    project: string
    value: string
    reliability: number
    quality: number
    communication: number
    timeline: 'yes' | 'partial' | 'no'
    scope: 'yes' | 'partial' | 'no'
    hire_again: 'yes' | 'maybe' | 'no'
    notes: string
    date: string
  }[]
}

export const CREWS: Crew[] = [
  {
    id: 'c-001', slug: 'rodriguez-masonry',
    name: 'Rodriguez Masonry & Concrete', type: 'sub',
    tagline: 'Concrete flatwork, foundations, and decorative finishes.',
    bio: 'Family-owned concrete and masonry operation serving the Tulsa metro since 2011. Crew of 8. We specialize in commercial flatwork, residential foundations, and stamped decorative finishes. All jobs include licensed foreman on-site.',
    city: 'Tulsa', state: 'OK', zip: '74105', radius_miles: 100,
    primary_trade: 'Concrete',
    trades: [
      { name: 'Concrete flatwork', verified: true, job_count: 34 },
      { name: 'Foundations', verified: true, job_count: 18 },
      { name: 'Decorative concrete', verified: true, job_count: 12 },
      { name: 'Retaining walls', verified: false, job_count: 0 },
      { name: 'Masonry', verified: false, job_count: 0 },
    ],
    certifications: [
      { name: 'OSHA-10', issuer: 'OSHA', expires: '2027-06-01', verified: true },
      { name: 'ACI Flatwork Finisher', issuer: 'ACI', expires: '2026-09-01', verified: true },
    ],
    equipment: ['Concrete mixer (6 cu yd)', 'Plate compactor', 'Bull float set', 'Transit mixer access', 'Trailer + pickup'],
    availability: 'available', availability_note: 'Booking jobs starting Apr 14. Crew of 3 available.',
    licensed: true, license_number: 'OK-CM-4421', license_state: 'OK',
    insured: true, bonded: true, sam_gov: false, military_base_access: false,
    years_experience: 13, employee_range: '6–15',
    clearscore: 91, review_count: 7, on_time_rate: 94, hire_again_rate: 86,
    reviews: [
      { id: 'r1', reviewer: 'Duncan Construction LLC', reviewer_trade: 'General contracting', relationship: 'GC hired sub', project: 'Driveway pour — 2,400 sqft', value: '$5k–$15k', reliability: 5, quality: 5, communication: 4, timeline: 'yes', scope: 'yes', hire_again: 'yes', notes: 'Crew showed up day one ready to work. Clean finish, no issues.', date: '2025-03-15' },
      { id: 'r2', reviewer: 'Apex Build Group', reviewer_trade: 'General contracting', relationship: 'GC hired sub', project: 'Foundation walls — new build', value: '$15k–$50k', reliability: 5, quality: 5, communication: 5, timeline: 'partial', scope: 'yes', hire_again: 'yes', notes: 'Weather caused one-day push but communicated ahead. Passed inspection first try.', date: '2025-01-20' },
      { id: 'r3', reviewer: 'Heritage Homes LLC', reviewer_trade: 'General contracting', relationship: 'GC hired sub', project: 'Stamped decorative patio', value: '$5k–$15k', reliability: 5, quality: 5, communication: 5, timeline: 'yes', scope: 'yes', hire_again: 'yes', notes: 'Very particular client. They nailed the pattern and cleaned up after.', date: '2024-11-08' },
    ],
  },
  {
    id: 'c-002', slug: 'apex-electrical',
    name: 'Apex Electrical Services', type: 'sub',
    tagline: 'Licensed electrical contractor for commercial GCs.',
    bio: 'Master electrician-led team specializing in commercial new construction rough-in, panel upgrades, and low-voltage integration. Licensed in OK and TX. Available for multi-site projects.',
    city: 'Oklahoma City', state: 'OK', zip: '73102', radius_miles: 150,
    primary_trade: 'Electrical',
    trades: [
      { name: 'Electrical rough-in', verified: true, job_count: 28 },
      { name: 'Panel upgrades', verified: true, job_count: 15 },
      { name: 'Low-voltage', verified: true, job_count: 9 },
      { name: 'Generator hookups', verified: false, job_count: 0 },
    ],
    certifications: [
      { name: 'Master Electrician License', issuer: 'Oklahoma CIB', expires: '2026-01-01', verified: true },
      { name: 'OSHA-30', issuer: 'OSHA', expires: '2026-03-01', verified: true },
    ],
    equipment: ['Service van (fully stocked)', 'Wire fish tape set', 'Conduit bender 1/2"–2"', 'Megger insulation tester'],
    availability: 'limited', availability_note: 'Finishing large commercial job. Available May 1.',
    licensed: true, license_number: 'OK-ELEC-7892', license_state: 'OK',
    insured: true, bonded: true, sam_gov: false, military_base_access: false,
    years_experience: 11, employee_range: '2–5',
    clearscore: 84, review_count: 5, on_time_rate: 88, hire_again_rate: 80,
    reviews: [
      { id: 'r4', reviewer: 'Midtown Development', reviewer_trade: 'General contracting', relationship: 'GC hired sub', project: 'Commercial rough-in — 18,000 sqft', value: '$15k–$50k', reliability: 4, quality: 5, communication: 4, timeline: 'yes', scope: 'yes', hire_again: 'yes', notes: 'Clean work, passed inspection first try. Highly recommended.', date: '2025-02-10' },
    ],
  },
  {
    id: 'c-003', slug: 'stillwater-av',
    name: 'Stillwater AV & Low Voltage', type: 'sub',
    tagline: 'AV integration and low-voltage for government and commercial.',
    bio: 'CTS-certified AV integrator and low-voltage specialist. SAM.gov registered. Experienced with federal facilities including Fort Sill. Commercial and government projects across OK, TX, and KS.',
    city: 'Stillwater', state: 'OK', zip: '73074', radius_miles: 300,
    primary_trade: 'AV / Low-voltage',
    trades: [
      { name: 'AV integration', verified: true, job_count: 21 },
      { name: 'Low-voltage cabling', verified: true, job_count: 19 },
      { name: 'Security systems', verified: false, job_count: 0 },
      { name: 'Digital signage', verified: true, job_count: 8 },
    ],
    certifications: [
      { name: 'CTS — Certified Technology Specialist', issuer: 'AVIXA', expires: '2026-05-01', verified: true },
      { name: 'SAM.gov Registered', issuer: 'US Federal Government', verified: true },
      { name: 'OSHA-10', issuer: 'OSHA', verified: true },
    ],
    equipment: ['Cable certifier (Fluke DSX)', 'Scissor lift access', 'Termination toolkit', 'Rack-mount tools'],
    availability: 'available', availability_note: 'Available immediately. Fort Sill experience — PIV-eligible crew.',
    licensed: true, license_number: 'OK-LV-3301', license_state: 'OK',
    insured: true, bonded: true, sam_gov: true, sam_gov_id: 'CAGE-8XY42', military_base_access: true,
    years_experience: 9, employee_range: '2–5',
    clearscore: 78, review_count: 4, on_time_rate: 91, hire_again_rate: 75,
    reviews: [
      { id: 'r5', reviewer: 'Bowhead Federal Services', reviewer_trade: 'Government contracting', relationship: 'GC hired sub', project: 'AV system — Fort Sill conference rooms', value: '$15k–$50k', reliability: 5, quality: 4, communication: 4, timeline: 'yes', scope: 'yes', hire_again: 'yes', notes: 'Cleared the base no problem. Good work, met spec.', date: '2025-04-02' },
    ],
  },
  {
    id: 'c-004', slug: 'heartland-hvac',
    name: 'Heartland HVAC Solutions', type: 'sub',
    tagline: 'Commercial and industrial HVAC for GCs across the Midwest.',
    bio: 'Full-service HVAC subcontractor for commercial construction. Specializing in rooftop package units, split systems, and VAV systems. EPA 608 certified. Available for multi-site roll-outs.',
    city: 'Wichita', state: 'KS', zip: '67202', radius_miles: 200,
    primary_trade: 'HVAC',
    trades: [
      { name: 'HVAC installation', verified: true, job_count: 41 },
      { name: 'VAV systems', verified: true, job_count: 17 },
      { name: 'Refrigeration', verified: false, job_count: 0 },
    ],
    certifications: [
      { name: 'EPA 608 Universal', issuer: 'EPA', verified: true },
      { name: 'NATE Certification', issuer: 'NATE', expires: '2026-08-01', verified: true },
      { name: 'OSHA-30', issuer: 'OSHA', verified: true },
    ],
    equipment: ['Refrigerant recovery machine', 'Manifold gauge set', 'Work van (2023)', 'Vacuum pump'],
    availability: 'available', availability_note: 'Taking new commercial bids now. Crew of 4.',
    licensed: true, license_number: 'KS-HVAC-5521', license_state: 'KS',
    insured: true, bonded: false, sam_gov: false, military_base_access: false,
    years_experience: 16, employee_range: '6–15',
    clearscore: 88, review_count: 9, on_time_rate: 90, hire_again_rate: 89,
    reviews: [
      { id: 'r6', reviewer: 'Meridian Commercial Build', reviewer_trade: 'General contracting', relationship: 'GC hired sub', project: 'RTU replacement — 12-unit strip mall', value: '$50k–$100k', reliability: 5, quality: 5, communication: 5, timeline: 'yes', scope: 'yes', hire_again: 'yes', notes: 'Outstanding crew. Completed 4 days ahead of schedule. Will use exclusively.', date: '2025-03-28' },
    ],
  },
  {
    id: 'c-005', slug: 'clearpath-it',
    name: 'ClearPath IT Services', type: 'sub',
    tagline: 'Structured cabling and IT infrastructure for commercial builds.',
    bio: 'Network infrastructure subcontractor specializing in structured cabling, server room buildouts, and wireless deployments. BICSI-certified. Work across commercial, healthcare, and government sectors.',
    city: 'Dallas', state: 'TX', zip: '75201', radius_miles: 250,
    primary_trade: 'IT / Networking',
    trades: [
      { name: 'Structured cabling', verified: true, job_count: 36 },
      { name: 'Server room buildout', verified: true, job_count: 14 },
      { name: 'Wireless deployment', verified: true, job_count: 22 },
      { name: 'Fiber termination', verified: true, job_count: 19 },
    ],
    certifications: [
      { name: 'BICSI RCDD', issuer: 'BICSI', expires: '2027-01-01', verified: true },
      { name: 'CompTIA Network+', issuer: 'CompTIA', verified: true },
      { name: 'SAM.gov Registered', issuer: 'US Federal Government', verified: true },
    ],
    equipment: ['Cable tester (Fluke DTX)', 'OTDR fiber tester', 'Termination tools', 'Cable management cart'],
    availability: 'available', availability_note: 'Active in DFW, Austin, San Antonio. Travel available.',
    licensed: true, license_number: 'TX-ALARM-8823', license_state: 'TX',
    insured: true, bonded: true, sam_gov: true, sam_gov_id: 'CAGE-7ZX19', military_base_access: true,
    years_experience: 14, employee_range: '6–15',
    clearscore: 93, review_count: 11, on_time_rate: 96, hire_again_rate: 91,
    reviews: [
      { id: 'r7', reviewer: 'DataCenter Build Group', reviewer_trade: 'General contracting', relationship: 'GC hired sub', project: 'Cat6A structured cabling — 40,000 sqft', value: 'Over $100k', reliability: 5, quality: 5, communication: 5, timeline: 'yes', scope: 'yes', hire_again: 'yes', notes: 'Best cabling crew we have used. Clean, organized, zero punch-list items.', date: '2025-04-01' },
    ],
  },
  {
    id: 'c-006', slug: 'lone-star-roofing',
    name: 'Lone Star Roofing Co.', type: 'sub',
    tagline: 'Commercial roofing for GCs across Texas and Oklahoma.',
    bio: 'Commercial and industrial roofing subcontractor. TPO, EPDM, and modified bitumen systems. Licensed roofer, fully insured, 18 years in business. Fast mobilization, warranty-backed work.',
    city: 'Fort Worth', state: 'TX', zip: '76102', radius_miles: 200,
    primary_trade: 'Roofing',
    trades: [
      { name: 'TPO roofing', verified: true, job_count: 48 },
      { name: 'EPDM systems', verified: true, job_count: 22 },
      { name: 'Modified bitumen', verified: true, job_count: 31 },
      { name: 'Metal roofing', verified: false, job_count: 0 },
    ],
    certifications: [
      { name: 'GAF Certified Contractor', issuer: 'GAF', expires: '2026-12-01', verified: true },
      { name: 'OSHA-30', issuer: 'OSHA', verified: true },
    ],
    equipment: ['Roofing hot air welder', 'Membrane roller', 'Safety harness system (crew of 6)', 'Service truck'],
    availability: 'limited', availability_note: 'Booking 3–4 weeks out. Worth the wait.',
    licensed: true, license_number: 'TX-ROOF-2241', license_state: 'TX',
    insured: true, bonded: true, sam_gov: false, military_base_access: false,
    years_experience: 18, employee_range: '16–50',
    clearscore: 87, review_count: 14, on_time_rate: 85, hire_again_rate: 86,
    reviews: [
      { id: 'r8', reviewer: 'Sunbelt Commercial', reviewer_trade: 'General contracting', relationship: 'GC hired sub', project: 'TPO reroof — warehouse 60,000 sqft', value: 'Over $100k', reliability: 4, quality: 5, communication: 4, timeline: 'partial', scope: 'yes', hire_again: 'yes', notes: 'Minor weather delay but quality of work was exceptional. Warranty paperwork clean.', date: '2025-02-18' },
    ],
  },
]

export const CURRENT_USER: Crew = CREWS[0]

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

export const ALL_TRADES = [
  'All trades',
  'AV / Low-voltage','Concrete','Drywall','Electrical','Flooring','Framing',
  'General contracting','HVAC','IT / Networking','Insulation','Landscaping',
  'Masonry','Painting','Plumbing','Restoration','Roofing','Security Systems',
  'Steel / Structural','Windows / Doors',
]

export function scoreColor(s: number) {
  if (s >= 80) return 'text-emerald-400'
  if (s >= 60) return 'text-amber-400'
  return 'text-red-400'
}
export function scoreBg(s: number) {
  if (s >= 80) return 'bg-emerald-500/10 text-emerald-400'
  if (s >= 60) return 'bg-amber-500/10 text-amber-400'
  return 'bg-red-500/10 text-red-400'
}
export function availDot(s: AvailStatus) {
  if (s === 'available') return 'bg-emerald-400'
  if (s === 'limited') return 'bg-amber-400'
  return 'bg-gray-500'
}
export function availLabel(s: AvailStatus) {
  if (s === 'available') return 'Available now'
  if (s === 'limited') return 'Limited availability'
  return 'Unavailable'
}
export function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}
