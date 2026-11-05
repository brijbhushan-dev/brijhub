/* search-index.js - pages the header search can find.
   Add one object per page: title, url, desc, keywords (extra words that should match).
   The search also finds headings on the page you are currently viewing. */
window.SITE_SEARCH_INDEX = [
  { title: 'Home', url: 'index.html', desc: 'Start here: the BrijHub homepage.', keywords: 'main start welcome brijhub community' },
  { title: 'Who We Are', url: 'about.html', desc: 'Our mission, our story and our team.', keywords: 'about us team mission story company' },
  { title: 'Contact Us', url: 'contact.html', desc: 'Phone, email and a message form to reach us.', keywords: 'phone email address reach support message call' },
  { title: 'FAQs', url: 'faqs.html', desc: 'Answers to the questions we hear most.', keywords: 'faqs questions answers help how' },
  { title: 'Blog', url: 'blog.html', desc: 'News, tips and stories from the community.', keywords: 'articles news posts stories tips' },
  { title: 'Help', url: 'help.html', desc: 'Guides and help articles.', keywords: 'guide support how to' },
  { title: 'Customer Support', url: 'customer-support.html', desc: 'Talk to our support team.', keywords: 'support help agent' },
  { title: 'Book Appointment', url: 'book-appointment.html', desc: 'Schedule a time with us.', keywords: 'schedule booking meeting' },
  { title: 'Privacy Policy', url: 'privacy-policy.html', desc: 'How we collect and protect your data.', keywords: 'data security legal cookies' },
  { title: 'Terms of Service', url: 'terms-of-service.html', desc: 'The rules for using our website.', keywords: 'legal conditions agreement' },
  { title: 'Custom Software Development', url: 'custom-software.html', desc: 'Tailor-made web platforms and enterprise systems.', keywords: 'software web enterprise development' },
  { title: 'Mobile App Development', url: 'mobile-apps.html', desc: 'iOS and Android apps with beautiful interfaces.', keywords: 'ios android apps mobile' },
  { title: 'Cloud & DevOps', url: 'cloud-devops.html', desc: 'Cloud migration, automation and monitoring.', keywords: 'aws azure google cloud devops infrastructure' },
  { title: 'AI & Data Analytics', url: 'ai-data-analytics.html', desc: 'Machine learning, analytics and automation.', keywords: 'ai machine learning data dashboards' },
  { title: 'Cyber Security', url: 'cyber-security.html', desc: 'Audits, penetration testing and threat monitoring.', keywords: 'security audit protection pentest' },
  { title: 'IT Support & Consulting', url: 'it-support.html', desc: 'Managed IT support and expert consulting.', keywords: 'support consulting managed helpdesk' },
  { title: 'Knowledge Base', url: 'knowledge-base.html', desc: 'Guides, tutorials and how-to articles.', keywords: 'help docs guides tutorials' },
  { title: 'Submit a Ticket', url: 'submit-ticket.html', desc: 'Raise a support request with our team.', keywords: 'support ticket issue problem' },
  { title: 'Request a Quote', url: 'request-quote.html', desc: 'Tell us about your project and get a quote.', keywords: 'price cost estimate proposal' },
  { title: 'Feedback & Complaints', url: 'feedback.html', desc: 'Share feedback or raise a complaint.', keywords: 'review suggestion complaint' },
  { title: 'Cookies Policy', url: 'cookies-policy.html', desc: 'Which cookies we use and how to control them.', keywords: 'cookie consent tracking privacy legal' },
  { title: 'Financial Policies', url: 'financial-policies.html', desc: 'Pricing, invoicing, payment terms and taxes.', keywords: 'payment invoice billing tax pricing legal' },
  { title: 'Press & Media', url: 'press-media.html', desc: 'Newsroom, press kit and brand guidelines.', keywords: 'press media journalist logo brand newsroom' },
  { title: 'Refund Policy', url: 'refund-policy.html', desc: 'How refunds and cancellations work.', keywords: 'legal money return cancel' }
];

/* Popular searches shown as quick buttons */
window.SITE_SEARCH_TAGS = ['About', 'Contact', 'FAQ', 'Blog', 'Privacy'];
