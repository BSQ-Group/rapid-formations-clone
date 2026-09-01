# SEO Parity Audit — rapid-formations-clone vs www.rapidformations.co.uk

> Generated from `reports/seo-audit/seo-data.json` by `scripts/seo-audit/build-audit.ts`.
> Harvest stamp: `2026-08-28T18:26:05+01:00`. Clone: https://rapid-formations-clone.vercel.app · Legacy: https://www.rapidformations.co.uk

Pages compared: **65** mapped pairs · legacy-only (content gap): **0** · clone-extra: **13** · preview: **45**.
Pairing is by last path-segment slug (clone serves flat slugs, legacy nests).

## Parity scorecard (65 mapped pages)

| Field | Exact | Near (norm) | Diff | Notes |
|---|---|---|---|---|
| `<title>` | 61/65 | 0/65 | 4/65 | Diffs are the brand-suffix (legacy omits ` | Rapid Formations` on 4 pages; clone auto-appends). Fix: verbatim title. |
| meta description | 63/65 | 1/65 | 1/65 | `/faqs/` genuinely differs; `/business-templates/` is a whitespace/entity nuance. |
| canonical | — | — | 65/65 | Clone canonical is **wrong domain + slug-derived + no trailing slash**. Engine fix (Phase 2). |
| robots | 65/65 | — | 0 | Clone matches legacy `index,follow` on every mapped page. |
| JSON-LD | 0/65 | — | 51/65 legacy | **Clone emits none.** Biggest gap. See below. |

### JSON-LD @type coverage

| @type | Legacy pages | Clone pages |
|---|---|---|
| FAQPage | 48 | 0 |
| HowTo | 3 | 0 |
| LocalBusiness | 1 | 0 |
| Organization | 2 | 0 |
| Product | 21 | 0 |
| ProfessionalService | 1 | 0 |
| WebPage | 1 | 0 |
| WebSite | 1 | 0 |

## Findings

1. **Meta title/description are already ~95% seeded and correct.** 61/65 titles and 64/65 descriptions match (exact or after whitespace/entity normalisation). Only a handful need touching — this is NOT the main work.
2. **The title brand-suffix diverges on 4 pages.** Legacy bakes the full `<title>` (many already include ` | Rapid Formations`), but the clone stores the base title and auto-appends the suffix in `generateMeta`. Adopt the QCF fix: use `meta.title` **verbatim** and seed the exact legacy title.
3. **JSON-LD is the real gap: clone emits 0, legacy emits on 51/65 pages.** Types: FAQPage×48, Product×21, HowTo×3, Organization×2, plus WebSite/WebPage/LocalBusiness (home) and ProfessionalService (contact-us). A working builder exists on the stale branch `origin/feat/structured-data` — re-implement fresh on main and extend with Product + the home graph.
4. **Canonical is wrong for parity on every page.** It resolves to the Vercel domain, is derived from `slug` (nested pages get a wrong single-segment path), and omits the trailing slash. Legacy canonicals are absolute `https://www.rapidformations.co.uk/<fullpath>/`. Fix: canonical from `fullPath`/breadcrumbs + trailing slash + `NEXT_PUBLIC_SERVER_URL=https://www.rapidformations.co.uk`.
5. **OG/Twitter are already richer than legacy** — the clone emits og:title/description/site_name/image which legacy omits. Only real fixes: `twitter:site`/`twitter:creator` = `@rapidukofficial` (currently `@payloadcms`), add `og:locale=en_GB`, and the domain correction. No content to copy.
6. **Indexation leak: all 45 `port-preview-*` pages are `index,follow` and in the sitemap.** These are internal dev/port pages with no legacy source — they must be `noindex` + sitemap-excluded (mirrors the QCF `v2-*` cleanup). name-check funnel + renewals + id-requirements are already correctly `noindex`.
7. **Reproduce types + content, not legacy bugs.** Legacy JSON-LD carries junk to intentionally OMIT: empty `geo`/`hasMap`/`telephone` (LocalBusiness, ProfessionalService), unrendered `[[price slug=...]]` shortcodes in FAQ answers, and a nested-array `mainEntity: [[...]]` bug on the home FAQPage. Build clean JSON-LD from our CMS data.

## Per-page comparison (65 mapped)

| Legacy path | Clone path | Title | Desc | Legacy JSON-LD | Clone JSON-LD |
|---|---|---|---|---|---|
| /about-us/ | /about-us | ✅ | ✅ | Organization | — |
| /affiliate-program/ | /affiliate-program | ✅ | ✅ | — | — |
| /business-banking/ | /business-banking | ✅ | ✅ | FAQPage | — |
| /business-templates/ | /business-templates | ✅ | ≈ | FAQPage, Product | — |
| /company-dissolution/ | /company-dissolution | ✅ | ✅ | FAQPage, Product | — |
| /company-name-change/ | /company-name-change | ✅ | ✅ | FAQPage, Product | — |
| /confirmation-statement-service/ | /confirmation-statement-service | ✅ | ✅ | FAQPage, Product | — |
| /contact-us/ | /contact-us | ✅ | ✅ | FAQPage, ProfessionalService | — |
| /cookies-policy/ | /cookies-policy | ✅ | ✅ | — | — |
| /customer-reviews/ | /customer-reviews | ✅ | ✅ | — | — |
| /director-appointment-resignation/ | /director-appointment-resignation | ✅ | ✅ | FAQPage, Product | — |
| /dormant-company-accounts/ | /dormant-company-accounts | ✅ | ✅ | FAQPage, Product | — |
| /entrepreneur-scholarship-programme/ | /entrepreneur-scholarship-programme | ✅ | ✅ | — | — |
| /environmental-policy/ | /environmental-policy | ✅ | ✅ | — | — |
| /hassle-free-compliance/ | /hassle-free-compliance | ✅ | ✅ | FAQPage, Product | — |
| /ico-registration/ | /ico-registration | ✅ | ✅ | FAQPage, Product | — |
| / | / | ❌ | ✅ | FAQPage, HowTo, LocalBusiness, Organization, WebPage, WebSite | — |
| /issue-of-shares/ | /issue-of-shares | ✅ | ✅ | FAQPage, Product | — |
| /privacy-policy/ | /privacy-policy | ✅ | ✅ | — | — |
| /psc-filing/ | /psc-filing | ✅ | ✅ | FAQPage, Product | — |
| /refund-cancellation-policy/ | /refund-cancellation-policy | ✅ | ✅ | — | — |
| /site-map/ | /site-map | ✅ | ✅ | — | — |
| /transfer-of-shares/ | /transfer-of-shares | ✅ | ✅ | FAQPage, Product | — |
| /vat-registration/ | /vat-registration | ✅ | ✅ | FAQPage, Product | — |
| /videos/ | /videos | ✅ | ✅ | — | — |
| /whistleblowing-grievance-mechanism-policy/ | /whistleblowing-grievance-mechanism-policy | ✅ | ✅ | — | — |
| /additional-services/business-address/ | /business-address | ❌ | ✅ | FAQPage, Product | — |
| /additional-services/london-registered-office/ | /london-registered-office | ❌ | ✅ | FAQPage, Product | — |
| /additional-services/service-address/ | /service-address | ❌ | ✅ | FAQPage, Product | — |
| /compare-packages/guarantee/ | /guarantee | ✅ | ✅ | FAQPage, Product | — |
| /compare-packages/ | /compare-packages | ✅ | ✅ | FAQPage | — |
| /compare-packages/llp/ | /llp | ✅ | ✅ | FAQPage, Product | — |
| /compare-packages/non-residents/ | /non-residents | ✅ | ✅ | FAQPage, Product | — |
| /faqs/after-company-formation/ | /after-company-formation | ✅ | ✅ | FAQPage | — |
| /faqs/annual-accounts/ | /annual-accounts | ✅ | ✅ | FAQPage | — |
| /faqs/basics/ | /basics | ✅ | ✅ | FAQPage | — |
| /faqs/company-meetings-and-resolutions/ | /company-meetings-and-resolutions | ✅ | ✅ | FAQPage | — |
| /faqs/company-names/ | /company-names | ✅ | ✅ | FAQPage | — |
| /faqs/company-records-and-registers/ | /company-records-and-registers | ✅ | ✅ | FAQPage | — |
| /faqs/company-secretary/ | /company-secretary | ✅ | ✅ | FAQPage | — |
| /faqs/confirmation-statement/ | /confirmation-statement | ✅ | ✅ | FAQPage | — |
| /faqs/corporation-tax/ | /corporation-tax | ✅ | ✅ | FAQPage | — |
| /faqs/directors-service-address/ | /directors-service-address | ✅ | ✅ | FAQPage | — |
| /faqs/directors/ | /directors | ✅ | ✅ | FAQPage | — |
| /faqs/ | /faqs | ✅ | ❌ | — | — |
| /faqs/limited-by-guarantee/ | /limited-by-guarantee | ✅ | ✅ | FAQPage | — |
| /faqs/limited-by-shares/ | /limited-by-shares | ✅ | ✅ | FAQPage | — |
| /faqs/limited-liability-partnerships/ | /limited-liability-partnerships | ✅ | ✅ | FAQPage | — |
| /faqs/paye-and-payroll/ | /paye-and-payroll | ✅ | ✅ | FAQPage | — |
| /faqs/paying-yourself-through-limited-company/ | /paying-yourself-through-limited-company | ✅ | ✅ | FAQPage | — |
| /faqs/pscs/ | /pscs | ✅ | ✅ | FAQPage | — |
| /faqs/registered-office/ | /registered-office | ✅ | ✅ | FAQPage | — |
| /faqs/sail-address/ | /sail-address | ✅ | ✅ | FAQPage | — |
| /faqs/self-assessment/ | /self-assessment | ✅ | ✅ | FAQPage | — |
| /faqs/shares-and-shareholders/ | /shares-and-shareholders | ✅ | ✅ | FAQPage | — |
| /faqs/the-formation-process/ | /the-formation-process | ✅ | ✅ | FAQPage | — |
| /faqs/vat/ | /vat | ✅ | ✅ | FAQPage | — |
| /help-centre/a-z-glossary-of-terms/ | /a-z-glossary-of-terms | ✅ | ✅ | — | — |
| /help-centre/online-admin-portal/ | /online-admin-portal | ✅ | ✅ | HowTo | — |
| /help-centre/steps-to-forming-a-company/ | /steps-to-forming-a-company | ✅ | ✅ | HowTo | — |
| /package/all-inclusive-package/ | /all-inclusive-package | ✅ | ✅ | FAQPage, Product | — |
| /package/basic-package/ | /basic-package | ✅ | ✅ | FAQPage, Product | — |
| /package/privacy-package/ | /privacy-package | ✅ | ✅ | FAQPage, Product | — |
| /terms-and-conditions/complaints-procedure/ | /complaints-procedure | ✅ | ✅ | — | — |
| /terms-and-conditions/ | /terms-and-conditions | ✅ | ✅ | — | — |

## Appendix A — verbatim legacy title + description (seed source)

These are the exact legacy values to store in `meta.title` / `meta.description`.

### /about-us/  →  clone `/about-us`
- **title:** `About Us \| Rapid Formations`
- **description:** `About Rapid Formations - Our history, expertise, incorporation services and company addresses in London & Glasgow. Call 020 7871 9990 for more information.`

### /affiliate-program/  →  clone `/affiliate-program`
- **title:** `Become our affiliate and get rewarded for successful referrals \| Rapid Formations`
- **description:** `Leading online company formation agent specialising in the formation of limited companies and limited liability partnerships.`

### /business-banking/  →  clone `/business-banking`
- **title:** `Business Banking \| Rapid Formations`
- **description:** `Banking solutions that meet your business needs through Rapid Formations.`

### /business-templates/  →  clone `/business-templates`
- **title:** `Business Document Template Library \| Rapid Formations`
- **description:** `Our Business Document Template Library provides professional business documents at your fingertips – in one simple library for only £139.99 per year.`
  - _clone now:_ title=`Business Document Template Library \| Rapid Formations` · desc=`Our Business Document Template Library provides professional business documents at your fingertips – in one simple library for only £139.99 per year.`

### /company-dissolution/  →  clone `/company-dissolution`
- **title:** `Company Dissolution Service \| Rapid Formations`
- **description:** `Company Dissolution Service, available from Rapid Formations for £89.99. Strike off your company today. All documents included.`

### /company-name-change/  →  clone `/company-name-change`
- **title:** `Company Name Change Service \| Rapid Formations`
- **description:** `Change your Company Name with the help of our experts. Available from Rapid Formations for £99.99. All documents included.`

### /confirmation-statement-service/  →  clone `/confirmation-statement-service`
- **title:** `Confirmation Statement Service \| Rapid Formations`
- **description:** `Order a Confirmation Statement for your limited company or LLP. Available from Rapid Formations from £75.99.`

### /contact-us/  →  clone `/contact-us`
- **title:** `Contact Us \| Rapid Formations`
- **description:** `Contact Rapid Formations for expert advice and information about our company formation services. Call or email now.`

### /cookies-policy/  →  clone `/cookies-policy`
- **title:** `Cookies Policy \| Rapid Formations`
- **description:** `Read our Cookies Policy for details about Rapid Formations' use of cookies within our website.`

### /customer-reviews/  →  clone `/customer-reviews`
- **title:** `Customer Review Centre \| Rapid Formations`
- **description:** `We are the highest rated company formation agents in the UK, on Trustpilot and Google. Have a look at some of our 12,000 plus reviews from people just like you!`

### /director-appointment-resignation/  →  clone `/director-appointment-resignation`
- **title:** `Director Appointment & Resignation Service \| Rapid Formations`
- **description:** `Appoint or resign a Director with the help of our experts. Available from Rapid Formations for £49.99. All documents included.`

### /dormant-company-accounts/  →  clone `/dormant-company-accounts`
- **title:** `Dormant Company Accounts Service \| Rapid Formations`
- **description:** `Save money and time with our super fast Dormant Company Accounts Service. Accounts filed in 24 hours for only £49.99.`

### /entrepreneur-scholarship-programme/  →  clone `/entrepreneur-scholarship-programme`
- **title:** `Entrepreneur Scholarship Programme \| Rapid Formations`
- **description:** `Find out about Rapid Formations' Entrepreneur Scholarship Programme for students in the UK.`

### /environmental-policy/  →  clone `/environmental-policy`
- **title:** `Environmental Policy \| Rapid Formations \| Rapid Formations`
- **description:** `Rapid Formations are committed to protecting and preserving the natural environment for future generations.`

### /hassle-free-compliance/  →  clone `/hassle-free-compliance`
- **title:** `Hassle Free Compliance Service \| Rapid Formations`
- **description:** `Save time with legally reviewed business documents, avoid late filings and penalties and get expert compliance support from our Hassle-Free Compliance Service.`

### /ico-registration/  →  clone `/ico-registration`
- **title:** `ICO Registration Service £89.99 per year \| Rapid Formations`
- **description:** `Easily register with the ICO for just £89.99 per year. Get fast, compliant data protection guidance for your business or organisation today.`

### /  →  clone `/`
- **title:** `Company Formation UK & Company Registration`
- **description:** `Company formation made easy with the UK’s leading formation agent. Register your business online in just 4 easy steps.`
  - _clone now:_ title=`Company Formation UK & Company Registration \| Rapid Formations` · desc=`Company formation made easy with the UK’s leading formation agent. Register your business online in just 4 easy steps.`

### /issue-of-shares/  →  clone `/issue-of-shares`
- **title:** `Issue of Shares Service \| Rapid Formations`
- **description:** `Issue shares to shareholders. Available from Rapid Formations for £129.99.`

### /privacy-policy/  →  clone `/privacy-policy`
- **title:** `Privacy Policy \| Rapid Formations`
- **description:** `The privacy of Rapid Formations users is paramount. We know it is important to you and we promise to respect your personal information.`

### /psc-filing/  →  clone `/psc-filing`
- **title:** `People with Significant Control Filing \| Rapid Formations \| Rapid Formations`
- **description:** `The PSC Filing Service manages all the paperwork required when adding or removing PSCs from Companies House records, or updating their details. £29.99.`

### /refund-cancellation-policy/  →  clone `/refund-cancellation-policy`
- **title:** `Refund & Cancellation Policy \| Rapid Formations`
- **description:** `Rapid Formations refund and cancellation policy is straightforward and easy to understand.`

### /site-map/  →  clone `/site-map`
- **title:** `Site Map \| Rapid Formations`
- **description:** `Our site map provides a comprehensive list of our website pages.`

### /transfer-of-shares/  →  clone `/transfer-of-shares`
- **title:** `Transfer of Shares Service \| Rapid Formations`
- **description:** `Share transfer service for limited companies, including J30 stock transfer form, share certificate and meeting minutes, prepared and filed for only £129.99.`

### /vat-registration/  →  clone `/vat-registration`
- **title:** `VAT Registration Service \| Rapid Formations`
- **description:** `Register your company for VAT with HMRC.`

### /videos/  →  clone `/videos`
- **title:** `Helpful Videos \| Rapid Formations`
- **description:** `Helpful videos to guide you through starting and running your UK company with confidence.`

### /whistleblowing-grievance-mechanism-policy/  →  clone `/whistleblowing-grievance-mechanism-policy`
- **title:** `Whistleblowing and Grievance Mechanism Policies \| Rapid Formations`
- **description:** `Whistleblowing and Grievance Mechanism Policies`

### /additional-services/business-address/  →  clone `/business-address`
- **title:** `Business Address Service & Mail Forwarding Service in London`
- **description:** `Enhance your corporate image with our prestigious Business Address Service with mail forwarding in Covent Garden, London. Buy online for only £89.00 per year.`
  - _clone now:_ title=`Business Address Service & Mail Forwarding Service in London \| Rapid Formations` · desc=`Enhance your corporate image with our prestigious Business Address Service with mail forwarding in Covent Garden, London. Buy online for only £89.00 per year.`

### /additional-services/london-registered-office/  →  clone `/london-registered-office`
- **title:** `Registered Office Address Service in London from £39`
- **description:** `Protect the privacy of your home address with our Registered Office Address Service. All government mail scanned and emailed to you. Only £39.00 per year`
  - _clone now:_ title=`Registered Office Address Service in London from £39 \| Rapid Formations` · desc=`Protect the privacy of your home address with our Registered Office Address Service. All government mail scanned and emailed to you. Only £39.00 per year`

### /additional-services/service-address/  →  clone `/service-address`
- **title:** `Directors Service Address in London from £26`
- **description:** `Maintain the privacy of your company's directors, secretaries and PSCs with our Service Address. Available in London from £26.00 per year.`
  - _clone now:_ title=`Directors Service Address in London from £26 \| Rapid Formations` · desc=`Maintain the privacy of your company's directors, secretaries and PSCs with our Service Address. Available in London from £26.00 per year.`

### /compare-packages/guarantee/  →  clone `/guarantee`
- **title:** `Limited by Guarantee Package \| Rapid Formations`
- **description:** `Our Limited by Guarantee Package is ideal for setting up a not for profit company. Register your limited company with Rapid Formations in 3 to 6 working hours.`

### /compare-packages/  →  clone `/compare-packages`
- **title:** `Compare our Company Registration Packages \| Rapid Formations`
- **description:** `Compare our range of company formation packages, and use our simple 4 step process to set up your company in just 3 to 6 working hours, from only £2.99.`

### /compare-packages/llp/  →  clone `/llp`
- **title:** `LLP Package \| Rapid Formations`
- **description:** `Our LLP Package is perfect for setting up a limited liability partnership. Fast online formation. Register your new LLP in 3 to 6 working hours for only £19.99.`

### /compare-packages/non-residents/  →  clone `/non-residents`
- **title:** `Non-Residents Packages \| Rapid Formations`
- **description:** `Our Non-Residents Packages provide everything you need to start a new business in the UK. Fast online formation. Register your new UK company today.`

### /faqs/after-company-formation/  →  clone `/after-company-formation`
- **title:** `Post Company Formation - FAQs \| Rapid Formations`
- **description:** `Managing your company after incorporation - Answers to the most popular questions about running a limited company.`

### /faqs/annual-accounts/  →  clone `/annual-accounts`
- **title:** `Annual Accounts - FAQs \| Rapid Formations`
- **description:** `The most frequently asked questions on annual accounts, including when are they due, how do I file them, and do I need an accountant?`

### /faqs/basics/  →  clone `/basics`
- **title:** `The Basics - FAQs \| Rapid Formations`
- **description:** `Answers to the most common queries about limited company registration in the UK - Take a look now.`

### /faqs/company-meetings-and-resolutions/  →  clone `/company-meetings-and-resolutions`
- **title:** `Company Meetings and Resolutions - FAQs \| Rapid Formations`
- **description:** `We answer your questions on company meetings and resolutions. From board meetings to written resolutions - we have it covered!`

### /faqs/company-names/  →  clone `/company-names`
- **title:** `Company Names - FAQs \| Rapid Formations`
- **description:** `Answers to frequently asked questions on company names, including how to choose a good name and the company name rules you need to know.`

### /faqs/company-records-and-registers/  →  clone `/company-records-and-registers`
- **title:** `Company Records and Registers - FAQs \| Rapid Formations`
- **description:** `Your questions answered on company records and registers, including what are statutory registers and what company records do I need to keep?`

### /faqs/company-secretary/  →  clone `/company-secretary`
- **title:** `Company Secretary - FAQs \| Rapid Formations`
- **description:** `Helpful information about the role, duties and benefits of limited company secretaries. Take a look now.`

### /faqs/confirmation-statement/  →  clone `/confirmation-statement`
- **title:** `Confirmation Statement - FAQs \| Rapid Formations`
- **description:** `A comprehensive guide on preparing and filing Confirmation Statements with Companies House. Call Rapid Formations on 0800 107 7771 for more information.`

### /faqs/corporation-tax/  →  clone `/corporation-tax`
- **title:** `Corporation Tax - FAQs \| Rapid Formations`
- **description:** `Answers to the most common queries about Corporation Tax requirements and Company Tax Returns for limited companies. Take a look now.`

### /faqs/directors-service-address/  →  clone `/directors-service-address`
- **title:** `Service Address - FAQs \| Rapid Formations`
- **description:** `Rapid Formations provides answers to your queries about service addresses for limited company directors. Find out why you need one and how to protect your privacy.`

### /faqs/directors/  →  clone `/directors`
- **title:** `Directors - FAQs \| Rapid Formations`
- **description:** `Useful information about the role, responsibilities and legal requirements of limited company directors. Take a look now.`

### /faqs/  →  clone `/faqs`
- **title:** `Frequently Asked Questions \| Rapid Formations`
- **description:** `Rapid Formations' comprehensive FAQ section provides answers to your company formation queries. Call 0800 107 7771 for more help and advice.`
  - _clone now:_ title=`Frequently Asked Questions \| Rapid Formations` · desc=`Frequently asked questions about company formation, company names, directors, shares, tax and more.`

### /faqs/limited-by-guarantee/  →  clone `/limited-by-guarantee`
- **title:** `Companies Limited by Guarantee - FAQs \| Rapid Formations`
- **description:** `Answers to the most common questions about registering a company Limited by Guarantee. Read now.`

### /faqs/limited-by-shares/  →  clone `/limited-by-shares`
- **title:** `Companies Limited by Shares - FAQs \| Rapid Formations`
- **description:** `Answers to the most common questions about companies limited by shares. Call Rapid Formations on 0800 107 7771 for further information.`

### /faqs/limited-liability-partnerships/  →  clone `/limited-liability-partnerships`
- **title:** `Limited Liability Partnerships - FAQs \| Rapid Formations`
- **description:** `Answers to the the most common queries about Limited Liability Partnerships (LLPs). Brought to you by Rapid Formations, the UK's No.1 company formation agent.`

### /faqs/paye-and-payroll/  →  clone `/paye-and-payroll`
- **title:** `Pay As You Earn (PAYE) and Payroll - FAQs \| Rapid Formations`
- **description:** `Answers to the most common questions on Pay As You Earn (PAYE) and Payroll in the UK, including who has to register for PAYE. Have a look now!`

### /faqs/paying-yourself-through-limited-company/  →  clone `/paying-yourself-through-limited-company`
- **title:** `Paying Yourself Through A Limited Company - FAQs \| Rapid Formations`
- **description:** `Meta description: Your questions answered on paying yourself through a limited company including salary, dividends, directors loans, and expenses. Have a look!`

### /faqs/pscs/  →  clone `/pscs`
- **title:** `People with Significant Control (PSCs) - FAQs \| Rapid Formations`
- **description:** `Useful information on People with Significant Control (PSCs), including who qualifies as a PSC, and how to register as one. Have a look now!`

### /faqs/registered-office/  →  clone `/registered-office`
- **title:** `Registered Office - FAQs \| Rapid Formations`
- **description:** `Rapid Formations provides answers to the most common questions about registered office addresses for limited companies and LLPs. Take a look now.`

### /faqs/sail-address/  →  clone `/sail-address`
- **title:** `SAIL Address - FAQs \| Rapid Formations`
- **description:** `Find out everything you need to know about a SAIL address, including why you may want one and the rules governing the use of this address.`

### /faqs/self-assessment/  →  clone `/self-assessment`
- **title:** `Self Assessment - FAQs \| Rapid Formations`
- **description:** `Your questions answered on the Self Assessment tax return, including who has to file it, what is the deadline, and how and when to pay it?`

### /faqs/shares-and-shareholders/  →  clone `/shares-and-shareholders`
- **title:** `Shares & Shareholders - FAQs \| Rapid Formations`
- **description:** `An introduction to limited company shares and shareholders from Rapid Formations. Call 0800 107 7771 today for more information.`

### /faqs/the-formation-process/  →  clone `/the-formation-process`
- **title:** `Company Formation Process - FAQs \| Rapid Formations`
- **description:** `Answers to the most common questions about the online company formation process. Find out everything you need to know now.`

### /faqs/vat/  →  clone `/vat`
- **title:** `VAT - FAQs \| Rapid Formations`
- **description:** `An introduction to Value Added Tax (VAT) from Rapid Formations. Take a look now.`

### /help-centre/a-z-glossary-of-terms/  →  clone `/a-z-glossary-of-terms`
- **title:** `A-Z Glossary of Terms \| Rapid Formations`
- **description:** `Our useful glossary of terms relating to all aspects of company registration, limited companies, LLPs, company addresses, tax and annual filings.`

### /help-centre/online-admin-portal/  →  clone `/online-admin-portal`
- **title:** `About our Online Client Portal \| Rapid Formations`
- **description:** `Manage your company details online with Rapid Formations' Client Portal - available to existing customers and non-customers. Register a free account today.`

### /help-centre/steps-to-forming-a-company/  →  clone `/steps-to-forming-a-company`
- **title:** `4 Steps to Forming a Company \| Rapid Formations`
- **description:** `A guide to setting up a company using our 4 step online process. Register online today with Rapid Formations.`

### /package/all-inclusive-package/  →  clone `/all-inclusive-package`
- **title:** `All Inclusive Package \| Rapid Formations`
- **description:** `Our All-Inclusive Package provides everything you need to start in new business, including your own company secretary from £39.99.`

### /package/basic-package/  →  clone `/basic-package`
- **title:** `Basic Package \| Rapid Formations`
- **description:** `Our Basic Package is perfect for reserving a company name for future use. Register your limited company with Rapid Formations today for only £2.99.`

### /package/privacy-package/  →  clone `/privacy-package`
- **title:** `Privacy Package \| Rapid Formations`
- **description:** `Our Privacy Package provides a limited company and the filing of the first confirmation statement. Set up a new company with Rapid Formations for £14.99.`

### /terms-and-conditions/complaints-procedure/  →  clone `/complaints-procedure`
- **title:** `Customer Complaints \| Rapid Formations`
- **description:** `Find out how to make a complaint, its procedure and resolve a problem, if you are unhappy with our service.`

### /terms-and-conditions/  →  clone `/terms-and-conditions`
- **title:** `Terms and Conditions \| Rapid Formations`
- **description:** `Rapid Formations general and specific terms and conditions of service and the use of this website.`

## Appendix B — indexation (non-mapped clone pages)

### `port-preview-*` (must become noindex + sitemap-excluded)

| Path | Status | robots |
|---|---|---|
| /port-preview-staff-reviews | 200 | index, follow |
| /port-preview-meet-the-team | 200 | index, follow |
| /port-preview-about-us-tabs | 200 | index, follow |
| /port-preview-review-centre-tabs | 200 | index, follow |
| /port-preview-magic-numbers | 200 | index, follow |
| /port-preview-about-us-join | 200 | index, follow |
| /port-preview-about-us-story | 200 | index, follow |
| /port-preview-about-us-content | 200 | index, follow |
| /port-preview-business-banking-table | 200 | index, follow |
| /port-preview-scholarship-programme | 200 | index, follow |
| /port-preview-formation-video-inset | 200 | index, follow |
| /port-preview-review-highlight-rows | 200 | index, follow |
| /port-preview-customer-reviews | 200 | index, follow |
| /port-preview-company-address-guide | 200 | index, follow |
| /port-preview-contact-us | 200 | index, follow |
| /port-preview-our-offices | 200 | index, follow |
| /port-preview-affiliate-program | 200 | index, follow |
| /port-preview-site-map | 200 | index, follow |
| /port-preview-compare-packages-nav | 200 | index, follow |
| /port-preview-same-day-incorporation | 200 | index, follow |
| /port-preview-order-steps | 200 | index, follow |
| /port-preview-recommended-packages | 200 | index, follow |
| /port-preview-ad-banner | 200 | index, follow |
| /port-preview-package-inclusions-all-inclusive-package | 200 | index, follow |
| /port-preview-package-inclusions-privacy-package | 200 | index, follow |
| /port-preview-package-inclusions-basic-package | 200 | index, follow |
| /port-preview-a-z-glossary-of-terms | 200 | index, follow |
| /port-preview-steps-to-forming-a-company | 200 | index, follow |
| /port-preview-required-information | 200 | index, follow |
| /port-preview-online-admin-portal | 200 | index, follow |
| /port-preview-london-registered-office | 200 | index, follow |
| /port-preview-service-address | 200 | index, follow |
| /port-preview-business-address | 200 | index, follow |
| /port-preview-issue-of-shares | 200 | index, follow |
| /port-preview-director-appointment-resignation | 200 | index, follow |
| /port-preview-psc-filing | 200 | index, follow |
| /port-preview-transfer-of-shares | 200 | index, follow |
| /port-preview-company-dissolution | 200 | index, follow |
| /port-preview-dormant-company-accounts | 200 | index, follow |
| /port-preview-company-name-change | 200 | index, follow |
| /port-preview-ico-registration | 200 | index, follow |
| /port-preview-business-telephone | 200 | index, follow |
| /port-preview-confirmation-statement-service | 200 | index, follow |
| /port-preview-vat-registration | 200 | index, follow |
| /port-preview-ico | 200 | index, follow |

### Clone-extra (content page, no legacy sitemap match — verify each)

| Path | Status | robots |
|---|---|---|
| /company-address-guide | 200 | index, follow |
| /go-digital | 200 | index, follow |
| /required-information | 200 | index, follow |
| /renewals | 200 | noindex, nofollow |
| /business-telephone | 200 | index, follow |
| /id-requirements | 200 | noindex, nofollow |
| /name-check-non-residents-plus-package | 200 | noindex, nofollow |
| /name-check-non-residents-package | 200 | noindex, nofollow |
| /name-check-llp-package | 200 | noindex, nofollow |
| /name-check-lbg-package | 200 | noindex, nofollow |
| /name-check-all-inclusive-package | 200 | noindex, nofollow |
| /name-check-privacy-package | 200 | noindex, nofollow |
| /name-check-basic-package | 200 | noindex, nofollow |
