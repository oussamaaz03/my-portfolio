"use client"

import type React from "react"

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { GraduationCap, Briefcase, Code2, Mail, Github, Linkedin, Download, ArrowRight, CheckCircle2, Award, Wrench, Brain, Eye, Moon, Sun, ArrowUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ProjectCategory = "All" | "AI" | "Web" | "Data"

const typingPhrases = ["AI Engineer & Web Developer", "Agentic AI Builder", "Full-Stack Problem Solver"]

const statsConfig = [
  { value: 14, label: "Projects Built", suffix: "+" },
  { value: 3, label: "Years Learning AI", suffix: "+" },
  { value: 6, label: "Core Technologies", suffix: "+" },
  { value: 98, label: "Delivery Rate", suffix: "%" },
]

const heroParticles = [
  "particle-1",
  "particle-2",
  "particle-3",
  "particle-4",
  "particle-5",
  "particle-6",
  "particle-7",
  "particle-8",
  "particle-9",
  "particle-10",
  "particle-11",
]

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About me" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
]

const projects = [
  {
    title: "Image Segmentation with ViT",
    tech: "Python, PyTorch, Vision Transformer",
    description: "Semantic image segmentation using Vision Transformer (ViT) architecture for pixel-level classification.",
    image: "/vit-segmentation.png",
    alt: "Image Segmentation with ViT",
    github: "https://github.com/oussamaaz03/vit-semantic-segmentation",
    categories: ["AI", "Data"] as ProjectCategory[],
    featured: true,
  },
  {
    title: "Stock Price Prediction with Transformers",
    tech: "Python, TensorFlow, Transformers",
    description: "End-to-end project development for stock price prediction using a Transformer model.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/prediction_graph-6sT3QWyY6seJCdQ3PpxJIIZJelQGvk.png",
    alt: "Stock Price Prediction Chart",
    github: "https://github.com/oussamaaz03/Stock-Price-Prediction-with-Transformers",
    categories: ["AI", "Data"] as ProjectCategory[],
    featured: true,
  },
  {
    title: "Chest X-ray Pneumonia Classifier",
    tech: "Python, TensorFlow, Keras, VGG16",
    description: "Building a deep learning model to classify chest X-ray images for pneumonia detection.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-ftA2qBDaZeClUjTlcVwbBBypN5QtJQ.jpeg",
    alt: "Chest X-ray Medical Imaging",
    github: "https://github.com/oussamaaz03/Chest-Xray-Pneumonia-Classifier",
    categories: ["AI"] as ProjectCategory[],
    featured: true,
  },
  {
    title: "Next Word Prediction",
    tech: "Python, Keras, TensorFlow, LSTM",
    description: "Creating a Keras/TensorFlow project for next word prediction using Bi-LSTM architecture.",
    image: "",
    alt: "Next Word Prediction",
    github: "https://github.com/oussamaaz03/Next-Word-Prediction",
    categories: ["AI", "Data"] as ProjectCategory[],
    featured: true,
  },
  {
    title: "Interactive Portfolio",
    tech: "HTML/CSS/JavaScript",
    description: "Interactive portfolio website focused on responsive design and smooth navigation.",
    image: "/modern-portfolio-website-interface.jpg",
    alt: "Interactive Portfolio",
    github: "https://github.com/oussamaaz03/html-css-js-portfolio",
    categories: ["Web"] as ProjectCategory[],
    featured: false,
  },
  {
    title: "E-Commerce Platform",
    tech: "HTML/CSS/JavaScript",
    description: "Modern e-commerce interface with clean product browsing and conversion-first layout.",
    image: "/ecommerce-platform-shopping-interface.jpg",
    alt: "E-Commerce Platform",
    github: "https://github.com/oussamaaz03/ecom-website-html-css-javascript",
    categories: ["Web"] as ProjectCategory[],
    featured: false,
  },
  {
    title: "Cluster Analysis (Fuzzy C-Means)",
    tech: "Python/Jupyter",
    description: "Data clustering experiments using Fuzzy C-Means with visualization and interpretation workflows.",
    image: "/data-visualization-clustering-analysis-jupyter-not.jpg",
    alt: "Cluster Analysis",
    github: "https://github.com/oussamaaz03/Fuzzy-Cmeans",
    categories: ["Data"] as ProjectCategory[],
    featured: false,
  },
]

export default function Portfolio() {
  const [hidden, setHidden] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const { scrollY, scrollYProgress } = useScroll()
  const lastY = useRef(0)
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastY.current
    if (y > 80) {
      if (difference > 0) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    } else {
      setHidden(false)
    }
    setShowScrollTop(y > 560)
    lastY.current = y
  })

  const [showAllProjects, setShowAllProjects] = useState(false)
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>("All")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [stats, setStats] = useState(statsConfig.map(() => 0))

  const projectFilters: ProjectCategory[] = ["All", "AI", "Web", "Data"]

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = projectFilter === "All" || project.categories.includes(projectFilter)
    const matchesVisibility = projectFilter !== "All" || showAllProjects || project.featured
    return matchesFilter && matchesVisibility
  })

  const hasMoreProjects = projects.some((project) => !project.featured)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const currentWord = typingPhrases[typingIndex]
    let timeout = 90

    if (!isDeleting && typedText === currentWord) {
      timeout = 1200
    }

    if (isDeleting) {
      timeout = 45
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (typedText === currentWord) {
          setIsDeleting(true)
        } else {
          setTypedText(currentWord.slice(0, typedText.length + 1))
        }
      } else if (typedText.length === 0) {
        setIsDeleting(false)
        setTypingIndex((prev) => (prev + 1) % typingPhrases.length)
      } else {
        setTypedText(currentWord.slice(0, typedText.length - 1))
      }
    }, timeout)

    return () => window.clearTimeout(timer)
  }, [typedText, isDeleting, typingIndex])

  useEffect(() => {
    const totalSteps = 40
    let currentStep = 0

    const interval = window.setInterval(() => {
      currentStep += 1
      setStats(
        statsConfig.map((item) => Math.min(item.value, Math.round((item.value * currentStep) / totalSteps))),
      )

      if (currentStep >= totalSteps) {
        window.clearInterval(interval)
      }
    }, 35)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    )

    const sectionIds = ["home", "about", "education", "experience", "work", "contact"]
    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitMessage("Message sent successfully!")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitMessage("Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.div className="fixed left-0 top-0 z-60 h-1 w-full origin-left bg-primary" style={{ scaleX: scrollYProgress }} />

      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                O
              </div>
              <span className="text-lg font-semibold text-foreground">Oussama</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link text-sm font-medium transition-colors ${
                    activeSection === item.id ? "nav-link-active" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={scrollToContact}
              >
                Connect
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="bg-transparent"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="bg-transparent md:hidden"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-8 pb-12 lg:pb-24 lg:pt-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 -top-64 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-40 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10">
          {heroParticles.map((particleClass) => (
            <span key={particleClass} className={`hero-particle ${particleClass}`} />
          ))}
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <img
              src="/oussama-profile-cropped.jpg"
              alt="Oussama El Azzouzi"
              className="h-80 w-80 rounded-full object-cover object-top ring-4 ring-background shadow-xl"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 text-2xl font-medium text-muted-foreground"
          >
            Hi! I&apos;m Oussama El Azzouzi
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 min-h-20 font-serif text-4xl font-bold leading-tight text-foreground text-balance sm:text-5xl lg:text-7xl"
          >
            {typedText}
            <span className="typing-cursor" aria-hidden="true">|</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto mb-10 max-w-xl text-2xl font-medium leading-relaxed text-muted-foreground"
          >
            I transform ambitious ideas into digital reality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={scrollToContact}
            >
              connect with me
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
              <a href="/CV-OUSSAMA-EL-AZZOUZI.pdf" download>
                my resume
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statsConfig.map((stat, index) => (
              <Card
                key={stat.label}
                className="border-border bg-card/80 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-3xl font-bold text-foreground">
                  {stats[index]}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-20 bg-muted/30 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
          <div className="mb-16 text-center">
            <p className="text-sm font-medium text-primary mb-2">Get to know me</p>
            <h2 className="section-title font-serif text-4xl font-bold text-foreground lg:text-5xl">About me</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Main intro with quote */}
            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary bg-card/50 backdrop-blur-sm p-6">
                <p className="text-lg font-medium text-foreground italic">
                  "I don't just build applications; I build applications that learn, predict, and reason."
                </p>
              </Card>
              <p className="text-muted-foreground leading-relaxed">
                I believe the future of the web isn't just about beautiful interfaces, but about intelligent systems. My journey began in web development, mastering the art of building seamless digital experiences. But I quickly realized that the most profound interactions are driven by data and intelligence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This led me to the world of Artificial Intelligence. My work lives at the intersection of code and cognition, where I use AI not as a feature, but as the core of the user experience.
              </p>
            </div>
            
            {/* Right side - Key highlights */}
            <div className="space-y-4">
              <Card className="border-border bg-card/80 backdrop-blur-sm p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Code2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Full-Stack Development</h3>
                    <p className="text-sm text-muted-foreground">Building end-to-end solutions with React, Next.js, and modern web technologies.</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-border bg-card/80 backdrop-blur-sm p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">AI & Machine Learning</h3>
                    <p className="text-sm text-muted-foreground">Engineering complex ML models with Python, PyTorch, and TensorFlow.</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-border bg-card/80 backdrop-blur-sm p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Computer Vision</h3>
                    <p className="text-sm text-muted-foreground">Bringing new capabilities to platforms with vision AI models.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="inline-block border-border bg-linear-to-r from-primary/10 via-card to-primary/10 p-6 backdrop-blur-sm">
              <p className="text-muted-foreground mb-4">
                I'm not just looking to write code. I'm looking to solve challenging problems and build the next generation of intelligent software.
              </p>
              <p className="text-foreground font-medium">
                If you're building something that pushes the boundaries of what's possible, <span className="text-primary">let's talk</span>.
              </p>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Technical Skills Section */}
      <motion.section
        className="relative overflow-hidden bg-muted/30 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium text-primary">Build stack</p>
            <h2 className="section-title font-serif text-4xl font-bold text-foreground lg:text-5xl">Technical Skills</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              My technical skills across languages, tools, and concepts
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Code2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-4 text-center text-xl font-bold text-foreground">Languages & Frameworks</h3>
              <div className="space-y-3 text-center text-sm text-muted-foreground leading-relaxed">
                <p className="font-medium">Python • JavaScript • TypeScript</p>
                <p className="font-medium">HTML/CSS • SQL • C</p>
                <p className="font-medium">PyTorch • OpenCV • Scikit-learn</p>
                <p className="font-medium">Pandas • NumPy • Matplotlib</p>
                <p className="font-medium">React.js • FastAPI</p>
                <p className="font-medium">Bootstrap • TailwindCSS</p>
              </div>
            </Card>
            <Card className="group border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-4 text-center text-xl font-bold text-foreground">Tools</h3>
              <div className="space-y-3 text-center text-sm text-muted-foreground leading-relaxed">
                <p className="font-medium">Git & GitHub</p>
                <p className="font-medium">Docker</p>
                <p className="font-medium">Cursor</p>
                <p className="font-medium">Jupyter Notebook</p>
                <p className="font-medium">Supabase</p>
              </div>
            </Card>
            <Card className="group border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-4 text-center text-xl font-bold text-foreground">Concepts</h3>
              <div className="space-y-3 text-center text-sm text-muted-foreground leading-relaxed">
                <p className="font-medium">Machine Learning</p>
                <p className="font-medium">Deep Learning</p>
                <p className="font-medium">Computer Vision</p>
                <p className="font-medium">Data Analysis</p>
                <p className="font-medium">Agentic AI</p>
                <p className="font-medium">Web Development</p>
                <p className="font-medium">E-commerce & SaaS</p>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Tech I use section */}
      <motion.section
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium text-primary">Daily toolkit</p>
            <h2 className="section-title font-serif text-4xl font-bold text-foreground lg:text-5xl">Tech I use</h2>
            <p className="mt-4 text-lg text-muted-foreground">Technologies and tools I work with regularly</p>
          </div>
          <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex flex-wrap justify-center gap-3">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind",
              "Node.js",
              "Python",
              "PyTorch",
              "MySQL",
              "PHP",
              "Git",
              "Docker",
              "LangChain",
              "LangGraph",
              "FastAPI",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-primary/20 bg-linear-to-r from-primary/10 to-transparent px-5 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/15"
              >
                {tech}
              </span>
            ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        className="relative overflow-hidden py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-primary">Academic path</p>
            <h2 className="section-title font-serif text-4xl font-bold text-foreground lg:text-5xl">My education</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              My academic journey in computer science, artificial intelligence, and data engineering.
            </p>
          </div>
          <div className="relative space-y-6 before:absolute before:bottom-0 before:left-5 before:top-0 before:w-px before:bg-border">
            <Card className="relative ml-0 border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:shadow-lg md:ml-8">
              <div className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-6 w-6 text-foreground" />
                  <span className="absolute -left-6 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                    Master's in Artificial Intelligence
                  </h3>
                  <p className="text-sm text-muted-foreground">National School of Applied Sciences, Kenitra</p>
                </div>
              </div>
            </Card>
            <Card className="relative ml-0 border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:shadow-lg md:ml-8">
              <div className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-6 w-6 text-foreground" />
                  <span className="absolute -left-6 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                    General University Studies Diploma
                  </h3>
                  <p className="text-sm text-muted-foreground">Ibn Tofail University, Kenitra</p>
                </div>
              </div>
            </Card>
            <Card className="relative ml-0 border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:shadow-lg md:ml-8">
              <div className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-6 w-6 text-foreground" />
                  <span className="absolute -left-6 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                    Bachelor's in Artificial Intelligence and Data Engineering
                  </h3>
                  <p className="text-sm text-muted-foreground">Center of Excellence, Faculty of Sciences, Kenitra</p>
                </div>
              </div>
            </Card>
            <Card className="relative ml-0 border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:shadow-lg md:ml-8">
              <div className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-6 w-6 text-foreground" />
                  <span className="absolute -left-6 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                    Bachelor's in Computer Systems Engineering
                  </h3>
                  <p className="text-sm text-muted-foreground">National School of Applied Sciences</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="relative bg-muted/30 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-sm font-medium text-primary">Professional growth</p>
            <h2 className="section-title mt-2 font-serif text-4xl font-bold text-foreground lg:text-5xl">Experience</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional experience and internships in web development
            </p>
          </div>
          <Card className="border-border bg-card/90 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 lg:p-8">
            <div className="grid gap-6 md:grid-cols-[auto_1fr]">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Briefcase className="h-7 w-7" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">AI & Software Engineering Intern</h3>
                    <p className="mt-1 font-medium text-primary">AI HUB • Rabat, Morocco</p>
                  </div>
                  <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-foreground w-fit">
                    July 2025 – September 2025
                  </span>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-xl border border-border bg-background/70 p-4">
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Intelligent Chatbot Development (Agentic AI):</strong> Design and implementation of a conversational agent using LangGraph for managing complex dialogue cycles and multi-step reasoning.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-4">
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">LLM Orchestration:</strong> Using LangChain for language model integration and RAG (Retrieval-Augmented Generation) workflow management.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-4">
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Interface & Fullstack:</strong> User interface development (Dashboard & Settings & Contact) with React.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="work"
        className="relative overflow-hidden py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-primary">Selected projects</p>
            <h2 className="section-title mt-2 font-serif text-4xl font-bold text-foreground lg:text-5xl">My latest work</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Welcome to my portfolio showcasing my expertise in Web Development and Artificial Intelligence.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {projectFilters.map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={projectFilter === filter ? "default" : "outline"}
                className="rounded-full px-5"
                onClick={() => setProjectFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card
                key={project.title}
                className="group relative overflow-hidden border-border bg-card/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/15"
              >
                <div className="absolute inset-0 bg-linear-to-b from-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative aspect-4/3 overflow-hidden bg-muted flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <Brain className="mx-auto mb-2 h-12 w-12 text-primary" />
                      <p className="text-sm font-semibold text-foreground">{project.title}</p>
                    </div>
                  )}
                </div>

                <div className="relative p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.categories.map((category) => (
                      <span
                        key={`${project.title}-${category}`}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{project.tech}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      GitHub Link
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">No projects found for this category yet.</p>
          )}

          {projectFilter === "All" && hasMoreProjects && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent"
                onClick={() => setShowAllProjects(!showAllProjects)}
              >
                {showAllProjects ? "Show less" : "Show more"}
                <ArrowRight className={`h-4 w-4 transition-transform ${showAllProjects ? "rotate-90" : ""}`} />
              </Button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Certifications section */}
      <motion.section
        className="relative bg-muted/30 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="absolute right-10 top-12 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-primary">Validation</p>
            <h2 className="section-title font-serif text-4xl font-bold text-foreground lg:text-5xl">Certifications</h2>
            <p className="mt-4 text-lg text-muted-foreground">Professional certifications and achievements</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                      Exploratory Data Analysis (EDA) with Python
                    </h3>
                    <p className="text-sm text-muted-foreground">Coursera</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                  <a href="/Coursera_EDA.pdf" target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4" />
                    View
                  </a>
                </Button>
              </div>
            </Card>
            <Card className="border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                      Supervised Machine Learning: Regression
                    </h3>
                    <p className="text-sm text-muted-foreground">Coursera</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                  <a href="/Supervised-Machine-Learning-Regression.pdf" target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4" />
                    View
                  </a>
                </Button>
              </div>
            </Card>
            <Card className="border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground leading-tight">
                        Deep Learning and Reinforcement Learning
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Coursera</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                  <a href="/Deep-Learning-and-Reinforcement-Learning.pdf" target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4" />
                    View
                  </a>
                </Button>
              </div>
            </Card>
            <Card className="border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground leading-tight mb-2">
                      Supervised Machine Learning: Classification
                    </h3>
                    <p className="text-sm text-muted-foreground">Coursera</p>
                  </div>
                </div>
                <span className="inline-block rounded-full bg-yellow-200/20 text-yellow-600 px-3 py-1 text-xs font-medium w-fit shrink-0">
                  In Progress
                </span>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="relative overflow-hidden py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-sm font-medium text-primary">Let&apos;s collaborate</p>
            <h2 className="section-title mt-2 font-serif text-4xl font-bold text-foreground lg:text-5xl">Get in touch</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              I'd love to hear from you! If you have any questions, comments or feedback, please use the form below.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-border bg-card/90 p-8 shadow-sm backdrop-blur-sm lg:p-10">
              <h3 className="text-2xl font-semibold text-foreground">Let&apos;s build something great</h3>
              <p className="mt-3 text-muted-foreground">
                I am open to freelance missions, internships, and AI-focused collaborations. Reach out and I will reply quickly.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:oussamaelazzouzi03@gmail.com"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  oussamaelazzouzi03@gmail.com
                </a>
                <a
                  href="https://github.com/oussamaaz03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
                >
                  <Github className="h-4 w-4 text-primary" />
                  github.com/oussamaaz03
                </a>
                <a
                  href="https://www.linkedin.com/in/oussama-el-azzouzi-0a89a7319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4 text-primary" />
                  linkedin.com/in/oussama-el-azzouzi-0a89a7319
                </a>
              </div>
            </Card>

            <Card className="border-border bg-card/90 p-8 shadow-lg backdrop-blur-sm lg:p-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="border-border bg-background"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="border-border bg-background"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project"
                    rows={6}
                    className="resize-none border-border bg-background"
                    required
                  />
                </div>

                {submitMessage && (
                  <p
                    className={`text-center text-sm ${
                      submitMessage.includes("success") ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit now"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-6 z-40"
          >
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full bg-background/90 shadow-lg backdrop-blur"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg shadow-primary/30 transition-transform hover:-translate-y-1"
        onClick={scrollToContact}
        aria-label="Quick contact"
      >
        <Mail className="h-5 w-5" />
      </Button>

      {/* Footer */}
      <footer className="relative border-t border-border bg-background py-12">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                O
              </div>
              <span className="text-lg font-semibold text-foreground">Oussama El Azzouzi</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <a href="#about" className="transition-colors hover:text-foreground">About</a>
              <a href="#education" className="transition-colors hover:text-foreground">Education</a>
              <a href="#experience" className="transition-colors hover:text-foreground">Experience</a>
              <a href="#work" className="transition-colors hover:text-foreground">Projects</a>
              <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/oussamaaz03"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/oussama-el-azzouzi-0a89a7319"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:oussamaelazzouzi03@gmail.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Oussama El Azzouzi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
