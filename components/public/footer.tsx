export function Footer() {
  return (
    <footer id="donate" className="bg-[#009EFF] text-white">
      {/* Contact info bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {/* Phone */}
        <div className="bg-[#EAE9DA] p-6 sm:p-8 flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#2FB0AB]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#3A1700]/50 mb-0.5">Téléphone</p>
            <p className="text-sm sm:text-base font-medium text-[#3A1700]">+261 34 37 933 63</p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-[#E3E1CB] p-6 sm:p-8 flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#2FB0AB]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#3A1700]/50 mb-0.5">Email</p>
            <p className="text-sm sm:text-base font-medium text-[#3A1700]">reinseignement@emit.mg</p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-[#CBC8AD] p-6 sm:p-8 flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#2FB0AB]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#3A1700]/50 mb-0.5">Adresse</p>
            <p className="text-sm sm:text-base font-medium text-[#3A1700]">301 Fianarantsoa, Madagascar</p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and description */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-[var(--font-rowdies)] text-2xl sm:text-3xl font-light mb-3">
              Innovators
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Équipe de l'EMIT représentant Madagascar au TEKBOT Robotics 2025.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-[var(--font-rowdies)] text-xs font-light tracking-widest uppercase mb-4">
              Menu
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#about" className="hover:text-white transition-colors">Notre Équipe</a></li>
              <li><a href="#project" className="hover:text-white transition-colors">Le Projet</a></li>
              <li><a href="#donate" className="hover:text-white transition-colors">Nous Soutenir</a></li>
            </ul>
          </div>

          {/* Project */}
          <div>
            <h4 className="font-[var(--font-rowdies)] text-xs font-light tracking-widest uppercase mb-4">
              TEKBOT 2025
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">La Compétition</a></li>
              <li><a href="#" className="hover:text-white transition-colors">EMIT</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sponsors</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-[var(--font-rowdies)] text-xs font-light tracking-widest uppercase mb-4">
              Suivez-nous
            </h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#7E8AB8] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#7E8AB8] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-white/50 text-xs sm:text-sm">
            © 2025 Innovators - EMIT Madagascar. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-xs sm:text-sm">
            <a href="#" className="text-white/70 hover:text-white transition-colors">Conditions</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
