/* footer-markup.js - the common footer HTML (single source of truth).
   Edit the footer here. Injected on every page by assets/js/include.js,
   works with file:// and on a server. All text/contact details are DUMMY: replace them. */
window.SITE_FOOTER_HTML = `
<footer class="site-footer" id="site-footer">
  <svg class="site-footer__wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M0 60V30C120 8 240 0 360 10c160 14 260 44 440 38 160-5 260-34 400-40 90-4 170 6 240 22v30z"/>
  </svg>

  <div class="container">
    <div class="site-footer__main">
      <div class="row g-5">

        <!-- Brand + contact -->
        <div class="col-lg-4" data-aos="fade-up">
          <a href="index.html" class="site-footer__logo">
            <img src="assets/images/logo.png" alt="BrijHub - Community, Connection, Collaboration" width="1821" height="535" loading="lazy" decoding="async">
          </a>
          <h3 class="site-footer__company">BrijHub Community &amp; Collaboration Services</h3>
          <p class="site-footer__about">Software, cloud, AI and security services. We help people and businesses connect, grow and collaborate with confidence.</p>
          <ul class="site-footer__contact">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:9711101482">9711101482</a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:brijpant88@gmail.com">brijpant88@gmail.com</a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Meetings online or in person, by appointment</span>
            </li>
          </ul>
        </div>

        <!-- Link columns + social -->
        <div class="col-lg-8">
          <div class="row g-4">
            <div class="col-12 col-md-3 site-footer__col" data-aos="fade-up" data-aos-delay="100">
              <h3 class="site-footer__title">
                <button type="button" class="site-footer__toggle" aria-controls="footerCol1" aria-expanded="false">Quick Links<span class="site-footer__plus" aria-hidden="true"></span></button>
              </h3>
              <div class="site-footer__panel" id="footerCol1">
                <ul class="site-footer__links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">Who We Are</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="help.html">Help</a></li>
                <li><a href="faqs.html">FAQs</a></li>
                <li><a href="blog.html">Blog</a></li>
              </ul>
              </div>
            </div>
            <div class="col-12 col-md-3 site-footer__col" data-aos="fade-up" data-aos-delay="200">
              <h3 class="site-footer__title">
                <button type="button" class="site-footer__toggle" aria-controls="footerCol2" aria-expanded="false">Our Services<span class="site-footer__plus" aria-hidden="true"></span></button>
              </h3>
              <div class="site-footer__panel" id="footerCol2">
                <ul class="site-footer__links">
                <li><a href="custom-software.html">Custom Software Development</a></li>
                <li><a href="mobile-apps.html">Mobile App Development</a></li>
                <li><a href="cloud-devops.html">Cloud &amp; DevOps</a></li>
                <li><a href="ai-data-analytics.html">AI &amp; Data Analytics</a></li>
                <li><a href="cyber-security.html">Cyber Security</a></li>
                <li><a href="it-support.html">IT Support &amp; Consulting</a></li>
              </ul>
              </div>
            </div>
            <div class="col-12 col-md-3 site-footer__col" data-aos="fade-up" data-aos-delay="300">
              <h3 class="site-footer__title">
                <button type="button" class="site-footer__toggle" aria-controls="footerCol3" aria-expanded="false">Help &amp; Support<span class="site-footer__plus" aria-hidden="true"></span></button>
              </h3>
              <div class="site-footer__panel" id="footerCol3">
                <ul class="site-footer__links">
                <li><a href="customer-support.html">Customer Support</a></li>
                <li><a href="knowledge-base.html">Knowledge Base</a></li>
                <li><a href="book-appointment.html">Book a Consultation</a></li>
                <li><a href="submit-ticket.html">Submit a Ticket</a></li>
                <li><a href="request-quote.html">Request a Quote</a></li>
                <li><a href="feedback.html">Feedback &amp; Complaints</a></li>
              </ul>
              </div>
            </div>
            <div class="col-12 col-md-3 site-footer__col" data-aos="fade-up" data-aos-delay="400">
              <h3 class="site-footer__title">
                <button type="button" class="site-footer__toggle" aria-controls="footerCol4" aria-expanded="false">Legal<span class="site-footer__plus" aria-hidden="true"></span></button>
              </h3>
              <div class="site-footer__panel" id="footerCol4">
                <ul class="site-footer__links">
                <li><a href="terms-of-service.html">Terms of Service</a></li>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="refund-policy.html">Refund Policy</a></li>
                <li><a href="cookies-policy.html">Cookies Policy</a></li>
                <li><a href="financial-policies.html">Financial Policies</a></li>
                <li><a href="press-media.html">Press &amp; Media</a></li>
              </ul>
              </div>
            </div>
          </div>

          <div class="site-footer__aside" data-aos="fade-up">
            <h3 class="site-footer__join-title">Join the <span>Conversation</span></h3>
            <ul class="site-footer__social" aria-label="Social media">
              <li><a href="#" class="is-facebook" data-tooltip="Facebook" aria-label="Facebook" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a></li>
              <li><a href="#" class="is-twitter" data-tooltip="Twitter" aria-label="Twitter" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a></li>
              <li><a href="#" class="is-youtube" data-tooltip="YouTube" aria-label="YouTube" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a></li>
              <li><a href="https://www.linkedin.com/in/brij-bhushan-pant-ba8000a4/" class="is-linkedin" data-tooltip="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a></li>
              <li><a href="#" class="is-gplus" data-tooltip="Google Plus" aria-label="Google Plus" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 8.5A6 6 0 1 0 15 12H9"/><path d="M19 8v6M16 11h6"/></svg></a></li>
            </ul>
            <p class="site-footer__tagline">Technology that connects <strong>people and ideas</strong></p>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="site-footer__bottom">
    <div class="container site-footer__bottom-inner">
      <p class="site-footer__copy">&copy; <span id="footerYear">2026</span> BrijHub Community &amp; Collaboration Services. All rights reserved.</p>
    </div>
  </div>
</footer>

<!-- Back to top -->
<button type="button" class="back-to-top" id="backToTop" aria-label="Back to top">
  <svg class="back-to-top__ring" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
    <circle class="back-to-top__track" cx="28" cy="28" r="24"/>
    <circle class="back-to-top__bar" cx="28" cy="28" r="24"/>
  </svg>
  <span class="back-to-top__arrows" aria-hidden="true">
    <svg class="back-to-top__arrow" viewBox="0 0 24 24"><polyline points="6 15 12 9 18 15"/></svg>
    <svg class="back-to-top__arrow" viewBox="0 0 24 24"><polyline points="6 15 12 9 18 15"/></svg>
  </span>
</button>
`;
