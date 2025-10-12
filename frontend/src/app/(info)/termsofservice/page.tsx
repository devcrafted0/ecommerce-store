import React from 'react'

const page = () => {
  return (
    <div>
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 border-b-4 border-primary pb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: October 12, 2025
        </p>

        <section className="space-y-6 text-gray-700">
          <p>
            Welcome to <strong>EasyMart</strong>! These Terms of Service govern your use of the marketplace and all related services, features, and content. By accessing or using the Service, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">1. User Roles and Eligibility</h2>
          <p>
            The Service facilitates transactions and social interactions between three primary user roles:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Buyer:</strong> Users who browse, follow, purchase products, and leave reviews.
            </li>
            <li>
              <strong>Seller:</strong> Users who list, manage inventory, handle orders, and engage with followers.
            </li>
            <li>
              <strong>Admin:</strong> Authorized personnel who oversee the platform, manage content, and enforce policies.
            </li>
          </ul>
          <p>
            You must be at least 18 years old to create an account and use the Service.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">2. Marketplace and Transaction Rules</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2.1 Seller Obligations</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Sellers must accurately describe products, prices, and stock levels.
            </li>
            <li>
              Sellers are responsible for fulfilling orders promptly and updating order statuses (Pending, Shipped, Delivered).
            </li>
            <li>
              Misleading listings, prohibited goods, or illegal activities will result in immediate suspension or termination.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2.2 Buyer Obligations</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Buyers must complete payment for all purchased items.
            </li>
            <li>
              Buyers agree to use the product review feature fairly and accurately based on their purchase experience.
            </li>
          </ul>
          
          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">3. Social Interaction and Content</h2>
          <p>
            The Service includes social features like reviews, following, liking products, and an activity feed.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>User Content:</strong> Any reviews, profile bios, comments, or product descriptions you post ("User Content") is your sole responsibility. You grant EasyMart a non-exclusive, royalty-free license to use, modify, and display your User Content on the platform.
            </li>
            <li>
              <strong>Prohibited Conduct:</strong> You may not post any content that is abusive, defamatory, harassing, hateful, obscene, or violates any law or the rights of any third party.
            </li>
            <li>
              <strong>Reporting:</strong> The Admin panel reserves the right to remove any reported or deemed inappropriate content or listings without prior notice.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">4. Intellectual Property</h2>
          <p>
            All content on the Service (excluding User Content), including text, graphics, logos, and software, is the property of EasyMart and is protected by intellectual property laws. You may not use any of this proprietary content without express written permission.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">5. Disclaimers and Limitation of Liability</h2>
          <p>
            The Service is provided on an "as-is" and "as-available" basis. EasyMart makes no warranties regarding the quality, safety, or legality of items listed by Sellers or the accuracy of any user-posted content.
          </p>
          <p>
            EasyMart will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use or inability to use the Service, or from any items or services purchased or obtained through the Service.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">6. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Sellers may be banned, and inappropriate products removed, at the sole discretion of the Admin.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-3">7. Governing Law  and Dispute Resolution</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of <strong>The Islamic Republic ofPakistan</strong>. 
            Any disputes arising out of or relating to these Terms or your use of the Service shall be subject to the exclusive 
            jurisdiction of the courts located in <strong>Lahore</strong>, Pakistan.
          </p>
        </section>
      </div>
    </div>
    </div>
  )
}

export default page