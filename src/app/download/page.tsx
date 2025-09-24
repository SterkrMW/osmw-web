import Link from 'next/link';
import { DISCORD_INVITE_URL, SERVER_CONFIG } from '@/config/constants';
import { PageContainer, BackToHomepage, GlassCard, InteractiveRow, GradientButton, Button } from '@/components/ui';

export default function DownloadPage() {
  return (
    <PageContainer>
      <div className="space-y-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Download */}
        <div className="lg:col-span-2 space-y-8">
          {/* Client Download */}
          <GlassCard title="⬇️ Client Download">
            <InteractiveRow variant="bordered">
              <h3 className="text-cyan-100 font-semibold text-lg mb-2 flex items-center gap-2">🎮 Client Requirements</h3>
              <p className="text-cyan-100/70 text-sm mb-3">You&apos;ll need the official Myth War client to connect to our server. The best place to start is our Discord server.</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-cyan-300/60 space-y-1">
                  <div>🔄 Required Version: {SERVER_CONFIG.clientVersion}</div>
                  <div>📋 Optional patch available</div>
                </div>
                <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
                  <GradientButton variant="primary">
                    Join Discord
                  </GradientButton>
                </a>
              </div>
            </InteractiveRow>
          </GlassCard>

          {/* Installation Instructions */}
          <GlassCard title="📋 Installation Instructions">
            <div className="space-y-4">
              <div className="border-l-4 border-lime-400/60 pl-4 bg-lime-900/10 rounded-r-lg p-3">
                <h3 className="font-semibold text-lime-300 mb-2">Step 1: Get the Official Client</h3>
                <p className="text-cyan-100/70 text-sm">You&apos;ll need the official Myth War client version {SERVER_CONFIG.clientVersion} to connect to our server.</p>
              </div>
              <div className="border-l-4 border-cyan-400/60 pl-4 bg-cyan-900/10 rounded-r-lg p-3">
                <h3 className="font-semibold text-cyan-300 mb-2">Step 2: Join Our Discord</h3>
                <p className="text-cyan-100/70 text-sm">
                  <a 
                    href="https://www.mediafire.com/file_premium/dyf5um81mnq6k5y/Door.DAT/file" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-200 font-medium underline"
                  >
                    Download the Door.Dat
                  </a>
                </p>
              </div>
              <div className="border-l-4 border-teal-400/60 pl-4 bg-teal-900/10 rounded-r-lg p-3">
                <h3 className="font-semibold text-teal-300 mb-2">Step 3: Install the Door.Dat</h3>
                <p className="text-cyan-100/70 text-sm">Drag and drop the Door.Dat file into your Myth War client installation .folder.</p>
              </div>
              <div className="border-l-4 border-emerald-400/60 pl-4 bg-emerald-900/10 rounded-r-lg p-3">
                <h3 className="font-semibold text-emerald-300 mb-2">Step 4: Create Account</h3>
                <p className="text-cyan-100/70 text-sm">
                  If you don&apos;t have an account yet, 
                  <Link href="/register" className="text-cyan-300 hover:text-cyan-200 ml-1 font-medium">click here to register</Link>.
                </p>
              </div>
              <div className="border-l-4 border-emerald-400/60 pl-4 bg-emerald-900/10 rounded-r-lg p-3">
                <h3 className="font-semibold text-emerald-300 mb-2">Step 5: Optionally, Download and Apply the Patch</h3>
                <p className="text-cyan-100/70 text-sm">
                  <a 
                    href="https://www.mediafire.com/file_premium/hju84oiox9tcb3r/patch.zip/file" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-200 font-medium underline"
                  >
                    Download the patch.zip
                  </a> and extract it to your Myth War client installation folder. Drag and drop the main.exe onto the apply-batch.bat file.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* System Requirements */}
          <GlassCard title="🖥️ System Requirements" variant="compact">
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-lime-400 mb-2">Minimum Requirements:</div>
                <div className="text-cyan-100/80 space-y-1 text-sm">
                  <div>OS: Windows 98 (DirectX 8.0)</div>
                  <div>CPU: Pentium III 800 MHz</div>
                  <div>RAM: 128 MB</div>
                  <div>GPU: TNT2</div>
                  <div>Storage: 1 GB</div>
                </div>
              </div>
              <div>
                <div className="font-semibold text-cyan-300 mb-2">Recommended Requirements:</div>
                <div className="text-cyan-100/80 space-y-1 text-sm">
                  <div>OS: Windows XP (DirectX 9.0)</div>
                  <div>CPU: Pentium IV 1.0 GHz</div>
                  <div>RAM: 256 MB</div>
                  <div>GPU: GeForce 2 MX</div>
                  <div>Storage: 1.5 GB</div>
                </div>
              </div>
              <div className="pt-3 border-t border-cyan-500/20">
                <p className="text-cyan-100/70 text-xs">
                  <span className="font-semibold text-cyan-300">Note:</span> All Windows versions up to and including Windows 11 are supported.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Help Links */}
          <GlassCard title="🆘 Need Help?" variant="compact">
            <div className="space-y-3">
              <Link href="/guides" className="block">
                <Button variant="secondary" fullWidth size="md">
                  📚 Installation Guide
                </Button>
              </Link>
              <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="secondary" fullWidth size="md">
                  💬 Discord Support
                </Button>
              </a>
            </div>
          </GlassCard>

        </div>
      </div>

        <BackToHomepage />
      </div>
    </PageContainer>
  );
}