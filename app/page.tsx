'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  AtSign,
  CalendarDays,
  Globe,
  Link2,
  MapPin,
  Minus,
  Plus,
  Phone,
  Printer,
  RotateCcw,
  Star,
} from 'lucide-react'

type ContactKind = 'phone' | 'email' | 'link' | 'location' | 'social'

type ContactItem = {
  id: string
  kind: ContactKind
  value: string
  href: string
}

type Project = {
  id: string
  title: string
  github: string
  live: string
  summary: string
  date?: string
  points?: string[]
}

type Experience = {
  id: string
  company: string
  subtitle: string
  date: string
  location: string
  link: string
  description: string
  points: string[]
  accent: string
}

type ResumeData = {
  name: string
  title: string
  photo: string
  summary: string
  contacts: ContactItem[]
  skills: string[]
  projects: Project[]
  experience: Experience[]
}

const STORAGE_KEY = 'fahim-resume-data'

const contactIcon = {
  phone: Phone,
  email: AtSign,
  link: Link2,
  location: MapPin,
  social: Star,
} as const

const initialData: ResumeData = {
  name: 'Fahim Ahmed',
  title: 'Full Stack Software Developer',
  photo: '/profile-photo.png',
  summary:
    'Experienced Full Stack Developer with 2+ years of expertise in building and deploying full-scale web applications. My core technical proficiency lies in the MERN stack and Javascript, with a focus on creating dynamic, user-centric front-ends using React.js/Next.js and architecting resilient back-end systems with RESTful APIs and MongoDB. I am passionate about engineering clean, efficient code and am adept at diagnosing and solving complex problems. I thrive in dynamic environments and am skilled at quickly mastering new technologies to deliver high-quality solutions',
  contacts: [
    {
      id: 'phone',
      kind: 'phone',
      value: '+8801706617723',
      href: 'tel:+8801706617723',
    },
    {
      id: 'email',
      kind: 'email',
      value: 'fahimahamedweb@gmail.com',
      href: 'mailto:fahimahamedweb@gmail.com',
    },
    {
      id: 'linkedin',
      kind: 'link',
      value: 'https://www.linkedin.com/in/fahim-ahmed-477836190/',
      href: 'https://www.linkedin.com/in/fahim-ahmed-477836190/',
    },
    {
      id: 'website',
      kind: 'link',
      value: 'https://fahimweb.com/',
      href: 'https://fahimweb.com/',
    },
    {
      id: 'location',
      kind: 'location',
      value: 'Banasree,Dhaka,Bangladesh',
      href: 'https://maps.google.com/?q=Banasree,Dhaka,Bangladesh',
    },
    {
      id: 'youtube',
      kind: 'social',
      value: 'https://www.youtube.com/@tomtech10',
      href: 'https://www.youtube.com/@tomtech10',
    },
  ],
  skills: [
    'HTML',
    'CSS',
    'JavaScript',
    'Bootstrap',
    'React',
    'Next.js',
    'TailwindCss',
    'Material UI',
    'RTK Query',
    'Redux',
    'Git',
    'Nestjs',
    'Node.js',
    'Socket.IO',
    'MongoDB',
    'Express.js',
    'GitHub',
    'TypeScript',
    'Strapi',
    'Apollo',
    'GraphQL',
    'PostgreSQL',
    'Prisma',
    'React-hooks',
    'zod',
    'Context-api',
    'Firebase',
  ],
  projects: [
    {
      id: 'doctor-appointment',
      title: 'Doctor Appointment system (MERN)',
      github: 'https://github.com/FahimAhamed101/dococ',
      live: 'https://dococ.vercel.app/',
      summary: 'used Nextjs,Tailwindcss,Rtk query,Nodejs,ExpressJs,mongodb',
    },
    {
      id: 'hiru',
      title: 'Hiru job platform(Nestjs)',
      github: 'https://github.com/FahimAhamed101/HiruChrisbackend',
      live: '',
      summary: 'used nestjs,prisma,postgresql',
    },
    {
      id: 'dashboard',
      title: 'Nextjs Dashboard',
      github: 'https://github.com/FahimAhamed101/doctordashboard',
      live: 'https://doctordashboard-sigma.vercel.app/',
      summary: 'A perfect dashboard for managing doctors used nextjs and tailwindcss',
    },
    {
      id: 'lebaba',
      title: 'Lebaba Ecommerce',
      github: 'https://github.com/FahimAhamed101/mern_ecom',
      live: 'https://reactnodeshop.vercel.app/',
      summary: 'Lebaba Ecommerce',
    },
    {
      id: 'nextshop',
      title: 'Nextshop',
      github: 'https://github.com/FahimAhamed101/shopnextjs',
      live: 'https://shopnextjs-plum.vercel.app/',
      summary: 'A nextjs Shop Web APP',
    },
    {
      id: 'inventory',
      title: 'Nextjs Inventory system',
      github: 'https://github.com/FahimAhamed101/nextjsinv',
      live: 'https://nextjsinv.vercel.app/',
      summary: 'A nextjs crud application using mongodb,prisma',
    },
    {
      id: 'chat',
      title: 'Mern Chat App',
      github: '',
      live: '',
      date: '01/2025 - 01/1970',
      summary: 'Mern Chat App',
      points: [
        'Chat platform built using React.js,Socket.io,Context Api',
        'Secure authentication with multiple login in Group chat',
      ],
    },
  ],
  experience: [
    {
      id: 'sparktech',
      company: 'Sparktech Agency',
      subtitle: 'Sparktech Agency',
      date: '2025',
      location: 'mohakhali',
      link: 'https://sparktech.agency/',
      description: 'A tech company based in Mohakhali,Dhaka',
      points: ['worked on multiple projects both frontend and backend'],
      accent: 'from-lime-400 to-emerald-500',
    },
    {
      id: 'nexstack',
      company: 'Full Stack Developer',
      subtitle: 'NexStack',
      date: '02/2025 - 06/2025',
      location: 'Kushtia',
      link: '',
      description: 'Software Development company',
      points: ['Worked as a full stack developer on ERP projects'],
      accent: 'from-sky-300 to-cyan-500',
    },
  ],
}

const stripProtocol = (value?: string | null) => (value ?? '').replace(/^https?:\/\//, '')

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

function resizePhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('Could not read the selected photo.'))
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Could not read the selected photo.'))
        return
      }

      const image = new Image()

      image.onerror = () => reject(new Error('The selected file is not a valid image.'))
      image.onload = () => {
        const size = 720
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        if (!context) {
          reject(new Error('Could not prepare the selected photo.'))
          return
        }

        const sourceSize = Math.min(image.naturalWidth, image.naturalHeight)
        const sourceX = (image.naturalWidth - sourceSize) / 2
        const sourceY = (image.naturalHeight - sourceSize) / 2

        canvas.width = size
        canvas.height = size
        context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size)

        resolve(canvas.toDataURL('image/jpeg', 0.9))
      }

      image.src = reader.result
    }

    reader.readAsDataURL(file)
  })
}

async function waitForResumeImages() {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>('.resume-sheet img'))

  await Promise.all(
    images.map((image) => {
      if (image.complete) {
        return Promise.resolve()
      }

      return new Promise<void>((resolve) => {
        image.addEventListener('load', () => resolve(), { once: true })
        image.addEventListener('error', () => resolve(), { once: true })
      })
    })
  )
}

function resumePdfName(name: string) {
  const normalizedName = name
    .trim()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')

  return `${normalizedName || 'Resume'}.pdf`
}

function loadImageDataUrl(src: string) {
  return new Promise<string>((resolve, reject) => {
    if (src.startsWith('data:image/')) {
      resolve(src)
      return
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Could not prepare photo for PDF.'))
        return
      }

      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      context.drawImage(image, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    image.onerror = () => reject(new Error('Could not load resume photo.'))
    image.src = src
  })
}

function makeCircularImageDataUrl(src: string, size = 720) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Could not prepare circular photo.'))
        return
      }

      const sourceSize = Math.min(image.naturalWidth, image.naturalHeight)
      const sourceX = (image.naturalWidth - sourceSize) / 2
      const sourceY = (image.naturalHeight - sourceSize) / 2

      canvas.width = size
      canvas.height = size
      context.save()
      context.beginPath()
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      context.closePath()
      context.clip()
      context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size)
      context.restore()
      resolve(canvas.toDataURL('image/png'))
    }
    image.onerror = () => reject(new Error('Could not render circular photo.'))
    image.src = src
  })
}

function splitCommaList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeResumeData(value: ResumeData): ResumeData {
  return {
    ...initialData,
    ...value,
    projects: value.projects.map((project) => {
      if (project.id === 'doctor-appointment' && project.github.endsWith('/dococc')) {
        return {
          ...project,
          github: 'https://github.com/FahimAhamed101/dococ',
        }
      }

      if (project.id === 'chat' && !project.date && !project.points?.length) {
        return {
          ...project,
          date: '01/2025 - 01/1970',
          summary: 'Mern Chat App',
          points: [
            'Chat platform built using React.js,Socket.io,Context Api',
            'Secure authentication with multiple login in Group chat',
          ],
        }
      }

      return project
    }),
  }
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="cv-section-title">
      <h2>{title}</h2>
      <div />
    </div>
  )
}

function ContactRow({
  kind,
  value,
  href,
}: {
  kind: ContactKind
  value: string
  href: string
}) {
  const Icon = contactIcon[kind]

  return (
    <a
      href={href || '#'}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="cv-contact-link"
    >
      <Icon className="cv-icon-blue" />
      <span className="truncate">{value}</span>
    </a>
  )
}

function ProjectLink({
  href,
  icon = 'link',
  children,
}: {
  href: string
  icon?: 'link' | 'pin'
  children: ReactNode
}) {
  if (!href) {
    return null
  }

  const Icon = icon === 'pin' ? MapPin : Link2

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="cv-project-link"
    >
      <Icon className="cv-link-icon" />
      <span className="break-all">{children}</span>
    </a>
  )
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className="grid gap-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-normal text-neutral-900 outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-[#2f80ed]/15"
      />
    </label>
  )
}

function PhotoField({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState('')

  const handleUpload = async (file?: File) => {
    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setStatus('Choose an image file.')
      return
    }

    try {
      setStatus('Uploading...')
      const resizedPhoto = await resizePhoto(file)
      onChange(resizedPhoto)
      setStatus(file.name)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Photo upload failed.')
    } finally {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const displayValue = value.startsWith('data:image/') ? 'Uploaded photo' : value

  return (
    <div className="grid gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
      <span>Photo</span>
      <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3">
        <img
          src={value}
          alt="Current resume photo"
          className="h-16 w-16 rounded-full border border-neutral-200 object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-normal normal-case tracking-normal text-neutral-900">
            {displayValue}
          </p>
          {status ? (
            <p className="mt-1 truncate text-xs font-medium normal-case tracking-normal text-neutral-500">
              {status}
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-neutral-700 transition hover:border-[#2f80ed] hover:text-[#2f80ed]">
          Upload
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(event) => void handleUpload(event.target.files?.[0])}
            className="sr-only"
          />
        </label>
        <button
          type="button"
          onClick={() => {
            onChange(initialData.photo)
            setStatus('Default photo restored.')
          }}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
        >
          Default
        </button>
      </div>
      <label className="grid gap-1">
        <span>Photo URL</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-neutral-900 outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-[#2f80ed]/15"
        />
      </label>
    </div>
  )
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <label className="grid gap-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-normal text-neutral-900 outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-[#2f80ed]/15"
      />
    </label>
  )
}

function Panel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[13px] font-black uppercase tracking-[0.18em] text-neutral-900">
          {title}
        </h3>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export default function Page() {
  const [data, setData] = useState<ResumeData>(initialData)
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const [pdfStatus, setPdfStatus] = useState('')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return
    }

    try {
      const parsed = JSON.parse(saved) as ResumeData
      setData(normalizeResumeData(parsed))
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const updateContact = (id: string, patch: Partial<ContactItem>) => {
    setData((current) => ({
      ...current,
      contacts: current.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...patch } : contact
      ),
    }))
  }

  const updateProject = (id: string, patch: Partial<Project>) => {
    setData((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === id ? { ...project, ...patch } : project
      ),
    }))
  }

  const updateProjectPoints = (id: string, value: string) => {
    setData((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              points: value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean),
            }
          : project
      ),
    }))
  }

  const updateExperience = (id: string, patch: Partial<Experience>) => {
    setData((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }))
  }

  const updateExperiencePoints = (id: string, value: string) => {
    setData((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === id
          ? {
              ...item,
              points: value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean),
            }
          : item
      ),
    }))
  }

  const addProject = () => {
    setData((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          id: uid('project'),
          title: 'New Project',
          github: '',
          live: '',
          summary: '',
          date: '',
          points: [],
        },
      ],
    }))
  }

  const removeProject = (id: string) => {
    setData((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id),
    }))
  }

  const addExperience = () => {
    setData((current) => ({
      ...current,
      experience: [
        ...current.experience,
        {
          id: uid('experience'),
          company: 'New Role',
          subtitle: 'Company',
          date: '',
          location: '',
          link: '',
          description: '',
          points: [],
          accent: 'from-sky-300 to-cyan-500',
        },
      ],
    }))
  }

  const removeExperience = (id: string) => {
    setData((current) => ({
      ...current,
      experience: current.experience.filter((item) => item.id !== id),
    }))
  }

  const addContact = () => {
    setData((current) => ({
      ...current,
      contacts: [
        ...current.contacts,
        {
          id: uid('contact'),
          kind: 'link',
          value: 'https://example.com',
          href: 'https://example.com',
        },
      ],
    }))
  }

  const removeContact = (id: string) => {
    setData((current) => ({
      ...current,
      contacts: current.contacts.filter((contact) => contact.id !== id),
    }))
  }

  const exportPdf = async () => {
    if (isExportingPdf) {
      return
    }

    setIsExportingPdf(true)
    setPdfStatus('Preparing PDF...')

    try {
      const { jsPDF } = await import('jspdf')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      const blue = '#1685ff'
      const gray = '#4b4b4b'
      const darkGray = '#444444'
      const lightGray = '#d4d4d4'
      const margin = 14
      const pageWidth = 210
      const leftWidth = 104.5
      const rightX = 127
      const rightWidth = 69

      const setFont = (style: 'normal' | 'bold', size: number, color = '#111111') => {
        pdf.setFont('helvetica', style)
        pdf.setFontSize(size)
        pdf.setTextColor(color)
      }

      const divider = (x: number, y: number, width: number) => {
        pdf.setDrawColor('#111111')
        pdf.setLineWidth(0.7)
        pdf.line(x, y, x + width, y)
      }

      const sectionTitle = (title: string, x: number, y: number, width: number) => {
        setFont('bold', 10.4, '#000000')
        pdf.text(title.toUpperCase(), x, y)
        divider(x, y + 1.7, width)
      }

      const wrappedText = (
        text: string,
        x: number,
        y: number,
        width: number,
        size = 6.9,
        lineHeight = 4.1,
        color = gray
      ) => {
        setFont('normal', size, color)
        const lines = pdf.splitTextToSize(text, width) as string[]
        pdf.text(lines, x, y)
        return y + lines.length * lineHeight
      }

      const linkLine = (text: string, x: number, y: number, icon: string, href?: string) => {
        setFont('bold', 6.4, '#6b6f76')
        pdf.text(icon, x, y)
        setFont('normal', 6.9, darkGray)
        if (href) {
          pdf.textWithLink(text, x + 3.6, y, { url: href })
        } else {
          pdf.text(text, x + 3.6, y)
        }
      }

      pdf.setFillColor('#ffffff')
      pdf.rect(0, 0, 210, 297, 'F')

      setFont('bold', 18.5, '#000000')
      pdf.text(data.name.toUpperCase(), margin, 20)
      setFont('normal', 10.5, '#000000')
      pdf.text(data.title, margin, 26)

      const photoDataUrl = await loadImageDataUrl(data.photo)
      const circularPhoto = await makeCircularImageDataUrl(photoDataUrl)
      pdf.addImage(circularPhoto, 'PNG', 169, 14, 29, 29)

      setFont('bold', 6.4, blue)
      pdf.text('P', margin, 32.8)
      setFont('bold', 6.4, darkGray)
      pdf.text(data.contacts[0]?.value ?? '', margin + 3.7, 32.8)
      setFont('bold', 6.4, blue)
      pdf.text('@', margin + 46.5, 32.8)
      setFont('bold', 6.4, darkGray)
      pdf.text(data.contacts[1]?.value ?? '', margin + 50.2, 32.8)

      linkLine(data.contacts[2]?.value ?? '', margin, 36.7, 'L', data.contacts[2]?.href)
      linkLine(data.contacts[3]?.value ?? '', margin + 95, 36.7, 'L', data.contacts[3]?.href)
      linkLine(data.contacts[4]?.value ?? '', margin, 40.6, 'M', data.contacts[4]?.href)
      linkLine(data.contacts[5]?.value ?? '', margin + 56.5, 40.6, '*', data.contacts[5]?.href)

      let leftY = 53
      sectionTitle('Summary', margin, leftY, leftWidth)
      leftY = wrappedText(data.summary, margin, leftY + 5.5, leftWidth, 7.2, 4.1) + 7

      sectionTitle('Projects', margin, leftY, leftWidth)
      leftY += 5.5

      data.projects.forEach((project, index) => {
        setFont('bold', 8.8, '#000000')
        pdf.text(project.title, margin, leftY)
        leftY += 4.8

        if (project.github) {
          linkLine(project.github, margin, leftY, 'M', project.github)
          leftY += 4.2
        }

        if (project.live) {
          linkLine(project.live, margin, leftY, 'L', project.live)
          leftY += 4.2
        }

        if (project.date) {
          linkLine(project.date, margin, leftY, 'D')
          leftY += 4.2
        }

        leftY = wrappedText(project.summary, margin, leftY, leftWidth, 7, 4.1)

        if (project.points?.length) {
          project.points.forEach((point) => {
            setFont('normal', 7, gray)
            const lines = pdf.splitTextToSize(point, leftWidth - 5) as string[]
            pdf.text('•', margin + 1, leftY)
            pdf.text(lines, margin + 5, leftY)
            leftY += lines.length * 4.1
          })
        }

        if (index < data.projects.length - 1) {
          pdf.setDrawColor(lightGray)
          pdf.setLineWidth(0.25)
          pdf.setLineDashPattern([1.2, 1.2], 0)
          pdf.line(margin, leftY + 1.3, margin + leftWidth, leftY + 1.3)
          pdf.setLineDashPattern([], 0)
          leftY += 5.5
        }
      })

      let rightY = 53
      sectionTitle('Skills', rightX, rightY, rightWidth)
      rightY += 7

      const skillColumns = 3
      const skillGap = 2.4
      const skillWidth = (rightWidth - skillGap * (skillColumns - 1)) / skillColumns
      data.skills.forEach((skill, index) => {
        const col = index % skillColumns
        const row = Math.floor(index / skillColumns)
        const x = rightX + col * (skillWidth + skillGap)
        const y = rightY + row * 9

        setFont('bold', 7.3, '#454545')
        pdf.text(skill, x + 1.6, y)
        pdf.setDrawColor('#bdbdbd')
        pdf.setLineWidth(0.25)
        pdf.line(x, y + 2.8, x + skillWidth - 1.2, y + 2.8)
      })

      rightY += Math.ceil(data.skills.length / skillColumns) * 9 + 7
      sectionTitle('Experience', rightX, rightY, rightWidth)
      rightY += 7.5

      data.experience.forEach((item, index) => {
        if (index > 0) {
          pdf.setDrawColor(lightGray)
          pdf.setLineWidth(0.25)
          pdf.setLineDashPattern([1.2, 1.2], 0)
          pdf.line(rightX, rightY - 3, rightX + rightWidth, rightY - 3)
          pdf.setLineDashPattern([], 0)
        }

        if (item.id === 'sparktech') {
          pdf.setDrawColor('#63d627')
          pdf.setLineWidth(1.1)
          pdf.rect(rightX + 1.5, rightY - 3.2, 3.3, 3.3, 'S')
        } else {
          pdf.setFillColor('#79d7f8')
          pdf.circle(rightX + 2.5, rightY - 2.4, 1.5, 'F')
          pdf.setFillColor('#42dabf')
          pdf.circle(rightX + 6, rightY - 0.8, 1.5, 'F')
          pdf.setFillColor('#69c1ff')
          pdf.circle(rightX + 1.3, rightY - 5.2, 1.5, 'F')
        }

        const contentX = rightX + 12
        setFont('bold', 8.8, '#000000')
        pdf.text(item.company, contentX, rightY)
        rightY += 4.7
        setFont('bold', 8.2, blue)
        pdf.text(item.subtitle, contentX, rightY)
        rightY += 5

        linkLine(item.date, contentX, rightY, 'D')
        if (item.location) {
          linkLine(item.location, contentX + 31, rightY, 'M', '')
        }
        rightY += 4.4

        if (item.link) {
          linkLine(item.link, contentX, rightY, 'L', item.link)
          rightY += 4.4
        }

        rightY = wrappedText(item.description, contentX, rightY, rightWidth - 12, 6.8, 3.8)

        item.points.forEach((point) => {
          setFont('normal', 6.8, gray)
          const lines = pdf.splitTextToSize(point, rightWidth - 18) as string[]
          pdf.text('•', contentX + 1, rightY)
          pdf.text(lines, contentX + 5, rightY)
          rightY += lines.length * 3.8
        })

        rightY += 5
      })

      pdf.save(resumePdfName(data.name))
      setPdfStatus('PDF downloaded.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'PDF export failed.'
      console.error(error)
      setPdfStatus(message)
    } finally {
      setIsExportingPdf(false)
    }
  }

  const resetData = () => {
    setData(initialData)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-4 p-4 xl:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="no-print xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <div className="border-b border-neutral-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2f80ed]">
                    Resume editor
                  </p>
                  <h1 className="mt-1 text-lg font-black text-black">Edit sidebar data</h1>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={resetData}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={exportPdf}
                    disabled={isExportingPdf}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-black px-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
                  >
                    <Printer className="h-4 w-4" />
                    {isExportingPdf ? 'Saving...' : 'PDF'}
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Changes update the preview instantly. PDF downloads the resume.
              </p>
              {pdfStatus ? (
                <p className="mt-2 text-xs font-semibold text-neutral-500">{pdfStatus}</p>
              ) : null}
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              <Panel title="Header">
                <TextField
                  label="Name"
                  value={data.name}
                  onChange={(value) => setData((current) => ({ ...current, name: value }))}
                />
                <TextField
                  label="Title"
                  value={data.title}
                  onChange={(value) => setData((current) => ({ ...current, title: value }))}
                />
                <PhotoField
                  value={data.photo}
                  onChange={(value) => setData((current) => ({ ...current, photo: value }))}
                />
              </Panel>

              <Panel title="Contacts">
                <div className="space-y-3">
                  {data.contacts.map((contact) => (
                    <div key={contact.id} className="rounded-2xl border border-neutral-200 p-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                          {contact.kind}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeContact(contact.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 transition hover:text-red-600"
                        >
                          <Minus className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="grid gap-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                          <span>Type</span>
                          <select
                            value={contact.kind}
                            onChange={(event) =>
                              updateContact(contact.id, {
                                kind: event.target.value as ContactKind,
                              })
                            }
                            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-[#2f80ed]/15"
                          >
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
                            <option value="link">Link</option>
                            <option value="location">Location</option>
                            <option value="social">Social</option>
                          </select>
                        </label>
                        <TextField
                          label="Value"
                          value={contact.value}
                          onChange={(value) => updateContact(contact.id, { value })}
                        />
                        <TextField
                          label="Href"
                          value={contact.href}
                          onChange={(value) => updateContact(contact.id, { href: value })}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addContact}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-[#2f80ed] hover:text-[#2f80ed]"
                  >
                    <Plus className="h-4 w-4" />
                    Add contact
                  </button>
                </div>
              </Panel>

              <Panel title="Summary">
                <TextAreaField
                  label="Paragraph"
                  value={data.summary}
                  onChange={(value) => setData((current) => ({ ...current, summary: value }))}
                  rows={8}
                />
              </Panel>

              <Panel title="Skills">
                <TextAreaField
                  label="One skill per line"
                  value={data.skills.join('\n')}
                  onChange={(value) =>
                    setData((current) => ({
                      ...current,
                      skills: value
                        .split('\n')
                        .map((line) => line.trim())
                        .filter(Boolean),
                    }))
                  }
                  rows={10}
                />
              </Panel>

              <Panel title="Projects">
                <div className="space-y-3">
                  {data.projects.map((project) => (
                    <div key={project.id} className="rounded-2xl border border-neutral-200 p-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                          Project
                        </span>
                        <button
                          type="button"
                          onClick={() => removeProject(project.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 transition hover:text-red-600"
                        >
                          <Minus className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                      <div className="space-y-2">
                        <TextField
                          label="Title"
                          value={project.title}
                          onChange={(value) => updateProject(project.id, { title: value })}
                        />
                        <TextField
                          label="Github"
                          value={project.github}
                          onChange={(value) => updateProject(project.id, { github: value })}
                        />
                        <TextField
                          label="Live"
                          value={project.live}
                          onChange={(value) => updateProject(project.id, { live: value })}
                        />
                        <TextField
                          label="Date"
                          value={project.date ?? ''}
                          onChange={(value) => updateProject(project.id, { date: value })}
                        />
                        <TextAreaField
                          label="Summary"
                          value={project.summary}
                          onChange={(value) => updateProject(project.id, { summary: value })}
                          rows={4}
                        />
                        <TextAreaField
                          label="Points"
                          value={(project.points ?? []).join('\n')}
                          onChange={(value) => updateProjectPoints(project.id, value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addProject}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-[#2f80ed] hover:text-[#2f80ed]"
                  >
                    <Plus className="h-4 w-4" />
                    Add project
                  </button>
                </div>
              </Panel>

              <Panel title="Experience">
                <div className="space-y-3">
                  {data.experience.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-neutral-200 p-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                          Experience
                        </span>
                        <button
                          type="button"
                          onClick={() => removeExperience(item.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 transition hover:text-red-600"
                        >
                          <Minus className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                      <div className="space-y-2">
                        <TextField
                          label="Company"
                          value={item.company}
                          onChange={(value) => updateExperience(item.id, { company: value })}
                        />
                        <TextField
                          label="Subtitle"
                          value={item.subtitle}
                          onChange={(value) => updateExperience(item.id, { subtitle: value })}
                        />
                        <div className="grid gap-2 sm:grid-cols-2">
                          <TextField
                            label="Date"
                            value={item.date}
                            onChange={(value) => updateExperience(item.id, { date: value })}
                          />
                          <TextField
                            label="Location"
                            value={item.location}
                            onChange={(value) => updateExperience(item.id, { location: value })}
                          />
                        </div>
                        <TextField
                          label="Link"
                          value={item.link}
                          onChange={(value) => updateExperience(item.id, { link: value })}
                        />
                        <TextField
                          label="Accent"
                          value={item.accent}
                          onChange={(value) => updateExperience(item.id, { accent: value })}
                        />
                        <TextAreaField
                          label="Description"
                          value={item.description}
                          onChange={(value) => updateExperience(item.id, { description: value })}
                          rows={3}
                        />
                        <TextAreaField
                          label="Points"
                          value={item.points.join('\n')}
                          onChange={(value) => updateExperiencePoints(item.id, value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExperience}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-[#2f80ed] hover:text-[#2f80ed]"
                  >
                    <Plus className="h-4 w-4" />
                    Add experience
                  </button>
                </div>
              </Panel>
            </div>
          </div>
        </aside>

        <section className="resume-preview overflow-x-auto rounded-3xl border border-neutral-200 bg-neutral-200/70 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <div className="resume-sheet">
            <header className="cv-header">
              <div>
                <h1 className="cv-name">
                  {data.name}
                </h1>
                <p className="cv-role">
                  {data.title}
                </p>

                <div className="cv-contact-block">
                  <div className="cv-contact-row">
                    {data.contacts.slice(0, 2).map((contact) => (
                      <ContactRow
                        key={contact.id}
                        kind={contact.kind}
                        value={contact.value}
                        href={contact.href}
                      />
                    ))}
                  </div>
                  <div className="cv-contact-row">
                    {data.contacts.slice(2, 4).map((contact) => (
                      <ContactRow
                        key={contact.id}
                        kind={contact.kind}
                        value={contact.value}
                        href={contact.href}
                      />
                    ))}
                  </div>
                  <div className="cv-contact-row">
                    {data.contacts.slice(4).map((contact) => (
                      <ContactRow
                        key={contact.id}
                        kind={contact.kind}
                        value={contact.value}
                        href={contact.href}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="cv-photo">
                <img
                  src={data.photo}
                  alt={`${data.name} portrait`}
                  className="object-cover object-center"
                />
              </div>
            </header>

            <section className="cv-grid">
              <div className="cv-left-column">
                <section>
                  <SectionTitle title="Summary" />
                  <p className="cv-summary">
                    {data.summary}
                  </p>
                </section>

                <section>
                  <SectionTitle title="Projects" />
                  <div className="cv-projects">
                    {data.projects.map((project) => (
                      <article
                        key={project.id}
                        className="cv-project"
                      >
                        <h3>
                          {project.title}
                        </h3>
                        <div className="cv-project-body">
                          <div className="cv-project-links">
                            <ProjectLink href={project.github} icon="pin">
                              {stripProtocol(project.github)}
                            </ProjectLink>
                            {project.live ? (
                              <ProjectLink href={project.live}>
                                {stripProtocol(project.live)}
                              </ProjectLink>
                            ) : null}
                            {project.date ? (
                              <div className="cv-project-date">
                                <CalendarDays className="cv-link-icon" />
                                <span>{project.date}</span>
                              </div>
                            ) : null}
                          </div>
                          <p>
                            {project.summary}
                          </p>
                          {project.points?.length ? (
                            <ul className="cv-project-points">
                              {project.points.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              <div className="cv-right-column">
                <section>
                  <SectionTitle title="Skills" />
                  <div className="cv-skills">
                    {data.skills.map((skill) => (
                      <div
                        key={skill}
                        className="cv-skill"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionTitle title="Experience" />
                  <div className="cv-experience-list">
                    {data.experience.map((item) => (
                      <article key={item.id} className="cv-experience">
                        <div className="cv-experience-row">
                          <div
                            className={`cv-company-mark cv-company-mark-${item.id} bg-gradient-to-br ${item.accent}`}
                          >
                            <div />
                          </div>
                          <div className="cv-experience-content">
                            <h3>
                              {item.company}
                            </h3>
                            <p className="cv-company">
                              {item.subtitle}
                            </p>

                            <div className="cv-meta">
                              <span>
                                <CalendarDays className="cv-meta-icon" />
                                {item.date}
                              </span>
                              <span>
                                <MapPin className="cv-meta-icon" />
                                {item.location}
                              </span>
                            </div>

                            {item.link ? (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="cv-exp-link"
                              >
                                <Link2 className="cv-link-icon" />
                                <span>{stripProtocol(item.link)}</span>
                              </a>
                            ) : null}

                            <p className="cv-description">
                              {item.description}
                            </p>
                            <ul className="cv-points">
                              {item.points.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
