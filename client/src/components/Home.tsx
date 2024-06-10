import { Link } from "react-router-dom"

export default function Home() {
    return (    
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col space-y-12 items-center justify-center bg-white p-20 w-10/12 h-5/6 border-4 border-black">
                <div className="flex items-center">
                    <h1 className="text-7xl font-bold">CACKLECRASH</h1>
                    <div className="ml-8 text-7xl rotate-[15deg] bg-yellow-400 p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">💀</div>
                </div>
                <p className="text-center text-3xl">Players answer AI-generated questions and vote on the funniest response. The player with the most votes at the end wins.</p>
                <Link to="/start" className="w-72 border-2 border-black px-20 py-4 rounded-xl text-3xl text-center bg-neutral-300 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]">START</Link>
                <Link to="/join" className="w-72 border-2 border-black px-20 py-4 rounded-xl text-3xl text-center bg-neutral-300 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]">JOIN</Link>

            </div>
        </div>
    )
}
