import { PageContainer, BackToHomepage } from '@/components/ui';

export default function RankingsPage() {
  const playerRankings = [
    { rank: 1, name: 'DragonSlayer', race: 'Human', level: 100, guild: 'Legends', elo: 2420 },
    { rank: 2, name: 'ArcaneWizard', race: 'Mage', level: 100, guild: 'Mystics', elo: 2380 },
    { rank: 3, name: 'ForestGuardian', race: 'Centaur', level: 100, guild: 'Nature', elo: 2340 },
    { rank: 4, name: 'CyberNinja', race: 'Borg', level: 100, guild: 'TechWars', elo: 2310 },
    { rank: 5, name: 'SwordMaster', race: 'Human', level: 99, guild: 'Warriors', elo: 2280 },
    { rank: 6, name: 'ElementalMage', race: 'Mage', level: 99, guild: 'Mystics', elo: 2240 },
    { rank: 7, name: 'HealingArrow', race: 'Centaur', level: 98, guild: 'Healers', elo: 2190 },
    { rank: 8, name: 'DataMiner', race: 'Borg', level: 98, guild: 'Hackers', elo: 2165 },
    { rank: 9, name: 'BladeRunner', race: 'Human', level: 97, guild: 'Legends', elo: 2120 },
    { rank: 10, name: 'IceMage', race: 'Mage', level: 97, guild: 'Frostborn', elo: 2080 }
  ];

  const guildRankings = [
    { rank: 1, name: 'Legends', members: 45, avgLevel: 92, guildPoints: 89420, leader: 'DragonSlayer' },
    { rank: 2, name: 'Mystics', members: 38, avgLevel: 89, guildPoints: 82150, leader: 'ArcaneWizard' },
    { rank: 3, name: 'TechWars', members: 42, avgLevel: 87, guildPoints: 78690, leader: 'CyberNinja' },
    { rank: 4, name: 'Warriors', members: 51, avgLevel: 85, guildPoints: 75320, leader: 'SwordMaster' },
    { rank: 5, name: 'Nature', members: 33, avgLevel: 91, guildPoints: 71880, leader: 'ForestGuardian' }
  ];

  const getRaceIcon = (race: string) => {
    switch (race) {
      case 'Human': return '⚔️';
      case 'Mage': return '🔮';
      case 'Centaur': return '🏹';
      case 'Borg': return '🤖';
      default: return '❓';
    }
  };

  const getRaceColor = (race: string) => {
    switch (race) {
      case 'Human': return 'text-red-400';
      case 'Mage': return 'text-purple-400';
      case 'Centaur': return 'text-green-400';
      case 'Borg': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-cyan-400';
    if (rank === 2) return 'text-slate-300';
    if (rank === 3) return 'text-teal-400';
    return 'text-slate-400';
  };

  return (
    <PageContainer>
      <div className="space-y-8">
          {/* Race Statistics */}
          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5 rounded-xl"></div>
            <div className="relative p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
              <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">Race Distribution</h2>
            </div>
            <div className="relative p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-4xl">⚔️</span>
                  <span className="text-red-400 font-semibold">Human</span>
                  <span className="text-cyan-300 text-xl font-bold">34%</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-4xl">🔮</span>
                  <span className="text-purple-400 font-semibold">Mage</span>
                  <span className="text-cyan-300 text-xl font-bold">28%</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-4xl">🏹</span>
                  <span className="text-green-400 font-semibold">Centaur</span>
                  <span className="text-cyan-300 text-xl font-bold">22%</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-4xl">🤖</span>
                  <span className="text-blue-400 font-semibold">Borg</span>
                  <span className="text-cyan-300 text-xl font-bold">16%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Player Rankings */}
            <div className="flex flex-col">
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 overflow-hidden flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5 rounded-xl"></div>
              <div className="relative p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent flex items-center gap-2">
                  Top Players
                </h2>
              </div>
              <div className="relative p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-2 text-cyan-300 font-semibold">Rank</th>
                        <th className="text-left py-2 text-cyan-300 font-semibold">Player</th>
                        <th className="text-left py-2 text-cyan-300 font-semibold">Race</th>
                        <th className="text-left py-2 text-cyan-300 font-semibold">Level</th>
                        <th className="text-left py-2 text-cyan-300 font-semibold">Guild</th>
                        <th className="text-left py-2 text-cyan-300 font-semibold">ELO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerRankings.map((player) => (
                        <tr key={player.rank} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-3">
                            <span className={`font-bold text-lg ${getRankColor(player.rank)}`}>
                              #{player.rank}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="font-semibold text-cyan-100">{player.name}</div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getRaceIcon(player.race)}</span>
                              <span className={`font-semibold ${getRaceColor(player.race)}`}>{player.race}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="text-cyan-400 font-bold">{player.level}</span>
                          </td>
                          <td className="py-3">
                            <span className="text-slate-300">{player.guild}</span>
                          </td>
                          <td className="py-3">
                            <span className="text-teal-400 font-semibold">{player.elo.toLocaleString()}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

            {/* Guild Rankings */}
            <div className="flex flex-col">
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 overflow-hidden flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5 rounded-xl"></div>
              <div className="relative p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
                <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">Top Guilds</h2>
              </div>
              <div className="relative p-4 space-y-3">
                {guildRankings.map((guild) => (
                  <div key={guild.rank} className="bg-slate-800/50 p-3 rounded border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getRankColor(guild.rank)}`}>#{guild.rank}</span>
                        <span className="font-bold text-cyan-100">{guild.name}</span>
                      </div>
                      <span className="text-teal-400 font-semibold text-sm">{guild.guildPoints.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>{guild.members} members</div>
                      <div>Avg Level: {guild.avgLevel}</div>
                      <div>Leader: {guild.leader}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>

        <div className="text-center">
          <BackToHomepage />
        </div>
      </div>
    </PageContainer>
  );
}