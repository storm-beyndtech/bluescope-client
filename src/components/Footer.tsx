import { Link } from "react-router-dom"
import { Twitter, Facebook, Linkedin, Youtube } from "lucide-react"
import type { FC } from "react"

const Footer: FC = () => {
  return (
    <footer className="bg-blue-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-10 md:space-y-0">

          {/* Logo and tagline */}
          <div className="md:max-w-sm">
            <h2 className="text-2xl font-semibold">Bluevestapty</h2>
            <p className="text-sm mt-2">
              Global expert in technology in medicine. <br className="hidden md:block" />
              Subsidized by EU funds.
            </p>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">

            {/* Social media */}
            <div>
              <p className="text-sm mb-4 font-medium">Follow us</p>
              <div className="flex space-x-4">
                <Link to="#" aria-label="Twitter"><Twitter size={18} /></Link>
                <Link to="#" aria-label="Facebook"><Facebook size={18} /></Link>
                <Link to="#" aria-label="LinkedIn"><Linkedin size={18} /></Link>
                <Link to="#" aria-label="YouTube"><Youtube size={18} /></Link>
              </div>
            </div>

            {/* Information links */}
            <div>
              <p className="text-sm mb-4 font-medium">Need more information?</p>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:underline">Fizmed Announcements</Link></li>
                <li><Link to="#" className="hover:underline">Customer Support</Link></li>
              </ul>
            </div>

            {/* Legal links 1 */}
            <div>
              <p className="text-sm mb-4 font-medium">Legal</p>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:underline">Legal</Link></li>
                <li><Link to="#" className="hover:underline">Cookie Policy</Link></li>
                <li><Link to="#" className="hover:underline">Terms</Link></li>
              </ul>
            </div>

            {/* Legal links 2 */}
            <div>
              <p className="text-sm mb-4 font-medium">Policy</p>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:underline">Conditions</Link></li>
                <li><Link to="#" className="hover:underline">Impressum</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-10 border-t border-gray-400 text-left">
          <p className="text-xs">© {new Date().getFullYear()} Fizmed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
