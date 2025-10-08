import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"

export default function PolicyPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      
      <main className="bg-white py-16">
        <div className="max-w-[900px] mx-auto px-8">
          <h1 className="text-[48px] font-bold text-card-foreground mb-8 leading-tight">
            Cookie & Privacy Policy
          </h1>
          
          <div className="space-y-8 text-card-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">1. Introduction</h2>
              <p className="mb-4">
                OUT POST ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">2. Information We Collect</h2>
              <p className="mb-4">
                We may collect information about you in a variety of ways. The information we may collect on 
                the website includes:
              </p>
              
              <h3 className="text-[18px] font-semibold text-card-foreground mb-3 mt-6">Personal Data</h3>
              <p className="mb-4">
                Personally identifiable information, such as your name, email address, and other information 
                you voluntarily give to us when you register with the website or when you choose to participate 
                in various activities related to the website, such as newsletter subscriptions.
              </p>

              <h3 className="text-[18px] font-semibold text-card-foreground mb-3 mt-6">Derivative Data</h3>
              <p className="mb-4">
                Information our servers automatically collect when you access the website, such as your IP address, 
                browser type, operating system, access times, and the pages you have viewed directly before and 
                after accessing the website.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">3. Use of Cookies</h2>
              <p className="mb-4">
                We use cookies to help personalize your online experience. A cookie is a text file that is placed 
                on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses 
                to your computer.
              </p>
              
              <h3 className="text-[18px] font-semibold text-card-foreground mb-3 mt-6">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the operation of our website</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Track your online activity to help advertisers deliver more relevant advertising</li>
              </ul>

              <p className="mb-4">
                You can choose to accept or decline cookies. Most web browsers automatically accept cookies, 
                but you can usually modify your browser setting to decline cookies if you prefer.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">4. Use of Your Information</h2>
              <p className="mb-4">
                Having accurate information about you permits us to provide you with a smooth, efficient, 
                and customized experience. Specifically, we may use information collected about you via 
                the website to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage your account</li>
                <li>Email you regarding your account or order</li>
                <li>Deliver targeted advertising, newsletters, and other information regarding promotions</li>
                <li>Improve our website and services</li>
                <li>Monitor and analyze usage and trends</li>
                <li>Respond to product and customer service requests</li>
                <li>Send you a newsletter</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">5. Disclosure of Your Information</h2>
              <p className="mb-4">
                We may share information we have collected about you in certain situations. Your information 
                may be disclosed as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information is necessary to comply with the law</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, sale, or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">6. Security of Your Information</h2>
              <p className="mb-4">
                We use administrative, technical, and physical security measures to help protect your personal 
                information. While we have taken reasonable steps to secure the personal information you provide 
                to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">7. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access – You have the right to request copies of your personal data</li>
                <li>The right to rectification – You have the right to request correction of inaccurate information</li>
                <li>The right to erasure – You have the right to request deletion of your personal data</li>
                <li>The right to restrict processing – You have the right to request restriction of processing</li>
                <li>The right to data portability – You have the right to request transfer of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">8. Third-Party Websites</h2>
              <p className="mb-4">
                The website may contain links to third-party websites and applications. We are not responsible 
                for the privacy practices or the content of such websites. We encourage you to review the privacy 
                policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">9. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have questions or comments about this Privacy Policy, please contact us through our website.
              </p>
            </section>

            <div className="pt-8 border-t border-border/20">
              <p className="text-sm text-card-foreground/60">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}
