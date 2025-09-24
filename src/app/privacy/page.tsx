import { SERVER_CONFIG } from '@/config/constants';
import { PageContainer, BackToHomepage } from '@/components/ui';

export default function PrivacyPolicyPage() {
  return (
    <PageContainer maxWidth="4xl">
        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5 rounded-xl"></div>
          <div className="relative p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-cyan-100/70 text-sm mt-2">Last updated: September 2025</p>
          </div>
          <div className="relative p-6 space-y-6 text-cyan-100/90 text-sm leading-relaxed">
            
            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                {SERVER_CONFIG.name} ("{SERVER_CONFIG.shortName}") collects minimal information necessary to operate the game server and provide our services.
              </p>
              
              <h3 className="font-semibold text-cyan-400 mb-2">Account Information:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>Username and password (encrypted)</li>
                <li>Email address (if provided)</li>
                <li>Account creation date and last login time</li>
                <li>In-game character names and progression data</li>
              </ul>

              <h3 className="font-semibold text-cyan-400 mb-2">Technical Information:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>IP address for connection and security purposes</li>
                <li>Game client version and basic system information</li>
                <li>Connection logs and gameplay statistics</li>
                <li>Chat messages and in-game communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">2. How We Use Your Information</h2>
              <p className="mb-2">We use collected information to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide and maintain game services</li>
                <li>Authenticate user accounts and prevent unauthorized access</li>
                <li>Monitor for cheating, exploitation, and rule violations</li>
                <li>Improve server performance and gameplay experience</li>
                <li>Communicate important server updates and announcements</li>
                <li>Respond to support requests and technical issues</li>
                <li>Maintain game balance and fair play</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">3. Information Sharing</h2>
              <p className="mb-3">
                We do not sell, trade, or transfer your personal information to third parties. Your data remains within our server infrastructure.
              </p>
              <p className="mb-2">We may share information only in these limited circumstances:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>To investigate suspected violations of our Terms of Service</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">4. Data Security</h2>
              <p className="mb-3">
                We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="mb-2">Our security practices include:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Password encryption and secure authentication</li>
                <li>Regular server security updates and monitoring</li>
                <li>Limited access to personal data by authorized personnel only</li>
                <li>Secure data transmission protocols</li>
              </ul>
              <p className="mt-3">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">5. Data Retention</h2>
              <p className="mb-3">
                We retain your information for as long as necessary to provide our services and comply with legal obligations.
              </p>
              <p className="mb-2">Specific retention periods:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Active account data: Retained while account is active</li>
                <li>Inactive accounts: May be deleted after 6+ months of inactivity</li>
                <li>Connection logs: Typically retained for 30-90 days</li>
                <li>Chat logs: Retained for moderation purposes (30-180 days)</li>
                <li>Violation records: Retained for enforcement purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">6. Cookies and Tracking</h2>
              <p className="mb-3">
                Our website may use basic cookies for functionality and analytics. We do not use tracking cookies for advertising purposes.
              </p>
              <p>
                The game client may store local configuration files and temporary data on your device for optimal performance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">7. Third-Party Services</h2>
              <p className="mb-3">
                We may use third-party services for server hosting, communication (Discord), or community features (Reddit). These services have their own privacy policies.
              </p>
              <p>
                We are not responsible for the privacy practices of external websites or services linked from our platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">8. Children's Privacy</h2>
              <p className="mb-3">
                Our services are restricted to adults only. <strong className="text-red-400">We require all users to be at least 18 years of age.</strong> We do not knowingly collect personal information from minors under 18 years of age.
              </p>
              <p className="mb-3">
                During registration, users must confirm they are 18 years or older. Any accounts found to belong to minors will be terminated immediately without notice.
              </p>
              <p>
                If we become aware that we have collected personal information from someone under 18 years of age, we will delete such information promptly and permanently ban the associated account.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">9. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and associated data</li>
                <li>Withdraw consent for data processing (where applicable)</li>
                <li>Export your game data (where technically feasible)</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us through Discord or in-game using the @gm command.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">10. International Users</h2>
              <p>
                Our servers may be located in various countries. By using our services, you consent to the transfer and processing of your information in countries that may have different data protection laws than your country of residence.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Significant changes will be announced through our website, Discord, or in-game notifications. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">12. Contact Information</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us through our Discord server or in-game using the @gm command.
              </p>
            </section>

          </div>
        </div>

      <BackToHomepage className="mt-8" />
    </PageContainer>
  );
}