import { SERVER_CONFIG } from '@/config/constants';
import { PageContainer, BackToHomepage } from '@/components/ui';

export default function TermsOfServicePage() {
  return (
    <PageContainer maxWidth="4xl">
        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5 rounded-xl"></div>
          <div className="relative p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-cyan-100/70 text-sm mt-2">Last updated: September 2025</p>
          </div>
          <div className="relative p-6 space-y-6 text-cyan-100/90 text-sm leading-relaxed">
            
            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">1. Acceptance of Terms</h2>
              <p className="mb-3">By accessing and playing on {SERVER_CONFIG.name} (&quot;{SERVER_CONFIG.shortName}&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
              <p><strong className="text-red-400">Age Requirement:</strong> You must be at least 18 years of age to register and play on this server. We do not knowingly accept registrations from minors under 18 years of age.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">2. Private Server Disclaimer</h2>
              <p className="mb-3">
                {SERVER_CONFIG.shortName} is a private server and is not affiliated with, endorsed by, or connected to the original Myth War developers or publishers. This is a fan-operated community server.
              </p>
              <p>
                We do not own the intellectual property rights to the Myth War game client, assets, or original content. All rights belong to their respective owners.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">3. User Conduct</h2>
              <p className="mb-2">Players agree not to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use cheats, hacks, bots, or exploits</li>
                <li>Engage in harassment, abuse, or discriminatory behavior</li>
                <li>Share accounts or engage in real money trading</li>
                <li>Spam, advertise, or solicit other players</li>
                <li>Attempt to disrupt server operations or other players&apos; gameplay</li>
                <li>Use offensive language or inappropriate character/guild names</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">4. Account and Character Policy</h2>
              <p className="mb-3">
                You may create up to {SERVER_CONFIG.maxLevel === 100 ? '5' : '4'} characters per account. Account sharing is prohibited and may result in permanent suspension.
              </p>
              <p>
                We reserve the right to delete inactive characters and accounts after extended periods of inactivity (typically 6+ months).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">5. Server Availability</h2>
              <p className="mb-3">
                We strive to maintain high server uptime but cannot guarantee 100% availability. The server may undergo maintenance, updates, or experience technical issues that temporarily interrupt service.
              </p>
              <p>
                We are not liable for any loss of in-game progress, items, or characters due to server issues, rollbacks, or other technical problems.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">6. Donations and Virtual Items</h2>
              <p className="mb-3">
                Any donations made to support the server are voluntary contributions to help cover operating costs. Donations are non-refundable.
              </p>
              <p>
                Virtual items or benefits received through donations have no real-world value and cannot be exchanged for real money.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">7. Enforcement and Penalties</h2>
              <p className="mb-2">Violations of these terms may result in:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Warning or temporary suspension</li>
                <li>Character deletion or rollback</li>
                <li>Permanent account ban</li>
                <li>IP ban from server and community platforms</li>
              </ul>
              <p className="mt-3">All disciplinary actions are at the sole discretion of the server administration.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">8. Data and Privacy</h2>
              <p>
                We collect minimal data necessary for game operation. See our Privacy Policy for detailed information about data collection and usage.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">9. Limitation of Liability</h2>
              <p className="mb-3">
                {SERVER_CONFIG.shortName} is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from your use of our services.
              </p>
              <p>
                The server operators assume no responsibility for any harm to your computer, loss of data, or other damages resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-cyan-300 mb-3">11. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us through our Discord server or in-game using the @gm command.
              </p>
            </section>

          </div>
        </div>

      <BackToHomepage className="mt-8" />
    </PageContainer>
  );
}