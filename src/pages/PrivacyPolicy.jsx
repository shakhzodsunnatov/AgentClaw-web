import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const sections = [
  { id: '1-information-we-collect', title: '1. Information We Collect' },
  { id: '2-how-we-use-your-information', title: '2. How We Use Your Information' },
  { id: '3-ai-agent-data-and-workspace', title: '3. AI Agent Data and Workspace' },
  { id: '4-data-sharing-and-disclosure', title: '4. Data Sharing and Disclosure' },
  { id: '5-data-retention', title: '5. Data Retention' },
  { id: '6-data-security', title: '6. Data Security' },
  { id: '7-your-rights', title: '7. Your Rights' },
  { id: '8-app-tracking-transparency', title: '8. App Tracking Transparency (ATT)' },
  { id: '9-push-notifications', title: '9. Push Notifications' },
  { id: '10-childrens-privacy', title: '10. Children\'s Privacy' },
  { id: '11-international-data-transfers', title: '11. International Data Transfers' },
  { id: '12-third-party-links', title: '12. Third-Party Links and Services' },
  { id: '13-changes', title: '13. Changes to This Policy' },
  { id: '14-contact-us', title: '14. Contact Us' },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    document.title = 'Privacy Policy — AgentClaw';
    
    const handleScroll = () => {
      const pageYOffset = window.scrollY;
      let newActiveSection = null;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop - 120; // Accounts for sticky header + some margin
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
          <h1>Privacy Policy</h1>
          <p>Effective Date: March 10, 2026</p>
        </div>

        <div className="document-content">
          <p>
            AgentClaw ("we," "our," or "us") operates the AgentClaw mobile application (the "App") and the website at agent-claw.app (the "Site"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App or Site.
          </p>
          <p>
            Please read this policy carefully. If you disagree with its terms, please discontinue use of the App immediately.
          </p>

          <hr />

          <section id="1-information-we-collect">
            <h2>1. Information We Collect</h2>
            
            <h3>1.1 Information You Provide Directly</h3>
            <ul>
              <li><strong>Account Information:</strong> When you register, we collect your name, email address, and profile photo via Google Sign-In or Apple Sign-In. We do not store your Google or Apple credentials — authentication is handled entirely by those providers.</li>
              <li><strong>Payment Information:</strong> Subscription purchases are processed through Apple's in-app purchase system and managed by RevenueCat. We never receive, store, or have access to your credit card or payment method details.</li>
              <li><strong>User-Generated Content:</strong> Messages you send to your AI agents, files you upload to agent workspaces, and any content you create within the App are stored on our servers to provide the service.</li>
              <li><strong>Bot Configuration:</strong> Names, descriptions, selected AI models, installed skills, and other configuration data for AI agents you create.</li>
            </ul>

            <h3>1.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage Data:</strong> We collect information about how you interact with the App, including features used, pages viewed, session duration, and in-app events. This is collected via AppsFlyer (analytics) and Firebase Analytics.</li>
              <li><strong>Device Information:</strong> Device type, operating system version, unique device identifiers, IP address, and mobile network information.</li>
              <li><strong>Crash Reports:</strong> If the App crashes, we collect diagnostic data including stack traces, device state, and app version via Sentry. This data does not include message content.</li>
              <li><strong>Push Notification Tokens:</strong> Firebase Cloud Messaging (FCM) tokens to deliver push notifications about your agent activity.</li>
              <li><strong>App Install Attribution:</strong> AppsFlyer collects data to understand which marketing channels drove app installs, subject to your App Tracking Transparency (ATT) consent.</li>
            </ul>

            <h3>1.3 Information from Third-Party Services</h3>
            <ul>
              <li><strong>Google Sign-In:</strong> Your Google profile name, email, and profile picture.</li>
              <li><strong>Apple Sign-In:</strong> Your Apple ID email (or a relay email if you use "Hide My Email") and name.</li>
              <li><strong>RevenueCat:</strong> Subscription status, product identifiers (com.clawbot.lite, com.clawbot.pro, com.clawbot.max), purchase timestamps, and renewal status.</li>
            </ul>
          </section>

          <section id="2-how-we-use-your-information">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li><strong>Provide and maintain the Service:</strong> Process your requests, run your AI agents, deliver responses, and manage your workspace.</li>
              <li><strong>Process Subscriptions:</strong> Verify your subscription tier (Free, Lite, Pro, Max) and enforce message quotas accordingly.</li>
              <li><strong>Send Notifications:</strong> Push notifications about agent task completions, cron job results, and account updates.</li>
              <li><strong>Improve the Service:</strong> Analyze usage patterns to fix bugs, improve performance, and develop new features.</li>
              <li><strong>Attribution and Marketing:</strong> Understand which channels bring new users (subject to ATT consent) to optimize marketing spend.</li>
              <li><strong>Safety and Fraud Prevention:</strong> Detect abuse, enforce our Terms of Service, and protect the integrity of the platform.</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws, respond to legal requests, and enforce our agreements.</li>
            </ul>
            <p>We do <strong>not</strong> sell your personal data to third parties. We do <strong>not</strong> use your agent conversation content to train AI models.</p>
          </section>

          <section id="3-ai-agent-data-and-workspace">
            <h2>3. AI Agent Data and Workspace</h2>
            <p>When you create an AI agent, the agent operates within an isolated Docker container on our servers. The following applies:</p>
            <ul>
              <li><strong>Messages:</strong> Your chat messages and agent responses are stored in our database to provide conversation history.</li>
              <li><strong>Workspace Files:</strong> Files created or edited by your agent within its workspace are stored on our servers and associated with your account.</li>
              <li><strong>Web Browsing:</strong> When an agent browses the web or fetches URLs at your instruction, those URLs and fetched content may be logged for debugging purposes.</li>
              <li><strong>Third-Party API Calls:</strong> When agents use skills (e.g., GitHub, Slack, weather), your configured API keys for those services are stored encrypted and used only to execute your requests.</li>
              <li><strong>Data Isolation:</strong> Each agent's workspace is fully isolated from other users' agents.</li>
            </ul>
          </section>

          <section id="4-data-sharing-and-disclosure">
            <h2>4. Data Sharing and Disclosure</h2>
            <p>We share your information only in the following circumstances:</p>

            <h3>4.1 Service Providers</h3>
            <p>We share data with trusted third-party vendors who help us operate the Service:</p>
            
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Purpose</th>
                    <th>Privacy Policy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apple (App Store / Sign-In)</td>
                    <td>Authentication, payments</td>
                    <td>apple.com/privacy</td>
                  </tr>
                  <tr>
                    <td>Google (Firebase, Sign-In)</td>
                    <td>Authentication, analytics, crash reporting, push notifications</td>
                    <td>policies.google.com/privacy</td>
                  </tr>
                  <tr>
                    <td>RevenueCat</td>
                    <td>Subscription management</td>
                    <td>revenuecat.com/privacy</td>
                  </tr>
                  <tr>
                    <td>AppsFlyer</td>
                    <td>Mobile attribution and analytics</td>
                    <td>appsflyer.com/privacy</td>
                  </tr>
                  <tr>
                    <td>Sentry</td>
                    <td>Crash reporting and performance monitoring</td>
                    <td>sentry.io/privacy</td>
                  </tr>
                  <tr>
                    <td>Hetzner Online GmbH</td>
                    <td>Cloud hosting (servers in Germany, EU)</td>
                    <td>hetzner.com/legal/privacy-policy</td>
                  </tr>
                  <tr>
                    <td>Anthropic / OpenAI / OpenRouter</td>
                    <td>AI model inference (your messages are sent to AI providers to generate responses)</td>
                    <td>See respective provider policies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>4.2 Legal Requirements</h3>
            <p>We may disclose your information if required by law, court order, or government request, or if we believe disclosure is necessary to protect our rights, prevent fraud, or ensure user safety.</p>

            <h3>4.3 Business Transfers</h3>
            <p>If we are acquired, merge with another company, or sell assets, your information may be transferred as part of that transaction. We will notify you before your data becomes subject to a different privacy policy.</p>

            <h3>4.4 Aggregated / De-identified Data</h3>
            <p>We may share aggregated, anonymized data that cannot reasonably identify you with partners, investors, or in public communications.</p>
          </section>

          <section id="5-data-retention">
            <h2>5. Data Retention</h2>
            <ul>
              <li><strong>Account Data:</strong> Retained for as long as your account is active. If you delete your account, we delete your data within 30 days, except where retention is required by law.</li>
              <li><strong>Conversation History:</strong> Retained as long as your account is active. You can delete individual conversations within the App.</li>
              <li><strong>Crash Reports (Sentry):</strong> Retained for 90 days.</li>
              <li><strong>Analytics Data (AppsFlyer):</strong> Retained per AppsFlyer's data retention policy (typically 24 months).</li>
              <li><strong>Billing Records:</strong> Retained for 7 years for accounting and tax compliance purposes (no card data — only transaction records).</li>
            </ul>
          </section>

          <section id="6-data-security">
            <h2>6. Data Security</h2>
            <p>We implement industry-standard security measures:</p>
            <ul>
              <li><strong>Encryption in Transit:</strong> All data transmitted between your device and our servers uses TLS 1.2+.</li>
              <li><strong>Encryption at Rest:</strong> Sensitive fields (e.g., third-party API keys you configure for agent skills) are encrypted at rest.</li>
              <li><strong>Access Controls:</strong> Our production database is accessible only to authorized personnel via authenticated SSH with key-based access.</li>
              <li><strong>Isolated Containers:</strong> Each AI agent runs in an isolated Docker container with no network access to other users' containers.</li>
            </ul>
            <p>No method of transmission or storage is 100% secure. We cannot guarantee absolute security of your data.</p>
          </section>

          <section id="7-your-rights">
            <h2>7. Your Rights</h2>
            
            <h3>7.1 All Users</h3>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data.</li>
              <li><strong>Data Portability:</strong> Request your data in a machine-readable format.</li>
            </ul>

            <h3>7.2 GDPR (EEA/UK Residents)</h3>
            <p>In addition to the above, you have the right to:</p>
            <ul>
              <li><strong>Object</strong> to processing of your data for direct marketing.</li>
              <li><strong>Restrict</strong> processing in certain circumstances.</li>
              <li><strong>Lodge a complaint</strong> with your local supervisory authority (e.g., your national Data Protection Authority).</li>
            </ul>
            <p>Our legal bases for processing: (a) <strong>Contract performance</strong> — processing necessary to provide the Service; (b) <strong>Legitimate interests</strong> — analytics and fraud prevention; (c) <strong>Consent</strong> — marketing communications and tracking (ATT).</p>

            <h3>7.3 CCPA (California Residents)</h3>
            <p>California residents have the right to:</p>
            <ul>
              <li>Know what personal information is collected.</li>
              <li>Know whether personal information is sold or disclosed (we do not sell personal information).</li>
              <li>Opt out of the sale of personal information (not applicable — we do not sell data).</li>
              <li>Request deletion of personal information.</li>
              <li>Not be discriminated against for exercising these rights.</li>
            </ul>
            <p>To exercise any of these rights, email us at: <strong>privacy@agent-claw.app</strong></p>
          </section>

          <section id="8-app-tracking-transparency">
            <h2>8. App Tracking Transparency (ATT)</h2>
            <p>On iOS 14.5+, we request your permission before collecting data used for advertising attribution via Apple's App Tracking Transparency framework. This affects AppsFlyer's ability to measure which marketing campaigns brought you to the App.</p>
            <p>If you deny this permission:</p>
            <ul>
              <li>The App functions fully and without restriction.</li>
              <li>AppsFlyer uses probabilistic attribution methods that do not track you personally.</li>
              <li>Your agent conversations, subscription, and all App features remain completely unaffected.</li>
            </ul>
            <p>You can change your ATT preference at any time in: <strong>Settings → Privacy & Security → Tracking → AgentClaw</strong></p>
          </section>

          <section id="9-push-notifications">
            <h2>9. Push Notifications</h2>
            <p>We use Firebase Cloud Messaging (FCM) to send notifications about:</p>
            <ul>
              <li>AI agent task completions and cron job results.</li>
              <li>Subscription renewal reminders.</li>
              <li>Product updates (optional, with your consent).</li>
            </ul>
            <p>You can disable push notifications at any time in: <strong>Settings → Notifications → AgentClaw</strong></p>
          </section>

          <section id="10-childrens-privacy">
            <h2>10. Children's Privacy</h2>
            <p>AgentClaw is not directed to children under 17 years of age. We do not knowingly collect personal information from children under 17. If we learn we have inadvertently collected such information, we will promptly delete it. If you believe a child under 17 has provided us with personal information, contact us at privacy@agent-claw.app.</p>
          </section>

          <section id="11-international-data-transfers">
            <h2>11. International Data Transfers</h2>
            <p>Our primary servers are hosted on Hetzner in Germany (EU). If you are located outside the EU, your data is transferred to and processed in Germany. By using the App, you consent to this transfer.</p>
            <p>For EEA residents: data transfers to non-EEA countries (e.g., AI model providers in the US) are made under Standard Contractual Clauses (SCCs) or other appropriate safeguards.</p>
          </section>

          <section id="12-third-party-links">
            <h2>12. Third-Party Links and Services</h2>
            <p>The App allows agents to browse the web and interact with third-party services. We are not responsible for the privacy practices of those third-party websites or services. This policy applies only to information collected by AgentClaw directly.</p>
          </section>

          <section id="13-changes">
            <h2>13. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of material changes by:</p>
            <ul>
              <li>Posting the new policy in the App with a prominent notice.</li>
              <li>Sending a push notification or email (if you have notifications enabled).</li>
              <li>Updating the "Last Updated" date at the top of this page.</li>
            </ul>
            <p>Your continued use of the App after changes become effective constitutes acceptance of the updated policy.</p>
          </section>

          <section id="14-contact-us">
            <h2>14. Contact Us</h2>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy, contact us at:</p>
            <p>
              <strong>AgentClaw (operated by Shakhzod Sunnatov)</strong><br />
              Email: <strong>privacy@agent-claw.app</strong><br />
              Website: <strong>https://agent-claw.app</strong><br />
              Response time: Within 30 days (typically within 5 business days)
            </p>
            <p>For GDPR-related inquiries, you may also contact us at the same email with "GDPR Request" in the subject line.</p>
          </section>

        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
