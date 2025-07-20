import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const BingeWashingStreaks = () => {
  const [userStats, setUserStats] = useState({
    currentStreak: 7,
    longestStreak: 23,
    totalWashes: 142,
    level: 'Binge Washer',
    xp: 1250,
    nextLevelXp: 1500,
    achievements: []
  });

  const [dailyProgress, setDailyProgress] = useState(0);
  const [isWashing, setIsWashing] = useState(false);

  const achievements = [
    { id: 1, name: 'First Episode', description: 'Complete your first wash', icon: '🎬', unlocked: true },
    { id: 2, name: 'Binge Beginner', description: '5 wash streak', icon: '🍿', unlocked: true },
    { id: 3, name: 'Season Regular', description: '10 wash streak', icon: '📺', unlocked: true },
    { id: 4, name: 'Genre Explorer', description: 'Try all 5 main genres', icon: '🎭', unlocked: true },
    { id: 5, name: 'Netflix & Chill', description: '25 total washes', icon: '🧘', unlocked: true },
    { id: 6, name: 'Binge God', description: '30 day streak', icon: '👑', unlocked: false },
    { id: 7, name: 'Clean Critic', description: 'Rate 50 wash experiences', icon: '⭐', unlocked: false },
    { id: 8, name: 'Laundry Legend', description: '100 total washes', icon: '🏆', unlocked: true }
  ];

  const levels = [
    { name: 'Casual Viewer', minXp: 0, color: 'bg-gray-500' },
    { name: 'Regular Watcher', minXp: 100, color: 'bg-blue-500' },
    { name: 'Binge Washer', minXp: 500, color: 'bg-green-500' },
    { name: 'Series Addict', minXp: 1000, color: 'bg-purple-500' },
    { name: 'Streaming Pro', minXp: 2000, color: 'bg-red-500' },
    { name: 'Netflix Legend', minXp: 5000, color: 'bg-yellow-500' }
  ];

  const getCurrentLevel = () => {
    return levels
      .slice()
      .reverse()
      .find(level => userStats.xp >= level.minXp) || levels[0];
  };

  const getNextLevel = () => {
    return levels.find(level => level.minXp > userStats.xp) || levels[levels.length - 1];
  };

  const simulateWash = () => {
    setIsWashing(true);
    setDailyProgress(prev => Math.min(prev + 25, 100));
    
    // Simulate wash completion
    setTimeout(() => {
      setIsWashing(false);
      setUserStats(prev => ({
        ...prev,
        totalWashes: prev.totalWashes + 1,
        currentStreak: prev.currentStreak + 1,
        xp: prev.xp + 50
      }));
      
      // Save to localStorage
      const updatedStats = {
        ...userStats,
        totalWashes: userStats.totalWashes + 1,
        currentStreak: userStats.currentStreak + 1,
        xp: userStats.xp + 50,
        lastWashDate: new Date().toDateString()
      };
      localStorage.setItem('bingeWashStats', JSON.stringify(updatedStats));
    }, 3000);
  };

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('bingeWashStats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setUserStats(stats);
      
      // Check if streak should be reset (missed a day)
      const lastWash = new Date(stats.lastWashDate || new Date());
      const today = new Date();
      const daysDiff = Math.floor((today - lastWash) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 1) {
        setUserStats(prev => ({ ...prev, currentStreak: 0 }));
      }
    }
  }, []);

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progressToNext = ((userStats.xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100;

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6">
            Binge <span className="text-purple-400">Statistics</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            Track your washing journey like your favorite Netflix series. 
            Level up your laundry game!
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-12">
          {/* Current Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Progress */}
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${currentLevel.color} mr-3`}></div>
                    {currentLevel.name}
                  </span>
                  <Badge className="bg-purple-600">Level {levels.indexOf(currentLevel) + 1}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-white">
                    <span>{userStats.xp} XP</span>
                    <span>{nextLevel.minXp} XP</span>
                  </div>
                  <Progress value={progressToNext} className="h-3" />
                  <p className="text-gray-300 text-sm">
                    {nextLevel.minXp - userStats.xp} XP until {nextLevel.name}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Streak Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border-orange-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-black text-orange-400 mb-2">
                    {userStats.currentStreak}
                  </div>
                  <div className="text-white font-semibold">Current Streak</div>
                  <div className="text-orange-300 text-sm">🔥 Days</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-lg border-purple-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-black text-purple-400 mb-2">
                    {userStats.longestStreak}
                  </div>
                  <div className="text-white font-semibold">Best Streak</div>
                  <div className="text-purple-300 text-sm">🏆 Days</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-black text-green-400 mb-2">
                    {userStats.totalWashes}
                  </div>
                  <div className="text-white font-semibold">Total Episodes</div>
                  <div className="text-green-300 text-sm">📺 Washes</div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Goal */}
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Today's Binge Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-white">
                    <span>Daily Washing Progress</span>
                    <span>{dailyProgress}%</span>
                  </div>
                  <Progress value={dailyProgress} className="h-3" />
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300 text-sm">
                      {dailyProgress >= 100 ? '🎉 Daily goal completed!' : 'Keep washing to maintain your streak!'}
                    </p>
                    <Button
                      onClick={simulateWash}
                      disabled={isWashing || dailyProgress >= 100}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isWashing ? '🧼 Washing...' : '▶ Quick Wash'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Panel */}
          <div>
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white">🏆 Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      achievement.unlocked 
                        ? 'bg-green-500/20 border border-green-500/30' 
                        : 'bg-gray-800/40 border border-gray-600/30'
                    }`}
                  >
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                        {achievement.name}
                      </div>
                      <div className={`text-sm ${achievement.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-green-600 text-white">✓</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Netflix-style Recommendations */}
        <Card className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-lg border-gray-700">
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-white mb-6">
              Because you're a {currentLevel.name}...
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="text-xl font-bold text-white mb-2">Recommended Genre</div>
                <div className="text-purple-400 text-lg">Drama Deep Clean</div>
                <p className="text-gray-300 text-sm">Perfect for your washing style</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="text-xl font-bold text-white mb-2">Next Milestone</div>
                <div className="text-purple-400 text-lg">{nextLevel.name}</div>
                <p className="text-gray-300 text-sm">{nextLevel.minXp - userStats.xp} XP to go</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="text-xl font-bold text-white mb-2">Streak Bonus</div>
                <div className="text-purple-400 text-lg">+{userStats.currentStreak * 5} XP</div>
                <p className="text-gray-300 text-sm">Daily streak multiplier</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BingeWashingStreaks;