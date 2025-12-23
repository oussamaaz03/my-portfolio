"use client"

import type React from "react"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState, useRef } from "react"
import { GraduationCap, Briefcase, Code2, Mail, Github, Linkedin, Download, ArrowRight, CheckCircle2, Award, Wrench, Brain, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MobileMenu } from "@/components/mobile-menu"

export default function Portfolio() {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastY = useRef(0)

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
    lastY.current = y
  })

  const [showAllProjects, setShowAllProjects] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
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
              <a
                href="#home"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About me
              </a>
              <a
                href="#education"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Education
              </a>
              <a
                href="#experience"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Experience
              </a>
              <a
                href="#work"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </a>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={scrollToContact}
              >
                Connect
              </Button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-8 lg:pt-16 pb-12 lg:pb-24">
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
            Hi! I'm Oussama El Azzouzi
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-7xl text-balance"
          >
            Ingénieur en IA et Développeur Web
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto mb-10 max-w-xl text-2xl font-medium leading-relaxed text-muted-foreground"
          >
            Je transforme des idées ambitieuses en réalité digitale.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
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
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-20 bg-muted/30"
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
            <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">About me</h2>
          </div>
          <div className="prose max-w-none text-muted-foreground space-y-6">
            <p className="text-base leading-relaxed">
              I believe the future of the web isn't just about beautiful interfaces, but about intelligent systems. My journey began in web development, mastering the art of building seamless digital experiences. But I quickly realized that the most profound interactions are driven by data and intelligence.
            </p>
            <p className="text-base leading-relaxed">
              This led me to the world of Artificial Intelligence. Today, I don't just build applications; I build applications that learn, predict, and reason. My work lives at the intersection of code and cognition, where I use AI not as a feature, but as the core of the user experience.
            </p>
            <p className="text-base leading-relaxed">
              As an AI and Web Developer, I architect solutions from end to end. I use Python, PyTorch, and TensorFlow to engineer complex machine learning models, and then I leverage my expertise in React and Next.js to deploy them into intuitive, responsive web applications. Whether it's developing a recommendation engine that truly understands user intent or a computer vision model that brings new capabilities to a platform, my goal is the same: to transform complex data into meaningful, interactive experiences.
            </p>
            <p className="text-base leading-relaxed">
              I'm not just looking to write code. I'm looking to solve challenging problems and build the next generation of intelligent software. If you're building something that pushes the boundaries of what's possible, we should talk.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Compétences Techniques section */}
      <motion.section 
        className="py-20 bg-muted/30"
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
            <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">Compétences Techniques</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              My technical skills across languages, tools, and concepts
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  <Code2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-4 text-center text-xl font-bold text-foreground">Langages & Frameworks</h3>
              <div className="space-y-3 text-center text-sm text-muted-foreground leading-relaxed">
                <p className="font-medium">Python • JavaScript • TypeScript</p>
                <p className="font-medium">HTML/CSS • SQL • C</p>
                <p className="font-medium">PyTorch • OpenCV • Scikit-learn</p>
                <p className="font-medium">Pandas • NumPy • Matplotlib</p>
                <p className="font-medium">React.js • FastAPI</p>
                <p className="font-medium">Bootstrap • TailwindCSS</p>
              </div>
            </Card>
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-4 text-center text-xl font-bold text-foreground">Outils</h3>
              <div className="space-y-3 text-center text-sm text-muted-foreground leading-relaxed">
                <p className="font-medium">Git & GitHub</p>
                <p className="font-medium">Docker</p>
                <p className="font-medium">Cursor</p>
                <p className="font-medium">Jupyter Notebook</p>
                <p className="font-medium">Supabase</p>
              </div>
            </Card>
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
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
        className="py-20"
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
            <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">Tech I use</h2>
            <p className="mt-4 text-lg text-muted-foreground">Technologies and tools I work with regularly</p>
          </div>
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
                className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:scale-105 transition-transform"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section 
        id="education" 
        className="py-20"
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
            <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">My education</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              My academic journey in computer science, artificial intelligence, and data engineering.
            </p>
          </div>
          <div className="space-y-6">
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-6 w-6 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                    Master en Intelligence Artificielle
                  </h3>
                  <p className="text-sm text-muted-foreground">Ecole Nationale des Sciences Appliquées de Kénitra</p>
                </div>
              </div>
            </Card>
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-6 w-6 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                    Diplôme d'études universitaires généralisées
                  </h3>
                  <p className="text-sm text-muted-foreground">Université Ibn Tofail de Kénitra</p>
                </div>
              </div>
            </Card>
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-6 w-6 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                    Licence en Intelligence Artificielle et Ingénierie des Données
                  </h3>
                  <p className="text-sm text-muted-foreground">Centre d'Excellence, Faculté des Sciences Kenitra</p>
                </div>
              </div>
            </Card>
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-6 w-6 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                    Licence en Ingénierie Systèmes Informatiques
                  </h3>
                  <p className="text-sm text-muted-foreground">Ecole Nationale des Sciences Appliquées</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        className="py-20 bg-muted/30"
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
            <p className="text-sm font-medium text-muted-foreground">My journey</p>
            <h2 className="mt-2 font-serif text-4xl font-bold text-foreground lg:text-5xl">Experience</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional experience and internships in web development
            </p>
          </div>
          <Card className="border-2 border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">Stagiaire Développeur Web</h3>
                    <span className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground w-fit">
                      2 mois
                    </span>
                  </div>
                  <p className="mb-2 font-medium text-primary">AIHUB</p>
                  <p className="text-sm text-muted-foreground">Développement d'un site web responsive avec React</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="work" 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mt-2 font-serif text-4xl font-bold text-foreground lg:text-5xl">My latest work</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Welcome to my portfolio showcasing my expertise in Web Development and Artificial Intelligence.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden border-border bg-card shadow-sm hover:shadow-xl transition-all">
              <div className="relative aspect-4/3 overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/prediction_graph-6sT3QWyY6seJCdQ3PpxJIIZJelQGvk.png"
                  alt="Stock Price Prediction Chart"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground">Stock Price Prediction with Transformers</h3>
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Python, TensorFlow, Transformers</p>
                <p className="mb-4 text-sm text-muted-foreground">Développement d'un projet end-to-end pour prédire les prix des actions à l'aide d'un modèle Transformer.</p>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                  <a href="https://github.com/oussamaaz03/Stock-Price-Prediction-with-Transformers" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Lien GitHub
                  </a>
                </Button>
              </div>
            </Card>
            <Card className="group overflow-hidden border-border bg-card shadow-sm hover:shadow-xl transition-all">
              <div className="relative aspect-4/3 overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-ftA2qBDaZeClUjTlcVwbBBypN5QtJQ.jpeg"
                  alt="Chest X-ray Medical Imaging"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground">Chest X-ray Pneumonia Classifier</h3>
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Python, TensorFlow, Keras, VGG16</p>
                <p className="mb-4 text-sm text-muted-foreground">Construction d'un modèle de deep learning pour classifier les images de rayons X pulmonaires.</p>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                  <a href="https://github.com/oussamaaz03/Chest-Xray-Pneumonia-Classifier" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Lien GitHub
                  </a>
                </Button>
              </div>
            </Card>
            <Card className="group overflow-hidden border-border bg-card shadow-sm hover:shadow-xl transition-all">
              <div className="relative aspect-4/3 overflow-hidden bg-muted flex items-center justify-center">
                <div className="text-center p-6">
                  <Brain className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground">Next Word Prediction</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground">Next Word Prediction</h3>
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Python, Keras, TensorFlow, LSTM</p>
                <p className="mb-4 text-sm text-muted-foreground">Création d'un projet Keras/TensorFlow pour la prédiction du mot suivant avec architecture Bi-LSTM.</p>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                  <a href="https://github.com/oussamaaz03/Next-Word-Prediction" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Lien GitHub
                  </a>
                </Button>
              </div>
            </Card>
            {showAllProjects && (
              <>
                <Card className="group overflow-hidden border-border bg-card shadow-sm hover:shadow-xl transition-all">
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <img
                      src="/modern-portfolio-website-interface.jpg"
                      alt="Portfolio Interactive"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-foreground">Portfolio Interactive</h3>
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">HTML/CSS/JavaScript</p>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                      <a
                        href="https://github.com/oussamaaz03/html-css-js-portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        Lien GitHub
                      </a>
                    </Button>
                  </div>
                </Card>
                <Card className="group overflow-hidden border-border bg-card shadow-sm hover:shadow-xl transition-all">
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <img
                      src="/ecommerce-platform-shopping-interface.jpg"
                      alt="Plateforme E-Commerce"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-foreground">Plateforme E-Commerce</h3>
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">HTML/CSS/JavaScript</p>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                      <a
                        href="https://github.com/oussamaaz03/ecom-website-html-css-javascript"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        Lien GitHub
                      </a>
                    </Button>
                  </div>
                </Card>
                <Card className="group overflow-hidden border-border bg-card shadow-sm hover:shadow-xl transition-all">
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <img
                      src="/data-visualization-clustering-analysis-jupyter-not.jpg"
                      alt="Analyse de Clusters"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-foreground">Analyse de Clusters (Fuzzy C-Means)</h3>
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">Python/Jupyter</p>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                      <a href="https://github.com/oussamaaz03/Fuzzy-Cmeans" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Lien GitHub
                      </a>
                    </Button>
                  </div>
                </Card>
              </>
            )}
          </div>
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? "Show less" : "Show more"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Certifications section */}
      <motion.section 
        className="py-20 bg-muted/30"
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
            <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">Certifications</h2>
            <p className="mt-4 text-lg text-muted-foreground">Professional certifications and achievements</p>
          </div>
          <div className="space-y-6">
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
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
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">
                      Apprentissage automatique supervisé : Régression
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
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground leading-tight">
                        Apprentissage profond et apprentissage par renforcement
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
            <Card className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground leading-tight mb-2">
                      Apprentissage automatique supervisé : Classification
                    </h3>
                    <p className="text-sm text-muted-foreground">Coursera</p>
                  </div>
                </div>
                <span className="inline-block rounded-full bg-yellow-200/20 text-yellow-600 px-3 py-1 text-xs font-medium w-fit shrink-0">
                  En cours
                </span>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-sm font-medium text-muted-foreground">Connect with me</p>
            <h2 className="mt-2 font-serif text-4xl font-bold text-foreground lg:text-5xl">Get in touch</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              I'd love to hear from you! If you have any questions, comments or feedback, please use the form below.
            </p>
          </div>
          <Card className="border-border bg-card p-8 shadow-lg lg:p-12">
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
                  placeholder="Enter your message"
                  rows={6}
                  className="border-border bg-background resize-none"
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit now"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                O
              </div>
              <span className="text-lg font-semibold text-foreground">Oussama El Azzouzi</span>
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
