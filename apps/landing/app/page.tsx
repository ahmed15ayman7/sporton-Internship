'use client';
import { useState } from 'react';
import { Button } from '@sporton/ui/components/button';
import { Input } from '@sporton/ui/components/input';
import { contactUs } from '@sporton/apis';

export default function LandingPage() {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const submitContactForm = async () => {
    // Handle form submission logic here
    console.log(contactData);
    setContactData({ name: '', email: '', message: '' });
    let contact = await contactUs.createContact(contactData);
  }

  return (
    <section
      id="contact"
      className="py-2 bg-gray-50"
      dir='rtl'
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              تواصل معنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              نحن هنا لمساعدتك في رحلتك الرياضية
            </p>
            <div className="w-24 h-1 bg-primary-main mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  تواصل معنا
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  مستعد لبدء رحلتك الرياضية؟ نحب أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.
                </p>
              </div>

              {/* Contact info cards */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-primary-main"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">البريد الإلكتروني</p>
                    <p className="text-gray-600">sporton.inquiry@gmail.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-primary-main"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">الهاتف</p>
                    <p className="text-gray-600">متاح 24/7</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-primary-main"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">الموقع</p>
                    <p className="text-gray-600">بنها، قليوبية، مصر</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section (form) */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    الاسم
                  </label>
                  <Input
                    id="name"
                    required
                    placeholder="اسمك الكامل"
                    name="name"
                    type="text"
                    value={contactData.name}
                    onChange={(e) =>
                      setContactData({ ...contactData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    required
                    placeholder="بريدك@الإلكتروني.com"
                    name="email"
                    type="email"
                    value={contactData.email}
                    onChange={(e) =>
                      setContactData({ ...contactData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={contactData.message}
                    onChange={(e) =>
                      setContactData({ ...contactData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent transition-colors resize-none"
                    placeholder="أخبرنا عن أهدافك الرياضية..."
                  />
                </div>

                <Button type="submit" className="w-full" onClick={submitContactForm}>
                  إرسال الرسالة
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
