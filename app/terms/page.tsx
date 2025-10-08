import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      
      <main className="bg-white py-16">
        <div className="max-w-[900px] mx-auto px-8">
          <h1 className="text-[48px] font-bold text-card-foreground mb-8 leading-tight">
            Terms & Conditions
          </h1>
          
          <div className="space-y-8 text-card-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to OUT POST. These Terms and Conditions govern your use of our website and services. 
                By accessing or using our website, you agree to be bound by these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">2. Intellectual Property Rights</h2>
              <p className="mb-4">
                Unless otherwise stated, OUT POST and/or its licensors own the intellectual property rights 
                for all material on this website. All intellectual property rights are reserved. You may access 
                this from OUT POST for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <p className="mb-2">You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Republish material from OUT POST</li>
                <li>Sell, rent or sub-license material from OUT POST</li>
                <li>Reproduce, duplicate or copy material from OUT POST</li>
                <li>Redistribute content from OUT POST</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">3. User Comments</h2>
              <p className="mb-4">
                Parts of this website offer an opportunity for users to post and exchange opinions and information. 
                OUT POST does not filter, edit, publish or review Comments prior to their presence on the website. 
                Comments do not reflect the views and opinions of OUT POST, its agents and/or affiliates.
              </p>
              <p className="mb-4">
                Comments reflect the views and opinions of the person who posts their views and opinions. 
                To the extent permitted by applicable laws, OUT POST shall not be liable for the Comments or 
                for any liability, damages or expenses caused and/or suffered as a result of any use of and/or 
                posting of and/or appearance of the Comments on this website.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">4. Content Liability</h2>
              <p className="mb-4">
                We shall not be held responsible for any content that appears on your website. You agree to 
                protect and defend us against all claims that are rising on your website. No link(s) should 
                appear on any website that may be interpreted as libelous, obscene or criminal, or which 
                infringes, otherwise violates, or advocates the infringement or other violation of, any third 
                party rights.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">5. Disclaimer</h2>
              <p className="mb-4">
                To the maximum extent permitted by applicable law, we exclude all representations, warranties 
                and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Limit or exclude our or your liability for death or personal injury</li>
                <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
                <li>Limit any of our or your liabilities in any way that is not permitted under applicable law</li>
                <li>Exclude any of our or your liabilities that may not be excluded under applicable law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">6. Changes to Terms</h2>
              <p className="mb-4">
                OUT POST reserves the right to revise these terms and conditions at any time. By using this 
                website, you are expected to review these terms on a regular basis to ensure you understand 
                all terms and conditions governing use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-bold text-card-foreground mb-4">7. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us through our website.
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
