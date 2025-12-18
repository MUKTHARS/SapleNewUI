'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, Clock, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Thank you! Your message has been sent successfully.' });
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setSubmitStatus({ success: false, message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Left Column - Natural conversation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <div className="sticky top-8">
            {/* Natural conversation starter */}
            <div className="mb-10">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0C7075]/10 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#0C7075] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Usually replies within 2 hours</span>
              </div> */}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Let&apos;s have a real conversation
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe the best solutions come from genuine conversations. Tell us what you&apos;re working on, and let&apos;s figure it out together.
              </p>
            </div>

            {/* Human touch points */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0C7075] to-[#0C7075]/80 flex items-center justify-center shadow-sm">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Quick Responses</h4>
                  <p className="text-gray-600 text-sm">We read every message personally, usually responding within hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0C7075] to-[#0C7075]/80 flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">No Sales Pitches</h4>
                  <p className="text-gray-600 text-sm">Just honest advice about whether our solution is right for you.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0C7075] to-[#0C7075]/80 flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Real People</h4>
                  <p className="text-gray-600 text-sm">You&apos;ll always talk to someone who understands your needs.</p>
                </div>
              </div>
            </div>

            {/* Divider with character */}
            <div className="my-10">
              <div className="flex items-center">
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent"></div>
                <div className="px-4">
                  {/* <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">✉️</span>
                  </div> */}
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-gray-300 via-gray-200 to-transparent"></div>
              </div>
            </div>

            {/* Alternative contact */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-3">Prefer to email?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Sometimes it&apos;s easier to start with an email. We&apos;re here either way.
              </p>
              <a 
                href="mailto:support@saple.ai" 
                className="inline-flex items-center gap-2 text-[#0C7075] font-medium hover:text-[#072E33] transition-colors group"
              >
                <Mail className="w-4 h-4" />
                <span>support@saple.ai</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Simple, clean form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Form header with subtle character */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0C7075] to-[#0C7075]/90 flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Send us a message</h2>
                  <p className="text-gray-600 mt-1">We&apos;ll get back to you soon</p>
                </div>
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                >
                  <div className={`flex items-center gap-3 ${submitStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${submitStatus.success ? 'bg-green-100' : 'bg-red-100'}`}>
                      {submitStatus.success ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{submitStatus.message}</p>
                      {submitStatus.success && (
                        <p className="text-sm text-green-600 mt-1">We&apos;re excited to connect with you!</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Clean form layout */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name & Email - side by side on desktop */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register('name', { required: 'Please tell us your name' })}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#0C7075] focus:border-[#0C7075] transition-all ${errors.name ? 'border-red-300' : 'border-gray-300 hover:border-gray-400'}`}
                      placeholder="Alex Johnson"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register('email', {
                        required: 'We need your email to reply',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#0C7075] focus:border-[#0C7075] transition-all ${errors.email ? 'border-red-300' : 'border-gray-300 hover:border-gray-400'}`}
                      placeholder="alex@company.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Company & Phone - natural spacing */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    {...register('company')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0C7075] focus:border-[#0C7075] transition-all"
                    placeholder="Your company (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0C7075] focus:border-[#0C7075] transition-all"
                    placeholder="+1 (555) 123-4567 (optional)"
                  />
                </div>
              </div>

              {/* Message field - spacious */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  What can we help you with? *
                </label>
                <div className="relative">
                  <textarea
                    rows={6}
                    {...register('message', { required: 'Tell us what you\'re thinking about' })}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#0C7075] focus:border-[#0C7075] transition-all resize-none ${errors.message ? 'border-red-300' : 'border-gray-300 hover:border-gray-400'}`}
                    placeholder="Hi, I'm interested in learning more about how your AI solutions could help with..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
  Feel free to share as much or as little as you&apos;d like. We&apos;re here to listen.
</p>
              </div>

              {/* Submit button with human touch */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 
                    bg-gradient-to-r from-[#0C7075] to-[#0A5A60]
                    text-white 
                    rounded-lg 
                    font-medium 
                    shadow-sm
                    hover:shadow-md
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-300
                    disabled:opacity-70 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-[#0C7075] focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending your message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
                
                <p className="text-sm text-gray-500 mt-6 text-center md:text-left">
                  We respect your privacy. We&apos;ll never share your information or spam you.
                </p>
              </div>
            </form>

            {/* Small human touch at bottom */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4">
                {/* <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-600">👋</span>
                </div> */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">Looking forward to hearing from you</p>
                  <p className="text-xs text-gray-400 mt-1">- The saple.ai team</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// // src/app/components/ContactForm.tsx
// 'use client';

// import { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { motion } from 'framer-motion';
// import { Send, Mail } from 'lucide-react';

// type FormData = {
//   name: string;
//   email: string;
//   company: string;
//   phone: string;
//   message: string;
// };

// export function ContactForm() {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         setSubmitStatus({ success: true, message: 'Thank you! Your message has been sent successfully.' });
//         reset();
//       } else {
//         throw new Error('Failed to send message');
//       }
//     } catch {
//       setSubmitStatus({ success: false, message: 'Something went wrong. Please try again later.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="grid md:grid-cols-2 gap-12">
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-full">
//           <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

//           <div className="space-y-6">
//             <div className="flex items-start space-x-4">
//               <div className="flex-shrink-0 mt-1 color">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-900">Let&apos;s Talk</h3>
//                 <p className="text-gray-600">
//                   Drop us an email anytime at <a href="mailto:support@saple.ai" className="text-color underline">support@saple.ai</a><br />
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: 20 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
//           <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

//           {submitStatus && (
//             <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-blue-100 color' : 'bg-red-100 text-red-700'}`}>
//               {submitStatus.message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name *
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 {...register('name', { required: 'Name is required' })}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address *
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 {...register('email', {
//                   required: 'Email is required',
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: 'Invalid email address'
//                   }
//                 })}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
//             </div>

//             <div>
//               <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
//                 Company
//               </label>
//               <input
//                 id="company"
//                 type="text"
//                 {...register('company')}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number
//               </label>
//               <input
//                 id="phone"
//                 type="tel"
//                 {...register('phone')}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                 Message *
//               </label>
//               <textarea
//                 id="message"
//                 rows={4}
//                 {...register('message', { required: 'Message is required' })}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
//               ></textarea>
//               {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="inline-flex items-center bg-color hover:bg-color text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Sending...' : 'Send Message'}
//                 {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// }