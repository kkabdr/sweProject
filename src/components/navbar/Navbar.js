import "./Navbar.css"
const Navbar = () => {
    return (
        <div className = "navbar">
            <div className = "navContainter">
                <div className = "navItems">
                    <span
                     className = "logo">Densys.me</span>
                    <button className="navButton">Login</button>

                </div>
            </div>
        </div>
    )
}
export default Navbar