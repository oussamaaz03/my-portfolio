"use client"

import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About me" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Projects" },
]

type MobileMenuProps = {
  activeSection?: string
}

export function MobileMenu({ activeSection }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  const menuVariants: Variants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: "100%", transition: { duration: 0.3 } },
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open navigation menu"
        className="relative z-50"
      >
        {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 z-50 h-full w-80 border-l border-border bg-background/95 shadow-xl backdrop-blur-xl"
            >
              <div className="flex flex-col items-center space-y-6 p-8 pt-24">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">Navigation</div>
                {navLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className={`w-full rounded-xl px-4 py-3 text-center text-2xl font-medium transition-all ${
                      activeSection === href.replace("#", "")
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(href)
                    }}
                  >
                    {label}
                  </a>
                ))}
                <Button
                  size="lg"
                  className="mt-4 w-full"
                  onClick={() => {
                    scrollToSection("#contact")
                    setIsOpen(false)
                  }}
                >
                  Connect
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
