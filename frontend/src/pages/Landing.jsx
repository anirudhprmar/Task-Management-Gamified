import {Menu,X,CheckCircleIcon} from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import Accordion from '../components/ui/Accordion'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Landing() {
  const [isOpen,setIsOpen] = useState(false)
  const handleToggle = (()=>{
    setIsOpen(!isOpen)
  })

 const faqs = [
  {
    question: "What is this app about?",
    answer: "It's a simple and powerful todo app to help you stay focused and organized with your tasks with a lot of tracking features ."
  },
  {
    question: "Do I need to create an account?",
    answer: "Yes, creating an account lets you save your todos securely and access them from any device."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. We use secure authentication and your data is never shared with third parties."
  },
  {
    question: "Can I use it on mobile?",
    answer: "Yes, the app is fully responsive and works great on phones, tablets, and desktops."
  },
  {
    question: "How is this different from other todo apps?",
    answer: "We focus on tracking progress on your goals — its an all in one , clean task management app."
  },
  {
    question: "Is it free to use?",
    answer: "Yes, it's free to use. We may introduce optional premium features later, but the core will always be free."
  }
];

const aboutRef = useRef(null)
const demoRef = useRef(null)
const headerRef = useRef(null)
const heroRef = useRef(null)
const faqRef = useRef(null)
const footerRef = useRef(null)


useGSAP(() => {
  gsap.fromTo(headerRef.current, 
    {
      y: -100,
      opacity: 0
    },
    {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Hero section animation
    gsap.fromTo(heroRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      }
    );

      // About section animation
    gsap.fromTo(aboutRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

      // Demo section animation
    gsap.fromTo(demoRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        scrollTrigger: {
          trigger: demoRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

      // FAQ section 
    gsap.fromTo(faqRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

      // Footer animation
    gsap.fromTo(footerRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    },[]);



  const handleAboutScroll = ()=>{
    aboutRef.current?.scrollIntoView({
      behaviour:"smooth"
    }) // about section -> ref={'about}
  }
  const handleDemoScroll = ()=>{
    demoRef.current?.scrollIntoView({
      behaviour:"smooth"
    }) // demo section -> ref={'demo}
  }

  return (
    <div className='min-h-screen bg-[#000101]'>
      <header className={`sticky top-0 z-50 bg-[#000101] backdrop-blur-smr`}  >
        <div className='container mx-auto px-4 md:px-10 md:py-3' ref={headerRef}>
          <nav className='relative' aria-label="Main navigation">
            {/* Primary Nav */}
            <div className='flex items-center justify-between h-16'>
              
              {/* logo */}
              <Link to={'/'} className='font-italiana text-3xl transition-colors md:text-5xl'>
                Xecute
              </Link>

              {/* Mobile Menu Button */}
              <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={handleToggle}
              className="md:hidden"
              >
                {isOpen ? <X /> : <Menu />}
              </button>

              {isOpen && (
                <div className="absolute top-full p-3 bg-[#000101] left-0 right-0 md:hidden ">
                  <ul className="py-4 container " role="menu">
                   <li>
                  <Link 
                    onClick={()=>{
                      handleAboutScroll()
                      setIsOpen(false)
                    }}
                    className="block w-full text-center px-4 py-2 hover:bg-[#010606] rounded"
                    role="menuitem"
                  >
                    About
                  </Link>
                </li>
                <li >
                  <Link 
                    onClick={()=>{
                      handleDemoScroll()
                      setIsOpen(false)
                    }}
                    className="block w-full text-center px-4 py-2 hover:bg-base-200 rounded"
                    role="menuitem"
                  >
                    Demo
                  </Link>
                </li>
                <li >
                  <Link 
                    to="/login"
                    className="block w-full text-center px-4 py-2 hover:bg-base-200 rounded"
                    role="menuitem"
                  >
                    Log in
                  </Link>
                </li>
                <li >
                  <Link 
                    to="/signup"
                    className="block w-full text-center px-4 py-2 bg-[#093939] text-white rounded hover:bg-base-300"
                    role="menuitem"
                  >
                    Sign up for free
                  </Link>
                </li>
                  </ul>
                </div>
              )}
              
              <div className="top-full left-0 right-0 hidden md:block ">
                  <ul className="space-y-2 py-4 flex" >
                   <li>
                  <Link 
                    onClick={ handleAboutScroll}
                    className="block w-full text-center px-4 py-2 hover:underline rounded"
                  >
                    About
                  </Link>
                </li>
                <li >
                  <Link 
                    onClick={handleDemoScroll}
                    className="block w-full text-center px-4 py-2 hover:underline rounded"
                  >
                    Demo
                  </Link>
                </li>
                <li >
                  <Link 
                    to="/login"
                    className="block w-full text-center px-4 py-2 hover:underline  rounded"
                  >
                    Log in
                  </Link>
                </li>
                <li >
                  <Link 
                    to="/signup"
                    className="block w-full text-center px-4 py-2 bg-[#093939] text-white rounded-3xl"
                  >
                    Sign up for free
                  </Link>
                </li>
                  </ul>
                </div>
            </div>
          </nav>
        </div>
      </header>

      <main className='container min-w-full'>
        <section  className={`bg-[url('../images/background.png')] bg-no-repeat bg-cover  bg-bottom min-h-screen py-24`}>
          <div className='flex flex-col items-center justify-center ' ref={heroRef}>
            <div className='font-inter p-10 md:max-w-4xl'>
            <h1 className='text-4xl font-bold mb-6 leading-tight  min-w-full md:min-w-2xl md:text-7xl'>Stay on top of your tasks,effortlessly. </h1>
            <p className='text-md font-light md:text-2xl  md:py-5'>Transform your to-do list into a done list—start today, stay on track, and crush your goals.</p>
            </div>
            <div >
              <Link
                to="/signup"
                className="block w-fit text-center px-4 md:px-10 py-2 md:py-3 bg-black text-white rounded-3xl "                
              >
              Get Started
              </Link>
            </div>
          </div>
        </section>

        <section className='bg-[#010606] min-h-full py-5' >
          <div ref={aboutRef}>
            <div className='px-5 py-15'>
              <span className='text-3xl md:text-5xl font-bold text-left font-inter'>Measure. Improve. Repeat</span>
            </div>

            <div className='flex flex-col justify-center items-center py-15 md:flex-row gap-40'>

              <div className='w-50  md:w-100 shadow-xl '>
                <img src="/images/hero_img.jpg" alt="woman with a list of todos getting shit done" className='rounded-xl' />
              </div>

              <div className='py-4'>
                {/* points */}
                <ul className='px-5 py-5  '>

                  <li className='flex gap-2 py-3 items-start font-sans text-lg font-extralight md:text-3xl'> 
                  <CheckCircleIcon className='size-9 md:size-10'/>
                  A to-do app with everything you need to make a day productive</li>

                  <li className='flex gap-2 py-3 items-start font-sans text-lg font-extralight md:text-3xl'> <CheckCircleIcon className='size-8 md:size-10'/>
                  track record of your progress on weekly and daily goals </li>

                  <li className='flex gap-2 py-3 items-start font-sans text-lg font-extralight md:text-3xl'> <CheckCircleIcon className='size-7 md:size-10'/>
                  pure focus on execution and getting shit done </li>

                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-[#010606] min-h-full py-5' >
          <div ref={demoRef}>
          <div className='px-5 py-15'>
              <span className='text-3xl md:text-5xl font-bold text-left'>Demo</span>
            </div>

            <div className='flex justify-center py-30 flex-col items-center gap-5'>
              <video  controls autoPlay className='w-100 md:w-200 '>
                 <source src="/videos/demo.mp4" type="video/mp4" />
              </video>

              <span className='text-center py-10 text-lg font-sans font-extralight md:text-2xl'>What’s stopping you from making little improvements everyday ?
              </span>
            </div>
          </div>
        </section>

        <section className='bg-[#010606] min-h-full py-5' >
          <div ref={faqRef}>
           <div className='px-5 py-15'>
              <span className='text-3xl md:text-5xl font-bold text-left'>FAQ</span>
            </div>

            <div className='px-5 py-10 '>
              {faqs.map((item,index) =>{
                return (
                  <div key={index} className='py-2' >
                    <Accordion question={item.question} solution={item.answer} />
                  </div>
                )
              })}
            </div>

          </div>
        </section>

      </main>

      <footer className='container min-w-full bg-[#010606]'>
        <div className='grid grid-cols-2 px-20 py-10 '  ref={footerRef}>
          <div>
            <div>
              <span className='text-lg font-bold  font-inter underline'>SITEMAP</span>
            </div>
            <div>
              <ul className='md:py-4'>
                 <li className='px-4 py-2 rounded'>
                  <Link 
                    onClick={handleAboutScroll}
                  >
                    About
                  </Link>
                </li>
                <li className=' px-4 py-2 rounded' >
                  <Link 
                    onClick={handleDemoScroll}
                  >
                    Demo
                  </Link>
                </li>
                <li className='px-4 py-2 rounded' >
                  <Link 
                    to="/signup"
                    >
                    Sign up
                  </Link>
                </li>
                <li className='px-4 py-2 rounded'>
                  <Link 
                    to="/login">
                    Log in
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div>
              <span className='text-lg font-bold  font-inter underline'>CONTACT</span>
            </div>
            <div>
              <ul className='md:py-4'>
                 <li  className='px-4 py-2 rounded' >
                  <Link 
                    to="https://x.com/anirudhprmar">
                    X
                  </Link>
                </li>
                <li className='px-4 py-2 rounded' >
                  <Link 
                    to="mailto:anirudhparmar2004@gmail.com">
                    Mail
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='overflow-hidden '>
          <div className='text-center  md:transform md:scale-[4] md:p-20 md:px-10 p-10'>
            <span className='inline-block transform scale-[6]  opacity-10 font-italiana '>Xecute</span>
          </div>
          <div className='md:py-10 md:mt-10 mt-3 py-5'>
            <span className='opacity-20 px-2 md:text-xl '>2025 Xecute. All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
