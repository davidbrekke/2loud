export default function App() {
  return (
    <main className="w-screen h-screen flex flex-col items-center space-y-4 justify-center bg-blue-50">
      <StayTuned />
    </main>
  )
}

const StayTuned = () => (
  <>
    <h1 className="font-bold text-4xl text-indigo-400">2loud</h1>
    <h2 className="font-bold text-2xl text-indigo-300">stay tuned</h2>
  </>
)
