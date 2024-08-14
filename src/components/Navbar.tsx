import shippo from "../assets/images/shippo.svg"

const Navbar = () => {
    return (
        <div className="px-40 flex items-center justify-between">
            <img className="w-24 h-24" src={shippo} />
            < button className="px-3 py-2 bg-transparent border text-xs border-[#95a300] hover:bg-[#95a300] hover:text-white outline-[#95a300] text-[#95a300] rounded-md" > Proceed</button >
        </div >
    )
}

export default Navbar