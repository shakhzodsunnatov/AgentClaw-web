import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const sections = [
  { id: '1-eligibility', title: '1. Eligibility' },
  { id: '2-account-registration', title: '2. Account Registration' },
  { id: '3-description-of-service', title: '3. Description of Service' },
  { id: '4-subscription-plans-and-billing', title: '4. Subscription Plans and Billing' },
  { id: '5-acceptable-use-policy', title: '5. Acceptable Use Policy' },
  { id: '6-intellectual-property', title: '6. Intellectual Property' },
  { id: '7-third-party-services', title: '7. Third-Party Services and Skills' },
  { id: '8-privacy', title: '8. Privacy' },
  { id: '9-service-availability', title: '9. Service Availability and Uptime' },
  { id: '10-disclaimers', title: '10. Disclaimers' },
  { id: '11-limitation-of-liability', title: '11. Limitation of Liability' },
  { id: '12-indemnification', title: '12. Indemnification' },
  { id: '13-governing-law', title: '13. Governing Law and Disputes' },
  { id: '14-changes', title: '14. Changes to These Terms' },
  { id: '15-termination', title: '15. Termination' },
  { id: '16-miscellaneous', title: '16. Miscellaneous' },
  { id: '17-contact', title: '17. Contact' },
];

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    document.title = 'Terms of Service — AgentClaw';
    
    const handleScroll = () => {
      const pageYOffset = window.scrollY;
      let newActiveSection = null;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop - 120;
          if (pageYOffset >= offsetTop) {
            newActiveSection = section.id;
          }
        }
      });

      if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <>
      <Sidebar sections={sections} activeSection={activeSection} />
      <div className="document">
        <div className="document-header">
          <span className="last-updated">Last Updated: March 10, 2026</span>
          <h1>Terms of Service</h1>
          <p>Effective Date: March 10, 2026</p>
        </div>

        <div className="document-content">
          <p>
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and AgentClaw ("Company," "we," "our," or "us"), governing your access to and use of the AgentClaw mobile application and website at agent-claw.app (collectively, the "Service").
          </p>
          <p>
            By downloading, installing, or using AgentClaw, you agree to be bound by these Terms. If you do not agree, do not use the Service.
          </p>

          <hr />

          <section id="1-eligibility">
            <h2>1. Eligibility</h2>
            <p>You must be at least 17 years of age to use AgentClaw. By using the Service, you represent and warrant that:</p>
            <ul>
              <li>You are at least 17 years old.</li>
              <li>You have the legal capacity to enter into a binding agreement.</li>
              <li>Your use of the Service does not violate any applicable laws in your jurisdiction.</li>
              <li>If you are using the Service on behalf of a business or organization, you have authority to bind that entity to these Terms.</li>
            </ul>
          </section>

          <section id="2-account-registration">
            <h2>2. Account Registration</h2>
            
            <h3>2.1 Account Creation</h3>
            <p>You may register using Google Sign-In or Apple Sign-In. You are responsible for all activity that occurs under your account. You must:</p>
            <ul>
              <li>Provide accurate and complete information during registration.</li>
              <li>Maintain the security of your account credentials.</li>
              <li>Notify us immediately of any unauthorized access to your account at support@agent-claw.app.</li>
            </ul>

            <h3>2.2 Account Termination by You</h3>
            <p>You may delete your account at any time within the App (Settings → Delete Account) or by contacting support@agent-claw.app. Account deletion is permanent and irreversible. Upon deletion:</p>
            <ul>
              <li>Your active subscription will not be automatically cancelled — you must cancel it separately in your iOS subscription settings.</li>
              <li>Your agent data, messages, and workspace files will be permanently deleted within 30 days.</li>
            </ul>

            <h3>2.3 One Account Per User</h3>
            <p>You may not create multiple accounts to circumvent usage limits, subscription restrictions, or any enforcement action we have taken against a prior account.</p>
          </section>

          <section id="3-description-of-service">
            <h2>3. Description of Service</h2>
            <p>AgentClaw provides a platform that enables users to deploy personal AI agents ("Bots") powered by large language models. Each Bot:</p>
            <ul>
              <li>Runs in an isolated Docker container on our servers.</li>
              <li>Can execute autonomous tasks including web browsing, file management, terminal commands, and scheduled (cron) jobs.</li>
              <li>Can integrate with third-party services via installable Skills (e.g., GitHub, Slack, weather).</li>
            </ul>
            <p>We reserve the right to modify, suspend, or discontinue any feature of the Service at any time, with or without notice, provided we make commercially reasonable efforts to notify you of material changes.</p>
          </section>

          <section id="4-subscription-plans-and-billing">
            <h2>4. Subscription Plans and Billing</h2>
            
            <h3>4.1 Plans</h3>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Price</th>
                    <th>Messages/Month</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Free</td>
                    <td>$0</td>
                    <td>10 (one-time at registration)</td>
                    <td>No credit card required</td>
                  </tr>
                  <tr>
                    <td>Lite</td>
                    <td>$29.99/month</td>
                    <td>60</td>
                    <td>Auto-renewable</td>
                  </tr>
                  <tr>
                    <td>Pro</td>
                    <td>$49.99/month</td>
                    <td>200</td>
                    <td>Auto-renewable</td>
                  </tr>
                  <tr>
                    <td>Max</td>
                    <td>$89.99/month</td>
                    <td>500</td>
                    <td>Auto-renewable</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>"Messages" are counted as each exchange initiated by you to a Bot (your message + the Bot's response = 1 message). Tool calls executed autonomously by the Bot within a single response do not count as additional messages.</p>

            <h3>4.2 Payment and Billing</h3>
            <p>All paid subscriptions are processed through Apple's App Store in-app purchase system. By subscribing, you agree to Apple's terms for in-app purchases. Payment is charged to your Apple ID account upon subscription confirmation.</p>

            <h3>4.3 Automatic Renewal</h3>
            <p>Subscriptions automatically renew at the end of each billing period (monthly) unless cancelled at least 24 hours before the renewal date. You will be charged the applicable plan price through your Apple ID account upon renewal.</p>

            <h3>4.4 How to Cancel</h3>
            <p>To cancel your subscription:</p>
            <ol>
              <li>Open the <strong>Settings</strong> app on your iPhone.</li>
              <li>Tap your Apple ID at the top.</li>
              <li>Tap <strong>Subscriptions</strong>.</li>
              <li>Select <strong>AgentClaw</strong> and tap <strong>Cancel Subscription</strong>.</li>
            </ol>
            <p>Cancellation takes effect at the end of the current billing period. You retain access to your paid tier features until then.</p>

            <h3>4.5 Refund Policy</h3>
            <p>All purchases are made through Apple's App Store. <strong>Refunds are governed by Apple's refund policy</strong>, not by AgentClaw. To request a refund:</p>
            <ul>
              <li>Go to <strong>reportaproblem.apple.com</strong>.</li>
              <li>Apple grants refunds at their sole discretion.</li>
            </ul>
            <p>We do not offer refunds for partial months, unused messages, or unused subscription periods. If you believe there is a billing error, contact us at billing@agent-claw.app and we will work with Apple on your behalf.</p>

            <h3>4.6 Price Changes</h3>
            <p>We reserve the right to change subscription prices. We will notify you at least 30 days before a price increase. If you do not cancel before the new price takes effect, your continued subscription constitutes acceptance of the new price.</p>

            <h3>4.7 Free Tier Limitations</h3>
            <p>The free tier provides 10 messages at account registration. These messages do not expire and do not renew. Once exhausted, you must subscribe to a paid plan to continue using AI agents.</p>
          </section>

          <section id="5-acceptable-use-policy">
            <h2>5. Acceptable Use Policy</h2>
            
            <h3>5.1 Permitted Uses</h3>
            <p>You may use AgentClaw to:</p>
            <ul>
              <li>Automate personal productivity tasks.</li>
              <li>Research and gather information.</li>
              <li>Develop software and perform code-related tasks.</li>
              <li>Integrate with third-party services for legitimate business purposes.</li>
              <li>Any other lawful purpose consistent with these Terms.</li>
            </ul>

            <h3>5.2 Prohibited Uses</h3>
            <p>You must not use AgentClaw to:</p>
            
            <p><strong>Illegal Activities:</strong></p>
            <ul>
              <li>Engage in any activity that violates applicable laws or regulations.</li>
              <li>Infringe intellectual property rights of third parties.</li>
              <li>Engage in fraud, phishing, or identity theft.</li>
              <li>Generate or distribute content that is illegal in your jurisdiction.</li>
            </ul>

            <p><strong>Harmful Content:</strong></p>
            <ul>
              <li>Generate, distribute, or promote child sexual abuse material (CSAM) or any content sexualizing minors.</li>
              <li>Create content that facilitates violence, terrorism, or harm to individuals or groups.</li>
              <li>Generate hate speech targeting protected characteristics (race, religion, gender, sexual orientation, disability, etc.).</li>
              <li>Produce deepfakes or non-consensual synthetic intimate imagery.</li>
            </ul>

            <p><strong>Platform Abuse:</strong></p>
            <ul>
              <li>Attempt to circumvent message quotas through multiple accounts or other means.</li>
              <li>Reverse-engineer, decompile, or attempt to extract our source code or backend systems.</li>
              <li>Use automated scripts or bots to interact with the App outside of its intended functionality.</li>
              <li>Conduct denial-of-service attacks or attempt to overload our infrastructure.</li>
              <li>Use agent capabilities to attack, scrape, or harm third-party systems without authorization.</li>
              <li>Resell access to AgentClaw without our explicit written consent.</li>
            </ul>

            <p><strong>Misinformation and Deception:</strong></p>
            <ul>
              <li>Use the Service to generate and distribute deliberate disinformation at scale.</li>
              <li>Impersonate individuals, organizations, or AI systems in a harmful manner.</li>
            </ul>

            <h3>5.3 AI Model Provider Policies</h3>
            <p>When using AgentClaw, your requests are processed by third-party AI model providers (Anthropic, OpenAI, and others via OpenRouter). You must also comply with those providers' acceptable use policies. We are not responsible for AI model outputs but will enforce appropriate use policies.</p>

            <h3>5.4 Enforcement</h3>
            <p>We reserve the right to investigate suspected violations of this Acceptable Use Policy. Upon finding a violation, we may:</p>
            <ul>
              <li>Issue a warning.</li>
              <li>Temporarily suspend your account.</li>
              <li>Permanently terminate your account without refund.</li>
              <li>Report illegal activity to appropriate law enforcement authorities.</li>
            </ul>
          </section>

          <section id="6-intellectual-property">
            <h2>6. Intellectual Property</h2>
            
            <h3>6.1 Our Property</h3>
            <p>The AgentClaw App, website, branding, code, design, and all related intellectual property are owned by us or our licensors. Nothing in these Terms grants you any right to use our trademarks, logos, or proprietary content.</p>

            <h3>6.2 Your Content</h3>
            <p>You retain ownership of all content you create and input into the Service ("User Content"), including messages, files, and agent configurations. By using the Service, you grant us a limited, non-exclusive, royalty-free license to process, store, and transmit your User Content solely to provide the Service.</p>

            <h3>6.3 AI-Generated Content</h3>
            <p>Content generated by AI agents in response to your instructions ("Agent Output") is provided to you. We make no claims of ownership over Agent Output. We do not warrant that Agent Output is accurate, original, or non-infringing of third-party rights. You are responsible for how you use Agent Output.</p>

            <h3>6.4 Feedback</h3>
            <p>If you provide us with feedback, suggestions, or ideas about the Service, you grant us an irrevocable, perpetual, royalty-free license to use and incorporate such feedback without obligation to you.</p>
          </section>

          <section id="7-third-party-services">
            <h2>7. Third-Party Services and Skills</h2>
            <p>The Service allows integration with third-party services via the Skills marketplace (e.g., GitHub, Slack, weather APIs). We are not responsible for:</p>
            <ul>
              <li>The availability, accuracy, or reliability of third-party services.</li>
              <li>Actions taken by your agent against third-party services.</li>
              <li>Costs incurred on third-party platforms as a result of agent activity.</li>
            </ul>
            <p>You are responsible for obtaining proper authorization before your agent accesses third-party accounts or services. Do not configure agent skills with credentials belonging to third parties without their explicit consent.</p>
          </section>

          <section id="8-privacy">
            <h2>8. Privacy</h2>
            <p>Your use of the Service is also governed by our Privacy Policy, available at <strong>https://agent-claw.app/privacy</strong>, which is incorporated into these Terms by reference.</p>
          </section>

          <section id="9-service-availability">
            <h2>9. Service Availability and Uptime</h2>
            <p>We target 99% uptime for the AgentClaw API. However, we do not guarantee uninterrupted availability. The Service may be unavailable due to:</p>
            <ul>
              <li>Scheduled maintenance (we aim to schedule during low-traffic periods).</li>
              <li>Unplanned outages or infrastructure issues.</li>
              <li>Issues with third-party AI model providers.</li>
              <li>Force majeure events.</li>
            </ul>
            <p>We will make commercially reasonable efforts to notify users of extended planned downtime via push notification or email. Message quotas are not adjusted for downtime periods, but we may issue credits at our discretion for significant, documented outages.</p>
          </section>

          <section id="10-disclaimers">
            <h2>10. Disclaimers</h2>
            <p><strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</strong></p>
            <p>We specifically disclaim:</p>
            <ul>
              <li>Any warranty that the Service will be error-free, uninterrupted, or meet your requirements.</li>
              <li>Any warranty regarding the accuracy, reliability, or completeness of AI-generated content.</li>
              <li>Any warranty that AI agent actions will achieve your intended outcomes.</li>
              <li>Any implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</li>
            </ul>
            <p>You use AI agent capabilities — including web browsing, file operations, terminal commands, and third-party integrations — at your own risk. Always review agent actions before they affect important systems or data.</p>
          </section>

          <section id="11-limitation-of-liability">
            <h2>11. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</p>
            <p><strong>WE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES</strong>, including but not limited to: loss of profits, loss of data, loss of business, or costs of substitute services, arising out of or related to your use of the Service.</p>
            <p><strong>OUR TOTAL CUMULATIVE LIABILITY</strong> to you for any claims arising out of or related to these Terms or the Service, regardless of the form of action, will not exceed the <strong>greater of (a) the amount you paid us in the 3 months preceding the claim, or (b) $50 USD</strong>.</p>
            <p>Some jurisdictions do not allow exclusion of certain warranties or limitations on liability. In such cases, our liability will be limited to the maximum extent permitted by law.</p>
          </section>

          <section id="12-indemnification">
            <h2>12. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless AgentClaw and its operators, employees, contractors, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to:</p>
            <ul>
              <li>Your use of the Service in violation of these Terms.</li>
              <li>User Content you submit to the Service.</li>
              <li>Actions taken by your AI agents.</li>
              <li>Your violation of any third-party rights.</li>
              <li>Your violation of any applicable law or regulation.</li>
            </ul>
          </section>

          <section id="13-governing-law">
            <h2>13. Governing Law and Disputes</h2>
            <p>These Terms are governed by the laws of the jurisdiction in which the Company operates, without regard to conflict of law principles.</p>
            <p><strong>For users in the European Union or United Kingdom:</strong> Nothing in these Terms limits your statutory rights as a consumer under applicable EU/UK law. You may also submit disputes to your national consumer protection authority or use the EU Online Dispute Resolution platform at https://ec.europa.eu/consumers/odr.</p>
            <p><strong>Informal Resolution:</strong> Before pursuing formal legal action, please contact us at support@agent-claw.app. We will attempt to resolve disputes informally within 30 days.</p>
          </section>

          <section id="14-changes">
            <h2>14. Changes to These Terms</h2>
            <p>We may update these Terms at any time. We will notify you of material changes by:</p>
            <ul>
              <li>Displaying a notice in the App.</li>
              <li>Sending a push notification.</li>
              <li>Updating the "Last Updated" date above.</li>
            </ul>
            <p>Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms. If you do not agree with updated Terms, stop using the Service and cancel your subscription.</p>
          </section>

          <section id="15-termination">
            <h2>15. Termination</h2>
            
            <h3>15.1 Termination by You</h3>
            <p>You may stop using the Service and delete your account at any time.</p>

            <h3>15.2 Termination by Us</h3>
            <p>We may suspend or terminate your access immediately, without prior notice, if:</p>
            <ul>
              <li>You violate these Terms or our Acceptable Use Policy.</li>
              <li>We are required to do so by law.</li>
              <li>We discontinue the Service.</li>
            </ul>
            <p>Upon termination for cause, no refunds will be issued for any remaining subscription period.</p>

            <h3>15.3 Effect of Termination</h3>
            <p>Upon account termination, your right to use the Service ceases immediately. Sections 6 (Intellectual Property), 10 (Disclaimers), 11 (Limitation of Liability), 12 (Indemnification), and 13 (Governing Law) survive termination.</p>
          </section>

          <section id="16-miscellaneous">
            <h2>16. Miscellaneous</h2>
            <ul>
              <li><strong>Entire Agreement:</strong> These Terms, together with the Privacy Policy, constitute the entire agreement between you and us regarding the Service.</li>
              <li><strong>Severability:</strong> If any provision of these Terms is held invalid, the remaining provisions will continue in full force.</li>
              <li><strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be deemed a waiver.</li>
              <li><strong>Assignment:</strong> You may not assign your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations freely.</li>
              <li><strong>No Agency:</strong> Nothing in these Terms creates a partnership, joint venture, or employment relationship between you and us.</li>
            </ul>
          </section>

          <section id="17-contact">
            <h2>17. Contact</h2>
            <p>For questions about these Terms, contact us at:</p>
            <p>
              <strong>AgentClaw</strong><br />
              Email: <strong>support@agent-claw.app</strong><br />
              Website: <strong>https://agent-claw.app</strong>
            </p>
            <p>
              For billing issues: <strong>billing@agent-claw.app</strong><br />
              For privacy requests: <strong>privacy@agent-claw.app</strong><br />
              For legal notices: <strong>legal@agent-claw.app</strong>
            </p>
          </section>

        </div>
      </div>
    </>
  );
};

export default TermsOfService;
