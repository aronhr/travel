import GameDetail from './GameDetail'

const gameNames: Record<string, string> = {
  powerhour:       'Power Hour',
  kingscup:        'Kings Cup',
  spinthebottle:   'Spin the Bottle',
  quizgame:        'Quiz Game',
  dringroulette:   'Drink Roulette',
  neverhaveiever:  'Never Have I Ever',
  flipcup:         'Flip Cup',
  categorygame:    'Category Game',
  dicedrinkinggame:'Dice Drinking',
  passthebomb:     'Pass the Bomb',
  blackout:        'Blackout',
}

export function generateStaticParams() {
  return Object.keys(gameNames).map(slug => ({ slug }))
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const name = gameNames[slug] ?? slug
  return <GameDetail name={name} />
}
